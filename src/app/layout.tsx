import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

const SITE_URL = "https://brandingzombiedesigns.com";
const ORG_ID = `${SITE_URL}/#organization`;
const LOCALBIZ_ID = `${SITE_URL}/#localbusiness`;
const PHONE_DISPLAY = "(786) 848-1522";
const PHONE_E164 = "+17868481522";
const EMAIL = "brandingzombie@gmail.com";
const LAT = 34.2073;
const LON = -84.1401;

// ─── Service area — every town we want to show up for ─────────────────────
const AREAS_SERVED = [
  "Cumming",
  "Forsyth County",
  "Alpharetta",
  "Johns Creek",
  "Milton",
  "Roswell",
  "Woodstock",
  "Canton",
  "Marietta",
  "Dawsonville",
  "Buford",
  "Suwanee",
  "Sugar Hill",
  "Duluth",
  "Lawrenceville",
  "Gainesville",
  "Flowery Branch",
  "Oakwood",
  "Braselton",
  "Jefferson",
  "Hoschton",
  "Ball Ground",
  "Holly Springs",
  "Kennesaw",
  "Acworth",
  "Norcross",
  "Peachtree Corners",
  "Sandy Springs",
  "Dunwoody",
  "Atlanta",
];

const NORTH_GA_COUNTIES = [
  "Forsyth County",
  "Fulton County",
  "Cherokee County",
  "Hall County",
  "Gwinnett County",
  "Cobb County",
  "Dawson County",
  "Jackson County",
];

