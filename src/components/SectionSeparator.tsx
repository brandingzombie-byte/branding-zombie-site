import Image from "next/image";

// Catalog of the separator SVGs shipped in /public/assets. The `fill` field is
// the baked-in fill color of the SVG so consumers (and future us) can pick a
// variant that matches an adjacent section's background for the bleed effect.
// Separators 1/3/5 = mist (#D4E7D4), 2/4/6 = fog (#E8F0E8), 7/8 = grave (#111714).
const SEPARATORS = {
  1: { src: "/assets/separator-1.svg", w: 3068, h: 330, fill: "mist" },
  2: { src: "/assets/separator-2.svg", w: 3091, h: 392, fill: "fog" },
  3: { src: "/assets/separator-3.svg", w: 4143, h: 433, fill: "mist" },
  4: { src: "/assets/separator-4.svg", w: 4218, h: 475, fill: "fog" },
  5: { src: "/assets/separator-5.svg", w: 4173, h: 290, fill: "mist" },
  6: { src: "/assets/separator-6.svg", w: 4322, h: 370, fill: "fog" },
  7: { src: "/assets/separator-7.svg", w: 4322, h: 370, fill: "grave" },
  8: { src: "/assets/separator-8.svg", w: 4143, h: 433, fill: "grave" },
} as const;

export type SeparatorId = keyof typeof SEPARATORS;

type Props = {
  /** Which separator SVG to render (1–8). */
  id: SeparatorId;
};

/**
 * Decorative torn-paper band that straddles a section seam.
 *
 * The host div has zero block height so it does not displace the sections in
 * flow; the SVG is positioned absolutely with its vertical center on the seam
 * so roughly half of the textured edge overlaps each neighbouring section. The
 * image is sized at 110% of viewport and shifted left by 5% so the ragged edge
 * runs past both viewport edges — reinforcing the "rip" illusion.
 *
 * Ancestors must clip horizontal overflow (we set `overflow-x-clip` on <body>
 * in the root layout) or the oversized SVG will create horizontal scroll.
 */
export default function SectionSeparator({ id }: Props) {
  const sep = SEPARATORS[id];
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 h-0 w-full"
    >
      <Image
        src={sep.src}
        alt=""
        width={sep.w}
        height={sep.h}
        priority={false}
        className="absolute top-1/2 left-[-5%] h-auto w-[110%] max-w-none -translate-y-1/2"
      />
    </div>
  );
}
