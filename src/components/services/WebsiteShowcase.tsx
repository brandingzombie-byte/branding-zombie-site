"use client";

/**
 * WebsiteShowcase — editorial case-study gallery for the Web Design page.
 *
 * Replaces the generic 13-slide carousel with a curated, browser-framed
 * grid: one featured launch up top, then a tight grid of live sites.
 * Every screenshot sits inside a mock browser chrome so the work reads
 * instantly as "real shipped websites," not abstract thumbnails.
 */

import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import type { PortfolioItem } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

function domainOf(href?: string): string | null {
  if (!href) return null;
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Mock browser chrome around a screenshot — dots + domain bar. */
function BrowserFrame({
  item,
  sizes,
  priorityHint = false,
}: {
  item: PortfolioItem;
  sizes: string;
  priorityHint?: boolean;
}) {
  const domain = domainOf(item.href);
  return (
    <div className="overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)] transition-colors duration-300 group-hover:border-[var(--color-dark-border-strong)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-[var(--color-dark-border)] bg-[var(--color-grave)] px-4 py-2.5">
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-[var(--color-dark-border-strong)]" />
          <span className="h-2 w-2 rounded-full border border-[var(--color-dark-border-strong)]" />
          <span className="h-2 w-2 rounded-full border border-[var(--color-dark-border-strong)]" />
        </span>
        {domain && (
          <span className="truncate font-[family-name:var(--font-geist-mono)] text-[length:var(--text-caption)] tracking-wide text-[var(--color-dark-text-dim)]">
            {domain}
          </span>
        )}
      </div>
      {/* Screenshot — 1280×800 viewport shots, top-aligned crop */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={`${item.title} — website by Branding Zombie Designs`}
          fill
          sizes={sizes}
          priority={priorityHint}
          className="object-cover object-top transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

function CardMeta({
  item,
  headingClass,
}: {
  item: PortfolioItem;
  headingClass: string;
}) {
  return (
    <>
      {item.brand && (
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
          {item.brand}
        </span>
      )}
      <h3
        className={cn(
          "font-semibold leading-tight text-[var(--color-dark-text-primary)]",
          headingClass,
        )}
      >
        {item.title}
      </h3>
      <p className="text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
        {item.description}
      </p>
      {item.href && (
        <span className="mt-1 inline-flex items-center gap-1.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
          Visit live site
          <ArrowUpRight
            size={13}
            weight="bold"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  );
}

export default function WebsiteShowcase({
  items,
  eyebrow = "Selected work",
  headline = "Real sites, real businesses,",
  highlight = "really live",
  description = "Every screenshot below is a launched site you can visit right now. Restaurants, detailers, contractors, DTC brands — built to convert first, admired second.",
}: {
  items: PortfolioItem[];
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  description?: string;
}) {
  const { ref, isInView } = useReveal();
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <Section theme="dark" pad="spacious" topRule bottomRule className="overflow-hidden">
      {/* Decorative hand aimed at the work (desktop only, motion-safe) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] overflow-x-clip"
      >
        <ZombieHand
          src={HANDS["zh13-point-viewer-l"].src}
          width={HANDS["zh13-point-viewer-l"].width}
          height={HANDS["zh13-point-viewer-l"].height}
          edge="left"
          behaviors={["peek", "idle", "parallax"]}
          offset="3%"
          bleed="-40px"
          displayWidth={230}
          rotate={18}
          zIndex={5}
        />
      </div>

      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                {eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              {headline}{" "}
              <span className="relative inline-block">
                {highlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h2>
            <p className="measure mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {description}
            </p>
          </div>
          <a
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)] hover:underline"
          >
            Everything we&apos;ve shipped
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Featured launch — full-width, screenshot leads */}
        <FeaturedCard item={featured} />

        {/* The rest — tight editorial grid */}
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
          {rest.map((item, i) => (
            <GridCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FeaturedCard({ item }: { item: PortfolioItem }) {
  const { ref, isInView } = useReveal();
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <div
      ref={ref}
      className={cn(
        "mt-12 transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      <Wrapper
        {...wrapperProps}
        className="group grid grid-cols-1 items-center gap-8 focus-visible:outline-none lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <BrowserFrame
            item={item}
            sizes="(min-width: 1024px) 60vw, 100vw"
            priorityHint
          />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-dark-text-dim)]">
            Featured launch
          </span>
          <CardMeta item={item} headingClass="text-[length:var(--text-h3)]" />
        </div>
      </Wrapper>
    </div>
  );
}

function GridCard({ item, index }: { item: PortfolioItem; index: number }) {
  const { ref, isInView } = useReveal();
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <li className="h-full">
      <div
        ref={ref}
        className={cn(
          "h-full transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
        style={{ transitionDelay: `${Math.min(index % 3, 2) * 90}ms` }}
      >
        <Wrapper
          {...wrapperProps}
          className="group flex h-full flex-col gap-4 focus-visible:outline-none"
        >
          <BrowserFrame
            item={item}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="flex flex-col gap-2">
            <CardMeta item={item} headingClass="text-[length:var(--text-h4)]" />
          </div>
        </Wrapper>
      </div>
    </li>
  );
}
