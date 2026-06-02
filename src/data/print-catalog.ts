// ─── Print product catalog — single source of truth ─────────────────────
// Drives the PrintCatalog explorer on /services/print-design. Each entry is
// a real print product Branding Zombie can design and produce in-house, so
// customers don't bounce between a designer, a printer, and a sign shop.
//
// Voice rules (per design system v1.0.0):
//   - Short. Shorter. Specific numbers beat adjectives.
//   - One joke per piece. No agency slop.
//   - Use words like "in-house", "no hand-offs", "Forsyth County", "the work".
//   - Tone rotates: CHEEKY · BLUNT · LOCAL · EDUCATIONAL · URGENT.

export type PrintCategorySlug = "marketing" | "large-format" | "trade-show";

export interface PrintCategory {
  slug: PrintCategorySlug;
  name: string;
  label: string;
  summary: string;
}

export interface PrintProduct {
  slug: string;
  name: string;
  category: PrintCategorySlug;
  /** One-sentence what-it-is, written in the brand voice. */
  blurb: string;
  /** Short option chips — finishes, sizes, stocks. Keep to 3–5 per card. */
  options: string[];
  /** Starting price, used as a quick scannable signal. */
  startingPrice: string;
  /** Turnaround in business days. */
  turnaround: string;
  image: string;
  imageAlt: string;
}

export interface PrintBundle {
  slug: string;
  title: string;
  audience: string;
  items: string[];
  allInPrice: string;
  timeline: string;
}

// Comparison row for the "one shop vs. designer + print shop" table.
export interface PrintComparisonRow {
  topic: string;
  oneShop: string;
  twoShops: string;
}

export const PRINT_CATEGORIES: PrintCategory[] = [
  {
    slug: "marketing",
    name: "Marketing Products",
    label: "Marketing",
    summary:
      "The collateral every business needs in a drawer or on a counter — designed and printed in-house so the brand stays consistent across every piece.",
  },
  {
    slug: "large-format",
    name: "Large Format & Banners",
    label: "Large Format",
    summary:
      "Banners, retractable stands, posters, and outdoor signage built to survive Georgia weather and read clearly from across a parking lot.",
  },
  {
    slug: "trade-show",
    name: "Trade Show & Events",
    label: "Trade Show",
    summary:
      "Booth-ready kits — tablecloths, flags, frames, and handouts that make a 10×10 footprint look like a brand twice its size.",
  },
];

const BASE = "/assets/services/print-services/catalog";

