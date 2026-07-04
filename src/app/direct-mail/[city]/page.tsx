import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MailerPage from "@/components/mailers/MailerPage";
import { getMailerProduct, getMailerCityCopy } from "@/data/mailer-products";
import { getAllLocationSlugs, getLocationBySlug } from "@/data/locations";
import { mailerMetadata } from "@/lib/mailerMeta";

const product = getMailerProduct("direct-mail")!;

// Prerender one page per service-area city; 404 on anything else.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};
  return mailerMetadata(product, loc);
}

export default async function DirectMailCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  const cityCopy = getMailerCityCopy(city);
  if (!loc || !cityCopy) notFound();
  return <MailerPage product={product} city={loc} cityCopy={cityCopy} />;
}
