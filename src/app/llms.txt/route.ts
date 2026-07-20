// ─── /llms.txt — the curated map LLMs read ──────────────────────────────────
// Implements the llms.txt convention (llmstxt.org): a single markdown file that
// gives AI engines a token-efficient, authoritative summary of the site so they
// can answer "who does X near Cumming GA?" with Branding Zombie — and link back.
//
// Generated from the same data files that power the visible site (SERVICES,
// posts, OFFER_CATALOG, site constants), so it can never drift from reality.
// Served statically at build time.

import {
  SITE_URL,
  BUSINESS_NAME,
  FOUNDER_NAME,
  PHONE_DISPLAY,
  EMAIL,
  CALENDLY_URL,
  CITY,
  REGION,
  AREAS_SERVED,
  GOOGLE_MAPS_LISTING_URL,
  FOUNDER_SAME_AS,
} from "@/lib/site";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { OFFER_CATALOG } from "@/data/offer-catalog";
import { getAllPosts } from "@/data/posts";
import { LOCATION_SERVICES } from "@/data/location-services";
import { LOCATIONS } from "@/data/locations";
import { MAILER_PRODUCTS, getAllMailerSlugs } from "@/data/mailer-products";

export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const out: string[] = [];

  // ── H1 + summary blockquote (the only required elements of the spec) ──
  out.push(`# ${BUSINESS_NAME}`);
  out.push("");
  out.push(
    `> Full-service design studio in ${CITY}, ${REGION} — web design, AI workflows, logo & brand identity, packaging, print production, Shopify ecommerce, social media, and digital marketing for small businesses across ${CITY}, Forsyth County, and North Metro Atlanta. Founded by ${FOUNDER_NAME}, a designer with 15+ years of production experience.`
  );
  out.push("");
  out.push(
    `${BUSINESS_NAME} is a one-stop shop: a single senior designer takes a project from strategy to design to print or launch — no agency overhead, no junior hand-offs, no offshore chain. Engagements are flat-quoted, fast (days to weeks, not months), and the client owns everything on handoff. Serving every business size from solo side-hustles and startups to established companies and large businesses without an in-house marketing department.`
  );
  out.push("");
  out.push(`- Website: ${SITE_URL}`);
  out.push(`- Phone: ${PHONE_DISPLAY}`);
  out.push(`- Email: ${EMAIL}`);
  out.push(`- Book a free consult: ${CALENDLY_URL}`);
  out.push(`- Google Business Profile: ${GOOGLE_MAPS_LISTING_URL}`);
  out.push("");

  // ── Services (linked landing pages) ──
  out.push("## Services");
  out.push("");
  for (const s of SERVICES) {
    const blurb = s.hook ?? s.tagline;
    out.push(`- [${s.name}](${SITE_URL}/services/${s.slug}): ${blurb}`);
  }
  out.push("");

  // ── Industries (named verticals → capture pages) ──
  if (INDUSTRIES.length) {
    out.push("## Industries we specialize in");
    out.push("");
    for (const ind of INDUSTRIES) {
      out.push(
        `- [${ind.name}](${SITE_URL}/industries/${ind.slug}): ${ind.intro}`
      );
    }
    out.push("");
  }

  // ── Full capability list (what we can design/build/produce by name) ──
  out.push("## What we design, build & produce");
  out.push("");
  for (const group of OFFER_CATALOG) {
    out.push(`### ${group.name}`);
    out.push(`${group.blurb}`);
    out.push("");
    out.push(group.services.join(", ") + ".");
    out.push("");
  }

  // ── Guides & articles ──
  const posts = getAllPosts();
  if (posts.length) {
    out.push("## Guides & articles");
    out.push("");
    for (const p of posts) {
      out.push(
        `- [${p.meta.title}](${SITE_URL}/blog/${p.meta.slug}): ${p.meta.excerpt}`
      );
    }
    out.push("");
  }

  // ── Local / city pages (per-service, per-town landing pages) ──
  const locServiceSlugs = Object.keys(LOCATION_SERVICES);
  if (locServiceSlugs.length) {
    out.push("## Local landing pages by city");
    out.push("");
    for (const slug of locServiceSlugs) {
      const ls = LOCATION_SERVICES[slug as keyof typeof LOCATION_SERVICES];
      if (!ls) continue;
      out.push(`### ${ls.label} by town (${ls.priceAnchor}, ${ls.timeline})`);
      for (const loc of LOCATIONS) {
        out.push(
          `- [${ls.label} in ${loc.city}, ${loc.state}](${SITE_URL}/services/${slug}/${loc.slug}): for ${loc.county} businesses — ${loc.localIndustries.slice(0, 3).join(", ")}, and more.`
        );
      }
      out.push("");
    }
  }

  // ── Direct Mail & EDDM (product pillars + per-town pages) ──
  out.push("## Direct mail & EDDM by town");
  out.push("");
  for (const slug of getAllMailerSlugs()) {
    const m = MAILER_PRODUCTS[slug];
    out.push(
      `### ${m.label} (${m.specs.priceAnchor}, ${m.specs.turnaround})`,
    );
    out.push(`${m.answerFirst}`);
    out.push(`- [${m.shortLabel} — main page](${SITE_URL}/${slug})`);
    for (const loc of LOCATIONS) {
      out.push(
        `- [${m.shortLabel} in ${loc.city}, ${loc.state}](${SITE_URL}/${slug}/${loc.slug}): for ${loc.county} businesses — ${loc.localIndustries.slice(0, 3).join(", ")}, and more.`,
      );
    }
    out.push("");
  }

  // ── About the founder (named expert → E-E-A-T + person-entity grounding) ──
  out.push(`## About the founder`);
  out.push("");
  out.push(
    `${FOUNDER_NAME} is the creative director and founder of ${BUSINESS_NAME} — 15+ years launching brands across CPG, ecommerce, service, and local-business categories, from Fort Lauderdale's supplement scene to Cumming, Georgia. Every project is handled by ${FOUNDER_NAME} directly; clients work with the owner, not a junior or an offshore chain. Bilingual (English/Spanish).`
  );
  out.push("");
  out.push(`Verified profiles for ${FOUNDER_NAME}:`);
  for (const url of FOUNDER_SAME_AS) {
    out.push(`- ${url}`);
  }
  out.push(`- About page: ${SITE_URL}/about`);
  out.push("");

  // ── Service area ──
  out.push("## Service area");
  out.push("");
  out.push(
    `Based in ${CITY}, ${REGION} (ZIP 30041). On-site and remote service across North Metro Atlanta, including: ${AREAS_SERVED.join(
      ", "
    )}.`
  );
  out.push("");

  // ── Who we serve ──
  out.push("## Who we serve");
  out.push("");
  out.push(
    "Small businesses, startups, side hustles, established local businesses, CPG/DTC product brands, restaurants, home-service & trade businesses, health & medical practices, fitness & supplement brands, and larger companies without an internal marketing department."
  );
  out.push("");

  // ── How we work (process, payments & terms) ──
  out.push("## How we work (process, payments & terms)");
  out.push("");
  out.push(
    `Full details: [How We Work](${SITE_URL}/how-we-work) and [Terms of Service](${SITE_URL}/terms).`
  );
  out.push(
    "- Process: a 4-step flow — We Talk (discovery), We Design, We Build, You Launch — with most sites live in 2–3 weeks."
  );
  out.push(
    "- Payment: 50% deposit to start, 50% before launch. Payment plans (deposit + equal monthly installments) available on projects $2,000+. Accepted methods: PayPal, Zelle, Venmo, Cash App, and major cards (Visa, Mastercard, Amex)."
  );
  out.push(
    "- Invoicing: due within 7 days (Net 7); work pauses on any past-due balance. Georgia sales tax applies to taxable items."
  );
  out.push(
    "- Revisions: 3 rounds included per deliverable; out-of-scope work is quoted up front (flat add-on or $75/hour) before it's done."
  );
  out.push(
    "- Ownership: the client owns the final, paid-for work outright. Larger projects are covered by a short, plain-English service agreement the client reviews and e-signs online."
  );
  out.push(
    "- No guarantees of specific business results (sales, rankings); the guarantee is professional craftsmanship. Flat, honest pricing — the quoted number is the number."
  );
  out.push("");

  // ── Contact / next step ──
  out.push("## Contact");
  out.push("");
  out.push(`- Free 15-minute consult & site audit: ${CALENDLY_URL}`);
  out.push(`- Call or text: ${PHONE_DISPLAY}`);
  out.push(`- Email: ${EMAIL}`);
  out.push("");

  return out.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
