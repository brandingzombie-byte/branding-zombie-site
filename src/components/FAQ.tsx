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
import { FAQS as faqs } from "@/data/faqs";

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
