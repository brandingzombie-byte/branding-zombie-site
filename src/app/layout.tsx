import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import {
  SITE_URL,
  BUSINESS_NAME,
  FOUNDER_NAME,
  ORG_ID,
  LOCALBIZ_ID,
  WEBSITE_ID,
  PHONE_E164,
  EMAIL,
  CITY,
  REGION,
  POSTAL_CODE,
  COUNTRY,
  LAT,
  LON,
  AREAS_SERVED,
  NORTH_GA_COUNTIES,
  SOCIAL_URLS,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = localFont({
  src: "../fonts/Boldonse-Regular.ttf",
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D4E7D4" },
    { media: "(prefers-color-scheme: dark)", color: "#111714" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Branding Zombie Designs | Web Design, AI & Branding in Cumming, GA",
    template: "%s | Branding Zombie Designs",
  },
  description:
    "Small-business web design, AI workflows, logo design, print & Shopify — built in days from Cumming, GA. Serving Forsyth County, Alpharetta, Roswell, Woodstock, Buford & North Atlanta. Call (770) 744-2536 for a free audit.",
  applicationName: "Branding Zombie Designs",
  authors: [{ name: "Gerry Betancourt", url: SITE_URL }],
  creator: "Branding Zombie Designs",
  publisher: "Branding Zombie Designs",
  category: "Design Agency",
  classification: "Business",
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  verification: {
    google: "_h7e7IWOEOw2IEojHGS4K9FWJzlUqt76vz2oQH4bB7I",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Branding Zombie Designs",
    title: "Branding Zombie Designs | Your Brand. Resurrected.",
    description:
      "Modern websites, AI workflows, logo & brand identity, print and Shopify — built in days from Cumming, GA. Serving Forsyth, Alpharetta, Roswell, Woodstock, Buford & North Atlanta.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Branding Zombie Designs — Web, AI and brand identity studio in Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding Zombie Designs | Your Brand. Resurrected.",
    description:
      "Web design, AI workflows, branding & print for small businesses in Cumming, GA & North Metro Atlanta. Call (770) 744-2536.",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "US-GA",
    "geo.placename": "Cumming, Georgia",
    "geo.position": `${LAT};${LON}`,
    ICBM: `${LAT}, ${LON}`,
    "dc.language": "en-US",
    "distribution": "local",
    "coverage": "North Metro Atlanta, Forsyth County, Cumming GA",
    "rating": "General",
    "revisit-after": "7 days",
  },
};

// ─── Schema.org — Organization (umbrella, referenced by services) ──────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Branding Zombie Designs",
  alternateName: ["Branding Zombie", "BZ Designs"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/brand-icon-1024.png`,
    width: 1024,
    height: 1024,
  },
  image: `${SITE_URL}/assets/og-image.png`,
  description:
    "Full-service design studio in Cumming, GA — web design, AI workflow integration, logo and brand identity, packaging, print, Shopify ecommerce, and social media for small businesses across North Metro Atlanta.",
  founder: {
    "@type": "Person",
    name: "Gerry Betancourt",
    jobTitle: "Creative Director",
  },
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cumming",
      addressRegion: "GA",
      addressCountry: "US",
    },
  },
  email: EMAIL,
  telephone: PHONE_E164,
  sameAs: SOCIAL_URLS,
};

// ─── Schema.org — LocalBusiness ────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "GraphicDesigner"],
  "@id": LOCALBIZ_ID,
  name: "Branding Zombie Designs",
  description:
    "Web design, AI workflow integration, graphic design, logo design, packaging, Shopify ecommerce, and print services for small businesses in Cumming, GA and across North Metro Atlanta.",
  url: SITE_URL,
  telephone: PHONE_E164,
  email: EMAIL,
  priceRange: "$$",
  image: `${SITE_URL}/assets/og-image.png`,
  logo: `${SITE_URL}/assets/brand-icon-1024.png`,
  parentOrganization: { "@id": ORG_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cumming",
    addressRegion: "GA",
    postalCode: "30041",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LAT,
    longitude: LON,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`,
  areaServed: [
    ...AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    ...NORTH_GA_COUNTIES.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    { "@type": "State", name: "Georgia" },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: LAT,
      longitude: LON,
    },
    geoRadius: "80000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "sales",
      email: EMAIL,
      areaServed: "US-GA",
      availableLanguage: ["English", "Spanish"],
    },
    {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer support",
      email: EMAIL,
      areaServed: "US-GA",
      availableLanguage: ["English", "Spanish"],
    },
  ],
  knowsAbout: [
    "Web design",
    "Next.js development",
    "Shopify ecommerce",
    "AI workflow integration",
    "ChatGPT integration",
    "Chatbot development",
    "Logo design",
    "Brand identity",
    "Visual identity systems",
    "Print design",
    "Packaging design",
    "CPG supplement label design",
    "FDA compliant labeling",
    "Social media marketing",
    "Local SEO",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Integration" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Print Design & Production" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify Ecommerce" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "CPG Packaging Design" } },
  ],
  sameAs: SOCIAL_URLS,
};

// ─── Schema.org — WebSite + SearchAction ──────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Branding Zombie Designs",
  description:
    "Web design, AI workflows, branding, print and Shopify for small businesses in Cumming, GA.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Schema.org — Service catalog ─────────────────────────────────────────
