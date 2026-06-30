import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import LocalTrust from "@/components/LocalTrust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";
import { REVIEWS } from "@/data/reviews";
import { FAQS } from "@/data/faqs";
import { LOCALBIZ_ID, BUSINESS_NAME } from "@/lib/site";

// FAQPage schema generated from the SAME data the visible accordion renders, so
// the structured data always matches on-page text (Google FAQ-rich-result rule).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

// Individual Review schema for the homepage testimonials. aggregateRating lives
// on the LocalBusiness node in layout.tsx; these Review objects reference it by
// @id so the proof is machine-readable for AI answer engines and rich results.
const reviewsSchema = REVIEWS.map((r) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "LocalBusiness",
    "@id": LOCALBIZ_ID,
    name: BUSINESS_NAME,
  },
  author: { "@type": "Person", name: r.name },
  datePublished: r.datePublished,
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
  },
  reviewBody: r.quote,
}));

// Separator placement is driven by hex-match between SVG fill and an adjacent
// section's background token — see SectionSeparator.tsx for the fill catalog.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SectionSeparator id={7} />
        <PainPoints />
        {/* Social proof raised high: real Google reviews land right after the
            problem hook, before we ask for anything (CRO — proof before pitch). */}
        <SectionSeparator id={1} />
        <Testimonials />
        <SectionSeparator id={5} />
        <Services />
        <SectionSeparator id={2} />
        <Process />
        <SectionSeparator id={4} />
        <Portfolio />
        <SectionSeparator id={8} />
        <Pricing />
        {/* AIShowcase (chatbot) intentionally removed 2026-06-30 until the
            chatbot service is live — see CRO notes. */}
        <SectionSeparator id={3} />
        <LocalTrust />
        <SectionSeparator id={6} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
