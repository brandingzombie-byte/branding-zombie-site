// ─── Site-wide constants ────────────────────────────────────────────────────
// Single source of truth for SEO, metadata, and Schema.org @id references.
// layout.tsx, lib files, and components all import from here — do not
// redefine these anywhere else.

export const SITE_URL = "https://brandingzombiedesigns.com";
export const BUSINESS_NAME = "Branding Zombie Designs";
export const FOUNDER_NAME = "Gerry Betancourt";

// Schema.org @id references for graph linking across pages.
export const ORG_ID = `${SITE_URL}/#organization`;
export const LOCALBIZ_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// ─── Founder identity (single Person entity, referenced everywhere) ─────────
// One canonical @id for Gerry across the whole site. Previously two competing
// ids existed (#gerry and #gerry-betancourt) which fragmented his entity in
// Google's Knowledge Graph and in the LLM indexes that ground on it. Every
// page now links to FOUNDER_ID so the founder resolves to ONE node carrying
// his photo, bio, expertise, and authoritative sameAs profiles.
export const FOUNDER_ID = `${SITE_URL}/#gerry`;
export const FOUNDER_JOB_TITLE = "Creative Director & Brand Strategist";
export const FOUNDER_IMAGE = `${SITE_URL}/assets/gerry-headshot.png`;
export const FOUNDER_DESCRIPTION =
  "Creative director and brand strategist with 15+ years launching brands across CPG, ecommerce, service, and local-business categories — from Fort Lauderdale's supplement scene to Cumming, Georgia's Main Street. Founder of Branding Zombie Designs. Bilingual (English/Spanish).";
export const FOUNDER_KNOWS_ABOUT = [
  "Brand identity design",
  "Logo design",
  "Packaging design",
  "CPG supplement label design",
  "FDA-compliant labeling",
  "Shopify ecommerce",
  "Web design",
  "AI workflow integration",
  "Product photography",
  "Digital marketing",
  "Small business branding",
];
// Authoritative third-party profiles that prove this Person is unambiguously
// Gerry. These are the single biggest E-E-A-T signal after the bio itself —
// AI engines (Gemini, Copilot, ChatGPT) ground person-entity claims on them.
export const FOUNDER_SAME_AS = [
  "https://www.linkedin.com/in/gerardo-betancourt-80592b83/",
  "https://brandingzombie.gumroad.com/",
  "https://www.instagram.com/the_spacecadet_",
];

export const PHONE_DISPLAY = "(770) 744-2536";
export const PHONE_E164 = "+17707442536";
export const PHONE_HREF = "tel:+17707442536";
export const EMAIL = "hello@brandingzombiedesigns.com";
export const CALENDLY_URL = "https://calendly.com/brandingzombie/15min";

// Google Analytics 4 measurement ID. Public by design (visible in browser
// network tab) — safe to commit. Update here, propagates everywhere.
export const GA_MEASUREMENT_ID = "G-07JZLLX2JT";

// Microsoft Clarity project ID (heatmaps + session replay). Public by design.
// Create a project at https://clarity.microsoft.com, paste the ID here, and it
// activates on the next deploy. Leave empty to render no Clarity script.
export const CLARITY_PROJECT_ID = "x7ig4qdtj3";

export const CITY = "Cumming";
export const REGION = "GA";
export const POSTAL_CODE = "30041";
export const COUNTRY = "US";

export const LAT = 34.2073;
export const LON = -84.1401;

// Google Place ID for the live Google Business Profile listing. Source: the
// Maps URL embedded in src/data/reviews.ts (GOOGLE_REVIEWS_URL).
export const GOOGLE_PLACE_ID = "ChIJtz05efo8zwwRgsxGksnsJ94";
export const GOOGLE_MAPS_LISTING_URL = `https://www.google.com/maps/search/?api=1&query=Branding+Zombie+Designs&query_place_id=${GOOGLE_PLACE_ID}`;

// Social + authoritative-reference URLs for schema.org `sameAs`. These are the
// "this entity is unambiguously us" links AI engines (Gemini, Copilot) ground
// on, and the single biggest entity signal after the LocalBusiness block.
// Only list LIVE profiles — a sameAs that 404s hurts E-E-A-T.
// TODO: add the Google Business Profile dashboard URL + any YouTube/TikTok when live.
export const SOCIAL_URLS: string[] = [
  "https://www.instagram.com/brandingzombiedesigns/",
  "https://www.facebook.com/profile.php?id=61590541448873",
  "https://www.linkedin.com/company/branding-zombie-designs",
  GOOGLE_MAPS_LISTING_URL,
];

// ─── Service area — every town we want to show up for ─────────────────────
export const AREAS_SERVED = [
  "Cumming",
  "Forsyth County",
  "Alpharetta",
  "Johns Creek",
  "Milton",
  "Roswell",
  "Woodstock",
  "Canton",
  "Marietta",
  "Dawsonville",
  "Buford",
  "Suwanee",
  "Sugar Hill",
  "Duluth",
  "Lawrenceville",
  "Gainesville",
  "Flowery Branch",
  "Oakwood",
  "Braselton",
  "Jefferson",
  "Hoschton",
  "Ball Ground",
  "Holly Springs",
  "Kennesaw",
  "Acworth",
  "Norcross",
  "Peachtree Corners",
  "Sandy Springs",
  "Dunwoody",
  "Atlanta",
] as const;

export const NORTH_GA_COUNTIES = [
  "Forsyth County",
  "Fulton County",
  "Cherokee County",
  "Hall County",
  "Gwinnett County",
  "Cobb County",
  "Dawson County",
  "Jackson County",
] as const;

// Short list used on visible UI (not schema) — keeps copy concise.
export const PRIMARY_AREAS = [
  "Cumming",
  "Forsyth County",
  "Alpharetta",
  "Johns Creek",
  "Roswell",
  "Woodstock",
  "North Metro Atlanta",
] as const;
