import type { Metadata } from "next";

const SITE_URL = "https://brandingzombiedesigns.com";
const PAGE_URL = `${SITE_URL}/tap`;
const ORG_ID = `${SITE_URL}/#organization`;
const LOCALBIZ_ID = `${SITE_URL}/#localbusiness`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // `absolute` opts out of the root layout's "%s | Branding Zombie Designs"
  // template so the brand name isn't appended twice.
  title: {
    absolute:
      "NFC & Interactive 3D Marketing in Cumming & Atlanta, GA | Branding Zombie Designs",
  },
  description:
    "Interactive 3D websites and NFC tap-to-play sticker campaigns for small businesses in Cumming, Forsyth County & metro Atlanta, GA. Guerrilla marketing people actually touch — designed, built, printed and programmed in-house. Tap the zombie, then build your own.",
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    // Core service
    "NFC marketing",
    "NFC sticker campaign",
    "NFC sticker marketing",
    "tap to play marketing",
    "interactive 3D website",
    "interactive website design",
    "Spline 3D web design",
    "interactive hero banner",
    "NFC business cards",
    "3D product configurator",
    "web 3D experience designer",
    "interactive landing page design",
    "QR code alternative marketing",
    // Geo + service (Georgia local intent)
    "NFC marketing Atlanta",
    "NFC marketing Georgia",
    "NFC stickers Cumming GA",
    "guerrilla marketing Atlanta",
    "guerrilla marketing Cumming GA",
    "experiential marketing Atlanta",
    "experiential marketing Cumming GA",
    "creative marketing Forsyth County",
    "interactive web design Atlanta",
    "3D website design Georgia",
    "NFC tag marketing Georgia",
    "Branding Zombie interactive",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: "NFC & Interactive 3D Marketing — Cumming & Atlanta, GA",
    description:
      "A sticker on a counter. A zombie in your phone. Interactive 3D web experiences and NFC tap campaigns for businesses in Cumming, Forsyth County & metro Atlanta — built in-house.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Branding Zombie — interactive 3D and NFC tap-to-play marketing in Cumming & Atlanta, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFC & Interactive 3D Marketing — Cumming & Atlanta, GA",
    description:
      "Guerrilla marketing people actually touch. Interactive 3D and NFC tap campaigns for Cumming, Forsyth County & metro Atlanta — built in-house.",
    images: ["/assets/og-image.png"],
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
const interactiveServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}/#service`,
  name: "Interactive 3D & NFC Experience Marketing",
  description:
    "Interactive 3D web experiences and NFC tap-to-play sticker campaigns: custom Spline 3D scenes, interactive hero banners, NFC sticker design, printing and chip programming, tap-to-anything links, 3D product configurators, and full campaign tracking. Designed and built in-house.",
  serviceType: "Experiential & Interactive Marketing",
  category: "Interactive Marketing",
  provider: { "@id": LOCALBIZ_ID },
  brand: { "@id": ORG_ID },
  url: PAGE_URL,
  image: `${SITE_URL}/assets/og-image.png`,
  areaServed: [
    { "@type": "City", name: "Cumming" },
    { "@type": "City", name: "Alpharetta" },
    { "@type": "City", name: "Johns Creek" },
    { "@type": "City", name: "Roswell" },
    { "@type": "City", name: "Woodstock" },
    { "@type": "City", name: "Marietta" },
    { "@type": "City", name: "Buford" },
    { "@type": "City", name: "Atlanta" },
    { "@type": "AdministrativeArea", name: "Forsyth County" },
    { "@type": "AdministrativeArea", name: "North Metro Atlanta" },
    { "@type": "State", name: "Georgia" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Small businesses and brands seeking memorable marketing",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interactive Experiences",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interactive 3D Hero Banners",
          description:
            "Spin-able, draggable 3D scenes embedded in your website to capture and hold attention.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "NFC Sticker Campaigns",
          description:
            "Custom NFC stickers designed, printed and chip-programmed to open any link or experience on tap.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Spline 3D Scenes",
          description:
            "Products, mascots and storefronts modeled in 3D and made playable in the browser.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Product Configurators",
          description:
            "Spin-before-you-buy interactive product views to reduce returns and boost confidence.",
        },
      },
    ],
  },
};

// ─── Page-specific FAQ schema ────────────────────────────────────────────
const tapFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do people need an app to tap an NFC sticker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every smartphone made since around 2014 reads NFC natively. People hold their phone near the sticker and a page opens — no app to download, no QR code to line up.",
      },
    },
    {
      "@type": "Question",
      name: "What can an NFC tap actually open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anything with a link — an interactive 3D experience, your menu, a booking page, a special offer, a video, a playlist, or a review form. Each sticker is its own trackable link, so you can see where and how often it gets tapped.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build interactive 3D for my existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We design and embed interactive 3D hero banners and product configurators into existing sites, or build the whole page from scratch. We model and animate the scene in-house and tune the interaction so it feels good on a phone.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle printing and programming the NFC stickers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We design the sticker artwork, print it, and encode the NFC chips to your link. They arrive ready to peel and stick. We're based in Cumming, GA and serve Forsyth County and North Metro Atlanta.",
      },
    },
  ],
};

// ─── Page-specific Breadcrumb schema ─────────────────────────────────────
const tapBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Interactive & NFC Marketing",
      item: PAGE_URL,
    },
  ],
};

export default function TapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interactiveServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tapFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tapBreadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
