"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowRight, ArrowUpRight, Clock, CurrencyDollar, Code } from "@/components/icons";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

type Meta = { Icon: typeof Clock; text: string };

const featureMeta: Meta[] = [
  { Icon: Clock, text: "10–14 days" },
  { Icon: CurrencyDollar, text: "from $1,500" },
  { Icon: Code, text: "Next.js · Webflow" },
];

export default function Services() {
  const { ref, isInView } = useInView(0.05);
  const [feature, ...rest] = SERVICES;

  return (
    <Section id="services" theme="light" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Header — left-aligned, not centered, anti-AI-template */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              What we do
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
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
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            Six services, one team, no agency hand-offs. Pick what you need
            today and add the rest as you grow.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature card spans 2x2 */}
          <Link
            href={`/services/${feature.slug}`}
            className="group relative flex min-h-[20rem] flex-col justify-between bg-[var(--color-cloud)] p-8 transition-colors hover:bg-[var(--color-mist)] sm:col-span-2 sm:row-span-2 lg:p-10"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
                  Most popular
                </span>
                <span aria-hidden className="h-px flex-1 bg-[var(--color-hairline-strong)]" />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                {feature.name}
              </h3>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                {feature.homeCardDescription}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {featureMeta.map(({ Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim"
                >
                  <Icon size={14} weight="regular" />
                  <span className="tabular">{text}</span>
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold text-text-primary group-hover:text-[var(--color-neon-text)]">
                Explore
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>

            {/* Decorative SVG icon, anchored bottom-right of feature card */}
            <Image
              src={feature.iconSvg}
              alt=""
              width={128}
              height={128}
              className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 opacity-15 sm:h-40 sm:w-40"
            />
          </Link>

          {/* Supporting cards */}
          {rest.map((s, i) => {
            // Alternate background tints for material variation
            const tint =
              i % 3 === 0
                ? "bg-[var(--color-cloud)]"
                : i % 3 === 1
                ? "bg-[var(--color-surface-0)]"
                : "bg-[var(--color-fog)]";
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={cn(
                  "group relative flex min-h-[14rem] flex-col justify-between p-7 transition-colors hover:bg-[var(--color-mist)]",
                  tint,
                )}
              >
                <div>
                  <Image
                    src={s.iconSvg}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 opacity-90"
                  />
                  <h3 className="mt-5 text-[length:var(--text-h4)] font-semibold text-text-primary">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    {s.homeCardDescription}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-hairline)] pt-3">
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim">
                    {s.homeCardPrice}
                  </span>
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="text-text-dim transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-neon-text)]"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
