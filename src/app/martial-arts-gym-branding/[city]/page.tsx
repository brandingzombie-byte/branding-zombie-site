import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MartialArtsPage from "@/components/martial-arts/MartialArtsPage";
import {
  getMartialArtsProduct,
  getMartialArtsCityCopy,
  MARTIAL_ARTS_CITY_COPY,
} from "@/data/martial-arts-marketing";
import { getLocationBySlug } from "@/data/locations";
import { martialArtsMetadata } from "@/lib/martialArtsMeta";

const product = getMartialArtsProduct();

// Prerender one page per service-area city that has hand-written
// martial-arts-branding copy; 404 on anything else (no thin mad-libs pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(MARTIAL_ARTS_CITY_COPY).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};
  return martialArtsMetadata(product, loc);
}

export default async function MartialArtsCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  const cityCopy = getMartialArtsCityCopy(city);
  if (!loc || !cityCopy) notFound();
  return <MartialArtsPage product={product} city={loc} cityCopy={cityCopy} />;
}
