// ─── Services content — single source of truth ─────────────────────────────
// Powers both the homepage <Services /> bento grid and the
// /services/[slug] landing pages. Per-page metadata, Schema.org fields, and
// section copy all live here so one edit updates everywhere.

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import type { Gallery4Item } from "@/components/ui/gallery4";
import { getServiceGalleryItems } from "@/data/portfolio";

export type ServiceSlug =
  | "web-design"
  | "logo-design"
  | "branding"
  | "ecommerce"
  | "print-design"
  | "social-media"
  | "digital-marketing"
  | "ai-workflows"
  | "launch-package";

// Phosphor icon names available via @/components/icons
export type ServiceIconName =
  | "Code"
  | "Lightning"
  | "PencilSimple"
  | "Wrench"
  | "RocketLaunch"
  | "ChatCircle"
  | "Sparkle"
  | "CurrencyDollar"
  | "Clock"
  | "Check"
  | "MapPin"
  | "Calendar";

export type ThemeAccent = "neon" | "toxic" | "cyan";

export interface ServiceHero {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  heroImage: { src: string; alt: string };
  microProof: string;
}

export interface PainPoint {
  text: string;
}

export interface Deliverable {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: ServiceIconName;
}

export interface ServiceFAQItem {
  q: string;
  a: string;
}

export interface ServicePricing {
  label: string;
  price: string;
  unit?: string;
  note: string;
  numericPrice: string;
}

export interface ServiceMeta {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  ogImage: string;
  ogImageAlt: string;
}

export interface ServiceSchemaFields {
  serviceType: string;
  category: string;
  description: string;
}

// ─── Phase C additions: tiered pricing + brand track record ────────────────

// Standard 3-tier card used on all non-Print service pages.
export interface Tier {
  name: string;               // "Starter" | "Growth" | "Premium"
  price: string;              // "$2,500" or "$499/mo"
  priceNote?: string;         // "+ $149/mo" (AI setup+monthly) or "One-time"
  timeline: string;           // "2 weeks", "Ongoing", "Monthly"
  deliverables: string[];
  bestFor: string;
  ctaLabel: string;
  isFeature?: boolean;        // Growth tier: larger card + accent + badge
}

// Print Design uses 4 category bands instead of 3 tiers — spec exception.
export interface ServiceCategoryBand {
  name: string;               // "Simple" | "Medium" | "Complex" | "Print + Source bundle"
  priceRange: string;         // "$75–$250"
  examples: string[];
  timeline: string;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  iconSvg: string;
  themeAccent: ThemeAccent;
  homeCardPrice: string;
  homeCardDescription: string;
  hook?: string;              // one-line value prop per spec Section 5.A
  whoThisIsFor?: string[];    // 3–4 bullets per spec Section 5.B
  tiers?: Tier[];             // 3-tier structure; Growth isFeature=true
  categoryBands?: ServiceCategoryBand[];  // Print only
  calloutText?: string;       // "15+ years of production-ready design..."
  hero: ServiceHero;
  painPointsEyebrow: string;
  painPointsHeadline: string;
  painPointsHighlight: string;
  painPointsIntro: string;
  painPoints: PainPoint[];
  offerEyebrow: string;
  offerHeadline: string;
  offerHighlight: string;
  offerSubhead: string;
  deliverables: Deliverable[];
  gallery: {
    title: string;
    description: string;
    items: Gallery4Item[];
  };
  processEyebrow: string;
  processHeadline: string;
  processHighlight: string;
  process: ProcessStep[];
  faqEyebrow: string;
  faqHeadline: string;
  faqHighlight: string;
  faqs: ServiceFAQItem[];
  pricing: ServicePricing;
  finalCta: {
    eyebrow: string;
    headline: string;
    highlightWord: string;
    subhead: string;
    ctaLabel: string;
  };
  related: ServiceSlug[];
  meta: ServiceMeta;
  schema: ServiceSchemaFields;
}

// Utility to build gallery hrefs that all land on the homepage portfolio
const portfolioHref = `${SITE_URL}/#portfolio`;

