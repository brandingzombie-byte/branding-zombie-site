# Industry Pages — Image Shot List

Each industry page has image slots that currently render an **on-brand placeholder**
with the suggested shot. To swap in a real image:

1. Drop the file in `public/assets/industries/` (suggested naming below).
2. In `src/data/industries.ts`, set the matching `src:` on that industry's
   `heroImage` or `showcase[]` entry (uncomment the `src` line).
3. That's it — the placeholder is replaced automatically.

**Recommended formats:** WebP or PNG. Photographs/renders look best; flat-lays and
mockups are fine. Keep file sizes reasonable (< 400 KB each ideally).

| Aspect | Use | Suggested export size |
|---|---|---|
| `square` | hero visual, yard signs | 1200 × 1200 |
| `wide` | vehicle wraps, flat-lays | 1280 × 800 |
| `tall` | crew shirts, bottles | 900 × 1200 |

---

## Trades & Contractors  (`/industries/trades-contractors`)

| Slot | File (suggested) | Aspect | Shot | AI-gen prompt starter |
|---|---|---|---|---|
| Hero | `trades-hero.png` | square | A dual-cab work truck / service van with a clean, freshly-installed wrap — brand colors + phone readable across the street. Golden hour, job site or driveway. | "Photorealistic golden-hour photo of a white service van with a bold vinyl wrap (teal + black), large phone number, parked in a suburban driveway, shallow depth of field" |
| Vehicle wraps | `trades-wrap.png` | wide | Full-side wrap design mocked onto a white service van — bold colors, big phone number, license #, service icons. | "Side-view product mockup of a cargo van wrap design, bold brand colors, HVAC icons, large phone number, studio background" |
| Crew shirts | `trades-shirt.png` | tall | Branded crew tee / hi-vis shirt on a contractor — logo on chest, optional back print. | "Studio photo of a contractor wearing a navy crew t-shirt with a chest logo, hi-vis accents, plain background" |
| Yard signs | `trades-yardsign.png` | square | Corrugated yard sign staked in a front lawn — logo, service line, phone. | "Photo of a corrugated plastic yard sign staked in a green front lawn, company logo, phone number, soft daylight" |
| Cards & door magnets | `trades-cards.png` | wide | Flat-lay of business cards next to a magnetic truck-door sign in matching brand colors, on a workbench. | "Top-down flat-lay of business cards and a magnetic vehicle door sign in matching brand colors on a wooden workbench" |

---

## Batch 2 industries (Restaurants, Salons & Barbershops, Supplements)

*Image suggestions for these are generated with their page content in Phase B and
appended here once their `industries.ts` entries land. Each will follow the same
pattern: 1 hero + 4 "in the wild" showcase slots tuned to that vertical (e.g.
restaurants → menu, signage, to-go packaging, storefront; salons → window decal,
price menu, apparel, gift cards; supplements → label render, Amazon A+, shelf shot,
lifestyle ad).*
