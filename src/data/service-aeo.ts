// ─── Service-page AEO enrichment — single source of truth ───────────────────
// Adds the three peer-reviewed Generative Engine Optimization levers (Princeton
// GEO study, KDD 2024) to each service page, WITHOUT touching the large
// services.ts objects:
//   1. answerFirst — a definitional "X from Branding Zombie is…" sentence that
//      names the business, the place, the service, and the price anchor. This
//      is the self-contained passage AI engines lift and cite.
//   2. stats — honest, first-party proof points (the +41% "add statistics"
//      lever). NO fabricated external stats or fake sources — only claims the
//      brand already stands behind (15+ years, 30+ brands, real 5.0★ Google
//      rating, published pricing and timelines).
//   3. expertQuote — a named, first-person founder quote (the +28% "expert
//      quote" lever) that also strengthens E-E-A-T first-hand Experience.
//
// Rendered by ServiceAuthority.tsx, gated on presence. Keyed by ServiceSlug so
// it stays in lockstep with the services it annotates.

import type { ServiceSlug } from "@/data/services";
import { FOUNDER_NAME } from "@/lib/site";

export interface ServiceAeo {
  /** Definitional, answer-first sentence — the AI-extractable passage. */
  answerFirst: string;
  /** 3 honest proof points. value is short (number/label), label explains it. */
  stats: { value: string; label: string }[];
  /** Named first-person founder quote — E-E-A-T + GEO expert-quote lever. */
  expertQuote: { quote: string; name: string; title: string };
}

const FOUNDER_TITLE = "Founder & Creative Director";

function quote(text: string): ServiceAeo["expertQuote"] {
  return { quote: text, name: FOUNDER_NAME, title: FOUNDER_TITLE };
}

