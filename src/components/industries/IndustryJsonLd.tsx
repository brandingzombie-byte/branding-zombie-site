// Server component — emits the JSON-LD for an industry landing page:
// 1. A Service schema scoped to the industry, provider @id-linked to the
//    LocalBusiness declared in app/layout.tsx (no duplication of NAP/geo).
// 2. A BreadcrumbList: Home → Industries → [Industry Name].
// 3. A FAQPage built from the industry's FAQs (machine-readable Q&A pairs — the
//    format AI engines extract and cite, even though FAQ rich results retired).
//
// The Service `description` uses the industry's answer-first sentence so the
// passage an LLM is most likely to lift names the business, the place, and the
// specific deliverables.

import { SITE_URL, LOCALBIZ_ID, ORG_ID, AREAS_SERVED } from "@/lib/site";
import type { Industry } from "@/data/industries";

function buildServiceSchema(ind: Industry) {
  const pageUrl = `${SITE_URL}/industries/${ind.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${ind.name} — Design, Web & Print`,
    description: ind.answerFirst,
    serviceType: ind.schema.serviceType,
    category: ind.schema.category,
    url: pageUrl,
    image: `${SITE_URL}${ind.meta.ogImage}`,
    provider: { "@id": LOCALBIZ_ID },
    brand: { "@id": ORG_ID },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    audience: {
      "@type": "Audience",
      audienceType: ind.name,
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Cumming, GA, Forsyth County and North Metro Atlanta",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${ind.name} Services`,
      itemListElement: ind.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d.title,
          description: d.description,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      price: ind.pricing.numericPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };
}

function buildBreadcrumbSchema(ind: Industry) {
  return {
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
      {
        "@type": "ListItem",
        position: 3,
        name: ind.name,
        item: `${SITE_URL}/industries/${ind.slug}`,
      },
    ],
  };
}

function buildFaqSchema(ind: Industry) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ind.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export default function IndustryJsonLd({ industry }: { industry: Industry }) {
  const serviceSchema = buildServiceSchema(industry);
  const breadcrumbSchema = buildBreadcrumbSchema(industry);
  const faqSchema = buildFaqSchema(industry);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
