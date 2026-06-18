import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import AnalyticsClickListener from "@/components/AnalyticsClickListener";
import "./globals.css";
import {
  SITE_URL,
  BUSINESS_NAME,
  FOUNDER_NAME,
  ORG_ID,
  LOCALBIZ_ID,
  WEBSITE_ID,
  FOUNDER_ID,
  FOUNDER_JOB_TITLE,
  FOUNDER_IMAGE,
  FOUNDER_DESCRIPTION,
  FOUNDER_KNOWS_ABOUT,
  FOUNDER_SAME_AS,
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
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
} from "@/lib/site";
import { REVIEW_AVG, REVIEW_COUNT } from "@/data/reviews";
import { OFFER_CATALOG } from "@/data/offer-catalog";

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
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    apple: { url: "/apple-touch-icon.png?v=2", sizes: "180x180" },
    shortcut: "/favicon.ico?v=2",
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
  founder: { "@id": FOUNDER_ID },
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

// ─── Schema.org — Full offer catalog ──────────────────────────────────────
// Every named capability, nested by group. Makes the complete offering
// machine-readable to Google's Knowledge Graph and the indexes AI engines
// ground on — so "who designs supplement labels near Cumming?" can resolve to
// us. Built from the single-source-of-truth OFFER_CATALOG.
const offerCatalogSchema = {
  "@type": "OfferCatalog",
  name: "Design, Web & Print Services",
  itemListElement: OFFER_CATALOG.map((group) => ({
    "@type": "OfferCatalog",
    name: group.name,
    description: group.blurb,
    itemListElement: group.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        provider: { "@id": LOCALBIZ_ID },
        areaServed: { "@type": "State", name: "Georgia" },
      },
    })),
  })),
};

// ─── Schema.org — Person (the founder, canonical site-wide node) ───────────
// One node, one @id (FOUNDER_ID), referenced by Organization.founder,
// LocalBusiness.founder, every blog author byline, and the /about ProfilePage.
// Carries the photo + authoritative sameAs profiles (LinkedIn, Gumroad,
// Instagram) that let AI engines verify "who is Gerry Betancourt?" and
// attribute the studio's work to a real, named expert (E-E-A-T).
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER_NAME,
  url: `${SITE_URL}/about`,
  image: FOUNDER_IMAGE,
  jobTitle: FOUNDER_JOB_TITLE,
  description: FOUNDER_DESCRIPTION,
  worksFor: { "@id": ORG_ID },
  founderOf: { "@id": ORG_ID },
  knowsLanguage: ["en", "es"],
  knowsAbout: FOUNDER_KNOWS_ABOUT,
  address: {
    "@type": "PostalAddress",
    addressLocality: CITY,
    addressRegion: REGION,
    addressCountry: COUNTRY,
  },
  sameAs: FOUNDER_SAME_AS,
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
  founder: { "@id": FOUNDER_ID },
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
  hasOfferCatalog: offerCatalogSchema,
  slogan: "Your Brand. Resurrected.",
  knowsLanguage: ["en-US", "es"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_AVG,
    reviewCount: REVIEW_COUNT,
    bestRating: "5",
    worstRating: "1",
  },
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

// Service catalog JSON-LD removed from global scope to avoid asserting Service
// offers on every URL (incl. the blog). /services carries an ItemList of all
// services, and each /services/[slug] page carries its own Service schema.

// FAQ JSON-LD now lives on the homepage (app/page.tsx), generated from the same
// src/data/faqs.ts the visible accordion uses — so the markup always matches the
// on-page text (Google requires this for FAQ rich results).

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
      <body className="min-h-full flex flex-col bg-mist text-text-primary overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-grave)] focus:px-4 focus:py-2 focus:text-[length:var(--text-secondary)] focus:font-semibold focus:text-[var(--color-toxic)] focus:outline-none focus:ring-2 focus:ring-[var(--color-toxic)]"
        >
          Skip to content
        </a>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {children}
        <AnalyticsClickListener />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {CLARITY_PROJECT_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
