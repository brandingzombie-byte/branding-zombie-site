"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import Section from "@/components/Section";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

const chatMessages = [
  { role: "customer", text: "Hi, are you guys open on Sundays?", delay: 0 },
  {
    role: "bot",
    text: "Yes — we're open 9am–5pm on Sundays. Want me to book you in?",
    delay: 1500,
  },
  {
    role: "customer",
    text: "Yes please. Anything Sunday afternoon?",
    delay: 3500,
  },
  {
    role: "bot",
    text: "I have 1:00 PM and 3:30 PM open this Sunday. Which works better?",
    delay: 5000,
  },
  { role: "customer", text: "1:00 works great.", delay: 7000 },
  {
    role: "bot",
    text: "Booked you for Sunday at 1:00 PM. A confirmation text is on its way. See you then.",
    delay: 8500,
  },
];

function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const { ref, isInView } = useInView(0.3);

  useEffect(() => {
    if (!isInView) return;
    setVisibleCount(0);

    const timers = chatMessages.map((msg, i) =>
      setTimeout(() => setVisibleCount(i + 1), msg.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md border border-[var(--color-dark-border)] bg-[var(--color-surface)]"
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-[var(--color-dark-border)] bg-[var(--color-elevated)] px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grave)]">
          <Image
            src="/assets/SVG/ai-chatbot-icon.svg"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] [filter:invert(1)]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[length:var(--text-secondary)] font-medium text-[var(--color-dark-text-primary)]">
            BZ Assistant
          </p>
          <p className="flex items-center gap-1.5 text-[length:var(--text-caption)] text-[var(--color-toxic-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-toxic)]" />
            Online — responds instantly
          </p>
        </div>
        <span className="tabular ml-auto font-mono text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
          11:47 PM
        </span>
      </div>

      {/* Messages */}
      <div className="min-h-[340px] space-y-4 p-5">
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex animate-fade-up",
              msg.role === "customer" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] px-4 py-2.5 text-[length:var(--text-secondary)] leading-relaxed",
                msg.role === "customer"
                  ? "rounded-2xl rounded-br-sm border border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-text)]"
                  : "rounded-2xl rounded-bl-sm border-l-2 border-[var(--color-toxic)] bg-[var(--color-elevated)] text-[var(--color-dark-text-primary)]",
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator on AI */}
        {visibleCount > 0 &&
          visibleCount < chatMessages.length &&
          visibleCount % 2 === 1 && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border-l-2 border-[var(--color-toxic)] bg-[var(--color-elevated)] px-4 py-3">
                <div className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-toxic)]/70"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default function AIShowcase() {
  const { ref, isInView } = useInView(0.1);

  return (
    <Section theme="dark" pad="spacious" topRule bottomRule>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* LEFT — Copy (col-span 6) */}
        <div className="lg:col-span-6">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan-text)]">
            AI integration
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[0.95] tracking-tight text-[var(--color-dark-text-primary)]">
            While you sleep,{" "}
            <span className="relative inline-block">
              your brand answers
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </h2>
          <p className="measure mt-6 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            A virtual assistant that answers customer questions instantly,
            books appointments, captures leads, and follows up — all without
            you lifting a finger. That&apos;s what AI integration does for
            your business.
          </p>

          {/* Benefits — caption-typed strip, hairline-separated, no card chrome */}
          <ul className="mt-10 grid grid-cols-3 divide-x divide-[var(--color-dark-border-strong)] border-y border-[var(--color-dark-border-strong)]">
            {[
              { value: "Always on", label: "Capture leads while you sleep" },
              { value: "Instant", label: "A chatbot that never goes to voicemail" },
              { value: "Hands-off", label: "Follow-up runs without you" },
            ].map((s) => (
              <li key={s.label} className="px-4 py-5">
                <div className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-cyan-text)]">
                  {s.value}
                </div>
                <div className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  {s.label}
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            role="button"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            See what AI can do for you
            <ArrowRight size={16} weight="bold" />
          </a>
        </div>

        {/* RIGHT — Chat (col-span 6) */}
        <div className="lg:col-span-6">
          <ChatDemo />
          <p className="mt-3 text-center text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
            Live demo — what your customer sees at 11:47 PM
          </p>
        </div>
      </div>
    </Section>
  );
}
