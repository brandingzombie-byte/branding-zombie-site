import Image from "next/image";
import { cn } from "@/lib/utils";

const ASPECT: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

/**
 * Renders a real image when `src` is set, otherwise a tasteful, on-brand
 * PLACEHOLDER showing the suggested shot — so a page can ship before the photo
 * exists, and the owner can see exactly what to procure or generate for each
 * slot. Swap in a real image later by setting `src` in the industry data.
 *
 * No icons-from-Phosphor here (inline SVG) so it stays usable anywhere.
 */
export default function ImageSlot({
  src,
  alt,
  suggestion,
  aspect = "wide",
  tone = "light",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className,
}: {
  src?: string;
  alt: string;
  suggestion: string;
  aspect?: "tall" | "wide" | "square";
  tone?: "light" | "dark";
  sizes?: string;
  className?: string;
}) {
  const box = ASPECT[aspect] ?? ASPECT.wide;
  const dark = tone === "dark";

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border",
          dark
            ? "border-[var(--color-dark-border)] bg-[var(--color-surface)]"
            : "border-[var(--color-hairline-strong)] bg-[var(--color-fog)]",
          box,
          className,
        )}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6 text-center",
        dark
          ? "border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] text-[var(--color-dark-text-dim)]"
          : "border-[var(--color-hairline-strong)] bg-[var(--color-fog)] text-text-dim",
        box,
        className,
      )}
    >
      <svg
        viewBox="0 0 256 256"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden
        className="opacity-70"
      >
        <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z" />
      </svg>
      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em]">
        Image placeholder
      </span>
      <span className="measure-tight text-[length:var(--text-secondary)] leading-snug">
        {suggestion}
      </span>
    </div>
  );
}
