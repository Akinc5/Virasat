"""
Motif library for Mughal pietra dura and marble inlay (V2).

A small vector-style Canvas stamps antialiased strokes, leaves, flowers and
tulips into a tileable numpy image (all drawing wraps around the edges).
Each motif function below reproduces a *type* of ornament seen on the Taj
Mahal — not a copy of any specific panel:

  arabesque_rgb  spandrel scrollwork: black stems, spiral tendrils, carnelian
                 rosettes, dark-green leaves, yellow buds
  border_rgb     parapet/frieze band: mirrored S-scrolls with tulips
  rosette_rgb    dome-base band: black lozenges with cross-flowers
  arcade_rgb     minaret/drum band: small cusped arcade with hanging tulips
  chevron_rgb    zig-zag black-and-white inlay (pinnacle shafts)
  rope_rgb       twisted black-and-white rope moulding
  railing_rgb    balcony parapet panel with black inlay frame
  ashlar_rgb     coursed marble blocks with per-block tone and veining
"""

import math

import numpy as np

import textures as tx

# Palette sampled by eye from the reference photographs.
STEM = (0.06, 0.06, 0.065)
LEAF = (0.09, 0.19, 0.13)
LEAF_HI = (0.15, 0.27, 0.19)
CARNELIAN = (0.52, 0.10, 0.07)
CARNELIAN_HI = (0.70, 0.24, 0.16)
AGATE = (0.70, 0.40, 0.33)
YELLOW = (0.76, 0.57, 0.24)
MARBLE = (0.93, 0.91, 0.86)


class Canvas:
    def __init__(self, w, h, base_rgb):
        self.w, self.h = w, h
        self.img = base_rgb.astype(np.float32).copy()

    def _window(self, cx, cy, r):
        x0, x1 = int(math.floor(cx - r - 1)), int(math.ceil(cx + r + 1))
        y0, y1 = int(math.floor(cy - r - 1)), int(math.ceil(cy + r + 1))
        xs = np.arange(x0, x1)
        ys = np.arange(y0, y1)
        gx, gy = np.meshgrid(xs.astype(np.float32), ys.astype(np.float32))
        return np.ix_(ys % self.h, xs % self.w), gx - cx, gy - cy

    def _blend(self, idx, cov, color):
        cov = np.clip(cov, 0, 1)[..., None]
        patch = self.img[idx]
        self.img[idx] = patch * (1 - cov) + np.array(color, np.float32) * cov

    def disc(self, cx, cy, r, color):
        idx, dx, dy = self._window(cx, cy, r)
        self._blend(idx, r - np.sqrt(dx * dx + dy * dy) + 0.5, color)

    def stroke(self, pts, width, color, taper=False):
        """Polyline stroke; `taper` thins the end (tendril tips)."""
        n = len(pts)
        for i in range(n - 1):
            (x0, y0), (x1, y1) = pts[i], pts[i + 1]
            seg = math.hypot(x1 - x0, y1 - y0)
            steps = max(1, int(seg / max(width * 0.35, 0.5)))
            for s in range(steps):
                t = s / steps
                w = width * (1 - 0.7 * (i + t) / n) if taper else width
                self.disc(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, w / 2, color)

    def leaf(self, cx, cy, angle, length, width, color=LEAF, bend=0.25, vein=True):
        """Pointed lanceolate leaf from (cx, cy) along `angle`, slightly curved."""
        r = length + width
        idx, dx, dy = self._window(cx + math.cos(angle) * length / 2,
                                   cy + math.sin(angle) * length / 2, r / 2 + 2)
        ox = cx + math.cos(angle) * length / 2
        oy = cy + math.sin(angle) * length / 2
        dx = dx + (ox - cx) - 0  # back to leaf-base origin
        dy = dy + (oy - cy)
        ca, sa = math.cos(angle), math.sin(angle)
        lx = dx * ca + dy * sa
        ly = -dx * sa + dy * ca
        t = np.clip(lx / length, 0, 1)
        ly = ly - bend * length * t * t
        half = width / 2 * np.clip(np.sin(np.pi * t), 0, 1) ** 0.8
        inside = (half - np.abs(ly) + 0.5) * ((lx > 0) & (lx < length))
        self._blend(idx, inside, color)
        if vein:
            self._blend(idx, (0.8 - np.abs(ly)) * ((lx > length * 0.1) & (lx < length * 0.85)) * 0.6, LEAF_HI)

    def rosette(self, cx, cy, r, petals=8, color=CARNELIAN, centre=YELLOW):
        idx, dx, dy = self._window(cx, cy, r + 2)
        rr = np.sqrt(dx * dx + dy * dy)
        th = np.arctan2(dy, dx)
        edge = r * (0.5 + 0.5 * np.abs(np.cos(petals / 2 * th)) ** 0.7)
        self._blend(idx, edge - rr + 0.5, color)
        self._blend(idx, (edge * 0.62 - rr + 0.5) * 0.55, CARNELIAN_HI)
        self._blend(idx, 0.9 - np.abs(rr - edge), STEM)
        self._blend(idx, r * 0.24 - rr + 0.5, centre)

    def tulip(self, cx, cy, angle, size, color=CARNELIAN):
        """Side-view tulip: three petals fanning from a yellow calyx."""
        for k, spread in enumerate((-0.45, 0.0, 0.45)):
            self.leaf(cx, cy, angle + spread, size * (1.0 if k == 1 else 0.85), size * 0.42,
                      color, bend=0.0, vein=False)
        self.disc(cx, cy, size * 0.16, YELLOW)


