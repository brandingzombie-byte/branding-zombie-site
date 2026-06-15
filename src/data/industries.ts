// ─── Industry landing pages — single source of truth ────────────────────────
// Powers /industries and /industries/[slug]. Each industry reuses the proven
// service-page section components via buildIndustryService() below, so the
// design stays consistent and we don't rebuild the UI.
//
// AEO intent: these pages exist to be NAMED (not ghost-cited) when someone asks
// an AI "who designs restaurant menus near Cumming GA?" or "best branding for
// HVAC companies in Forsyth County." Each carries: an answer-first definitional
// sentence, industry-specific named deliverables, local proof, FAQ pairs that
// match real prompts, and Service + FAQPage + BreadcrumbList schema.
//
// Voice rules (match the rest of the site): short, blunt, specific numbers,
// local nouns ("Forsyth County", "in-house", "one invoice"), one joke max.

import {
  CALENDLY_URL,
} from "@/lib/site";
import type {
  Service,
  ServiceSlug,
  ServiceHero,
  PainPoint,
  Deliverable,
  ProcessStep,
  ServiceFAQItem,
  ServicePricing,
  ServiceMeta,
  ServiceSchemaFields,
  ThemeAccent,
} from "@/data/services";

export type IndustrySlug =
  | "restaurants"
  | "home-services"
  | "health-medical"
  | "fitness-supplements";

export interface Industry {
  slug: IndustrySlug;
  /** Full display name, e.g. "Restaurants & Food Service". */
  name: string;
  /** Short label for cards/nav, e.g. "Restaurants". */
  shortName: string;
  /** One-line value prop for the index grid + meta fallback. */
  tagline: string;
  /**
   * Existing service whose portfolio + hero showcase best represents this
   * industry — drives the hero image carousel (e.g. restaurants → web-design,
   * which holds Papa's Kitchen and other restaurant launches).
   */
  portfolioSlug: ServiceSlug;
  themeAccent: ThemeAccent;
  /**
   * Answer-first definitional sentence. Used verbatim as the schema
   * description and as the lead line AI engines extract. Format:
   * "Branding Zombie Designs helps [industry] in [place] with [named things]."
   */
  answerFirst: string;

  hero: ServiceHero;
  whoThisIsFor: string[];

  painPointsEyebrow: string;
  painPointsHeadline: string;
  painPointsHighlight: string;
  painPointsIntro: string;
  painPoints: PainPoint[];

  offerEyebrow: string;
  offerHeadline: string;
  offerHighlight: string;
  offerSubhead: string;
  deliverables: Deliverable[];

  pricing: ServicePricing;

  processEyebrow: string;
  processHeadline: string;
  processHighlight: string;
  process: ProcessStep[];

  faqEyebrow: string;
  faqHeadline: string;
  faqHighlight: string;
  faqs: ServiceFAQItem[];

  finalCta: {
    eyebrow: string;
    headline: string;
    highlightWord: string;
    subhead: string;
    ctaLabel: string;
  };

  /** Real services to cross-link in the "keep exploring" block. */
  related: ServiceSlug[];
  meta: ServiceMeta;
  schema: ServiceSchemaFields;
}

// ─── INDUSTRIES ─────────────────────────────────────────────────────────────

