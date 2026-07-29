"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Reveal from "@/components/mailers/Reveal";
import TattooHero from "@/components/tattoo/TattooHero";
import TattooLeadForm from "@/components/tattoo/TattooLeadForm";
import TattooFAQ from "@/components/tattoo/TattooFAQ";
import TattooJsonLd from "@/components/tattoo/TattooJsonLd";
import {
  Target,
  Lightning,
  Sparkle,
  Storefront,
  Package,
  Handshake,
  MapPin,
  Clock,
  ChartLineUp,
  CurrencyDollar,
  RocketLaunch,
  MagicWand,
  Sticker,
  Check,
  CaretRight,
  Star,
  Quotes,
  Phone,
  Calendar,
  ArrowUpRight,
} from "@/components/icons";
import { PHONE_DISPLAY, PHONE_HREF, CALENDLY_URL } from "@/lib/site";
import { REVIEWS, REVIEW_AVG, REVIEW_COUNT, GOOGLE_REVIEWS_URL, reviewSource } from "@/data/reviews";
import { LOCATIONS, getSiblingLocations, type Location } from "@/data/locations";
import {
  TATTOO_CITY_COPY,
  type TattooProduct,
  type TattooCityCopy,
  type TattooIconName,
} from "@/data/tattoo-marketing";

const ICONS: Record<TattooIconName, typeof Target> = {
  Target,
  Lightning,
  Sparkle,
  Storefront,
  Package,
  Handshake,
  MapPin,
  Clock,
  ChartLineUp,
  CurrencyDollar,
  RocketLaunch,
  MagicWand,
  Sticker,
};

// Real reviews most relevant to brand / print / web work, in display order.
const PROOF_REVIEW_NAMES = ["Mitch Marks", "Garrett McKay", "Liz Marie"];

