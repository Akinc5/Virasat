"""
Konark Sun Temple, Odisha — procedural reconstruction of the surviving complex.

The temple is conceived as Surya's chariot facing east: a high platform (pitha)
carved with 24 wheels and drawn by seven horses, carrying the jagamohana
(audience hall, the surviving pidha-roofed tower) and the ruined base of the
deul (sanctuary, collapsed) with its Surya shrines. The natya mandapa (dance
hall) stands apart to the east as a roofless pillared platform.

Original geometry from code, khondalite textures from lib/motifs.py;
references are photographs and published figures (see blender/README.md).

Run (from the repo root):
  blender -b --factory-startup -P blender/monuments/konark.py -- \
      [--out public/models/konark.glb] [--blend PATH] [--renders DIR] \
      [--cameras hero,wheel] [--samples 64] [--res 1920] [--no-env] [--no-export]

Axes: +X = east (the chariot's direction), Z up, metres.
"""

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "lib"))
import arch as a  # noqa: E402
import common as c  # noqa: E402
import presentation as pres  # noqa: E402
import textures as tx  # noqa: E402

BLENDER_DIR = Path(__file__).resolve().parents[1]
ARGS = c.parse_args({
    "out": "public/models/konark.glb",
    "blend": str(BLENDER_DIR / "out" / "Konark_Sun_Temple.blend"),
    "renders": "", "cameras": "", "samples": "64", "res": "1920",
    "no_env": False, "no_export": False, "no_draco": False, "retex": False,
})

# ==================================================================
# Parameters (metres) — see README "Konark assumptions"
# ==================================================================
PITHA_H = 4.5                      # chariot platform height
JAG_HALF_PITHA = 21.0              # jagamohana part of the platform (42 m square)
DEUL_X, DEUL_HALF_PITHA = -38.0, 17.0
JAG_BADA_HALF = 14.0               # jagamohana wall (bada) half-width
DEUL_BADA_HALF = 12.0
RATHA = (0.0, 0.5, 1.1)            # pancharatha projection depths: kanika, anuratha, raha
WHEEL_R, WHEEL_T = 1.5, 0.4        # wheels ~3 m across
WHEEL_Z = 0.5 + WHEEL_R + 0.05
MANDAPA_X, MANDAPA_HALF, MANDAPA_H = 46.0, 10.0, 4.0
FACES = {"E": 0.0, "N": math.pi / 2, "W": math.pi, "S": -math.pi / 2}

c.reset_scene()
TEX = tx.build_all(BLENDER_DIR / "out" / "textures", regenerate=bool(ARGS["retex"]))
STONE = c.material("khondalite", image=TEX["khondalite"], roughness=0.85, tile=5.0, bump=0.25)
CARVED = c.material("khondalite_carved", image=TEX["relief"], roughness=0.85, tile=4.0, bump=0.35)
DARK = c.material("khondalite_weathered", image=TEX["khondalite"], roughness=0.9, tile=3.0, bump=0.3)
CHLORITE = c.material("green_chlorite", (0.10, 0.13, 0.11), roughness=0.35, bump=0.15)


# ------------------------------------------------------------------
# Plan helpers
# ------------------------------------------------------------------
def ratha_plan(half, depths=RATHA, k1=0.55, k2=0.28):
    """
    Pancharatha (five-projection) square plan, CCW: corner (kanika) bays, then
    anuratha and the central raha stepping outwards on every face.
    """
    d0, d1, d2 = depths
    h = half
    side = [(-h, -h - d0), (-k1 * h, -h - d0), (-k1 * h, -h - d1), (-k2 * h, -h - d1), (-k2 * h, -h - d2),
            (k2 * h, -h - d2), (k2 * h, -h - d1), (k1 * h, -h - d1), (k1 * h, -h - d0)]
    out = []
    for k in range(4):
        ca, sa = math.cos(k * math.pi / 2), math.sin(k * math.pi / 2)
        out += [(x * ca - y * sa, x * sa + y * ca) for x, y in side]
    return out


def scaled(depths, f):
    return tuple(d * f for d in depths)


def plan_prism(name, half, z0, z1, mat, cx=0.0, depths=RATHA):
    return c.mesh_object(name, c.prism_geo(ratha_plan(half, depths), z0, z1, (cx, 0)), mat)


