/**
 * ServiceLeadFormSection — the mid-page "just call me back" band rendered on
 * every service landing page, right after the pain points. Low-friction
 * counterpart to the full quote form: three fields, one button, and the
 * mummified beckoning hand doing the inviting.
 */

import Section from "@/components/Section";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import ServiceLeadForm from "@/components/services/ServiceLeadForm";

export default function ServiceLeadFormSection({
  slug,
  serviceName,
}: {
  slug: string;
  serviceName: string;
}) {
  return (
    <Section
      theme="light"
      pad="standard"
      className="overflow-hidden bg-[var(--color-fog)]"
    >
      {/* Beckoning hand from the right edge — "come here" (desktop only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-x-clip"
      >
        <ZombieHand
          src={HANDS["zh22-beckon-r"].src}
          width={HANDS["zh22-beckon-r"].width}
          height={HANDS["zh22-beckon-r"].height}
          edge="right"
          behaviors={["peek", "idle", "follow"]}
          offset="34%"
          bleed="-36px"
          displayWidth={300}
          rotate={-6}
          followStrength={26}
          zIndex={1}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-2xl">
        <ServiceLeadForm slug={slug} serviceName={serviceName} tone="light" />
      </div>
    </Section>
  );
}