def _spiral(cx, cy, r0, turns, direction, start, steps=60, shrink=2.2):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        th = start + direction * turns * 2 * math.pi * t
        r = r0 * math.exp(-shrink * t)
        pts.append((cx + r * math.cos(th), cy + r * math.sin(th)))
    return pts


def arabesque_rgb(size=1024, seed=31):
    """Spandrel scrollwork, tile = 2x2 repeats of a wavy vine with spirals."""
    cv = Canvas(size, size, tx.marble_rgb(size, size, seed, base=MARBLE, veins=0.45))
    P = size / 2
    A = 0.22 * P
    for row in range(2):
        oy = row * P + P / 2
        phase = row * math.pi / 2  # quarter-period offset so spirals interleave
        vine = [(x, oy + A * math.sin(2 * math.pi * x / P + phase)) for x in np.linspace(0, size, 400)]
        cv.stroke(vine, 3.8, STEM)
        for k in range(int(size / (P / 2))):
            x = P / 4 - row * P / 4 + k * P / 2
            crest = 1 if math.sin(2 * math.pi * x / P + phase) > 0 else -1
            y = oy + A * crest
            # Spiral tendril curling away from the crest, rosette at its eye.
            cy = y + crest * 0.24 * P
            spiral = _spiral(x, cy, 0.21 * P, 1.15, crest, -crest * math.pi / 2, steps=70, shrink=1.5)
            cv.stroke([(x, y)] + spiral, 3.0, STEM, taper=True)
            cv.rosette(x, cy, 0.08 * P, 8 if k % 2 == 0 else 6)
            for j, idx in enumerate((10, 24, 38, 50)):
                px, py = spiral[idx]
                qx, qy = spiral[idx + 1]
                tang = math.atan2(qy - py, qx - px)
                side = 1 if j % 2 == 0 else -1
                cv.leaf(px, py, tang + side * 1.1, 0.085 * P, 0.032 * P, bend=0.2 * side)
            fx, fy = spiral[31]
            cv.rosette(fx, fy, 0.035 * P, 5, AGATE)
            for idx in (5, 44):
                bx, by = spiral[idx]
                cv.disc(bx, by, 0.012 * P, YELLOW)
            # Paired leaves and a tulip along the main vine between crests.
            lx = x + P / 8
            ly = oy + A * math.sin(2 * math.pi * lx / P + phase)
            slope = math.atan(A * 2 * math.pi / P * math.cos(2 * math.pi * lx / P + phase))
            cv.leaf(lx, ly, slope - 2.2, 0.10 * P, 0.036 * P)
            cv.leaf(lx, ly, slope + 0.9, 0.10 * P, 0.036 * P)
            tx_ = x - P / 8
            ty_ = oy + A * math.sin(2 * math.pi * tx_ / P + phase)
            cv.tulip(tx_, ty_, -crest * math.pi / 2, 0.075 * P, AGATE if k % 3 == 0 else CARNELIAN)
    return cv.img


