import type { Post } from "@/data/posts";
import { getPostUrl } from "@/data/posts";
import { SITE_URL, ORG_ID, BUSINESS_NAME, FOUNDER_NAME } from "@/lib/site";

/**
 * BlogPosting + Article JSON-LD for /blog/[slug].
 *
 * Paired with the Organization graph defined in layout.tsx, this gives
 * Google enough structured data to render the post with rich snippets
 * (author, date, image, publisher) and surface it in LLM answers.
 */
export default function BlogJsonLd({ post }: { post: Post }) {
  const url = getPostUrl(post.meta.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.meta.title,
    description: post.meta.seoDescription,
    url,
    datePublished: post.meta.datePublished,
    dateModified: post.meta.dateModified ?? post.meta.datePublished,
    inLanguage: "en-US",
    articleSection: post.meta.category,
    keywords: post.meta.keywords.join(", "),
    wordCount: undefined, // computed at render time if we ever need it
    author: {
      "@type": "Person",
      name: FOUNDER_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@id": ORG_ID,
      "@type": "Organization",
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/brand-icon-1024.png`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${post.meta.ogImage}`,
      width: 1200,
      height: 630,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.meta.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
