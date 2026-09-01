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
import { ArrowRight, X, Phone, Wrench } from "@phosphor-icons/react/dist/ssr";
import { SITE_URL, PHONE_DISPLAY, PHONE_HREF, CALENDLY_URL } from "@/lib/site";
import { getServiceBySlug, type Tier } from "@/data/services";

const PAGE_PATH = "/website-management";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// Real numbers only — pulled from the exact language already live on the
// Web Design and Ecommerce service pages (see src/data/services.ts FAQs).
const webDesign = getServiceBySlug("web-design")!;
const ecommerce = getServiceBySlug("ecommerce")!;

// Care plan tiers derived from the real numbers ($20 / $100 / $200) plus the
// inclusion categories the spec calls out (updates, backups, monitoring,
// content changes) — no invented prices.
const CARE_TIERS: Tier[] = [
  {
    name: "Hosting",
    price: "~$20/mo",
    timeline: "Ongoing",
    deliverables: [
      "Domain + hosting kept current",
      "SSL certificate kept valid",
      "You handle your own content updates",
    ],
    bestFor:
      "Owners who are comfortable making their own changes and just want hosting handled right.",
    ctaLabel: "Start with Hosting",
  },
  {
    name: "Web Care",
    price: "From $100/mo",
    timeline: "Month-to-month",
    isFeature: true,
    deliverables: [
      "Everything in Hosting",
      "Software & security updates",
      "Automatic backups",
      "Uptime & performance monitoring",
      "Content changes — text, photos, hours, blog posts",
    ],
    bestFor:
      "Most small-business sites. You run the business, we keep the site current and safe.",
    ctaLabel: "Choose Web Care",
  },
  {
    name: "Shopify Care",
    price: "From $200/mo",
    timeline: "Month-to-month",
    deliverables: [
      "Everything in Web Care",
      "Theme updates",
      "Product additions",
      "Performance monitoring",
      "Minor customizations",
    ],
    bestFor:
      "Shopify stores that need ongoing product, theme, and performance upkeep.",
    ctaLabel: "Choose Shopify Care",
  },
];

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Website Management & Care Plans From $100/mo | GA",
  description:
    "Website management and care plans for small businesses in Cumming, GA. Hosting ~$20/mo, web care from $100/mo, Shopify care from $200/mo. Month-to-month. Call (770) 744-2536.",
  keywords: [
    "small business website management",
    "small business website design and hosting",
    "website maintenance",
    "website care plan Georgia",
    "website management Cumming GA",
    "combined hosting and maintenance Georgia",
    "Shopify store care",
    "website maintenance plans small business",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "Website Management & Care Plans | Cumming, GA",
    description:
      "Hosting, updates, backups, and content changes for small-business sites. From $100/month, month-to-month, no lock-in.",
    images: [
      {
        url: "/assets/website-management/hero.png",
        width: 1200,
        height: 630,
        alt: "Website management and care plans — Branding Zombie Designs, Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Management & Care Plans | Cumming, GA",
    description:
      "Hosting ~$20/mo · Web Care from $100/mo · Shopify Care from $200/mo. Month-to-month.",
    images: ["/assets/website-management/hero.png"],
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

// ─── FAQ content ─────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How much does website management cost for a small business?",
    a: "It depends on the platform and how hands-off you want to be. Bare hosting — domain, SSL, keeping the lights on — runs about $20/month. A full web care plan, with updates, backups, monitoring, and content changes, starts at $100/month. Shopify store care, which adds theme and product upkeep, starts at $200/month. Everything is month-to-month; no long-term contract.",
  },
  {
    q: "What does a website care plan include?",
    a: "At minimum: software and security updates, backups, uptime and performance monitoring, and small content changes — new photos, updated hours, a fresh headline. Shopify Care plans add theme updates, product additions, and minor customizations on top of that. Anything bigger than a content tweak — a new page, a redesign — gets scoped and quoted separately.",
  },
  {
    q: "Can you manage a website you didn't build?",
    a: "Usually, yes. We start with a quick technical look — platform, code quality, hosting setup — since a site built on outdated tools or a locked-down builder can be genuinely hard to maintain responsibly. For sites on modern platforms like WordPress, Shopify, Webflow, or custom code, we can typically take over care without a rebuild. If the foundation's a mess, we'll say so honestly on the call instead of quietly billing you to maintain something that shouldn't be maintained.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep everything. Care plans are month-to-month — cancel anytime, no penalty, no held-hostage files. You already own your domain, your site, and your content; canceling just means we stop doing the updates and you (or whoever you hire next) take it from there.",
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
    { "@type": "ListItem", position: 2, name: "Website Management", item: PAGE_URL },
  ],
};

const PAIN_POINTS = [
  "A dead site loses the customers you already paid to get — every ad click, every Google ranking, every referral that lands on a page that doesn't load.",
  "Six months of \"I'll get to it\" and an unpatched plugin becomes the security hole someone actually walks through.",
  "Your last freelancer went quiet, the invoices stopped, and now nobody has the login.",
  "A theme update breaks checkout and you find out from a customer's angry email, not your dashboard.",
  "The SSL certificate lapsed and Chrome is telling every visitor your site \"is not secure.\"",
];

export default function WebsiteManagementPage() {
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
              src={HANDS["zh34-highfive-l"].src}
              width={HANDS["zh34-highfive-l"].width}
              height={HANDS["zh34-highfive-l"].height}
              edge="left"
              behaviors={["peek", "idle", "parallax"]}
              offset="20%"
              bleed="-30px"
              displayWidth={210}
              rotate={4}
              parallaxSpeed={0.1}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <Wrench size={20} weight="duotone" className="text-[var(--color-cyan-text)]" />
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.25em] text-[var(--color-cyan-text)]">
                  Website Management · Cumming, GA
                </span>
              </div>

              {/* Custom (smaller-floor) display clamp — "management" is the
                  longest single word on any hero in the site and the shared
                  --text-display token's 3.5rem floor clips it on a 375px
                  viewport. break-words/max-w-full on the span below is a
                  belt-and-suspenders fallback for <375px devices. */}
              <h1 className="mt-6 break-words font-[family-name:var(--font-display)] text-[length:clamp(2.25rem,1.5rem+3.6vw,7rem)] leading-[1.02] tracking-tight text-[var(--color-dark-text-primary)]">
                Website{" "}
                <span className="relative inline-block max-w-full break-words align-top">
                  management
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[6px] w-full bg-[var(--color-cyan)]"
                  />
                </span>{" "}
                &amp; care plans.
              </h1>

              {/* Answer capsule — the AI-extractable, definitional paragraph. */}
              <p className="measure-wide mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Website management from Branding Zombie Designs keeps
                small-business sites in Cumming, GA and North Metro Atlanta
                fast, secure, and current — hosting from about $20/month, web
                care plans from $100/month, and Shopify store care from
                $200/month. Month-to-month, no lock-in, and you own
                everything even if you ever leave.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#tiers"
                  role="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cyan)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
                >
                  See care plan pricing
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/services/web-design"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-transform duration-150 active:scale-[0.97] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan-text)]"
                >
                  Need a new site instead?
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/website-management/hero.png"
                  alt="Website management and care plan tiers — Branding Zombie Designs, Cumming, GA"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ─── LOSS-AVERSION PAIN SECTION ─────────────────────────────── */}
        <Section theme="dark" pad="standard" topRule>
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
                  Sound familiar?
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
                  A dead site is still{" "}
                  <span className="relative inline-block">
                    costing you money
                    <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-cyan)]" />
                  </span>
                  .
                </h2>
                <p className="measure mt-6 border-l-2 border-[var(--color-cyan)] pl-5 text-[length:var(--text-body)] italic leading-relaxed text-[var(--color-dark-text-secondary)]">
                  A site isn't "done" the day it launches. Without upkeep, it
                  quietly rots — and every customer who bounces off a broken
                  page is a customer you already paid to get.
                </p>
              </div>

              <ul className="lg:col-span-7">
                {PAIN_POINTS.map((point, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-4 py-5 ${i > 0 ? "border-t border-[var(--color-dark-border)]" : ""}`}
                  >
                    <X size={20} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-cyan-text)]" />
                    <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* ─── CARE PLAN TIERS (real numbers, real inclusions) ────────── */}
        <div id="tiers" className="scroll-mt-20">
          <TierCards
            eyebrow="Care plan pricing"
            headline="Three ways to keep it"
            highlight="running"
            subhead="Built from the same real numbers already published on the Web Design and Ecommerce service pages — nothing here is a new price, just organized clearly."
            tiers={CARE_TIERS}
          />
        </div>

        {/* ─── DESIGN + HOSTING BUNDLE ─────────────────────────────────── */}
        <Section theme="parchment" pad="standard" topRule bottomRule>
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  Design + Hosting
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                  Build it and keep it running — one shop, no handoff gap.
                </h2>
                <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                  Most care plans start the day a new build launches, so
                  nothing falls through the cracks between "site goes live"
                  and "who's watching it now."
                </p>
              </div>

              <div className="grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:col-span-7">
                <div className="flex flex-col gap-3 bg-[var(--color-cloud)] p-8">
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Build a website
                  </span>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
                    {webDesign.pricing.price}
                  </div>
                  <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    Custom, mobile-first, SEO-ready. Landing through Premium
                    tiers.
                  </p>
                  <a
                    href="/services/web-design"
                    className="mt-1 inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
                  >
                    See Web Design
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>
                <div className="flex flex-col gap-3 bg-[var(--color-cloud)] p-8">
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Build a store
                  </span>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
                    {ecommerce.pricing.price}
                  </div>
                  <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    Shopify builds — then Shopify Care picks up from $200/mo.
                  </p>
                  <a
                    href="/services/ecommerce"
                    className="mt-1 inline-flex items-center gap-1.5 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
                  >
                    See Ecommerce
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ─── LEAD FORM ───────────────────────────────────────────────── */}
        <ServiceLeadFormSection slug="website-management" serviceName="Website Management" />

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
                      management &amp; care
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
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
                Round it out
              </span>
              <div className="grid grid-cols-1 gap-px border border-[var(--color-dark-border-strong)] bg-[var(--color-dark-border-strong)] sm:grid-cols-3">
                {[
                  { label: "Web Design", href: "/services/web-design", blurb: "Need a new build before care starts? Start here." },
                  { label: "Ecommerce", href: "/services/ecommerce", blurb: "Shopify builds and the storefronts we care for." },
                  { label: "SEO & Digital Marketing", href: "/services/seo", blurb: "A well-maintained site is only half the job." },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col gap-2 bg-[var(--color-grave)] p-6 transition-colors hover:bg-[var(--color-surface)]"
                  >
                    <span className="flex items-center justify-between gap-2 text-[length:var(--text-secondary)] font-semibold text-[var(--color-dark-text-primary)]">
                      {item.label}
                      <ArrowRight size={14} weight="bold" className="shrink-0 text-[var(--color-cyan-text)] transition-transform group-hover:translate-x-0.5" />
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
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
                Ready when you are
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
                Stop hoping the site is fine.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Month-to-month care, real humans watching it, cancel anytime.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#lead-form"
                role="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cyan)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
              >
                Get my call back
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] transition-transform duration-150 active:scale-[0.97] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan-text)]"
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
