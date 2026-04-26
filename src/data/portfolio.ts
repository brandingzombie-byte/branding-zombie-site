// ─── Portfolio — single source of truth for service-page galleries ─────────
// Real client work, cross-tagged so one project can appear under every service
// it qualifies for (most label projects were also branding + print work).
//
// To add a new piece: drop the asset into /public/assets/..., then add an
// entry below with the right `services` tags. It will automatically show up
// on each tagged service page's gallery.

import type { Gallery4Item } from "@/components/ui/gallery4";
import type { ServiceSlug } from "@/data/services";

// Aspect hint for the gallery card. "tall" = bottle/jar shots, "wide" =
// banners/lifestyle ads, "square" = labels/cards, "auto" = let it ride.
// Used by Gallery4 to pick the right card height.
export type PortfolioAspect = "tall" | "wide" | "square" | "auto";

export interface PortfolioItem {
  id: string;
  title: string;
  brand?: string;          // shown as small uppercase eyebrow
  description: string;     // 1–2 sentences, lead with the deliverable
  image: string;
  href?: string;           // optional outbound link (live site, IG handle)
  services: ServiceSlug[]; // every service this piece belongs in
  aspect?: PortfolioAspect;
  formats?: string[];      // "label", "box", "business-card", "flyer", etc.
  industry?: string;       // "supplements", "restaurant", "construction"...
}

const SITE = "https://brandingzombiedesigns.com";

// Helper for filenames containing spaces — Next/Image handles either, but
// URL-encoding keeps things consistent across server + client.
const enc = (path: string) =>
  path
    .split("/")
    .map((seg) => (seg.includes(" ") ? encodeURIComponent(seg) : seg))
    .join("/");

