"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Warning } from "@/components/icons";
import { cn } from "@/lib/utils";

// ── Count-up hook ─────────────────────────────────────────────────────────────
// Ease-out-quart ramp via requestAnimationFrame. Honors reduced-motion by
// jumping straight to the final value.
function useCountUp(target: number, isActive: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
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
    numericValue: 75,
    suffix: "%",
    label: "of people judge a business by its website.",
    source: "Stanford Web Credibility Project",
  },
  {
    numericValue: 53,
    suffix: "%",
    label: "leave if your site takes over 3 seconds to load.",
    source: "Google / SOASTA",
  },
  {
    special: "24/7",
    label: "your competitor's chatbot is open. Yours isn't.",
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

  return (
    <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]">
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
          If your website looks like it&apos;s from{" "}
          <span className="relative inline-block">
            2016
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>
          , your customers already noticed.
        </h2>

        <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
          You&apos;re not losing customers because your product isn&apos;t good.
          You&apos;re losing them in the seven seconds it takes to load your
          homepage on a phone.
        </p>
      </div>

      {/* Stats — editorial data spread */}
      <ul className="mt-10" aria-label="Industry statistics">
        {stats.map((stat, i) => (
          <StatRowItem key={stat.label} stat={stat} index={i} />
        ))}
      </ul>

      {/* Brand Checkup CTA — the free tool that diagnoses exactly this */}
      <div className="mt-4 flex flex-col items-start gap-5 border-t border-[var(--color-hairline-strong)] pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[44ch] text-[length:var(--text-lead)] font-medium leading-snug text-text-primary">
          Not sure where{" "}
          <span className="relative inline-block">
            your
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>{" "}
          brand stands? Score it in 5 minutes — free, no jargon.
        </p>
        <a
          href="/brand-checkup"
          role="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)] transition-colors hover:bg-[var(--color-neon-text)]"
        >
          Take the free Brand Checkup →
        </a>
      </div>
    </Section>
  );
}
