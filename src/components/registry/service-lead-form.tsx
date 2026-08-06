"use client";

/** Portable build of BZD's ServiceLeadForm for the team registry. */

import { useActionState, useEffect, useId, useRef, useState } from "react";

export type PreferredContact = "call" | "text" | "email";

export type ServiceLeadState = {
  ok: boolean;
  message: string;
  leadId?: string;
  value?: number;
};

/** Server action contract: validate, deliver the lead, return state. */
export type ServiceLeadAction = (
  prev: ServiceLeadState,
  formData: FormData,
) => Promise<ServiceLeadState>;

export type ServiceLeadFormCopy = {
  eyebrow: string;
  headline: string;
  blurb: string;
  messagePlaceholder: string;
  cta: string;
};

export type LeadInfo = {
  slug: string;
  preferred: PreferredContact;
  leadId: string;
  value: number;
};

const DEFAULT_COPY: ServiceLeadFormCopy = {
  eyebrow: "One tiny form, one real answer",
  headline: "Tell us what you need.",
  blurb:
    "Give us the short version and we'll come back with a straight answer within one business day.",
  messagePlaceholder: "What do you need help with?",
  cta: "Get my call back",
};

const INITIAL: ServiceLeadState = { ok: false, message: "" };

const OPTIONS: { value: PreferredContact; label: string }[] = [
  { value: "call", label: "Call me" },
  { value: "text", label: "Text me" },
  { value: "email", label: "Email me" },
];

type Tone = "light" | "dark";

const TONES: Record<Tone, Record<string, string>> = {
  light: {
    shell: "border-[var(--color-hairline-strong,#d5d9d5)] bg-white",
    eyebrow: "text-[var(--color-neon-text,#3D6200)]",
    rule: "bg-[var(--color-neon,#C0ED08)]",
    heading: "text-[var(--color-text-primary,#333)]",
    blurb: "text-[var(--color-text-secondary,#566856)]",
    label: "text-[var(--color-text-dim,#4A5A4E)]",
    field:
      "border-[var(--color-hairline-strong,#d5d9d5)] bg-white text-[var(--color-text-primary,#333)] placeholder:text-[var(--color-text-dim,#4A5A4E)]/70 focus:border-[var(--color-neon-text,#3D6200)] focus-visible:ring-[var(--color-neon-text,#3D6200)]/40",
    segTrack: "border-[var(--color-hairline-strong,#d5d9d5)] bg-white",
    segIdle:
      "text-[var(--color-text-dim,#4A5A4E)] hover:text-[var(--color-text-primary,#333)]",
    segActive: "bg-[var(--color-neon,#C0ED08)] text-[var(--color-text-primary,#333)]",
    segRing: "peer-focus-visible:ring-[var(--color-neon-text,#3D6200)]/60",
    cta: "bg-[var(--color-text-primary,#333)] text-white hover:bg-[var(--color-neon-text,#3D6200)]",
    ctaRing: "focus-visible:ring-[var(--color-neon-text,#3D6200)]/60",
    danger: "text-[var(--color-danger,#b00020)]",
    fine: "text-[var(--color-text-dim,#4A5A4E)]",
    success: "border-[var(--color-neon,#C0ED08)]/40 bg-white",
    successMark: "text-[var(--color-neon-text,#3D6200)]",
    successBody: "text-[var(--color-text-secondary,#566856)]",
  },
  dark: {
    shell: "border-[var(--color-dark-border-strong,#39423c)] bg-[var(--color-surface,#1A1F1C)]/70",
    eyebrow: "text-[var(--color-toxic-text,#DFFF66)]",
    rule: "bg-[var(--color-toxic,#BFFF00)]",
    heading: "text-[var(--color-dark-text-primary,#F0F4F0)]",
    blurb: "text-[var(--color-dark-text-secondary,#B7C2BA)]",
    label: "text-[var(--color-dark-text-dim,#7E8C82)]",
    field:
      "border-[var(--color-dark-border-strong,#39423c)] bg-[var(--color-grave,#111714)] text-[var(--color-dark-text-primary,#F0F4F0)] placeholder:text-[var(--color-dark-text-dim,#7E8C82)] focus:border-[var(--color-toxic,#BFFF00)] focus-visible:ring-[var(--color-toxic,#BFFF00)]/40",
    segTrack: "border-[var(--color-dark-border-strong,#39423c)] bg-[var(--color-grave,#111714)]",
    segIdle:
      "text-[var(--color-dark-text-dim,#7E8C82)] hover:text-[var(--color-dark-text-primary,#F0F4F0)]",
    segActive: "bg-[var(--color-toxic,#BFFF00)] text-[var(--color-grave,#111714)]",
    segRing: "peer-focus-visible:ring-[var(--color-toxic,#BFFF00)]/70",
    cta: "bg-[var(--color-toxic,#BFFF00)] text-[var(--color-grave,#111714)] hover:bg-[var(--color-toxic-deep,#9BD400)]",
    ctaRing: "focus-visible:ring-[var(--color-toxic,#BFFF00)]/70",
    danger: "text-[var(--color-danger-dark,#FF8A9B)]",
    fine: "text-[var(--color-dark-text-dim,#7E8C82)]",
    success: "border-[var(--color-toxic,#BFFF00)]/40 bg-[var(--color-surface,#1A1F1C)]",
    successMark: "text-[var(--color-toxic-text,#DFFF66)]",
    successBody: "text-[var(--color-dark-text-secondary,#B7C2BA)]",
  },
};

const LABEL_CLASS =
  "text-xs font-semibold uppercase tracking-[0.18em]";

