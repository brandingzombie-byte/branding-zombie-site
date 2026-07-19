import type { MetadataRoute } from "next";
import { SITE_URL, INDEXABLE_CITY } from "@/lib/site";
import { getAllSlugs } from "@/data/services";
import { getAllPosts } from "@/data/posts";
import { getAllIndustrySlugs } from "@/data/industries";
import { getAllLocationServiceSlugs } from "@/data/location-services";
import { getAllMailerSlugs } from "@/data/mailer-products";
import { WINDOW_CLINGS_CITY_COPY } from "@/data/window-clings";
import { TATTOO_CITY_COPY } from "@/data/tattoo-marketing";

// Dynamic sitemap. Canonical pages only — Google does not index URL
// fragments (#services, #pricing, etc.) as separate entries, so they are
// omitted here. City variants outside INDEXABLE_CITY are noindexed (see the
// city templates' robots meta) and therefore excluded too: a noindexed URL
// in the sitemap is a contradiction Google flags.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Blog posts use their own published date so Google can tell when a post
  // actually changed vs when the site last deployed.
  const blogPosts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.meta.slug}`,
    lastModified: new Date(p.meta.dateModified ?? p.meta.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = getAllIndustrySlugs().map((slug) => ({
    url: `${SITE_URL}/industries/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // City landing pages: every enabled service × the indexable city only.
  // The other 9 city variants per service are noindexed.
  const locationPages = getAllLocationServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}/${INDEXABLE_CITY}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  // Direct Mail & EDDM: pillar pages + the indexable city variation only.
  const mailerPillars = getAllMailerSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const mailerCityPages = getAllMailerSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/${INDEXABLE_CITY}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  // Window graphics & clings: pillar page + the indexable city only.
  const windowClingsPillar = {
    url: `${SITE_URL}/window-clings`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };
  const windowClingsCityPages = Object.keys(WINDOW_CLINGS_CITY_COPY)
    .filter((city) => city === INDEXABLE_CITY)
    .map((city) => ({
      url: `${SITE_URL}/window-clings/${city}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    }));

  // Tattoo shop marketing: pillar page + the indexable city only.
  const tattooPillar = {
    url: `${SITE_URL}/tattoo-shop-marketing`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };
  const tattooCityPages = Object.keys(TATTOO_CITY_COPY)
    .filter((city) => city === INDEXABLE_CITY)
    .map((city) => ({
      url: `${SITE_URL}/tattoo-shop-marketing/${city}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...industryPages,
    ...servicePages,
    ...locationPages,
    ...mailerPillars,
    ...mailerCityPages,
    windowClingsPillar,
    ...windowClingsCityPages,
    tattooPillar,
    ...tattooCityPages,
    {
      url: `${SITE_URL}/services/launch-package`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/cpg-launch`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/startup-special`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/authors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/booklogix`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/free-site-audit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/play`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