def pitha_outline(e=0.0):
    """Chariot platform: jagamohana square + narrower deul square to the west."""
    j, d, x0 = JAG_HALF_PITHA + e, DEUL_HALF_PITHA + e, DEUL_X - DEUL_HALF_PITHA - e
    xj = -JAG_HALF_PITHA - e
    return [(x0, -d), (xj, -d), (xj, -j), (j, -j), (j, j), (xj, j), (xj, d), (x0, d)]


def transform(geo, fn):
    verts, faces = geo
    return [fn(*v) for v in verts], faces


def statue_geo(x, y, z, s=1.0):
    """Abstracted standing figure (musician/attendant) on a pedestal."""
    prof = [(0.5, 0), (0.5, 0.3), (0.35, 0.35), (0.36, 0.9), (0.42, 1.45), (0.3, 1.8), (0.14, 1.9),
            (0.22, 2.05), (0.2, 2.3), (0, 2.4)]
    return c.lathe_geo([(r * s, h * s) for r, h in prof], 12, (x, y, z))


# ==================================================================
# 1. Chariot platform (pitha) with 24 wheels
# ==================================================================
def wheel_geo(cx, face_y, s):
    """
    Carved chariot wheel in a local frame (u along X, v up, w out of the wall),
    mapped so that its axle points away from the wall on the north (s=+1) or
    south (s=-1) face. Mirroring u keeps the winding (normals) correct.
    """
    b = c.MeshBuilder()
    R, T = WHEEL_R, WHEEL_T
    b.add(c.ring_prism_geo(c.regular_polygon(R, 48), c.regular_polygon(R - 0.2, 48), 0, T))
    b.add(c.ring_prism_geo(c.regular_polygon(R + 0.04, 48), c.regular_polygon(R - 0.06, 48), T, T + 0.06))
    b.add(c.lathe_geo([(0.45, 0), (0.45, T + 0.05), (0.32, T + 0.2), (0.14, T + 0.28), (0, T + 0.3)], 20))
    for k in range(8):
        ang = k * math.pi / 4
        rc = (R - 0.1 + 0.4) / 2
        b.add(c.oriented_box_geo((rc * math.cos(ang), rc * math.sin(ang), 0.05), ang, R - 0.45, 0.24, T - 0.1))
        # Medallion halfway along each major spoke.
        b.add(c.lathe_geo([(0.15, T - 0.05), (0.15, T + 0.02), (0.08, T + 0.05), (0, T + 0.06)], 12,
                          (0.85 * math.cos(ang), 0.85 * math.sin(ang), 0)))
        ang2 = ang + math.pi / 8
        b.add(c.oriented_box_geo((rc * math.cos(ang2), rc * math.sin(ang2), 0.08), ang2, R - 0.45, 0.1, T - 0.18))
    y0 = s * (face_y + 0.35)
    return transform((b.verts, b.faces), lambda u, v, w: (cx - s * u, y0 + s * w, WHEEL_Z + v))


def build_pitha():
    c.use_collection("Konark_Pitha")
    c.mesh_object("pitha_base_course", c.prism_geo(pitha_outline(0.8), 0, 0.5), STONE)
    c.mesh_object("pitha_khura", c.prism_geo(pitha_outline(0.3), 0.5, 0.8), STONE)
    c.mesh_object("pitha_body", c.prism_geo(pitha_outline(0.0), 0.0, PITHA_H), CARVED)
    c.mesh_object("pitha_band", c.prism_geo(pitha_outline(0.25), 3.7, 3.95), STONE)
    c.mesh_object("pitha_cornice", c.prism_geo(pitha_outline(0.5), PITHA_H - 0.4, PITHA_H), STONE)

    wheels = c.MeshBuilder()
    for s in (-1, 1):
        for x in (-17.0, -11.5, -6.0, 6.0, 11.5, 17.0):  # clear of the north/south stairs
            wheels.add(wheel_geo(x, JAG_HALF_PITHA, s))
        span = 2 * DEUL_HALF_PITHA
        for k in range(6):
            x = DEUL_X - DEUL_HALF_PITHA + span / 6 * (k + 0.5)
            wheels.add(wheel_geo(x, DEUL_HALF_PITHA, s))
    wheels.build("chariot_wheels", CARVED)

    # Staircases: main flight on the east, smaller ones north and south.
    steps = c.MeshBuilder()
    j = JAG_HALF_PITHA

    def flight(along, half_w, n=9):
        for i in range(n):
            run = (n - i) * 0.7
            z = (i + 1) * PITHA_H / n
            if along == "E":
                steps.add(c.box_geo((run, 2 * half_w, z), (j + run / 2, 0, z / 2)))
            else:
                sg = 1 if along == "N" else -1
                steps.add(c.box_geo((2 * half_w, run, z), (0, sg * (j + run / 2), z / 2)))
        L = n * 0.7
        for side in (-1, 1):
            wall = [(0, 0), (L + 0.6, 0), (L + 0.6, 1.0), (0, PITHA_H + 0.9)]
            if along == "E":
                steps.add(c._extrude(wall, lambda u, v, d: (j + u, d, v),
                                     side * half_w + (0 if side > 0 else -0.8), side * half_w + (0.8 if side > 0 else 0)))
            else:
                sg = 1 if along == "N" else -1
                steps.add(c._extrude(wall, lambda u, v, d, sg=sg: (-d if sg > 0 else d, sg * (j + u), v),
                                     side * half_w + (0 if side > 0 else -0.8), side * half_w + (0.8 if side > 0 else 0)))

    flight("E", 4.0)
    flight("N", 3.0, 8)
    flight("S", 3.0, 8)
    steps.build("stairs", STONE)


