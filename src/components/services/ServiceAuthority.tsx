"use client";

import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/data/services";
import { getServiceAeo } from "@/data/service-aeo";

// Renders the three GEO levers as one band high on a service page:
// answer-first definitional paragraph + honest proof stats + named founder
// quote. Returns null when a service has no AEO entry, so the page can render
// it unconditionally without an orphan separator (the page still gates the
// separator on getServiceAeo presence for clean spacing).
export default function ServiceAuthority({ slug }: { slug: ServiceSlug }) {
  const { ref, isInView } = useReveal();
  const aeo = getServiceAeo(slug);
  if (!aeo) return null;

  return (
    <Section theme="dark" pad="standard" topRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-12 transition-all duration-700 lg:grid-cols-12",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Answer-first definitional lead + stats */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-[var(--color-cyan)]" />
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan-text)]">
              The short version
            </span>
          </div>
          <p className="measure mt-6 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            {aeo.answerFirst}
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-[var(--color-dark-border-strong)] bg-[var(--color-dark-border-strong)]">
            {aeo.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-[var(--color-surface)] p-4 sm:p-6"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-[var(--color-dark-text-primary)]">
                  {s.value}
                </dd>
                <dd className="text-[length:var(--text-caption)] leading-snug text-[var(--color-dark-text-dim)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Named founder quote — E-E-A-T first-hand experience signal */}
        <figure className="lg:col-span-5 lg:self-center">
          <blockquote className="border-l-2 border-[var(--color-toxic)] pl-6 text-[length:var(--text-h4)] font-medium leading-snug text-[var(--color-dark-text-primary)]">
            &ldquo;{aeo.expertQuote.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 pl-6">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-toxic)] font-[family-name:var(--font-display)] text-sm text-[var(--color-grave)]"
            >
              {aeo.expertQuote.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[length:var(--text-secondary)] font-semibold text-[var(--color-dark-text-primary)]">
                {aeo.expertQuote.name}
              </span>
              <span className="text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
                {aeo.expertQuote.title}, Branding Zombie Designs
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
