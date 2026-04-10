import type { Metadata } from "next";

const SITE_URL = "https://brandingzombiedesigns.com";
const PAGE_URL = `${SITE_URL}/cpg-launch`;
const ORG_ID = `${SITE_URL}/#organization`;
const LOCALBIZ_ID = `${SITE_URL}/#localbusiness`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "CPG & Supplement Packaging Design | Shelf-Ready in 30 Days | Branding Zombie",
  description:
    "CPG and supplement packaging design — FDA-compliant labels, print-ready production files, and vendor coordination. From concept to shelf-ready in 30 days. Starting at $5,000 per product line.",
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    // CPG core
    "CPG packaging design",
    "supplement packaging design",
    "supplement label design",
    "supplement label designer",
    "CPG label designer",
    "nutrition facts panel design",
    "supplement facts panel",
    "FDA compliant label design",
    "FDA supplement label requirements",
    "FTC compliant supplement label",
    "structure function claims supplement",
    "die-line packaging design",
    "print-ready label files",
    "packaging production files",

    // Product categories
    "protein powder label design",
    "pre-workout label design",
    "vitamin label design",
    "CBD packaging design",
    "beauty product label design",
    "cosmetic label design",
    "functional food packaging",
    "beverage label design",
    "keto product packaging",
    "tincture label design",
    "bar wrapper design",
    "pouch packaging design",

    // Service types
    "3D product render packaging",
    "packaging mockup design",
    "Amazon listing mockup design",
    "pitch deck product render",
    "co-packer coordination",
    "print vendor coordination",
    "packaging compliance review",
    "bottle label designer",
    "box packaging designer",
    "stand up pouch designer",

    // Buyer intent
    "launch supplement brand",
    "shelf-ready packaging",
    "CPG brand launch designer",
    "DTC supplement packaging",
    "Amazon FBA packaging design",
    "30 day packaging design",
    "fast packaging designer",
    "CPG design agency",
    "supplement brand designer",
    "private label packaging design",

    // Local + CPG
    "CPG packaging design Atlanta",
    "supplement label designer Atlanta",
    "packaging designer Georgia",
    "CPG studio Cumming GA",
    "supplement brand studio Atlanta",

    // Branding
    "Branding Zombie CPG",
    "Ink Spatter Studio",
    "Gerry Betancourt packaging designer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "CPG & Supplement Packaging Design | Shelf-Ready in 30 Days",
    description:
      "FDA-compliant labels, print-ready files, vendor coordination. From concept to shelf in 30 days. For CPG and supplement founders launching their next product.",
    images: [
      {
        url: "/assets/product-design/product%20design_%2028.png",
        width: 1200,
        height: 900,
        alt: "Branding Zombie CPG packaging design — supplement brand family",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CPG & Supplement Packaging Design | Shelf-Ready in 30 Days",
    description:
      "FDA-compliant labels, print-ready files, vendor coordination. From concept to shelf in 30 days. Starting at $5,000.",
    images: ["/assets/product-design/product%20design_%2028.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

// ─── Page-specific Service schema ─────────────────────────────────────────
const cpgServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}/#service`,
  name: "CPG & Supplement Packaging Design",
  description:
    "Full CPG and supplement packaging design package: brand discovery, label and packaging design, FDA/FTC compliance review, print-ready production files, vendor coordination and 3D product renders. From concept to shelf-ready in 30 days.",
  serviceType: "Packaging Design",
  category: "CPG Packaging Design",
  provider: { "@id": LOCALBIZ_ID },
  brand: { "@id": ORG_ID },
  url: PAGE_URL,
  image: `${SITE_URL}/assets/product-design/product%20design_%2028.png`,
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "City", name: "Cumming" },
    { "@type": "City", name: "Atlanta" },
    { "@type": "AdministrativeArea", name: "Georgia" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "CPG and supplement founders",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Shelf-Ready Package",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Discovery Session",
          description:
            "Positioning, audience and competitive landscape alignment before design begins.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Label & Packaging Design",
          description:
            "High-fidelity designs built to product specs across supplements, food, beverage, wellness and beauty.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FDA/FTC Compliance & Claims Review",
          description:
            "Structure/function claims, supplement facts panel formatting and required disclaimers reviewed before production.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Print-Ready Production Files",
          description:
            "Die-line matched, color-profiled, bleed-set files delivered to printer specifications.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vendor Coordination",
          description:
            "Direct communication with your print vendor or co-packer from design to production.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Product Renders",
          description:
            "Photorealistic mockups for Amazon listings, pitch decks and social content.",
        },
      },
    ],
  },
  offers: {
    "@type": "Offer",
    price: "5000",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "5000",
      priceCurrency: "USD",
      description: "Starting price per product line",
    },
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
};

// ─── Page-specific Person schema (Authority section) ─────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#gerry-betancourt`,
  name: "Gerry Betancourt",
  jobTitle: "CPG Packaging Designer & Creative Director",
  image: `${SITE_URL}/assets/gerry-headshot.png`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "CPG packaging design",
    "Supplement label design",
    "FDA compliance",
    "FTC compliance",
    "Product launches",
    "Print production",
    "Co-packer coordination",
    "Brand identity",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Ink Spatter Studio",
  },
  description:
    "15+ years of in-house CPG experience. Has managed full product launches from formulation to shelf for supplement brands, and built packaging systems for 30+ companies.",
};

// ─── Page-specific FAQ schema ────────────────────────────────────────────
const cpgFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does CPG packaging design cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagements start at $5,000 per product line. Final pricing depends on the number of SKUs, packaging complexity, and whether you need vendor coordination and 3D renders. We confirm scope and investment on your discovery call.",
      },
    },
    {
      "@type": "Question",
      name: "How long does supplement packaging design take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects are delivered in 3–5 weeks from kickoff. Expedited schedules are possible for tight launch timelines — we discuss this upfront on the discovery call.",
      },
    },
    {
      "@type": "Question",
      name: "Can you just handle the print-ready production files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If your creative is locked but your files aren't print-ready or compliant, we offer a standalone production-prep service.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with brands outside of supplements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work across supplements, functional food, beverage, wellness, cosmetics and beauty. If it goes on a shelf or an Amazon listing, we can help.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help with FDA compliance for supplement labels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every label is reviewed against FDA supplement facts panel formatting rules, required disclaimers, and structure/function claim guidelines before it moves to production.",
      },
    },
  ],
};

// ─── Page-specific Breadcrumb schema ─────────────────────────────────────
const cpgBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "CPG Launch Package",
      item: PAGE_URL,
    },
  ],
};

export default function CPGLaunchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cpgServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cpgFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cpgBreadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