# ==================================================================
# 2. Jagamohana: pancharatha walls, doorways, three-tier pidha roof
# ==================================================================
def bada(prefix, half, cx, top, carved_mat=CARVED):
    """Wall body: moulded base (pabhaga), two carved registers (jangha), cornice."""
    z = PITHA_H
    layers = [(0.5, 0.5, STONE), (0.25, 0.4, STONE), (0.45, 0.5, STONE)]
    for i, (e, hgt, mat) in enumerate(layers):
        plan_prism(f"{prefix}_pabhaga_{i}", half + e, z, z + hgt, mat, cx)
        z += hgt
    span = top - z - 1.6
    plan_prism(f"{prefix}_jangha_low", half, z, z + span / 2, carved_mat, cx)
    plan_prism(f"{prefix}_bandhana", half + 0.3, z + span / 2, z + span / 2 + 0.5, STONE, cx)
    plan_prism(f"{prefix}_jangha_high", half, z + span / 2 + 0.5, top - 1.1, carved_mat, cx)
    plan_prism(f"{prefix}_baranda_0", half + 0.4, top - 1.1, top - 0.5, STONE, cx)
    plan_prism(f"{prefix}_baranda_1", half + 0.6, top - 0.5, top, STONE, cx)


def doorway(b_frame, b_fill, fr, z0, width, height):
    """Projecting stepped doorframe with carved bands; the opening is stone-filled, as today."""
    for i, (inset, d) in enumerate(((0.0, 0.8), (0.55, 0.6), (1.1, 0.4))):
        b_frame.add(a.rect_frame_geo(fr, -width / 2 - 1.6 + inset, width / 2 + 1.6 - inset, z0,
                                     z0 + height + 1.6 - inset, 0.6, 0.0, d))
    b_fill.add(fr.extrude(a.rect(-width / 2, width / 2, z0, z0 + height), -0.1, 0.15))
    # Lintel cornice above the frame.
    b_frame.add(fr.extrude(a.rect(-width / 2 - 2.0, width / 2 + 2.0, z0 + height + 1.6, z0 + height + 2.1), 0, 1.1))