// ─── Keyword matrix — cities × services × verticals ───────────────────────
const KEYWORDS = [
  // Core brand
  "Branding Zombie Designs",
  "Branding Zombie Cumming",
  "Branding Zombie GA",
  "brand designer near me",

  // Web design × cities
  "web design Cumming GA",
  "website design Cumming Georgia",
  "web designer Forsyth County",
  "web design Alpharetta GA",
  "web design Johns Creek GA",
  "web design Milton GA",
  "web design Roswell GA",
  "web design Woodstock GA",
  "web design Canton GA",
  "web design Marietta GA",
  "web design Dawsonville GA",
  "web design Buford GA",
  "web design Suwanee GA",
  "web design Sugar Hill GA",
  "web design Gainesville GA",
  "web design Duluth GA",
  "web design Lawrenceville GA",
  "web design Braselton GA",
  "web design Atlanta GA",
  "web design North Atlanta",
  "web design North Metro Atlanta",
  "custom website design Georgia",
  "affordable web design Cumming",
  "small business web design Georgia",
  "Next.js web designer Georgia",
  "Webflow designer Atlanta",
  "Shopify designer Georgia",
  "Squarespace designer Cumming",
  "WordPress designer North Atlanta",

  // Business-type specific web design
  "restaurant website design Cumming",
  "dental website design Forsyth County",
  "medical practice website Atlanta",
  "chiropractor website design Georgia",
  "HVAC website design Cumming",
  "plumber website design Georgia",
  "electrician website Atlanta",
  "roofer website design Forsyth",
  "landscaper website Cumming GA",
  "real estate website design Atlanta",
  "salon website design Cumming",
  "barbershop website Forsyth County",
  "gym website design Atlanta",
  "law firm website design Cumming",
  "contractor website design Georgia",
  "boutique website design Atlanta",
  "coffee shop website design Cumming",
  "auto repair website design Atlanta",
  "fitness studio website Georgia",
  "wedding photographer website Cumming",
  "nonprofit website design Atlanta",
  "church website design Forsyth County",

  // AI & automation
  "AI workflow integration Cumming GA",
  "AI chatbot small business Georgia",
  "AI automation Atlanta",
  "business automation Forsyth County",
  "ChatGPT integration Atlanta",
  "AI lead capture Cumming",
  "automated booking system Georgia",
  "AI customer service small business",
  "marketing automation Cumming",
  "workflow automation Atlanta",

  // Branding & graphic design
  "graphic design Cumming GA",
  "graphic designer Forsyth County",
  "graphic design Atlanta",
  "logo design Cumming GA",
  "logo designer Forsyth County",
  "logo design Atlanta",
  "brand identity Cumming Georgia",
  "brand identity designer Atlanta",
  "brand guidelines Cumming GA",
  "rebranding Cumming GA",
  "rebrand agency Atlanta",
  "small business branding North Atlanta",
  "startup branding Cumming",
  "visual identity design Georgia",
  "brand strategy Forsyth County",
  "menu design Cumming GA",
  "restaurant menu design Atlanta",
  "packaging design Cumming",
  "label design Cumming GA",
  "t-shirt design Cumming",
  "apparel design Atlanta",
  "pitch deck design Cumming",
  "infographic design Atlanta",
  "brochure design Forsyth County",
  "social media graphics Cumming",
  "Instagram template design",
  "illustration services Atlanta",

  // Ecommerce
  "Shopify ecommerce Georgia",
  "Shopify designer Cumming GA",
  "Shopify developer Atlanta",
  "ecommerce website Cumming GA",
  "online store design Forsyth County",
  "ecommerce development Alpharetta",
  "custom Shopify theme Atlanta",
  "BigCommerce Cumming GA",
  "WooCommerce developer Georgia",
  "product photography setup Cumming",

  // Print
  "print services Cumming GA",
  "business card design Forsyth County",
  "business card printing Cumming GA",
  "flyer design Cumming",
  "flyer printing Atlanta",
  "brochure printing Cumming",
  "banner printing Forsyth County",
  "retractable banner Cumming",
  "yard sign printing Cumming GA",
  "vehicle wrap design Atlanta",
  "vehicle magnet Cumming",
  "rack card printing Cumming",
  "postcard printing Forsyth County",
  "poster printing Atlanta",
  "menu printing Cumming GA",
  "trade show display Atlanta",
  "sticker printing Cumming",
  "label printing Forsyth County",
  "t-shirt printing Cumming GA",
  "custom apparel Cumming GA",
  "custom hats Cumming",
  "table throw printing",
  "door hanger printing Atlanta",
  "print design North Atlanta",
  "wholesale print Cumming",

  // Social media
  "social media management Cumming GA",
  "social media marketing Forsyth County",
  "Instagram management Cumming",
  "TikTok content creation Atlanta",
  "Facebook ads Cumming GA",
  "content creation small business Georgia",

  // CPG packaging (for the /cpg-launch subpage cross-surface)
  "CPG packaging design",
  "supplement label design",
  "supplement packaging designer",
  "FDA compliant label design",
  "print-ready packaging files",
  "nutrition facts panel design",
  "product packaging designer Georgia",

  // General local intent
  "marketing agency Cumming GA",
  "digital marketing Forsyth County",
  "creative agency Atlanta",
  "freelance designer Cumming",
  "get a website Cumming GA",
  "hire web designer near me",
  "small business website Georgia",
  "local design agency Cumming",
  "North Atlanta design studio",
];

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
    "Small-business web design, AI workflows, logo design, print & Shopify — built in days from Cumming, GA. Serving Forsyth County, Alpharetta, Roswell, Woodstock, Buford & North Atlanta. Call (786) 848-1522 for a free audit.",
  applicationName: "Branding Zombie Designs",
  authors: [{ name: "Gerry Betancourt", url: SITE_URL }],
  creator: "Branding Zombie Designs",
  publisher: "Branding Zombie Designs",
  category: "Design Agency",
  classification: "Business",
  keywords: KEYWORDS,
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
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
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
      "Web design, AI workflows, branding & print for small businesses in Cumming, GA & North Metro Atlanta. Call (786) 848-1522.",
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
  sameAs: [
    "https://www.instagram.com/brandingzombie",
    "https://www.facebook.com/brandingzombie",
    "https://www.tiktok.com/@brandingzombie",
    "https://www.linkedin.com/company/branding-zombie-designs",
  ],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/brandingzombie",
    "https://www.facebook.com/brandingzombie",
    "https://www.tiktok.com/@brandingzombie",
    "https://www.linkedin.com/company/branding-zombie-designs",
  ],
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
