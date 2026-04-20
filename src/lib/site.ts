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

export const PHONE_DISPLAY = "(770) 744-2536";
export const PHONE_E164 = "+17707442536";
export const PHONE_HREF = "tel:+17707442536";
export const EMAIL = "brandingzombie@gmail.com";
export const CALENDLY_URL = "https://calendly.com/brandingzombie/15min";

export const CITY = "Cumming";
export const REGION = "GA";
export const POSTAL_CODE = "30041";
export const COUNTRY = "US";

export const LAT = 34.2073;
export const LON = -84.1401;

// Social profile URLs — populate when profiles are live. Empty array keeps
// schema.org sameAs honest (claiming profiles that don't exist triggers a
// Google verification 404 and hurts E-E-A-T).
export const SOCIAL_URLS: string[] = [];

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
