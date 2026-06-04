import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import { INDUSTRIES } from "@/data/industries";
import { SITE_URL, BUSINESS_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/industries`;

export const metadata: Metadata = {
  title: `Industries We Serve — Branding for Local Businesses | ${BUSINESS_NAME}`,
  description:
    "Branding, web design, and print built for your industry — trades and contractors, restaurants, salons and barbershops, supplement and CPG brands, and more across Cumming, GA and North Metro Atlanta.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Industries We Serve — ${BUSINESS_NAME}`,
    description:
      "Branding, web, and print tailored to your industry — built in Cumming, GA for North Metro Atlanta small businesses.",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: `${BUSINESS_NAME} — industries served` }],
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

export default function IndustriesIndexPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main id="main-content" tabIndex={-1}>
        <Section theme="dark" pad="spacious" className="overflow-hidden">
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
            <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              Built for{" "}
              <span className="relative inline-block">
                your industry
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Same studio, same flat prices — but the work, the words, and the
              proof are tuned to what your customers actually respond to. Find
              your line of business below.
            </p>
          </div>
        </Section>

        <SectionSeparator id={7} />

        <Section theme="light" pad="spacious" topRule>
          <div className="grid grid-cols-1 border-x-2 border-t-2 border-[var(--color-text-primary)] sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                aria-label={ind.name}
                className={cn(
                  "group relative flex min-h-[15rem] flex-col justify-between overflow-hidden",
                  "border-b-2 border-[var(--color-text-primary)] bg-[var(--color-surface-1)] p-7",
                  "sm:[&:not(:nth-child(2n))]:border-r-2 sm:[&:not(:nth-child(2n))]:border-[var(--color-text-primary)]",
                  "lg:[&:not(:nth-child(3n))]:border-r-2 lg:[&:not(:nth-child(3n))]:border-[var(--color-text-primary)] lg:[&:nth-child(2n)]:!border-r-2 lg:[&:nth-child(3n)]:!border-r-0",
                  "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                  "hover:bg-[var(--color-neon)] active:scale-[0.997]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
                  "motion-reduce:transition-none",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 bottom-2 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.04] transition-opacity group-hover:opacity-[0.09]"
                  style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-neon-text)] group-hover:text-text-primary">
                  {ind.eyebrow}
                </span>
                <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
                  <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary">
                    {ind.navLabel}
                  </h2>
                  {/* Inline SVG (arrow-up-right) — keeps this Server Component
                      free of the Phosphor icon import, which needs React
                      context and only works in client components. */}
                  <svg
                    viewBox="0 0 256 256"
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden
                    className="shrink-0 text-text-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-primary"
                  >
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-[length:var(--text-secondary)] text-text-dim">
            Don&apos;t see your line of business?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
            >
              Tell us what you do
            </Link>{" "}
            — we&apos;ve probably branded something close.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
