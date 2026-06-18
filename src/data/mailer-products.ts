// ─── Direct Mail & EDDM product data — single source of truth ───────────────
// Powers the standalone /direct-mail and /eddm pillar pages AND their per-city
// variations (/direct-mail/[city], /eddm/[city]). One MailerProduct config per
// product holds every piece of copy, the size/material specs, the AEO answer-
// first sentence, the researched FAQ, and the Schema.org fields. City-specific
// local copy lives in MAILER_CITY_COPY below and is merged in at render time.
//
// Voice rules (mirror BUSINESS-CONTEXT.md): plain English, local, warm, flat
// pricing, "looking pretty is table stakes — making you money is the job."
//
// CONFIDENTIAL CONSTRAINT: never reference trade printers, wholesale resellers,
// or "we don't own a press." Public framing is an in-house print pipeline. The
// value sold is design, print-prep, mailing logistics, and one-invoice ease.
//
// Industry stats below are attributed to their source (ANA/DMA, USPS) and
// presented as INDUSTRY data — never as Branding Zombie's own results.

import { CALENDLY_URL } from "@/lib/site";

export type MailerSlug = "direct-mail" | "eddm";

// Subset of the @/components/icons barrel that the mailer components map.
export type MailerIconName =
  | "Envelope"
  | "MapPin"
  | "Eye"
  | "ChartLineUp"
  | "Lightning"
  | "Handshake"
  | "Storefront"
  | "Package"
  | "Clock"
  | "CurrencyDollar"
  | "Target"
  | "Sparkle";

export interface MailerStat {
  /** Big number/label, e.g. "4.4%". */
  value: string;
  /** What it measures, e.g. "avg. response rate". */
  label: string;
  /** Source attribution shown small, e.g. "ANA/DMA 2025". */
  source?: string;
}

export interface MailerBenefit {
  icon: MailerIconName;
  title: string;
  body: string;
}

export interface MailerSpecGroup {
  /** Group heading, e.g. "Popular sizes". */
  label: string;
  /** Chip values. */
  items: string[];
  /** Optional one-line note under the group. */
  note?: string;
}

export interface MailerProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface MailerFaq {
  q: string;
  a: string;
}

export interface MailerDistributionMode {
  /** Short tag chip, e.g. "No list needed". */
  tag: string;
  title: string;
  body: string;
  points: string[];
}

export interface MailerRelated {
  href: string;
  label: string;
  blurb: string;
}

export interface MailerProduct {
  slug: MailerSlug;
  /** Full label, e.g. "Every Door Direct Mail (EDDM)". */
  label: string;
  /** Short label for chips/breadcrumbs, e.g. "EDDM". */
  shortLabel: string;
  kind: "targeted" | "eddm";
  /** Noun used in prose, e.g. "mailer" → "your {city} mailer". */
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
  stats: MailerStat[];

  // ── Benefits ──
  benefitsEyebrow: string;
  benefitsHeadline: string;
  benefitsHighlight: string;
  benefits: MailerBenefit[];

  // ── The edge ──
  edgeEyebrow: string;
  edgeHeadline: string;
  edgeHighlight: string;
  edgeIntro: string;
  edgePoints: string[];

  // ── Distribution ("choose exactly where") ──
  distributionEyebrow: string;
  distributionHeadline: string;
  distributionHighlight: string;
  distributionIntro: string;
  distributionModes: MailerDistributionMode[];

  // ── Specs (sizes / materials / coatings) ──
  specs: {
    eyebrow: string;
    headline: string;
    highlight: string;
    intro: string;
    groups: MailerSpecGroup[];
    turnaround: string;
    priceAnchor: string;
    priceNote: string;
  };

  // ── Process ──
  process: MailerProcessStep[];

  // ── FAQ (city-agnostic, AEO) ──
  faqs: MailerFaq[];

  // ── Cross-links ──
  related: MailerRelated[];

  // ── Schema ──
  schema: { serviceType: string; category: string };
}

