import type { Metadata } from "next";
import { SITE_URL, INDEXABLE_CITY } from "@/lib/site";
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

  // Root layout applies the "%s | Branding Zombie Designs" title template, so
  // the brand is intentionally omitted here to avoid a doubled suffix. The
  // og/twitter titles below carry the full brand since the template only
  // wraps the document <title>.
  const title = city
    ? `Tattoo Shop Marketing in ${city.city}, ${city.state}`
    : product.seoTitle;
  const ogTitle = `${title} | Branding Zombie Designs`;

  // Index diet: the pillar and the Cumming variant are indexable; the other
  // city variants stay live and crawlable (follow) but noindexed so they stop
  // burning crawl priority as near-duplicate doorways. Canonical stays
  // self-referential — Google ignores canonicals on noindexed pages.
  const indexable = !city || city.slug === INDEXABLE_CITY;

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
      title: ogTitle,
      description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: product.hero.image.alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}
