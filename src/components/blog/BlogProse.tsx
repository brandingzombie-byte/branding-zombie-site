import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Typography wrapper for blog post content.
 *
 * Applies brand-matched styles to standard HTML elements used inside posts
 * (<h2>, <h3>, <p>, <ul>, <ol>, <li>, <a>, <strong>, <em>, <hr>, <aside>).
 * Post bodies render as plain JSX inside this wrapper so individual posts
 * don't need to think about classnames for common elements.
 *
 * Measures: body max-width ~68ch for comfortable reading. Headings use the
 * display font. Lists get enough vertical breathing room that a long
 * read-through doesn't feel cramped.
 */
export default function BlogProse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[68ch] text-[length:var(--text-body)] leading-[1.75] text-text-primary",
        // Paragraphs
        "[&_p]:my-5",
        // Inline emphasis
        "[&_strong]:font-semibold [&_strong]:text-text-primary",
        "[&_em]:italic",
        // Links — plain <a> gets neon treatment; post JSX uses its own
        // components for internal/external, but bare <a>s still look right.
        "[&_a]:text-[var(--color-neon-text)] [&_a]:underline [&_a]:decoration-[var(--color-neon)]/40 [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-[var(--color-neon)]",
        // H2 — section header
        "[&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:text-[length:var(--text-h2)] [&_h2]:leading-[0.95] [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h2]:scroll-mt-24",
        // H3 — subsection header
        "[&_h3]:font-[family-name:var(--font-display)] [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:text-[length:var(--text-h3)] [&_h3]:leading-[1] [&_h3]:tracking-tight [&_h3]:text-text-primary [&_h3]:scroll-mt-24",
        // H4 — minor header
        "[&_h4]:font-[family-name:var(--font-display)] [&_h4]:mt-10 [&_h4]:mb-3 [&_h4]:text-[length:var(--text-h4)] [&_h4]:text-text-primary",
        // Unordered lists
        "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2.5 [&_ul]:marker:text-[var(--color-neon-text)]",
        // Ordered lists
        "[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2.5 [&_ol]:marker:text-[var(--color-neon-text)] [&_ol]:marker:font-semibold",
        // List items
        "[&_li]:pl-1",
        // Checklist — class="checklist" on <ul> to get hollow circles
        "[&_ul.checklist]:list-none [&_ul.checklist]:pl-0 [&_ul.checklist]:space-y-3",
        "[&_ul.checklist>li]:relative [&_ul.checklist>li]:pl-8",
        "[&_ul.checklist>li]:before:content-[''] [&_ul.checklist>li]:before:absolute [&_ul.checklist>li]:before:left-0 [&_ul.checklist>li]:before:top-[0.55em] [&_ul.checklist>li]:before:h-4 [&_ul.checklist>li]:before:w-4 [&_ul.checklist>li]:before:rounded-sm [&_ul.checklist>li]:before:border-2 [&_ul.checklist>li]:before:border-[var(--color-neon)]",
        // Divider
        "[&_hr]:border-[var(--color-hairline-strong)]",
        // Blockquote (if used)
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-neon)] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-text-secondary",
        // Inline code
        "[&_code]:rounded [&_code]:bg-[var(--color-fog)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:font-mono",
        className,
      )}
    >
      {children}
    </div>
  );
}
