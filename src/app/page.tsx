import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import AIShowcase from "@/components/AIShowcase";
import LocalTrust from "@/components/LocalTrust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";

// Separator placement is driven by hex-match between SVG fill and an adjacent
// section's background token — see SectionSeparator.tsx for the fill catalog.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionSeparator id={7} />
        <PainPoints />
        <SectionSeparator id={1} />
        <Services />
        <SectionSeparator id={2} />
        <Process />
        <SectionSeparator id={1} />
        <Testimonials />
        <SectionSeparator id={4} />
        <Portfolio />
        {/* Portfolio → Pricing seam. The point-up hand "crawls out of the
            grave," rising through the torn-paper rip to point up at Pricing.
            The wrapper is `relative` (positioning context) but does NOT clip
            vertically, so the hand may bleed above/below the seam. The
            separator SVG paints at z-10 and the hand layer at z-5, so the hand
            emerges from BEHIND the torn edge. Only this id={8} instance is
            wrapped. */}
        <div className="relative">
          <SectionSeparator id={8} />
          {/* Clip window for the seam hand: spans the separator plus ~210px
              above it and ENDS at the separator's bottom edge, overflow-hidden,
              so only the fingertip pokes up out of the seam — never a full
              720px arm over the Portfolio content, and nothing spills down
              over Pricing. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[-210px] overflow-hidden z-[5]"
          >
            {/* #4 — Point-up, rising toward Pricing's "Pick a package" */}
            <ZombieHand
              src={HANDS["zh11-point-up"].src}
              width={HANDS["zh11-point-up"].width}
              height={HANDS["zh11-point-up"].height}
              edge="bottom"
              behaviors={["peek", "parallax"]}
              offset="12%"
              bleed="-255px"
              displayWidth={150}
              parallaxSpeed={0.08}
              zIndex={5}
            />
          </div>
        </div>
        <Pricing />
        <SectionSeparator id={3} />
        <AIShowcase />
        <SectionSeparator id={5} />
        <LocalTrust />
        <SectionSeparator id={6} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
