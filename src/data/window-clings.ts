// ─── Window Graphics & Clings product data — single source of truth ──────────
// Powers the standalone /window-clings pillar page AND its per-city variations
// (/window-clings/[city]). One WindowClingsProduct config holds every piece of
// copy, the material/finish specs, the AEO answer-first sentence, the researched
// FAQ, and the Schema.org fields. City-specific local copy lives in
// WINDOW_CLINGS_CITY_COPY below and is merged in at render time.
//
// Voice rules (mirror BUSINESS-CONTEXT.md): plain English, local, warm, no
// jargon. "Looking pretty is table stakes — making you money is the job."
// Words to use: storefront, window, glass, decal, sign, local, Cumming,
// Forsyth, fast, in-house, one shop, real. Avoid: "collateral," "brand
// architecture," agency speak.
//
// PRICING: quote-only by owner's direction. NEVER print a dollar figure or a
// "from $X" anchor anywhere in this file. Every price reference is a flat,
// free quote sized to the job.
//
// CONFIDENTIAL CONSTRAINT: never reference trade printers, wholesale resellers,
// or "we don't own a press." Public framing is an in-house print pipeline. The
// value sold is design, print-prep, on-site installation, and one-invoice ease.
//
// Product facts (substrates, perforation, mils) come from standard window-
// graphics manufacturing and are presented as material specs — never as
// Branding Zombie's own performance results.

import { CALENDLY_URL } from "@/lib/site";

export type WindowClingsSlug = "window-clings";

// Subset of the @/components/icons barrel that the window-clings page maps.
// Kept to icons confirmed present in the barrel (see MailerPage imports).
export type WCIconName =
  | "Eye"
  | "Storefront"
  | "Sparkle"
  | "Lightning"
  | "Handshake"
  | "Target"
  | "MapPin"
  | "Package"
  | "Clock"
  | "ChartLineUp"
  | "CurrencyDollar";

export interface WCStat {
  /** Big value/label, e.g. "70/30". */
  value: string;
  /** What it measures, e.g. "one-way vision film". */
  label: string;
  /** Optional small note, e.g. "see out, they can't see in". */
  source?: string;
}

export interface WCBenefit {
  icon: WCIconName;
  title: string;
  body: string;
}

export interface WCProductType {
  /** Short chip, e.g. "One-way vision". */
  tag: string;
  title: string;
  body: string;
  points: string[];
}

export interface WCInstallMode {
  tag: string;
  title: string;
  body: string;
  points: string[];
}

export interface WCSpecGroup {
  label: string;
  items: string[];
  note?: string;
}

export interface WCProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface WCFaq {
  q: string;
  a: string;
}

export interface WCGalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface WCRelated {
  href: string;
  label: string;
  blurb: string;
}

export interface WindowClingsProduct {
  slug: WindowClingsSlug;
  /** Full label. */
  label: string;
  /** Short label for chips/breadcrumbs. */
  shortLabel: string;
  /** Noun used in prose, e.g. "window graphics" → "your {city} window graphics". */
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
  stats: WCStat[];

  // ── Benefits ──
  benefitsEyebrow: string;
  benefitsHeadline: string;
  benefitsHighlight: string;
  benefits: WCBenefit[];

  // ── The edge (design + print + install in one shop) ──
  edgeEyebrow: string;
  edgeHeadline: string;
  edgeHighlight: string;
  edgeIntro: string;
  edgePoints: string[];

  // ── Product types ("pick your glass effect") ──
  typesEyebrow: string;
  typesHeadline: string;
  typesHighlight: string;
  typesIntro: string;
  productTypes: WCProductType[];

  // ── Installation ("we put it on the glass") ──
  installEyebrow: string;
  installHeadline: string;
  installHighlight: string;
  installIntro: string;
  installModes: WCInstallMode[];

