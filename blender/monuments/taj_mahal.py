"""
Taj Mahal, Agra — high-fidelity procedural reconstruction (V2).

Original geometry generated from code. References: architectural photographs
and commonly published dimensions (assumptions sheet in blender/README.md).
No third-party model geometry or textures are used.

Run (from the repo root):
  blender -b --factory-startup -P blender/monuments/taj_mahal.py -- \
      [--out public/models/taj-mahal.glb] [--blend PATH] [--renders DIR] \
      [--setting studio|garden] [--cameras front,hero] [--samples 64] [--res 1920] \
      [--no-env] [--no-export] [--retex]

Collections:
  Taj_Plinth, Taj_Mausoleum, Taj_Ornament, Taj_Dome, Taj_Chhatris, Taj_Minarets
      → the monument (the only thing exported to GLB)
  Stage      → studio presentation: charcoal cyclorama + sandstone pad
  Env_Garden → optional garden setting: terrace, mosque, jawab, pool, cypresses
  Presentation → sky, lights, cameras
"""

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "lib"))
import arch as a  # noqa: E402
import common as c  # noqa: E402
import textures as tx  # noqa: E402

BLENDER_DIR = Path(__file__).resolve().parents[1]
ARGS = c.parse_args({
    "out": "public/models/taj-mahal.glb",
    "blend": str(BLENDER_DIR / "out" / "Taj_Mahal_V2.blend"),
    "renders": "", "setting": "studio", "cameras": "", "samples": "64", "res": "1920",
    "no_env": False, "no_export": False, "no_draco": False, "retex": False,
})

# ==================================================================
# Architectural parameters (metres). See README "Assumptions".
# ==================================================================
PL_HALF, PL_H = 47.5, 6.7                 # marble plinth 95 x 95
B_HALF, CH = 28.3, 8.0                    # mausoleum 56.6 square, chamfered corners
WALL = 22.5                               # plinth top → roof
ROOF = PL_H + WALL
PISH_W, PISH_D = 21.0, 0.8                # pishtaq (portal frame) width / projection
PISH_TOP = PL_H + 25.5
IWAN_W, IWAN_SPRING, IWAN_DEPTH = 13.0, 11.0, 5.5
IWAN_BACK_W, IWAN_BACK_SPRING = 7.0, 15.0
IWAN_OPENINGS = [(4.6, 4.2, PL_H), (4.4, 3.0, PL_H + 10.5)]   # door, window: (w, spring, base)
BAY_C = (B_HALF - CH + PISH_W / 2) / 2
ALC_W, ALC_DEPTH, ALC_BACK_W = 6.6, 2.2, 3.4
ALC_LEVELS = [(PL_H + 0.4, 5.2), (PL_H + 11.6, 4.9)]
CH_DIST = (2 * B_HALF - CH) / math.sqrt(2)
DRUM_R, DRUM_H = 11.8, 9.0
DOME_BASE = ROOF + DRUM_H
# Onion profile: overhangs the drum, widest low (~30% of height), then a long
# taper that turns slightly concave under the lotus cap.
DOME = [(DRUM_R, 0.0), (12.75, 0.9), (13.45, 2.4), (13.85, 4.4), (13.9, 6.6), (13.55, 9.1),
        (12.75, 11.6), (11.45, 14.0), (9.75, 16.2), (7.85, 18.0), (5.95, 19.5), (4.25, 20.6),
        (2.85, 21.45), (1.75, 22.1), (0.85, 22.6), (0.0, 22.85)]
CHHATRI_POS, CHHATRI_S = 16.0, 0.95
MIN_C = PL_HALF - 4.3
MIN_BALCONIES = [11.0, 21.5, 32.0]        # above plinth top
MIN_R0, MIN_R1, MIN_SHAFT0 = 2.85, 2.2, 2.7

MAIN_FACES = [-math.pi / 2, 0.0, math.pi / 2, math.pi]  # S, E, N, W normals
CHAMFER_FACES = [f + math.pi / 4 for f in MAIN_FACES]
CORNERS = [(1, 1), (-1, 1), (-1, -1), (1, -1)]

# ==================================================================
# Materials (motif library in lib/motifs.py)
# ==================================================================
c.reset_scene()
TEX = tx.build_all(BLENDER_DIR / "out" / "textures", regenerate=bool(ARGS["retex"]))

MARBLE = c.material("marble", image=TEX["marble"], roughness=0.3, tile=3.0, subsurface=0.06, bump=0.08)
SLAB = c.material("marble_slab", image=TEX["slab"], roughness=0.3, tile=7.0, subsurface=0.06, bump=0.08)
ASHLAR = c.material("marble_ashlar", image=TEX["ashlar"], roughness=0.32, tile=4.8, subsurface=0.06, bump=0.08)
SHAFT = c.material("marble_minaret", image=TEX["ashlar"], roughness=0.32, tile=4.0, subsurface=0.06, bump=0.08)
ARABESQUE = c.material("pietra_dura_arabesque", image=TEX["arabesque"], roughness=0.22, tile=7.2)
BORDER = c.material("inlay_border", image=TEX["border"], roughness=0.22, tile=(3.0, 0.75))
ROSETTE = c.material("inlay_rosette", image=TEX["rosette"], roughness=0.22, tile=(6.0, 1.0))
ARCADE = c.material("inlay_arcade", image=TEX["arcade"], roughness=0.22, tile=(4.0, 1.0))
CHEVRON = c.material("inlay_chevron", image=TEX["chevron"], roughness=0.22, tile=0.9)
ROPE = c.material("rope_moulding", image=TEX["rope"], roughness=0.25, tile=2.4)
RAILING = c.material("railing_panel", image=TEX["railing"], roughness=0.28, tile=(1.0, 1.0))
CALLIG = c.material("calligraphy_band", image=TEX["band"], roughness=0.22, tile=(4.0, 1.0))
JALI = c.material("jali", image=TEX["jali"], roughness=0.4, tile=(0.7, 0.7 * math.sqrt(3)), alpha_clip=True)
BLACK = c.material("black_marble", (0.035, 0.035, 0.04), roughness=0.2)
INTERIOR = c.material("interior_shadow", (0.14, 0.12, 0.10), roughness=0.9)
BRONZE = c.material("gilt_bronze", (0.60, 0.43, 0.19), roughness=0.38, metallic=1.0)


