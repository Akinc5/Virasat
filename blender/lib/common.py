"""
Shared helpers for the Virasat procedural monument builds.

Every monument is generated from code so it is reproducible and diffable.
Units are metres (1 Blender unit = 1 m) and Z is up; the glTF exporter
converts to Y-up. Geometry generators return plain (verts, faces) lists so
they can be merged cheaply with MeshBuilder before becoming objects.
"""

import math
import sys
from pathlib import Path

import bpy

# ------------------------------------------------------------------
# Scene, args, collections
# ------------------------------------------------------------------

_state = {"collection": None}
_materials = {}


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0
    _state["collection"] = None
    _materials.clear()


def parse_args(defaults):
    """Parse `-- --key value` args passed after Blender's own args."""
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = dict(defaults)
    i = 0
    while i < len(argv):
        key = argv[i].lstrip("-").replace("-", "_")
        if i + 1 < len(argv) and not argv[i + 1].startswith("--"):
            args[key] = argv[i + 1]
            i += 2
        else:
            args[key] = True
            i += 1
    return args


def use_collection(name):
    """Make `name` the collection new objects are linked into."""
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(coll)
    _state["collection"] = coll
    return coll


def objects_in(prefix):
    return [o for coll in bpy.data.collections if coll.name.startswith(prefix)
            for o in coll.objects if o.type == "MESH"]


# ------------------------------------------------------------------
# Materials
# ------------------------------------------------------------------


def material(name, color=(0.8, 0.8, 0.8), roughness=0.5, metallic=0.0, image=None,
             tile=3.0, alpha_clip=False, subsurface=0.0, bump=0.0):
    """Principled material. `tile` = metres per texture repeat (number or (u, v))."""
    if name in _materials:
        return _materials[name]
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if subsurface:
        bsdf.inputs["Subsurface Weight"].default_value = subsurface
        bsdf.inputs["Subsurface Scale"].default_value = 0.02
    if image is not None:
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = image
        tex.location = (-400, 200)
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
        if alpha_clip:
            # glTF exporter maps Alpha <- Round(texture alpha) to alphaMode MASK.
            rnd = nt.nodes.new("ShaderNodeMath")
            rnd.operation = "ROUND"
            rnd.location = (-200, -100)
            nt.links.new(tex.outputs["Alpha"], rnd.inputs[0])
            nt.links.new(rnd.outputs[0], bsdf.inputs["Alpha"])
            mat.surface_render_method = "DITHERED"
    if bump:
        # Fine stone grain for renders only (glTF ignores procedural bump).
        noise = nt.nodes.new("ShaderNodeTexNoise")
        noise.inputs["Scale"].default_value = 180.0
        noise.inputs["Detail"].default_value = 6.0
        bmp = nt.nodes.new("ShaderNodeBump")
        bmp.inputs["Strength"].default_value = bump
        bmp.inputs["Distance"].default_value = 0.002
        nt.links.new(noise.outputs["Fac"], bmp.inputs["Height"])
        nt.links.new(bmp.outputs["Normal"], bsdf.inputs["Normal"])
    mat.use_backface_culling = False
    mat["tile"] = tile
    _materials[name] = mat
    return mat


# ------------------------------------------------------------------
# Geometry generators: return (verts, faces)
# ------------------------------------------------------------------


def _signed_area(pts):
    return sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(pts, pts[1:] + pts[:1])) / 2


def ccw(pts):
    return list(pts) if _signed_area(pts) > 0 else list(reversed(pts))