// Sorted within each category by likely demand — most-asked-for first so
// the user sees the high-intent products without scrolling. Mitigates the
// decision-fatigue of a 23-card grid.
export const PRINT_PRODUCTS: PrintProduct[] = [
  // ─── MARKETING PRODUCTS ────────────────────────────────────────────────
  {
    slug: "business-cards",
    name: "Business Cards",
    category: "marketing",
    blurb:
      "First impression in a 2×3.5-inch package. Real stocks, real finishes, never the Vistaprint default.",
    options: ["Matte", "Soft-touch", "Spot UV", "Foil", "Painted edges"],
    startingPrice: "from $75",
    turnaround: "3–5 days",
    image: `${BASE}/business-cards.png`,
    imageAlt:
      "Stack of branded business cards with foil and soft-touch finish",
  },
  {
    slug: "flyers-sales-sheets",
    name: "Flyers & Sales Sheets",
    category: "marketing",
    blurb:
      "One-page handouts for menus, promos, open houses, and rack displays. Designed to be picked up and kept.",
    options: ["4×6", "5×7", "8.5×11", "Gloss", "Matte"],
    startingPrice: "from $95",
    turnaround: "3–5 days",
    image: `${BASE}/flyer-sales-sheet.png`,
    imageAlt: "Designed promotional flyer with bold headline and product photo",
  },
  {
    slug: "brochures",
    name: "Brochures & Trifolds",
    category: "marketing",
    blurb:
      "Bi-fold and tri-fold sales pieces that walk a customer through your offer without a rep in the room.",
    options: ["Bi-fold", "Tri-fold", "Z-fold", "Gate-fold", "Gloss or matte"],
    startingPrice: "from $180",
    turnaround: "5–7 days",
    image: `${BASE}/trifold-brochure.png`,
    imageAlt: "Open tri-fold brochure with editorial layout and product imagery",
  },
  {
    slug: "postcards-mailers",
    name: "Postcards & Direct Mail",
    category: "marketing",
    blurb:
      "EDDM-ready postcards and mailers. We design, print, and hand off bundled and sorted for the post office if you want.",
    options: ["EDDM 6.5×9", "4×6", "5×7", "Two-sided gloss"],
    startingPrice: "from $135",
    turnaround: "5–7 days",
    image: "/assets/services/print-services/Pruvit_MailerFlyer-01.jpg",
    imageAlt: "Direct-mail postcard mockup with bold promotional design",
  },
  {
    slug: "door-hangers",
    name: "Door Hangers",
    category: "marketing",
    blurb:
      "Neighborhood-canvass standard. Heavy 14pt stock, perforated tear-off coupons available.",
    options: ["4.25×11", "14pt gloss", "Perforated coupon", "Two-sided"],
    startingPrice: "from $110",
    turnaround: "3–5 days",
    image: `${BASE}/door-hanger.png`,
    imageAlt: "Door hanger marketing piece with bold call to action",
  },
  {
    slug: "letterhead-envelopes",
    name: "Letterhead & Envelopes",
    category: "marketing",
    blurb:
      "Stationery that holds the brand together — letterhead, #10 envelopes, notepads, and thank-you cards designed as a set.",
    options: ["#10 envelopes", "A2 cards", "Notepads", "Embossed crest"],
    startingPrice: "from $140",
    turnaround: "5–7 days",
    image: `${BASE}/letterhead-envelopes.png`,
    imageAlt: "Coordinated letterhead and envelope set with a unified logo system",
  },
  {
    slug: "presentation-folders",
    name: "Presentation Folders",
    category: "marketing",
    blurb:
      "9×12 folders for proposals, onboarding kits, and listing packets. Two-pocket, business-card slits, the whole thing.",
    options: ["Two-pocket", "Card slits", "Foil", "Embossed"],
    startingPrice: "from $220",
    turnaround: "7–10 days",
    image: `${BASE}/presentation-folder.png`,
    imageAlt: "Custom branded presentation folder open to reveal printed inserts",
  },
  {
    slug: "business-magnets",
    name: "Business Magnets",
    category: "marketing",
    blurb:
      "Refrigerator real estate. The cheapest, longest-running ad you'll ever buy — and people actually keep them.",
    options: ["Round corner", "Square", "Die-cut shape", "30 mil"],
    startingPrice: "from $90",
    turnaround: "5–7 days",
    image: `${BASE}/business-magnet.png`,
    imageAlt: "Branded refrigerator business magnet with contact information",
  },

  // ─── LARGE FORMAT ──────────────────────────────────────────────────────
  {
    slug: "retractable-banners",
    name: "Retractable Banners",
    category: "large-format",
    blurb:
      "Trade-show and lobby standard. Pulls out of a base in 10 seconds, packs back into a carry bag.",
    options: ["33×80", "47×80", "Premium base", "Carry case included"],
    startingPrice: "from $185",
    turnaround: "5–7 days",
    image: `${BASE}/retractable-banner.png`,
    imageAlt: "Retractable banner stand with branded vertical graphic",
  },
  {
    slug: "outdoor-banners",
    name: "Outdoor Banners",
    category: "large-format",
    blurb:
      "13oz vinyl built for Georgia summers and Georgia thunderstorms. Reinforced hems, grommets, UV-stable inks.",
    options: ["13oz vinyl", "Reinforced hems", "Grommets", "Custom size"],
    startingPrice: "from $165",
    turnaround: "5–7 days",
    image: `${BASE}/outdoor-banner.png`,
    imageAlt: "Outdoor vinyl banner mounted on a building exterior",
  },
  {
    slug: "indoor-banners",
    name: "Indoor Banners",
    category: "large-format",
    blurb:
      "Lightweight fabric or vinyl for in-store promos, event backdrops, and wall graphics that won't curl or fade.",
    options: ["Vinyl", "Fabric", "Grommets", "Pole pockets"],
    startingPrice: "from $145",
    turnaround: "5–7 days",
    image: `${BASE}/indoor-banner.png`,
    imageAlt: "Indoor printed banner installed inside a retail space",
  },
  {
    slug: "mesh-banners",
    name: "Mesh Banners",
    category: "large-format",
    blurb:
      "Perforated vinyl for fence wraps and high-wind installs — wind passes through so the banner stays put.",
    options: ["Fence-grade mesh", "Reinforced edges", "Grommeted", "Custom size"],
    startingPrice: "from $195",
    turnaround: "5–7 days",
    image: `${BASE}/mesh-banner.png`,
    imageAlt: "Perforated mesh banner attached to a chain-link fence",
  },
  {
    slug: "holiday-banners",
    name: "Holiday & Pole Banners",
    category: "large-format",
    blurb:
      "Seasonal banners for storefronts, downtown light poles, and shopping centers — designed in sets so a whole street looks coordinated.",
    options: ["Seasonal sets", "Pole pockets", "Double-sided", "Custom size"],
    startingPrice: "from $220",
    turnaround: "7–10 days",
    image: `${BASE}/holiday-banner.png`,
    imageAlt: "Seasonal holiday banner mounted on a street light pole",
  },
  {
    slug: "banner-stands",
    name: "Banner Stands & Frames",
    category: "large-format",
    blurb:
      "Hardware-only kits for stores that swap graphics seasonally — buy the stand once, print new graphics each campaign.",
    options: ["Pull-up", "X-frame", "L-frame", "Outdoor weighted"],
    startingPrice: "from $135",
    turnaround: "5–7 days",
    image: `${BASE}/banner-stand.png`,
    imageAlt: "Free-standing banner stand kit with swappable printed graphic",
  },
  {
    slug: "posters-outdoor-displays",
    name: "Posters & Outdoor Displays",
    category: "large-format",
    blurb:
      "Movie-poster sized prints and ground-anchored event displays. Festival signage, sponsor walls, pop-up retail.",
    options: ["18×24", "24×36", "27×40", "Outdoor-rated"],
    startingPrice: "from $95",
    turnaround: "5–7 days",
    image: `${BASE}/outdoor-display.png`,
    imageAlt: "Large outdoor event display installed at a venue entrance",
  },

  // ─── TRADE SHOW & EVENTS ───────────────────────────────────────────────
  {
    slug: "custom-tablecloths",
    name: "Custom Tablecloths",
    category: "trade-show",
    blurb:
      "Full-color printed throws for 6-ft and 8-ft folding tables. Stretch-fit or open-back, machine washable.",
    options: ["6-ft", "8-ft", "Stretch-fit", "Open-back", "Full color"],
    startingPrice: "from $245",
    turnaround: "7–10 days",
    image: `${BASE}/custom-tablecloth.png`,
    imageAlt: "Trade show table covered with a custom-printed branded tablecloth",
  },
  {
    slug: "feather-flags",
    name: "Feather Flags",
    category: "trade-show",
    blurb:
      "9-ft and 15-ft sail flags that catch the eye from the parking lot. Spike base for grass, cross base for asphalt.",
    options: ["9 ft", "15 ft", "Single or double-sided", "Spike or cross base"],
    startingPrice: "from $175",
    turnaround: "7–10 days",
    image: `${BASE}/feather-flag.png`,
    imageAlt: "Tall feather flag with custom printed graphic outside a venue",
  },
  {
    slug: "teardrop-flags",
    name: "Teardrop Flags",
    category: "trade-show",
    blurb:
      "Tighter teardrop silhouette — same tall format as feather flags but a cleaner read for short headlines and logos.",
    options: ["9 ft", "12 ft", "15 ft", "Outdoor-rated"],
    startingPrice: "from $175",
    turnaround: "7–10 days",
    image: `${BASE}/teardrop-flag.png`,
    imageAlt: "Branded teardrop flag staked outside an event entrance",
  },
  {
    slug: "trade-show-booths",
    name: "Trade Show Booths",
    category: "trade-show",
    blurb:
      "Modular 10×10 and 10×20 booth kits — backdrops, monitor mounts, lit headers, and counters designed as one system.",
    options: ["10×10", "10×20", "Backlit header", "Counter included"],
    startingPrice: "from $1,450",
    turnaround: "14–21 days",
    image: `${BASE}/trade-show-booth.png`,
    imageAlt: "Modular trade show booth with branded backdrop and counter",
  },
  {
    slug: "pop-up-displays",
    name: "Pop-Up Displays & Floor Graphics",
    category: "trade-show",
    blurb:
      "Curved pop-up walls, floor decals, and printed flooring tiles that turn an empty booth into an environment.",
    options: ["Curved pop-up", "Floor decals", "Carpet tiles", "Carry case"],
    startingPrice: "from $945",
    turnaround: "10–14 days",
    image: `${BASE}/pop-up-display.png`,
    imageAlt: "Pop-up trade show display with floor graphics and branded backdrop",
  },
  {
    slug: "seg-display-frames",
    name: "SEG Display Frames",
    category: "trade-show",
    blurb:
      "Silicone-edge graphic frames — gallery-grade printed fabric tensioned into an aluminum frame. Backlit options for retail-grade installs.",
    options: ["Wall mount", "Free-standing", "Backlit", "Modular"],
    startingPrice: "from $385",
    turnaround: "10–14 days",
    image: `${BASE}/seg-display-frame.png`,
    imageAlt: "Silicone-edge graphic display frame with seamless fabric print",
  },
  {
    slug: "trade-show-handouts",
    name: "Trade Show Handouts",
    category: "trade-show",
    blurb:
      "Branded handout kits — flyers, postcards, business cards, and rack cards bundled and ready for the booth.",
    options: ["Bundled kits", "Rack cards", "Sample packs", "Branded sleeves"],
    startingPrice: "from $180",
    turnaround: "5–7 days",
    image: `${BASE}/trade-show-handouts.png`,
    imageAlt: "Stack of branded trade show handout collateral on a counter",
  },
  {
    slug: "promo-giveaways",
    name: "Promo Giveaways",
    category: "trade-show",
    blurb:
      "Pens, totes, koozies, drinkware, tech accessories — the kind of thing people actually keep. Low minimums, full-color decoration.",
    options: ["Drinkware", "Totes", "Tech accessories", "Apparel add-ons"],
    startingPrice: "from $215",
    turnaround: "10–14 days",
    image: `${BASE}/promo-giveaway.png`,
    imageAlt: "Branded promotional giveaway items laid out for a trade show booth",
  },
];

