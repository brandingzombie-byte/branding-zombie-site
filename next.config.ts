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
      {
        source: "/services/graphic-design",
        destination: "/services/logo-design",
        permanent: true,
      },
      {
        source: "/services/print-services",
        destination: "/services/print-design",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