def _extrude(outline, to_world, d0, d1):
    """Closed solid from a 2D outline swept between depths d0 < d1."""
    pts = ccw(outline)
    n = len(pts)
    verts = [to_world(u, v, d0) for u, v in pts] + [to_world(u, v, d1) for u, v in pts]
    faces = [tuple(reversed(range(n))), tuple(range(n, 2 * n))]
    faces += [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    return verts, faces


def _loft(sections, to_world):
    """
    Closed solid through [(outline, d), ...] cross-sections (d increasing),
    all with the same vertex count and order — e.g. tapered recesses.
    """
    flip = _signed_area(sections[0][0]) < 0
    n = len(sections[0][0])
    verts, faces = [], []
    for k, (outline, d) in enumerate(sections):
        pts = list(reversed(outline)) if flip else list(outline)
        verts += [to_world(u, v, d) for u, v in pts]
        if k:
            a, b = (k - 1) * n, k * n
            faces += [(a + i, a + (i + 1) % n, b + (i + 1) % n, b + i) for i in range(n)]
    faces.append(tuple(reversed(range(n))))
    faces.append(tuple(range((len(sections) - 1) * n, len(sections) * n)))
    return verts, faces


def prism_geo(outline, z0, z1, offset=(0, 0)):
    ox, oy = offset
    return _extrude(outline, lambda u, v, d: (u + ox, v + oy, d), z0, z1)


def ring_prism_geo(outer, inner, z0, z1, offset=(0, 0)):
    """Wall between two outlines with matching vertex counts (e.g. a parapet)."""
    ox, oy = offset
    outer, inner = ccw(outer), ccw(inner)
    n = len(outer)
    verts = []
    for z in (z0, z1):
        verts += [(x + ox, y + oy, z) for x, y in outer]
    for z in (z0, z1):
        verts += [(x + ox, y + oy, z) for x, y in inner]
    ob, ot, ib, it = 0, n, 2 * n, 3 * n
    faces = []
    for i in range(n):
        j = (i + 1) % n
        faces.append((ob + i, ob + j, ot + j, ot + i))          # outer side
        faces.append((ib + j, ib + i, it + i, it + j))          # inner side
        faces.append((ot + i, ot + j, it + j, it + i))          # top
        faces.append((ob + j, ob + i, ib + i, ib + j))          # bottom
    return verts, faces


def box_geo(size, center):
    sx, sy, sz = (s / 2 for s in size)
    cx, cy, cz = center
    return prism_geo([(-sx, -sy), (sx, -sy), (sx, sy), (-sx, sy)], cz - sz, cz + sz, (cx, cy))


def oriented_box_geo(center, angle, radial, tangential, height):
    """Box whose local X points along `angle` (for radial brackets, posts)."""
    cx, cy, cz = center
    ca, sa = math.cos(angle), math.sin(angle)
    hr, ht = radial / 2, tangential / 2
    corners = [(-hr, -ht), (hr, -ht), (hr, ht), (-hr, ht)]
    pts = [(cx + x * ca - y * sa, cy + x * sa + y * ca) for x, y in corners]
    return prism_geo(pts, cz, cz + height)


def regular_polygon(radius, sides, rotation=0.0):
    return [(radius * math.cos(rotation + 2 * math.pi * i / sides),
             radius * math.sin(rotation + 2 * math.pi * i / sides))
            for i in range(sides)]


def chamfered_square(half, chamfer):
    h, c = half, chamfer
    return [(-h + c, -h), (h - c, -h), (h, -h + c), (h, h - c),
            (h - c, h), (-h + c, h), (-h, h - c), (-h, -h + c)]


def lathe_geo(profile, segments=32, center=(0, 0, 0), rotation=0.0, caps=True,
              petals=0, petal_depth=0.0, closed=False):
    """
    Revolve a (radius, z) profile around Z. Radius 0 collapses to a pole.
    `petals` scallops the radius (lotus caps, flutes); `caps=False` leaves the
    ends open; `closed=True` treats the profile as a loop (rings, ropes) and
    joins the last ring back to the first, giving a watertight torus.
    """
    cx, cy, cz = center
    verts, rings = [], []
    for r, z in profile:
        if r <= 1e-6:
            rings.append([len(verts)])
            verts.append((cx, cy, cz + z))
            continue
        ring = []
        for s in range(segments):
            a = rotation + 2 * math.pi * s / segments
            rr = r
            if petals:
                rr = r * (1 - petal_depth * (1 - abs(math.cos(petals * a / 2))) ** 1.5)
            ring.append(len(verts))
            verts.append((cx + rr * math.cos(a), cy + rr * math.sin(a), cz + z))
        rings.append(ring)

    faces = []
    pairs = list(zip(rings, rings[1:] + (rings[:1] if closed else [])))
    for lo, hi in pairs:
        if len(lo) == 1 and len(hi) == 1:
            continue
        if len(lo) == 1:
            faces += [(lo[0], hi[(s + 1) % segments], hi[s]) for s in range(segments)]
        elif len(hi) == 1:
            faces += [(lo[s], lo[(s + 1) % segments], hi[0]) for s in range(segments)]
        else:
            faces += [(lo[s], lo[(s + 1) % segments], hi[(s + 1) % segments], hi[s])
                      for s in range(segments)]
    if caps and not closed:
        if len(rings[0]) > 1:
            faces.append(tuple(reversed(rings[0])))
        if len(rings[-1]) > 1:
            faces.append(tuple(rings[-1]))
    return verts, faces


def tube_geo(path, radii, sides=8):
    """Sweep a circle along a 3D polyline (crescent finials, rails)."""
    verts, faces = [], []
    n = len(path)
    for i, (p, r) in enumerate(zip(path, radii)):
        a = path[max(i - 1, 0)]
        b = path[min(i + 1, n - 1)]
        tx, ty, tz = b[0] - a[0], b[1] - a[1], b[2] - a[2]
        tl = math.sqrt(tx * tx + ty * ty + tz * tz) or 1
        tx, ty, tz = tx / tl, ty / tl, tz / tl
        # Any vector not parallel to the tangent gives a stable frame.
        ux, uy, uz = (0, 1, 0) if abs(ty) < 0.9 else (1, 0, 0)
        nx, ny, nz = ty * uz - tz * uy, tz * ux - tx * uz, tx * uy - ty * ux
        nl = math.sqrt(nx * nx + ny * ny + nz * nz)
        nx, ny, nz = nx / nl, ny / nl, nz / nl
        bx, by, bz = ty * nz - tz * ny, tz * nx - tx * nz, tx * ny - ty * nx
        for s in range(sides):
            ang = 2 * math.pi * s / sides
            ca, sa = math.cos(ang) * r, math.sin(ang) * r
            verts.append((p[0] + nx * ca + bx * sa, p[1] + ny * ca + by * sa, p[2] + nz * ca + bz * sa))
    for i in range(n - 1):
        for s in range(sides):
            a, b = i * sides + s, i * sides + (s + 1) % sides
            faces.append((a, b, b + sides, a + sides))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple(range((n - 1) * sides, n * sides)))
    return verts, faces


