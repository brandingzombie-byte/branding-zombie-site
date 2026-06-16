// JSON-LD for a /services/[slug]/[city] location page. Emits four nodes:
//  1. Service — scoped to the city (areaServed = the town + county), provider
//     linked by @id to the LocalBusiness in layout.tsx, with an OfferCatalog of
//     every sub-service so "do they build Shopify sites in Alpharetta?" resolves.
//  2. FAQPage — the city FAQs + the service FAQs shown on the page (markup must
//     match visible text — both are rendered in LocationPageBody).
//  3. BreadcrumbList — Home → Services → [Service] → [City].
//  4. WebPage — ties the page to the founder + website graph.

import { SITE_URL, LOCALBIZ_ID, ORG_ID, WEBSITE_ID, FOUNDER_ID } from "@/lib/site";
import type { Location } from "@/data/locations";
import type { LocationService } from "@/data/location-services";

export default function LocationJsonLd({
  svc,
  loc,
}: {
  svc: LocationService;
  loc: Location;
}) {
  const pageUrl = `${SITE_URL}/services/${svc.slug}/${loc.slug}`;
  const cityLabel = `${loc.city}, ${loc.state}`;
  const serviceName = `${svc.label} in ${cityLabel}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: serviceName,
    description: `${svc.label} for ${loc.city}, ${loc.county} businesses — ${svc.priceAnchor}, delivered in ${svc.timeline}. Custom design, local SEO, and you own every file.`,
    serviceType: svc.schema.serviceType,
    category: svc.schema.category,
    url: pageUrl,
    image: `${SITE_URL}${svc.heroImage.src}`,
    provider: { "@id": LOCALBIZ_ID },
    brand: { "@id": ORG_ID },
    areaServed: [
      {
        "@type": "City",
        name: loc.city,
        ...(loc.lat && loc.lon
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: loc.lat,
                longitude: loc.lon,
              },
            }
          : {}),
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${loc.county}, ${loc.state}`,
        },
      },
      ...loc.nearby.map((name) => ({ "@type": "Place", name })),
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: `Small businesses in ${loc.city}, ${loc.county} and North Metro Atlanta`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${svc.label} services in ${cityLabel}`,
      itemListElement: svc.subServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.blurb,
          areaServed: { "@type": "City", name: loc.city },
        },
      })),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: svc.priceAnchor.replace(/[^\d]/g, ""),
      description: `${svc.label} ${svc.priceAnchor}`,
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "City", name: loc.city },
      url: pageUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: [...loc.cityFaqs, ...svc.serviceFaqs].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
        name: svc.label,
        item: `${SITE_URL}/services/${svc.slug}`,
      },
      { "@type": "ListItem", position: 4, name: cityLabel, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: serviceName,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${pageUrl}#service` },
    primaryImageOfPage: `${SITE_URL}${svc.heroImage.src}`,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
