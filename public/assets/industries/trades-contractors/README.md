# Trades & Contractors — page images

**Live page:** /industries/trades-contractors

Drop these files into **this folder** with these exact names, then enable each in
`src/data/industries.ts`.

| File | Page slot | Aspect | Size | What to shoot / generate |
|---|---|---|---|---|
| `hero.png` | Hero (top-right) | square | 1200×1200 | A dual-cab work truck or service van with a clean, freshly-installed wrap — brand colors and phone number readable from across the street. Golden hour, job site or driveway. |
| `1-vehicle-wraps.png` | In the wild #1 | wide | 1280×800 | Full-side wrap design mocked onto a white service van — bold brand colors, big phone number, license #, and service icons. |
| `2-crew-shirts.png` | In the wild #2 | tall | 900×1200 | Branded crew tee or hi-vis shirt on a contractor — logo on the chest, optional back print. Clean studio or on-site shot. |
| `3-yard-signs.png` | In the wild #3 | square | 1200×1200 | Corrugated yard sign staked in a front lawn — logo, service line, and phone. The kind of sign neighbors photograph. |
| `4-cards-magnets.png` | In the wild #4 | wide | 1280×800 | Flat-lay of business cards next to a magnetic truck-door sign in matching brand colors, on a workbench. |

## Enable in code

In `src/data/industries.ts`, in the `trades-contractors` entry, set:

```
heroImage.src               → "/assets/industries/trades-contractors/hero.png"
showcase[0] Vehicle wraps   → "/assets/industries/trades-contractors/1-vehicle-wraps.png"
showcase[1] Crew shirts     → "/assets/industries/trades-contractors/2-crew-shirts.png"
showcase[2] Yard signs      → "/assets/industries/trades-contractors/3-yard-signs.png"
showcase[3] Cards & magnets → "/assets/industries/trades-contractors/4-cards-magnets.png"
```
