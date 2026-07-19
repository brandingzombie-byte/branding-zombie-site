import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import CustomQuoteForm from "./CustomQuoteForm";
import { SITE_URL, BUSINESS_NAME, LOCALBIZ_ID, EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { KITS_BY_SLUG, isKitSlug } from "@/data/kits";

const PAGE_URL = `${SITE_URL}/services/request-quote`;

export const metadata: Metadata = {
  title: "Request a Custom Quote — Cumming, GA",
  description:
    "Pricing not the right fit? Tell us what you need and we'll build a custom quote — usually back to you the same business day. Web, branding, print, AI, and more.",
  keywords: [
    "custom quote",
    "request a quote Cumming GA",
    "design quote Forsyth County",
    "small business design quote North Atlanta",
    "branding quote Cumming",
    "website quote Atlanta",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Request a Custom Quote — ${BUSINESS_NAME}`,
    description:
      "Tell us about the project and we'll send back a real quote within one business day. No sales team, no gatekeepers.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `Request a custom quote from ${BUSINESS_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Request a Custom Quote — ${BUSINESS_NAME}`,
    description:
      "Tell us what you need. We'll send back a real quote within one business day.",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      name: "Request a Custom Quote",
      item: PAGE_URL,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  name: "Request a Custom Quote",
  about: { "@id": LOCALBIZ_ID },
  description:
    "Lead capture form for visitors who want a tailored quote outside our standard pricing tiers.",
};

const REASONS = [
  {
    label: "We meet your budget",
    blurb:
      "Tiers are starting points, not gates. Tell us what you can spend and we'll scope the project to fit — or be honest if it can't.",
  },
  {
    label: "One human reads every brief",
    blurb:
      "Gerry — the founder — reads it himself. No sales team, no chatbot, no boilerplate reply with a calendar link.",
  },
  {
    label: "Real reply within 24 hours",
    blurb:
      "Usually same day. You get a written quote you can compare, share, or sit on — no pressure, no follow-up spam.",
  },
];

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ kit?: string }>;
}) {
  // Kit mode — the "Choose [Kit]" buttons land here with ?kit=<slug>. The
  // hero speaks to the specific kit; the form (client-side) collapses to the
  // short version with the kit summary card.
  const { kit: kitParam } = await searchParams;
  const kit = kitParam && isKitSlug(kitParam) ? KITS_BY_SLUG[kitParam] : undefined;

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
      <main id="main-content" tabIndex={-1}>
        <Section
          theme="dark"
          pad="spacious"
          className="min-h-[44dvh] overflow-hidden"
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
                {kit ? "Kit quote · No commitment" : "Custom quote · No commitment"}
              </span>
            </div>
            {kit ? (
              <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
                Let&apos;s price your{" "}
                <span className="relative inline-block">
                  {kit.name}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                  />
                </span>
                .
              </h1>
            ) : (
              <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
                Tiers don&apos;t fit?{" "}
                <span className="relative inline-block">
                  Tell us what does
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                  />
                </span>
                .
              </h1>
            )}
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {kit ? (
                <>
                  {kit.name} — {kit.price}, delivered in {kit.timeline}. Leave
                  your details below and Gerry will confirm scope and a start
                  date within 24 hours. No payment now, no commitment.
                </>
              ) : (
                <>
                  Most small businesses don&apos;t need everything in a tier —
                  and some need more. Send a quick brief, drop in any
                  references, and we&apos;ll come back with a custom quote
                  tailored to your scope and budget.
                </>
              )}
            </p>
          </div>
        </Section>

        <SectionSeparator id={3} />

        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-12">
            {/* LEFT — Why this is worth your time */}
            <aside className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                What you get
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                A real quote.{" "}
                <span className="relative inline-block">
                  Not a sales pitch
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <ul className="mt-8 grid gap-4">
                {REASONS.map((r, i) => (
                  <li
                    key={r.label}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-[var(--color-hairline)] pt-4"
                  >
                    <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-primary">
                        {r.label}
                      </span>
                      <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                        {r.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Or skip the form —{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[var(--color-neon-text)] hover:underline normal-case tracking-normal"
                >
                  {EMAIL}
                </a>{" "}
                · <span className="text-[var(--color-neon-text)]">{PHONE_DISPLAY}</span>
              </p>
            </aside>

            {/* RIGHT — The form */}
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Your custom brief
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                {kit ? "Three quick" : "Four quick"}{" "}
                <span className="relative inline-block">
                  steps
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                {kit
                  ? "Takes about 60 seconds. Only your name and email are required — the kit covers the rest."
                  : "Takes about 90 seconds. Only your name, email, and a sentence about the project are required — everything else helps but is optional."}
              </p>
              <div className="mt-10">
                <Suspense fallback={<FormFallback />}>
                  <CustomQuoteForm />
                </Suspense>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function FormFallback() {
  return (
    <div className="h-[600px] animate-pulse rounded-md bg-[var(--color-fog)]" />
  );
}
