// ─── "How We Work" FAQ — single source of truth ─────────────────────────────
// Consumed by BOTH the visible accordion (components/HowWeWork.tsx) AND the
// FAQPage JSON-LD on app/how-we-work/page.tsx. One copy keeps the structured
// data identical to the on-page text — a hard requirement for valid FAQ markup
// and clean grounding by AI answer engines.

import type { Faq } from "@/data/faqs";

export const HOW_WE_WORK_FAQS: Faq[] = [
  {
    question: "How do payments work?",
    answer:
      "Most projects are simple: 50% to get started, 50% before your project goes live (or before final files are handed over). The deposit reserves your spot on the calendar and kicks off the work. Applicable Georgia sales tax is added where it applies.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes — on projects $2,000 and up, we can split it into a deposit plus equal monthly payments over an agreed term. Just ask, and we'll build it into your proposal. The payments are spread out; the total stays the same.",
  },
  {
    question: "When are invoices due?",
    answer:
      "Within 7 days. There's a short grace period, and then a small late fee (1.5% per month) applies to overdue balances. If an invoice goes unpaid, we press pause on the work until it's caught up — nothing personal, it just keeps every client's project moving fairly.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Three rounds of revisions on each part of your project — plenty to dial things in. Send your feedback all together in one batch each round and we'll knock it out fast.",
  },
  {
    question: "What if I want something that wasn't in the original plan?",
    answer:
      "No problem. Anything outside what we originally agreed to (a new page, an extra logo concept, a change of direction after sign-off) is handled with a quick change order: we tell you the price up front — either a flat add-on or $75/hour — you approve it, and then we build it. No surprise charges, ever.",
  },
  {
    question: "How long will my project take?",
    answer:
      "It depends on scope — a Launch Kit is about 10 days, most websites are 2–3 weeks. The timeline in your proposal assumes we get your content, feedback, and approvals promptly. The #1 thing that speeds your project up (or slows it down) is how quickly you get things back to us.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Content, photos, logins, and feedback within about a week of each request, plus a timely thumbs-up at each stage. One clear point of contact makes everything smoother. If a project goes quiet on the client's end for a long stretch (30 days), we may have to pause and reschedule it — so let's keep the momentum.",
  },
  {
    question: "Who owns the final work?",
    answer:
      "You do — once the project is paid in full, the final approved designs and files are yours. Fonts, stock photos, and certain plugins are licensed from third parties under their own terms, and we'll always tell you if something needs an ongoing license. We may show finished work in our portfolio unless you ask us to keep it private.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes, anytime, in writing. You'd cover the work completed up to that point, and deposits aren't refundable since they reserve your slot and cover the early work. Custom print orders can't be cancelled once they're on the press.",
  },
  {
    question: "Do you guarantee results — more sales, higher Google rankings?",
    answer:
      "We guarantee craftsmanship — design and build done right, professionally. What we can't promise is a specific business outcome, because sales, traffic, and rankings depend on lots of things outside a designer's hands (your pricing, your market, your follow-through). What we will do is build you something that gives you the best possible shot.",
  },
  {
    question: "Is there a contract?",
    answer:
      "For smaller jobs, your approved proposal plus our Terms of Service is the agreement. For larger projects we use a short, plain-English service agreement you review and e-sign online in a couple of minutes — and if anything needs tweaking first, there's a one-click button to send us your changes before you sign.",
  },
];
