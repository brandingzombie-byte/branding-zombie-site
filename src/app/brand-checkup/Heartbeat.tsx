// ─── Heartbeat — the "is your brand alive?" EKG motif ─────────────────────────
// A tileable ECG trace whose vitality maps to the checkup score band: a near-flat
// line with a weak blip for a zombie brand → a strong, fast, healthy beat for one
// that's thriving. It's the literal payoff of the headline ("Is Your Brand
// Half-Dead?") rendered as a hospital-monitor readout.
//
// Pure SVG + CSS. The trace is drawn once at double width (two identical tiles)
// and the track is translated by -50% on an infinite linear loop, so the scroll
// is seamless and only ever animates `transform` (GPU, off the main thread).
// Reduced-motion callers get the static shape with no scroll — the vitals still
// read, they just don't travel.

import styles from "./BrandCheckup.module.css";
import type { BandKey } from "@/lib/brand-checkup/data";

// PQRST-ish beat cell, expressed as [xFraction, yOffset] control points where a
// positive yOffset points UP (toward the top of the strip). Straight segments
// between points give the authentic polyline-monitor look.
const BEAT: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0], [0.26, 0], [0.32, 0.14], [0.38, 0], [0.44, -0.16],
  [0.5, 1.0], [0.55, -0.46], [0.6, 0], [0.7, 0.26], [0.78, 0], [1.0, 0],
];

// Per-band personality: amplitude (how alive), beat count across the strip, and
// loop duration (heart rate). Zombie = slow + nearly flat; Alive = fast + tall.
const BAND_TUNE: Record<BandKey, { amp: number; beats: number; seconds: number }> = {
  zombie: { amp: 0.1, beats: 5, seconds: 5.4 },
  half: { amp: 0.42, beats: 6, seconds: 4.0 },
  pulse: { amp: 0.66, beats: 6, seconds: 3.0 },
  alive: { amp: 1.0, beats: 7, seconds: 2.2 },
};

const W = 1200;
const H = 100;

/** Build a tileable ECG polyline `d` string spanning the full width. */
function ekgPath(beats: number, amp: number): string {
  const y0 = H / 2;
  const cw = W / beats;
  const peak = H * 0.44; // px of travel at amp 1.0
  let d = `M0 ${y0}`;
  for (let c = 0; c < beats; c++) {
    for (const [xf, yf] of BEAT) {
      const x = (c + xf) * cw;
      const y = y0 - yf * amp * peak;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return d;
}

export default function Heartbeat({
  band,
  color,
  seconds,
  className,
}: {
  band: BandKey;
  /** Stroke color; defaults to the band's own color via CSS var. */
  color?: string;
  /** Override the loop duration (e.g. slower for the subtle intro accent). */
  seconds?: number;
  className?: string;
}) {
  const tune = BAND_TUNE[band];
  const d = ekgPath(tune.beats, tune.amp);
  const dur = seconds ?? tune.seconds;

  return (
    <div
      className={`${styles.hb} ${className ?? ""}`}
      aria-hidden="true"
      style={
        {
          "--hb-color": color ?? "var(--color-toxic)",
          "--hb-dur": `${dur}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.hbTrack}>
        {/* Two identical tiles so a -50% translate loops seamlessly. The glow is
            a fatter, translucent duplicate stroke (no blur filter → no per-frame
            re-raster); the crisp core rides on top. */}
        <svg
          className={styles.hbSvg}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="presentation"
        >
          <g className={styles.hbGlow}>
            <path d={d} />
            <path d={d} transform={`translate(${W} 0)`} />
          </g>
          <g className={styles.hbCore}>
            <path d={d} />
            <path d={d} transform={`translate(${W} 0)`} />
          </g>
        </svg>
      </div>
    </div>
  );
}
