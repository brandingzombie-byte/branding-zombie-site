"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Viewport-triggered reveal hook. Wraps framer-motion's `useInView` with the
 * once-only, partial-visibility defaults we use across service landing pages
 * and CPG Launch.
 *
 * @param threshold Fraction of the element that must be visible before it
 *                  counts as in-view. Default 0.15.
 * @returns An object with `ref` (attach to any element) and `isInView`
 *          (boolean that flips true the first time the element enters view).
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}
