"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import ServicesBrutalistGrid from "@/components/services/ServicesBrutalistGrid";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

export default function Services() {
  const { ref, isInView } = useInView(0.05);

  // AI Workflows is intentionally omitted from the homepage "What we do"
  // grid (the /services/ai-workflows page still exists and is reachable from
  // the footer + the full /services index). Keeps the homepage focused on the
  // core demand: logos, sites, print, signage, social. SERVICES[0] (web-design)
  // stays the feature tile.
  const homepageServices = [
    SERVICES[0],
    ...SERVICES.slice(1).filter((s) => s.slug !== "ai-workflows"),
  ];

  return (
    <Section id="services" theme="light" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* ── Header — left-aligned, anti-template. The border-b-2 doubles as
            the top edge of the feature card directly below it. ── */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 border-b-2 border-[var(--color-text-primary)] pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
              What we do
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.15] tracking-tight text-text-primary">
              Everything your business needs to{" "}
              <span className="relative inline-block">
                show up online
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            One team, no agency hand-offs. Every project starts with the
            business goal, not the mood board — looking pretty is table
            stakes, making you money is the job. Pick one service à la carte,
            or bundle several and save with a package below.
          </p>
        </div>

        <ServicesBrutalistGrid services={homepageServices} />
      </div>
    </Section>
  );
}
