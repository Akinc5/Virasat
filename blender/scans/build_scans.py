"""
Imports the licensed / author-permitted scans and third-party models into
Blender, repairs them and exports web-ready GLBs to public/models/.

  blender -b --python blender/scans/build_scans.py -- <name> <source.gltf> <out.glb> <preview.png>

For each model this
  * drops duplicate and line primitives (ripped captures store each surface
    twice — once as a triangle strip and once as a triangle list),
  * stands captured files upright (they disagree on the up axis),
  * binds the correct textures (the Taj capture ships 19 maps but no
    material assignments — see TAJ_MATERIALS),
  * welds, decimates to a web budget, grounds and centres the model and
    scales it to real-world metres,
  * exports a Draco-compressed GLB with resized JPEG textures and renders a
    preview for review.

Source files never enter the repo; only the exported GLB does.
"""

import base64
import glob
import json
import math
import os
import sys
import tempfile

import bpy
import bmesh
from mathutils import Matrix, Vector

# ── per-model settings ─────────────────────────────────────────────────────
#   rot        rotations [(axis, degrees), ...] applied in order to stand the
#              capture upright and turn its main face toward the default
#              camera (Blender -Y) — captured files disagree on their axes
#   size       real-world length of the longest horizontal side, metres
#   faces      triangle budget after decimation
#   tex        max texture edge in pixels
MODELS = {
    "taj-mahal": dict(rot=[], size=104.0, faces=420_000, tex=2048),
    "hampi": dict(rot=[("Y", 90), ("X", -90)], size=11.0, faces=260_000, tex=4096),
    "ajanta": dict(rot=[("Z", 90)], size=34.0, faces=120_000, tex=4096, fill_holes=True),
    "ellora": dict(rot=[], size=400.0, faces=260_000, tex=4096),
    # Untextured architectural model: textured here (see RED_FORT_MATERIALS)
    "red-fort": dict(rot=[], size=170.0, faces=340_000, tex=1024),
}

# Texture set for each mesh of the Taj Mahal capture (mesh index → set name).
# Worked out by rendering every part with every map and keeping the one whose
# UV islands line up; anything unlisted is white Makrana marble ("Marbel").
TAJ_MATERIALS = {
    3: "floor", 33: "floor",          # plinth terrace paving
    0: "brick2",                       # minaret shafts — regular courses
    2: "brick", 10: "brick",           # dome shell, main walls — ashlar blocks
    4: "pattern", 5: "pattern", 13: "pattern", 14: "pattern",
    25: "pattern", 37: "pattern", 38: "pattern",   # inlay & calligraphy bands
}
TAJ_DROP = {1, 34}                     # a line-strip helper and a stray sliver

# Red Fort: source material name → (texture key in blender/lib/textures.py,
# tile size in metres, roughness). The source model ships flat colours only.
RED_FORT_MATERIALS = {
    "07_-_Default": ("sandstone", 3.0, 0.85),   # walls, gates, bastions — red sandstone
    "08_-_Default": ("marble", 2.5, 0.35),      # chhatri domes and kiosks — white marble
    "09_-_Default": ("paving", 4.0, 0.9),       # walkways and courtyards
    "02_-_Default": ("grass", 6.0, 1.0),        # lawns
    "01_-_Default": ("sandstone", 3.0, 0.85),
    "03_-_Default": (None, 0, 0.5),             # railings — dark wrought iron
    "lambert1": (None, 0, 0.15),                # fountain pools — still water
    "04_-_Default": ("flag", 0, 0.8),           # the national flag over Lahori Gate
}


def args():
    a = sys.argv[sys.argv.index("--") + 1:]
    return a[0], a[1], a[2], a[3]


