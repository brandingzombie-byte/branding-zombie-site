import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import type { MailerProduct } from "@/data/mailer-products";
import type { Location } from "@/data/locations";

// Builds per-page Next metadata for the mailer pillar + city pages. Keeps the
// pillar's hand-written SEO copy, and generates localized title/description/
// keywords + canonical for each city variant.
export function mailerMetadata(product: MailerProduct, city?: Location): Metadata {
  const url = city
    ? `${SITE_URL}/${product.slug}/${city.slug}`
    : `${SITE_URL}/${product.slug}`;
  const verb = product.kind === "eddm" ? "Routed" : "Mailed";

  const title = city
    ? `${product.shortLabel} in ${city.city}, ${city.state} — Designed, Printed & ${verb} | Branding Zombie`
    : product.seoTitle;

  const description = city
    ? `${product.shortLabel} for ${city.city}, ${city.county} businesses. We design, print, and ${
        product.kind === "eddm"
          ? "route it to every door on the carrier routes you pick"
          : "mail it to your list or one we build"
      } — ${product.specs.priceAnchor.toLowerCase()}. Get a free, flat quote.`
    : product.seoDescription;

  const keywords = city
    ? [
        `${product.shortLabel.toLowerCase()} ${city.city} GA`,
        `${product.kind === "eddm" ? "eddm" : "direct mail"} ${city.city}`,
        `mailers ${city.city} ${city.state}`,
        ...product.keywords,
      ]
    : product.keywords;

  const ogImage = `${SITE_URL}${product.ogImage}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Branding Zombie Designs",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.hero.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