def border_rgb(w=1024, h=256, seed=41):
    """Parapet/frieze band: mirrored S-scrolls with tulips between black fillets."""
    cv = Canvas(w, h, tx.marble_rgb(w, h, seed, base=MARBLE, veins=0.3))
    for y in (0.10 * h, 0.90 * h):
        cv.stroke([(0, y), (w, y)], 0.035 * h, STEM)
    for y in (0.18 * h, 0.82 * h):
        cv.stroke([(0, y), (w, y)], 0.012 * h, CARNELIAN)
    p = w / 8
    for k in range(8):
        x0 = k * p
        mid = x0 + p / 2
        for side in (-1, 1):
            # S-scroll: rising curve from the bottom centre curling outwards.
            pts = []
            for i in range(41):
                t = i / 40
                ang = math.pi * 1.6 * t
                rx = side * (0.05 * p + 0.26 * p * math.sin(ang * 0.6))
                ry = 0.66 * h - 0.42 * h * t + 0.06 * h * math.sin(ang * 2)
                pts.append((mid + rx, ry))
            cv.stroke(pts, 0.035 * h, CARNELIAN)
            ex, ey = pts[-1]
            cv.stroke(_spiral(ex + side * 0.05 * p, ey + 0.05 * h, 0.06 * p, 0.8, side, math.pi), 0.025 * h,
                      CARNELIAN, taper=True)
            cv.leaf(mid + side * 0.12 * p, 0.70 * h, -math.pi / 2 + side * 1.1, 0.16 * h, 0.06 * h)
        cv.tulip(mid, 0.70 * h, -math.pi / 2, 0.22 * h)
        cv.disc(x0, 0.5 * h, 0.03 * h, YELLOW)
    return cv.img


def rosette_rgb(w=1024, h=160, seed=51):
    """Dome-base band: black lozenges enclosing four-petal cross flowers."""
    cv = Canvas(w, h, tx.marble_rgb(w, h, seed, base=MARBLE, veins=0.3))
    for y in (0.08 * h, 0.92 * h):
        cv.stroke([(0, y), (w, y)], 0.05 * h, STEM)
    p = w / 10
    for k in range(10):
        cx, cy = k * p + p / 2, h / 2
        r = 0.32 * h
        lozenge = [(cx - r, cy), (cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)]
        cv.stroke(lozenge, 0.035 * h, STEM)
        for i in range(4):
            a = i * math.pi / 2
            cv.leaf(cx, cy, a, 0.22 * h, 0.12 * h, CARNELIAN, bend=0, vein=False)
        cv.disc(cx, cy, 0.05 * h, YELLOW)
        sx = k * p
        for i in range(4):
            cv.leaf(sx, cy, i * math.pi / 2 + math.pi / 4, 0.12 * h, 0.06 * h, LEAF, bend=0, vein=False)
        cv.disc(sx, cy, 0.03 * h, CARNELIAN)
    return cv.img


def arcade_rgb(w=1024, h=256, seed=61):
    """Small cusped arcade in black line with tulips hanging in each bay."""
    cv = Canvas(w, h, tx.marble_rgb(w, h, seed, base=MARBLE, veins=0.3))
    for y in (0.06 * h, 0.94 * h):
        cv.stroke([(0, y), (w, y)], 0.03 * h, STEM)
    p = w / 12
    top, spring = 0.22 * h, 0.55 * h
    for k in range(12):
        x0 = k * p
        arc = []
        for i in range(31):
            t = i / 30
            th = math.pi * (1 - t)
            # Three-lobed arch: semicircle with small inward cusps.
            r = 0.5 * p
            cusp = 0.06 * p * (1 - abs(math.sin(3 * math.pi * t))) ** 4
            arc.append((x0 + p / 2 + (r - cusp) * math.cos(th), spring - (spring - top) * math.sin(th) + cusp * math.sin(th)))
        cv.stroke([(x0, 0.9 * h)] + [(x0, spring)] + arc + [(x0 + p, spring)], 0.025 * h, STEM)
        cv.tulip(x0 + p / 2, 0.40 * h, math.pi / 2, 0.20 * h)
        cv.disc(x0, spring - 0.04 * h, 0.035 * h, YELLOW)
    return cv.img


