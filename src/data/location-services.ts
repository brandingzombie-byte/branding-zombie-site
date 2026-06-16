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
  /** Short duration label for the microproof chip + schema, e.g. "1–6 weeks". */
  timeline: string;
  /** Natural sentence fragment for prose, e.g. "delivered in 1–6 weeks" or
   *  "ongoing and month-to-month" — lets recurring services read correctly. */
  deliveryPhrase: string;
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
  deliveryPhrase: "delivered in 1–6 weeks",
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
  deliveryPhrase: "delivered in 2–4 weeks",
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

// ─── Local SEO & Digital Marketing — the most fleshed-out service (recurring,
// high-ticket; built to out-depth competitors who stop at basic local SEO). ──
const SEO: LocationService = {
  slug: "digital-marketing",
  label: "Local SEO",
  noun: "search presence",
  metaTagline: "Local SEO & AI Search",
  summary:
    "local SEO, Google Business Profile management, and AI-search optimization (AEO/GEO) that gets you found on Google's map pack and organic results AND cited by ChatGPT, Gemini, and Perplexity",
  heroSubhead:
    "Local SEO and AI-search optimization for {city} businesses — get found in Google's map pack, the organic results, AND the AI answers from ChatGPT, Gemini, and Perplexity.",
  ownershipLine:
    "You own every profile, listing, and report — month-to-month, no contract holding it hostage.",
  priceAnchor: "from $499/mo",
  timeline: "month-to-month",
  deliveryPhrase: "ongoing and month-to-month, with first gains typically in 60–90 days",
  process: [
    {
      step: "01",
      title: "Audit & baseline",
      body: "We measure where you rank now — map pack, organic, and AI answers — audit your profile and site, and find the gaps your competitors are leaving open.",
    },
    {
      step: "02",
      title: "Foundation & fixes",
      body: "Google Business Profile, citations and NAP, schema, and technical fixes come first — the groundwork Google and AI engines use to trust and rank you.",
    },
    {
      step: "03",
      title: "Content & AEO",
      body: "Local, question-answering pages and posts built to win the map pack, the organic results, and the AI Overviews and chatbot answers most agencies ignore.",
    },
    {
      step: "04",
      title: "Reviews & authority",
      body: "A system to steadily earn 5-star reviews plus honest local link and citation building — the trust signals that move you up the local results.",
    },
    {
      step: "05",
      title: "Report & refine",
      body: "A plain-English monthly report — rankings, traffic, calls, and reviews — and a clear plan for next month. No jargon, no lock-in, you can leave anytime.",
    },
  ],
  heroImage: {
    src: "/assets/portfolio-web.png",
    alt: "Local SEO and Google Business Profile results rising for a small business optimized by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/portfolio-enigma.png",
    alt: "Locally-optimized small-business website built to rank by Branding Zombie Designs",
  },
  subServices: [
    {
      name: "Local SEO strategy & audit",
      blurb:
        "A full audit of where you rank now, what's holding you back, and a prioritized plan to climb the local results.",
    },
    {
      name: "Google Business Profile optimization",
      blurb:
        "Your map listing fully optimized — categories, services, photos, posts, and Q&A — the single biggest driver of local-pack rankings.",
    },
    {
      name: "Google Business Profile management",
      blurb:
        "Ongoing posts, photos, review responses, and Q&A so your profile stays active and Google keeps ranking it.",
    },
    {
      name: "AEO / GEO — AI search optimization",
      blurb:
        "Structured so ChatGPT, Gemini, Perplexity, and Google's AI Overviews can read, trust, and cite you — the search frontier most agencies ignore.",
    },
    {
      name: "Local citations & NAP consistency",
      blurb:
        "Your name, address, and phone listed identically across Google, Bing, Apple, Yelp, and the directories AI engines trust.",
    },
    {
      name: "Schema / structured data",
      blurb:
        "LocalBusiness, Service, FAQ, and review schema so search engines and AI understand exactly what you do and where.",
    },
    {
      name: "On-page SEO",
      blurb:
        "Titles, headings, content, and internal links tuned for the keywords your customers actually search.",
    },
    {
      name: "Keyword & competitor research",
      blurb:
        "We find the searches that convert in your market and the gaps your competitors are leaving open.",
    },
    {
      name: "Local landing pages",
      blurb:
        "Dedicated, optimized pages for each service and town you serve — the exact strategy on this page, built out for you.",
    },
    {
      name: "Technical SEO",
      blurb:
        "Site speed, Core Web Vitals, crawlability, indexing, and mobile — the under-the-hood fixes that unlock rankings.",
    },
    {
      name: "Content & local blogging",
      blurb:
        "Local, question-answering articles that rank and feed the AI engines, on a steady publishing cadence.",
    },
    {
      name: "Review generation & management",
      blurb:
        "A system to steadily earn 5-star Google reviews and respond to them — a top local ranking and trust signal.",
    },
    {
      name: "Bing & Apple Maps optimization",
      blurb:
        "Not just Google — we set you up on Bing Places and Apple Business Connect, where AI assistants increasingly pull answers.",
    },
    {
      name: "Search Console & Analytics setup",
      blurb:
        "Proper measurement wired up so every ranking, click, and call is tracked, not guessed.",
    },
    {
      name: "Conversion & call tracking",
      blurb:
        "Call tracking, form tracking, and goals so you see which keywords actually bring in business.",
    },
    {
      name: "Backlink & authority building",
      blurb:
        "Earning mentions and links from local and industry sources — honest authority, never spam that gets you penalized.",
    },
    {
      name: "AI Overviews & featured snippets",
      blurb:
        "Content structured to win the featured snippet and Google AI Overview for your money keywords.",
    },
    {
      name: "Monthly reporting & strategy",
      blurb:
        "A plain-English monthly report — rankings, traffic, calls, reviews — and what we're doing next. No jargon, no lock-in.",
    },
  ],
  serviceFaqs: [
    {
      q: "How much does local SEO cost?",
      a: "Most local SEO runs $499–$1,999/month depending on how competitive your market is and how many services and towns you target. It's month-to-month — no annual contract. You get a flat monthly scope up front and a plain-English report every month.",
    },
    {
      q: "How long until SEO works?",
      a: "Local SEO usually shows movement in 60–90 days and compounds from there — Google Business Profile and citation wins can come faster, competitive organic keywords take longer. Anyone promising page one in a week is selling a shortcut that gets you penalized.",
    },
    {
      q: "What is AEO / GEO, and why does it matter?",
      a: "Answer Engine Optimization (AEO) / Generative Engine Optimization (GEO) is optimizing to be cited by AI search — ChatGPT, Gemini, Perplexity, and Google's AI Overviews. More people now ask AI 'who's the best ___ near me' instead of scrolling links. We build you to be that answer, which most local agencies still ignore.",
    },
    {
      q: "Do you do SEO and build the website, or just one?",
      a: "Both, and that's an advantage. SEO works best on a fast, well-structured site. We can optimize what you have or build it right from the start, so the technical foundation and the marketing aren't fighting each other.",
    },
    {
      q: "Are there long-term contracts?",
      a: "No. Everything is month-to-month. We keep clients by getting results and showing them to you, not by locking you into a 12-month agreement you can't leave.",
    },
    {
      q: "Will I show up for 'near me' searches in my town?",
      a: "That's the whole goal. We optimize your Google Business Profile, build local citations and schema, and create town-specific pages so you appear in the map pack and 'near me' results across the towns you serve.",
    },
    {
      q: "Can you fix or recover my Google Business Profile?",
      a: "Yes. We clean up categories, services, NAP, photos, and posts, and we handle reinstatement strategy if your profile has been suspended. A healthy, active profile is the single biggest local-ranking lever.",
    },
    {
      q: "How do I know it's working?",
      a: "A monthly report in plain English: keyword rankings, map-pack positions, traffic, calls and form fills, reviews earned, and exactly what we did and will do next. You see the trend line, not a black box.",
    },
  ],
  relatedServices: ["web-design", "social-media", "branding", "ai-workflows"],
  schema: {
    serviceType: "Local SEO, AEO and digital marketing",
    category: "Digital Marketing",
  },
};

