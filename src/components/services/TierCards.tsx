"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Check, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/site";
import type { Tier } from "@/data/services";

// Renders the 3-tier pricing grid specified in the service-pages build spec:
// Starter / Growth / Premium, in that order, with Growth visually dominant
// and carrying a "MOST POPULAR" badge. On mobile the Growth card stacks
// first so the hero tier shows above the fold.

export default function TierCards({
  eyebrow,
  headline,
  highlight,
  subhead,
  tiers,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
  subhead: string;
  tiers: Tier[];
}) {
  const { ref, isInView } = useInView(0.05);

  // Reorder for mobile: feature tier first. Desktop uses CSS order to put it
  // visually in the middle column regardless of array order.
  const ordered = [...tiers].sort((a, b) => {
    if (a.isFeature && !b.isFeature) return -1;
    if (!a.isFeature && b.isFeature) return 1;
    return 0;
  });

  return (
    <Section theme="light" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
              {headline}{" "}
              <span className="relative inline-block">
                {highlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            {subhead}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-0">
          {ordered.map((tier, i) => {
            // Desktop column placement: Starter left, Growth center, Premium right.
            const desktopOrder = tier.isFeature ? 2 : i === 0 && !tier.isFeature ? 1 : 3;
            return (
              <TierCard
                key={tier.name}
                tier={tier}
                desktopOrder={desktopOrder}
              />
            );
          })}
        </div>

        <p className="mt-8 text-[length:var(--text-secondary)] text-text-dim">
          Every tier includes a free 15-minute discovery call.{" "}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
          >
            Book yours →
          </a>
        </p>
      </div>
    </Section>
  );
}

function TierCard({ tier, desktopOrder }: { tier: Tier; desktopOrder: number }) {
  const feature = !!tier.isFeature;
  return (
    <article
      data-theme={feature ? "dark" : "light"}
      style={{ order: undefined }}
      className={cn(
        "relative flex flex-col p-8 lg:p-10",
        "border border-[var(--color-hairline-strong)]",
        feature
          ? "bg-[var(--color-grave)] text-[var(--color-dark-text-primary)] lg:scale-[1.04] lg:z-10 lg:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
          : "bg-[var(--color-cloud)] text-text-primary",
        // Desktop column placement.
        desktopOrder === 1 && "lg:order-1",
        desktopOrder === 2 && "lg:order-2",
        desktopOrder === 3 && "lg:order-3",
        // Remove doubled borders when cards sit side-by-side.
        "lg:[&:not(:first-child)]:border-l-0",
      )}
    >
      {feature && (
        <>
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-[var(--color-toxic)]"
          />
          <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-[var(--color-toxic)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-grave)]">
            Most popular
          </span>
        </>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]",
            feature
              ? "text-[var(--color-toxic-text)]"
              : "text-[var(--color-neon-text)]",
          )}
        >
          {tier.name}
        </span>
        <span
          className={cn(
            "tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em]",
            feature
              ? "text-[var(--color-dark-text-dim)]"
              : "text-text-dim",
          )}
        >
          {tier.timeline}
        </span>
      </div>

      <div className="mt-6">
        <div
          className={cn(
            "tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-tight",
            feature ? "text-[var(--color-toxic-text)]" : "text-text-primary",
          )}
        >
          {tier.price}
        </div>
        {tier.priceNote && (
          <div
            className={cn(
              "mt-2 tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em]",
              feature ? "text-[var(--color-dark-text-dim)]" : "text-text-dim",
            )}
          >
            {tier.priceNote}
          </div>
        )}
      </div>

      <ul
        className={cn(
          "mt-8 flex flex-1 flex-col gap-3 border-t pt-6",
          feature
            ? "border-[var(--color-dark-border)]"
            : "border-[var(--color-hairline)]",
        )}
      >
        {tier.deliverables.map((d) => (
          <li
            key={d}
            className="flex items-start gap-3 text-[length:var(--text-secondary)] leading-relaxed"
          >
            <Check
              size={16}
              weight="bold"
              className={cn(
                "mt-1 shrink-0",
                feature
                  ? "text-[var(--color-toxic-text)]"
                  : "text-[var(--color-neon-text)]",
              )}
            />
            <span
              className={cn(
                feature
                  ? "text-[var(--color-dark-text-secondary)]"
                  : "text-text-secondary",
              )}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-8 border-t pt-5",
          feature
            ? "border-[var(--color-dark-border)]"
            : "border-[var(--color-hairline)]",
        )}
      >
        <span
          className={cn(
            "text-[length:var(--text-caption)] uppercase tracking-[0.18em]",
            feature ? "text-[var(--color-dark-text-dim)]" : "text-text-dim",
          )}
        >
          Best for
        </span>
        <p
          className={cn(
            "mt-1 text-[length:var(--text-secondary)] leading-relaxed",
            feature
              ? "text-[var(--color-dark-text-secondary)]"
              : "text-text-secondary",
          )}
        >
          {tier.bestFor}
        </p>
      </div>

      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        className={cn(
          "mt-6 inline-flex items-center justify-between gap-2 rounded-full px-6 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider",
          feature
            ? "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            : "border border-[var(--color-hairline-strong)] text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
        )}
      >
        {tier.ctaLabel}
        <ArrowRight size={16} weight="bold" />
      </a>
    </article>
  );
}
