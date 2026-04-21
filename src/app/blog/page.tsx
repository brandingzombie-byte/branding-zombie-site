import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Section from "@/components/Section";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/data/posts";
import { SITE_URL, BUSINESS_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: `Blog — Web design, branding & small-business growth | ${BUSINESS_NAME}`,
  description:
    "Practical guides on small-business web design, branding, local SEO, and AI workflows — written from Cumming, GA for real businesses across North Metro Atlanta.",
  keywords: [
    "small business web design blog",
    "branding blog Cumming GA",
    "local SEO tips",
    "website conversion blog",
    "Forsyth County web design",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Blog | ${BUSINESS_NAME}`,
    description:
      "Guides on small-business web design, branding, local SEO, and AI workflows — from Cumming, GA.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${BUSINESS_NAME}`,
    description:
      "Guides on small-business web design, branding, local SEO, and AI workflows — from Cumming, GA.",
    images: ["/assets/og-image.png"],
  },
};

// Blog-level schema — marks this as a Blog node publishing BlogPosting children.
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${PAGE_URL}#blog`,
  url: PAGE_URL,
  name: `${BUSINESS_NAME} Blog`,
  description:
    "Small-business web design, branding, local SEO, and AI workflow guides from Cumming, GA.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main>
        {/* Header */}
        <Section theme="light" pad="standard" className="pt-32 lg:pt-40">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-neon)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
                Field Notes
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-text-primary">
              The Blog.
            </h1>
            <p className="measure mt-2 text-[length:var(--text-lead)] leading-relaxed text-text-secondary">
              Plainspoken guides on web design, branding, local SEO, and AI
              workflows — for small businesses in Cumming, Forsyth County, and
              the rest of North Metro Atlanta.
            </p>
          </div>
        </Section>

        {/* Posts grid */}
        <Section theme="light" pad="standard" topRule>
          {posts.length === 0 ? (
            <p className="text-center text-text-secondary">
              New posts coming soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          )}
        </Section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
