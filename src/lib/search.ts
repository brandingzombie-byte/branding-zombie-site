// ─── Site search index — single source of truth for header search ──────────
// The site is small and fully static, so we build a flat in-memory index from
// the same typed data that powers the pages (services, posts, portfolio) plus
// a curated list of standalone routes. No backend, no build step. Fuse.js gives
// typo-tolerant fuzzy matching over ~25 docs — plenty for a brochure site.

import Fuse from "fuse.js";
import { SERVICES } from "@/data/services";
import { getAllPosts } from "@/data/posts";
import { PORTFOLIO } from "@/data/portfolio";
import { INDUSTRIES } from "@/data/industries";

export type SearchType = "Service" | "Industry" | "Article" | "Work" | "Page";

export interface SearchDoc {
  title: string;
  href: string;
  type: SearchType;
  /** One-line context shown under the title in results. */
  subtitle?: string;
  /** Extra terms folded into matching but not displayed. */
  keywords: string;
}

// Curated standalone routes that aren't generated from a data file.
const STATIC_PAGES: SearchDoc[] = [
  { title: "Home", href: "/", type: "Page", subtitle: "Branding Zombie Designs", keywords: "home start landing" },
  { title: "Services", href: "/services", type: "Page", subtitle: "Everything we do", keywords: "services offerings what we do" },
  { title: "Industries", href: "/industries", type: "Page", subtitle: "Who we work with", keywords: "industries trades restaurants who we serve niche" },
  { title: "Local Business Kit", href: "/services/launch-package", type: "Page", subtitle: "Logo + site + print + Google, bundled — $2,800", keywords: "local business kit launch package bundle startup new business" },
  { title: "Pricing", href: "/#pricing", type: "Page", subtitle: "Packages & pricing", keywords: "pricing cost price packages how much" },
  { title: "Work", href: "/work", type: "Page", subtitle: "Selected projects", keywords: "work portfolio projects examples case studies" },
  { title: "Blog", href: "/blog", type: "Page", subtitle: "Articles & guides", keywords: "blog articles guides writing news" },
  { title: "About", href: "/about", type: "Page", subtitle: "About Gerry & the studio", keywords: "about gerry betancourt studio story team" },
  { title: "Contact", href: "/contact", type: "Page", subtitle: "Get in touch", keywords: "contact email phone call message reach" },
  { title: "Free Site Audit", href: "/free-site-audit", type: "Page", subtitle: "Free website audit", keywords: "free site audit review website feedback critique" },
  { title: "Request a Quote", href: "/services/request-quote", type: "Page", subtitle: "Tell us about your project", keywords: "quote estimate request proposal pricing inquiry" },
  { title: "Direct Mail", href: "/direct-mail", type: "Page", subtitle: "Direct mail campaigns", keywords: "direct mail postcards mailers print campaign" },
  { title: "EDDM", href: "/eddm", type: "Page", subtitle: "Every Door Direct Mail", keywords: "eddm every door direct mail usps postcards saturation" },
  { title: "Startup Special", href: "/startup-special", type: "Page", subtitle: "New-business offer", keywords: "startup special new business deal discount offer" },
  { title: "CPG Launch", href: "/cpg-launch", type: "Page", subtitle: "Packaging & label launch", keywords: "cpg packaging label product launch consumer goods" },
  { title: "Tap (NFC)", href: "/tap", type: "Page", subtitle: "NFC review & contact cards", keywords: "tap nfc smart card review google contactless" },
];

let cachedDocs: SearchDoc[] | null = null;
let cachedFuse: Fuse<SearchDoc> | null = null;

/** Build (and memoize) the flat list of searchable documents. */
export function getSearchDocs(): SearchDoc[] {
  if (cachedDocs) return cachedDocs;

  const services: SearchDoc[] = SERVICES.map((s) => ({
    title: s.name,
    href: `/services/${s.slug}`,
    type: "Service",
    subtitle: s.tagline,
    keywords: [s.shortName, s.hook ?? "", s.homeCardDescription, s.homeCardPrice]
      .filter(Boolean)
      .join(" "),
  }));

  const industries: SearchDoc[] = INDUSTRIES.map((ind) => ({
    title: ind.name,
    href: `/industries/${ind.slug}`,
    type: "Industry",
    subtitle: ind.subhead,
    keywords: [ind.navLabel, ind.eyebrow, ...ind.seo.keywords].join(" "),
  }));

  const articles: SearchDoc[] = getAllPosts().map((p) => ({
    title: p.meta.title,
    href: `/blog/${p.meta.slug}`,
    type: "Article",
    subtitle: p.meta.excerpt,
    keywords: [p.meta.category, ...p.meta.tags, ...p.meta.keywords].join(" "),
  }));

  const work: SearchDoc[] = PORTFOLIO.map((w) => ({
    title: w.title,
    // Portfolio items live on the /work grid; deep external links if present.
    href: w.href ?? "/work",
    type: "Work",
    subtitle: w.brand ? `${w.brand} — ${w.description}` : w.description,
    keywords: [w.brand ?? "", w.industry ?? "", ...(w.formats ?? [])]
      .filter(Boolean)
      .join(" "),
  }));

  cachedDocs = [...services, ...industries, ...articles, ...work, ...STATIC_PAGES];
  return cachedDocs;
}

function getFuse(): Fuse<SearchDoc> {
  if (cachedFuse) return cachedFuse;
  cachedFuse = new Fuse(getSearchDocs(), {
    includeScore: false,
    threshold: 0.4, // typo-tolerant but not loose
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: [
      { name: "title", weight: 0.6 },
      { name: "subtitle", weight: 0.25 },
      { name: "keywords", weight: 0.15 },
    ],
  });
  return cachedFuse;
}

/** Run a query against the index. Empty query returns no results. */
export function search(query: string, limit = 8): SearchDoc[] {
  const q = query.trim();
  if (!q) return [];
  return getFuse()
    .search(q)
    .slice(0, limit)
    .map((r) => r.item);
}
