// ─── Kits — single source of truth for the site-wide package ladder ─────────
// ONE kit story everywhere: Launch Kit $997 → Local Business Kit $2,800 →
// Growth Kit $4,500 → Full Brand Kit $8,000+. Kit contents are monotonic with
// price (each step up contains strictly more). The homepage pricing section,
// the kit quote form, and the /services/launch-package (Local Business Kit)
// page all read from here — edit kit copy or prices in this file only.
//
// Savings math is computed honestly from the site's own published à-la-carte
// prices (see the `alaCarteBasis` notes) — never inflate these.

export type KitSlug = "launch" | "local-business" | "growth" | "full-brand";

export interface Kit {
  slug: KitSlug;
  name: string;
  price: string;          // display price, e.g. "$2,800"
  numericPrice: number;   // for GA4 lead value + schema
  daily?: string;         // "≈ $8/day · year one" cost-reframe line
  description: string;
  features: string[];
  /** Honest à-la-carte comparison, from published single-service prices. */
  alaCarteTotal: string;  // e.g. "$4,000+"
  savings: string;        // e.g. "$1,200"
  /** Where the published prices come from — keep the math auditable. */
  alaCarteBasis: string;
  timeline: string;
  href: string;           // kit detail / landing page
  quoteHref: string;      // preselected quote form
  popular?: boolean;
}

export const KITS: Kit[] = [
  {
    slug: "launch",
    name: "Launch Kit",
    price: "$997",
    numericPrice: 997,
    description:
      "Logo + 1-page website + 100 business cards + 100 flyers. Everything you need for opening day, shipped in 10 days.",
    features: [
      "Logo + starter brand kit",
      "1-page website with domain + 1 year hosting",
      "100 business cards",
      "100 flyers",
    ],
    alaCarteTotal: "$2,400+",
    savings: "$1,400",
    alaCarteBasis:
      "Logo Starter $750 + Landing site $1,500 + cards from $75 + flyers from $95",
    timeline: "10 days",
    href: "/startup-special",
    quoteHref: "/services/request-quote?kit=launch",
  },
  {
    slug: "local-business",
    name: "Local Business Kit",
    price: "$2,800",
    numericPrice: 2800,
    daily: "≈ $8/day · year one",
    description: "For new businesses that need to look legit, fast.",
    features: [
      "Custom logo & brand identity",
      "Starter website (up to 5 pages)",
      "Mobile responsive design",
      "500 business cards",
      "1,000 flyers / rack cards",
      "Google Business Profile setup",
      "Basic SEO optimization",
    ],
    alaCarteTotal: "$4,000+",
    savings: "$1,200",
    alaCarteBasis:
      "Logo Starter $750 + brand basics + Starter site $2,500 + print pieces (500 cards, 1,000 flyers)",
    timeline: "4 weeks",
    href: "/services/launch-package",
    quoteHref: "/services/request-quote?kit=local-business",
  },
  {
    slug: "growth",
    name: "Growth Kit",
    price: "$4,500",
    numericPrice: 4500,
    daily: "≈ $13/day · year one",
    description: "Our most-requested package. Built to level up.",
    features: [
      "Everything in Local Business Kit",
      "Custom website (up to 10 pages)",
      "AI chatbot integration",
      "Google Business optimization",
      "Social media template pack (20)",
      "On-page SEO + analytics setup",
      "Blog/CMS setup & training",
      "3 rounds of revisions",
    ],
    alaCarteTotal: "$6,500+",
    savings: "$2,000",
    alaCarteBasis:
      "Local Business Kit à la carte ($4,000+) + Growth-tier site upgrade (+$2,000) + Chatbot Starter setup $750",
    timeline: "4–6 weeks",
    href: "/services/request-quote?kit=growth",
    quoteHref: "/services/request-quote?kit=growth",
    popular: true,
  },
  {
    slug: "full-brand",
    name: "Full Brand Kit",
    price: "$8,000+",
    numericPrice: 8000,
    daily: "≈ $22/day · year one",
    description: "For businesses ready to dominate. The complete kit.",
    features: [
      "Everything in Growth Kit",
      "Custom-coded web app",
      "Advanced AI workflow automation",
      "Marketing automation setup",
      "3 months social media management",
      "Complete print starter kit",
      "Vehicle wrap design",
      "Priority support & quarterly reviews",
    ],
    alaCarteTotal: "$12,000+",
    savings: "$4,000",
    alaCarteBasis:
      "Growth Kit à la carte ($6,500+) + Premium site upgrade (+$3,000) + custom automation from $2,500 + 3 months social (~$2,100)",
    timeline: "6–8 weeks",
    href: "/services/request-quote?kit=full-brand",
    quoteHref: "/services/request-quote?kit=full-brand",
  },
];

export const KITS_BY_SLUG: Record<KitSlug, Kit> = Object.fromEntries(
  KITS.map((k) => [k.slug, k]),
) as Record<KitSlug, Kit>;

export function isKitSlug(value: string): value is KitSlug {
  return KITS.some((k) => k.slug === value);
}
