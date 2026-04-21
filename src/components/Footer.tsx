"use client";

import Section from "@/components/Section";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL } from "@/lib/site";

const services = [
  "Web Design",
  "AI Workflow Integration",
  "Graphic Design",
  "Print Services",
  "Social Media",
  "Shopify Ecommerce",
];

const company = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <Section
      as="footer"
      theme="parchment"
      pad="standard"
      topRule
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <a href="#" className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Branding_Zombie_Logo_Icon.svg"
              alt="Branding Zombie logo"
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-sm tracking-wide text-text-primary">
                BRANDING ZOMBIE
              </span>
              <span className="mt-1 text-[length:var(--text-caption)] uppercase tracking-[0.3em] text-text-dim">
                Designs
              </span>
            </div>
          </a>
          <p className="measure mt-5 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
            Bringing brands back from the dead. Modern websites, AI workflows,
            and killer design for Cumming &amp; Forsyth County businesses.
          </p>
        </div>

        {/* Services */}
        <div className="col-span-1 lg:col-span-3 lg:col-start-6">
          <h4 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-2.5 text-[length:var(--text-secondary)]">
            <li className="text-text-secondary">Cumming, GA 30041</li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="text-text-secondary hover:text-[var(--color-neon-text)]"
              >
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={PHONE_HREF}
                className="tabular text-text-secondary hover:text-[var(--color-neon-text)]"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-hairline)] pt-6 text-[length:var(--text-caption)] text-text-dim sm:flex-row sm:items-center">
        <p className="tabular">© 2026 Branding Zombie Designs. All rights reserved.</p>
        <p>Cumming · Forsyth County · North Metro Atlanta</p>
      </div>
    </Section>
  );
}
