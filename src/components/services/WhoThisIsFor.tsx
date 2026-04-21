"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Check, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/site";

export default function WhoThisIsFor({ items }: { items: string[] }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <Section theme="light" pad="standard" topRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Who this is for
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            If any of these sound like{" "}
            <span className="relative inline-block">
              you
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h2>
        </div>

        <div className="lg:col-span-8">
          <ul className="flex flex-col divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)]">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 py-4 text-[length:var(--text-body)] leading-relaxed text-text-secondary"
              >
                <Check
                  size={18}
                  weight="bold"
                  className="mt-1 shrink-0 text-[var(--color-neon-text)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[length:var(--text-secondary)] text-text-dim">
            Not sure if you fit?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[var(--color-neon-text)] hover:underline"
            >
              Book a free consultation
              <ArrowRight size={12} weight="bold" />
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