// ─── PORTFOLIO ENTRIES ──────────────────────────────────────────────────────
export const PORTFOLIO: PortfolioItem[] = [
  // ════════════════════════════════════════════════════════════════════════
  // WEB / ECOMMERCE — full-site builds (the "Selected work" hero set)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "papas-kitchen",
    title: "Papa's Kitchen Diner",
    brand: "Local · Restaurant",
    description:
      "Family-owned Georgia diner. Full online ordering with checkout and a monthly subscription that pulled recurring revenue out of regulars.",
    image: "/assets/portfolio-papaskitchen.png",
    href: "https://papaskitchendinerga.com",
    services: ["web-design", "ecommerce", "launch-package"],
    aspect: "wide",
    formats: ["website", "online-ordering"],
    industry: "restaurant",
  },
  {
    id: "enigma-computers",
    title: "Enigma Computers",
    brand: "Cumming, GA · Custom PC Builder",
    description:
      "Full brand identity plus a request-for-quote flow that walks visitors through a guided build. Local Cumming custom PC shop.",
    image: "/assets/portfolio-enigma.png",
    href: "https://enigma-computers-site.vercel.app",
    services: ["web-design", "branding", "logo-design", "launch-package"],
    aspect: "wide",
    formats: ["website", "rfq-flow", "brand-system"],
    industry: "tech-retail",
  },
  {
    id: "planters-etc",
    title: "Planters Etc.",
    brand: "DTC · Garden & Home",
    description:
      "Brand refresh + 75-SKU Shopify catalog built from the ground up. First year cleared $100k in online sales.",
    image: "/assets/portfolio-planters.png",
    href: "https://plantersetc.com",
    services: ["ecommerce", "branding", "web-design", "digital-marketing"],
    aspect: "wide",
    formats: ["website", "shopify", "brand-refresh"],
    industry: "home-garden",
  },
  {
    id: "squeeze-me-skinny",
    title: "Squeeze Me Skinny",
    brand: "DTC · Wellness",
    description:
      "Full rebrand, ecommerce build, and an affiliate platform that scaled to hundreds of partners. ~$200k/mo in tracked sales.",
    image: "/assets/portfolio-squeeze.png",
    href: "https://squeezmeskinny.com",
    services: ["ecommerce", "branding", "web-design", "digital-marketing"],
    aspect: "wide",
    formats: ["website", "affiliate-platform", "rebrand"],
    industry: "wellness",
  },
  {
    id: "jay-scotts",
    title: "Jay Scotts",
    brand: "B2B · Sales Pipeline",
    description:
      "B2B pipeline build, customer service automations, and lifecycle email. Turned a manual sales process into a ~$100k/wk engine.",
    image: "/assets/portfolio-jayscotts.png",
    href: "https://jayscotts.com",
    services: ["web-design", "ai-workflows", "digital-marketing", "ecommerce"],
    aspect: "wide",
    formats: ["website", "automation", "email-system"],
    industry: "b2b",
  },
  {
    id: "pure-blanco",
    title: "Pure Blanco",
    brand: "DTC · Streetwear",
    description:
      "Brand identity + Shopify storefront for a gothic streetwear label. Concept to live store in four weeks.",
    image: "/assets/portfolio-blanco.png",
    href: "https://pureblanco.com",
    services: ["ecommerce", "branding", "logo-design", "web-design"],
    aspect: "wide",
    formats: ["website", "shopify", "brand-system"],
    industry: "fashion",
  },
  {
    id: "muscleology",
    title: "Muscleology",
    brand: "DTC · Supplements",
    description:
      "Full ecommerce build for a premium supplement brand. Product catalog, stack builder, and a conversion-tuned layout that drives repeats.",
    image: "/assets/portfolio-muscleology.png",
    href: "https://muscleology.com",
    services: ["ecommerce", "web-design", "digital-marketing"],
    aspect: "wide",
    formats: ["website", "catalog", "stack-builder"],
    industry: "supplements",
  },
  {
    id: "sharp-edge",
    title: "Sharp Edge Construction",
    brand: "Key West, FL · Construction",
    description:
      "Brand refresh and full site for a Key West contractor specializing in spalling repair and government work. Built to win bids.",
    image: "/assets/portfolio-sharpedge.png",
    href: "https://sharpedgeconstructionfl.com",
    services: ["web-design", "branding", "logo-design"],
    aspect: "wide",
    formats: ["website", "brand-refresh"],
    industry: "construction",
  },

  // ════════════════════════════════════════════════════════════════════════
  // BRANDING — full identity systems with packaging hero shots
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "betancourt-family",
    title: "Betancourt Nutrition — full brand family",
    brand: "Betancourt Nutrition",
    description:
      "Multi-SKU brand system unifying 10+ products on shelf. Identity, label architecture, and production-ready files across the line.",
    image: "/assets/product-design/product%20design_%2028.png",
    services: ["branding", "print-design", "digital-marketing"],
    aspect: "wide",
    formats: ["brand-family", "labels", "lifestyle"],
    industry: "supplements",
  },
  {
    id: "betancourt-intro",
    title: "Betancourt Nutrition — brand intro",
    brand: "Betancourt Nutrition",
    description:
      "Brand introduction one-pager — 20-year heritage, retailer footprint, and athlete positioning condensed into a single shareable layout.",
    image: "/assets/services/social-media/BET%20Brand%20Intro%20Page.png",
    services: ["branding", "social-media", "digital-marketing"],
    aspect: "wide",
    formats: ["brand-intro", "one-pager"],
    industry: "supplements",
  },
  {
    id: "luxury-life",
    title: "Luxury Life — fragranced body butter",
    brand: "Luxury Life",
    description:
      "Premium beauty packaging system across multiple scents. Editorial, dark, retail-shelf-ready — the kind of jar you don't want to throw out.",
    image:
      "/assets/services/branding-design/Luxury%20Life%20Scent%20Butters%20Branding%20Design/Luxury%20Life%20tin%20can-Body%20Butter%20Lux.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "brand-system"],
    industry: "beauty",
  },
  {
    id: "thrasher-beard-oil",
    title: "Thrasher Hemp Co. — beard oil",
    brand: "Thrasher Hemp Co.",
    description:
      "Hemp grooming brand — illustrated mark, kraft-style label, and dropper bottle system designed for indie barbershop and DTC retail.",
    image: "/assets/services/branding-design/Thrasher%20Bottle-Default%20View.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "logo", "label"],
    industry: "grooming",
  },
  {
    id: "calipharms-cbd",
    title: "CaliPharms — CBD muscle & joint relief",
    brand: "CaliPharms",
    description:
      "Brand and label design for a 1,000mg CBD roll-on. Clean, clinical, shelf-credible — built to read at arm's length on a dispensary wall.",
    image:
      "/assets/services/branding-design/Calipharms_Roll%20On%20Bottle-Branding%20and%20Label%20Design.png",
    services: ["branding", "print-design", "logo-design"],
    aspect: "tall",
    formats: ["packaging", "label", "logo"],
    industry: "cbd",
  },
  {
    id: "coolto-nutrition",
    title: "Cool-To Nutrition — full brand line",
    brand: "Cool-To Nutrition",
    description:
      "Complete brand system across whey, weight management, and pre-workout. Bright, accessible packaging built to convert on Amazon and in big-box.",
    image: "/assets/services/branding-design/CoolTo_Branding%20and%20Label%20Design.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "wide",
    formats: ["brand-family", "packaging"],
    industry: "supplements",
  },
  {
    id: "proven-vitamins",
    title: "Proven Vitamins — daily multi",
    brand: "Proven Vitamins",
    description:
      "Brand mark + label system for an everyday multivitamin line. Confident, blue, drugstore-aisle ready.",
    image:
      "/assets/services/branding-design/Proven_Branding%20and%20Label%20Design.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "square",
    formats: ["logo", "packaging", "label"],
    industry: "supplements",
  },
  {
    id: "sea-la-bella",
    title: "Sea la Bella — brightening mousse",
    brand: "Sea la Bella",
    description:
      "Full skincare brand for an oxygen-infused brightening line. Coastal palette, foiled label, and bottle-pair packaging.",
    image: "/assets/services/branding-design/Sea%20la%20Bella_Label%20and%20Branding.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "brand-system"],
    industry: "beauty",
  },
  {
    id: "shield-labs-multi",
    title: "Shield Labs — campaign banner",
    brand: "Shield Labs",
    description:
      "All-in-one daily multivitamin campaign visual — packaging, athlete photography, and tagline locked together for paid social and web hero.",
    image: "/assets/services/branding-design/Shield%20Labs.png",
    services: ["branding", "social-media", "digital-marketing"],
    aspect: "wide",
    formats: ["banner", "lifestyle", "campaign"],
    industry: "supplements",
  },
  {
    id: "shield-labs-cla",
    title: "Shield Labs — Daily CLA",
    brand: "Shield Labs",
    description:
      "Premium tub label for the Daily CLA SKU — clean architecture, compliant claims, print-ready files for the co-packer.",
    image: "/assets/product-design/product%20design_%2015.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "total-holistic-tincture",
    title: "Total Holistic — full spectrum tincture",
    brand: "Total Holistic Supplements",
    description:
      "Brand and label design for a 1,000mg full spectrum hemp tincture. Black bottle, foil callouts, retail-credible.",
    image:
      "/assets/services/branding-design/Total%20Holistic_Label%20and%20Branding%20Design%20and%20Print.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "brand-system"],
    industry: "cbd",
  },
  {
    id: "total-holistic-salve",
    title: "Total Holistic — pain salve",
    brand: "Total Holistic Supplements",
    description:
      "Companion salve packaging. Same brand DNA as the tincture line — built to merchandise as a system, not a one-off.",
    image:
      "/assets/services/branding-design/Total%20Holistic_Salve_Label%20and%20Branding%20Design%20and%20Print.png",
    services: ["branding", "print-design"],
    aspect: "square",
    formats: ["packaging", "label"],
    industry: "cbd",
  },
  {
    id: "breath-rox-family",
    title: "Breath Rox — breath crystal vials",
    brand: "Breath Rox",
    description:
      "Full SKU family across Peppermint, Orange, and Watermelon. Distinctive vial form factor with compliant supplement labeling.",
    image:
      "/assets/services/branding-design/Breath%20Rox%20Tube-Top%20Rocks_2-Current%20View.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "tall",
    formats: ["packaging", "brand-family"],
    industry: "wellness",
  },
  {
    id: "solaravita-amazon",
    title: "Solaravita — Amazon candy brand",
    brand: "Solaravita",
    description:
      "Amazon-first candy brand — sub-brand for sour, classic, and patriot variety packs. Mailer box + flow-wrap pouch system.",
    image:
      "/assets/services/branding-design/Solaravita_Amazon%20Candy%20Brand/_Amazon_-Candy%20Sop%20Classics.png",
    services: ["branding", "ecommerce", "print-design", "logo-design"],
    aspect: "square",
    formats: ["packaging", "brand-family", "amazon"],
    industry: "candy",
  },

  // ════════════════════════════════════════════════════════════════════════
  // PRODUCT-DESIGN — packaging, labels, multi-flavor systems (40-piece pool)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "simply-nutrition-lineup",
    title: "Simply Nutrition — multi-SKU lineup",
    brand: "Simply Nutrition",
    description:
      "Unified label system across whey, mass gainer, aminos, creatine, and BCAA. Eight SKUs that read as one family.",
    image: "/assets/product-design/product%20design_%201.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "supplements",
  },
  {
    id: "breath-rox-peppermint",
    title: "Breath Rox — peppermint vial",
    brand: "Breath Rox",
    description:
      "Single-SKU detail shot of the peppermint breath crystal. Vivid candy-cane art, zinc callout, sugar-free badging.",
    image: "/assets/product-design/product%20design_%202.png",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "wellness",
  },
  {
    id: "athletes-only-cbd",
    title: "Athletes Only CBD — 2,000mg system",
    brand: "Athletes Only",
    description:
      "Full packaging suite — matching tincture and canister with compliant claims and print-ready production files.",
    image: "/assets/product-design/product%20design_%203.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "brand-system"],
    industry: "cbd",
  },
  {
    id: "swet-campaign",
    title: "S.W.E.T. — diuretic + burn campaign",
    brand: "Betancourt",
    description:
      "Packaging plus lifestyle campaign assets. Box, bottle label, and editorial shot delivered together for retail and digital.",
    image: "/assets/product-design/product%20design_%204.png",
    services: ["branding", "print-design", "social-media", "digital-marketing"],
    aspect: "wide",
    formats: ["packaging", "campaign", "lifestyle"],
    industry: "supplements",
  },
  {
    id: "dmax10-watermelon",
    title: "dMAX10 Reloaded — watermelon slushie",
    brand: "Betancourt",
    description:
      "Flavor-specific lifestyle ad for an intra/post-workout recovery formula. Hero food photography meets compliant supplement claims.",
    image: "/assets/product-design/product%20design_%205.png",
    services: ["social-media", "digital-marketing", "branding"],
    aspect: "wide",
    formats: ["lifestyle", "campaign"],
    industry: "supplements",
  },
  {
    id: "bnox-tropical",
    title: "B-NOX Androrush — tropical lifestyle",
    brand: "Betancourt",
    description:
      "Beach-set lifestyle render for the flagship pre-workout. The kind of ad that performs on Meta and stops the scroll.",
    image: "/assets/product-design/product%20design_%206.png",
    services: ["social-media", "digital-marketing", "branding"],
    aspect: "tall",
    formats: ["lifestyle", "social-creative"],
    industry: "supplements",
  },
  {
    id: "test-hp-reloaded",
    title: "TEST-HP Reloaded — box + bottle system",
    brand: "Betancourt",
    description:
      "Full packaging suite — die-line-matched box, supplement facts panel, print-ready artwork delivered to printer specs.",
    image: "/assets/product-design/product%20design_%207.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "box", "label"],
    industry: "supplements",
  },
  {
    id: "goodlife-creatine",
    title: "GoodLife — pure creatine",
    brand: "GoodLife",
    description:
      "Stark black-and-yellow label with custom typographic mark. Built to dominate a crowded creatine shelf.",
    image: "/assets/product-design/product%20design_%208.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "logo", "label"],
    industry: "supplements",
  },
  {
    id: "lcarnitine-3000",
    title: "L-Carnitine 3000 — shot bottle trio",
    brand: "Greater",
    description:
      "Triple-bottle hero render for a liquid carnitine shot. Teal, gold, vibrant — designed for impulse retail.",
    image: "/assets/product-design/product%20design_%209.png",
    services: ["print-design", "branding", "ecommerce"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "swet-water-expel",
    title: "S.W.E.T. — water-expelling banner",
    brand: "Betancourt",
    description:
      "Vertical lifestyle ad for the diuretic SKU. Aqua water surface, distressed type, retail and IG-ready.",
    image: "/assets/product-design/product%20design_%2010.png",
    services: ["social-media", "digital-marketing"],
    aspect: "tall",
    formats: ["lifestyle", "social-creative"],
    industry: "supplements",
  },
  {
    id: "high-standards-spray",
    title: "High Standards — disinfecting spray",
    brand: "High Standards",
    description:
      "Plant-based disinfecting spray packaging — two SKU sizes, victorian floral pattern, cruelty-free claims.",
    image: "/assets/product-design/product%20design_%2011.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "home-care",
  },
  {
    id: "cpg-supplies-cleaning",
    title: "CPG Supplies — industrial cleaning gallons",
    brand: "CPG Supplies",
    description:
      "Industrial cleaning system — alkaline degreaser and pot & pan soap. B2B janitorial labeling, bilingual compliance.",
    image: "/assets/product-design/product%20design_%2012.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "b2b"],
    industry: "industrial",
  },
  {
    id: "simply-aminos-flavors",
    title: "Simply Aminos — 4 flavor SKU lineup",
    brand: "Simply Nutrition",
    description:
      "Four-flavor amino lineup — unified architecture with flavor differentiation. Pink, mint, berry, fruit punch.",
    image: "/assets/product-design/product%20design_%2013.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "supplements",
  },
  {
    id: "test-pro-multivitamin",
    title: "Test Pro — Advanced Daily Multivitamin",
    brand: "Test Pro",
    description:
      "Lifestyle hero with packaging composited into a runner shot. Built for paid social and storefront banner duty.",
    image: "/assets/product-design/product%20design_%2014.png",
    services: ["social-media", "digital-marketing"],
    aspect: "tall",
    formats: ["lifestyle", "social-creative"],
    industry: "supplements",
  },
  {
    id: "vyotech-absolution",
    title: "Vyotech — AB-Solution Cuts",
    brand: "Vyotech Nutritionals",
    description:
      "Black-on-black thermogenic label with sharp icon row. Confident, masculine, capsule-bottle hero.",
    image: "/assets/product-design/product%20design_%2016.png",
    services: ["branding", "print-design"],
    aspect: "square",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "miracle-eyes-serum",
    title: "Miracle Eyes — lash + brow serum",
    brand: "Miracle Eyes",
    description:
      "Beauty serum bottle with abstract teal-and-gold zebra art. Unmistakable on a beauty-counter shelf.",
    image: "/assets/product-design/product%20design_%2017.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "beauty",
  },
  {
    id: "golden-naturals-maca",
    title: "Golden Naturals — Maca Root",
    brand: "Golden Naturals",
    description:
      "Front + back render of a herbal capsule line. Amber bottle, gold foil, GMP/USA-made compliance.",
    image: "/assets/product-design/product%20design_%2018.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "wide",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "high-standards-tight",
    title: "High Standards — Tight & Toned cream",
    brand: "High Standards",
    description:
      "Hemp-based fat-burning topical in a squeeze tube. Front-and-back layout, wellness-counter ready.",
    image: "/assets/product-design/product%20design_%2019.png",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "wellness",
  },
  {
    id: "golden-naturals-berberine",
    title: "Golden Naturals — Berberine HCl",
    brand: "Golden Naturals",
    description:
      "Sister SKU to the Maca line — same brand architecture, different functional callouts. Brand systems doing their job.",
    image: "/assets/product-design/product%20design_%2020.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "elan-immuno",
    title: "Elan Science — Daily Immuno Booster",
    brand: "Elan Science",
    description:
      "Vitamin C + Zinc capsule line. Black bottle, gold-and-white label architecture, premium drugstore aesthetic.",
    image: "/assets/product-design/product%20design_%2021.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "logo", "label"],
    industry: "supplements",
  },
  {
    id: "tetra-farms-thc",
    title: "Tetra Farms — Premium THC distillate",
    brand: "Tetra Farms",
    description:
      "1,000mg THC tincture with embossed leaf pattern and mandatory regulatory hazard mark. Compliance-aware design.",
    image: "/assets/product-design/product%20design_%2022.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "regulated"],
    industry: "thc",
  },
  {
    id: "pure-med-gummies",
    title: "Pure Med Extracts — CBD gummies",
    brand: "Pure Med Extracts",
    description:
      "350mg gummy jar pair. Clean label, food-safe layout, retail-shelf compliance.",
    image: "/assets/product-design/product%20design_%2023.png",
    services: ["branding", "print-design"],
    aspect: "wide",
    formats: ["packaging", "label"],
    industry: "cbd",
  },
  {
    id: "benchmark-prex10",
    title: "Benchmark — Pre-X10 Pineapple",
    brand: "Benchmark Nutrition",
    description:
      "Pre-workout tub label with bold yellow branding and diamond mark. Designed for big-box and gym retail.",
    image: "/assets/product-design/product%20design_%2024.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "supplements",
  },
  {
    id: "breath-rox-orange",
    title: "Breath Rox — orange variant duo",
    brand: "Breath Rox",
    description:
      "Two-size SKU shot for the orange flavor — travel mini and full vial. Citrus burst, sugar-free callout.",
    image: "/assets/product-design/product%20design_%2025.png",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "wellness",
  },
  {
    id: "vyotech-b4u",
    title: "Vyotech — B4U Train hero render",
    brand: "Vyotech Nutritionals",
    description:
      "Studio hero shot of the B4U Train pre-workout. Used for storefront, paid social, and Amazon A+ content.",
    image: "/assets/product-design/product%20design_%2026.png",
    services: ["branding", "ecommerce"],
    aspect: "wide",
    formats: ["packaging", "hero-render"],
    industry: "supplements",
  },
  {
    id: "hady-cruz-knockout",
    title: "Hady Cruz — Knock Out sleep aid",
    brand: "Hady Cruz",
    description:
      "Influencer-led supplement brand — gummy bottle with cloud + moon illustration, aimed at the sleep-aid category.",
    image: "/assets/product-design/product%20design_%2027.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "influencer"],
    industry: "supplements",
  },
  {
    id: "enuff-energy-trio",
    title: "Enuff Energy — flavor trio",
    brand: "Enuff Energy",
    description:
      "Three-flavor SKU lineup with a watercolor-paint backdrop system. Each SKU is its own mood.",
    image: "/assets/product-design/product%20design_%2029.png",
    services: ["branding", "print-design"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "supplements",
  },
  {
    id: "white-label-preworkout",
    title: "White-label Pre-Workout — template SKU",
    brand: "White-label",
    description:
      "Co-packer template SKU. The kind of base layout client brands skin and ship — without rebuilding the structure.",
    image: "/assets/product-design/product%20design_%2030.png",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["packaging", "template"],
    industry: "supplements",
  },
  {
    id: "electro-shock",
    title: "Electro Shock — character-art pre-workout",
    brand: "Electro Shock",
    description:
      "Bold character-illustration label. Built to stand out next to a wall of generic black-and-red tubs.",
    image: "/assets/product-design/product%20design_%2031.png",
    services: ["branding", "logo-design", "print-design", "social-media"],
    aspect: "wide",
    formats: ["packaging", "illustration", "logo"],
    industry: "supplements",
  },
  {
    id: "simply-mass-gainer",
    title: "Simply — mass gainer pouch",
    brand: "Simply Nutrition",
    description:
      "Stand-up pouch design for a 50g protein chocolate gainer. Kraft-inspired front panel with full nutrition compliance.",
    image: "/assets/product-design/product%20design_%2032.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "pouch"],
    industry: "supplements",
  },
  {
    id: "ultra-shred",
    title: "Ultra Shred — character-art capsules",
    brand: "Ultra Shred",
    description:
      "Illustrated rhino mark on a 90-cap thermogenic. Bottle label that reads as a comic-book hero on shelf.",
    image: "/assets/product-design/product%20design_%2033.png",
    services: ["branding", "logo-design", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label", "illustration"],
    industry: "supplements",
  },
  {
    id: "mighty-hype-fuel",
    title: "Mighty Hype Fuel — vanilla preworkout",
    brand: "Mighty",
    description:
      "Two-size SKU shot — small tub + large jug. Splatter art, vanilla flavor cue, gym-floor energy.",
    image: "/assets/product-design/product%20design_%2034.png",
    services: ["branding", "print-design"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "supplements",
  },
  {
    id: "slabachatti-candy",
    title: "Slabachatti — variety candy box",
    brand: "Slabachatti",
    description:
      "Mailer box plus four flow-wrap candy packets. Built for ecommerce unboxing and gift-set retail.",
    image: "/assets/product-design/product%20design_%2035.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "square",
    formats: ["packaging", "brand-family", "mailer"],
    industry: "candy",
  },
  {
    id: "365-creamers",
    title: "365 Whole Foods — coffee creamer line",
    brand: "365 Whole Foods Market",
    description:
      "Creamer pouch line with hand-illustrated splash art. Brand-architected for the 365 sub-brand system.",
    image: "/assets/product-design/product%20design_%2037.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "pouch", "private-label"],
    industry: "food",
  },
  {
    id: "365-functional-foods",
    title: "365 Whole Foods — functional foods range",
    brand: "365 Whole Foods Market",
    description:
      "Four-pouch functional food range — broth mix, frostings, hibiscus honey bread. Kid-friendly illustration system across SKUs.",
    image: "/assets/product-design/product%20design_%2038.png",
    services: ["branding", "print-design", "ecommerce"],
    aspect: "square",
    formats: ["packaging", "brand-family", "private-label"],
    industry: "food",
  },
  {
    id: "simply-aminos-lifestyle",
    title: "Simply Aminos — fruit punch lifestyle",
    brand: "Simply Nutrition",
    description:
      "Single-SKU lifestyle hero shot for the fruit punch flavor — gym backdrop, depth-of-field, label-forward.",
    image: "/assets/product-design/product%20design_%2039.png",
    services: ["social-media", "digital-marketing", "ecommerce"],
    aspect: "tall",
    formats: ["lifestyle", "hero-render"],
    industry: "supplements",
  },
  {
    id: "possema-daily-youth",
    title: "Possema — Daily Youth collagen",
    brand: "Possema",
    description:
      "Collagen + multivitamin powder tub with horsetail/turmeric branding. Skin/hair/nail wellness category.",
    image: "/assets/product-design/product%20design_%2040.png",
    services: ["branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "wellness",
  },

  // ════════════════════════════════════════════════════════════════════════
  // LOGO-DESIGN (logo-forward standalone projects)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "kids-life-solutions-logo",
    title: "Kids Life Solutions — logo system",
    brand: "Kids Life Solutions",
    description:
      "Lego-block letterforms for an ABA therapy + mental health practice. Playful, primary, instantly readable to a six-year-old.",
    image: "/assets/services/logo-design/KidsLifeSolutions_Logo%20and%20branding.png",
    services: ["logo-design", "branding"],
    aspect: "wide",
    formats: ["logo", "wordmark"],
    industry: "healthcare",
  },
  {
    id: "hospital2home-logo",
    title: "Hospital 2 Home — care guide",
    brand: "Hospital 2 Home",
    description:
      "Mark for a postpartum hospital-to-home transition guide. Soft pastels, mother-and-child silhouette, gentle wordmark.",
    image: "/assets/services/logo-design/Hospital2Home_Logo%20Design.png",
    services: ["logo-design", "branding"],
    aspect: "square",
    formats: ["logo"],
    industry: "healthcare",
  },
  {
    id: "miami-pavement-logo",
    title: "Miami Pavement Supply — circle mark",
    brand: "Miami Pavement Supply",
    description:
      "Black-and-yellow circular badge with a winding road forming the negative space. Industrial, distinct at any size.",
    image: "/assets/services/logo-design/MiamiPavementSupply-01.jpg",
    services: ["logo-design", "branding"],
    aspect: "square",
    formats: ["logo", "badge"],
    industry: "construction",
  },
  {
    id: "macefit-logo",
    title: "Macefit — centrifugal strength training",
    brand: "Macefit",
    description:
      "Athletic mark for a steel-mace strength training brand. Action silhouette + tricolor brand bar.",
    image: "/assets/services/logo-design/Macefit_Logo-100px.png",
    services: ["logo-design", "branding"],
    aspect: "square",
    formats: ["logo", "wordmark"],
    industry: "fitness",
  },

  // ════════════════════════════════════════════════════════════════════════
  // PRINT-SERVICES — flyers, brochures, business cards, mailers, books
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "scalehouse-cards",
    title: "ScaleHouse — sales business cards",
    brand: "ScaleHouse",
    description:
      "Bilingual sales-and-service business card for an industrial scale dealership. Bold purple, brand-mark hero, tactile card stock.",
    image: "/assets/services/branding-design/ScaleHouse_BusinessCards-01.jpg",
    services: ["print-design", "branding"],
    aspect: "wide",
    formats: ["business-card"],
    industry: "industrial",
  },
  {
    id: "xm-cigars-cards",
    title: "XM Cigar Co. — distribution business cards",
    brand: "XM Cigar Co.",
    description:
      "Dark, smoky business cards for a Miami cigar distributor — casinos, hotels, country clubs. Designed to feel like the product.",
    image: "/assets/services/print-services/XM%20Cigars%20Business%20Card-Outside.png",
    services: ["print-design", "branding"],
    aspect: "square",
    formats: ["business-card"],
    industry: "spirits-tobacco",
  },
  {
    id: "ans-brochure",
    title: "ANS Performance — recruitment brochure",
    brand: "ANS Performance",
    description:
      "Tri-fold HR recruitment brochure for a 25-year supplement manufacturer. Inside spread sells the perks; outside sells the brand.",
    image: "/assets/services/print-services/ANS_HR_Recruitment_Brochure_.png",
    services: ["print-design", "branding"],
    aspect: "wide",
    formats: ["brochure", "tri-fold"],
    industry: "supplements",
  },
  {
    id: "bloodstone-book",
    title: "BloodStone — book jacket design",
    brand: "J.S. Torres",
    description:
      "Cover and back-jacket design for a fantasy novel. Atmospheric tree silhouette, embossed mark, full layout for offset print.",
    image: "/assets/services/print-services/BloodStone_Book%20Jacket%20Design%20and%20Print.png",
    services: ["print-design", "branding"],
    aspect: "wide",
    formats: ["book-cover"],
    industry: "publishing",
  },
  {
    id: "gentlemencutz-flyer",
    title: "Gentlemen's Cutz — grand opening flyer",
    brand: "Gentlemen's Cutz",
    description:
      "4×6 grand-opening flyer for a Davie barbershop. Coupon, address, hours — all the heavy lifting of a print drop in one piece.",
    image:
      "/assets/services/print-services/GentlemanCutz_NewFlyer_4x6_Flyer%20Design%20and%20Print.jpg",
    services: ["print-design", "logo-design"],
    aspect: "tall",
    formats: ["flyer", "promo"],
    industry: "barber",
  },
  {
    id: "kls-flyer",
    title: "Kids Life Solutions — services flyer",
    brand: "Kids Life Solutions",
    description:
      "Vertical print flyer pairing the KLS lego-letter mark with painted-hand imagery. ABA therapy, Dade & Broward counties.",
    image: "/assets/services/print-services/Kids%20Life%20Solutions_Flyer_Design%20and%20Print.jpg",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["flyer"],
    industry: "healthcare",
  },
  {
    id: "mjb-cleaners-flyer",
    title: "MJB Cleaning Services — services flyer",
    brand: "MJB Cleaning Services Inc.",
    description:
      "Square-format service flyer covering carpet, pressure cleaning, and car wash. Free-estimate burst, illustrated tradesmen.",
    image: "/assets/services/print-services/MJB%20Cleaners_Flyer_.png",
    services: ["print-design", "social-media"],
    aspect: "square",
    formats: ["flyer"],
    industry: "service-business",
  },
  {
    id: "vpm-pools-flyer",
    title: "VPM Pools — services flyer",
    brand: "VPM Pools",
    description:
      "Bilingual residential + commercial pool service flyer with three-tier offer block. Bright, scannable, conversion-tuned.",
    image: "/assets/services/print-services/VPM_Flyer_Artboard%205%20copy%204.jpg",
    services: ["print-design", "digital-marketing"],
    aspect: "wide",
    formats: ["flyer", "promo"],
    industry: "service-business",
  },
  {
    id: "pruvit-mailer",
    title: "Pruvit — KETO//OS mailer",
    brand: "Pruvit",
    description:
      "Direct-mail flyer for the KETO//OS line — full lifestyle band, flavor lineup, referral code. Built to convert from inbox to purchase.",
    image: "/assets/services/print-services/Pruvit_MailerFlyer-01.jpg",
    services: ["print-design", "digital-marketing", "social-media"],
    aspect: "wide",
    formats: ["mailer", "flyer"],
    industry: "supplements",
  },
  {
    id: "babyshower-invite",
    title: "Riley Olivia — baby shower invitation",
    brand: "Custom",
    description:
      "Custom shower invitation set photographed in flat-lay. Wood-grain background, floral bouquet, kraft envelope liner.",
    image: "/assets/services/print-services/BabyshowerInvitation_Mockup.jpg",
    services: ["print-design"],
    aspect: "wide",
    formats: ["invitation", "stationery"],
    industry: "event",
  },
  {
    id: "musclehype-rage",
    title: "MuscleHype — Rage Pump trio",
    brand: "MuscleHype",
    description:
      "Three-flavor pre-workout label system. Color-coded by flavor with a unifying typographic mark.",
    image:
      "/assets/services/print-services/MuscleHype%20Mockups_-Rage%20Pump_Label%20Design.png",
    services: ["print-design", "branding"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "supplements",
  },
  {
    id: "heidy-cruz-whey",
    title: "Heidy Cruz — Lita Lifestyle whey iso",
    brand: "Lita Lifestyle by Heidy Cruz",
    description:
      "Influencer-led whey iso line — banana coconut SKU. Sage and cream palette, soft feminine athletic positioning.",
    image: "/assets/services/print-services/Heidy%20Cruz_WHEY%20ISO%20Banana%20Coconut.png",
    services: ["print-design", "branding"],
    aspect: "tall",
    formats: ["packaging", "label", "influencer"],
    industry: "supplements",
  },
  {
    id: "cbd-greenleaf",
    title: "Greenleaf — CBD product line",
    brand: "Greenleaf",
    description:
      "Three-SKU CBD tincture line — Stress, Energy, Rest. Functional color-coding with a unifying brand frame.",
    image: "/assets/services/print-services/CBD_Products_Label%20Design.png",
    services: ["branding", "print-design"],
    aspect: "wide",
    formats: ["packaging", "brand-family"],
    industry: "cbd",
  },
  {
    id: "miracle-eyes-print",
    title: "Miracle Eyes — eyelash serum label",
    brand: "Miracle Eyes",
    description:
      "Yellow-and-teal abstract zebra-art label, front-and-back layout. Print-ready production files for the bottling line.",
    image: "/assets/services/print-services/Miracle%20Eyes-Label%20Design.png",
    services: ["print-design", "branding"],
    aspect: "wide",
    formats: ["packaging", "label"],
    industry: "beauty",
  },
  {
    id: "possema-package-print",
    title: "Possema — Daily Youth pair",
    brand: "Possema",
    description:
      "Production-ready pair render for the Daily Youth collagen tub. Used on Amazon, Shopify, and the production deck.",
    image: "/assets/services/print-services/Possema_Package%20Design.png",
    services: ["print-design", "branding", "ecommerce"],
    aspect: "tall",
    formats: ["packaging", "label"],
    industry: "wellness",
  },

  // ════════════════════════════════════════════════════════════════════════
  // SOCIAL-MEDIA — campaign banners, IG-style posts, paid creative
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "ans-ad",
    title: "ANS Performance — capabilities ad",
    brand: "ANS Performance",
    description:
      "Print + paid hybrid ad — 250K sq. ft. of production, in-house design + print, 25-year anniversary medallion. Sells the manufacturer's pitch in one frame.",
    image: "/assets/services/social-media/ANS_Ad.png",
    services: ["social-media", "digital-marketing", "print-design"],
    aspect: "tall",
    formats: ["ad", "campaign"],
    industry: "supplements",
  },
  {
    id: "yanzopanzo-ugc",
    title: "Yanzo Panzo — Betancourt influencer post",
    brand: "Betancourt × @yanzopanzo",
    description:
      "Influencer-style UGC composition with Betancourt SKU stack. Used as paid Meta creative + organic IG.",
    image:
      "/assets/services/social-media/yanzopanzo_258884637_273956928014340_6980006602417148199_n.jpg",
    services: ["social-media", "digital-marketing"],
    aspect: "tall",
    formats: ["ugc", "social-creative"],
    industry: "supplements",
  },
  {
    id: "rita-carnitine",
    title: "Carnitine PLS Series — paid social",
    brand: "Betancourt",
    description:
      "Beach-set lifestyle ad for the Carnitine PLS Series. Designed for IG feed + Stories with mobile-first composition.",
    image: "/assets/services/social-media/Rita_Carnitine.jpg",
    services: ["social-media", "digital-marketing"],
    aspect: "wide",
    formats: ["ad", "lifestyle"],
    industry: "supplements",
  },
  {
    id: "josh-bnox-banner",
    title: "B-NOX — testosterone enhancer banner",
    brand: "Betancourt",
    description:
      "Cinematic outdoor banner for the B-NOX SKU. Designed for site hero + paid social, with the type-sealed conversion line.",
    image: "/assets/services/social-media/Josh_BNOX.png",
    services: ["social-media", "digital-marketing"],
    aspect: "wide",
    formats: ["banner", "lifestyle"],
    industry: "supplements",
  },
  {
    id: "facebook-cover-2nd-bike",
    title: "Emanuel Ibarry × 2ndBike — Facebook cover",
    brand: "Emanuel Ibarry × 2ndBike",
    description:
      "Facebook page cover image for a pro cyclist's apparel/sponsorship deal. Photo grid, contact rail, brand-color blocking.",
    image: "/assets/services/social-media/Facebook%20Cover_v2.png",
    services: ["social-media", "branding"],
    aspect: "wide",
    formats: ["social-cover"],
    industry: "athlete",
  },

  // ════════════════════════════════════════════════════════════════════════
  // WEB BANNERS — site headers, ecommerce hero strips
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "ezbeauty-banner",
    title: "EZ Beauty — site banner",
    brand: "EZ Beauty",
    description:
      "1900×300 ecommerce site banner introducing the new collection. Editorial photography, type-led layout.",
    image: "/assets/services/web-design/EZBeauty_Banner_1900x300.png",
    services: ["web-design", "ecommerce", "social-media"],
    aspect: "wide",
    formats: ["web-banner"],
    industry: "beauty",
  },
  {
    id: "goape-banner",
    title: "Go Ape — brand web banner",
    brand: "Go Ape",
    description:
      "Brand banner for a wellness/supplement line. Hand-drawn mark, intimate B&W photography, 'let go' call-to-action.",
    image: "/assets/services/web-design/GoAPE_Web%20Banner.png",
    services: ["web-design", "branding", "social-media"],
    aspect: "wide",
    formats: ["web-banner", "logo"],
    industry: "wellness",
  },
  {
    id: "testogenix-render",
    title: "Testogenix XL — bottle render",
    brand: "Testogenix",
    description:
      "Studio bottle render used as the hero asset across PDP, Amazon A+, and paid social.",
    image: "/assets/services/web-design/TestogenixBottle_2-Current%20View.png",
    services: ["ecommerce", "branding", "print-design"],
    aspect: "tall",
    formats: ["packaging", "hero-render"],
    industry: "supplements",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** All portfolio items tagged for a given service slug, in original order. */
export function getPortfolioByService(slug: ServiceSlug): PortfolioItem[] {
  return PORTFOLIO.filter((p) => p.services.includes(slug));
}

/**
 * Hand-picked hero carousel items per service — the 3–5 most visually
 * striking projects to rotate behind the headline. Falls back to whatever
 * the slug returns if not explicitly mapped.
 */
const HERO_SHOWCASE: Partial<Record<ServiceSlug, string[]>> = {
  "web-design": [
    "enigma-computers",
    "papas-kitchen",
    "sharp-edge",
    "muscleology",
    "pure-blanco",
  ],
  branding: [
    "betancourt-family",
    "pure-blanco",
    "luxury-life",
    "thrasher-beard-oil",
    "shield-labs-multi",
  ],
  ecommerce: [
    "planters-etc",
    "pure-blanco",
    "squeeze-me-skinny",
    "muscleology",
    "papas-kitchen",
  ],
  "print-design": [
    "bloodstone-book",
    "ans-brochure",
    "gentlemencutz-flyer",
    "xm-cigars-cards",
    "musclehype-rage",
  ],
  "logo-design": [
    "kids-life-solutions-logo",
    "hospital2home-logo",
    "miami-pavement-logo",
    "thrasher-beard-oil",
    "macefit-logo",
  ],
  "social-media": [
    "yanzopanzo-ugc",
    "josh-bnox-banner",
    "betancourt-intro",
    "swet-campaign",
    "rita-carnitine",
  ],
  "digital-marketing": [
    "pruvit-mailer",
    "ans-ad",
    "swet-campaign",
    "shield-labs-multi",
    "rita-carnitine",
  ],
  // AI Workflows is light on dedicated case studies, so the hero pulls
  // from automation-heavy projects in adjacent services — pipelines,
  // subscription systems, affiliate platforms, ecom automation.
  "ai-workflows": [
    "jay-scotts",
    "papas-kitchen",
    "squeeze-me-skinny",
    "planters-etc",
  ],
};

export interface HeroShowcaseItem {
  id: string;
  title: string;
  brand?: string;
  description: string;
  image: string;
  href?: string;
}

/**
 * Returns up to `limit` hero-worthy portfolio items for a service, in the
 * curated HERO_SHOWCASE order. Returns an empty array if the service has
 * no portfolio coverage — caller should fall back to the static hero image.
 */
export function getServiceHeroShowcase(
  slug: ServiceSlug,
  limit = 5,
): HeroShowcaseItem[] {
  const ids = HERO_SHOWCASE[slug];
  if (!ids || ids.length === 0) return [];
  const byId = new Map(PORTFOLIO.map((p) => [p.id, p]));
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is PortfolioItem => Boolean(p))
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      description: p.description,
      image: enc(p.image),
      href: p.href,
    }));
}

/**
 * Curated subset for a service gallery. Allows pinning specific IDs first
 * (the "marquee" pieces), then fills with the rest of the tag matches up
 * to `limit`.
 */
export function getServiceGalleryItems(
  slug: ServiceSlug,
  opts: { pinned?: string[]; limit?: number } = {},
): Gallery4Item[] {
  const { pinned = [], limit = 12 } = opts;
  const matches = getPortfolioByService(slug);
  const byId = new Map(matches.map((m) => [m.id, m]));
  const pinnedItems = pinned
    .map((id) => byId.get(id))
    .filter((p): p is PortfolioItem => Boolean(p));
  const pinnedIds = new Set(pinned);
  const rest = matches.filter((m) => !pinnedIds.has(m.id));
  const ordered = [...pinnedItems, ...rest].slice(0, limit);

  return ordered.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    href: p.href ?? SITE,
    image: enc(p.image),
  }));
}
