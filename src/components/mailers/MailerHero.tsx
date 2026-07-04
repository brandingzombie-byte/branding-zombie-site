"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Phone } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MailerHero({
  eyebrow,
  headline,
  highlight,
  subhead,
  microProof,
  image,
  primaryCtaLabel,
  calendlyUrl,
  phoneDisplay,
  phoneHref,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
  subhead: string;
  microProof: string;
  image: { src: string; alt: string };
  primaryCtaLabel: string;
  calendlyUrl: string;
  phoneDisplay: string;
  phoneHref: string;
}) {
  const reduce = useReducedMotion();
  const rise = (y: number, delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-grave)]" data-theme="dark">
      {/* Ambient accent glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-[var(--color-toxic)]/10 blur-[120px] motion-safe:animate-ambient"
      />
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 py-[var(--space-standard)] lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex flex-col">
          <motion.span
            {...rise(8, 0)}
            className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            {...rise(24, 0.1)}
            className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.04] tracking-tight text-[var(--color-dark-text-primary)]"
          >
            {headline}{" "}
            <span className="relative inline-block">
              {highlight}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
              />
            </span>
          </motion.h1>

          <motion.p
            {...rise(24, 0.2)}
            className="measure mt-6 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]"
          >
            {subhead}
          </motion.p>

          <motion.div {...rise(24, 0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]"
            >
              {primaryCtaLabel}
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              />
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_intent", { method: "calendly", source: "mailer_hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-colors duration-200 hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)] active:scale-[0.97]"
            >
              <Calendar size={16} weight="regular" />
              Book a 15-min call
            </a>
          </motion.div>

          <motion.div {...rise(16, 0.44)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.15em] text-[var(--color-dark-text-dim)]">
              {microProof}
            </span>
            <a
              href={phoneHref}
              onClick={() => trackEvent("contact_intent", { method: "phone", source: "mailer_hero" })}
              className="inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-toxic-text)] hover:underline"
            >
              <Phone size={15} weight="regular" />
              <span className="tabular">{phoneDisplay}</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          {...(reduce
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
            : {
                initial: { opacity: 0, y: 24, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.8, delay: 0.2, ease: EASE },
              })}
          className="relative"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] shadow-soft-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
