"use client";

import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { subscribeNewsletter, type SubscribeState } from "./actions";

const INITIAL: SubscribeState = { ok: false, message: "" };

// Email capture band on /play. One field, one button — subscribers land in
// the same Resend nurture audience every lead form feeds.
export default function NewsletterSignup() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, INITIAL);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-lg border border-[var(--color-toxic)]/40 bg-[var(--color-surface)] px-6 py-5 text-center"
      >
        <p className="text-[length:var(--text-body)] font-semibold text-[var(--color-toxic-text)]">
          {state.message}
        </p>
        <p className="mt-1 text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)]">
          Fresh ideas, quirky experiments, and zero corporate mush — straight to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto w-full max-w-xl">
      {/* Honeypot — humans never see it, bots can't resist it. */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourbusiness.com"
          className="min-h-12 flex-1 rounded-md border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-dark-text-primary)] placeholder:text-[var(--color-dark-text-dim)] outline-none transition-colors focus:border-[var(--color-toxic)]"
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "min-h-12 cursor-pointer rounded-md bg-[var(--color-toxic)] px-7 py-3 text-[length:var(--text-secondary)] font-bold uppercase tracking-[0.15em] text-black transition-[transform,background-color] duration-150 ease-out hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]",
            pending && "cursor-wait opacity-60",
          )}
        >
          {pending ? "Raising you…" : "Join the horde"}
        </button>
      </div>

      {!state.ok && state.message && (
        <p role="alert" className="mt-2 text-[length:var(--text-secondary)] text-[#ff8f8f]">
          {state.message}
        </p>
      )}
      <p className="mt-3 text-[length:var(--text-caption)] text-[var(--color-dark-text-dim)]">
        No spam, no daily floods — just the good stuff. Unsubscribe anytime with one click.
      </p>
    </form>
  );
}
