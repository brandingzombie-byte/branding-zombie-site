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

export default function ServiceHero({ service }: { service: Service }) {
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
            className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]"
          >
            {service.hero.headline}{" "}
            <span className="relative inline-block">
              {service.hero.highlightWord}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full"
                style={{ backgroundColor: ACCENT_LINE[service.themeAccent] }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]"
          >
            {service.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={service.hero.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
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
        </div>

        {/* Hero showcase — carousel of real projects when we have them,
            single static image as fallback (e.g. AI Workflows). */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <motion.div style={{ y: imgY }}>
            {showcase.length >= 2 ? (
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
