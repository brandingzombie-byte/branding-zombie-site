"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Check, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { KITS } from "@/data/kits";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";

// The kit ladder lives in src/data/kits.ts — single source of truth for
// names, prices, contents, and honest savings math. The $997 Launch Kit
// renders as the banner; the other three render as cards.
const plans = KITS.filter((k) => k.slug !== "launch");

export default function Pricing() {
  const { ref, isInView } = useInView(0.05);

  return (
    <Section id="pricing" theme="light" pad="spacious">
      {/* ── Zombie hand layer (decorative, behind content) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] overflow-x-clip"
      >
        {/* Thumbs-up endorsing the kit ladder (right edge). Desktop only now —
            on mobile it read as a hand "hiding behind" the cards, so mobile gets
            a clearer second hand off the left edge (below the header). */}
        <ZombieHand
          src={HANDS["zh37-thumbsup-r"].src}
          width={HANDS["zh37-thumbsup-r"].width}
          height={HANDS["zh37-thumbsup-r"].height}
          edge="right"
          behaviors={["peek", "idle"]}
          offset="46%"
          bleed="-42px"
          displayWidth={330}
          zIndex={5}
        />
      </div>
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
              Pick a package.{" "}
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
            Want several services together? These bundles combine them for less
            than buying à la carte. Just opening? Start with the $997 Launch
            Kit. Every package includes a free discovery call.
          </p>
        </div>

        {/* Mobile-only thumbs-up — comes off the left screen edge in its own
            band between the intro and the kit ladder, endorsing the packages
            below. Peek + idle sway + gentle scroll parallax so it feels alive. */}
        <div
          aria-hidden
          className="pointer-events-none relative -mx-6 mt-8 h-[145px] overflow-x-clip md:hidden"
        >
          <ZombieHand
            src={HANDS["zh01-thumbsup-l"].src}
            width={HANDS["zh01-thumbsup-l"].width}
            height={HANDS["zh01-thumbsup-l"].height}
            edge="left"
            behaviors={["peek", "parallax", "idle"]}
            offset="6px"
            bleed="-30px"
            displayWidth={450}
            parallaxSpeed={0.1}
            zIndex={5}
            mobile
            mobileParallax
          />
        </div>

        {/* $997 promo banner — leads the pricing with the budget-friendly
            entry so first-time buyers and refresh shoppers don't bounce on
            the $2,800 floor. Image-left, copy-right on desktop; stacked on
            mobile. Whole card is the link target. */}
        <a
          href="/startup-special"
          className="group mt-12 grid grid-cols-1 overflow-hidden border-2 border-[var(--color-text-primary)] bg-[var(--color-grave)] lg:grid-cols-5"
        >
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:col-span-2">
            <Image
              src="/assets/startup-special/hero.png"
              alt="$997 Launch Kit — opening-day package banner"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 lg:col-span-3 lg:p-12">
            <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              Just launching? · Open-day kit
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
              Launch Kit — $997
            </h3>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Logo + 1-page website + 100 business cards + 100 flyers.
              Everything you need for opening day, shipped in 10 days. Five
              slots per month.
            </p>
            <span className="inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] transition-transform duration-200 group-hover:translate-x-1">
              See the Launch Kit
              <ArrowRight size={16} weight="bold" />
            </span>
          </div>
        </a>

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
                      "tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none tracking-tight",
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

                {/* Honest bundle math — à la carte total vs kit price, from
                    our own published single-service prices (see data/kits.ts). */}
                <p
                  className={cn(
                    "mt-6 border-t pt-4 text-[length:var(--text-secondary)] leading-relaxed",
                    dark
                      ? "border-[var(--color-dark-border)] text-[var(--color-dark-text-secondary)]"
                      : "border-[var(--color-hairline)] text-text-secondary",
                  )}
                >
                  <span className="tabular">{plan.alaCarteTotal}</span> booked
                  separately —{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      dark
                        ? "text-[var(--color-toxic-text)]"
                        : "text-[var(--color-neon-text)]",
                    )}
                  >
                    you save {plan.savings}
                  </span>
                  .
                </p>
                <p
                  className={cn(
                    "mt-2 text-[length:var(--text-caption)]",
                    dark
                      ? "text-[var(--color-dark-text-dim)]"
                      : "text-text-dim",
                  )}
                >
                  Or split it into 3 monthly payments — just ask.
                </p>

                {/* CTA */}
                <a
                  href={plan.quoteHref}
                  role="button"
                  className={cn(
                    "mt-8 inline-flex items-center justify-between gap-2 rounded-full px-6 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider",
                    dark
                      ? "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                      : "border border-[var(--color-hairline-strong)] text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
                  )}
                >
                  Choose {plan.name}
                  <ArrowRight size={16} weight="bold" />
                </a>
              </article>
            );
          })}
        </div>

        {/* Custom-quote escape hatch. The "Just launching?" link that used
            to live here is now the full-width banner above the cards. */}
        <div className="mt-8 text-[length:var(--text-secondary)] text-text-dim">
          <p>
            Custom quote for unique projects.{" "}
            <a
              href="/services/request-quote"
              className="font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
            >
              Tell us what you need →
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