  // ── Specs (materials / finishes / sizes) ──
  specs: {
    eyebrow: string;
    headline: string;
    highlight: string;
    intro: string;
    groups: WCSpecGroup[];
    turnaround: string;
    /** Quote-only — a phrase, never a dollar figure. */
    priceAnchor: string;
    priceNote: string;
  };

  // ── Process ──
  process: WCProcessStep[];

  // ── Gallery (real work + storefront mockups) ──
  gallery: WCGalleryItem[];

  // ── FAQ (city-agnostic, AEO) ──
  faqs: WCFaq[];

  // ── Cross-links ──
  related: WCRelated[];

  // ── Schema ──
  schema: { serviceType: string; category: string };
}

// ════════════════════════════════════════════════════════════════════════════
//  WINDOW GRAPHICS & CLINGS
// ════════════════════════════════════════════════════════════════════════════
const WINDOW_CLINGS: WindowClingsProduct = {
  slug: "window-clings",
  label: "Window Graphics, Clings & Storefront Decals",
  shortLabel: "Window Graphics",
  noun: "window graphics",

  // No trailing brand — the root layout's title template appends
  // "| Branding Zombie Designs" once.
  seoTitle:
    "Window Clings & Storefront Graphics in Cumming, GA — Designed, Printed & Installed",
  seoDescription:
    "Custom window clings, decals, and storefront graphics for Cumming, GA & North Atlanta businesses. We design it, print it, and install it on your glass — one-way vision, frosted privacy, clear clings, full window walls. One shop, one invoice. Get a free quote.",
  keywords: [
    "window clings Cumming GA",
    "storefront window graphics Cumming",
    "window decals Forsyth County",
    "perforated window film North Atlanta",
    "one-way vision window graphics GA",
    "frosted window film Cumming",
    "custom window clings Georgia",
    "window graphics installation Cumming GA",
    "storefront window lettering Forsyth County",
    "business window decals North Metro Atlanta",
  ],
  ogImage: "/assets/services/window-clings/window-graphics-storefront-hero.png",

  hero: {
    eyebrow: "Window Graphics & Clings · Cumming, GA",
    headline: "Turn your storefront glass into a",
    highlight: "sign that sells",
    subhead:
      "Custom window clings, decals, and storefront graphics — designed, printed, and installed on your glass. Promote a sale, brand the front, frost the bottom for privacy, or cover the whole window wall. One shop, one invoice, done right the first time.",
    microProof:
      "Designed + printed + installed · free flat quote · most jobs in 5–7 days",
    ctaLabel: "Get my window graphics quote",
    image: {
      src: "/assets/services/window-clings/window-graphics-storefront-hero.png",
      alt: "Custom storefront window graphics designed, printed, and installed by Branding Zombie Designs in Cumming, GA",
    },
  },

  answerFirst:
    "Window graphics from Branding Zombie Designs are custom clings, decals, and storefront films for small businesses in Cumming, GA and across North Metro Atlanta — we design the graphic, print it, and install it on your glass. That covers everything from a one-week promo cling to one-way vision film, frosted privacy bands, hours-and-logo lettering, and full window-wall coverage. It's one shop and one flat quote, sized to your glass and the look you want.",
  stats: [
    { value: "70/30", label: "one-way vision film", source: "you see out — they can't see in" },
    { value: "1 shop", label: "design, print & install", source: "one invoice, no vendor juggling" },
    { value: "5–7 days", label: "typical turnaround", source: "faster when you have a deadline" },
  ],

  benefitsEyebrow: "Why window graphics",
  benefitsHeadline: "Your biggest, cheapest billboard is",
  benefitsHighlight: "already on your building",
  benefits: [
    {
      icon: "Eye",
      title: "It catches the eye that's already walking by",
      body: "Foot traffic and drive-by traffic look right at your glass. A bold graphic turns a blank window into a reason to slow down, read, and come in — no ad spend, no algorithm.",
    },
    {
      icon: "Storefront",
      title: "It makes a small shop look established",
      body: "Clean logo lettering, hours, and a tagline on the door signal you're a real, dialed-in business. Bare or taped-paper windows say the opposite — and customers notice.",
    },
    {
      icon: "Sparkle",
      title: "Swap it whenever the offer changes",
      body: "Run a grand-opening cling, switch to a seasonal sale, then a 'now hiring' panel. Removable clings and decals let your window keep up with your business.",
    },
    {
      icon: "Eye",
      title: "Privacy without bricking up the window",
      body: "Frosted and one-way vision film gives you privacy or shade where you need it — bathrooms, offices, conference glass, the lower half of a storefront — while still letting light in.",
    },
  ],

  edgeEyebrow: "The edge",
  edgeHeadline: "Most shops design it one place,",
  edgeHighlight: "print it another, and install it never",
  edgeIntro:
    "The usual window-graphics headache is three phone calls: a designer who can't print, a printer who won't measure your glass, and you on a ladder with a squeegee and a fistful of bubbles. We do all three under one roof.",
  edgePoints: [
    "One person designs it, preps the print files, and gets it on the glass — nothing falls through the cracks between vendors.",
    "We measure the real opening and design to it, so the graphic fits the glass instead of the glass fighting the graphic.",
    "Bubble-free, lined-up, professional install — or print-only shipped ready to apply if you'd rather do it yourself.",
    "It matches the rest of your brand, because the same shop does your logo, signs, cards, and wraps.",
  ],

  typesEyebrow: "Pick your glass effect",
  typesHeadline: "From a quick promo cling to a",
  typesHighlight: "full window wall",
  typesIntro:
    "Window graphics aren't one product — they're a toolbox. Tell us what the window needs to do and we'll recommend the right material and finish. Here's the menu, in plain English.",
  productTypes: [
    {
      tag: "See out, hide in",
      title: "One-way vision (perforated film)",
      body: "Perforated vinyl prints a full-color graphic on the outside while you still see clearly out from the inside. Perfect for big storefront windows and glass doors where you want impact without blacking out the view.",
      points: [
        "70/30 perforation — bold graphic outside, clear view inside",
        "Great for full-window murals, promos, and door graphics",
        "Lets daylight through so the inside doesn't go dark",
      ],
    },
    {
      tag: "Easy on, easy off",
      title: "Clear & white window clings",
      body: "Static-style clings grip the glass with no sticky residue, so they're easy to put up, take down, and swap. Ideal for limited-time sales, seasonal art, and anything you'll change out.",
      points: [
        "Clear cling lets the glass show through behind your art",
        "White cling reads bold and opaque for high-contrast offers",
        "Removable and reusable — change the message any time",
      ],
    },
    {
      tag: "Privacy + shade",
      title: "Frosted & etched-glass film",
      body: "A frosted, etched-glass look adds privacy and a high-end feel without the cost of real etched glass. Band the bottom of a storefront, screen an office or bathroom, or cut your logo out of the frost.",
      points: [
        "Privacy bands, conference rooms, restrooms, and office glass",
        "Logo or pattern can be 'knocked out' of the frosted area",
        "Diffuses light and glare while keeping the room bright",
      ],
    },
    {
      tag: "Block it out",
      title: "Opaque graphics & full coverage",
      body: "Solid, opaque film for when you want zero see-through — bold single- or double-sided graphics, blackout panels, or a full window wall that turns plain glass into a branded backdrop.",
      points: [
        "Single- or double-sided printing for inside-and-out messages",
        "Full window walls, vestibules, and feature backdrops",
        "Heavy, durable film built to last on high-traffic glass",
      ],
    },
    {
      tag: "The essentials",
      title: "Logo, hours & lettering decals",
      body: "Cut or printed vinyl lettering for the stuff every storefront needs: your logo on the door, business hours, phone and website, 'open / closed,' and 'push / pull.' Small job, big difference in looking legit.",
      points: [
        "Door logo, hours, contact info, and entrance decals",
        "Crisp cut vinyl in your brand colors, sized to the door",
        "The fastest, lowest-cost way to look like a real business",
      ],
    },
    {
      tag: "Anywhere glass",
      title: "Vehicle & specialty glass graphics",
      body: "Window graphics aren't just for storefronts. Perforated rear-window graphics for vehicles, partition and cooler-door decals, and specialty glass throughout your space — all designed to match your brand.",
      points: [
        "Vehicle rear-window perforated graphics",
        "Cooler doors, partitions, and interior glass",
        "Consistent branding from the truck to the front door",
      ],
    },
  ],

  installEyebrow: "We put it on the glass",
  installHeadline: "Designed and printed is half the job —",
  installHighlight: "installed is the whole job",
  installIntro:
    "Anyone can mail you a roll of vinyl. The difference is a clean, bubble-free, perfectly-aligned install that looks like it came with the building. Pick the level of hands-off you want.",
  installModes: [
    {
      tag: "Full service",
      title: "We measure, print & install",
      body: "We come out, measure your actual glass, design to fit, print it, and install it on-site — squeegeed flat, lined up, and bubble-free. You unlock the door and approve the proof; we handle the rest.",
      points: [
        "On-site measure so the graphic fits the real opening",
        "Professional, bubble-free application on storefronts and doors",
        "Local install across Forsyth County and the GA-400 corridor",
      ],
    },
    {
      tag: "Print only",
      title: "We print, you apply",
      body: "Want to save on install or have a handy team? We design and print your graphic to size with application tape and clear instructions, and ship it ready to apply on your own schedule.",
      points: [
        "Printed to exact size with transfer/application tape",
        "Simple step-by-step so it goes on straight",
        "Great for simple decals, lettering, and smaller windows",
      ],
    },
  ],

  specs: {
    eyebrow: "Materials & finishes",
    headline: "The right film for",
    highlight: "the right window",
    intro:
      "We match the material to the job — how long it needs to last, whether you want to see through it, and how often you'll change it. Here's what we work with.",
    groups: [
      {
        label: "Window films & substrates",
        items: [
          "Perforated one-way vision",
          "Clear cling",
          "White cling",
          "Frosted / etched film",
          "Opaque vinyl",
          "Cut vinyl lettering",
        ],
        note: "Not sure which? Tell us what the window needs to do and we'll spec it for you.",
      },
      {
        label: "Finishes & options",
        items: [
          "Full-color print",
          "Single or double-sided",
          "Matte or gloss laminate",
          "Contour / kiss-cut shapes",
          "Indoor or outdoor rated",
        ],
      },
      {
        label: "Where it goes",
        items: [
          "Storefront windows",
          "Glass entry doors",
          "Office & conference glass",
          "Restroom & partition glass",
          "Cooler & display cases",
          "Vehicle rear windows",
        ],
      },
      {
        label: "Sizing & install",
        items: [
          "Cut to any size",
          "On-site measure",
          "Full-service install",
          "Print-only with app tape",
          "Removable or permanent",
        ],
        note: "We design to the real opening, so the graphic fits the glass — not the other way around.",
      },
    ],
    turnaround: "5–7 business days",
    // QUOTE-ONLY: no dollar figures by owner direction.
    priceAnchor: "Free flat quote",
    priceNote:
      "Every window job is quoted flat up front — sized to your glass, the film you need, and whether we install it or ship it ready to apply. No surprise add-ons, no per-hour install meter. One number, all in.",
  },

  process: [
    {
      step: "01",
      title: "Tell us the window (free quote)",
      body: "Send a photo of the glass and what you want it to do — a sale, your logo and hours, privacy, a full wall. We come back with a flat quote and a recommended material. No jargon, no surprise fees.",
    },
    {
      step: "02",
      title: "Design that fits the glass",
      body: "We design the graphic around one clear message — your brand, your colors, sized to the real opening. You see a proof on a mockup of your actual storefront before anything prints.",
    },
    {
      step: "03",
      title: "Print & proof",
      body: "Once you approve it, we print it on the right film with the finish the job calls for. Nothing goes to the glass until you've signed off on the proof.",
    },
    {
      step: "04",
      title: "Install (or ship it ready)",
      body: "We install it on-site — flat, aligned, and bubble-free — or ship it print-only with application tape and instructions if you'd rather apply it yourself.",
    },
  ],

  gallery: [
    {
      src: "/assets/industries/restaurants/cafe-window-sign-design.webp",
      alt: "Café storefront window with custom hours and logo graphics in Cumming, GA",
      caption: "Café storefront lettering & hours",
    },
    {
      src: "/assets/industries/salons-barbershops/barbershop-window-decal-design.webp",
      alt: "Barbershop window decal and logo graphics designed and installed by Branding Zombie Designs",
      caption: "Barbershop window decals",
    },
    {
      src: "/assets/industries/restaurants/restaurant-storefront-branding-cumming-ga.webp",
      alt: "Restaurant storefront branded with window graphics in Forsyth County, GA",
      caption: "Restaurant storefront branding",
    },
    {
      src: "/assets/industries/auto-repair/auto-shop-window-sign-design.webp",
      alt: "Auto shop window signage and service graphics in North Metro Atlanta",
      caption: "Auto shop window signage",
    },
  ],

  faqs: [
    {
      q: "What's the difference between a window cling and a window decal?",
      a: "A window cling grips the glass with static or a light cling backing and peels off clean with no residue, so it's perfect for limited-time sales and anything you'll swap out. A window decal is an adhesive vinyl graphic — cut lettering or a printed piece — that sticks more permanently and is great for logos, hours, and long-term branding. We'll recommend whichever fits how long you need it up and how often you'll change it.",
    },
    {
      q: "What is one-way vision (perforated) window film?",
      a: "Perforated film is vinyl with tiny holes — usually a 70/30 pattern — so a full-color graphic shows on the outside while you still see clearly out from the inside. It's the go-to for big storefront windows and glass doors when you want a bold graphic without blacking out the view or making the inside dark.",
    },
    {
      q: "Do you install the window graphics, or just print them?",
      a: "Both — your choice. Full service means we measure your actual glass, design to fit, print it, and install it on-site, squeegeed flat and bubble-free. Prefer to apply it yourself or save on install? We'll print it to exact size with application tape and clear instructions and ship it ready to go.",
    },
    {
      q: "How much do custom window graphics cost?",
      a: "It depends on the size of the glass, the film, and whether we install it — so we quote every job flat up front instead of guessing. Send a photo of the window and what you want it to do, and we'll come back with one all-in number with no surprise add-ons or per-hour install meter.",
    },
    {
      q: "Can I get privacy on my windows without blocking the light?",
      a: "Yes. Frosted and etched-glass film adds privacy and a high-end look while still letting daylight through — ideal for the lower band of a storefront, conference rooms, offices, and restrooms. One-way vision film also gives you privacy from the outside while you see out. We can even knock your logo out of the frosted area.",
    },
    {
      q: "Will clings and film damage my glass or leave residue?",
      a: "No. Clings and quality window films are designed to come off clean. Removable clings and decals peel away with no residue, which is exactly why they're so good for seasonal and promotional graphics. For longer-term graphics we use films rated for the job, and we remove old graphics cleanly when it's time for a refresh.",
    },
    {
      q: "How long do window graphics last?",
      a: "It depends on the material and where it lives. Removable promo clings are made to come and go in weeks or a season. Quality printed films and cut vinyl on a storefront hold up for years outdoors with the right laminate. When you tell us how long you want it up, we spec the film to match.",
    },
    {
      q: "Do you do window graphics for vehicles too?",
      a: "Yes. Perforated one-way vision film works great on vehicle rear windows — a full graphic outside while the driver still sees out. We also do cut-vinyl lettering and decals for vehicle glass, and it all matches the rest of your brand since the same shop does your logo, signs, and wraps.",
    },
    {
      q: "Can you match my existing logo and brand colors?",
      a: "Absolutely — and if your logo files are low-res or missing, we can clean them up or rebuild them. Because we handle your branding, print, and signage in one shop, your window graphics line up with your cards, your truck, and your sign instead of looking like a different company made them.",
    },
    {
      q: "Do you install window graphics outside of Cumming?",
      a: "Yes. We're based in Cumming and install across Forsyth County, North Fulton, and the GA-400 / North Metro Atlanta corridor — Alpharetta, Johns Creek, Milton, Suwanee, Buford, Dawsonville, and the towns around them. Tell us where your storefront is and we'll confirm the install in your quote.",
    },
  ],

  related: [
    {
      href: "/services/print-design",
      label: "Print, Signage & Packaging",
      blurb: "Banners, yard signs, business cards, labels, large format — all in one shop.",
    },
    {
      href: "/direct-mail",
      label: "Direct Mail & EDDM",
      blurb: "Drive the foot traffic that reads your window — mail the neighborhood around you.",
    },
    {
      href: "/services/logo-design",
      label: "Logo design",
      blurb: "Low-res or missing logo files? We rebuild marks that hold up at window scale.",
    },
    {
      href: "/services/branding",
      label: "Brand identity",
      blurb: "Colors, type, and voice that match your glass, your cards, and your truck.",
    },
  ],

  schema: {
    serviceType:
      "Window graphics, clings, and storefront decals — design, printing, and installation",
    category: "Signage & Window Graphics",
  },
};

