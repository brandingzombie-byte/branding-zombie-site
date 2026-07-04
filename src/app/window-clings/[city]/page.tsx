import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WindowClingsPage from "@/components/window-clings/WindowClingsPage";
import {
  getWindowClingsProduct,
  getWindowClingsCityCopy,
  WINDOW_CLINGS_CITY_COPY,
} from "@/data/window-clings";
import { getLocationBySlug } from "@/data/locations";
import { windowClingsMetadata } from "@/lib/windowClingsMeta";

const product = getWindowClingsProduct();

// Prerender one page per service-area city that has hand-written window-graphics
// copy; 404 on anything else (no thin mad-libs pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(WINDOW_CLINGS_CITY_COPY).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};
  return windowClingsMetadata(product, loc);
}

export default async function WindowClingsCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  const cityCopy = getWindowClingsCityCopy(city);
  if (!loc || !cityCopy) notFound();
  return <WindowClingsPage product={product} city={loc} cityCopy={cityCopy} />;
}
