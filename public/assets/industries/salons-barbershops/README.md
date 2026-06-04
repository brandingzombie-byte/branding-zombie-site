# Salons & Barbershops — page images

**Live page:** /industries/salons-barbershops

Drop these files into **this folder** with these exact names, then enable each in
`src/data/industries.ts`.

| File | Page slot | Aspect | Size | What to shoot / generate |
|---|---|---|---|---|
| `hero.png` | Hero (top-right) | square | 1200×1200 | Shot through the glass of a barbershop at golden hour — a sharp logo decal on the door, a price list on the wall, a barber mid-fade. A real, busy shop, not stock. |
| `1-window-decal.png` | In the wild #1 | wide | 1280×800 | A clean vinyl decal on a salon's front door — logo, tagline, hours — shot from the sidewalk with the lit interior glowing behind the glass. |
| `2-wall-price-menu.png` | In the wild #2 | tall | 900×1200 | A framed price menu on the wall beside the mirror station — services and prices clean enough to read from the waiting bench. No handwriting. |
| `3-apron-towels.png` | In the wild #3 | square | 1200×1200 | A folded stack of black towels and a stylist's apron, each with the embroidered shop logo, staged on the station next to the clippers. |
| `4-gift-loyalty-cards.png` | In the wild #4 | wide | 1280×800 | A printed gift card and matching loyalty punch card fanned on the counter — thick stock, foil logo, the kind a client keeps in their wallet. |

## Enable in code

In `src/data/industries.ts`, in the `salons-barbershops` entry, set:

```
heroImage.src                 → "/assets/industries/salons-barbershops/hero.png"
showcase[0] Window decal      → "/assets/industries/salons-barbershops/1-window-decal.png"
showcase[1] Wall price menu   → "/assets/industries/salons-barbershops/2-wall-price-menu.png"
showcase[2] Apron & towels    → "/assets/industries/salons-barbershops/3-apron-towels.png"
showcase[3] Gift & loyalty    → "/assets/industries/salons-barbershops/4-gift-loyalty-cards.png"
```
