# Restaurants & Food Service — page images

**Live page:** /industries/restaurants

Drop these files into **this folder** with these exact names, then enable each in
`src/data/industries.ts`.

| File | Page slot | Aspect | Size | What to shoot / generate |
|---|---|---|---|---|
| `hero.png` | Hero (top-right) | square | 1200×1200 | Warm dusk shot of an independent diner storefront — hand-painted window logo glowing under string lights, a framed menu by the door, a couple walking in. Local, inviting, clearly not a chain. |
| `1-dine-in-menu.png` | In the wild #1 | tall | 900×1200 | Overhead of a single-page printed menu on a butcher-block table — organized, easy to read, next to a mug and a fork. No clip art, clear prices, one typeface. |
| `2-window-sign.png` | In the wild #2 | wide | 1280×800 | Street-level photo of a café window with the logo cut in vinyl and "OPEN" hours below, sunlight catching the glass, a chalkboard A-frame outside. |
| `3-to-go-cups.png` | In the wild #3 | square | 1200×1200 | Two to-go coffee cups and a kraft take-out box on a counter, all stamped with the same logo, a hand reaching for one. |
| `4-social-post.png` | In the wild #4 | square | 1200×1200 | Tight, well-lit close-up of a signature dish — steam, glossy sauce, a fork pulling a bite — framed as a square Instagram post with the logo subtly in the corner. |

## Enable in code

In `src/data/industries.ts`, in the `restaurants` entry, set:

```
heroImage.src                → "/assets/industries/restaurants/hero.png"
showcase[0] Printed menu     → "/assets/industries/restaurants/1-dine-in-menu.png"
showcase[1] Window sign      → "/assets/industries/restaurants/2-window-sign.png"
showcase[2] To-go cups       → "/assets/industries/restaurants/3-to-go-cups.png"
showcase[3] Social post      → "/assets/industries/restaurants/4-social-post.png"
```
