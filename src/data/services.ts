// ─── Services content — single source of truth ─────────────────────────────
// Powers both the homepage <Services /> bento grid and the
// /services/[slug] landing pages. Per-page metadata, Schema.org fields, and
// section copy all live here so one edit updates everywhere.

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import type { Gallery4Item } from "@/components/ui/gallery4";

export type ServiceSlug =
  | "web-design"
  | "logo-design"
  | "branding"
  | "ecommerce"
  | "print-design"
  | "social-media"
  | "digital-marketing"
  | "ai-workflows"
  | "launch-package"
  // Legacy slugs — kept during migration so existing SERVICES entries still
  // satisfy the union. Removed once data entries are renamed/retired.
  | "graphic-design"
  | "print-services";

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
      title: "Recent websites built from right here in Cumming.",
      description:
        "Small-business sites across North Metro Atlanta — restaurants, contractors, professional services, and retail.",
      items: [
        {
          id: "web-gallery-1",
          title: "Modern Small-Business Homepage",
          description:
            "Conversion-focused landing built in Next.js — under 2 second load, mobile-first, integrated booking.",
          href: portfolioHref,
          image: "/assets/services/web-design/gallery-1.png",
        },
        {
          id: "web-gallery-2",
          title: "Local Service Business Redesign",
          description:
            "Complete rebuild for a North Atlanta contractor — new brand system, lead forms, service area pages.",
          href: portfolioHref,
          image: "/assets/services/web-design/gallery-2.png",
        },
        {
          id: "web-gallery-3",
          title: "Restaurant Menu & Ordering",
          description:
            "Full menu, reservation flow, and Google Business sync for a Forsyth County restaurant.",
          href: portfolioHref,
          image: "/assets/services/web-design/gallery-3.png",
        },
        {
          id: "web-gallery-4",
          title: "Professional Services Firm",
          description:
            "Editorial-style site for a Cumming law practice — case studies, intake forms, SEO landing pages per practice area.",
          href: portfolioHref,
          image: "/assets/services/web-design/gallery-4.png",
        },
        {
          id: "web-gallery-5",
          title: "Multi-Page Service Business",
          description:
            "10-page build with per-service landing pages and individual city targets across North Metro Atlanta.",
          href: portfolioHref,
          image: "/assets/services/web-design/gallery-5.png",
        },
      ],
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
    related: ["ai-workflows", "graphic-design", "ecommerce"],
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
    tagline: "Business automation that actually earns its keep",
    iconSvg: "/assets/SVG/ai-workflows-icon.svg",
    themeAccent: "cyan",
    homeCardPrice: "from $500",
    homeCardDescription:
      "Automate the busywork so you can focus on what you love.",
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
      items: [
        {
          id: "ai-gallery-1",
          title: "Website Chatbot Integration",
          description:
            "Custom-trained chatbot answering service questions, quoting ballpark prices, and booking appointments 24/7.",
          href: portfolioHref,
          image: "/assets/services/ai-workflows/gallery-1.png",
        },
        {
          id: "ai-gallery-2",
          title: "Lead Capture Automation",
          description:
            "Instant-reply flow — form fills go to CRM, trigger follow-up, and book discovery calls without human touch.",
          href: portfolioHref,
          image: "/assets/services/ai-workflows/gallery-2.png",
        },
        {
          id: "ai-gallery-3",
          title: "Scheduling & Booking Flow",
          description:
            "Calendar integration for a Forsyth County medical practice — patients self-book and get automated reminders.",
          href: portfolioHref,
          image: "/assets/services/ai-workflows/gallery-3.png",
        },
        {
          id: "ai-gallery-4",
          title: "Review & Reputation Loop",
          description:
            "Post-service SMS asking for Google reviews — shipped one client from 12 reviews to 80 in three months.",
          href: portfolioHref,
          image: "/assets/services/ai-workflows/gallery-4.png",
        },
        {
          id: "ai-gallery-5",
          title: "Invoice & Payment Reminder Flow",
          description:
            "Automated invoice chasing and payment reminders for a local service business — cut AR by 40% in the first month.",
          href: portfolioHref,
          image: "/assets/services/ai-workflows/gallery-5.png",
        },
      ],
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
        q: "What is AI workflow integration, really?",
        a: "It's automating the repetitive parts of your business using chatbots, form flows, scheduling tools, and AI assistants — so customer questions get answered, leads get followed up, and appointments get booked while you're doing something more valuable. No sci-fi, no hype.",
      },
      {
        q: "Do I need to understand AI to use this?",
        a: "No. We build the workflow, you use the result. If a customer asks your chatbot something, you see the conversation. If a lead fills out a form, you get notified. It's ordinary software that happens to use AI in the right places.",
      },
      {
        q: "What tools and platforms do you use?",
        a: "OpenAI / Anthropic for language models, n8n or Make for workflow orchestration, and direct integrations with Gmail, Google Calendar, Stripe, Square, Shopify, QuickBooks, and whatever CRM you're already on. We use your existing stack, not a new platform you have to learn.",
      },
      {
        q: "What does it cost?",
        a: "Single-workflow projects start at $500 (one chatbot, one automation, one scheduling flow). Full-audit engagements with 3–5 workflows run $1,500–$3,000 depending on complexity. Monthly hosting for chatbots and workflow runs is typically $30–$100 depending on volume.",
      },
      {
        q: "Is my customer data safe?",
        a: "Yes. We use enterprise-grade providers with SOC 2 compliance, and customer data is never used to train public models. We can also run fully on-premise for regulated industries (healthcare, legal) if that's a requirement.",
      },
      {
        q: "Can you maintain this for me after launch?",
        a: "Yes. Monthly care plans start at $150/month and include chatbot retraining as your services change, workflow monitoring, error alerts, and monthly optimization reports. Cancel anytime.",
      },
    ],
    pricing: {
      label: "Workflows start at",
      price: "$500",
      unit: "/ workflow",
      note: "Full automation audits and multi-workflow engagements scoped on your discovery call.",
      numericPrice: "500",
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
        "AI Workflow Integration for Small Businesses in Cumming, GA",
      seoDescription:
        "AI chatbots, automation, lead capture & scheduling for small businesses in Cumming, GA & North Atlanta. Practical AI from $500. Call (770) 744-2536.",
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
  // GRAPHIC DESIGN
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "graphic-design",
    name: "Graphic Design",
    shortName: "Graphic",
    tagline: "Logo & brand identity for small businesses",
    iconSvg: "/assets/SVG/graphic-design-icon.svg",
    themeAccent: "neon",
    homeCardPrice: "from $150",
    homeCardDescription:
      "Look as professional as the big brands at a fraction of the cost.",
    hero: {
      eyebrow: "Graphic Design · Cumming, GA",
      headline: "Look like a brand, not",
      highlightWord: "a side project",
      subhead:
        "Logos, brand identity systems, menus, brochures, pitch decks, and social media graphics — designed for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Big-brand quality, small-business price.",
      ctaLabel: "Book a free brand review",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/graphic-design/hero.png",
        alt: "Dark studio table covered in brand collateral and design mockups — Branding Zombie Designs graphic design in Cumming, GA",
      },
      microProof: "Starting at $150 · 5–10 day delivery · 30+ brands shipped",
    },
    painPointsEyebrow: "Sound familiar?",
    painPointsHeadline: "Your brand looks like",
    painPointsHighlight: "you made it yourself",
    painPointsIntro:
      "Customers decide whether you're worth their money in about 7 seconds. If your logo looks like a free template, your menu looks like a Word document, and your Instagram looks like a mood board, that decision is already made.",
    painPoints: [
      { text: "Your logo was a $50 Fiverr job and it shows — and now you can't find the source files." },
      { text: "Your business card, website, and Instagram all use different fonts and colors like they belong to three different companies." },
      { text: "You need a pitch deck by Tuesday and the best you've got is a PowerPoint template from 2014." },
      { text: "Your menu looks like it was laminated at Staples — and the food is way better than the design suggests." },
      { text: "You can't describe your brand to a contractor because you've never actually written it down anywhere." },
    ],
    offerEyebrow: "One engagement · A brand you can actually use",
    offerHeadline: "Everything your brand needs to",
    offerHighlight: "show up consistently",
    offerSubhead:
      "From single pieces to full identity systems. Pick what you need today, add the rest as you grow.",
    deliverables: [
      {
        title: "Logo Design",
        description:
          "3 custom concepts, 2 revision rounds, final delivered as vector, PNG, and favicon. Not a template. Never a template.",
      },
      {
        title: "Brand Identity System",
        description:
          "Logo, color palette, typography, voice, and usage rules — written down in a one-page brand guide you and your team can actually follow.",
      },
      {
        title: "Print Collateral",
        description:
          "Business cards, letterhead, flyers, brochures, postcards, yard signs. All designed to the brand guide. Print-ready files on handoff.",
      },
      {
        title: "Menu & Signage Design",
        description:
          "Restaurants, cafes, and service businesses. Print menus, QR-code menus, window signs, and wall graphics that match the brand.",
      },
      {
        title: "Social Media Graphics",
        description:
          "Instagram templates, story highlights, Facebook covers, and campaign assets. Sized correctly, on-brand, easy for you to customize.",
      },
      {
        title: "Pitch Deck & Presentations",
        description:
          "Investor decks, sales decks, and capabilities overviews. Designed like you're raising money from a firm that's seen 300 pitches this quarter.",
      },
    ],
    gallery: {
      title: "Brand work shipped from Cumming.",
      description:
        "Logos, identity systems, menus, and collateral for small businesses across North Metro Atlanta.",
      items: [
        {
          id: "graphic-gallery-1",
          title: "Restaurant Brand Identity",
          description:
            "Full identity system for a Forsyth County restaurant — logo, menu, signage, and social templates.",
          href: portfolioHref,
          image: "/assets/services/graphic-design/gallery-1.png",
        },
        {
          id: "graphic-gallery-2",
          title: "Startup Logo & Guide",
          description:
            "Logo mark, wordmark, palette, and 1-page brand guide for a Cumming-based service startup.",
          href: portfolioHref,
          image: "/assets/services/graphic-design/gallery-2.png",
        },
        {
          id: "graphic-gallery-3",
          title: "Menu & Signage System",
          description:
            "Printed menus, window signs, and A-frame collateral for an Alpharetta cafe.",
          href: portfolioHref,
          image: "/assets/services/graphic-design/gallery-3.png",
        },
        {
          id: "graphic-gallery-4",
          title: "Pitch Deck Design",
          description:
            "18-slide investor deck for a Georgia wellness brand — editorial typography, custom iconography.",
          href: portfolioHref,
          image: "/assets/services/graphic-design/gallery-4.png",
        },
        {
          id: "graphic-gallery-5",
          title: "Full Rebrand",
          description:
            "Complete identity refresh for a North Atlanta contractor — logo, trucks, cards, website launch.",
          href: portfolioHref,
          image: "/assets/services/graphic-design/gallery-5.png",
        },
      ],
    },
    processEyebrow: "How it works",
    processHeadline: "From scattered",
    processHighlight: "to set in stone",
    process: [
      {
        step: "01",
        title: "Discovery Call",
        subtitle: "Free",
        description:
          "15 minutes to understand your business, your customers, and what makes you different from every other company in your category.",
        icon: "ChatCircle",
      },
      {
        step: "02",
        title: "Mood & Direction",
        description:
          "We pull together visual references — not a Pinterest dump, but 2–3 distinct creative directions we'd actually recommend based on your strategy.",
        icon: "Lightning",
      },
      {
        step: "03",
        title: "Design",
        description:
          "3 logo concepts or design variations in the direction you picked. Real mockups on real collateral, not a white background.",
        icon: "PencilSimple",
      },
      {
        step: "04",
        title: "Refine & Deliver",
        description:
          "Two rounds of revisions included. Final files delivered in every format you'll ever need — vector, PNG, favicon, print-ready PDFs.",
        icon: "Wrench",
      },
    ],
    faqEyebrow: "FAQ",
    faqHeadline: "Questions we get",
    faqHighlight: "almost every time",
    faqs: [
      {
        q: "How much does a logo cost?",
        a: "Standalone logos start at $500. Full brand identity systems (logo + palette + typography + guide + basic collateral) start at $1,200. A simple piece of collateral like a single flyer or business card is $150. We quote transparently after the discovery call based on what you actually need.",
      },
      {
        q: "How long does it take?",
        a: "Single deliverables (a flyer, a menu, a business card) are typically 3–5 business days. Logos and brand systems run 1–2 weeks including revision rounds. Rush jobs accommodated when possible — ask on the discovery call.",
      },
      {
        q: "How many revisions do I get?",
        a: "Two rounds of revisions are included in every project. We've found that's plenty when the discovery call and mood board are done properly. Additional rounds are billed hourly if needed.",
      },
      {
        q: "What file formats do I get?",
        a: "Everything — vector (AI, SVG, EPS), raster (PNG, JPG at multiple sizes), print-ready PDF, favicon, and a simple usage guide. You own the files outright. No watermarks, no subscriptions, no surprises.",
      },
      {
        q: "Can you design for print too?",
        a: "Yes — and we can handle the actual printing through our wholesale trade accounts. See our Print Services page for the full list.",
      },
      {
        q: "Do you work with restaurants and local businesses specifically?",
        a: "A lot of our clients are restaurants, contractors, medical practices, salons, and other local service businesses in Cumming, Forsyth County, and North Metro Atlanta. We understand small-business budgets and move accordingly.",
      },
    ],
    pricing: {
      label: "Projects start at",
      price: "$150",
      unit: "/ piece",
      note: "Full identity systems from $1,200. Scope confirmed on your discovery call.",
      numericPrice: "150",
    },
    finalCta: {
      eyebrow: "Ready to look like a real business",
      headline: "First impressions happen",
      highlightWord: "whether you're ready or not",
      subhead:
        "Book a free 15-minute brand review. We'll look at what you've got, tell you what's working and what's hurting you, and give you a clear recommendation — whether we end up designing it or not.",
      ctaLabel: "Book a free brand review",
    },
    related: ["print-services", "web-design", "social-media"],
    meta: {
      seoTitle:
        "Graphic Design & Logo Design in Cumming, GA — From $150",
      seoDescription:
        "Logo design, brand identity, menus & collateral for small businesses in Cumming, GA & Forsyth County. From $150. Call (770) 744-2536 for a free brand review.",
      keywords: [
        "graphic design Cumming GA",
        "graphic designer Forsyth County",
        "logo design Cumming GA",
        "logo designer Forsyth County",
        "logo design Atlanta",
        "brand identity Cumming Georgia",
        "brand identity designer Atlanta",
        "brand guidelines Cumming GA",
        "rebranding Cumming GA",
        "small business branding North Atlanta",
        "menu design Cumming GA",
        "restaurant menu design Atlanta",
        "pitch deck design Cumming",
        "brochure design Forsyth County",
        "business card design Forsyth County",
        "freelance graphic designer Cumming",
      ],
      ogImage: "/assets/services/graphic-design/hero.png",
      ogImageAlt:
        "Graphic design and brand identity work from Branding Zombie Designs in Cumming, GA",
    },
    schema: {
      serviceType: "Graphic Design",
      category: "Graphic Design & Brand Identity Services",
      description:
        "Logo design, brand identity systems, print collateral, menu design, social graphics, and pitch decks for small businesses in Cumming, GA and across North Metro Atlanta. Projects from $150; full identity systems from $1,200.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // PRINT SERVICES
  // ════════════════════════════════════════════════════════════════════════
  {
    slug: "print-services",
    name: "Print Services",
    shortName: "Print",
    tagline: "Cards, banners, wraps — wholesale pricing",
    iconSvg: "/assets/SVG/print-services-icon.svg",
    themeAccent: "toxic",
    homeCardPrice: "from $75",
    homeCardDescription:
      "Cards, banners, vehicle wraps. Wholesale pricing, no middleman.",
    hero: {
      eyebrow: "Print Services · Cumming, GA",
      headline: "Real print, wholesale pricing,",
      highlightWord: "no middleman",
      subhead:
        "Business cards, flyers, banners, yard signs, vehicle wraps, menus, stickers, and custom apparel. Designed in-house and produced through our trade accounts, so you get wholesale pricing and files your printer actually accepts. Delivered across Cumming, Forsyth County, and North Metro Atlanta.",
      ctaLabel: "Get a print quote",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/print-services/hero.png",
        alt: "Custom vehicle wrap and printed collateral in dark warehouse — Branding Zombie Designs print services in Cumming, GA",
      },
      microProof: "From $75 · 3–7 day turnaround · Wholesale trade accounts",
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
      title: "Printed work shipped across North Atlanta.",
      description:
        "Real projects for restaurants, contractors, service businesses, and retailers.",
      items: [
        {
          id: "print-gallery-1",
          title: "Custom Business Cards",
          description:
            "Soft-touch, foiled, and spot-UV business cards for a Cumming-based consulting firm.",
          href: portfolioHref,
          image: "/assets/services/print-services/gallery-1.png",
        },
        {
          id: "print-gallery-2",
          title: "Vehicle Wrap",
          description:
            "Full vehicle wrap for an HVAC company serving Forsyth County — design, print, and install coordination.",
          href: portfolioHref,
          image: "/assets/services/print-services/gallery-2.png",
        },
        {
          id: "print-gallery-3",
          title: "Yard Signs & Banners",
          description:
            "Weatherproof yard signs and retractable banners for a North Atlanta contractor.",
          href: portfolioHref,
          image: "/assets/services/print-services/gallery-3.png",
        },
        {
          id: "print-gallery-4",
          title: "Printed Menu System",
          description:
            "Printed dine-in menus, takeout cards, and to-go sleeves for a Forsyth County cafe.",
          href: portfolioHref,
          image: "/assets/services/print-services/gallery-4.png",
        },
        {
          id: "print-gallery-5",
          title: "Custom Apparel",
          description:
            "Branded t-shirts and hoodies for a North Atlanta fitness studio — low minimums, fast turnaround.",
          href: portfolioHref,
          image: "/assets/services/print-services/gallery-5.png",
        },
      ],
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
        q: "Why is your pricing cheaper than my local print shop?",
        a: "We're not a print shop — we're a design studio with wholesale trade accounts. We pass the wholesale pricing through to you plus a small production fee. You save the retail markup and get better design at the same time.",
      },
      {
        q: "What are your minimums?",
        a: "Most items have very low minimums: 100 business cards, 25 flyers, 1 yard sign, 1 banner, 6 t-shirts. Custom apparel minimums vary by style and decoration method (DTF vs screen print).",
      },
      {
        q: "How fast is turnaround?",
        a: "Standard business cards and flyers ship in 3–5 business days. Banners and yard signs 5–7 days. Vehicle wraps 10–14 days including install coordination. Rush options available on most items — ask when you request a quote.",
      },
      {
        q: "Do you need print-ready files, or do you design too?",
        a: "Either works. We prefer to design in-house so we control the files and the outcome, but if you've got print-ready files that actually work, we can quote print-only. If your \u201Cprint-ready\u201D file isn't actually print-ready (it usually isn't), we can fix it for a small file-prep fee.",
      },
      {
        q: "Do you deliver in Cumming and Forsyth County?",
        a: "Yes. Free local delivery within a 30-mile radius for orders over $250. For smaller orders, shipping is at cost. Anywhere outside North Metro Atlanta ships via UPS Ground.",
      },
      {
        q: "Can you handle custom apparel and embroidery?",
        a: "Yes — screen print, DTF transfer, and embroidery on t-shirts, hoodies, polos, hats, and uniforms. Low minimums, wholesale pricing, branded to your colors and logo.",
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
    related: ["graphic-design", "web-design", "social-media"],
    meta: {
      seoTitle:
        "Print Services in Cumming, GA — Cards, Banners & Vehicle Wraps",
      seoDescription:
        "Business cards, flyers, banners, yard signs, vehicle wraps, menus, and custom apparel for Cumming, GA & North Atlanta businesses. Wholesale pricing from $75.",
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
    homeCardPrice: "$400/mo",
    homeCardDescription:
      "Show up consistently without spending nights on Instagram.",
    hero: {
      eyebrow: "Social Media · Cumming, GA",
      headline: "Show up consistently without",
      highlightWord: "losing your nights to Instagram",
      subhead:
        "Done-for-you content creation, scheduling, and community management for Instagram, Facebook, and TikTok — for small businesses in Cumming, Forsyth County, and across North Metro Atlanta. Real content, real engagement, in your voice.",
      ctaLabel: "Book a free content audit",
      ctaHref: CALENDLY_URL,
      heroImage: {
        src: "/assets/services/social-media/hero.png",
        alt: "Dark editorial Instagram content grid floating in 3D — Branding Zombie Designs social media in Cumming, GA",
      },
      microProof: "$400/mo · 12 posts per month · No contracts",
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
      title: "Feeds we've built and maintained.",
      description:
        "Consistent, on-brand social content for local businesses in Cumming and across North Atlanta.",
      items: [
        {
          id: "social-gallery-1",
          title: "Restaurant Feed Rebuild",
          description:
            "Monthly Instagram feed for a Forsyth County restaurant — food photography, menu highlights, daily specials.",
          href: portfolioHref,
          image: "/assets/services/social-media/gallery-1.png",
        },
        {
          id: "social-gallery-2",
          title: "Service Business Consistency",
          description:
            "12-posts-a-month Instagram and Facebook calendar for a Cumming-based contractor. Booked leads from the feed in month 2.",
          href: portfolioHref,
          image: "/assets/services/social-media/gallery-2.png",
        },
        {
          id: "social-gallery-3",
          title: "Boutique Launch Campaign",
          description:
            "Pre-launch content strategy and post series for an Alpharetta boutique opening — from empty account to 1,200 local followers.",
          href: portfolioHref,
          image: "/assets/services/social-media/gallery-3.png",
        },
        {
          id: "social-gallery-4",
          title: "Fitness Studio Reels",
          description:
            "Weekly short-form video content for a North Atlanta fitness studio — class previews, member features, form tips.",
          href: portfolioHref,
          image: "/assets/services/social-media/gallery-4.png",
        },
        {
          id: "social-gallery-5",
          title: "Medical Practice Trust Content",
          description:
            "Education-focused Instagram and Facebook for a Forsyth County practice — patient stories, FAQs, practice updates.",
          href: portfolioHref,
          image: "/assets/services/social-media/gallery-5.png",
        },
      ],
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
        q: "What's included in the $400/month plan?",
        a: "12 designed and scheduled posts per month across Instagram and Facebook, 4 story posts per week, 2 short-form videos per month, comment/DM monitoring, and a monthly performance report. All in your brand, approved by you before anything publishes.",
      },
      {
        q: "Which platforms do you cover?",
        a: "Instagram and Facebook come standard. TikTok, LinkedIn, and YouTube Shorts can be added for $150/month each — we don't force them on you because not every business needs every platform.",
      },
      {
        q: "Is there a contract?",
        a: "No long-term contract. Month-to-month. 30 days notice to cancel. We'd rather earn your business each month than lock you in.",
      },
      {
        q: "Who writes the captions?",
        a: "We do, in your voice. You give us a voice sample during onboarding (or we figure it out from your existing content), and then every caption gets approved by you before it goes live. You never wake up to something you didn't sign off on.",
      },
      {
        q: "Do you provide photography?",
        a: "Basic product and service photography is included — we'll come by once a quarter to shoot. Custom shoots, food photography, or lifestyle shoots are billed separately based on scope.",
      },
      {
        q: "Can you run ads too?",
        a: "Yes, but it's billed separately. Ad management starts at $300/month on top of organic content, plus ad spend. We recommend 3 months of consistent organic content before layering in paid.",
      },
    ],
    pricing: {
      label: "Monthly plans start at",
      price: "$400",
      unit: "/ month",
      note: "No contract. 30 days notice to cancel. Custom scopes quoted on the discovery call.",
      numericPrice: "400",
    },
    finalCta: {
      eyebrow: "Ready to stop ghosting your feed",
      headline: "Your audience already follows you.",
      highlightWord: "Start showing up for them.",
      subhead:
        "Book a free 20-minute content audit. We'll look at your current feeds, your competitors, and what your audience actually wants — and give you an honest plan either way.",
      ctaLabel: "Book a free content audit",
    },
    related: ["graphic-design", "ai-workflows", "web-design"],
    meta: {
      seoTitle:
        "Social Media Management in Cumming, GA — $400/month",
      seoDescription:
        "Done-for-you Instagram, Facebook & TikTok content for small businesses in Cumming, GA & Forsyth County. $400/month. Call (770) 744-2536 for a free audit.",
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
    tagline: "Shopify stores that actually convert",
    iconSvg: "/assets/icon-ecommerce.svg",
    themeAccent: "neon",
    homeCardPrice: "from $3,000",
    homeCardDescription:
      "Selling online without the tech stress. We handle Shopify or custom.",
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
      title: "Stores we've launched from Cumming.",
      description:
        "Shopify and custom ecommerce builds for small brands across North Metro Atlanta.",
      items: [
        {
          id: "ecom-gallery-1",
          title: "Boutique Shopify Store",
          description:
            "Full Shopify theme and catalog for a North Atlanta boutique — 60+ products, abandoned cart recovery, local pickup.",
          href: portfolioHref,
          image: "/assets/services/ecommerce/gallery-1.png",
        },
        {
          id: "ecom-gallery-2",
          title: "Wellness Brand Launch",
          description:
            "Supplement brand ecommerce launch — Shopify custom theme, subscription setup, Shop Pay, tax automation.",
          href: portfolioHref,
          image: "/assets/services/ecommerce/gallery-2.png",
        },
        {
          id: "ecom-gallery-3",
          title: "Food & Beverage Store",
          description:
            "Local food producer moving from Etsy to Shopify — catalog migration, shipping rules for perishables, subscription box.",
          href: portfolioHref,
          image: "/assets/services/ecommerce/gallery-3.png",
        },
        {
          id: "ecom-gallery-4",
          title: "Service + Product Hybrid",
          description:
            "Hybrid store for a Cumming service business — booking appointments and shipping products from the same checkout.",
          href: portfolioHref,
          image: "/assets/services/ecommerce/gallery-4.png",
        },
        {
          id: "ecom-gallery-5",
          title: "Custom Apparel Store",
          description:
            "Print-on-demand apparel store with integrated fulfillment and live product mockups for a North Atlanta brand.",
          href: portfolioHref,
          image: "/assets/services/ecommerce/gallery-5.png",
        },
      ],
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
        q: "Shopify or BigCommerce?",
        a: "For most small businesses in Cumming and North Atlanta, Shopify is the right call — easier to run day-to-day, bigger app ecosystem, better themes. BigCommerce is better if you need more complex B2B pricing, multi-storefront, or no transaction fees at higher volume. We recommend on the discovery call based on what fits you best.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "Yes. We migrate from Etsy, Square, Wix, WooCommerce, Squarespace, and custom platforms. Products, customers, orders, and URLs (with proper 301 redirects so you don't lose SEO). Migration is usually $1,000–$2,500 on top of the build depending on catalog size.",
      },
      {
        q: "What does a Shopify build cost?",
        a: "Starter builds (custom theme + up to 50 products + checkout) start at $3,000. More complex stores (subscriptions, B2B, multi-location, custom functionality) run $5,000–$10,000. We scope transparently after the discovery call — no padding.",
      },
      {
        q: "Do I need to provide product photos?",
        a: "Yes, but we can help. Basic product shots (you send products, we photograph) run $25/product. Lifestyle photography and editorial shoots are quoted separately. Or if you've got decent phone shots, we can edit them to look consistent.",
      },
      {
        q: "How does sales tax work?",
        a: "We set up automated sales tax through Shopify Tax or TaxJar on launch. It handles the rates automatically. You still need to register for sales tax permits in the states where you have nexus — we'll explain that and point you to an accountant if you don't have one.",
      },
      {
        q: "Will you help me run the store after launch?",
        a: "Yes. Monthly care plans start at $200/month and cover theme updates, product additions, content changes, performance monitoring, and minor customizations. Or you can run it yourself — the training and cheat sheet make that doable.",
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
    related: ["web-design", "ai-workflows", "graphic-design"],
    meta: {
      seoTitle:
        "Shopify Ecommerce Developer in Cumming, GA — From $3,000",
      seoDescription:
        "Custom Shopify & BigCommerce store design for small businesses in Cumming, GA & North Atlanta. Catalog, checkout, payments, launch. From $3,000. Call (770) 744-2536.",
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
