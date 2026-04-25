"use client";

import { useActionState } from "react";
import { runPulseCheck, type AuditState } from "./actions";
import AuditReport from "./AuditReport";
import { cn } from "@/lib/utils";
import { ArrowRight, Lightning } from "@/components/icons";

const INITIAL: AuditState = { ok: false, message: "" };

export default function AuditForm() {
  const [state, formAction, pending] = useActionState(runPulseCheck, INITIAL);

  if (state.ok && state.result) {
    return (
      <div>
        <div
          role="status"
          className="flex flex-col gap-2 border-l-[3px] border-[var(--color-toxic)] bg-[var(--color-cloud)] px-5 py-4"
        >
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Done
          </span>
          <p className="text-[length:var(--text-body)] leading-relaxed text-text-primary">
            {state.message}
          </p>
        </div>
        <AuditReport result={state.result} />
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>

      <Field
        label="Site to check"
        hint="Just the URL — yourdomain.com is fine."
        name="url"
        type="url"
        autoComplete="url"
        required
        maxLength={400}
        placeholder="example.com"
        inputMode="url"
      />
      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
      />
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
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
        />
      </div>

      {state.message && !state.ok && (
        <p
          role="alert"
          className="text-[length:var(--text-secondary)] text-[var(--color-danger,#b00020)]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-text-primary)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)] transition-colors",
          "hover:bg-[var(--color-neon-text)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {pending ? (
          <>
            <Lightning size={16} weight="fill" className="animate-pulse" />
            Checking the pulse…
          </>
        ) : (
          <>
            Check the pulse
            <ArrowRight size={16} weight="bold" />
          </>
        )}
      </button>

      <p className="text-[length:var(--text-caption)] text-text-dim">
        Free. Takes about 10 seconds. We email a copy and follow up once —
        you can ignore us if it's not a fit.
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
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
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