def interp(profile, z):
    for (r0, z0), (r1, z1) in zip(profile, profile[1:]):
        if z0 <= z <= z1:
            return r0 + (r1 - r0) * (z - z0) / (z1 - z0)
    return profile[-1][0]


def shifted(pts, u):
    return [(x + u, y) for x, y in pts]


def mausoleum_outline():
    """Chamfered square with the four pishtaq projections, CCW."""
    h, cc, pw, pd = B_HALF, CH, PISH_W / 2, PISH_D
    side = [(-(h - cc), -h), (-pw, -h), (-pw, -h - pd), (pw, -h - pd), (pw, -h), (h - cc, -h)]
    out = []
    for k in range(4):
        ca, sa = math.cos(k * math.pi / 2), math.sin(k * math.pi / 2)
        out += [(x * ca - y * sa, x * sa + y * ca) for x, y in side]
    return out


def alcove_frames():
    """(frame, u) for every two-storey alcove bay on main and chamfered faces."""
    for ang in MAIN_FACES:
        for u in (-BAY_C, BAY_C):
            yield a.Frame(ang, B_HALF), u
    for ang in CHAMFER_FACES:
        yield a.Frame(ang, CH_DIST), 0.0


# ------------------------------------------------------------------
# Reusable ornament components
# ------------------------------------------------------------------
def rope_ring(name, center, radius, z, thick):
    """Twisted black-and-white rope moulding (watertight torus)."""
    prof = [(radius + thick * math.cos(t), z + thick * math.sin(t))
            for t in (2 * math.pi * i / 10 for i in range(10))]
    return c.lathe(name, prof, ROPE, max(24, int(radius * 16)), (center[0], center[1], 0),
                   closed=True, uv_tile=ROPE["tile"], uv_band=(z - thick, 2 * thick))


def band_ring(name, center, profile_r, z0, z1, mat, tile_u, samples=4):
    """Inlay band wrapped on a surface of revolution (follows its curvature)."""
    zs = [z0 + (z1 - z0) * i / samples for i in range(samples + 1)]
    prof = [(profile_r(z) + 0.03, z) for z in zs]
    return c.lathe(name, prof, mat, max(48, int(prof[0][0] * 10)), (center[0], center[1], 0),
                   caps=False, uv_tile=tile_u, uv_band=(z0, z1 - z0))


def band_panel(name, fr, u0, u1, v0, v1, mat=None, vertical=False, tile_u=None):
    """Band texture mapped exactly onto a flat strip, along its long axis."""
    mat = mat or BORDER
    tu = tile_u or c._tile(mat)[0]
    if vertical:
        uv = fr.uv(u0, v0, u1 - u0, tu, rotate=True)
    else:
        uv = fr.uv(u0, v0, tu, v1 - v0)
    c.mesh_object(name, fr.extrude(a.rect(u0, u1, v0, v1), 0.0, 0.03), mat, uv=uv)


FINIAL = [(0, -0.2), (1.05, 0), (1.25, 0.35), (0.55, 0.75), (1.05, 1.35), (1.18, 1.9),
          (0.95, 2.35), (0.45, 2.75), (0.88, 3.35), (0.82, 3.8), (0.35, 4.15), (0.65, 4.6),
          (0.6, 4.95), (0.25, 5.25), (0.45, 5.6), (0.4, 5.9), (0.12, 6.2), (0.11, 8.1), (0, 8.2)]


def finial(name, x, y, z, s, crescent=True):
    """Layered kalasha finial with fluted bulbs (and the crescent on the main dome)."""
    b = c.MeshBuilder().add(c.lathe_geo([(r * s, h * s) for r, h in FINIAL], 48, (x, y, z),
                                        petals=16, petal_depth=0.07))
    if crescent:
        cz, rad = z + 8.75 * s, 0.7 * s
        path, radii = [], []
        for i in range(15):
            t = i / 14
            th = math.radians(200 + 140 * t)
            path.append((x + rad * math.cos(th), y, cz + rad * math.sin(th)))
            radii.append((0.13 * math.sin(math.pi * t) + 0.02) * s)
        b.add(c.tube_geo(path, radii, 8))
    return b.build(name, BRONZE, smooth=True)


def onion_dome(name, base_z, center, profile, petals, segments, mat, ropes=True):
    """
    Dome shell + fluted lotus cap whose petal tips flare out over the dome,
    with rope mouldings at the cap's foot and neck. Returns the cap top height.
    """
    x, y = center
    c.lathe(name, profile, mat, segments, (x, y, base_z), smooth=True)
    top = profile[-1][1]
    rmax = max(r for r, _ in profile)
    z_foot = top * 0.85
    zs = [top * f for f in (0.85, 0.875, 0.90, 0.925, 0.95, 0.97, 0.99)]
    cap = [(interp(profile, zs[0]) + rmax * 0.07, z_foot - top * 0.006)]       # flared tips
    cap += [(interp(profile, z) + rmax * (0.02 - 0.012 * i / 6), z) for i, z in enumerate(zs)]
    cap += [(rmax * 0.085, top * 1.005), (rmax * 0.085, top * 1.02), (0, top * 1.025)]
    c.lathe(f"{name}_lotus_cap", cap, MARBLE, petals * 8, (x, y, base_z),
            petals=petals, petal_depth=0.4)
    if ropes:
        rope_ring(f"{name}_cap_rope", center, interp(profile, z_foot) + rmax * 0.012,
                  base_z + z_foot + top * 0.006, rmax * 0.012)
        rope_ring(f"{name}_neck_rope", center, rmax * 0.09, base_z + top * 1.012, rmax * 0.008)
    return top * 1.022