// "One Shop vs. Designer + Print Shop" comparison table.
// Sits above the catalog grid. Comparison content captures ~33% of AI
// citations (Princeton GEO research), so this also pulls double-duty as
// the AEO/GEO hook on the page.
export const PRINT_COMPARISON: PrintComparisonRow[] = [
  {
    topic: "Who you call",
    oneShop: "One studio. One project manager. One invoice.",
    twoShops: "Designer + print rep + sometimes an installer. Three threads.",
  },
  {
    topic: "Print-ready files",
    oneShop: "We design to the press specs. Files run clean the first time.",
    twoShops: "Designer hands off, printer rejects, you ferry edits back and forth.",
  },
  {
    topic: "Pricing",
    oneShop: "Wholesale pricing passed through. One quote covers both halves.",
    twoShops: "Retail markup on the design AND the printing.",
  },
  {
    topic: "Turnaround",
    oneShop: "Most jobs ship in 3–10 days. Rush options on most items.",
    twoShops: "Each handoff adds a queue. Two weeks becomes four.",
  },
];

// Real-world sample bundles. Cuts the decision-fatigue of a 23-card menu
// by making "what should I order?" feel concrete. Prices and timelines are
// rough averages — actual quote varies by spec.
export const PRINT_BUNDLES: PrintBundle[] = [
  {
    slug: "barbershop-kit",
    title: "Cumming barbershop starter kit",
    audience: "New shop or relocation — everything for the first 6 months.",
    items: [
      "500 business cards (soft-touch)",
      "1 retractable banner (33×80)",
      "100 door hangers (perforated coupon)",
    ],
    allInPrice: "$620 all-in",
    timeline: "7 days",
  },
  {
    slug: "food-truck-kit",
    title: "Forsyth County food-truck event kit",
    audience: "Festival, farmers market, or pop-up.",
    items: [
      "Custom tablecloth (6-ft, stretch-fit)",
      "Teardrop flag (12 ft)",
      "250 menu flyers (4×6, two-sided)",
    ],
    allInPrice: "$815 all-in",
    timeline: "10 days",
  },
  {
    slug: "trade-show-starter",
    title: "Trade-show starter (10×10 booth)",
    audience: "First-time booth or brand refresh on the road.",
    items: [
      "Pop-up display backdrop",
      "6-ft printed tablecloth",
      "500 rack-card handouts",
    ],
    allInPrice: "$1,940 all-in",
    timeline: "14 days",
  },
];

export function getProductsByCategory(
  slug: PrintCategorySlug,
): PrintProduct[] {
  return PRINT_PRODUCTS.filter((p) => p.category === slug);
}

export const PRINT_PRODUCT_COUNT = PRINT_PRODUCTS.length;
