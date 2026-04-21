import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Section from "@/components/Section";
import BlogHero from "@/components/blog/BlogHero";
import BlogProse from "@/components/blog/BlogProse";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import BlogCard from "@/components/blog/BlogCard";
import {
  getAllPostSlugs,
  getAllPosts,
  getPostBySlug,
  getPostUrl,
} from "@/data/posts";
import { SITE_URL } from "@/lib/site";

// Prerender every post at build time; 404 on any other slug.
export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = getPostUrl(slug);
  return {
    title: post.meta.seoTitle,
    description: post.meta.seoDescription,
    keywords: post.meta.keywords,
    authors: [{ name: post.meta.author, url: `${SITE_URL}/about` }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: "Branding Zombie Designs",
      title: post.meta.seoTitle,
      description: post.meta.seoDescription,
      publishedTime: post.meta.datePublished,
      modifiedTime: post.meta.dateModified ?? post.meta.datePublished,
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: [
        {
          url: post.meta.ogImage,
          width: 1200,
          height: 630,
          alt: post.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.seoTitle,
      description: post.meta.seoDescription,
      images: [post.meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { Content } = post;

  // Related: every other post, newest first, capped at 3.
  const related = getAllPosts()
    .filter((p) => p.meta.slug !== post.meta.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <BlogJsonLd post={post} />
      <main>
        <article>
          <BlogHero meta={post.meta} />

          <Section theme="light" pad="standard" topRule>
            <BlogProse>
              <Content />
            </BlogProse>
          </Section>

          {/* Tags */}
          <Section theme="light" pad="tight">
            <div className="mx-auto flex w-full max-w-[68ch] flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-hairline-strong)] px-3 py-1 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Section>
        </article>

        {/* Related posts — only render the section if we have any */}
        {related.length > 0 && (
          <Section theme="light" pad="standard" topRule>
            <div className="flex flex-col gap-2">
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
                Keep reading
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
                More from the blog.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          </Section>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
