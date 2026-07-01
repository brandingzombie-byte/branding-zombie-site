// ─── Tattoo Shop Marketing product data — single source of truth ─────────────
// Powers the standalone /tattoo-shop-marketing pillar page AND its per-city
// variations (/tattoo-shop-marketing/[city]). One TattooProduct config holds
// every piece of copy, the AEO answer-first sentence, the dual-path
// segmentation, the 6 services, the 3 packages, the researched FAQ, and the
// Schema.org fields. City-specific local copy lives in TATTOO_CITY_COPY below
// and is merged in at render time.
//
// Strategic wedge (see .agents/tattoo-shop-marketing-brief.md): the SERP is
// owned by booking-SaaS that solves one slice (scheduling). Branding Zombie owns
// the open lane — the local, full-stack studio that builds a tattoo shop's
// whole money-making presence: brand → website (booking + reference upload) →
// print → window clings → aftercare kits → ads → social.
//
// Voice rules (mirror BUSINESS-CONTEXT.md): gritty, plain-spoken, confident, a
// little irreverent — never corporate. JTBD framing: every line ties to "fills
// your chairs / stops losing clients." Words to use: chairs, booked, walk-ins,
// storefront, glass, flash, local, Cumming, Forsyth, fast, one shop, one
// invoice. Avoid agency speak ("collateral," "brand architecture").
//
// CONFIDENTIAL CONSTRAINT: never reference trade printers, wholesale resellers,
// or "we don't own a press." Public framing is an in-house print pipeline.

import { CALENDLY_URL } from "@/lib/site";

export type TattooSlug = "tattoo-shop-marketing";

// Subset of the @/components/icons barrel that the tattoo page maps. Kept to
// icons confirmed present in the barrel (see icons/index.ts).
export type TattooIconName =
  | "Target"
  | "Lightning"
  | "Sparkle"
  | "Storefront"
  | "Package"
  | "Handshake"
  | "MapPin"
  | "Clock"
  | "ChartLineUp"
  | "CurrencyDollar"
  | "RocketLaunch"
  | "MagicWand"
  | "Sticker";

export interface TattooStat {
  value: string;
  label: string;
  source?: string;
}

export interface TattooBenefit {
  icon: TattooIconName;
  title: string;
  body: string;
}

/** Dual-path segmentation card (New shop vs Established shop). */
export interface TattooSegment {
  tag: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** One of the 6 service cards. */
export interface TattooService {
  tag: string;
  title: string;
  body: string;
  points: string[];
}

/** One package tier. */
export interface TattooTier {
  name: string;
  forWho: string;
  includes: string[];
  price: string;
  featured?: boolean;
}

export interface TattooPackages {
  eyebrow: string;
  headline: string;
  highlight: string;
  intro: string;
  note: string;
  tiers: TattooTier[];
}

export interface TattooProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface TattooFaq {
  q: string;
  a: string;
}

export interface TattooGalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface TattooRelated {
  href: string;
  label: string;
  blurb: string;
}

export interface TattooProduct {
  slug: TattooSlug;
  /** Full label. */
  label: string;
  /** Short label for chips/breadcrumbs. */
  shortLabel: string;
  /** Noun used in prose, e.g. "tattoo shop marketing". */
  noun: string;

  // ── SEO / metadata ──
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  ogImage: string;

  // ── Hero ──
  hero: {
    eyebrow: string;
    headline: string;
    highlight: string;
    subhead: string;
    microProof: string;
    ctaLabel: string;
    image: { src: string; alt: string };
  };

  // ── AEO answer-first band ──
  answerFirst: string;
  stats: TattooStat[];

  // ── Dual-path segmentation (New shop or established?) ──
  segmentsEyebrow: string;
  segmentsHeadline: string;
  segmentsHighlight: string;
  segments: TattooSegment[];

  // ── Benefits ("Why shops outgrow booking apps") ──
  benefitsEyebrow: string;
  benefitsHeadline: string;
  benefitsHighlight: string;
  benefits: TattooBenefit[];

