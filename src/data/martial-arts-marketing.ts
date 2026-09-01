// ─── Martial Arts Gym & Fitness Studio Branding product data — single source
// of truth ───────────────────────────────────────────────────────────────────
// Powers the standalone /martial-arts-gym-branding pillar page AND its
// per-city variations (/martial-arts-gym-branding/[city]). Mirrors the
// architecture of src/data/tattoo-marketing.ts: one product config holds
// every piece of copy, the AEO answer-first sentence, the dual-AUDIENCE
// segmentation (martial arts school vs. general gym/fitness studio), the 6
// services, the 3 packages, the researched FAQ, and the Schema.org fields.
// City-specific local copy lives in MARTIAL_ARTS_CITY_COPY below and is
// merged in at render time.
//
// Strategic wedge (keyword plan P4, 8/31/26): the site already ranks ~pos 14.7
// for "brand development for martial arts gyms" with a generic page, and the
// only competitors on the SERP are template platforms — no Georgia-based
// competitor exists. This pillar targets that open lane directly.
//
// Voice rules (mirror BUSINESS-CONTEXT.md / tattoo-marketing.ts): plain-spoken,
// neighborly, a little dark-funny — never corporate agency-speak. Dual
// vocabulary on purpose: martial arts schools think in belts, patches, mats,
// students and enrollment; gyms and fitness studios think in members, classes,
// sign-ups and retention. Every section should read naturally to both without
// forcing either audience to translate.
//
// CONFIDENTIAL CONSTRAINT: never reference trade printers, wholesale resellers,
// or "we don't own a press." Public framing is an in-house print pipeline.
//
// PRICING CONSTRAINT (see .agents/seo-buildout-spec.md hard rule #3): only
// $750 (logo), $2,500 (brand system) and $1,500 (website, from) are real
// numbers from src/data/services.ts. The "Gym Brand Kit" bundle price below is
// the plain sum of two of those real numbers, stated transparently — not an
// invented discount figure. No other dollar figure appears on this page.

import { CALENDLY_URL } from "@/lib/site";

export type MartialArtsSlug = "martial-arts-gym-branding";

// Subset of the @/components/icons barrel — same names the tattoo hub uses,
// confirmed present in icons/index.ts.
export type MAIconName =
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

export interface MAStat {
  value: string;
  label: string;
  source?: string;
}

export interface MABenefit {
  icon: MAIconName;
  title: string;
  body: string;
}

/** Dual-audience segmentation card (martial arts school vs. gym/fitness studio). */
export interface MASegment {
  tag: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; alt: string };
}

/** One of the 6 service cards. */
export interface MAService {
  tag: string;
  title: string;
  body: string;
  points: string[];
}

/** One package tier. */
export interface MATier {
  name: string;
  forWho: string;
  includes: string[];
  price: string;
  featured?: boolean;
}

export interface MAPackages {
  eyebrow: string;
  headline: string;
  highlight: string;
  intro: string;
  note: string;
  tiers: MATier[];
}

export interface MAProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface MAFaq {
  q: string;
  a: string;
}

export interface MARelated {
  href: string;
  label: string;
  blurb: string;
}

export interface MartialArtsProduct {
  slug: MartialArtsSlug;
  /** Full label. */
  label: string;
  /** Short label for chips/breadcrumbs. */
  shortLabel: string;
  /** Noun used in prose, e.g. "martial arts gym branding". */
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
  stats: MAStat[];

  // ── Dual-audience segmentation (dojo/school vocab vs. gym/studio vocab) ──
  segmentsEyebrow: string;
  segmentsHeadline: string;
  segmentsHighlight: string;
  segments: MASegment[];

  // ── Benefits ("Why template brand kits fail gyms & dojos") ──
  benefitsEyebrow: string;
  benefitsHeadline: string;
  benefitsHighlight: string;
  benefits: MABenefit[];

  // ── Services (6 cards) ──
  servicesEyebrow: string;
  servicesHeadline: string;
  servicesHighlight: string;
  servicesIntro: string;
  services: MAService[];

  // ── Packages (3 tiers) ──
  packages: MAPackages;

  // ── The edge ("Why gyms & schools pick Branding Zombie") ──
  edgeEyebrow: string;
  edgeHeadline: string;
  edgeHighlight: string;
  edgeIntro: string;
  edgePoints: string[];
  pratfall: string;