// ─── Print Design (design + in-house printing). ─────────────────────────────
const PRINT_DESIGN: LocationService = {
  slug: "print-design",
  label: "Print Design",
  noun: "print work",
  metaTagline: "Printing & Collateral",
  summary:
    "production-ready print design and in-house printing — business cards, signage, packaging, labels, menus, and collateral with real dielines, bleed, and CMYK",
  heroSubhead:
    "Business cards, banners, signage, packaging, and collateral for {city} businesses — designed AND printed in-house, with the bleed and dielines right the first time.",
  ownershipLine: "You own the print-ready files and every source on handoff.",
  priceAnchor: "from $75",
  timeline: "2-day turnaround",
  deliveryPhrase: "with turnaround from just 2 days",
  process: [
    {
      step: "01",
      title: "Quick brief & quote",
      body: "Tell us the piece, the quantity, and the deadline. You get a flat quote covering design AND print — one number, one vendor.",
    },
    {
      step: "02",
      title: "Design",
      body: "We design it on-brand with real production specs — correct bleed, trim, dielines, and CMYK — so it prints right, not just looks right on screen.",
    },
    {
      step: "03",
      title: "Proof & approve",
      body: "You review a proof and we lock the files. 15+ years of press experience means ours don't come back with 'please fix.'",
    },
    {
      step: "04",
      title: "Print in-house",
      body: "We print through an in-house wholesale pipeline — better pricing, tighter quality control, and no chasing a separate print shop.",
    },
    {
      step: "05",
      title: "Deliver or ship",
      body: "Pick up locally or we ship it. You also keep the print-ready files for next time.",
    },
  ],
  heroImage: {
    src: "/assets/services/graphic-design/hero.png",
    alt: "Print collateral — business cards, packaging, and signage — designed and printed by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/services/graphic-design/gallery-1.png",
    alt: "Printed marketing collateral and packaging produced by Branding Zombie Designs",
  },
  subServices: [
    { name: "Business cards", blurb: "Thick stock, premium finishes, and a design that makes the handoff count." },
    { name: "Flyers & brochures", blurb: "Single-sheet and folded pieces that sell your offer, designed and printed clean." },
    { name: "Postcards & direct mail (EDDM)", blurb: "Eye-catching mailers, sized and prepped for Every Door Direct Mail postal routes." },
    { name: "Signage & banners", blurb: "Yard signs, indoor and outdoor banners, and window graphics built to read from across the street." },
    { name: "Vehicle magnets & decals", blurb: "Turn your truck into a moving billboard with crisp, on-brand vehicle graphics." },
    { name: "Packaging & boxes", blurb: "Retail-ready cartons and mailers with proper dielines — designed to survive the shelf and the shipper." },
    { name: "Product labels & stickers", blurb: "Die-cut labels and stickers with CMYK accuracy and FDA/FTC-aware layouts for CPG." },
    { name: "Menus & table tents", blurb: "Restaurant menus, inserts, and table tents that are easy to read and easy to reprint." },
    { name: "Posters & large format", blurb: "Posters, banners, and large-format prints that hold quality at scale." },
    { name: "Trade-show & banner stands", blurb: "Retractable banner stands and booth graphics that set up in seconds and travel flat." },
    { name: "Stationery & letterhead", blurb: "Letterhead, envelopes, and notecards that keep your brand consistent on paper." },
    { name: "Apparel & promo products", blurb: "Shirts, hats, and swag designed to print clean and actually get worn." },
    { name: "Print-ready file prep", blurb: "Dielines, bleed, trim, and CMYK done right — files your printer accepts on the first pass." },
    { name: "In-house printing & fulfillment", blurb: "Design and print under one roof — better pricing, quality control, and one invoice." },
  ],
  serviceFaqs: [
    {
      q: "Do you print, or just design the files?",
      a: "Both. We design and print through an in-house wholesale pipeline — business cards, signage, packaging, the works — so you get one invoice and one point of contact instead of designing here and chasing a print shop there.",
    },
    {
      q: "How much does print design cost?",
      a: "Design starts around $75 for simple pieces; printing is quoted on top based on quantity, stock, and finish. You get one flat number covering both before we start, with no hourly surprises.",
    },
    {
      q: "How fast is the turnaround?",
      a: "Simple jobs can turn around in about 2 days once the design is approved; large or complex packaging and signage take longer. Tell us your deadline and we'll tell you straight whether we can hit it.",
    },
    {
      q: "Can you match my existing brand?",
      a: "Yes. Send your logo and colors and we'll match them exactly — or, if your brand needs help, we can tighten it up first so everything you print looks consistent.",
    },
    {
      q: "What if I already have a designer — can you just print?",
      a: "We can, as long as the files are truly print-ready (correct bleed, trim, dielines, and CMYK). If they're not, we'll flag it before it goes to press so you don't pay to reprint a bad file.",
    },
    {
      q: "Do you ship, or is it local pickup?",
      a: "Both. We're in Cumming for local pickup, and we ship anywhere. Either way you keep the print-ready files for your next run.",
    },
  ],
  relatedServices: ["branding", "logo-design", "web-design", "social-media"],
  schema: {
    serviceType: "Print design and production",
    category: "Print Design",
  },
};