// ─── Registry + getters ─────────────────────────────────────────────────────
export const WINDOW_CLINGS_PRODUCT = WINDOW_CLINGS;

export function getWindowClingsProduct(): WindowClingsProduct {
  return WINDOW_CLINGS;
}

// CTA hrefs reused across components.
export const WINDOW_CLINGS_CTA = {
  calendly: CALENDLY_URL,
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  PER-CITY LOCAL COPY (window-graphics-specific — do NOT reuse locations.ts)
// ════════════════════════════════════════════════════════════════════════════
// Keyed by the Location.slug in src/data/locations.ts. Each entry is hand-
// written and references real local specifics so the city pages are not thin
// "mad-libs" content. `intro` is one sentence; `angle` is ~60–95 words; `cityFaq`
// is one window-graphics-specific local Q&A used in the FAQ + FAQPage schema.
export interface WindowClingsCityCopy {
  intro: string;
  angle: string;
  cityFaq: WCFaq;
}

export const WINDOW_CLINGS_CITY_COPY: Record<string, WindowClingsCityCopy> = {
  "cumming-ga": {
    intro:
      "Cumming is home base — we install storefront graphics up and down GA-400, The Collection, and the Market Place Blvd corridors every week.",
    angle:
      "Cumming and Forsyth County are growing fast, and a sharp storefront is how a new shop on Market Place Blvd, a salon near The Collection, or a restaurant off Buford Dam gets noticed by all those new rooftops. Bare glass blends in; a bold window graphic stops traffic. We're local, so the same person who designs your window measures the glass and installs it — no waiting on an out-of-town crew.",
    cityFaq: {
      q: "Do you design and install window graphics for Cumming, GA businesses?",
      a: "Yes — Cumming is our home base. We design, print, and install window clings, decals, one-way vision film, frosted privacy film, and full storefront graphics for Cumming and Forsyth County businesses, from restaurants and salons to retail and offices around The Collection, Market Place Blvd, and GA-400. We measure your glass and install on-site.",
    },
  },
  "alpharetta-ga": {
    intro:
      "Alpharetta storefronts compete on polish — a clean window graphic is the difference between a glance and a walk-in.",
    angle:
      "Between Avalon, downtown Alpharetta, and the Windward corridor, your customers are affluent and have plenty of options. A premium-looking storefront — logo on the door, a frosted privacy band, a full-color one-way vision promo — signals you belong on that street. We design and install window graphics that look high-end without the high-end agency price tag, just 20 minutes up GA-400 from Cumming.",
    cityFaq: {
      q: "Can you install storefront window graphics in Alpharetta?",
      a: "Yes. We design, print, and install window graphics for Alpharetta businesses around Avalon, downtown, and the Windward corridor — storefront branding, one-way vision promos, frosted privacy film, and door lettering. We measure on-site and install bubble-free, and we know the North Fulton market well.",
    },
  },
  "johns-creek-ga": {
    intro:
      "Johns Creek customers expect polish before they walk in — your glass should look as credible as your service.",
    angle:
      "Johns Creek households research before they buy and notice the details. For the medical and dental practices around Medlock Bridge, the professional firms near Technology Park, and the salons and restaurants competing for that spend, frosted privacy glass and clean window branding say 'established and trustworthy.' We design and install window graphics that match that bar and reinforce the brand on every piece of glass.",
    cityFaq: {
      q: "Do you do frosted and privacy window film for Johns Creek offices?",
      a: "Yes. Frosted and etched-glass film is one of our most-requested installs for Johns Creek practices and professional firms around Medlock Bridge and Technology Park — privacy for offices, conference rooms, and restrooms while keeping rooms bright. We can knock your logo out of the frost, and we measure and install on-site.",
    },
  },
  "milton-ga": {
    intro:
      "Milton sells craftsmanship and quiet quality — your window graphics should feel as considered as the work you do.",
    angle:
      "Milton protects its upscale, horse-country character, and the businesses that win here sell trust, not loud discounts. A tasteful window — subtle frosted branding, elegant lettering, a refined storefront graphic — fits Milton in a way a neon-bright coupon never will. We design and install window graphics with that restraint around Crabapple and Birmingham Highway, premium look, flat small-business pricing.",
    cityFaq: {
      q: "Can you do upscale storefront window graphics for a Milton business?",
      a: "Yes. We design refined, on-brand window graphics that match Milton's craftsmanship-first feel — elegant lettering, frosted privacy bands, and tasteful storefront branding around Crabapple and Birmingham Highway. We measure your glass and install on-site, with a high-end look at flat small-business pricing.",
    },
  },
  "suwanee-ga": {
    intro:
      "Suwanee runs on family businesses and foot traffic around Town Center — a friendly, clear window earns the walk-in.",
    angle:
      "Suwanee is one of the most family-friendly towns in Georgia, and parents decide fast and locally. The shops, gyms, and restaurants around Suwanee Town Center and the Peachtree Industrial corridor win when the storefront is warm, clear, and easy to read at a glance. A clean window graphic with your hours, your offer, and your brand turns passersby into first-timers. We design and install it locally.",
    cityFaq: {
      q: "Do you install window graphics for Suwanee storefronts?",
      a: "Yes. We design, print, and install window clings, decals, and storefront graphics for Suwanee businesses around Town Center and Peachtree Industrial — promo clings, logo-and-hours lettering, one-way vision graphics, and privacy film. We measure your glass and install bubble-free.",
    },
  },
  "buford-ga": {
    intro:
      "Buford pulls shoppers from three counties around the Mall of Georgia — a standout storefront catches that crossover traffic.",
    angle:
      "Buford sits at a crossroads: the Mall of Georgia draws regional traffic, Lake Lanier brings the seasonal crowd, and the I-985 corridor is thick with auto shops, contractors, and restaurants. With that much drive-by traffic, your window is prime real estate. A bold one-way vision graphic or a clean branded storefront turns passing cars into customers. We design and install for Buford businesses near the mall and along I-985.",
    cityFaq: {
      q: "Can you do window graphics for my Buford shop near the Mall of Georgia?",
      a: "Yes. We design, print, and install storefront window graphics for Buford businesses around the Mall of Georgia, Lake Lanier, and the I-985 corridor — one-way vision promos, logo and hours lettering, opaque feature walls, and privacy film. We measure on-site and install bubble-free.",
    },
  },
  "dawsonville-ga": {
    intro:
      "Dawsonville mixes weekend tourism with a fast-growing local base — a clear storefront wins both the visitor and the regular.",
    angle:
      "Dawsonville is the gateway to the North Georgia mountains — the Premium Outlets, Dawson Forest, and the wineries pull weekend visitors up GA-400, while your repeat business comes from locals. A storefront that reads instantly to a first-time visitor and brands clearly for regulars does double duty. We design and install window graphics for Dawsonville restaurants, shops, and tourism businesses, just down GA-400 from our Cumming base.",
    cityFaq: {
      q: "Do you handle window graphics for Dawsonville, GA businesses?",
      a: "Yes. We design, print, and install window clings and storefront graphics for Dawsonville restaurants, wineries, outdoor and tourism businesses, and retail near the Premium Outlets — promo clings, one-way vision film, and branded lettering. We're just down GA-400 in Cumming and install on-site.",
    },
  },
  "gainesville-ga": {
    intro:
      "Gainesville is one of the most bilingual markets in North Georgia — we design and letter your window in English, Spanish, or both.",
    angle:
      "Gainesville anchors Hall County around Northeast Georgia Medical Center and one of the region's largest Latino business communities. A storefront that speaks to every customer — not half of them — pulls in business your competitors miss. We're bilingual, so we letter and design your window graphics in English, Spanish, or fully bilingual, then measure and install around the square and Lake Lanier.",
    cityFaq: {
      q: "¿Hacen gráficos para ventanas en español? / Do you do bilingual window graphics in Gainesville?",
      a: "Sí. Gerry is fluent in Spanish, so we design and letter window graphics, clings, and storefront decals in Spanish, English, or fully bilingual — not machine-translated. For Gainesville's large Spanish-speaking customer base, that means your storefront connects with every customer who walks by. We measure and install on-site.",
    },
  },
  "roswell-ga": {
    intro:
      "Roswell's Canton Street runs on character — your window graphics should carry that same personality.",
    angle:
      "Roswell rewards personality and punishes generic. Between Canton Street's dining and nightlife, the riverfront, and the boutiques and salons around them, a cookie-cutter window falls flat. We design window graphics with real character — hand-feeling lettering, full-color art, a storefront that looks like nobody else's — and install them around the historic district so the personality inside your space shows up on the glass.",
    cityFaq: {
      q: "Can you design a window graphic with personality for my Roswell business?",
      a: "That's our specialty. Every Roswell window graphic we design is custom — no template — so the character of your Canton Street restaurant, boutique, or salon shows up on the glass. We design, print, and install storefront graphics, clings, and lettering around the historic district, measured to your actual windows.",
    },
  },
  "woodstock-ga": {
    intro:
      "Downtown Woodstock is one of metro Atlanta's hottest small-town scenes — a distinctive storefront helps you stand out in a crowded market.",
    angle:
      "Woodstock punches above its size — downtown Woodstock and Towne Lake pull crowds from across Cherokee County, which means real competition for attention. A storefront window that looks nothing like the shop next door cuts through. We design and install bold, on-brand window graphics — full-color one-way vision, frosted accents, sharp lettering — for Woodstock and Towne Lake businesses that want the downtown buzz to land on their glass.",
    cityFaq: {
      q: "How do window graphics help my Woodstock business stand out?",
      a: "A custom-designed storefront window that looks nothing like the template graphics next door — plus the right material for the job, from one-way vision promos to frosted accents and crisp lettering. We design, print, and install for Woodstock and Towne Lake businesses, measured to your real glass and applied bubble-free.",
    },
  },
};

export function getWindowClingsCityCopy(
  slug: string,
): WindowClingsCityCopy | undefined {
  return WINDOW_CLINGS_CITY_COPY[slug];
}
