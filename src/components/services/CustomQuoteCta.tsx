"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

// Prominent "Request a custom quote" promo block. Placed immediately after
// the pricing tiers (or PrintCategoryBands) on every service page so
// price-sensitive visitors see an alternate path before they bounce. Must
// rival the pricing grid in visual weight — dark background, toxic accent,
// large display headline. Never gets buried.

export default function CustomQuoteCta({
  serviceSlug,
  eyebrow = "Pricing not the right fit?",
  headline = "Get a quote built around",
  highlight = "your scope and budget",
  copy = "Tiers are starting points, not gates. Send a quick brief — even a sentence — and we'll come back with a custom quote within 24 hours. Most small businesses don't need everything in a tier; some need more.",
}: {
  serviceSlug?: string;
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  copy?: string;
}) {
  const { ref, isInView } = useInView(0.05);
  const href = serviceSlug
    ? `/services/request-quote?service=${encodeURIComponent(serviceSlug)}`
    : "/services/request-quote";

  return (
    <Section theme="dark" pad="spacious" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 20% 30%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(0,255,212,0.06), transparent 70%)",
        }}
      />
      <div
        ref={ref}
        className={cn(
          "relative grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-5 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            {headline}{" "}
            <span className="relative inline-block">
              {highlight}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </h2>
          <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            {copy}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
            <li>· Free</li>
            <li>· No spam</li>
            <li>· Reply within 24 hours</li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-col gap-4 rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/60 p-7 backdrop-blur-sm">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
              Custom brief · 90 seconds
            </span>
            <p className="text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Pick the services, describe the project, drop in references if
              you have any. Optional budget + timeline help us scope.
            </p>
            <a
              href={href}
              role="button"
              onClick={() =>
                trackEvent("request_custom_quote", {
                  source: serviceSlug ?? "unknown",
                  location: "pricing_section",
                  value: 1,
                })
              }
              className={cn(
                "mt-2 inline-flex items-center justify-between gap-2 rounded-full px-7 py-4",
                "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]",
                "text-[length:var(--text-secondary)] font-bold uppercase tracking-wider",
                "transition-colors",
              )}
            >
              Request a custom quote
              <ArrowRight size={18} weight="bold" />
            </a>
            <p className="text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
              Or skip the form: call (770) 744-2536 or email
              hello@brandingzombiedesigns.com.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
