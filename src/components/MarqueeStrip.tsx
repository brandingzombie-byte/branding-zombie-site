import { cn } from "@/lib/utils";

const ROW_ONE = [
  "DEAD SITES RESURRECTED",
  "BRANDS REANIMATED",
  "CUMMING GA",
  "10 DAYS",
  "FREE AUDIT",
  "NO HAND-OFFS",
  "FORSYTH COUNTY",
  "SIGNS OF LIFE",
];

const ROW_TWO = [
  "WEB · BRAND · PRINT · AI",
  "BUILT IN DAYS",
  "SMALL SHOPS · BIG RESULTS",
  "NO RETAINER TRAP",
  "STRAIGHT ANSWER",
  "15-MIN CALL",
  "FORSYTH COUNTY GA",
  "THE CRAFT",
];

interface MarqueeStripProps {
  variant?: "dark" | "light";
  speed?: number;
}

export default function MarqueeStrip({ variant = "dark", speed = 26 }: MarqueeStripProps) {
  const isDark = variant === "dark";

  const row1 = ROW_ONE.join("  ·  ") + "  ·  ";
  const row2 = ROW_TWO.join("  ·  ") + "  ·  ";

  return (
    <div
      aria-hidden
      className={cn(
        "w-full overflow-hidden border-y select-none",
        isDark
          ? "border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]"
          : "border-[var(--color-hairline-strong)] bg-[var(--color-fog)]",
      )}
    >
      {/* Row 1 — left → right, display weight */}
      <div
        className={cn(
          "border-b",
          isDark
            ? "border-[var(--color-dark-border-strong)]"
            : "border-[var(--color-hairline-strong)]",
        )}
      >
        <div
          className="marquee-track flex w-max items-center py-3"
          style={{ animation: `marquee ${speed}s linear infinite` }}
        >
          <span
            className={cn(
              "inline-block pr-16 font-[family-name:var(--font-display)] text-[length:var(--text-h4)] uppercase tracking-wide",
              isDark
                ? "text-[var(--color-toxic)]"
                : "text-[var(--color-text-primary)]",
            )}
          >
            {row1}
          </span>
          {/* Duplicate for seamless loop */}
          <span
            className={cn(
              "inline-block pr-16 font-[family-name:var(--font-display)] text-[length:var(--text-h4)] uppercase tracking-wide",
              isDark
                ? "text-[var(--color-toxic)]"
                : "text-[var(--color-text-primary)]",
            )}
          >
            {row1}
          </span>
        </div>
      </div>

      {/* Row 2 — right → left, mono label weight */}
      <div>
        <div
          className="marquee-track flex w-max items-center py-2.5"
          style={{ animation: `marquee-reverse ${speed * 1.4}s linear infinite` }}
        >
          <span
            className={cn(
              "inline-block pr-16 font-mono text-[length:var(--text-caption)] uppercase tracking-[0.28em]",
              isDark
                ? "text-[var(--color-dark-text-dim)]"
                : "text-[var(--color-text-dim)]",
            )}
          >
            {row2}
          </span>
          <span
            className={cn(
              "inline-block pr-16 font-mono text-[length:var(--text-caption)] uppercase tracking-[0.28em]",
              isDark
                ? "text-[var(--color-dark-text-dim)]"
                : "text-[var(--color-text-dim)]",
            )}
          >
            {row2}
          </span>
        </div>
      </div>
    </div>
  );
}
