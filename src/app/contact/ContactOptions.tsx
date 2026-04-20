"use client";

import { Phone, Envelope, Calendar } from "@/components/icons";
import {
  CALENDLY_URL,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

const options = [
  {
    Icon: Phone,
    label: "Call or text",
    value: PHONE_DISPLAY,
    detail: "Fastest way to reach Gerry directly.",
    href: PHONE_HREF,
    external: false,
  },
  {
    Icon: Envelope,
    label: "Email",
    value: EMAIL,
    detail: "Reply within one business day — usually same day.",
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    Icon: Calendar,
    label: "Book a free audit",
    value: "15 minutes · no commitment",
    detail: "Walk through your site or brand live on a call.",
    href: CALENDLY_URL,
    external: true,
  },
];

export default function ContactOptions() {
  return (
    <ul className="flex flex-col divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)]">
      {options.map(({ Icon, label, value, detail, href, external }) => (
        <li key={label}>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex items-start gap-4 py-5 text-text-primary hover:text-[var(--color-neon-text)]"
          >
            <Icon
              size={22}
              weight="regular"
              className="mt-1 shrink-0 text-[var(--color-neon-text)]"
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                {label}
              </span>
              <span className="tabular mt-1 text-[length:var(--text-body)] font-semibold">
                {value}
              </span>
              <span className="mt-1 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                {detail}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
