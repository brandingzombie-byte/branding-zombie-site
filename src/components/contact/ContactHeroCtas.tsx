"use client";

import { trackEvent } from "@/lib/analytics";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { Calendar, Phone } from "@/components/icons";

// Above-the-fold action row for the contact hero (CRO): the two fastest
// close paths — a direct call/text and the zero-commitment Calendly slot —
// live in the dark hero so mobile users see something tappable before any
// scroll. The global AnalyticsClickListener already fires contact_intent /
// schedule_intent on tel: + Calendly clicks; these hero-specific events let
// next quarter's diagnosis separate "hero CTA worked" from "user dug through
// the options list".
export default function ContactHeroCtas() {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
        <a
          href={PHONE_HREF}
          role="button"
          onClick={() =>
            trackEvent("contact_call_click", { location: "contact_hero" })
          }
          className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-[length:var(--text-body)] font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-colors hover:bg-[var(--color-toxic-deep)]"
        >
          <Phone size={18} weight="bold" />
          <span className="tabular">Call or text Gerry — {PHONE_DISPLAY}</span>
        </a>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          onClick={() =>
            trackEvent("contact_booking_click", { location: "contact_hero" })
          }
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] transition-colors hover:bg-[var(--color-toxic)]/10"
        >
          <Calendar size={16} weight="bold" />
          Book a free 15-min call
        </a>
      </div>
      <p className="mt-4 text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
        Replies within one business day — usually same day. BBB Accredited
        (A-).
      </p>
    </div>
  );
}
