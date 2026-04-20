// ─── Site-wide constants ────────────────────────────────────────────────────
// Single source of truth for SEO, metadata, and Schema.org @id references.
// Keep in sync with src/app/layout.tsx — any change here should be reflected
// there (or imported from here).

export const SITE_URL = "https://brandingzombiedesigns.com";

// Schema.org @id references for graph linking across pages.
export const ORG_ID = `${SITE_URL}/#organization`;
export const LOCALBIZ_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PHONE_DISPLAY = "(770) 744-2536";
export const PHONE_E164 = "+17707442536";
export const PHONE_HREF = "tel:+17707442536";
export const EMAIL = "brandingzombie@gmail.com";
export const CALENDLY_URL = "https://calendly.com/brandingzombie/free-audit";

export const LAT = 34.2073;
export const LON = -84.1401;

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
