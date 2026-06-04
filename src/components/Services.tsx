"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowUpRight, Clock, CurrencyDollar, Code } from "@/components/icons";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

// Alternating top-offset to break grid-cookie-cutter feel on the support cards
const cardOffsets = [0, 36, 0, 36, 0];

export default function Services() {
  const { ref, isInView } = useInView(0.05);
  // AI Workflows is intentionally omitted from the homepage "What we do"
  // grid (the /services/ai-workflows page still exists and is reachable
  // from the footer). Keeps the homepage focused on the core demand:
  // logos, sites, print, signage, social.
  const [feature, ...allServices] = SERVICES;
  const rest = allServices.filter((s) => s.slug !== "ai-workflows");

  // Price reads from the SERVICES data so it can never drift from the
  // service-page tier table. Single source of truth lives in services.ts.
  const featureMeta = [
    { Icon: Clock, text: "10–14 days" },
    { Icon: CurrencyDollar, text: feature.homeCardPrice },
    { Icon: Code, text: "Next.js · Webflow" },
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
        {/* ── Header — left-aligned, anti-template ── */}
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
            stakes, making you money is the job.
          </p>
        </div>

        {/* ── Featured card — full-width brutalist tile with flood-on-hover ── */}
        <Link
          href={`/services/${feature.slug}`}
          aria-label={feature.name}
          className={cn(
            "group relative flex min-h-[22rem] flex-col justify-between overflow-hidden",
            "border-x-2 border-b-2 border-[var(--color-text-primary)] bg-[var(--color-fog)]",
            "p-8 lg:p-12",
            "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
            "hover:bg-[var(--color-neon)] active:scale-[0.997]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
            "motion-reduce:transition-none motion-reduce:active:scale-100",
          )}
        >
          {/* Ghost watermark numeral */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-6 bottom-0 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.05] transition-opacity duration-[var(--duration-base)] group-hover:opacity-[0.1]"
            style={{ fontSize: "clamp(8rem, 20vw, 18rem)" }}
          >
            01
          </span>

          {/* Top row — label + arrow chip */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-neon-text)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-text-primary)]">
                Most popular
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.0] tracking-tight text-text-primary">
                {feature.name}
              </h3>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--color-text-primary)] transition-[background-color] duration-[var(--duration-base)] group-hover:bg-[var(--color-text-primary)]">
              <ArrowUpRight
                size={20}
                weight="bold"
                className="text-text-primary transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:text-[var(--color-neon)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 max-w-[60ch] text-[length:var(--text-lead)] leading-relaxed text-text-secondary transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
            {feature.homeCardDescription}
          </p>

          {/* Meta strip */}
          <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-hairline-strong)] pt-5 transition-colors duration-[var(--duration-base)] group-hover:border-[var(--color-text-primary)]/30">
            {featureMeta.map(({ Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 font-mono text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim transition-colors duration-[var(--duration-base)] group-hover:text-text-primary"
              >
                <Icon size={13} weight="regular" />
                <span className="tabular">{text}</span>
              </span>
            ))}
          </div>
        </Link>

        {/* ── Supporting cards — 3-col grid, zigzag top-offset, flood hover ── */}
        <div className="grid grid-cols-1 border-x-2 border-b-2 border-[var(--color-text-primary)] sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => {
            const offset = cardOffsets[i] ?? 0;
            const cardNum = String(i + 2).padStart(2, "0");

            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                aria-label={s.name}
                className={cn(
                  "group relative flex min-h-[16rem] flex-col justify-between overflow-hidden",
                  "border-b-2 border-[var(--color-text-primary)] bg-[var(--color-surface-1)]",
                  "p-7",
                  // Inter-card vertical dividers — last in each row has no right border
                  "sm:[&:not(:nth-child(2n))]:border-r-2 sm:[&:not(:nth-child(2n))]:border-[var(--color-text-primary)]",
                  "lg:[&:not(:nth-child(3n))]:border-r-2 lg:[&:not(:nth-child(3n))]:border-[var(--color-text-primary)] lg:[&:nth-child(2n)]:!border-r-2 lg:[&:nth-child(3n)]:!border-r-0",
                  "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                  "hover:bg-[var(--color-neon)] active:scale-[0.997]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
                  "motion-reduce:transition-none motion-reduce:active:scale-100",
                )}
                style={{ paddingTop: `${(offset || 28) + 28}px` }}
              >
                {/* Ghost numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 bottom-2 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.04] transition-opacity duration-[var(--duration-base)] group-hover:opacity-[0.09]"
                  style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
                >
                  {cardNum}
                </span>

                {/* Icon — inverts to black on flood */}
                <Image
                  src={s.iconSvg}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 opacity-80 transition-[filter,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:[filter:brightness(0)] group-hover:-translate-y-0.5"
                />

                {/* Content */}
                <div className="relative z-10 mt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
                    {s.homeCardDescription}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-hairline)] pt-3 transition-colors duration-[var(--duration-base)] group-hover:border-[var(--color-text-primary)]/30">
                  <span className="tabular font-mono text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
                    {s.homeCardPrice}
                  </span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-text-dim transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:text-text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
