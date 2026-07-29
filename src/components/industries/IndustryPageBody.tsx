"use client";

import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import FinalCTA from "@/components/FinalCTA";
import IndustryServiceGrid from "@/components/industries/IndustryServiceGrid";
import IndustryWork from "@/components/industries/IndustryWork";
import ImageSlot from "@/components/industries/ImageSlot";
import { ArrowUpRight, ArrowRight, Phone, Check } from "@/components/icons";
import type { Industry } from "@/data/industries";
import { reviewSource, type Review } from "@/data/reviews";
import { PHONE_DISPLAY, PHONE_HREF, PRIMARY_AREAS } from "@/lib/site";

/**
 * All visible sections of an industry page. Lives in a client component because
 * Phosphor icons rely on React context, which breaks when imported into a
 * Server Component under Next.js 16 + Turbopack. The route page stays a Server
 * Component (metadata, generateStaticParams, JSON-LD) and renders this.
 */
export default function IndustryPageBody({
  industry,
  testimonial,
}: {
  industry: Industry;
  testimonial?: Review;
}) {
  return (
    <>
      {/* ── Hero ── */}
      <Section theme="dark" pad="spacious" className="overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
          style={{
            background:
              "radial-gradient(60% 50% at 25% 32%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.07), transparent 70%)",
          }}
        />
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 pt-20 lg:grid-cols-12 lg:pt-28">
          {/* Text */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                {industry.eyebrow}
              </span>
            </div>
            <h1 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.15] tracking-tight text-[var(--color-dark-text-primary)]">
              {industry.headlineLead}{" "}
              <span className="relative inline-block">
                {industry.headlineHighlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {industry.subhead}
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
          </div>

          {/* Hero visual */}
          <div className="lg:col-span-5">
            <ImageSlot
              src={industry.heroImage.src}
              alt={industry.heroImage.alt}
              suggestion={industry.heroImage.suggestion}
              aspect="square"
              tone="dark"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="lg:ml-auto lg:max-w-md"
            />
          </div>
        </div>
      </Section>

      <SectionSeparator id={7} />

      {/* ── Intro (AEO answer block) + pains ── */}
      <Section theme="light" pad="spacious" topRule>
        <p className="measure text-[length:var(--text-h4)] leading-relaxed text-text-primary">
          {industry.intro}
        </p>

        <div className="mt-14 border-t-2 border-[var(--color-text-primary)] pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-text-primary">
            {industry.painsTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
            {industry.pains.map((p, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[var(--color-neon)]"
                />
                <span className="text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionSeparator id={1} />

      {/* ── Brand in the wild (showcase) — dark so the applications pop ── */}
      <Section theme="dark" pad="spacious" topRule>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
              In the wild
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-[var(--color-dark-text-primary)]">
              {industry.showcaseTitle}
            </h2>
          </div>
          <p className="measure-tight text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
            {industry.showcaseNote}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 items-start gap-6 lg:grid-cols-4">
          {industry.showcase.map((shot) => (
            <figure key={shot.label}>
              <ImageSlot
                src={shot.src}
                alt={shot.alt}
                suggestion={shot.suggestion}
                aspect={shot.aspect}
                tone="dark"
                sizes="(min-width: 1024px) 22vw, 50vw"
              />
              <figcaption className="mt-3 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <SectionSeparator id={4} />

      {/* ── What we make ── */}
      <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
              What we do
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-text-primary">
              {industry.servicesTitle}
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            {industry.servicesNote}
          </p>
        </div>
        <div className="mt-10">
          <IndustryServiceGrid slugs={industry.servicesOffered} />
        </div>
      </Section>

      <SectionSeparator id={2} />

      {/* ── Proof / featured work ── */}
      <Section theme="dark" pad="spacious" topRule>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
              Selected work
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-[var(--color-dark-text-primary)]">
              {industry.workTitle}
            </h2>
          </div>
          <p className="measure-tight text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
            {industry.workNote}
          </p>
        </div>

        <div className="mt-12">
          <IndustryWork ids={industry.featuredWorkIds} />
        </div>

        {testimonial && (
          <figure className="mt-14 border-t border-[var(--color-dark-border)] pt-10">
            <blockquote className="measure text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-primary)]">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
              {testimonial.name} · {reviewSource(testimonial)}
            </figcaption>
          </figure>
        )}

        <div className="mt-10">
          <a
            href="/work"
            className="group inline-flex items-center gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-toxic-text)] hover:text-[var(--color-toxic)]"
          >
            See all 80+ projects
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Section>

      <SectionSeparator id={8} />

      {/* ── Pricing framing ── */}
      <Section theme="light" pad="spacious" topRule>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
              Pricing
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-text-primary">
              {industry.pricingTitle}
            </h2>
            <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
              {industry.pricingNote}
            </p>
            <a
              href="/startup-special"
              className="mt-7 inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
            >
              Just getting started? See the $997 Launch Kit
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
          <ul className="lg:col-span-6 lg:self-center">
            {industry.priceAnchors.map((a) => (
              <li
                key={a.label}
                className="flex items-center justify-between gap-4 border-b border-[var(--color-hairline-strong)] py-4 first:border-t"
              >
                <span className="flex items-center gap-3 text-[length:var(--text-body)] text-text-primary">
                  <Check size={16} weight="bold" className="text-[var(--color-neon-text)]" />
                  {a.label}
                </span>
                <span className="tabular text-[length:var(--text-secondary)] font-semibold uppercase tracking-[0.12em] text-text-dim">
                  {a.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionSeparator id={3} />

      {/* ── FAQ (AEO — visible Q/A) ── */}
      <Section theme="light" pad="spacious" topRule>
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.2] tracking-tight text-text-primary">
          Questions {industry.navLabel.toLowerCase()} actually ask.
        </h2>
        <dl className="mt-10 grid grid-cols-1 divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)]">
          {industry.faqs.map((f) => (
            <div key={f.q} className="grid grid-cols-1 gap-x-12 gap-y-3 py-7 lg:grid-cols-12">
              <dt className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-snug text-text-primary lg:col-span-5">
                {f.q}
              </dt>
              <dd className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-7">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-[length:var(--text-secondary)] leading-relaxed text-text-dim">
          <span className="font-semibold text-text-primary">Serving:</span>{" "}
          {PRIMARY_AREAS.join(" · ")} — and the rest of the GA-400 corridor.
        </p>
      </Section>

      {/* ── Conversion close (reused) ── */}
      <FinalCTA />
    </>
  );
}
