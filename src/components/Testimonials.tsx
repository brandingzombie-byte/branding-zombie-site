"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Star, ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";

// Real reviews live in one place (src/data/reviews.ts) so the visible quotes
// and the Review/AggregateRating schema can never drift apart.
const testimonials = REVIEWS;

const stats = [
  { value: "5.0", label: "Google rating" },
  { value: "100%", label: "5★ reviews" },
  { value: "2–3", label: "Weeks to a live site" },
  { value: "80+", label: "Projects delivered" },
];

export default function Testimonials() {
  const { ref, isInView } = useInView(0.05);
  const [active, setActive] = useState(0);
  const tablistRef = useRef<HTMLUListElement>(null);
  const current = testimonials[active];

  // Keyboard nav across the tablist (per WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End")
      return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % testimonials.length;
    if (e.key === "ArrowLeft") next = (active - 1 + testimonials.length) % testimonials.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = testimonials.length - 1;
    setActive(next);
    // Move focus to the newly selected tab
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>("button[role='tab']");
    buttons?.[next]?.focus();
  };

  return (
    <Section
      theme="light"
      pad="spacious"
      className="bg-[var(--color-fog)]"
    >
      {/* ── Zombie hand layer (decorative, behind content) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] overflow-x-clip"
      >
        {/* Thumbs-up approval beside the reviews (left edge, cursor-follow).
            Desktop only — mobile gets its own placement below the review box. */}
        <ZombieHand
          src={HANDS["zh01-thumbsup-l"].src}
          width={HANDS["zh01-thumbsup-l"].width}
          height={HANDS["zh01-thumbsup-l"].height}
          edge="left"
          behaviors={["peek", "follow", "idle"]}
          offset="52%"
          bleed="-42px"
          displayWidth={400}
          zIndex={5}
        />
      </div>
      <div
        ref={ref}
        className={cn(
          "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* ── Section eyebrow ── */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-neon-text)]" />
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-text-dim">
            Real reviews · Verified on Google
          </span>
        </div>

        <h2
          className="mt-6 max-w-[26ch] font-[family-name:var(--font-display)] leading-[1.15] tracking-tight text-text-primary"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)" }}
        >
          What our clients{" "}
          <span className="relative inline-block">
            actually say
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>
          .
        </h2>

        {/* ── Stats scoreboard strip ── */}
        <div
          className="mt-10 grid grid-cols-2 border-2 border-[var(--color-text-primary)] sm:grid-cols-4"
          role="list"
          aria-label="Studio performance"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              role="listitem"
              className={cn(
                "flex flex-col gap-1.5 px-6 py-5",
                // Right borders on all but the last in each row
                i % 2 === 0 && "border-r-2 border-[var(--color-text-primary)]",
                // Inter-row border on mobile-only
                i < 2 && "border-b-2 border-[var(--color-text-primary)] sm:border-b-0",
                // Desktop right borders (4-col): all but the last
                i < stats.length - 1 && "sm:border-r-2 sm:border-[var(--color-text-primary)]",
                i === stats.length - 1 && "sm:border-r-0",
              )}
            >
              <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
                {s.value}
              </div>
              <div className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Editorial pull-quote ── */}
        <div className="relative mt-16 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          {/* LEFT: stars + quote, spans 8 of 12 */}
          <div className="relative lg:col-span-8">
            {/* Watermark quotation mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-12 -left-2 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.05]"
              style={{ fontSize: "clamp(7rem, 15vw, 12rem)" }}
            >
              &ldquo;
            </span>

            {/* Active star rating */}
            <div
              className="relative flex items-center gap-1.5"
              aria-label="Rated 5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  weight="fill"
                  className="text-[var(--color-neon-text)]"
                />
              ))}
              <span className="ml-2 font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                5 / 5
              </span>
            </div>

            <figure className="mt-6">
              <blockquote
                key={active}
                className="relative animate-fade-up opacity-0 font-[family-name:var(--font-display)] leading-[1.35] tracking-tight text-text-primary motion-reduce:animate-none motion-reduce:opacity-100"
                style={{ fontSize: "clamp(1.5rem, 1rem + 1.6vw, 2.25rem)" }}
                dangerouslySetInnerHTML={{
                  __html: `&ldquo;${current.quote}&rdquo;`,
                }}
              />
              <figcaption className="mt-6 flex flex-col gap-0.5">
                <span className="text-[length:var(--text-body)] font-semibold text-text-primary">
                  {current.name}
                </span>
                <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                  {current.business} · {current.location} · {current.date}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* RIGHT: Google trust panel */}
          <aside
            aria-label="Verified Google reviews"
            className="flex flex-col gap-4 self-start border-2 border-[var(--color-text-primary)] bg-[var(--color-cloud)] p-6 lg:col-span-4"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-text-dim">
                Source · Google
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none text-text-primary">
                5.0
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      weight="fill"
                      className="text-[var(--color-neon-text)]"
                    />
                  ))}
                </div>
                <span className="mt-1 text-[length:var(--text-caption)] text-text-dim">
                  Based on {testimonials.length} reviews
                </span>
              </div>
            </div>
            <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
              Every quote here links to a real, verified Google review. No
              stock photos. No invented names. No agency theater.
            </p>
            <Link
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener"
              className={cn(
                "group inline-flex items-center gap-2 self-start border-2 border-[var(--color-text-primary)] bg-[var(--color-text-primary)] px-4 py-2.5 font-mono text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--color-cloud)]",
                "transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                "hover:bg-[var(--color-neon)] hover:text-[var(--color-text-primary)] active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
                "motion-reduce:transition-none motion-reduce:active:scale-100",
              )}
            >
              Read on Google
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-[var(--duration-base)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </aside>
        </div>

        {/* Mobile-only thumbs-up — sits directly below the Google review box in
            its own band, bleeding off the left screen edge. Peek + idle sway +
            a gentle scroll drift so it feels alive without covering the copy. */}
        <div
          aria-hidden
          className="pointer-events-none relative -mx-6 mt-6 h-[140px] overflow-x-clip md:hidden"
        >
          <ZombieHand
            src={HANDS["zh01-thumbsup-l"].src}
            width={HANDS["zh01-thumbsup-l"].width}
            height={HANDS["zh01-thumbsup-l"].height}
            edge="left"
            behaviors={["peek", "parallax", "idle"]}
            offset="-4px"
            bleed="-30px"
            displayWidth={450}
            parallaxSpeed={0.1}
            zIndex={5}
            mobile
            mobileParallax
          />
        </div>

        {/* ── Byline switcher — horizontal press strip ── */}
        <nav
          aria-label="Testimonial navigation"
          className="mt-14 border-t-2 border-[var(--color-text-primary)] pt-4"
        >
          <ul
            ref={tablistRef}
            role="tablist"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="flex flex-wrap items-stretch"
          >
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <li key={t.name} role="none" className="flex-1 min-w-[170px]">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative h-full w-full border-r border-[var(--color-hairline-strong)] px-5 py-4 text-left",
                      "transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-quart)]",
                      "last:border-r-0 hover:bg-[var(--color-cloud)] active:scale-[0.99]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-inset",
                      "motion-reduce:transition-none motion-reduce:active:scale-100",
                      isActive && "bg-[var(--color-cloud)]",
                    )}
                  >
                    {/* Active indicator — origin-aware scale-x, custom ease */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 left-0 h-[3px] w-full origin-left bg-[var(--color-neon)]",
                        "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)]",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <span
                      className={cn(
                        "block text-[length:var(--text-secondary)] font-semibold transition-colors duration-[var(--duration-base)]",
                        isActive ? "text-text-primary" : "text-text-dim group-hover:text-text-primary",
                      )}
                    >
                      {t.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-text-dim">
                      {t.business.length > 28
                        ? `${t.business.slice(0, 26)}…`
                        : t.business}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