def build_jagamohana():
    c.use_collection("Konark_Jagamohana")
    top = 14.5
    bada("jag", JAG_BADA_HALF, 0.0, top)
    frames, fills = c.MeshBuilder(), c.MeshBuilder()
    for f in ("E", "N", "S"):
        fr = a.Frame(FACES[f], JAG_BADA_HALF + RATHA[2])
        doorway(frames, fills, fr, PITHA_H + 1.4, 4.6, 6.2)
    frames.build("jag_doorframes", CARVED)
    fills.build("jag_door_infill", STONE)

    # Pidha roof: three tiers of sloped slabs separated by statue terraces.
    slabs, cores, statues = c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder()
    half, z = JAG_BADA_HALF - 0.6, top
    tiers = [6, 5, 4]
    for t, count in enumerate(tiers):
        for _ in range(count):
            f = half / JAG_BADA_HALF
            dep = scaled(RATHA, f)
            sections = [(ratha_plan(half, dep), z), (ratha_plan(half + 0.35, dep), z + 0.22),
                        (ratha_plan(half + 0.35, dep), z + 0.42), (ratha_plan(half - 0.35, dep), z + 0.72)]
            slabs.add(c._loft(sections, lambda u, v, d: (u, v, d)))
            cores.add(c.prism_geo(ratha_plan(half - 0.7, dep), z, z + 1.02))
            z += 1.0
            half -= 0.5
        if t < len(tiers) - 1:
            # Terrace with standing figures on its rim, recessed core behind them.
            dep = scaled(RATHA, half / JAG_BADA_HALF)
            slabs.add(c.prism_geo(ratha_plan(half + 0.2, dep), z, z + 0.35))
            core_h = 2.6 if t == 0 else 2.3
            cores.add(c.prism_geo(ratha_plan(half - 1.9, dep), z, z + core_h + 0.05))
            r_fig = half - 0.6
            for k in range(4):
                ang = FACES[["E", "N", "W", "S"][k]]
                ca, sa = math.cos(ang), math.sin(ang)
                for u in (-0.55 * r_fig, 0.0, 0.55 * r_fig):
                    statues.add(statue_geo(ca * r_fig - sa * u, sa * r_fig + ca * u, z + 0.35, 1.05))
                cx_, cy_ = r_fig * (ca - sa), r_fig * (sa + ca)
                statues.add(statue_geo(cx_ * 0.97, cy_ * 0.97, z + 0.35, 1.15))
            z += core_h
            half -= 0.9
    slabs.build("pidha_slabs", STONE)
    cores.build("pidha_cores", DARK)
    statues.build("terrace_figures", DARK, smooth=True)

    # Crown: beki (neck), ghanta (bell), amalaka (ribbed disc), kalasha.
    crown = c.MeshBuilder()
    dep = scaled(RATHA, half / JAG_BADA_HALF)
    crown.add(c.prism_geo(ratha_plan(half * 0.62, dep), z, z + 0.8))
    z += 0.8
    hb = half * 0.95
    crown.add(c.lathe_geo([(hb, 0), (hb * 1.06, 0.45), (hb * 0.97, 1.5), (hb * 0.72, 2.3), (hb * 0.42, 2.75),
                           (hb * 0.3, 2.85)], 48, (0, 0, z), caps=True))
    z += 2.8
    crown.add(c.lathe_geo([(hb * 0.32, 0), (hb * 0.24, 0.3)], 32, (0, 0, z), caps=False))
    crown.add(c.lathe_geo([(hb * 0.24, 0.3), (hb * 0.55, 0.55), (hb * 0.62, 1.0), (hb * 0.55, 1.45),
                           (hb * 0.22, 1.7), (0, 1.75)], 96, (0, 0, z), petals=32, petal_depth=0.1))
    z += 1.7
    crown.add(c.lathe_geo([(0.0, 0), (0.7, 0.05), (0.9, 0.5), (0.5, 0.9), (0.6, 1.2), (0.15, 1.5), (0, 1.8)],
                          24, (0, 0, z)))
    crown.build("jag_crown", STONE, smooth=True, sharp_angle=35)
    print(f"[virasat] jagamohana height {z + 1.8:.1f} m")


# ==================================================================
# 3. Deul: ruined sanctuary base with Surya shrines
# ==================================================================
def build_deul():
    c.use_collection("Konark_Deul")
    cx = DEUL_X
    # Moulded base layers, then a single carved wall prism that we break open.
    z = PITHA_H
    for i, (e, hgt) in enumerate(((0.5, 0.5), (0.25, 0.4), (0.45, 0.5))):
        plan_prism(f"deul_pabhaga_{i}", DEUL_BADA_HALF + e, z, z + hgt, STONE, cx)
        z += hgt
    wall = plan_prism("deul_wall", DEUL_BADA_HALF, z, z + 9.0, CARVED, cx)
    # Hollow sanctum, then broken wall tops — each cut applied on its own, since
    # overlapping cutters inside one mesh confuse the exact boolean solver.
    cuts = [c.box_geo((2 * DEUL_BADA_HALF - 5.0, 2 * DEUL_BADA_HALF - 5.0, 20), (cx, 0, z + 2.0 + 10))]
    for (bx, by, bz, sx, sy, ang) in ((-7, 4, 12.6, 16, 12, 0.3), (5, -6, 13.6, 14, 12, -0.4),
                                      (-4, -9, 11.8, 12, 9, 0.6), (8, 8, 14.2, 10, 10, 0.2)):
        cuts.append(c.oriented_box_geo((cx + bx, by, bz), ang, sx, sy, 12))
    for i, g in enumerate(cuts):
        c.apply_boolean(wall, c.mesh_object(f"deul_ruin_cut_{i}", g, DARK))

    # Surya shrines in the north, south and west raha, chlorite figures in niches.
    frames, fills, figs = c.MeshBuilder(), c.MeshBuilder(), c.MeshBuilder()
    for f in ("N", "S", "W"):
        fr = a.Frame(FACES[f], DEUL_BADA_HALF + RATHA[2], (cx, 0))
        doorway(frames, fills, fr, PITHA_H + 1.8, 3.4, 5.0)
        x, y, _ = fr.world(0, 0, 0.75)
        figs.add(c.box_geo((1.6, 1.6, 0.5), (x, y, PITHA_H + 1.8 + 0.25)))
        figs.add(statue_geo(x, y, PITHA_H + 2.3, 1.75))
    frames.build("deul_shrine_frames", CARVED)
    fills.build("deul_shrine_backs", DARK)
    figs.build("surya_images", CHLORITE, smooth=True)