  // ── Process ──
  process: MAProcessStep[];

  // ── Real portfolio proof (ids resolved via getPortfolioItems) ──
  proofEyebrow: string;
  proofHeadline: string;
  proofHighlight: string;
  proofIntro: string;
  proofWorkIds: string[];

  // ── FAQ (city-agnostic, AEO) ──
  faqs: MAFaq[];

  // ── Cross-links ──
  related: MARelated[];

  // ── Schema ──
  schema: { serviceType: string; category: string };
}

// ════════════════════════════════════════════════════════════════════════════
//  MARTIAL ARTS GYM & FITNESS STUDIO BRANDING
// ════════════════════════════════════════════════════════════════════════════
const IMG_BASE = "/assets/martial-arts";

const MARTIAL_ARTS_MARKETING: MartialArtsProduct = {
  slug: "martial-arts-gym-branding",
  label: "Martial Arts Gym & Fitness Studio Branding",
  shortLabel: "Martial Arts & Gym Branding",
  noun: "martial arts gym and fitness studio branding",

  // No trailing brand — the root layout's title template appends
  // "| Branding Zombie Designs" once.
  seoTitle: "Martial Arts Gym & Fitness Studio Branding in Georgia",
  seoDescription:
    "Logo, brand system and enrollment-ready websites for martial arts schools, dojos and fitness studios in Cumming, GA and North Metro Atlanta. Logo $750 · brand system $2,500 · site from $1,500. Flat pricing, one local studio.",
  keywords: [
    "martial arts gym branding",
    "branding services for martial arts gyms",
    "brand development for martial arts gyms",
    "martial arts school marketing",
    "dojo website design",
    "martial arts school logo design",
    "gym branding",
    "gym logo design",
    "fitness studio branding",
    "BJJ gym branding",
    "karate school website",
    "how much does it cost to brand a martial arts school",
  ],
  ogImage: `${IMG_BASE}/hero.jpg`,

  hero: {
    eyebrow: "Martial arts schools & fitness studios · Georgia",
    headline: "Martial Arts Gym & Fitness Studio Branding in",
    highlight: "Georgia",
    subhead:
      "Whether you run a dojo, a karate or BJJ school, or a general gym or fitness studio, your brand has to work on a belt patch, a mat wall, a member tee, and a homepage — not just one of those. Branding Zombie designs the logo, the full brand system, and an enrollment-ready website that turns lookers into signed-up students or paying members. One local studio. Flat pricing.",
    microProof:
      "Logo $750 · Brand system $2,500 · Website from $1,500 — one studio, flat pricing",
    ctaLabel: "Book a free brand teardown",
    image: {
      src: `${IMG_BASE}/hero.jpg`,
      alt: "Martial arts gym and fitness studio branding in Georgia — brand concept visual by Branding Zombie Designs",
    },
  },

  answerFirst:
    "Branding Zombie Designs is a Cumming, Georgia design studio that builds brand identity for martial arts schools, dojos, and gyms and fitness studios across North Metro Atlanta. That means logos and patch-ready marks, a full brand system, and enrollment-focused websites with a trial-class or membership sign-up path. A standalone logo starts at $750, a full brand system starts at $2,500, and a website starts at $1,500. Flat pricing, no retainers, and you own every file.",
  stats: [
    { value: "$750", label: "Flat price to start a gym or martial arts school logo" },
    { value: "2–3 weeks", label: "Most sites go live once the brand is locked" },
    { value: "80+", label: "Design projects shipped, including fitness & athletic brands" },
  ],

  segmentsEyebrow: "Start here",
  segmentsHeadline: "Martial arts school or",
  segmentsHighlight: "gym & fitness studio?",
  segments: [
    {
      tag: "Dojo vocabulary",
      title: "Martial arts school or dojo",
      body: "Karate, taekwondo, BJJ, MMA, kickboxing — your brand has to survive being embroidered onto a belt patch, painted on a mat wall, and used on a class sign-up page. We speak dojo: belts, patches, mats, students, enrollment.",
      ctaLabel: "See martial arts brand packages",
      ctaHref: "#packages",
      image: {
        src: `${IMG_BASE}/segment-dojo.jpg`,
        alt: "Martial arts school and dojo branding concept — belt, patch and mat-wall brand system by Branding Zombie Designs",
      },
    },
    {
      tag: "Gym vocabulary",
      title: "Gym or fitness studio",
      body: "CrossFit box, strength gym, yoga studio, personal training — your brand needs to hold up on the wall, the tee, and a membership sign-up flow. We speak gym: members, classes, sign-ups, retention.",
      ctaLabel: "See gym brand packages",
      ctaHref: "#packages",
      image: {
        src: `${IMG_BASE}/segment-gym.jpg`,
        alt: "Gym and fitness studio branding concept — member-ready logo and brand system by Branding Zombie Designs",
      },
    },
  ],

  benefitsEyebrow: "Why template brand kits fail gyms & dojos",
  benefitsHeadline: "A Canva logo prints fine once.",
  benefitsHighlight: "It falls apart on a patch, a wall, or a sign-up page.",
  benefits: [
    {
      icon: "Target",
      title: "Built for patches AND pixels",
      body: "A martial arts mark has to survive being embroidered onto a 2-inch patch and still read clearly on a phone screen. We design for both from day one instead of hoping a print-only logo somehow works online too.",
    },
    {
      icon: "Lightning",
      title: "Stop losing sign-ups to a dead link",
      body: "A prospect comparing three gyms or dojos joins whoever makes it easiest to enroll online, tonight. A real website with a clear trial-class or membership sign-up path catches them before they close the tab and try the next one.",
    },
    {
      icon: "Sparkle",
      title: "Look as disciplined as your program",
      body: "Your students train hard and your members show up. If the logo looks like stock clip art and the site looks like 2014, that discipline never shows up online — and new leads don't stay long enough to find out it does in person.",
    },
  ],

  servicesEyebrow: "Everything a gym or dojo brand needs",
  servicesHeadline: "One studio for the whole",
  servicesHighlight: "brand kit",
  servicesIntro:
    "Logo, brand system, website, print and signage — all designed to match, all from one local studio, all on one flat invoice. Tell us what your mats or your membership floor need and we'll build it.",
  services: [
    {
      tag: "Logo & mark",
      title: "Gym & martial arts logo design",
      body: "A primary mark built to work everywhere it has to live — mat wall, business card, embroidered patch, app icon, and storefront glass.",
      points: [
        "Primary logo + brand colors",
        "Patch- and embroidery-ready files",
        "Sized for signage, apparel & web",
      ],
    },
    {
      tag: "Brand system",
      title: "Full brand identity system",
      body: "Colors, typography, and a brand guide that keeps a dojo or gym looking like one brand across every belt-rank flyer, class schedule, and social post.",
      points: [
        "Color palette & typography system",
        "Brand guide your whole staff can follow",
        "Merch- and print-ready art",
      ],
    },
    {
      tag: "Website",
      title: "A site that gets people signed up",
      body: "A fast, mobile-first site with a clear trial-class or membership sign-up path — so a prospect enrolls at 9pm instead of forgetting to call you back.",
      points: [
        "Trial class / membership sign-up flow",
        "Class schedule & program pages",
        "Built to rank for local searches",
      ],
    },
    {
      tag: "Print & signage",
      title: "Mat walls, uniforms & class signage",
      body: "Wall graphics, schedule boards, and belt or uniform patch artwork designed and produced through our in-house print pipeline.",
      points: [
        "Mat wall & lobby signage",
        "Class schedule boards",
        "Belt & uniform patch artwork",
      ],
    },
    {
      tag: "Apparel",
      title: "Uniforms, tees & member gear",
      body: "Branded gis, rash guards, gym tees and hoodies that turn every student and member into a walking ad for the program.",
      points: [
        "Gi & uniform branding",
        "Member tees & hoodies",
        "Retail-ready merch design",
      ],
    },
    {
      tag: "Growth",
      title: "Local SEO & social content",
      body: "Local search visibility and class-highlight social content that fills the 6pm adult class and the Saturday kids class alike.",
      points: [
        "Local SEO & Google Business setup",
        "Class-highlight social content",
        "Enrollment-focused ad creative",
      ],
    },
  ],

  packages: {
    eyebrow: "Packages & flat pricing",
    headline: "Pick a package or",
    highlight: "build your own kit",
    intro:
      "Real prices, no retainers. Most dojos and gyms start with a free brand teardown so we scope it right — then you own every file, with no lock-in.",
    note:
      "Logo $750 · Brand system $2,500 · Website from $1,500 — the Gym Brand Kit below is those two combined. Signage, uniforms and launch print are quoted once we know your walls and roster size, not baked into a guess here.",
    tiers: [
      {
        name: "Logo & Mark",
        forWho: "Schools and gyms that just need the mark right.",
        includes: [
          "Primary logo + brand colors",
          "Patch- and embroidery-ready files",
          "Web, print & apparel formats",
        ],
        price: "$750",
      },
      {
        name: "The Gym Brand Kit",
        forWho: "Most dojos & gyms — the mark, the system, and a site that signs people up.",
        includes: [
          "Full brand identity system",
          "Enrollment-ready website",
          "Class schedule & sign-up flow",
          "Mat wall / signage-ready files",
        ],
        price: "from $4,000",
        featured: true,
      },
      {
        name: "New Program Launch",
        forWho: "New dojos, new locations, or a full relaunch.",
        includes: [
          "Everything in the Gym Brand Kit",
          "Mat wall & storefront signage",
          "Uniform & member apparel design",
          "Launch social & local ads",
        ],
        price: "$4,000+ · custom quote",
      },
    ],
  },

  edgeEyebrow: "Why gyms & schools pick Branding Zombie",
  edgeHeadline: "Not a template gym website builder.",
  edgeHighlight: "Not a $15k Atlanta agency.",
  edgeIntro:
    "We're not a template website platform and we're not a $15k Atlanta agency. We're a local studio that does the whole stack, answers the phone, and ships fast.",
  edgePoints: [
    "Full stack in one studio — logo, brand system, website, signage and apparel, so it all matches and it's one invoice.",
    "Local and hands-on — you talk to the person doing the work, not an account manager three states away.",
    "Flat, honest pricing — no surprise bills, no retainers you can't cancel. You own every file.",
    "Built to work on a patch AND a homepage — most \"gym branding\" services only think about one of the two.",
  ],
  pratfall:
    "We're not the cheapest, and we're not built for big-box franchise vibes. We're for gyms and dojos that actually care what their brand looks like on the wall.",

  process: [
    {
      step: "01",
      title: "Free brand teardown",
      body: "A quick 15-minute call. We look at your current logo, site and signage and name the 3 fastest fixes — no pitch, no pressure.",
    },
    {
      step: "02",
      title: "Flat quote & plan",
      body: "You get a plain-English scope and one flat price. Pick a package or mix your own.",
    },
    {
      step: "03",
      title: "We build it",
      body: "Logo, brand system, website, print and signage — designed to match, built fast, sent to you for one round of tweaks.",
    },
    {
      step: "04",
      title: "Live in weeks",
      body: "Your enrollment site goes live, the mat wall or gym floor gets dressed, and sign-ups start. We're here for what's next.",
    },
  ],

  proofEyebrow: "The work",
  proofHeadline: "Fitness & athletic",
  proofHighlight: "brand work",
  proofIntro:
    "We haven't published a dojo build yet — here's real, shipped work for fitness and strength brands that shows how we handle athletic marks and full brand systems, from a patch-ready logo to a complete ecommerce build.",
  proofWorkIds: ["macefit-logo", "muscleology", "swet-campaign", "dmax10-watermelon"],

  faqs: [
    {
      q: "How much does it cost to brand a martial arts school?",
      a: "A standalone logo starts at $750. A full brand system — logo, color palette, typography and a brand guide — starts at $2,500. A website with a class schedule and sign-up path starts at $1,500. Most schools and gyms combine the brand system and the website, so the full Gym Brand Kit runs from about $4,000. Signage, uniforms and apparel are quoted once we know your space and roster.",
    },
    {
      q: "What's actually included in martial arts gym branding?",
      a: "A logo and mark that work on a patch and a screen, a color and typography system, an enrollment-ready website, and the print files for mat walls, signage, uniforms and apparel — all designed to match and delivered from one studio.",
    },
    {
      q: "What do branding services for martial arts gyms actually cover?",
      a: "Branding services for martial arts gyms should cover the logo and mark, a full color and typography system, print-ready patch and uniform art, mat wall and signage files, and a website — everything a prospect sees before they ever set foot on the mat. We build all of it, not just the logo.",
    },
    {
      q: "What does brand development for martial arts gyms include?",
      a: "It starts with the logo and color system, then extends it into everything the school touches — the website, the mat wall, class flyers, belt or uniform patches, and social content — so a prospect sees one consistent brand from the first Google search to the first class.",
    },
    {
      q: "Is martial arts school marketing more than just a logo?",
      a: "Yes. Martial arts school marketing that actually fills classes needs three things working together: a brand that looks disciplined, a website with a trial-class sign-up, and a claimed Google Business Profile with local visibility. We build all three from one studio instead of leaving you to stitch them together.",
    },
    {
      q: "What does dojo website design need to include?",
      a: "Good dojo website design shows the class schedule, the programs by age and belt level, and a clear trial-class or membership sign-up path — mobile-first, since most parents and prospects are browsing and signing up from a phone, not a desktop.",
    },
    {
      q: "Do you do martial arts school logo design, or just general branding?",
      a: "Martial arts school logo design is where most projects start — a primary mark built to survive being embroidered onto a belt or gi patch and still read clearly on a phone screen. From there it's your call whether to add the full brand system and website or stop at the logo.",
    },
    {
      q: "Do you handle general gym branding too, not just martial arts?",
      a: "Yes. CrossFit boxes, strength gyms, yoga and Pilates studios, and personal-training brands get the same gym branding treatment — logo, brand system and an enrollment-ready site — just in gym vocabulary: members and sign-ups instead of students and belts.",
    },
    {
      q: "How much does gym logo design cost?",
      a: "Gym logo design starts at $750, flat. That covers the primary mark, your brand colors, and files ready for wall paint, apparel, patches and your website, so the same look shows up everywhere a member sees it.",
    },
    {
      q: "Do you do fitness studio branding for yoga, Pilates and personal-training brands?",
      a: "Yes. Fitness studio branding gets the same logo-plus-brand-system-plus-website treatment as a gym or dojo — designed to work on a studio wall, a class schedule, and a membership sign-up flow, not just a business card.",
    },
    {
      q: "Do you design BJJ gym branding and karate school websites?",
      a: "Yes. BJJ gym branding, karate school websites, and marks for taekwondo, MMA and kickboxing schools all get the same treatment — a logo built to survive embroidery on a belt or gi patch, plus a site with a real sign-up path, not a template mad-lib.",
    },
    {
      q: "Do you work with gyms and martial arts schools outside Cumming?",
      a: "We're local-first for branding, websites and installed signage across Forsyth County and North Metro Atlanta. Logo, brand system and print files can ship anywhere in the US, so out-of-area gyms and schools can still get the full brand kit.",
    },
  ],

  related: [
    {
      href: "/services/branding",
      label: "Full brand identity systems",
      blurb: "Logo, colors, type and guidelines — the whole system, from $2,500.",
    },
    {
      href: "/services/logo-design",
      label: "Logo design",
      blurb: "A mark that holds up on a patch, a wall and a homepage — from $750.",
    },
    {
      href: "/services/web-design",
      label: "Web design & sign-up sites",
      blurb: "Fast, mobile-first sites built to enroll members and students, from $1,500.",
    },
    {
      href: "/industries/gyms-fitness",
      label: "Gyms & fitness industry hub",
      blurb: "More logo, signage and apparel work for gyms and studios.",
    },
    {
      href: "/blog/gym-martial-arts-branding-cumming",
      label: "Gym & martial arts branding costs",
      blurb: "The full breakdown of what branding a gym or dojo actually costs.",
    },
    {
      href: "/contact",
      label: "Talk to Gerry",
      blurb: "One local studio, owner answers the phone.",
    },
  ],

  schema: {
    serviceType: "Martial Arts Gym & Fitness Studio Branding",
    category: "Marketing & Design Services",
  },
};

