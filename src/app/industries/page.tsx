import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import CustomQuoteCta from "@/components/services/CustomQuoteCta";
import { INDUSTRIES } from "@/data/industries";
import { SITE_URL, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/industries`;

export const metadata: Metadata = {
  title: "Industries We Serve — Branding & Web Design in Cumming, GA",
  description:
    "Industry-specific branding, web design, and print for restaurants, home-service & trade businesses, health & medical practices, and fitness & supplement brands in Cumming, GA and across North Metro Atlanta.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "Industries We Serve — Branding Zombie Designs in Cumming, GA",
    description:
      "Tailored branding, websites, and print for restaurants, trades, medical practices, and fitness & supplement brands across North Metro Atlanta.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Branding Zombie Designs — Industries served in Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve — Branding Zombie Designs",
    description:
      "Industry-specific branding, web design, and print for businesses across North Metro Atlanta.",
    images: ["/assets/og-image.png"],
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Industries", item: PAGE_URL },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industries served by Branding Zombie Designs",
  itemListElement: INDUSTRIES.map((ind, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/industries/${ind.slug}`,
    name: ind.name,
    item: {
      "@type": "Service",
      name: ind.name,
      description: ind.answerFirst,
      provider: { "@id": LOCALBIZ_ID },
      url: `${SITE_URL}/industries/${ind.slug}`,
    },
  })),
};

export default function IndustriesIndexPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
                "radial-gradient(60% 50% at 25% 30%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Industries · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              Branding built for{" "}
              <span className="relative inline-block">
                your kind of business
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              A restaurant menu, an HVAC truck wrap, a med-spa website, and a
              supplement label aren&apos;t the same job. These pages cover the
              specific branding, web, and print work each industry actually
              needs — designed and produced from right here in Cumming, Georgia
              for businesses across North Metro Atlanta.
            </p>
          </div>
        </Section>

        <SectionSeparator id={7} />

        <Section theme="dark" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-dark-border-strong)] bg-[var(--color-dark-border-strong)] sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group relative flex min-h-[15rem] flex-col justify-between bg-[var(--color-surface)] p-8 transition-colors hover:bg-[var(--color-elevated)]"
              >
                <div>
                  <span className="tabular text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan-text)]">
                    {ind.shortName}
                  </span>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
                    {ind.name}
                  </h2>
                  <p className="measure mt-3 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                    {ind.tagline}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-dark-border)] pt-4">
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-[var(--color-dark-text-dim)]">
                    From {ind.pricing.price}
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-4 w-4 text-[var(--color-dark-text-dim)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-toxic-text)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12 12 4M6 4h6v6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <SectionSeparator id={4} />

        <CustomQuoteCta
          eyebrow="Don't see your industry?"
          headline="We work with"
          highlight="every kind of small business"
          copy="Retail, professional services, real estate, nonprofits, salons, automotive, e-commerce — if you need branding, a website, or print, we've probably done it. Tell us your business and we'll come back with a tailored quote within 24 hours."
        />
      </main>
      <Footer />
    </>
  );
}