const buildService = (
  name: string,
  description: string,
  serviceType: string,
  price: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@id": LOCALBIZ_ID },
  areaServed: AREAS_SERVED.map((n) => ({ "@type": "City", name: n })),
  serviceType,
  offers: {
    "@type": "Offer",
    price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
});

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    buildService(
      "Web Design",
      "Custom, conversion-focused website design for small businesses in Cumming, GA, Forsyth County and North Metro Atlanta. Sites delivered in 10–14 days starting at $1,500. Next.js, Webflow, Shopify and Squarespace.",
      "Web Design",
      "1500",
    ),
    buildService(
      "AI Workflow Integration",
      "Business automation and AI-powered workflows — chatbots, lead capture, email follow-up, scheduling, and customer service automation — for small businesses in Cumming, GA and across North Atlanta.",
      "Business Automation",
      "500",
    ),
    buildService(
      "Graphic Design",
      "Logos, brand identity systems, style guides, menus, brochures, pitch decks, social media graphics and illustration for small businesses in Cumming, Forsyth County and Atlanta.",
      "Graphic Design",
      "150",
    ),
    buildService(
      "Logo Design & Brand Identity",
      "Custom logo design and full brand identity systems — logo, color palette, typography, brand guidelines and launch kit — for Cumming and North Atlanta small businesses.",
      "Logo Design",
      "500",
    ),
    buildService(
      "Print Services",
      "Business cards, flyers, brochures, banners, yard signs, vehicle wraps, menus, rack cards, postcards, posters, stickers, labels, custom apparel and trade show displays. Wholesale trade pricing, fast turnaround, delivered throughout Forsyth County and North Atlanta.",
      "Print Services",
      "75",
    ),
    buildService(
      "Business Card Printing",
      "Premium business card design and printing in Cumming, GA — matte, gloss, spot UV, soft-touch and luxe stocks. Wholesale trade pricing, fast turnaround, local delivery.",
      "Business Card Printing",
      "75",
    ),
    buildService(
      "Vehicle Wrap Design",
      "Custom vehicle wrap design and installation coordination for service businesses in Forsyth County and North Metro Atlanta — contractors, HVAC, plumbers, landscapers and mobile services.",
      "Vehicle Graphics",
      "800",
    ),
    buildService(
      "Social Media Management",
      "Consistent social media presence for small businesses in Cumming, GA. Content creation, scheduling, Instagram, Facebook and TikTok management starting at $400/mo.",
      "Social Media Management",
      "400",
    ),
    buildService(
      "Shopify Ecommerce Development",
      "Full Shopify and BigCommerce store setup with custom theme design, product catalog, checkout optimization and payment integration. Starting at $3,000.",
      "Ecommerce Development",
      "3000",
    ),
    buildService(
      "CPG & Supplement Packaging Design",
      "CPG and supplement packaging design with FDA/FTC compliance review, die-line matched print-ready files, and vendor coordination. Shelf-ready in 30 days. Starting at $5,000 per product line.",
      "Packaging Design",
      "5000",
    ),
    buildService(
      "Restaurant Menu Design & Printing",
      "Full menu design and printing for restaurants, cafes and food trucks in Cumming, Alpharetta, Roswell and North Metro Atlanta. Print and digital menus, QR code menus, takeout menus.",
      "Menu Design",
      "250",
    ),
    buildService(
      "Local SEO & Google Business Setup",
      "Google Business Profile optimization, local schema markup, citation building and on-page SEO for small businesses across Cumming, Forsyth County and North Metro Atlanta.",
      "Local SEO",
      "300",
    ),
  ],
};

// ─── Schema.org — FAQ ─────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you build my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most websites are completed in 10–14 days. Traditional agencies take 4–8 weeks — we move faster because we have a proven process and use modern AI-assisted tools.",
      },
    },
    {
      "@type": "Question",
      name: "Do you serve businesses outside of Cumming, GA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We serve small businesses across Forsyth County, Alpharetta, Johns Creek, Milton, Roswell, Woodstock, Canton, Marietta, Buford, Suwanee, Sugar Hill, Duluth, Lawrenceville, Dawsonville, Gainesville and all of North Metro Atlanta.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with my existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can redesign your existing site, migrate it to a new platform, or build fresh from scratch — whatever makes the most sense for your goals and budget.",
      },
    },
    {
      "@type": "Question",
      name: "What does a website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our websites start at $1,500 for a 5-page custom site. Our most popular package, the Digital Makeover, is $4,500 and includes AI chatbot integration. We have no hidden fees and everything is clearly quoted upfront.",
      },
    },
    {
      "@type": "Question",
      name: "What is AI workflow integration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI workflows automate repetitive tasks like answering customer questions, booking appointments, sending follow-up emails, and managing leads — so your business keeps working even when you're not.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of businesses do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Restaurants, cafes, dental practices, medical clinics, chiropractors, salons, barbershops, gyms, HVAC companies, plumbers, electricians, roofers, contractors, landscapers, realtors, law firms, boutiques, auto repair shops, photographers, fitness studios and any small business in North Metro Atlanta that needs a stronger online presence.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer monthly maintenance plans starting at $100/month that include updates, backups, security monitoring, and minor edits. You'll also get priority support and a monthly performance report.",
      },
    },
    {
      "@type": "Question",
      name: "Can you design and print business cards, flyers, and banners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We handle business cards, flyers, brochures, banners, yard signs, vehicle wraps, custom apparel, menus, rack cards, postcards, posters, stickers and trade show displays. Everything is designed in-house and produced through our wholesale trade accounts so your print materials match your brand perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Do you design supplement labels and CPG packaging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our CPG Launch Package takes supplement and packaged-goods brands from concept to shelf-ready in 30 days, including FDA-compliant label design, die-line matched print-ready files and vendor coordination. See our /cpg-launch page for details.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer free consultations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every project starts with a free 15-minute discovery call. No commitment, no pressure — just a clear picture of what's costing you customers and what we'd do about it.",
      },
    },
  ],
};

// ─── Schema.org — Breadcrumb ─────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mist text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
