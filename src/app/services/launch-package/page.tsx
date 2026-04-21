import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import BrandTrackRecord from "@/components/services/BrandTrackRecord";
import LaunchPackageCtas from "./LaunchPackageCtas";
import IncludedList from "./IncludedList";
import { SITE_URL, LOCALBIZ_ID, BUSINESS_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/services/launch-package`;

export const metadata: Metadata = {
  title: "Launch Package — Logo + Brand + Website in 4 Weeks — Cumming, GA",
  description:
    "The full starter kit for new businesses launching. Logo Design, Brand Basics, 5-page Website, and 90-day Content Calendar — delivered in 4 weeks for $4,500 (save $2,000 vs. à la carte). Cumming, GA + North Metro Atlanta.",
  keywords: [
    "launch package Cumming GA",
    "new business starter kit Forsyth County",
    "logo and website package Atlanta",
    "brand launch bundle North Atlanta",
    "small business launch package Georgia",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: "Launch Package — Logo + Brand + Website in 4 Weeks",
    description:
      "Everything a new business needs to launch — shipped in 4 weeks for $4,500.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Launch Package — Branding Zombie Designs in Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch Package — Logo + Brand + Website",
    description:
      "Everything a new business needs to launch — 4 weeks, $4,500, save $2,000 vs. à la carte.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Launch Package",
      item: PAGE_URL,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Launch Package — Logo + Brand + Website + Content Calendar",
  description:
    "A 4-week bundle for new businesses launching for the first time or established businesses doing a full refresh. Includes a full logo suite, brand basics mini-guide, 5-page responsive website, and 90-day social content calendar. $4,500 — saves $2,000 vs. booking each service individually.",
  serviceType: "Launch Bundle",
  category: "Branding, Web Design, Marketing",
  url: PAGE_URL,
  provider: { "@id": LOCALBIZ_ID },
  offers: {
    "@type": "Offer",
    price: "4500",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Launch Package Inclusions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Logo Design — Growth tier",
          url: `${SITE_URL}/services/logo-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Basics Mini Guide",
          url: `${SITE_URL}/services/branding`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design Starter — 5-page site",
          url: `${SITE_URL}/services/web-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "90-day Social Content Calendar",
          url: `${SITE_URL}/services/social-media`,
        },
      },
    ],
  },
};

export default function LaunchPackagePage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
                "radial-gradient(60% 50% at 22% 30%, rgba(191,255,0,0.12), transparent 70%), radial-gradient(50% 40% at 82% 72%, rgba(0,255,212,0.08), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Launch Package · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              Launch the{" "}
              <span className="relative inline-block">
                whole business
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>{" "}
              in 4 weeks.
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Logo, brand basics, a real website, and a 90-day content
              calendar — bundled, built, and delivered by one creative
              director with 15+ years launching brands.{" "}
              <span className="text-[var(--color-dark-text-primary)]">
                $4,500 all-in. Save $2,000 vs. buying each service
                individually.
              </span>
            </p>

            {/* Price banner */}
            <div className="mt-10 inline-flex flex-col items-start gap-2 rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/60 px-7 py-5 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none text-[var(--color-toxic-text)]">
                $4,500
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                  all-in · 4 weeks
                </span>
                <span className="tabular text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
                  <span className="line-through opacity-60">$6,499</span>{" "}
                  <span className="text-[var(--color-toxic-text)] font-semibold">
                    save $2,000
                  </span>{" "}
                  vs. à la carte
                </span>
              </div>
            </div>

            <div className="mt-10">
              <LaunchPackageCtas size="sm" />
            </div>
          </div>
        </Section>

        <SectionSeparator id={7} />

        {/* What's inside */}
        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                What&apos;s inside
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Four pieces of the same{" "}
                <span className="relative inline-block">
                  brand
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Launching piecemeal means your logo doesn&apos;t match
                your site and your site doesn&apos;t match your social.
                The Launch Package makes everything part of one decision,
                one timeline, one voice.
              </p>
            </div>
            <div className="lg:col-span-8">
              <IncludedList />
              <p className="mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Total à la carte value: <span className="tabular">$6,499</span>{" "}
                · Launch Package: <span className="tabular">$4,500</span>
              </p>
            </div>
          </div>
        </Section>

        <SectionSeparator id={1} />

        {/* Who this is for */}
        <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Who this is for
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Two kinds of{" "}
                <span className="relative inline-block">
                  founders
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
                  <span className="text-text-primary font-semibold">
                    New businesses launching for the first time.
                  </span>{" "}
                  You need a logo, a site, and a plan — and you need them
                  to feel like one brand from day one, not three different
                  vendors stapled together. We&apos;ve done this 30+ times.
                </p>
                <p>
                  <span className="text-text-primary font-semibold">
                    Established businesses doing a full refresh.
                  </span>{" "}
                  Your logo&apos;s from 2012, your site is slower than
                  your old Squarespace, and your social hasn&apos;t been
                  touched since 2021. A Launch Package relaunches you
                  across the board in 4 weeks without stringing three
                  projects across six months.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <SectionSeparator id={2} />

        {/* Timeline */}
        <Section theme="light" pad="spacious" topRule>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-text-primary">
              4 weeks, kickoff to live.
            </h2>
            <p className="measure-tight text-[length:var(--text-secondary)] text-text-dim">
              One project plan, one invoice, one point of contact.
            </p>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] md:grid-cols-4">
            {[
              {
                week: "Week 1",
                title: "Discovery + Brand Direction",
                description:
                  "Brief, positioning, logo concepts, and approved direction.",
              },
              {
                week: "Week 2",
                title: "Logo + Brand System",
                description:
                  "Final logo suite, color palette, typography system, brand sheet.",
              },
              {
                week: "Week 3",
                title: "Website Build",
                description:
                  "5-page site designed and developed in parallel with brand handoff.",
              },
              {
                week: "Week 4",
                title: "Launch + Content Plan",
                description:
                  "Site goes live, brand files delivered, 90-day content calendar handed over.",
              },
            ].map((step) => (
              <li
                key={step.week}
                className="flex flex-col gap-2 bg-[var(--color-cloud)] p-6 lg:p-7"
              >
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
                  {step.week}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight tracking-tight text-text-primary">
                  {step.title}
                </h3>
                <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <SectionSeparator id={4} />

        <BrandTrackRecord />

        <SectionSeparator id={6} />

        {/* Final CTA */}
        <Section theme="dark" pad="spacious" topRule>
          <div className="flex flex-col items-start gap-6">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              Ready to launch
            </span>
            <h2 className="max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              Pick a week.{" "}
              <span className="relative inline-block">
                Come out the other side with a brand
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h2>
            <p className="measure text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Book the 15-minute launch call. We&apos;ll confirm scope,
              confirm the timeline, and pick a kickoff date — no credit
              card, no commitment, no high-pressure anything.
            </p>
            <LaunchPackageCtas size="lg" />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
