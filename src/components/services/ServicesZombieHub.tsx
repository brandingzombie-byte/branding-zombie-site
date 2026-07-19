"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { SplineScene } from "@/components/ui/splite";
import ServicesBrutalistGrid from "@/components/services/ServicesBrutalistGrid";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Homepage-only services presentation: the same brutalist service tiles, but
 * re-laid on desktop as an 8-tile perimeter ring wrapped around an interactive
 * Spline zombie head in the dead center. The head tracks the cursor via the
 * scene's own built-in Look-At interaction (same technique as /tap — no
 * cursor JS on our side).
 *
 * - Desktop (lg+, fine pointer, motion OK): 3×3 ring + live 3D head.
 * - Everything else (phones, coarse pointer, prefers-reduced-motion): falls
 *   back to the shared <ServicesBrutalistGrid> — identical to before, and the
 *   heavy Spline runtime is never mounted (protects mobile Core Web Vitals).
 *
 * The /services index keeps using ServicesBrutalistGrid directly, so the two
 * presentations only diverge on the homepage.
 */

// Gerry's hosted head scene (distinct from /tap's Fteven).
const ZOMBIE_SCENE = "https://prod.spline.design/Xzj5F4R96SanHUsY/scene.splinecode";

// Where each of the 8 perimeter tiles sits in the 3×3 grid. Center (2/2) is the
// head. Row-major around the ring: top row L→R, mid sides, bottom row L→R.
const RING_POS: Array<{ col: number; row: number }> = [
  { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 3, row: 1 },
  { col: 1, row: 2 }, /*   HEAD (2/2)  */ { col: 3, row: 2 },
  { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 3, row: 3 },
];

export default function ServicesZombieHub({ services }: { services: Service[] }) {
  // Only mount the Spline head on a real desktop pointer with motion allowed.
  // Starts false so SSR + first paint + mobile never load the runtime.
  const [showHead, setShowHead] = useState(false);
  // Fades the "he follows" nudge once the visitor starts moving.
  const [touched, setTouched] = useState(false);
  // Flips once the Spline scene has finished loading (canvas exists in the DOM).
  const [ready, setReady] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowHead(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Make him follow the cursor across the WHOLE ring, not just the center.
  // Spline binds its Look-At-Mouse handler to the canvas element, so with
  // pointer-events:none (which keeps the surrounding tiles clickable) the canvas
  // never sees real pointer moves. We forward the global cursor to it with
  // synthetic pointermove events — dispatchEvent fires the listener regardless
  // of the CSS. rAF-coalesced so we emit at most one per frame.
  useEffect(() => {
    if (!showHead || !ready) return;
    const canvas = headRef.current?.querySelector("canvas");
    if (!canvas) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const flush = () => {
      frame = 0;
      // bubbles:false is critical — a bubbling event would propagate back up to
      // the window listener below and re-trigger this dispatch every frame
      // forever (CPU-pegging feedback loop). The canvas's own listener fires at
      // target phase regardless of bubbling, so tracking still works.
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: x,
          clientY: y,
          bubbles: false,
          pointerType: "mouse",
          isPrimary: true,
        }),
      );
    };
    const onMove = (e: PointerEvent) => {
      // Spline's raycaster reads pageX/pageY (document coords). A synthetic
      // event's pageX/pageY just mirror the clientX/clientY we pass — the
      // browser does NOT add the scroll offset — so we forward the real event's
      // PAGE coords as the synthetic client coords. Passing viewport coords
      // instead would be off by the full scroll distance (~thousands of px once
      // the section is scrolled into view), sending his gaze way off target.
      x = e.pageX;
      y = e.pageY;
      setTouched(true);
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [showHead, ready]);

  return (
    <>
      {/* ── Mobile / tablet / reduced-motion: unchanged brutalist grid ── */}
      <div className="lg:hidden">
        <ServicesBrutalistGrid services={services} />
      </div>

      {/* ── Desktop: perimeter ring around the live 3D head ── */}
      <div className="hidden lg:block">
        <div
          className="relative grid border-l-2 border-[var(--color-text-primary)]"
          style={{
            gridTemplateColumns: "1fr 1.12fr 1fr",
            gridTemplateRows:
              "minmax(13.5rem, 1fr) minmax(19rem, auto) minmax(13.5rem, 1fr)",
          }}
        >
          {/* The homepage feeds 8 curated services (ai-workflows excluded) —
              exactly the 8 perimeter cells. slice() guards the layout if that
              count ever changes; the mobile fallback above always shows all. */}
          {services.slice(0, RING_POS.length).map((s, i) => {
            const pos = RING_POS[i];
            return (
              <RingTile
                key={s.slug}
                service={s}
                num={String(i + 1).padStart(2, "0")}
                eyebrow={i === 0 ? "Most popular" : undefined}
                col={pos.col}
                row={pos.row}
              />
            );
          })}

          {/* ── Center stage — the head (or a static skull fallback) ── */}
          <div
            onPointerMove={() => setTouched(true)}
            className="relative overflow-hidden border-r-2 border-b-2 border-[var(--color-text-primary)] bg-[var(--color-grave)]"
            style={{ gridColumn: 2, gridRow: 2 }}
          >
            {/* LIVE indicator — mirrors the /tap 3D stage chrome */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-[var(--color-grave)]/70 px-3 py-1 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-toxic)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-toxic)]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-secondary)]">
                Live
              </span>
            </div>

            {showHead ? (
              // pointer-events-none: never blocks the surrounding tiles, and the
              // scene's Look-At reads the window cursor so he follows across the
              // whole ring — not just when hovering dead center.
              <div
                ref={headRef}
                className="pointer-events-none absolute inset-0"
                aria-hidden
              >
                <SplineScene
                  scene={ZOMBIE_SCENE}
                  className="h-full w-full"
                  onLoad={() => setReady(true)}
                />
              </div>
            ) : (
              // Static fallback: the real BZD skull (reduced-motion / pre-mount).
              <Image
                src="/assets/brand-icon-1024.png"
                alt=""
                aria-hidden
                fill
                sizes="360px"
                className="object-contain p-10 opacity-95"
              />
            )}

            {/* Follow nudge — fades once they start moving over him */}
            {showHead && (
              <div
                className={cn(
                  "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 transition-all duration-500",
                  touched ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
                )}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/80 px-4 py-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-text-primary)] backdrop-blur-sm">
                  Move around — he follows
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * A single perimeter service tile — the brutalist support-card look lifted from
 * ServicesBrutalistGrid, minus the per-cell border/zigzag logic (the ring
 * container owns the grid lines and cells are uniform height).
 */