// ─── Logo Design. ───────────────────────────────────────────────────────────
const LOGO_DESIGN: LocationService = {
  slug: "logo-design",
  label: "Logo Design",
  noun: "logo",
  metaTagline: "Custom Logo Design",
  summary:
    "custom logo and brand-mark design that works everywhere from a favicon to a vehicle wrap, with the full source files you own",
  heroSubhead:
    "A custom logo and full mark suite for {city} businesses — built to work on a sign, a shirt, a favicon, and a 200×200 app icon, with source files you own.",
  ownershipLine: "You own every logo file and format on handoff.",
  priceAnchor: "from $750",
  timeline: "1–2 weeks",
  deliveryPhrase: "delivered in 1–2 weeks",
  process: [
    {
      step: "01",
      title: "Brief & discovery",
      body: "We learn your business, your customers, and what the logo has to work on — so we design for reality, not just a pretty mockup.",
    },
    {
      step: "02",
      title: "Concepts",
      body: "We present real directions — not 50 throwaway options — each designed to be distinct, ownable, and built to last.",
    },
    {
      step: "03",
      title: "Refine",
      body: "We sharpen your chosen direction through real revision rounds with a designer, dialing in the mark, color, and type.",
    },
    {
      step: "04",
      title: "Build the suite",
      body: "Primary, secondary, and submark versions, a favicon, plus black/white and one-color variants — every version you'll actually need.",
    },
    {
      step: "05",
      title: "Files & handoff",
      body: "You get all the vector and raster source files, organized and ready for web, print, signage, and merch — and you own them outright.",
    },
  ],
  heroImage: {
    src: "/assets/portfolio-brand.png",
    alt: "Custom logo and brand mark designs by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/services/logo-design/MiamiPavementSupply-01.jpg",
    alt: "Custom small-business logo designed by Branding Zombie Designs",
  },
  subServices: [
    { name: "Custom logo design", blurb: "An original mark designed for you — never templated, AI-generated, or resold to the next buyer." },
    { name: "Logo & mark suite", blurb: "Primary logo, a secondary lockup, and a compact submark for every place your brand shows up." },
    { name: "Favicon & app icon", blurb: "A version that stays legible at 200×200 and 16×16 — most cheap logos fall apart at icon size." },
    { name: "Logo redesign / refresh", blurb: "Modernize a dated logo without losing the recognition you've already built." },
    { name: "Full vector & source files", blurb: "AI, EPS, SVG, PDF, and PNG — organized, layered, and yours to keep forever." },
    { name: "Color & one-color versions", blurb: "Full-color, black, white, and single-color variants so it works on any background or print method." },
    { name: "Color palette & font pairing", blurb: "The colors and typefaces that go with your mark, so the brand feels finished, not just a floating logo." },
    { name: "Logo usage guidelines", blurb: "Simple rules for spacing, sizing, and what not to do — so your logo stays consistent everywhere." },
    { name: "Social profile & avatar versions", blurb: "Crops and lockups sized for every profile picture, cover, and watermark." },
    { name: "Signage- & merch-ready files", blurb: "Production-ready artwork prepped for signs, shirts, vehicle wraps, and embroidery." },
    { name: "Trademark-ready original artwork", blurb: "Because it's custom and original, it's yours to trademark — not a stock mark someone else can claim." },
    { name: "Logo on starter collateral", blurb: "See it live on a business card and a social kit, not just a blank slide." },
  ],
  serviceFaqs: [
    {
      q: "How much does a logo cost?",
      a: "Custom logo design starts at $750 and scales with scope — a single mark versus a full suite with variants, color system, and usage guidelines. You get a flat quote up front and you own every file on handoff.",
    },
    {
      q: "What files do I get?",
      a: "All of them: vector source (AI, EPS, SVG, PDF) and raster (PNG) in full-color, black, white, and one-color versions, plus favicon and social sizes. Organized and ready for web, print, signage, and merch.",
    },
    {
      q: "Why not just use a $5 or AI logo generator?",
      a: "A cheap or AI logo is templated or recycled, often falls apart at small sizes, and you can't reliably own or trademark it. A custom mark is designed for you, works everywhere from a favicon to a wrap, and is yours — you usually pay twice when you start cheap and redo it later.",
    },
    {
      q: "How many concepts and revisions do I get?",
      a: "We present a few strong, distinct directions — not 50 throwaways — then refine your chosen one through real revision rounds with a designer until it's right. The exact number is set in your quote, with no nickel-and-diming.",
    },
    {
      q: "How long does a logo take?",
      a: "Most logos are done in 1–2 weeks, including concept, revisions, and final file prep. Need it faster for a launch or a deadline? Tell us and we'll tell you honestly if we can hit it.",
    },
    {
      q: "Can you do the full brand, not just the logo?",
      a: "Yes — a logo is often step one. We also build complete brand systems (color, type, voice, collateral, packaging, and web), so you can start with the logo and expand, or do the whole identity at once.",
    },
  ],
  relatedServices: ["branding", "web-design", "print-design", "social-media"],
  schema: {
    serviceType: "Logo and brand mark design",
    category: "Logo Design",
  },
};

