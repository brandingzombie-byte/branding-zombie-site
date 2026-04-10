// Server component — no "use client" directive.
// Emits the three JSON-LD scripts we need per service landing page:
// 1. A focused Service schema (with provider @id linking to the LocalBusiness
//    already declared in src/app/layout.tsx, so no duplication).
// 2. A BreadcrumbList: Home → Services → [Service Name].
// 3. A page-specific FAQPage built from service.faqs.

import {
  SITE_URL,
  LOCALBIZ_ID,
  ORG_ID,
  AREAS_SERVED,
} from "@/lib/site";
import type { Service } from "@/data/services";

function buildServiceSchema(service: Service) {
  const pageUrl = `${SITE_URL}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    description: service.schema.description,
    serviceType: service.schema.serviceType,
    category: service.schema.category,
    url: pageUrl,
    image: `${SITE_URL}${service.meta.ogImage}`,
    provider: { "@id": LOCALBIZ_ID },
    brand: { "@id": ORG_ID },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Small businesses in Cumming, GA, Forsyth County and North Metro Atlanta",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Deliverables`,
      itemListElement: service.deliverables.map((d) => ({
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
      price: service.pricing.numericPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };
}

function buildBreadcrumbSchema(service: Service) {
  return {
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
        name: service.name,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };
}

function buildFaqSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export default function ServiceJsonLd({ service }: { service: Service }) {
  const serviceSchema = buildServiceSchema(service);
  const breadcrumbSchema = buildBreadcrumbSchema(service);
  const faqSchema = buildFaqSchema(service);

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
