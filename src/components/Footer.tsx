"use client";

import Section from "@/components/Section";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL } from "@/lib/site";
import { INDUSTRIES } from "@/data/industries";

const services = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "Logo Design", href: "/services/logo-design" },
  { label: "Branding", href: "/services/branding" },
  { label: "Print Design", href: "/services/print-design" },
  { label: "Social Media", href: "/services/social-media" },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "Shopify Ecommerce", href: "/services/ecommerce" },
  { label: "SEO & Digital Marketing", href: "/services/seo" },
  { label: "AI Workflows", href: "/services/ai-workflows" },
  { label: "Website Packages", href: "/packages" },
  { label: "Website Management", href: "/website-management" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Blog", href: "/blog" },
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
          <a href="/" aria-label="Branding Zombie Designs — home" className="flex items-start gap-3">
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
            Big-brand design for small-town businesses —{" "}
            <a
              href="/services/logo-design"
              className="underline decoration-[var(--color-hairline-strong)] underline-offset-2 hover:text-[var(--color-neon-text)]"
            >
              logos
            </a>
            ,{" "}
            <a
              href="/services/web-design"
              className="underline decoration-[var(--color-hairline-strong)] underline-offset-2 hover:text-[var(--color-neon-text)]"
            >
              websites
            </a>
            , signs, and{" "}
            <a
              href="/services/print-design"
              className="underline decoration-[var(--color-hairline-strong)] underline-offset-2 hover:text-[var(--color-neon-text)]"
            >
              print
            </a>{" "}
            built right here in Cumming &amp; Forsyth County, Georgia.
          </p>
          {/* BBB accreditation seal — official embed, links to our BBB profile */}
          <a
            href="https://www.bbb.org/us/ga/cumming/profile/brand-development/branding-zombie-designs-0443-91849154/#sealclick"
            target="_blank"
            rel="nofollow noopener"
            className="mt-6 inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://seal-atlanta.bbb.org/seals/darkgray-seal-293-61-bbb-91849154.png"
              alt="Branding Zombie Designs BBB Business Review"
              width={293}
              height={61}
              loading="lazy"
              className="h-auto w-[180px] border-0"
            />
          </a>
        </div>

        {/* Services */}
        <div className="col-span-1 lg:col-span-2 lg:col-start-5">
          <h4 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/direct-mail"
                className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
              >
                Direct Mail
              </a>
            </li>
            <li>
              <a
                href="/eddm"
                className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
              >
                EDDM
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
              >
                All services →
              </a>
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Industries we serve
          </h4>
          <ul className="mt-4 space-y-2.5">
            {INDUSTRIES.map((ind) => (
              <li key={ind.slug}>
                <a
                  href={`/industries/${ind.slug}`}
                  className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
                >
                  {ind.navLabel}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/authors"
                className="text-[length:var(--text-secondary)] text-text-secondary hover:text-[var(--color-neon-text)]"
              >
                Authors &amp; Book Launches
              </a>
            </li>
            <li>
              <a
                href="/industries"
                className="text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] hover:underline"
              >
                View all →
              </a>
            </li>
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
        <div className="col-span-1 lg:col-span-2">
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
        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-text-dim hover:text-[var(--color-neon-text)]"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-text-dim hover:text-[var(--color-neon-text)]"
          >
            Terms of Service
          </a>
          <a
            href="/how-we-work"
            className="text-text-dim hover:text-[var(--color-neon-text)]"
          >
            How We Work
          </a>
        </div>
        <p>Cumming · Forsyth County · North Metro Atlanta</p>
      </div>
    </Section>
  );
}
