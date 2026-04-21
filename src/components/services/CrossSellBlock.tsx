"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/data/services";

// Two-card cross-sell per spec Section 7.3:
// - Left  "Need the whole thing?" → Launch Package ($4,500 bundle)
// - Right "Already launched?" → Retainer services ($499/mo+)
// Rendered on every service page above the final CTA.

export default function CrossSellBlock({ currentSlug }: { currentSlug?: ServiceSlug }) {
  const { ref, isInView } = useInView(0.1);
  const suppressLaunch = currentSlug === "launch-package";

  return (
    <Section theme="light" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] md:grid-cols-2">
          {!suppressLaunch && (
            <a
              href="/services/launch-package"
              className="group relative flex min-h-[14rem] flex-col justify-between bg-[var(--color-cloud)] p-8 transition-colors hover:bg-[var(--color-mist)] lg:p-10"
            >
              <div>
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
                  Need the whole thing?
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
                  Launch Package —{" "}
                  <span className="tabular text-[var(--color-neon-text)]">$4,500</span>
                </h3>
                <p className="measure mt-4 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                  Logo + brand basics + 5-page website, shipped in 4 weeks.
                  <span className="text-text-primary"> Save $2,000</span> vs.
                  buying each à la carte.
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-text-primary group-hover:text-[var(--color-neon-text)]">
                See what&apos;s included
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </a>
          )}

          <a
            href="/services/digital-marketing"
            className="group relative flex min-h-[14rem] flex-col justify-between bg-[var(--color-surface-0)] p-8 transition-colors hover:bg-[var(--color-mist)] lg:p-10"
          >
            <div>
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
                Already launched?
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
                Keep it moving —{" "}
                <span className="tabular text-[var(--color-neon-text)]">from $499/mo</span>
              </h3>
              <p className="measure mt-4 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Monthly social or SEO support. No project-by-project hassle,
                no month-to-month mystery — just consistent work on the
                things that bring you business.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-text-primary group-hover:text-[var(--color-neon-text)]">
              See retainer plans
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
}
