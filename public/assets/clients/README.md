# Client logos

Drop client logo files here. The Brand Track Record Bar on service pages
reads from this folder.

## File conventions

- **Format:** SVG preferred (scales cleanly at any size). PNG with
  transparent background is acceptable as a fallback.
- **Filename:** `<slug>.svg` or `<slug>.png` — lowercase, hyphen-separated,
  matching the `slug` field in `src/data/clients.ts` (to be added in the
  next Phase C pass).
- **Dimensions:** Any. SVGs are rendered at a fixed display height of
  ~32px on desktop, ~24px on mobile. PNGs should be at least 128px tall
  at 2x density so they're crisp on retina.
- **Background:** transparent.
- **Color:** Single-color monochrome wordmarks read best in the strip.
  Two-color logos are fine; avoid full-color gradient marks on this bar.

## Current placeholder list

Until real logos land, the Brand Track Record Bar renders text-only
wordmarks for these portfolio clients:

- papas-kitchen (Papa's Kitchen Diner — local GA)
- enigma-computers (Enigma Computers — local Cumming)
- planters-etc (Planters Etc.)
- squeeze-me-skinny (Squeeze Me Skinny)
- jay-scotts (Jay Scotts)
- pure-blanco (Pure Blanco)
- muscleology (Muscleology)
- sharp-edge (Sharp Edge Construction)

Drop real SVGs at `public/assets/clients/<slug>.svg` and they'll replace
the text wordmark automatically once wired in.
