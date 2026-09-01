import type { Metadata } from "next";
import { SITE_URL, INDEXABLE_CITY } from "@/lib/site";
import type { MartialArtsProduct } from "@/data/martial-arts-marketing";
import type { Location } from "@/data/locations";

// Builds per-page Next metadata for the martial-arts-gym-branding pillar +
// city pages. Mirrors src/lib/tattooMeta.ts: keeps the pillar's hand-written
// SEO copy, and generates localized title / description / keywords +
// canonical for each city variant.
export function martialArtsMetadata(
  product: MartialArtsProduct,
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
    ? `Martial Arts Gym & Fitness Studio Branding in ${city.city}, ${city.state}`
    : product.seoTitle;
  const ogTitle = `${title} | Branding Zombie Designs`;

  // Index diet: the pillar and the Cumming variant are indexable; the other
  // city variants stay live and crawlable (follow) but noindexed so they stop
  // burning crawl priority as near-duplicate doorways. Canonical stays
  // self-referential — Google ignores canonicals on noindexed pages.
  const indexable = !city || city.slug === INDEXABLE_CITY;

  const description = city
    ? `Logo, brand system and enrollment-ready websites for martial arts schools, dojos and fitness studios in ${city.city}, ${city.county}. Logo $750 · brand system $2,500 · site from $1,500. Book a free brand teardown.`
    : product.seoDescription;

  const keywords = city
    ? [
        `martial arts gym branding ${city.city} GA`,
        `gym branding ${city.city}`,
        `martial arts school marketing ${city.city} ${city.state}`,
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
