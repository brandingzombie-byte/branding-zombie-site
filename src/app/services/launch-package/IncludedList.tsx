"use client";

import { Check } from "@/components/icons";
import type { ReactNode } from "react";

// Local Business Kit contents — must stay in lockstep with the kit card in
// src/data/kits.ts (local-business). Values come from published à-la-carte
// prices on the linked service pages.
const INCLUDED = [
  {
    title: "Custom Logo & Brand Identity",
    value: "$1,750 value",
    description:
      "Custom logo (never a template or a generator) plus brand basics: color palette with hex + CMYK, typography system, and a one-page brand sheet your team can share.",
    link: "/services/logo-design" as const,
  },
  {
    title: "Starter Website — up to 5 pages",
    value: "$2,500 value",
    description:
      "Custom-designed responsive site on Next.js or Webflow, CMS you can actually update, contact form, on-page SEO, GA4 tracking, SSL and hosting setup.",
    link: "/services/web-design" as const,
  },
  {
    title: "Print Starter Pack",
    value: "$300+ value",
    description:
      "500 business cards and 1,000 flyers or rack cards — designed to match the new brand and produced through our in-house print pipeline.",
    link: "/services/print-design" as const,
  },
  {
    title: "Google Business Profile + Basic SEO",
    value: "Included",
    description:
      "Google Business Profile set up and verified, schema markup, meta tags, and page-level optimization so your new site starts showing up for your town.",
    link: "/services/digital-marketing" as const,
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
