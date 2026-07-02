"use client";

import { ArrowRight, Phone } from "@/components/icons";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

// CTA row for the Local Business Kit page. Primary action = the kit quote
// form (preselected); phone second; Calendly as a quiet text link for
// people who'd rather talk first.
export default function LaunchPackageCtas({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const large = size === "lg";
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <a
          href="/services/request-quote?kit=local-business"
          role="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]",
            large ? "px-9 py-4 text-[length:var(--text-body)]" : "px-7 py-3.5 text-sm",
          )}
        >
          Get my kit quote
          <ArrowRight size={large ? 18 : 16} weight="bold" />
        </a>
        <a
          href={PHONE_HREF}
          className={cn(
            "tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10",
            large ? "px-7 py-3.5 text-[length:var(--text-secondary)]" : "px-6 py-3 text-sm",
          )}
        >
          <Phone size={large ? 16 : 14} weight="bold" />
          Call Now · {PHONE_DISPLAY}
        </a>
      </div>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[length:var(--text-caption)] font-medium uppercase tracking-wider text-[var(--color-dark-text-secondary)] underline decoration-[var(--color-toxic)]/40 underline-offset-4 hover:text-[var(--color-toxic-text)]"
      >
        Rather talk it through first? Book a free 15-min call
      </a>
    </div>
  );
}
