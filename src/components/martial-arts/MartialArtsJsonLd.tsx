// JSON-LD for the /martial-arts-gym-branding page (pillar + per-city). Emits:
//  1. Service — areaServed scoped to the page, provider linked by @id to the
//     LocalBusiness in layout.tsx, with an OfferCatalog of the 6 services.
//  2. FAQPage — the product FAQs (+ the city FAQ on city pages).
//  3. BreadcrumbList — Home → Martial Arts & Gym Branding (→ City).
//  4. WebPage — ties the page to the founder + website graph (E-E-A-T).
//
// Mirrors src/components/tattoo/TattooJsonLd.tsx.

import {
  SITE_URL,
  LOCALBIZ_ID,
  ORG_ID,
  WEBSITE_ID,
  FOUNDER_ID,
  AREAS_SERVED,
} from "@/lib/site";
import type { MartialArtsProduct, MAFaq } from "@/data/martial-arts-marketing";
import type { Location } from "@/data/locations";

export default function MartialArtsJsonLd({
  product,
  city,
  cityFaq,
}: {
  product: MartialArtsProduct;
  city?: Location;
  cityFaq?: MAFaq;
}) {
  const pageUrl = city
    ? `${SITE_URL}/${product.slug}/${city.slug}`
    : `${SITE_URL}/${product.slug}`;
  const cityLabel = city ? `${city.city}, ${city.state}` : null;
  const serviceName = cityLabel
    ? `${product.label} in ${cityLabel}`
    : `${product.label} — Cumming, GA & North Atlanta`;

  const areaServed = city
    ? [
        {
          "@type": "City",
          name: city.city,
          ...(city.lat && city.lon
            ? { geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lon } }
            : {}),
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: `${city.county}, ${city.state}`,
          },
        },
        ...city.nearby.map((name) => ({ "@type": "Place", name })),
      ]
    : AREAS_SERVED.map((name) => ({ "@type": "Place", name }));

  const offerings = product.services.map((s) => ({
    name: s.title,
    description: s.body,
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: serviceName,
    description: product.answerFirst,
    serviceType: product.schema.serviceType,
    category: product.schema.category,
    url: pageUrl,
    image: `${SITE_URL}${product.hero.image.src}`,
    provider: { "@id": LOCALBIZ_ID },
    brand: { "@id": ORG_ID },
    areaServed,
    audience: {
      "@type": "BusinessAudience",
      audienceType: city
        ? `Martial arts schools and gyms in ${city.city}, ${city.county} and North Metro Atlanta`
        : "Martial arts schools, dojos, and gyms & fitness studios in Cumming, Forsyth County and North Metro Atlanta",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${product.label} services`,
      itemListElement: offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name, description: o.description },
      })),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `${product.label} — flat pricing, logo from $750`,
      availability: "https://schema.org/InStock",
      url: `${pageUrl}#quote`,
    },
  };

  const faqEntries = [...(cityFaq ? [cityFaq] : []), ...product.faqs];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqEntries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: product.shortLabel,
      item: `${SITE_URL}/${product.slug}`,
    },
    ...(cityLabel
      ? [{ "@type": "ListItem", position: 3, name: cityLabel, item: pageUrl }]
      : []),
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: serviceName,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${pageUrl}#service` },
    primaryImageOfPage: `${SITE_URL}${product.hero.image.src}`,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
    </>
  );
}
