"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import type { Service } from "@/data/services";
import { getServiceHeroShowcase, type HeroShowcaseItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<Service["themeAccent"], string> = {
  neon: "radial-gradient(60% 50% at 25% 30%, rgba(192,237,8,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.06), transparent 70%)",
  toxic:
    "radial-gradient(60% 50% at 25% 30%, rgba(191,255,0,0.11), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.06), transparent 70%)",
  cyan: "radial-gradient(60% 50% at 25% 30%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
};

const ACCENT_LINE: Record<Service["themeAccent"], string> = {
  neon: "var(--color-neon)",
  toxic: "var(--color-toxic)",
  cyan: "var(--color-cyan)",
};

const ACCENT_TEXT: Record<Service["themeAccent"], string> = {
  neon: "var(--color-toxic-text)",
  toxic: "var(--color-toxic-text)",
  cyan: "var(--color-cyan-text)",
};

const AUTO_ADVANCE_MS = 5000;

export default function ServiceHero({
  service,
  formSlot,
}: {
  service: Service;
  /**
   * Optional above-the-fold lead form. When provided it replaces the
   * showcase carousel in the right column and becomes the hero's single
   * conversion action (the CTA button row is dropped; the audit link
   * survives as a quiet text link).
   */
  formSlot?: React.ReactNode;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const showcase = getServiceHeroShowcase(service.slug, 5);

  // Subtle parallax on hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <Section
      theme="dark"
      pad="spacious"
      pattern="asymmetric"
      className="min-h-[100dvh] overflow-hidden"
    >
      {/* Ambient drift */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
        style={{ background: ACCENT_BG[service.themeAccent] }}
      />

      {/* "Count three" hand reaching in from the right edge, hovering in
          the empty band above the form card — three fields, that's it.
          Cursor-following on desktop, hidden on mobile. */}
      {formSlot && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-x-clip"
        >
          <ZombieHand
            src={HANDS["zh32-count-three-r"].src}
            width={HANDS["zh32-count-three-r"].width}
            height={HANDS["zh32-count-three-r"].height}
            edge="right"
            behaviors={["peek", "idle", "follow"]}
            offset="8%"
            bleed="-28px"
            displayWidth={235}
            rotate={-8}
            followStrength={26}
          />
        </div>
      )}

      <div
        ref={heroRef}
        className="grid grid-cols-1 items-center gap-x-10 gap-y-12 pt-20 lg:grid-cols-12 lg:pt-28"
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden
              className="h-px w-8"
              style={{ backgroundColor: ACCENT_LINE[service.themeAccent] }}
            />
            <span
              className="text-[length:var(--text-caption)] uppercase tracking-[0.22em]"
              style={{ color: ACCENT_TEXT[service.themeAccent] }}
            >
              {service.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mt-6 font-[family-name:var(--font-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]",
              // With an above-the-fold form the headline steps down one size so
              // the whole conversion moment (headline → subhead → form) fits in
              // the first viewport instead of scrolling past it.
              formSlot
                ? "text-[length:var(--text-h2)] lg:text-[length:clamp(2.5rem,1.9rem+2.4vw,3.9rem)]"
                : "text-[length:var(--text-display)]",
            )}
          >
            {service.hero.headline}{" "}
            {/* Period lives inside the inline-block so it can never wrap
                onto its own orphan line after the underlined word. */}
            <span className="relative inline-block">
              {service.hero.highlightWord}.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-[calc(100%-0.3em)]"
                style={{ backgroundColor: ACCENT_LINE[service.themeAccent] }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]"
          >
            {service.hero.subhead}
          </motion.p>

          {formSlot ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-start gap-3"
            >
              <p className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                {service.hero.microProof}
              </p>
              <a
                href={service.hero.ctaHref}
                className="group inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)] underline decoration-[var(--color-dark-border-strong)] underline-offset-4 transition-colors duration-200 hover:text-[var(--color-toxic-text)] hover:decoration-current"
              >
                Not ready to talk? {service.hero.ctaLabel.toLowerCase()} instead
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={service.hero.ctaHref}
                target={service.hero.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={service.hero.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                role="button"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
              >
                {service.hero.ctaLabel}
                <ArrowUpRight size={16} weight="bold" />
              </a>
              <p className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                {service.hero.microProof}
              </p>
            </motion.div>
          )}
        </div>

        {/* Hero showcase — carousel of real projects when we have them,
            single static image as fallback (e.g. AI Workflows). */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <motion.div style={{ y: formSlot ? undefined : imgY }}>
            {formSlot ? (
              <div className="relative border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] md:p-8">
                {/* Accent seam along the top — reads as "start here" */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ backgroundColor: ACCENT_LINE[service.themeAccent] }}
                />
                {formSlot}
              </div>
            ) : showcase.length >= 2 ? (
              <HeroShowcaseCarousel
                items={showcase}
                accent={service.themeAccent}
              />
            ) : (
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
                <Image
                  src={service.hero.heroImage.src}
                  alt={service.hero.heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-grave)]/50 to-transparent"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Hero showcase carousel ────────────────────────────────────────────────

function HeroShowcaseCarousel({
  items,
  accent,
}: {
  items: HeroShowcaseItem[];
  accent: Service["themeAccent"];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  // Auto-advance — paused on hover, on focus-within, and when the user
  // prefers reduced motion. Adding `index` to deps means a manual dot
  // click also resets the timer, so users get the full slide duration
  // on the project they picked. WCAG 2.2.2: pausable, no flash, ≥5s.
  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, reduced, items.length, index]);

  const current = items[index];

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Recent client work"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border)] bg-gradient-to-br from-[var(--color-grave)] via-[var(--color-surface)] to-[var(--color-elevated)]">
        {/* Soft accent spotlight so the image plate feels intentional
            instead of "thumbnail floating in a void." */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${accentSpotlight(
              accent,
            )}, transparent 65%)`,
          }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-contain p-8 md:p-10"
              priority={index === 0}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom scrim — caption legibility regardless of image colors. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-grave)]/95 via-[var(--color-grave)]/55 to-transparent"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`caption-${current.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6"
          >
            {current.brand && (
              <span
                className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]"
                style={{ color: accentTextVar(accent) }}
              >
                {current.brand}
              </span>
            )}
            <h2 className="text-[length:var(--text-h4)] font-semibold leading-tight text-[var(--color-dark-text-primary)]">
              {current.title}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Counter — top-right, tabular, calm. */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/70 px-3 py-1 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-secondary)] backdrop-blur">
          <span className="tabular text-[var(--color-dark-text-primary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden>/</span>
          <span className="tabular">{String(items.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Dots — 44px touch targets, accent-colored when active. */}
      <div
        className="mt-4 flex items-center justify-center gap-1"
        role="tablist"
        aria-label="Project navigation"
      >
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show project ${i + 1}: ${it.title}`}
            onClick={() => setIndex(i)}
            className="group/dot flex h-11 w-11 items-center justify-center"
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-7"
                  : "w-3 bg-[var(--color-dark-border-strong)] group-hover/dot:bg-[var(--color-dark-text-dim)]",
              )}
              style={
                i === index
                  ? { backgroundColor: accentLineVar(accent) }
                  : undefined
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function accentLineVar(accent: Service["themeAccent"]): string {
  return accent === "neon"
    ? "var(--color-neon)"
    : accent === "cyan"
    ? "var(--color-cyan)"
    : "var(--color-toxic)";
}

function accentTextVar(accent: Service["themeAccent"]): string {
  return accent === "cyan"
    ? "var(--color-cyan-text)"
    : "var(--color-toxic-text)";
}

function accentSpotlight(accent: Service["themeAccent"]): string {
  return accent === "cyan"
    ? "rgba(0, 255, 212, 0.10)"
    : accent === "neon"
    ? "rgba(192, 237, 8, 0.08)"
    : "rgba(191, 255, 0, 0.08)";
}
