import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import type { TattooProduct } from "@/data/tattoo-marketing";
import type { Location } from "@/data/locations";

// Builds per-page Next metadata for the tattoo-shop-marketing pillar + city
// pages. Keeps the pillar's hand-written SEO copy, and generates localized
// title / description / keywords + canonical for each city variant.
export function tattooMetadata(
  product: TattooProduct,
  city?: Location,
): Metadata {
  const url = city
    ? `${SITE_URL}/${product.slug}/${city.slug}`
    : `${SITE_URL}/${product.slug}`;

  const title = city
    ? `Tattoo Shop Marketing in ${city.city}, ${city.state} | Branding Zombie`
    : product.seoTitle;

  const description = city
    ? `Websites with online booking + reference upload, branding, print, window clings & aftercare kits for tattoo shops in ${city.city}, ${city.county}. Flat pricing, live in days. Book a free teardown.`
    : product.seoDescription;

  const keywords = city
    ? [
        `tattoo shop marketing ${city.city} GA`,
        `tattoo shop website design ${city.city}`,
        `tattoo studio branding ${city.city} ${city.state}`,
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
      images: [
        { url: ogImage, width: 1200, height: 630, alt: product.hero.image.alt },
      ],
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
