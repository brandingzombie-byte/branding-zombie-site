"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Section from "@/components/Section";
import { ArrowUpRight, Phone } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <Section
      theme="dark"
      pad="none"
      pattern="asymmetric"
      bleed
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Background video — parallax layer. Oversized + negative-insets so the
          120px translate never reveals an empty edge above the fold. */}
      <motion.div
        className="absolute -inset-y-[140px] inset-x-0 -z-10"
        style={{ y: shouldReduceMotion ? 0 : bgY }}
        aria-hidden
      >
        <video
          className="h-full w-full object-cover object-right md:object-center opacity-70 [filter:saturate(0.65)_brightness(0.6)_contrast(1.05)]"
          poster="/assets/branding-zombie-hero.png"
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/branding-zombie-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Readability scrim — top-down on mobile (text stacks vertically),
          left-to-right on md+ (text lives in the left columns). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-grave)]/85 via-[var(--color-grave)]/55 to-[var(--color-grave)]/25 md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-[var(--color-grave)]/90 via-[var(--color-grave)]/45 to-transparent md:block"
      />

      {/* Ambient toxic/teal drift */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 35%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 75% 60%, rgba(0,255,212,0.07), transparent 70%)",
        }}
      />

      {/* Top vignette — keeps nav floating cleanly over video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-40 bg-gradient-to-b from-[var(--color-grave)] via-[var(--color-grave)]/60 to-transparent"
      />

      {/* Bottom hard cut — 1px toxic seam into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-toxic)]/60"
      />

      {/* === Content grid: 12-col asymmetric === */}
      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1440px] grid-cols-12 gap-x-6 px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
        {/* LEFT: text spans cols 1–8 */}
        <div className="col-span-12 flex flex-col justify-center md:col-span-8 lg:col-span-7">
          {/* Eyebrow */}
          <div className="animate-fade-up flex items-center gap-3 opacity-0 [animation-delay:80ms]">
            <span className="h-px w-8 bg-[var(--color-toxic)]" />
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-dark-text-secondary)]">
              Cumming · Forsyth County · GA
            </span>
          </div>

          {/* Headline — display weight contrast on noun.
              Size is scoped to the hero (slightly smaller than --text-display)
              so the headline fits on narrow mobile without getting clipped,
              and the leading is loosened to 1.05 so the two lines never kiss. */}
          <h1 className="mt-6 font-[family-name:var(--font-display)] leading-[1.05] tracking-tight">
            <span className="animate-rise block text-[clamp(2.5rem,1.7rem+4.3vw,6rem)] text-[var(--color-dark-text-primary)] opacity-0 [animation-delay:160ms]">
              Small businesses
            </span>
            <span className="animate-rise mt-3 block text-[clamp(2.5rem,1.7rem+4.3vw,6rem)] opacity-0 [animation-delay:280ms]">
              {/* Period lives inside the underlined inline-block so the
                  toxic-green line extends under the full "resurrected." —
                  matches the underline treatment used on other page headers. */}
              <span className="relative inline-block whitespace-nowrap text-[var(--color-dark-text-primary)]">
                resurrected.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-toxic)]"
                  style={{
                    animation:
                      "underline-reveal var(--duration-slower) var(--ease-out-expo) 700ms forwards",
                  }}
                />
              </span>
            </span>
          </h1>

          {/* Lead */}
          <p className="animate-fade-up measure mt-8 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)] opacity-0 [animation-delay:520ms]">
            Modern websites, AI workflows, and killer brand systems —{" "}
            <span className="text-[var(--color-dark-text-primary)]">
              built in days, not months,
            </span>{" "}
            from right here in Cumming, Georgia.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 opacity-0 [animation-delay:700ms] sm:flex-row sm:items-center">
            <a
              href="/free-site-audit"
              role="button"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Get a free audit
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a
              href={PHONE_HREF}
              className="tabular group inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
            >
              <Phone size={16} weight="bold" />
              Call Now · {PHONE_DISPLAY}
            </a>
          </div>

          {/* Tertiary link */}
          <a
            href="#portfolio"
            className="animate-fade-up mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--color-dark-text-secondary)] opacity-0 [animation-delay:780ms] hover:text-[var(--color-toxic-text)]"
          >
            See the work
            <span className="h-px w-6 bg-current transition-all duration-200 hover:w-10" />
          </a>

          {/* Trust strip */}
          <div className="animate-fade-up mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)] opacity-0 [animation-delay:880ms]">
            <span>Free audit</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-dark-border-strong)]" />
            <span>No commitment</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-dark-border-strong)]" />
            <span>100% free</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