// ─── Registry + getters ─────────────────────────────────────────────────────
export const MARTIAL_ARTS_MARKETING_PRODUCT = MARTIAL_ARTS_MARKETING;

export function getMartialArtsProduct(): MartialArtsProduct {
  return MARTIAL_ARTS_MARKETING;
}

// CTA hrefs reused across components.
export const MARTIAL_ARTS_CTA = {
  calendly: CALENDLY_URL,
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  PER-CITY LOCAL COPY (martial-arts-specific — do NOT reuse locations.ts angles)
// ════════════════════════════════════════════════════════════════════════════
// Keyed by the Location.slug in src/data/locations.ts. Each entry is hand-
// written with real local specifics so the city pages are not thin "mad-libs"
// content. `intro` is ~18–26 words; `angle` is ~60–90 words; `cityFaq` is one
// martial-arts/gym-branding-specific local Q&A used in the FAQ + FAQPage schema.
export interface MACityCopy {
  intro: string;
  angle: string;
  cityFaq: MAFaq;
}

export const MARTIAL_ARTS_CITY_COPY: Record<string, MACityCopy> = {
  "cumming-ga": {
    intro:
      "Branding Zombie is right here in Cumming — the local studio gyms and martial arts schools call when the brand needs to catch up to the program.",
    angle:
      "Cumming's gyms-and-fitness scene is real — CrossFit boxes off Post Road, martial arts schools near The Collection at Forsyth, and studios competing for the same walk-in who's comparing three options on their phone before ever stepping onto a mat. We build Cumming dojos and gyms a logo that survives a patch and a homepage, a brand system that matches the mat wall to the website, and a sign-up flow that catches a prospect at 9pm instead of losing them down GA-400. All from a studio ten minutes away.",
    cityFaq: {
      q: "Do you work with gyms and martial arts schools in Cumming in person?",
      a: "Yes — we're based in Cumming, so we can walk your mat space or gym floor, look at the wall you want branded, and turn a brand teardown into a real plan the same week.",
    },
  },
  "alpharetta-ga": {
    intro:
      "Alpharetta parents and members compare studios against Avalon-level polish — your dojo or gym brand has to look like it belongs there.",
    angle:
      "Between Avalon, downtown Alpharetta, and the Windward corridor, a family choosing a martial arts school or a member choosing a gym scrolls past national franchises with real marketing budgets before they ever find you. A logo that still looks like a 2015 clip-art belt patch quietly tells them you're the smaller, cheaper option. We build Alpharetta gyms and dojos a custom mark, brand system and enrollment-ready site that holds its own against the franchises — 20 minutes up GA-400, no agency retainer.",
    cityFaq: {
      q: "Can you make my Alpharetta gym or dojo look as polished as the franchise studios?",
      a: "That's the point. We custom-build your logo, brand system and website — no templates — so an independent Alpharetta gym or martial arts school looks as credible as the big-box franchises, at a flat price you own outright.",
    },
  },
  "suwanee-ga": {
    intro:
      "Suwanee is one of Georgia's most family-friendly towns, and parents pick a martial arts school the way they pick a pediatrician — carefully.",
    angle:
      "Suwanee's gyms and fitness scene runs on families around Town Center and the Peachtree Industrial corridor, and a parent picking a martial arts school for their kid decides fast, locally, and usually from a phone. A clear brand and a sign-up page that shows the class schedule and lets them book a trial class on the spot wins that decision. We build Suwanee dojos and gyms a brand and enrollment-ready site made for exactly that moment.",
    cityFaq: {
      q: "Do you build enrollment sites for Suwanee martial arts schools and gyms?",
      a: "Yes — mobile-first, with the trial-class or membership sign-up button impossible to miss, because most Suwanee parents are booking from a phone between school pickups, not a desktop.",
    },
  },
  "johns-creek-ga": {
    intro:
      "Johns Creek families research before they enroll — your gym or dojo's brand is the whole first impression before the trial class.",
    angle:
      "Johns Creek is one of the most affluent, research-heavy markets in Georgia, and a parent comparing martial arts schools or a member comparing gyms around Medlock Bridge and Technology Park checks the website and the brand before they ever call. A logo that looks handmade in Canva, or a site that loads slow on a phone, loses that comparison before you get a chance to make your case in person. We build Johns Creek gyms and dojos a brand and site built to earn that trust fast.",
    cityFaq: {
      q: "Do Johns Creek parents really check a martial arts school's website before enrolling their kid?",
      a: "Constantly — Johns Creek is a research-first market. A fast, credible site with a clear class schedule and trial-class sign-up converts those careful, comparison-shopping parents far better than an Instagram bio link.",
    },
  },
};

export function getMartialArtsCityCopy(slug: string): MACityCopy | undefined {
  return MARTIAL_ARTS_CITY_COPY[slug];
}
