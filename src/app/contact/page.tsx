import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import ContactForm from "./ContactForm";
import ContactOptions from "./ContactOptions";
import { SITE_URL, BUSINESS_NAME, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: "Contact — Call, Email, or Book a Free Audit in Cumming, GA",
  description:
    "Talk to a real person in Cumming, GA. Call (770) 744-2536, email brandingzombie@gmail.com, or book a free 15-minute audit. Serving Forsyth County & North Metro Atlanta.",
  keywords: [
    "contact Branding Zombie Designs",
    "web designer Cumming GA contact",
    "free website audit Cumming",
    "book design consultation Forsyth County",
    "call web designer North Atlanta",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Contact ${BUSINESS_NAME} — Cumming, GA`,
    description:
      "Call, email, or book a free audit. Real small-business design and web work from right here in Cumming, Georgia.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `Contact ${BUSINESS_NAME} in Cumming, GA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${BUSINESS_NAME}`,
    description:
      "Call, email, or book a free audit — from right here in Cumming, Georgia.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: PAGE_URL,
  name: `Contact ${BUSINESS_NAME}`,
  about: { "@id": LOCALBIZ_ID },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
                "radial-gradient(60% 50% at 25% 35%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
            }}
          />
          <div className="pt-20 lg:pt-28">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Contact · Cumming, GA
              </span>
            </div>
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]">
              Let&apos;s{" "}
              <span className="relative inline-block">
                talk
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              No gatekeepers, no sales team. Call Gerry directly, drop an
              email, or book a free 15-minute audit — whichever feels less
              awkward.
            </p>
          </div>
        </Section>

        <SectionSeparator id={7} />

        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-12">
            {/* LEFT — Three-up fast-contact options */}
            <aside className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Fastest paths in
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Pick your weapon.
              </h2>
              <div className="mt-8">
                <ContactOptions />
              </div>
              <p className="mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Cumming · Forsyth County · North Metro Atlanta
              </p>
            </aside>

            {/* RIGHT — Form */}
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Or send a note
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Tell us what&apos;s{" "}
                <span className="relative inline-block">
                  broken
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                A sentence or two is enough. We&apos;ll read it, reply fast,
                and tell you honestly whether we&apos;re the right fit —
                before anybody signs anything.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