export default function TattooPage({
  product,
  city,
  cityCopy,
}: {
  product: TattooProduct;
  city?: Location;
  cityCopy?: TattooCityCopy;
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
  const heroHeadline = city ? "Marketing for tattoo shops in" : product.hero.headline;
  const heroHighlight = city ? cityLabel! : product.hero.highlight;
  const heroSubhead =
    city && cityCopy
      ? `${cityCopy.intro} A booking website with reference upload, branding, print, window clings and social — one local studio, one invoice, live in days.`
      : product.hero.subhead;

  // City pages lead the answer-first band with the local angle; the pillar uses
  // the definitional answer-first sentence (best for AI answer engines).
  const answerFirst = city && cityCopy ? cityCopy.angle : product.answerFirst;

  // FAQ: prepend the city-specific Q on city pages.
  const faqs = city && cityCopy ? [cityCopy.cityFaq, ...product.faqs] : product.faqs;

  const proofReviews = PROOF_REVIEW_NAMES.map((n) =>
    REVIEWS.find((r) => r.name === n),
  ).filter(Boolean) as typeof REVIEWS;

  // Only link to sibling cities that actually have a tattoo-marketing city page
  // (others would 404, since per-city copy is hand-written).
  const siblings = (city ? getSiblingLocations(city.slug) : LOCATIONS).filter(
    (loc) => loc.slug in TATTOO_CITY_COPY && loc.slug !== city?.slug,
  );

  return (
    <>
      <Navbar />
      <TattooJsonLd product={product} city={city} cityFaq={cityCopy?.cityFaq} />

      <main id="main-content" tabIndex={-1} className="bg-[var(--color-grave)]">
        {/* ── 1. HERO (CTA near top) ── */}
        <TattooHero
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
        <Section theme="dark" pad="tight" topRule>
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
                {isCity ? `Tattoo shop marketing in ${city!.city}` : "The short version"}
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
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-toxic-text)]">
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

        {/* ── 3. DUAL-PATH SEGMENTATION (New shop or established?) ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow={product.segmentsEyebrow}
              headline={product.segmentsHeadline}
              highlight={product.segmentsHighlight}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {product.segments.map((seg, i) => (
              <Reveal
                key={seg.title}
                delay={i * 70}
                className="flex flex-col rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-elevated)] p-7 transition-colors hover:border-[var(--color-toxic)]/40"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-toxic)]/12 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.14em] text-[var(--color-toxic-text)]">
                  <RocketLaunch size={13} weight="fill" />
                  {seg.tag}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)] font-[family-name:var(--font-display)] leading-tight text-[var(--color-dark-text-primary)]">
                  {seg.title}
                </h3>
                <p className="mt-3 grow text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {seg.body}
                </p>
                <a
                  href={seg.ctaHref}
                  className="group mt-6 inline-flex w-fit items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-toxic-text)] hover:underline"
                >
                  {seg.ctaLabel}
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 4. BENEFITS ("Why shops outgrow booking apps") ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow={product.benefitsEyebrow}
              headline={product.benefitsHeadline}
              highlight={product.benefitsHighlight}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((b, i) => {
              const Icon = ICONS[b.icon];
              return (
                <Reveal
                  key={b.title}
                  delay={(i % 3) * 60}
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

        {/* ── 5. SERVICES (6 cards) ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow={product.servicesEyebrow}
              headline={product.servicesHeadline}
              highlight={product.servicesHighlight}
            />
            <p className="measure-wide mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {product.servicesIntro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {product.services.map((s, i) => (
              <Reveal
                key={s.title}
                delay={(i % 3) * 60}
                className="flex flex-col rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-elevated)] p-7 transition-colors hover:border-[var(--color-toxic)]/40"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-cyan)]/12 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan-text)]">
                  <Sparkle size={13} weight="fill" />
                  {s.tag}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)] font-[family-name:var(--font-display)] leading-tight text-[var(--color-dark-text-primary)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {s.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-[var(--color-dark-border)] pt-5">
                  {s.points.map((p) => (
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

        {/* ── 6. PACKAGES (3 tiers, middle featured) ── */}
        <Section theme="dark" pad="standard" topRule id="packages">
          <Reveal>
            <SectionHeading
              eyebrow={product.packages.eyebrow}
              headline={product.packages.headline}
              highlight={product.packages.highlight}
            />
            <p className="measure-wide mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {product.packages.intro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {product.packages.tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 70}
                className={
                  tier.featured
                    ? "relative flex flex-col rounded-2xl border-2 border-[var(--color-toxic)] bg-[var(--color-surface)] p-7 shadow-soft-lg lg:-my-2"
                    : "relative flex flex-col rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-elevated)] p-7"
                }
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-toxic)] px-3 py-1 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.14em] text-[var(--color-grave)]">
                    <Star size={12} weight="fill" />
                    Most popular
                  </span>
                )}
                <h3 className="mt-2 text-[length:var(--text-h3)] font-[family-name:var(--font-display)] leading-tight text-[var(--color-dark-text-primary)]">
                  {tier.name}
                </h3>
                <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-dim)]">
                  {tier.forWho}
                </p>
                <div className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-none text-[var(--color-toxic-text)]">
                  {tier.price}
                </div>
                <ul className="mt-5 flex grow flex-col gap-2.5 border-t border-[var(--color-dark-border)] pt-5">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        weight="bold"
                        className="mt-1 shrink-0 text-[var(--color-toxic-text)]"
                      />
                      <span className="text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className={
                    tier.featured
                      ? "mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]"
                      : "mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-colors hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)] active:scale-[0.97]"
                  }
                >
                  Start this build
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100} className="mt-6">
            <p className="measure-wide text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-dim)]">
              {product.packages.note}
            </p>
          </Reveal>
        </Section>

        {/* ── 7. THE EDGE ("Why shops pick Branding Zombie") ── */}
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
              <p className="measure mt-4 text-[length:var(--text-body)] font-semibold italic leading-relaxed text-[var(--color-toxic-text)]">
                {product.pratfall}
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

        {/* ── 8. PROCESS (4 steps) ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              headline="From teardown to booked chairs,"
              highlight="without the runaround"
            />
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

        {/* ── 9. GALLERY ── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <SectionHeading
              eyebrow="The work"
              headline="What we build for"
              highlight="tattoo shops"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.gallery.map((g, i) => (
              <Reveal
                key={g.src}
                delay={(i % 3) * 60}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transform-none"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-void)]/80 via-transparent to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 text-[length:var(--text-secondary)] font-semibold text-[var(--color-dark-text-primary)]">
                  {g.caption}
                </span>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 10. PROOF ── */}
        <Section theme="dark" pad="tight" topRule>
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
                20+ years of production-ready design · 80+ projects shipped · Cumming, GA
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
                    {reviewSource(r)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 11. FAQ ── */}
        <Section theme="dark" pad="standard" topRule>
          <TattooFAQ faqs={faqs} />
        </Section>

        {/* ── 12. LEAD FORM + FINAL CTA ── */}
        <Section theme="dark" pad="standard" topRule id="quote">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                Book your free Shop Marketing Teardown
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
                Let&apos;s fill your{" "}
                <span className="relative inline-block">
                  chairs
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]" />
                </span>
                {isCity ? ` in ${city!.city}` : ""}.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                A quick 15-minute call — we look at your site, booking flow and storefront
                and name the 3 fastest fixes. No pitch, no pressure. Or send the form and
                we&apos;ll reply with a flat quote, usually same day.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {[
                  "Free teardown — no obligation, no surprise fees",
                  "Website, brand, print & signage handled in one place",
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
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]"
                >
                  <Calendar size={16} weight="regular" />
                  Book a free shop teardown
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
              <TattooLeadForm source={source} ctaLabel={product.hero.ctaLabel} />
            </Reveal>
          </div>
        </Section>

        {/* ── 13. AREAS SERVED + CROSS-SELL ── */}
        <Section theme="dark" pad="standard" topRule bottomScanline>
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-[var(--color-dark-text-primary)]">
              {isCity
                ? `Tattoo shop marketing near ${city!.city}`
                : "Tattoo shop marketing across North Atlanta"}
            </h2>
            <p className="mt-2 text-[length:var(--text-body)] text-[var(--color-dark-text-dim)]">
              {isCity
                ? "We also build for tattoo shops in nearby towns:"
                : "Pick your town for local copy — we build for tattoo shops all over the GA-400 corridor:"}
            </p>
          </Reveal>
          {siblings.length > 0 && (
            <Reveal delay={60} className="mt-6 flex flex-wrap gap-2.5">
              {siblings.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${product.slug}/${loc.slug}`}
                  className="rounded-full border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] px-4 py-2 text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)] transition-colors hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
                >
                  Tattoo shops in {loc.city}
                </Link>
              ))}
            </Reveal>
          )}

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
