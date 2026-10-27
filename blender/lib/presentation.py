"""
Shared presentation for monument renders: Nishita sky lighting, key and fill
suns, a studio turntable (charcoal floor; camera sees a charcoal backdrop
while the sky still lights the scene), cameras and EEVEE settings.
"""

import math
from pathlib import Path

import bpy
from mathutils import Vector

import common as c


def build_stage(pad_mat=None, pad_size=None):
    c.use_collection("Stage")
    studio = c.material("studio_charcoal", (0.022, 0.023, 0.025), roughness=0.9)
    c.mesh_object("stage_floor", c.box_geo((3000, 3000, 0.2), (0, 0, -0.7)), studio)
    if pad_mat is not None and pad_size is not None:
        sx, sy, cx, cy = pad_size
        c.mesh_object("stage_pad", c.box_geo((sx, sy, 0.6), (cx, cy, -0.3)), pad_mat)


def look_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def setup(cameras, samples=64, res=1920, sun_rot=(54, 0, -42), hero="hero"):
    c.use_collection("Presentation")
    scene = bpy.context.scene
    world = bpy.data.worlds.new("Sky")
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    sky = nt.nodes.new("ShaderNodeTexSky")
    sky.sky_type = "NISHITA"
    sky.sun_disc = False
    sky.sun_elevation = math.radians(36)
    sky.sun_rotation = math.radians(222)
    sky.dust_density = 1.4
    bg = nt.nodes["Background"]
    nt.links.new(sky.outputs["Color"], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.32
    backdrop = nt.nodes.new("ShaderNodeBackground")
    backdrop.inputs["Color"].default_value = (0.045, 0.047, 0.05, 1)
    path = nt.nodes.new("ShaderNodeLightPath")
    mix = nt.nodes.new("ShaderNodeMixShader")
    mix.name = "studio_mix"
    nt.links.new(path.outputs["Is Camera Ray"], mix.inputs[0])
    nt.links.new(bg.outputs[0], mix.inputs[1])
    nt.links.new(backdrop.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], nt.nodes["World Output"].inputs["Surface"])

    def light(name, energy, rot, color, angle):
        obj = bpy.data.objects.new(name, bpy.data.lights.new(name, "SUN"))
        obj.data.energy = energy
        obj.data.color = color
        obj.data.angle = math.radians(angle)
        obj.rotation_euler = tuple(math.radians(r) for r in rot)
        c._state["collection"].objects.link(obj)

    light("Sun", 4.0, sun_rot, (1.0, 0.95, 0.88), 0.8)
    light("Fill", 0.6, (70, 0, sun_rot[2] + 180), (0.85, 0.9, 1.0), 8.0)

    for name, (loc, target, lens) in cameras.items():
        cam = bpy.data.objects.new(f"cam_{name}", bpy.data.cameras.new(f"cam_{name}"))
        cam.location = loc
        cam.data.lens = lens
        cam.data.clip_end = 3000
        look_at(cam, target)
        c._state["collection"].objects.link(cam)
    scene.camera = bpy.data.objects[f"cam_{hero}"]

    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.eevee.taa_render_samples = int(samples)
    scene.eevee.use_raytracing = True
    scene.eevee.use_shadows = True
    scene.render.resolution_x = int(res)
    scene.render.resolution_y = int(int(res) * 9 / 16)
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.exposure = -0.1
    try:
        scene.view_settings.look = "AgX - Base Contrast"
    except TypeError:
        pass


def use_setting(name, collections=("Stage",)):
    """'studio' shows the Stage and a charcoal backdrop; anything else shows the sky."""
    nt = bpy.context.scene.world.node_tree
    mix = nt.nodes["studio_mix"]
    if name != "studio":
        for link in list(mix.inputs[0].links):
            nt.links.remove(link)
        mix.inputs[0].default_value = 0.0
    for coll_name in collections:
        coll = bpy.data.collections.get(coll_name)
        if coll:
            visible = name == "studio"
            coll.hide_render = not visible
            for o in coll.objects:
                o.hide_render = o.hide_viewport = not visible


def render_all(outdir, prefix, cameras, wanted=""):
    outdir = Path(outdir).resolve()
    outdir.mkdir(parents=True, exist_ok=True)
    names = [n for n in str(wanted).split(",") if n] or list(cameras)
    scene = bpy.context.scene
    for name in names:
        scene.camera = bpy.data.objects[f"cam_{name}"]
        scene.render.filepath = str(outdir / f"{prefix}_{name}.png")
        bpy.ops.render.render(write_still=True)
        print(f"[virasat] rendered {scene.render.filepath}")
