import Section from "@/components/Section";
import type { PostMeta } from "@/data/posts";

/**
 * Reading-time strip and title header for a blog post.
 *
 * Rendered as a light section above the prose so the post starts with a
 * clear visual signpost (category · date · reading time), then the title,
 * then a slim excerpt.
 */
export default function BlogHero({ meta }: { meta: PostMeta }) {
  const dateLabel = new Date(meta.datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Section theme="light" pad="standard" className="pt-32 lg:pt-40">
      <div className="mx-auto w-full max-w-[68ch]">
        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
          <span className="text-[var(--color-neon-text)]">{meta.category}</span>
          <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
          <span className="tabular">{dateLabel}</span>
          <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
          <span>{meta.readingTimeMinutes} min read</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[0.95] tracking-tight text-text-primary">
          {meta.title}
        </h1>

        {/* Excerpt / lead */}
        <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-text-secondary">
          {meta.excerpt}
        </p>

        {/* Author line */}
        <div className="mt-8 flex items-center gap-3 text-[length:var(--text-secondary)] text-text-secondary">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-neon)]/20 text-sm font-semibold text-[var(--color-neon-text)]">
            {meta.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <span>
            By <strong className="text-text-primary">{meta.author}</strong> · Branding Zombie Designs
          </span>
        </div>
      </div>
    </Section>
  );
}
