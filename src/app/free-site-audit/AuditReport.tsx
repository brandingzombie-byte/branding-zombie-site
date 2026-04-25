// Inline report renderer — used after a successful audit. Mirrors the
// information density of the email body but uses the site design tokens.

import type { AuditResult, Finding, Pillar } from "@/lib/audit/types";
import { CheckCircle, Warning, WarningCircle, ArrowUpRight, Phone } from "@/components/icons";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

function severityBadge(s: Finding["severity"]) {
  if (s === "critical")
    return {
      label: "Critical",
      Icon: WarningCircle,
      cls: "text-[var(--color-danger,#b00020)] border-[var(--color-danger,#b00020)]/40",
    };
  if (s === "warn")
    return {
      label: "Warning",
      Icon: Warning,
      cls: "text-[#A86700] border-[#A86700]/40",
    };
  return {
    label: "OK",
    Icon: CheckCircle,
    cls: "text-[var(--color-neon-text)] border-[var(--color-neon-text)]/40",
  };
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="border-t border-[var(--color-hairline-strong)] py-7">
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            {pillar.label}
          </span>
          <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
            {pillar.summary}
          </p>
        </div>
        <div className="text-right">
          <div className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-text-primary tabular">
            {pillar.score}
            <span className="ml-1 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
              / 100
            </span>
          </div>
          <span className="mt-2 inline-block bg-[var(--color-grave)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
            {pillar.pulse}
          </span>
        </div>
      </header>

      {pillar.findings.length === 0 ? (
        <p className="mt-5 inline-flex items-center gap-2 text-[length:var(--text-body)] text-[var(--color-neon-text)]">
          <CheckCircle size={18} weight="fill" />
          No major issues here.
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-5">
          {pillar.findings.map((f) => {
            const sev = severityBadge(f.severity);
            const Icon = sev.Icon;
            return (
              <li key={f.id} className="grid gap-2">
                <div
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${sev.cls}`}
                >
                  <Icon size={12} weight="bold" />
                  {sev.label}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-text-primary">
                  {f.title}
                </h3>
                <p className="text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                  {f.detail}
                </p>
                <div className="mt-1 border-l-[3px] border-[var(--color-toxic)] bg-[var(--color-cloud)] px-4 py-3">
                  <span className="text-[length:var(--text-caption)] font-bold uppercase tracking-[0.2em] text-text-primary">
                    The fix
                  </span>
                  <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-text-primary">
                    {f.remedy}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export default function AuditReport({ result }: { result: AuditResult }) {
  const criticalCount = result.pillars.reduce(
    (n, p) => n + p.findings.filter((f) => f.severity === "critical").length,
    0,
  );
  const warnCount = result.pillars.reduce(
    (n, p) => n + p.findings.filter((f) => f.severity === "warn").length,
    0,
  );

  return (
    <div className="mt-10">
      {/* Headline scoreboard */}
      <div className="grid grid-cols-1 gap-8 border-y border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] px-6 py-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
            Pulse Check · {new URL(result.finalUrl).hostname}
          </span>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-display)] text-[clamp(3rem,5vw,5rem)] leading-none text-text-primary tabular">
              {result.overallScore}
            </span>
            <span className="text-[length:var(--text-h3)] uppercase tracking-[0.18em] text-text-dim">
              / 100
            </span>
          </div>
          <span className="mt-3 inline-block bg-[var(--color-grave)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
            {result.overallPulse}
          </span>
        </div>
        <div className="lg:col-span-7">
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] text-text-primary">
            {result.headline}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
            <span>{criticalCount} critical</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
            <span>{warnCount} warnings</span>
            <span aria-hidden className="h-3 w-px bg-[var(--color-hairline-strong)]" />
            <span>6 pillars · 30+ checks</span>
          </div>
        </div>
      </div>

      {/* Pillar cards */}
      <div className="mt-2">
        {result.pillars.map((p) => (
          <PillarCard key={p.key} pillar={p} />
        ))}
      </div>

      {/* CTA strip */}
      <div className="mt-12 border-t border-[var(--color-hairline-strong)] pt-10">
        <h2 className="max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
          Want this site resurrected?
        </h2>
        <p className="measure mt-5 text-[length:var(--text-lead)] leading-relaxed text-text-secondary">
          A copy of this report is in your inbox. If any of it lines up with
          what you're trying to fix, we'll give you a candid 15-minute take —
          no pitch deck, no sales team.
        </p>
        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]"
          >
            Book a 15-min call
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <a
            href={PHONE_HREF}
            className="tabular group inline-flex items-center gap-2 rounded-full border border-[var(--color-text-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text-primary hover:border-[var(--color-neon-text)] hover:text-[var(--color-neon-text)]"
          >
            <Phone size={16} weight="bold" />
            Call · {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
