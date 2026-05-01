"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { submitQuoteRequest, type QuoteState } from "./actions";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "@/components/icons";

const INITIAL: QuoteState = { ok: false, message: "" };

// Service options — slugs match the SERVICES array + launch-package + a
// "not-sure" escape hatch for visitors who can't categorize their need.
// Order matches the homepage bento grid for visual recognition.
const SERVICE_OPTIONS: { slug: string; label: string }[] = [
  { slug: "web-design", label: "Web Design" },
  { slug: "logo-design", label: "Logo Design" },
  { slug: "branding", label: "Branding" },
  { slug: "ecommerce", label: "Ecommerce" },
  { slug: "print-design", label: "Print Design" },
  { slug: "social-media", label: "Social Media" },
  { slug: "digital-marketing", label: "Digital Marketing" },
  { slug: "ai-workflows", label: "AI Workflows" },
  { slug: "launch-package", label: "Launch Package" },
  { slug: "not-sure", label: "Not sure / mix" },
];

const BUDGET_OPTIONS = [
  "<$1k",
  "$1k–$3k",
  "$3k–$7k",
  "$7k–$15k",
  "$15k+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "ASAP / yesterday",
  "1–4 weeks",
  "1–3 months",
  "Just exploring",
];

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

export default function CustomQuoteForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") ?? "";
  const prefilledServices = useMemo(() => {
    if (prefilledService && SERVICE_OPTIONS.some((s) => s.slug === prefilledService)) {
      return [prefilledService];
    }
    return [];
  }, [prefilledService]);

  const [state, formAction, pending] = useActionState(submitQuoteRequest, INITIAL);
  const [services, setServices] = useState<string[]>(prefilledServices);
  const [files, setFiles] = useState<File[]>([]);
  const [clientFileError, setClientFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trackedRef = useRef(false);

  // Re-prefill if the URL changes during the session (rare but cheap to handle).
  useEffect(() => {
    if (prefilledServices.length > 0 && services.length === 0) {
      setServices(prefilledServices);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledService]);

  useEffect(() => {
    if (state.ok && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent("generate_lead", {
        form: "custom_quote",
        services: services.join(",") || undefined,
        value: 1,
      });
    }
  }, [state.ok, services]);

  function toggleService(slug: string) {
    setServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  // Sync the underlying <input>'s FileList to a given set of files using
  // DataTransfer — the only Web API that lets us set input.files
  // programmatically. Browser support: Chrome 13+, Firefox 62+, Safari 14.1+,
  // Edge 79+ — well within our mobile audience.
  function syncInputFiles(next: File[]) {
    if (typeof window === "undefined") return;
    const input = fileInputRef.current;
    if (!input) return;
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    input.files = dt.files;
  }

  // Keep input.files mirrored to React state on every render so form
  // submission carries everything the user picked. Without this, the
  // input is empty at submit time and the server receives no attachments.
  useEffect(() => {
    syncInputFiles(files);
  }, [files]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setClientFileError(null);
    const incoming = Array.from(e.target.files ?? []);
    if (incoming.length === 0) return;

    const merged = [...files, ...incoming];
    if (merged.length > MAX_FILES) {
      setClientFileError(`Max ${MAX_FILES} files. Drop a few before adding more.`);
      // The picker already replaced input.files with [incoming]; roll it
      // back to the prior valid state so a stale selection doesn't sneak
      // into form submission.
      syncInputFiles(files);
      return;
    }
    const tooBig = merged.find((f) => f.size > MAX_FILE_BYTES);
    if (tooBig) {
      setClientFileError(`"${tooBig.name}" is over 10MB — try compressing it.`);
      syncInputFiles(files);
      return;
    }

    setFiles(merged);
    // The useEffect above re-syncs input.files from React state on the next
    // render, so we don't manually touch input.value here.
  }

  function removeFile(name: string, size: number) {
    setFiles((prev) => prev.filter((f) => !(f.name === name && f.size === size)));
  }

  if (state.ok) {
    return <SuccessState message={state.message} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-10" noValidate>
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      <input type="hidden" name="sourcePage" value={prefilledService} />

      {/* Echo each chosen service as a hidden field — server action reads
          formData.getAll("services"). */}
      {services.map((s) => (
        <input key={s} type="hidden" name="services" value={s} />
      ))}

      {/* ─── GROUP 1: WHAT YOU NEED ─────────────────────────────────────── */}
      <FieldGroup
        step="01"
        title="What do you need?"
        hint="Pick everything that applies — we bundle if it makes sense."
      >
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((opt) => {
            const selected = services.includes(opt.slug);
            const isNotSure = opt.slug === "not-sure";
            return (
              <button
                type="button"
                key={opt.slug}
                onClick={() => toggleService(opt.slug)}
                aria-pressed={selected}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[length:var(--text-secondary)] font-medium transition-colors",
                  selected
                    ? "border-[var(--color-grave)] bg-[var(--color-grave)] text-[var(--color-toxic)]"
                    : isNotSure
                      ? "border-dashed border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] text-text-dim hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]"
                      : "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]",
                )}
              >
                {selected && (
                  <Check size={14} weight="bold" className="text-[var(--color-toxic)]" />
                )}
                {opt.label}
              </button>
            );
          })}
        </div>
        {state.fieldErrors?.services && (
          <FieldError text={state.fieldErrors.services} />
        )}

        <FieldTextarea
          label="Tell us about the project"
          name="description"
          required
          rows={5}
          maxLength={4000}
          placeholder="A sentence or two is enough. Example: 'We're a barbershop in Cumming. Our 2018 site looks dead and we're losing walk-ins. Need a new logo and a real website.'"
          error={state.fieldErrors?.description}
        />
      </FieldGroup>

      {/* ─── GROUP 2: BUDGET + TIMELINE ─────────────────────────────────── */}
      <FieldGroup
        step="02"
        title="Budget & timeline"
        hint="Both optional. Helps us suggest the right fit — no judgment."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <RadioGroup
            label="Roughly what's the budget?"
            sublabel="No wrong answer. We'll be straight with you if it's not enough."
            name="budget"
            options={BUDGET_OPTIONS}
          />
          <RadioGroup
            label="When do you need this done?"
            sublabel="Honest answers help us prioritize."
            name="timeline"
            options={TIMELINE_OPTIONS}
          />
        </div>
      </FieldGroup>

      {/* ─── GROUP 3: REFERENCE MATERIALS ───────────────────────────────── */}
      <FieldGroup
        step="03"
        title="Reference materials"
        hint="Optional — but the more we see, the faster we can quote."
      >
        <div
          className={cn(
            "flex flex-col gap-3 rounded-md border-2 border-dashed border-[var(--color-hairline-strong)] bg-[var(--color-fog)] px-5 py-8",
            "hover:border-[var(--color-neon-text)] transition-colors",
          )}
        >
          <label
            htmlFor="quote-files"
            className="flex cursor-pointer flex-col items-center gap-2 text-center"
          >
            <span className="text-[length:var(--text-body)] font-semibold text-text-primary">
              Drop in mood boards, current logo, competitor sites — anything
            </span>
            <span className="text-[length:var(--text-caption)] text-text-dim">
              Up to {MAX_FILES} files · 10MB each · images, PDFs, docs, zips
            </span>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-5 py-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider text-text-primary">
              Choose files
            </span>
            <input
              id="quote-files"
              ref={fileInputRef}
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              accept="image/*,application/pdf,.doc,.docx,.odt,.txt,.csv,.zip"
              className="sr-only"
            />
          </label>

          {files.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2 border-t border-[var(--color-hairline-strong)] pt-3">
              {files.map((f) => (
                <li
                  key={`${f.name}-${f.size}`}
                  className="flex items-center justify-between gap-3 text-[length:var(--text-secondary)]"
                >
                  <span className="truncate text-text-primary">{f.name}</span>
                  <div className="flex items-center gap-3 text-text-dim">
                    <span className="tabular text-[length:var(--text-caption)]">
                      {(f.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.name, f.size)}
                      className="text-[length:var(--text-caption)] uppercase tracking-wider text-text-dim hover:text-[var(--color-danger,#b00020)]"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {(clientFileError || state.fieldErrors?.files) && (
          <FieldError text={clientFileError ?? state.fieldErrors?.files ?? ""} />
        )}
      </FieldGroup>

      {/* ─── GROUP 4: HOW TO REACH YOU ──────────────────────────────────── */}
      <FieldGroup step="04" title="How do we reach you?" hint="Real human reads every reply — Gerry, the founder.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Your name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            error={state.fieldErrors?.name}
          />
          <Field
            label="Business name"
            hint="Optional — if you have one."
            name="businessName"
            autoComplete="organization"
            maxLength={120}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            inputMode="email"
            error={state.fieldErrors?.email}
          />
          <Field
            label="Phone"
            hint="Optional — easier if you'd rather we call."
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            inputMode="tel"
          />
        </div>
      </FieldGroup>

      {state.message && !state.ok && !state.fieldErrors && (
        <p
          role="alert"
          className="text-[length:var(--text-secondary)] text-[var(--color-danger,#b00020)]"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-[var(--color-hairline-strong)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[length:var(--text-caption)] text-text-dim sm:max-w-[34ch]">
          Free quote. No spam. We reply within 24 hours — usually same day.
        </p>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-grave)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-toxic)] transition-colors",
            "hover:bg-[var(--color-text-primary)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {pending ? "Sending…" : "Get my custom quote"}
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>
    </form>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function FieldGroup({
  step,
  title,
  hint,
  children,
}: {
  step: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-5 border-0 p-0">
      <div className="flex items-baseline gap-3">
        <span className="tabular text-[length:var(--text-caption)] font-bold uppercase tracking-[0.18em] text-[var(--color-neon-text)]">
          {step}
        </span>
        <legend className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
          {title}
        </legend>
      </div>
      {hint && (
        <p className="-mt-3 text-[length:var(--text-secondary)] text-text-secondary">
          {hint}
        </p>
      )}
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
        {label}
        {rest.required && (
          <span className="text-[var(--color-danger,#b00020)] normal-case tracking-normal">*</span>
        )}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-text-dim/80">
            {hint}
          </span>
        )}
      </span>
      <input
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        className={cn(
          "rounded-md border bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] text-text-primary outline-none transition-colors",
          error
            ? "border-[var(--color-danger,#b00020)] focus:border-[var(--color-danger,#b00020)]"
            : "border-[var(--color-hairline-strong)] focus:border-[var(--color-neon-text)]",
        )}
        {...rest}
      />
      {error && <FieldError text={error} />}
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  hint,
  error,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
        {label}
        {rest.required && (
          <span className="text-[var(--color-danger,#b00020)] normal-case tracking-normal">*</span>
        )}
        {hint && (
          <span className="text-[length:var(--text-caption)] font-normal normal-case tracking-normal text-text-dim/80">
            {hint}
          </span>
        )}
      </span>
      <textarea
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-[140px] rounded-md border bg-[var(--color-cloud)] px-4 py-3 text-[length:var(--text-body)] leading-relaxed text-text-primary outline-none transition-colors",
          error
            ? "border-[var(--color-danger,#b00020)] focus:border-[var(--color-danger,#b00020)]"
            : "border-[var(--color-hairline-strong)] focus:border-[var(--color-neon-text)]",
        )}
        {...rest}
      />
      {error && <FieldError text={error} />}
    </label>
  );
}

function RadioGroup({
  label,
  sublabel,
  name,
  options,
}: {
  label: string;
  sublabel?: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex flex-col gap-1">
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
          {label}
        </span>
        {sublabel && (
          <span className="text-[length:var(--text-caption)] text-text-dim/80">
            {sublabel}
          </span>
        )}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="group cursor-pointer text-[length:var(--text-secondary)]"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex items-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-4 py-2 font-medium text-text-primary transition-colors",
                "group-hover:border-[var(--color-neon-text)] group-hover:text-[var(--color-neon-text)]",
                "peer-checked:border-[var(--color-grave)] peer-checked:bg-[var(--color-grave)] peer-checked:text-[var(--color-toxic)]",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-neon-text)]",
              )}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p
      role="alert"
      className="text-[length:var(--text-caption)] text-[var(--color-danger,#b00020)]"
    >
      {text}
    </p>
  );
}

function SuccessState({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex flex-col gap-4 border-l-[3px] border-[var(--color-toxic)] bg-[var(--color-cloud)] p-7"
    >
      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
        Quote request received
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
        Thanks — we&apos;ve got your brief.
      </h3>
      <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary">
        {message}
      </p>
      <p className="text-[length:var(--text-secondary)] text-text-dim">
        Want to skip the wait?{" "}
        <a
          href="https://calendly.com/brandingzombie/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-neon-text)] underline decoration-[var(--color-neon-text)]/30 underline-offset-4 hover:decoration-[var(--color-neon-text)]"
        >
          Book a 15-min call →
        </a>
      </p>
    </div>
  );
}