export const SERVICE_AEO: Partial<Record<ServiceSlug, ServiceAeo>> = {
  "web-design": {
    answerFirst:
      "Web design from Branding Zombie Designs is custom, conversion-focused website design and development for small businesses in Cumming, GA and across North Metro Atlanta — built in Next.js, Webflow, or Shopify, mobile-first, local-SEO-ready, and delivered in 2 to 6 weeks from $2,500. You own the site, the domain, and every file on handoff.",
    stats: [
      { value: "2–6 wks", label: "Kickoff to launch" },
      { value: "90+", label: "Core Web Vitals score by default" },
      { value: "30+", label: "Brands launched" },
    ],
    expertQuote: quote(
      "Most small-business sites lose the customer in the first three seconds — slow load, no clear next step. I build the opposite: fast, obvious, and yours to keep. No template, no monthly hostage fee.",
    ),
  },
  "ai-workflows": {
    answerFirst:
      "AI workflow integration from Branding Zombie Designs is practical business automation for small businesses in Cumming, GA and North Metro Atlanta — custom chatbots, lead capture, scheduling, and follow-up built on Claude and OpenAI with n8n or Make, wired into the tools you already use. Setup starts at $750 plus $149/month, month-to-month, and you own every workflow.",
    stats: [
      { value: "1–2 wks", label: "To first working automation" },
      { value: "24/7", label: "Lead capture, no night shift" },
      { value: "$750", label: "Setup, month-to-month after" },
    ],
    expertQuote: quote(
      "AI isn't going to replace you — it should just stop you answering the same five questions at midnight. I build the boring, useful kind of automation, scoped so it can't hallucinate your pricing.",
    ),
  },
  "print-design": {
    answerFirst:
      "Print design from Branding Zombie Designs is production-ready packaging, labels, signage, and collateral for businesses in Cumming, GA and North Metro Atlanta — designed in-house with real dielines, CMYK, and 15+ years of press experience, then produced through an in-house wholesale print pipeline. One invoice for design and print, from $75.",
    stats: [
      { value: "15+ yrs", label: "Production print experience" },
      { value: "2 days", label: "Turnaround on simple jobs" },
      { value: "FDA/FTC", label: "Compliant label design" },
    ],
    expertQuote: quote(
      "I've sent thousands of files to press. Ours don't come back with 'please fix' — the bleed, the trim, the dieline are right the first time. That's the difference between a designer and someone who actually knows print.",
    ),
  },
  "social-media": {
    answerFirst:
      "Social media management from Branding Zombie Designs is done-for-you content, scheduling, and community management for small businesses in Cumming, GA and across North Metro Atlanta — custom-designed posts, captions in your voice, and monthly reporting from $699/month, month-to-month. Built by a designer with 15+ years in CPG and ecommerce, not recycled Canva templates.",
    stats: [
      { value: "$699/mo", label: "Starting, month-to-month" },
      { value: "12–30", label: "Custom posts per month" },
      { value: "15+ yrs", label: "CPG & ecommerce design" },
    ],
    expertQuote: quote(
      "Most small-business feeds die because nobody knows what to post. We take that whole decision off your plate — a month of content, designed in your brand, approved before it ever goes live.",
    ),
  },
  ecommerce: {
    answerFirst:
      "Ecommerce development from Branding Zombie Designs is conversion-focused Shopify, WooCommerce, and custom online-store design for product brands in Cumming, GA, North Metro Atlanta, and nationwide — product pages, subscriptions, and integrations like Klaviyo and reviews, from $3,000. Built by a 15+ year CPG designer who has shipped real brands, not free themes.",
    stats: [
      { value: "$3,000", label: "Custom Shopify builds from" },
      { value: "15+ yrs", label: "CPG & DTC brand design" },
      { value: "30+", label: "Brands launched" },
    ],
    expertQuote: quote(
      "A pretty homepage doesn't sell — product pages, subscriptions, and a fast checkout do. I build stores around the parts that actually move product, then hand you the keys.",
    ),
  },
  "logo-design": {
    answerFirst:
      "Logo design from Branding Zombie Designs is custom logo and mark design for small businesses in Cumming, GA and across North Metro Atlanta — concepts built to work on a sign, a website favicon, a shirt, and a 200×200 app icon, with source files you own, from $750. Fifteen-plus years and 30+ brands, with no AI-generated or template logos.",
    stats: [
      { value: "$750", label: "Custom logo design from" },
      { value: "30+", label: "Brand marks designed" },
      { value: "You own", label: "Every source file on handoff" },
    ],
    expertQuote: quote(
      "A cheap logo costs you twice — once to buy it, once to redo it when it falls apart on a sign. I design marks that hold up everywhere, from a favicon to a vehicle wrap.",
    ),
  },
  branding: {
    answerFirst:
      "Brand identity design from Branding Zombie Designs is a complete brand system for small businesses in Cumming, GA and across North Metro Atlanta — logo, color, typography, voice, and the brand guidelines that keep it consistent across every site, sign, label, and post, from $2,500. Built by a designer with 15+ years across CPG, print, and digital.",
    stats: [
      { value: "$2,500", label: "Full brand systems from" },
      { value: "15+ yrs", label: "Across CPG, print & digital" },
      { value: "1 system", label: "Consistent everywhere you show up" },
    ],
    expertQuote: quote(
      "A brand isn't a logo — it's why a customer recognizes you on a shelf, a truck, and a feed without reading the name. I build the rules that make that happen, then make them easy to follow.",
    ),
  },
  "digital-marketing": {
    answerFirst:
      "Digital marketing from Branding Zombie Designs is local SEO, AEO (AI-search optimization), Google Business Profile management, and content for small businesses in Cumming, GA and across North Metro Atlanta — built to get you found on Google and cited by AI engines like ChatGPT and Gemini, from $499/month. Honest scope, no long contracts.",
    stats: [
      { value: "$499/mo", label: "Local SEO & AEO from" },
      { value: "Google + AI", label: "Ranked and cited" },
      { value: "5.0★", label: "On our own Google reviews" },
    ],
    expertQuote: quote(
      "SEO didn't die — it grew a second head. Now you have to win the Google map pack AND the AI answer box. I set businesses up for both, and I'll tell you honestly when you don't need to pay for it.",
    ),
  },
};

export function getServiceAeo(slug: ServiceSlug): ServiceAeo | undefined {
  return SERVICE_AEO[slug];
}
