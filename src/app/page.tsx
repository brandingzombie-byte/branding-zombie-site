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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Process />
        <Portfolio />
        <Pricing />
        <AIShowcase />
        <LocalTrust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
