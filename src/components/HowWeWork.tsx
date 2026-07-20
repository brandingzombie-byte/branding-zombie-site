"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "@/components/Section";
import { Phone } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_HREF, CALENDLY_URL } from "@/lib/site";
import { HOW_WE_WORK_FAQS as faqs } from "@/data/how-we-work-faqs";

const steps = [
  {
    n: "01",
    day: "Day 1",
    title: "We Talk",
    description:
      "A discovery call to understand your business, goals, and customers. You get a clear scope, a flat price, and an honest timeline — no surprises.",
  },
  {
    n: "02",
    day: "Day 3–5",
    title: "We Design",
    description:
      "Custom concepts you actually get to react to. You pick a direction and give feedback in consolidated rounds — three are included on every deliverable.",
  },
  {
    n: "03",
    day: "Week 1–2",
    title: "We Build",
    description:
      "We produce the work with real-time preview access, so you watch it come together instead of waiting in the dark.",
  },
  {
    n: "04",
    day: "Week 2–3",
    title: "You Launch",
    description:
      "We hand over the keys — final files, training, and support. Once the project is paid in full, everything we built for you is yours.",
  },
];

const terms = [
  { k: "50% / 50%", v: "Deposit to start, balance before launch. Plans available on $2k+ projects." },
  { k: "Net 7", v: "Invoices due within 7 days. Work simply pauses on any past-due balance." },
  { k: "3 rounds", v: "Revisions included on every deliverable. Extra scope is quoted before we build it." },
  { k: "You own it", v: "Final, paid-for work transfers to you. Plain-English terms, e-signed online." },
];

export default function HowWeWork() {
  return (
    <>
      {/* Intro + process */}
      <Section id="how-we-work" theme="light" pad="spacious">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            How we work
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.05] tracking-tight text-text-primary">
            Big-brand process,{" "}
            <span className="relative inline-block">
              small-business simple
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
              />
            </span>
            .
          </h1>
          <p className="mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            No jargon, no runaround, no surprise invoices. Here&rsquo;s exactly how a project runs
            with us — from the first call to the day you get the keys — plus straight answers to the
            questions we hear most.
          </p>
        </div>

        {/* Step timeline */}
        <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col rounded-xl border border-[var(--color-hairline-strong)] bg-[var(--color-surface-0)] p-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]">
                  {step.n}
                </span>
                <span className="font-mono text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                  {step.day}
                </span>
              </div>
              <h2 className="mt-4 text-[length:var(--text-h4)] font-semibold text-text-primary">
                {step.title}
              </h2>
              <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Terms at a glance */}
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
          {terms.map((t) => (
            <div
              key={t.k}
              className="rounded-xl bg-[var(--color-fog)] p-5 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] text-[var(--color-neon-text)]">
                {t.k}
              </p>
              <p className="mt-2 text-[length:var(--text-caption)] leading-relaxed text-text-secondary">
                {t.v}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-[length:var(--text-caption)] text-text-dim">
          The full details live in our{" "}
          <a href="/terms" className="underline hover:text-[var(--color-neon-text)]">
            Terms of Service
          </a>
          .
        </p>
      </Section>

      {/* FAQ accordion */}
      <Section id="faq" theme="light" pad="standard" className="bg-[var(--color-fog)]">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                FAQ
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Questions?
                <br />
                We&apos;ve got{" "}
                <span className="relative inline-block">
                  answers
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              <p className="measure-tight mt-6 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Still not sure about something? Call and ask — you&rsquo;ll reach Gerry, not a
                gatekeeper.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-3 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-[var(--color-neon-text)] hover:underline"
              >
                <Phone size={18} weight="regular" />
                <span className="tabular">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-neon)] px-6 py-3 text-[length:var(--text-body)] font-semibold text-black hover:opacity-90 sm:w-auto"
              >
                Book a free 15-min call
              </a>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Accordion className="border-t border-[var(--color-hairline-strong)]">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  className="border-b border-[var(--color-hairline-strong)] data-open:bg-[var(--color-cloud)]/40"
                >
                  <AccordionTrigger className="!flex !items-center !justify-between gap-6 !py-6 !text-[length:var(--text-h4)] !font-semibold !text-text-primary aria-expanded:!text-[var(--color-neon-text)] hover:!no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="!pb-6 !pr-10 !text-[length:var(--text-body)] !leading-relaxed !text-text-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>
    </>
  );
}