// ════════════════════════════════════════════════════════════════════════════
//  TARGETED DIRECT MAIL
// ════════════════════════════════════════════════════════════════════════════
const DIRECT_MAIL: MailerProduct = {
  slug: "direct-mail",
  label: "Direct Mail Postcards & Marketing",
  shortLabel: "Direct Mail",
  kind: "targeted",
  noun: "mailer",

  seoTitle:
    "Direct Mail Marketing in Cumming, GA — Designed, Printed & Mailed | Branding Zombie",
  seoDescription:
    "Targeted direct mail postcards for Cumming, GA & North Atlanta businesses. We design, print, and mail to your customer list or a list we build for you. Bold cards that get opened — from $135. Get a quote.",
  keywords: [
    "direct mail Cumming GA",
    "direct mail marketing Cumming",
    "postcard marketing Cumming GA",
    "direct mail postcards Forsyth County",
    "targeted direct mail North Atlanta",
    "direct mail advertising Cumming",
    "postcard printing and mailing GA",
    "mailing list direct mail Cumming",
    "small business direct mail Georgia",
  ],
  ogImage: "/assets/services/print-services/Pruvit_MailerFlyer-01.jpg",

  hero: {
    eyebrow: "Direct Mail · Cumming, GA",
    headline: "Land in the mailbox,",
    highlight: "not the spam folder",
    subhead:
      "We design, print, and mail postcards that actually get read — to your customer list or a fresh list of the exact households and businesses you want. One shop, one invoice, real local results.",
    microProof: "From $135 · designed + printed + mailed · 5–7 day turnaround",
    ctaLabel: "Get my mailer quote",
    image: {
      src: "/assets/services/print-services/Pruvit_MailerFlyer-01.jpg",
      alt: "Bold two-sided direct mail postcard designed and printed by Branding Zombie Designs",
    },
  },

  answerFirst:
    "Direct mail from Branding Zombie Designs is targeted postcard marketing for small businesses in Cumming, GA and across North Metro Atlanta — we design the card, print it, and mail it to a list you provide or one we build for you, so a specific set of households or businesses gets a piece they actually open. Most local campaigns start at $135 and mail in 5–7 business days.",
  stats: [
    { value: "4.4%", label: "avg. response rate for targeted mail", source: "ANA/DMA" },
    { value: "0.12%", label: "avg. response rate for email — for comparison", source: "ANA/DMA" },
    { value: "90%", label: "of direct mail gets opened or sorted by hand", source: "USPS" },
  ],

  benefitsEyebrow: "Why mail still works",
  benefitsHeadline: "A postcard your customer",
  benefitsHighlight: "can't scroll past",
  benefits: [
    {
      icon: "Eye",
      title: "It physically gets seen",
      body: "No algorithm, no ad-blocker, no crowded inbox. Your card sits on the counter until someone decides what to do with it — and most people sort their mail by hand.",
    },
    {
      icon: "Target",
      title: "You pick exactly who gets it",
      body: "Mail your past customers, a neighborhood, an income bracket, new movers, or a list of nearby businesses. Spend your budget on the people most likely to buy.",
    },
    {
      icon: "ChartLineUp",
      title: "It's measurable",
      body: "A unique offer code, QR, or phone number tells you exactly what came back. You'll know what the campaign earned, not just that it 'felt' busy.",
    },
    {
      icon: "Handshake",
      title: "It feels local and real",
      body: "A well-designed card from a real local business builds trust a banner ad never will — especially for trades, restaurants, and service businesses people invite into their homes.",
    },
  ],

  edgeEyebrow: "The edge",
  edgeHeadline: "Everyone's fighting over the",
  edgeHighlight: "same six inches of screen",
  edgeIntro:
    "Your customer's inbox has 47 unread emails and their Instagram feed is a wall of ads. The mailbox? Far less crowded — and far more trusted. That's the gap a good mailer walks right through.",
  edgePoints: [
    "Digital ad costs keep climbing while attention keeps shrinking — mail buys you a quiet channel.",
    "Mail is tangible: it gets kept on the fridge, handed to a spouse, or tucked in a wallet.",
    "Pairs perfectly with your website and Google profile — the card drives the search, the site closes it.",
    "Older and higher-income local buyers respond to mail at the highest rates of any channel.",
  ],

  distributionEyebrow: "Choose exactly where",
  distributionHeadline: "Your list, or a list",
  distributionHighlight: "we build for you",
  distributionIntro:
    "Targeted direct mail means you decide who opens it. Bring your own customer list, or tell us who your best customer is and we'll source a clean, opt-in mailing list that matches — by geography, age, income, homeownership, business type, or new movers into the area.",
  distributionModes: [
    {
      tag: "You have a list",
      title: "Mail your own customers",
      body: "Past clients, leads, your CRM export, or a sphere-of-influence list. We clean and format it, design the card, and mail it. The cheapest, highest-returning mail you can send is to people who already know you.",
      points: [
        "Win-back, loyalty, re-order, and announcement campaigns",
        "We scrub duplicates and bad addresses before printing",
        "Your data stays yours — used only for your campaign",
      ],
    },
    {
      tag: "We build the list",
      title: "Reach the exact people you want",
      body: "No list? We build a targeted one. Tell us your ideal customer and the area, and we pull a list filtered by the demographics that matter to your business — then design and mail to it.",
      points: [
        "Filter by ZIP, radius, age, income, homeowner/renter, new movers",
        "B2B lists by industry, size, and title for commercial campaigns",
        "Only pay to reach people who fit — not the whole zip code",
      ],
    },
  ],

  specs: {
    eyebrow: "Sizes & materials",
    headline: "Built to stand out",
    highlight: "in the stack",
    intro:
      "Bigger cards and heavier stock get noticed first. We'll recommend the size and finish that fits your offer and your postage budget — then design both sides to earn the call.",
    groups: [
      {
        label: "Popular postcard sizes",
        items: ['4" × 6"', '5" × 7"', '5" × 8"', '6" × 9"', '6" × 11"', '6.25" × 9"', '6.5" × 9"', '6.5" × 11"'],
        note: "4×6 and 6×9 hit the lowest postage rates; oversized cards stand out most.",
      },
      {
        label: "Card stock",
        items: ["14pt gloss", "16pt premium", "14pt uncoated (writable)", "100lb gloss cover"],
      },
      {
        label: "Coatings & finishes",
        items: ["Matte", "UV high-gloss", "Aqueous", "Spot UV accents"],
      },
      {
        label: "Mailing options",
        items: ["First-Class", "Standard / Marketing Mail", "Full address + postage handled", "Optional mail tracking"],
        note: "We handle addressing, sorting, postage, and the post-office drop. You just approve the proof.",
      },
    ],
    turnaround: "5–7 business days",
    priceAnchor: "From $135",
    priceNote:
      "Design + print + mailing, quoted flat up front. Per-piece cost drops as quantity climbs — most local runs land at $0.45–$0.90 all-in depending on size, list, and postage class.",
  },

  process: [
    {
      step: "01",
      title: "Quote & strategy (free)",
      body: "Tell us your offer, your area, and who you want to reach. We come back with a flat quote and a recommended size, quantity, and list approach — no jargon, no surprise fees.",
    },
    {
      step: "02",
      title: "Design that earns the open",
      body: "We design both sides around one clear offer and a strong call to action — your brand, your colors, a card people actually act on, not a coupon they toss.",
    },
    {
      step: "03",
      title: "List & proof",
      body: "We clean your list or build a targeted one, then send a digital proof. Nothing prints until you approve it.",
    },
    {
      step: "04",
      title: "Print, mail & track",
      body: "We print, address, sort, and drop it at the post office. Add a QR or offer code and we'll help you measure exactly what came back.",
    },
  ],

  faqs: [
    {
      q: "What's the difference between direct mail and EDDM?",
      a: "Targeted direct mail goes to a specific list of names and addresses you choose, so you can personalize and reach exactly the right people — past customers, a certain income or age, a business type, or new movers. EDDM (Every Door Direct Mail) blankets entire postal routes with no list at all, so it's cheaper per piece but unaddressed. Use targeted mail when who gets it matters; use EDDM when you want everyone in an area. Many businesses run both.",
    },
    {
      q: "Do I need my own mailing list?",
      a: "No. If you have a customer or lead list, that's the best and cheapest place to start and we'll clean it up for you. If you don't, we build a targeted list filtered by the area and the kind of customer you want — by ZIP, radius, age, income, homeownership, new movers, or business type for B2B. You only pay to reach people who fit.",
    },
    {
      q: "How much does a direct mail campaign cost?",
      a: "Local campaigns start at $135, and we quote design, printing, and mailing as one flat price up front. All-in cost usually runs $0.45–$0.90 per piece depending on the card size, your list, and postage class. Mailing your own list and choosing a standard size keeps it at the low end.",
    },
    {
      q: "What response rate should I expect?",
      a: "The ANA's most recent benchmark puts the average response rate for targeted direct mail around 4.4%, versus about 0.12% for email — though your real number depends on your offer, your list, and your follow-up. A strong, specific offer mailed to the right list is what moves the needle, and that's exactly what we design around.",
    },
    {
      q: "Do you handle the printing and the actual mailing, or just the design?",
      a: "All of it. We design the card, print it through our in-house print pipeline, then address, sort, apply postage, and drop it at the post office. One shop, one invoice, no coordinating between a designer, a printer, and the post office yourself.",
    },
    {
      q: "What size postcard works best?",
      a: "Bigger cards get noticed first. A 6×9 or 6×11 stands out in the stack and gives you room for a real offer, while a 4×6 keeps postage lowest for high-volume sends. We'll recommend the size that fits your offer and budget when we quote it.",
    },
    {
      q: "Can I track whether it worked?",
      a: "Yes. We build in a way to measure — a unique offer code, a QR code to a landing page, or a dedicated phone number — so you can tie calls and sales back to the mailer. You'll know what the campaign earned, not just that the phone rang.",
    },
    {
      q: "How fast can you turn a campaign around?",
      a: "Most campaigns are designed, approved, printed, and in the mail within 5–7 business days once we have your offer and list. Need it faster for an event or promotion? Tell us the date and we'll tell you straight whether we can hit it.",
    },
    {
      q: "Is direct mail dead?",
      a: "Far from it — that's exactly why it works. As inboxes and feeds got noisier, the mailbox got quieter, and response rates for mail now beat digital channels by a wide margin. For local businesses competing on trust and proximity, a well-designed card is one of the highest-ROI tools left.",
    },
  ],

  related: [
    {
      href: "/eddm",
      label: "Every Door Direct Mail (EDDM)",
      blurb: "Want to blanket whole neighborhoods without a list? See EDDM.",
    },
    {
      href: "/services/print-design",
      label: "Print & Packaging",
      blurb: "Business cards, flyers, brochures, signage, labels — all in one shop.",
    },
  ],

  schema: {
    serviceType: "Direct mail marketing — design, printing, and mailing",
    category: "Direct Mail Advertising",
  },
};

