"use client";

import { Check } from "@/components/icons";
import type { ReactNode } from "react";

const INCLUDED = [
  {
    title: "Logo Design — Growth tier",
    value: "$1,500 value",
    description:
      "Full logo suite (primary, secondary, icon, horizontal, stacked), 3 concept directions, unlimited revisions on the chosen one, full file package across color and mono.",
    link: "/services/logo-design" as const,
  },
  {
    title: "Brand Basics Mini Guide",
    value: "$1,000 value",
    description:
      "Color palette with hex + CMYK + Pantone, typography system with web-safe fallbacks, one-page brand sheet your team can share.",
    link: "/services/branding" as const,
  },
  {
    title: "Web Design Starter — 5-page site",
    value: "$2,500 value",
    description:
      "Custom-designed 5-page responsive site on Next.js or Webflow, CMS you can actually update, contact form, on-page SEO, GA4 tracking, SSL and hosting setup.",
    link: "/services/web-design" as const,
  },
  {
    title: "Bonus: 90-day Content Calendar",
    value: "$499 value",
    description:
      "A full 90-day social content calendar (Instagram + one secondary platform) so you don't walk into launch day with no plan for what to post in week two.",
    link: "/services/social-media" as const,
  },
];

export default function IncludedList() {
  return (
    <ul className="flex flex-col divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)]">
      {INCLUDED.map((item) => (
        <li key={item.title} className="py-6">
          <a
            href={item.link}
            className="group flex flex-col gap-3 text-text-primary hover:text-[var(--color-neon-text)] sm:flex-row sm:items-start sm:gap-6"
          >
            <Check
              size={20}
              weight="bold"
              className="mt-1 shrink-0 text-[var(--color-neon-text)]"
            />
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-[length:var(--text-h4)] font-semibold">
                  {item.title}
                </span>
                <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                  {item.value}
                </span>
              </div>
              <p className="text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                {item.description as ReactNode}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
