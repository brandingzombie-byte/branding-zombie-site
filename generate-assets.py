"""
Branding Zombie Designs — Visual Asset Generator
Necro Vitalism design philosophy expressed as branded website assets
"""

from PIL import Image, ImageDraw, ImageFont
import math
import random
import os

# Paths
FONT_DIR = r"C:\Users\jngle\.claude\skills\canvas-design\canvas-fonts"
OUT_DIR = r"C:\Users\jngle\OneDrive\Documents\Claude Projects\branding-zombie-site\public\assets"
os.makedirs(OUT_DIR, exist_ok=True)

# Brand colors
VOID = (10, 10, 10)
GRAVE = (17, 23, 20)
SURFACE = (26, 31, 28)
ELEVATED = (36, 43, 39)
TOXIC = (191, 255, 0)
CYAN = (0, 255, 212)
PHOSPHOR = (255, 0, 255)
TEXT_PRIMARY = (240, 240, 232)
TEXT_SECONDARY = (138, 154, 142)
TEXT_DIM = (74, 90, 78)

def load_font(name, size):
    try:
        return ImageFont.truetype(os.path.join(FONT_DIR, name), size)
    except:
        return ImageFont.load_default()

def add_noise(img, intensity=8):
    """Add subtle grain texture"""
    random.seed(42)
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[x, y][:3]
            noise = random.randint(-intensity, intensity)
            pixels[x, y] = (
                max(0, min(255, r + noise)),
                max(0, min(255, g + noise)),
                max(0, min(255, b + noise)),
            )
    return img


