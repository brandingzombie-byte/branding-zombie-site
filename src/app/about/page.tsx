import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import AboutCtaRow from "./AboutCtaRow";
import {
  SITE_URL,
  BUSINESS_NAME,
  FOUNDER_NAME,
  ORG_ID,
} from "@/lib/site";

const PAGE_URL = `${SITE_URL}/about`;
const PERSON_ID = `${SITE_URL}/#gerry`;

export const metadata: Metadata = {
  title: `About ${FOUNDER_NAME} — ${BUSINESS_NAME} in Cumming, GA`,
  description:
    "Gerry Betancourt, creative director behind Branding Zombie Designs. 15+ years, 30+ brands launched — from Fort Lauderdale's CPG scene to Cumming, Georgia's Main Street.",
  keywords: [
    "Gerry Betancourt designer",
    "Branding Zombie founder",
    "creative director Cumming GA",
    "brand strategist Forsyth County",
    "Spanish speaking designer Atlanta",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `About ${FOUNDER_NAME} — ${BUSINESS_NAME}`,
    description:
      "15 years. 30+ brands launched across products and services. Now building from Cumming, Georgia.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `${FOUNDER_NAME}, creative director at ${BUSINESS_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${FOUNDER_NAME} — ${BUSINESS_NAME}`,
    description:
      "15 years. 30+ brands launched. Now building from Cumming, Georgia.",
    images: ["/assets/og-image.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: FOUNDER_NAME,
  url: PAGE_URL,
  jobTitle: "Creative Director & Brand Strategist",
  description:
    "Creative director and marketing strategist with 15+ years launching brands across CPG, ecommerce, service, and local business categories. Founder of Branding Zombie Designs in Cumming, GA.",
  worksFor: { "@id": ORG_ID },
  knowsLanguage: ["en", "es"],
  knowsAbout: [
    "Brand identity design",
    "Logo design",
    "Packaging design",
    "Shopify ecommerce",
    "Product photography",
    "Digital marketing",
    "AI workflow integration",
    "Small business branding",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cumming",
    addressRegion: "GA",
    addressCountry: "US",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
  ],
};

const facts = [
  { k: "Years in the trenches", v: "15+" },
  { k: "Brands launched", v: "30+" },
  { k: "Languages", v: "English · Spanish" },
  { k: "Current base", v: "Cumming, GA" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main>
        <Section
          theme="dark"
          pad="spacious"
          className="min-h-[60dvh] overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
            style={{
              background:
                "radial-gradient(60% 50% at 22% 30%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 82% 72%, rgba(0,255,212,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                About · {FOUNDER_NAME}
              </span>
            </div>
            <h1 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              15 years.{" "}
              <span className="relative inline-block">
                30+ brands
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              . Yours is next.
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              I&apos;m Gerry Betancourt — the creative director, strategist,
              and one-man agency behind Branding Zombie Designs. From Fort
              Lauderdale&apos;s CPG scene to Cumming&apos;s Main Street, the
              job&apos;s been the same: make small brands look and sell like
              the ones you envy.
            </p>
            <div className="mt-10">
              <AboutCtaRow primaryLabel="Book a free audit" size="sm" />
            </div>
          </div>
        </Section>

        <SectionSeparator id={7} />

        {/* The story */}
        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                The backstory
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Fort Lauderdale{" "}
                <span className="relative inline-block">
                  taught me
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="measure space-y-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                <p>
                  I cut my teeth in South Florida&apos;s CPG scene — the kind
                  of place where a supplement label either walks off the shelf
                  or stays dead, and the feedback loop is immediate. Over 15+
                  years I&apos;ve designed brand identities, built Shopify
                  stores, shot product content, run ad campaigns, and somehow
                  kept all of them from falling apart.
                </p>
                <p>
                  30+ brands later — from packaged goods and supplements to
                  restaurants, streetwear, contractors, custom PC builders,
                  and service businesses — a pattern showed up: the work that
                  mattered most wasn&apos;t the biggest. It was the small
                  business finally getting its first real website. The
                  restaurant owner who could look at her menu without
                  apologizing for it. The founder shipping a label she was
                  proud to ship.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <SectionSeparator id={1} />

        {/* Why Cumming */}
        <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Now based in
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Cumming,{" "}
                <span className="relative inline-block">
                  Georgia
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="measure space-y-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                <p>
                  I moved to Cumming for the same reasons everybody else does
                  — slower mornings, better schools, a grocery store where you
                  actually know the cashier. But I kept noticing the same
                  thing on every Main Street, every strip mall, every Yelp
                  listing: <em>these businesses are great, and their
                  websites are stuck in 2012.</em> The craft is here. The
                  storytelling isn&apos;t.
                </p>
                <p>
                  So I rebuilt Branding Zombie around one idea: bring
                  big-brand design chops to the small businesses that never
                  had agency access. Restaurants. Salons. Mechanics. Tow
                  companies. Local retail. CPG founders launching in someone&apos;s
                  garage. If you serve customers in Forsyth County, North
                  Fulton, or anywhere along the GA-400 corridor, I probably
                  live closer to your shop than your last designer did.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <SectionSeparator id={2} />

        {/* Facts */}
        <Section theme="light" pad="standard" topRule>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-text-primary">
              A few quick facts.
            </h2>
            <p className="measure-tight text-[length:var(--text-secondary)] text-text-dim">
              The stuff people ask in the first five minutes.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-y-0">
            {facts.map((f) => (
              <li key={f.k} className="px-2 py-5 sm:px-6">
                <div className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)]">
                  {f.v}
                </div>
                <div className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                  {f.k}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <SectionSeparator id={4} />

        {/* The philosophy + personal */}
        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                How I work
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Good design{" "}
                <span className="relative inline-block">
                  should make money
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="measure space-y-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                <p>
                  Every project starts with the business goal, not the mood
                  board. I&apos;m equally comfortable in Photoshop and a
                  spreadsheet. I speak English and Spanish fluently. I care
                  less about &quot;award-winning&quot; and more about whether
                  your new logo is bringing in calls, whether your new site
                  is converting, whether your new label is walking off the
                  shelf.
                </p>
                <p>
                  Looking pretty is table stakes. Making you money is the
                  job.
                </p>
                <p className="pt-2 text-text-primary">
                  When I&apos;m not working, I&apos;m raising three little
                  humans who think I&apos;m a superhero. They&apos;re wrong,
                  but I appreciate the confidence.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <SectionSeparator id={3} />

        {/* Final CTA */}
        <Section theme="dark" pad="spacious" topRule>
          <div className="flex flex-col items-start gap-6">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              Ready when you are
            </span>
            <h2 className="max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              Want to see if we&apos;re{" "}
              <span className="relative inline-block">
                a fit
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              ?
            </h2>
            <p className="measure text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              15 minutes. No commitment. I&apos;ll tell you honestly whether
              Branding Zombie is the right move — or point you somewhere
              better if it isn&apos;t.
            </p>
            <AboutCtaRow primaryLabel="Book the 15-minute call" size="lg" />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