function RingTile({
  service: s,
  num,
  eyebrow,
  col,
  row,
}: {
  service: Service;
  num: string;
  eyebrow?: string;
  col: number;
  row: number;
}) {
  return (
    <Link
      href={`/services/${s.slug}`}
      aria-label={s.name}
      className={cn(
        "group relative flex min-h-[13rem] flex-col justify-between overflow-hidden",
        "border-r-2 border-b-2 border-[var(--color-text-primary)] bg-[var(--color-surface-1)]",
        "p-7",
        "transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
        "hover:bg-[var(--color-neon)] active:scale-[0.997]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-text)] focus-visible:ring-offset-2",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
      )}
      style={{ gridColumn: col, gridRow: row }}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-2 select-none font-[family-name:var(--font-display)] leading-none text-text-primary opacity-[0.04] transition-opacity duration-[var(--duration-base)] group-hover:opacity-[0.09]"
        style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
      >
        {num}
      </span>

      {/* Icon — inverts to black on flood */}
      <Image
        src={s.iconSvg}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 opacity-80 transition-[filter,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:[filter:brightness(0)] group-hover:-translate-y-0.5"
      />

      {/* Content */}
      <div className="relative z-10 mt-6">
        {eyebrow && (
          <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-neon-text)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-text-primary)]">
            {eyebrow}
          </span>
        )}
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.05] tracking-tight text-text-primary",
            eyebrow && "mt-2",
          )}
        >
          {s.name}
        </h3>
        <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
          {s.homeCardDescription}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-hairline)] pt-3 transition-colors duration-[var(--duration-base)] group-hover:border-[var(--color-text-primary)]/30">
        <span className="tabular font-mono text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim transition-colors duration-[var(--duration-base)] group-hover:text-text-primary">
          {s.homeCardPrice}
        </span>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="text-text-dim transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:text-text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
