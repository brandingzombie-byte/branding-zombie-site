import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTheme = "light" | "dark" | "parchment";
type SectionPad = "tight" | "standard" | "spacious" | "none";
type SectionPattern =
  | "default"
  | "asymmetric"
  | "split"
  | "bento"
  | "rail";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  theme?: SectionTheme;
  pad?: SectionPad;
  pattern?: SectionPattern;
  /** Render the section as <header> or <footer> instead of <section> */
  as?: "section" | "header" | "footer" | "div";
  /** Skip the inner max-width container so children can full-bleed */
  bleed?: boolean;
  /** Add a thin top hairline (for transition seams) */
  topRule?: boolean;
  /** Add a thin bottom hairline (for transition seams) */
  bottomRule?: boolean;
  /** Add a scanline divider band at the top */
  topScanline?: boolean;
  /** Add a scanline divider band at the bottom */
  bottomScanline?: boolean;
  containerClassName?: string;
};

const themeClasses: Record<SectionTheme, string> = {
  light: "bg-mist text-text-primary",
  parchment: "bg-[var(--color-surface-0)] text-text-primary",
  dark: "bg-[var(--color-grave)] text-[var(--color-dark-text-primary)]",
};

const padClasses: Record<SectionPad, string> = {
  none: "",
  tight: "py-[var(--space-tight)]",
  standard: "py-[var(--space-standard)]",
  spacious: "py-[var(--space-spacious)]",
};

const patternClasses: Record<SectionPattern, string> = {
  default: "",
  asymmetric: "[--section-grid:asymmetric]",
  split: "[--section-grid:split]",
  bento: "[--section-grid:bento]",
  rail: "[--section-grid:rail]",
};

export function Section({
  theme = "light",
  pad = "standard",
  pattern = "default",
  as: Tag = "section",
  bleed = false,
  topRule = false,
  bottomRule = false,
  topScanline = false,
  bottomScanline = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      data-theme={theme === "dark" ? "dark" : "light"}
      data-pattern={pattern}
      className={cn(
        "relative isolate w-full",
        themeClasses[theme],
        padClasses[pad],
        topRule && "border-t border-[var(--color-hairline-strong)]",
        bottomRule && "border-b border-[var(--color-hairline-strong)]",
        patternClasses[pattern],
        className,
      )}
      {...rest}
    >
      {topScanline && (
        <span aria-hidden className="scanline-divider absolute inset-x-0 top-0" />
      )}
      {bleed ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto w-full max-w-[1280px] px-6 lg:px-10",
            containerClassName,
          )}
        >
          {children}
        </div>
      )}
      {bottomScanline && (
        <span aria-hidden className="scanline-divider absolute inset-x-0 bottom-0" />
      )}
    </Tag>
  );
}

export default Section;
