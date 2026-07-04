"use client";

/**
 * ZombieHand — motion engine for decorative "disembodied zombie hand" images
 * that emerge from section edges on the homepage.
 *
 * Hard guarantees (see AGENTS.md build brief):
 *  - Zero CLS: the hand is absolutely positioned, aria-hidden, pointer-events:none,
 *    lazy/async decoded, and carries explicit width/height. It never reserves a
 *    shifting box in normal flow.
 *  - Only transform + opacity are ever animated. left/right/top/bottom are set ONCE
 *    (static) and never touched by the animation loop.
 *  - No heavy libraries: vanilla requestAnimationFrame + CSS keyframes + IntersectionObserver.
 *  - Respects prefers-reduced-motion: renders the resting/visible state statically with
 *    ZERO rAF / IO-motion / listeners.
 *  - A single module-level controller owns exactly ONE scroll listener and ONE
 *    pointermove listener page-wide, plus ONE shared rAF loop, regardless of how many
 *    hands are mounted.
 *
 * Element layering (never fight CSS transforms with JS transforms on one element):
 *   <div .zh-root>   position + base rotate/scale + peek offset + opacity  (CSS transition)
 *     <div .zh-dyn>  JS-written parallax + follow transform                 (no transition)
 *       <img>        idle CSS-keyframe sway only
 */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type HandBehavior = "peek" | "parallax" | "follow" | "idle";

export interface ZombieHandProps {
  /** 1x path, e.g. "/hands/zh09-thumbsdown-l.webp". @2x is derived automatically. */
  src: string;
  /** Intrinsic pixel width of the 1x asset (for zero-CLS box reservation). */
  width: number;
  /** Intrinsic pixel height of the 1x asset (for zero-CLS box reservation). */
  height: number;
  /** Which edge of the parent section the hand emerges from. */
  edge: "left" | "right" | "bottom" | "top";
  /** Stackable behaviours, e.g. ["peek","idle"]. */
  behaviors: HandBehavior[];
  /** CSS position ALONG the edge, e.g. "18%" (top for left/right, left for top/bottom). */
  offset?: string;
  /** How far the wrist hangs OFF the edge, e.g. "-12%" (the perpendicular inset). */
  bleed?: string;
  /** Rendered CSS width in px on desktop (the intrinsic 720px assets are far
   *  too large to render 1:1). Height derives from the intrinsic aspect ratio. */
  displayWidth?: number;
  /** Desktop scale multiplier. Default 1. */
  scale?: number;
  /** Base rotation in degrees. Default 0. */
  rotate?: number;
  /** Mirror the hand horizontally (for assets whose arm points the wrong way
   *  for the edge they're placed on). Applied on the root so it never fights
   *  the idle keyframe transform on the <img>. */
  flip?: boolean;
  /** Max cursor drift in px for `follow`. Default 22. */
  followStrength?: number;
  /** Parallax factor, -0.5..0.5. Default 0.12. */
  parallaxSpeed?: number;
  /** Stacking order. */
  zIndex?: number;
  /** Extra classes on the root wrapper. */
  className?: string;
  /** Render on mobile (<768px)? Default false. When true, scale ×0.55 and no follow/parallax. */
  mobile?: boolean;
}

/* ------------------------------------------------------------------ *
 * Shared module-level motion controller.
 * Owns exactly ONE scroll listener, ONE pointermove listener, a Set of
 * subscribers, and ONE rAF loop that runs only while subscribers exist.
 * ------------------------------------------------------------------ */

const controller = (() => {
  let scrollY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;

  const subs = new Set<() => void>();
  let raf = 0;
  let attached = false;

  const onScroll = () => {
    scrollY = window.scrollY;
  };
  const onPointer = (e: PointerEvent) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
    hasPointer = true;
  };
  const loop = () => {
    // Snapshot to a local array is unnecessary — subscribers only read shared
    // state and write to their own element; no mutation of `subs` during tick.
    subs.forEach((fn) => fn());
    raf = requestAnimationFrame(loop);
  };

  return {
    get scrollY() {
      return scrollY;
    },
    get pointerX() {
      return pointerX;
    },
    get pointerY() {
      return pointerY;
    },
    get hasPointer() {
      return hasPointer;
    },
    /** Subscribe a per-frame tick. Returns an unsubscribe fn. */
    subscribe(fn: () => void): () => void {
      subs.add(fn);
      if (!attached) {
        scrollY = window.scrollY;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pointermove", onPointer, { passive: true });
        attached = true;
      }
      if (!raf) raf = requestAnimationFrame(loop);

      return () => {
        subs.delete(fn);
        if (subs.size === 0) {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("pointermove", onPointer);
          attached = false;
        }
      };
    },
  };
})();

