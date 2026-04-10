"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "@/components/Section";
import { ArrowUpRight } from "@/components/icons";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const handY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <Section
      theme="dark"
      pad="none"
      pattern="asymmetric"
      bleed
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Background: graveyard photo, desaturated to sit under the dark theme */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
        aria-hidden
      >
        <Image
          src="/assets/branding-zombie-hero.png"
          alt=""
          fill
          className="object-cover opacity-30 [filter:saturate(0.4)_brightness(0.45)]"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Ambient drift — replaces the WebGL smoke shader */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 35%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 75% 60%, rgba(0,255,212,0.07), transparent 70%)",
        }}
      />

      {/* Top vignette that fades from grave to transparent so the navbar floats */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-40 bg-gradient-to-b from-[var(--color-grave)] via-[var(--color-grave)]/60 to-transparent"
      />

      {/* Bottom hard cut — 1px toxic seam into the next section */}
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

          {/* Headline — display weight contrast on noun */}
          <h1 className="mt-6 font-[family-name:var(--font-display)] leading-[0.92] tracking-tight">
            <span className="animate-rise block text-[length:var(--text-display)] text-[var(--color-dark-text-primary)] opacity-0 [animation-delay:160ms]">
              Small businesses
            </span>
            <span className="animate-rise mt-2 block text-[length:var(--text-display)] opacity-0 [animation-delay:280ms]">
              <span className="relative inline-block text-[var(--color-dark-text-primary)]">
                resurrected
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-toxic)]"
                  style={{
                    animation:
                      "underline-reveal var(--duration-slower) var(--ease-out-expo) 700ms forwards",
                  }}
                />
              </span>
              .
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
              href="#contact"
              role="button"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Get a free audit
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-medium uppercase tracking-wider text-[var(--color-dark-text-secondary)] hover:text-[var(--color-toxic-text)]"
            >
              See the work
              <span className="h-px w-6 bg-current transition-all duration-200 group-hover:w-10" />
            </a>
          </div>

          {/* Trust strip */}
          <div className="animate-fade-up mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)] opacity-0 [animation-delay:880ms]">
            <span className="tabular">15-min call</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-dark-border-strong)]" />
            <span>No commitment</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-dark-border-strong)]" />
            <span>100% free</span>
          </div>
        </div>

        {/* RIGHT: zombie hand spans cols 8–12, anchored bottom-right with overflow */}
        <motion.div
          className="pointer-events-none relative col-span-12 mt-10 flex items-end justify-end md:col-span-4 md:mt-0 lg:col-span-5"
          style={{ y: handY }}
          aria-hidden
        >
          <div className="animate-float relative aspect-[3/4] w-[60%] sm:w-[55%] md:absolute md:-right-4 md:bottom-[-6%] md:w-[120%] lg:-right-8 lg:w-[130%]">
            <Image
              src="/assets/1x/hand-hero.png"
              alt="Zombie hand holding creative tools"
              fill
              className="object-contain drop-shadow-[0_30px_50px_rgba(191,255,0,0.18)]"
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 35vw, 60vw"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
