"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Global click delegate for conversion-intent links. Catches every tel: and
// mailto: across the site without touching individual components. Calendly
// and other outbound clicks are already covered by GA4 Enhanced Measurement.
export default function AnalyticsClickListener() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const location = window.location.pathname;

      if (href.startsWith("tel:")) {
        trackEvent("contact_intent", {
          method: "phone",
          link_text: anchor.textContent?.trim().slice(0, 80) || "",
          page_path: location,
        });
        return;
      }

      if (href.startsWith("mailto:")) {
        trackEvent("contact_intent", {
          method: "email",
          link_text: anchor.textContent?.trim().slice(0, 80) || "",
          page_path: location,
        });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
