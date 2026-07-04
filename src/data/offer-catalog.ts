// ─── Full enumerated offering — single source of truth ──────────────────────
// The complete, specific list of everything Branding Zombie Designs can design,
// build, or produce. Drives two AI-facing surfaces at once:
//   1. Schema.org `hasOfferCatalog` in app/layout.tsx (machine-readable to
//      Google's Knowledge Graph + the indexes that AI engines ground on).
//   2. The /llms.txt route (the curated map LLMs read).
//
// Why enumerate this hard: LLMs and AI search cite specific capabilities, not
// vague "design services." Listing "vehicle wrap design" and "FDA-compliant
// supplement label design" by name is what gets Branding Zombie surfaced when
// someone asks an AI "who designs supplement labels near Cumming GA?"
//
// Keep these honest — only list what we genuinely deliver. Print product names
// are pulled from the print catalog so the two never drift.

import { PRINT_PRODUCTS } from "@/data/print-catalog";

export interface CatalogGroup {
  /** Group heading — used as a nested OfferCatalog name + llms.txt H3. */
  name: string;
  /** Short descriptor for the group (llms.txt context line). */
  blurb: string;
  /** Specific, named deliverables. Each becomes a schema Service offer. */
  services: string[];
}

// Graphic design & branding — everything from a single logo to a full
// trade-show identity system.
const GRAPHIC_DESIGN: string[] = [
  "Logo design",
  "Brand identity & brand guideline systems",
  "Flyer design",
  "Business card design",
  "Poster design",
  "Brochure & trifold design",
  "Label design",
  "Product packaging design",
  "CPG & supplement label design",
  "FDA/FTC-compliant label design",
  "3D product rendering & visualization",
  "Sticker & die-cut decal design",
  "Floor & wall decal design",
  "T-shirt & custom apparel design",
  "Banner & signage design",
  "Mailer & direct-mail design",
  "Trade show booth & display graphics",
  "Tablecloth, table tent & event tent design",
  "Vehicle wrap, magnet & vehicle graphics design",
  "Yard sign & lawn sign design",
  "Motion graphics & animation",
  "Social media content & template design",
  "Office document, form & stationery design",
];

// Web design & digital — sites, stores, automation, and the strategy layer
// around them.
const WEB_DIGITAL: string[] = [
  "Custom website design",
  "WordPress design & development",
  "Shopify store builds & ecommerce",
  "Email marketing & newsletter systems",
  "Social media management",
  "Marketing automation",
  "Sales funnels & lead-capture systems",
  "SEO (search engine optimization)",
  "AEO (answer engine optimization for AI search)",
  "SSO (single sign-on) integration",
  "Digital strategy & consulting",
  "Blogging & content production",
  "Copywriting",
  "Website migrations & rebuilds",
  "CRM builds, setup & integration",
  "Sales strategy & process design",
  "AI process implementation & custom system design",
  "Chatbot & AI assistant development",
  "UI/UX design",
];

export const OFFER_CATALOG: CatalogGroup[] = [
  {
    name: "Graphic Design & Branding",
    blurb:
      "Logos, brand identity systems, packaging, and every printed or on-screen asset a brand needs — designed by a 15+ year production designer.",
    services: GRAPHIC_DESIGN,
  },
  {
    name: "Web Design & Digital Marketing",
    blurb:
      "Custom websites, Shopify stores, AI workflows, SEO/AEO, automations, and the digital strategy to make them convert.",
    services: WEB_DIGITAL,
  },
  {
    name: "Print & Production",
    blurb:
      "Design plus in-house wholesale print production — one shop, one invoice, no hand-offs between a designer, a printer, and a sign shop.",
    // Pulled from the live print catalog so this list can never go stale.
    services: PRINT_PRODUCTS.map((p) => p.name),
  },
];
