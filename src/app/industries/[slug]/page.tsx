import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryPageBody from "@/components/industries/IndustryPageBody";
import { getIndustry, getAllIndustrySlugs } from "@/data/industries";
import { REVIEWS } from "@/data/reviews";
import { SERVICES } from "@/data/services";
import {
  SITE_URL,
  BUSINESS_NAME,
  LOCALBIZ_ID,
  PRIMARY_AREAS,
} from "@/lib/site";

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
  const industry = getIndustry(slug);
  if (!industry) return {};

  const url = `${SITE_URL}/industries/${industry.slug}`;
  return {
    // seo.title carries no brand suffix — the root layout title template
    // ("%s | Branding Zombie Designs") appends it exactly once. Adding it here
    // too produced a doubled "… | Branding Zombie Designs | Branding Zombie Designs".
    title: industry.seo.title,
    description: industry.seo.description,
    keywords: industry.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: BUSINESS_NAME,
      title: industry.seo.title,
      description: industry.seo.description,
      images: [
        {
          url: "/assets/og-image.png",
          width: 1200,
          height: 630,
          alt: `${industry.name} branding by ${BUSINESS_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.seo.title,
      description: industry.seo.description,
      images: ["/assets/og-image.png"],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const url = `${SITE_URL}/industries/${industry.slug}`;
  const testimonial = industry.testimonialName
    ? REVIEWS.find((r) => r.name === industry.testimonialName)
    : undefined;
  const serviceNames = industry.servicesOffered
    .map((s) => SERVICES.find((x) => x.slug === s)?.name)
    .filter(Boolean)
    .join(", ");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${SITE_URL}/industries`,
      },
      { "@type": "ListItem", position: 3, name: industry.name, item: url },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Branding, web & print for ${industry.name}`,
    description: industry.seo.description,
    serviceType: serviceNames,
    provider: { "@id": LOCALBIZ_ID },
    areaServed: PRIMARY_AREAS.map((a) => ({ "@type": "Place", name: a })),
    url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main id="main-content" tabIndex={-1}>
        <IndustryPageBody industry={industry} testimonial={testimonial} />
      </main>
      <Footer />
    </>
  );
}
