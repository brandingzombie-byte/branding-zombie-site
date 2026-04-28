// Thin wrapper around gtag(). Safe to call from anywhere — no-ops on the
// server and when GA hasn't loaded yet (e.g. ad blockers, slow networks).
//
// Custom event naming follows GA4 conventions:
//   - generate_lead       — recommended event for B2B lead capture
//   - contact_intent      — phone/email click (engagement signal, pre-conversion)
//   - select_tier         — pricing tier CTA click
//   - audit_requested     — site-audit form submit (resurrected-zombie funnel)

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "consent",
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: GtagEventParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
