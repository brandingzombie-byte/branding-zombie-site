import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandCheckup from "./BrandCheckup";
import { SITE_URL, BUSINESS_NAME, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/brand-checkup`;

export const metadata: Metadata = {
  title: "Is Your Brand Half-Dead? Free 5-Minute Brand Checkup | Branding Zombie",
  description:
    "Free, no-jargon brand audit for small businesses in Cumming, GA. Score your logo, website, Google listing, print, and signage in 5 minutes — get an instant verdict and your 3 fastest fixes.",
  keywords: [
    "free brand audit",
    "brand checkup",
    "small business branding audit",
    "logo and website audit",
    "brand audit Cumming GA",
    "is my branding good",
    "free marketing audit Forsyth County",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: "Is Your Brand Half-Dead? — Free 5-Minute Brand Checkup",
    description:
      "25 honest questions. One straight answer on where your business is losing customers — and the fastest way to fix it.",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: `Free brand checkup by ${BUSINESS_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Your Brand Half-Dead? — Free Brand Checkup",
    description: "Score your brand in 5 minutes. Find the dead spots before your customers do.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Brand Checkup", item: PAGE_URL },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  name: "Is Your Brand Half-Dead? — Free Brand Checkup",
  about: { "@id": LOCALBIZ_ID },
  description:
    "Free 25-point small-business brand audit. Self-score your Google presence, website, logo, print, and signage and get an instant verdict plus your three fastest fixes.",
};

export default function BrandCheckupPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main>
        <BrandCheckup />
      </main>
      <Footer />
    </>
  );
}
