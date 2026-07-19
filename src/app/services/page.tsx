import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import ServicesBrutalistGrid from "@/components/services/ServicesBrutalistGrid";
import CustomQuoteCta from "@/components/services/CustomQuoteCta";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
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
          {/* ── Zombie hand — the "BRAINS WANTED" sign dangling from the hero's
               top-left corner. ZH-05 is a corner-entry asset: the flannel
               sleeve exits through BOTH the top and left canvas edges, so the
               only placement that honors the wrist-cut rule (and keeps the
               sign text unmirrored — no flip allowed) is a top-left mount
               with negative top/left insets; the overflow-clip layer
               guillotines the sleeve at the section's real edges. lg+ only:
               below that the sign text goes illegible at band scale, and the
               hero's top padding is too shallow to clear the eyebrow. ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] overflow-clip"
          >
            <ZombieHand
              src={HANDS["zh05-brains-sign-l"].src}
              width={HANDS["zh05-brains-sign-l"].width}
              height={HANDS["zh05-brains-sign-l"].height}
              edge="left"
              behaviors={["peek", "parallax", "idle"]}
              offset="-36px"
              bleed="-44px"
              displayWidth={330}
              parallaxSpeed={0.05}
              zIndex={1}
              className="max-lg:hidden"
            />
          </div>
          {/* lg:pt-44 (vs pt-28 elsewhere) reserves headroom so the dangling
              sign clears the eyebrow + h1 at every lg+ width. Content sits
              on z-10 so the hand can never paint over the text. */}
          <div className="relative z-10 pt-20 lg:pt-44">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-[var(--color-toxic)]"
              />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Services · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
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
              One team, no agency hand-offs. Pick what you need today and add
              the rest as you grow — all built from right here in Cumming,
              Georgia for small businesses across North Metro Atlanta.
            </p>
          </div>
        </Section>

        <SectionSeparator id={7} />

        <Section theme="light" pad="spacious" topRule>
          {/* border-b-2 doubles as the top edge of the feature card below. */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 border-b-2 border-[var(--color-text-primary)] pb-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                What we do
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
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

          <ServicesBrutalistGrid services={SERVICES} />

          {/* Low-commitment bridge to the ONE page that demonstrably converts
              (/free-site-audit). The quote CTA below is a high-commitment ask
              for cold organic traffic — this gives browsers a zero-pressure
              next step first. Mirrors the PainPoints audit-CTA row styling. */}
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-[var(--color-hairline-strong)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[52ch] text-[length:var(--text-lead)] font-medium leading-snug text-text-primary">
              Not ready to talk to anyone? Run the free 10-second{" "}
              <span className="relative inline-block">
                Pulse Check
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>{" "}
              and see what&apos;s costing you customers — no sales call
              required.
            </p>
            <a
              href="/free-site-audit"
              role="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)] transition-colors hover:bg-[var(--color-neon-text)]"
            >
              Get my free site audit →
            </a>
          </div>
        </Section>

        <SectionSeparator id={4} />

        <CustomQuoteCta
          eyebrow="Don't see your exact need?"
          headline="Get a quote built around"
          highlight="whatever's on your list"
          copy="Most projects don't fit neatly into one service. Tell us the mix — branding plus a website, print plus social, a custom build we haven't listed — and we'll come back with a tailored quote within 24 hours."
        />
      </main>
      <Footer />
    </>
  );
}
