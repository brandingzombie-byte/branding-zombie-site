"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/icons";

const INITIAL: ContactState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-md border border-[var(--color-neon)]/40 bg-[var(--color-cloud)] p-6"
      >
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
          Message received
        </span>
        <p className="text-[length:var(--text-body)] leading-relaxed text-text-primary">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
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

      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
      />
      <Field
        label="Business name"
        hint="Optional — if you have one."
        name="business"
        autoComplete="organization"
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
          hint="Optional — easier if you prefer a call."
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </div>
      <FieldTextarea
        label="What do you need help with?"
        name="message"
        rows={5}
        required
        maxLength={4000}
        placeholder="A sentence or two is enough. Example: 'Our website is from 2018 and we're losing customers on mobile.'"
      />

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
        {pending ? "Sending…" : "Send it over"}
        <ArrowRight size={16} weight="bold" />
      </button>

      <p className="text-[length:var(--text-caption)] text-text-dim">
        We read every message and reply within one business day — usually
        same day.
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
      <textarea
        id={id}
        name={name}
        className="min-h-[140px] rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] leading-relaxed text-text-primary outline-none transition-colors focus:border-[var(--color-neon-text)]"
        {...rest}
      />
    </label>
  );
}
