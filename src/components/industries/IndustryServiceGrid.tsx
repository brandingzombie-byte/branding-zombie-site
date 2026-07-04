"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { SERVICES, type ServiceSlug } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * The services relevant to one industry, rendered as uniform brutalist cards
 * (flood-on-hover, ghost numerals) — same visual language as the homepage grid
 * but WITHOUT the web-design-specific feature tile/meta, so it reads correctly
 * for any industry. Server component (no interactivity).
 */
export default function IndustryServiceGrid({
  slugs,
}: {
  slugs: ServiceSlug[];
}) {
  const items = slugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  return (
    <div className="grid grid-cols-1 border-x-2 border-t-2 border-[var(--color-text-primary)] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => {
        const cardNum = String(i + 1).padStart(2, "0");
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            aria-label={s.name}
            className={cn(
              "group relative flex min-h-[16rem] flex-col justify-between overflow-hidden",
              "border-b-2 border-[var(--color-text-primary)] bg-[var(--color-surface-1)]",
              "p-7",
              "sm:[&:not(:nth-child(2n))]:border-r-2 sm:[&:not(:nth-child(2n))]:border-[var(--color-text-primary)]",
              "lg:[&:not(:nth-child(3n))]:border-r-2 lg:[&:not(:nth-child(3n))]:border-[var(--color-text-primary)] lg:[&:nth-child(2n)]:!border-r-2 lg:[&:nth-child(3n)]:!border-r-0",
              "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
              "hover:bg-[var(--color-neon)] active:scale-[0.997]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
              "motion-reduce:transition-none motion-reduce:active:scale-100",
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 bottom-2 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.04] transition-opacity duration-[var(--duration-base)] group-hover:opacity-[0.09]"
              style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
            >
              {cardNum}
            </span>

            <Image
              src={s.iconSvg}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 opacity-80 transition-[filter,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:[filter:brightness(0)] group-hover:-translate-y-0.5"
            />

            <div className="relative z-10 mt-6">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary">
                {s.name}
              </h3>
              <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
                {s.homeCardDescription}
              </p>
            </div>

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
  );
}
