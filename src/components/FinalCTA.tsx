"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Phone, Envelope, Calendar, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  CALENDLY_URL,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

const contactOptions = [
  {
    Icon: Envelope,
    label: "Email",
    detail: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    Icon: Phone,
    label: "Call / Text",
    detail: PHONE_DISPLAY,
    href: PHONE_HREF,
  },
  {
    Icon: Calendar,
    label: "Book a call",
    detail: "Pick a time that works",
    href: CALENDLY_URL,
  },
];

export default function FinalCTA() {
  const { ref, isInView } = useInView(0.15);

  return (
    <Section id="contact" theme="dark" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Off-grid eyebrow */}
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
            5 clients per month · 2 spots open
          </span>
        </div>

        {/* Headline — intentionally NOT axis-centered, offset to the left */}
        <h2 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)] lg:max-w-[14ch]">
          Stop losing customers{" "}
          <span className="relative inline-block">
            today
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
            />
          </span>
          .
        </h2>

        <p className="measure mt-8 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          A 15-minute call. No commitment, no credit card. Just a clear
          picture of what&apos;s costing you customers and what we&apos;d
          do about it.
        </p>

        {/* Primary CTA — single button, no breathe, no shadow soup */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-9 py-4 text-[length:var(--text-body)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Claim your free audit
            <ArrowRight size={18} weight="bold" />
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            <Phone size={16} weight="bold" />
            <span className="tabular">Call Now · {PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Contact strip — 3 hairline-separated rows, mirrors LocalTrust */}
        <ul className="mt-16 grid grid-cols-1 divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {contactOptions.map(({ Icon, label, detail, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 px-2 py-5 text-[var(--color-dark-text-secondary)] hover:text-[var(--color-toxic-text)] sm:px-6"
              >
                <Icon size={22} weight="regular" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                    {label}
                  </span>
                  <span className="tabular truncate text-[length:var(--text-body)] font-medium">
                    {detail}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
