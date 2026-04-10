"use client";

import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export default function ServiceFinalCTA({ service }: { service: Service }) {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="dark" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
            {service.finalCta.eyebrow}
          </span>
        </div>

        <h2 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)] lg:max-w-[18ch]">
          {service.finalCta.headline}{" "}
          <span className="relative inline-block">
            {service.finalCta.highlightWord}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
            />
          </span>
        </h2>

        <p className="measure mt-8 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          {service.finalCta.subhead}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={service.hero.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-9 py-4 text-[length:var(--text-body)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            {service.finalCta.ctaLabel}
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
            No pitch · No pressure · Just a straight answer
          </p>
        </div>
      </div>
    </Section>
  );
}
