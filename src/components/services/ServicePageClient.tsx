"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Thin client wrapper that applies MotionConfig to the whole service page tree
 * so framer-motion animations respect `prefers-reduced-motion: reduce` via the
 * `reducedMotion="user"` setting. The page itself stays a Server Component so
 * it can export generateMetadata and generateStaticParams.
 */
export default function ServicePageClient({
  children,
}: {
  children: ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
