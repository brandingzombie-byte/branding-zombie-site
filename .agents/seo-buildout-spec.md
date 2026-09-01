# SEO Build-Out Spec — shared rules for all build agents (8/31/26)

Mission: execute the keyword match plan (Research/SEO-Keyword-Match-Plan-8-31-26.md in the
Design Files folder — summarized here) on branch `seo-services-page`. Every page must match
real search language, carry AEO structure, and meet the design bar below.

## Hard rules (violating any of these fails the task)

1. **No fabrication.** Only claims already in the repo or listed here may be used:
   5.0★ Google rating · 15+ years experience · 80+ projects · BBB Accredited (A-) ·
   most sites live in 2–3 weeks · real clients: Adams Detailing (adamsdetailingga.com),
   LC Institute, Aquarium Center, JS Torres, Wizardly Solutions, LinaBloom Candles,
   Ember & Iron. NO invented case-study numbers, NO fake testimonials, NO invented reviews.
2. **Print framing:** the studio has an "in-house print pipeline." NEVER imply owning or
   not owning press equipment. Never describe it as reselling.
3. **Pricing:** only numbers already in src/data (services.ts tiers, offer-catalog.ts):
   sites from $995 (startup special) / $1,500 standard · logo $750 · branding $2,500 ·
   SEO $499/$999/$1,999/mo (3-mo min) · social $699/mo · email $499–$1,499/mo ·
   web care plans from $100/mo · Shopify care from $200/mo · hosting ~$20/mo ·
   AI workflows $750 + $149/mo. If a number you need doesn't exist, write `TODO-PRICE`
   and flag it in your report — do not invent.
4. **Stay in your assigned files.** Do NOT touch src/app/sitemap.ts, package.json, or
   any file owned by another agent (ownership list is in your prompt). Do NOT run
   `npm run build` or `npm install` (the orchestrator builds once at the end). You MAY
   run `npx tsc --noEmit` to self-check.
5. Voice: plain-English, neighborly, darkly funny zombie brand ("your site isn't dead,
   it's undead"), never corporate. Match the copy in services.ts / tattoo-marketing.ts.

## Brand tokens (globals.css — use CSS vars, never hardcode)

- Ground: `--color-grave` #111714 · `--color-surface` #1A1F1C · `--color-elevated` #242B27
- CTA: `--color-toxic` #BFFF00 (text on it: `--color-grave`), hover `--color-toxic-deep`
- Accents: `--color-neon` #C0ED08 · `--color-cyan` #00FFD4 · text-safe: `--color-toxic-text`
  #DFFF66, `--color-cyan-text` #66FFE3
- Type: `--font-display` for headlines (`font-[family-name:var(--font-display)]`),
  text sizes via `text-[length:var(--text-h2)]` etc. Light sections: `--color-surface-0/1/2`.
- Existing building blocks to REUSE instead of inventing: Section, SectionSeparator,
  ZombieHand + HANDS (src/data/hands.ts), ServiceLeadForm / leadFormCopy, TierCards,
  Reveal (components/mailers), useReveal/useInView, gallery4, components in
  src/components/tattoo/* and src/components/locations/*.

## Design bar (Emil Kowalski rules — apply to anything you build or touch)

- Animate transform + opacity only; `ease-out` on entrances (never ease-in); UI motion
  ≤300ms; entrances from scale(0.95)/translateY(8-24px) + opacity 0, never scale(0).
- Buttons: `active:scale-[0.97]` with `transition-transform duration-150`.
- Stagger list entrances 30–80ms. Gate hover effects: `@media (hover:hover)`.
- Respect prefers-reduced-motion (site pattern: framer-motion MotionConfig
  reducedMotion="user", or motion-reduce: utilities).
- Mobile-first: every section must read at 375px; wide tables get overflow-x-auto.

## AEO structure (every new/updated page)

- **Answer capsule** at top: 40–60 word definitional paragraph naming business + place +
  service + price anchor (pattern: src/data/service-aeo.ts answerFirst).
- **FAQPage JSON-LD** for FAQs (pattern: components/services/ServiceJsonLd.tsx or the
  tattoo hub's JSON-LD) — questions phrased as owners actually search.
- Visible "Last updated" or dateModified where the page type supports it.
- H1/H2s match real query phrasing (each task prompt lists its target keywords).
- Comparison content as real `<table>`, numbered steps as `<ol>`.
- Internal links: link INTO your page's money targets (/services/seo, /services/branding,
  /services/web-design, /brand-checkup, /free-site-audit) with natural anchors.

## Images / icons

- Hero/placeholder art: reuse the house generator —
  `python -c` importlib pattern on generate-service-placeholders.py, call
  `gen.compose_hero(slug, {"accent": gen.CYAN|gen.NEON|gen.TOXIC, "hero_label": "...",
  "sub": "..."}, ABSOLUTE_out_path)` (pass absolute Path; sizes 1200x1500).
- Real work images: pull from src/data/portfolio.ts entries (public/assets/...).
- Icons: @phosphor-icons/react via src/components/icons (see ServiceIconName usage).
- Never use an AI-invented logo — the real BZD marks are in public/assets.

## Report format (your final message)

List: files created/changed · routes added (for sitemap wiring by orchestrator) ·
target keywords covered · any TODO-PRICE or open flags · what you verified (tsc, etc.).