def guldasta(marble, chevron, tips, x, y, z0, z1, r):
    """Pinnacle: moulded base, chevron-inlaid octagonal shaft, lotus capital, cupola, finial."""
    L = z1 - z0
    rot = math.pi / 8
    marble.add(c.lathe_geo([(r * 1.4, 0), (r * 1.4, 0.45), (r * 1.15, 0.55), (r * 1.15, 0.75), (r, 0.8)],
                           8, (x, y, z0), rotation=rot))
    chevron.add(c.lathe_geo([(r, 0.8), (r, L - 2.4)], 8, (x, y, z0), rotation=rot, caps=False))
    zb = 4.5
    while zb < L - 3.2:
        marble.add(c.lathe_geo([(r * 1.18, zb - 0.12), (r * 1.18, zb + 0.12), (r * 0.98, zb + 0.12),
                                (r * 0.98, zb - 0.12)], 8, (x, y, z0), rotation=rot, closed=True))
        zb += 4.5
    marble.add(c.lathe_geo([(r * 0.95, L - 2.45), (r * 1.25, L - 2.25), (r * 1.85, L - 1.85), (r * 2.0, L - 1.65),
                            (r * 1.7, L - 1.6), (r * 1.0, L - 1.55)], 40, (x, y, z0), petals=10, petal_depth=0.28))
    marble.add(c.lathe_geo([(r * 1.1, L - 1.55), (r * 1.2, L - 1.2), (r * 1.0, L - 0.8), (r * 0.55, L - 0.5),
                            (0, L - 0.35)], 20, (x, y, z0)))
    tips.add(c.lathe_geo([(0.09, 0), (0.16, 0.2), (0.05, 0.4), (0.12, 0.55), (0.02, 1.1), (0, 1.15)],
                         10, (x, y, z1 - 0.4)))


def chhatri(name, x, y, z, s, eave=1.0):
    """
    Octagonal pavilion: moulded base, arcade with 8 cusped arches cut through,
    corner colonettes, inlaid frieze, sloping chhajja on brackets, drum,
    ashlar dome with fluted lotus cap and finial.
    """
    rot = math.pi / 8
    R, Ri = 4.6 * s, 3.75 * s
    apothem = R * math.cos(math.pi / 8)
    c.mesh_object(f"{name}_base", c.lathe_geo(
        [(5.0 * s, 0), (5.0 * s, 0.9 * s), (5.25 * s, 1.0 * s), (5.25 * s, 1.2 * s), (4.8 * s, 1.3 * s)],
        8, (x, y, z), rotation=rot), MARBLE)
    ring = c.mesh_object(f"{name}_arcade", c.ring_prism_geo(
        c.regular_polygon(R, 8, rot), c.regular_polygon(Ri, 8, rot), z + 1.3 * s, z + 6.2 * s, (x, y)), MARBLE)
    cut = c.MeshBuilder()
    for k in range(8):
        fr = a.Frame(k * math.pi / 4, apothem, (x, y))
        cut.add(fr.extrude(a.cusped_arch_curve(2.5 * s, 2.3 * s, z + 1.3 * s), -1.6 * s, 0.5 * s))
    c.apply_boolean(ring, cut.build(f"{name}_cut", INTERIOR))
    cols, frieze = c.MeshBuilder(), []
    for k in range(8):
        ang = rot + k * math.pi / 4
        px, py = x + (R + 0.05 * s) * math.cos(ang), y + (R + 0.05 * s) * math.sin(ang)
        cols.add(c.lathe_geo([(0.32 * s, 0), (0.32 * s, 0.25 * s), (0.2 * s, 0.35 * s), (0.2 * s, 4.3 * s),
                              (0.3 * s, 4.45 * s), (0.3 * s, 4.65 * s), (0.22 * s, 4.75 * s)],
                             10, (px, py, z + 1.3 * s)))
        fr = a.Frame(k * math.pi / 4, apothem, (x, y))
        hw = R * math.sin(math.pi / 8) - 0.3 * s
        frieze.append((fr, hw))
    cols.build(f"{name}_colonettes", MARBLE, smooth=True)
    for k, (fr, hw) in enumerate(frieze):
        band_panel(f"{name}_frieze_{k}", fr, -hw, hw, z + 5.45 * s, z + 6.05 * s, BORDER, tile_u=1.6 * s * 4)
    reach = (5.0 + 1.4 * eave) * s
    c.mesh_object(f"{name}_chhajja", c.lathe_geo(
        [(4.5 * s, 6.2 * s), (reach, 5.8 * s), (reach, 6.0 * s), (4.6 * s, 6.7 * s)],
        8, (x, y, z), rotation=rot), MARBLE)
    brackets = c.MeshBuilder()
    for k in range(16):
        ang = rot / 2 + k * math.pi / 8
        rc = R + 0.35 * s
        brackets.add(c.oriented_box_geo((x + rc * math.cos(ang), y + rc * math.sin(ang), z + 5.3 * s),
                                        ang, 0.8 * s, 0.18 * s, 0.65 * s))
    brackets.build(f"{name}_brackets", MARBLE)
    c.mesh_object(f"{name}_drum", c.lathe_geo(
        [(4.15 * s, 6.7 * s), (4.15 * s, 7.5 * s), (4.35 * s, 7.6 * s), (4.35 * s, 7.8 * s), (4.0 * s, 7.9 * s)],
        8, (x, y, z), rotation=rot), MARBLE)
    small = [(3.9, 0), (4.3, 0.9), (4.42, 1.9), (4.2, 2.9), (3.65, 3.8), (2.75, 4.5),
             (1.7, 4.95), (0.8, 5.2), (0.0, 5.3)]
    top = onion_dome(f"{name}_dome", z + 7.9 * s, (x, y), [(r * s, h * s) for r, h in small], 14, 64,
                     ASHLAR, ropes=False)
    finial(f"{name}_finial", x, y, z + 7.9 * s + top - 0.05 * s, 0.42 * s, crescent=False)


