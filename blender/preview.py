"""
Render a quick preview PNG of an exported GLB (sanity check, not a beauty shot).

Run:  blender -b -P blender/preview.py -- --glb public/models/taj-mahal.glb --out blender/out/taj-mahal.png
"""

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
import common as c  # noqa: E402

args = c.parse_args({"glb": "", "out": "blender/out/preview.png", "angle": "35"})
c.reset_scene()
bpy.ops.import_scene.gltf(filepath=str(Path(args["glb"]).resolve()))

# Frame the bounds of everything imported.
pts = [o.matrix_world @ Vector(v) for o in bpy.context.scene.objects if o.type == "MESH"
       for v in o.bound_box]
lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
center, size = (lo + hi) / 2, (hi - lo).length

a = math.radians(float(args["angle"]))
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
bpy.context.collection.objects.link(cam)
cam.location = center + Vector((size * 0.8 * math.sin(a), -size * 0.8 * math.cos(a), size * 0.25))
cam.rotation_euler = (center + Vector((0, 0, size * 0.05)) - cam.location).to_track_quat("-Z", "Y").to_euler()
cam.data.lens = 35
bpy.context.scene.camera = cam

sun = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
bpy.context.collection.objects.link(sun)
sun.rotation_euler = (math.radians(50), 0, math.radians(30))
sun.data.energy = 4

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x, scene.render.resolution_y = 1280, 720
scene.world = bpy.data.worlds.new("w")
scene.world.use_nodes = True
scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.55, 0.65, 0.8, 1)
scene.render.filepath = str(Path(args["out"]).resolve())
bpy.ops.render.render(write_still=True)