# ==================================================================
# 4. Natya mandapa: roofless pillared dance hall
# ==================================================================
def build_mandapa():
    c.use_collection("Konark_Mandapa")
    cx, h = MANDAPA_X, MANDAPA_HALF
    dep = (0.0, 0.4, 0.9)
    plan_prism("mandapa_base", h + 0.7, 0, 0.5, STONE, cx, dep)
    plan_prism("mandapa_body", h, 0, MANDAPA_H, CARVED, cx, dep)
    plan_prism("mandapa_band", h + 0.25, 2.2, 2.45, STONE, cx, dep)
    plan_prism("mandapa_cornice", h + 0.45, MANDAPA_H - 0.4, MANDAPA_H, STONE, cx, dep)
    steps = c.MeshBuilder()
    for sg in (-1, 1):
        x_face = cx + sg * (h + dep[2])
        for i in range(8):
            run = (8 - i) * 0.6
            zz = (i + 1) * MANDAPA_H / 8
            steps.add(c.box_geo((run, 6.0, zz), (x_face + sg * run / 2, 0, zz / 2)))
    steps.build("mandapa_stairs", STONE)
    shafts, caps = c.MeshBuilder(), c.MeshBuilder()
    heights = [5.6, 5.6, 4.1, 5.6, 5.6, 3.2, 5.6, 5.6, 5.6, 5.6, 2.4, 5.6, 4.8, 5.6, 5.6, 5.6]
    k = 0
    for gx in (-7.5, -2.5, 2.5, 7.5):
        for gy in (-7.5, -2.5, 2.5, 7.5):
            hgt = heights[k]
            k += 1
            x, y = cx + gx, gy
            caps.add(c.box_geo((1.6, 1.6, 0.5), (x, y, MANDAPA_H + 0.25)))
            shafts.add(c.prism_geo(c.chamfered_square(0.55, 0.15), MANDAPA_H + 0.5, MANDAPA_H + hgt, (x, y)))
            if hgt > 5.0:  # intact pillars keep their bracket capitals
                caps.add(c.box_geo((1.5, 1.5, 0.35), (x, y, MANDAPA_H + hgt + 0.17)))
                caps.add(c.box_geo((2.0, 2.0, 0.3), (x, y, MANDAPA_H + hgt + 0.5)))
    shafts.build("mandapa_pillars", CARVED)
    caps.build("mandapa_pillar_caps", STONE)


# ==================================================================
# 5. The seven horses
# ==================================================================
def _spline(pts, n=12):
    """Catmull-Rom resample so swept tubes read as smooth anatomy."""
    out = []
    ext = [pts[0]] + list(pts) + [pts[-1]]
    for k in range(1, len(ext) - 2):
        p0, p1, p2, p3 = ext[k - 1], ext[k], ext[k + 1], ext[k + 2]
        for i in range(n):
            t = i / n
            out.append(tuple(0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * t + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t * t
                                    + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * t ** 3) for d in range(3)))
    out.append(pts[-1])
    return out


