"use client";

import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal wrapper used across the mailer pages. Matches the
 * site's established cadence (700ms, fade + 24px rise, once-only at 15%
 * visibility) so the new pages feel native. Honors prefers-reduced-motion via
 * the motion-reduce utilities below (transforms collapse, opacity stays).
 *
 * Lets server-rendered section content stay on the server — only this thin
 * wrapper is a client component.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms (keep 0–160 for snappy sequences). */
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const { ref, isInView } = useReveal();
  // Typed against "div" (not React.ElementType): with @react-three/fiber's
  // JSX augmentation in the program, the broad ElementType union collapses
  // this tag's inferred props to `never`. div/li/section share every prop
  // used here, and the real tag still renders at runtime.
  const Comp = as as "div";
  return (
    <Comp
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
