"use client";

import {
  ChatCircle,
  Lightning,
  PencilSimple,
  Wrench,
  RocketLaunch,
  Sparkle,
  CurrencyDollar,
  Clock,
  Check,
  MapPin,
  Calendar,
  Code,
} from "@/components/icons";
import Section from "@/components/Section";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import type { Service, ServiceIconName } from "@/data/services";

const ICON_MAP: Record<ServiceIconName, typeof ChatCircle> = {
  ChatCircle,
  Lightning,
  PencilSimple,
  Wrench,
  RocketLaunch,
  Sparkle,
  CurrencyDollar,
  Clock,
  Check,
  MapPin,
  Calendar,
  Code,
};

export default function ServiceProcess({ service }: { service: Service }) {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="light" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            {service.processEyebrow}
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            {service.processHeadline}{" "}
            <span className="relative inline-block">
              {service.processHighlight}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h2>
        </div>

        <ol className="lg:col-span-8">
          {service.process.map(({ step, title, subtitle, description, icon }, i) => {
            const Icon = ICON_MAP[icon];
            return (
              <li
                key={step}
                className={cn(
                  "grid grid-cols-[auto_auto_1fr] items-start gap-x-6 gap-y-2 py-6",
                  i > 0 && "border-t border-[var(--color-hairline-strong)]",
                )}
              >
                <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
                  {step}
                </span>
                <Icon
                  size={26}
                  weight="regular"
                  className="mt-1 text-text-primary"
                />
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-[length:var(--text-h4)] font-semibold text-text-primary">
                      {title}
                    </h3>
                    {subtitle && (
                      <span className="rounded-full bg-[var(--color-neon)]/15 px-3 py-0.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                        {subtitle}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
