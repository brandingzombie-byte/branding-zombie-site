"use client";

import { Check, X } from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/data/services";
import { getServiceComparison } from "@/data/service-aeo";

// Semantic <table> head-to-head — the format AI engines extract cleanly and
// the content that gets a brand NAMED in "X vs Y" queries. Returns null when a
// service has no comparison (e.g. print-design ships its own).
export default function ServiceComparison({ slug }: { slug: ServiceSlug }) {
  const { ref, isInView } = useReveal();
  const data = getServiceComparison(slug);
  if (!data) return null;

  return (
    <Section theme="parchment" pad="spacious" topRule>
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
              How we compare
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              {data.title}
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            {data.intro}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">{data.title}</caption>
            <thead>
              <tr className="border-b border-[var(--color-hairline-strong)]">
                <th scope="col" className="w-1/3 py-4 pr-4 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-text-dim">
                  <span className="sr-only">Comparison point</span>
                </th>
                <th
                  scope="col"
                  className="w-1/3 rounded-t-lg bg-[var(--color-neon)]/15 px-5 py-4 text-[length:var(--text-secondary)] font-bold text-text-primary"
                >
                  {data.us}
                </th>
                <th
                  scope="col"
                  className="w-1/3 px-5 py-4 text-[length:var(--text-secondary)] font-semibold text-text-dim"
                >
                  {data.them}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    i > 0 && "border-t border-[var(--color-hairline)]",
                  )}
                >
                  <th
                    scope="row"
                    className="py-4 pr-4 align-top text-[length:var(--text-secondary)] font-semibold text-text-primary"
                  >
                    {row.label}
                  </th>
                  <td className="bg-[var(--color-neon)]/10 px-5 py-4 align-top text-[length:var(--text-secondary)] text-text-primary">
                    <span className="flex items-start gap-2">
                      <Check
                        size={16}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-[var(--color-neon-text)]"
                      />
                      {row.us}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-[length:var(--text-secondary)] text-text-secondary">
                    <span className="flex items-start gap-2">
                      <X
                        size={16}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-text-dim"
                      />
                      {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
