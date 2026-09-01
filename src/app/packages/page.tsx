import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Reveal from "@/components/mailers/Reveal";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import TierCards from "@/components/services/TierCards";
import ServiceLeadFormSection from "@/components/services/ServiceLeadFormSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// Server Component page — the client-context Phosphor bundle (the
// "@/components/icons" barrel) breaks module evaluation here, so this file
// uses the SSR-safe entry directly (same pattern as src/app/startup-special).
import { ArrowRight, Check, Phone, Package as PackageIcon } from "@phosphor-icons/react/dist/ssr";
import { SITE_URL, PHONE_DISPLAY, PHONE_HREF, CALENDLY_URL } from "@/lib/site";
import { getServiceBySlug } from "@/data/services";

const PAGE_PATH = "/packages";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// Single source of truth for every number on this page — pulled live from
// services.ts so nothing here can drift from the real service pages.
const webDesign = getServiceBySlug("web-design")!;
const branding = getServiceBySlug("branding")!;
const allWebTiers = webDesign.tiers ?? [];
const landingTier = allWebTiers.find((t) => t.name === "Landing");
// Good-better-best: Starter / Growth (feature) / Premium. Landing is called
// out separately below and in the full comparison table.
const packageTiers = allWebTiers.filter((t) => t.name !== "Landing");

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Small Business Website Packages From $1,500 | Cumming, GA",
  description:
    "Small business website packages in Cumming, GA — Landing $1,500, Starter $2,500, Growth $4,500, Premium $7,500+, plus the $997 Launch Kit for new businesses. Flat pricing. Call (770) 744-2536.",
  keywords: [
    "small business website packages",
    "small business website pricing",
    "cost of small business website",
    "small business website services",
    "website packages Cumming GA",
    "website pricing Georgia",
    "affordable website package Georgia",
    "web design packages Forsyth County",
    "branding and website package Georgia",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "Small Business Website Packages & Pricing | Cumming, GA",
    description:
      "Real tiers, real prices. Landing $1,500 · Starter $2,500 · Growth $4,500 · Premium $7,500+. See what's actually included at every price point.",
    images: [
      {
        url: "/assets/packages/hero.png",
        width: 1200,
        height: 630,
        alt: "Small business website packages and pricing — Branding Zombie Designs, Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Business Website Packages & Pricing | Cumming, GA",
    description:
      "Landing $1,500 · Starter $2,500 · Growth $4,500 · Premium $7,500+. Flat pricing, no hourly surprises.",
    images: ["/assets/packages/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

// ─── FAQ content (grounded in real repo facts — see /terms and services.ts) ─
const FAQS = [
  {
    q: "How much does a small business website cost in Georgia?",
    a: "Landing (1–2 pages, 7 days) is $1,500. Starter (5 pages) is $2,500. Growth (up to 10 pages, integrations, SEO, analytics) is $4,500 — our most popular tier. Premium (unlimited pages, custom functionality, ecommerce-ready) starts at $7,500. Brand-new businesses can also grab the $997 Launch Kit — logo, site, and print, delivered in 10 days. Every tier is quoted flat before we start.",
  },
  {
    q: "What's included in a $1,500 website?",
    a: "That's our Landing tier: a focused 1–2 page site with hero, services, and contact all on one scroll, mobile-optimized with a Core Web Vitals pass, a contact form wired straight to your inbox, an on-page SEO foundation, and SSL, domain, and hosting setup included — delivered in about 7 days. It's built for single-offer businesses, event landing pages, or anyone who just needs one credible page to send people to.",
  },
  {
    q: "Website packages vs. hiring by the hour?",
    a: "Every package here is a flat, quoted price — you know the total before we touch a single pixel. Hourly freelancers can look cheaper on paper, but scope creep and change orders add up fast, and you're often re-negotiating price mid-project. Flat packages mean the number you see is the number you pay, full stop.",
  },
  {
    q: "Do you have payment plans?",
    a: "Yes. Every project starts with a 50% deposit; the other 50% is due when the work is complete, before final files ship or the site goes live. For projects $2,000 and up — that's Starter and above — we can split the balance into equal monthly installments instead of one lump sum. Ask on the discovery call.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Packages", item: PAGE_URL },
  ],
};

// ─── Comparison table rows (only asserting deliverables literally listed on
//     the real web-design tiers in services.ts — no inherited-inheritance
//     guesses for Premium beyond what its own deliverable list states). ────
type Cell = boolean | string;
const COMPARISON_ROWS: { label: string; landing: Cell; starter: Cell; growth: Cell; premium: Cell }[] = [
  { label: "Timeline", landing: "7 days", starter: "2 weeks", growth: "3 weeks", premium: "4–6 weeks" },
  { label: "Pages", landing: "1–2 pages", starter: "5 pages", growth: "Up to 10 pages", premium: "Unlimited pages" },
  { label: "Custom design, no templates", landing: true, starter: true, growth: true, premium: true },
  { label: "Mobile-first, Core Web Vitals pass", landing: true, starter: true, growth: true, premium: true },
  { label: "Contact form wired to your inbox", landing: true, starter: true, growth: "+ auto-reply + CRM handoff", premium: true },
  { label: "On-page SEO", landing: "Foundation", starter: "Foundation", growth: "+ GA4 events", premium: "+ GA4 events" },
  { label: "CMS you can update yourself", landing: false, starter: true, growth: "+ blog + editor training", premium: "Scoped to your needs" },
  { label: "Integrations (Calendly, Mailchimp, Klaviyo, Stripe)", landing: false, starter: false, growth: true, premium: true },
  { label: "Custom functionality (calculators, quizzes, portals)", landing: false, starter: false, growth: false, premium: true },
  { label: "Ecommerce-ready foundation", landing: false, starter: false, growth: false, premium: true },
  { label: "Post-launch support window", landing: false, starter: false, growth: "30 days", premium: "60 days" },
];

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* ─── HERO / ANSWER CAPSULE ──────────────────────────────────── */}
        <Section theme="dark" pad="spacious" topScanline className="overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-x-clip"
          >
            <ZombieHand
              src={HANDS["zh37-thumbsup-r"].src}
              width={HANDS["zh37-thumbsup-r"].width}
              height={HANDS["zh37-thumbsup-r"].height}
              edge="right"
              behaviors={["peek", "idle", "parallax"]}
              offset="16%"
              bleed="-30px"
              displayWidth={220}
              rotate={-6}
              parallaxSpeed={0.1}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <PackageIcon size={20} weight="duotone" className="text-[var(--color-neon-text)]" />
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.25em] text-[var(--color-neon-text)]">
                  Packages &amp; Pricing · Cumming, GA
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.02] tracking-tight text-[var(--color-dark-text-primary)]">
                Small business website{" "}
                <span className="relative inline-block">
                  packages
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[6px] w-full bg-[var(--color-neon)]"
                  />
                </span>{" "}
                &amp; pricing.
              </h1>

              {/* Answer capsule — the AI-extractable, definitional paragraph. */}
              <p className="measure-wide mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Website packages from Branding Zombie Designs are flat-priced
                small-business web builds in Cumming, GA and North Metro
                Atlanta: Landing at $1,500, Starter at $2,500, Growth at
                $4,500 (most popular), and Premium from $7,500 — plus a $997
                Launch Kit for brand-new businesses. Every tier is quoted
                upfront. No hourly surprises, no mystery invoice.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#tiers"
                  role="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 active:scale-[0.97] hover:bg-[var(--color-toxic-deep)]"
                >
                  See the tiers
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/free-site-audit"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-transform duration-150 active:scale-[0.97] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
                >
                  Get a free site audit
                </a>
              </div>

              <p className="tabular mt-8 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                {webDesign.hero.microProof}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/packages/hero.png"
                  alt="Small business website package tiers — Branding Zombie Designs, Cumming, GA"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ─── GOOD / BETTER / BEST TIER CARDS (real web-design tiers) ─── */}
        <div id="tiers" className="scroll-mt-20">
          <TierCards
            eyebrow="Pick your tier"
            headline="Three ways to launch,"
            highlight="one honest price each"
            subhead="Pulled straight from the Web Design service — the same tiers, the same deliverables, the same price you'd get on that page. Growth is what most local businesses land on."
            tiers={packageTiers}
          />
        </div>

        {/* ─── LANDING CALLOUT + LAUNCH KIT ───────────────────────────── */}
        <Section theme="parchment" pad="standard" topRule bottomRule>
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {landingTier && (
                <div className="flex flex-col gap-3 border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] p-8">
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Need less? The {landingTier.name} tier
                  </span>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
                    {landingTier.price}
                  </div>
                  <p className="text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                    A focused 1–2 page site — hero, services, contact, all on
                    one scroll — live in {landingTier.timeline.toLowerCase()}.
                    Built for single-offer businesses and event pages that
                    just need one credible place to send people.
                  </p>
                  <a
                    href="/services/web-design"
                    className="mt-2 inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
                  >
                    See the full Web Design tiers
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>
              )}

              <div className="flex flex-col gap-3 border border-[var(--color-hairline-strong)] bg-[var(--color-grave)] p-8 text-[var(--color-dark-text-primary)]">
                <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
                  Brand-new business? The Launch Kit
                </span>
                <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-toxic-text)]">
                  $997
                </div>
                <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  Logo + brand kit, 100 business cards, 100 flyers, and a
                  1-page site with your domain and a year of hosting — one
                  price, ten days, retail value $2,097 (save $1,100).
                </p>
                <a
                  href="/startup-special"
                  className="mt-2 inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-toxic-text)] hover:underline"
                >
                  See the Launch Kit
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ─── BRANDING + WEBSITE BUNDLE FRAMING ──────────────────────── */}
        <Section theme="light" pad="spacious">
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  Website + Branding
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                  A site is only as good as{" "}
                  <span className="relative inline-block">
                    the brand behind it
                    <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]" />
                  </span>
                  .
                </h2>
                <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                  A lot of the sites we replace never had a real brand system
                  underneath them — mismatched logos, no defined colors,
                  copy that doesn't sound like anyone. Run branding and web
                  design together and your site launches on a finished
                  identity from day one instead of guessing at it.
                </p>
                <a
                  href="/services/branding"
                  className="mt-6 inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
                >
                  See the Branding tiers
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:col-span-7">
                <div className="flex flex-col gap-3 bg-[var(--color-cloud)] p-8">
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Branding
                  </span>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
                    {branding.pricing.price}
                  </div>
                  <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    Logo suite, color system, typography, voice guide,
                    written guidelines.
                  </p>
                </div>
                <div className="flex flex-col gap-3 bg-[var(--color-cloud)] p-8">
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Website
                  </span>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
                    {webDesign.pricing.price}
                  </div>
                  <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    Custom-built, mobile-first, SEO-ready — see the tiers
                    above.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ─── LEAD FORM ───────────────────────────────────────────────── */}
        <ServiceLeadFormSection slug="packages" serviceName="Website Packages" />

        {/* ─── FULL COMPARISON TABLE (machine-extractable) ────────────── */}
        <Section theme="parchment" pad="spacious" topRule>
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  Compare every tier
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                  All four packages, side by side.
                </h2>
              </div>
              <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
                Premium is fully scoped on the discovery call — the deliverables
                below are the floor, not the ceiling.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">
                  Small business website package comparison: Landing, Starter, Growth, and Premium
                </caption>
                <thead>
                  <tr className="border-b border-[var(--color-hairline-strong)]">
                    <th scope="col" className="w-1/5 py-4 pr-4 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-text-dim">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="w-1/5 px-4 py-4 text-[length:var(--text-secondary)] font-semibold text-text-primary">
                      Landing<br />
                      <span className="tabular font-normal text-text-dim">$1,500</span>
                    </th>
                    <th scope="col" className="w-1/5 px-4 py-4 text-[length:var(--text-secondary)] font-semibold text-text-primary">
                      Starter<br />
                      <span className="tabular font-normal text-text-dim">$2,500</span>
                    </th>
                    <th scope="col" className="w-1/5 rounded-t-lg bg-[var(--color-neon)]/15 px-4 py-4 text-[length:var(--text-secondary)] font-bold text-text-primary">
                      Growth <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-neon-text)]">Most popular</span><br />
                      <span className="tabular font-normal text-text-dim">$4,500</span>
                    </th>
                    <th scope="col" className="w-1/5 px-4 py-4 text-[length:var(--text-secondary)] font-semibold text-text-primary">
                      Premium<br />
                      <span className="tabular font-normal text-text-dim">$7,500+</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i > 0 ? "border-t border-[var(--color-hairline)]" : undefined}
                    >
                      <th
                        scope="row"
                        className="py-4 pr-4 align-top text-[length:var(--text-secondary)] font-semibold text-text-primary"
                      >
                        {row.label}
                      </th>
                      <ComparisonCell value={row.landing} />
                      <ComparisonCell value={row.starter} />
                      <ComparisonCell value={row.growth} featured />
                      <ComparisonCell value={row.premium} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Section>

        {/* ─── FAQ ────────────────────────────────────────────────────── */}
        <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]">
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                    FAQ
                  </span>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                    Questions about{" "}
                    <span className="relative inline-block">
                      packages &amp; pricing
                      <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]" />
                    </span>
                    .
                  </h2>
                  <a
                    href={PHONE_HREF}
                    className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-neon-text)] hover:underline"
                  >
                    <Phone size={18} weight="regular" />
                    <span className="tabular">{PHONE_DISPLAY}</span>
                  </a>
                </div>
              </aside>
              <div className="lg:col-span-8">
                <Accordion className="border-t border-[var(--color-hairline-strong)]">
                  {FAQS.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-b border-[var(--color-hairline-strong)] data-open:bg-[var(--color-cloud)]/40"
                    >
                      <AccordionTrigger className="!flex !items-center !justify-between gap-6 !py-6 !text-[length:var(--text-h4)] !font-semibold !text-text-primary aria-expanded:!text-[var(--color-neon-text)] hover:!no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-text-secondary">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ─── RELATED SERVICES ───────────────────────────────────────── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                Round it out
              </span>
              <div className="grid grid-cols-1 gap-px border border-[var(--color-dark-border-strong)] bg-[var(--color-dark-border-strong)] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Web Design", href: "/services/web-design", blurb: "Full service page — every tier, every deliverable." },
                  { label: "SEO & Digital Marketing", href: "/services/seo", blurb: "Get the new site found on Google." },
                  { label: "Branding", href: "/services/branding", blurb: "Logo, colors, voice, and guidelines." },
                  { label: "Brand Checkup", href: "/brand-checkup", blurb: "Free 25-point self-scoring audit." },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col gap-2 bg-[var(--color-grave)] p-6 transition-colors hover:bg-[var(--color-surface)]"
                  >
                    <span className="flex items-center justify-between gap-2 text-[length:var(--text-secondary)] font-semibold text-[var(--color-dark-text-primary)]">
                      {item.label}
                      <ArrowRight size={14} weight="bold" className="shrink-0 text-[var(--color-toxic-text)] transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-[length:var(--text-caption)] leading-relaxed text-[var(--color-dark-text-dim)]">
                      {item.blurb}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ─── FINAL CTA ──────────────────────────────────────────────── */}
        <Section theme="dark" pad="spacious" topScanline>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                Ready when you are
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
                Pick a tier. We'll build it right.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Free 15-minute discovery call, flat quote before we start, no
                surprise invoice at the end.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#lead-form"
                role="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 active:scale-[0.97] hover:bg-[var(--color-toxic-deep)]"
              >
                Get my call back
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-transform duration-150 active:scale-[0.97] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
              >
                Book a call instead
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function ComparisonCell({ value, featured }: { value: boolean | string; featured?: boolean }) {
  const base = "px-4 py-4 align-top text-[length:var(--text-secondary)]";
  const bg = featured ? "bg-[var(--color-neon)]/10" : "";
  if (value === true) {
    return (
      <td className={`${base} ${bg} text-text-primary`}>
        <Check size={16} weight="bold" className="text-[var(--color-neon-text)]" />
      </td>
    );
  }
  if (value === false) {
    return <td className={`${base} ${bg} text-text-dim`}>—</td>;
  }
  return <td className={`${base} ${bg} text-text-primary`}>{value}</td>;
}
