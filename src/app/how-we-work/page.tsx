import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowWeWork from "@/components/HowWeWork";
import { SITE_URL, BUSINESS_NAME } from "@/lib/site";
import { HOW_WE_WORK_FAQS } from "@/data/how-we-work-faqs";

const PAGE_URL = `${SITE_URL}/how-we-work`;

export const metadata: Metadata = {
  title: "How We Work — Process, Pricing & Payment Terms",
  description:
    "Exactly how a project runs with Branding Zombie Designs: our 4-step process, 50/50 payments, payment plans, revisions, timelines, ownership, and answers to the questions we hear most.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `How We Work — ${BUSINESS_NAME}`,
    description:
      "Our process, payment terms, revisions, timelines, and ownership — in plain English.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "How We Work", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: HOW_WE_WORK_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HowWeWorkPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HowWeWork />
      <Footer />
    </>
  );
}