# ==================================================================
# 1. Plinth: tiered base, corner bastions, framed niche bays, border band
# ==================================================================
def build_plinth():
    c.use_collection("Taj_Plinth")
    block = c.mesh_object("plinth", c.box_geo((2 * PL_HALF, 2 * PL_HALF, PL_H), (0, 0, PL_H / 2)), SLAB)
    c.mesh_object("plinth_base_course", c.box_geo((2 * PL_HALF + 1.6, 2 * PL_HALF + 1.6, 0.45), (0, 0, 0.225)), MARBLE)
    c.mesh_object("plinth_base_moulding", c.box_geo((2 * PL_HALF + 0.9, 2 * PL_HALF + 0.9, 0.3), (0, 0, 0.6)), MARBLE)
    c.mesh_object("plinth_cornice", c.box_geo((2 * PL_HALF + 1.2, 2 * PL_HALF + 1.2, 0.4), (0, 0, PL_H - 0.2)), MARBLE)
    c.mesh_object("plinth_cornice_fillet", c.box_geo((2 * PL_HALF + 0.6, 2 * PL_HALF + 0.6, 0.15), (0, 0, PL_H - 0.5)), MARBLE)

    # Octagonal bastions under the minarets.
    rot = math.pi / 8
    for i, (sx, sy) in enumerate(CORNERS):
        cx, cy = sx * MIN_C, sy * MIN_C
        c.mesh_object(f"bastion_{i}", c.prism_geo(c.regular_polygon(5.2, 8, rot), 0, PL_H, (cx, cy)), SLAB)
        c.mesh_object(f"bastion_{i}_base", c.prism_geo(c.regular_polygon(5.9, 8, rot), 0, 0.75, (cx, cy)), MARBLE)
        c.mesh_object(f"bastion_{i}_cornice", c.prism_geo(c.regular_polygon(5.6, 8, rot), PL_H - 0.4, PL_H, (cx, cy)), MARBLE)

    shallow, deep, frames, black, jali = c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder(), []
    for ang in MAIN_FACES:
        fr = a.Frame(ang, PL_HALF)
        entrance = ang in (-math.pi / 2, math.pi / 2)
        niches = [(u, entrance) for u in (-3.6, 0.0, 3.6)]
        niches += [(sgn * (9.6 + k * 4.75), False) for sgn in (-1, 1) for k in range(6)]
        for u, is_door in niches:
            outline = shifted(a.arch_curve(2.9, 2.2, 1.0), u)
            if is_door:
                deep.add(fr.extrude(outline, -0.9, 0.5))
                jali.append(fr.extrude(shifted(a.arch_curve(2.86, 2.2, 1.0), u), -0.66, -0.6))
            else:
                shallow.add(fr.extrude(outline, -0.32, 0.5))
            frames.add(a.rect_frame_geo(fr, u - 1.95, u + 1.95, 0.8, PL_H - 1.35, 0.14, 0, 0.08))
            black.add(a.rect_frame_geo(fr, u - 1.72, u + 1.72, 1.0 - 0.0, PL_H - 1.58, 0.05, 0, 0.02))
        # Central portal group frame and pilaster strips between groups.
        frames.add(a.rect_frame_geo(fr, -6.0, 6.0, 0.75, PL_H - 0.95, 0.3, 0, 0.16))
        for u in (-6.6, 6.6):
            frames.add(fr.extrude(a.rect(u - 0.3, u + 0.3, 0.75, PL_H - 0.6), 0, 0.12))
    c.apply_boolean(block, shallow.build("plinth_niche_cut", MARBLE))
    c.apply_boolean(block, deep.build("plinth_door_cut", INTERIOR))
    frames.build("plinth_panel_frames", MARBLE)
    black.build("plinth_inlay_lines", BLACK)
    jb = c.MeshBuilder()
    for g in jali:
        jb.add(g)
    jb.build("plinth_jali", JALI)
    for i, ang in enumerate(MAIN_FACES):
        band_panel(f"plinth_border_{i}", a.Frame(ang, PL_HALF), -38.0, 38.0, PL_H - 1.2, PL_H - 0.62)


# ==================================================================
# 2. Mausoleum body: real half-octagonal recesses, openings, jali
# ==================================================================
def build_mausoleum():
    c.use_collection("Taj_Mausoleum")
    block = c.mesh_object("mausoleum", c.prism_geo(mausoleum_outline(), PL_H, ROOF), SLAB)

    recess = c.MeshBuilder()
    for ang in MAIN_FACES:
        fr = a.Frame(ang, B_HALF + PISH_D)
        recess.add(a.recess_cutter(fr, 0.0, IWAN_W, IWAN_SPRING, PL_H, IWAN_DEPTH, 1.8,
                                   IWAN_BACK_W, IWAN_BACK_SPRING, 12))
    for fr, u in alcove_frames():
        for base, spring in ALC_LEVELS:
            recess.add(a.recess_cutter(fr, u, ALC_W, spring, base, ALC_DEPTH, 0.6, ALC_BACK_W, spring + 1.5))
    c.apply_boolean(block, recess.build("recess_cut", MARBLE))

    openings, jali = c.MeshBuilder(), c.MeshBuilder()
    for ang in MAIN_FACES:
        fr = a.Frame(ang, B_HALF + PISH_D)
        back = -IWAN_DEPTH
        for w, spring, base in IWAN_OPENINGS:
            openings.add(fr.extrude(a.arch_curve(w, spring, base), back - 0.6, back + 0.2))
            jali.add(fr.extrude(a.arch_curve(w - 0.04, spring, base), back - 0.33, back - 0.27))
    for fr, u in alcove_frames():
        back = -ALC_DEPTH
        lo = ALC_LEVELS[0][0]
        openings.add(fr.extrude(a.rect(u - 0.75, u + 0.75, lo + 0.8, lo + 3.0), back - 0.5, back + 0.2))
        jali.add(fr.extrude(a.rect(u - 0.73, u + 0.73, lo + 0.8, lo + 2.98), back - 0.28, back - 0.22))
        hi = ALC_LEVELS[1][0] + 1.0
        openings.add(fr.extrude(shifted(a.arch_curve(2.0, 1.8, hi), u), back - 0.5, back + 0.2))
        jali.add(fr.extrude(shifted(a.arch_curve(1.96, 1.8, hi), u), back - 0.28, back - 0.22))
    c.apply_boolean(block, openings.build("opening_cut", INTERIOR))
    jali.build("facade_jali", JALI)

    top = c.MeshBuilder()
    for ang in MAIN_FACES:
        fr = a.Frame(ang, B_HALF)
        top.add(fr.extrude(a.rect(-PISH_W / 2, PISH_W / 2, ROOF - 0.01, PISH_TOP), -1.2, PISH_D))
        top.add(fr.extrude(a.rect(-PISH_W / 2 - 0.25, PISH_W / 2 + 0.25, PISH_TOP - 0.4, PISH_TOP), -1.45, PISH_D + 0.25))
        top.add(fr.extrude(a.rect(-PISH_W / 2 - 0.1, PISH_W / 2 + 0.1, PISH_TOP - 0.62, PISH_TOP - 0.48), -1.3, PISH_D + 0.12))
    top.build("pishtaq_tops", SLAB)

    c.mesh_object("parapet", c.ring_prism_geo(
        c.chamfered_square(B_HALF, CH), c.chamfered_square(B_HALF - 0.6, CH - 0.25), ROOF, ROOF + 1.6), SLAB)
    c.mesh_object("parapet_coping", c.ring_prism_geo(
        c.chamfered_square(B_HALF + 0.15, CH + 0.06), c.chamfered_square(B_HALF - 0.75, CH - 0.3),
        ROOF + 1.6, ROOF + 1.8), MARBLE)
    c.mesh_object("wall_cornice", c.ring_prism_geo(
        c.chamfered_square(B_HALF + 0.3, CH + 0.12), c.chamfered_square(B_HALF - 0.3, CH - 0.12),
        ROOF - 0.55, ROOF - 0.25), MARBLE)
    c.mesh_object("roof", c.prism_geo(c.chamfered_square(B_HALF - 0.5, CH - 0.2), ROOF - 0.3, ROOF + 0.2), SLAB)


