"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  CaretRight,
  Phone,
  HandTap,
  CursorClick,
  Sticker,
  Cube,
  Eye,
  ChartLineUp,
  WifiHigh,
  Storefront,
  Package,
  MagicWand,
  Coffee,
  MapPin,
  IdentificationBadge,
  Lightning,
  ChatCircle,
  PencilSimple,
  RocketLaunch,
} from "@/components/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import TapContactForm from "./TapContactForm";
import { cn } from "@/lib/utils";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// The zombie scene Gerry built in Spline — the whole reason this page exists.
const ZOMBIE_SCENE =
  "https://prod.spline.design/FeZ23KaBXyrb0jNC/scene.splinecode";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Shared reveal hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// ─── SECTION 1: INTERACTIVE HERO ────────────────────────────────────────────
function TapHero() {
  const [touched, setTouched] = useState(false);

  return (
    <Section
      theme="dark"
      pad="none"
      className="min-h-[100dvh] overflow-hidden"
    >
      {/* Animated stage light */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-1/4"
        fill="#BFFF00"
      />
      {/* Ambient drift behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
        style={{
          background:
            "radial-gradient(55% 50% at 70% 30%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 45% at 20% 75%, rgba(191,255,0,0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto grid min-h-[100dvh] w-full max-w-[1280px] grid-cols-1 items-center gap-y-4 px-6 pt-24 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:px-10 lg:pt-28">
        {/* ── Copy ── */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-toxic)]/40 bg-[var(--color-toxic)]/10 px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-toxic-text)]">
              <WifiHigh size={13} weight="bold" />
              NFC sticker · you actually tapped it
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.08] tracking-tight text-[var(--color-dark-text-primary)]"
          >
            Meet{" "}
            <span className="relative inline-block whitespace-nowrap">
              Fteven.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]"
          >
            That sticker pulled Fteven out of the ground — and now he won&apos;t
            take his eyes off you. Move your cursor or finger and he follows
            along. No app, no download. Just an undead little face with a
            staring problem.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="measure mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-dim)]"
          >
            This is the kind of thing we build for Cumming and Atlanta
            businesses that refuse to be forgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: EASE }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#build"
              role="button"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Build me one of these
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-dark-text-secondary)] hover:text-[var(--color-toxic-text)]"
            >
              How the trick works
              <CaretRight size={14} weight="bold" />
            </a>
          </motion.div>
        </div>

        {/* ── Interactive 3D stage ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="order-1 lg:order-2 lg:col-span-7"
        >
          <div
            onPointerMove={() => setTouched(true)}
            className="group relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:h-[60vh] lg:h-[72vh]"
          >
            {/* Corner brackets — techy frame */}
            <Corner className="left-3 top-3 border-l-2 border-t-2" />
            <Corner className="right-3 top-3 border-r-2 border-t-2" />
            <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
            <Corner className="bottom-3 right-3 border-b-2 border-r-2" />

            {/* LIVE indicator */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-[var(--color-grave)]/70 px-3 py-1 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-toxic)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-toxic)]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-secondary)]">
                Fteven · live
              </span>
            </div>

            {/* The scene */}
            <SplineScene scene={ZOMBIE_SCENE} className="h-full w-full" />

            {/* Follow hint — fades once they start moving */}
            <div
              className={cn(
                "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 transition-all duration-500",
                touched
                  ? "translate-y-3 opacity-0"
                  : "translate-y-0 opacity-100",
              )}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]/80 px-4 py-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-text-primary)] backdrop-blur-sm">
                <Eye size={15} weight="bold" className="text-[var(--color-toxic-text)]" />
                Move around — he follows
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20 h-6 w-6 rounded-[3px] border-[var(--color-toxic)]/60",
        className,
      )}
    />
  );
}

