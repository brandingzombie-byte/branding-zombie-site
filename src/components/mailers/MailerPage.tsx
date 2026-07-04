"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Reveal from "@/components/mailers/Reveal";
import MailerHero from "@/components/mailers/MailerHero";
import MailerLeadForm from "@/components/mailers/MailerLeadForm";
import MailerFAQ from "@/components/mailers/MailerFAQ";
import MailerJsonLd from "@/components/mailers/MailerJsonLd";
import {
  Envelope,
  MapPin,
  Eye,
  ChartLineUp,
  Lightning,
  Handshake,
  Storefront,
  Package,
  Clock,
  CurrencyDollar,
  Target,
  Sparkle,
  Check,
  CaretRight,
  Star,
  Quotes,
  Phone,
  Calendar,
  ArrowUpRight,
} from "@/components/icons";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  CALENDLY_URL,
} from "@/lib/site";
import { REVIEWS, REVIEW_AVG, REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { LOCATIONS, getSiblingLocations, type Location } from "@/data/locations";
import type {
  MailerProduct,
  MailerCityCopy,
  MailerIconName,
} from "@/data/mailer-products";

const ICONS: Record<MailerIconName, typeof Envelope> = {
  Envelope,
  MapPin,
  Eye,
  ChartLineUp,
  Lightning,
  Handshake,
  Storefront,
  Package,
  Clock,
  CurrencyDollar,
  Target,
  Sparkle,
};

// Real reviews most relevant to print / mailer work, in display order.
const PROOF_REVIEW_NAMES = ["Mitch Marks", "Mary Jeimz", "Liz Marie"];

export default function MailerPage({
  product,
  city,
  cityCopy,
}: {
  product: MailerProduct;
  city?: Location;
  cityCopy?: MailerCityCopy;
}) {
  const isCity = Boolean(city && cityCopy);
  const cityLabel = city ? `${city.city}, ${city.state}` : null;
  const source = isCity
    ? `${product.shortLabel} — ${cityLabel}`
    : `${product.shortLabel} — main`;

  // ── City-aware hero copy ──
  const heroEyebrow = city
    ? `${product.shortLabel} · ${cityLabel}`
    : product.hero.eyebrow;
  const heroHeadline = city
    ? product.kind === "eddm"
      ? "Reach every mailbox in"
      : "Direct mail that lands in"
    : product.hero.headline;
  const heroHighlight = city ? cityLabel! : product.hero.highlight;
  const heroSubhead =
    city && cityCopy
      ? `${cityCopy.intro} We design it, print it, and ${
          product.kind === "eddm" ? "route it" : "mail it"
        } — one shop, one invoice.`
      : product.hero.subhead;

  // City pages lead the answer-first band with the local angle; the pillar uses
  // the definitional answer-first sentence (best for AI answer engines).
  const answerFirst = city && cityCopy ? cityCopy.angle : product.answerFirst;

  // FAQ: prepend the city-specific Q on city pages.
  const faqs =
    city && cityCopy ? [cityCopy.cityFaq, ...product.faqs] : product.faqs;

  const proofReviews = PROOF_REVIEW_NAMES.map((n) =>
    REVIEWS.find((r) => r.name === n),
  ).filter(Boolean) as typeof REVIEWS;

  const siblings = city ? getSiblingLocations(city.slug) : LOCATIONS;

  return (
    <>
      <Navbar />
      <MailerJsonLd product={product} city={city} cityFaq={cityCopy?.cityFaq} />

      <main id="main-content" tabIndex={-1} className="bg-[var(--color-grave)]">
        {/* ── 1. HERO ── */}
        <MailerHero
          eyebrow={heroEyebrow}
          headline={heroHeadline}
          highlight={heroHighlight}
          subhead={heroSubhead}
          microProof={product.hero.microProof}
          image={product.hero.image}
          primaryCtaLabel={product.hero.ctaLabel}
          calendlyUrl={CALENDLY_URL}
          phoneDisplay={PHONE_DISPLAY}
          phoneHref={PHONE_HREF}
        />

        {/* ── 2. ANSWER-FIRST + STATS (AEO) ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
                {isCity ? `${product.shortLabel} in ${city!.city}` : "The short version"}
              </span>
              <p className="measure-wide mt-4 text-[length:var(--text-h4)] leading-relaxed text-[var(--color-dark-text-primary)]">
                {answerFirst}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {product.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-5"
                >
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic-text)]">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[length:var(--text-secondary)] leading-snug text-[var(--color-dark-text-secondary)]">
                    {s.label}
                  </div>
                  {s.source && (
                    <div className="mt-1 text-[length:var(--text-caption)] uppercase tracking-[0.12em] text-[var(--color-dark-text-dim)]">
                      {s.source}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ── 3. BENEFITS ── */}
        <Section theme="dark" pad="standard">
          <Reveal>
            <SectionHeading
              eyebrow={product.benefitsEyebrow}
              headline={product.benefitsHeadline}
              highlight={product.benefitsHighlight}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {product.benefits.map((b, i) => {
              const Icon = ICONS[b.icon];
              return (
                <Reveal
                  key={b.title}
                  delay={(i % 2) * 60}
                  className="rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-toxic)]/40"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-toxic)]/12 text-[var(--color-toxic-text)]">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <h3 className="mt-4 text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                    {b.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ── 4. THE EDGE ── */}
        <Section theme="dark" pad="standard" topRule>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow={product.edgeEyebrow}
                headline={product.edgeHeadline}
                highlight={product.edgeHighlight}
              />
              <p className="measure mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                {product.edgeIntro}
              </p>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-7">
              <ul className="flex flex-col gap-4">
                {product.edgePoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-surface)]/60 p-4"
                  >
                    <Check
                      size={20}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[var(--color-toxic-text)]"
                    />
                    <span className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-primary)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ── 5. DISTRIBUTION ("choose exactly where") — the differentiator ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow={product.distributionEyebrow}
              headline={product.distributionHeadline}
              highlight={product.distributionHighlight}
            />
            <p className="measure-wide mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {product.distributionIntro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {product.distributionModes.map((mode, i) => (
              <Reveal
                key={mode.title}
                delay={i * 70}
                className="flex flex-col rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-elevated)] p-7"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-cyan)]/12 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan-text)]">
                  <MapPin size={13} weight="fill" />
                  {mode.tag}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)] font-[family-name:var(--font-display)] leading-tight text-[var(--color-dark-text-primary)]">
                  {mode.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {mode.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-[var(--color-dark-border)] pt-5">
                  {mode.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CaretRight
                        size={16}
                        weight="bold"
                        className="mt-1 shrink-0 text-[var(--color-toxic-text)]"
                      />
                      <span className="text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 6. SPECS (sizes / materials / coatings) ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow={product.specs.eyebrow}
              headline={product.specs.headline}
              highlight={product.specs.highlight}
            />
            <p className="measure-wide mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {product.specs.intro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {product.specs.groups.map((g, i) => (
              <Reveal
                key={g.label}
                delay={(i % 2) * 60}
                className="rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6"
              >
                <h3 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--color-cyan-text)]">
                  {g.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="tabular rounded-lg border border-[var(--color-dark-border)] bg-[var(--color-grave)] px-3 py-1.5 text-[length:var(--text-secondary)] text-[var(--color-dark-text-primary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {g.note && (
                  <p className="mt-4 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-dim)]">
                    {g.note}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal
            delay={80}
            className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--color-toxic)]/30 bg-[var(--color-surface)] p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <div>
                <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-toxic-text)]">
                  {product.specs.priceAnchor}
                </div>
                <div className="mt-1 text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[var(--color-dark-text-dim)]">
                  Design + print + mail
                </div>
              </div>
              <div className="flex items-center gap-2 text-[length:var(--text-body)] text-[var(--color-dark-text-secondary)]">
                <Clock size={18} weight="regular" className="text-[var(--color-cyan-text)]" />
                {product.specs.turnaround} turnaround
              </div>
            </div>
            <p className="max-w-md text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-dim)]">
              {product.specs.priceNote}
            </p>
          </Reveal>
        </Section>

        {/* ── 7. PROCESS ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading eyebrow="How it works" headline="From idea to mailbox," highlight="without the runaround" />
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.process.map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 60}
                as="li"
                className="rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6"
              >
                <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic)]/30">
                  {step.step}
                </span>
                <h3 className="mt-3 text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ── 8. PROOF ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} weight="fill" className="text-[var(--color-toxic)]" />
                  ))}
                </span>
                <span className="tabular text-[length:var(--text-body)] font-semibold text-[var(--color-dark-text-primary)]">
                  {REVIEW_AVG}
                </span>
                <span className="text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
                  · {REVIEW_COUNT} Google reviews
                </span>
              </div>
              <p className="mt-2 text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
                15+ years of production-ready design · 80+ projects shipped · Cumming, GA
              </p>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-toxic-text)] hover:underline"
            >
              Read the reviews
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {proofReviews.map((r, i) => (
              <Reveal
                key={r.name}
                delay={i * 60}
                className="flex flex-col rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6"
              >
                <Quotes size={24} weight="fill" className="text-[var(--color-toxic)]/40" />
                <p className="mt-3 grow text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-primary)]">
                  {r.quote}
                </p>
                <div className="mt-4 border-t border-[var(--color-dark-border)] pt-4">
                  <div className="text-[length:var(--text-secondary)] font-semibold text-[var(--color-dark-text-primary)]">
                    {r.name}
                  </div>
                  <div className="text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
                    {r.business} · {r.location}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 9. FAQ ── */}
        <Section theme="dark" pad="standard" topRule>
          <MailerFAQ faqs={faqs} kind={product.kind} />
        </Section>

        {/* ── 10. LEAD FORM + FINAL CTA ── */}
        <Section theme="dark" pad="standard" topRule id="quote">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                Get started
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
                Let&apos;s get your {product.noun}{" "}
                <span className="relative inline-block">
                  in the mail
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]" />
                </span>
                {isCity ? ` in ${city!.city}` : ""}.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Tell us your offer and who you want to reach. We&apos;ll come back with a
                flat quote and a recommended size, quantity, and {product.kind === "eddm" ? "set of routes" : "list approach"} — usually within one business day.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {[
                  "Free, flat quote — no obligation, no surprise fees",
                  "Design, printing, and mailing handled in one place",
                  "Work directly with the designer — the owner answers the phone",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-toxic-text)]" />
                    <span className="text-[length:var(--text-body)] text-[var(--color-dark-text-secondary)]">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-colors hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)] active:scale-[0.97]"
                >
                  <Calendar size={16} weight="regular" />
                  Rather book a call?
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-toxic-text)] hover:underline"
                >
                  <Phone size={16} weight="regular" />
                  <span className="tabular">{PHONE_DISPLAY}</span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <MailerLeadForm source={source} kind={product.kind} ctaLabel={product.hero.ctaLabel} />
            </Reveal>
          </div>
        </Section>

        {/* ── 11. AREAS SERVED + CROSS-SELL ── */}
        <Section theme="dark" pad="standard" topRule bottomScanline>
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-[var(--color-dark-text-primary)]">
              {isCity ? `${product.shortLabel} near ${city!.city}` : `${product.shortLabel} across North Atlanta`}
            </h2>
            <p className="mt-2 text-[length:var(--text-body)] text-[var(--color-dark-text-dim)]">
              {isCity
                ? `We also design, print, and ${product.kind === "eddm" ? "route" : "mail"} for nearby towns:`
                : "Pick your town for a local quote — we mail for businesses all over the GA-400 corridor:"}
            </p>
          </Reveal>
          <Reveal delay={60} className="mt-6 flex flex-wrap gap-2.5">
            {siblings.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${product.slug}/${loc.slug}`}
                className="rounded-full border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] px-4 py-2 text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)] transition-colors hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
              >
                {product.shortLabel} in {loc.city}
              </Link>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-10 grid gap-4 border-t border-[var(--color-dark-border)] pt-8 sm:grid-cols-2">
            {product.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-toxic)]/50"
              >
                <span>
                  <span className="text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                    {r.label}
                  </span>
                  <span className="mt-1 block text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
                    {r.blurb}
                  </span>
                </span>
                <ArrowUpRight
                  size={20}
                  weight="bold"
                  className="mt-1 shrink-0 text-[var(--color-toxic-text)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                />
              </Link>
            ))}
          </Reveal>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function SectionHeading({
  eyebrow,
  headline,
  highlight,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
}) {
  return (
    <div>
      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.08] tracking-tight text-[var(--color-dark-text-primary)]">
        {headline}{" "}
        <span className="relative inline-block">
          {highlight}
          <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]" />
        </span>
      </h2>
    </div>
  );
}
