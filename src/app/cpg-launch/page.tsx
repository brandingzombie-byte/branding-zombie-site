"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  X,
  ArrowUpRight,
  Check,
  Phone,
  Lightning,
  PencilSimple,
  Wrench,
  RocketLaunch,
  ChatCircle,
} from "@/components/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Gallery4 } from "@/components/ui/gallery4";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// ─── Shared reveal hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// ─── SECTION 1: HERO ────────────────────────────────────────────────────────
function CPGHero() {
  return (
    <Section
      theme="dark"
      pad="spacious"
      pattern="asymmetric"
      className="min-h-[100dvh] overflow-hidden"
    >
      {/* Ambient drift */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 30%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 items-center gap-x-10 gap-y-12 pt-20 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
            <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
              CPG Launch Package · Shelf-ready in 30 days
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)]"
          >
            Your product deserves to look like it{" "}
            <span className="relative inline-block">
              belongs on the shelf
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]"
          >
            I help CPG and supplement founders go from concept to shelf-ready
            packaging in 30 days — so you can launch on time, pass compliance,
            and never argue with a print vendor again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Book a free packaging review
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
              No pitch · No pressure · Just a straight answer
            </p>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
            <Image
              src="/assets/product-design/product%20design_%2028.png"
              alt="Betancourt Nutrition full product line — supplement brand family designed for retail shelf"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-grave)]/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── SECTION 2: PROBLEM ─────────────────────────────────────────────────────
