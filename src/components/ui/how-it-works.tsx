"use client";

/**
 * HowItWorks — adapted from a 21st.dev registry component the site owner
 * picked out (step-indicator row + connector line, card grid with an
 * icon/illustration slot, title, description, benefit bullets).
 *
 * Adaptations from the original paste (see PR/build notes):
 *  - No lucide-react (not a dependency here). The icon slot is replaced
 *    entirely by a small zombie-hand illustration per step (see StepHand).
 *  - Every color/size token below maps to this site's real design tokens
 *    (see src/app/globals.css) instead of the shadcn defaults the pasted
 *    component shipped with:
 *      bg-card / text-card-foreground → bg-[var(--color-surface-1)] / text-text-primary
 *      bg-muted                       → bg-[var(--color-surface-0)] / border-[var(--color-hairline-strong)]
 *      text-primary                   → text-[var(--color-neon-text)]
 *      bg-background                  → (dropped — the Section wrapper in
 *                                         Process.tsx already paints the bg)
 *      text-foreground                → text-text-primary
 *      text-muted-foreground          → text-text-secondary / text-text-dim
 *      bg-border                      → bg-[var(--color-hairline-strong)]
 *  - 3 steps → 4 steps (We Talk / We Design / We Build / You Launch), with
 *    the connector-line + circle-indicator percentages recalculated for a
 *    4-column grid (12.5% / 75% instead of the pasted 16.6667% / 66.6667%
 *    3-column math).
 *  - hover:scale-105 (layout jitter on touch, ignores reduced-motion)
 *    replaced with a translateY lift on named transition properties, using
 *    this codebase's easing/duration tokens, gated by motion-reduce:.
 *  - No outer <section>/container: Process.tsx already renders the
 *    <Section id="process"> wrapper (theme, padding, decorative ZombieHand
 *    layer, useInView fade), so this component starts inside that box and
 *    stays a plain content block — duplicating a second <section> here
 *    would double the vertical padding and create a second, orphaned
 *    landmark under the same page.
 */

import type React from "react";
import { Clock } from "@/components/icons";
import { cn } from "@/lib/utils";
import { HAND_CARDS, type HandCardId } from "@/data/handCards";

interface HowItWorksStep {
  n: string;
  day: string;
  title: string;
  description: string;
  benefits: string[];
  hand: HandCardId;
  /** Small hand-drawn tilt so the illustration doesn't look machine-placed. */
  rotate: number;
  badge?: string;
}

// Copy is the SAME content that lived in Process.tsx before this redesign —
// see that file's git history. Benefit bullets are new, but each one is a
// paraphrase of an existing claim already published elsewhere on the site
// (Services.tsx, Pricing.tsx, or this section's own description line) —
// nothing here is a new promise, price, or turnaround time.
const STEPS: HowItWorksStep[] = [
  {
    n: "01",
    day: "Day 1",
    title: "We Talk",
    description:
      "Discovery call to understand your business, goals, and customers. We learn what makes you different.",
    benefits: [
      "Free discovery call — every package includes one",
      "We learn your goals, customers, and what makes you different",
      "One team from strategy to launch, no agency hand-offs",
    ],
    hand: "zh22-beckon",
    rotate: -5,
  },
  {
    n: "02",
    day: "Day 3–5",
    title: "We Design",
    description:
      "Custom concepts in Figma. You pick your favorite direction. Real-time collaboration, no surprises.",
    benefits: [
      "Custom concepts in Figma, built around your direction",
      "Real-time collaboration — you watch it take shape",
      "Every design decision made by a human, never a generator",
    ],
    hand: "zh30-chefs-kiss",
    rotate: 4,
  },
  {
    n: "03",
    day: "Week 1–2",
    title: "We Build",
    description:
      "AI-powered development with real-time preview access. You watch your site come to life.",
    benefits: [
      "AI-powered development at startup speed, not agency time",
      "Real-time preview access as your site comes together",
      "Every build starts from your business goal, not the mood board",
    ],
    hand: "zh06-ok-sign",
    rotate: -4,
  },
  {
    n: "04",
    day: "Week 2–3",
    title: "You Launch",
    description:
      "Go live with full training and support. We make sure everything is perfect before we hand over the keys.",
    benefits: [
      "Full training included so you can run your own site",
      "Support included as you go live",
      "Everything checked and perfected before we hand over the keys",
    ],
    hand: "zh08-highfive",
    rotate: 6,
    badge: "2–3 weeks total",
  },
];

/**
 * Fits a hand illustration into an implicit square-ish box (max ~84px on
 * its longest side) instead of forcing a fixed width — the four source
 * gestures have very different aspect ratios (zh22-beckon is a short wide
 * banner, zh08-highfive is a tall narrow crop), so a single fixed width
 * would make some of them tower over the card header and others read as
 * a thin sliver. Longest-edge-84 keeps consistent visual weight instead.
 */
