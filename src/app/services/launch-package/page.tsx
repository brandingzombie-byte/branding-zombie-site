import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import ServiceLeadFormSection from "@/components/services/ServiceLeadFormSection";
import CustomQuoteCta from "@/components/services/CustomQuoteCta";
import LaunchPackageCtas from "./LaunchPackageCtas";
import IncludedList from "./IncludedList";
import { SITE_URL, LOCALBIZ_ID, BUSINESS_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/services/launch-package`;

export const metadata: Metadata = {
  title: "Local Business Kit — Logo + Website + Print, $2,800 — Cumming, GA",
  description:
    "The starter kit for new businesses that need to look legit, fast. Custom logo & brand identity, 5-page website, 500 business cards, 1,000 flyers, and Google Business Profile setup — $2,800 all-in, delivered in 4 weeks. Cumming, GA + North Metro Atlanta.",
  keywords: [
    "local business kit Cumming GA",
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
    title: "Local Business Kit — Logo + Website + Print, $2,800",
    description:
      "Everything a new business needs to look legit — logo, 5-page site, print, and Google Business Profile. $2,800, delivered in 4 weeks.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local Business Kit — Branding Zombie Designs in Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Business Kit — Logo + Website + Print",
    description:
      "Everything a new business needs to look legit — 4 weeks, $2,800, you save $1,200 vs. à la carte.",
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
      name: "Local Business Kit",
      item: PAGE_URL,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Local Business Kit — Logo + Website + Print + Google Business Profile",
  description:
    "A 4-week bundle for new businesses launching for the first time or established businesses doing a full refresh. Includes a custom logo and brand identity, 5-page responsive website, 500 business cards, 1,000 flyers or rack cards, Google Business Profile setup, and basic SEO. $2,800 — saves $1,200 vs. booking each service individually.",
  serviceType: "Launch Bundle",
  category: "Branding, Web Design, Print, Marketing",
  url: PAGE_URL,
  provider: { "@id": LOCALBIZ_ID },
  offers: {
    "@type": "Offer",
    price: "2800",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Local Business Kit Inclusions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Logo & Brand Identity",
          url: `${SITE_URL}/services/logo-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Website — up to 5 pages",
          url: `${SITE_URL}/services/web-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Print Starter Pack — 500 business cards + 1,000 flyers",
          url: `${SITE_URL}/services/print-design`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Business Profile Setup + Basic SEO",
          url: `${SITE_URL}/services/digital-marketing`,
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
      <main id="main-content" tabIndex={-1}>
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
                Local Business Kit · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
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
              Logo, a real 5-page website, business cards, flyers, and your
              Google Business Profile — bundled, built, and delivered by one
              creative director with 15+ years launching brands.{" "}
              <span className="text-[var(--color-dark-text-primary)]">
                $2,800 all-in. You save $1,200 vs. buying each service
                individually.
              </span>
            </p>

            {/* Price banner */}
            <div className="mt-10 inline-flex flex-col items-start gap-2 rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/60 px-7 py-5 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic-text)]">
                $2,800
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                  all-in · 4 weeks
                </span>
                <span className="tabular text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
                  <span className="line-through opacity-60">$4,000+</span>{" "}
                  <span className="text-[var(--color-toxic-text)] font-semibold">
                    you save $1,200
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
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
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
                your site and your cards don&apos;t match either. The
                Local Business Kit makes everything part of one decision,
                one timeline, one voice.
              </p>
            </div>
            <div className="lg:col-span-8">
              <IncludedList />
              <p className="mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Booked separately: <span className="tabular">$4,000+</span>{" "}
                · Local Business Kit: <span className="tabular">$2,800</span>{" "}
                · Or split it into 3 monthly payments — just ask
              </p>
            </div>
          </div>
        </Section>

        <SectionSeparator id={4} />

        <CustomQuoteCta
          serviceSlug="launch-package"
          eyebrow="Need a different mix?"
          headline="Get a quote built around"
          highlight="just the pieces you need"
          copy="The Local Business Kit bundles four services for $2,800. If you only need two, or you need extras (a second site, custom illustration, ongoing social), tell us — we'll quote a custom build within 24 hours."
        />

        <SectionSeparator id={1} />

        {/* Who this is for */}
        <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Who this is for
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
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
                  vendors stapled together. We&apos;ve done this 80+ times.
                </p>
                <p>
                  <span className="text-text-primary font-semibold">
                    Established businesses doing a full refresh.
                  </span>{" "}
                  Your logo&apos;s from 2012, your site is slower than
                  your old Squarespace, and your business cards don&apos;t
                  match either one. The Local Business Kit relaunches you
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
                title: "Launch + Print + Google",
                description:
                  "Site goes live, cards and flyers go to print, Google Business Profile set up and verified.",
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

        <ServiceLeadFormSection
          slug="launch-package"
          serviceName="Local Business Kit"
        />

        <SectionSeparator id={6} />

        {/* Final CTA */}
        <Section theme="dark" pad="spacious" topRule>
          <div className="flex flex-col items-start gap-6">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              Ready to launch
            </span>
            <h2 className="max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
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
              Request your kit quote — takes about 60 seconds. We&apos;ll
              confirm scope, confirm the timeline, and pick a kickoff date —
              no payment now, no commitment, no high-pressure anything.
            </p>
            <LaunchPackageCtas size="lg" />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
