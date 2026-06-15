import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import ServicePageClient from "@/components/services/ServicePageClient";
import ServiceHero from "@/components/services/ServiceHero";
import WhoThisIsFor from "@/components/services/WhoThisIsFor";
import ServicePainPoints from "@/components/services/ServicePainPoints";
import ServiceOffer from "@/components/services/ServiceOffer";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import ServiceFinalCTA from "@/components/services/ServiceFinalCTA";
import IndustryJsonLd from "@/components/industries/IndustryJsonLd";
import {
  getIndustryBySlug,
  getAllIndustrySlugs,
  buildIndustryService,
} from "@/data/industries";
import { SITE_URL } from "@/lib/site";

// Prerender every industry page; 404 on anything not in the data file.
export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  const url = `${SITE_URL}/industries/${industry.slug}`;
  return {
    title: industry.meta.seoTitle,
    description: industry.meta.seoDescription,
    keywords: industry.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Branding Zombie Designs",
      title: industry.meta.seoTitle,
      description: industry.meta.seoDescription,
      images: [
        {
          url: industry.meta.ogImage,
          width: 1200,
          height: 630,
          alt: industry.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.meta.seoTitle,
      description: industry.meta.seoDescription,
      images: [industry.meta.ogImage],
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
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const service = buildIndustryService(industry);

  return (
    <>
      <Navbar />
      <IndustryJsonLd industry={industry} />
      <main id="main-content" tabIndex={-1}>
        <ServicePageClient>
          <ServiceHero service={service} />

          {/* Answer-first lead — the self-contained passage AI engines lift.
              Names the business, the place, and the specific deliverables. */}
          <SectionSeparator id={7} />
          <Section theme="dark" pad="standard">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-cyan)]" />
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan-text)]">
                {industry.shortName} · Cumming, GA & North Metro Atlanta
              </span>
            </div>
            <p className="measure mt-6 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {industry.answerFirst}
            </p>
          </Section>

          <SectionSeparator id={1} />
          <WhoThisIsFor items={industry.whoThisIsFor} />
          <ServicePainPoints service={service} />
          <SectionSeparator id={8} />
          <ServiceOffer service={service} />
          <SectionSeparator id={4} />
          <ServiceProcess service={service} />
          <SectionSeparator id={1} />
          <ServiceFAQ service={service} />
          <SectionSeparator id={6} />
          <RelatedServices services={industry.related} />
          <ServiceFinalCTA service={service} />
        </ServicePageClient>
      </main>
      <Footer />
    </>
  );
}
