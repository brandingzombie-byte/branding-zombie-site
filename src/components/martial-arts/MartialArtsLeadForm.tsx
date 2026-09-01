"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitMartialArtsLead, type MartialArtsLeadState } from "./actions";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle } from "@/components/icons";

const INITIAL: MartialArtsLeadState = { ok: false, message: "" };

const NEEDS = [
  "Logo & mark",
  "Full brand system",
  "Website + sign-up",
  "Signage & mat wall",
  "Uniforms & apparel",
  "Social & local SEO",
  "Not sure",
];

export default function MartialArtsLeadForm({
  source,
  ctaLabel,
}: {
  /** Page source tag, e.g. "Martial Arts & Gym Branding — Cumming, GA". */
  source: string;
  ctaLabel: string;
}) {
  const [state, formAction, pending] = useActionState(submitMartialArtsLead, INITIAL);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (state.ok && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent("generate_lead", {
        form: "martial_arts_gym_branding_quote",
        source,
        value: 1,
      });
    }
  }, [state.ok, source]);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-2xl border border-[var(--color-toxic)]/40 bg-[var(--color-surface)] p-8"
      >
        <CheckCircle size={32} weight="fill" className="text-[var(--color-toxic-text)]" />
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
          Teardown request in
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
      <input type="hidden" name="source" value={source} />
      {/* Honeypot: hidden from humans, catnip for bots */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>

      <Field label="Your name" name="name" autoComplete="name" required maxLength={120} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={160}
        />
        <Field
          label="Phone"
          hint="Optional"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Gym / school name"
          hint="Optional"
          name="gymName"
          autoComplete="organization"
          maxLength={120}
        />
        <FieldSelect
          label="Martial arts school or gym?"
          name="audience"
          defaultValue="Martial arts school / dojo"
          options={[
            "Martial arts school / dojo",
            "Gym / fitness studio",
            "Both / not sure",
          ]}
        />
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
          What do you need?
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {NEEDS.map((need) => (
            <label
              key={need}
              className="flex cursor-pointer items-center gap-2.5 rounded-md border border-[var(--color-dark-border)] bg-[var(--color-grave)] px-3 py-2.5 text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)] transition-colors has-[:checked]:border-[var(--color-toxic)] has-[:checked]:text-[var(--color-dark-text-primary)]"
            >
              <input
                type="checkbox"
                name="needs"
                value={need}
                className="h-4 w-4 shrink-0 accent-[var(--color-toxic)]"
              />
              {need}
            </label>
          ))}
        </div>
      </fieldset>

      <FieldTextarea
        label="Message"
        hint="Optional"
        name="message"
        rows={3}
        maxLength={4000}
        placeholder="Tell us about the school or gym, your programs, and what you're trying to fix. A line or two is plenty."
      />

      {state.message && !state.ok && (
        <p
          role="alert"
          aria-live="polite"
          className="text-[length:var(--text-secondary)] text-[var(--color-toxic-text)]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {pending ? "Sending…" : ctaLabel}
        <ArrowUpRight
          size={16}
          weight="bold"
          className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
      </button>

      <p className="text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
        Free brand teardown — no obligation. We read every request and reply within one
        business day, usually same day.
      </p>
    </form>
  );
}

function FieldShell({
  label,
  name,
  hint,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={`ma-${name}`} className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
        {label}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-[var(--color-dark-text-dim)]/80">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

const FIELD_CLASS =
  "rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-grave)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-dark-text-primary)] outline-none transition-colors placeholder:text-[var(--color-dark-text-dim)] focus:border-[var(--color-toxic)]";

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
  return (
    <FieldShell label={label} name={name} hint={hint}>
      <input id={`ma-${name}`} name={name} className={FIELD_CLASS} {...rest} />
    </FieldShell>
  );
}

function FieldSelect({
  label,
  name,
  hint,
  options,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} name={name} hint={hint}>
      <select id={`ma-${name}`} name={name} className={FIELD_CLASS} {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
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
  return (
    <FieldShell label={label} name={name} hint={hint}>
      <textarea
        id={`ma-${name}`}
        name={name}
        className={cn(FIELD_CLASS, "min-h-[96px] leading-relaxed")}
        {...rest}
      />
    </FieldShell>
  );
}