# ==================================================================
# 3. Façade ornament: nested arch orders, pietra dura, bands, balustrades, pinnacles
# ==================================================================
def build_ornament():
    c.use_collection("Taj_Ornament")
    mould, inlay, black, rails = c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder(), []

    def dress_arch(fr, u, w, spring, base, ring_t, margin, top_pad, line_w, inner_t, straight):
        f = fr.shifted(u)
        # Outer moulded order on the wall face …
        mould.add(a.arch_ring_geo(f, w, spring, base, ring_t, 0.0, 0.14, 12))
        # … and a stepped inner order inside the mouth: the arch reads as nested.
        mould.add(a.arch_ring_geo(f, w - 2 * inner_t, spring, base, inner_t, -straight, -straight + 0.35, 12))
        apex = a.arch_apex(w, spring, base)
        half = w / 2 + ring_t + margin
        top = apex + ring_t + top_pad
        for sp in a.spandrel_outlines(w, spring, base, half, top, 12):
            inlay.add(f.extrude(sp, 0.0, 0.03))
        black.add(a.rect_frame_geo(f, -half - line_w, half + line_w, base, top + line_w, line_w, 0, 0.05))
        return top

    for i, ang in enumerate(MAIN_FACES):
        fr = a.Frame(ang, B_HALF + PISH_D)
        dress_arch(fr, 0.0, IWAN_W, IWAN_SPRING, PL_H, 0.45, 1.2, 1.3, 0.08, 0.4, 0.9)
        # Black-marble band framing the great arch (decorative stand-in, not lettering).
        bo, bi = PISH_W / 2 - 0.6, PISH_W / 2 - 1.6
        btop, bbot = PISH_TOP - 0.7, PISH_TOP - 1.7
        band_panel(f"callig_top_{i}", fr, -bo, bo, bbot, btop, CALLIG)
        band_panel(f"callig_left_{i}", fr, -bo, -bi, PL_H + 0.3, bbot, CALLIG, vertical=True)
        band_panel(f"callig_right_{i}", fr, bi, bo, PL_H + 0.3, bbot, CALLIG, vertical=True)
        black.add(a.rect_frame_geo(fr, -PISH_W / 2 + 0.25, PISH_W / 2 - 0.25, PL_H + 0.1, PISH_TOP - 0.45, 0.06, 0, 0.05))
        back = a.Frame(ang, B_HALF + PISH_D - IWAN_DEPTH)
        for w, spring, base in IWAN_OPENINGS:
            mould.add(a.arch_ring_geo(back, w, spring, base, 0.25, 0, 0.1))
            for sp in a.spandrel_outlines(w, spring, base, w / 2 + 0.55, a.arch_apex(w, spring, base) + 0.7):
                inlay.add(back.extrude(sp, 0, 0.03))
        side = a.Frame(ang, B_HALF)
        for sgn in (-1, 1):
            u0, u1 = sorted((sgn * (PISH_W / 2 + 0.4), sgn * (B_HALF - CH - 0.4)))
            band_panel(f"parapet_band_{i}_{sgn}", side, u0, u1, ROOF + 0.35, ROOF + 1.25)
    for i, ang in enumerate(CHAMFER_FACES):
        fr = a.Frame(ang, CH_DIST)
        hw = CH * math.sqrt(2) / 2 - 0.4
        band_panel(f"parapet_band_ch_{i}", fr, -hw, hw, ROOF + 0.35, ROOF + 1.25)

    for k, (fr, u) in enumerate(alcove_frames()):
        for base, spring in ALC_LEVELS:
            dress_arch(fr, u, ALC_W, spring, base, 0.22, 0.35, 0.45, 0.05, 0.2, 0.3)
        # Low balustrade across the mouth of the upper alcove.
        f = fr.shifted(u)
        hw = ALC_W / 2 - 0.2
        base = ALC_LEVELS[1][0]
        rails.append((f, hw, base))
    rb = c.MeshBuilder()
    for f, hw, base in rails:
        rb.add(f.extrude(a.rect(-hw, hw, base, base + 0.9), -0.45, -0.3))
        mould.add(f.extrude(a.rect(-hw - 0.05, hw + 0.05, base + 0.9, base + 1.0), -0.5, -0.25))
    railing = rb.build("alcove_balustrades", RAILING)
    c.apply_uv(railing.data, c.box_uv(1.0, 0.9))
    railing["uv_done"] = True

    mould.build("arch_mouldings", MARBLE)
    inlay.build("spandrel_inlay", ARABESQUE)
    black.build("black_marble_lines", BLACK)
    build_guldastas()


