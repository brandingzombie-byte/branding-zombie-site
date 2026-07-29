"use client";

import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import { HowItWorks } from "@/components/ui/how-it-works";

export default function Process() {
  const { ref, isInView } = useInView(0.05);

  return (
    <Section
      id="process"
      theme="light"
      pad="tight"
      className="bg-[var(--color-fog)] overflow-hidden"
    >
      {/* ── Zombie hand layer (decorative, behind content) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] overflow-x-clip"
      >
        {/* Diagonal pointer tracking the cursor beside the process timeline */}
        <ZombieHand
          src={HANDS["zh25-point-diag"].src}
          width={HANDS["zh25-point-diag"].width}
          height={HANDS["zh25-point-diag"].height}
          edge="left"
          behaviors={["peek", "follow", "idle"]}
          offset="24%"
          bleed="-40px"
          displayWidth={330}
          zIndex={5}
        />
      </div>
      <div
        ref={ref}
        className={cn(
          "transition-[opacity,transform] duration-[var(--duration-slower)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <HowItWorks />
      </div>
    </Section>
  );
}
