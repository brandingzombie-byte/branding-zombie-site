// ─── Industry landing pages — single source of truth ────────────────────────
// One data object per industry drives the /industries/[slug] route, its schema,
// and every section it renders. Adding an industry = adding an entry here; the
// route, components, and SEO are written once.
//
// Content rules (see .agents/industry-pages-plan.md + product-marketing-context.md):
// - Plain English, local, warm. No agency jargon. Speak the owner's language.
// - `intro` is a 40–60 word self-contained answer block (AEO/GEO extractable).
// - `faqs` use natural-language questions people actually ask Google/ChatGPT.
// - Every page must be UNIQUE — no templated mad-libs across industries.
// - Only claim proof we can back. `featuredWorkIds` must be real PORTFOLIO ids.

import type { ServiceSlug } from "@/data/services";

export interface IndustryFaq {
  /** Natural-language question — matches how people phrase it to search/AI. */
  q: string;
  /** Direct answer, lead with the answer. ~40–70 words. */
  a: string;
}

export interface IndustryImage {
  /** A /public path to use a real image; leave undefined to render a placeholder. */
  src?: string;
  alt: string;
  /** Shown in the on-page placeholder + the image shot list — what goes here. */
  suggestion: string;
}

export interface IndustryShot extends IndustryImage {
  label: string;
  aspect: "tall" | "wide" | "square";
}

export interface Industry {
  slug: string;
  /** Full name, e.g. "Trades & Contractors". */
  name: string;
  /** Short label for nav/index cards. */
  navLabel: string;

  // ── Hero ──
  eyebrow: string; // e.g. "HVAC · Plumbing · Electrical · Roofing"
  headlineLead: string; // first line of the H1
  headlineHighlight: string; // second line — gets the toxic underline
  subhead: string;

  // ── Hero visual (real image when src set, else an on-brand placeholder) ──
  heroImage: IndustryImage;

  // ── Intro / definition block (AEO: direct, self-contained answer) ──
  intro: string;

  // ── "Sound familiar?" pains, in the owner's words ──
  painsTitle: string;
  pains: string[];

  // ── What we make for this industry ──
  servicesTitle: string;
  servicesNote: string;
  servicesOffered: ServiceSlug[]; // subset rendered as brutalist cards

  // ── "Brand in the wild" showcase band (image slots / placeholders) ──
  showcaseTitle: string;
  showcaseNote: string;
  showcase: IndustryShot[];

  // ── Proof ──
  workTitle: string;
  workNote: string;
  featuredWorkIds: string[]; // real PORTFOLIO ids, marquee first
  testimonialName?: string; // must match a name in reviews.ts

  // ── Pricing framing (no per-industry price table to maintain) ──
  pricingTitle: string;
  pricingNote: string;
  priceAnchors: { label: string; price: string }[];

  // ── FAQ (AEO) ──
  faqs: IndustryFaq[];

