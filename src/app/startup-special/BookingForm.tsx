"use client";

import { useActionState, useState } from "react";
import { ArrowRight, CalendarPlus, CheckCircle, Lightning } from "@phosphor-icons/react/dist/ssr";
import { bookStartupSpecial, type BookingState } from "./actions";
import { cn } from "@/lib/utils";

const INITIAL: BookingState = { ok: false, message: "" };

export default function BookingForm() {
  const [state, formAction, pending] = useActionState(bookStartupSpecial, INITIAL);

  if (state.ok && state.calendlyUrl) {
    return (
      <div className="flex flex-col gap-5">
        <div
          role="status"
          className="flex items-start gap-3 border-l-[3px] border-[var(--color-toxic)] bg-[var(--color-cloud)] px-5 py-4"
        >
          <CheckCircle
            size={20}
            weight="fill"
            className="mt-0.5 shrink-0 text-[var(--color-neon-text)]"
          />
          <div>
            <span className="block text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              Reserved
            </span>
            <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-text-primary">
              {state.message}
            </p>
          </div>
        </div>
        <a
          href={state.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
        >
          <CalendarPlus size={18} weight="bold" />
          Pick your kickoff slot
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="text-[length:var(--text-caption)] text-text-dim">
          30-minute call. No pressure, no slides. We'll talk through your launch
          and confirm the 10-day window.
        </p>
      </div>
    );
  }

  return <FormFields action={formAction} pending={pending} state={state} />;
}

function FormFields({
  action,
  pending,
  state,
}: {
  action: (formData: FormData) => void;
  pending: boolean;
  state: BookingState;
}) {
  const [agree, setAgree] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>

      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
        placeholder="Jane Doe"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          placeholder="you@business.com"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
          placeholder="(770) 555-0142"
        />
      </div>
      <Field
        label="Business name"
        hint="Working title is fine."
        name="business"
        autoComplete="organization"
        maxLength={160}
        placeholder="Jane's Cumming Coffee Co."
      />
      <Textarea
        label="What are you launching?"
        hint="One line. What you sell, where, who for."
        name="launching"
        maxLength={1200}
        placeholder="Mobile dog grooming, Forsyth County, for busy parents who can't get to the salon."
      />

      <label className="flex items-start gap-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-neon-text)]"
        />
        <span>
          I get it: $997 covers everything listed. Year two of hosting is $100,
          cancel anytime. I'll book a kickoff call after submitting.
        </span>
      </label>

      {state.message && !state.ok && (
        <p
          role="alert"
          className="text-[length:var(--text-secondary)] text-[var(--color-destructive)]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !agree}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-text-primary)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)]",
          "hover:bg-[var(--color-neon-text)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {pending ? (
          <>
            <Lightning size={16} weight="fill" className="animate-pulse" />
            Reserving your spot…
          </>
        ) : (
          <>
            Reserve my kit
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-[length:var(--text-caption)] text-text-dim">
        5 kits a month. Booked is booked. We'll confirm by email within the day.
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
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex flex-wrap items-baseline gap-x-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
        {label}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-text-dim/80">
            {hint}
          </span>
        )}
      </span>
      <input
        id={id}
        name={name}
        className="rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] text-text-primary outline-none transition-colors focus:border-[var(--color-neon-text)]"
        {...rest}
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  hint,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex flex-wrap items-baseline gap-x-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
        {label}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-text-dim/80">
            {hint}
          </span>
        )}
      </span>
      <textarea
        id={id}
        name={name}
        rows={3}
        className="rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] text-text-primary outline-none transition-colors focus:border-[var(--color-neon-text)]"
        {...rest}
      />
    </label>
  );
}
