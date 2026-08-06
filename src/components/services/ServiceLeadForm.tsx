"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import {
  submitServiceLead,
  type PreferredContact,
  type ServiceLeadState,
} from "./leadFormActions";
import { getLeadFormCopy } from "./leadFormCopy";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle } from "@/components/icons";

// Per-service micro lead form. Three fields and a button — the whole point is
// that it's answerable in fifteen seconds from a phone. The full scoping brief
// lives at /services/request-quote; this is the "just call me back" path.
//
// Two variants:
//   section — default, roomy, renders its own card (light or dark Section)
//   hero    — compact, no eyebrow, no card of its own (the hero supplies one)
//
// Tone must be set to match the surface it sits on: "light" for mist/fog
// Sections, "dark" for grave/void.

const INITIAL: ServiceLeadState = { ok: false, message: "" };

const OPTIONS: { value: PreferredContact; label: string }[] = [
  { value: "call", label: "Call me" },
  { value: "text", label: "Text me" },
  { value: "email", label: "Email me" },
];

const VERB: Record<PreferredContact, string> = {
  call: "call",
  text: "text",
  email: "email",
};

type Tone = "light" | "dark";

const TONES: Record<
  Tone,
  {
    shell: string;
    eyebrow: string;
    rule: string;
    heading: string;
    blurb: string;
    label: string;
    field: string;
    segTrack: string;
    segIdle: string;
    segActive: string;
    segRing: string;
    cta: string;
    ctaRing: string;
    danger: string;
    fine: string;
    success: string;
    successMark: string;
    successEyebrow: string;
    successBody: string;
  }
> = {
  light: {
    shell:
      "border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)]",
    eyebrow: "text-[var(--color-neon-text)]",
    rule: "bg-[var(--color-neon)]",
    heading: "text-[var(--color-text-primary)]",
    blurb: "text-[var(--color-text-secondary)]",
    label: "text-text-dim",
    field:
      "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] text-[var(--color-text-primary)] placeholder:text-text-dim/70 focus:border-[var(--color-neon-text)] focus-visible:ring-[var(--color-neon-text)]/40",
    segTrack:
      "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)]",
    segIdle: "text-text-dim hover:text-[var(--color-text-primary)]",
    segActive: "bg-[var(--color-neon)] text-[var(--color-text-primary)]",
    segRing: "peer-focus-visible:ring-[var(--color-neon-text)]/60",
    cta: "bg-[var(--color-text-primary)] text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]",
    ctaRing: "focus-visible:ring-[var(--color-neon-text)]/60",
    danger: "text-[var(--color-danger,#b00020)]",
    fine: "text-text-dim",
    success:
      "border-[var(--color-neon)]/40 bg-[var(--color-cloud)]",
    successMark: "text-[var(--color-neon-text)]",
    successEyebrow: "text-[var(--color-neon-text)]",
    successBody: "text-[var(--color-text-secondary)]",
  },
  dark: {
    shell:
      "border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]/70",
    eyebrow: "text-[var(--color-toxic-text)]",
    rule: "bg-[var(--color-toxic)]",
    heading: "text-[var(--color-dark-text-primary)]",
    blurb: "text-[var(--color-dark-text-secondary)]",
    label: "text-[var(--color-dark-text-dim)]",
    field:
      "border-[var(--color-dark-border-strong)] bg-[var(--color-grave)] text-[var(--color-dark-text-primary)] placeholder:text-[var(--color-dark-text-dim)] focus:border-[var(--color-toxic)] focus-visible:ring-[var(--color-toxic)]/40",
    segTrack:
      "border-[var(--color-dark-border-strong)] bg-[var(--color-grave)]",
    segIdle:
      "text-[var(--color-dark-text-dim)] hover:text-[var(--color-dark-text-primary)]",
    segActive: "bg-[var(--color-toxic)] text-[var(--color-grave)]",
    segRing: "peer-focus-visible:ring-[var(--color-toxic)]/70",
    cta: "bg-[var(--color-toxic)] text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]",
    ctaRing: "focus-visible:ring-[var(--color-toxic)]/70",
    danger: "text-[var(--color-danger-dark,#FF8A9B)]",
    fine: "text-[var(--color-dark-text-dim)]",
    success:
      "border-[var(--color-toxic)]/40 bg-[var(--color-surface)]",
    successMark: "text-[var(--color-toxic-text)]",
    successEyebrow: "text-[var(--color-toxic-text)]",
    successBody: "text-[var(--color-dark-text-secondary)]",
  },
};

