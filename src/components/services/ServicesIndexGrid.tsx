"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Client-side bento grid for /services. Lives in a client component so the
 * route page can stay a Server Component with metadata exports — Phosphor
 * icons use React context which breaks when imported into server components
 * under Next.js 16 + Turbopack.
 */
export default function ServicesIndexGrid() {
  const [feature, ...rest] = SERVICES;

  return (
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
            <span
              aria-hidden
              className="h-px flex-1 bg-[var(--color-hairline-strong)]"
            />
          </div>
          <h3 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            {feature.name}
          </h3>
          <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            {feature.homeCardDescription}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-[var(--color-hairline)] pt-5">
          <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
            {feature.homeCardPrice}
          </span>
          <span className="inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold text-text-primary group-hover:text-[var(--color-neon-text)]">
            Explore
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
        <Image
          src={feature.iconSvg}
          alt=""
          width={128}
          height={128}
          className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 opacity-15 sm:h-40 sm:w-40"
        />
      </Link>

      {rest.map((s, i) => {
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
  );
}
