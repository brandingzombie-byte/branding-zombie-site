import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import WorkGallery from "@/components/WorkGallery";
import { PORTFOLIO } from "@/data/portfolio";
import { SITE_URL, BUSINESS_NAME, ORG_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/work`;

export const metadata: Metadata = {
  // Brand omitted — the root layout's "%s | Branding Zombie Designs" title
  // template appends it once (adding it here doubled the suffix).
  title: "Our Work — Branding, Packaging, Websites & Print",
  description:
    "Browse 80+ real projects from Branding Zombie Designs in Cumming, GA — brand identities, packaging and labels, websites, ecommerce, social creative, and print. Filter by what you need.",
  keywords: [
    "design portfolio Cumming GA",
    "branding portfolio Forsyth County",
    "packaging design portfolio",
    "web design portfolio Georgia",
    "logo design examples",
    "Branding Zombie work",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Our Work — ${BUSINESS_NAME}`,
    description:
      "80+ real projects across branding, packaging, websites, and print. Filter the portfolio by what you need.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `Selected work by ${BUSINESS_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Work — ${BUSINESS_NAME}`,
    description:
      "80+ real projects across branding, packaging, websites, and print.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Work", item: PAGE_URL },
  ],
};

// Lightweight CollectionPage + ItemList so search engines understand this is a
// curated portfolio. Capped to the first 24 entries to keep the JSON-LD lean.
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: `Our Work — ${BUSINESS_NAME}`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": ORG_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: PORTFOLIO.length,
    itemListElement: PORTFOLIO.slice(0, 24).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      ...(p.href ? { url: p.href } : {}),
    })),
  },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <main id="main-content" tabIndex={-1}>
        {/* Dark hero header */}
        <Section
          theme="dark"
          pad="spacious"
          className="overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
            style={{
              background:
                "radial-gradient(60% 50% at 24% 32%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Selected work
              </span>
            </div>
            <h1 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              Real brands.{" "}
              <span className="relative inline-block">
                Real work
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              80+ projects across branding, packaging, websites, and print —
              from Cumming Main Street to national CPG shelves. Filter by what
              you&apos;re looking to get made.
            </p>
          </div>
        </Section>

        <SectionSeparator id={5} />

        {/* Light gallery body */}
        <Section theme="light" pad="spacious" topRule>
          <WorkGallery />
        </Section>

        {/* Closing CTA — route portfolio browsers (and crawlers) into the
            service pages the work actually came from. */}
        <Section theme="light" pad="standard" topRule>
          <div className="flex flex-col gap-2">
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
              Your brand next
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              Like what you see?
            </h2>
            <p className="measure mt-2 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
              Every project above started as a first call. Kick yours off with{" "}
              <a
                href="/services/web-design"
                className="font-medium text-[var(--color-neon-text)] underline decoration-[var(--color-neon)]/40 decoration-2 underline-offset-4 hover:decoration-[var(--color-neon)]"
              >
                web design in Cumming, GA
              </a>{" "}
              or{" "}
              <a
                href="/services/logo-design"
                className="font-medium text-[var(--color-neon-text)] underline decoration-[var(--color-neon)]/40 decoration-2 underline-offset-4 hover:decoration-[var(--color-neon)]"
              >
                logo design in Cumming
              </a>
              , or{" "}
              <a
                href="/services"
                className="font-medium text-[var(--color-neon-text)] underline decoration-[var(--color-neon)]/40 decoration-2 underline-offset-4 hover:decoration-[var(--color-neon)]"
              >
                browse all services
              </a>{" "}
              to see what fits.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
