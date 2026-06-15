# Industry page images

Each industry landing page (`/industries/<slug>`) has **1 hero image + 4 "in the
wild" showcase images**. Until you add a real image, the page shows a tasteful,
on-brand placeholder that describes the shot — so pages can ship before photos
exist, and nothing looks broken.

## How it works

1. Open your industry's folder below and read its `README.md`.
2. Drop image files into that folder using the **exact names** listed.
3. Enable each one in `src/data/industries.ts` by setting the matching `src:`
   line (each folder README gives you the exact line to paste).
   → Or just tell Claude **"wire up the &lt;industry&gt; images"** and it's done.
4. The placeholder is replaced automatically on the next build.

## Folders (one per page)

| Folder | Live page |
|---|---|
| `trades-contractors/`    | /industries/trades-contractors |
| `restaurants/`           | /industries/restaurants |
| `salons-barbershops/`    | /industries/salons-barbershops |
| `supplement-cpg-brands/` | /industries/supplement-cpg-brands |
| `gyms-fitness/`          | /industries/gyms-fitness |
| `auto-repair/`           | /industries/auto-repair |
| `home-services/`         | /industries/home-services |
| `medical-wellness/`      | /industries/medical-wellness |
| `ecommerce-dtc/`         | /industries/ecommerce-dtc |

## Specs

| Aspect | Used for | Export size |
|---|---|---|
| `square` | hero + square showcase slots | 1200 × 1200 |
| `wide`   | wide showcase slots | 1280 × 800 |
| `tall`   | tall showcase slots | 900 × 1200 |

- **Format:** WebP or PNG. Aim for **< 400 KB** each (these are below-the-fold
  and lazy-loaded, but smaller is faster).
- **Naming:** lowercase, exactly as the folder README lists (e.g. `hero.png`,
  `1-vehicle-wraps.png`). Keep the number prefix — it controls on-page order.

## Generating images?

Every slot's shoot brief doubles as an AI-generation prompt. You'll find the brief
on the page placeholder itself, in the `suggestion` field in
`src/data/industries.ts`, and summarized in each folder's README. Longer
prompt starters live in `.agents/industry-pages-image-shotlist.md`.