def clean_gltf(src, name):
    """Copy the glTF without duplicate / non-triangle primitives."""
    g = json.load(open(src, encoding="utf-8"))
    for mi, m in enumerate(g["meshes"]):
        prims = [p for p in m["primitives"] if p.get("mode", 4) in (4, 5)]
        seen, keep = set(), []
        for p in prims:
            key = p["attributes"].get("POSITION")
            if key in seen:
                continue
            # same-size strip + list pairs reference different accessors but
            # identical data; keep the first one of a given vertex count
            cnt = g["accessors"][key]["count"]
            if ("n", cnt) in seen:
                continue
            seen.update({key, ("n", cnt)})
            keep.append(p)
        if name == "taj-mahal" and mi in TAJ_DROP:
            keep = []
        m["primitives"] = keep
        m["name"] = f"part_{mi:02d}"
    # Remove nodes whose meshes became empty.
    for n in g["nodes"]:
        if "mesh" in n and not g["meshes"][n["mesh"]]["primitives"]:
            del n["mesh"]
    # Embed external buffers so the copy can live elsewhere; textures are
    # bound later by this script, so the file's own image refs are dropped.
    base = os.path.dirname(os.path.abspath(src))
    for b in g.get("buffers", []):
        uri = b.get("uri", "")
        if uri and not uri.startswith("data:"):
            data = open(os.path.join(base, uri), "rb").read()
            b["uri"] = "data:application/octet-stream;base64," + base64.b64encode(data).decode()
    for key in ("images", "textures", "samplers"):
        g.pop(key, None)
    for m in g.get("materials", []):
        m.pop("extensions", None)
        m.get("pbrMetallicRoughness", {}).pop("baseColorTexture", None)
    g.pop("extensionsUsed", None)
    out = os.path.join(tempfile.mkdtemp(), "clean.gltf")
    json.dump(g, open(out, "w", encoding="utf-8"))
    return out


def resized(path, max_px):
    img = bpy.data.images.load(path, check_existing=True)
    w, h = img.size
    if max(w, h) > max_px:
        k = max_px / max(w, h)
        img.scale(int(w * k), int(h * k))
    img.file_format = "JPEG"
    return img


def fill_holes(img):
    """Photogrammetry leaves unseen areas pure white; paint them basalt grey
    (the median colour of the scanned rock) with a little grain."""
    import numpy as np
    px = np.empty(len(img.pixels), dtype=np.float32)
    img.pixels.foreach_get(px)
    px = px.reshape(-1, 4)
    hole = px[:, :3].min(axis=1) > 0.93
    rock = np.median(px[~hole, :3], axis=0)
    grain = np.random.default_rng(7).normal(1.0, 0.06, (int(hole.sum()), 1)).astype(np.float32)
    px[hole, :3] = np.clip(rock * grain, 0, 1)
    img.pixels.foreach_set(px.ravel())
    print(f"filled {hole.mean():.1%} of texels with {rock.round(2)}")