def build_guldastas():
    marble, chevron, tips = c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder()
    for ang in MAIN_FACES:
        fr = a.Frame(ang, B_HALF + PISH_D)
        for u in (-PISH_W / 2, PISH_W / 2):
            x, y, _ = fr.world(u, 0, -0.15)
            guldasta(marble, chevron, tips, x, y, PL_H, PISH_TOP + 3.6, 0.42)
    for (x, y) in c.chamfered_square(B_HALF, CH):
        guldasta(marble, chevron, tips, x, y, PL_H, ROOF + 5.4, 0.5)
    marble.build("guldasta_marble", MARBLE, smooth=True, sharp_angle=35)
    chevron.build("guldasta_chevron", CHEVRON)
    tips.build("guldasta_finials", BRONZE, smooth=True)


# ==================================================================
# 4. Drum and main dome
# ==================================================================
def build_dome():
    c.use_collection("Taj_Dome")
    c.lathe("drum_plinth", [(DRUM_R + 1.2, 0), (DRUM_R + 1.2, 0.7), (DRUM_R + 0.7, 0.9), (DRUM_R + 0.5, 1.15),
                            (DRUM_R, 1.2)], MARBLE, 96, (0, 0, ROOF), smooth=True, sharp_angle=30)
    c.lathe("drum", [(DRUM_R, 1.2), (DRUM_R, DRUM_H)], ASHLAR, 96, (0, 0, ROOF))
    drum = lambda z: DRUM_R  # noqa: E731
    z = DOME_BASE
    band_ring("drum_scroll_band", (0, 0), drum, z - 4.7, z - 3.85, BORDER, 3.0)
    rope_ring("drum_rope_low", (0, 0), DRUM_R + 0.05, z - 3.65, 0.18)
    band_ring("drum_arcade", (0, 0), drum, z - 3.45, z - 0.8, ARCADE, 11.0)
    rope_ring("drum_rope_high", (0, 0), DRUM_R + 0.05, z - 0.62, 0.16)
    c.lathe("drum_cap_moulding", [(DRUM_R, -0.45), (DRUM_R + 0.35, -0.38), (DRUM_R + 0.35, -0.12), (DRUM_R, 0.0)],
            MARBLE, 96, (0, 0, z), closed=True)
    top = onion_dome("main_dome", DOME_BASE, (0, 0), DOME, 22, 128, ASHLAR)
    band_ring("dome_rosette_band", (0, 0), lambda zz: interp(DOME, zz - DOME_BASE),
              DOME_BASE + 0.7, DOME_BASE + 2.0, ROSETTE, 6.5 * 1.3)
    finial("main_finial", 0, 0, DOME_BASE + top - 0.1, 1.0)


def build_chhatris():
    c.use_collection("Taj_Chhatris")
    for i, (sx, sy) in enumerate(CORNERS):
        chhatri(f"roof_chhatri_{i}", sx * CHHATRI_POS, sy * CHHATRI_POS, ROOF + 0.2, CHHATRI_S)


# ==================================================================
# 5. Minarets
# ==================================================================
def shaft_r(z):
    t = (z - MIN_SHAFT0) / (MIN_BALCONIES[-1] - MIN_SHAFT0)
    return MIN_R0 + (MIN_R1 - MIN_R0) * t


