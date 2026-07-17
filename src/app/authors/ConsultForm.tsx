"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CalendarPlus,
  CheckCircle,
  PaperPlaneTilt,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { submitAuthorConsult, type ConsultState } from "./actions";
import { trackEvent } from "@/lib/analytics";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

const INITIAL: ConsultState = { ok: false, message: "" };

// Journey options are deliberately plain-spoken — authors self-select, which
// tells Gerry whether the lead maps to a website package, the Art Kit, or the
// launch-email add-on.
const STAGES = [
  "Still writing it",
  "Publishing soon — launch coming up",
  "Published — one book",
  "Published — more than one book",
  "Book is out — I need marketing & art",
  "Something else",
];

export default function ConsultForm() {
  const [state, formAction, pending] = useActionState(submitAuthorConsult, INITIAL);
  const trackedRef = useRef(false);

  // Fire generate_lead gated on leadId so the honeypot decoy (ok:true, no
  // leadId) never counts.
  useEffect(() => {
    if (state.ok && state.leadId && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent("generate_lead", {
        form: "authors",
        value: state.value ?? 100,
        currency: "USD",
        transaction_id: state.leadId,
      });
    }
  }, [state.ok, state.leadId, state.value]);

  if (state.ok) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-end gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/authors/hand-thumbs-up.png"
            alt=""
            aria-hidden="true"
            width={160}
            height={90}
            className="w-32 shrink-0 motion-safe:animate-[thumbs-pop_0.5s_var(--ease-out,ease-out)_both] sm:w-40"
          />
          <span className="pb-2 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-text-primary">
            Got it — thank you!
          </span>
        </div>

        <div
          role="status"
          className="flex items-start gap-3 border-l-[3px] border-[var(--color-toxic)] bg-[var(--color-cloud)] px-5 py-4"
        >
          <CheckCircle
            size={20}
            weight="fill"
            className="mt-0.5 shrink-0 text-[var(--color-neon-text)]"
          />
          <p className="text-[length:var(--text-body)] leading-relaxed text-text-primary">
            {state.message}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            <CalendarPlus size={18} weight="bold" />
            Want to pick a time right now?
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-hairline-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]"
          >
            <Phone size={16} weight="bold" />
            <span className="tabular">Or call {PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Success-state pop animation, scoped to this component (§ reduced
            motion: the motion-safe gate above keeps it off when requested). */}
        <style>{`
          @keyframes thumbs-pop {
            0% { transform: translateX(40%) rotate(6deg); opacity: 0; }
            60% { transform: translateX(-4%) rotate(-2deg); opacity: 1; }
            100% { transform: translateX(0) rotate(0deg); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </label>

      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
        placeholder="Margaret Reed"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          placeholder="you@example.com"
        />
        <Field
          label="Phone"
          hint="Optional — if you'd rather talk than type."
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          placeholder="(770) 555-0142"
        />
      </div>
      <Field
        label="Your book's title"
        hint="Optional — working titles welcome."
        name="book"
        maxLength={200}
        placeholder="The Quiet Beyond"
      />
      <SelectField
        label="Where are you in your book journey?"
        hint="Optional."
        name="stage"
        options={STAGES}
      />
      <Textarea
        label="Anything else you'd like me to know?"
        hint="Optional — as much or as little as you like."
        name="message"
        maxLength={4000}
        placeholder="Your story, your goals, your questions — anything helps."
      />

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
        disabled={pending}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-text-primary)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)]",
          "hover:bg-[var(--color-neon-text)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {pending ? (
          <>
            <PaperPlaneTilt size={16} weight="fill" className="animate-pulse" />
            Sending your note…
          </>
        ) : (
          <>
            Send my info to Gerry
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-[length:var(--text-caption)] leading-relaxed text-text-dim">
        Free 15-minute consult · No obligation · Reply within one business day.
        Your info goes to Gerry and no one else — no spam, ever.
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

function SelectField({
  label,
  name,
  hint,
  options,
}: {
  label: string;
  name: string;
  hint?: string;
  options: string[];
}) {
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
      <select
        id={id}
        name={name}
        defaultValue=""
        className="appearance-none rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] text-text-primary outline-none transition-colors focus:border-[var(--color-neon-text)]"
      >
        <option value="">Choose one (or skip this)</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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
        rows={4}
        className="rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] text-text-primary outline-none transition-colors focus:border-[var(--color-neon-text)]"
        {...rest}
      />
    </label>
  );
}