/* ------------------------------------------------------------------ *
 * Idle keyframes — injected once, module-level.
 * ------------------------------------------------------------------ */

let keyframesInjected = false;
function injectIdleKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const el = document.createElement("style");
  el.setAttribute("data-zombie-hand", "");
  el.textContent =
    "@keyframes zh-idle{from{transform:translateY(0) rotate(0deg)}" +
    "to{transform:translateY(-5px) rotate(1.5deg)}}";
  document.head.appendChild(el);
}

/* ------------------------------------------------------------------ */

const PEEK_TRANSITION =
  "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
  "opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1)";

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export default function ZombieHand({
  src,
  width,
  height,
  edge,
  behaviors,
  offset = "50%",
  bleed = "0%",
  displayWidth,
  scale = 1,
  rotate = 0,
  flip = false,
  followStrength = 22,
  parallaxSpeed = 0.12,
  zIndex,
  className,
  mobile = false,
}: ZombieHandProps) {
  const hasPeek = behaviors.includes("peek");
  const hasIdle = behaviors.includes("idle");
  const hasParallax = behaviors.includes("parallax");
  const hasFollow = behaviors.includes("follow");

  // Client-only environment state (SSR-safe: both server and first client render
  // return null while `mounted` is false → no hydration mismatch, and because the
  // hand is absolutely positioned + decorative, rendering it late causes ZERO CLS).
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pointerFine, setPointerFine] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [revealed, setRevealed] = useState(!hasPeek);

  const rootRef = useRef<HTMLDivElement>(null);
  const dynRef = useRef<HTMLDivElement>(null);

  // Stable per-instance idle duration so hands don't sway in sync.
  const idleDur = useRef(4 + Math.random() * 2);

  // Derived motion gating.
  const idleActive = hasIdle && !reduced; // idle allowed on mobile
  const parallaxActive = hasParallax && !reduced && !isMobile;
  const followActive =
    hasFollow && !reduced && !isMobile && pointerFine;

  // Live config for the (stable) tick closure.
  const cfg = useRef({
    parallaxActive,
    followActive,
    followStrength,
    parallaxSpeed,
  });
  useEffect(() => {
    cfg.current = {
      parallaxActive,
      followActive,
      followStrength,
      parallaxSpeed,
    };
  }, [parallaxActive, followActive, followStrength, parallaxSpeed]);

  // Per-instance dynamic state (mutated in the rAF tick, never triggers renders).
  const dynState = useRef<{
    fx: number;
    fy: number;
    rot: number;
    baseScroll: number | null;
  }>({ fx: 0, fy: 0, rot: 0, baseScroll: null });

  // Stable tick (created once). Reads live controller + cfg refs, writes ONLY
  // transform on the inner .zh-dyn element.
  const tick = useRef(() => {
    const el = dynRef.current;
    if (!el) return;
    const c = cfg.current;
    const st = dynState.current;

    // Parallax: translateY from scroll delta, clamped ±60px.
    let ty = 0;
    if (c.parallaxActive) {
      if (st.baseScroll === null) st.baseScroll = controller.scrollY;
      ty = clamp((controller.scrollY - st.baseScroll) * c.parallaxSpeed, -60, 60);
    }

    // Follow: lerp toward cursor direction, capped at followStrength px, ±4° rot.
    if (c.followActive && controller.hasPointer) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = controller.pointerX - cx;
      const dy = controller.pointerY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const mag = Math.min(c.followStrength, dist * 0.2);
      const tx = (dx / dist) * mag;
      const tyf = (dy / dist) * mag;
      st.fx += (tx - st.fx) * 0.06;
      st.fy += (tyf - st.fy) * 0.06;
      const targetRot = clamp((st.fx / c.followStrength) * 4, -4, 4);
      st.rot += (targetRot - st.rot) * 0.06;
    } else {
      // Ease drift back toward rest when follow is inactive.
      st.fx += (0 - st.fx) * 0.06;
      st.fy += (0 - st.fy) * 0.06;
      st.rot += (0 - st.rot) * 0.06;
    }

    const totalY = ty + st.fy;
    el.style.transform =
      `translate3d(${st.fx.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) ` +
      `rotate(${st.rot.toFixed(2)}deg)`;
  });

  // Stable wrapper so unsubscribe identity is preserved across re-renders.
  const tickWrapper = useRef(() => {
    tick.current();
  });

  /* Mount + media-query listeners. */
  useEffect(() => {
    setMounted(true);
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsMobile(mqMobile.matches);
      setPointerFine(mqFine.matches);
      setReduced(mqReduced.matches);
    };
    sync();
    mqMobile.addEventListener("change", sync);
    mqFine.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);
    return () => {
      mqMobile.removeEventListener("change", sync);
      mqFine.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  /* Idle keyframes injection. */
  useEffect(() => {
    if (idleActive) injectIdleKeyframes();
  }, [idleActive]);

  /* Peek reveal — one-shot IntersectionObserver at threshold 0.35. */
  useEffect(() => {
    if (!mounted) return;
    if (!hasPeek || reduced) {
      setRevealed(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    setRevealed(false);
    // CRITICAL: observe the PARENT layer, not the hand itself. The hidden hand
    // is translated 120% off-edge inside an overflow-clipped layer, so its own
    // clipped intersection with the viewport is permanently zero and a
    // self-observer would never fire. The parent layer spans the section and
    // always intersects. threshold 0 + negative rootMargin ≈ "fires once the
    // layer crosses into the middle band of the viewport", and threshold 0
    // also works for zero/near-zero-height seam wrappers where ratio-based
    // thresholds can never be met.
    const target = el.parentElement ?? el;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [mounted, hasPeek, reduced]);

  /* Motion subscription — subscribe to the shared rAF loop only while the hand
     is on-screen (drive on/off with an IntersectionObserver). */
  useEffect(() => {
    if (!mounted || reduced) return;
    if (!parallaxActive && !followActive) return;
    const el = dynRef.current;
    if (!el) return;

    let unsub: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!unsub) unsub = controller.subscribe(tickWrapper.current);
        } else if (unsub) {
          unsub();
          unsub = null;
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (unsub) unsub();
    };
  }, [mounted, reduced, parallaxActive, followActive]);

  // Gate rendering: nothing before mount; nothing on mobile unless opted in.
  if (!mounted) return null;
  if (isMobile && !mobile) return null;

  const effectiveScale = isMobile ? scale * 0.55 : scale;
  const src2x = src.replace(/\.webp$/i, "@2x.webp");

  // Rendered size: displayWidth (px, desktop) is the design-time size knob;
  // intrinsic width is only a fallback. Scale folds into the CSS width so the
  // layout box, edge insets, and clipping all agree with what's painted
  // (transform:scale() would keep a 720px layout box and break the wrist-clip).
  const cssWidth = Math.round((displayWidth ?? width) * effectiveScale);

  const restTransform = `rotate(${rotate}deg)${flip ? " scaleX(-1)" : ""}`;
  const peekOffset =
    edge === "left"
      ? "translateX(-120%) "
      : edge === "right"
        ? "translateX(120%) "
        : edge === "top"
          ? "translateY(-120%) "
          : "translateY(120%) ";
  const hiddenTransform = `${peekOffset}${restTransform}`;

  // Static edge insets (set ONCE — never animated).
  const insets: CSSProperties = {};
  if (edge === "left") {
    insets.left = bleed;
    insets.top = offset;
  } else if (edge === "right") {
    insets.right = bleed;
    insets.top = offset;
  } else if (edge === "top") {
    insets.top = bleed;
    insets.left = offset;
  } else {
    insets.bottom = bleed;
    insets.left = offset;
  }

  const usePeekTransition = hasPeek && !reduced;

  const rootStyle: CSSProperties = {
    position: "absolute",
    zIndex,
    pointerEvents: "none",
    opacity: revealed ? 1 : 0,
    transform: revealed ? restTransform : hiddenTransform,
    transition: usePeekTransition ? PEEK_TRANSITION : undefined,
    willChange: "transform, opacity",
    ...insets,
  };

  const dynStyle: CSSProperties = {
    willChange: parallaxActive || followActive ? "transform" : undefined,
  };

  const imgStyle: CSSProperties = {
    display: "block",
    pointerEvents: "none",
    width: `${cssWidth}px`,
    height: "auto",
    animation: idleActive
      ? `zh-idle ${idleDur.current.toFixed(2)}s ease-in-out infinite alternate`
      : undefined,
    willChange: idleActive ? "transform" : undefined,
  };

  return (
    <div
      ref={rootRef}
      className={className}
      style={rootStyle}
      aria-hidden="true"
    >
      <div ref={dynRef} style={dynStyle}>
        {/* Plain <img>, NOT next/image: next/image fights absolute positioning +
            transforms here. Explicit width/height + srcSet keep it zero-CLS. */}
        <img
          src={src}
          srcSet={`${src} 1x, ${src2x} 2x`}
          width={width}
          height={height}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
          draggable={false}
          style={imgStyle}
        />
      </div>
    </div>
  );
}
