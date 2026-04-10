"use client";

import { Phone } from "@/components/icons";
import Section from "@/components/Section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import type { Service } from "@/data/services";

export default function ServiceFAQ({ service }: { service: Service }) {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="light" pad="standard" className="bg-[var(--color-fog)]">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              {service.faqEyebrow}
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
              {service.faqHeadline}{" "}
              <span className="relative inline-block">
                {service.faqHighlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-neon-text)] hover:underline"
            >
              <Phone size={18} weight="regular" />
              <span className="tabular">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <Accordion className="border-t border-[var(--color-hairline-strong)]">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[var(--color-hairline-strong)] data-open:bg-[var(--color-cloud)]/40"
              >
                <AccordionTrigger className="!flex !items-center !justify-between gap-6 !py-6 !text-[length:var(--text-h4)] !font-semibold !text-text-primary aria-expanded:!text-[var(--color-neon-text)] hover:!no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-text-secondary">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
