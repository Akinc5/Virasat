"""
Architectural building blocks: Mughal arches, wall-face frames, arch
mouldings and spandrel panels. All return (verts, faces) like common.py.

A Frame places 2D façade coordinates on a wall:
  u = along the wall (metres, 0 at the wall's centre line)
  v = height (absolute Z)
  d = depth out of the wall (positive = towards the viewer)
"""

import math

import common as c


class Frame:
    def __init__(self, angle, distance, origin=(0.0, 0.0)):
        self.n = (math.cos(angle), math.sin(angle))
        self.t = (-self.n[1], self.n[0])
        self.angle = angle
        self.distance = distance
        self.origin = origin

    def world(self, u, v, d=0.0):
        (nx, ny), (tx, ty), (ox, oy) = self.n, self.t, self.origin
        k = self.distance + d
        return (ox + nx * k + tx * u, oy + ny * k + ty * u, v)

    def shifted(self, u):
        """Same wall, with u=0 moved to `u` (for off-centre bays)."""
        ox, oy = self.origin
        return Frame(self.angle, self.distance, (ox + self.t[0] * u, oy + self.t[1] * u))

    def extrude(self, outline, d0, d1):
        return c._extrude(outline, self.world, d0, d1)

    def loft(self, sections):
        return c._loft(sections, self.world)

    def uv(self, u0=0.0, v0=0.0, tile_u=1.0, tile_v=1.0, rotate=False):
        """Planar UV in façade space (for inlay panels, bands, jali)."""
        (ox, oy), (tx, ty) = self.origin, self.t

        def fn(co, _n):
            u = (co.x - ox) * tx + (co.y - oy) * ty
            a, b = (u - u0) / tile_u, (co.z - v0) / tile_v
            return (b, a) if rotate else (a, b)
        return fn


# ------------------------------------------------------------------
# Arches
# ------------------------------------------------------------------


def arch_rise(width, sharpness=0.8):
    radius = width * sharpness
    cx = width / 2 - radius
    return radius * math.sin(math.acos(-cx / radius))


def arch_curve(width, spring, base=0.0, steps=10, sharpness=0.8):
    """
    Two-centred pointed arch, from the left foot up and over to the right foot:
    [(-w/2, base), (-w/2, spring) … apex … (w/2, spring), (w/2, base)].
    `spring` is measured from `base`.
    """
    hw = width / 2
    radius = width * sharpness
    cx = hw - radius
    a_end = math.acos(-cx / radius)
    right = [(cx + radius * math.cos(a_end * i / steps),
              base + spring + radius * math.sin(a_end * i / steps)) for i in range(steps + 1)]
    apex = (0.0, right[-1][1])
    left = [(-u, v) for u, v in right[:-1]]
    return [(-hw, base)] + left + [apex] + list(reversed(right[:-1])) + [(hw, base)]


def cusped_arch_curve(width, spring, base=0.0, lobes=5, depth=0.07, steps=24, sharpness=0.75):
    """
    Multifoil (cusped) Mughal arch: the pointed arch with `lobes` scallops,
    their cusps pointing inwards. Same point order as arch_curve.
    """
    pts = arch_curve(width, spring, base, steps, sharpness)
    arc = pts[1:-1]
    n = len(arc)
    cx, cy = 0.0, base + spring * 0.75
    out = []
    for i, (u, v) in enumerate(arc):
        t = i / (n - 1)
        cusp = depth * width * (1 - abs(math.sin(lobes * math.pi * t))) ** 6
        dx, dy = cx - u, cy - v
        dl = math.hypot(dx, dy) or 1
        out.append((u + dx / dl * cusp, v + dy / dl * cusp))
    return [pts[0]] + out + [pts[-1]]


def arch_apex(width, spring, base=0.0, sharpness=0.8):
    return base + spring + arch_rise(width, sharpness)


def recess_cutter(frame, u, width, spring, base, depth, straight, back_width, back_spring, steps=10):
    """
    Half-octagonal Mughal recess: a straight arched mouth, then side walls that
    angle inwards to a narrower, taller-sprung back wall, so the ceiling slopes
    like the semi-domes in the real iwans and alcoves.
    """
    sh = lambda pts: [(x + u, y) for x, y in pts]  # noqa: E731
    front = sh(arch_curve(width, spring, base, steps))
    back = sh(arch_curve(back_width, back_spring, base, steps))
    return frame.loft([(back, -depth), (front, -straight), (front, 0.5)])


def rect(u0, u1, v0, v1):
    return [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]


def arch_ring_geo(frame, width, spring, base, thickness, d0, d1, steps=10, sharpness=0.8):
    """Moulded border following an arch and its jambs down to the base."""
    inner = arch_curve(width, spring, base, steps, sharpness)
    outer_w = width + 2 * thickness
    # Keep the outer arch similar to the inner one so the band has even width.
    outer = arch_curve(outer_w, spring, base, steps, sharpness)
    n = len(inner)
    verts = []
    for d in (d0, d1):
        verts += [frame.world(u, v, d) for u, v in inner]
        verts += [frame.world(u, v, d) for u, v in outer]
    ib0, ob0, ib1, ob1 = 0, n, 2 * n, 3 * n
    faces = []
    for i in range(n - 1):
        j = i + 1
        faces.append((ib1 + i, ob1 + i, ob1 + j, ib1 + j))  # front
        faces.append((ib0 + j, ob0 + j, ob0 + i, ib0 + i))  # back
        faces.append((ib0 + i, ib1 + i, ib1 + j, ib0 + j))  # inner reveal
        faces.append((ob0 + j, ob1 + j, ob1 + i, ob0 + i))  # outer edge
    for i in (0, n - 1):  # feet
        faces.append((ib0 + i, ob0 + i, ob1 + i, ib1 + i))
    return verts, faces


def spandrel_outlines(width, spring, base, half_w, top, steps=10, sharpness=0.8):
    """Left/right panels filling the rectangle (alfiz) above an arch."""
    curve = arch_curve(width, spring, base, steps, sharpness)
    mid = len(curve) // 2
    left_arc = curve[1:mid + 1]           # (-w/2, spring) … apex
    v_spring = base + spring
    left = [(-half_w, v_spring)] + left_arc + [(0.0, top), (-half_w, top)]
    right = [(-u, v) for u, v in left]
    return left, right


def rect_frame_geo(frame, u0, u1, v0, v1, w, d0, d1):
    """Thin rectangular border (four strips)."""
    b = c.MeshBuilder()
    for r in (rect(u0, u1, v0, v0 + w), rect(u0, u1, v1 - w, v1),
              rect(u0, u0 + w, v0, v1), rect(u1 - w, u1, v0, v1)):
        b.add(frame.extrude(r, d0, d1))
    return b.verts, b.faces
