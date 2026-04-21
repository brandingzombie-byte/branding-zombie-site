"use client";

import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export default function ServiceOffer({ service }: { service: Service }) {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="parchment" pad="spacious" topRule bottomRule>
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
              {service.offerEyebrow}
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              {service.offerHeadline}{" "}
              <span className="relative inline-block">
                {service.offerHighlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            {service.offerSubhead}
          </p>
        </div>

        {/* Bento grid of deliverables */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((d, i) => {
            const tint =
              i % 2 === 0
                ? "bg-[var(--color-cloud)]"
                : "bg-[var(--color-fog)]";
            return (
              <article
                key={d.title}
                className={cn(
                  "flex min-h-[16rem] flex-col p-7 transition-colors hover:bg-[var(--color-mist)]",
                  tint,
                )}
              >
                <span className="tabular text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-[length:var(--text-h4)] font-semibold text-text-primary">
                  {d.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {d.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Pricing callout */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[var(--color-hairline-strong)] pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              {service.pricing.label}
            </p>
            <p className="mt-2 tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-tight text-text-primary">
              {service.pricing.price}
              {service.pricing.unit && (
                <span className="text-[length:var(--text-h4)] font-normal text-text-dim">
                  {" "}
                  {service.pricing.unit}
                </span>
              )}
            </p>
            <p className="mt-3 text-[length:var(--text-body)] text-text-secondary">
              {service.pricing.note}
            </p>
          </div>
          <a
            href={service.hero.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]"
          >
            Talk about your project
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </Section>
  );
}
