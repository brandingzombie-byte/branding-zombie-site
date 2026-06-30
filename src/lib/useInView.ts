"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.15, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      // Pre-trigger the reveal ~18% of a viewport BEFORE the element scrolls
      // into view, so content is already fading/sliding in by the time the
      // user reaches it — instead of a blank panel that pops in after it's
      // centered (the "empty scroll" feeling). Bottom margin grows the root
      // downward, so intersection fires earlier.
      { threshold, rootMargin: "0px 0px 18% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
}