def horse_geo(x, y, s=1.75, stride=1.0):
    """
    Stylised harnessed horse built from spline-swept tubes, facing +X:
    barrel, chest, arched neck with mane, head with muzzle and ears,
    legs with hooves, tail, and a caparison band — on a plinth.
    """
    b = c.MeshBuilder()

    def tube(pts, radii, sides=14, n=8):
        sp = _spline(pts, n)
        rr = [radii[min(int(i / len(sp) * len(radii)), len(radii) - 1)] for i in range(len(sp))]
        # Smooth the radius steps too.
        rr = [sum(rr[max(0, i - 3):i + 4]) / len(rr[max(0, i - 3):i + 4]) for i in range(len(rr))]
        b.add(c.tube_geo([(x + px * s, y + py * s, pz * s) for px, py, pz in sp], [r * s for r in rr], sides))

    tube([(-1.15, 0, 1.6), (-0.8, 0, 1.68), (-0.2, 0, 1.62), (0.4, 0, 1.66), (0.85, 0, 1.78), (1.05, 0, 1.85)],
         [0.28, 0.42, 0.46, 0.46, 0.44, 0.36], 18)
    tube([(0.8, 0, 1.85), (1.05, 0, 2.2), (1.2, 0, 2.55), (1.32, 0, 2.72)], [0.34, 0.27, 0.22, 0.19])
    tube([(0.82, 0, 2.05), (1.0, 0, 2.45), (1.14, 0, 2.78)], [0.08, 0.1, 0.06], 6)               # mane crest
    tube([(1.28, 0, 2.76), (1.5, 0, 2.6), (1.72, 0, 2.32), (1.8, 0, 2.22)], [0.2, 0.17, 0.13, 0.11])
    for ey in (-0.07, 0.07):
        tube([(1.25, ey, 2.85), (1.22, ey, 3.0)], [0.05, 0.02], 6, 3)                        # ears
    tube([(-0.72, 0, 1.64), (-0.52, 0, 1.64)], [0.5, 0.5], 18, 2)                               # caparison band
    legs = ((0.72, 0.2, 0.35), (0.72, -0.2, -0.1), (-0.85, 0.2, -0.25), (-0.85, -0.2, 0.2))
    for lx, ly, sw in legs:
        sw *= stride
        tube([(lx, ly, 1.45), (lx + sw * 0.3, ly, 1.0), (lx + sw * 0.55, ly, 0.55), (lx + sw * 0.6, ly, 0.12)],
             [0.14, 0.1, 0.075, 0.07], 10)
        b.add(c.lathe_geo([(0.1, 0), (0.1, 0.12), (0.07, 0.16)], 10,
                          (x + (lx + sw * 0.6) * s, y + ly * s, 0.52)))                        # hoof
    tube([(-1.15, 0, 1.75), (-1.4, 0, 1.55), (-1.5, 0, 1.1), (-1.45, 0, 0.8)], [0.11, 0.1, 0.08, 0.05], 8)
    b.add(c.box_geo((4.2, 1.4, 0.5), (x, y, 0.25)))  # plinth
    return b.verts, b.faces


def build_horses():
    c.use_collection("Konark_Horses")
    horses = c.MeshBuilder()
    xh = JAG_HALF_PITHA + 6.6
    for k, y in enumerate((-6.4, -9.2, -12.0, 6.4, 9.2, 12.0, 14.8)):
        horses.add(horse_geo(xh + (k % 2) * 0.4, y, stride=1.0 if k % 2 else 0.8))
    horses.build("seven_horses", DARK, smooth=True, sharp_angle=60)


# ==================================================================
# Presentation
# ==================================================================
CAMERAS = {
    "hero": ((95, -110, 40), (2, 0, 12), 35),
    "front": ((150, 0, 14), (2, 0, 14), 42),
    "side": ((2, -150, 14), (2, 0, 14), 40),
    "elevated": ((95, -105, 100), (0, 0, 4), 35),
    "tower": ((42, -46, 28), (0, 0, 24), 45),
    "wheel": ((16.5, -29, 3.0), (11.5, -21.8, 2.1), 50),
    "horses": ((42, -30, 7), (27.6, -9, 2.5), 38),
    "mandapa": ((72, -32, 16), (46, 0, 6), 40),
}

build_pitha()
build_jagamohana()
build_deul()
build_mandapa()
build_horses()
if not ARGS["no_env"]:
    ground = c.material("lawn_ground", (0.12, 0.15, 0.08), roughness=0.95)
    pres.build_stage(ground, (150, 70, 3, 0))
c.assign_box_uvs()
pres.setup(CAMERAS, ARGS["samples"], ARGS["res"], sun_rot=(52, 0, -48))
pres.use_setting("studio")

monument = c.objects_in("Konark_")
print(f"[virasat] monument: {len(monument)} objects, {c.triangle_count(monument)} tris")
if ARGS["blend"]:
    c.save_blend(ARGS["blend"])
if ARGS["renders"]:
    pres.render_all(ARGS["renders"], "konark", CAMERAS, ARGS["cameras"])
if not ARGS["no_export"]:
    joined = c.join_by_material(monument, "konark")
    c.export_glb(ARGS["out"], joined, draco=not ARGS["no_draco"])