  // ── SEO ──
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const INDUSTRIES: Industry[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // TRADES & CONTRACTORS  (pilot)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "trades-contractors",
    name: "Trades & Contractors",
    navLabel: "Trades & Contractors",

    eyebrow: "HVAC · Plumbing · Electrical · Roofing · Contractors",
    headlineLead: "Logos, truck wraps & websites",
    headlineHighlight: "for the trades.",
    subhead:
      "You do great work. Your brand should prove it before you even pull into the driveway. Flat-rate logos, vehicle graphics, signs, shirts, and websites for HVAC, plumbing, electrical, roofing, and contractor businesses across Cumming and North Metro Atlanta.",

    heroImage: {
      // src: "/assets/industries/trades-hero.png",  // ← add a real image to enable
      alt: "Branded work truck with a fresh vehicle wrap for a Cumming-area contractor",
      suggestion:
        "A dual-cab work truck or service van with a clean, freshly-installed wrap — brand colors and phone number readable from across the street. Golden hour, job site or driveway.",
    },

    intro:
      "Branding Zombie Designs is a Cumming, GA studio that builds brands for trades and contractors — logos, truck wraps, yard signs, shop shirts, and websites that get you found on Google. Flat prices, fast turnaround, and you talk to the owner directly. No retainers, no account managers.",

    painsTitle: "Sound familiar?",
    pains: [
      "Your logo's from 2013 and it looks like it. The truck lettering is peeling and the business cards match nothing.",
      "A homeowner Googles “HVAC near me” and your competitor shows up first — even though you've been in Forsyth County twice as long.",
      "You grabbed a $40 logo off Fiverr, and the file is useless the second you need it big enough for a truck wrap.",
      "Every quote is either suspiciously cheap or a $15,000 “brand strategy engagement” you don't need.",
      "Your crew shows up in mismatched shirts and the yard signs look like a ransom note.",
    ],

    servicesTitle: "What we make for trades",
    servicesNote:
      "Pick the piece you need today — the logo, the truck, the website — and add the rest as the business grows. Everything's quoted flat before we start.",
    servicesOffered: [
      "logo-design",
      "print-design",
      "web-design",
      "branding",
      "digital-marketing",
    ],

    showcaseTitle: "Your brand, everywhere it needs to be",
    showcaseNote:
      "One logo, applied across every place a homeowner sees you — the truck, the crew, the yard, the mailbox.",
    showcase: [
      {
        label: "Vehicle wraps",
        aspect: "wide",
        alt: "Truck wrap design mockup for a trades business",
        suggestion:
          "Full-side wrap design mocked onto a white service van — bold brand colors, big phone number, license number, and service icons.",
      },
      {
        label: "Crew shirts",
        aspect: "tall",
        alt: "Branded crew shirt for a contractor",
        suggestion:
          "Branded crew tee or hi-vis shirt on a contractor — logo on the chest, optional back print. Clean studio or on-site shot.",
      },
      {
        label: "Yard signs",
        aspect: "square",
        alt: "Branded yard sign staked in a lawn",
        suggestion:
          "Corrugated yard sign staked in a front lawn — logo, service line, and phone. The kind of sign neighbors photograph.",
      },
      {
        label: "Cards & door magnets",
        aspect: "wide",
        alt: "Business cards and a magnetic truck-door sign",
        suggestion:
          "Flat-lay of business cards next to a magnetic truck-door sign in matching brand colors, on a workbench.",
      },
    ],

    workTitle: "Recent work for trades & local businesses",
    workNote:
      "Real contractors, real local businesses — brand, web, and print built to win the next job.",
    featuredWorkIds: ["sharp-edge", "miami-pavement-logo", "enigma-computers"],
    testimonialName: "Ismael Medina",

    pricingTitle: "Flat prices. Quoted before we start.",
    pricingNote:
      "No hourly surprises, no retainers. You'll know the number before you say yes — and you'll own every file when we're done.",
    priceAnchors: [
      { label: "Logo + brand files", price: "from $750" },
      { label: "Truck wrap / vehicle graphics design", price: "custom quote" },
      { label: "Website that gets you found", price: "from $1,500" },
    ],

    faqs: [
      {
        q: "How much does a logo for a trades business cost?",
        a: "Logos start at $750 and include the file formats you actually need — vector files for truck wraps and signs, plus web and print versions. That's the difference between a real logo and a $40 Fiverr file that falls apart the moment you scale it up for a vehicle.",
      },
      {
        q: "Do you design truck wraps and vehicle lettering?",
        a: "Yes. We design full vehicle wraps, magnetic door signs, and cut-vinyl lettering, delivered print-ready to your installer's specs. If you don't have an installer, we can point you to good ones in Forsyth County and North Metro Atlanta.",
      },
      {
        q: "Can you get my HVAC or plumbing business to show up on Google?",
        a: "Yes. We set up and optimize your Google Business Profile, build a fast website with local SEO baked in, and structure it so you rank for “[your trade] near me” searches in the towns you actually serve. Ranking takes months, but starting with a site built for it is the difference between fighting uphill and downhill.",
      },
      {
        q: "Do I have to sign up for a monthly retainer?",
        a: "No. Everything is flat-rate and quoted before we start. Pay for the logo, the wrap, or the website you need right now — add the rest as you grow. No contracts, no account managers, no surprise invoices.",
      },
      {
        q: "How fast can you turn around a logo and truck graphics?",
        a: "Most logos are done in about a week. Truck wrap and signage artwork usually follows within a few days of logo approval. If you've got a deadline — a new truck, a trade show, a grand opening — tell us and we'll work to it.",
      },
      {
        q: "Do you only work with businesses in Cumming?",
        a: "Cumming and Forsyth County are home base, but we work with trades and contractors across North Metro Atlanta — Alpharetta, Johns Creek, Roswell, Woodstock, Buford, Dawsonville, and the rest of the GA-400 corridor. Local pickup and in-person meets are easy if you're nearby.",
      },
    ],

    seo: {
      title:
        "Branding & Web Design for Trades & Contractors in Cumming, GA",
      description:
        "Logos, truck wraps, signs, shirts, and websites for HVAC, plumbing, electrical, roofing, and contractor businesses in Cumming & North Metro Atlanta. Flat prices, fast turnaround, you own every file.",
      keywords: [
        "HVAC logo design",
        "contractor branding Cumming GA",
        "truck wrap design Forsyth County",
        "trades website design Georgia",
        "plumber logo design",
        "roofing company branding",
        "electrician website Cumming",
        "vehicle wrap design North Metro Atlanta",
      ],
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES.map((i) => i.slug);
}
