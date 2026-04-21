"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Check, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/site";
import type { ServiceCategoryBand } from "@/data/services";

// Print Design uses 4 category bands instead of a 3-tier card stack, per
// spec Section 6.3. The final band (Print + Source bundle) is the combined
// design-plus-production offering — visually accented so it reads as the
// hero option the way Growth does on other service pages.

export default function PrintCategoryBands({
  bands,
}: {
  bands: ServiceCategoryBand[];
}) {
  const { ref, isInView } = useInView(0.05);

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
              Pricing
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              Four bands.{" "}
              <span className="relative inline-block">
                One vendor for design and print
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            Design-only is quoted by category. Design + Source bundles
            combine design and production on one invoice — easier ops,
            wholesale pricing passed through.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] md:grid-cols-2 xl:grid-cols-4">
          {bands.map((band, i) => {
            const isBundle = i === bands.length - 1;
            return (
              <article
                key={band.name}
                data-theme={isBundle ? "dark" : "light"}
                className={cn(
                  "relative flex flex-col p-7 lg:p-8",
                  isBundle
                    ? "bg-[var(--color-grave)] text-[var(--color-dark-text-primary)]"
                    : "bg-[var(--color-cloud)] text-text-primary",
                )}
              >
                {isBundle && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[var(--color-toxic)]"
                  />
                )}

                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      "text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]",
                      isBundle
                        ? "text-[var(--color-toxic-text)]"
                        : "text-[var(--color-neon-text)]",
                    )}
                  >
                    {band.name}
                  </span>
                  <span
                    className={cn(
                      "tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em]",
                      isBundle
                        ? "text-[var(--color-dark-text-dim)]"
                        : "text-text-dim",
                    )}
                  >
                    {band.timeline}
                  </span>
                </div>

                <div className="mt-5">
                  <div
                    className={cn(
                      "tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight",
                      isBundle
                        ? "text-[var(--color-toxic-text)]"
                        : "text-text-primary",
                    )}
                  >
                    {band.priceRange}
                  </div>
                </div>

                <ul
                  className={cn(
                    "mt-6 flex flex-1 flex-col gap-2.5 border-t pt-5",
                    isBundle
                      ? "border-[var(--color-dark-border)]"
                      : "border-[var(--color-hairline)]",
                  )}
                >
                  {band.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-start gap-2.5 text-[length:var(--text-secondary)] leading-relaxed"
                    >
                      <Check
                        size={14}
                        weight="bold"
                        className={cn(
                          "mt-1 shrink-0",
                          isBundle
                            ? "text-[var(--color-toxic-text)]"
                            : "text-[var(--color-neon-text)]",
                        )}
                      />
                      <span
                        className={cn(
                          isBundle
                            ? "text-[var(--color-dark-text-secondary)]"
                            : "text-text-secondary",
                        )}
                      >
                        {ex}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className={cn(
                    "mt-6 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider",
                    isBundle
                      ? "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                      : "border border-[var(--color-hairline-strong)] text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
                  )}
                >
                  Get a quote
                  <ArrowRight size={14} weight="bold" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
