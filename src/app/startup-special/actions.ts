"use server";

import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { CALENDLY_URL, EMAIL, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from "@/lib/site";
import { enrollLead, splitName } from "@/lib/drip/enroll";

// ─── Server action for the Startup Special booking form ────────────────────
// Captures a lead, sends two emails via Resend (visitor confirmation + owner
// notification), and returns success state with a Calendly link so the
// visitor can grab a slot in the same flow.
//
// Mirrors src/app/free-site-audit/actions.ts: useActionState signature,
// honeypot, sanitize, single Resend HTTP call per email, never fail the
// whole submission if email delivery hiccups.

export type BookingState = {
  ok: boolean;
  message: string;
  calendlyUrl?: string;
  // Set only on a genuine booking lead (not the honeypot). $997 offer → value 997.
  leadId?: string;
  value?: number;
};

const ZERO_WIDTH = /[​-‍﻿]/g;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: FormDataEntryValue | null, max = 1000): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

// ─── Email bodies ──────────────────────────────────────────────────────────
function renderVisitorEmail(args: { name: string }): string {
  const safeName = escapeHtml(args.name);
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F5FAF5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#333">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5FAF5;padding:40px 16px">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid rgba(31,41,33,0.08);border-radius:12px;overflow:hidden">
        <tr><td style="background:#111714;padding:24px 32px;border-bottom:1px solid #BFFF00">
          <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#DFFF66;font-weight:600">Branding Zombie · Cumming GA</div>
          <div style="margin-top:6px;font-size:18px;color:#F0F4F0;font-weight:600">Your Startup Special slot is held.</div>
        </td></tr>
        <tr><td style="padding:32px">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6">Hey ${safeName},</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6">
            Got your Open Sign Startup Kit request. One of five slots this month is
            soft-held in your name for the next 48 hours.
          </p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6">
            Next step: grab a 30-minute kickoff call. No pressure, no slides —
            we'll confirm your launch date and the 10-day window.
          </p>
          <p style="margin:0 0 28px">
            <a href="${CALENDLY_URL}" style="display:inline-block;background:#BFFF00;color:#111714;text-decoration:none;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;font-size:13px;padding:14px 24px;border-radius:999px">
              Pick your kickoff slot →
            </a>
          </p>
          <hr style="border:none;border-top:1px solid rgba(31,41,33,0.08);margin:24px 0">
          <p style="margin:0 0 6px;font-size:13px;color:#566856">Or just reply to this email — we read every one.</p>
          <p style="margin:0;font-size:13px;color:#566856">
            Call: <a href="${PHONE_HREF}" style="color:#4D7A00;text-decoration:none">${PHONE_DISPLAY}</a>
            &nbsp;·&nbsp;
            Mail: <a href="mailto:${EMAIL}" style="color:#4D7A00;text-decoration:none">${EMAIL}</a>
          </p>
        </td></tr>
        <tr><td style="background:#F5FAF5;padding:18px 32px;border-top:1px solid rgba(31,41,33,0.08);font-size:11px;color:#5C6E60">
          Branding Zombie Designs · Cumming, GA · ${SITE_URL}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function renderOwnerEmail(args: {
  name: string;
  email: string;
  phone: string;
  business: string;
  launching: string;
}): string {
  const rows = [
    ["Name", args.name],
    ["Email", `<a href="mailto:${escapeHtml(args.email)}" style="color:#4D7A00">${escapeHtml(args.email)}</a>`],
    ["Phone", `<a href="tel:${escapeHtml(args.phone.replace(/[^\d+]/g, ""))}" style="color:#4D7A00">${escapeHtml(args.phone)}</a>`],
    ["Business", args.business ? escapeHtml(args.business) : "<em style='color:#7E8C82'>(not given)</em>"],
    ["Launching", args.launching ? escapeHtml(args.launching).replace(/\n/g, "<br>") : "<em style='color:#7E8C82'>(not given)</em>"],
  ];
  const rowsHtml = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 0;width:120px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7E8C82;vertical-align:top">${k}</td>
          <td style="padding:10px 0;font-size:14px;color:#111714;vertical-align:top">${v}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F5FAF5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#333">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5FAF5;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid rgba(31,41,33,0.08);border-radius:12px;overflow:hidden">
        <tr><td style="background:#111714;padding:18px 24px;border-bottom:2px solid #BFFF00">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#DFFF66;font-weight:600">New Lead · Startup Special</div>
          <div style="margin-top:4px;font-size:16px;color:#F0F4F0;font-weight:600">${escapeHtml(args.name)} — ${escapeHtml(args.business || "no business name")}</div>
        </td></tr>
        <tr><td style="padding:8px 24px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rowsHtml}
          </table>
        </td></tr>
        <tr><td style="background:#F5FAF5;padding:14px 24px;border-top:1px solid rgba(31,41,33,0.08);font-size:11px;color:#5C6E60">
          Source: /startup-special form · ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Action ────────────────────────────────────────────────────────────────
export async function bookStartupSpecial(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Honeypot — bots fill all fields, humans skip this hidden one.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — we'll be in touch.", calendlyUrl: CALENDLY_URL };
  }

  const name = sanitize(formData.get("name"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const business = sanitize(formData.get("business"), 160);
  const launching = sanitize(formData.get("launching"), 1200);

  if (!name) {
    return { ok: false, message: "Please add your name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "That email doesn't look right. Try again?" };
  }
  if (!phone || phone.replace(/\D/g, "").length < 7) {
    return { ok: false, message: "We need a phone we can actually reach you on." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";

  if (!apiKey) {
    console.error("[startup-special] RESEND_API_KEY not set; emails skipped.", {
      source: "startup_special",
      name, email, phone, business: business || null, launching: launching || null,
    });
    // Still hand the visitor off to Calendly — they came to book.
    return {
      ok: true,
      message: "Got it. Now grab a slot — we'll have your project notes when you show up.",
      calendlyUrl: CALENDLY_URL,
      leadId: randomUUID(),
      value: 997,
    };
  }

  const [visitorResp, ownerResp] = await Promise.all([
    sendResend({
      apiKey,
      from: fromAddr,
      to: [email],
      replyTo: EMAIL,
      subject: "Your Startup Special slot is held — pick a kickoff time",
      html: renderVisitorEmail({ name }),
    }),
    sendResend({
      apiKey,
      from: fromAddr,
      to: [EMAIL],
      replyTo: email,
      subject: `New lead — Startup Special: ${name}${business ? ` (${business})` : ""}`,
      html: renderOwnerEmail({ name, email, phone, business, launching }),
    }),
  ]);

  if (!visitorResp.ok) console.error("[startup-special] visitor email failed:", visitorResp.error);
  if (!ownerResp.ok) console.error("[startup-special] owner email failed:", ownerResp.error);

  // Fire-and-forget: enroll this lead in the nurture drip audience after the
  // response goes out. Enrollment must never block or fail the submission.
  try {
    const { first, last } = splitName(name);
    after(() => enrollLead(email, first, last));
  } catch (err) {
    console.error("[startup-special] drip enrollment scheduling failed:", err);
  }

  return {
    ok: true,
    message: visitorResp.ok
      ? "Got it. Confirmation in your inbox — now grab a kickoff slot."
      : "Got it. (Email delivery hiccup — go ahead and grab a slot, we'll see your details there.)",
    calendlyUrl: CALENDLY_URL,
    leadId: randomUUID(),
    value: 997,
  };
}
