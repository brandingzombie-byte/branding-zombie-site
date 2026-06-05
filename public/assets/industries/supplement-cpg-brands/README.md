# Supplement & CPG Brands — page images

**Live page:** /industries/supplement-cpg-brands

Drop these files into **this folder** with these exact names, then enable each in
`src/data/industries.ts`.

| File | Page slot | Aspect | Size | What to shoot / generate |
|---|---|---|---|---|
| `hero.png` | Hero (top-right) | square | 1200×1200 | Studio render of five SKUs from one supplement line — a tub, two bottles, a pouch, and a box — shoulder to shoulder so they read as one family, lit bright on a seamless dark surface. |
| `1-hero-render.png` | In the wild #1 | tall | 900×1200 | Studio-lit hero render of one finished tub or bottle — front label crisp and readable, soft reflection underneath. The shot for the PDP and Amazon main image. |
| `2-amazon-listing.png` | In the wild #2 | wide | 1280×800 | Laptop-and-phone mockup of an Amazon A+ listing — main thumbnail, ingredient callout strip, comparison block — holding up at thumbnail size. |
| `3-retail-shelf.png` | In the wild #3 | wide | 1280×800 | Real-shelf shot of three or four SKUs from one line in a vitamin aisle, facing out, clearly reading as a family next to generic tubs. |
| `4-paid-social-ad.png` | In the wild #4 | square | 1200×1200 | A scroll-stopping Meta-style ad — product comped into a gym or beach scene with one punchy headline and a flavor cue. Built square for feed. |

## Enable in code

In `src/data/industries.ts`, in the `supplement-cpg-brands` entry, set:

```
heroImage.src                  → "/assets/industries/supplement-cpg-brands/hero.png"
showcase[0] Hero render        → "/assets/industries/supplement-cpg-brands/1-hero-render.png"
showcase[1] Amazon listing     → "/assets/industries/supplement-cpg-brands/2-amazon-listing.png"
showcase[2] Retail shelf       → "/assets/industries/supplement-cpg-brands/3-retail-shelf.png"
showcase[3] Paid social ad     → "/assets/industries/supplement-cpg-brands/4-paid-social-ad.png"
```
