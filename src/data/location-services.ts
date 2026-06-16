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

export interface LocationProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface LocationService {
  /** Must match a real ServiceSlug so we can deep-link to the full service page. */
  slug: ServiceSlug;
  /** Display label, e.g. "Web Design". */
  label: string;
  /** Noun used in headings, e.g. "website" → "your {town} website". */
  noun: string;
  /** Short phrase for the meta <title>, e.g. "Custom Websites". */
  metaTagline: string;
  /** Definitional phrase (no city) for the answer-first band + schema. */
  summary: string;
  /** Hero paragraph; the literal token {city} is replaced at render. */
  heroSubhead: string;
  /** Closing ownership line, e.g. "You own the website, the domain, and every file…". */
  ownershipLine: string;
  /** Price anchor used in the answer-first band + hero microproof. */
  priceAnchor: string;
  /** Typical delivery window. */
  timeline: string;
  /** Per-service 5-step process (service-specific copy). */
  process: LocationProcessStep[];
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
  metaTagline: "Custom Websites",
  summary:
    "custom, conversion-focused website design and development — mobile-first, local-SEO-ready",
  heroSubhead:
    "Custom, fast, conversion-built websites for {city} businesses — designed and built by one senior designer, not an agency assembly line.",
  ownershipLine: "You own the website, the domain, and every file on handoff.",
  priceAnchor: "from $1,500",
  timeline: "1–6 weeks",
  process: [
    {
      step: "01",
      title: "Free discovery call",
      body: "We talk through your business, your goals, and what your website needs to do. No pressure, no jargon — and a flat quote before anything starts.",
    },
    {
      step: "02",
      title: "Strategy & wireframes",
      body: "We map the pages, the messaging, and the path to a call or sale, so the design solves a business problem instead of just looking nice.",
    },
    {
      step: "03",
      title: "Design in the browser",
      body: "You see real, responsive pages early — not a static mockup — so we can react to how it actually feels on a phone and a desktop.",
    },
    {
      step: "04",
      title: "Build, copy & QA",
      body: "We write the copy, build it fast and clean, wire up local SEO and analytics, and test the site on every screen before it goes live.",
    },
    {
      step: "05",
      title: "You launch — and own it",
      body: "We launch, hand over the domain, hosting, and files, and show you how to run it. The site is yours, free and clear.",
    },
  ],
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

const BRANDING: LocationService = {
  slug: "branding",
  label: "Branding",
  noun: "brand",
  metaTagline: "Brand Identity, Logo & Print",
  summary:
    "a complete brand identity — logo suite, color, typography, voice, collateral, packaging, and the guidelines that keep it all consistent",
  heroSubhead:
    "Logo, color, type, voice, collateral, packaging, signage, and on-brand web — a complete identity for {city} businesses, built by one senior designer who also runs the print.",
  ownershipLine:
    "You own every logo, template, and source file on handoff.",
  priceAnchor: "from $2,500",
  timeline: "2–4 weeks",
  process: [
    {
      step: "01",
      title: "Brand brief & discovery",
      body: "We dig into your business, your customers, and your competitors to find the angle that makes you recognizable — not just another logo. Free, and it sets the direction for everything.",
    },
    {
      step: "02",
      title: "Strategy & positioning",
      body: "We lock the positioning, personality, and messaging first, so every visual decision after it has a reason behind it instead of being a matter of taste.",
    },
    {
      step: "03",
      title: "Identity & system design",
      body: "Logo suite, color, and type — designed as one system that holds together from a business card to a billboard, not a single mark that falls apart at other sizes.",
    },
    {
      step: "04",
      title: "Collateral & rollout",
      body: "We apply the identity to the pieces you actually use — cards, packaging, signage, social, and web — and prep print-ready and digital files for each.",
    },
    {
      step: "05",
      title: "Guidelines & handoff",
      body: "You get a brand guidelines document and every source file, so any printer, vendor, or future designer stays on-brand without you re-explaining it.",
    },
  ],
  heroImage: {
    src: "/assets/portfolio-brand.png",
    alt: "Complete brand identity system — logo, color, and collateral — by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/services/branding-design/ScaleHouse_BusinessCards-01.jpg",
    alt: "Branded business cards and collateral from a Branding Zombie Designs brand identity system",
  },
  subServices: [
    {
      name: "Brand strategy & positioning",
      blurb:
        "Before any pixels: who you are, who you're for, and why you're the obvious choice — the foundation every visual decision hangs on.",
    },
    {
      name: "Logo & mark suite",
      blurb:
        "Primary logo, secondary marks, a submark, and a favicon — every version you need for a sign, a shirt, and a 200×200 app icon.",
    },
    {
      name: "Color system",
      blurb:
        "A defined palette with exact HEX, RGB, and CMYK values, so your brand looks the same on a screen and off a press.",
    },
    {
      name: "Typography system",
      blurb:
        "A type hierarchy for headlines, body, and accents that stays legible and consistent across web, print, and packaging.",
    },
    {
      name: "Brand voice & messaging",
      blurb:
        "Tagline, key messages, and tone of voice — so your website, posts, and ads all sound like the same business.",
    },
    {
      name: "Visual identity / design system",
      blurb:
        "Reusable patterns, icons, layouts, and elements — a system that scales cleanly, not a one-off logo and a prayer.",
    },
    {
      name: "Brand guidelines document",
      blurb:
        "The rulebook that keeps every vendor, printer, and future designer on-brand without you re-explaining it each time.",
    },
    {
      name: "Collateral design",
      blurb:
        "Business cards, letterhead, flyers, brochures, menus, and one-sheets — the everyday pieces that carry your brand.",
    },
    {
      name: "Packaging & label design",
      blurb:
        "Retail-ready packaging and labels built to stand out on a shelf — with 15+ years of real CPG and print experience behind them.",
    },
    {
      name: "Print production & coordination",
      blurb:
        "We design AND print through an in-house wholesale pipeline — right bleed, trim, and dielines, one invoice, no two-vendor runaround.",
    },
    {
      name: "Signage & environmental",
      blurb:
        "Storefront signs, vehicle wraps, banners, and window graphics built from the same identity so your space matches your brand.",
    },
    {
      name: "Website & landing page design",
      blurb:
        "On-brand web design that carries the identity online — fast, mobile-first, and consistent with your print and packaging.",
    },
    {
      name: "Social media brand kit",
      blurb:
        "Profile art, post and story templates, and highlight covers so your feed is unmistakably yours from day one.",
    },
    {
      name: "Merch & apparel",
      blurb:
        "Shirts, hats, and swag designed to print clean and actually get worn — brand reach you don't pay for twice.",
    },
    {
      name: "Email & digital templates",
      blurb:
        "Branded email headers, newsletter layouts, and slide and deck templates so even internal docs stay on-brand.",
    },
    {
      name: "Brand refresh / rebrand",
      blurb:
        "Modernize a dated identity without throwing away the recognition you've built — we evolve it, we don't erase it.",
    },
  ],
  serviceFaqs: [
    {
      q: "What's included in a brand identity?",
      a: "A full brand identity covers strategy and positioning, a complete logo suite, a color and typography system, brand voice, and the guidelines that tie it together — plus the collateral (cards, packaging, social, web) where the brand actually shows up. It starts at $2,500, and the exact scope depends on how many pieces you need.",
    },
    {
      q: "What's the difference between a logo and branding?",
      a: "A logo is one piece; branding is the whole system around it — color, type, voice, collateral, and the rules that keep them consistent. A logo on its own gets copied and forgotten. A brand system is why customers recognize you on a sign, a truck, and a feed without reading the name.",
    },
    {
      q: "Do you handle the printing too, or just the design?",
      a: "Both. We design and print through an in-house wholesale pipeline — business cards, packaging, signage, the works — with the bleed, trim, and dielines right the first time. That means one invoice for design and print, instead of designing here and chasing a separate print shop there.",
    },
    {
      q: "Can you build the website as part of the branding?",
      a: "Yes. Web design is one of our core services, so we can take the new identity straight onto a fast, on-brand website and landing pages — no handoff gap where the site ends up looking nothing like the brand. We can bundle the site with the brand or phase it in later.",
    },
    {
      q: "How much does branding cost?",
      a: "Brand systems start at $2,500 and scale with scope — a logo-and-essentials package versus a full identity with packaging, collateral, and web. You get a flat quote up front with no hourly surprises, and you own every source file on handoff.",
    },
    {
      q: "How long does a brand identity take?",
      a: "Most brand systems take 2 to 4 weeks depending on how many deliverables are involved. Strategy and the logo suite come first; collateral, packaging, and web roll out from there. One senior designer runs the whole thing, so it moves faster than an agency hand-off chain.",
    },
  ],
  relatedServices: ["logo-design", "web-design", "print-design", "social-media"],
  schema: {
    serviceType: "Brand identity and graphic design",
    category: "Branding",
  },
};

export const LOCATION_SERVICES: Partial<Record<ServiceSlug, LocationService>> = {
  "web-design": WEB_DESIGN,
  branding: BRANDING,
  // Expansion (pure data entry — add a config block and the route picks it up):
  // "logo-design": LOGO_DESIGN,
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
