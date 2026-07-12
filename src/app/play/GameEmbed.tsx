"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Full-width embed for the self-contained game at /game/index.html. The game
// letterboxes itself inside whatever viewport it gets, so the iframe just
// holds the 1280:540 stage. "Full screen" tries the native Fullscreen API
// (wrapper element, so our close button stays reachable) and falls back to a
// fixed-position "theater" overlay on browsers that refuse it (iPhone Safari).
//
// The game posts {source:"bzr", event:"game_start"|"game_over", ...} to the
// parent — we forward those to GA4 and use the first game_over to reveal a
// conversion nudge under the stage.

type GameMessage = {
  source?: string;
  event?: string;
  score?: number;
  dist?: number;
  flyers?: number;
};

export default function GameEmbed() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false); // any big-screen mode
  const [theater, setTheater] = useState(false); // CSS fallback mode only
  const [lastScore, setLastScore] = useState<number | null>(null);

  const closeBigScreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    setTheater(false);
    setExpanded(false);
  }, []);

  // Forward game telemetry to GA4. The game iframe is same-origin — reject
  // messages from anywhere else so a hostile opener can't spoof scores.
  useEffect(() => {
    const onMessage = (e: MessageEvent<GameMessage>) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.source !== "bzr" || typeof data.event !== "string") return;
      if (data.event === "esc") {
        closeBigScreen();
      } else if (data.event === "game_start") {
        trackEvent("game_start", { game: "branding-zombie-runner" });
      } else if (data.event === "game_over") {
        trackEvent("game_over", {
          game: "branding-zombie-runner",
          score: data.score,
          distance_m: data.dist,
          flyers_eaten: data.flyers,
        });
        if (typeof data.score === "number") setLastScore(data.score);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [closeBigScreen]);

  // Keep `expanded` truthful when the user exits native fullscreen via Esc.
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setExpanded((cur) => (theater ? cur : false));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [theater]);

  // Theater mode: lock page scroll and allow Esc to close.
  useEffect(() => {
    if (!theater) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBigScreen();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [theater, closeBigScreen]);

  const openBigScreen = useCallback(async () => {
    trackEvent("game_fullscreen", { game: "branding-zombie-runner" });
    const el = wrapRef.current;
    if (el?.requestFullscreen) {
      try {
        await el.requestFullscreen();
        setExpanded(true);
        // Best effort on phones — most desktop browsers reject the lock.
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (screen.orientation as any)?.lock?.("landscape");
        } catch {
          /* not supported — fine */
        }
        return;
      } catch {
        /* fall through to theater mode */
      }
    }
    setTheater(true);
    setExpanded(true);
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className={cn(
          "relative w-full bg-[#161b28]",
          theater
            ? "fixed inset-0 z-[100] flex items-center justify-center"
            : "aspect-[1280/540] overflow-hidden rounded-lg ring-1 ring-[var(--color-dark-border-strong)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]",
        )}
      >
        <iframe
          src="/game/index.html"
          title="The Branding Zombie vs The Marketing Menace — playable game"
          className="h-full w-full border-0"
          allow="fullscreen"
        />
        {expanded && (
          <button
            type="button"
            onClick={closeBigScreen}
            className="absolute left-3 top-3 z-10 min-h-11 rounded-md border border-[var(--color-dark-border-strong)] bg-black/70 px-4 py-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-primary)] backdrop-blur transition-transform duration-150 ease-out hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)] active:scale-[0.97]"
          >
            ✕ Exit
          </button>
        )}
      </div>

      {/* Controls + fullscreen row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[length:var(--text-caption)] text-[var(--color-dark-text-secondary)]">
          <li className="flex items-center gap-2">
            <Kbd>SPACE</Kbd>
            <span aria-hidden>/</span>
            <Kbd>↑</Kbd>
            <span>hold to jump higher</span>
          </li>
          <li className="flex items-center gap-2">
            <Kbd>↓</Kbd>
            <span>duck</span>
          </li>
          <li className="hidden items-center gap-2 max-lg:flex">
            <Kbd>TAP</Kbd>
            <span>right side jumps · hold left side ducks</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={openBigScreen}
          className="min-h-11 cursor-pointer rounded-md border border-[var(--color-toxic)]/50 bg-transparent px-5 py-2.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)] transition-[transform,border-color,background-color] duration-150 ease-out hover:border-[var(--color-toxic)] hover:bg-[var(--color-toxic)]/10 active:scale-[0.97]"
        >
          ⛶ Full screen
        </button>
      </div>
      <p className="mt-2 text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)] lg:hidden">
        On a phone? Rotate to landscape or hit full screen for a bigger arena.
      </p>

      {/* Post-run conversion nudge — appears after the first death. */}
      <div aria-live="polite">
        {lastScore !== null && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] px-5 py-4">
            <p className="text-[length:var(--text-secondary)] text-[var(--color-dark-text-primary)]">
              <span className="font-semibold text-[var(--color-toxic-text)]">
                {lastScore.toLocaleString()} points.
              </span>{" "}
              Your run ended — your brand doesn&apos;t have to. That&apos;s literally what we do.
            </p>
            <a
              href="/#services"
              className="min-h-11 shrink-0 rounded-md bg-[var(--color-toxic)] px-5 py-2.5 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.2em] text-black transition-transform duration-150 ease-out hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]"
            >
              Revive a real brand →
            </a>
          </div>
        )}
      </div>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] px-2 py-1 font-mono text-[11px] font-semibold text-[var(--color-dark-text-primary)]">
      {children}
    </kbd>
  );
}