class MeshBuilder:
    """Accumulates many small generators into one object (fewer draw calls)."""

    def __init__(self):
        self.verts, self.faces = [], []

    def add(self, geo):
        verts, faces = geo
        o = len(self.verts)
        self.verts += verts
        self.faces += [tuple(i + o for i in f) for f in faces]
        return self

    def build(self, name, mat, **kw):
        return mesh_object(name, (self.verts, self.faces), mat, **kw)


# ------------------------------------------------------------------
# Objects, UVs, booleans
# ------------------------------------------------------------------


def mesh_object(name, geo, mat, smooth=False, sharp_angle=40.0, uv=None):
    verts, faces = geo
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.validate()
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    (_state["collection"] or bpy.context.scene.collection).objects.link(obj)
    mesh.materials.append(mat)
    if smooth:
        mesh.shade_smooth()
        mesh.set_sharp_from_angle(angle=math.radians(sharp_angle))
    if uv is not None:
        apply_uv(mesh, uv)
        obj["uv_done"] = True
    return obj


def lathe(name, profile, mat, segments=32, center=(0, 0, 0), smooth=True, uv_tile=None,
          uv_band=None, sharp_angle=40.0, **kw):
    """
    Lathe object with cylindrical UVs (texture blocks wrap around the shaft).
    `uv_band=(z0, height)` maps a band texture exactly onto that height range.
    """
    obj = mesh_object(name, lathe_geo(profile, segments, center, **kw), mat, smooth=smooth,
                      sharp_angle=sharp_angle)
    tile = uv_tile or _tile(mat)[0]
    ref_r = max(r for r, _ in profile) or 1.0
    v0, tile_v = uv_band if uv_band else (0.0, tile)
    apply_cyl_uv(obj.data, center, tile, ref_r, v0, tile_v)
    obj["uv_done"] = True
    return obj


def apply_uv(mesh, fn):
    layer = mesh.uv_layers.get("UVMap") or mesh.uv_layers.new(name="UVMap")
    verts, loops = mesh.vertices, mesh.loops
    for poly in mesh.polygons:
        for li in poly.loop_indices:
            layer.data[li].uv = fn(verts[loops[li].vertex_index].co, poly.normal)


