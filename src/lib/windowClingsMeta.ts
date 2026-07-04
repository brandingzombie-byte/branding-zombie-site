import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import type { WindowClingsProduct } from "@/data/window-clings";
import type { Location } from "@/data/locations";

// Builds per-page Next metadata for the window-graphics pillar + city pages.
// Keeps the pillar's hand-written SEO copy, and generates localized title /
// description / keywords + canonical for each city variant. No price appears in
// any copy — window-graphics pricing is quote-only by owner direction.
export function windowClingsMetadata(
  product: WindowClingsProduct,
  city?: Location,
): Metadata {
  const url = city
    ? `${SITE_URL}/${product.slug}/${city.slug}`
    : `${SITE_URL}/${product.slug}`;

  const title = city
    ? `Window Graphics in ${city.city}, ${city.state} — Designed, Printed & Installed | Branding Zombie`
    : product.seoTitle;

  const description = city
    ? `Custom window clings, decals & storefront graphics for ${city.city}, ${city.county} businesses. We design it, print it, and install it on your glass — one-way vision, frosted privacy, clear clings, full window walls. One shop, one invoice, free flat quote.`
    : product.seoDescription;

  const keywords = city
    ? [
        `window graphics ${city.city} GA`,
        `window clings ${city.city}`,
        `storefront decals ${city.city} ${city.state}`,
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
