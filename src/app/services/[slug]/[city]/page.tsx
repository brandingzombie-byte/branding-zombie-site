import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationPageBody from "@/components/locations/LocationPageBody";
import LocationJsonLd from "@/components/locations/LocationJsonLd";
import { SITE_URL } from "@/lib/site";
import {
  getLocationService,
  getAllLocationServiceSlugs,
} from "@/data/location-services";
import { getLocationBySlug, getAllLocationSlugs } from "@/data/locations";

// Prerender every enabled service × city combo; 404 on anything else. Launching
// web-design first means this generates web-design × all cities. Enabling more
// services (location-services.ts) automatically expands this set.
export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const slug of getAllLocationServiceSlugs()) {
    for (const city of getAllLocationSlugs()) {
      params.push({ slug, city });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const svc = getLocationService(slug);
  const loc = getLocationBySlug(city);
  if (!svc || !loc) return {};

  const url = `${SITE_URL}/services/${svc.slug}/${loc.slug}`;
  const cityState = `${loc.city}, ${loc.state}`;
  // Root layout applies the "%s | Branding Zombie Designs" title template, so the
  // brand is intentionally omitted here to avoid a doubled suffix. The og/twitter
  // titles below use `.absolute`-style full strings since the template only wraps
  // the document <title>.
  const title = `${svc.label} in ${cityState} | Custom Websites ${svc.priceAnchor}`;
  const ogTitle = `${title} | Branding Zombie Designs`;
  const description = `${svc.label} for ${loc.city}, ${loc.county} small businesses — custom, fast, local-SEO-ready websites ${svc.priceAnchor}, delivered in ${svc.timeline}. You own every file. Free quote: call us.`;

  return {
    title,
    description,
    keywords: [
      `${svc.label.toLowerCase()} ${loc.city} GA`,
      `${loc.city} web designer`,
      `${loc.city} website design`,
      `web design ${loc.county}`,
      `small business website ${loc.city}`,
      `website designer near ${loc.city}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Branding Zombie Designs",
      title: ogTitle,
      description,
      images: [
        {
          url: svc.heroImage.src,
          width: 1200,
          height: 630,
          alt: `${svc.heroImage.alt} — ${cityState}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [svc.heroImage.src],
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
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const svc = getLocationService(slug);
  const loc = getLocationBySlug(city);
  if (!svc || !loc) notFound();

  return (
    <>
      <Navbar />
      <LocationJsonLd svc={svc} loc={loc} />
      <main id="main-content" tabIndex={-1}>
        <LocationPageBody svc={svc} loc={loc} />
      </main>
      <Footer />
    </>
  );
}