def principled(name, base, normal=None, rough_map=None, rough=0.85, spec=0.25, tex=2048, holes=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    t = nt.nodes.new("ShaderNodeTexImage")
    t.image = resized(base, tex)
    if holes:
        fill_holes(t.image)
    nt.links.new(t.outputs[0], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = rough
    b.inputs["Specular IOR Level"].default_value = spec
    if rough_map:
        r = nt.nodes.new("ShaderNodeTexImage")
        r.image = resized(rough_map, tex // 2)
        r.image.colorspace_settings.name = "Non-Color"
        nt.links.new(r.outputs[0], b.inputs["Roughness"])
    if normal:
        n = nt.nodes.new("ShaderNodeTexImage")
        n.image = resized(normal, tex // 2)
        n.image.colorspace_settings.name = "Non-Color"
        nm = nt.nodes.new("ShaderNodeNormalMap")
        nt.links.new(n.outputs[0], nm.inputs["Color"])
        nt.links.new(nm.outputs[0], b.inputs["Normal"])
    return m


def taj_materials(src_dir, tex):
    def f(kind, n):
        hits = glob.glob(os.path.join(src_dir, f"*_{kind}_{n}_*.png"))
        return hits[0] if hits else None
    mats = {}
    for n in ("Marbel", "marbel_2", "floor", "brick", "brick2", "pattern"):
        mats[n] = principled(
            f"taj_{n}", f("RGB", n), normal=f("N", n), rough_map=f("R", n),
            rough=0.45, spec=0.5, tex=tex,
        )
    return mats


def red_fort_materials():
    """Swap the model's flat colours for textured PBR materials."""
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib"))
    import textures
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out", "textures")
    imgs = textures.build_all(out)
    mats = {}
    for src_name, (key, _tile, rough) in RED_FORT_MATERIALS.items():
        m = bpy.data.materials.new(f"redfort_{key or src_name}")
        m.use_nodes = True
        b = m.node_tree.nodes["Principled BSDF"]
        b.inputs["Roughness"].default_value = rough
        if key:
            t = m.node_tree.nodes.new("ShaderNodeTexImage")
            t.image = imgs[key]
            m.node_tree.links.new(t.outputs[0], b.inputs["Base Color"])
        elif src_name == "lambert1":
            b.inputs["Base Color"].default_value = (0.10, 0.20, 0.24, 1)
        else:
            b.inputs["Base Color"].default_value = (0.06, 0.06, 0.07, 1)
            b.inputs["Metallic"].default_value = 0.6
        mats[src_name] = m
    return mats


def box_uvs(me, tiles):
    """World-space box mapping in metres so textures keep a real-world scale;
    flag faces get a planar fit so the whole flag image covers them once."""
    bm = bmesh.new()
    bm.from_mesh(me)
    uv = bm.loops.layers.uv.verify()
    flag = [i for i, t in tiles.items() if t == "fit"]
    if flag:
        fv = [v.co for f in bm.faces if f.material_index in flag for v in f.verts]
        if fv:
            lo = Vector([min(c[i] for c in fv) for i in range(3)])
            hi = Vector([max(c[i] for c in fv) for i in range(3)])
            ext = hi - lo
            ax = sorted(range(3), key=lambda i: ext[i])  # thinnest axis is the flag's normal
            u_ax, v_ax = (ax[2], 2) if ax[2] != 2 else (ax[1], 2)
    for f in bm.faces:
        t = tiles.get(f.material_index, 4.0)
        if t == "fit":
            for l in f.loops:
                c = l.vert.co
                l[uv].uv = ((c[u_ax] - lo[u_ax]) / max(ext[u_ax], 1e-6), (c[v_ax] - lo[v_ax]) / max(ext[v_ax], 1e-6))
            continue
        n = f.normal
        a = max(range(3), key=lambda i: abs(n[i]))
        i, j = [(1, 2), (0, 2), (0, 1)][a]
        for l in f.loops:
            c = l.vert.co
            l[uv].uv = (c[i] / t, c[j] / t)
    bm.to_mesh(me)
    bm.free()


def crop_ground(me, margin=0.12):
    """The source sits on a lawn several times wider than the fort; replace it
    with one that extends a small margin past the buildings."""
    grass = next((i for i, m in enumerate(me.materials) if m and m.name.startswith("redfort_grass")), None)
    if grass is None:
        return
    bm = bmesh.new()
    bm.from_mesh(me)
    lawn = [f for f in bm.faces if f.material_index == grass]
    ground_z = max(v.co.z for f in lawn for v in f.verts) if lawn else 0.0
    rest = [v.co for f in bm.faces if f.material_index != grass for v in f.verts]
    lo = Vector([min(c[i] for c in rest) for i in range(3)])
    hi = Vector([max(c[i] for c in rest) for i in range(3)])
    pad = max(hi.x - lo.x, hi.y - lo.y) * margin
    bmesh.ops.delete(bm, geom=lawn, context="FACES")
    corners = [bm.verts.new((x, y, ground_z)) for x, y in
               ((lo.x - pad, lo.y - pad), (hi.x + pad, lo.y - pad), (hi.x + pad, hi.y + pad), (lo.x - pad, hi.y + pad))]
    bm.faces.new(corners).material_index = grass
    bm.to_mesh(me)
    bm.free()


def scan_texture(src_dir):
    hits = sorted(glob.glob(os.path.join(src_dir, "*.jpeg")) + glob.glob(os.path.join(src_dir, "*.jpg"))
                  + glob.glob(os.path.join(src_dir, "textures", "*.jp*g")))
    hits = [h for h in hits if "Thumbnail" not in h]
    return hits[0]


def main():
    name, src, out, preview = args()
    cfg = MODELS[name]
    src_dir = os.path.dirname(os.path.abspath(src))
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=clean_gltf(src, name))

    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    roots = [o for o in bpy.context.scene.objects if o.parent is None]
    fix = Matrix.Identity(4)
    for axis, deg in cfg["rot"]:
        fix = Matrix.Rotation(math.radians(deg), 4, axis) @ fix
    for r in roots:
        r.matrix_world = fix @ r.matrix_world
    bpy.context.view_layer.update()

    # Materials
    if name == "taj-mahal":
        mats = taj_materials(src_dir, cfg["tex"])
        for o in meshes:
            idx = int(o.data.name.split("_")[1].split(".")[0])
            o.data.materials.clear()
            o.data.materials.append(mats[TAJ_MATERIALS.get(idx, "Marbel")])
    elif name == "red-fort":
        mats = red_fort_materials()
        for o in meshes:
            for slot in o.material_slots:
                base = slot.material.name.split(".")[0] if slot.material else "07_-_Default"
                slot.material = mats.get(base, mats["07_-_Default"])
    else:
        # Photogrammetry: lighting is baked into the albedo, so keep it matte.
        m = principled(f"{name}_scan", scan_texture(src_dir), rough=0.95, spec=0.12, tex=cfg["tex"],
                       holes=cfg.get("fill_holes", False))
        for o in meshes:
            o.data.materials.clear()
            o.data.materials.append(m)

    # Bake transforms, join into one object
    for o in meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    for o in meshes:
        mw = o.matrix_world.copy()
        o.parent = None
        o.matrix_world = mw
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    for o in [o for o in bpy.context.scene.objects if o.type == "EMPTY"]:
        bpy.data.objects.remove(o)
    obj.data.transform(obj.matrix_world)
    obj.matrix_world = Matrix.Identity(4)

    # Weld + remove duplicate faces
    me = obj.data
    bm = bmesh.new()
    bm.from_mesh(me)
    dims = obj.dimensions
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=max(dims) * 2e-6)
    seen, dupes = set(), []
    for f in bm.faces:
        key = tuple(sorted(v.index for v in f.verts))
        if key in seen:
            dupes.append(f)
        seen.add(key)
    bmesh.ops.delete(bm, geom=dupes, context="FACES_ONLY")
    bm.to_mesh(me)
    bm.free()

    if name == "red-fort":
        crop_ground(me)

    tris = sum(len(p.vertices) - 2 for p in me.polygons)
    if tris > cfg["faces"]:
        d = obj.modifiers.new("decimate", "DECIMATE")
        d.ratio = cfg["faces"] / tris
        d.use_collapse_triangulate = True
        bpy.ops.object.modifier_apply(modifier=d.name)
    print(f"[{name}] tris {tris} -> {sum(len(p.vertices) - 2 for p in me.polygons)}")

    # Ground, centre and scale to metres
    # (bound_box is stale after the in-place edits above, so read the verts)
    co = [v.co for v in me.vertices]
    mn = Vector([min(c[i] for c in co) for i in range(3)])
    mx = Vector([max(c[i] for c in co) for i in range(3)])
    print(f"[{name}] raw extent {mx.x - mn.x:.1f} x {mx.y - mn.y:.1f} x {mx.z - mn.z:.1f}")
    k = cfg["size"] / max(mx.x - mn.x, mx.y - mn.y)
    me.transform(Matrix.Translation(Vector((-(mn.x + mx.x) / 2, -(mn.y + mx.y) / 2, -mn.z))))
    me.transform(Matrix.Scale(k, 4))
    me.update()
    for p in me.polygons:
        p.use_smooth = name not in ("taj-mahal", "red-fort")
    if name == "red-fort":
        tiles = {}
        for idx, m in enumerate(me.materials):
            for src_name, (key, tile, _r) in RED_FORT_MATERIALS.items():
                if m and m.name.startswith(f"redfort_{key or src_name}"):
                    tiles[idx] = "fit" if key == "flag" else (tile or 1.0)
        box_uvs(me, tiles)
    obj.name = name
    e = (mx - mn) * k
    print(f"[{name}] size {e.x:.1f} x {e.y:.1f} x {e.z:.1f} m")

    bpy.ops.export_scene.gltf(
        filepath=out, export_format="GLB", use_selection=False,
        export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6,
        export_draco_position_quantization=14, export_draco_texcoord_quantization=12,
        export_image_format="JPEG", export_jpeg_quality=85, export_yup=True,
        export_apply=True, export_tangents=False, export_animations=False,
    )

    render_preview(obj, preview)


def render_preview(obj, path):
    sc = bpy.context.scene
    sc.render.engine = "BLENDER_EEVEE_NEXT"
    sc.render.resolution_x, sc.render.resolution_y = 1280, 800
    sc.view_settings.view_transform = "AgX"
    w = bpy.data.worlds.new("w")
    sc.world = w
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (0.55, 0.6, 0.68, 1)
    w.node_tree.nodes["Background"].inputs[1].default_value = 1.0
    sun = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    sun.data.energy = 3.0
    sun.data.angle = math.radians(3)
    sun.rotation_euler = (math.radians(48), 0, math.radians(35))
    sc.collection.objects.link(sun)
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    cam.data.lens = 40
    sc.collection.objects.link(cam)
    sc.camera = cam
    co = [v.co for v in obj.data.vertices]
    d = Vector([max(c[i] for c in co) - min(c[i] for c in co) for i in range(3)])
    r = max(d) * 1.05
    tgt = Vector((0, 0, d.z * 0.4))
    cam.location = tgt + Vector((0.55, -1.0, 0.42)).normalized() * r * 1.35
    cam.rotation_euler = (tgt - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


main()
