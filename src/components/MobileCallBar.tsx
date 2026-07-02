"use client";

import { Phone, ArrowUpRight } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// Site-wide sticky bottom bar — mobile only. Two actions: call/text the shop,
// or run the free instant site audit. Client component because the phosphor
// icon barrel uses createContext (server components can't). layout.tsx adds
// matching bottom padding on mobile so the bar never covers content or form
// submit buttons, and the bar itself pads for the iOS home indicator
// (env(safe-area-inset-bottom)).
export default function MobileCallBar() {
  return (
    <div
      id="mobile-call-bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={PHONE_HREF}
          className="tabular inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-toxic)] px-2 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-toxic-text)]"
        >
          <Phone size={13} weight="bold" className="shrink-0" />
          Call/Text {PHONE_DISPLAY}
        </a>
        <a
          href="/free-site-audit"
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--color-toxic)] px-2 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-grave)]"
        >
          Free instant audit
          <ArrowUpRight size={13} weight="bold" className="shrink-0" />
        </a>
      </div>
    </div>
  );
}