  // ── Services (6 cards) ──
  servicesEyebrow: string;
  servicesHeadline: string;
  servicesHighlight: string;
  servicesIntro: string;
  services: TattooService[];

  // ── Packages (3 tiers) ──
  packages: TattooPackages;

  // ── The edge ("Why shops pick Branding Zombie") ──
  edgeEyebrow: string;
  edgeHeadline: string;
  edgeHighlight: string;
  edgeIntro: string;
  edgePoints: string[];
  pratfall: string;

  // ── Process ──
  process: TattooProcessStep[];

  // ── Gallery ──
  gallery: TattooGalleryItem[];

  // ── FAQ (city-agnostic, AEO) ──
  faqs: TattooFaq[];

  // ── Cross-links ──
  related: TattooRelated[];

  // ── Schema ──
  schema: { serviceType: string; category: string };
}

// ════════════════════════════════════════════════════════════════════════════
//  TATTOO SHOP MARKETING
// ════════════════════════════════════════════════════════════════════════════
const IMG_BASE = "/assets/services/tattoo-marketing";

const TATTOO_MARKETING: TattooProduct = {
  slug: "tattoo-shop-marketing",
  label: "Marketing for Tattoo Shops",
  shortLabel: "Tattoo Shop Marketing",
  noun: "tattoo shop marketing",

  seoTitle:
    "Tattoo Shop Marketing in Cumming & North Atlanta | Branding Zombie",
  seoDescription:
    "Websites with online booking + reference upload, branding, print, window clings & aftercare kits for tattoo shops in Cumming & metro Atlanta. Flat pricing, live in days. Book a free teardown.",
  keywords: [
    "tattoo shop marketing",
    "tattoo studio marketing",
    "tattoo shop website design",
    "tattoo studio website with online booking",
    "tattoo shop branding",
    "marketing for tattoo artists",
    "tattoo shop window clings",
    "custom tattoo aftercare kits",
    "tattoo shop social media",
    "tattoo shop marketing Cumming GA",
    "tattoo shop marketing Atlanta",
  ],
  ogImage: `${IMG_BASE}/tattoo-shop-marketing-cumming-ga-hero.webp`,

  hero: {
    eyebrow: "Tattoo shops · Cumming & North Atlanta",
    headline: "Marketing that keeps your chairs",
    highlight: "booked solid",
    subhead:
      "Not another booking app. Branding Zombie builds the whole machine your shop runs on — a website that books appointments and takes reference photos, branding that looks as sharp as your work, plus print, window clings, aftercare kits, ads and social. One local studio. Flat pricing. Live in days.",
    microProof:
      "Websites · Branding · Print · Window clings · Aftercare kits · Social — one shop, one invoice",
    ctaLabel: "Book a free shop teardown",
    image: {
      src: `${IMG_BASE}/tattoo-shop-marketing-cumming-ga-hero.webp`,
      alt: "Tattoo shop marketing in Cumming, GA — modern tattoo studio storefront at dusk with custom window clings and neon by Branding Zombie Designs",
    },
  },

  answerFirst:
    "Branding Zombie Designs is a local design studio in Cumming, Georgia that handles marketing for tattoo shops across Forsyth County and North Metro Atlanta. Instead of a single booking app, we build everything clients see before and after they book: a fast tattoo studio website with online appointment booking and reference-photo upload, brand and logo design, printed business cards and flyers, storefront window clings, custom-branded aftercare kits, and ads plus social content. Established shops get a refresh; new shops get a full launch kit. Pricing is flat and honest, you own everything, and most projects go live in days — not months.",
  stats: [
    {
      value: "Days, not months",
      label: "Typical time to launch a productized build",
    },
    {
      value: "One invoice",
      label: "Site, brand, print & signage from a single local studio",
    },
    { value: "20+ yrs", label: "Agency-grade design & brand experience" },
  ],

  segmentsEyebrow: "Start here",
  segmentsHeadline: "New shop or",
  segmentsHighlight: "established?",
  segments: [
    {
      tag: "Launch kit",
      title: "New shop opening",
      body: "Signing a lease or just opened? Get the whole kit in one go — brand, booking website, signage, cards and aftercare kits — so day one looks like year five.",
      ctaLabel: "See the Grand Opening kit",
      ctaHref: "#packages",
    },
    {
      tag: "Refresh",
      title: "Established shop",
      body: "Busy but stuck with DMs-only booking and branding from 2012? We refresh the look and bolt on a real booking site — without killing the vibe that already works.",
      ctaLabel: "See a Refresh",
      ctaHref: "#packages",
    },
  ],

  benefitsEyebrow: "Why shops outgrow booking apps",
  benefitsHeadline: "A booking app rents you a calendar.",
  benefitsHighlight: "You need the whole machine.",
  benefits: [
    {
      icon: "Target",
      title: "You own the client, not the app",
      body: "Booking apps rent you a calendar and keep your traffic. Your own site + brand means the client remembers YOUR shop — and every booking, review and repeat lives with you.",
    },
    {
      icon: "Lightning",
      title: "Stop losing DMs",
      body: "Every ignored Instagram DM is a booked client walking to the shop down the road. A real booking page with reference upload catches them at 1am when they're ready to commit.",
    },
    {
      icon: "Sparkle",
      title: "Look as good as your work",
      body: "Your portfolio is elite. If the website, cards and storefront don't match, you're leaving money — and walk-ins — on the table.",
    },
  ],

  servicesEyebrow: "Everything your shop needs to stay booked",
  servicesHeadline: "One studio for the whole",
  servicesHighlight: "money-making stack",
  servicesIntro:
    "Websites, branding, print, signage, retail and social — all designed to match, all from one local shop, all on one invoice. Tell us what your chairs need and we'll build it.",
  services: [
    {
      tag: "Websites",
      title: "A website that books appointments",
      body: "A fast, mobile-first tattoo studio site with online booking baked in — and a reference-photo upload step so clients send placement, size and inspo before they ever walk in.",
      points: [
        "Online booking + deposits",
        "Reference photo + placement upload",
        "Artist portfolios & flash galleries",
      ],
    },
    {
      tag: "Branding",
      title: "Branding & logo that matches your work",
      body: "A logo and brand system as sharp as your linework — colors, type and flash-ready marks that work on skin, screens, glass and merch.",
      points: [
        "Logo & brand system",
        "Merch-ready artwork",
        "Style built around your shop",
      ],
    },
    {
      tag: "Print",
      title: "Business cards, flyers & print",
      body: "Thick, premium cards and flyers that feel like your shop — designed and produced through our in-house print pipeline.",
      points: [
        "Business & appointment cards",
        "Flyers & flash sheets",
        "Loyalty & aftercare cards",
      ],
    },
    {
      tag: "Signage",
      title: "Window clings & storefront signage",
      body: "Turn your glass into a walk-in magnet with custom window clings, hours and frosted decals that pull people off the sidewalk.",
      points: [
        "Custom window clings & decals",
        "Hours & logo lettering",
        "Designed, printed & installed",
      ],
    },
    {
      tag: "Retail",
      title: "Custom aftercare kits",
      body: "Branded aftercare kits that heal tattoos AND market your shop every time a client reorders — a quiet retail revenue line most shops skip.",
      points: [
        "Custom-branded boxes & labels",
        "Balm, film & care cards",
        "Retail-ready packaging",
      ],
    },
    {
      tag: "Growth",
      title: "Ads & social content",
      body: "Scroll-stopping social content and local ads that fill slow weeks — done-for-you posts, reels and promos that actually look like your shop.",
      points: [
        "Done-for-you social content",
        "Local ads that fill chairs",
        "Promos & campaign design",
      ],
    },
  ],

  packages: {
    eyebrow: "Packages & flat pricing",
    headline: "Pick a package or",
    highlight: "mix your own",
    intro:
      "Three ways to start, priced flat and honest. Most shops start with a free teardown so we scope it right — then you own every file, with no lock-in retainers.",
    note: "Every package is flat-priced and yours to keep — no lock-in retainers. Mix and match; most shops start with a free teardown so we can scope it right.",
    tiers: [
      {
        name: "The Refresh",
        forWho: "Established shops that need a quick, sharp win.",
        includes: [
          "Logo tune-up or refresh",
          "One-page booking website",
          "Business cards",
        ],
        price: "from $1,500",
      },
      {
        name: "The Chair-Filler",
        forWho: "Shops ready to actually grow.",
        includes: [
          "Full booking website + reference upload",
          "Brand & logo system",
          "Window clings for the storefront",
          "Social content starter pack",
        ],
        price: "from $4,500",
        featured: true,
      },
      {
        name: "The Grand Opening",
        forWho: "New shops launching the right way.",
        includes: [
          "Full brand & logo system",
          "Booking website + reference upload",
          "Window clings & storefront signage",
          "Business cards + aftercare kits",
          "Launch ads & social",
        ],
        price: "$8,000+ / custom",
      },
    ],
  },

  edgeEyebrow: "Why shops pick Branding Zombie",
  edgeHeadline: "Not a booking SaaS.",
  edgeHighlight: "Not a $15k Atlanta agency.",
  edgeIntro:
    "We're not a booking SaaS and we're not a $15k Atlanta agency. We're a local studio that does the whole stack, answers the phone, and ships fast.",
  edgePoints: [
    "Full stack in one shop — brand, website, print, signage, aftercare kits and social, so it all matches and it's one invoice.",
    "Local and hands-on — you talk to the person doing the work, not an account manager three states away.",
    "Flat, honest pricing — no surprise bills, no retainers you can't cancel. You own every file.",
    "Built around YOUR style — black-and-grey realism, fine line, traditional, walk-in flash — the brand flexes to the shop, not a template.",
  ],
  pratfall:
    "We're not the cheapest, and we're not built for luxury day-spa vibes. We're for shops with grit.",

  process: [
    {
      step: "01",
      title: "Free shop teardown",
      body: "A quick 15-minute call. We look at your site, booking flow and storefront and name the 3 fastest fixes — no pitch, no pressure.",
    },
    {
      step: "02",
      title: "Flat quote & plan",
      body: "You get a plain-English scope and one flat price. Pick a package or mix your own.",
    },
    {
      step: "03",
      title: "We build it",
      body: "Brand, site, print and signage — designed to match, built fast, sent to you for one round of tweaks.",
    },
    {
      step: "04",
      title: "Live in days",
      body: "Your booking site goes live, your storefront gets dressed, and your chairs start filling. We're here for what's next.",
    },
  ],

  gallery: [
    {
      src: `${IMG_BASE}/tattoo-studio-booking-website-reference-upload.webp`,
      alt: "Tattoo studio website with online booking and client reference photo upload",
      caption: "Booking site with reference-photo upload",
    },
    {
      src: `${IMG_BASE}/tattoo-shop-window-clings-signage-atlanta.webp`,
      alt: "Custom tattoo shop window clings and storefront signage in metro Atlanta",
      caption: "Storefront window clings & decals",
    },
    {
      src: `${IMG_BASE}/custom-tattoo-aftercare-kit-branded.webp`,
      alt: "Custom-branded tattoo aftercare kit designed for a tattoo studio",
      caption: "Custom-branded aftercare kits",
    },
    {
      src: `${IMG_BASE}/tattoo-shop-business-cards-flyers-print.webp`,
      alt: "Tattoo shop business cards and flyers with custom branding",
      caption: "Business cards, flyers & print",
    },
    {
      src: `${IMG_BASE}/tattoo-shop-social-media-content-ads.webp`,
      alt: "Social media content and ads created for a tattoo studio",
      caption: "Done-for-you social content",
    },
  ],

  faqs: [
    {
      q: "How do tattoo shops get more clients?",
      a: "The fastest wins are a bookable website, a claimed Google Business Profile, steady reviews, and social content that shows healed work. We build all of it — a booking site, branding, and done-for-you social — so new clients can find you, trust you, and book without a single DM.",
    },
    {
      q: "Do I need a website if I already book through Instagram?",
      a: "Yes. Instagram rents you an audience and buries your booking link. Your own site is open 24/7, ranks on Google, takes deposits, and keeps every client, review and reference photo with your shop instead of an app that can change the rules overnight.",
    },
    {
      q: "Can the website let clients upload reference photos when they book?",
      a: "Absolutely. We build the booking form with a reference-photo upload step plus placement, size and style fields, so artists get everything they need up front — fewer back-and-forth DMs and fewer no-shows.",
    },
    {
      q: "How much does a tattoo shop website cost?",
      a: "Flat pricing starts at $1,500 for a one-page booking site and $4,500 for a full site with branding and window clings. New shops usually run the $8,000+ launch kit. You get one flat quote up front and own every file.",
    },
    {
      q: "What are window clings and why do tattoo shops use them?",
      a: "Window clings are custom printed graphics for your storefront glass — logo, hours, flash art and frosted decals. They turn an empty window into a walk-in magnet, add privacy, and make the shop look established from the sidewalk.",
    },
    {
      q: "Can you design custom tattoo aftercare kits?",
      a: "Yes. We design and produce custom-branded aftercare kits — boxes, labels, balm and care cards — through our in-house print pipeline. They heal your clients' work and quietly market your shop every time someone reorders.",
    },
    {
      q: "Do you work with tattoo shops outside Cumming and metro Atlanta?",
      a: "We're local-first for websites, branding and installed signage across Forsyth County and North Metro Atlanta. Print and aftercare kits ship anywhere in the US, so out-of-area shops can still get the branded goods.",
    },
    {
      q: "How fast can my shop go live?",
      a: "Most productized builds go live in days, not months. After a quick teardown call and a flat quote, we design, build and hand off with one round of tweaks — so your booking site and storefront are ready fast.",
    },
  ],

  related: [
    {
      href: "/services/web-design",
      label: "Web design & booking sites",
      blurb: "Fast, mobile-first sites built to take appointments.",
    },
    {
      href: "/window-clings",
      label: "Window clings & signage",
      blurb: "Dress your storefront glass into a walk-in magnet.",
    },
    {
      href: "/services",
      label: "All services",
      blurb: "Brand, web, print & more — one local studio.",
    },
    {
      href: "/contact",
      label: "Talk to Gerry",
      blurb: "One local studio, owner answers the phone.",
    },
  ],

  schema: {
    serviceType: "Tattoo Shop Marketing",
    category: "Marketing & Design Services",
  },
};

// ─── Registry + getters ─────────────────────────────────────────────────────
export const TATTOO_MARKETING_PRODUCT = TATTOO_MARKETING;

export function getTattooProduct(): TattooProduct {
  return TATTOO_MARKETING;
}

// CTA hrefs reused across components.
export const TATTOO_CTA = {
  calendly: CALENDLY_URL,
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  PER-CITY LOCAL COPY (tattoo-specific — do NOT reuse locations.ts angles)
// ════════════════════════════════════════════════════════════════════════════
// Keyed by the Location.slug in src/data/locations.ts. Each entry is hand-
// written with real local specifics so the city pages are not thin "mad-libs"
// content. `intro` is ~18–26 words; `angle` is ~60–90 words; `cityFaq` is one
// tattoo-marketing-specific local Q&A used in the FAQ + FAQPage schema.
export interface TattooCityCopy {
  intro: string;
  angle: string;
  cityFaq: TattooFaq;
}

export const TATTOO_CITY_COPY: Record<string, TattooCityCopy> = {
  "cumming-ga": {
    intro:
      "Branding Zombie is right here in Cumming — the local studio tattoo shops call when their branding needs to catch up to their needles.",
    angle:
      "Cumming and the GA-400 corridor are filling up with new studios, and the shops winning walk-ins are the ones that look established online and on the glass. We build Cumming tattoo shops a booking website, matching brand, and storefront window clings — all from a studio ten minutes away, so you get a real person, fast turnarounds, and one flat invoice.",
    cityFaq: {
      q: "Do you meet with tattoo shops in Cumming in person?",
      a: "Yes — we're based in Cumming, so we can stop by the shop, look at your storefront and booking flow in person, and turn a teardown into a plan the same week.",
    },
  },
  "alpharetta-ga": {
    intro:
      "Alpharetta clients scroll past polished national brands all day — an Avalon-area tattoo shop needs a site and storefront that look the part.",
    angle:
      "Between Avalon, downtown Alpharetta, and the Windward corridor, your clients are affluent and expect polish before they book. A DMs-only booking link and dated branding quietly tell them you're the cheaper option. We build Alpharetta tattoo studios a real booking site with reference upload, a sharp brand, and storefront clings that hold their own on that street — 20 minutes up GA-400, no agency retainer.",
    cityFaq: {
      q: "Can you make my Alpharetta tattoo shop look as polished as the Avalon brands?",
      a: "That's the whole point. We custom-build your booking site and brand — no templates — so a local Alpharetta studio looks as credible as the venture-backed names at Avalon, at a flat price you own outright.",
    },
  },
  "roswell-ga": {
    intro:
      "Roswell's Canton Street runs on character — your tattoo shop's site and storefront should carry that same personality.",
    angle:
      "Roswell rewards personality and punishes generic. Between Canton Street's dining and nightlife, the riverfront, and the arts crowd, a cookie-cutter booking link and template branding fall flat. We build Roswell tattoo studios a booking site and brand with real character — hand-feeling marks, flash-ready art, a storefront that looks like nobody else's — so the energy inside your shop shows up online and on the glass.",
    cityFaq: {
      q: "I want my Roswell tattoo shop's brand to have personality — can you do that?",
      a: "That's our specialty. Every Roswell build is custom — no template — so the character of your Canton Street studio comes through on the booking site, the cards, and the storefront window. Distinct on the page, found in the search.",
    },
  },
  "johns-creek-ga": {
    intro:
      "Johns Creek clients research before they book — your tattoo shop's site is the first impression, and it has to earn trust fast.",
    angle:
      "Johns Creek households read reviews and check the site before they commit to ink. For studios competing around Medlock Bridge and Technology Park, a fast, credible booking site with reference upload and a clean brand is the whole first impression. We build Johns Creek tattoo shops sites that load instantly on a phone, take deposits, and look as dialed-in as the work — so an affluent, research-heavy client trusts you before the first message.",
    cityFaq: {
      q: "Do Johns Creek tattoo clients really book online instead of DMing?",
      a: "Increasingly, yes — Johns Creek is a research-first, mobile-first market. A booking site that takes deposits, shows healed work, and captures reference photos converts those careful clients better than a buried Instagram link ever will.",
    },
  },
  "milton-ga": {
    intro:
      "Milton sells craftsmanship and quiet quality — your tattoo shop's brand and site should feel as considered as your linework.",
    angle:
      "Milton protects its upscale, horse-country character, and the businesses that win here sell trust, not loud discounts. A refined booking site, tasteful branding, and elegant storefront lettering fit Milton in a way a neon-bright coupon never will. We build Milton tattoo studios a brand and booking site with that restraint around Crabapple and Birmingham Highway — premium look, flat small-business pricing, and you own every file.",
    cityFaq: {
      q: "Can you build an upscale, understated brand for a Milton tattoo studio?",
      a: "Yes. We design refined, on-brand booking sites and storefronts that match Milton's craftsmanship-first feel — elegant type, tasteful marks, and a clean booking flow around Crabapple — high-end look at flat small-business pricing.",
    },
  },
  "suwanee-ga": {
    intro:
      "Suwanee runs on foot traffic around Town Center — a clear, bookable tattoo shop earns the walk-in and the phone before the visit.",
    angle:
      "Suwanee is one of the most family-friendly towns in Georgia, and clients decide fast and locally. The studios around Suwanee Town Center and the Peachtree Industrial corridor win when the site is warm, mobile-first, and easy to book at a glance. We build Suwanee tattoo shops a booking website with reference upload, a matching brand, and storefront clings — designed to turn a quick phone search into a booked chair.",
    cityFaq: {
      q: "Do you build mobile-first booking sites for Suwanee tattoo shops?",
      a: "Always. Most Suwanee searches happen on a phone, so every booking site we build is mobile-first with the deposit, directions, and reference-upload buttons impossible to miss — turning a quick Town Center search into an actual appointment.",
    },
  },
  "buford-ga": {
    intro:
      "Buford pulls traffic from three counties around the Mall of Georgia — high-visibility signage and a bookable site catch that crossover crowd.",
    angle:
      "Buford sits at a crossroads: the Mall of Georgia draws regional traffic, Lake Lanier brings the seasonal crowd, and the I-985 corridor is thick with drive-by eyes. With that much traffic, your storefront window is prime real estate and your booking link needs to work on the first tap. We build Buford tattoo shops bold storefront window clings, a booking site with reference upload, and a brand that turns passing cars into booked chairs.",
    cityFaq: {
      q: "How do window clings help my Buford tattoo shop near the Mall of Georgia?",
      a: "With that much drive-by traffic, bold storefront window clings — flash art, logo, hours — turn passing cars into walk-ins and make the shop look established from the road. We design, print, and install them, and tie them to your booking site.",
    },
  },
  "dawsonville-ga": {
    intro:
      "Dawsonville mixes weekend mountain tourism with a fast-growing local base — a bookable tattoo shop wins both the visitor and the regular.",
    angle:
      "Dawsonville is the gateway to the North Georgia mountains — the Premium Outlets, Dawson Forest, and the wineries pull weekend visitors up GA-400, while your repeat clients come from locals. A booking site that reads instantly to a first-time visitor and brands clearly for regulars does double duty. We build Dawsonville tattoo shops a booking website, brand, and storefront signage, just down GA-400 from our Cumming base.",
    cityFaq: {
      q: "A lot of my Dawsonville clients are visitors — can the site capture that traffic?",
      a: "That's exactly what we build for. We structure your booking site and local SEO around the searches travelers run on their way up GA-400 — hours, directions, walk-in availability — so a visitor an hour out lands on you first.",
    },
  },
  "gainesville-ga": {
    intro:
      "Gainesville is one of the most bilingual markets in North Georgia — we build (and speak) your tattoo shop's brand in English, Spanish, or both.",
    angle:
      "Gainesville anchors Hall County around Northeast Georgia Medical Center and one of the region's largest Latino communities. A tattoo shop that speaks to every client — not half of them — books business its competitors miss. We're bilingual, so we build your booking site, brand, and storefront signage in English, Spanish, or fully bilingual, then tune it for the searches around the square and Lake Lanier.",
    cityFaq: {
      q: "¿Hacen marketing para estudios de tatuajes en español? / Do you build bilingual for Gainesville tattoo shops?",
      a: "Sí. Gerry is fluent in Spanish, so we build booking sites, branding, and signage in Spanish, English, or fully bilingual — not machine-translated. For Gainesville's large Spanish-speaking client base, that means your shop connects with every walk-in.",
    },
  },
  "woodstock-ga": {
    intro:
      "Downtown Woodstock is one of metro Atlanta's hottest small-town scenes — a distinctive tattoo shop has to stand out in a crowded, younger crowd.",
    angle:
      "Woodstock punches above its size — downtown Woodstock and Towne Lake pull crowds from across Cherokee County, which means real competition for a younger, walk-in-heavy crowd. A booking site and storefront that look nothing like the shop next door cut through. We build Woodstock tattoo studios a bold brand, a booking website with reference upload, and full-color window clings that land the downtown buzz on your glass.",
    cityFaq: {
      q: "Local competition is tough in Woodstock — how do you make my tattoo shop stand out?",
      a: "Two ways: a custom brand and booking site that look nothing like the template next door, and the local SEO — schema, Google Business, fast mobile — that lands you in Woodstock's map results. Distinct on the page, found in the search.",
    },
  },
};

export function getTattooCityCopy(slug: string): TattooCityCopy | undefined {
  return TATTOO_CITY_COPY[slug];
}
