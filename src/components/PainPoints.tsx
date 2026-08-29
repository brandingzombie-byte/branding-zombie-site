"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Warning, ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";

// ── Count-up hook ─────────────────────────────────────────────────────────────
// Ease-out-quart ramp via requestAnimationFrame. Honors reduced-motion by
// jumping straight to the final value.
//
// SSR/no-JS fallback: state initializes to the REAL target so server-rendered
// HTML (and any client where JS never hydrates) shows "75%", not "0%". The
// animation resets to 0 only at the moment it actually starts.
function useCountUp(target: number, isActive: boolean, duration = 1400) {
  const [count, setCount] = useState(target);
  const rafRef = useRef<number>(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isActive) return;
    if (reduce) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, target, duration, reduce]);

  return count;
}

// ── Stat data ─────────────────────────────────────────────────────────────────
interface StatRow {
  numericValue?: number;
  suffix?: string;
  special?: string;
  label: string;
  source?: string;
}

const stats: StatRow[] = [
  {
    numericValue: 81,
    suffix: "%",
    label: "of customers have to trust a brand before they'll even consider buying.",
    source: "Edelman Trust Barometer",
  },
  {
    numericValue: 23,
    suffix: "%",
    label: "average revenue lift for brands that show up consistently everywhere.",
    source: "Marq, State of Brand Consistency",
  },
  {
    numericValue: 80,
    suffix: "%",
    label:
      "better brand recognition from a signature color alone. Would anyone recognize yours?",
    source: "University of Loyola, Maryland",
  },
];

// ── "Get started" band — three equal-weight next steps, replacing the old
// single-CTA-plus-demoted-text-link pattern now that this section pitches
// branding/marketing broadly instead of just "your website is slow." ───────
interface GetStartedOption {
  title: string;
  href: string;
  sub: string;
}

const getStartedOptions: GetStartedOption[] = [
  {
    title: "Brand Checkup Quiz",
    href: "/brand-checkup",
    sub: "5-minute self-scoring quiz",
  },
  {
    title: "Free Site Audit",
    href: "/free-site-audit",
    sub: "Instant grade in ~60 seconds",
  },
  {
    title: "View Services",
    href: "#services",
    sub: "See everything we raise from the dead",
  },
];