// ─── SECTION 2: WHAT JUST HAPPENED ──────────────────────────────────────────
function TapConcept() {
  const { ref, isInView } = useReveal();

  const steps = [
    {
      Icon: HandTap,
      label: "Tap",
      text: "A quarter-sized sticker. A chip hidden inside. Phone gets close, no app needed.",
    },
    {
      Icon: WifiHigh,
      label: "Land",
      text: "The tap opens a page like this one. Two seconds, zero friction, no scanning a tiny QR.",
    },
    {
      Icon: Cube,
      label: "Play",
      text: "They lock eyes with your 3D mascot, laugh, and remember exactly who put it there.",
    },
  ];

  return (
    <Section id="how" theme="dark" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
              The setup
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              A sticker on a counter. A zombie in your{" "}
              <span className="relative inline-block">
                phone.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)] lg:col-span-5 lg:self-end">
            We hide NFC stickers where curious people are stuck waiting — a
            coffee counter in Cumming, a table tent, the back of a business
            card, a cooler at the farmers market. They tap. They land. They
            play. You stick in their memory.
          </p>
        </div>

        {/* Tap → Land → Play */}
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-dark-border)] sm:grid-cols-3">
          {steps.map(({ Icon, label, text }, i) => (
            <li
              key={label}
              className="flex flex-col bg-[var(--color-grave)] p-7"
            >
              <div className="flex items-center gap-3">
                <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-none text-[var(--color-toxic-text)]">
                  0{i + 1}
                </span>
                <Icon size={22} weight="regular" className="text-[var(--color-cyan-text)]" />
                <h3 className="text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                  {label}
                </h3>
              </div>
              <p className="mt-4 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

// ─── SECTION 3: WHY IT HOOKS ────────────────────────────────────────────────
function TapWhy() {
  const { ref, isInView } = useReveal();

  const reasons = [
    {
      Icon: CursorClick,
      title: "Curiosity is a reflex",
      text: "A little glowing sticker that says “tap me” is almost impossible to walk past. People tap before they decide to. Every phone since 2014 reads NFC natively — no app, no excuse.",
    },
    {
      Icon: Eye,
      title: "They played with your brand",
      text: "A billboard gets a half-second glance. A 3D toy gets forty seconds of thumb time. One of those you forget by lunch. The other you tell a friend about.",
    },
    {
      Icon: ChartLineUp,
      title: "Every tap is data",
      text: "Each sticker is its own link. You see where it lives, when it gets tapped, and how many bit. Guerrilla marketing you can actually measure — not a prayer stapled to a pole.",
    },
  ];

  return (
    <Section theme="parchment" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
          Why it works
        </span>
        <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
          People don&apos;t remember ads. They remember{" "}
          <span className="relative inline-block">
            playing.
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
            />
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] md:grid-cols-3">
          {reasons.map(({ Icon, title, text }, i) => (
            <article
              key={title}
              className={cn(
                "flex min-h-[18rem] flex-col p-8 transition-colors hover:bg-[var(--color-mist)]",
                i % 2 === 0 ? "bg-[var(--color-cloud)]" : "bg-[var(--color-fog)]",
              )}
            >
              <Icon size={28} weight="regular" className="text-[var(--color-neon-text)]" />
              <h3 className="mt-6 text-[length:var(--text-h4)] font-semibold text-text-primary">
                {title}
              </h3>
              <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION 4: WHAT WE BUILD (bento offer) ─────────────────────────────────
function TapBuild() {
  const { ref, isInView } = useReveal();

  const builds = [
    {
      Icon: Cube,
      title: "Interactive 3D heroes",
      text: "A banner like the one up top, living on your homepage. It watches every visitor and is impossible to scroll past.",
    },
    {
      Icon: Sticker,
      title: "NFC sticker drops",
      text: "Designed, printed, and chip-programmed. Peel, stick, done. They point wherever you want.",
    },
    {
      Icon: MagicWand,
      title: "Custom Spline scenes",
      text: "Your product, your mascot, your storefront — modeled in 3D and made playable in a browser.",
    },
    {
      Icon: HandTap,
      title: "Tap-to-anything",
      text: "Menu, booking page, secret offer, a playlist, a video. Whatever the tap should do, it does.",
    },
    {
      Icon: Package,
      title: "Spin-before-you-buy",
      text: "Let people rotate your product in 3D right on the page. Fewer surprises, fewer returns.",
    },
    {
      Icon: RocketLaunch,
      title: "The whole campaign",
      text: "Concept to build to print to drop to dashboard. You hand us the idea, we hand you the taps.",
    },
  ];

  return (
    <Section id="build" theme="dark" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
              The menu
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              Interactive toys, wired to your{" "}
              <span className="relative inline-block">
                brand.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)] lg:col-span-5 lg:self-end">
            Pick one, or run the whole play. Everything below is built in-house
            in Cumming for brands across metro Atlanta — and it pairs with the{" "}
            <a
              href="/services"
              className="text-[var(--color-dark-text-primary)] underline decoration-[var(--color-toxic)]/40 underline-offset-4 transition-colors hover:decoration-[var(--color-toxic)]"
            >
              websites, branding and print
            </a>{" "}
            we already do.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-dark-border)] sm:grid-cols-2 lg:grid-cols-3">
          {builds.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="flex min-h-[15rem] flex-col bg-[var(--color-grave)] p-7 transition-colors hover:bg-[var(--color-surface)]"
            >
              <Icon size={26} weight="regular" className="text-[var(--color-toxic-text)]" />
              <h3 className="mt-5 text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                {title}
              </h3>
              <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION 5: WHERE THEY GO (drop zones) ──────────────────────────────────
function TapDropZones() {
  const { ref, isInView } = useReveal();

  const zones = [
    { Icon: Coffee, label: "Coffee counters" },
    { Icon: Storefront, label: "Table tents" },
    { Icon: IdentificationBadge, label: "Business cards" },
    { Icon: Package, label: "Product packaging" },
    { Icon: Sticker, label: "Event swag" },
    { Icon: MapPin, label: "Window decals" },
    { Icon: Cube, label: "Trade-show booths" },
    { Icon: Lightning, label: "Festival coolers" },
  ];

  return (
    <Section theme="light" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12",
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Drop zones
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            Anywhere a thumb gets{" "}
            <span className="relative inline-block">
              bored.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
          </h2>
          <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            We&apos;re in Cumming. We know which Forsyth County counters get
            tapped and which lampposts just get rained on. The sticker only
            works where the curious already stand.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-4 lg:col-span-8">
          {zones.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 bg-[var(--color-cloud)] px-4 py-8 text-center transition-colors hover:bg-[var(--color-fog)]"
            >
              <Icon size={26} weight="regular" className="text-[var(--color-neon-text)]" />
              <span className="text-[length:var(--text-secondary)] font-medium text-text-primary">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ─── SECTION 6: PROCESS ─────────────────────────────────────────────────────
function TapProcess() {
  const { ref, isInView } = useReveal();

  const steps = [
    {
      Icon: ChatCircle,
      step: "01",
      title: "Concept",
      description:
        "We pick the toy and the hook. What wakes up, where the sticker lives, what the tap should do.",
    },
    {
      Icon: PencilSimple,
      step: "02",
      title: "Build",
      description:
        "We model and animate the 3D, wire up the interaction, and tune it so it feels good in a thumb.",
    },
    {
      Icon: Sticker,
      step: "03",
      title: "Print + program",
      description:
        "Stickers designed and printed, NFC chips encoded to your link. Delivered ready to peel.",
    },
    {
      Icon: RocketLaunch,
      step: "04",
      title: "Drop + track",
      description:
        "You stick them in the wild. Taps roll in. We watch the dashboard and tell you what's working.",
    },
  ];

  return (
    <Section theme="dark" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12",
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            How we pull it off
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            Four steps,{" "}
            <span className="relative inline-block">
              no séance.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
          </h2>
        </div>

        <ol className="lg:col-span-8">
          {steps.map(({ Icon, step, title, description }, i) => (
            <li
              key={step}
              className={cn(
                "grid grid-cols-[auto_auto_1fr] items-start gap-x-6 gap-y-2 py-6",
                i > 0 && "border-t border-[var(--color-dark-border)]",
              )}
            >
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic-text)]">
                {step}
              </span>
              <Icon size={26} weight="regular" className="mt-1 text-[var(--color-dark-text-primary)]" />
              <div className="flex min-w-0 flex-col">
                <h3 className="text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                  {title}
                </h3>
                <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

// ─── SECTION 7: FINAL CTA ───────────────────────────────────────────────────
function TapFinalCTA() {
  const { ref, isInView } = useReveal();

  return (
    <Section id="contact" theme="dark" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12",
          "transition-all duration-700",
          isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        {/* Copy + talk-to-a-human options */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              Your turn
            </span>
          </div>

          <h2 className="mt-6 max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            Want a zombie of your{" "}
            <span className="relative inline-block">
              own?
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
              />
            </span>
          </h2>

          <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            Drop us a line right here — no call, no app, no waiting. Tell us
            about your business and we&apos;ll tell you what to build and where
            to stick it.
          </p>

          {/* Rather talk? */}
          <div className="mt-9 border-t border-[var(--color-dark-border)] pt-7">
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
              Rather talk it out?
            </p>
            <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-toxic-text)] hover:underline"
              >
                Book a free 15-min call
                <ArrowUpRight size={16} weight="bold" />
              </a>
              <a
                href={PHONE_HREF}
                className="tabular inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-dark-text-primary)] hover:text-[var(--color-toxic-text)]"
              >
                <Phone size={16} weight="bold" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <p className="mt-9 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
            Built in days · in-house in Cumming, GA 🧟
          </p>
        </div>

        {/* Inline form */}
        <div className="lg:col-span-7">
          <TapContactForm />
        </div>
      </div>
    </Section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function TapPage() {
  return (
    <>
      <Navbar />
      <main>
        <TapHero />
        <TapConcept />
        <SectionSeparator id={8} />
        <TapWhy />
        <SectionSeparator id={7} />
        <TapBuild />
        <SectionSeparator id={3} />
        <TapDropZones />
        <SectionSeparator id={6} />
        <TapProcess />
        <TapFinalCTA />
      </main>
      <Footer />
    </>
  );
}

// Reserve icons earmarked for future variants of this page.
void ArrowRight;
