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
      "Most projects launch in 10-14 days. Our AI-powered workflow (Figma + Claude Code + Replit) lets us move at startup speed without sacrificing quality. Simple sites can be done in as little as 5-7 days. We'll give you a realistic timeline on our discovery call.",
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
      "Absolutely. We have wholesale trade accounts that let us produce business cards, flyers, banners, yard signs, vehicle wraps, custom apparel, and more — often faster and cheaper than your local print shop.",
  },
];
