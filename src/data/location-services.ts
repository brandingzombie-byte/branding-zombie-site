// ─── Per-service config for the city landing pages ──────────────────────────
// The /services/[slug]/[city] route only renders for service slugs that have an
// entry here. To launch location pages for a NEW service, add a config block —
// the route, components, schema, sitemap, and llms.txt all pick it up
// automatically. We're launching web-design first; the others are scaffolded
// (commented) so expanding is pure data entry.
//
// The city-specific text lives in src/data/locations.ts. THIS file holds the
// service angle: the sub-services to spell out, the proof framing, the service
// FAQs (city-agnostic — they may say "your town"), and the assets to show.

import type { ServiceSlug } from "@/data/services";

export interface LocationSubService {
  /** Specific, searchable sub-service name. */
  name: string;
  /** One-line plain-English blurb of what it is / why it matters. */
  blurb: string;
}

export interface LocationServiceFaq {
  q: string;
  a: string;
}

export interface LocationServiceImage {
  src: string;
  /** Alt text WITHOUT the city — the page appends ", {City}, GA" for locality. */
  alt: string;
}

export interface LocationService {
  /** Must match a real ServiceSlug so we can deep-link to the full service page. */
  slug: ServiceSlug;
  /** Display label, e.g. "Web Design". */
  label: string;
  /** Noun used in headings, e.g. "website" → "your {town} website". */
  noun: string;
  /** Price anchor used in the answer-first band + hero microproof. */
  priceAnchor: string;
  /** Typical delivery window. */
  timeline: string;
  /** Hero image shared across cities (alt gets the city appended). */
  heroImage: LocationServiceImage;
  /** Secondary in-body image (real portfolio/site asset). */
  bodyImage: LocationServiceImage;
  /** The specific services + sub-services we spell out on every city page. */
  subServices: LocationSubService[];
  /** Service-level FAQs (city-agnostic). City FAQs come from locations.ts. */
  serviceFaqs: LocationServiceFaq[];
  /** ServiceSlugs to cross-sell at the bottom (drives internal links). */
  relatedServices: ServiceSlug[];
  /** Schema serviceType + category for the city-scoped Service node. */
  schema: { serviceType: string; category: string };
}

