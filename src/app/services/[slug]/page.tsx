import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageClient from "@/components/services/ServicePageClient";
import ServiceHero from "@/components/services/ServiceHero";
import ServicePainPoints from "@/components/services/ServicePainPoints";
import ServiceOffer from "@/components/services/ServiceOffer";
import ServiceGallery from "@/components/services/ServiceGallery";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import ServiceFinalCTA from "@/components/services/ServiceFinalCTA";
import ServiceJsonLd from "@/components/services/ServiceJsonLd";
import { getServiceBySlug, getAllSlugs } from "@/data/services";
import { SITE_URL } from "@/lib/site";

// Prerender all 6 service pages at build time, and 404 on anything else.
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `${SITE_URL}/services/${service.slug}`;
  return {
    title: service.meta.seoTitle,
    description: service.meta.seoDescription,
    keywords: service.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Branding Zombie Designs",
      title: service.meta.seoTitle,
      description: service.meta.seoDescription,
      images: [
        {
          url: service.meta.ogImage,
          width: 1200,
          height: 630,
          alt: service.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.seoTitle,
      description: service.meta.seoDescription,
      images: [service.meta.ogImage],
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <ServiceJsonLd service={service} />
      <main>
        <ServicePageClient>
          <ServiceHero service={service} />
          <ServicePainPoints service={service} />
          <ServiceOffer service={service} />
          <ServiceGallery service={service} />
          <ServiceProcess service={service} />
          <ServiceFAQ service={service} />
          <RelatedServices slug={service.slug} />
          <ServiceFinalCTA service={service} />
        </ServicePageClient>
      </main>
      <Footer />
    </>
  );
}
