import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server Actions default to a 1MB request-body limit, which silently
  // rejects mobile photo uploads (typically 2-5MB each) on the custom
  // quote form before the action ever runs. The form's own validator
  // caps at 20MB combined; 21MB here gives form-data overhead headroom.
  experimental: {
    serverActions: {
      bodySizeLimit: "21mb",
    },
  },

  async redirects() {
    // Permanent redirects for slugs retired during the Phase C service
    // restructure. Preserves any inbound links or old citations to the
    // pre-rename URLs.
    return [
      // Canonical host: force www → apex. Google currently indexes BOTH
      // hosts (www homepage vs non-www), splitting every ranking signal in
      // two. 308 tells crawlers the move is permanent; query strings pass
      // through automatically. Must stay FIRST — redirects match in order.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.brandingzombiedesigns.com" }],
        destination: "https://brandingzombiedesigns.com/:path*",
        permanent: true,
      },
      {
        source: "/services/graphic-design",
        destination: "/services/logo-design",
        permanent: true,
      },
      // digital-marketing → seo rename (Aug 2026): GSC showed ~2,000
      // impressions of "seo cumming" queries with no /services/seo page.
      // :path* also matches the bare URL and covers the city sub-pages.
      {
        source: "/services/digital-marketing/:path*",
        destination: "/services/seo/:path*",
        permanent: true,
      },
      {
        source: "/services/print-services",
        destination: "/services/print-design",
        permanent: true,
      },
      // /work is now a real page (src/app/work). /portfolio is an alias that
      // forwards to it. Non-permanent (302) so /portfolio could become its
      // own page later without fighting a cached 301.
      {
        source: "/portfolio",
        destination: "/work",
        permanent: false,
      },
      // Short quote URL — kit CTAs and printed materials can point at
      // /quote?kit=... and land on the real form (query is preserved).
      {
        source: "/quote",
        destination: "/services/request-quote",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