const FIELD_BASE =
  "min-h-[46px] w-full rounded-md border px-4 py-3 text-base outline-none transition-colors duration-150 focus-visible:ring-2";

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.51a12 12 0 0 1 17-17l72 72a12 12 0 0 1 0 17z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24zm45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32z" />
    </svg>
  );
}

export default function ServiceLeadForm({
  slug,
  serviceName,
  action,
  copy = DEFAULT_COPY,
  variant = "section",
  tone = "light",
  className,
  onLead,
}: {
  /** Service slug, forwarded as a hidden input and in onLead. */
  slug: string;
  /** Human-readable service name (email subject, hidden input). */
  serviceName: string;
  /** Server action that validates and delivers the lead. */
  action: ServiceLeadAction;
  copy?: ServiceLeadFormCopy;
  variant?: "section" | "hero";
  tone?: Tone;
  className?: string;
  /** Fires once on success. Default fires GA4 generate_lead when gtag exists. */
  onLead?: (info: LeadInfo) => void;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);
  const [preferred, setPreferred] = useState<PreferredContact>("call");
  const trackedRef = useRef(false);
  const uid = useId();

  const t = TONES[tone];
  const compact = variant === "hero";
  const errorId = `${uid}-error`;
  const showError = Boolean(state.message) && !state.ok;

  useEffect(() => {
    if (state.ok && state.leadId && !trackedRef.current) {
      trackedRef.current = true;
      const info: LeadInfo = {
        slug,
        preferred,
        leadId: state.leadId,
        value: state.value ?? 1,
      };
      if (onLead) {
        onLead(info);
        return;
      }
      type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };
      const gtag = (window as GtagWindow).gtag;
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          form: `service_${info.slug}`,
          service: info.slug,
          preferred_contact: info.preferred,
          value: info.value,
          currency: "USD",
          transaction_id: info.leadId,
        });
      }
    }
  }, [state.ok, state.leadId, state.value, slug, preferred, onLead]);

  const shellClass = compact
    ? cn("flex flex-col gap-4", className)
    : cn("flex flex-col gap-5 rounded-2xl border p-6 sm:p-8", t.shell, className);

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
          <CheckCircleIcon className={t.successMark} />
          <h3 className={cn("text-2xl font-bold leading-tight", t.heading)}>
            Consider it risen.
          </h3>
          <p className={cn("leading-relaxed", t.successBody)}>
            We&rsquo;ll {preferred} you back within one business day — usually a
            lot faster.
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
          <span className={cn("text-xs uppercase tracking-[0.2em]", t.eyebrow)}>
            {copy.eyebrow}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "font-bold leading-tight",
            compact ? "text-xl" : "text-2xl",
            t.heading,
          )}
        >
          {copy.headline}
        </h3>
        <p className={cn("leading-relaxed", compact ? "text-sm" : "text-base", t.blurb)}>
          {copy.blurb}
        </p>
      </div>

      <form action={formAction} className={cn("flex flex-col", compact ? "gap-3.5" : "gap-4")}>
        <input type="hidden" name="service" value={slug} />
        <input type="hidden" name="serviceName" value={serviceName} />

        {/* Honeypot */}
        <label className="sr-only" aria-hidden>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </label>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className={cn(LABEL_CLASS, t.label)}>
            Your name
          </label>
          <input
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
            placeholder={preferred === "email" ? "you@business.com" : "(770) 555-0134"}
            aria-describedby={showError ? errorId : undefined}
            className={cn(FIELD_BASE, t.field)}
          />
        </div>

        <div role="radiogroup" aria-labelledby={`${uid}-preferred-label`} className="flex flex-col gap-1.5">
          <span id={`${uid}-preferred-label`} className={cn(LABEL_CLASS, t.label)}>
            How should we reach you?
          </span>
          <div className={cn("grid grid-cols-3 gap-1 rounded-full border p-1", t.segTrack)}>
            {OPTIONS.map((option) => {
              const active = preferred === option.value;
              return (
                <label key={option.value} htmlFor={`${uid}-${option.value}`} className="relative cursor-pointer">
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
                      "flex min-h-[42px] w-full select-none items-center justify-center whitespace-nowrap rounded-full px-2 text-center text-xs font-semibold uppercase tracking-[0.08em]",
                      "transition-colors duration-150 peer-focus-visible:ring-2",
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
          <label htmlFor={`${uid}-message`} className={cn(LABEL_CLASS, t.label)}>
            <span>Anything else</span>{" "}
            <span className="font-normal normal-case tracking-normal opacity-80">Optional</span>
          </label>
          {compact ? (
            <input
              id={`${uid}-message`}
              name="message"
              type="text"
              maxLength={1000}
              placeholder={copy.messagePlaceholder}
              className={cn(FIELD_BASE, t.field)}
            />
          ) : (
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={3}
              maxLength={1000}
              placeholder={copy.messagePlaceholder}
              className={cn(FIELD_BASE, "min-h-[88px] leading-relaxed", t.field)}
            />
          )}
        </div>

        {showError && (
          <p id={errorId} role="alert" className={cn("text-sm leading-relaxed", t.danger)}>
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group mt-1 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-4",
            "text-sm font-bold uppercase tracking-wider",
            "transition-transform duration-150 active:scale-[0.97] motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
            t.cta,
            t.ctaRing,
          )}
        >
          {pending ? "Sending…" : copy.cta}
          <ArrowRightIcon className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </button>

        {!compact && (
          <p className={cn("text-xs leading-relaxed", t.fine)}>
            No spam, no drip of &ldquo;just circling back&rdquo; emails. One
            human reads it and gets back to you.
          </p>
        )}
      </form>
    </div>
  );
}
