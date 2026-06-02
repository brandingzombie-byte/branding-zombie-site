"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import { ArrowUpRight, Check } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";
import { CALENDLY_URL } from "@/lib/site";
import {
  PRINT_BUNDLES,
  PRINT_CATEGORIES,
  PRINT_COMPARISON,
  PRINT_PRODUCTS,
  PRINT_PRODUCT_COUNT,
  type PrintCategorySlug,
} from "@/data/print-catalog";

type FilterValue = "all" | PrintCategorySlug;

const FILTERS: { value: FilterValue; label: string; count: number }[] = [
  { value: "all", label: "All", count: PRINT_PRODUCT_COUNT },
  ...PRINT_CATEGORIES.map((c) => ({
    value: c.slug,
    label: c.label,
    count: PRINT_PRODUCTS.filter((p) => p.category === c.slug).length,
  })),
];

const CATEGORY_LOOKUP = Object.fromEntries(
  PRINT_CATEGORIES.map((c) => [c.slug, c]),
) as Record<PrintCategorySlug, (typeof PRINT_CATEGORIES)[number]>;

const STAT_BADGES = [
  { label: "Products in catalog", value: `${PRINT_PRODUCT_COUNT}+` },
  { label: "Designed + produced", value: "In-house" },
  { label: "Local delivery", value: "30 mi" },
  { label: "Typical turnaround", value: "3–10 days" },
];

