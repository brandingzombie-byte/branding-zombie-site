"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import { PORTFOLIO, type PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// ─── Filter categories ──────────────────────────────────────────────────────
// Derived from each item's existing `services` + `formats` tags so there is
// ZERO data duplication — an item naturally appears under every lens it
// qualifies for. Categories are framed as buyer shopping-intents ("what am I
// here to get made?"), not internal service slugs.
//
// "Print & Signage" is deliberately the NON-packaging print work (flyers,
// brochures, cards, books, signage) so it doesn't just mirror "Packaging".

type CatId = "all" | "branding" | "packaging" | "print" | "web" | "social";

const has = (arr: readonly string[], vals: readonly string[]) =>
  vals.some((v) => arr.includes(v));

function matches(item: PortfolioItem, cat: CatId): boolean {
  const services = item.services;
  const formats = item.formats ?? [];
  switch (cat) {
    case "all":
      return true;
    case "branding":
      return has(services, ["branding", "logo-design"]);
    case "packaging":
      return has(formats, ["packaging", "label"]);
    case "print":
      return (
        services.includes("print-design") &&
        !has(formats, ["packaging", "label"])
      );
    case "web":
      return has(services, ["web-design", "ecommerce"]);
    case "social":
      return (
        has(services, ["social-media", "digital-marketing"]) ||
        has(formats, ["lifestyle", "campaign", "banner", "social-creative"])
      );
  }
}

const CATEGORIES: { id: CatId; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "branding", label: "Branding & Logos" },
  { id: "packaging", label: "Packaging & Labels" },
  { id: "web", label: "Websites & Ecommerce" },
  { id: "social", label: "Social & Ads" },
  { id: "print", label: "Print & Signage" },
];

// Nominal dimensions per aspect hint — reserves the right box so images don't
// cause layout shift as they lazy-load. `h-auto` lets the true ratio settle in.
const DIMS: Record<NonNullable<PortfolioItem["aspect"]>, [number, number]> = {
  tall: [900, 1200],
  wide: [1200, 800],
  square: [1000, 1000],
  auto: [1000, 1000],
};

export default function WorkGallery() {
  const [active, setActive] = useState<CatId>("all");
  const reduce = useReducedMotion();

  // Count per category once — drives the little number on each pill.
  const counts = useMemo(() => {
    const c = {} as Record<CatId, number>;
    for (const cat of CATEGORIES) {
      c[cat.id] = PORTFOLIO.filter((p) => matches(p, cat.id)).length;
    }
    return c;
  }, []);

  const items = useMemo(
    () => PORTFOLIO.filter((p) => matches(p, active)),
    [active],
  );

  return (
    <div>
      {/* ── Filter pills ── horizontally scrollable on mobile, wraps on sm+.
          Touch targets are ≥44px tall; active state uses fill + weight, not
          color alone. */}
      <div
        role="tablist"
        aria-label="Filter work by category"
        className={cn(
          "-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat.id)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-4 py-2.5 text-[length:var(--text-secondary)] tracking-wide whitespace-nowrap transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
                isActive
                  ? "border-[var(--color-text-primary)] bg-[var(--color-text-primary)] font-semibold text-[var(--color-cloud)]"
                  : "border-[var(--color-hairline-strong)] text-text-secondary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
              )}
            >
              {cat.label}
              <span
                className={cn(
                  "tabular ml-2 text-[length:var(--text-caption)]",
                  isActive ? "text-[var(--color-cloud)]/70" : "text-text-dim",
                )}
              >
                {counts[cat.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Count line ── */}
      <p
        aria-live="polite"
        className="tabular mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim"
      >
        Showing {items.length} of {PORTFOLIO.length} projects
      </p>

      {/* ── Masonry grid ── CSS columns keep full, uncropped images at their
          natural ratio. Keying on `active` remounts the grid so items
          re-stagger in on filter change. No `layout` animation (it fights
          CSS columns and janks across this many images). */}
      {items.length === 0 ? (
        <div className="mt-12 border border-dashed border-[var(--color-hairline-strong)] p-12 text-center">
          <p className="text-[length:var(--text-body)] text-text-secondary">
            No projects in this category yet — try another filter.
          </p>
        </div>
      ) : (
        <div
          key={active}
          className="mt-8 columns-1 gap-4 [column-gap:1rem] sm:columns-2 lg:columns-3"
        >
          {items.map((item, i) => {
            const [w, h] = DIMS[item.aspect ?? "auto"];
            const Inner = (
              <>
                <div className="relative overflow-hidden rounded-md border border-[var(--color-hairline)] bg-[var(--color-fog)]">
                  <Image
                    src={item.image}
                    alt={`${item.title}${item.brand ? ` — ${item.brand}` : ""}`}
                    width={w}
                    height={h}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {item.href && (
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grave)]/80 text-[var(--color-toxic-text)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <ArrowUpRight size={15} weight="bold" />
                    </span>
                  )}
                </div>
                <div className="mt-3 mb-1">
                  {item.brand && (
                    <span className="block text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                      {item.brand}
                    </span>
                  )}
                  <span className="mt-1 block text-[length:var(--text-secondary)] font-semibold leading-snug text-text-primary group-hover:text-[var(--color-neon-text)]">
                    {item.title}
                  </span>
                </div>
              </>
            );

            const cardClass =
              "group mb-4 block break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2";

            const card = item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
                aria-label={`${item.title} — open live project (opens in new tab)`}
              >
                {Inner}
              </a>
            ) : (
              <div className={cardClass}>{Inner}</div>
            );

            if (reduce) return <div key={item.id}>{card}</div>;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  // Cap the stagger so the 80-item "All" view doesn't take
                  // seconds to finish revealing.
                  delay: Math.min(i, 10) * 0.04,
                }}
              >
                {card}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
