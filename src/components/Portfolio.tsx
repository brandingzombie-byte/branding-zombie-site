"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Papa's Kitchen Diner",
    url: "papaskitchendinerga.com",
    category: "Local GA · Restaurant · Ecommerce",
    description:
      "Family-owned diner in Georgia. Built full online ordering with checkout and a monthly subscription service to drive recurring revenue from regulars.",
    result: "Online orders + subscriptions live",
    tags: ["Local GA", "Restaurant", "Subscriptions"],
    image: "/assets/portfolio-papaskitchen.png",
  },
  {
    title: "Enigma Computers",
    url: "enigma-computers-site.vercel.app",
    category: "Local Cumming · Branding · RFQ Platform",
    description:
      "Custom PC build company in Cumming, GA. Full branding and a request-for-quote workflow that converts visitors into qualified leads through a guided build process.",
    result: "Full RFQ funnel · branded experience",
    tags: ["Local Cumming", "Branding", "Custom Builds"],
    image: "/assets/portfolio-enigma.png",
  },
  {
    title: "Planters Etc.",
    url: "plantersetc.com",
    category: "Branding · Ecommerce",
    description:
      "Complete brand identity and ecommerce build with 75 SKUs. Took an existing brand and elevated it into a conversion-driven online store from the ground up.",
    result: "$100k in sales · year one",
    tags: ["Branding", "Ecommerce", "75 SKUs"],
    image: "/assets/portfolio-planters.png",
  },
  {
    title: "Squeeze Me Skinny",
    url: "squeezmeskinny.com",
    category: "Rebrand · Affiliate platform",
    description:
      "Full rebrand, ecommerce build, and affiliate platform. Scaled to hundreds of affiliates driving consistent monthly revenue.",
    result: "$200k in sales · monthly average",
    tags: ["Rebranding", "Ecommerce", "Affiliate"],
    image: "/assets/portfolio-squeeze.png",
  },
  {
    title: "Jay Scotts",
    url: "jayscotts.com",
    category: "B2B Pipeline · Automations",
    description:
      "Full B2B sales pipeline build, customer service automations, and email marketing. Turned a manual sales process into a high-volume automated revenue engine.",
    result: "$100k in sales · weekly average",
    tags: ["B2B Sales", "Automations", "Email"],
    image: "/assets/portfolio-jayscotts.png",
  },
  {
    title: "Pure Blanco",
    url: "pureblanco.com",
    category: "Branding · Shopify",
    description:
      "Complete brand identity and Shopify ecommerce build for a gothic streetwear label. Bold visual identity, product collections, and a storefront built to convert.",
    result: "Concept → live store · 4 weeks",
    tags: ["Branding", "Shopify", "Streetwear"],
    image: "/assets/portfolio-blanco.png",
  },
  {
    title: "Muscleology",
    url: "muscleology.com",
    category: "Ecommerce · Marketing",
    description:
      "Full ecommerce build for a premium supplements brand. Product catalog, stack builder, blog, and conversion-focused layout driving repeat purchases.",
    result: "Multi-product catalog at scale",
    tags: ["Ecommerce", "Supplements", "Email"],
    image: "/assets/portfolio-muscleology.png",
  },
  {
    title: "Sharp Edge Construction",
    url: "sharpedgeconstructionfl.com",
    category: "Branding · Web Design",
    description:
      "Construction company based in Key West, FL specializing in spalling repair, structural rebuilding, and government contracts. Full site build showcasing services, certifications, and project capabilities.",
    result: "Government-ready · digital presence",
    tags: ["Construction", "Web Design", "Government"],
    image: "/assets/portfolio-sharpedge.png",
  },
];

export default function Portfolio() {
  const { ref, isInView } = useInView(0.05);
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <Section
      id="portfolio"
      theme="dark"
      pad="spacious"
      topRule
      bottomRule
    >
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
              Selected work
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
              Real brands.{" "}
              <span className="relative inline-block">
                Real numbers
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure-tight text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
            Eight recent projects across construction, ecommerce, and B2B.
          </p>
        </div>

        {/* 12-col asymmetric grid: 8-col feature image / 4-col vertical thumbs */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          {/* Feature image */}
          <figure className="lg:col-span-8">
            <div
              key={active}
              className="animate-fade-up relative aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--color-dark-border)] bg-[var(--color-surface)] opacity-0"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
            <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none tracking-tight text-[var(--color-dark-text-primary)]">
                {current.title}
              </h3>
              <a
                href={`https://${current.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-toxic-text)] hover:text-[var(--color-toxic)]"
              >
                {current.url}
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </figcaption>
            <p className="measure mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              {current.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="tabular text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
                {current.result}
              </span>
              <span aria-hidden className="h-3 w-px bg-[var(--color-dark-border-strong)]" />
              {current.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]"
                >
                  {tag}
                  {i < current.tags.length - 1 && (
                    <span aria-hidden className="ml-3 text-[var(--color-dark-border-strong)]">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </figure>

          {/* Vertical thumbnail rail */}
          <ul role="tablist" className="lg:col-span-4">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.title}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 border-b border-[var(--color-dark-border)] py-4 text-left",
                      isActive ? "text-[var(--color-dark-text-primary)]" : "text-[var(--color-dark-text-dim)] hover:text-[var(--color-dark-text-primary)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-1/2 h-[60%] w-[2px] -translate-y-1/2 transition-colors",
                        isActive ? "bg-[var(--color-toxic)]" : "bg-transparent",
                      )}
                    />
                    <span className="tabular pl-3 text-[length:var(--text-caption)] uppercase tracking-[0.18em]">
                      0{i + 1}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[length:var(--text-body)] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em]">
                        {p.category}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
