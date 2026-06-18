"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone } from "@/components/icons";
import Reveal from "@/components/mailers/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import type { MailerFaq } from "@/data/mailer-products";

// Client component so the base-ui Accordion (which uses React context) lives
// inside a client boundary — mirrors the proven ServiceFAQ pattern.
export default function MailerFAQ({
  faqs,
  kind,
}: {
  faqs: MailerFaq[];
  kind: "targeted" | "eddm";
}) {
  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            Questions, answered
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            {kind === "eddm" ? "EDDM" : "Direct mail"},{" "}
            <span className="relative inline-block">
              in plain English
              <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]" />
            </span>
          </h2>
          <a
            href={PHONE_HREF}
            className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-toxic-text)] hover:underline"
          >
            <Phone size={18} weight="regular" />
            <span className="tabular">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </Reveal>
      <div className="lg:col-span-8">
        <Accordion className="border-t border-[var(--color-dark-border-strong)]">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-[var(--color-dark-border-strong)]"
            >
              <AccordionTrigger className="!flex !items-start !justify-between gap-6 !py-5 !text-left !text-[length:var(--text-h4)] !font-semibold !text-[var(--color-dark-text-primary)] aria-expanded:!text-[var(--color-toxic-text)] hover:!no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-[var(--color-dark-text-secondary)]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