function CPGProblem() {
  const { ref, isInView } = useReveal();

  const painPoints = [
    "You've got a great formula but your packaging looks like every other brand on Amazon.",
    "You're Googling \u201CFDA supplement label requirements\u201D at 2am and still not sure you're compliant.",
    "Your designer delivered files and your printer said they're unusable.",
    "You're weeks from launch and still don't have print-ready artwork.",
    "You've already burned money on a freelancer who didn't understand regulated packaging.",
  ];

  return (
    <Section theme="dark" pad="standard" topRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="lg:col-span-5">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            The problem
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
            Sound{" "}
            <span className="relative inline-block">
              familiar
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            ?
          </h2>
          <p className="measure mt-6 border-l-2 border-[var(--color-toxic)] pl-5 text-[length:var(--text-body)] italic leading-relaxed text-[var(--color-dark-text-secondary)]">
            You don&apos;t need another designer. You need someone who&apos;s
            taken products from napkin sketch to retail shelf — and knows what
            happens at every step in between.
          </p>
        </div>

        {/* Pain rows */}
        <ul className="lg:col-span-7">
          {painPoints.map((point, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-4 py-5",
                i > 0 && "border-t border-[var(--color-dark-border)]",
              )}
            >
              <X
                size={20}
                weight="bold"
                className="mt-0.5 shrink-0 text-[var(--color-toxic-text)]"
              />
              <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ─── SECTION 3: WHAT YOU GET (parchment bridge — light island in dark flow) ──
function CPGOffer() {
  const { ref, isInView } = useReveal();

  const features = [
    {
      title: "Brand Discovery Session",
      description:
        "We align on your positioning, audience, and competitive landscape before a single pixel is placed.",
    },
    {
      title: "Label & Packaging Design",
      description:
        "High-fidelity designs built to your product specs, not generic templates. Supplements, food, beverage, wellness — all covered.",
    },
    {
      title: "Compliance & Claims Review",
      description:
        "Structure/function claims, FDA supplement facts panel formatting, required disclaimers. Reviewed before it becomes a problem.",
    },
    {
      title: "Print-Ready Production Files",
      description:
        "Die-line matched, color-profiled, bleed-set files your printer will actually accept. No back-and-forth.",
    },
    {
      title: "Vendor Coordination",
      description:
        "I speak directly with your print vendor or co-packer so nothing gets lost in translation between design and production.",
    },
    {
      title: "3D Product Renders",
      description:
        "Photorealistic mockups for your Amazon listing, pitch deck, and social content — before you've printed a single unit.",
    },
  ];

  return (
    <Section theme="parchment" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              One engagement · Everything you need
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
              The{" "}
              <span className="relative inline-block">
                shelf-ready package
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
          </div>
          <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
            Six deliverables, one fixed scope. Built for founders who need to
            launch on time without the back-and-forth.
          </p>
        </div>

        {/* Bento grid — feature card spans 2 cols + 5 supporting */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const tint =
              i % 2 === 0 ? "bg-[var(--color-cloud)]" : "bg-[var(--color-fog)]";
            return (
              <article
                key={f.title}
                className={cn(
                  "flex min-h-[16rem] flex-col p-7 transition-colors hover:bg-[var(--color-mist)]",
                  tint,
                )}
              >
                <span className="tabular text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-[length:var(--text-h4)] font-semibold text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {f.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Pricing callout */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[var(--color-hairline-strong)] pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              Engagement starts at
            </p>
            <p className="mt-2 tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-tight text-text-primary">
              $5,000{" "}
              <span className="text-[length:var(--text-h4)] font-normal text-text-dim">
                / product line
              </span>
            </p>
            <p className="mt-3 text-[length:var(--text-body)] text-text-secondary">
              Scope and timeline confirmed on your discovery call.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]"
          >
            Talk about your launch
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION 4: CASE STUDIES ─────────────────────────────────────────────────
function CPGCaseStudies() {
  return <Gallery4 theme="dark" />;
}

// ─── SECTION 5: AUTHORITY ───────────────────────────────────────────────────
function CPGAuthority() {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="dark" pad="spacious">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Headshot */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
            <Image
              src="/assets/gerry-headshot.png"
              alt="Gerry Betancourt — CPG packaging designer with 15+ years in the supplement industry"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-grave)]/60 to-transparent"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            Why me
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
            15 years inside the industry you&apos;re trying to{" "}
            <span className="relative inline-block">
              break into
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </h2>
          <div className="measure mt-6 space-y-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            <p>
              I&apos;m Gerry Betancourt. I&apos;ve spent 15+ years in CPG —
              not as an outside agency, but inside the building. I&apos;ve
              worked in-house at supplement brands, managed full product
              launches from formulation to shelf, run production logistics
              between brands and trade printers, and built packaging systems
              for 30+ companies through Ink Spatter Studio.
            </p>
            <p>
              I don&apos;t just make things look good. I make sure your files
              don&apos;t get rejected at the printer. I make sure your label
              claims don&apos;t get flagged. I make sure your product looks
              like a national brand — even if you&apos;re launching from your
              garage.
            </p>
          </div>

          {/* Stats — hairline strip, no card chrome */}
          <ul className="mt-10 grid grid-cols-3 divide-x divide-[var(--color-dark-border-strong)] border-y border-[var(--color-dark-border-strong)]">
            {[
              { stat: "15+", label: "Years in CPG" },
              { stat: "30+", label: "Brands launched" },
              { stat: "30 days", label: "Average delivery" },
            ].map(({ stat, label }) => (
              <li key={label} className="px-4 py-5">
                <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-cyan-text)]">
                  {stat}
                </div>
                <div className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  {label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION 6: PROCESS (light) ──────────────────────────────────────────────
function CPGProcess() {
  const { ref, isInView } = useReveal();

  const steps = [
    {
      Icon: ChatCircle,
      step: "01",
      title: "Discovery Call",
      subtitle: "Free",
      description:
        "We talk about your product, your timeline, and your goals. I'll tell you exactly what you need.",
    },
    {
      Icon: Lightning,
      step: "02",
      title: "Strategy & Concept",
      description:
        "I research your competitive shelf, map your positioning, and deliver 2–3 initial design concepts.",
    },
    {
      Icon: PencilSimple,
      step: "03",
      title: "Design & Compliance",
      description:
        "We refine the chosen direction. Every panel is reviewed for FDA/FTC compliance before it moves forward.",
    },
    {
      Icon: Wrench,
      step: "04",
      title: "Production & Handoff",
      description:
        "Print-ready files matched to vendor specs. Direct coordination with your printer or co-packer.",
    },
    {
      Icon: RocketLaunch,
      step: "05",
      title: "You Launch",
      description:
        "Your product hits the shelf — on time, compliant, and looking like it belongs next to brands 10× your size.",
    },
  ];

  return (
    <Section theme="light" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="lg:col-span-4">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            How it works
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
            No mystery,{" "}
            <span className="relative inline-block">
              no surprises
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h2>
        </div>

        <ol className="lg:col-span-8">
          {steps.map(({ Icon, step, title, subtitle, description }, i) => (
            <li
              key={step}
              className={cn(
                "grid grid-cols-[auto_auto_1fr] items-start gap-x-6 gap-y-2 py-6",
                i > 0 && "border-t border-[var(--color-hairline-strong)]",
              )}
            >
              <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
                {step}
              </span>
              <Icon
                size={26}
                weight="regular"
                className="mt-1 text-text-primary"
              />
              <div className="flex min-w-0 flex-col">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-[length:var(--text-h4)] font-semibold text-text-primary">
                    {title}
                  </h3>
                  {subtitle && (
                    <span className="rounded-full bg-[var(--color-neon)]/15 px-3 py-0.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
                      {subtitle}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
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

// ─── SECTION 7: FAQ (light, matches main page pattern) ──────────────────────
function CPGFAQ() {
  const { ref, isInView } = useReveal();

  const faqs = [
    {
      q: "How much does this cost?",
      a: "Engagements start at $5,000 per product line. Final pricing depends on the number of SKUs, packaging complexity, and whether you need vendor coordination and 3D renders. We'll confirm scope and investment on your discovery call.",
    },
    {
      q: "How long does this take?",
      a: "Most projects are delivered in 3–5 weeks from kickoff. If you're on a tight launch timeline, I can accommodate expedited schedules — we'll discuss that upfront.",
    },
    {
      q: "I already have a designer — can you just handle the production files?",
      a: "Yes. If your creative is locked but your files aren't print-ready or compliant, I offer a standalone production-prep service. Let's talk about what you've got.",
    },
    {
      q: "Do you work with brands outside of supplements?",
      a: "Absolutely. I've worked across supplements, functional food, beverage, wellness, and beauty. If it goes on a shelf or an Amazon listing, I can help.",
    },
    {
      q: "What if I'm not sure what I need yet?",
      a: "That's exactly what the discovery call is for. I'll assess where you are, what's missing, and give you an honest recommendation — even if the answer is \u201Cyou're not ready for this yet.\u201D",
    },
  ];

  return (
    <Section theme="light" pad="standard" className="bg-[var(--color-fog)]">
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              FAQ
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[0.95] tracking-tight text-text-primary">
              Questions founders{" "}
              <span className="relative inline-block">
                usually ask
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-neon-text)] hover:underline"
            >
              <Phone size={18} weight="regular" />
              <span className="tabular">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <Accordion className="border-t border-[var(--color-hairline-strong)]">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[var(--color-hairline-strong)] data-open:bg-[var(--color-cloud)]/40"
              >
                <AccordionTrigger className="!flex !items-center !justify-between gap-6 !py-6 !text-[length:var(--text-h4)] !font-semibold !text-text-primary aria-expanded:!text-[var(--color-neon-text)] hover:!no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-text-secondary">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION 8: FINAL CTA ───────────────────────────────────────────────────
function CPGFinalCTA() {
  const { ref, isInView } = useReveal();

  return (
    <Section theme="dark" pad="spacious" topRule>
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
            Ready when you are
          </span>
        </div>

        <h2 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-tight text-[var(--color-dark-text-primary)] lg:max-w-[16ch]">
          Your launch date isn&apos;t waiting for you to figure out{" "}
          <span className="relative inline-block">
            packaging
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
            />
          </span>
          .
        </h2>

        <p className="measure mt-8 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Book a free 20-minute packaging review. I&apos;ll look at what
          you&apos;ve got, tell you what&apos;s missing, and give you a clear
          path to shelf-ready — whether we work together or not.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-9 py-4 text-[length:var(--text-body)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book your free packaging review
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
            No pitch · No pressure · Just a straight answer
          </p>
        </div>
      </div>
    </Section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function CPGLaunchPage() {
  return (
    <>
      <Navbar />
      <main>
        <CPGHero />
        <CPGProblem />
        <CPGOffer />
        <CPGCaseStudies />
        <CPGAuthority />
        <CPGProcess />
        <CPGFAQ />
        <CPGFinalCTA />
      </main>
      <Footer />
    </>
  );
}

// Suppress unused-import warning for icons that may be used in future variants
void Check;
