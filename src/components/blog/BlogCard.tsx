"use client";

import type { PostMeta } from "@/data/posts";
import { ArrowRight } from "@/components/icons";

/**
 * Card used on /blog index to link to each post.
 *
 * Entire card is a single <a> so tap targets on mobile are large. Title is
 * visible, excerpt trimmed, meta strip keeps the card scannable.
 */
export default function BlogCard({ meta }: { meta: PostMeta }) {
  const dateLabel = new Date(meta.datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a
      href={`/blog/${meta.slug}`}
      className="group flex flex-col rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] p-7 transition-colors hover:border-[var(--color-neon)] hover:bg-[var(--color-fog)]"
    >
      {/* Meta strip */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
        <span className="text-[var(--color-neon-text)]">{meta.category}</span>
        <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
        <span className="tabular">{dateLabel}</span>
        <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
        <span>{meta.readingTimeMinutes} min</span>
      </div>

      {/* Title */}
      <h2 className="mt-5 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary">
        {meta.title}
      </h2>

      {/* Excerpt */}
      <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
        {meta.excerpt}
      </p>

      {/* Arrow CTA */}
      <span className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
        Read the post
        <ArrowRight
          size={14}
          weight="bold"
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </a>
  );
}
