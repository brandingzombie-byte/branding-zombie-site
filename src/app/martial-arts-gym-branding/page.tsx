import type { Metadata } from "next";
import MartialArtsPage from "@/components/martial-arts/MartialArtsPage";
import { getMartialArtsProduct } from "@/data/martial-arts-marketing";
import { martialArtsMetadata } from "@/lib/martialArtsMeta";

const product = getMartialArtsProduct();

export const metadata: Metadata = martialArtsMetadata(product);

export default function Page() {
  return <MartialArtsPage product={product} />;
}
