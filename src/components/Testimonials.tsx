"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Quotes } from "@/components/icons";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "They completely transformed our online presence. Our website looks incredible and we're getting more calls than ever. Best investment we've made for the business.",
    name: "Sarah Mitchell",
    business: "Mitchell Family Dental",
    type: "Dental Practice",
    location: "Cumming, GA",
  },
  {
    quote:
      "The AI chatbot alone paid for itself in the first month. We went from missing calls after hours to booking appointments 24/7. Game changer.",
    name: "Marcus Chen",
    business: "Chen's Auto Repair",
    type: "Auto Service",
    location: "Cumming, GA",
  },
  {
    quote:
      "I was running my boutique without any real web presence. Branding Zombie built my Shopify store and I'm now shipping orders across Georgia. Couldn't be happier.",
    name: "Jessica Alvarez",
    business: "Peach & Pine Boutique",
    type: "Retail",
    location: "Forsyth County, GA",
  },
  {
    quote:
      "From logo to website to business cards — they handled everything. Fast turnaround, fair pricing, and they actually listen. Highly recommend.",
    name: "David Thompson",
    business: "Thompson HVAC Solutions",
    type: "HVAC Contractor",
    location: "Cumming, GA",
  },
];

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "4.9", label: "Google rating" },
  { value: "<14", label: "Days avg. delivery" },
  { value: "100%", label: "Client satisfaction" },
];

export default function Testimonials() {
  const { ref, isInView } = useInView(0.05);
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <Section theme="light" pad="standard">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
          Social proof
        </span>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* LEFT: pull-quote (col-span 7) */}
          <figure className="relative lg:col-span-7">
            <Quotes
              size={42}
              weight="fill"
              className="absolute -top-2 -left-2 text-[var(--color-neon)]"
            />
            <blockquote
              key={active}
              className="animate-fade-up relative font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary opacity-0"
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[length:var(--text-secondary)]">
              <span className="text-[length:var(--text-body)] font-semibold text-text-primary">
                {current.name}
              </span>
              <span className="text-text-dim">
                — {current.business} · {current.type} · {current.location}
              </span>
            </figcaption>
          </figure>

          {/* RIGHT: clickable list (col-span 5) */}
          <div className="lg:col-span-5">
            <ul role="tablist" className="border-y border-[var(--color-hairline-strong)]">
              {testimonials.map((t, i) => {
                const isActive = i === active;
                return (
                  <li key={i} className={cn(i > 0 && "border-t border-[var(--color-hairline-strong)]")}>
                    <button
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      className={cn(
                        "group relative flex w-full items-start gap-4 py-5 text-left",
                        isActive ? "text-text-primary" : "text-text-dim hover:text-text-primary",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-5 h-[calc(100%-2.5rem)] w-[2px] transition-colors",
                          isActive ? "bg-[var(--color-neon)]" : "bg-transparent",
                        )}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1 pl-4">
                        <span className="text-[length:var(--text-body)] font-semibold">
                          {t.name}
                        </span>
                        <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em]">
                          {t.business} · {t.location}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Stats — caption-typed line, not card grid */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-[var(--color-hairline-strong)] pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)]">
                {s.value}
              </div>
              <div className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
