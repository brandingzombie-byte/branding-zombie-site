// ─── Homepage FAQ — single source of truth ──────────────────────────────────
// Consumed by both the visible FAQ accordion (components/FAQ.tsx) AND the
// FAQPage JSON-LD on the homepage (app/page.tsx). Keeping ONE copy guarantees
// the structured data matches the on-page text — a hard Google requirement for
// FAQ rich results (mismatched markup risks a manual action).

export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "How fast can you actually build my website?",
    answer:
      "Most sites are live in 2–3 weeks. Launch Kit landing pages ship in about 10 days. Our AI-assisted workflow (Figma + Claude Code) lets us move at startup speed — AI for speed, humans for taste. We'll give you a realistic timeline on our discovery call.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "Even better — we'll start with a free audit to identify what's working, what's not, and what's costing you customers. From there, we can redesign, optimize, or rebuild from scratch depending on what makes sense for your goals and budget.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Our starter sites begin at $1,500 and go up to $10,000+ for fully custom web applications. Most local businesses land in the $2,500-$5,000 range. We always provide a transparent quote before starting — no surprises, no hidden fees.",
  },
  {
    question: "What is AI integration and do I actually need it?",
    answer:
      "AI integration means adding smart automation to your business — like a chatbot that answers customer questions 24/7, an email system that follows up with leads automatically, or tools that streamline your daily operations. If you're missing calls, losing leads after hours, or spending too much time on repetitive tasks, AI can help.",
  },
  {
    question: "Do you work with my type of business?",
    answer:
      "We work with all kinds of local businesses — restaurants, salons, dental offices, HVAC companies, realtors, boutiques, gyms, law firms, and more. If you serve customers in Forsyth County and beyond, we can help you get found online and convert more visitors into paying customers.",
  },
  {
    question: "What about ongoing maintenance and support?",
    answer:
      "We offer monthly maintenance plans starting at $100/month that include updates, backups, security monitoring, and minor edits. You'll also get priority support and a monthly performance report. We don't disappear after launch — we're your long-term web partner.",
  },
  {
    question: "Can you help with print materials too?",
    answer:
      "Absolutely. Our in-house catalog covers 30+ products — business cards, flyers, brochures, banners, retractable stands, posters, custom tablecloths, feather flags, SEG display frames, trade-show booths, yard signs, vehicle wraps, custom apparel, and more — designed and produced under one roof at wholesale pricing, often faster and cheaper than your local print shop.",
  },
  {
    question: "Do you handle ongoing marketing — social media and email?",
    answer:
      "Yes. Managed social media starts at $699/month and done-for-you email marketing at $499/month — both month-to-month, both draft-and-approve so nothing goes out without your sign-off. Combined with local SEO plans from $499/month, we cover the whole ongoing-marketing stack under one roof, and you own every account and every subscriber.",
  },
  {
    question: "How do payments work — and do you offer payment plans?",
    answer:
      "Most projects are 50% to start and 50% before launch, and applicable Georgia sales tax is added where it applies. On projects $2,000 and up, we can split it into a deposit plus equal monthly payments — the total stays the same, it's just easier on cash flow. We accept PayPal, Zelle, Venmo, Cash App, and all major cards (Visa, Mastercard, Amex).",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Three rounds of revisions on each deliverable — plenty to dial it in. Anything outside the original scope (a new page, an extra concept, a change of direction after sign-off) is quoted up front as a flat add-on or at $75/hour before we build it, so there are never surprise charges.",
  },
  {
    question: "Who owns the finished website and files?",
    answer:
      "You do. Once the project is paid in full, the final approved designs and files are yours to keep. Fonts, stock photos, and some plugins are licensed from third parties under their own terms, and we'll always tell you if something needs an ongoing license.",
  },
  {
    question: "Do I have to sign a contract?",
    answer:
      "For smaller jobs, your approved proposal plus our Terms of Service is the agreement. For larger projects we use a short, plain-English service agreement you review and e-sign online in a couple of minutes — and if anything needs tweaking first, there's a one-click button to send us your changes before you sign.",
  },
];
