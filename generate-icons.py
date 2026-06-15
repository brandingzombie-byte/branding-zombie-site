"""
Generate zombie skull favicon and brand icon set for Branding Zombie site.
Necro Vitalism aesthetic: #0A0A0A background, #BFFF00 toxic lime, #00FFD4 cyan.
"""

from PIL import Image, ImageDraw, ImageFilter
import os, struct, io

OUT = os.path.join(os.path.dirname(__file__), "public")
ASSETS = os.path.join(OUT, "assets")
os.makedirs(ASSETS, exist_ok=True)

BG    = (10, 10, 10)         # #0A0A0A
TOXIC = (191, 255, 0)        # #BFFF00
CYAN  = (0, 255, 212)        # #00FFD4
DARK  = (26, 31, 28)         # #1A1F1C

def make_skull(size=1024):
    """Draw a precise, technical zombie skull icon."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    s = size
    cx = s // 2

    # --- Outer glow ring (very subtle) ---
    glow_r = int(s * 0.46)
    for i in range(12, 0, -1):
        alpha = int(30 * (i / 12))
        d.ellipse(
            [cx - glow_r - i*2, cx - glow_r - i*2,
             cx + glow_r + i*2, cx + glow_r + i*2],
            outline=(191, 255, 0, alpha), width=1
        )

    # --- Skull cranium ---
    skull_top    = int(s * 0.10)
    skull_left   = int(s * 0.18)
    skull_right  = int(s * 0.82)
    skull_mid    = int(s * 0.62)   # widest point
    skull_bottom = int(s * 0.72)   # jaw line

    # Cranium fill (slightly lighter than bg so it reads as a shape)
    d.ellipse([skull_left, skull_top, skull_right, skull_mid],
              fill=(18, 22, 18, 255))

    # Cranium outline – thick outer, thin detail
    d.ellipse([skull_left, skull_top, skull_right, skull_mid],
              outline=(*TOXIC, 255), width=max(2, s // 128))

    # --- Jaw block ---
    jaw_l = int(s * 0.28)
    jaw_r = int(s * 0.72)
    jaw_t = int(s * 0.60)
    jaw_b = int(s * 0.82)

    d.rectangle([jaw_l, jaw_t, jaw_r, jaw_b], fill=(18, 22, 18, 255))
    # Jaw sides
    lw = max(2, s // 128)
    d.line([(jaw_l, jaw_t), (jaw_l, jaw_b)], fill=(*TOXIC, 255), width=lw)
    d.line([(jaw_r, jaw_t), (jaw_r, jaw_b)], fill=(*TOXIC, 255), width=lw)
    d.line([(jaw_l, jaw_b), (jaw_r, jaw_b)], fill=(*TOXIC, 255), width=lw)

    # --- Cheekbone connectors (join cranium to jaw) ---
    d.line([(skull_left + s//16, skull_mid - s//16), (jaw_l, jaw_t)],
           fill=(*TOXIC, 180), width=lw)
    d.line([(skull_right - s//16, skull_mid - s//16), (jaw_r, jaw_t)],
           fill=(*TOXIC, 180), width=lw)

    # --- Eye sockets ---
    ey = int(s * 0.35)
    ew = int(s * 0.17)
    eh = int(s * 0.14)
    e_off = int(s * 0.17)

    # Left eye
    le = [cx - e_off - ew, ey, cx - e_off + ew, ey + eh]
    d.ellipse(le, fill=(10, 10, 10, 255), outline=(*CYAN, 255), width=lw)
    # Cyan inner glow dot
    eye_cx = cx - e_off
    eye_cy = ey + eh // 2
    gr = max(2, s // 80)
    for gi in range(gr, 0, -1):
        a = int(255 * (gi / gr) ** 0.5)
        d.ellipse([eye_cx - gi, eye_cy - gi, eye_cx + gi, eye_cy + gi],
                  fill=(0, 255, 212, a))

    # Right eye
    re = [cx + e_off - ew, ey, cx + e_off + ew, ey + eh]
    d.ellipse(re, fill=(10, 10, 10, 255), outline=(*CYAN, 255), width=lw)
    eye_cx2 = cx + e_off
    for gi in range(gr, 0, -1):
        a = int(255 * (gi / gr) ** 0.5)
        d.ellipse([eye_cx2 - gi, eye_cy - gi, eye_cx2 + gi, eye_cy + gi],
                  fill=(0, 255, 212, a))

    # --- Nose cavity ---
    ny  = int(s * 0.52)
    nw  = int(s * 0.08)
    nh  = int(s * 0.10)
    # Inverted triangle nose
    nose_pts = [
        (cx, ny),
        (cx - nw, ny + nh),
        (cx + nw, ny + nh),
    ]
    d.polygon(nose_pts, fill=(10, 10, 10, 255), outline=(*TOXIC, 180))

    # --- Teeth row ---
    n_teeth = 6
    tooth_w = int((jaw_r - jaw_l) / (n_teeth + 1))
    tooth_h = int(s * 0.07)
    tooth_t = jaw_b - tooth_h
    for i in range(n_teeth):
        tx = jaw_l + (i + 0.5) * tooth_w + tooth_w // 2
        # alternating heights for slight irregularity
        th = tooth_h if i % 2 == 0 else int(tooth_h * 0.85)
        tt = jaw_b - th
        tr = max(1, s // 256)
        d.rounded_rectangle(
            [int(tx - tooth_w * 0.35), tt,
             int(tx + tooth_w * 0.35), jaw_b - 2],
            radius=tr,
            fill=(18, 22, 18, 255),
            outline=(*TOXIC, 220)
        )

    # --- Crown circuit lines (decorative technical detail) ---
    cr_y = int(s * 0.08)
    cr_lw = max(1, s // 512)
    # Small horizontal tick marks across top
    for xi in range(5):
        tick_x = int(skull_left + (skull_right - skull_left) * (xi + 1) / 6)
        tick_len = s // 32 if xi == 2 else s // 48
        d.line([(tick_x, cr_y), (tick_x, cr_y + tick_len)],
               fill=(*TOXIC, 80), width=cr_lw)

    # Centre crown diamond
    cd = s // 28
    crown_pts = [
        (cx, cr_y - cd),
        (cx + cd, cr_y),
        (cx, cr_y + cd),
        (cx - cd, cr_y),
    ]
    d.polygon(crown_pts, outline=(*TOXIC, 160), fill=None)

    return img


def create_favicon_ico(pngs_dict, path):
    """Create a multi-size .ico from dict of {size: PIL.Image}."""
    entries = []
    image_data = b""
    header_size = 6
    entry_size = 16
    num_images = len(pngs_dict)
    offset = header_size + entry_size * num_images

    for size, img in sorted(pngs_dict.items()):
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        data = buf.getvalue()
        w = h = size if size < 256 else 0  # ICO uses 0 for 256+
        entries.append(struct.pack("<BBBBHHII", w, h, 0, 0, 1, 32, len(data), offset))
        image_data += data
        offset += len(data)

    ico_header = struct.pack("<HHH", 0, 1, num_images)
    with open(path, "wb") as f:
        f.write(ico_header)
        for e in entries:
            f.write(e)
        f.write(image_data)


# ── Generate master + all web sizes ──────────────────────────────────────────
print("Generating zombie skull icon (1024×1024)...")
master = make_skull(1024)

# Add black background for non-transparent versions
def with_bg(img, bg=(10, 10, 10)):
    bg_img = Image.new("RGBA", img.size, (*bg, 255))
    bg_img.paste(img, mask=img.split()[3])
    return bg_img.convert("RGB")

master_on_bg = with_bg(master)

sizes = {
    16:  "favicon-16x16.png",
    32:  "favicon-32x32.png",
    48:  "favicon-48x48.png",
    180: "apple-touch-icon.png",
    192: "icon-192.png",
    512: "icon-512.png",
}

for sz, fname in sizes.items():
    out_path = os.path.join(OUT, fname)
    resized = master_on_bg.resize((sz, sz), Image.LANCZOS)
    resized.save(out_path, "PNG", optimize=True)
    print(f"  → {fname} ({sz}×{sz})")

# favicon.ico (16, 32, 48)
ico_images = {}
for sz in [16, 32, 48]:
    ico_images[sz] = master_on_bg.resize((sz, sz), Image.LANCZOS)

ico_path = os.path.join(OUT, "favicon.ico")
create_favicon_ico(ico_images, ico_path)
print(f"  → favicon.ico (16, 32, 48)")

# High-res for assets folder
master_on_bg.save(os.path.join(ASSETS, "brand-icon-1024.png"), "PNG")
print(f"  → assets/brand-icon-1024.png (1024×1024 master)")

# OG image (1200×630) – skull centered on dark bg with tagline treatment
print("\nGenerating og-image (1200×630)...")
og = Image.new("RGB", (1200, 630), (10, 10, 10))
# Place skull left-center
skull_sm = master.resize((380, 380), Image.LANCZOS)
og_bg = Image.new("RGB", (1200, 630), (10, 10, 10))
og_bg.paste(skull_sm, (80, 125), mask=skull_sm.split()[3])

# Subtle gradient overlay (radial-ish using paste layers)
# Draw text "BRANDING ZOMBIE" via PIL
d_og = ImageDraw.Draw(og_bg)

# Decorative grid lines (right side)
for xi in range(0, 600, 40):
    d_og.line([(600 + xi, 0), (600 + xi, 630)], fill=(191, 255, 0, 8), width=1)
for yi in range(0, 630, 40):
    d_og.line([(600, yi), (1200, yi)], fill=(191, 255, 0, 8), width=1)

# Title text
try:
    from PIL import ImageFont
    # Try to load a system font
    font_lg = ImageFont.truetype("arial.ttf", 72)
    font_sm = ImageFont.truetype("arial.ttf", 28)
    font_xs = ImageFont.truetype("arial.ttf", 18)
except Exception:
    font_lg = ImageFont.load_default()
    font_sm = font_lg
    font_xs = font_lg

d_og.text((640, 180), "BRANDING", font=font_lg, fill=(191, 255, 0))
d_og.text((640, 265), "ZOMBIE", font=font_lg, fill=(240, 240, 232))
d_og.line([(640, 360), (1140, 360)], fill=(191, 255, 0), width=2)
d_og.text((640, 375), "YOUR BRAND. RESURRECTED.", font=font_sm, fill=(138, 154, 142))
d_og.text((640, 430), "brandingzombie.com", font=font_xs, fill=(0, 255, 212))

og_bg.save(os.path.join(ASSETS, "og-image.png"), "PNG", optimize=True)
print("  → assets/og-image.png")

print("\n✓ All favicon/brand icons generated.")
print(f"  Output: {OUT}/")