def build_minarets():
    c.use_collection("Taj_Minarets")
    for i, (sx, sy) in enumerate(CORNERS):
        x, y = sx * MIN_C, sy * MIN_C
        out_ang = math.atan2(sy, sx)
        name = f"minaret_{i}"
        c.mesh_object(f"{name}_pedestal", c.lathe_geo(
            [(3.9, 0), (3.9, 2.0), (4.1, 2.12), (4.1, 2.35), (3.6, 2.45), (MIN_R0 + 0.2, 2.7)],
            8, (x, y, PL_H), rotation=math.pi / 8), MARBLE)
        rope_ring(f"{name}_pedestal_rope", (x, y), MIN_R0 + 0.1, PL_H + 2.8, 0.13)
        zs = [MIN_SHAFT0 + (MIN_BALCONIES[-1] - MIN_SHAFT0) * k / 16 for k in range(17)]
        c.lathe(f"{name}_shaft", [(shaft_r(z), z) for z in zs], SHAFT, 48, (x, y, PL_H))

        cove, brk, panels, slab, posts, doors, frames = (c.MeshBuilder() for _ in range(7))
        for b_i, zr in enumerate(MIN_BALCONIES):
            zb = PL_H + zr
            rs = shaft_r(zr - 1.0)
            # Inlay band and rope moulding below the corbel zone.
            band_ring(f"{name}_band_{b_i}", (x, y), lambda zz, rs=rs: rs, zb - 3.05, zb - 2.2, ARCADE, 4.0)
            rope_ring(f"{name}_rope_{b_i}", (x, y), rs + 0.06, zb - 2.05, 0.13)
            # Concave cove that flares out to carry the balcony.
            prof = []
            for k in range(9):
                th = (math.pi / 2) * k / 8
                prof.append((rs - 0.02 + 1.15 * (1 - math.cos(th)), zb - 1.92 + 1.75 * math.sin(th)))
            prof += [(rs + 1.13, zb - 0.12), (rs - 0.05, zb - 0.12)]
            cove.add(c.lathe_geo(prof, 48, (x, y, 0)))
            # Carved brackets with pendant buds, small arched panels between them.
            n = 20
            for k in range(n):
                ang = 2 * math.pi * k / n
                rc = rs + 0.42
                brk.add(c.oriented_box_geo((x + rc * math.cos(ang), y + rc * math.sin(ang), zb - 1.3),
                                           ang, 0.85, 0.2, 1.15))
                rp = rs + 0.78
                brk.add(c.lathe_geo([(0.0, -0.42), (0.1, -0.3), (0.13, -0.15), (0.08, 0.0), (0.0, 0.02)], 10,
                                    (x + rp * math.cos(ang), y + rp * math.sin(ang), zb - 1.3)))
                mid = ang + math.pi / n
                f = a.Frame(mid, rs + 0.5, (x, y))
                panels.add(a.arch_ring_geo(f, 0.55, 0.25, zb - 1.15, 0.06, 0.0, 0.07, 6))
            # Floor slab with a beaded edge.
            slab.add(c.lathe_geo([(rs - 0.05, zb - 0.12), (rs + 1.32, zb - 0.12), (rs + 1.32, zb + 0.2),
                                  (rs - 0.05, zb + 0.2)], 48, (x, y, 0)))
            slab.add(c.lathe_geo([(rs + 1.32 + 0.06 * math.cos(t), zb + 0.04 + 0.06 * math.sin(t))
                                  for t in (2 * math.pi * j / 6 for j in range(6))], 64, (x, y, 0), closed=True))
            # Solid panelled parapet, posts with knobs.
            rr = rs + 1.27
            par = c.lathe(f"{name}_parapet_{b_i}", [(rr - 0.15, zb + 0.2), (rr, zb + 0.2), (rr, zb + 1.05),
                                                     (rr - 0.15, zb + 1.05)], RAILING, 64, (x, y, 0), closed=True,
                          smooth=False, uv_tile=2 * math.pi * rr / 16, uv_band=(zb + 0.2, 0.85))
            par.name = f"{name}_parapet_{b_i}"
            for k in range(16):
                ang = 2 * math.pi * k / 16
                rp = rr - 0.07
                px, py = x + rp * math.cos(ang), y + rp * math.sin(ang)
                posts.add(c.oriented_box_geo((px, py, zb + 0.2), ang, 0.2, 0.2, 0.95))
                posts.add(c.lathe_geo([(0.1, 0), (0.12, 0.08), (0.06, 0.2), (0.0, 0.26)], 10, (px, py, zb + 1.15)))
            # Small door onto the balcony, facing outwards.
            if b_i < len(MIN_BALCONIES) - 1:
                rd = shaft_r(zr + 1.0)
                fd = a.Frame(out_ang, rd, (x, y))
                doors.add(fd.extrude(a.rect(-0.42, 0.42, zb + 0.2, zb + 2.0), -0.05, 0.03))
                frames.add(a.rect_frame_geo(fd, -0.58, 0.58, zb + 0.2, zb + 2.16, 0.14, -0.05, 0.08))
        cove.build(f"{name}_coves", MARBLE, smooth=True, sharp_angle=30)
        brk.build(f"{name}_brackets", MARBLE, smooth=True, sharp_angle=40)
        panels.build(f"{name}_corbel_panels", MARBLE)
        slab.build(f"{name}_slabs", MARBLE, smooth=True, sharp_angle=40)
        posts.build(f"{name}_posts", MARBLE)
        doors.build(f"{name}_doors", INTERIOR)
        frames.build(f"{name}_door_frames", MARBLE)
        chhatri(f"{name}_kiosk", x, y, PL_H + MIN_BALCONIES[-1] + 0.2, 0.52, eave=1.5)


# ==================================================================
# 6. Presentation settings (renders only — not exported)
# ==================================================================
def build_stage():
    """Studio turntable: charcoal cyclorama and a red-sandstone pad under the plinth."""
    c.use_collection("Stage")
    sand = c.material("red_sandstone", image=TEX["sandstone"], roughness=0.85, tile=3.0)
    studio = c.material("studio_charcoal", (0.022, 0.023, 0.025), roughness=0.9)
    c.mesh_object("stage_pad", c.box_geo((120, 120, 0.6), (0, 0, -0.3)), sand)
    c.mesh_object("stage_floor", c.box_geo((3000, 3000, 0.2), (0, 0, -0.7)), studio)


def build_garden():
    c.use_collection("Env_Garden")
    sand = c.material("red_sandstone", image=TEX["sandstone"], roughness=0.85, tile=3.0)
    grass = c.material("lawn", (0.13, 0.25, 0.08), roughness=0.95)
    water = c.material("water", (0.012, 0.025, 0.03), roughness=0.02)
    cypress = c.material("cypress", (0.03, 0.09, 0.04), roughness=0.9)
    path = c.material("path_marble", image=TEX["slab"], roughness=0.5, tile=4.0)
    c.mesh_object("terrace", c.box_geo((300, 125, 1.5), (0, 2.5, -0.75)), sand)
    for sgn in (-1, 1):
        c.mesh_object(f"lawn_{sgn}", c.box_geo((190, 330, 0.2), (sgn * (4.2 + 95), -225, -1.6)), grass)
        c.mesh_object(f"walk_{sgn}", c.box_geo((5.0, 330, 0.2), (sgn * 6.7, -225, -1.55)), path)
        c.mesh_object(f"pool_edge_{sgn}", c.box_geo((1.0, 300, 0.4), (sgn * 3.7, -225, -1.45)), path)
    c.mesh_object("pool_water", c.box_geo((6.4, 300, 0.05), (0, -225, -1.62)), water)
    c.mesh_object("ground", c.box_geo((1400, 1400, 0.2), (0, 0, -1.9)), grass)
    trees = c.MeshBuilder()
    for sgn in (-1, 1):
        for k in range(32):
            trees.add(c.lathe_geo([(0, 0), (0.7, 0.6), (1.05, 2.4), (1.1, 4.6), (0.85, 7.0), (0.45, 9.2), (0, 10.2)],
                                  12, (sgn * 12.0, -92 - k * 9.0, -1.5)))
    trees.build("cypress_rows", cypress, smooth=True)
    for sgn, name in ((-1, "mosque"), (1, "jawab")):
        x = sgn * 80
        hall = c.mesh_object(f"{name}_hall", c.box_geo((22, 58, 14), (x, 0, 7)), sand)
        fr = a.Frame(0.0 if sgn < 0 else math.pi, 11, (x, 0))
        cut = c.MeshBuilder().add(fr.extrude(a.arch_curve(9, 7.5, 0.0), -3.0, 0.5))
        for u in (-18, -10, 10, 18):
            cut.add(fr.extrude(shifted(a.arch_curve(4.5, 3.6, 0.6), u), -1.5, 0.5))
        c.apply_boolean(hall, cut.build(f"{name}_cut", INTERIOR))
        for k, (yy, r) in enumerate(((0, 6.0), (-19, 4.2), (19, 4.2))):
            c.lathe(f"{name}_drum_{k}", [(r, 14), (r, 16)], MARBLE, 40, (x, yy, 0))
            dome = [(r, 0), (r * 1.08, r * 0.45), (r * 0.9, r * 0.95), (r * 0.5, r * 1.3), (r * 0.15, r * 1.45), (0, r * 1.5)]
            c.lathe(f"{name}_dome_{k}", dome, MARBLE, 40, (x, yy, 16))


