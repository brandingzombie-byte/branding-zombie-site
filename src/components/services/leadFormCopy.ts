// Per-service copy for the micro lead-capture form (ServiceLeadForm).
//
// This is the "get a call/text/email back" form — three fields, one button,
// no scoping questionnaire. The full brief lives at /services/request-quote.
// Copy here has to earn the click in one breath, so: headlines <= 6 words,
// blurbs <= 2 sentences, service-specific every time. Charming, never gory.
//
// `value` is the GA4 monetary weight assigned to a lead from this service —
// it is read on the SERVER by leadFormActions.ts (so the client can't inflate
// it) and passed back to the client for the generate_lead event.

export type LeadFormCopy = {
  /** Small uppercase kicker above the headline. */
  eyebrow: string;
  /** Display-font headline. Keep it to six words or fewer. */
  headline: string;
  /** One or two sentences of reassurance under the headline. */
  blurb: string;
  /** Placeholder for the optional one-line message field. */
  messagePlaceholder: string;
  /** Submit button label. */
  cta: string;
  /** GA4 lead value in USD. */
  value: number;
};

export const DEFAULT_LEAD_FORM: LeadFormCopy = {
  eyebrow: "One tiny form, one real answer",
  headline: "Tell us what you need.",
  blurb:
    "Give us the short version and we'll come back with a straight answer within one business day. No pitch deck, no pressure.",
  messagePlaceholder: "What do you need help with?",
  cta: "Get my call back",
  value: 50,
};

export const LEAD_FORM: Record<string, LeadFormCopy> = {
  "web-design": {
    eyebrow: "No forms to fill — okay, one tiny one",
    headline: "Tell us where to dig.",
    blurb:
      "Say what's broken about your site and we'll come back with a straight answer — price, timeline, and whether you even need a rebuild.",
    messagePlaceholder: "What's wrong with your current site?",
    cta: "Get my call back",
    value: 100,
  },
  "ai-workflows": {
    eyebrow: "The one task we won't automate",
    headline: "Point us at the busywork.",
    blurb:
      "Tell us the task that eats your week. We'll tell you honestly whether AI can take it off your hands — or whether it can't.",
    messagePlaceholder: "Which task is eating your week?",
    cta: "Get my call back",
    value: 50,
  },
  "print-design": {
    eyebrow: "Real numbers, no runaround",
    headline: "Tell us what you're printing.",
    blurb:
      "Give us the piece and a rough quantity. You'll get an actual price and an actual turnaround — usually the same day you ask.",
    messagePlaceholder: "What are you printing, and how many?",
    cta: "Get my print quote",
    value: 50,
  },
  "social-media": {
    eyebrow: "No content calendar required",
    headline: "Tell us where your feed stalled.",
    blurb:
      "Say which platforms actually matter to you and we'll come back with what a real posting rhythm would cost. No lock-in, no vanity metrics.",
    messagePlaceholder: "Which platforms matter most to you?",
    cta: "Get my call back",
    value: 50,
  },
  "email-marketing": {
    eyebrow: "Your list is still breathing",
    headline: "Wake up your customer list.",
    blurb:
      "Tell us roughly how many people are on it and we'll come back with what that list could be earning you every month.",
    messagePlaceholder: "How big is your list, roughly?",
    cta: "Get my call back",
    value: 50,
  },
  ecommerce: {
    eyebrow: "Three fields, then a real conversation",
    headline: "Tell us what you sell.",
    blurb:
      "Your platform, and where it's leaking — carts, speed, or nobody showing up. We'll come back with a straight read on the fix.",
    messagePlaceholder: "What are you selling, and where?",
    cta: "Get my call back",
    value: 100,
  },
  "logo-design": {
    eyebrow: "No mood board needed yet",
    headline: "Tell us who you are.",
    blurb:
      "One sentence about your business is plenty to start. You'll get a price, a timeline, and zero contest-site nonsense.",
    messagePlaceholder: "What's the business, and what do you have now?",
    cta: "Get my call back",
    value: 50,
  },
  branding: {
    eyebrow: "Starts with a conversation, not a deck",
    headline: "Tell us what feels off.",
    blurb:
      "Describe the gap between how you look and how good you actually are. We'll come back with a plan to close it — and you own everything we make.",
    messagePlaceholder: "What feels off about your brand right now?",
    cta: "Get my call back",
    value: 75,
  },
  "launch-package": {
    eyebrow: "Logo, site, cards — one bite",
    headline: "Start the whole thing here.",
    blurb:
      "Tell us about the business and we'll confirm the kit fits — logo, five-page site, cards, flyers, and Google Business Profile, live in four weeks.",
    messagePlaceholder: "What's the business, and when do you want to launch?",
    cta: "Get my call back",
    value: 100,
  },
  "digital-marketing": {
    eyebrow: "No dashboards until we talk",
    headline: "Tell us what isn't working.",
    blurb:
      "Say where your leads come from today and we'll tell you the cheapest next thing to fix. Straight answer, no retainer pitch.",
    messagePlaceholder: "Where do your leads come from today?",
    cta: "Get my call back",
    value: 50,
  },
};

/** Copy for a service slug, falling back to the generic block. */
export function getLeadFormCopy(slug: string): LeadFormCopy {
  return LEAD_FORM[slug] ?? DEFAULT_LEAD_FORM;
}

/**
 * GA4 lead value for a service slug. Resolved server-side so a tampered
 * client payload can't inflate reported conversion value.
 */
export function leadValueFor(slug: string): number {
  return LEAD_FORM[slug]?.value ?? DEFAULT_LEAD_FORM.value;
}
