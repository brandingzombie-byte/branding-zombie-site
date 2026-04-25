import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import AuditForm from "./AuditForm";
import { SITE_URL, BUSINESS_NAME, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/free-site-audit`;

export const metadata: Metadata = {
  title: "Free Website Pulse Check — Site Audit in Cumming, GA | Branding Zombie",
  description:
    "Drop your URL, get a candid 6-pillar site audit in 10 seconds — speed, SEO, architecture, brand voice, visual clarity, trust signals. Free. Cumming, GA.",
  keywords: [
    "free website audit",
    "free site audit",
    "website pulse check",
    "site health check",
    "website audit Cumming GA",
    "free SEO audit Forsyth County",
    "website teardown",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: "Free Website Pulse Check — Branding Zombie",
    description:
      "Is your site dead or just sleeping? Drop a URL — we'll tell you straight in 10 seconds.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `Free website audit by ${BUSINESS_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Pulse Check — Branding Zombie",
    description:
      "Is your site dead or just sleeping? Drop a URL — we'll tell you straight in 10 seconds.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Free Site Audit", item: PAGE_URL },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  name: "Free Website Pulse Check",
  about: { "@id": LOCALBIZ_ID },
  description:
    "Free six-pillar website audit. Returns a 0–100 Pulse score plus specific findings on speed, SEO, architecture, brand voice, visual clarity, and trust signals.",
};

const PILLARS = [
  { label: "Vitals", blurb: "Page speed, weight, layout shift." },
  { label: "Findability", blurb: "Title, meta, H1, schema, canonicals." },
  { label: "Architecture", blurb: "Heading order, nav, link clarity." },
  { label: "Brand Voice", blurb: "Agency-slop detector. Reads-like-everyone-else check." },
  { label: "Visual Clarity", blurb: "Font count, color count, where the eye lands." },
  { label: "Trust Signals", blurb: "HTTPS, phone, address, copyright year." },
];

export default function FreeSiteAuditPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main>
        <Section
          theme="dark"
          pad="spacious"
          className="min-h-[48dvh] overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
            style={{
              background:
                "radial-gradient(60% 50% at 25% 35%, rgba(191,255,0,0.12), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Free Pulse Check · No commitment
              </span>
            </div>
            <h1 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
              Is your site{" "}
              <span className="relative inline-block">
                dead
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>{" "}
              or just sleeping?
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Drop a URL. In about 10 seconds we score it across six pillars
              and tell you — straight — what&apos;s costing you customers.
              You get the full report on screen and a copy in your inbox.
            </p>
          </div>
        </Section>

        <SectionSeparator id={3} />

        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-12">
            {/* LEFT — what we check */}
            <aside className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                What we check
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Six pillars.{" "}
                <span className="relative inline-block">
                  No fluff
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Most graders just dump a Lighthouse score on you. We look at
                what an actual customer sees — including whether your copy
                sounds like every other agency in metro Atlanta.
              </p>
              <ul className="mt-8 grid gap-4">
                {PILLARS.map((p, i) => (
                  <li
                    key={p.label}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-[var(--color-hairline)] pt-4"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)] tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-primary">
                        {p.label}
                      </span>
                      <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                        {p.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Cumming · Forsyth County · North Metro Atlanta
              </p>
            </aside>

            {/* RIGHT — form */}
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Run a Pulse Check
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Drop a URL. We&apos;ll{" "}
                <span className="relative inline-block">
                  tell you straight
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Four fields. About 10 seconds. The full report shows up below
                and we send a copy to your inbox.
              </p>
              <div className="mt-8">
                <AuditForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
