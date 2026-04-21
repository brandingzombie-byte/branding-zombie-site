"use client";

import { X } from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export default function ServicePainPoints({ service }: { service: Service }) {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="dark" pad="standard" topRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="lg:col-span-5">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            {service.painPointsEyebrow}
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            {service.painPointsHeadline}{" "}
            <span className="relative inline-block">
              {service.painPointsHighlight}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </h2>
          <p className="measure mt-6 border-l-2 border-[var(--color-toxic)] pl-5 text-[length:var(--text-body)] italic leading-relaxed text-[var(--color-dark-text-secondary)]">
            {service.painPointsIntro}
          </p>
        </div>

        <ul className="lg:col-span-7">
          {service.painPoints.map((point, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-4 py-5",
                i > 0 && "border-t border-[var(--color-dark-border)]",
              )}
            >
              <X
                size={20}
                weight="bold"
                className="mt-0.5 shrink-0 text-[var(--color-toxic-text)]"
              />
              <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