def _tile(mat):
    t = mat.get("tile", 3.0)
    return (float(t), float(t)) if isinstance(t, (int, float)) else (float(t[0]), float(t[1]))


def box_uv(tile_u, tile_v=None):
    tu, tv = tile_u, tile_v or tile_u

    def fn(co, n):
        ax, ay, az = abs(n.x), abs(n.y), abs(n.z)
        if az >= ax and az >= ay:
            return (co.x / tu, co.y / tv)
        if ax >= ay:
            return (co.y / tu, co.z / tv)
        return (co.x / tu, co.z / tv)
    return fn


def apply_cyl_uv(mesh, center, tile, ref_radius, v0=0.0, tile_v=None):
    layer = mesh.uv_layers.get("UVMap") or mesh.uv_layers.new(name="UVMap")
    cx, cy, _ = center
    tile_v = tile_v or tile
    period = 2 * math.pi * ref_radius / tile
    verts, loops = mesh.vertices, mesh.loops
    for poly in mesh.polygons:
        uvs = []
        for li in poly.loop_indices:
            co = verts[loops[li].vertex_index].co
            ang = math.atan2(co.y - cy, co.x - cx) % (2 * math.pi)
            uvs.append([ang / (2 * math.pi) * period, (co.z - v0) / tile_v])
        us = [u for u, _ in uvs]
        if max(us) - min(us) > period / 2:  # polygon straddles the seam
            for uvp in uvs:
                if uvp[0] < period / 2:
                    uvp[0] += period
        for li, uvp in zip(poly.loop_indices, uvs):
            layer.data[li].uv = uvp


def assign_box_uvs():
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH" and not obj.get("uv_done") and obj.data.materials:
            apply_uv(obj.data, box_uv(*_tile(obj.data.materials[0])))
            obj["uv_done"] = True


def apply_boolean(target, cutter, operation="DIFFERENCE"):
    """Apply an exact boolean and delete the cutter. Cut faces take the cutter's material."""
    mod = target.modifiers.new("bool", "BOOLEAN")
    mod.operation = operation
    mod.solver = "EXACT"
    mod.material_mode = "TRANSFER"
    mod.object = cutter
    cutter.hide_render = True
    depsgraph = bpy.context.evaluated_depsgraph_get()
    new_mesh = bpy.data.meshes.new_from_object(target.evaluated_get(depsgraph))
    old = target.data
    target.modifiers.remove(mod)
    target.data = new_mesh
    new_mesh.name = target.name
    bpy.data.meshes.remove(old)
    bpy.data.meshes.remove(cutter.data)


# ------------------------------------------------------------------
# Finalise & export
# ------------------------------------------------------------------


def join_by_material(objects, prefix):
    """Merge objects sharing a first material to keep draw calls low on mobile."""
    groups = {}
    for obj in objects:
        if obj.type == "MESH" and obj.data.materials:
            groups.setdefault(obj.data.materials[0].name, []).append(obj)
    joined = []
    for mat_name, objs in groups.items():
        bpy.ops.object.select_all(action="DESELECT")
        for o in objs:
            o.select_set(True)
        bpy.context.view_layer.objects.active = objs[0]
        if len(objs) > 1:
            bpy.ops.object.join()
        obj = bpy.context.view_layer.objects.active
        obj.name = f"{prefix}_{mat_name}"
        bpy.ops.object.mode_set(mode="EDIT")
        bpy.ops.mesh.select_all(action="SELECT")
        bpy.ops.mesh.remove_doubles(threshold=0.0005)
        bpy.ops.object.mode_set(mode="OBJECT")
        joined.append(obj)
    return joined


def triangle_count(objects):
    tris = 0
    for obj in objects:
        obj.data.calc_loop_triangles()
        tris += len(obj.data.loop_triangles)
    return tris


def export_glb(path, objects, draco=True):
    path = Path(path).resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    for o in objects:
        o.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=str(path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_image_format="AUTO",
        export_draco_mesh_compression_enable=draco,
        export_draco_mesh_compression_level=6,
    )
    print(f"[virasat] exported {path} ({path.stat().st_size / 1024:.0f} KB, "
          f"{triangle_count(objects)} tris)")


def save_blend(path):
    path = Path(path).resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=str(path))
    print(f"[virasat] saved {path}")
