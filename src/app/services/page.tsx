import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ServicesIndexGrid from "@/components/services/ServicesIndexGrid";
import { SERVICES } from "@/data/services";
import { SITE_URL, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: "Services — Web Design, AI, Branding, Print & Ecommerce in Cumming, GA",
  description:
    "Every service Branding Zombie Designs offers small businesses in Cumming, GA & North Metro Atlanta — web design, AI workflows, graphic design, print, social media, and Shopify ecommerce.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "Services — Branding Zombie Designs in Cumming, GA",
    description:
      "Web design, AI workflows, branding, print, social media, and Shopify ecommerce for small businesses across North Metro Atlanta.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Branding Zombie Designs — Services offered in Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Branding Zombie Designs",
    description:
      "Web design, AI workflows, branding, print, social media, and Shopify ecommerce for small businesses in Cumming, GA.",
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

// Page-specific JSON-LD: BreadcrumbList (Home → Services) + ItemList of all 6
// services for crawl discovery.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services offered by Branding Zombie Designs",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/services/${s.slug}`,
    name: s.name,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.schema.description,
      provider: { "@id": LOCALBIZ_ID },
      url: `${SITE_URL}/services/${s.slug}`,
    },
  })),
};

export default function ServicesIndexPage() {
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
                "radial-gradient(60% 50% at 25% 30%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-[var(--color-toxic)]"
              />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Services · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              Everything your business needs to{" "}
              <span className="relative inline-block">
                show up online
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Six services, one team, no agency hand-offs. Pick what you need
              today and add the rest as you grow — all built from right here in
              Cumming, Georgia for small businesses across North Metro Atlanta.
            </p>
          </div>
        </Section>

        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                What we do
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                Browse{" "}
                <span className="relative inline-block">
                  every service
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              Each page covers what&apos;s included, how it works, real pricing,
              and answers to the questions we actually hear on discovery calls.
            </p>
          </div>

          <ServicesIndexGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
}