// ════════════════════════════════════════════════════════════════════════════
//  EVERY DOOR DIRECT MAIL (EDDM)
// ════════════════════════════════════════════════════════════════════════════
const EDDM: MailerProduct = {
  slug: "eddm",
  label: "Every Door Direct Mail (EDDM)",
  shortLabel: "EDDM",
  kind: "eddm",
  noun: "EDDM mailer",

  seoTitle:
    "EDDM — Every Door Direct Mail in Cumming, GA | Designed, Printed & Routed | Branding Zombie",
  seoDescription:
    "Every Door Direct Mail (EDDM) for Cumming, GA & North Atlanta businesses. We design, print, bundle, and handle the post-office drop — saturate entire neighborhoods with no mailing list. From $0.33/piece all-in. Get a quote.",
  keywords: [
    "EDDM Cumming GA",
    "every door direct mail Cumming",
    "EDDM postcards Forsyth County",
    "EDDM printing and mailing GA",
    "EDDM service North Atlanta",
    "neighborhood mailers Cumming",
    "saturation mail Georgia",
    "EDDM full service Cumming GA",
    "every door direct mail small business",
  ],
  ogImage: "/assets/services/print-services/catalog/flyer-sales-sheet.png",

  hero: {
    eyebrow: "Every Door Direct Mail · Cumming, GA",
    headline: "Reach every mailbox,",
    highlight: "skip the mailing list",
    subhead:
      "EDDM saturates entire postal routes — every home on the streets you pick — with no list to buy. We design it, print it, bundle it, and handle the post-office paperwork and drop. You just choose the neighborhoods.",
    microProof: "From ~$0.33/piece all-in · full-service routing · 5–7 day turnaround",
    ctaLabel: "Get my EDDM quote",
    image: {
      src: "/assets/services/print-services/catalog/flyer-sales-sheet.png",
      alt: "Every Door Direct Mail flyer designed and printed by Branding Zombie Designs for a local business",
    },
  },

  answerFirst:
    "Every Door Direct Mail (EDDM) from Branding Zombie Designs is saturation mail for small businesses in Cumming, GA and across North Metro Atlanta — we design and print an oversized card or flyer, then bundle and route it to every address on the postal carrier routes you choose, with no mailing list required. We handle the EDDM paperwork and the post-office drop, and all-in cost typically starts around $0.33 per piece.",
  stats: [
    { value: "$0.247", label: "USPS EDDM retail postage per piece", source: "USPS 2026" },
    { value: "No list", label: "needed — you pick whole carrier routes", source: "" },
    { value: "5,000", label: "pieces a single owner can mail per route, per day", source: "USPS" },
  ],

  benefitsEyebrow: "Why EDDM",
  benefitsHeadline: "Blanket the neighborhood,",
  benefitsHighlight: "for less per door",
  benefits: [
    {
      icon: "MapPin",
      title: "No mailing list to buy",
      body: "EDDM mails to every address on a carrier route, so there's no list to purchase or maintain. You choose neighborhoods on a map — we handle the rest.",
    },
    {
      icon: "CurrencyDollar",
      title: "The lowest postage there is",
      body: "EDDM postage is far cheaper than First-Class — about a quarter per piece — which makes saturating a whole area genuinely affordable for a local business.",
    },
    {
      icon: "Storefront",
      title: "Perfect for local saturation",
      body: "Restaurants, gyms, salons, dentists, contractors, car washes, new openings, grand re-openings — any business where 'everyone nearby is a potential customer' wins with EDDM.",
    },
    {
      icon: "MapPin",
      title: "Target by who lives there",
      body: "Pick routes by ZIP, by radius around your shop, or by the average age, income, and household size of each route — so you saturate the right neighborhoods, not random ones.",
    },
  ],

  edgeEyebrow: "The edge",
  edgeHeadline: "Own a neighborhood",
  edgeHighlight: "before your competitor does",
  edgeIntro:
    "EDDM is the cheapest way to put your brand in every home around your business. For a local shop, being the card on every fridge within three miles is worth more than another boosted post nobody remembers.",
  edgePoints: [
    "Lowest cost-per-household of any mail option — you reach everyone for less.",
    "Ideal for radius marketing: saturate the streets that actually drive to you.",
    "Great for grand openings, seasonal pushes, and 'we're hiring' campaigns.",
    "Pair it with a strong offer and a QR code and it doubles as a coupon people keep.",
  ],

  distributionEyebrow: "Choose exactly where",
  distributionHeadline: "Pick your routes",
  distributionHighlight: "right on the map",
  distributionIntro:
    "EDDM is sold by USPS carrier route — each route is roughly 400–800 homes. We'll pull the routes around your business and show you the household counts, then you pick the neighborhoods you want to saturate. Want a list-based, personalized send instead? That's targeted direct mail.",
  distributionModes: [
    {
      tag: "Full service",
      title: "We handle the whole drop",
      body: "We design and print your card, bundle it in the stacks of 100 USPS requires, fill out the EDDM paperwork, and deliver it to the post office for you. Hands-off saturation — you just approve the proof and pick the routes.",
      points: [
        "Route selection by ZIP, radius, or demographics",
        "Bundling, facing slips, and EDDM forms done for you",
        "We drop it at the post office — no trips for you",
      ],
    },
    {
      tag: "Print only",
      title: "We print, you drop",
      body: "Prefer to take the bundles to the post office yourself to save on service? We'll print your EDDM piece to USPS spec, bundle it correctly, and hand it off ready to mail.",
      points: [
        "Printed to exact EDDM size and indicia requirements",
        "Bundled in 100s with paperwork ready",
        "You handle the post-office drop on your schedule",
      ],
    },
  ],

  specs: {
    eyebrow: "Sizes & materials",
    headline: "Oversized by design",
    highlight: "— that's the point",
    intro:
      "EDDM pieces must clear a minimum size, which is good news: bigger formats command the mailbox. From a jumbo postcard to a folded flyer, we'll match the format to your offer and keep it inside EDDM spec.",
    groups: [
      {
        label: "EDDM postcard sizes",
        items: ['6.25" × 9"', '6.5" × 9"', '6.5" × 11"', '8.5" × 11"'],
        note: "All meet USPS EDDM minimums — no guessing whether it qualifies.",
      },
      {
        label: "Flyers, brochures & folds",
        items: ['8.5" × 11"', '9" × 12"', '11" × 17"', '12" × 18"', "Half-fold", "Tri-fold"],
      },
      {
        label: "Card & paper stock",
        items: ["14pt gloss", "16pt premium", "80lb gloss cover", "100lb gloss book"],
      },
      {
        label: "Coatings & service",
        items: ["Matte", "UV gloss", "Aqueous", "Full-service or print-only", "Bundled in 100s"],
      },
    ],
    turnaround: "5–7 business days",
    priceAnchor: "From ~$0.33/piece",
    priceNote:
      "All-in (print + ~$0.247 USPS postage) typically runs $0.33–$0.50 per piece depending on size and stock, quoted flat up front. Print-only runs cost less since you handle the drop.",
  },

  process: [
    {
      step: "01",
      title: "Pick routes & quote (free)",
      body: "Tell us where your customers come from. We pull the carrier routes around you with household counts, recommend a size, and quote print + postage as one flat number.",
    },
    {
      step: "02",
      title: "Design to EDDM spec",
      body: "We design an oversized card or flyer built around one clear offer — sized and laid out to meet USPS EDDM requirements so it never gets rejected at the counter.",
    },
    {
      step: "03",
      title: "Print, bundle & paperwork",
      body: "We print it, bundle it in the stacks of 100 USPS requires, prepare the facing slips and EDDM forms, and send you a proof before anything runs.",
    },
    {
      step: "04",
      title: "Drop & deliver",
      body: "Full service? We drop it at the post office for you. Print only? We hand you mail-ready bundles. Either way, your card lands in every mailbox on the routes you chose.",
    },
  ],

  faqs: [
    {
      q: "What is EDDM and how does it work?",
      a: "EDDM stands for Every Door Direct Mail, a USPS program that lets a business mail to every address on a postal carrier route without a mailing list. You pick the routes — each is roughly 400–800 homes — and the post office delivers your piece to every door on them. It's the cheapest way to saturate a neighborhood. We design, print, bundle, and handle the EDDM paperwork and drop for you.",
    },
    {
      q: "What's the difference between EDDM and regular direct mail?",
      a: "EDDM blankets entire carrier routes with no list and no names, so it's cheaper per piece but unaddressed and not personalized. Targeted direct mail goes to a specific list of names and addresses you choose, so you can reach exactly the right people and personalize the message — at a higher cost per piece. Use EDDM when everyone nearby is a potential customer; use targeted mail when who gets it matters.",
    },
    {
      q: "Do I need a mailing list for EDDM?",
      a: "No — that's the whole point. EDDM mails to every address on the routes you select, so there's no list to buy, rent, or maintain. You choose the neighborhoods on a map and the post office handles delivery to every door.",
    },
    {
      q: "How much does EDDM cost?",
      a: "USPS EDDM retail postage is about $0.247 per piece in 2026. Add printing and an oversized card usually lands at $0.33–$0.50 all-in, quoted flat up front. Print-only runs cost less since you drop the bundles yourself. It's the lowest cost-per-household of any mail option.",
    },
    {
      q: "How do I choose which neighborhoods to mail?",
      a: "We pull the USPS carrier routes around your business and show you each route's household count — and, if it matters to you, the average age, income, and household size. You pick the routes that match your customers. You can target by ZIP, by a radius around your shop, or by the demographics of each route.",
    },
    {
      q: "Do you handle the post-office drop and paperwork?",
      a: "With full service, yes — we bundle the pieces in the stacks of 100 USPS requires, fill out the EDDM forms and facing slips, and deliver it to the post office for you. Prefer print-only? We print and bundle it mail-ready and you take it in on your own schedule for a lower cost.",
    },
    {
      q: "Is there a minimum or maximum quantity?",
      a: "A single business can mail up to 5,000 EDDM pieces per route per day under the retail program, and most local campaigns fall well under that. There's no list minimum — you can start with one route near your shop or saturate several. We'll right-size it to your budget when we quote.",
    },
    {
      q: "What size does an EDDM piece have to be?",
      a: "EDDM pieces must clear a USPS minimum size, which is why they're oversized — a 6.5×9 jumbo postcard is the most common, and flyers up to 12×18 and folded formats also qualify. We design every piece to meet the size and indicia requirements so it's never rejected at the post office.",
    },
    {
      q: "How fast can you get an EDDM campaign out?",
      a: "Most EDDM campaigns are designed, approved, printed, bundled, and dropped within 5–7 business days. If you're timing it to a grand opening or seasonal push, tell us the date and we'll tell you straight whether we can hit it.",
    },
  ],

  related: [
    {
      href: "/direct-mail",
      label: "Targeted Direct Mail",
      blurb: "Need to reach a specific list, not a whole route? See targeted direct mail.",
    },
    {
      href: "/services/print-design",
      label: "Print & Packaging",
      blurb: "Business cards, flyers, brochures, signage, labels — all in one shop.",
    },
  ],

  schema: {
    serviceType: "Every Door Direct Mail (EDDM) — design, printing, and full-service routing",
    category: "Direct Mail Advertising",
  },
};

