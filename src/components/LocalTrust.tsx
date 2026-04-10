"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { MapPin, Handshake, Coffee } from "@/components/icons";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    Icon: MapPin,
    label: "Based in Cumming",
    detail: "GA-400 corridor. In-person, real handshakes.",
  },
  {
    Icon: Handshake,
    label: "Chamber Member",
    detail: "Cumming-Forsyth County Chamber of Commerce.",
  },
  {
    Icon: Coffee,
    label: "Coffee's On Us",
    detail: "Every project starts face-to-face. We buy the coffee.",
  },
];

const areas = [
  "Cumming",
  "Alpharetta",
  "Johns Creek",
  "Dawsonville",
  "Buford",
  "Suwanee",
  "Sugar Hill",
  "North Atlanta Metro",
];

export default function LocalTrust() {
  const { ref, isInView } = useInView(0.1);

  return (
    <Section theme="light" pad="tight">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        {/* Eyebrow + headline — short, no display-font hammering */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-text-primary">
            Proudly serving{" "}
            <span className="relative inline-block text-text-primary">
              Cumming
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--color-neon)]"
              />
            </span>{" "}
            &amp; Forsyth County.
          </h2>
          <p className="measure-tight text-[length:var(--text-secondary)] text-text-dim">
            Not a faceless agency in another state. We live here, we work here.
          </p>
        </div>

        {/* One horizontal row of icon-label pairs separated by hairline pipes */}
        <ul className="mt-10 grid grid-cols-1 divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustItems.map(({ Icon, label, detail }) => (
            <li
              key={label}
              className="flex items-center gap-4 px-2 py-5 sm:px-6"
            >
              <Icon size={22} weight="regular" className="text-[var(--color-neon-text)]" />
              <div className="flex flex-col">
                <span className="text-[length:var(--text-body)] font-semibold text-text-primary">
                  {label}
                </span>
                <span className="text-[length:var(--text-caption)] text-text-dim">
                  {detail}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Areas served — caption type, wraps cleanly */}
        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
          <span>Serving</span>
          {areas.map((a, i) => (
            <span key={a} className="flex items-center gap-2">
              <span className="text-text-secondary">{a}</span>
              {i < areas.length - 1 && (
                <span aria-hidden className="text-[var(--color-hairline-strong)]">/</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