# ============================================================
# ASSET 1: Hero Background Pattern (1920x1080)
# ============================================================
def create_hero_bg():
    W, H = 1920, 1080
    img = Image.new("RGB", (W, H), VOID)
    draw = ImageDraw.Draw(img)
    random.seed(123)

    # Subtle radial gradient from center
    for r in range(600, 0, -1):
        alpha = int(8 * (r / 600))
        color = (VOID[0] + alpha, VOID[1] + alpha + 2, VOID[2] + alpha)
        draw.ellipse(
            [W//2 - r, H//2 - r, W//2 + r, H//2 + r],
            fill=color
        )

    # Grid of faint dots (circuit-board pattern)
    for x in range(0, W, 40):
        for y in range(0, H, 40):
            dist = math.sqrt((x - W/2)**2 + (y - H/2)**2)
            if dist < 500:
                opacity = max(0, int(20 - dist * 0.03))
                dot_color = (TOXIC[0], TOXIC[1], TOXIC[2])
                # Only draw some dots based on position hash
                if (x * 7 + y * 13) % 17 < 4:
                    r = 1 if (x + y) % 80 != 0 else 2
                    draw.ellipse(
                        [x - r, y - r, x + r, y + r],
                        fill=(dot_color[0] // 12, dot_color[1] // 12, dot_color[2] // 12)
                    )

    # Horizontal scan lines
    for y in range(0, H, 3):
        if y % 6 == 0:
            draw.line([(0, y), (W, y)], fill=(VOID[0] + 3, VOID[1] + 3, VOID[2] + 3), width=1)

    # Floating organic particles (bioluminescent nodes)
    for _ in range(80):
        x = random.randint(0, W)
        y = random.randint(0, H)
        size = random.randint(1, 4)
        brightness = random.randint(15, 50)
        if random.random() > 0.7:
            color = (0, brightness * 2, brightness)  # cyan-ish
        else:
            color = (brightness, brightness * 2, 0)  # toxic green-ish
        draw.ellipse([x - size, y - size, x + size, y + size], fill=color)
        # Glow halo
        for halo in range(1, 4):
            halo_size = size + halo * 3
            halo_bright = max(1, brightness // (halo * 3))
            halo_color = (color[0] // (halo+1), color[1] // (halo+1), color[2] // (halo+1))
            draw.ellipse(
                [x - halo_size, y - halo_size, x + halo_size, y + halo_size],
                outline=halo_color
            )

    # Corner accent lines
    line_color = (TOXIC[0] // 8, TOXIC[1] // 8, TOXIC[2] // 8)
    # Top-left corner bracket
    draw.line([(60, 60), (60, 120)], fill=line_color, width=1)
    draw.line([(60, 60), (120, 60)], fill=line_color, width=1)
    # Bottom-right corner bracket
    draw.line([(W-60, H-60), (W-60, H-120)], fill=line_color, width=1)
    draw.line([(W-60, H-60), (W-120, H-60)], fill=line_color, width=1)

    add_noise(img, 4)
    img.save(os.path.join(OUT_DIR, "hero-bg.png"), quality=95)
    print("[OK] hero-bg.png (1920x1080)")


# ============================================================
# ASSET 2: Brand Pattern Tile (512x512, seamless)
# ============================================================
def create_brand_pattern():
    S = 512
    img = Image.new("RGB", (S, S), GRAVE)
    draw = ImageDraw.Draw(img)
    random.seed(456)

    # Hexagonal grid of zombie-themed marks
    hex_size = 48
    for row in range(0, S + hex_size, hex_size):
        offset = hex_size // 2 if (row // hex_size) % 2 else 0
        for col in range(-hex_size, S + hex_size, hex_size):
            x = col + offset
            y = row

            mark_type = (x * 3 + y * 7) % 5
            opacity_factor = 0.08 + random.random() * 0.06

            tc = (
                int(TOXIC[0] * opacity_factor),
                int(TOXIC[1] * opacity_factor),
                int(TOXIC[2] * opacity_factor),
            )

            if mark_type == 0:
                # Small cross
                draw.line([(x-4, y), (x+4, y)], fill=tc, width=1)
                draw.line([(x, y-4), (x, y+4)], fill=tc, width=1)
            elif mark_type == 1:
                # Dot
                draw.ellipse([x-2, y-2, x+2, y+2], fill=tc)
            elif mark_type == 2:
                # Small diamond
                pts = [(x, y-4), (x+4, y), (x, y+4), (x-4, y)]
                draw.polygon(pts, outline=tc)
            elif mark_type == 3:
                # Circle
                draw.ellipse([x-5, y-5, x+5, y+5], outline=tc)
            elif mark_type == 4:
                # Small "Z" mark (zombie!)
                z_color = (int(TOXIC[0]*0.12), int(TOXIC[1]*0.12), int(TOXIC[2]*0.12))
                draw.line([(x-3, y-3), (x+3, y-3)], fill=z_color, width=1)
                draw.line([(x+3, y-3), (x-3, y+3)], fill=z_color, width=1)
                draw.line([(x-3, y+3), (x+3, y+3)], fill=z_color, width=1)

    add_noise(img, 3)
    img.save(os.path.join(OUT_DIR, "brand-pattern.png"), quality=95)
    print("[OK] brand-pattern.png (512x512)")


# ============================================================
# ASSET 3: Service Icons (6 icons, 200x200 each, on dark bg)
# ============================================================
def draw_service_icon(draw, cx, cy, icon_type, size=60):
    """Draw a zombie-themed service icon"""
    tc = TOXIC
    cc = CYAN

    if icon_type == "web":
        # Globe with zombie bite
        draw.ellipse([cx-size//2, cy-size//2, cx+size//2, cy+size//2], outline=tc, width=2)
        draw.ellipse([cx-size//2+4, cy-size//2+4, cx+size//2-4, cy+size//2-4], outline=(tc[0]//3, tc[1]//3, tc[2]//3), width=1)
        # Horizontal line
        draw.line([(cx-size//2, cy), (cx+size//2, cy)], fill=tc, width=1)
        # Vertical curve (meridian)
        draw.arc([cx-size//4, cy-size//2, cx+size//4, cy+size//2], 0, 360, fill=tc, width=1)
        # Bite marks (zombie touch!)
        for angle in [30, 50]:
            bx = cx + int(size//2 * math.cos(math.radians(angle)))
            by = cy - int(size//2 * math.sin(math.radians(angle)))
            draw.ellipse([bx-4, by-4, bx+4, by+4], fill=GRAVE)
            draw.ellipse([bx-3, by-3, bx+3, by+3], fill=(tc[0]//2, tc[1]//2, 0))

    elif icon_type == "ai":
        # Brain/sparkle hybrid
        # Outer sparkle
        for i in range(8):
            angle = i * 45
            x1 = cx + int(size//2 * 0.6 * math.cos(math.radians(angle)))
            y1 = cy + int(size//2 * 0.6 * math.sin(math.radians(angle)))
            x2 = cx + int(size//2 * math.cos(math.radians(angle)))
            y2 = cy + int(size//2 * math.sin(math.radians(angle)))
            draw.line([(x1, y1), (x2, y2)], fill=cc, width=2)
        # Center circle
        draw.ellipse([cx-12, cy-12, cx+12, cy+12], fill=cc, outline=cc)
        # Inner dot
        draw.ellipse([cx-4, cy-4, cx+4, cy+4], fill=VOID)

    elif icon_type == "design":
        # Paintbrush with drip
        # Brush body
        draw.line([(cx-20, cy+20), (cx+15, cy-25)], fill=tc, width=4)
        # Brush tip
        pts = [(cx+15, cy-25), (cx+25, cy-20), (cx+20, cy-10)]
        draw.polygon(pts, fill=tc)
        # Paint drip (zombie ooze)
        draw.ellipse([cx+18, cy-8, cx+24, cy+2], fill=(tc[0]//2, tc[1]//2, 0))
        draw.ellipse([cx+19, cy+2, cx+23, cy+12], fill=(tc[0]//3, tc[1]//3, 0))

    elif icon_type == "print":
        # Printer with skull
        # Body
        draw.rectangle([cx-25, cy-10, cx+25, cy+15], outline=tc, width=2)
        # Paper tray top
        draw.rectangle([cx-18, cy-25, cx+18, cy-10], outline=tc, width=1)
        # Paper output
        draw.rectangle([cx-18, cy+15, cx+18, cy+28], outline=(tc[0]//2, tc[1]//2, 0), width=1)
        # Small skull on paper
        draw.ellipse([cx-5, cy+17, cx+5, cy+26], outline=tc, width=1)

    elif icon_type == "social":
        # Chat bubble with zombie hand
        # Bubble
        pts = [
            (cx-25, cy-20), (cx+25, cy-20), (cx+25, cy+5),
            (cx+5, cy+5), (cx-5, cy+20), (cx-5, cy+5), (cx-25, cy+5)
        ]
        draw.polygon(pts, outline=tc, fill=None)
        # Dots in bubble
        for dx in [-10, 0, 10]:
            draw.ellipse([cx+dx-3, cy-10, cx+dx+3, cy-4], fill=tc)

    elif icon_type == "ecommerce":
        # Shopping cart with zombie hand pushing
        # Cart body
        draw.line([(cx-20, cy-5), (cx-15, cy+15)], fill=cc, width=2)
        draw.line([(cx-15, cy+15), (cx+20, cy+15)], fill=cc, width=2)
        draw.line([(cx+20, cy+15), (cx+25, cy-5)], fill=cc, width=2)
        draw.line([(cx-20, cy-5), (cx+25, cy-5)], fill=cc, width=2)
        # Handle
        draw.line([(cx-25, cy-15), (cx-20, cy-5)], fill=cc, width=2)
        # Wheels
        draw.ellipse([cx-12, cy+16, cx-6, cy+22], outline=cc, width=2)
        draw.ellipse([cx+10, cy+16, cx+16, cy+22], outline=cc, width=2)
        # Item in cart
        draw.rectangle([cx-5, cy-2, cx+10, cy+12], outline=(cc[0]//2, cc[1]//2, cc[2]//2), width=1)


def create_service_icons():
    icons = [
        ("web", "WEB DESIGN"),
        ("ai", "AI WORKFLOWS"),
        ("design", "GRAPHIC DESIGN"),
        ("print", "PRINT SERVICES"),
        ("social", "SOCIAL MEDIA"),
        ("ecommerce", "ECOMMERCE"),
    ]

    icon_size = 200
    padding = 20
    cols = 3
    rows = 2
    W = cols * icon_size + (cols - 1) * padding
    H = rows * icon_size + (rows - 1) * padding

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    font_label = load_font("GeistMono-Regular.ttf", 11)

    for idx, (icon_type, label) in enumerate(icons):
        row = idx // cols
        col = idx % cols
        x = col * (icon_size + padding)
        y = row * (icon_size + padding)

        # Create individual icon
        icon_img = Image.new("RGBA", (icon_size, icon_size), (0, 0, 0, 0))
        icon_draw = ImageDraw.Draw(icon_img)

        # Background circle
        icon_draw.rounded_rectangle(
            [8, 8, icon_size-8, icon_size-8],
            radius=20,
            fill=(SURFACE[0], SURFACE[1], SURFACE[2], 200),
            outline=(TOXIC[0]//6, TOXIC[1]//6, TOXIC[2]//6, 100),
            width=1
        )

        # Draw icon
        cx, cy = icon_size // 2, icon_size // 2 - 12
        draw_service_icon(icon_draw, cx, cy, icon_type, 50)

        # Label
        bbox = icon_draw.textbbox((0, 0), label, font=font_label)
        tw = bbox[2] - bbox[0]
        icon_draw.text(
            ((icon_size - tw) // 2, icon_size - 38),
            label,
            fill=TEXT_SECONDARY,
            font=font_label,
        )

        img.paste(icon_img, (x, y), icon_img)

    img.save(os.path.join(OUT_DIR, "service-icons.png"))
    print(f"[OK] service-icons.png ({W}x{H})")

    # Also save individual icons
    for idx, (icon_type, label) in enumerate(icons):
        icon_img = Image.new("RGBA", (120, 120), (0, 0, 0, 0))
        icon_draw = ImageDraw.Draw(icon_img)
        icon_draw.rounded_rectangle(
            [4, 4, 116, 116],
            radius=16,
            fill=(SURFACE[0], SURFACE[1], SURFACE[2], 220),
            outline=(TOXIC[0]//5, TOXIC[1]//5, TOXIC[2]//5, 150),
            width=1
        )
        draw_service_icon(icon_draw, 60, 60, icon_type, 40)
        icon_img.save(os.path.join(OUT_DIR, f"icon-{icon_type}.png"))
    print("[OK] 6 individual icon PNGs (120x120)")


# ============================================================
# ASSET 4: Brand Canvas — "BRANDING ZOMBIE" poster (1200x1600)
# ============================================================
def create_brand_canvas():
    W, H = 1200, 1600
    img = Image.new("RGB", (W, H), VOID)
    draw = ImageDraw.Draw(img)
    random.seed(789)

    # Background texture — vertical scan lines
    for x in range(0, W, 2):
        if x % 4 == 0:
            brightness = random.randint(11, 14)
            draw.line([(x, 0), (x, H)], fill=(brightness, brightness + 1, brightness), width=1)

    # Horizontal strata (geological layers)
    strata_y = [200, 450, 700, 950, 1200]
    for sy in strata_y:
        for offset in range(-2, 3):
            line_bright = 5 + abs(offset) * 2
            color = (TOXIC[0] // 25 + line_bright, TOXIC[1] // 25 + line_bright, line_bright)
            draw.line([(0, sy + offset * 3), (W, sy + offset * 3)], fill=color, width=1)

    # Dense particle field (accumulation of marks)
    for _ in range(500):
        x = random.randint(0, W)
        y = random.randint(0, H)
        size = random.choice([1, 1, 1, 2])

        # Cluster around strata lines
        nearest_stratum = min(strata_y, key=lambda sy: abs(y - sy))
        dist_to_stratum = abs(y - nearest_stratum)

        if dist_to_stratum < 80:
            brightness = max(3, 20 - dist_to_stratum // 4)
            if random.random() > 0.6:
                c = (0, brightness, brightness // 2)  # cyan tint near strata
            else:
                c = (brightness // 2, brightness, 0)  # toxic tint
            draw.ellipse([x-size, y-size, x+size, y+size], fill=c)

    # Large geometric forms — circles at intersections
    for sy in strata_y:
        for sx in [300, 600, 900]:
            r = random.randint(30, 60)
            opacity = random.randint(8, 15)
            c = (TOXIC[0] // (25 - opacity), TOXIC[1] // (25 - opacity), 0)
            draw.ellipse([sx-r, sy-r, sx+r, sy+r], outline=c, width=1)
            # Inner ring
            r2 = r - 8
            if r2 > 10:
                c2 = (c[0]//2, c[1]//2, 0)
                draw.ellipse([sx-r2, sy-r2, sx+r2, sy+r2], outline=c2, width=1)

    # Load fonts
    font_display = load_font("Boldonse-Regular.ttf", 120)
    font_sub = load_font("GeistMono-Regular.ttf", 16)
    font_body = load_font("WorkSans-Regular.ttf", 14)
    font_accent = load_font("EricaOne-Regular.ttf", 200)

    # MAIN TITLE — "BRANDING" massive
    draw.text(
        (80, 80),
        "BRANDING",
        fill=TOXIC,
        font=font_display,
    )

    # "ZOMBIE" in Erica One — huge, overlapping
    draw.text(
        (60, 260),
        "ZOMBIE",
        fill=(TOXIC[0]//4, TOXIC[1]//4, 0),
        font=font_accent,
    )
    # Sharper layer on top
    draw.text(
        (63, 263),
        "ZOMBIE",
        fill=TOXIC,
        font=load_font("Boldonse-Regular.ttf", 100),
    )

    # "DESIGNS" small label
    draw.text(
        (85, 380),
        "D  E  S  I  G  N  S",
        fill=TEXT_DIM,
        font=font_sub,
    )

    # Tagline
    draw.text(
        (80, 440),
        "BRINGING BRANDS BACK FROM THE DEAD.",
        fill=TEXT_SECONDARY,
        font=load_font("WorkSans-Bold.ttf", 18),
    )

    # Vertical reference markers (scientific diagram style)
    for i, label in enumerate(["WEB", "AI", "DESIGN", "PRINT", "SOCIAL", "SHOP"]):
        y_pos = 520 + i * 70
        # Marker line
        draw.line([(80, y_pos), (120, y_pos)], fill=(TOXIC[0]//6, TOXIC[1]//6, 0), width=1)
        # Dot
        draw.ellipse([74, y_pos-3, 80, y_pos+3], fill=TOXIC if i % 2 == 0 else CYAN)
        # Label
        draw.text(
            (130, y_pos - 8),
            label,
            fill=TEXT_SECONDARY if i % 2 == 0 else (0, TEXT_SECONDARY[1], TEXT_SECONDARY[2]),
            font=font_sub,
        )
        # Description line
        descriptions = [
            "Lightning-fast websites that convert",
            "Chatbots & automation, 24/7",
            "Logo, brand identity, visual systems",
            "Cards, banners, wraps, apparel",
            "Consistent content, zero burnout",
            "Shopify stores, ready to sell",
        ]
        draw.text(
            (130, y_pos + 10),
            descriptions[i],
            fill=TEXT_DIM,
            font=font_body,
        )

    # Right side — large "Z" watermark
    z_font = load_font("Boldonse-Regular.ttf", 500)
    draw.text(
        (700, 500),
        "Z",
        fill=(TOXIC[0]//20, TOXIC[1]//20, 0),
        font=z_font,
    )

    # Bottom section — location & contact
    draw.line([(80, 1350), (W-80, 1350)], fill=(TOXIC[0]//10, TOXIC[1]//10, 0), width=1)

    draw.text(
        (80, 1380),
        "CUMMING, GA  ·  FORSYTH COUNTY",
        fill=TEXT_DIM,
        font=font_sub,
    )
    draw.text(
        (80, 1410),
        "brandingzombie.com",
        fill=TOXIC,
        font=load_font("GeistMono-Bold.ttf", 18),
    )

    # Corner brackets (framing device)
    bracket_color = (TOXIC[0]//8, TOXIC[1]//8, 0)
    bw = 2
    bl = 40
    # Top-left
    draw.line([(40, 40), (40+bl, 40)], fill=bracket_color, width=bw)
    draw.line([(40, 40), (40, 40+bl)], fill=bracket_color, width=bw)
    # Top-right
    draw.line([(W-40, 40), (W-40-bl, 40)], fill=bracket_color, width=bw)
    draw.line([(W-40, 40), (W-40, 40+bl)], fill=bracket_color, width=bw)
    # Bottom-left
    draw.line([(40, H-40), (40+bl, H-40)], fill=bracket_color, width=bw)
    draw.line([(40, H-40), (40, H-40-bl)], fill=bracket_color, width=bw)
    # Bottom-right
    draw.line([(W-40, H-40), (W-40-bl, H-40)], fill=bracket_color, width=bw)
    draw.line([(W-40, H-40), (W-40, H-40-bl)], fill=bracket_color, width=bw)

    # Calibration marks along edges
    for y in range(100, H, 100):
        draw.line([(20, y), (30, y)], fill=(20, 22, 20), width=1)
        draw.line([(W-30, y), (W-20, y)], fill=(20, 22, 20), width=1)

    add_noise(img, 5)
    img.save(os.path.join(OUT_DIR, "brand-canvas.png"), quality=95)
    print("[OK] brand-canvas.png (1200x1600)")


# ============================================================
# ASSET 5: OG Image (1200x630) for social sharing
# ============================================================
def create_og_image():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), VOID)
    draw = ImageDraw.Draw(img)
    random.seed(321)

    # Background gradient
    for y in range(H):
        factor = y / H
        r = int(VOID[0] + (GRAVE[0] - VOID[0]) * factor)
        g = int(VOID[1] + (GRAVE[1] - VOID[1]) * factor)
        b = int(VOID[2] + (GRAVE[2] - VOID[2]) * factor)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Subtle particle field
    for _ in range(60):
        x = random.randint(0, W)
        y = random.randint(0, H)
        size = random.randint(1, 3)
        brightness = random.randint(10, 30)
        c = (brightness // 2, brightness, 0) if random.random() > 0.3 else (0, brightness, brightness // 2)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=c)

    # Load fonts
    font_title = load_font("Boldonse-Regular.ttf", 72)
    font_sub = load_font("WorkSans-Bold.ttf", 24)
    font_tag = load_font("GeistMono-Regular.ttf", 14)

    # Title
    draw.text((80, 160), "BRANDING", fill=TEXT_PRIMARY, font=font_title)
    draw.text((80, 250), "ZOMBIE", fill=TOXIC, font=font_title)

    # Tagline
    draw.text((85, 350), "Your Brand. Resurrected.", fill=TEXT_SECONDARY, font=font_sub)

    # Services tag
    draw.text(
        (85, 420),
        "WEB DESIGN  ·  AI WORKFLOWS  ·  GRAPHIC DESIGN  ·  PRINT",
        fill=TEXT_DIM,
        font=font_tag,
    )

    # Location
    draw.text(
        (85, 460),
        "CUMMING & FORSYTH COUNTY, GA",
        fill=(TOXIC[0]//3, TOXIC[1]//3, 0),
        font=font_tag,
    )

    # Right side decorative Z
    z_font = load_font("Boldonse-Regular.ttf", 300)
    draw.text((850, 100), "Z", fill=(TOXIC[0]//15, TOXIC[1]//15, 0), font=z_font)

    # Border line
    draw.rectangle([20, 20, W-20, H-20], outline=(TOXIC[0]//10, TOXIC[1]//10, 0), width=1)

    # Corner accents
    accent_len = 30
    ac = (TOXIC[0]//5, TOXIC[1]//5, 0)
    draw.line([(20, 20), (20+accent_len, 20)], fill=ac, width=2)
    draw.line([(20, 20), (20, 20+accent_len)], fill=ac, width=2)
    draw.line([(W-20, H-20), (W-20-accent_len, H-20)], fill=ac, width=2)
    draw.line([(W-20, H-20), (W-20, H-20-accent_len)], fill=ac, width=2)

    add_noise(img, 4)
    img.save(os.path.join(OUT_DIR, "og-image.png"), quality=95)
    print("[OK] og-image.png (1200x630)")


# ============================================================
# ASSET 6: Section Divider SVG-style gradient bar
# ============================================================
def create_section_divider():
    W, H = 1920, 80
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Gradient line from transparent → toxic → transparent
    mid = W // 2
    for x in range(W):
        dist = abs(x - mid)
        max_dist = mid
        if dist < max_dist:
            alpha = int(60 * (1 - dist / max_dist))
            draw.line([(x, H//2), (x, H//2+1)], fill=(TOXIC[0], TOXIC[1], TOXIC[2], alpha))

    # Center dot
    draw.ellipse([mid-3, H//2-3, mid+3, H//2+3], fill=(TOXIC[0], TOXIC[1], TOXIC[2], 80))

    img.save(os.path.join(OUT_DIR, "section-divider.png"))
    print("[OK] section-divider.png (1920x80)")


# ============================================================
# RUN ALL
# ============================================================
if __name__ == "__main__":
    print("\nGenerating Branding Zombie visual assets...\n")
    create_hero_bg()
    create_brand_pattern()
    create_service_icons()
    create_brand_canvas()
    create_og_image()
    create_section_divider()
    print("\nAll assets generated in public/assets/\n")
