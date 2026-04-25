// Renders the audit report as a self-contained HTML email body. Used both
// for the email sent to the visitor and the lead notification sent to the
// owner. Uses inline styles only — every email client strips <style>.

import type { AuditResult, Finding } from "./types";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const PALETTE = {
  grave: "#111714",
  mist: "#D4E7D4",
  cloud: "#E8F0E8",
  toxic: "#BFFF00",
  text: "#111714",
  dim: "#5A6661",
  hairline: "#C7D6C7",
  red: "#B00020",
  amber: "#A86700",
};

function severityColor(s: Finding["severity"]) {
  if (s === "critical") return PALETTE.red;
  if (s === "warn") return PALETTE.amber;
  return PALETTE.text;
}

export function renderAuditEmail(args: {
  result: AuditResult;
  forName: string;
  fromOwner: boolean; // true = owner-bound notification, false = visitor-bound report
  ownerNote?: string;
  bookingUrl: string;
  contactPhone: string;
  contactEmail: string;
}): string {
  const { result, forName, fromOwner, ownerNote, bookingUrl, contactPhone, contactEmail } = args;
  const { overallScore, overallPulse, headline, pillars, finalUrl } = result;

  const findingsHtml = pillars
    .map((p) => {
      const findings = p.findings
        .map(
          (f) => `
          <tr><td style="padding:14px 0 4px 0;border-top:1px solid ${PALETTE.hairline};">
            <div style="font:600 13px/1.4 -apple-system,Segoe UI,sans-serif;color:${severityColor(f.severity)};text-transform:uppercase;letter-spacing:0.08em;">
              ${esc(f.severity === "critical" ? "Critical" : f.severity === "warn" ? "Warning" : "OK")}
            </div>
            <div style="font:600 16px/1.3 Georgia,serif;color:${PALETTE.text};margin-top:4px;">${esc(f.title)}</div>
            <div style="font:400 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};margin-top:6px;">${esc(f.detail)}</div>
            <div style="font:500 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};margin-top:8px;padding:10px 12px;background:${PALETTE.cloud};border-left:3px solid ${PALETTE.toxic};">
              <strong style="color:${PALETTE.text};">Fix:</strong> ${esc(f.remedy)}
            </div>
          </td></tr>`,
        )
        .join("");
      const pillarHeader = `
        <tr><td style="padding:28px 0 10px 0;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
            <td style="font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};text-transform:uppercase;letter-spacing:0.18em;">${esc(p.label)}</td>
            <td align="right" style="font:700 22px/1 Georgia,serif;color:${PALETTE.text};">${p.score}<span style="font:600 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};"> / 100 · ${esc(p.pulse)}</span></td>
          </tr></table>
          <div style="font:400 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};margin-top:8px;">${esc(p.summary)}</div>
        </td></tr>`;
      const noFindings = p.findings.length === 0
        ? `<tr><td style="padding:14px 0 4px 0;border-top:1px solid ${PALETTE.hairline};font:500 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};">No major issues found in this pillar.</td></tr>`
        : "";
      return pillarHeader + (findings || noFindings);
    })
    .join("");

  const banner = fromOwner
    ? `<div style="background:${PALETTE.toxic};color:${PALETTE.grave};padding:14px 24px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:0.18em;">
        New lead — Pulse Check ${overallScore}/100
       </div>`
    : `<div style="background:${PALETTE.grave};color:${PALETTE.toxic};padding:14px 24px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:0.18em;">
        Branding Zombie · Pulse Check Report
       </div>`;

  const ownerSummary = fromOwner && ownerNote
    ? `<tr><td style="padding:0 24px 16px 24px;font:500 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};background:${PALETTE.cloud};border-left:3px solid ${PALETTE.toxic};">${esc(ownerNote).replace(/\n/g, "<br>")}</td></tr>`
    : "";

  const greeting = fromOwner
    ? `Lead from <a href="${esc(finalUrl)}" style="color:${PALETTE.text};">${esc(finalUrl)}</a>`
    : `Hey ${esc(forName.split(" ")[0] || "there")},`;

  const intro = fromOwner
    ? `<p style="font:400 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};margin:0 0 14px 0;">Visitor ran a Pulse Check on their site. Full report below — same one they got.</p>`
    : `<p style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};margin:0 0 14px 0;">
        Here's your Pulse Check for <a href="${esc(finalUrl)}" style="color:${PALETTE.text};">${esc(finalUrl)}</a>. Straight read, no fluff.
      </p>
      <p style="font:400 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};margin:0 0 24px 0;">
        Every "Fix" line below is something we resurrect every week. If any of it lines up with what you're trying to do, hit reply — I'll send you a 10-minute, candid take on which one to tackle first.
      </p>`;

  const cta = fromOwner
    ? ""
    : `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 12px 0;">
        <tr>
          <td style="background:${PALETTE.grave};border-radius:999px;">
            <a href="${esc(bookingUrl)}" style="display:inline-block;padding:14px 26px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.toxic};text-decoration:none;text-transform:uppercase;letter-spacing:0.16em;">Book a 15-min call</a>
          </td>
          <td width="14"></td>
          <td style="border:1px solid ${PALETTE.grave};border-radius:999px;">
            <a href="tel:${esc(contactPhone.replace(/[^\d+]/g, ""))}" style="display:inline-block;padding:13px 24px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};text-decoration:none;text-transform:uppercase;letter-spacing:0.16em;">Call ${esc(contactPhone)}</a>
          </td>
        </tr>
      </table>`;

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Pulse Check — ${esc(finalUrl)}</title></head>
<body style="margin:0;padding:0;background:${PALETTE.mist};font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${PALETTE.mist};">
    <tr><td align="center" style="padding:32px 12px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;background:#ffffff;border:1px solid ${PALETTE.hairline};">
        <tr><td>${banner}</td></tr>
        ${ownerSummary}
        <tr><td style="padding:24px 24px 8px 24px;">
          <div style="font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.18em;">${greeting}</div>
          <div style="font:700 44px/1.05 Georgia,serif;color:${PALETTE.text};margin:14px 0 6px 0;">${overallScore}<span style="font:600 18px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};"> / 100</span></div>
          <div style="display:inline-block;padding:6px 12px;background:${PALETTE.grave};color:${PALETTE.toxic};font:700 11px/1 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:0.18em;">${esc(overallPulse)}</div>
          <p style="font:600 18px/1.4 Georgia,serif;color:${PALETTE.text};margin:18px 0 4px 0;">${esc(headline)}</p>
        </td></tr>

        ${intro ? `<tr><td style="padding:14px 24px 0 24px;">${intro}</td></tr>` : ""}

        <tr><td style="padding:0 24px 8px 24px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">${findingsHtml}</table>
        </td></tr>

        ${cta ? `<tr><td style="padding:0 24px 8px 24px;">${cta}</td></tr>` : ""}

        <tr><td style="padding:18px 24px 28px 24px;border-top:1px solid ${PALETTE.hairline};">
          <div style="font:400 12px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};">
            Branding Zombie Designs · Cumming, GA · ${esc(contactPhone)} · <a href="mailto:${esc(contactEmail)}" style="color:${PALETTE.dim};">${esc(contactEmail)}</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function renderOwnerSummary(result: AuditResult, lead: { name: string; email: string; phone: string }): string {
  const top = result.pillars
    .flatMap((p) => p.findings.filter((f) => f.severity === "critical").slice(0, 1))
    .slice(0, 3)
    .map((f) => `• ${f.title}`)
    .join("\n");
  return [
    `Lead: ${lead.name} · ${lead.email} · ${lead.phone}`,
    `Site: ${result.finalUrl}`,
    `Score: ${result.overallScore}/100 (${result.overallPulse})`,
    "",
    top ? "Top critical findings:" : "No critical findings — pitch on the warns.",
    top,
  ].join("\n");
}
