import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import AIShowcase from "@/components/AIShowcase";
import LocalTrust from "@/components/LocalTrust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";

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
        <SectionSeparator id={4} />
        <Portfolio />
        <SectionSeparator id={8} />
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
