# Zombie Hands Interactive System — Execution Spec

Goal: Add disembodied zombie hands emerging from section edges across the homepage,
matching the concept screenshot. Hands must feel "alive" (parallax, cursor-follow,
peek-in intros, idle sway) while adding minimal page weight and ZERO layout shift.

Run with subagents. Each agent's task is independent except where noted.
Source assets: `Assets to add/Zombie Hand/` (7 PNGs, ~23MB raw — DO NOT ship raw).

## Hard constraints (all agents)
- Total added image weight on homepage: <= 450KB (all hands combined, 1x WebP)
- CLS contribution: 0. Hands are absolutely positioned, aria-hidden,
  pointer-events: none, inside overflow-clipped section wrappers.
- Animate ONLY transform + opacity. No layout properties. No heavy libraries —
  no framer-motion for this; vanilla rAF + CSS keyframes + IntersectionObserver.
- Respect `prefers-reduced-motion: reduce` → static hands, no follow/parallax.
- Hands are decorative: `alt=""`, `aria-hidden="true"`, `loading="lazy"`
  (except any hand visible in initial viewport — none planned).
- Mobile (<768px): max 3 hands rendered, scaled ~55%, cursor-follow disabled,
  parallax disabled (idle + peek only).

---

## AGENT 1 — Asset Pipeline (run first, blocking)

Input: `Assets to add/Zombie Hand/*.png` (7 files)
Output: `public/hands/{id}.webp` + `public/hands/{id}@2x.webp`

Steps:
1. `npm i -D sharp` (if not present).
2. Create `scripts/optimize-hands.mjs`:
   - For each PNG: `.trim()` transparent padding (record trim offsets — the
     art direction depends on the wrist bleeding off-edge, so after trim,
     placement CSS handles the bleed, not baked-in padding).
   - Resize: longest edge 720px (1x) and 1440px (2x), withoutEnlargement.
   - Export WebP quality 80, alphaQuality 85, effort 6.
   - Log before/after sizes; FAIL the script if any 1x file > 90KB or
     total 1x set > 450KB (drop quality to 72 and retry once before failing).
3. Slug the ids: zh01-thumbsup-l, zh09-thumbsdown-l, zh10-rockon-r,
   zh11-point-up, zh25-point-diag, zh34-highfive-l, zh37-thumbsup-r.
4. Record each output's intrinsic aspect ratio into
   `src/data/hands.ts` (see Agent 2 contract) so width/height are always set.

Expected result: ~23MB → roughly 350–450KB total for the 1x set.

---

## AGENT 2 — ZombieHand component + motion engine

Create `src/components/ZombieHand.tsx` ("use client") + `src/data/hands.ts`.

### Props contract
```ts
type HandBehavior = "peek" | "parallax" | "follow" | "idle";
interface ZombieHandProps {
  src: string;            // 1x path; component builds srcSet with @2x
  width: number; height: number;   // intrinsic, for zero-CLS
  edge: "left" | "right" | "bottom" | "top";
  behaviors: HandBehavior[];       // stackable, e.g. ["peek","idle"]
  offset?: string;        // CSS position along the edge, e.g. "18%"
  bleed?: string;         // how far the wrist hangs off-edge, e.g. "-12%"
  scale?: number;         // desktop scale multiplier
  rotate?: number;        // base rotation deg
  followStrength?: number; // px of max cursor drift, default 22
  parallaxSpeed?: number;  // -0.5..0.5, default 0.12
  zIndex?: number;
  className?: string;
  mobile?: boolean;        // render on mobile? default false
}
```

### Behavior implementations
- **peek**: hidden translated fully off-edge; on IntersectionObserver
  (threshold 0.35, once) transition in over 700ms with a spring-ish
  cubic-bezier(0.34, 1.56, 0.64, 1) — slight overshoot = "lurch".
  Reuse/extend the existing `lib/useInView.ts` if compatible.
- **parallax**: single shared scroll listener (module-level, passive,
  rAF-throttled) drives translateY = scrollDelta * parallaxSpeed,
  clamped ±60px. One listener for all hands, not one per hand.