// ─── Registry + getters ─────────────────────────────────────────────────────
export const MAILER_PRODUCTS: Record<MailerSlug, MailerProduct> = {
  "direct-mail": DIRECT_MAIL,
  eddm: EDDM,
};

export function getMailerProduct(slug: string): MailerProduct | undefined {
  return (MAILER_PRODUCTS as Record<string, MailerProduct>)[slug];
}

export function getAllMailerSlugs(): MailerSlug[] {
  return Object.keys(MAILER_PRODUCTS) as MailerSlug[];
}

// CTA hrefs reused across components.
export const MAILER_CTA = {
  calendly: CALENDLY_URL,
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  PER-CITY LOCAL COPY (mailer-specific — do NOT reuse locations.ts web copy)
// ════════════════════════════════════════════════════════════════════════════
// Keyed by the Location.slug in src/data/locations.ts. Each entry is hand-
// written and references real local specifics so the 20 city pages are not
// thin "mad-libs" content. `intro` is one sentence; `angle` is ~60–95 words;
// `cityFaq` is one mailer-specific local Q&A used in the FAQ + FAQPage schema.
export interface MailerCityCopy {
  intro: string;
  angle: string;
  cityFaq: MailerFaq;
}

export const MAILER_CITY_COPY: Record<string, MailerCityCopy> = {
  "cumming-ga": {
    intro:
      "Cumming is home base — we know which subdivisions off Post Road and Buford Dam are filling with new movers and money to spend.",
    angle:
      "Cumming and Forsyth County are growing faster than almost anywhere in Georgia, and new rooftops mean new customers who don't know you exist yet. Mail is how a local restaurant on Market Place Blvd, a contractor working the Vickery and Lake Lanier subdivisions, or a dental or wellness practice near Northside Forsyth gets in front of those households before the competition does. We're local, so your card gets designed by the same person who drives GA-400 every day.",
    cityFaq: {
      q: "Do you do direct mail and EDDM for Cumming, GA businesses?",
      a: "Yes — Cumming is our home base. We design, print, and mail postcards and EDDM for Cumming and Forsyth County businesses, from restaurants and contractors to medical and retail. We can target specific neighborhoods off Post Road, Buford Dam, and around The Collection, or saturate whole routes with EDDM — and we handle the post-office drop.",
    },
  },
  "alpharetta-ga": {
    intro:
      "Alpharetta households are affluent and busy — a well-designed card cuts through where another email never would.",
    angle:
      "Between Avalon, downtown Alpharetta, and the Windward corridor, your customers are high-income, time-strapped, and bombarded with digital ads. A polished mailer lands on the counter of homes that can afford your service and actually gets seen. For Alpharetta restaurants, med-spas, home-service pros, and professional firms, targeted mail to the right neighborhoods — or EDDM saturation of the streets near you — puts a premium-looking piece in front of premium buyers.",
    cityFaq: {
      q: "Can you mail to specific Alpharetta neighborhoods?",
      a: "Absolutely. We can target Alpharetta direct mail by neighborhood, income, and homeownership — think the Avalon area, Windward, or specific subdivisions — or run EDDM to saturate whole carrier routes near your business. We're 20 minutes up GA-400 in Cumming and know the North Fulton market.",
    },
  },
  "johns-creek-ga": {
    intro:
      "Johns Creek is one of the most affluent, research-heavy markets in the state — a credible piece of mail earns trust before the first call.",
    angle:
      "Johns Creek households research before they buy and expect polish. For the medical and dental practices around Medlock Bridge, the financial and professional firms near Technology Park, and the med-spas and restaurants competing for that spend, a well-designed mailer signals you belong in the conversation. We target by neighborhood and demographics so your card reaches the high-value households most likely to become patients and clients.",
    cityFaq: {
      q: "Does direct mail work for Johns Creek practices and professional firms?",
      a: "It works well here because Johns Creek households are affluent and trust-driven. We design credible, premium-feeling mailers and target them by neighborhood and income — or saturate routes with EDDM — so practices and firms around Medlock Bridge and Technology Park reach the right Johns Creek households.",
    },
  },
  "milton-ga": {
    intro:
      "Milton sells craftsmanship and quiet luxury — your mailer should feel as considered as the work you do.",
    angle:
      "Milton protects its upscale, horse-country character, and the businesses that win here — custom builders, landscapers, boutiques, equestrian and premium home services — sell trust, not discounts. A generic flyer undercuts that. We design elegant mailers and target Milton's higher-value households around Crabapple and Birmingham Highway, so a premium local business reaches premium local buyers without an agency price tag.",
    cityFaq: {
      q: "Can you do upscale direct mail for Milton, GA businesses?",
      a: "Yes. We design premium, on-brand mailers that match Milton's craftsmanship-first feel, then target them to the right Crabapple and Birmingham Highway households by income and homeownership — or run EDDM on the routes nearest your business. High-end look, flat small-business pricing.",
    },
  },
  "suwanee-ga": {
    intro:
      "Suwanee runs on family businesses and foot traffic around Town Center — mail wins the household before the visit.",
    angle:
      "Suwanee is one of the most family-friendly towns in Georgia, and parents decide fast and locally — the restaurants and shops around Suwanee Town Center, the gyms and youth programs, the dentists and home-service pros they find between school pickups. A mailer with a clear family-friendly offer lands on the fridge and gets used. We target Suwanee neighborhoods along the Peachtree Industrial corridor or saturate them with EDDM.",
    cityFaq: {
      q: "Is EDDM good for a family-focused Suwanee business?",
      a: "Very. EDDM lets a Suwanee gym, restaurant, dentist, or kids' program blanket the family neighborhoods around Town Center and Peachtree Industrial for the lowest cost per home — no list needed. We design the piece, bundle it, and handle the post-office drop.",
    },
  },
  "buford-ga": {
    intro:
      "Buford pulls shoppers from three counties around the Mall of Georgia — saturating the right routes puts you in their path.",
    angle:
      "Buford sits at a crossroads: the Mall of Georgia draws regional traffic, Lake Lanier brings the seasonal crowd, and the I-985 corridor is thick with auto shops, contractors, and restaurants. For local trades and retail, owning the mailboxes in the neighborhoods that feed your business beats fighting for attention online. We run targeted mail to your best ZIPs or EDDM saturation of the routes around Mall of Georgia and Lake Lanier.",
    cityFaq: {
      q: "Can EDDM help my Buford auto shop or contracting business?",
      a: "Yes. EDDM is ideal for Buford trades and auto shops — saturate the residential routes near your shop and along I-985 for the lowest cost per household, with no list to buy. Add a clear offer and a QR code and the card doubles as a coupon people keep on the fridge.",
    },
  },
  "dawsonville-ga": {
    intro:
      "Dawsonville mixes weekend tourism with a fast-growing local base — mail reaches the residents who become regulars.",
    angle:
      "Dawsonville is the gateway to the North Georgia mountains — the Premium Outlets, Dawson Forest, and the wineries pull weekend visitors up GA-400, but your repeat business comes from the locals. EDDM saturates the growing residential routes around Dawsonville so restaurants, contractors, and shops turn nearby households into regulars, while targeted mail reaches specific subdivisions. We're just down GA-400 in Cumming.",
    cityFaq: {
      q: "Do you handle direct mail for Dawsonville, GA businesses?",
      a: "Yes. We design, print, and mail for Dawsonville restaurants, wineries, outdoor and tourism businesses, contractors, and retail near the Outlets. We can saturate the residential routes with EDDM or target specific subdivisions — and we know the Dawson County market from just down GA-400.",
    },
  },
  "gainesville-ga": {
    intro:
      "Gainesville is one of the most bilingual markets in North Georgia — we design and write mailers in English, Spanish, or both.",
    angle:
      "Gainesville anchors Hall County around Northeast Georgia Medical Center and one of the region's largest Latino business communities. A mailer that speaks to every household — not half of it — reaches buyers your competitors miss. We're bilingual, so we design and write your card in English, Spanish, or fully bilingual, then target the neighborhoods around the square and Lake Lanier or saturate routes with EDDM.",
    cityFaq: {
      q: "¿Hacen correo directo en español? / Do you do bilingual direct mail in Gainesville?",
      a: "Sí. Gerry is fluent in Spanish, so we design and write mailers and EDDM pieces in Spanish, English, or fully bilingual — not machine-translated. For Gainesville's large Spanish-speaking customer base, that means your card actually connects and you reach households your competitors are missing.",
    },
  },
  "roswell-ga": {
    intro:
      "Roswell's Canton Street runs on character and reputation — your mailer should carry that same personality.",
    angle:
      "Roswell rewards personality and punishes generic. Between Canton Street's dining and nightlife, the riverfront, and the boutiques, salons, and firms around them, a cookie-cutter coupon falls flat. We design mailers with real character and target the historic-district and surrounding neighborhoods — or saturate nearby routes with EDDM — so the personality that fills your space comes through in the mailbox.",
    cityFaq: {
      q: "Can you design a direct mail piece with personality for my Roswell business?",
      a: "That's our specialty. Every Roswell mailer we design is custom — no template coupon — so the character of your Canton Street restaurant, boutique, or salon comes through. We then target the right historic-Roswell neighborhoods or run EDDM on nearby routes to put it in the right mailboxes.",
    },
  },
  "woodstock-ga": {
    intro:
      "Downtown Woodstock is one of metro Atlanta's hottest small-town scenes — local mail helps you stand out in a crowded market.",
    angle:
      "Woodstock punches above its size — downtown Woodstock and Towne Lake pull crowds from across Cherokee County, which means real competition for local attention. A distinctive mailer in the right neighborhoods cuts through where another social post disappears. We design cards that look nothing like your competitors' and target the Woodstock and Towne Lake routes, or saturate them with EDDM so the downtown buzz turns into customers choosing you.",
    cityFaq: {
      q: "How does direct mail help my Woodstock business stand out?",
      a: "Two ways: a custom-designed mailer that looks nothing like the template coupons your competitors send, and precise targeting — we mail to the Woodstock and Towne Lake neighborhoods that feed your business, or saturate whole routes with EDDM. Distinct in the mailbox, delivered to the right doors.",
    },
  },
};

export function getMailerCityCopy(slug: string): MailerCityCopy | undefined {
  return MAILER_CITY_COPY[slug];
}
