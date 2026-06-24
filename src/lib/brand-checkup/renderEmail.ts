// ─── Brand Checkup — email rendering ────────────────────────────────────────
// Builds the HTML report email. Two variants: visitor (their report + consult
// CTA) and owner (the same report + a lead summary so Gerry can prep). Inline
// styles only — email clients strip <style>/external CSS.

import type { BandKey, Result, Tier } from "./data";
import { BANDS } from "./data";

const INK = "#1d1f1c";
const MUTED = "#5a5f57";
const LINE = "#e3e6df";
const PAPER = "#ffffff";
const GREEN = "#5f8c12"; // readable green on white
const GREEN_BG = "#f1f7e2";

const TIER_COLOR: Record<Tier, string> = { strong: "#4f8a10", mid: "#C99A00", weak: "#C24A2E" };
const BAND_COLOR: Record<BandKey, string> = { alive: "#4f8a10", pulse: "#C99A00", half: "#C0631F", zombie: "#C62A1C" };

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export type RenderArgs = {
  result: Result;
  forName: string;
  fromOwner: boolean;
  ownerNote?: { name: string; email: string };
  bookingUrl: string;
  contactPhone: string;
  contactEmail: string;
};

export function renderCheckupEmail(a: RenderArgs): string {
  const { result: r, forName, fromOwner, bookingUrl, contactPhone, contactEmail } = a;
  const band = BANDS[r.bandKey];
  const bandColor = BAND_COLOR[r.bandKey];
  const greeting = forName ? esc(forName.split(/\s+/)[0]) : "there";

  const sectionRows = r.sections
    .map((s) => {
      const pct = Math.round(s.ratio * 100);
      const col = TIER_COLOR[s.tier];
      return `
      <tr><td style="padding:14px 0 6px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font:600 14px Arial,sans-serif;color:${INK};">${esc(s.title)}</td>
          <td align="right" style="font:700 13px Arial,sans-serif;color:${col};">${s.score}/${s.app}</td>
        </tr></table>
        <div style="height:9px;background:#eef0ea;border-radius:99px;margin:7px 0;">
          <div style="height:9px;width:${pct}%;background:${col};border-radius:99px;"></div></div>
        <div style="font:400 12.5px/1.45 Arial,sans-serif;color:${MUTED};">
          <b style="color:#3f443c;">${esc(s.cap)}</b>${s.tier !== "strong" ? " " + esc(s.cost) : ""}</div>
      </td></tr>`;
    })
    .join("");

  const fixRows = r.fixes.length
    ? r.fixes
        .map(
          (f, i) => `
      <tr><td style="padding:11px 0;border-bottom:1px solid ${LINE};">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td valign="top" width="34"><div style="width:26px;height:26px;border-radius:7px;background:${GREEN};color:#fff;font:800 14px Arial,sans-serif;text-align:center;line-height:26px;">${i + 1}</div></td>
          <td style="font:600 13.5px/1.4 Arial,sans-serif;color:${INK};">${esc(f.fix)}
            <div style="margin-top:5px;font:700 10.5px Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:${GREEN};">${esc(f.svc)}</div></td>
        </tr></table>
      </td></tr>`,
        )
        .join("")
    : "";

  const winsBlock = r.wins.length
    ? `<tr><td style="padding:18px 22px;">
        <div style="font:700 13px Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:${GREEN};margin-bottom:8px;">What you're already nailing</div>
        ${r.wins.map((w) => `<div style="font:400 13px/1.5 Arial,sans-serif;color:#3f443c;padding:3px 0;">✓ Your ${esc(w.toLowerCase())} is in good shape.</div>`).join("")}
      </td></tr>`
    : "";

  const ownerBlock = fromOwner && a.ownerNote
    ? `<tr><td style="padding:16px 22px;background:#fff7ed;border:1px solid #f3d9b0;">
        <div style="font:700 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#9a5b12;margin-bottom:6px;">New lead — Brand Checkup</div>
        <div style="font:400 13.5px/1.6 Arial,sans-serif;color:${INK};">
          <b>${esc(a.ownerNote.name || "(no name)")}</b> &nbsp;·&nbsp; <a href="mailto:${esc(a.ownerNote.email)}" style="color:${GREEN};">${esc(a.ownerNote.email)}</a><br>
          Score: <b>${r.scaled}/25</b> — ${esc(band.name)} &nbsp;·&nbsp; Weakest: ${esc(r.sections.filter((s) => s.tier !== "strong").map((s) => s.title).join(", ") || "—")}<br>
          Lead with: ${esc(r.fixes.map((f) => f.svc).join(" → ") || "consult")}.
        </div></td></tr>`
    : "";

  const consultBlock = !fromOwner
    ? `<tr><td style="padding:24px 22px;">
        <div style="background:${GREEN_BG};border:1px solid #dcebbf;border-radius:14px;padding:22px;">
          <div style="font:800 20px Arial,sans-serif;color:${INK};">Want me to take a look?</div>
          <div style="font:400 13.5px/1.55 Arial,sans-serif;color:#3f443c;margin:9px 0 14px;">Book a free 15-minute Brand Checkup call. We'll go through your score together and I'll tell you the 2–3 things to fix first — <b>whether you hire me or not.</b></div>
          <a href="${esc(bookingUrl)}" style="display:inline-block;background:${INK};color:#cdfa3f;font:800 15px Arial,sans-serif;text-decoration:none;padding:13px 24px;border-radius:10px;">📅 Book my free checkup call</a>
          <div style="font:600 13px Arial,sans-serif;color:#3f443c;margin-top:12px;">or call / text <a href="tel:+17707442536" style="color:${INK};">${esc(contactPhone)}</a></div>
        </div></td></tr>`
    : "";

  return `<!DOCTYPE html><html><body style="margin:0;background:#eef0ea;padding:22px 0;">
  <table align="center" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${PAPER};border-radius:16px;overflow:hidden;">
    <!-- header -->
    <tr><td style="background:#1c1f1a;padding:26px 22px;text-align:center;">
      <div style="font:800 12px Arial,sans-serif;letter-spacing:.18em;color:#BFFF00;text-transform:uppercase;">Branding Zombie Designs</div>
      <div style="font:800 24px Arial,sans-serif;color:#fff;margin-top:6px;">Your Brand Checkup</div>
    </td></tr>
    ${fromOwner ? ownerBlock : ""}
    <!-- score hero -->
    <tr><td style="padding:24px 22px 6px;text-align:center;">
      <div style="font:900 54px Arial,sans-serif;color:${bandColor};line-height:1;">${r.scaled}<span style="font:700 18px Arial,sans-serif;color:${MUTED};"> / 25</span></div>
      <div style="display:inline-block;margin-top:10px;background:${bandColor};color:#fff;font:800 13px Arial,sans-serif;text-transform:uppercase;letter-spacing:.03em;padding:5px 14px;border-radius:99px;">${esc(band.name)}</div>
      ${forName ? `<div style="font:600 13.5px Arial,sans-serif;color:#3f443c;margin:14px auto 4px;">Hey ${greeting} —</div>` : ""}
      <div style="font:400 13.5px/1.55 Arial,sans-serif;color:#3f443c;max-width:42ch;margin:${forName ? "2px" : "14px"} auto 0;">${band.copy}</div>
    </td></tr>
    <!-- section breakdown -->
    <tr><td style="padding:14px 22px 6px;">
      <div style="font:700 13px Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:${INK};border-bottom:2px solid ${INK};padding-bottom:8px;">Your brand, section by section</div>
      <table width="100%" cellpadding="0" cellspacing="0">${sectionRows}</table>
    </td></tr>
    ${winsBlock}
    ${fixRows ? `<tr><td style="padding:8px 22px 6px;">
      <div style="font:700 13px Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:${GREEN};margin-bottom:4px;">⚡ Your 3 fastest fixes</div>
      <div style="font:400 12.5px Arial,sans-serif;color:${MUTED};margin-bottom:6px;">Start here — most impact for the least effort.</div>
      <table width="100%" cellpadding="0" cellspacing="0">${fixRows}</table></td></tr>` : ""}
    ${consultBlock}
    <!-- footer -->
    <tr><td style="padding:18px 22px 26px;text-align:center;border-top:1px solid ${LINE};">
      <div style="font:400 11.5px/1.6 Arial,sans-serif;color:${MUTED};">
        <b style="color:#3f443c;">Branding Zombie Designs</b> — Cumming, Forsyth County &amp; North Metro Atlanta<br>
        <a href="tel:+17707442536" style="color:${GREEN};">${esc(contactPhone)}</a> &nbsp;·&nbsp;
        <a href="mailto:${esc(contactEmail)}" style="color:${GREEN};">${esc(contactEmail)}</a></div>
    </td></tr>
  </table></body></html>`;
}
