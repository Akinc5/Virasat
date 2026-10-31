"""
Procedural, tileable textures generated with numpy (no external assets).

Everything is periodic by construction (FFT noise, integer frequencies,
torus-wrapped distances) so textures tile seamlessly in box/planar UVs.
Images are written to disk, reloaded as file images and packed, so they
embed in both the .blend and the exported GLB.
"""

import math
from pathlib import Path

import bpy
import numpy as np


def _fbm(w, h, beta, seed):
    """Periodic fractal noise in [0, 1] via spectral synthesis."""
    rng = np.random.default_rng(seed)
    spec = np.fft.fft2(rng.standard_normal((h, w)))
    fy, fx = np.meshgrid(np.fft.fftfreq(h), np.fft.fftfreq(w), indexing="ij")
    k = np.sqrt(fx ** 2 + fy ** 2)
    k[0, 0] = 1.0
    spec /= k ** (beta / 2)
    spec[0, 0] = 0
    out = np.real(np.fft.ifft2(spec))
    return ((out - out.min()) / (out.max() - out.min())).astype(np.float32)


def _grid(w, h):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    return xx, yy


def _wrap(d, period):
    return (d + period / 2) % period - period / 2


def _mix(col, mask, color):
    m = np.clip(mask, 0, 1)[..., None]
    return col * (1 - m) + np.array(color, np.float32) * m


def marble_rgb(w, h, seed=1, base=(0.90, 0.88, 0.83), veins=1.0):
    """Warm white marble: low-contrast tonal drift and a few soft grey veins."""
    xx, yy = _grid(w, h)
    n1, n2, n3 = _fbm(w, h, 2.8, seed), _fbm(w, h, 2.2, seed + 1), _fbm(w, h, 1.4, seed + 2)
    u, v = xx / w, yy / h
    vein_a = np.exp(-np.abs(np.sin((u * 2 + v * 1) * 2 * np.pi + 7 * n1)) * 22)
    vein_b = np.exp(-np.abs(np.sin((u * 1 - v * 3) * 2 * np.pi + 5 * n2)) * 40)
    shade = 1 + 0.05 * (n1 - 0.5) + 0.03 * (n3 - 0.5)
    col = np.array(base, np.float32)[None, None, :] * shade[..., None]
    col = _mix(col, veins * (0.22 * vein_a + 0.12 * vein_b), (0.60, 0.60, 0.62))
    # Faint warm cloudiness, as in the reference photos.
    col = _mix(col, 0.10 * np.clip(n2 - 0.55, 0, 1) * 4, (0.86, 0.78, 0.66))
    return col


