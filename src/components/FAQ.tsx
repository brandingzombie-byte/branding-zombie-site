"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Phone } from "@/components/icons";
import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const faqs = [
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

export default function FAQ() {
  const { ref, isInView } = useInView(0.05);

  return (
    <Section id="faq" theme="light" pad="standard" className="bg-[var(--color-fog)]">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Sticky question header — col-span 4 */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              FAQ
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              Questions?
              <br />
              We&apos;ve got{" "}
              <span className="relative inline-block">
                answers
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
            <p className="measure-tight mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <a
              href={PHONE_HREF}
              className="mt-3 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-neon-text)] hover:underline"
            >
              <Phone size={18} weight="regular" />
              <span className="tabular">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </aside>

        {/* Accordion — col-span 8 */}
        <div className="lg:col-span-8">
          <Accordion className="border-t border-[var(--color-hairline-strong)]">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                className="border-b border-[var(--color-hairline-strong)] data-open:bg-[var(--color-cloud)]/40"
              >
                <AccordionTrigger className="!flex !items-center !justify-between gap-6 !py-6 !text-[length:var(--text-h4)] !font-semibold !text-text-primary aria-expanded:!text-[var(--color-neon-text)] hover:!no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-text-secondary">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