def chevron_rgb(size=512):
    xx, yy = tx._grid(size, size)
    p = size / 4
    tri = np.abs(((xx / p) % 2) - 1) * p * 0.6
    band = ((yy + tri) % (size / 6)) / (size / 6)
    dark = np.clip((0.32 - np.abs(band - 0.5)) * 18, 0, 1)
    col = tx.marble_rgb(size, size, 71, base=MARBLE, veins=0.2)
    return tx._mix(col, dark, STEM)


def rope_rgb(w=512, h=256):
    xx, yy = tx._grid(w, h)
    f = ((xx / (w / 16) + yy / h * 1.0) % 1.0)
    dark = np.clip((0.18 - np.abs(f - 0.3)) * 25, 0, 1)
    shade = 0.82 + 0.18 * np.sin(np.pi * f)  # rounded strands
    col = np.full((h, w, 3), MARBLE, np.float32) * shade[..., None]
    return tx._mix(col, dark, STEM)


def railing_rgb(w=512, h=256):
    """One parapet panel: marble with a double black inlay frame."""
    col = tx.marble_rgb(w, h, 81, base=MARBLE, veins=0.3)
    xx, yy = tx._grid(w, h)

    def frame(inset, width):
        d = np.minimum.reduce([xx - inset, w - inset - xx, yy - inset * h / w * 2, h - inset * h / w * 2 - yy])
        return np.clip(width - np.abs(d), 0, 1) * (d > -width)

    col = tx._mix(col, frame(0.14 * w, 5), STEM)
    col = tx._mix(col, frame(0.20 * w, 2.5), STEM)
    return col


def ashlar_rgb(size=1024, rows=8, seed=5, joint=(0.36, 0.35, 0.34), base=(0.90, 0.88, 0.83),
               veins=0.9, tone_sd=0.03):
    """
    Coursed stone: random block lengths per course (tileable), each block
    with its own tone, warmth and vein layer, separated by thin dark joints.
    """
    rng = np.random.default_rng(seed)
    layers = [tx.marble_rgb(size, size, seed + i * 7, base=base, veins=veins + 0.3 * i) for i in range(3)]
    out = np.zeros((size, size, 3), np.float32)
    jmask = np.zeros((size, size), np.float32)
    rh = size / rows
    xs = np.arange(size)
    for r in range(rows):
        y0, y1 = int(round(r * rh)), int(round((r + 1) * rh))
        lengths = []
        while sum(lengths) < size:
            lengths.append(rng.uniform(1.2, 2.8) * rh)
        scale = size / sum(lengths)
        offset = rng.uniform(0, size)
        x = offset
        for L in lengths:
            L *= scale
            cols = (np.arange(int(round(x)), int(round(x + L)))) % size
            tone = 1 + rng.normal(0, tone_sd)
            warm = rng.normal(0, 1)
            layer = layers[rng.integers(0, 3)]
            block = layer[y0:y1][:, cols] * tone
            block = block + np.array((0.012, 0.004, -0.012), np.float32) * warm
            out[y0:y1, cols] = block
            jmask[y0:y1, int(round(x)) % size] = 1
            jmask[y0:y1, (int(round(x)) + 1) % size] = 0.6
            x += L
        jmask[y0:y0 + 2, :] = 1
    _ = xs
    return tx._mix(out, jmask * 0.85, joint)


# ------------------------------------------------------------------
# Konark: khondalite stone and carved relief
# ------------------------------------------------------------------
KHONDALITE = (0.50, 0.43, 0.35)


