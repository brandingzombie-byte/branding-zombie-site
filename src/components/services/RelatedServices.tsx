"use client";

import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import { getRelatedServices } from "@/data/services";
import type { Service, ServiceSlug } from "@/data/services";

export default function RelatedServices({ slug }: { slug: ServiceSlug }) {
  const { ref, isInView } = useReveal();
  const related = getRelatedServices(slug);

  if (related.length === 0) return null;

  return (
    <Section theme="dark" pad="tight" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--color-cyan)]" />
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan-text)]">
            Keep exploring
          </span>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
          Other ways we can{" "}
          <span className="relative inline-block">
            help
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
            />
          </span>
          .
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--color-dark-border-strong)] bg-[var(--color-dark-border-strong)] sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r: Service) => (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="group relative flex min-h-[14rem] flex-col justify-between bg-[var(--color-surface)] p-7 transition-colors hover:bg-[var(--color-elevated)]"
            >
              <div>
                <span className="tabular text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan-text)]">
                  {r.shortName}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
                  {r.name}
                </h3>
                <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {r.tagline}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-dark-border)] pt-4">
                <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-[var(--color-dark-text-dim)]">
                  {r.homeCardPrice}
                </span>
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="text-[var(--color-dark-text-dim)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-toxic-text)]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
