"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";

// ─── Client roster ──────────────────────────────────────────────────────────
// Real client logos drop into /public/assets/clients/<slug>.svg — the
// component auto-detects by trying the SVG path with a fallback to the text
// wordmark. Intentionally mixes product + service brands per build spec:
// the "moat" is 30+ brands across categories, not CPG-specialist pigeonhole.
const CLIENTS = [
  { slug: "papas-kitchen", name: "Papa's Kitchen", kind: "Local · Restaurant" },
  { slug: "enigma-computers", name: "Enigma Computers", kind: "Local · Custom PC" },
  { slug: "sharp-edge", name: "Sharp Edge", kind: "Construction" },
  { slug: "planters-etc", name: "Planters Etc.", kind: "Home + Garden" },
  { slug: "pure-blanco", name: "Pure Blanco", kind: "Streetwear" },
  { slug: "muscleology", name: "Muscleology", kind: "Supplements" },
  { slug: "jay-scotts", name: "Jay Scotts", kind: "B2B" },
  { slug: "squeeze-me-skinny", name: "Squeeze Me Skinny", kind: "CPG" },
];

function ClientMark({ slug, name }: { slug: string; name: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <span className="tabular whitespace-nowrap text-[length:var(--text-secondary)] font-semibold uppercase tracking-[0.08em] text-text-primary">
        {name}
      </span>
    );
  }
  return (
    <Image
      src={`/assets/clients/${slug}.svg`}
      alt={name}
      width={140}
      height={32}
      className="h-8 w-auto max-w-[10rem] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
      onError={() => setBroken(true)}
    />
  );
}

export default function BrandTrackRecord() {
  const { ref, isInView } = useInView(0.1);

  return (
    <Section theme="light" pad="tight" className="bg-[var(--color-fog)]">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-none tracking-tight text-text-primary">
            30+ brands launched.{" "}
            <span className="relative inline-block">
              15+ years in the trenches
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h3>
          <a
            href="/#portfolio"
            className="group inline-flex items-center gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)] hover:underline"
          >
            See the work
            <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="measure mt-3 text-[length:var(--text-secondary)] text-text-dim">
          Restaurants and streetwear. Supplements and construction. Local
          storefronts and DTC ecommerce. If it needs a logo, a label, or a
          website, we&apos;ve shipped it.
        </p>

        <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-[var(--color-hairline-strong)] pt-7">
          {CLIENTS.map((c) => (
            <li key={c.slug} className="flex items-center">
              <ClientMark slug={c.slug} name={c.name} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