def _weathering(size, seed):
    """Vertical rain streaks and patchy darkening, tileable."""
    streak = tx._fbm(size, size, 2.4, seed)
    streak = np.repeat(streak[::8, :], 8, axis=0)[:size]  # stretch vertically
    patch = tx._fbm(size, size, 2.8, seed + 1)
    return 1 - 0.16 * np.clip(streak - 0.45, 0, 1) * 2 - 0.10 * np.clip(patch - 0.5, 0, 1) * 2


def khondalite_rgb(size=1024, seed=91):
    """Coursed khondalite blocks with weathering (pidha slabs, mouldings)."""
    col = ashlar_rgb(size, rows=6, seed=seed, joint=(0.22, 0.19, 0.16), base=KHONDALITE, veins=0.15,
                     tone_sd=0.06)
    return col * _weathering(size, seed)[..., None]


def relief_rgb(size=1024, seed=95):
    """
    Carved frieze registers for Kalinga walls: rows of niche panels holding
    figure silhouettes, alternating with rosette medallions and scroll bands.
    Rendered as an emboss (shadow below, highlight above) on khondalite.
    A generic evocation of Konark's carving density, not a copy of any panel.
    """
    base = tx.marble_rgb(size, size, seed, base=KHONDALITE, veins=0.1)
    cv = Canvas(size, size, np.zeros((size, size, 3), np.float32))
    W = (1, 1, 1)
    rows = 4
    rh = size / rows
    for r in range(rows):
        y0 = r * rh
        cv.stroke([(0, y0 + 4), (size, y0 + 4)], 5, W)
        cv.stroke([(0, y0 + rh - 6), (size, y0 + rh - 6)], 3, W)
        if r % 2 == 0:
            n = 8
            pw = size / n
            for k in range(n):
                x0 = k * pw
                # Niche: pilasters, arched top, figure (body + head + arms).
                cv.stroke([(x0 + 0.12 * pw, y0 + 0.88 * rh), (x0 + 0.12 * pw, y0 + 0.3 * rh)], 4, W)
                cv.stroke([(x0 + 0.88 * pw, y0 + 0.88 * rh), (x0 + 0.88 * pw, y0 + 0.3 * rh)], 4, W)
                arc = [(x0 + pw / 2 + 0.38 * pw * math.cos(t), y0 + 0.3 * rh - 0.16 * rh * math.sin(t))
                       for t in np.linspace(math.pi, 0, 20)]
                cv.stroke(arc, 4, W)
                cx = x0 + pw / 2
                lean = 0.06 * pw * (1 if k % 2 else -1)
                cv.leaf(cx, y0 + 0.86 * rh, -math.pi / 2 + lean / pw, 0.42 * rh, 0.16 * pw, W, bend=0.1, vein=False)
                cv.disc(cx + lean, y0 + 0.38 * rh, 0.055 * rh, W)
                cv.stroke([(cx - 0.18 * pw, y0 + 0.5 * rh), (cx, y0 + 0.55 * rh), (cx + 0.2 * pw, y0 + 0.46 * rh)], 4, W)
        else:
            n = 6
            pw = size / n
            for k in range(n):
                cx, cy = k * pw + pw / 2, y0 + rh / 2
                ring = [(cx + 0.36 * rh * math.cos(t), cy + 0.36 * rh * math.sin(t)) for t in np.linspace(0, 2 * math.pi, 40)]
                cv.stroke(ring, 4, W)
                cv.rosette(cx, cy, 0.26 * rh, 12, W, W)
                sx = k * pw
                cv.stroke([(sx - 0.1 * pw, cy + 0.25 * rh * math.sin(t * 6)) if False else
                           (sx + 0.5 * pw * (t - 0.5) * 0.4, cy + 0.2 * rh * math.sin(t * 2 * math.pi))
                           for t in np.linspace(0, 1, 20)], 3, W)
    m = cv.img[..., 0]
    up, down = np.roll(m, -2, axis=0), np.roll(m, 2, axis=0)
    shade = 1 - 0.30 * np.clip(down - m, 0, 1) + 0.18 * np.clip(up - m, 0, 1) - 0.08 * m
    return base * shade[..., None] * _weathering(size, seed)[..., None]
