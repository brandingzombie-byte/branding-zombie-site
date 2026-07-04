import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TattooPage from "@/components/tattoo/TattooPage";
import {
  getTattooProduct,
  getTattooCityCopy,
  TATTOO_CITY_COPY,
} from "@/data/tattoo-marketing";
import { getLocationBySlug } from "@/data/locations";
import { tattooMetadata } from "@/lib/tattooMeta";

const product = getTattooProduct();

// Prerender one page per service-area city that has hand-written tattoo-
// marketing copy; 404 on anything else (no thin mad-libs pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TATTOO_CITY_COPY).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};
  return tattooMetadata(product, loc);
}

export default async function TattooCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  const cityCopy = getTattooCityCopy(city);
  if (!loc || !cityCopy) notFound();
  return <TattooPage product={product} city={loc} cityCopy={cityCopy} />;
}