CAMERAS = {
    # name: (location, target, lens)
    "front": ((0, -235, 15), (0, 0, 32), 55),
    "hero": ((155, -160, 32), (0, 0, 26), 45),
    "side": ((240, 0, 15), (0, 0, 32), 55),
    "rear": ((0, 235, 15), (0, 0, 32), 55),
    "elevated": ((150, -160, 125), (0, 0, 18), 45),
    "dome": ((55, -108, 52), (0, 0, 52), 62),
    "minaret": ((70, -96, 34), (MIN_C, -MIN_C, PL_H + 30), 58),
    "facade": ((0, -78, 16), (0, -29, 17), 40),
    "inlay": ((7, -42, 20), (0, -29.2, 21), 50),
}


def look_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def setup_presentation():
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
    nt.links.new(sky.outputs["Color"], nt.nodes["Background"].inputs["Color"])
    nt.nodes["Background"].inputs["Strength"].default_value = 0.32
    # Studio backdrop: camera rays see charcoal, everything else is lit by the sky.
    backdrop = nt.nodes.new("ShaderNodeBackground")
    backdrop.inputs["Color"].default_value = (0.045, 0.047, 0.05, 1)
    path = nt.nodes.new("ShaderNodeLightPath")
    mix = nt.nodes.new("ShaderNodeMixShader")
    mix.name = "studio_mix"
    nt.links.new(path.outputs["Is Camera Ray"], mix.inputs[0])
    nt.links.new(nt.nodes["Background"].outputs[0], mix.inputs[1])
    nt.links.new(backdrop.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], nt.nodes["World Output"].inputs["Surface"])

    def light(name, kind, energy, rot, color=(1, 1, 1), angle=1.0):
        obj = bpy.data.objects.new(name, bpy.data.lights.new(name, kind))
        obj.data.energy = energy
        obj.data.color = color
        if kind == "SUN":
            obj.data.angle = math.radians(angle)
        obj.rotation_euler = tuple(math.radians(r) for r in rot)
        c._state["collection"].objects.link(obj)
        return obj

    light("Sun", "SUN", 4.0, (54, 0, -42), (1.0, 0.95, 0.88), 0.8)
    light("Fill", "SUN", 0.6, (70, 0, 140), (0.85, 0.9, 1.0), 8.0)   # soft cool fill from behind-left

    for name, (loc, target, lens) in CAMERAS.items():
        cam = bpy.data.objects.new(f"cam_{name}", bpy.data.cameras.new(f"cam_{name}"))
        cam.location = loc
        cam.data.lens = lens
        cam.data.clip_end = 3000
        look_at(cam, target)
        c._state["collection"].objects.link(cam)
    scene.camera = bpy.data.objects["cam_hero"]

    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.eevee.taa_render_samples = int(ARGS["samples"])
    scene.eevee.use_raytracing = True
    scene.eevee.use_shadows = True
    for attr, val in (("use_gtao", True), ("gtao_distance", 1.5)):
        if hasattr(scene.eevee, attr):
            setattr(scene.eevee, attr, val)
    scene.render.resolution_x = int(ARGS["res"])
    scene.render.resolution_y = int(int(ARGS["res"]) * 9 / 16)
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.exposure = -0.1
    try:
        scene.view_settings.look = "AgX - Base Contrast"
    except TypeError:
        pass


def use_setting(name):
    """Toggle which presentation collection renders: 'studio' or 'garden'."""
    mix = bpy.context.scene.world.node_tree.nodes["studio_mix"]
    mix.inputs[0].default_value = 0.0
    links = bpy.context.scene.world.node_tree.links
    if name != "studio":  # garden: camera sees the real sky
        for link in list(mix.inputs[0].links):
            links.remove(link)
    for coll_name, visible in (("Stage", name == "studio"), ("Env_Garden", name == "garden")):
        coll = bpy.data.collections.get(coll_name)
        if coll:
            coll.hide_render = not visible
            for o in coll.objects:
                o.hide_render = not visible
                o.hide_viewport = not visible


def render_all(outdir, setting):
    outdir = Path(outdir).resolve()
    outdir.mkdir(parents=True, exist_ok=True)
    wanted = [n for n in str(ARGS["cameras"]).split(",") if n] or list(CAMERAS)
    scene = bpy.context.scene
    for name in wanted:
        scene.camera = bpy.data.objects[f"cam_{name}"]
        scene.render.filepath = str(outdir / f"taj_{setting}_{name}.png")
        bpy.ops.render.render(write_still=True)
        print(f"[virasat] rendered {scene.render.filepath}")


# ==================================================================
# Build
# ==================================================================
build_plinth()
build_mausoleum()
build_ornament()
build_dome()
build_chhatris()
build_minarets()
if not ARGS["no_env"]:
    build_stage()
    build_garden()
c.assign_box_uvs()
setup_presentation()
use_setting(ARGS["setting"])

monument = c.objects_in("Taj_")
print(f"[virasat] monument: {len(monument)} objects, {c.triangle_count(monument)} tris")
if ARGS["blend"]:
    c.save_blend(ARGS["blend"])
if ARGS["renders"]:
    render_all(ARGS["renders"], ARGS["setting"])
if not ARGS["no_export"]:
    joined = c.join_by_material(monument, "taj_mahal")
    c.export_glb(ARGS["out"], joined, draco=not ARGS["no_draco"])