- **follow**: shared pointermove listener; each hand lerps toward the
  cursor direction (factor 0.06 per frame) capped at followStrength px,
  plus rotate up to ±4deg toward cursor. Desktop pointer:fine only.
  rAF loop pauses when the hand is off-screen (IO-driven).
- **idle**: CSS keyframes, 4–6s ease-in-out infinite alternate, tiny
  translateY (4–6px) + rotate (1.5deg). Randomize duration per instance
  (inline style) so hands don't sway in sync.

### Structural rules
- Parent sections get `relative` + a `overflow-x: clip` wrapper if hands
  bleed horizontally (do NOT clip vertically for bottom-emerging hands —
  use a positioned inner wrapper instead so the hand can rise above the
  section seam).
- Compose transforms in one style string: base(bleed/rotate/scale) +
  peek + parallax + follow. Never fight CSS animation transforms with JS
  transforms — idle sway lives on the <img>, JS transforms on the wrapper div.
- `prefers-reduced-motion`: render final resting position, skip all JS listeners.

---

## AGENT 3 — Placement map (homepage integration)

Match the concept screenshot. Section components live in `src/components/`.
Semantics matter — the gesture should comment on the content beside it.

| # | Hand | Section / anchor | Edge | Behaviors | Notes |
|---|------|------------------|------|-----------|-------|
| 1 | zh09-thumbsdown-l | PainPoints — beside the 75%/53%/76% stats | right | peek, parallax | Thumbs-down at the bad-website stats. `mobile: true` (hero moment of the concept). |
| 2 | zh25-point-diag | PainPoints — upper left, pointing in at the "If your website looks like it's from 2016" headline | left | peek, idle | Diagonal pointer aims at headline. |
| 3 | zh01-thumbsup-l | Testimonials — beside the 5.0 rating / quote | left | peek, follow | Approval next to social proof. `mobile: true`. |
| 4 | zh11-point-up | SectionSeparator between Portfolio and Pricing — rises from below the seam pointing up at "Pick a package" | bottom | peek, parallax | The "crawling out of the grave" beat. Vertical bleed allowed. |
| 5 | zh37-thumbsup-r | Pricing — beside the Growth Kit (most popular) card | right | peek, idle | Endorses the featured tier. `mobile: true`. |
| 6 | zh10-rockon-r | FAQ — right edge near "Questions? We've got answers." | right | idle, follow | Playful rock-on; follow gives it life while reading. |
| 7 | zh34-highfive-l | FinalCTA — left of "Stop losing customers today." / near the book-a-call button | left | peek, follow | High-five reaching toward the CTA; followStrength 30 so it "reaches" for the cursor near the button. |

Rules:
- z-index below any interactive elements; hands must never overlap CTAs,
  form fields, or nav at any breakpoint (test 1280 / 1024 / 768 / 390).
- Tune `offset`/`bleed`/`scale` visually per hand; wrists must always be
  cut by the edge (disembodied), never floating with a visible stump end.
- Do NOT add hands to Hero (it already has the hero hand art) or Navbar.

---

## AGENT 4 — QA & performance gate (run last)

1. `npm run build` clean, no type errors.
2. Verify total hand payload on homepage <= 450KB (network tab / build output).
3. Lighthouse (mobile + desktop): CLS must remain 0.00 from hands;
   LCP unchanged (hands are lazy, none in initial viewport).
4. Toggle `prefers-reduced-motion` → all hands static, zero listeners attached.
5. Scroll the full page at 4x CPU throttle — no dropped-frame jank from the
   shared rAF loops; confirm only ONE scroll and ONE pointermove listener exist.
6. Mobile viewport: exactly 3 hands render (zh09, zh01, zh37), scaled down,
   no cursor-follow.
7. Screenshot each section and eyeball against the concept image.

## Kickoff
`claude "Read ZOMBIE-HANDS-SPEC.md and execute it. Run Agent 1 first, then Agents 2 and 3 in parallel as subagents, then Agent 4 as the verification gate."`
