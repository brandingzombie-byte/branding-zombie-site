// JSON-LD for the /window-clings page (pillar + per-city). Emits:
//  1. Service — areaServed scoped to the page, provider linked by @id to the
//     LocalBusiness in layout.tsx, with an OfferCatalog of design / print /
//     install. Pricing is quote-only, so we emit an Offer WITHOUT a numeric
//     price (a price of "0" would be wrong/misleading) — availability + url only.
//  2. FAQPage — the product FAQs (+ the city FAQ on city pages).
//  3. BreadcrumbList — Home → Window Graphics (→ City).
//  4. WebPage — ties the page to the founder + website graph (E-E-A-T).

import {
  SITE_URL,
  LOCALBIZ_ID,
  ORG_ID,
  WEBSITE_ID,
  FOUNDER_ID,
  AREAS_SERVED,
} from "@/lib/site";
import type { WindowClingsProduct, WCFaq } from "@/data/window-clings";
import type { Location } from "@/data/locations";

export default function WindowClingsJsonLd({
  product,
  city,
  cityFaq,
}: {
  product: WindowClingsProduct;
  city?: Location;
  cityFaq?: WCFaq;
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

  const offerings = [
    { name: "Window graphic design", description: "Custom cling, decal, or storefront graphic designed to fit your glass." },
    { name: "Window film & cling printing", description: "Printed in-house on the right film — perforated, clear, frosted, or opaque." },
    { name: "On-site installation", description: "Measured, applied flat and bubble-free on your storefront, door, or office glass." },
  ];

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
        ? `Small businesses in ${city.city}, ${city.county} and North Metro Atlanta`
        : "Small businesses in Cumming, Forsyth County and North Metro Atlanta",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${product.label} services`,
      itemListElement: offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name, description: o.description },
      })),
    },
    // Quote-only: advertise availability + a request-a-quote URL, no numeric price.
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `${product.label} — quoted flat per job`,
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