const HAND_MAX_EDGE = 84;

function StepHand({ hand, rotate }: { hand: HandCardId; rotate: number }) {
  const asset = HAND_CARDS[hand];
  const width =
    asset.aspectRatio >= 1 ? HAND_MAX_EDGE : Math.round(HAND_MAX_EDGE * asset.aspectRatio);
  const height =
    asset.aspectRatio >= 1 ? Math.round(HAND_MAX_EDGE / asset.aspectRatio) : HAND_MAX_EDGE;

  return (
    <div
      aria-hidden="true"
      title={asset.label}
      className={cn(
        "pointer-events-none relative -mt-2 -mr-1 shrink-0 select-none self-start",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
        "group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
      )}
      style={{ width, height, transform: `rotate(${rotate}deg)` }}
    >
      {/* Plain <img>, not next/image: next/image has no way to point at a
          hand-authored 2x file (its own srcSet is generated by resizing the
          SAME src, which would upscale-blur the 2x request since the 1x
          source here is already just 192px wide). A plain <img> with
          explicit width/height + a manual 1x/2x srcSet is the pattern this
          codebase already uses for these hand assets (see ZombieHand.tsx)
          and it is exactly as zero-CLS: the box is reserved by width/height
          before the image ever paints. */}
      <img
        src={asset.src}
        srcSet={`${asset.src} 1x, ${asset.src2x} 2x`}
        width={asset.width}
        height={asset.height}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading="lazy"
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 6px 10px rgba(31, 41, 33, 0.18))",
        }}
      />
    </div>
  );
}

function StepCard({ step }: { step: HowItWorksStep }) {
  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)] p-6",
        "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
        "hover:-translate-y-1 hover:shadow-soft-lg hover:border-[var(--color-neon-text)]/40",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      {/* Pinned to the hand box's height: the four gestures have different
          aspect ratios, so without this the header row is 78px tall on one
          card and 90px on its neighbour, and the titles below sit on
          different baselines across a row. */}
      <div
        className="flex items-start justify-between gap-3"
        style={{ minHeight: HAND_MAX_EDGE }}
      >
        <div className="flex items-baseline gap-3">
          <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
            {step.n}
          </span>
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
            {step.day}
          </span>
        </div>
        <StepHand hand={step.hand} rotate={step.rotate} />
      </div>

      <h3 className="mt-4 text-[length:var(--text-h4)] font-semibold text-text-primary">
        {step.title}
      </h3>
      <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
        {step.description}
      </p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-[var(--color-hairline)] pt-5">
        {step.benefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-2.5 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-neon-text)]"
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {step.badge && (
        <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-neon)]/15 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider text-[var(--color-neon-text)]">
          <Clock size={13} weight="regular" />
          {step.badge}
        </span>
      )}
    </li>
  );
}

interface HowItWorksProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HowItWorks: React.FC<HowItWorksProps> = ({ className, ...props }) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-mono text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
          How we work
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
          Most agencies take{" "}
          <span className="text-text-dim line-through decoration-[var(--color-destructive)]/60 decoration-2">
            4–8 weeks
          </span>
          .{" "}
          <span className="relative inline-block">
            We launch in 2–3
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>
          .
        </h2>
        <p className="measure-tight mx-auto mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
          Figma + AI-powered development means a premium site at startup
          speed, not agency time. AI for speed. Humans for taste — every
          design decision is made by a human, never a generator.
        </p>
      </div>

      {/* Step-indicator row + connector line — desktop-timeline only. Column
          centers for a 4-up grid land at 12.5% / 37.5% / 62.5% / 87.5%, so
          the line spans left:12.5% width:75% (the pasted component's
          16.6667%/66.6667% math was tuned for 3 columns and would misalign
          badly here). Hidden below lg to match the grid, which drops to 2-up
          then 1-up and has no consistent row to draw a line across. */}
      <div aria-hidden="true" className="relative mx-auto mt-12 mb-8 hidden w-full lg:block">
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-[var(--color-hairline-strong)]"
          style={{ left: "12.5%", width: "75%" }}
        />
        <div className="relative grid grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex h-9 w-9 items-center justify-center justify-self-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)] font-mono text-[length:var(--text-caption)] font-semibold text-text-primary ring-4 ring-[var(--color-fog)]"
            >
              {Number(step.n)}
            </div>
          ))}
        </div>
      </div>

      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StepCard key={step.n} step={step} />
        ))}
      </ol>
    </div>
  );
};

export default HowItWorks;