const WEB_DESIGN: LocationService = {
  slug: "web-design",
  label: "Web Design",
  noun: "website",
  priceAnchor: "from $1,500",
  timeline: "1–6 weeks",
  heroImage: {
    src: "/assets/services/web-design/hero.png",
    alt: "Custom small-business website being designed on a dark editorial desktop by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/portfolio-web.png",
    alt: "Responsive small-business website built by Branding Zombie Designs shown on laptop and phone",
  },
  subServices: [
    {
      name: "Custom website design (no templates)",
      blurb:
        "Every site is designed from scratch around your brand and your customers — never a reskinned theme everyone else is using.",
    },
    {
      name: "Next.js & React development",
      blurb:
        "Modern, fast, secure builds on the same framework the big brands use — not a plugin tower that breaks on the next update.",
    },
    {
      name: "WordPress websites",
      blurb:
        "Prefer WordPress so your team can edit it? We build clean, fast WordPress sites you actually own and can manage.",
    },
    {
      name: "Shopify & ecommerce storefronts",
      blurb:
        "Sell online with a custom Shopify or store build — product pages, checkout, and integrations that move product.",
    },
    {
      name: "Landing pages & campaign funnels",
      blurb:
        "Single-purpose pages built to convert ad and email traffic into calls, bookings, and sales.",
    },
    {
      name: "Website redesigns & rebuilds",
      blurb:
        "Stuck with a slow, dated, or DIY site? We rebuild it modern and fast without losing your Google rankings.",
    },
    {
      name: "Mobile-first responsive design",
      blurb:
        "Built phone-first, because that's where most local searches happen — flawless on every screen size.",
    },
    {
      name: "Page speed & Core Web Vitals",
      blurb:
        "We ship 90+ performance scores by default. Fast sites rank higher and lose fewer customers in the first three seconds.",
    },
    {
      name: "Local SEO & schema setup",
      blurb:
        "Local business schema, location pages, and on-page SEO so you show up for \"near me\" and town-specific searches.",
    },
    {
      name: "Google Business Profile integration",
      blurb:
        "Your site, map listing, reviews, and contact info wired together so Google trusts and ranks the whole package.",
    },
    {
      name: "Copywriting & content",
      blurb:
        "We write the pages too — clear, on-brand copy that sells, included in the build so you're not staring at a blank page.",
    },
    {
      name: "Accessibility (WCAG) & SEO foundations",
      blurb:
        "Clean semantic markup, alt text, and accessible contrast — better for every visitor and for search engines.",
    },
    {
      name: "AI answer-engine optimization (AEO)",
      blurb:
        "Structured so ChatGPT, Gemini, and Google's AI can read and recommend you — not just the old blue-link search.",
    },
    {
      name: "Hosting, domain & analytics setup",
      blurb:
        "We handle hosting, domain, SSL, and analytics so it's live and measurable — and you keep ownership of all of it.",
    },
    {
      name: "Maintenance & care plans",
      blurb:
        "Optional ongoing updates, backups, and edits — month-to-month, never a contract holding your site hostage.",
    },
    {
      name: "Conversion rate optimization (CRO)",
      blurb:
        "Clear calls to action, fast forms, and click-to-call wired in so traffic actually turns into customers.",
    },
  ],
  serviceFaqs: [
    {
      q: "How much does a website cost?",
      a: "Most small-business sites land between $1,500 and $7,500 depending on page count and features, with flat pricing quoted up front — no hourly surprises. Simple sites start around $1,500; a full multi-page site with copy, local SEO, and a CMS is typically $4,500. You'll get an exact number before we start.",
    },
    {
      q: "How fast can you build my website?",
      a: "Most sites launch in 1 to 6 weeks. A focused landing page or small site can go live in days; a larger multi-page build with custom copy and photography takes a few weeks. We move fast because one senior designer takes it start to finish — no junior hand-offs or offshore chain.",
    },
    {
      q: "Will I own the site, the domain, and the files?",
      a: "Yes — completely. You own the domain, the hosting account, the design files, and the code on handoff. There's no monthly hostage fee and nothing locked to our platform. If you ever leave, you take everything with you.",
    },
    {
      q: "How is this different from a $99/month Wix or Squarespace site?",
      a: "Those are templates you rent and maintain yourself — they get slower as you add to them and you pay forever. We custom-build a faster site you own, set up local SEO and Google Business from day one, and write the copy for you. Hosting is roughly $20/month and the site is yours.",
    },
    {
      q: "Will my site rank on Google for my town?",
      a: "That's built in. Every site ships with local business schema, town-specific pages, fast Core Web Vitals, and Google Business Profile setup — the foundation Google uses to rank you for local and \"near me\" searches. We also structure pages so AI engines like ChatGPT and Gemini can cite you.",
    },
    {
      q: "Do you write the content, or do I have to?",
      a: "We write it. Clear, on-brand page copy is included in the build — you're not handed an empty template. We'll interview you, pull from what you already have, and write pages that actually sell. You review and approve before launch.",
    },
  ],
  relatedServices: ["logo-design", "branding", "digital-marketing", "ecommerce"],
  schema: {
    serviceType: "Web design and development",
    category: "Web Design",
  },
};

export const LOCATION_SERVICES: Partial<Record<ServiceSlug, LocationService>> = {
  "web-design": WEB_DESIGN,
  // Expansion (pure data entry — add a config block and the route picks it up):
  // "logo-design": LOGO_DESIGN,
  // "branding": BRANDING,
  // "ecommerce": ECOMMERCE,
  // "print-design": PRINT_DESIGN,
  // "social-media": SOCIAL_MEDIA,
  // "digital-marketing": DIGITAL_MARKETING,
  // "ai-workflows": AI_WORKFLOWS,
};

export function getLocationService(
  slug: string,
): LocationService | undefined {
  return LOCATION_SERVICES[slug as ServiceSlug];
}

export function getAllLocationServiceSlugs(): ServiceSlug[] {
  return Object.keys(LOCATION_SERVICES) as ServiceSlug[];
}
