import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
