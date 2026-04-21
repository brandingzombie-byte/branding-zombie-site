"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { Clock } from "@/components/icons";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    day: "Day 1",
    title: "We Talk",
    description:
      "Discovery call to understand your business, goals, and customers. We learn what makes you different.",
    icon: "/assets/SVG/we-talk-icon.svg",
  },
  {
    n: "02",
    day: "Day 3–5",
    title: "We Design",
    description:
      "Custom concepts in Figma. You pick your favorite direction. Real-time collaboration, no surprises.",
    icon: "/assets/SVG/we-design-icon.svg",
  },
  {
    n: "03",
    day: "Day 5–10",
    title: "We Build",
    description:
      "AI-powered development with real-time preview access. You watch your site come to life.",
    icon: "/assets/SVG/we-build-icon.svg",
  },
  {
    n: "04",
    day: "Day 10–14",
    title: "You Launch",
    description:
      "Go live with full training and support. We make sure everything is perfect before we hand over the keys.",
    icon: "/assets/SVG/you-launch-icon.svg",
  },
];

export default function Process() {
  const { ref, isInView } = useInView(0.05);

  return (
    <Section
      id="process"
      theme="light"
      pad="tight"
      className="bg-[var(--color-fog)] overflow-hidden"
    >
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Header — left rail */}
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            How we work
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            Most agencies take{" "}
            <span className="text-text-dim line-through decoration-[var(--color-destructive)]/60 decoration-2">
              4–8 weeks
            </span>
            .{" "}
            <span className="relative inline-block">
              We launch in days
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h2>
          <p className="measure-tight mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            Figma + AI-powered development means a premium site at startup
            speed, not agency time.
          </p>
        </div>

        {/* Step rail — right side, 4 slides on desktop */}
        <div className="lg:col-span-8">
          <div className="relative">
            {/* Bottom connector line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-12 h-px bg-[var(--color-hairline-strong)]"
            />
            <ol className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
              {steps.map((step, i) => (
                <li
                  key={step.n}
                  className="relative flex min-w-[78%] shrink-0 snap-start flex-col sm:min-w-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
                      {step.n}
                    </span>
                    <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                      {step.day}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[length:var(--text-h4)] font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    {step.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={step.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 opacity-80"
                    />
                    {i === steps.length - 1 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-neon)]/15 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider text-[var(--color-neon-text)]">
                        <Clock size={13} weight="regular" />
                        2 weeks total
                      </span>
                    )}
                  </div>

                  {/* Step dot anchored to the connector line */}
                  <span
                    aria-hidden
                    className="absolute bottom-[2.5rem] left-0 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-neon-text)] sm:block"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
