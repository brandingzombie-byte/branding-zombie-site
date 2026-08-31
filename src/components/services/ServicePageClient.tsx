"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";

/**
 * Thin client wrapper that applies MotionConfig to the whole service page tree
 * so framer-motion animations respect `prefers-reduced-motion: reduce` via the
 * `reducedMotion="user"` setting. The page itself stays a Server Component so
 * it can export generateMetadata and generateStaticParams.
 *
 * With `edgeHands`, it additionally renders a page-length decorative layer of
 * parallax zombie hands emerging from the gutters ("alive" treatment, same
 * playbook as the homepage and /brand-checkup). Offsets are percentages of the
 * FULL page height, so the hands land roughly a third, halfway, and near the
 * end of the scroll. ZombieHand itself guarantees zero CLS, pointer
 * transparency, and reduced-motion fallbacks.
 */
export default function ServicePageClient({
  children,
  edgeHands = false,
}: {
  children: ReactNode;
  edgeHands?: boolean;
}) {
  if (!edgeHands) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-x-clip"
        >
          {/* "Brains" sign from the left, about a third of the way down. */}
          <ZombieHand
            src={HANDS["zh05-brains-sign-l"].src}
            width={HANDS["zh05-brains-sign-l"].width}
            height={HANDS["zh05-brains-sign-l"].height}
            edge="left"
            behaviors={["peek", "idle", "parallax"]}
            offset="34%"
            bleed="-30px"
            displayWidth={190}
            rotate={6}
            parallaxSpeed={0.14}
          />
          {/* Rock-on from the right at the mid-page pricing zone (the beckon
              hand is already taken by ServiceLeadFormSection). */}
          <ZombieHand
            src={HANDS["zh10-rockon-r"].src}
            width={HANDS["zh10-rockon-r"].width}
            height={HANDS["zh10-rockon-r"].height}
            edge="right"
            behaviors={["peek", "idle", "parallax", "follow"]}
            offset="55%"
            bleed="-26px"
            displayWidth={185}
            rotate={-5}
            parallaxSpeed={-0.1}
            followStrength={20}
          />
          {/* Thumbs-up near the final CTA — small enough to keep on mobile. */}
          <ZombieHand
            src={HANDS["zh01-thumbsup-l"].src}
            width={HANDS["zh01-thumbsup-l"].width}
            height={HANDS["zh01-thumbsup-l"].height}
            edge="left"
            behaviors={["peek", "idle", "parallax"]}
            offset="88%"
            bleed="-24px"
            displayWidth={165}
            rotate={8}
            parallaxSpeed={0.12}
            mobile
            mobileParallax
          />
        </div>
      </div>
    </MotionConfig>
  );
}
