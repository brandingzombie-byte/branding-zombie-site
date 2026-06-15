"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { PORTFOLIO, type PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Reserve the right aspect box so images don't shift as they load.
const DIMS: Record<NonNullable<PortfolioItem["aspect"]>, [number, number]> = {
  tall: [900, 1200],
  wide: [1200, 800],
  square: [1000, 1000],
  auto: [1000, 1000],
};

/**
 * Featured-work strip for an industry page. Looks up hand-picked PORTFOLIO ids
 * (marquee first) so each page shows credible, on-topic proof. The marquee
 * spans two columns on desktop; the rest fill a 12-col grid. Cards with a live
 * `href` link out. Server component.
 */
export default function IndustryWork({ ids }: { ids: string[] }) {
  const items = ids
    .map((id) => PORTFOLIO.find((p) => p.id === id))
    .filter((p): p is PortfolioItem => Boolean(p));

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
      {items.map((item, i) => {
        const [w, h] = DIMS[item.aspect ?? "auto"];
        const marquee = i === 0;
        const Inner = (
          <>
            <div className="relative overflow-hidden rounded-md border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
              <Image
                src={item.image}
                alt={`${item.title}${item.brand ? ` — ${item.brand}` : ""}`}
                width={w}
                height={h}
                sizes={
                  marquee
                    ? "(min-width: 1024px) 58vw, 100vw"
                    : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                }
                className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              {item.href && (
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grave)]/80 text-[var(--color-toxic-text)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              )}
            </div>
            <div className="mt-3">
              {item.brand && (
                <span className="block text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  {item.brand}
                </span>
              )}
              <span className="mt-1 block text-[length:var(--text-secondary)] font-semibold leading-snug text-[var(--color-dark-text-primary)] group-hover:text-[var(--color-toxic-text)]">
                {item.title}
              </span>
              {marquee && (
                <p className="measure mt-2 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {item.description}
                </p>
              )}
            </div>
          </>
        );

        const cls = cn(
          "group block",
          marquee ? "lg:col-span-7" : "lg:col-span-5",
        );

        return item.href ? (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} — open live project (opens in new tab)`}
            className={cn(
              cls,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-toxic)] focus-visible:ring-offset-2",
            )}
          >
            {Inner}
          </a>
        ) : (
          <div key={item.id} className={cls}>
            {Inner}
          </div>
        );
      })}
    </div>
  );
}
