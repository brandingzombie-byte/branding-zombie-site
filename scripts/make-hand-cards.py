import os
from PIL import Image
from rembg import remove, new_session

SRC = r"A:\Ink Spatter Studio\Design Files\Branding Zombie Designs\Marketing Assets\Zombie Hands"
OUT = r"A:\Ink Spatter Studio\Design Files\Branding Zombie Designs\bzd-home-polish\public\hands\cards"

# (source, slug, which end the HAND is on, window as a fraction of the long edge)
JOBS = [
    ("ZH-22_right_beckon_woman.png",  "zh22-beckon",     "left",   0.42),
    ("ZH-30_left_chefs-kiss_man.png", "zh30-chefs-kiss", "right",  0.50),
    ("ZH-06_diagTR_ok-sign_man.png",  "zh06-ok-sign",    "left",   0.58),
    ("ZH-08_top_highfive_woman.png",  "zh08-highfive",   "bottom", 0.58),
]

sess = new_session("isnet-general-use")
os.makedirs(OUT, exist_ok=True)

for fname, slug, anchor, frac in JOBS:
    cut = remove(Image.open(os.path.join(SRC, fname)).convert("RGBA"), session=sess).convert("RGBA")
    cut = cut.crop(cut.split()[-1].getbbox())
    w, h = cut.size
    side = int(max(w, h) * frac)

    if anchor == "left":    box = (0, 0, min(w, side), h)
    elif anchor == "right": box = (max(0, w - side), 0, w, h)
    elif anchor == "bottom":box = (0, max(0, h - side), w, h)
    elif anchor == "top":   box = (0, 0, w, min(h, side))
    hand = cut.crop(box)
    hand = hand.crop(hand.split()[-1].getbbox())

    for scale, suffix in ((192, ""), (384, "@2x")):
        r = scale / max(hand.size)
        im = hand.resize((max(1, round(hand.width*r)), max(1, round(hand.height*r))), Image.LANCZOS)
        p = os.path.join(OUT, f"{slug}{suffix}.webp")
        im.save(p, "WEBP", quality=82, alpha_quality=90, method=6)
        print(f"{slug}{suffix}: {im.width}x{im.height} {os.path.getsize(p)}B")