def _joints(col, row_px, block_px, width, color, strength):
    h, w = col.shape[:2]
    xx, yy = _grid(w, h)
    row = (yy // row_px).astype(int)
    xs = (xx + (row % 2) * block_px / 2) % block_px
    ys = yy % row_px
    line = (np.minimum(ys, row_px - ys) < width) | (np.minimum(xs, block_px - xs) < width)
    return _mix(col, line.astype(np.float32) * strength, color)


def inlay_rgb(size=1024, seed=7):
    """
    Pietra-dura style trellis: two mirrored vines forming an ogee lattice,
    carnelian rosettes at the crossings, small flowers and dark leaves.
    Generic motif inspired by the reference photos — not a copy of a panel.
    """
    col = marble_rgb(size, size, seed, base=(0.93, 0.91, 0.86), veins=0.5)
    xx, yy = _grid(size, size)
    P = size / 2                      # motif repeat (2x2 per texture tile)
    A = 0.40 * P
    vine = np.zeros((size, size), np.float32)
    for oy in (0.0, P):
        for sign in (1, -1):
            f = P / 2 + oy + sign * A * np.sin(2 * np.pi * xx / P)
            df = sign * A * 2 * np.pi / P * np.cos(2 * np.pi * xx / P)
            dist = np.abs(_wrap(yy - f, size)) / np.sqrt(1 + df ** 2)
            vine = np.maximum(vine, np.clip(2.2 - dist, 0, 1))
    col = _mix(col, vine, (0.20, 0.24, 0.21))

    def flower(cx, cy, radius, petals, color, centre):
        dx, dy = _wrap(xx - cx, size), _wrap(yy - cy, size)
        r = np.sqrt(dx ** 2 + dy ** 2)
        th = np.arctan2(dy, dx)
        edge = radius * (0.55 + 0.45 * np.abs(np.cos(petals / 2 * th)))
        out = _mix(col_ref[0], np.clip((edge - r) / 1.5, 0, 1), color)
        out = _mix(out, np.clip(1.4 - np.abs(r - edge), 0, 1) * (r < radius * 1.1), (0.25, 0.08, 0.06))
        out = _mix(out, np.clip((0.22 * radius - r) / 1.2, 0, 1), centre)
        col_ref[0] = out

    def leaf(cx, cy, angle, a, b, color):
        dx, dy = _wrap(xx - cx, size), _wrap(yy - cy, size)
        ca, sa = math.cos(angle), math.sin(angle)
        lx, ly = dx * ca + dy * sa, -dx * sa + dy * ca
        d = (lx / a) ** 2 + (ly / b) ** 2
        col_ref[0] = _mix(col_ref[0], np.clip((1 - d) * 6, 0, 1), color)

    col_ref = [col]
    for oy in (0.0, P):
        # Leaves along both vines, midway between crossings and peaks.
        for k in range(int(size / (P / 4))):
            x = P / 8 + k * P / 4
            for sign in (1, -1):
                y = P / 2 + oy + sign * A * np.sin(2 * np.pi * x / P)
                ang = math.atan(sign * A * 2 * np.pi / P * np.cos(2 * np.pi * x / P))
                side = 1 if k % 2 == 0 else -1
                leaf(x - side * math.sin(ang) * 10, y + side * math.cos(ang) * 10,
                     ang + side * 0.6, 0.075 * P, 0.026 * P, (0.13, 0.27, 0.17))
        # Rosettes where the vines cross.
        for k in range(int(size / (P / 2))):
            flower(k * P / 2, P / 2 + oy, 0.12 * P, 8, (0.66, 0.18, 0.10), (0.86, 0.66, 0.28))
        # Small flowers at the peaks and troughs.
        for k in range(int(size / (P / 2))):
            x = P / 4 + k * P / 2
            s = 1 if k % 2 == 0 else -1
            flower(x, P / 2 + oy + s * A, 0.065 * P, 5, (0.80, 0.56, 0.22), (0.62, 0.18, 0.10))
            flower(x, P / 2 + oy - s * A, 0.065 * P, 6, (0.30, 0.34, 0.52), (0.86, 0.66, 0.28))
    return col_ref[0]


def band_rgb(w=1024, h=256, seed=11):
    """
    Restrained stand-in for the black-marble calligraphy bands: a dark running
    scroll between two black fillets. Deliberately NOT lettering — inventing
    text and presenting it as Taj Mahal inscription would be misleading.
    """
    col = marble_rgb(w, h, seed, base=(0.92, 0.90, 0.85), veins=0.4)
    xx, yy = _grid(w, h)
    edge = (np.abs(yy - 0.09 * h) < 0.025 * h) | (np.abs(yy - 0.91 * h) < 0.025 * h)
    col = _mix(col, edge.astype(np.float32), (0.05, 0.05, 0.06))
    period = w / 8
    f = h / 2 + 0.22 * h * np.sin(2 * np.pi * xx / period)
    df = 0.22 * h * 2 * np.pi / period * np.cos(2 * np.pi * xx / period)
    dist = np.abs(yy - f) / np.sqrt(1 + df ** 2)
    col = _mix(col, np.clip(4.0 - dist, 0, 1), (0.06, 0.06, 0.07))
    # Curling tendrils in each bay of the scroll.
    for k in range(8):
        for sgn in (1, -1):
            cx = (k + (0.25 if sgn > 0 else 0.75)) * period
            cy = h / 2 - sgn * 0.12 * h
            r = np.sqrt(_wrap(xx - cx, w) ** 2 + (yy - cy) ** 2)
            col = _mix(col, np.clip(3.0 - np.abs(r - 0.10 * h), 0, 1) * (sgn * (yy - cy) > -2), (0.06, 0.06, 0.07))
            col = _mix(col, np.clip((0.035 * h - r) / 1.5, 0, 1), (0.06, 0.06, 0.07))
    return col


def jali_rgba(w=512, seed=3):
    """Hexagonal pierced screen; alpha 0 = hole."""
    s = w / 8
    row = s * math.sqrt(3) / 2
    h = int(round(row * 16))
    xx, yy = _grid(w, h)

    def hexdist(dx, dy):
        dx, dy = np.abs(dx), np.abs(dy)
        return np.maximum(dx, dx * 0.5 + dy * 0.866)

    da = hexdist(_wrap(xx, s), _wrap(yy, 2 * row))
    db = hexdist(_wrap(xx - s / 2, s), _wrap(yy - row, 2 * row))
    d = np.minimum(da, db)
    hole_r = 0.37 * s
    alpha = (d > hole_r).astype(np.float32)
    # Flat base keeps the PNG small; the screen is too fine to show veining.
    base = np.full((h, w, 3), (0.90, 0.86, 0.78), np.float32)
    # Darken the bar edges so the lattice reads as carved depth.
    rim = np.clip(1 - (d - hole_r) / (0.10 * s), 0, 1) * alpha
    col = base * (1 - 0.35 * rim[..., None])
    return np.concatenate([col, alpha[..., None]], axis=2)


def sandstone_rgb(size=512, seed=21):
    n1, n2 = _fbm(size, size, 2.4, seed), _fbm(size, size, 1.2, seed + 1)
    shade = 1 + 0.10 * (n1 - 0.5) + 0.06 * (n2 - 0.5)
    col = np.array((0.42, 0.20, 0.15), np.float32)[None, None, :] * shade[..., None]
    return _joints(col, size // 4, size // 2, 1.0, (0.55, 0.36, 0.29), 0.35)


def red_sandstone_rgb(size=512, seed=23):
    """The Red Fort's warmer, lighter Agra sandstone, laid in courses."""
    n1, n2 = _fbm(size, size, 2.4, seed), _fbm(size, size, 1.2, seed + 1)
    shade = 1 + 0.12 * (n1 - 0.5) + 0.07 * (n2 - 0.5)
    col = np.array((0.60, 0.29, 0.20), np.float32)[None, None, :] * shade[..., None]
    return _joints(col, size // 4, size // 2, 1.0, (0.72, 0.48, 0.38), 0.4)


def grass_rgb(size=512, seed=31):
    """Mown lawn: fine blade noise over broad patches of lighter and darker green."""
    fine, broad = _fbm(size, size, 0.6, seed), _fbm(size, size, 2.6, seed + 1)
    shade = 0.82 + 0.22 * fine + 0.18 * (broad - 0.5)
    base = np.array((0.26, 0.33, 0.15), np.float32)[None, None, :]
    dry = np.array((0.44, 0.40, 0.22), np.float32)[None, None, :]
    mix = np.clip((broad - 0.62) * 2.5, 0, 1)[..., None] * 0.35
    return (base * (1 - mix) + dry * mix) * shade[..., None]


def paving_rgb(size=512, seed=41):
    """Large buff sandstone flags, as on the fort's walkways."""
    n1, n2 = _fbm(size, size, 2.2, seed), _fbm(size, size, 1.0, seed + 1)
    shade = 1 + 0.08 * (n1 - 0.5) + 0.05 * (n2 - 0.5)
    col = np.array((0.62, 0.47, 0.36), np.float32)[None, None, :] * shade[..., None]
    return _joints(col, size // 4, size // 4, 1.5, (0.40, 0.30, 0.24), 0.45)


def flag_rgb(w=768, h=512):
    """India's national flag: saffron, white and green with the 24-spoke Ashoka Chakra."""
    xx, yy = _grid(w, h)
    col = np.empty((h, w, 3), np.float32)
    col[: h // 3] = (0.91, 0.42, 0.10)
    col[h // 3 : 2 * h // 3] = (0.97, 0.97, 0.95)
    col[2 * h // 3 :] = (0.07, 0.40, 0.13)
    cx, cy, r = w / 2, h / 2, h / 6 * 0.92
    dx, dy = xx - cx, yy - cy
    rad = np.hypot(dx, dy)
    ang = np.arctan2(dy, dx)
    rim = np.abs(rad - r) < r * 0.07
    spoke = (rad < r) & (np.abs(_wrap(ang, 2 * np.pi / 24)) * rad < r * 0.035)
    hub = rad < r * 0.16
    navy = np.array((0.0, 0.0, 0.5), np.float32)
    for m in (rim, spoke, hub):
        col[m] = navy
    return col


def _to_image(name, arr, outdir):
    h, w = arr.shape[:2]
    alpha = arr.shape[2] == 4
    if not alpha:
        arr = np.concatenate([arr, np.ones((h, w, 1), np.float32)], axis=2)
    tmp = bpy.data.images.new(name + "_tmp", w, h, alpha=alpha)
    tmp.pixels.foreach_set(np.ascontiguousarray(np.flipud(np.clip(arr, 0, 1))).astype(np.float32).ravel())
    path = Path(outdir) / f"{name}.{'png' if alpha else 'jpg'}"
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp.filepath_raw = str(path)
    tmp.file_format = "PNG" if alpha else "JPEG"
    tmp.save()
    bpy.data.images.remove(tmp)
    img = bpy.data.images.load(str(path))
    img.name = name
    img.pack()
    return img


def _motifs():
    import motifs  # local import: motifs imports this module
    return motifs


TEXTURES = {
    "marble": ("tex_marble", "jpg", lambda: marble_rgb(1024, 1024, seed=1)),
    "ashlar": ("tex_marble_ashlar_v2", "jpg", lambda: _motifs().ashlar_rgb(1024, rows=8, seed=5)),
    "slab": ("tex_marble_slab", "jpg", lambda: _motifs().ashlar_rgb(1024, rows=4, seed=9, joint=(0.55, 0.54, 0.52))),
    "arabesque": ("tex_arabesque", "jpg", lambda: _motifs().arabesque_rgb()),
    "border": ("tex_border_floral", "jpg", lambda: _motifs().border_rgb()),
    "rosette": ("tex_rosette_band", "jpg", lambda: _motifs().rosette_rgb()),
    "arcade": ("tex_arcade_band", "jpg", lambda: _motifs().arcade_rgb()),
    "chevron": ("tex_chevron", "jpg", lambda: _motifs().chevron_rgb()),
    "rope": ("tex_rope", "jpg", lambda: _motifs().rope_rgb()),
    "railing": ("tex_railing_panel", "jpg", lambda: _motifs().railing_rgb()),
    "khondalite": ("tex_khondalite", "jpg", lambda: _motifs().khondalite_rgb()),
    "relief": ("tex_khondalite_relief", "jpg", lambda: _motifs().relief_rgb()),
    "band": ("tex_band", "jpg", band_rgb),
    "jali": ("tex_jali", "png", jali_rgba),
    "sandstone": ("tex_red_sandstone", "jpg", sandstone_rgb),
    "grass": ("tex_grass_v2", "jpg", grass_rgb),
    "red_sandstone": ("tex_red_sandstone_fort", "jpg", red_sandstone_rgb),
    "paving": ("tex_paving", "jpg", paving_rgb),
    "flag": ("tex_flag_india", "jpg", flag_rgb),
}


def build_all(outdir, regenerate=False):
    """
    Generate (or reuse cached) textures. Returns {key: bpy.types.Image}.
    Generation takes ~1 min, so files in `outdir` are reused unless `regenerate`.
    """
    images = {}
    for key, (name, ext, make) in TEXTURES.items():
        path = Path(outdir) / f"{name}.{ext}"
        if path.exists() and not regenerate:
            img = bpy.data.images.load(str(path))
            img.name = name
            img.pack()
        else:
            img = _to_image(name, make(), outdir)
        images[key] = img
    return images
