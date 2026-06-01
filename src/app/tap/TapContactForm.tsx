"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitTapLead, type TapLeadState } from "./actions";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle } from "@/components/icons";

const INITIAL: TapLeadState = { ok: false, message: "" };

export default function TapContactForm() {
  const [state, formAction, pending] = useActionState(submitTapLead, INITIAL);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (state.ok && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent("generate_lead", { form: "tap_interactive", value: 1 });
    }
  }, [state.ok]);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-2xl border border-[var(--color-toxic)]/40 bg-[var(--color-surface)] p-8"
      >
        <CheckCircle
          size={32}
          weight="fill"
          className="text-[var(--color-toxic-text)]"
        />
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
          It&apos;s alive
        </span>
        <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-primary)]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)]/70 p-6 sm:p-8"
    >
      {/* Honeypot: hidden from humans, catnip for bots */}
      <label className="sr-only" aria-hidden>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <Field label="Your name" name="name" autoComplete="name" required maxLength={120} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
        />
        <Field
          label="Phone"
          hint="Optional"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <Field
        label="Business"
        hint="Optional"
        name="business"
        autoComplete="organization"
        maxLength={120}
      />
      <FieldTextarea
        label="What do you want to build?"
        name="want"
        rows={4}
        required
        maxLength={4000}
        placeholder="A line or two is plenty. Example: 'NFC stickers for my coffee shop counter that open a spin-the-wheel discount.'"
      />

      {state.message && !state.ok && (
        <p
          role="alert"
          className="text-[length:var(--text-secondary)] text-[var(--color-toxic-text)]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-colors",
          "hover:bg-[var(--color-toxic-deep)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {pending ? "Sending…" : "Send it over"}
        <ArrowUpRight size={16} weight="bold" />
      </button>

      <p className="text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
        No app, no spam. We read every note and reply within one business
        day — usually same day.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `tap-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
        {label}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-[var(--color-dark-text-dim)]/80">
            {hint}
          </span>
        )}
      </span>
      <input
        id={id}
        name={name}
        className="rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-dark-text-primary)] outline-none transition-colors placeholder:text-[var(--color-dark-text-dim)] focus:border-[var(--color-toxic)]"
        {...rest}
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  hint,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `tap-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
        {label}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-[var(--color-dark-text-dim)]/80">
            {hint}
          </span>
        )}
      </span>
      <textarea
        id={id}
        name={name}
        className="min-h-[120px] rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)] px-4 py-3 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-primary)] outline-none transition-colors placeholder:text-[var(--color-dark-text-dim)] focus:border-[var(--color-toxic)]"
        {...rest}
      />
    </label>
  );
}
