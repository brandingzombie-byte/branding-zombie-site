# Industry Pages — Image Shot List

Image organization now lives **in the project** under
`public/assets/industries/`, with a `README.md` per industry that lists every
slot, the exact filename, aspect, export size, and the one-line `src:` change to
enable it. Start there:

- `public/assets/industries/README.md` — overview + conventions
- `public/assets/industries/trades-contractors/README.md`
- `public/assets/industries/restaurants/README.md`
- `public/assets/industries/salons-barbershops/README.md`
- `public/assets/industries/supplement-cpg-brands/README.md`

Each page has **1 hero + 4 "in the wild" showcase slots**. Until a real image is
added, the page shows an on-brand placeholder describing the shot. The shoot
brief for every slot is also the `suggestion` field in
`src/data/industries.ts` and is shown on the placeholder itself.

## Specs (recap)

| Aspect | Used for | Export size |
|---|---|---|
| `square` | hero + square showcase | 1200 × 1200 |
| `wide`   | wide showcase | 1280 × 800 |
| `tall`   | tall showcase | 900 × 1200 |

Format: WebP or PNG, ideally < 400 KB each.

## AI-generation prompt starters (sample — Trades & Contractors)

The `suggestion` text on each slot works as a prompt as-is; here are a few
expanded starters. Mirror this style for the other industries using their slot
suggestions.

| Slot | Prompt starter |
|---|---|
| Hero (`hero.png`) | "Photorealistic golden-hour photo of a white service van with a bold vinyl wrap (brand colors), large phone number, parked in a suburban driveway, shallow depth of field, clean and professional" |
| Vehicle wraps (`1-vehicle-wraps.png`) | "Side-view product mockup of a cargo van wrap design, bold brand colors, trade service icons, large phone number, neutral studio background" |
| Crew shirts (`2-crew-shirts.png`) | "Studio photo of a contractor wearing a navy crew t-shirt with a chest logo, hi-vis accents, plain background, soft lighting" |
| Yard signs (`3-yard-signs.png`) | "Photo of a corrugated plastic yard sign staked in a green front lawn, company logo, phone number, soft daylight" |
| Cards & magnets (`4-cards-magnets.png`) | "Top-down flat-lay of business cards and a magnetic vehicle door sign in matching brand colors on a wooden workbench" |

For Restaurants, Salons & Barbershops, and Supplement & CPG Brands, use the
`suggestion` text in each slot (see that industry's folder README) as the prompt
— they were written to double as shoot briefs and generation prompts.