// ── Single stat row — own in-view trigger so each animates as it lands ───────
function StatRowItem({ stat, index }: { stat: StatRow; index: number }) {
  const { ref, isInView } = useInView(0.35);
  const count = useCountUp(stat.numericValue ?? 0, isInView && !!stat.numericValue);
  const display = stat.special ?? `${count}${stat.suffix ?? ""}`;

  return (
    <li className="border-t border-[var(--color-hairline-strong)]">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-y-3 gap-x-8 py-10 sm:grid-cols-[auto_1fr]",
          "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4",
        )}
        style={{ transitionDelay: `${index * 90}ms` }}
      >
        {/* Big numeric/value */}
        <div
          className="tabular font-[family-name:var(--font-display)] leading-[0.9] tracking-tight text-[var(--color-neon-text)]"
          style={{ fontSize: "clamp(4rem, 7.5vw, 8rem)" }}
          aria-label={display}
        >
          {display}
        </div>

        {/* Label + source */}
        <div className="flex flex-col justify-center gap-2 sm:border-l sm:border-[var(--color-hairline-strong)] sm:pl-6">
          <p className="text-[length:var(--text-lead)] font-medium leading-snug text-text-primary">
            {stat.label}
          </p>
          {stat.source && (
            <p className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-text-dim">
              — {stat.source}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function PainPoints() {
  const { ref: headRef, isInView: headInView } = useInView(0.2);
  const { ref: ctaRef, isInView: ctaInView } = useInView(0.25);

  return (
    <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]">
      {/* ── Disembodied zombie hands — decorative, non-interactive, painted
           above the section background but beneath all in-flow content.
           `absolute inset-0` sizes this layer to the (positioned) Section so
           hands anchor to the true edges; `overflow-x-clip` guillotines the
           off-edge wrist and prevents any horizontal scrollbar. ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] overflow-x-clip"
      >
        {/* #1 — Thumbs-down at the bad-website stats (right edge, hero moment).
             Flipped so the arm reads correctly entering from the right.
             Oversized on purpose — this is the concept's signature hand, so it
             gets the most knuckle on screen and the strongest cursor reach.
             Desktop only — mobile gets its own placement above the stats. */}
        <ZombieHand
          src={HANDS["zh09-thumbsdown-l"].src}
          width={HANDS["zh09-thumbsdown-l"].width}
          height={HANDS["zh09-thumbsdown-l"].height}
          edge="right"
          behaviors={["peek", "parallax", "idle", "follow"]}
          offset="40%"
          bleed="-30px"
          displayWidth={560}
          followStrength={30}
          flip
          zIndex={5}
        />
      </div>

      {/* Header — editorial splash */}
      <div
        ref={headRef}
        className={cn(
          "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          headInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="flex items-center gap-3">
          <Warning
            size={22}
            weight="duotone"
            className="text-[var(--color-neon-text)]"
          />
          <span className="h-px w-8 bg-[var(--color-neon-text)]" />
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-text-dim">
            The truth
          </span>
        </div>

        <h2
          className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] leading-[1.15] tracking-tight text-text-primary"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)" }}
        >
          A forgettable brand isn&apos;t neutral. It&apos;s{" "}
          <span className="relative inline-block">
            dead
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>{" "}
          on arrival.
        </h2>

        <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
          Your work is good. But customers don&apos;t buy the best business —
          they buy the one they remember and trust. That decision happens
          before you ever get to say a word.
        </p>
      </div>

      {/* Mobile-only thumbs-down — sits in its own band right above the stats,
          underneath the intro paragraph, bleeding off the right screen edge.
          `-mx-6` breaks it out of the padded container so the wrist hangs off
          the true viewport edge; the band reserves its own height so the hand
          is part of the layout instead of covering the stat text. */}
      <div
        aria-hidden
        className="pointer-events-none relative -mx-6 mt-8 h-[150px] overflow-x-clip md:hidden"
      >
        <ZombieHand
          src={HANDS["zh09-thumbsdown-l"].src}
          width={HANDS["zh09-thumbsdown-l"].width}
          height={HANDS["zh09-thumbsdown-l"].height}
          edge="right"
          behaviors={["peek", "parallax", "idle"]}
          offset="-6px"
          bleed="-32px"
          displayWidth={450}
          parallaxSpeed={0.1}
          flip
          zIndex={5}
          mobile
          mobileParallax
        />
      </div>

      {/* Stats — editorial data spread */}
      <ul className="mt-4 md:mt-10" aria-label="Branding statistics">
        {stats.map((stat, i) => (
          <StatRowItem key={stat.label} stat={stat} index={i} />
        ))}
      </ul>

      {/* Get-started band — three equal-weight next steps (quiz / audit /
          services) instead of one primary CTA button plus a demoted text
          link. Different visitors are ready for different next steps, so all
          three get the same visual weight. */}
      <div
        ref={ctaRef}
        className="mt-4 border-t border-[var(--color-hairline-strong)] pt-10"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--color-neon-text)]" />
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-text-dim">
            Get started
          </span>
        </div>
        <p className="mt-4 max-w-[48ch] text-[length:var(--text-lead)] font-medium leading-snug text-text-primary">
          Three ways to un-dead your brand. Pick your poison.
        </p>

        <div className="mt-8 grid grid-cols-1 border-2 border-[var(--color-text-primary)] sm:grid-cols-3">
          {getStartedOptions.map((option, i) => (
            <div
              key={option.title}
              className={cn(
                "border-[var(--color-text-primary)]",
                i > 0 && "border-t-2 sm:border-t-0 sm:border-l-2",
                "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                ctaInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <a
                href={option.href}
                className={cn(
                  "group flex h-full min-h-[11rem] flex-col justify-between gap-6 p-6 sm:p-7",
                  "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                  "hover:bg-[var(--color-neon)] active:scale-[0.99]",
                  "motion-reduce:transition-none motion-reduce:active:scale-100",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--color-text-primary)] transition-[background-color] duration-[var(--duration-base)] group-hover:bg-[var(--color-text-primary)]">
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    weight="bold"
                    className="text-text-primary transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:text-[var(--color-neon)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
                    {option.sub}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
