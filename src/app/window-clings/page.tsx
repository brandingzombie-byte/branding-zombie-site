import type { Metadata } from "next";
import WindowClingsPage from "@/components/window-clings/WindowClingsPage";
import { getWindowClingsProduct } from "@/data/window-clings";
import { windowClingsMetadata } from "@/lib/windowClingsMeta";

const product = getWindowClingsProduct();

export const metadata: Metadata = windowClingsMetadata(product);

export default function Page() {
  return <WindowClingsPage product={product} />;
}
