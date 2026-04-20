"use client";

import { useEffect, useState } from "react";
import { List, X, Phone } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overDark, setOverDark] = useState(true); // hero is dark, default true

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect when a [data-theme="dark"] section is at the top of the viewport
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry whose top edge is closest to (and above) the navbar
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topMost = visible[0];
        if (topMost) {
          setOverDark(
            (topMost.target as HTMLElement).dataset.theme === "dark",
          );
        }
      },
      {
        // Trigger when the section's top crosses the top 80px of the viewport
        rootMargin: "-80px 0px -85% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const dark = overDark;

  return (
    <nav
      data-theme={dark ? "dark" : "light"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && dark && "bg-[var(--color-grave)]/85 backdrop-blur-xl",
        scrolled && !dark && "bg-mist/85 backdrop-blur-xl",
        scrolled &&
          "border-b border-[var(--color-hairline)] dark:border-[var(--color-dark-border)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:h-20 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
              dark
                ? "bg-[var(--color-elevated)]"
                : "bg-[var(--color-fog)]",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Branding_Zombie_Logo_Icon.svg"
              alt="Branding Zombie skull icon"
              className="h-7 w-7 object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={cn(
                "font-[family-name:var(--font-display)] text-base tracking-wide",
                dark
                  ? "text-[var(--color-dark-text-primary)]"
                  : "text-[var(--color-text-primary)]",
              )}
            >
              BRANDING ZOMBIE
            </span>
            <span
              className={cn(
                "mt-1 text-[10px] uppercase tracking-[0.3em]",
                dark
                  ? "text-[var(--color-dark-text-dim)]"
                  : "text-[var(--color-text-dim)]",
              )}
            >
              Designs
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                dark
                  ? "text-[var(--color-dark-text-secondary)] hover:text-[var(--color-toxic-text)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-neon-text)]",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className={cn(
              "ml-3 tabular inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider",
              dark
                ? "border border-[var(--color-dark-border-strong)] text-[var(--color-dark-text-primary)] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
                : "border border-[var(--color-hairline-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
            )}
          >
            <Phone size={14} weight="bold" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className={cn(
              "ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider",
              dark
                ? "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                : "bg-[var(--color-text-primary)] text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]",
            )}
          >
            Free audit
          </a>
        </div>

        {/* Mobile right-side actions: tap-to-call + menu toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              dark
                ? "bg-[var(--color-toxic)] text-[var(--color-grave)]"
                : "bg-[var(--color-text-primary)] text-[var(--color-cloud)]",
            )}
          >
            <Phone size={18} weight="bold" />
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md",
              dark ? "text-[var(--color-dark-text-primary)]" : "text-[var(--color-text-primary)]",
            )}
          >
            {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 md:hidden",
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div
          className={cn(
            "border-t px-6 py-5",
            dark
              ? "border-[var(--color-dark-border)] bg-[var(--color-grave)]/95"
              : "border-[var(--color-hairline)] bg-[var(--color-cloud)]/95",
          )}
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "border-b py-3 text-sm font-medium uppercase tracking-wider",
                  dark
                    ? "border-[var(--color-dark-border)] text-[var(--color-dark-text-primary)]"
                    : "border-[var(--color-hairline)] text-[var(--color-text-primary)]",
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-wider tabular",
                dark
                  ? "border-[var(--color-toxic)] text-[var(--color-toxic-text)]"
                  : "border-[var(--color-text-primary)] text-[var(--color-text-primary)]",
              )}
            >
              <Phone size={14} weight="bold" />
              Call Now · {PHONE_DISPLAY}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-grave)]"
            >
              Get a free audit
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
