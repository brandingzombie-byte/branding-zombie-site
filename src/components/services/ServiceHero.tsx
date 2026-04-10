"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import Section from "@/components/Section";
import type { Service } from "@/data/services";

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

export default function ServiceHero({ service }: { service: Service }) {
  const heroRef = useRef<HTMLDivElement>(null);

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

        {/* Hero image with parallax */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <motion.div
            style={{ y: imgY }}
            className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
