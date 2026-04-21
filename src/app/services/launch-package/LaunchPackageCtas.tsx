"use client";

import { ArrowRight, Phone } from "@/components/icons";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function LaunchPackageCtas({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const large = size === "lg";
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]",
          large ? "px-9 py-4 text-[length:var(--text-body)]" : "px-7 py-3.5 text-sm",
        )}
      >
        Book the launch call
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
  );
}