// ─── Ecommerce (Shopify & custom stores). ───────────────────────────────────
const ECOMMERCE: LocationService = {
  slug: "ecommerce",
  label: "Ecommerce",
  noun: "store",
  metaTagline: "Shopify & Online Stores",
  summary:
    "conversion-focused Shopify and custom online-store design — product pages, subscriptions, and the integrations that actually move product",
  heroSubhead:
    "Custom Shopify and online stores for {city} businesses — product pages, checkout, and integrations built to actually sell, by a designer with 15+ years in CPG and DTC.",
  ownershipLine: "You own the store, the data, and every file on handoff.",
  priceAnchor: "from $3,000",
  timeline: "2–6 weeks",
  deliveryPhrase: "delivered in 2–6 weeks",
  process: [
    {
      step: "01",
      title: "Discovery & plan",
      body: "We map your products, your customers, and the path to checkout, and pick the platform and integrations that fit how you actually sell.",
    },
    {
      step: "02",
      title: "Store & product design",
      body: "We design a store and product pages built around what converts — clear value, fast checkout, trust signals — not just a pretty homepage.",
    },
    {
      step: "03",
      title: "Build & integrate",
      body: "We build it fast and clean and wire up the tools that move product — email, subscriptions, reviews, payments, and shipping.",
    },
    {
      step: "04",
      title: "Test & launch",
      body: "We test checkout, mobile, and speed end to end, migrate your products and content, and launch without losing your search rankings.",
    },
    {
      step: "05",
      title: "Handoff & grow",
      body: "You own the store and the data. We show you how to run it, and we're here for ongoing optimization when you're ready to scale.",
    },
  ],
  heroImage: {
    src: "/assets/services/ecommerce/hero.png",
    alt: "Custom Shopify storefront design on laptop and phone by Branding Zombie Designs",
  },
  bodyImage: {
    src: "/assets/portfolio-ecommerce.png",
    alt: "Conversion-focused ecommerce product page built by Branding Zombie Designs",
  },
  subServices: [
    { name: "Custom Shopify design", blurb: "A store designed around your brand and your products — not a reskinned free theme everyone else uses." },
    { name: "Custom theme development", blurb: "Fast, flexible Shopify themes built to do exactly what your store needs, and easy for you to manage." },
    { name: "Product page design", blurb: "The pages that actually sell — clear value, strong imagery, reviews, and an obvious add-to-cart." },
    { name: "Collection & catalog setup", blurb: "Organized collections and navigation so shoppers find the right product fast." },
    { name: "Checkout optimization", blurb: "A fast, low-friction checkout tuned to recover carts and lift conversion." },
    { name: "Subscriptions & recurring", blurb: "Subscribe-and-save and membership flows for predictable, recurring revenue." },
    { name: "Klaviyo email & SMS", blurb: "Welcome, abandoned-cart, and post-purchase flows wired in so marketing runs itself." },
    { name: "Reviews & UGC integration", blurb: "Product reviews and customer photos that build trust and convert browsers." },
    { name: "Payments & shipping setup", blurb: "Payment gateways, taxes, and real-time shipping rates configured and tested." },
    { name: "Platform migration", blurb: "Move from Wix, WooCommerce, Squarespace, or Etsy to Shopify without losing products or SEO." },
    { name: "Speed & Core Web Vitals", blurb: "A fast store — slow ecommerce loses sales in the first few seconds." },
    { name: "Product photography art direction", blurb: "Direction (and production) for product and lifestyle shots that make products look worth buying." },
    { name: "Ecommerce SEO", blurb: "Optimized product and collection pages so shoppers find you on Google, not just on ads." },
    { name: "Analytics & conversion tracking", blurb: "GA4, pixels, and conversion tracking set up right so you can see what's actually selling." },
  ],
  serviceFaqs: [
    {
      q: "How much does an ecommerce site cost?",
      a: "Custom Shopify builds start at $3,000 and scale with the number of products, integrations, and custom features. You get a flat quote up front, and you own the store and all the files on handoff.",
    },
    {
      q: "Shopify, WooCommerce, or something else?",
      a: "For most small and growing brands we recommend Shopify — it's fast, reliable, and the ecosystem is unbeatable. We also build WooCommerce and custom stores when there's a real reason. We'll recommend what fits how you sell, not what's easiest for us.",
    },
    {
      q: "Can you migrate my existing store?",
      a: "Yes. We migrate from Wix, WooCommerce, Squarespace, BigCommerce, or Etsy to Shopify — products, content, and customers — and we handle redirects so you don't lose your Google rankings in the move.",
    },
    {
      q: "Do you handle product photography?",
      a: "We can. With 15+ years in CPG and DTC, we art-direct and produce product and lifestyle photography that makes products look worth buying — or we'll work with images you already have.",
    },
    {
      q: "How long does an online store take?",
      a: "Most stores launch in 2–6 weeks depending on product count and integrations. A focused launch store is faster; a large catalog with subscriptions and custom features takes longer. You'll get a clear timeline with your quote.",
    },
    {
      q: "Do you help after launch?",
      a: "Yes. You own the store and can run it yourself, and we offer ongoing optimization, email flows, and care plans month-to-month when you want a hand growing it.",
    },
  ],
  relatedServices: ["web-design", "branding", "digital-marketing", "social-media"],
  schema: {
    serviceType: "Ecommerce web design and development",
    category: "Ecommerce",
  },
};

export const LOCATION_SERVICES: Partial<Record<ServiceSlug, LocationService>> = {
  "web-design": WEB_DESIGN,
  branding: BRANDING,
  "digital-marketing": SEO,
  "print-design": PRINT_DESIGN,
  "logo-design": LOGO_DESIGN,
  ecommerce: ECOMMERCE,
  // Expansion (pure data entry — add a config block and the route picks it up):
  // "social-media": SOCIAL_MEDIA,
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