// ─── SERVICES ───────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  // ════════════════════════════════════════════════════════════════════════
  // WEB DESIGN
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "web-design",
    name: "Web Design",
    shortName: "Web",
    tagline: "Custom small-business websites, built to convert",
    iconSvg: "/assets/SVG/web-design-icon.svg",
    themeAccent: "neon",
    homeCardPrice: "from $2,500",
    homeCardDescription:
      "Conversion-focused websites that turn visitors into customers — built to look and feel like the brands you envy.",
    hook: "Conversion-focused websites that turn visitors into customers — built to look and feel like the brands you envy.",
    whoThisIsFor: [
      "Local businesses replacing a tired DIY or Wix-era site",
      "New businesses launching their first real web presence",
      "CPG and DTC brands who need a professional storefront (Ecommerce for full stores)",
      "Owners who want agency-caliber work without the agency timeline and price",
    ],
    tiers: [
      {
        name: "Starter",
        price: "$2,500",
        timeline: "2 weeks",
        deliverables: [
          "5-page responsive site",
          "CMS you can actually update",
          "Contact form wired to your inbox",
          "On-page SEO foundation",
          "Mobile-optimized, Core Web Vitals pass",
          "SSL, domain, hosting setup",
        ],
        bestFor:
          "Small local businesses that need a professional web presence without overbuilding.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Growth",
        price: "$4,500",
        timeline: "3 weeks",
        isFeature: true,
        deliverables: [
          "Up to 10 pages, fully custom (never a template)",
          "Integrations — Calendly, Mailchimp, Klaviyo, Stripe",
          "On-page SEO + Google Analytics 4 events",
          "Form routing + auto-reply + CRM handoff",
          "Blog / CMS setup with editor training",
          "30-day post-launch polish window",
        ],
        bestFor:
          "Most local businesses ready for a real online presence that brings in real work.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Premium",
        price: "$7,500+",
        timeline: "4–6 weeks",
        deliverables: [
          "Unlimited pages, scroll animations, custom interactions",
          "Custom functionality (calculators, quizzes, portals)",
          "Multi-language ready",
          "Ecommerce-ready foundation",
          "Advanced performance optimization",
          "60 days of post-launch support",
        ],
        bestFor:
          "Businesses that need a site to function like a sales asset — not a brochure.",
        ctaLabel: "Book a scoping call",
      },
    ],
    calloutText:
      "Built in Next.js or Webflow — fast, secure, and easy to update. No theme marketplaces, no plugin chaos.",
    hero: {
      eyebrow: "Web Design · Cumming, GA",
      headline: "Websites that actually make you money — shipped in",
      highlightWord: "weeks, not months",
      subhead:
        "Custom small-business websites built in Next.js, Webflow, or Shopify. Fast, mobile-first, search-engine friendly, and tuned to turn visitors into customers. Based in Cumming, GA — serving Forsyth County, Alpharetta, Roswell, and North Metro Atlanta.",
      ctaLabel: "Book a free site audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/web-design/hero.png",
        alt: "Modern small-business website design being built on a dark editorial desktop — Branding Zombie Designs in Cumming, GA",
      },
      microProof: "From $2,500 · 2–6 week delivery · 30+ brands launched",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your website is",
    painPointsHighlight: "costing you customers",
    painPointsIntro:
      "You don't need another agency quoting you 8 weeks and $20k. You need a site that loads fast, ranks locally, and doesn't require a developer to update a headline.",
    painPoints: [
      { text: "Your current site loads like it's on dial-up and visitors bounce before they ever see your offer." },
      { text: "Google maps shows your competitor above you — even though you've been in Forsyth County twice as long." },
      { text: "Your site looks fine on desktop and unusable on a phone, which is where 70% of your traffic actually lives." },
      { text: "Every small change means another $150 invoice from the freelancer who built it two years ago." },
      { text: "You've been quoted $15,000+ by an agency that wants 12 weeks and three discovery workshops." },
    ],
    offerEyebrow: "One engagement · Everything you need to launch",
    offerHeadline: "A real website,",
    offerHighlight: "shipped in 10 days",
    offerSubhead:
      "Six deliverables, one fixed scope. Built for Cumming and North Metro Atlanta small businesses who need to show up online without the agency runaround.",
    deliverables: [
      {
        title: "Custom Design, No Templates",
        description:
          "Built around your brand, your customers, and your goals. Never a reskinned Squarespace template.",
      },
      {
        title: "5–10 Pages, Copy Included",
        description:
          "Home, about, services, contact, and the pages that matter for your business — with copy we help you write.",
      },
      {
        title: "Mobile-First & Lightning Fast",
        description:
          "Scores 90+ on Core Web Vitals by default. Loads in under 2 seconds on a phone. Google notices.",
      },
      {
        title: "Local SEO Setup",
        description:
          "Schema markup, meta tags, Google Business Profile integration, and page-level optimization for every town you serve.",
      },
      {
        title: "Easy Content Management",
        description:
          "Update your own headlines, photos, and hours without calling a developer. No more $150 invoices for a typo fix.",
      },
      {
        title: "Launch Support & Handoff",
        description:
          "Domain, hosting, analytics, and forms configured. We don't disappear the day it goes live.",
      },
    ],
    gallery: {
      title: "Recent sites we've shipped — restaurants, DTC, B2B, construction.",
      description:
        "Real launches across small business, ecommerce, and B2B. Every one built to convert before it's built to look pretty.",
      items: getServiceGalleryItems("web-design", {
        pinned: [
          "papas-kitchen",
          "enigma-computers",
          "jay-scotts",
          "sharp-edge",
          "muscleology",
          "pure-blanco",
          "planters-etc",
          "squeeze-me-skinny",
          "ezbeauty-banner",
          "goape-banner",
        ],
        limit: 10,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "No mystery,",
    processHighlight: "no surprises",
    process: [
      {
        step: "01",
        title: "Discovery Call",
        subtitle: "Free",
        description:
          "15 minutes on a call. We talk about your business, your customers, and what's broken with your current site. You leave with a clear recommendation whether we work together or not.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Strategy & Wireframes",
        description:
          "Page architecture, content plan, and low-fidelity wireframes. We agree on the structure before we touch pixels so there's no expensive backtracking.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Design in Browser",
        description:
          "High-fidelity design happens in a live preview you can click through — not a static Figma file you have to imagine. You see exactly what launch day looks like.",
        icon: "PencilSimple",
      },
      {
        step: "04",
        title: "Build & QA",
        description:
          "Development, responsive testing, Core Web Vitals tuning, schema markup, and a full accessibility pass. Built on Next.js or Webflow depending on your needs.",
        icon: "Wrench",
      },
      {
        step: "05",
        title: "You Launch",
        description:
          "DNS, analytics, forms, and Google Business Profile integration — all configured. We walk you through updating content, and we're around when you need us.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions business owners",
    faqHighlight: "actually ask",
    faqs: [
      {
        q: "Do you use templates?",
        a: "No. Every site is custom designed for your brand, your customers, and your goals. We build on strong frameworks like Next.js and Webflow, but the design on top is never a reskinned template. If a theme marketplace can deliver what you need, honestly, save the money — we'll tell you.",
      },
      {
        q: "Will I own the site and the domain?",
        a: "Yes. You own the domain, the site files, the content, and the accounts. On handoff we transfer everything into your name. If you ever want to walk away, you take it all with you — no proprietary lock-in, no vendor-hostage scenarios.",
      },
      {
        q: "Can I update the site myself after launch?",
        a: "Yes. Every site ships with a CMS and a short training so you can change headlines, photos, hours, and posts without writing code. Monthly care plans are available if you'd rather hand updates off to us — starting at $100/month, no lock-in.",
      },
      {
        q: "How is this different from a $99/month Wix or Squarespace site?",
        a: "Speed, SEO, and ownership. Template builders lock you into their platform, drag your Core Web Vitals down, and still leave you paying a monthly fee forever. Our builds are faster, rank better, and cost you nothing after launch besides hosting — usually around $20/month if that.",
      },
      {
        q: "How fast can you actually build my website?",
        a: "Starter sites launch in 2 weeks. Growth in 3. Premium and ecommerce in 4–6. Traditional agencies take 8+ because they're managing three layers of account managers. We move faster because we have a tight process, modern tooling, and no agency overhead.",
      },
      {
        q: "What does a website cost?",
        a: "Starter (5 pages) is $2,500. Growth (up to 10 pages, integrations, SEO, analytics) is $4,500 — our most popular tier. Premium (unlimited pages, custom functionality, ecommerce-ready) starts at $7,500. Every tier is quoted flat, no hourly surprises, and the discovery call is free.",
      },
      {
        q: "Will it rank on Google for my town?",
        a: "Local SEO is built into every site — schema markup, Google Business Profile integration, fast Core Web Vitals, per-service landing pages when that fits. Ranking isn't magic, it's months of content + signals. But starting with a site built for it is the difference between fighting uphill and fighting downhill.",
      },
      {
        q: "Do you help with content and copy?",
        a: "Yes. We write the first draft of every page based on the discovery call, then refine with you. You don't need to show up with a Word doc full of copy — just answer our questions on the call and we'll turn it into something that sells.",
      },
      {
        q: "I got a cheaper quote. What am I actually paying for here?",
        a: "Fifteen-plus years, thirty-plus brands launched, and a designer who does it all himself — no sub-contractor chain, no offshore handoffs, no junior designer pretending to be a senior. If the cheaper quote comes from someone who can show you comparable launched work, follow your gut. If they can't, that's usually why it's cheaper.",
      },
      {
        q: "What happens if I don't love the design?",
        a: "Every tier includes revisions, and we sign off on direction at wireframe stage — before a single pixel is designed — specifically so we don't end up there. If something's off, we fix it. The Growth tier also includes a 30-day post-launch polish window so if things reveal themselves in the wild, we sort them.",
      },
    ],
    pricing: {
      label: "Websites start at",
      price: "$2,500",
      unit: "/ project",
      note: "Most projects land in the Growth tier at $4,500. Premium and custom scopes quoted on the discovery call.",
      numericPrice: "2500",
    },
    finalCta: {
      eyebrow: "Ready when you are",
      headline: "Your customers are already online.",
      highlightWord: "Be where they're looking.",
      subhead:
        "Book a free 15-minute site audit. We'll look at what you've got, tell you what's broken, and give you a clear path to a site that actually works — whether we end up building it or not.",
      ctaLabel: "Book a free site audit",
    },
    related: ["ai-workflows", "logo-design", "ecommerce"],
    meta: {
      seoTitle:
        "Web Design in Cumming, GA — Small-Business Websites in 10 Days",
      seoDescription:
        "Custom small-business web design in Cumming, GA & Forsyth County. Next.js, Webflow, Shopify. Fast, mobile-first, SEO-ready. Starter $2,500 · Growth $4,500 · Premium $7,500+. Call (770) 744-2536.",
      keywords: [
        "web design Cumming GA",
        "web designer Forsyth County",
        "web design Alpharetta GA",
        "web design Johns Creek GA",
        "web design Roswell GA",
        "web design Woodstock GA",
        "small business web design Georgia",
        "affordable web design Cumming",
        "custom website design Georgia",
        "Next.js web designer Georgia",
        "Webflow designer Atlanta",
        "Shopify designer Georgia",
        "fast turnaround web design Atlanta",
        "10 day website design Georgia",
        "restaurant website design Cumming",
        "dental website design Forsyth County",
        "HVAC website design Cumming",
        "contractor website design Georgia",
      ],
      ogImage: "/assets/services/web-design/hero.png",
      ogImageAlt:
        "Modern small-business web design — Branding Zombie Designs in Cumming, GA",
    },
    schema: {
      serviceType: "Web Design",
      category: "Web Design Services",
      description:
        "Custom, conversion-focused web design for small businesses in Cumming, GA and across North Metro Atlanta. Built in Next.js, Webflow, or Shopify with local SEO, mobile-first performance, and CMS included. 2–6 week delivery. Starter $2,500 · Growth $4,500 · Premium $7,500+.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // AI WORKFLOWS
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "ai-workflows",
    name: "AI Workflows",
    shortName: "AI",
    tagline: "Automate the busywork so you can focus on what you love",
    iconSvg: "/assets/SVG/ai-workflows-icon.svg",
    themeAccent: "cyan",
    homeCardPrice: "from $750",
    homeCardDescription:
      "Automate the busywork so you can focus on what you love.",
    hook: "Automate the busywork so you can focus on what you love.",
    whoThisIsFor: [
      "Local businesses drowning in repeat customer questions",
      "Service businesses losing hours to scheduling and intake back-and-forth",
      "Owners who've heard 'use AI' a hundred times and don't know where to start",
      "Teams still answering the same five questions by phone, text, and DM every day",
    ],
    tiers: [
      {
        name: "Chatbot Starter",
        price: "$750",
        priceNote: "+ $149/mo hosting & tuning",
        timeline: "1–2 weeks",
        deliverables: [
          "FAQ + lead capture bot on one channel (website or SMS)",
          "Trained on your services, pricing, hours, and real content",
          "Lead email notifications + CRM drop",
          "Monthly optimization + content refresh",
          "Full handoff + easy-edit dashboard",
        ],
        bestFor:
          "Local service businesses that want to capture leads 24/7 without hiring a night shift.",
        ctaLabel: "Start with Chatbot Starter",
      },
      {
        name: "Customer Service Suite",
        price: "$1,500",
        priceNote: "+ $349/mo",
        timeline: "2–3 weeks",
        isFeature: true,
        deliverables: [
          "Multi-channel bot — web, SMS, and email inbox",
          "FAQ automation + intelligent routing",
          "Appointment booking with calendar integration",
          "Human-handoff with context passed to you",
          "CRM integration (HubSpot, Pipedrive, Go High Level, Notion)",
          "Monthly performance reporting + tuning",
        ],
        bestFor:
          "Businesses with real customer-inquiry volume that need the front door handled.",
        ctaLabel: "Choose Customer Service Suite",
      },
      {
        name: "Custom Automation",
        price: "$2,500+",
        priceNote: "One-time build",
        timeline: "2–4 weeks",
        deliverables: [
          "Email sequence builds — Klaviyo, Mailchimp, ActiveCampaign",
          "Zapier / Make / n8n workflow orchestration",
          "CRM + operations integrations (Stripe, Square, QuickBooks, Sheets)",
          "Written SOPs so your team can run it after handoff",
          "Optional monthly management add-on ($150/mo)",
        ],
        bestFor:
          "Businesses with specific automation needs that don't fit a chatbot mold.",
        ctaLabel: "Book a scoping call",
      },
    ],
    calloutText:
      "Not another SaaS tool. These are real, working systems tailored to your business — and you own every workflow we build.",
    hero: {
      eyebrow: "AI Workflows · Cumming, GA",
      headline: "Let AI handle the busywork while you",
      highlightWord: "actually run the business",
      subhead:
        "Chatbots, lead capture, scheduling, email follow-up, and customer service automation — built for small businesses in Cumming, Forsyth County, and North Metro Atlanta. Practical AI that saves you hours a week, not a Silicon Valley pitch.",
      ctaLabel: "Book a free automation audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/ai-workflows/hero.png",
        alt: "Holographic data flow diagram — AI workflow integration for small businesses in Cumming, GA",
      },
      microProof: "Starting at $500 · 1-week delivery · No ChatGPT nonsense",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "You're drowning in tasks",
    painPointsHighlight: "a robot should be doing",
    painPointsIntro:
      "AI isn't magic and it isn't going to replace you. But it absolutely should be answering basic questions, booking appointments, and sending follow-up emails while you do the real work.",
    painPoints: [
      { text: "You're answering the same five questions by phone, text, and Instagram DM — every single day." },
      { text: "Leads come in through the contact form and sit in an inbox for 8 hours before anyone sees them." },
      { text: "Appointments get scheduled over three back-and-forth emails when a booking link could have done it in one click." },
      { text: "You've tried ChatGPT once or twice, weren't sure what to ask, and closed the tab forever." },
      { text: "Your competitor's website has a chatbot that books consultations at 2am. Yours has a phone number that goes to voicemail." },
    ],
    offerEyebrow: "One engagement · Automation that actually runs",
    offerHeadline: "Practical AI,",
    offerHighlight: "not hype",
    offerSubhead:
      "Six focused automations that handle the repetitive work every small business deals with. No black-box magic — just AI where it actually helps.",
    deliverables: [
      {
        title: "Automation Audit",
        description:
          "30-minute deep dive into your day-to-day. We find the three highest-value places AI can save you hours a week.",
      },
      {
        title: "Custom Chatbot on Your Site",
        description:
          "Trained on your services, pricing, FAQs, and hours. Answers in your voice, books appointments, hands off to humans when needed.",
      },
      {
        title: "Lead Capture & Instant Reply",
        description:
          "Every form fill triggers an instant reply, calendar invite, and CRM entry. No more leads sitting cold in an inbox.",
      },
      {
        title: "Scheduling Automation",
        description:
          "Calendly, Google Calendar, and Outlook integration. Clients book themselves. You stop playing calendar tag.",
      },
      {
        title: "Email & SMS Follow-Up",
        description:
          "Automated drip sequences for new leads, reviews, rebooking, and cart abandonment. Written in your voice, not a corporate template.",
      },
      {
        title: "Integration & Training",
        description:
          "Hooked up to the tools you already use — Gmail, Google Sheets, Stripe, Square, Shopify, QuickBooks. Plus a short training so you actually understand what's running.",
      },
    ],
    gallery: {
      title: "AI workflows running quietly in the background.",
      description:
        "Chatbots, automation pipelines, and lead capture flows built for small businesses in Cumming and across North Atlanta.",
      // No portfolio gallery for AI workflows yet — case studies are
      // under NDA and screenshots get stale fast. The slug page hides
      // the gallery section when items is empty.
      items: getServiceGalleryItems("ai-workflows", {
        pinned: ["jay-scotts"],
        limit: 4,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From overwhelmed",
    processHighlight: "to on autopilot",
    process: [
      {
        step: "01",
        title: "Audit & Map",
        subtitle: "Free",
        description:
          "30-minute working session. You show us your week. We map every task that's repetitive enough to automate and rank them by hours-saved-per-week.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Design the Flow",
        description:
          "We blueprint each automation in plain English before building anything. You approve exactly what the AI will and won't do before we touch code.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Build & Train",
        description:
          "Chatbots trained on your real content, integrations wired up, triggers tested end-to-end. We hand you a test version before it touches real customers.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Launch & Handoff",
        description:
          "We flip the switch, monitor the first week, and hand you a short training on how to tune, update, or pause anything. You stay in control.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions owners ask",
    faqHighlight: "before they commit",
    faqs: [
      {
        q: "What do you actually build this on?",
        a: "Claude and OpenAI for language models, n8n or Make for workflow orchestration, and direct integrations with the tools you already use — Gmail, Google Calendar, Stripe, Square, Shopify, QuickBooks, HubSpot, Go High Level, whatever. We're not trying to sell you a platform; we're wiring up what you've got.",
      },
      {
        q: "Can it integrate with my existing systems?",
        a: "Yes — that's the whole point. If your current stack has a public API (almost everything does now), we can connect it. Appointment booking that feeds your calendar. Lead forms that drop into your CRM. Invoice reminders that pull from QuickBooks. We use what you've got.",
      },
      {
        q: "What happens if the AI gives a wrong answer?",
        a: "Two safeguards. First: we narrow the bot's scope to only answer from your approved knowledge base — it doesn't hallucinate about pricing or hours it wasn't given. Second: anything outside scope triggers a human handoff with full conversation context passed to you. Monthly reviews catch anything that slipped through.",
      },
      {
        q: "Do I need to understand AI to use this?",
        a: "No. We build the workflow, you use the result. If a customer chats with your bot, you see the conversation. If a form gets filled, you get notified. It's ordinary software — it just happens to use AI in the places where AI is the right tool.",
      },
      {
        q: "Is there a contract?",
        a: "Setup is a one-time project fee. Monthly hosting and tuning is month-to-month — cancel anytime, take the workflow with you. If it stops working or stops earning its keep, you're not locked in.",
      },
      {
        q: "Is my customer data safe?",
        a: "Yes. We use enterprise-grade providers with SOC 2 compliance. Customer data is never used to train public models — your conversation history stays yours. For regulated industries (healthcare, legal) we can run on-premise or on HIPAA-compliant infrastructure when that's the requirement.",
      },
      {
        q: "What does this actually cost?",
        a: "Chatbot Starter is $750 setup + $149/mo. Customer Service Suite is $1,500 setup + $349/mo. Custom Automation projects start at $2,500 one-time. Hosting on the monthly tiers covers the model API costs, monitoring, and monthly content refreshes — no surprise bills at scale.",
      },
      {
        q: "Will it replace my front-desk person?",
        a: "No. It replaces the three hours a day your front-desk person spends answering the same five questions, so they can do the work that actually needs a human. Most clients see fewer repetitive calls, not fewer employees.",
      },
      {
        q: "Can you maintain and retrain it as my business changes?",
        a: "Yes — that's baked into the monthly tiers. New service added? New pricing? New location? Tell us; we retrain the bot within a week. If you prefer to manage it yourself, the dashboard makes that doable too.",
      },
      {
        q: "How is this different from an off-the-shelf chatbot from Intercom or Drift?",
        a: "Those tools are great if you have the staff to configure and maintain them. Our builds are custom-trained on your content from day one, integrated with your existing tools (not a new dashboard to learn), and maintained monthly by us. No per-seat pricing, no upsell to the \"AI Suite\" tier — one flat fee, handled.",
      },
    ],
    pricing: {
      label: "Setup starts at",
      price: "$750",
      unit: "+ $149/mo",
      note: "Customer Service Suite $1,500 + $349/mo · Custom Automation from $2,500 one-time. All tiers month-to-month after setup.",
      numericPrice: "750",
    },
    finalCta: {
      eyebrow: "Ready to stop doing everything yourself",
      headline: "Your time is worth more",
      highlightWord: "than answering DMs at midnight",
      subhead:
        "Book a free 30-minute automation audit. We'll walk through your week, find the three tasks AI should already be handling, and give you a clear path forward — whether you hire us or DIY it.",
      ctaLabel: "Book a free automation audit",
    },
    related: ["web-design", "social-media", "ecommerce"],
    meta: {
      seoTitle:
        "AI Chatbots & Automation for Small Business — Cumming, GA",
      seoDescription:
        "Custom AI chatbots, lead capture, scheduling, and business automation for small businesses in Cumming, GA & North Atlanta. Chatbot Starter $750+$149/mo · Customer Service Suite $1,500+$349/mo · Custom Automation from $2,500. Call (770) 744-2536.",
      keywords: [
        "AI workflow integration Cumming GA",
        "AI chatbot small business Georgia",
        "AI automation Atlanta",
        "business automation Forsyth County",
        "ChatGPT integration Atlanta",
        "AI lead capture Cumming",
        "automated booking system Georgia",
        "AI customer service small business",
        "marketing automation Cumming",
        "workflow automation Atlanta",
        "small business AI integration Georgia",
        "chatbot developer Cumming GA",
        "n8n workflow Atlanta",
        "custom chatbot Forsyth County",
      ],
      ogImage: "/assets/services/ai-workflows/hero.png",
      ogImageAlt:
        "AI workflow integration for small businesses in Cumming, GA — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Business Automation",
      category: "AI & Business Automation Services",
      description:
        "AI-powered business automation for small businesses in Cumming, GA and across North Metro Atlanta — custom chatbots, lead capture, scheduling, email follow-up, and customer service automation. Practical integrations starting at $500 per workflow.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // PRINT DESIGN
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "print-design",
    name: "Print Design",
    shortName: "Print",
    tagline: "Packaging, signage, and collateral — designed by someone who knows print",
    iconSvg: "/assets/SVG/print-services-icon.svg",
    themeAccent: "toxic",
    homeCardPrice: "from $75",
    homeCardDescription:
      "Packaging, signage, and collateral designed by someone who actually knows print production.",
    hook: "Packaging, signage, and print collateral — designed by someone who actually knows print production.",
    whoThisIsFor: [
      "Product brands that need label, box, or packaging design (with FDA/FTC compliance when required)",
      "Restaurants needing menus, table tents, tablecloths, or takeout materials",
      "Local businesses needing signage, flyers, brochures, magnets, or vehicle wraps",
      "Anyone who's sent a 'print-ready' file to a printer only to have it rejected",
    ],
    categoryBands: [
      {
        name: "Simple",
        priceRange: "$75–$250",
        examples: [
          "Business cards",
          "Single flyer or postcard",
          "Fridge magnet",
          "Single social graphic",
          "Door hanger",
          "Appointment card",
        ],
        timeline: "2–4 days",
      },
      {
        name: "Medium",
        priceRange: "$300–$650",
        examples: [
          "Bi-fold or tri-fold brochure",
          "Restaurant menu (1–2 pages)",
          "Event banner or retractable display",
          "Table tent or tablecloth",
          "10-template social pack",
          "Rack card / sell sheet",
        ],
        timeline: "4–7 days",
      },
      {
        name: "Complex",
        priceRange: "$750–$2,500",
        examples: [
          "CPG / supplement packaging label",
          "Vehicle wrap design",
          "Retractable banner stand display",
          "Motion graphic or short-form video",
          "Trade show booth graphics",
          "Multi-panel packaging die",
        ],
        timeline: "1–3 weeks",
      },
      {
        name: "Print + Source Bundle",
        priceRange: "Design fee + 15–20% on production",
        examples: [
          "We design AND source the printing via Ink Spatter Studio",
          "One invoice for design + production",
          "Vendor-managed — we handle proofs, fulfillment, and delivery",
          "Wholesale trade pricing passed through",
          "Available on any of the above deliverables",
        ],
        timeline: "Varies by scope",
      },
    ],
    calloutText:
      "15+ years of production-ready design. Dielines printers love. File prep that doesn't come back with questions. Label experience that meets FDA/FTC compliance when it counts.",
    hero: {
      eyebrow: "Print Design · Cumming, GA",
      headline: "Designed for print,",
      highlightWord: "not just Canva",
      subhead:
        "Packaging, labels, menus, signage, brochures, vehicle wraps, and branded collateral. Designed in-house with real dielines, real CMYK, and real press experience. Printing sourced through Ink Spatter Studio when you want one invoice — or print-ready files sent to your vendor when you don't.",
      ctaLabel: "Get a print quote",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/print-services/hero.png",
        alt: "Custom packaging label and printed collateral in a studio — Branding Zombie Designs print design in Cumming, GA",
      },
      microProof: "From $75 · 2 days to 3 weeks · 30+ brands shipped",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Print shouldn't be",
    painPointsHighlight: "this annoying",
    painPointsIntro:
      "Vistaprint is cheap for a reason. Local print shops charge retail markup. Your designer sends files your printer says are unusable. Every option ends with you frustrated and still needing 500 business cards.",
    painPoints: [
      { text: "Your last batch of business cards came back with the logo cut off — because the \u201Cprint-ready\u201D file wasn't actually print-ready." },
      { text: "You're paying retail markup at the local shop because nobody will sell you wholesale unless you buy a printing press." },
      { text: "Your vehicle wrap quote came in at $4,500 and you have no idea if that's normal or a rip-off." },
      { text: "You need yard signs by Friday and every printer wants 10 business days plus a rush fee." },
      { text: "You designed a flyer in Canva, tried to upload it, and now you're debating whether to just hand-paint them." },
    ],
    offerEyebrow: "One shop · Design + production",
    offerHeadline: "Everything your brand needs",
    offerHighlight: "on paper, plastic, or vinyl",
    offerSubhead:
      "We design it, we print it, we deliver it. One invoice, one point of contact, one brand that stays consistent across every piece.",
    deliverables: [
      {
        title: "Business Cards & Stationery",
        description:
          "Matte, gloss, spot UV, soft-touch, luxe stocks. Letterhead, envelopes, notepads to match. Wholesale pricing passed through.",
      },
      {
        title: "Flyers, Brochures & Postcards",
        description:
          "Single sheet to tri-fold. Direct mail formats, rack cards, menus, handouts. Full design + print included.",
      },
      {
        title: "Banners & Signs",
        description:
          "Yard signs, A-frames, retractable banners, trade show displays, window graphics. Built to survive Georgia weather.",
      },
      {
        title: "Vehicle Wraps & Graphics",
        description:
          "Design, file prep, and installation coordination with trusted local installers. Partial wraps, full wraps, decals, lettering.",
      },
      {
        title: "Stickers, Labels & Apparel",
        description:
          "Die-cut stickers, product labels, custom t-shirts, hats, hoodies, and uniforms. Low minimums on most items.",
      },
      {
        title: "Large Format & Specialty",
        description:
          "Posters, wall graphics, door hangers, table throws, floor decals, menus laminated or printed on rigid substrate.",
      },
    ],
    gallery: {
      title: "Print work that actually goes to press.",
      description:
        "Brochures, business cards, flyers, mailers, book jackets, and CPG labels — production-ready files delivered to your printer's specs.",
      items: getServiceGalleryItems("print-design", {
        pinned: [
          "ans-brochure",
          "bloodstone-book",
          "gentlemencutz-flyer",
          "kls-flyer",
          "pruvit-mailer",
          "vpm-pools-flyer",
          "xm-cigars-cards",
          "scalehouse-cards",
          "musclehype-rage",
          "miracle-eyes-print",
          "simply-aminos-flavors",
          "total-holistic-tincture",
        ],
        limit: 12,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From file",
    processHighlight: "to finished print",
    process: [
      {
        step: "01",
        title: "Quote & Spec",
        subtitle: "Free",
        description:
          "Tell us what you need. We quote honestly — design + print, all-in, no surprise fees at the end.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Design",
        description:
          "We design it to match your brand. If you've already got brand assets, we use them. If not, we can fix that too.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Proof & Approval",
        description:
          "You approve a digital proof (and a physical proof for wraps or large runs) before anything hits the press.",
        icon: "Check",
      },
      {
        step: "04",
        title: "Print & Deliver",
        description:
          "Printed through our wholesale trade accounts, delivered to your door in Cumming, Forsyth County, or anywhere in North Metro Atlanta.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions we get",
    faqHighlight: "at every quote",
    faqs: [
      {
        q: "Do you handle printing too, or just design?",
        a: "Both — your choice. The Print + Source Bundle means we design it AND source the printing through Ink Spatter Studio, our production arm. One invoice, we manage the vendor, you get it delivered. Or you can take the print-ready files and send them to your own vendor. Same files either way.",
      },
      {
        q: "Can you design regulated product labels — supplements, food, cosmetics?",
        a: "Yes. 15+ years of FDA/FTC-compliant label design across supplements, food, beverage, and cosmetics. Nutrition Facts and Supplement Facts panels built to spec. FDA font size, allergen disclosures, country-of-origin, and net-weight placement handled correctly the first time. This is the work we're known for.",
      },
      {
        q: "Do you do dielines and print-ready files?",
        a: "Yes. Custom dielines for packaging (boxes, labels, blisters, sleeves) built in Illustrator. Print-ready PDFs with proper bleed, trim, safety margins, CMYK color, and embedded fonts. Our files don't come back from printers with 'please fix' questions.",
      },
      {
        q: "What software do you design in?",
        a: "Adobe Illustrator for vector (logos, labels, packaging, dielines). InDesign for multi-page (brochures, menus, catalogs, guidelines). Photoshop for raster (retouching, image manipulation, composites). Also Figma when it makes sense. Source files delivered on request.",
      },
      {
        q: "Why is the Print + Source bundle cheaper than my local print shop?",
        a: "We're not a print shop — we're a design studio with wholesale trade accounts via Ink Spatter Studio. We pass the wholesale pricing through plus a 15–20% production fee. You save the retail markup and get design that was built for the specific press it's printing on.",
      },
      {
        q: "What are your minimums?",
        a: "Low: 100 business cards, 25 flyers, 1 yard sign, 1 banner, 6 t-shirts. Most packaging starts at 250 units — supplement labels sometimes at 100. We quote to your volume honestly and flag when a different print method would save you money.",
      },
      {
        q: "How fast is turnaround?",
        a: "Design: 2 days (Simple) to 3 weeks (Complex packaging). Print (when sourced through us): business cards and flyers 3–5 business days; banners and signs 5–7 days; vehicle wraps 10–14 including install coordination; packaging 2–4 weeks depending on volume and finishing. Rush options usually available — just ask.",
      },
      {
        q: "Do you deliver in Cumming and Forsyth County?",
        a: "Yes. Free local delivery within 30 miles on Source-bundle orders over $250. Smaller orders ship at cost. Outside North Metro Atlanta, UPS Ground. Same-day pickup in Cumming available on completed local runs.",
      },
      {
        q: "Can you handle custom apparel and embroidery?",
        a: "Yes — screen print, DTF transfer, and embroidery on t-shirts, hoodies, polos, hats, and uniforms. Low minimums, wholesale pricing, branded to your colors and logo. Included in the Simple-to-Medium category bands depending on complexity.",
      },
      {
        q: "Can you work from my existing brand files?",
        a: "Yes. If you've got a brand guide (or a logo and color palette), we design inside those rules. If you don't have one and the project is bigger than a single card, we can build a short brand sheet as part of the job — or point you to the Branding service if you want the full system.",
      },
    ],
    pricing: {
      label: "Projects start at",
      price: "$75",
      unit: "/ job",
      note: "Business cards from $75. Banners from $120. Vehicle wraps from $1,200. Quote on request.",
      numericPrice: "75",
    },
    finalCta: {
      eyebrow: "Ready for real print without the runaround",
      headline: "Stop paying retail",
      highlightWord: "for Vistaprint quality",
      subhead:
        "Send us what you need and we'll come back with a real quote — usually within one business day. Design + print, wholesale pricing, delivered to your door.",
      ctaLabel: "Get a print quote",
    },
    related: ["branding", "logo-design", "web-design"],
    meta: {
      seoTitle:
        "Print Design in Cumming, GA — Packaging, Labels, Signage & Collateral",
      seoDescription:
        "Packaging, labels, menus, business cards, signage, and vehicle wraps for Cumming, GA & North Atlanta businesses. FDA-compliant label design, dielines, wholesale print sourcing via Ink Spatter Studio. From $75.",
      keywords: [
        "print services Cumming GA",
        "business card printing Cumming GA",
        "business card design Forsyth County",
        "flyer design Cumming",
        "flyer printing Atlanta",
        "brochure printing Cumming",
        "banner printing Forsyth County",
        "retractable banner Cumming",
        "yard sign printing Cumming GA",
        "vehicle wrap design Atlanta",
        "vehicle magnet Cumming",
        "postcard printing Forsyth County",
        "poster printing Atlanta",
        "menu printing Cumming GA",
        "sticker printing Cumming",
        "t-shirt printing Cumming GA",
        "custom apparel Cumming GA",
        "wholesale print Cumming",
        "trade show display Atlanta",
      ],
      ogImage: "/assets/services/print-services/hero.png",
      ogImageAlt:
        "Print services — business cards, banners, and vehicle wraps from Branding Zombie Designs in Cumming, GA",
    },
    schema: {
      serviceType: "Print Services",
      category: "Print Design & Production",
      description:
        "Business cards, flyers, brochures, banners, yard signs, vehicle wraps, menus, rack cards, postcards, posters, stickers, labels, custom apparel, and trade show displays for small businesses in Cumming, GA and North Metro Atlanta. Wholesale trade pricing. Fast local delivery.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // SOCIAL MEDIA
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "social-media",
    name: "Social Media",
    shortName: "Social",
    tagline: "Consistent content without the grind",
    iconSvg: "/assets/icon-social.svg",
    themeAccent: "cyan",
    homeCardPrice: "from $699/mo",
    homeCardDescription:
      "Show up consistently without spending your nights on Instagram.",
    hook: "Show up consistently without spending your nights on Instagram.",
    whoThisIsFor: [
      "Local businesses whose social feed is three months stale",
      "Brands posting randomly without a strategy or a voice",
      "Owners who know they 'should' be posting but genuinely don't have time",
      "DTC brands ready to treat social as a real sales channel, not an afterthought",
    ],
    tiers: [
      {
        name: "Starter",
        price: "$699/mo",
        priceNote: "Month-to-month",
        timeline: "Monthly",
        deliverables: [
          "1 platform (Instagram OR Facebook OR LinkedIn)",
          "12 posts per month, custom-designed in your brand",
          "Caption copy in your voice",
          "Content calendar delivered monthly for your approval",
          "Monthly performance report",
        ],
        bestFor:
          "Local businesses keeping a consistent presence without the burn-out.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Growth",
        price: "$1,299/mo",
        priceNote: "Month-to-month",
        timeline: "Monthly",
        isFeature: true,
        deliverables: [
          "2 platforms (Instagram + Facebook, or Instagram + LinkedIn, etc.)",
          "20 posts per month — mix of grid posts, stories, and reels",
          "DM and comment monitoring with 48-hour response SLA",
          "Bi-weekly performance reports",
          "Quarterly strategy + content-pillar review",
          "One light photo shoot per quarter (existing locations)",
        ],
        bestFor:
          "Businesses actively growing a social audience — where consistency compounds.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Full Management",
        price: "$2,499/mo",
        priceNote: "Month-to-month",
        timeline: "Monthly",
        deliverables: [
          "3 platforms + TikTok or YouTube Shorts",
          "30+ posts per month including video content",
          "Active community management — comments, DMs, tags",
          "Paid ad management (ad spend separate to Meta/Google)",
          "Weekly reporting + monthly strategy call",
          "Quarterly studio shoot for fresh content",
        ],
        bestFor:
          "Brands treating social as a real sales channel and wanting someone to own the whole stack.",
        ctaLabel: "Book a strategy call",
      },
    ],
    calloutText:
      "Content designed by someone with 15+ years in CPG and ecommerce design — not recycled Canva templates.",
    hero: {
      eyebrow: "Social Media · Cumming, GA",
      headline: "Show up consistently without",
      highlightWord: "losing your nights to Instagram",
      subhead:
        "Done-for-you content creation, scheduling, and community management for Instagram, Facebook, LinkedIn, and TikTok — for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Real content, real engagement, in your voice.",
      ctaLabel: "Book a free content audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/social-media/hero.png",
        alt: "Dark editorial Instagram content grid floating in 3D — Branding Zombie Designs social media in Cumming, GA",
      },
      microProof: "From $699/mo · Month-to-month · 30+ brands built up",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your feed looks",
    painPointsHighlight: "completely abandoned",
    painPointsIntro:
      "Everyone says you need to post three times a week. Nobody says what to post, when to post it, or where you're supposed to find the time between running the actual business.",
    painPoints: [
      { text: "Your last Instagram post was two months ago and you're losing followers every week." },
      { text: "You have no idea what to post, so you don't post — which guarantees the algorithm forgets you." },
      { text: "The posts you do make look nothing like your brand because you're using random stock images from Canva." },
      { text: "You hired a niece / intern / cousin to \u201Chandle social\u201D and the results match what you paid." },
      { text: "Every marketing guru says TikTok is the answer and you'd rather do anything than learn TikTok." },
    ],
    offerEyebrow: "One monthly engagement · All channels covered",
    offerHeadline: "Content that",
    offerHighlight: "actually ships",
    offerSubhead:
      "A real social media operator running your feeds — not a template bot, not an AI poster, not a content calendar you're supposed to fill in yourself.",
    deliverables: [
      {
        title: "Monthly Content Calendar",
        description:
          "12 posts per month across Instagram and Facebook, planned a month ahead and approved by you before anything goes live.",
      },
      {
        title: "Custom Post Design",
        description:
          "On-brand graphics, photo edits, and caption copy — not stock templates. Each piece built specifically for your audience and your voice.",
      },
      {
        title: "Scheduling & Publishing",
        description:
          "Posts automatically go out at the best times for your audience. You don't need to touch anything.",
      },
      {
        title: "Stories & Reels",
        description:
          "4 story posts per week and 2 short-form video edits per month. We turn your existing photos into scroll-stopping content.",
      },
      {
        title: "Community Management",
        description:
          "Comments and DMs monitored daily, responses sent in your voice (after we agree on boundaries). You stay connected without living in the app.",
      },
      {
        title: "Monthly Report",
        description:
          "Reach, engagement, follower growth, and which posts performed best. Plus what we're adjusting next month.",
      },
    ],
    gallery: {
      title: "Paid + organic creative we've shipped.",
      description:
        "Lifestyle banners, IG-feed posts, influencer UGC, and campaign work for supplement, beauty, and lifestyle brands. The kind of post that stops a thumb.",
      items: getServiceGalleryItems("social-media", {
        pinned: [
          "yanzopanzo-ugc",
          "josh-bnox-banner",
          "rita-carnitine",
          "ans-ad",
          "bnox-tropical",
          "swet-campaign",
          "dmax10-watermelon",
          "test-pro-multivitamin",
          "simply-aminos-lifestyle",
          "shield-labs-multi",
          "betancourt-intro",
        ],
        limit: 11,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From ghosting your feed",
    processHighlight: "to showing up",
    process: [
      {
        step: "01",
        title: "Content Audit",
        subtitle: "Free",
        description:
          "We review your current accounts, your competitors, and what your audience actually responds to. You get an honest report either way.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Voice & Strategy",
        description:
          "We nail down your voice, your content pillars, and your posting schedule. Everything we make going forward ladders back to this.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Content Production",
        description:
          "Every month, you get a calendar of posts to approve. Once approved, we schedule everything — you don't have to open Instagram unless you want to.",
        icon: "PencilSimple",
      },
      {
        step: "04",
        title: "Report & Optimize",
        description:
          "End of each month: a 1-page report with what worked, what didn't, and what we're changing. We iterate based on real performance, not vibes.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions business owners",
    faqHighlight: "ask before they sign up",
    faqs: [
      {
        q: "Which platforms do you support?",
        a: "Instagram, Facebook, LinkedIn, TikTok, and Pinterest. Starter covers one platform of your choice; Growth covers two; Full Management covers three plus TikTok or YouTube Shorts. We don't push every platform on every business — we recommend where your customers actually are.",
      },
      {
        q: "Do I need to provide photos?",
        a: "Helpful, not required. Growth tier includes one light photo shoot per quarter of your existing locations, products, or team. Full Management includes a full quarterly studio shoot. We can also design graphics, infographics, and motion-graphic content from scratch when you don't have imagery to pull from.",
      },
      {
        q: "Who writes the captions?",
        a: "We do, in your voice. Onboarding includes a short voice-sample interview (or we reverse-engineer from your existing best posts). Every month, you see the whole calendar and approve captions before anything publishes. No midnight surprises.",
      },
      {
        q: "Can you respond to comments and DMs?",
        a: "Yes — Growth tier and above. We monitor with a 48-hour response SLA on Growth, same-day on Full Management. We'll agree on boundaries at kickoff (what we answer, what gets escalated, what tone to hold) so nothing goes sideways.",
      },
      {
        q: "What's included in \"ad management\" on Full Management?",
        a: "Campaign strategy, audience setup, creative production, pixel + conversion tracking, weekly optimization, and monthly reporting. Ad spend is paid separately directly to Meta, Google, TikTok, or LinkedIn — we never mark it up. As a rule of thumb, most local businesses start with $500–$2,000/mo in spend on top of our fee.",
      },
      {
        q: "Is there a contract?",
        a: "No long-term lock-in. Month-to-month, 30 days notice to cancel. Social is a relationship, and we'd rather earn the next month than hold you hostage for twelve.",
      },
      {
        q: "How long until I see results?",
        a: "Consistency shows up in reach at 30 days, engagement at 60, and follower growth at 90. Local businesses often see bookings from social in month 2 once the algorithm recognizes the consistency. If nothing is moving by month 3, something's wrong and we'll name it honestly.",
      },
      {
        q: "What if I hate the first month of content?",
        a: "The first 30 days are a calibration period — we over-communicate, you over-correct, and we hit voice + visual by month 2. If after month 1 you want out, you cancel and keep every piece of content we made. No hostage-taking, no argument.",
      },
      {
        q: "Can you help with TikTok even if we've never touched it?",
        a: "Yes. TikTok is in Full Management. We handle account setup, content format strategy, trending-audio awareness, and editing — you don't need to dance or be on camera unless you want to. Local businesses are consistently under-indexed on TikTok and that's opportunity.",
      },
      {
        q: "Do I own the content if we stop working together?",
        a: "Yes. Every asset we design, every caption we write, every edited photo — yours. Delivered in a shared drive at the end of each month. If you ever leave, you take the whole archive.",
      },
    ],
    pricing: {
      label: "Monthly plans start at",
      price: "$699",
      unit: "/ month",
      note: "Month-to-month. Growth at $1,299 and Full Management at $2,499 cover more platforms, video, community management, and ads. Also available: one-time Strategy + 90-day Content Calendar — $499.",
      numericPrice: "699",
    },
    finalCta: {
      eyebrow: "Ready to stop ghosting your feed",
      headline: "Your audience already follows you.",
      highlightWord: "Start showing up for them.",
      subhead:
        "Book a free 20-minute content audit. We'll look at your current feeds, your competitors, and what your audience actually wants — and give you an honest plan either way.",
      ctaLabel: "Book a free content audit",
    },
    related: ["logo-design", "ai-workflows", "web-design"],
    meta: {
      seoTitle:
        "Social Media Management in Cumming, GA — From $699/mo",
      seoDescription:
        "Done-for-you Instagram, Facebook, LinkedIn, and TikTok content for small businesses in Cumming, GA & Forsyth County. Starter $699/mo · Growth $1,299/mo · Full Management $2,499/mo. Call (770) 744-2536.",
      keywords: [
        "social media management Cumming GA",
        "social media marketing Forsyth County",
        "Instagram management Cumming",
        "TikTok content creation Atlanta",
        "Facebook ads Cumming GA",
        "content creation small business Georgia",
        "social media manager Cumming GA",
        "Instagram content Atlanta",
        "small business social media Georgia",
        "done for you social media Forsyth County",
      ],
      ogImage: "/assets/services/social-media/hero.png",
      ogImageAlt:
        "Social media management for small businesses in Cumming, GA — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Social Media Management",
      category: "Social Media Marketing",
      description:
        "Done-for-you social media management for small businesses in Cumming, GA and across North Metro Atlanta — content creation, scheduling, community management, and monthly reporting for Instagram, Facebook, and TikTok. Plans start at $400/month with no long-term contracts.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // ECOMMERCE
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "ecommerce",
    name: "Ecommerce",
    shortName: "Ecom",
    tagline: "Shopify stores built to actually move product",
    iconSvg: "/assets/icon-ecommerce.svg",
    themeAccent: "neon",
    homeCardPrice: "from $3,000",
    homeCardDescription:
      "Selling online without the tech stress. Shopify, WooCommerce, or custom — we handle it.",
    hook: "Selling online without the tech stress. Shopify, WooCommerce, or custom — we handle it.",
    whoThisIsFor: [
      "Product brands launching their first real online store",
      "Service businesses selling digital products, bookings, or gift cards",
      "Businesses graduating from Etsy, Square, or Marketplaces to their own storefront",
      "Shops stuck on a Shopify theme that looks like everyone else's and won't convert",
    ],
    tiers: [
      {
        name: "Starter",
        price: "$3,000",
        timeline: "3 weeks",
        deliverables: [
          "Shopify or WooCommerce setup + launch",
          "Up to 25 products loaded with SEO-ready copy",
          "Theme customized to your brand (not a stock template)",
          "Payment gateway + tax + shipping configured",
          "Basic on-page SEO + GA4 event tracking",
          "Launch training + written cheat sheet",
        ],
        bestFor:
          "Small product lines getting online fast without overbuilding.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Growth",
        price: "$5,500",
        timeline: "4 weeks",
        isFeature: true,
        deliverables: [
          "Up to 100 products, fully custom theme (never a stock skin)",
          "Klaviyo email flows — welcome, abandoned cart, post-purchase",
          "Conversion rate optimization — CTAs, trust blocks, reviews, upsell",
          "Product photo retouching — up to 40 images cleaned and sized",
          "Abandoned cart recovery + checkout optimization",
          "30-day post-launch tuning window",
        ],
        bestFor:
          "DTC brands building a real direct-to-consumer channel.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Premium",
        price: "$8,500+",
        timeline: "5–8 weeks",
        deliverables: [
          "Unlimited products + multi-collection architecture",
          "Custom functionality — subscriptions, bundles, quizzes, gifting",
          "Advanced analytics + A/B testing setup",
          "Wholesale / B2B portal with tiered pricing",
          "3D product visualization (Blender) where it helps sell",
          "60 days of post-launch support + performance tuning",
        ],
        bestFor:
          "Brands scaling DTC, launching subscription, or adding a wholesale channel.",
        ctaLabel: "Book a scoping call",
      },
    ],
    calloutText:
      "Klaviyo-certified. Shopify Partner. 30+ brands launched — from single-SKU garage startups to brands doing real volume across DTC and wholesale.",
    hero: {
      eyebrow: "Ecommerce · Cumming, GA",
      headline: "Sell online without",
      highlightWord: "the tech tax",
      subhead:
        "Custom Shopify and BigCommerce stores built for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Product catalogs, checkout optimization, payment processing, and launch — all handled, nothing left half-done.",
      ctaLabel: "Book a free store audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/ecommerce/hero.png",
        alt: "Dark warehouse with floating product packaging and glowing checkout UI — Branding Zombie Designs ecommerce in Cumming, GA",
      },
      microProof: "From $3,000 · 3–6 week delivery · Shopify + BigCommerce",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your store is",
    painPointsHighlight: "leaking money",
    painPointsIntro:
      "Having a store is easy. Having a store that actually ships orders, handles taxes, and converts visitors into customers is where 90% of small-business ecommerce falls apart.",
    painPoints: [
      { text: "Your Etsy shop is the only way you sell online and the fees are eating your margin alive." },
      { text: "You set up Shopify six months ago, got as far as adding two products, and then the dashboard scared you off." },
      { text: "People add to cart and then abandon — and you have no idea why or what to do about it." },
      { text: "You have no idea how to handle sales tax for out-of-state orders and you're pretty sure that's a problem." },
      { text: "Your product photos are iPhone shots on your kitchen counter and they look exactly like iPhone shots on your kitchen counter." },
    ],
    offerEyebrow: "One engagement · Fully-launched store",
    offerHeadline: "A store you can",
    offerHighlight: "actually run",
    offerSubhead:
      "Everything you need to sell online without being an ecommerce developer — design, catalog, checkout, payment, and launch handoff. Built on Shopify or BigCommerce depending on what fits you best.",
    deliverables: [
      {
        title: "Custom Theme Design",
        description:
          "Shopify or BigCommerce theme designed around your brand — not a template that five other stores are already using.",
      },
      {
        title: "Product Catalog Setup",
        description:
          "Up to 50 products loaded with photos, descriptions, variants, inventory, and SEO-optimized URLs. We handle the first batch, you clone the pattern.",
      },
      {
        title: "Checkout Optimization",
        description:
          "Abandoned cart recovery, one-page checkout, guest checkout, upsells, and shipping calculators. Every friction point smoothed out.",
      },
      {
        title: "Payment & Tax Setup",
        description:
          "Stripe, Shop Pay, Apple Pay, PayPal, Afterpay. Sales tax automation. Fraud protection. Local pickup if you want it.",
      },
      {
        title: "Shipping & Fulfillment",
        description:
          "Shipping zones, rates, labels, pickup locations, and integration with ShipStation or Shopify's built-in tools. Real automation, not manual labels.",
      },
      {
        title: "Launch Training",
        description:
          "A 1-hour walkthrough at launch plus a written cheat sheet so you can add products, handle refunds, and update inventory without calling us every time.",
      },
    ],
    gallery: {
      title: "Stores we've launched and scaled.",
      description:
        "Shopify and custom builds across DTC supplements, streetwear, food, and home goods. From single-SKU launches to 75-product catalogs.",
      items: getServiceGalleryItems("ecommerce", {
        pinned: [
          "planters-etc",
          "squeeze-me-skinny",
          "muscleology",
          "pure-blanco",
          "papas-kitchen",
          "jay-scotts",
          "solaravita-amazon",
          "vyotech-b4u",
          "possema-package-print",
          "365-functional-foods",
        ],
        limit: 10,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From \u201CI should sell online\u201D",
    processHighlight: "to first order",
    process: [
      {
        step: "01",
        title: "Discovery & Audit",
        subtitle: "Free",
        description:
          "We walk through your products, your customers, and your current setup (Etsy, Square, Shopify, nothing). We recommend a platform and scope the build honestly.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Design & Build",
        description:
          "Custom theme designed to your brand, catalog architecture, checkout flow, and payment integration. You see progress weekly in a staging store you can click through.",
        icon: "PencilSimple",
      },
      {
        step: "03",
        title: "Catalog & Content",
        description:
          "We load your first batch of products (up to 50), write SEO descriptions, set up collections, and configure inventory. You clone the pattern for future products.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Launch & Training",
        description:
          "DNS, payment gateway, taxes, shipping, fraud protection, email flows — all flipped on. 1-hour training + written cheat sheet for running it day-to-day.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions small-business owners",
    faqHighlight: "always ask",
    faqs: [
      {
        q: "Shopify vs WooCommerce vs custom — which is right for me?",
        a: "For most small businesses in Cumming and North Atlanta, Shopify wins — easier day-to-day, bigger app ecosystem, better themes, faster launch. WooCommerce wins if you're already deep in WordPress or need total control over every checkout byte. Custom only when you're doing something genuinely unusual. We recommend on the discovery call based on what you're actually trying to sell.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "Yes. We migrate from Etsy, Square, Wix, WooCommerce, Squarespace, BigCommerce, and custom platforms. Products, customers, orders, and URLs — with proper 301 redirects so you don't lose SEO. Migration fee usually $1,000–$2,500 on top of the build, depending on catalog size and data hygiene.",
      },
      {
        q: "What does a Shopify build actually cost?",
        a: "Starter (25 products, custom theme, full launch) is $3,000. Growth (100 products + Klaviyo flows + CRO) is $5,500 — our most popular tier. Premium (subscriptions, wholesale, B2B, custom functionality) starts at $8,500. Every tier is flat-priced, no hourly surprises. Discovery call is free.",
      },
      {
        q: "Do you handle product photography?",
        a: "Yes — two paths. Traditional studio photography for product shots (you ship us samples, we shoot) runs $25–$75 per image depending on complexity. Or, where it makes sense, we do 3D product visualization in Blender — especially useful for packaging mockups, color variants, or products that don't physically exist yet. That's unusual in our market and it's a real differentiator.",
      },
      {
        q: "What about email marketing setup?",
        a: "Yes. Klaviyo and Mailchimp are both in scope. Growth tier includes three core flows configured — welcome series, abandoned cart recovery, and post-purchase. Premium expands into segmentation, win-back, and replenishment flows. Ad spend and subscription fees are separate.",
      },
      {
        q: "Can you do subscriptions, bundles, or quizzes?",
        a: "Yes. Subscription boxes via Recharge or Shopify Subscriptions. Bundle + upsell via Bold or native Shopify. Quiz-driven product recommendations via Octane AI or a custom build. These sit in the Premium tier — they pay for themselves fast when executed right.",
      },
      {
        q: "Can you set up a wholesale or B2B portal?",
        a: "Yes. Tiered pricing, gated collections, net-30 terms, minimum order quantities, buyer-specific catalogs, the works. Shopify Plus has this built in; on regular Shopify we use apps like Wholesale Gorilla or a custom-coded portal. Scoped in Premium.",
      },
      {
        q: "How does sales tax work?",
        a: "Automated through Shopify Tax or TaxJar on launch — rates, remittance rules, and marketplace-facilitator handling all wired in. You still need to register for sales tax permits in the states where you have nexus; we explain that on launch and point you to an accountant if you don't have one.",
      },
      {
        q: "Will you help me run the store after launch?",
        a: "Yes. Monthly care plans from $200/month cover theme updates, product additions, content changes, performance monitoring, and minor customizations. Month-to-month, cancel anytime. Or run it yourself — the training and written cheat sheet make that genuinely doable.",
      },
      {
        q: "How is this different from a $99/month Shopify template or a $399 Shopify Launchpad agency?",
        a: "Templates get you a store; they don't get you conversions. Templated agencies run hundreds of stores on the same five themes — yours will look like four other companies in your category. We build custom, we know Klaviyo, and we've launched 30+ brands including real DTC winners. When that math doesn't work for you, we'll say so on the call.",
      },
    ],
    pricing: {
      label: "Ecommerce builds start at",
      price: "$3,000",
      unit: "/ store",
      note: "Larger catalogs, subscriptions, and custom functionality quoted on the discovery call.",
      numericPrice: "3000",
    },
    finalCta: {
      eyebrow: "Ready to sell online for real",
      headline: "Your customers are ready to buy.",
      highlightWord: "Build the store that lets them.",
      subhead:
        "Book a free 20-minute store audit. We'll look at what you've got, tell you what platform fits, and give you a clear price and timeline — whether we build it or you do.",
      ctaLabel: "Book a free store audit",
    },
    related: ["web-design", "ai-workflows", "logo-design"],
    meta: {
      seoTitle:
        "Shopify & Ecommerce Developer in Cumming, GA — From $3,000",
      seoDescription:
        "Custom Shopify & WooCommerce stores for small businesses in Cumming, GA & North Atlanta. Catalog, checkout, Klaviyo flows, subscriptions, wholesale. Starter $3,000 · Growth $5,500 · Premium $8,500+. Call (770) 744-2536.",
      keywords: [
        "Shopify ecommerce Georgia",
        "Shopify designer Cumming GA",
        "Shopify developer Atlanta",
        "ecommerce website Cumming GA",
        "online store design Forsyth County",
        "ecommerce development Alpharetta",
        "custom Shopify theme Atlanta",
        "BigCommerce Cumming GA",
        "WooCommerce developer Georgia",
        "Etsy to Shopify migration Atlanta",
        "product photography setup Cumming",
        "small business ecommerce Georgia",
        "Shopify expert Forsyth County",
      ],
      ogImage: "/assets/services/ecommerce/hero.png",
      ogImageAlt:
        "Shopify ecommerce development for small businesses in Cumming, GA — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Ecommerce Development",
      category: "Ecommerce Development Services",
      description:
        "Custom Shopify and BigCommerce store design and development for small businesses in Cumming, GA and across North Metro Atlanta — theme design, catalog setup, checkout optimization, payment integration, and launch training. Builds from $3,000.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // LOGO DESIGN
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "logo-design",
    name: "Logo Design",
    shortName: "Logo",
    tagline: "A logo that earns a second look — not a second draft",
    iconSvg: "/assets/SVG/graphic-design-icon.svg",
    themeAccent: "neon",
    homeCardPrice: "from $750",
    homeCardDescription:
      "A real identity for your business — not a Fiverr logo or an AI generator mistake.",
    hook: "A logo that earns a second look — not a second draft.",
    whoThisIsFor: [
      "Startups and new businesses that need a real mark — not a generator logo",
      "Established businesses whose logo is showing its age",
      "Anyone who's been burned by Fiverr and wants it done right the first time",
      "Founders prepping for print, signage, or a site launch and tired of the placeholder",
    ],
    tiers: [
      {
        name: "Starter",
        price: "$750",
        timeline: "7 days",
        deliverables: [
          "Single logo mark (primary lockup)",
          "2 concept directions to pick from",
          "2 rounds of revision on the chosen direction",
          "Full file package — PNG, JPG, SVG, PDF in color and mono",
        ],
        bestFor:
          "New businesses that need a clean, professional mark without overbuilding the identity.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Growth",
        price: "$1,500",
        timeline: "10 days",
        isFeature: true,
        deliverables: [
          "Full logo suite — primary, secondary, icon, horizontal, and stacked",
          "3 concept directions to pick from",
          "Unlimited revisions on the chosen direction",
          "Every file format you'll ever need — and a handful you won't",
          "Basic style sheet — color hex codes and typography",
        ],
        bestFor:
          "Businesses that need a logo to work across signage, web, social, packaging, and print without compromise.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Premium",
        price: "$2,500",
        timeline: "14 days",
        deliverables: [
          "Everything in Growth",
          "Custom typography exploration — a wordmark that isn't on Google Fonts",
          "8–10 page mini brand guide",
          "Social avatar set (IG, FB, LinkedIn, TikTok, YouTube)",
          "Favicon + app icon",
          "Printed mockups on real collateral (cards, shirts, signage)",
        ],
        bestFor:
          "Brands that want a polished, distinctive identity that feels considered from day one.",
        ctaLabel: "Book a scoping call",
      },
    ],
    calloutText:
      "30+ brands launched across CPG, retail, restaurants, service, and DTC. A logo from someone who knows how it has to work at 1200px on a website — and at 1 inch on a business card.",
    hero: {
      eyebrow: "Logo Design · Cumming, GA",
      headline: "A logo that",
      highlightWord: "earns a second look",
      subhead:
        "Custom logo design for startups and small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Real concepts from a human. Full file packages. No AI generators, no Fiverr templates, no regrets.",
      ctaLabel: "Book a free logo consultation",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/logo-design/hero.png",
        alt: "Logo design sketches and vector explorations on a dark editorial desk — Branding Zombie Designs in Cumming, GA",
      },
      microProof: "From $750 · 7–14 day delivery · 30+ brands launched",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your logo is",
    painPointsHighlight: "holding you back",
    painPointsIntro:
      "A weak logo isn't just a visual problem. It's a trust problem. Customers clock it in the first half-second and their wallet gets five seconds slower.",
    painPoints: [
      { text: "You bought a $50 logo on Fiverr and every time you see it on a business card, you wince." },
      { text: "You paid ChatGPT or Midjourney to 'design' something and your logo has six fingers." },
      { text: "Your logo looked fine on your first flyer and horrible the minute you had to put it on a shirt." },
      { text: "Your current mark is fifteen years old and nobody under forty is taking you seriously." },
      { text: "You've got a beautiful business and a logo that looks like a clip-art placeholder." },
    ],
    offerEyebrow: "What you get",
    offerHeadline: "A real mark,",
    offerHighlight: "built to hold up",
    offerSubhead:
      "Every logo project starts with the business, not the mood board. We figure out what your customers see first, what they remember, and what sets you apart — then we design a mark that carries that into every place your brand shows up.",
    deliverables: [
      {
        title: "Real Design, No Generators",
        description:
          "Every concept is drawn from scratch in vector software by a human with 15+ years doing this. No AI, no templates, no recycled marks.",
      },
      {
        title: "Multiple Concepts",
        description:
          "You pick from real options — not one direction we hope you like. 2 on Starter, 3 on Growth and Premium.",
      },
      {
        title: "Full File Package",
        description:
          "PNG, JPG, SVG, PDF. Color, mono, and reverse. Print-ready and web-ready. Delivered in a single organized folder.",
      },
      {
        title: "Variations That Actually Work",
        description:
          "Primary lockup, stacked, horizontal, icon-only, wordmark-only. So your logo works on signage and on a tiny social avatar.",
      },
      {
        title: "Full Ownership",
        description:
          "Full rights transferred on final payment. Trademark, reproduce, resell the business — the logo is yours, period.",
      },
      {
        title: "Clear Revision Process",
        description:
          "Starter gets 2 rounds, Growth and Premium are unlimited on the chosen direction. Scope is clear upfront so nobody loses their mind.",
      },
    ],
    gallery: {
      title: "Marks we've drawn — healthcare, fitness, retail, CPG.",
      description:
        "Real logo systems delivered with full file kits. Some standalone marks; some leading full brand families on shelf.",
      items: getServiceGalleryItems("logo-design", {
        pinned: [
          "kids-life-solutions-logo",
          "hospital2home-logo",
          "miami-pavement-logo",
          "macefit-logo",
          "thrasher-beard-oil",
          "calipharms-cbd",
          "ultra-shred",
          "electro-shock",
          "goodlife-creatine",
          "elan-immuno",
        ],
        limit: 10,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From brief",
    processHighlight: "to files delivered",
    process: [
      {
        step: "01",
        title: "Brief",
        subtitle: "Free",
        description:
          "A 30-minute call covers your business, customers, competitors, and the gut-feeling words that should come to mind when someone sees your mark.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Concepts",
        description:
          "2–3 real directions, each with rationale — not 'here are ten fonts on a circle.' You pick the one that feels right for the business, not the one your cousin liked.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Refine",
        description:
          "Chosen direction gets refined through rounds of revision — weight, spacing, proportion, color. We stop when it's right, not when we hit the clock.",
        icon: "PencilSimple",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Full file package in a tidy folder. Color, mono, print-ready, web-ready, transparency everywhere you need it. Plus the bonus deliverables at the Growth and Premium tiers.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions people ask",
    faqHighlight: "right before they book",
    faqs: [
      {
        q: "How is this different from a $50 logo on Fiverr?",
        a: "A Fiverr logo is a gig-economy mashup — fast, cheap, and usually recycled across twelve other businesses without you knowing. Here you're paying for fifteen-plus years of real launches, 2–3 custom concepts drawn by a human, a real revision process, and a mark that was designed specifically for your business. You can absolutely get cheaper. You cannot usually get different.",
      },
      {
        q: "Do I own the logo after you design it?",
        a: "Yes — full rights transferred on final payment. Trademark it, sell the business with it, put it on a billboard. It's yours, no royalties, no licensing fees, no fine print.",
      },
      {
        q: "What if I don't like any of the concepts?",
        a: "It's rare, but it happens. The brief phase is specifically designed to prevent it — we align on direction words and visual mood before we design anything. If we still miss, we do one more round of concepts at no charge. If we miss twice, we refund 50% of the deposit and wish you well.",
      },
      {
        q: "Can I upgrade to a full brand package later?",
        a: "Yes. If you start with Starter or Growth and later want a full brand identity (colors, typography, guidelines, collateral), we credit your logo fee toward the Branding service. You're never paying for work twice.",
      },
      {
        q: "How many revisions do I get?",
        a: "Starter: 2 rounds of revision on your chosen concept. Growth and Premium: unlimited on the chosen direction. Revisions are on the picked direction — not starting over with a new concept after round 3, which is how scope creep kills logo projects.",
      },
      {
        q: "How fast can you actually turn this around?",
        a: "Starter: 7 days from brief to final files. Growth: 10 days. Premium: 14 days. Rush timelines (48–72 hours) are available for a 50% rush fee if you've got a signage deadline or a pitch.",
      },
      {
        q: "Will I get a trademark-ready logo?",
        a: "We design for trademarkability — distinctive, not generic — but we don't do the trademark filing itself. We can refer you to a trademark attorney in North Atlanta if you want to pursue registration.",
      },
      {
        q: "What file formats do I get?",
        a: "SVG and PDF (vector, scale infinitely), PNG with transparent background (web and digital), JPG (email attachments, Office docs), and EPS if your print vendor asks for it. Color, mono/black, and reverse/white versions of each.",
      },
      {
        q: "Can you redesign my existing logo instead of starting from scratch?",
        a: "Yes. Logo refresh is a common project — we keep what has equity (color, silhouette, letterforms) and modernize what's dated. Usually quoted at the Growth tier. If the existing mark has no equity worth keeping, we'll tell you and scope a full redesign.",
      },
      {
        q: "I've been burned by a cheap logo before. How do I know this will be different?",
        a: "Two ways. One: see the work at /#portfolio — 30+ brands launched across industries, with real URLs and real marks. Two: the 30-minute discovery brief is free. If after that call you don't believe we're the right fit, you don't owe a dollar.",
      },
    ],
    pricing: {
      label: "Logo projects start at",
      price: "$750",
      unit: "/ project",
      note: "Growth at $1,500 is our most requested tier. Premium at $2,500 includes a mini brand guide and printed mockups.",
      numericPrice: "750",
    },
    finalCta: {
      eyebrow: "Ready for a logo that actually works",
      headline: "Stop apologizing for your old logo.",
      highlightWord: "Start showing up like the brand you are.",
      subhead:
        "Book a free 30-minute brief. Walk away with a clear plan, a clear timeline, and a clear price — whether we end up designing it or not.",
      ctaLabel: "Book a free logo consultation",
    },
    related: ["branding", "web-design", "print-design"],
    meta: {
      seoTitle: "Logo Design in Cumming, GA — From $750",
      seoDescription:
        "Custom logo design for small businesses in Cumming, GA & Forsyth County. No templates, no generators — 30+ brands launched. Starter $750 · Growth $1,500 · Premium $2,500. Call (770) 744-2536.",
      keywords: [
        "logo design Cumming GA",
        "custom logo designer Forsyth County",
        "small business logo design Georgia",
        "logo designer North Atlanta",
        "professional logo Cumming",
      ],
      ogImage: "/assets/services/logo-design/hero.png",
      ogImageAlt:
        "Custom logo design for small businesses in Cumming, GA — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Logo Design",
      category: "Logo & Identity Design",
      description:
        "Custom logo design for startups and small businesses in Cumming, GA and across North Metro Atlanta — primary marks, full logo suites, custom typography, and mini brand guides. Real concepts from a human designer with 15+ years in the trenches. From $750.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // BRANDING (FULL IDENTITY)
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "branding",
    name: "Branding",
    shortName: "Brand",
    tagline: "A complete identity — logo, colors, voice, and the rules that hold it together",
    iconSvg: "/assets/SVG/graphic-design-icon.svg",
    themeAccent: "neon",
    homeCardPrice: "from $2,500",
    homeCardDescription:
      "A full brand identity — not just a logo. Colors, voice, typography, and the guidelines that keep it consistent.",
    hook: "A complete brand identity — logo, colors, voice, and the rules that keep it all consistent.",
    whoThisIsFor: [
      "Founders launching a new product or service brand",
      "Small businesses tired of looking inconsistent across touchpoints",
      "Companies preparing to scale — and needing guidelines in place before they do",
      "Restaurants, salons, and service businesses that want to look like a brand, not a storefront",
    ],
    tiers: [
      {
        name: "Starter",
        price: "$2,500",
        timeline: "2 weeks",
        deliverables: [
          "Full logo suite (from Logo Growth tier)",
          "Color palette — primary, secondary, accents (with hex, CMYK, Pantone)",
          "Typography system — display, body, and fallback web fonts",
          "1-page brand sheet — the one-pager your team can share",
        ],
        bestFor:
          "Solo operators and micro-businesses that need a consistent look across a handful of touchpoints.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Growth",
        price: "$4,500",
        timeline: "3 weeks",
        isFeature: true,
        deliverables: [
          "Everything in Starter",
          "10–15 page brand guidelines document",
          "Brand voice + messaging guide (tone, do's and don'ts, sample copy)",
          "3 collateral templates — business card, letterhead, and one social template",
          "Reusable Figma or Canva library for your team",
        ],
        bestFor:
          "Small businesses ready to scale their visual presence without it fracturing along the way.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Premium",
        price: "$7,500+",
        timeline: "4–6 weeks",
        deliverables: [
          "Everything in Growth",
          "Brand strategy — positioning, audience definition, messaging framework",
          "20+ page comprehensive guidelines document",
          "6+ collateral assets (pick from cards, postcards, packaging, presentation deck, social, email)",
          "Launch support — rollout plan + asset templates for the first 90 days",
        ],
        bestFor:
          "Growing brands with funding, multiple stakeholders, or scaling plans that need the strategy and the system.",
        ctaLabel: "Book a scoping call",
      },
    ],
    calloutText:
      "Built by a creative director with 15+ years across CPG, retail, restaurants, and service businesses — a system that holds up when your business grows faster than your design team.",
    hero: {
      eyebrow: "Branding · Cumming, GA",
      headline: "Look like a brand,",
      highlightWord: "not a side project",
      subhead:
        "Full brand identity for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Logo, colors, voice, typography, and the guidelines that keep everything consistent when you're not the one making the next asset.",
      ctaLabel: "Book a free brand review",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/branding/hero.png",
        alt: "Brand identity system pages and collateral mockups — Branding Zombie Designs in Cumming, GA",
      },
      microProof: "From $2,500 · 2–6 week delivery · 30+ brands launched",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your brand looks like",
    painPointsHighlight: "five different companies",
    painPointsIntro:
      "You've got a logo. A website. A Facebook page. A storefront. Business cards from 2019. And none of them feel like they belong to the same business — because they don't, not really.",
    painPoints: [
      { text: "Your website, your Instagram, and your business card use three different versions of your logo." },
      { text: "You can't answer the question 'what colors is your brand' without looking at something." },
      { text: "Every new piece of collateral starts from scratch because you can't find the file from last time." },
      { text: "You hired a new designer and they asked 'what's your brand' and you realized you had no good answer." },
      { text: "Your business is growing and the visual inconsistency is starting to look like a tell." },
    ],
    offerEyebrow: "What you get",
    offerHeadline: "A system,",
    offerHighlight: "not a mood board",
    offerSubhead:
      "Branding isn't a logo plus three mood-board images. It's the operating manual for how your business shows up in the world — written down, easy to use, impossible to misinterpret.",
    deliverables: [
      {
        title: "Full Logo Suite",
        description:
          "Primary, secondary, icon, and wordmark variations. Delivered across color, mono, and reverse. Ready for every medium you'll ever use.",
      },
      {
        title: "Color System",
        description:
          "Primary, secondary, and accent colors. Hex for web, CMYK for print, Pantone for branded merch. Plus guidance on when to use which.",
      },
      {
        title: "Typography System",
        description:
          "Display and body pairings. Web-safe fallbacks. A hierarchy for headlines, body, captions, and CTAs — so every page you ever make looks like it belongs.",
      },
      {
        title: "Brand Voice Guide",
        description:
          "How your brand talks. Tone words, do's and don'ts, example copy. The thing you hand a new hire or a freelancer so they don't write something that sounds like three other companies.",
      },
      {
        title: "Collateral Templates",
        description:
          "Business cards, letterhead, social post templates, and more at Growth and Premium. Editable in Figma or Canva so your team can run with them.",
      },
      {
        title: "Written Guidelines",
        description:
          "A proper PDF guide — 10–15 pages at Growth, 20+ at Premium. Logo usage, spacing, clear space, color pairings, photography style, what never to do. The document that saves you every future argument.",
      },
    ],
    gallery: {
      title: "Full brand systems — from logo to label to launch.",
      description:
        "Identity work for CPG, supplements, beauty, fashion, and B2B. Most of these went from blank page to retail shelf or live storefront.",
      items: getServiceGalleryItems("branding", {
        pinned: [
          "betancourt-family",
          "pure-blanco",
          "luxury-life",
          "calipharms-cbd",
          "coolto-nutrition",
          "thrasher-beard-oil",
          "sea-la-bella",
          "total-holistic-tincture",
          "breath-rox-family",
          "solaravita-amazon",
          "shield-labs-multi",
          "planters-etc",
        ],
        limit: 12,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From scattered assets",
    processHighlight: "to one coherent system",
    process: [
      {
        step: "01",
        title: "Brand Brief",
        subtitle: "Free",
        description:
          "A 45-minute working session. We cover your business, customers, competitors, current state, and where you want this brand to be in two years. Real answers, no mood-board fluff.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "Positioning, audience, messaging, voice. The thinking happens before the design — so what we make is grounded in something you can defend in a meeting.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "System Design",
        description:
          "Logo suite, colors, typography, brand voice, collateral. Every decision logged in the guidelines doc as we go, so we're not re-explaining choices at handoff.",
        icon: "PencilSimple",
      },
      {
        step: "04",
        title: "Guidelines & Handoff",
        description:
          "Finished guidelines PDF + all source files + a one-page cheat sheet your team can print and pin up. We walk you through the system so you can actually use it.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions founders ask",
    faqHighlight: "before they commit",
    faqs: [
      {
        q: "Why do I need 'brand guidelines' — I just want a logo?",
        a: "A logo without guidelines ends up being used ten different ways by ten different people within six months. Guidelines are the operating manual that keeps your brand consistent across your website, your Instagram, your employee's Canva design, and the signage your new freelancer is making. If you're a one-person show forever, skip the guidelines. If you're building something, you'll need them eventually — and it's cheaper to do it now than to untangle inconsistency later.",
      },
      {
        q: "What's the difference between branding and just a logo?",
        a: "A logo is one asset. Branding is the system every asset lives in — colors, typography, voice, imagery style, collateral templates, and rules for how they fit together. Logo design answers 'what's your mark?' Branding answers 'what does your business feel like across every place it shows up?'",
      },
      {
        q: "Can you work with my existing logo and build out from there?",
        a: "Yes — and we often recommend it when the logo has equity worth keeping. We'll audit the mark at kickoff and either build the system around it (if it's working) or propose a refresh (if it isn't). You keep whatever we've kept; any refresh work rolls into the project scope transparently.",
      },
      {
        q: "Do you also handle packaging, print, and signage?",
        a: "Yes — see the Print Design service page for the full catalog. We handle labels, packaging, business cards, signage, vehicle wraps, menus, trade show booths, the lot. Having the same designer do both the brand system and the collateral keeps everything tight.",
      },
      {
        q: "How does this interact with the Web Design and Ecommerce services?",
        a: "The brand system is the input; the website is one of the outputs. When you do both with us, the web design draws from the brand guidelines directly — same colors, same typography, same voice. If you do only the brand with us and take the brand file to another web designer, everything they need is documented in the guidelines so they can execute faithfully.",
      },
      {
        q: "What industries have you done brand work for?",
        a: "Supplements, packaged goods, restaurants, streetwear, construction, custom PC builds, service businesses, DTC ecommerce, medical practices. Thirty-plus brands total. We don't specialize in any one industry — we specialize in launching brands that have to work across web, print, and in-person at the same time.",
      },
      {
        q: "Will I own everything?",
        a: "Yes. Full rights transferred on final payment. Source files (Illustrator, Figma, Photoshop) included. If you want to take the system to a different designer later — for execution or scaling — they'll have everything they need.",
      },
      {
        q: "What's the timeline?",
        a: "Starter: 2 weeks. Growth: 3 weeks. Premium: 4–6 weeks, depending on strategy depth and collateral count. Complex projects (multi-product brand architecture, regulated industries) can take longer — we scope honestly on the discovery call.",
      },
      {
        q: "Can you do a brand refresh instead of a full rebuild?",
        a: "Yes. A refresh is usually a Growth-tier scope that keeps strategic direction intact and modernizes the visual system — letterforms, color, typography, collateral templates. Your customers recognize you, but you look like 2026 instead of 2012.",
      },
      {
        q: "I got a cheaper quote from someone on Upwork. What's the difference?",
        a: "Usually experience, depth, and continuity. A $500 brand is someone following a template they've run a hundred times. Here you're getting 15+ years of real launches, a strategy pass before design, actual guidelines written in plain English, and a system that was designed for your business specifically. If the cheaper quote has portfolio work that matches what you need, follow your gut. If it doesn't, that's usually the reason.",
      },
    ],
    pricing: {
      label: "Brand systems start at",
      price: "$2,500",
      unit: "/ project",
      note: "Growth at $4,500 is our most requested tier. Premium from $7,500 includes strategy and 6+ collateral assets.",
      numericPrice: "2500",
    },
    finalCta: {
      eyebrow: "Ready to look like one company",
      headline: "Stop looking like five different businesses.",
      highlightWord: "Start looking like one.",
      subhead:
        "Book a free 45-minute brand brief. Walk away with a clear plan, a clear scope, and a clear price — whether we end up building it or not.",
      ctaLabel: "Book a free brand review",
    },
    related: ["logo-design", "web-design", "print-design"],
    meta: {
      seoTitle: "Brand Identity Design in Cumming, GA — From $2,500",
      seoDescription:
        "Full brand identity systems for small businesses in Cumming, GA & Forsyth County. Logo suites, color, typography, voice, and guidelines. Starter $2,500 · Growth $4,500 · Premium $7,500+. Call (770) 744-2536.",
      keywords: [
        "brand identity Cumming GA",
        "brand identity designer Forsyth County",
        "branding agency North Atlanta",
        "rebranding Cumming Georgia",
        "small business branding North Atlanta",
      ],
      ogImage: "/assets/services/branding/hero.png",
      ogImageAlt:
        "Brand identity design for small businesses in Cumming, GA — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Brand Identity Design",
      category: "Brand Identity & Guidelines",
      description:
        "Full brand identity systems for small businesses in Cumming, GA and across North Metro Atlanta — logo suites, color palettes, typography systems, brand voice guides, collateral templates, and written guidelines. Built by a creative director with 15+ years across CPG, retail, and service businesses. From $2,500.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DIGITAL MARKETING / SEO
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "SEO",
    tagline: "Get found on Google — and on ChatGPT",
    iconSvg: "/assets/SVG/ai-workflows-icon.svg",
    themeAccent: "cyan",
    homeCardPrice: "from $499/mo",
    homeCardDescription:
      "Local SEO built for how people actually search in 2026 — Google, ChatGPT, and everything in between.",
    hook: "Get found on Google — and on ChatGPT. Local SEO built for how people actually search in 2026.",
    whoThisIsFor: [
      "Local Cumming and Forsyth County businesses wanting to show up in 'near me' searches",
      "Businesses that have a website but get zero organic traffic from it",
      "Anyone who's been burned by cheap SEO services that never actually delivered",
      "Owners who've noticed customers saying 'ChatGPT recommended you' and want more of that",
    ],
    tiers: [
      {
        name: "Local SEO Starter",
        price: "$499/mo",
        priceNote: "3-month minimum",
        timeline: "Ongoing",
        deliverables: [
          "Google Business Profile optimization",
          "10 local citations (directories, listings, NAP consistency)",
          "1 blog post per month (750–1,200 words, SEO-ready)",
          "Review monitoring + response guidance",
          "Monthly performance report",
        ],
        bestFor:
          "Micro-businesses getting the local SEO foundation in place for the first time.",
        ctaLabel: "Start with Starter",
      },
      {
        name: "Local SEO Growth",
        price: "$999/mo",
        priceNote: "3-month minimum",
        timeline: "Ongoing",
        isFeature: true,
        deliverables: [
          "Everything in Starter",
          "On-page SEO audit + fixes across your site",
          "4 blog posts per month",
          "Review response management (we reply; you approve)",
          "ChatGPT / Perplexity / AI-search (GEO) optimization",
          "Quarterly strategy call",
        ],
        bestFor:
          "Local businesses serious about dominating 'near me' searches and showing up in AI answers.",
        ctaLabel: "Choose Growth",
      },
      {
        name: "Full SEO + GEO",
        price: "$1,999/mo",
        priceNote: "3-month minimum",
        timeline: "Ongoing",
        deliverables: [
          "Everything in Growth",
          "Authority-building link outreach",
          "8 blog posts per month + 2 cornerstone pages",
          "Competitor tracking + gap analysis",
          "Conversion rate optimization on landing pages",
          "Monthly strategy call with actual recommendations",
        ],
        bestFor:
          "Businesses competing in harder markets, multiple service areas, or a national niche.",
        ctaLabel: "Book a strategy call",
      },
    ],
    calloutText:
      "One of the only agencies in Forsyth County actively optimizing for AI answer engines — not just Google. Your customers are asking ChatGPT for recommendations. Getting mentioned is the new ranking.",
    hero: {
      eyebrow: "Digital Marketing · Cumming, GA",
      headline: "Get found on Google —",
      highlightWord: "and on ChatGPT",
      subhead:
        "Local SEO and AI-search optimization for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Ranking in the maps pack is still the core — but in 2026 you also need to show up when your customer asks Claude or ChatGPT.",
      ctaLabel: "Book a free SEO audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/digital-marketing/hero.png",
        alt: "Local SEO dashboard with rising traffic graph — Branding Zombie Designs digital marketing in Cumming, GA",
      },
      microProof: "From $499/mo · 3-month minimum · GEO-ready",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your competitor",
    painPointsHighlight: "shows up, you don't",
    painPointsIntro:
      "Local search is brutal. You can have the better business, the better prices, and the better reviews, and still lose because your competitor hired someone who actually knows what they're doing.",
    painPoints: [
      { text: "You Google your own business and your competitor shows up in the maps pack above you." },
      { text: "Your Google Business Profile is set up but 'not maximized' — whatever that means." },
      { text: "You hired an SEO guy two years ago, paid him $300/mo for eight months, and nothing happened." },
      { text: "A customer told you 'ChatGPT recommended your competitor' and you didn't know that was even a thing." },
      { text: "Your website gets two visits a day and they're both you, on your phone, checking the website." },
    ],
    offerEyebrow: "What you get",
    offerHeadline: "Local SEO,",
    offerHighlight: "honestly executed",
    offerSubhead:
      "No 'submit your site to 500 directories' nonsense. We focus on the 20% of work that drives 80% of local ranking — and the new work (AI-search) that most of your competitors haven't caught on to yet.",
    deliverables: [
      {
        title: "Google Business Profile",
        description:
          "Full GBP optimization — photos, posts, services, attributes, Q&A seeded, review request flow. The foundation of local SEO nobody bothers to maximize.",
      },
      {
        title: "Local Citations + NAP Consistency",
        description:
          "Your business listed and consistent across Google, Bing, Yelp, Apple Maps, Nextdoor, Alignable, industry directories — so Google trusts that you are where you say you are.",
      },
      {
        title: "On-Page SEO",
        description:
          "Page-level optimization — titles, metas, schema markup, internal linking, Core Web Vitals. The technical fundamentals done right, not chased every time Google sneezes.",
      },
      {
        title: "Content Strategy + Blog",
        description:
          "A calendar of blog posts and cornerstone pages targeting the searches your customers actually make. Written in your voice, SEO-ready without reading like keyword stuffing.",
      },
      {
        title: "AI Answer-Engine Optimization",
        description:
          "Structuring your content, schema, and entity signals so ChatGPT, Claude, and Perplexity can cite you when a customer asks for recommendations. This is the new SEO — we're already in it.",
      },
      {
        title: "Review Management",
        description:
          "Systems to ask for reviews the right way. Timely responses to every review (in your voice). Reputation defense when something sideways shows up.",
      },
    ],
    gallery: {
      title: "Campaigns and creative we've shipped.",
      description:
        "Paid social, mailers, banners, and lifecycle work for DTC supplement brands, service businesses, and B2B teams. Real assets that ran in real markets.",
      items: getServiceGalleryItems("digital-marketing", {
        pinned: [
          "pruvit-mailer",
          "ans-ad",
          "swet-campaign",
          "rita-carnitine",
          "shield-labs-multi",
          "bnox-tropical",
          "dmax10-watermelon",
          "test-pro-multivitamin",
          "vpm-pools-flyer",
          "jay-scotts",
        ],
        limit: 10,
      }),
    },
    processEyebrow: "How it works",
    processHeadline: "From invisible",
    processHighlight: "to found",
    process: [
      {
        step: "01",
        title: "Audit",
        subtitle: "Free",
        description:
          "A 20-minute audit of your current SEO posture — GBP, on-page, citations, content, and AI-search presence. You get an honest read whether you hire us or not.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Foundation",
        description:
          "First 30 days — GBP max, citation cleanup, technical fixes, content calendar. The stuff that has to be right before monthly content can compound.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Monthly Work",
        description:
          "Content published, reviews managed, GBP posted weekly, rankings tracked, schema maintained, AI-search optimization iterated. Real SEO is a monthly discipline.",
        icon: "Wrench",
      },
      {
        step: "04",
        title: "Report & Iterate",
        description:
          "Monthly report with rankings, traffic, leads, and what we're adjusting. Quarterly call to zoom out and plan the next 90 days.",
        icon: "RocketLaunch",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions owners ask",
    faqHighlight: "before they sign",
    faqs: [
      {
        q: "How long does SEO take to actually work?",
        a: "90 days for early signals, 6–9 months for meaningful traction, 12+ months for compounding authority. Anyone promising page-1 rankings in 30 days is either lying or breaking Google's guidelines in a way that'll bite you later. Local SEO (GBP) can move faster — sometimes 60 days — because the ranking factors are different.",
      },
      {
        q: "What is GEO / AI-search optimization?",
        a: "GEO is Generative Engine Optimization — getting your business mentioned or cited when someone asks ChatGPT, Claude, Perplexity, or Google's AI Overviews. It's structurally different from traditional SEO (different signals, different content structure, different entity work). Almost no local agency is doing this yet. We've been doing it for six months and it's starting to pay off.",
      },
      {
        q: "Is there a contract?",
        a: "3-month minimum on all tiers, then month-to-month. 3 months is the minimum for SEO work to show any measurable signal — anything shorter is setting both of us up to fail. After that, stay month-to-month as long as it's working.",
      },
      {
        q: "Do I own the blog content you write?",
        a: "Yes. Full rights transferred as it's published. Keep the posts on your site, reuse them, repurpose them for email. If you stop working with us, every piece of content we've written stays with you.",
      },
      {
        q: "What if I already have a website and blog — can you just optimize what's there?",
        a: "Yes. Most of our engagements start that way. On-page SEO, technical fixes, content refreshes, and GBP work are all front-loaded into month 1. Then the monthly content calendar adds on top of what's already there.",
      },
      {
        q: "Do you do paid ads (Google, Meta)?",
        a: "Paid ads are under Social Media Full Management. Organic SEO and paid acquisition are different disciplines; we keep them clean. Most local businesses should have organic SEO working first — it compounds, paid doesn't.",
      },
      {
        q: "How do I know it's actually working?",
        a: "Four signals in order of trustworthiness: organic Google Business Profile calls and direction requests (real demand), organic traffic in GA4 (did people find the site?), keyword rankings (are we visible for searches that matter?), and impressions in Search Console (are we getting in front of people at all?). We report on all four monthly.",
      },
      {
        q: "What if my business is too small for SEO to matter?",
        a: "Usually it isn't, but sometimes you're right — if you're a one-table restaurant in a town of 200 people, SEO is overkill and we'll tell you. Most Cumming/North Atlanta service businesses are a good fit starting at $499/mo; the break-even is roughly 'can I afford to pay for one more customer a month?' If yes, the math usually works.",
      },
      {
        q: "I was burned by an SEO agency before. How is this different?",
        a: "Most agencies burn clients in two ways: (1) they sell you on vanity metrics like keyword positions without tying it to leads, or (2) they take $300/mo and outsource everything to a template factory. We report on actual business signals, we do the work ourselves, and the 3-month minimum plus month-to-month structure means we can't afford not to deliver.",
      },
      {
        q: "Can you optimize for 'near me' searches specifically?",
        a: "Yes — that's most of local SEO. GBP is the biggest lever, then on-page with location schema, then citations for NAP consistency, then reviews, then local content. We work all five at once. Within 60–90 days, 'near me' visibility should improve measurably in most markets.",
      },
    ],
    pricing: {
      label: "Local SEO plans start at",
      price: "$499",
      unit: "/ month",
      note: "Growth at $999/mo is our most requested tier. Also available: one-time GBP Audit + Setup at $499 (no monthly commitment).",
      numericPrice: "499",
    },
    finalCta: {
      eyebrow: "Ready to get found",
      headline: "Your next customer is searching for you right now.",
      highlightWord: "Be in the first three results.",
      subhead:
        "Book a free 20-minute SEO audit. We'll tell you honestly where you rank, where you're leaking, and what the path to the top 3 looks like — whether we're the ones who execute it or not.",
      ctaLabel: "Book a free SEO audit",
    },
    related: ["ai-workflows", "web-design", "social-media"],
    meta: {
      seoTitle: "Local SEO + GEO for Cumming, GA — From $499/mo",
      seoDescription:
        "Local SEO and AI-search (GEO) optimization for small businesses in Cumming, GA & Forsyth County. Google Business Profile, on-page, content, AI answer-engine optimization. Starter $499/mo · Growth $999/mo · Full $1,999/mo. Call (770) 744-2536.",
      keywords: [
        "local SEO Cumming GA",
        "SEO Forsyth County",
        "AI search optimization North Atlanta",
        "Google Business Profile Cumming",
        "GEO optimization Atlanta",
      ],
      ogImage: "/assets/services/digital-marketing/hero.png",
      ogImageAlt:
        "Local SEO and AI-search optimization for Cumming, GA small businesses — Branding Zombie Designs",
    },
    schema: {
      serviceType: "Local SEO & Digital Marketing",
      category: "Digital Marketing & SEO",
      description:
        "Local SEO and AI answer-engine optimization (GEO) for small businesses in Cumming, GA and across North Metro Atlanta — Google Business Profile management, on-page SEO, local citations, monthly content, review management, and ChatGPT/Perplexity citation strategy. From $499/mo.",
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllSlugs(): ServiceSlug[] {
  return SERVICES.map((s) => s.slug);
}

export function getRelatedServices(slug: ServiceSlug): Service[] {
  const current = getServiceBySlug(slug);
  if (!current) return [];
  return current.related
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => Boolean(s));
}
