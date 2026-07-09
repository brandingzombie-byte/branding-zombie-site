// ─── Service-page AEO enrichment — single source of truth ───────────────────
// Adds the three peer-reviewed Generative Engine Optimization levers (Princeton
// GEO study, KDD 2024) to each service page, WITHOUT touching the large
// services.ts objects:
//   1. answerFirst — a definitional "X from Branding Zombie is…" sentence that
//      names the business, the place, the service, and the price anchor. This
//      is the self-contained passage AI engines lift and cite.
//   2. stats — honest, first-party proof points (the +41% "add statistics"
//      lever). NO fabricated external stats or fake sources — only claims the
//      brand already stands behind (15+ years, 80+ projects, real 5.0★ Google
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
      "Web design from Branding Zombie Designs is custom, conversion-focused website design and development for small businesses in Cumming, GA and across North Metro Atlanta — built in Next.js, Webflow, or Shopify, mobile-first, local-SEO-ready, from $1,500 with most sites live in 2–3 weeks. You own the site, the domain, and every file on handoff.",
    stats: [
      { value: "2–3 wks", label: "Most sites, kickoff to live" },
      { value: "90+", label: "Core Web Vitals score by default" },
      { value: "80+", label: "Projects delivered" },
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
  "email-marketing": {
    answerFirst:
      "Email marketing from Branding Zombie Designs is done-for-you campaign design, copywriting, and automation for small businesses in Cumming, GA and across North Metro Atlanta — Klaviyo, Mailchimp, or Resend, from $499/month with a flat $350 one-time setup, month-to-month, and the client owns the list. Deliverability (SPF/DKIM/DMARC) is configured as step one so campaigns land in the inbox, not spam.",
    stats: [
      { value: "$499/mo", label: "Starting, month-to-month" },
      { value: "15+ yrs", label: "Campaign design for CPG & DTC brands" },
      { value: "$350", label: "Flat one-time setup — platform, template, welcome series" },
    ],
    expertQuote: quote(
      "Almost every business I meet has the same asset gathering dust: a list of customers who already said yes once, that nobody has emailed in years. We run our own automated email engine on this site — the same machine we build for clients.",
    ),
  },
  ecommerce: {
    answerFirst:
      "Ecommerce development from Branding Zombie Designs is conversion-focused Shopify, WooCommerce, and custom online-store design for product brands in Cumming, GA, North Metro Atlanta, and nationwide — product pages, subscriptions, and integrations like Klaviyo and reviews, from $3,000. Built by a 15+ year CPG designer who has shipped real brands, not free themes.",
    stats: [
      { value: "$3,000", label: "Custom Shopify builds from" },
      { value: "15+ yrs", label: "CPG & DTC brand design" },
      { value: "80+", label: "Projects delivered" },
    ],
    expertQuote: quote(
      "A pretty homepage doesn't sell — product pages, subscriptions, and a fast checkout do. I build stores around the parts that actually move product, then hand you the keys.",
    ),
  },
  "logo-design": {
    answerFirst:
      "Logo design from Branding Zombie Designs is custom logo and mark design for small businesses in Cumming, GA and across North Metro Atlanta — concepts built to work on a sign, a website favicon, a shirt, and a 200×200 app icon, with source files you own, from $750. Fifteen-plus years and 80+ projects, with no AI-generated or template logos.",
    stats: [
      { value: "$750", label: "Custom logo design from" },
      { value: "80+", label: "Projects delivered" },
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

// ─── Comparison tables (the 4th GEO lever) ──────────────────────────────────
// Extractable head-to-head tables — what gets a brand NAMED in "X vs Y" AI
// queries rather than ghost-cited. Kept fair and honest, not disparaging.
// Print-design is intentionally absent: it already ships its own
// "one shop vs designer + print shop" comparison on the page.

export interface ServiceComparisonData {
  /** Section title, e.g. "Branding Zombie vs. a DIY site builder". */
  title: string;
  /** Short intro line for context + AEO. */
  intro: string;
  /** Column header for our side. */
  us: string;
  /** Column header for the alternative. */
  them: string;
  rows: { label: string; us: string; them: string }[];
}

export const SERVICE_COMPARISON: Partial<
  Record<ServiceSlug, ServiceComparisonData>
> = {
  "web-design": {
    title: "Branding Zombie vs. a DIY site builder",
    intro:
      "How a custom small-business site from Branding Zombie compares to a Wix or Squarespace build you do yourself.",
    us: "Branding Zombie",
    them: "Wix / Squarespace DIY",
    rows: [
      { label: "Ongoing cost", us: "~$20/mo hosting — you own it", them: "$23–$49/mo forever" },
      { label: "Speed (Core Web Vitals)", us: "90+ by default", them: "Template bloat slows it" },
      { label: "Local SEO", us: "Schema + Google Business setup built in", them: "Bolt-on, mostly DIY" },
      { label: "Design", us: "Custom-built around your brand", them: "Reskinned template" },
      { label: "Who builds it", us: "A senior designer, 15+ yrs", them: "You, nights and weekends" },
      { label: "Ownership", us: "You own site, domain, files", them: "Locked to the platform" },
    ],
  },
  "ai-workflows": {
    title: "Custom automation vs. an off-the-shelf chatbot",
    intro:
      "How a Branding Zombie build compares to a SaaS chatbot like Intercom or Drift.",
    us: "Branding Zombie",
    them: "Intercom / Drift",
    rows: [
      { label: "Training", us: "Trained on your content day one", them: "You configure and maintain it" },
      { label: "Integration", us: "Wired into tools you already use", them: "Another dashboard to learn" },
      { label: "Pricing", us: "Flat setup + monthly, no per-seat", them: "Per-seat, upsell tiers" },
      { label: "Maintenance", us: "We retrain it monthly", them: "On you" },
      { label: "Accuracy", us: "Locked to approved answers", them: "Depends on your setup" },
    ],
  },
  "social-media": {
    title: "Done-for-you vs. the intern plan",
    intro:
      "How managed social from Branding Zombie compares to handing it to an intern or doing it yourself.",
    us: "Branding Zombie",
    them: "Intern / DIY",
    rows: [
      { label: "Who designs it", us: "15+ yr CPG designer", them: "Whoever's free" },
      { label: "Consistency", us: "Month planned and approved", them: "Posts when remembered" },
      { label: "On-brand", us: "Custom, in your brand", them: "Random Canva templates" },
      { label: "Strategy", us: "Quarterly pillars + reporting", them: "Vibes" },
      { label: "Cost", us: "From $699/mo, month-to-month", them: "Cheap, and it shows" },
    ],
  },
  "email-marketing": {
    title: "Managed email vs. the dusty Mailchimp login",
    intro:
      "How done-for-you email from Branding Zombie compares to the account you signed up for and never opened.",
    us: "Branding Zombie",
    them: "DIY / dormant account",
    rows: [
      { label: "Consistency", us: "Campaigns ship every month, approved by you", them: "Last send: unknown" },
      { label: "Deliverability", us: "SPF/DKIM/DMARC configured first", them: "Straight to spam, silently" },
      { label: "Design & copy", us: "On-brand, written in your voice", them: "Default template, blank page" },
      { label: "Automations", us: "Welcome, win-back, cart recovery", them: "None running" },
      { label: "Ownership", us: "Your account, your list, always", them: "Yours too — just unused" },
      { label: "Cost", us: "From $499/mo, month-to-month", them: "Platform fee for nothing" },
    ],
  },
  ecommerce: {
    title: "Custom Shopify vs. a free theme",
    intro:
      "How a Branding Zombie store compares to a free theme you set up yourself.",
    us: "Branding Zombie",
    them: "Free theme DIY",
    rows: [
      { label: "Conversion", us: "Built around what sells", them: "Pretty, not optimized" },
      { label: "Product pages", us: "Designed to convert", them: "Default layout" },
      { label: "Integrations", us: "Klaviyo, subscriptions, reviews", them: "Add them yourself" },
      { label: "Brand fit", us: "Matches your packaging", them: "Generic" },
      { label: "Built by", us: "15+ yr CPG/DTC designer", them: "You + YouTube" },
    ],
  },
  "logo-design": {
    title: "Custom logo vs. a $5 or AI logo",
    intro:
      "How a Branding Zombie logo compares to a Fiverr gig or an AI logo generator.",
    us: "Branding Zombie",
    them: "Fiverr / AI generator",
    rows: [
      { label: "Originality", us: "Designed for you, not resold", them: "Templated or AI-recycled" },
      { label: "Versatility", us: "Works sign to favicon", them: "Falls apart at sizes" },
      { label: "Files", us: "Full source files, you own", them: "Limited or watermarked" },
      { label: "Revisions", us: "Real rounds with a designer", them: "Take it or leave it" },
      { label: "Longevity", us: "Built to last years", them: "Redone within months" },
    ],
  },
  branding: {
    title: "A full brand system vs. just a logo",
    intro:
      "What you get with a complete Branding Zombie identity versus stopping at a logo.",
    us: "Full brand system",
    them: "Just a logo",
    rows: [
      { label: "Consistency", us: "Rules for every touchpoint", them: "Hope for the best" },
      { label: "Color & type", us: "Defined palette and fonts", them: "Picked ad hoc each time" },
      { label: "Voice", us: "Documented tone", them: "Whoever's writing that day" },
      { label: "Scales", us: "Onboard any vendor fast", them: "Re-explain every time" },
      { label: "Recognition", us: "Known without the name", them: "Logo only" },
    ],
  },
  "digital-marketing": {
    title: "Local SEO + AEO vs. doing nothing",
    intro:
      "What managed local search from Branding Zombie changes versus leaving it alone.",
    us: "Branding Zombie",
    them: "Doing nothing",
    rows: [
      { label: "Google map pack", us: "Optimized profile + schema", them: "Invisible to 'near me'" },
      { label: "AI search", us: "Built to be cited", them: "Not in the answer box" },
      { label: "Content", us: "Local posts that rank", them: "Silent" },
      { label: "Reviews", us: "A system to grow them", them: "Whatever trickles in" },
      { label: "Cost", us: "From $499/mo, no lock-in", them: "$0 — and lost customers" },
    ],
  },
};

export function getServiceComparison(
  slug: ServiceSlug,
): ServiceComparisonData | undefined {
  return SERVICE_COMPARISON[slug];
}
