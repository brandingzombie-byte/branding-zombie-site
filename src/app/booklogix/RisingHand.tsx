"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Decorative zombie hand that rises into view when scrolled to. Purely
// ornamental (aria-hidden); the motion-safe gate keeps it static for
// prefers-reduced-motion users, and it renders fully visible without JS.
export default function RisingHand({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [risen, setRisen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRisen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRisen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn(
        "pointer-events-none select-none motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
        !risen && "motion-safe:translate-y-[70%]",
        className,
      )}
    />
  );
}
