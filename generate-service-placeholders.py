#!/usr/bin/env python
"""
Generate dark-themed placeholder PNGs for the 6 service landing pages.

Creates 6 heroes (1200x1500 / 4:5) + 5 gallery images per service (1280x960 / 4:3)
= 36 images total. Placeholders are intentional design — dark gradient, subtle
noise, editorial typography — not lorem ipsum.

Swap these out when real photography / nano-banana-2 output is ready. The file
paths match what src/data/services.ts already references.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import random
import math

ROOT = Path(__file__).parent / "public" / "assets" / "services"

# Brand palette (matches globals.css)
GRAVE = (17, 23, 20)         # #111714
SURFACE = (26, 31, 28)        # #1A1F1C
ELEVATED = (36, 43, 39)       # #242B27
TOXIC = (191, 255, 0)         # #BFFF00
NEON = (192, 237, 8)          # #C0ED08
CYAN = (0, 255, 212)          # #00FFD4
DARK_TEXT = (240, 244, 240)   # #F0F4F0
DIM_TEXT = (126, 140, 130)    # #7E8C82

# Per-service config: (accent_rgb, gallery_labels)
SERVICES = {
    "web-design": {
        "accent": NEON,
        "hero_label": "Web Design",
        "sub": "Cumming, GA · 10 day delivery",
        "gallery": [
            "Homepage build",
            "Service redesign",
            "Restaurant site",
            "Professional firm",
            "Multi-page system",
        ],
    },
    "ai-workflows": {
        "accent": CYAN,
        "hero_label": "AI Workflows",
        "sub": "Automation · Cumming, GA",
        "gallery": [
            "Chatbot integration",
            "Lead capture",
            "Scheduling flow",
            "Review loop",
            "Invoice reminders",
        ],
    },
    "graphic-design": {
        "accent": NEON,
        "hero_label": "Graphic Design",
        "sub": "Brand identity · Cumming, GA",
        "gallery": [
            "Restaurant brand",
            "Startup logo",
            "Menu & signage",
            "Pitch deck",
            "Full rebrand",
        ],
    },
    "print-services": {
        "accent": TOXIC,
        "hero_label": "Print Services",
        "sub": "Cards · Banners · Wraps",
        "gallery": [
            "Business cards",
            "Vehicle wrap",
            "Yard signs",
            "Printed menus",
            "Custom apparel",
        ],
    },
    "social-media": {
        "accent": CYAN,
        "hero_label": "Social Media",
        "sub": "Content · Cumming, GA",
        "gallery": [
            "Restaurant feed",
            "Service business",
            "Boutique launch",
            "Fitness reels",
            "Practice content",
        ],
    },
    "ecommerce": {
        "accent": NEON,
        "hero_label": "Ecommerce",
        "sub": "Shopify · Cumming, GA",
        "gallery": [
            "Boutique store",
            "Wellness launch",
            "Food & beverage",
            "Service + product",
            "Print on demand",
        ],
    },
}


def load_font(size: int, bold: bool = False):
    """Try several Windows fonts; fall back to PIL default."""
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def radial_gradient(size: tuple[int, int], center: tuple[float, float],
                    inner: tuple[int, int, int], outer: tuple[int, int, int],
                    radius: float, alpha: float = 1.0) -> Image.Image:
    """Return an RGBA overlay with a soft radial gradient."""
    w, h = size
    cx, cy = center[0] * w, center[1] * h
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    pixels = overlay.load()
    max_r = radius * max(w, h)
    for y in range(h):
        for x in range(w):
            dx = x - cx
            dy = y - cy
            d = math.sqrt(dx * dx + dy * dy)
            if d > max_r:
                continue
            t = 1 - (d / max_r)
            # soft falloff
            t = t * t
            r = int(inner[0] * t + outer[0] * (1 - t))
            g = int(inner[1] * t + outer[1] * (1 - t))
            b = int(inner[2] * t + outer[2] * (1 - t))
            a = int(255 * t * alpha)
            pixels[x, y] = (r, g, b, a)
    return overlay


def fast_radial_gradient(size: tuple[int, int], center: tuple[float, float],
                         accent: tuple[int, int, int], alpha: float = 0.25) -> Image.Image:
    """
    Faster radial approximation using a small source image and upscaling.
    Produces the same soft accent glow without the per-pixel math cost.
    """
    w, h = size
    small = 128
    grad = Image.new("RGBA", (small, small), (0, 0, 0, 0))
    px = grad.load()
    cx, cy = center[0] * small, center[1] * small
    max_r = 0.6 * small
    for y in range(small):
        for x in range(small):
            dx = x - cx
            dy = y - cy
            d = math.sqrt(dx * dx + dy * dy)
            if d > max_r:
                continue
            t = 1 - (d / max_r)
            t = t * t
            px[x, y] = (accent[0], accent[1], accent[2], int(255 * t * alpha))
    return grad.resize((w, h), Image.LANCZOS).filter(ImageFilter.GaussianBlur(radius=20))


def add_noise(img: Image.Image, intensity: int = 8) -> Image.Image:
    """Overlay subtle monochrome noise for texture."""
    w, h = img.size
    noise = Image.new("L", (w, h))
    pixels = noise.load()
    rng = random.Random(42)
    for y in range(h):
        for x in range(w):
            pixels[x, y] = rng.randint(0, intensity)
    noise_rgba = Image.merge("RGBA", (noise, noise, noise, noise))
    return Image.alpha_composite(img.convert("RGBA"), noise_rgba)


def base_canvas(size: tuple[int, int], accent: tuple[int, int, int]) -> Image.Image:
    """Build the editorial dark base used by every placeholder."""
    w, h = size
    # Dark vertical gradient: surface at top, grave at bottom
    img = Image.new("RGB", size, GRAVE)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        r = int(SURFACE[0] * (1 - t) + GRAVE[0] * t)
        g = int(SURFACE[1] * (1 - t) + GRAVE[1] * t)
        b = int(SURFACE[2] * (1 - t) + GRAVE[2] * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    img = img.convert("RGBA")

    # Accent glows (asymmetric, matches CPG Hero ambient drift)
    img = Image.alpha_composite(img, fast_radial_gradient(size, (0.25, 0.30), accent, alpha=0.28))
    img = Image.alpha_composite(img, fast_radial_gradient(size, (0.80, 0.70), CYAN, alpha=0.15))

    # Subtle noise
    img = add_noise(img, intensity=6)

    return img


def draw_editorial_frame(draw: ImageDraw.ImageDraw, size: tuple[int, int],
                         accent: tuple[int, int, int], corner: int = 48):
    """Draw brutalist corner registration marks and a thin inset border."""
    w, h = size
    border = (240, 244, 240, 30)  # dark-border
    # Thin inset frame
    inset = 30
    draw.rectangle([inset, inset, w - inset, h - inset], outline=border, width=1)
    # Corner marks (toxic accent)
    for (cx, cy) in [(inset, inset), (w - inset, inset), (inset, h - inset), (w - inset, h - inset)]:
        if cx == inset:
            draw.line([(cx, cy), (cx + corner, cy)], fill=accent, width=2)
            sign = 1 if cy == inset else -1
            draw.line([(cx, cy), (cx, cy + sign * corner)], fill=accent, width=2)
        else:
            draw.line([(cx, cy), (cx - corner, cy)], fill=accent, width=2)
            sign = 1 if cy == inset else -1
            draw.line([(cx, cy), (cx, cy + sign * corner)], fill=accent, width=2)


def compose_hero(slug: str, cfg: dict, out_path: Path):
    """4:5 hero — 1200×1500. Service name set big, eyebrow small."""
    w, h = 1200, 1500
    img = base_canvas((w, h), cfg["accent"])
    draw = ImageDraw.Draw(img, "RGBA")

    draw_editorial_frame(draw, (w, h), cfg["accent"])

    # Eyebrow (top-left, small caps feel)
    eyebrow = cfg["sub"].upper()
    font_eb = load_font(28)
    tx, ty = 80, 120
    # Accent rule before eyebrow
    draw.line([(tx, ty + 18), (tx + 48, ty + 18)], fill=cfg["accent"], width=3)
    draw.text((tx + 64, ty), eyebrow, font=font_eb, fill=DIM_TEXT)

    # Main label (mid-bottom, large)
    label = cfg["hero_label"]
    font_label = load_font(148, bold=True)
    # Approximate text size and place it left-aligned, bottom
    bbox = draw.textbbox((0, 0), label, font=font_label)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    lx = 80
    ly = h - 280 - th
    draw.text((lx, ly), label, font=font_label, fill=DARK_TEXT)

    # Accent underline
    underline_y = ly + th + 8
    draw.rectangle([lx, underline_y, lx + min(tw, w - 160), underline_y + 6],
                   fill=cfg["accent"])

    # Micro caption below
    cap_font = load_font(24)
    draw.text((lx, underline_y + 32), "BRANDING ZOMBIE DESIGNS",
              font=cap_font, fill=DIM_TEXT)

    # Slug marker top-right (brutalist)
    slug_font = load_font(22)
    draw.text((w - 80 - 10 * len(slug), 120), slug.upper().replace("-", " / "),
              font=slug_font, fill=DIM_TEXT, anchor=None)

    img.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  hero  -> {out_path.relative_to(ROOT.parent.parent)}")


def compose_gallery(slug: str, cfg: dict, idx: int, label: str, out_path: Path):
    """4:3 gallery — 1280×960."""
    w, h = 1280, 960
    img = base_canvas((w, h), cfg["accent"])
    draw = ImageDraw.Draw(img, "RGBA")

    draw_editorial_frame(draw, (w, h), cfg["accent"], corner=36)

    # Large index number (top-left, ghosted)
    num = f"{idx:02d}"
    num_font = load_font(420, bold=True)
    draw.text((60, 40), num, font=num_font,
              fill=(240, 244, 240, 18))  # very dim

    # Category eyebrow
    eb_font = load_font(22)
    eb = cfg["hero_label"].upper()
    draw.line([(80, 130), (80 + 40, 130)], fill=cfg["accent"], width=3)
    draw.text((80 + 56, 118), eb, font=eb_font, fill=DIM_TEXT)

    # Gallery title (large, bottom-left)
    title_font = load_font(72, bold=True)
    bbox = draw.textbbox((0, 0), label, font=title_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    lx = 80
    ly = h - 180 - th
    draw.text((lx, ly), label, font=title_font, fill=DARK_TEXT)

    # Accent underline
    underline_y = ly + th + 8
    draw.rectangle([lx, underline_y, lx + min(tw, w - 160), underline_y + 5],
                   fill=cfg["accent"])

    # Footer strip (brand + slug)
    footer_font = load_font(20)
    draw.text((lx, underline_y + 28), "PLACEHOLDER · SWAP WITH REAL WORK",
              font=footer_font, fill=DIM_TEXT)

    # Slug marker top-right
    sl_font = load_font(20)
    draw.text((w - 80 - 12 * len(slug), 90),
              slug.upper().replace("-", " / "), font=sl_font, fill=DIM_TEXT)

    img.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  gal{idx} -> {out_path.relative_to(ROOT.parent.parent)}")


def main():
    for slug, cfg in SERVICES.items():
        print(f"\n{slug}")
        service_dir = ROOT / slug
        service_dir.mkdir(parents=True, exist_ok=True)

        # Hero
        compose_hero(slug, cfg, service_dir / "hero.png")

        # Gallery
        for i, gallery_label in enumerate(cfg["gallery"], start=1):
            compose_gallery(slug, cfg, i, gallery_label,
                            service_dir / f"gallery-{i}.png")

    print(f"\nOK: Generated 36 placeholder images under {ROOT}")


if __name__ == "__main__":
    main()