export default function PrintCatalog() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const { ref, isInView } = useReveal(0.05);

  const products = useMemo(
    () =>
      filter === "all"
        ? PRINT_PRODUCTS
        : PRINT_PRODUCTS.filter((p) => p.category === filter),
    [filter],
  );

  const activeSummary =
    filter === "all"
      ? "Every product Branding Zombie can design and produce under one roof — pick a category to narrow it down."
      : CATEGORY_LOOKUP[filter].summary;

  return (
    <Section theme="light" pad="spacious" id="print-catalog">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              Browse the catalog
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              One studio.{" "}
              <span className="relative inline-block">
                Everything your brand prints
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            Designed in our Cumming studio, produced through our in-house print
            network, and delivered across Forsyth County and North Metro
            Atlanta. One quote covers art, production, and drop-off — no
            ferrying files between three vendors.
          </p>
        </div>

        {/* ── Comparison table — AEO/GEO hook + objection handler ──────── */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)]">
          <div className="bg-[var(--color-grave)] px-6 py-4 text-[var(--color-dark-text-primary)] sm:px-8">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
              Why one shop
            </span>
            <h3 className="mt-1 text-[length:var(--text-h4)] font-semibold leading-tight">
              One studio vs. a designer + a print shop
            </h3>
          </div>
          <div className="hidden grid-cols-12 border-b border-[var(--color-hairline)] bg-[var(--color-surface-0)] px-6 py-3 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim sm:grid sm:px-8">
            <span className="col-span-4">Topic</span>
            <span className="col-span-4 text-[var(--color-neon-text)]">
              Branding Zombie (one shop)
            </span>
            <span className="col-span-4">Designer + print shop</span>
          </div>
          {PRINT_COMPARISON.map((row, i) => (
            <div
              key={row.topic}
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-2 px-6 py-5 sm:grid-cols-12 sm:px-8",
                i % 2 === 0
                  ? "bg-[var(--color-cloud)]"
                  : "bg-[var(--color-fog)]",
              )}
            >
              <div className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim sm:col-span-4 sm:self-center">
                {row.topic}
              </div>
              <div className="text-[length:var(--text-body)] leading-relaxed text-text-primary sm:col-span-4">
                <span className="mb-1 inline-flex items-center gap-1.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--color-neon-text)] sm:hidden">
                  <Check size={12} weight="bold" />
                  Branding Zombie
                </span>
                {row.oneShop}
              </div>
              <div className="text-[length:var(--text-body)] leading-relaxed text-text-secondary sm:col-span-4">
                <span className="mb-1 inline-flex text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-text-dim sm:hidden">
                  Designer + print shop
                </span>
                {row.twoShops}
              </div>
            </div>
          ))}
        </div>

        {/* ── Stat strip — citation-ready numbers ──────────────────────── */}
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-4">
          {STAT_BADGES.map((s) => (
            <li
              key={s.label}
              className="flex flex-col bg-[var(--color-cloud)] px-5 py-5"
            >
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-text-primary">
                {s.value}
              </span>
              <span className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        {/* ── Filter bar ───────────────────────────────────────────────── */}
        <div className="catalog-filter-bar mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter print products by category"
            className="catalog-filter-track -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "catalog-filter-pill group relative inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider min-h-[44px]",
                    active
                      ? "border-transparent bg-[var(--color-grave)] text-[var(--color-toxic-text)]"
                      : "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] text-text-secondary",
                  )}
                >
                  <span>{f.label}</span>
                  <span
                    className={cn(
                      "tabular text-[length:var(--text-caption)] tracking-normal opacity-70",
                      active
                        ? "text-[var(--color-toxic-text)]"
                        : "text-text-dim",
                    )}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
          <p
            key={filter}
            className="max-w-[42ch] text-[length:var(--text-secondary)] leading-relaxed text-text-secondary"
          >
            {activeSummary}
          </p>
        </div>

        {/* ── Product grid ─────────────────────────────────────────────── */}
        <div
          key={filter}
          className="catalog-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((p, i) => {
            const cap = Math.min(i, 6);
            return (
              <article
                key={p.slug}
                style={{ animationDelay: `${cap * 32}ms` }}
                className="catalog-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-fog)]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                    className="catalog-card-img object-cover"
                    priority={i < 2}
                  />
                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center rounded-full bg-[var(--color-grave)]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-toxic-text)] backdrop-blur">
                    {CATEGORY_LOOKUP[p.category].label}
                  </span>
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex tabular items-center rounded-full bg-[var(--color-cloud)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-primary backdrop-blur">
                    {p.turnaround}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 py-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[length:var(--text-h4)] font-semibold leading-tight text-text-primary">
                      {p.name}
                    </h3>
                    <span className="tabular shrink-0 text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-[var(--color-neon-text)]">
                      {p.startingPrice}
                    </span>
                  </div>

                  <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    {p.blurb}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.options.map((o) => (
                      <li
                        key={o}
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-0)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-text-dim"
                      >
                        <Check
                          size={10}
                          weight="bold"
                          className="text-[var(--color-neon-text)]"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`${CALENDLY_URL}?utm_source=print-catalog&utm_content=${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[44px] items-center justify-between gap-2 border-t border-[var(--color-hairline)] pt-4 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-primary"
                  >
                    Quote this product
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="catalog-card-arrow"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Bundle examples — decision-fatigue cure ──────────────────── */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Real-world kits
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
                Three kits we ship a lot.
              </h3>
            </div>
            <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              Sample bundles, all-in pricing. Easier than picking products
              one-by-one. Mix and match to fit your job.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PRINT_BUNDLES.map((b) => (
              <article
                key={b.slug}
                className="flex flex-col rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-surface-0)] p-6"
              >
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                  Sample kit
                </span>
                <h4 className="mt-2 text-[length:var(--text-h4)] font-semibold leading-tight text-text-primary">
                  {b.title}
                </h4>
                <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-dim">
                  {b.audience}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-5">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary"
                    >
                      <Check
                        size={14}
                        weight="bold"
                        className="mt-1 shrink-0 text-[var(--color-neon-text)]"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-baseline justify-between border-t border-[var(--color-hairline)] pt-5">
                  <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-none tracking-tight text-text-primary">
                    {b.allInPrice}
                  </span>
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    {b.timeline}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Catch-all CTA band ───────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-grave)] px-7 py-8 text-[var(--color-dark-text-primary)] sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
              Don't see what you need?
            </p>
            <p className="mt-2 max-w-[58ch] text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              If it can be printed, we can design and source it — yard signs,
              vehicle wraps, custom apparel, packaging, you name it. Send us
              what you're picturing and we'll come back with a real quote. 🧟
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)]"
          >
            Request a custom quote
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </Section>
  );
}