const LABEL_CLASS =
  "text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em]";

// 16px floor on the font size keeps iOS from zooming the viewport on focus;
// --text-body clamps at 1rem minimum, so it satisfies that on its own.
const FIELD_BASE =
  "min-h-[46px] w-full rounded-md border px-4 py-3 text-[length:var(--text-body)] outline-none transition-colors duration-150 focus-visible:ring-2";

/**
 * Name of the CustomEvent other components dispatch to pre-seed the message
 * field and pull focus (e.g. a tier card CTA that anchors to #lead-form).
 * detail: { message: string }
 */
export const LEAD_PREFILL_EVENT = "bzd:lead-prefill";

export default function ServiceLeadForm({
  slug,
  serviceName,
  variant = "section",
  tone = "light",
  className,
}: {
  /** Service slug — keys the copy map, the lead value, and the GA4 events. */
  slug: string;
  /** Human-readable service name, used in the email subject. */
  serviceName: string;
  variant?: "section" | "hero";
  tone?: Tone;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(submitServiceLead, INITIAL);
  const [preferred, setPreferred] = useState<PreferredContact>("call");
  const [message, setMessage] = useState("");
  const trackedRef = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  // Only the mid-page section variant (the #lead-form anchor target)
  // responds to prefill events — the hero instance stays untouched so the
  // two forms never fight over focus.
  useEffect(() => {
    if (variant !== "section") return;
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ message?: string }>).detail;
      if (detail?.message) setMessage(detail.message);
      // Let the smooth scroll land before pulling focus, and don't scroll
      // again — the anchor navigation already did.
      window.setTimeout(() => {
        nameRef.current?.focus({ preventScroll: true });
      }, 650);
    };
    window.addEventListener(LEAD_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(LEAD_PREFILL_EVENT, onPrefill);
  }, [variant]);

  const copy = getLeadFormCopy(slug);
  const t = TONES[tone];
  const compact = variant === "hero";
  const errorId = `${uid}-error`;
  const showError = Boolean(state.message) && !state.ok;

  useEffect(() => {
    if (state.ok && state.leadId && !trackedRef.current) {
      trackedRef.current = true;
      // Canonical GA4 key event — one dimension per form so "Leads by Source"
      // keeps working across contact/audit/mailer/service forms.
      trackEvent("generate_lead", {
        form: `service_${slug}`,
        service: slug,
        preferred_contact: preferred,
        value: state.value ?? 1,
        currency: "USD",
        transaction_id: state.leadId,
      });
      // Plus a distinctly-named per-service event so each service page can be
      // read at a glance in GA4 without slicing a dimension.
      trackEvent(`service_lead_${slug.replace(/-/g, "_")}`, {
        service: slug,
        preferred_contact: preferred,
        transaction_id: state.leadId,
      });
    }
  }, [state.ok, state.leadId, state.value, slug, preferred]);

  const shellClass = compact
    ? cn("flex flex-col gap-4", className)
    : cn(
        "flex flex-col gap-5 rounded-2xl border p-6 sm:p-8",
        t.shell,
        className,
      );

  if (state.ok) {
    return (
      <div className={shellClass}>
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex flex-col justify-center gap-3 rounded-2xl border p-6",
            compact ? "min-h-[13rem]" : "min-h-[15rem]",
            t.success,
          )}
        >
          <CheckCircle size={30} weight="fill" className={t.successMark} />
          <h3
            className={cn(
              "font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.15] tracking-tight",
              t.heading,
            )}
          >
            Consider it risen.
          </h3>
          <p
            className={cn(
              "text-[length:var(--text-body)] leading-relaxed",
              t.successBody,
            )}
          >
            We&rsquo;ll {VERB[preferred]} you back within one business day —
            usually a lot faster.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      {!compact && (
        <div className="flex items-center gap-3">
          <span aria-hidden className={cn("h-px w-8 shrink-0", t.rule)} />
          <span
            className={cn(
              "text-[length:var(--text-caption)] uppercase tracking-[0.2em]",
              t.eyebrow,
            )}
          >
            {copy.eyebrow}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] leading-[1.15] tracking-tight",
            compact
              ? "text-[length:var(--text-h4)]"
              : "text-[length:var(--text-h3)]",
            t.heading,
          )}
        >
          {copy.headline}
        </h3>
        <p
          className={cn(
            "measure leading-relaxed",
            compact
              ? "text-[length:var(--text-secondary)]"
              : "text-[length:var(--text-body)]",
            t.blurb,
          )}
        >
          {copy.blurb}
        </p>
      </div>

      <form
        action={formAction}
        className={cn("flex flex-col", compact ? "gap-3.5" : "gap-4")}
      >
        <input type="hidden" name="service" value={slug} />
        <input type="hidden" name="serviceName" value={serviceName} />

        {/* Honeypot: hidden from humans, catnip for bots */}
        <label className="sr-only" aria-hidden>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className={cn(LABEL_CLASS, t.label)}>
            Your name
          </label>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-describedby={showError ? errorId : undefined}
            className={cn(FIELD_BASE, t.field)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-contact`} className={cn(LABEL_CLASS, t.label)}>
            Phone or email
          </label>
          <input
            id={`${uid}-contact`}
            name="contact"
            type="text"
            inputMode={preferred === "email" ? "email" : "tel"}
            autoComplete={preferred === "email" ? "email" : "tel"}
            required
            maxLength={160}
            placeholder={
              preferred === "email" ? "you@business.com" : "(770) 555-0134"
            }
            aria-describedby={showError ? errorId : undefined}
            className={cn(FIELD_BASE, t.field)}
          />
        </div>

        <div
          role="radiogroup"
          aria-labelledby={`${uid}-preferred-label`}
          className="flex flex-col gap-1.5"
        >
          <span
            id={`${uid}-preferred-label`}
            className={cn(LABEL_CLASS, t.label)}
          >
            How should we reach you?
          </span>
          <div
            className={cn(
              "grid grid-cols-3 gap-1 rounded-full border p-1",
              t.segTrack,
            )}
          >
            {OPTIONS.map((option) => {
              const active = preferred === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={`${uid}-${option.value}`}
                  className="relative cursor-pointer"
                >
                  <input
                    id={`${uid}-${option.value}`}
                    type="radio"
                    name="preferred"
                    value={option.value}
                    checked={active}
                    onChange={() => setPreferred(option.value)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex min-h-[42px] w-full select-none items-center justify-center whitespace-nowrap rounded-full px-2 text-center text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.08em]",
                      "transition-colors duration-150 ease-[var(--ease-out-quart)]",
                      "peer-focus-visible:ring-2",
                      t.segRing,
                      active ? t.segActive : t.segIdle,
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${uid}-message`}
            className={cn(LABEL_CLASS, t.label)}
          >
            <span>Anything else</span>{" "}
            <span className="font-normal normal-case tracking-normal opacity-80">
              Optional
            </span>
          </label>
          {compact ? (
            <input
              id={`${uid}-message`}
              name="message"
              type="text"
              maxLength={1000}
              placeholder={copy.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={cn(FIELD_BASE, t.field)}
            />
          ) : (
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={3}
              maxLength={1000}
              placeholder={copy.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={cn(FIELD_BASE, "min-h-[88px] leading-relaxed", t.field)}
            />
          )}
        </div>

        {showError && (
          <p
            id={errorId}
            role="alert"
            className={cn(
              "text-[length:var(--text-secondary)] leading-relaxed",
              t.danger,
            )}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group mt-1 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-4",
            "text-[length:var(--text-secondary)] font-bold uppercase tracking-wider",
            "transition-transform duration-150 ease-[var(--ease-out-quart)] active:scale-[0.97] motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
            t.cta,
            t.ctaRing,
          )}
        >
          {pending ? "Sending…" : copy.cta}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
          />
        </button>

        {!compact && (
          <p
            className={cn("text-[length:var(--text-caption)] leading-relaxed", t.fine)}
          >
            No spam, no drip of &ldquo;just circling back&rdquo; emails. One
            human reads it and gets back to you.
          </p>
        )}
      </form>
    </div>
  );
}
