"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Check, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "New Business Launch",
    price: "$2,800",
    daily: "≈ $8/day · year one",
    description: "For new businesses that need to look legit, fast.",
    features: [
      "Custom logo & brand identity",
      "Starter website (up to 5 pages)",
      "Mobile responsive design",
      "500 business cards",
      "1,000 flyers / rack cards",
      "Google Business Profile setup",
      "Basic SEO optimization",
    ],
    cta: "Start the build",
    popular: false,
  },
  {
    name: "Digital Makeover",
    price: "$4,500",
    daily: "≈ $13/day · year one",
    description: "Our most-requested package. Built to level up.",
    features: [
      "Everything in Starter",
      "Custom website (up to 10 pages)",
      "AI chatbot integration",
      "Google Business optimization",
      "Social media template pack (20)",
      "On-page SEO + analytics setup",
      "Blog/CMS setup & training",
      "3 rounds of revisions",
    ],
    cta: "Choose Digital Makeover",
    popular: true,
  },
  {
    name: "Full Zombie Treatment",
    price: "$8,000+",
    daily: "≈ $22/day · year one",
    description: "For businesses ready to dominate. The complete kit.",
    features: [
      "Everything in Digital Makeover",
      "Custom-coded web app",
      "Advanced AI workflow automation",
      "Marketing automation setup",
      "3 months social media management",
      "Complete print starter kit",
      "Vehicle wrap design",
      "Priority support & quarterly reviews",
    ],
    cta: "Go full zombie",
    popular: false,
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.05);

  return (
    <Section id="pricing" theme="light" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Header — left-aligned */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              Pricing
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              Three packages.{" "}
              <span className="relative inline-block">
                Zero hidden fees
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            Every package includes a free discovery call. Pick what you need
            today, add the rest as you grow.
          </p>
        </div>

        {/* Cards — middle becomes a dark mini-island */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] lg:grid-cols-3">
          {plans.map((plan) => {
            const dark = plan.popular;
            return (
              <article
                key={plan.name}
                data-theme={dark ? "dark" : "light"}
                className={cn(
                  "relative flex flex-col p-8 lg:p-10",
                  dark
                    ? "bg-[var(--color-grave)] text-[var(--color-dark-text-primary)]"
                    : "bg-[var(--color-cloud)] text-text-primary",
                )}
              >
                {/* Top accent bar — only on the popular card */}
                {dark && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[var(--color-toxic)]"
                  />
                )}

                {/* Plan eyebrow */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]",
                      dark
                        ? "text-[var(--color-toxic-text)]"
                        : "text-[var(--color-neon-text)]",
                    )}
                  >
                    {plan.popular ? "Most popular" : plan.name}
                  </span>
                  {plan.popular && (
                    <>
                      <span
                        aria-hidden
                        className="h-px flex-1 bg-[var(--color-toxic)]/30"
                      />
                    </>
                  )}
                </div>

                {/* Plan name (when popular eyebrow took the slot) */}
                {plan.popular && (
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight">
                    {plan.name}
                  </h3>
                )}

                <p
                  className={cn(
                    "mt-3 text-[length:var(--text-secondary)] leading-relaxed",
                    dark
                      ? "text-[var(--color-dark-text-secondary)]"
                      : "text-text-secondary",
                  )}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-7">
                  <div
                    className={cn(
                      "tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-tight",
                      dark
                        ? "text-[var(--color-toxic-text)]"
                        : "text-text-primary",
                    )}
                  >
                    {plan.price}
                  </div>
                  <div
                    className={cn(
                      "mt-2 tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em]",
                      dark
                        ? "text-[var(--color-dark-text-dim)]"
                        : "text-text-dim",
                    )}
                  >
                    {plan.daily}
                  </div>
                </div>

                {/* Features */}
                <ul
                  className={cn(
                    "mt-8 flex flex-1 flex-col gap-3 border-t pt-6",
                    dark
                      ? "border-[var(--color-dark-border)]"
                      : "border-[var(--color-hairline)]",
                  )}
                >
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[length:var(--text-secondary)] leading-relaxed"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        className={cn(
                          "mt-1 shrink-0",
                          dark
                            ? "text-[var(--color-toxic-text)]"
                            : "text-[var(--color-neon-text)]",
                        )}
                      />
                      <span
                        className={
                          dark
                            ? "text-[var(--color-dark-text-secondary)]"
                            : "text-text-secondary"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  role="button"
                  className={cn(
                    "mt-8 inline-flex items-center justify-between gap-2 rounded-full px-6 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider",
                    dark
                      ? "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                      : "border border-[var(--color-hairline-strong)] text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
                  )}
                >
                  {plan.cta}
                  <ArrowRight size={16} weight="bold" />
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-[length:var(--text-secondary)] text-text-dim">
          Custom quote for unique projects.{" "}
          <a
            href="#contact"
            className="font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
          >
            Tell us what you need →
          </a>
        </p>
      </div>
    </Section>
  );
}
