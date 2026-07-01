import type { Metadata } from "next";
import TattooPage from "@/components/tattoo/TattooPage";
import { getTattooProduct } from "@/data/tattoo-marketing";
import { tattooMetadata } from "@/lib/tattooMeta";

const product = getTattooProduct();

export const metadata: Metadata = tattooMetadata(product);

export default function Page() {
  return <TattooPage product={product} />;
}
