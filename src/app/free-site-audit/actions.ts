"use server";

import { CALENDLY_URL, EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { fetchSite, runChecks } from "@/lib/audit/checks";
import { renderAuditEmail, renderOwnerSummary } from "@/lib/audit/renderEmail";
import type { AuditResult } from "@/lib/audit/types";

// Server action invoked by AuditForm. Fetches the URL, runs the 6-pillar
// audit, sends two emails via Resend (visitor + owner), and returns the
// rendered AuditResult so the client can show it inline.
//
// Designed to mirror the contact-form action pattern: useActionState
// signature, honeypot, sanitize, escapeHtml-equivalent, single Resend
// HTTP call per email.

export type AuditState = {
  ok: boolean;
  message: string;
  result?: AuditResult;
};

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

function sanitize(value: FormDataEntryValue | null, max = 1000): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

function normalizeUrl(input: string): string | null {
  if (!input) return null;
  let candidate = input.trim();
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    // Block local/private hosts. We do not want this tool to scan
    // internal infrastructure.
    const host = u.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^127\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

async function sendResend(args: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: args.to,
        reply_to: args.replyTo,
        subject: args.subject,
        html: args.html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export async function runPulseCheck(
  _prev: AuditState,
  formData: FormData,
): Promise<AuditState> {
  // Honeypot.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Done — check your inbox." };
  }

  const name = sanitize(formData.get("name"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const rawUrl = sanitize(formData.get("url"), 400);

  if (!name || !email || !phone || !rawUrl) {
    return {
      ok: false,
      message: "Need your name, email, phone, and the URL to check.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email looks off — double-check it?" };
  }

  const url = normalizeUrl(rawUrl);
  if (!url) {
    return {
      ok: false,
      message:
        "That URL didn't parse. Try the full address — e.g. yourdomain.com.",
    };
  }

  const snap = await fetchSite(url);
  if (!snap.ok && !snap.html) {
    return {
      ok: false,
      message:
        "We couldn't reach that site. It may be blocking bots or temporarily down — call us and we'll check it manually.",
    };
  }

  const result = runChecks(snap);

  // ─── Email out ────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";

  if (!apiKey) {
    console.error("[audit] RESEND_API_KEY not set; emails skipped.");
    // Still return the result so the visitor sees their report inline.
    return {
      ok: true,
      message:
        "Report ready below. (We couldn't email a copy — please screenshot or save the page.)",
      result,
    };
  }

  const visitorHtml = renderAuditEmail({
    result,
    forName: name,
    fromOwner: false,
    bookingUrl: CALENDLY_URL,
    contactPhone: PHONE_DISPLAY,
    contactEmail: EMAIL,
  });

  const ownerNote = `${renderOwnerSummary(result, { name, email, phone })}`;
  const ownerHtml = renderAuditEmail({
    result,
    forName: name,
    fromOwner: true,
    ownerNote,
    bookingUrl: CALENDLY_URL,
    contactPhone: PHONE_DISPLAY,
    contactEmail: EMAIL,
  });

  // Fire both emails in parallel. We don't fail the whole submission if
  // one fails — the visitor still has the inline report.
  const [visitorResp, ownerResp] = await Promise.all([
    sendResend({
      apiKey,
      from: fromAddr,
      to: [email],
      replyTo: EMAIL,
      subject: `Your Pulse Check: ${result.overallScore}/100 — ${result.overallPulse}`,
      html: visitorHtml,
    }),
    sendResend({
      apiKey,
      from: fromAddr,
      to: [EMAIL],
      replyTo: email,
      subject: `New lead — Pulse Check ${result.overallScore}/100 (${result.finalUrl})`,
      html: ownerHtml,
    }),
  ]);

  if (!visitorResp.ok) console.error("[audit] visitor email failed:", visitorResp.error);
  if (!ownerResp.ok) console.error("[audit] owner email failed:", ownerResp.error);

  return {
    ok: true,
    message: visitorResp.ok
      ? "Report below — and a copy is in your inbox."
      : "Report below. (Email delivery hiccup — save this page or screenshot it.)",
    result,
  };
}