export const INDUSTRIES: Industry[] = [
  // ════════════════════════════════════════════════════════════════════════
  // RESTAURANTS & FOOD SERVICE
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "restaurants",
    name: "Restaurants & Food Service",
    shortName: "Restaurants",
    tagline:
      "Menus, branding, websites with online ordering, and social — for restaurants that want to fill tables, not just look good.",
    portfolioSlug: "web-design",
    themeAccent: "neon",
    answerFirst:
      "Branding Zombie Designs helps restaurants, cafés, bars, and food trucks in Cumming, Forsyth County, and across North Metro Atlanta with menu design, logos and branding, websites with online ordering, and social media content — design and in-house print under one roof, so the brand looks identical on the sign, the menu, and the Instagram grid.",
    hero: {
      eyebrow: "Restaurants · Cumming, GA",
      headline: "Branding that fills tables —",
      highlightWord: "menu to website",
      subhead:
        "Menus, logos, websites with online ordering, and scroll-stopping social content for restaurants, cafés, bars, and food trucks in Cumming, Forsyth County, and North Metro Atlanta. Design and print under one roof — so your brand looks the same on the sign out front, the menu on the table, and the photo on Instagram.",
      ctaLabel: "Book a free brand audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/web-design/hero.png",
        alt: "Restaurant website, menu, and branding designed by Branding Zombie Designs in Cumming, GA",
      },
      microProof: "Menus · sites · social · print — one shop, one invoice",
    },
    whoThisIsFor: [
      "New restaurants, cafés, and bars opening in Cumming or Forsyth County that need a full brand before day one",
      "Established spots whose menu, logo, and website all look like they came from three different decades",
      "Food trucks and ghost kitchens that live or die on a logo, a wrap, and a clean online-order flow",
      "Owners tired of paying a designer, a printer, and a web person separately for one brand",
    ],
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Great food,",
    painPointsHighlight: "forgettable brand",
    painPointsIntro:
      "The food is the hard part and you've nailed it. But people eat with their eyes first — on Google, on Instagram, and on a menu that's been photocopied so many times the prices are ghosts.",
    painPoints: [
      {
        text: "Your menu is a Word doc that's been edited 40 times — mismatched fonts, prices crossed out in pen, and a coffee ring that's basically part of the layout now.",
      },
      {
        text: "Someone searches “restaurants near me” and your competitor with worse food shows up first because their Google profile and website actually work.",
      },
      {
        text: "Your Instagram is 11 dark photos of plates taken at 9pm, and you haven't posted since the soft opening.",
      },
      {
        text: "You want online ordering but every platform wants 15–30% per order, and your own site can't take a reservation, let alone a payment.",
      },
      {
        text: "Your sign, your menu, and your to-go cups are three different shades of red, and nobody can tell you which one is actually “your” red.",
      },
    ],
    offerEyebrow: "One shop · Front-of-house to the feed",
    offerHeadline: "Everything a restaurant brand needs,",
    offerHighlight: "designed and printed in-house",
    offerSubhead:
      "Menus, logos, signage, a website that takes orders, and a month of social content — built to match, produced under one roof, delivered in Cumming and across North Metro Atlanta.",
    deliverables: [
      {
        title: "Menu Design & Print",
        description:
          "Dine-in, takeout, drink, and seasonal menus designed for readability and margin — then printed on durable, wipeable stock. Laminated, QR, or table-tent formats. Reprints are a two-day turnaround, not a two-week saga.",
      },
      {
        title: "Logo & Restaurant Branding",
        description:
          "A logo that works on a sign, a coffee cup, a neon, and a 200×200 app icon. Plus the colors, fonts, and rules so your red is finally one red everywhere.",
      },
      {
        title: "Website + Online Ordering",
        description:
          "A fast, mobile-first site with your menu, hours, photos, reservations, and online ordering wired in — so you keep more of every ticket instead of feeding a third-party app 20%.",
      },
      {
        title: "Signage, Wraps & Window Graphics",
        description:
          "Storefront signs, A-frames, window vinyl, food-truck wraps, and patio banners — designed and produced to match the brand and survive a Georgia summer.",
      },
      {
        title: "Social Media Content",
        description:
          "Monthly content that makes the food look as good as it tastes — grid posts, stories, reels, and specials graphics, shot and designed so you stop ghosting your own feed.",
      },
      {
        title: "To-Go & In-House Collateral",
        description:
          "Branded to-go boxes, cups, stickers, loyalty cards, table tents, and staff shirts. The small touches that turn a takeout bag into a billboard.",
      },
    ],
    pricing: {
      label: "Restaurant projects start at",
      price: "$300",
      unit: "/ menu design",
      note: "Menus from $300 · restaurant logos from $750 · websites with online ordering from $2,500 · monthly social from $699. Bundle design + print for one invoice and one consistent brand.",
      numericPrice: "300",
    },
    processEyebrow: "How it works",
    processHeadline: "From mismatched",
    processHighlight: "to mouth-watering",
    process: [
      {
        step: "01",
        title: "Tasting & Audit",
        subtitle: "Free",
        description:
          "15 minutes on your menu, your competitors, and your Google + Instagram presence. You leave with a clear, honest list of what's costing you covers — whether you hire us or not.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Brand & Menu Direction",
        description:
          "We lock the logo, colors, and menu layout first — the pieces every other asset inherits — so the sign, the site, and the to-go cup all end up speaking the same language.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Build & Photograph",
        description:
          "Website, online ordering, and print files built and tested. We can shoot the food too — good photos are the single biggest lever on a restaurant's online orders.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Launch & Feed It",
        description:
          "Site goes live, menus go to press, Google Business Profile gets cleaned up, and your first month of social is queued. Then it's just service.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "What restaurant owners",
    faqHighlight: "ask us first",
    faqs: [
      {
        q: "How much does restaurant menu design cost in Cumming, GA?",
        a: "Menu design starts at $300 for a single-page dine-in or takeout menu and runs to about $650 for a multi-section menu with drinks and seasonal inserts. If we print it too — laminated, table-tent, or QR — you get design and production on one invoice at wholesale print pricing, usually delivered in 2–4 business days for reprints.",
      },
      {
        q: "Can you build a restaurant website with online ordering?",
        a: "Yes. We build fast, mobile-first restaurant sites with your menu, hours, photos, reservations, and online ordering or payments wired in — starting at $2,500. Keeping ordering on your own site means you keep more of every ticket instead of paying a third-party delivery app 15–30% per order. We can also integrate the ordering platform you already use.",
      },
      {
        q: "Do you design and print menus, signs, and to-go packaging, or just design?",
        a: "Both, your choice. We're a design studio with an in-house wholesale print pipeline, so we can design AND produce menus, signage, window vinyl, food-truck wraps, to-go boxes, cups, and stickers — one point of contact, one invoice, one consistent brand. Or we hand you print-ready files for your own printer. Same files either way.",
      },
      {
        q: "We already have a logo. Can you just fix the menu and website?",
        a: "Absolutely. Plenty of restaurants come to us with a logo they like and a menu and website that don't match it. We can work inside your existing brand, tighten the colors and fonts into a short brand sheet, and bring the rest of the experience up to the same level.",
      },
      {
        q: "Do you work with new restaurants that are still pre-opening?",
        a: "Yes — that's some of our favorite work. We can have the logo, brand, menu, signage, and website ready before your soft opening so you launch looking established instead of improvised. New owners in Forsyth County: start with the brand and menu, then the website and social, in that order.",
      },
      {
        q: "Can you help our restaurant show up on Google and “near me” searches?",
        a: "Yes. A fast website with the right local schema is the foundation, but the biggest lever for a restaurant is a complete, accurate Google Business Profile with real photos, correct hours, and steady reviews. We set up the site for local search and walk you through the Google Business Profile cleanup that actually moves the map pack.",
      },
      {
        q: "How fast can you turn this around before our opening?",
        a: "Menus and logos move in days; a restaurant website is typically 2–3 weeks; signage and wraps depend on the installer but usually 1–2 weeks. Tell us your opening date on the first call and we build the schedule backward from it. Rush options are usually available.",
      },
      {
        q: "Do you do food photography too?",
        a: "Yes, and you should not skip it. The dim phone photos hurt more than no photos. We can shoot a focused set of your best dishes for the website, menu, and social — it's the single highest-return add-on for online orders and reservations.",
      },
      {
        q: "What does branding a whole restaurant actually cost?",
        a: "It depends on scope, but a typical full package — logo and brand, a website with online ordering, printed menus, and basic signage — lands somewhere between $4,000 and $9,000 all-in, designed and produced in-house. We quote it flat on a free call so there are no hourly surprises, and you can phase it (brand first, site next, social last) if cash flow is tight at opening.",
      },
    ],
    finalCta: {
      eyebrow: "Ready to look as good as you cook",
      headline: "Your food earns the second visit.",
      highlightWord: "Your brand earns the first.",
      subhead:
        "Book a free 15-minute audit. We'll look at your menu, your Google profile, and your site, tell you exactly what's costing you covers, and give you a clear plan — whether we end up building it or not.",
      ctaLabel: "Book a free brand audit",
    },
    related: ["web-design", "logo-design", "print-design", "social-media", "branding"],
    meta: {
      seoTitle:
        "Restaurant Branding, Menus & Websites in Cumming, GA",
      seoDescription:
        "Menu design, logos, websites with online ordering, signage, and social media for restaurants, cafés, bars & food trucks in Cumming, GA & North Metro Atlanta. Design + in-house print, one invoice. Menus from $300. Call (770) 744-2536.",
      keywords: [
        "restaurant branding Cumming GA",
        "restaurant menu design Cumming GA",
        "restaurant website design Forsyth County",
        "restaurant logo design Atlanta",
        "menu printing Cumming GA",
        "food truck wrap design Atlanta",
        "cafe branding Forsyth County",
        "restaurant online ordering website Georgia",
        "restaurant social media Cumming GA",
        "restaurant signage Cumming GA",
        "bar branding North Atlanta",
        "restaurant marketing Forsyth County",
      ],
      ogImage: "/assets/services/web-design/hero.png",
      ogImageAlt:
        "Restaurant branding, menu, and website design — Branding Zombie Designs, Cumming, GA",
    },
    schema: {
      serviceType: "Restaurant Branding & Web Design",
      category: "Restaurant & Food Service Marketing",
      description:
        "Menu design, logo and brand identity, websites with online ordering, signage and food-truck wraps, social media content, and branded to-go packaging for restaurants, cafés, bars, and food trucks in Cumming, GA and across North Metro Atlanta. Design and in-house wholesale print under one roof.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // HOME SERVICES & TRADES
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "home-services",
    name: "Home Services & Trades",
    shortName: "Home Services",
    tagline:
      "Logos, truck wraps, yard signs, crew shirts, and websites that rank — for trades that book jobs, not just look busy.",
    portfolioSlug: "print-design",
    themeAccent: "toxic",
    answerFirst:
      "Branding Zombie Designs helps home-service and trade businesses — HVAC, plumbing, electrical, roofing, landscaping, remodeling, and construction — in Cumming, Forsyth County, and across North Metro Atlanta with contractor logos, truck and vehicle wraps, yard signs, crew apparel, and websites built to rank for 'near me' searches. Design and in-house print under one roof, so the truck, the signs, and the website all match.",
    hero: {
      eyebrow: "Home Services & Trades · Cumming, GA",
      headline: "Branding that books jobs —",
      highlightWord: "logo to truck to job site",
      subhead:
        "Contractor logos, truck wraps, yard signs, crew shirts, and websites that rank for 'HVAC near me' — for trades and home-service businesses in Cumming, Forsyth County, and North Metro Atlanta. Design and print under one roof, so the truck, the sign, and the site all look like the same company.",
      ctaLabel: "Book a free brand audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/print-services/hero.png",
        alt: "Contractor logo, truck wrap, and yard sign design by Branding Zombie Designs in Cumming, GA",
      },
      microProof: "Logos · wraps · signs · sites — one shop, one invoice",
    },
    whoThisIsFor: [
      "New HVAC, plumbing, electrical, or roofing companies that need a brand and a wrapped truck before the first job",
      "Established trades running on a logo someone made in Word and a truck with a magnet peeling at the corner",
      "Contractors who get work by referral but vanish on Google the moment someone searches “near me”",
      "Crews who want one designer for the logo, the wrap, the shirts, the yard signs, and the website",
    ],
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Great work,",
    painPointsHighlight: "invisible brand",
    painPointsIntro:
      "You do the job right and the referrals prove it. But the truck, the signs, and the website are doing none of the selling they should — and the competitor with worse work is getting the search.",
    painPoints: [
      {
        text: "Your truck is your biggest billboard, and right now it's a white van with a vinyl magnet that's curling at the edges.",
      },
      {
        text: "Someone searches “AC repair near me” in Forsyth County and your competitor with worse reviews shows up first, because their website and Google profile actually work.",
      },
      {
        text: "Your logo lives in a Word doc, a Facebook photo, and a faded yard sign — three versions, none of them sharp.",
      },
      {
        text: "You've done 200 five-star jobs and have nine reviews online, because nobody ever set up the system to ask.",
      },
      {
        text: "You pay one guy for shirts, another for signs, another for the website — and somehow they all look like different companies.",
      },
    ],
    offerEyebrow: "One shop · Logo to job site",
    offerHeadline: "Everything a trade business needs to look established",
    offerHighlight: "and get found",
    offerSubhead:
      "The logo, the truck, the signs, the shirts, and a website that ranks — designed to match and produced in-house, for trades across Cumming and North Metro Atlanta.",
    deliverables: [
      {
        title: "Contractor Logo & Brand",
        description:
          "A logo that reads from 40 feet on a truck and still looks sharp on a card and a website favicon — plus the colors and fonts so every shirt, sign, and invoice matches.",
      },
      {
        title: "Truck & Vehicle Wraps",
        description:
          "Full wraps, partial wraps, lettering, and magnets — designed for your van or fleet and produced with install coordination. Your truck becomes a billboard that books jobs in traffic.",
      },
      {
        title: "Yard Signs & Job-Site Signage",
        description:
          "The signs that turn one job into three. Yard signs, A-frames, banners, and door hangers for the neighborhood — designed and printed in batches at wholesale pricing.",
      },
      {
        title: "Crew Apparel & Uniforms",
        description:
          "Branded tees, hoodies, hi-vis, hats, and embroidered work shirts. Low minimums, your colors — so the crew shows up looking like a company, not a guy with a truck.",
      },
      {
        title: "Website That Ranks “Near Me”",
        description:
          "A fast, mobile-first site with your services, service area, reviews, and quote form — built with the local SEO that helps you show up when someone searches in Cumming, Alpharetta, or Canton.",
      },
      {
        title: "Review & Lead Systems",
        description:
          "Automated review requests after every job and an instant reply on every quote form — so your five-star work finally shows up online and no lead sits cold in an inbox.",
      },
    ],
    pricing: {
      label: "Trade branding starts at",
      price: "$500",
      unit: "/ logo",
      note: "Contractor logos from $500 · truck wraps from $1,200 · yard signs from $8 each in batches · websites from $2,500. Bundle the logo, the wrap, and the signs for one consistent brand on one invoice.",
      numericPrice: "500",
    },
    processEyebrow: "How it works",
    processHeadline: "From white van",
    processHighlight: "to rolling billboard",
    process: [
      {
        step: "01",
        title: "Audit & Quote",
        subtitle: "Free",
        description:
          "15 minutes on your brand, your truck, and how you show up on Google. You leave with an honest list of what's costing you jobs — whether you hire us or not.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Brand & Truck Direction",
        description:
          "We lock the logo and colors first, then design the wrap, the signs, and the site around them — so everything matches instead of looking like five vendors.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Build, Wrap & Print",
        description:
          "Website built and tested, wrap and signs produced at wholesale pricing with install coordination, crew apparel ordered. One point of contact for all of it.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Launch & Get Reviews",
        description:
          "Site goes live, Google Business Profile gets cleaned up, and your review system starts turning finished jobs into the five-star count that wins the search.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "What contractors",
    faqHighlight: "ask us first",
    faqs: [
      {
        q: "How much does a truck wrap cost in Cumming, GA?",
        a: "Design plus production for a partial wrap or lettering typically starts around $1,200, and a full wrap on a standard van usually lands between $2,500 and $4,000 installed, depending on the vehicle and coverage. We design it, produce it at wholesale pricing, and coordinate install with a trusted local shop — so it matches your logo and signs instead of being a one-off.",
      },
      {
        q: "Can you design our logo, truck, signs, AND website?",
        a: "Yes — that's the whole point. Most trades waste money and consistency hiring a separate person for each. We do the logo and brand first, then the truck wrap, yard signs, crew shirts, and a website that ranks — all matching, one point of contact, one invoice.",
      },
      {
        q: "Will my website actually rank for “HVAC near me” or “[my trade] near me”?",
        a: "A fast website with the right local schema and service-area pages is the foundation, but the biggest lever for a trade is a complete Google Business Profile with real photos, accurate service areas, and a steady stream of reviews. We build the site for local search and set up the review system and GBP cleanup that actually move the map pack. Ranking takes months of signals, but we start you pointed downhill instead of up.",
      },
      {
        q: "Do you do yard signs and bandit signs in bulk?",
        a: "Yes. Yard signs run as low as about $8 each in batches, with H-stakes, and we design and print them in-house so they match your truck and brand. Door hangers, A-frames, and job-site banners too — the neighborhood signage that turns one install into three.",
      },
      {
        q: "We get all our work by referral — why do we need branding?",
        a: "Because referrals still Google you before they call. When they find a white van, a Word-doc logo, and nine reviews, the referral cools. A sharp brand, a wrapped truck, and a real review count turn a referral into a booked job — and start earning you work that doesn't come from someone else's mouth.",
      },
      {
        q: "Can you do crew shirts and embroidered uniforms?",
        a: "Yes — screen print, DTF, and embroidery on tees, hoodies, hi-vis, polos, hats, and work shirts. Low minimums, your colors and logo, wholesale pricing. The crew looking like a company is one of the cheapest trust signals you can buy.",
      },
      {
        q: "How fast can you wrap our truck or print our signs?",
        a: "Yard signs and banners are usually 5–7 business days; truck wraps run 10–14 days including install coordination; logos move in days. Tell us your deadline on the first call and we build the schedule backward from it. Rush options are usually available.",
      },
      {
        q: "We already have a logo. Can you just do the truck and website?",
        a: "Absolutely. Plenty of contractors come to us with a logo they like and need the truck, signs, and site brought up to match it. We'll work inside your existing brand — and if the logo needs a light cleanup to wrap well, we'll tell you straight.",
      },
    ],
    finalCta: {
      eyebrow: "Ready to look like the pro you are",
      headline: "Your work earns the referral.",
      highlightWord: "Your brand earns the search.",
      subhead:
        "Book a free 15-minute audit. We'll look at your truck, your Google profile, and your site, tell you exactly what's costing you jobs, and give you a clear plan — whether we end up building it or not.",
      ctaLabel: "Book a free brand audit",
    },
    related: ["logo-design", "print-design", "web-design", "branding", "digital-marketing"],
    meta: {
      seoTitle:
        "Contractor & Trades Branding in Cumming, GA — Wraps, Signs & Websites",
      seoDescription:
        "Contractor logos, truck wraps, yard signs, crew apparel, and websites that rank for HVAC, plumbing, electrical, roofing & remodeling in Cumming, GA & North Metro Atlanta. Design + in-house print, one invoice. Logos from $500. Call (770) 744-2536.",
      keywords: [
        "truck wrap design Cumming GA",
        "vehicle wrap Atlanta",
        "contractor logo design Forsyth County",
        "HVAC website design Cumming GA",
        "plumber website design Georgia",
        "electrician branding Atlanta",
        "roofing website design Forsyth County",
        "yard sign printing Cumming GA",
        "crew apparel Cumming GA",
        "trades marketing Forsyth County",
        "home services branding Atlanta",
        "landscaping logo design Cumming",
      ],
      ogImage: "/assets/services/print-services/hero.png",
      ogImageAlt:
        "Contractor branding — logo, truck wrap, and yard signs from Branding Zombie Designs, Cumming, GA",
    },
    schema: {
      serviceType: "Contractor & Trades Branding & Web Design",
      category: "Home Services & Trades Marketing",
      description:
        "Contractor logos, truck and vehicle wraps, yard signs and job-site signage, crew apparel, and websites built to rank for local 'near me' searches — for HVAC, plumbing, electrical, roofing, landscaping, remodeling, and construction businesses in Cumming, GA and across North Metro Atlanta. Design and in-house wholesale print under one roof.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // HEALTH & MEDICAL
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "health-medical",
    name: "Health & Medical Practices",
    shortName: "Health & Medical",
    tagline:
      "Trustworthy branding, modern websites with online booking, and patient-intake automation for practices that want to look as good as their care.",
    portfolioSlug: "web-design",
    themeAccent: "cyan",
    answerFirst:
      "Branding Zombie Designs helps health and medical practices — dental offices, med-spas, chiropractors, clinics, wellness studios, and therapy practices — in Cumming, Forsyth County, and across North Metro Atlanta with professional branding, modern websites, online booking, patient-intake automation, and print collateral. Design, web, and in-house print under one roof, with HIPAA-aware tools when patient data is involved.",
    hero: {
      eyebrow: "Health & Medical · Cumming, GA",
      headline: "Branding patients trust —",
      highlightWord: "before they ever call",
      subhead:
        "Professional branding, modern websites with online booking, patient-intake automation, and print collateral for dental offices, med-spas, chiropractors, clinics, and wellness practices in Cumming, Forsyth County, and North Metro Atlanta. Built to look as polished as the care you give.",
      ctaLabel: "Book a free practice audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/web-design/hero.png",
        alt: "Medical and dental practice website and branding by Branding Zombie Designs in Cumming, GA",
      },
      microProof: "Brand · site · booking · print — one shop",
    },
    whoThisIsFor: [
      "New dental, chiropractic, or med-spa practices opening in Forsyth County that need to look established on day one",
      "Established practices with a dated website that quietly turns away the patients their care would keep",
      "Med-spas and wellness studios competing on Instagram that need their brand and booking to match the experience",
      "Practice owners who want one team for the logo, the website, the intake forms, and the booking flow",
    ],
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Great care,",
    painPointsHighlight: "dated first impression",
    painPointsIntro:
      "Patients judge your care by your website before they ever meet you — and a slow, dated site quietly sends them to the practice down the road that just looks more put-together.",
    painPoints: [
      {
        text: "Your website looks like it was built in 2012, and new patients form an opinion about your care before they reach the door.",
      },
      {
        text: "New patients can only book by calling during office hours — so the one who finds you at 9pm books your competitor instead.",
      },
      {
        text: "Your intake forms are PDFs patients print, fill by hand, and forget — so every visit starts with a clipboard and a delay.",
      },
      {
        text: "Your med-spa's Instagram is gorgeous and your website looks nothing like it, so the brand falls apart at the most important click.",
      },
      {
        text: "Your logo, signage, and appointment cards are three different blues, and the practice feels less polished than the care actually is.",
      },
    ],
    offerEyebrow: "One shop · Lobby to landing page",
    offerHeadline: "Everything a practice needs to look as good as its care",
    offerHighlight: "online and in the lobby",
    offerSubhead:
      "A trustworthy brand, a modern site that books patients, intake that cuts the clipboard, and print that matches — for practices across Cumming and North Metro Atlanta.",
    deliverables: [
      {
        title: "Practice Branding & Logo",
        description:
          "A clean, trustworthy identity — logo, colors, and type — that works on a sign, a website, a treatment menu, and an app icon. The polish that makes a practice feel established and safe.",
      },
      {
        title: "Website with Online Booking",
        description:
          "A fast, mobile-first, accessible site with services, provider bios, insurance info, and online scheduling wired in — so patients book themselves at 9pm instead of calling someone else.",
      },
      {
        title: "Patient-Intake Automation",
        description:
          "Digital forms, appointment reminders, and follow-up sequences that cut the clipboard and the no-shows — built on HIPAA-aware tools, with a signed BAA when protected health information is involved.",
      },
      {
        title: "Treatment Menus & Print",
        description:
          "Service menus, brochures, appointment cards, referral pads, and signage — designed to match the brand and produced in-house so the lobby feels as considered as the website.",
      },
      {
        title: "Med-Spa & Wellness Social",
        description:
          "On-brand content that matches the website, so the experience stays consistent from the first Instagram tap to the front desk.",
      },
      {
        title: "Reviews & Reputation",
        description:
          "Automated post-visit review requests so the patients who love you actually show up on Google — the single biggest driver of new-patient calls.",
      },
    ],
    pricing: {
      label: "Practice branding starts at",
      price: "$750",
      unit: "/ logo",
      note: "Practice logos from $750 · websites with online booking from $3,500 · treatment menus and print from $300 · intake automation from $1,500. Bundle brand + site + booking for one consistent patient experience.",
      numericPrice: "750",
    },
    processEyebrow: "How it works",
    processHeadline: "From dated",
    processHighlight: "to trusted",
    process: [
      {
        step: "01",
        title: "Consult & Audit",
        subtitle: "Free",
        description:
          "15 minutes on your practice, your website, and how new patients find and book you today. You leave with an honest read on what's costing you appointments.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Brand & Site Direction",
        description:
          "We agree on the look and the page structure first — calm, professional, and accessible — so the brand and the booking flow are right before we build.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Build & Connect Booking",
        description:
          "Website built and tested for speed and accessibility, online scheduling and intake connected on HIPAA-aware tools, print files prepared to match.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Launch & Grow Reviews",
        description:
          "Site goes live, Google Business Profile gets cleaned up, and the review system starts turning happy visits into the reputation that fills the schedule.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "What practice owners",
    faqHighlight: "ask us first",
    faqs: [
      {
        q: "How much does a website for a dental or medical practice cost in Cumming, GA?",
        a: "A professional practice website with services, provider bios, and online booking typically starts around $3,500 and scales with the number of providers, locations, and integrations. We quote it flat on a free call, and you own the site, domain, and content on handoff.",
      },
      {
        q: "Can you add online booking and patient intake to our site?",
        a: "Yes. We integrate online scheduling and digital intake forms — either the patient-management system you already use, or a setup we configure — so patients book and complete paperwork before they arrive. That's fewer phone-tag appointments and fewer clipboards at the front desk.",
      },
      {
        q: "Is the patient data HIPAA-compliant?",
        a: "When a project involves protected health information, we build on HIPAA-aware tools and infrastructure and will sign a Business Associate Agreement (BAA). We scope exactly what data is handled and where it lives before building. For a marketing site that doesn't collect health information, a standard secure setup is appropriate — we'll tell you honestly which one your project needs.",
      },
      {
        q: "Do you work with med-spas, chiropractors, and wellness studios, not just dentists?",
        a: "Yes. Dental, med-spa, chiropractic, physical therapy, mental-health and wellness practices, and clinics — the playbook is the same: a trustworthy brand, a fast accessible site that books patients, and a steady review engine. The tone shifts to fit the practice.",
      },
      {
        q: "Can you help us get more Google reviews?",
        a: "Yes. We set up an automated post-visit review request and clean up your Google Business Profile. Review count and recency are the biggest drivers of new-patient calls in local search, and most practices are sitting on hundreds of happy patients they never asked.",
      },
      {
        q: "We have a logo. Can you just modernize the website and add booking?",
        a: "Absolutely. Many practices come to us with a logo they're keeping and a website that's holding them back. We work inside your existing brand, modernize the site, connect booking and intake, and bring the rest up to the same standard.",
      },
      {
        q: "Will the site work on phones and meet accessibility standards?",
        a: "Yes. Every site is mobile-first, fast, and built with accessibility in mind — proper contrast, keyboard navigation, semantic structure, and screen-reader-friendly markup. For a practice, accessibility isn't optional; it's part of looking trustworthy and serving every patient.",
      },
      {
        q: "How long does a practice website take?",
        a: "Most practice sites launch in 3–4 weeks depending on how many providers and integrations are involved. We agree on the structure up front so there's no expensive backtracking, and we build the schedule around your opening or rebrand date.",
      },
    ],
    finalCta: {
      eyebrow: "Ready to look as good as your care",
      headline: "Your care keeps patients.",
      highlightWord: "Your brand earns the first visit.",
      subhead:
        "Book a free 15-minute practice audit. We'll look at your site, your booking flow, and your Google profile, tell you what's costing you appointments, and give you a clear plan — whether we end up building it or not.",
      ctaLabel: "Book a free practice audit",
    },
    related: ["web-design", "branding", "ai-workflows", "logo-design", "print-design"],
    meta: {
      seoTitle:
        "Medical & Dental Practice Branding & Websites — Cumming, GA",
      seoDescription:
        "Branding, websites with online booking, and patient-intake automation for dental offices, med-spas, chiropractors, clinics & wellness practices in Cumming, GA & North Metro Atlanta. HIPAA-aware. Sites from $3,500. Call (770) 744-2536.",
      keywords: [
        "dental website design Cumming GA",
        "med spa branding Forsyth County",
        "chiropractor website design Atlanta",
        "medical practice marketing Cumming GA",
        "online booking website Georgia",
        "patient intake automation Atlanta",
        "healthcare web design Forsyth County",
        "wellness branding Atlanta",
        "dental marketing Cumming GA",
        "therapy practice website Georgia",
        "clinic website design Cumming",
        "HIPAA aware website design Georgia",
      ],
      ogImage: "/assets/services/web-design/hero.png",
      ogImageAlt:
        "Medical and dental practice branding and website design — Branding Zombie Designs, Cumming, GA",
    },
    schema: {
      serviceType: "Medical & Dental Practice Branding & Web Design",
      category: "Healthcare & Medical Practice Marketing",
      description:
        "Professional branding, modern websites with online booking, patient-intake automation, treatment menus, and print collateral for dental offices, med-spas, chiropractors, clinics, wellness studios, and therapy practices in Cumming, GA and across North Metro Atlanta. HIPAA-aware tools and a signed BAA when protected health information is involved.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // FITNESS, CPG & SUPPLEMENTS
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "fitness-supplements",
    name: "Fitness, CPG & Supplement Brands",
    shortName: "Fitness & CPG",
    tagline:
      "Logos, FDA-compliant labels, packaging, Shopify stores, and social — 15+ years designing product brands that pass compliance and move product.",
    portfolioSlug: "social-media",
    themeAccent: "neon",
    answerFirst:
      "Branding Zombie Designs helps fitness businesses and product brands — gyms, personal trainers, supplement and CPG companies, and DTC brands — in Cumming, Forsyth County, North Metro Atlanta, and nationwide with logos and brand identity, FDA/FTC-compliant supplement and product labels, packaging and dielines, Shopify stores, and social media content. 15+ years of CPG and supplement design, with in-house print production under one roof.",
    hero: {
      eyebrow: "Fitness, CPG & Supplements · Cumming, GA",
      headline: "Branding that sells —",
      highlightWord: "shelf to checkout",
      subhead:
        "Logos, FDA-compliant supplement and product labels, packaging, Shopify stores, and scroll-stopping social — for gyms, trainers, and supplement/CPG brands in North Metro Atlanta and nationwide. 15+ years designing labels that pass compliance and move product.",
      ctaLabel: "Book a free brand audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/social-media/hero.png",
        alt: "Supplement label, packaging, and CPG brand design by Branding Zombie Designs in Cumming, GA",
      },
      microProof: "Labels · packaging · Shopify · social — 15+ yrs CPG",
    },
    whoThisIsFor: [
      "Supplement and CPG founders who need labels that pass FDA/FTC review AND look good enough to sell on a shelf",
      "Gyms and trainers whose brand and social don't match the energy of the actual workouts",
      "DTC brands ready for a Shopify store that converts — not just a pretty homepage",
      "Product brands tired of a designer who's never built a Supplement Facts panel or a dieline",
    ],
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Great product,",
    painPointsHighlight: "label that holds it back",
    painPointsIntro:
      "Shoppers decide in half a second on a shelf or a thumbnail. If the label looks homemade or the store looks like a free theme, the product never gets the chance it earned.",
    painPoints: [
      {
        text: "Your supplement label looks homemade next to the brand on the shelf beside it — and shoppers notice before they read a word.",
      },
      {
        text: "Your last designer didn't know a Supplement Facts panel from a Nutrition Facts panel, and the printer kicked the file back.",
      },
      {
        text: "Your Shopify store is a free theme with stock photos, and the conversion rate shows it.",
      },
      {
        text: "Your gym's Instagram is full of energy and your logo and website look like a different, sleepier business.",
      },
      {
        text: "You're launching a product and don't know if the label is FDA/FTC compliant — and finding out at the printer is the expensive way.",
      },
    ],
    offerEyebrow: "One shop · Shelf to checkout",
    offerHeadline: "Everything a fitness or product brand needs,",
    offerHighlight: "compliant and built to sell",
    offerSubhead:
      "The logo, the compliant label, the packaging, the Shopify store, and the social — designed by someone who's shipped CPG and supplement work for 15 years, produced in-house.",
    deliverables: [
      {
        title: "Logo & Brand Identity",
        description:
          "A brand that looks like it belongs on a shelf and in a feed — logo, colors, type, and the rules to keep it consistent across every SKU, sign, and post.",
      },
      {
        title: "FDA/FTC-Compliant Labels",
        description:
          "Supplement Facts and Nutrition Facts panels built to spec — correct font sizes, allergen disclosures, net weight, and claims that won't earn a warning letter. 15+ years, and our files don't come back from the printer.",
      },
      {
        title: "Packaging & Dielines",
        description:
          "Boxes, pouches, bottles, sleeves, and blisters with print-ready dielines built in Illustrator — designed for the specific press, so production is smooth and the shelf presence is real.",
      },
      {
        title: "Shopify & DTC Stores",
        description:
          "Conversion-focused Shopify builds with product pages, subscriptions, and the integrations — Klaviyo, reviews, upsells — that turn traffic into repeat orders.",
      },
      {
        title: "Social & Ad Creative",
        description:
          "Lifestyle content, ad creative, and UGC-style posts designed by someone who's shipped supplement and CPG creative for 15 years — built to stop a thumb and move product.",
      },
      {
        title: "Print Production",
        description:
          "Labels, boxes, hang tags, shrink sleeves, and retail collateral produced in-house at wholesale pricing. Design and production on one invoice.",
      },
    ],
    pricing: {
      label: "Brand & label work starts at",
      price: "$750",
      unit: "/ project",
      note: "Logos from $750 · supplement and product labels from $750 · packaging from $1,500 · Shopify stores from $3,500 · monthly social from $699. Product brands: design and in-house production on one invoice.",
      numericPrice: "750",
    },
    processEyebrow: "How it works",
    processHeadline: "From homemade",
    processHighlight: "to shelf-ready",
    process: [
      {
        step: "01",
        title: "Brand & Compliance Audit",
        subtitle: "Free",
        description:
          "15 minutes on your product, your label, and your store. We flag compliance risks and the gaps between how it looks and how well it could sell — straight, either way.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Direction & Dieline",
        description:
          "We lock the brand direction and build the dieline to your exact packaging and press specs — so the design is right for production, not just pretty on screen.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Design, Build & Proof",
        description:
          "Labels and packaging designed to spec, Shopify store built, and a proof you approve — digital and physical for print runs — before anything goes to press.",
        icon: "Check",
      },
      {
        step: "04",
        title: "Launch & Sell",
        description:
          "Print produced at wholesale pricing, store goes live, first social queued. You've got a brand that looks the part on the shelf and at checkout.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "What product founders",
    faqHighlight: "ask us first",
    faqs: [
      {
        q: "Can you design FDA-compliant supplement labels?",
        a: "Yes — it's the work we're known for. 15+ years of FDA/FTC-compliant label design across supplements, food, beverage, and cosmetics. Supplement Facts and Nutrition Facts panels built to spec, with correct font sizes, allergen disclosures, net-weight placement, and claim language handled right the first time, so the file doesn't come back from the printer.",
      },
      {
        q: "How much does supplement label design cost?",
        a: "A single supplement or product label typically starts around $750 and scales with the number of SKUs, flavors, and the complexity of the panel and packaging. If we print it too, you get design and production on one invoice at wholesale pricing. Full lines and packaging systems are quoted flat on a call.",
      },
      {
        q: "Do you build the dieline and print-ready packaging files?",
        a: "Yes. Custom dielines for boxes, pouches, bottles, sleeves, and blisters built in Illustrator, with print-ready PDFs — proper bleed, trim, safety, CMYK, and embedded fonts. Designed for the specific press it's printing on, so production is smooth.",
      },
      {
        q: "Can you build our Shopify store too?",
        a: "Yes. Conversion-focused Shopify builds with product pages, subscriptions, reviews, and email/upsell integrations like Klaviyo — so the store sells as well as the label looks. We can match it to the same brand as your packaging so the experience is seamless shelf to checkout.",
      },
      {
        q: "Do you also print the labels and packaging, or just design?",
        a: "Both, your choice. We're a design studio with an in-house wholesale print pipeline, so we can design AND produce your labels, boxes, and collateral — one invoice, we manage production — or hand you print-ready files for your own printer. Same files either way.",
      },
      {
        q: "We're a local gym, not a product brand — do you work with us?",
        a: "Yes. Gyms, studios, and trainers get the same treatment: a brand and social that match the energy of the workouts, a website that signs up members, and the printed and apparel pieces that make the place feel like a real brand instead of a rented room.",
      },
      {
        q: "Can you handle social media and ad creative for a supplement brand?",
        a: "Yes. Lifestyle content, product photography direction, ad creative, and UGC-style posts — designed by someone who's shipped CPG and supplement creative for 15 years. Monthly social management starts at $699, and we can run paid creative alongside organic.",
      },
      {
        q: "Do you work with brands outside Georgia?",
        a: "Yes. Branding, label, packaging, and Shopify work is done remotely for product and CPG brands nationwide — the files and the store don't care where you are. Gyms and studios that want in-person work and print pickup, we serve locally across Cumming and North Metro Atlanta.",
      },
      {
        q: "We have a product but no brand yet. Where do we start?",
        a: "Start with the brand and the label — they're the pieces every other asset inherits. We build the logo and identity, design a compliant, shelf-ready label, then move to packaging, the Shopify store, and social. You can phase it as cash flow allows; we'll tell you the order that protects your launch.",
      },
    ],
    finalCta: {
      eyebrow: "Ready to look like a brand, not a startup",
      headline: "Your product earns the reorder.",
      highlightWord: "Your label earns the first buy.",
      subhead:
        "Book a free 15-minute brand audit. We'll look at your label, your packaging, and your store, flag any compliance risks, and give you a clear plan to look shelf-ready — whether we end up building it or not.",
      ctaLabel: "Book a free brand audit",
    },
    related: ["branding", "print-design", "ecommerce", "logo-design", "social-media"],
    meta: {
      seoTitle:
        "Supplement Label, Packaging & Brand Design — Cumming, GA & Nationwide",
      seoDescription:
        "FDA-compliant supplement and product labels, packaging, Shopify stores, logos, and social for supplement, CPG, fitness & DTC brands. 15+ years CPG design, in-house print. Cumming, GA & nationwide. Labels from $750. Call (770) 744-2536.",
      keywords: [
        "supplement label design",
        "FDA compliant label design",
        "supplement facts panel design",
        "CPG packaging design Atlanta",
        "product label design Atlanta",
        "dieline packaging design Georgia",
        "supplement branding Georgia",
        "Shopify supplement store",
        "gym branding Cumming GA",
        "fitness logo design Forsyth County",
        "DTC brand design Atlanta",
        "nutrition facts panel design",
      ],
      ogImage: "/assets/services/social-media/hero.png",
      ogImageAlt:
        "Supplement label, packaging, and CPG brand design — Branding Zombie Designs, Cumming, GA",
    },
    schema: {
      serviceType: "CPG, Supplement & Fitness Brand Design",
      category: "Product Brand, Fitness & CPG Marketing",
      description:
        "Logos and brand identity, FDA/FTC-compliant supplement and product labels, packaging and dielines, Shopify and DTC stores, social media and ad creative, and in-house print production for gyms, trainers, supplement and CPG companies, and DTC brands in Cumming, GA, North Metro Atlanta, and nationwide. 15+ years of CPG and supplement design.",
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): IndustrySlug[] {
  return INDUSTRIES.map((i) => i.slug);
}

/**
 * Adapts an Industry into a full Service object so the existing service-page
 * section components (ServiceHero, ServiceOffer, ServiceProcess, etc.) render
 * it unchanged. `slug` is set to the industry's portfolioSlug so the hero
 * showcase pulls relevant client work; gallery/tiers are intentionally empty
 * so those sections gate off.
 */
export function buildIndustryService(ind: Industry): Service {
  return {
    slug: ind.portfolioSlug,
    name: ind.name,
    shortName: ind.shortName,
    tagline: ind.tagline,
    iconSvg: "",
    themeAccent: ind.themeAccent,
    homeCardPrice: ind.pricing.price,
    homeCardDescription: ind.tagline,
    whoThisIsFor: ind.whoThisIsFor,
    hero: ind.hero,
    painPointsEyebrow: ind.painPointsEyebrow,
    painPointsHeadline: ind.painPointsHeadline,
    painPointsHighlight: ind.painPointsHighlight,
    painPointsIntro: ind.painPointsIntro,
    painPoints: ind.painPoints,
    offerEyebrow: ind.offerEyebrow,
    offerHeadline: ind.offerHeadline,
    offerHighlight: ind.offerHighlight,
    offerSubhead: ind.offerSubhead,
    deliverables: ind.deliverables,
    gallery: { title: "", description: "", items: [] },
    processEyebrow: ind.processEyebrow,
    processHeadline: ind.processHeadline,
    processHighlight: ind.processHighlight,
    process: ind.process,
    faqEyebrow: ind.faqEyebrow,
    faqHeadline: ind.faqHeadline,
    faqHighlight: ind.faqHighlight,
    faqs: ind.faqs,
    pricing: ind.pricing,
    finalCta: ind.finalCta,
    related: ind.related,
    meta: ind.meta,
    schema: ind.schema,
  };
}
