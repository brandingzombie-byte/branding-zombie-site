"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Warning } from "@/components/icons";
import { cn } from "@/lib/utils";

const stats: { value: string; label: string; source?: string }[] = [
  {
    value: "75%",
    label: "of people judge a business by its website.",
    source: "Stanford Web Credibility Project",
  },
  {
    value: "53%",
    label: "leave if your site takes over 3 seconds to load.",
    source: "Google / SOASTA",
  },
  {
    value: "24/7",
    label: "your competitor's chatbot is open. Yours isn't.",
  },
];

export default function PainPoints() {
  const { ref, isInView } = useInView(0.15);

  return (
    <Section theme="light" pad="standard" className="bg-[var(--color-fog)]">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* LEFT: editorial statement card spans 6 columns */}
        <div className="lg:col-span-6">
          <Warning
            size={28}
            weight="duotone"
            className="text-[var(--color-neon-text)]"
          />
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
            If your website looks like it&apos;s from{" "}
            <span className="relative inline-block">
              2016
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            , your customers already noticed.
          </h2>
          <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            You&apos;re not losing customers because your product isn&apos;t
            good. You&apos;re losing them in the seven seconds it takes to load
            your homepage on a phone.
          </p>
        </div>

        {/* RIGHT: stat rows, hairline separators, no card chrome */}
        <ul className="lg:col-span-6 lg:col-start-7">
          {stats.map((s, i) => (
            <li
              key={s.value}
              className={cn(
                "grid grid-cols-[auto_1fr] gap-x-6 py-7",
                i > 0 && "border-t border-[var(--color-hairline-strong)]",
              )}
            >
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none text-[var(--color-neon-text)]">
                {s.value}
              </span>
              <div className="flex min-w-0 flex-col justify-center">
                <p className="text-[length:var(--text-body)] font-medium leading-snug text-text-primary">
                  {s.label}
                </p>
                {s.source && (
                  <p className="mt-1 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                    {s.source}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
