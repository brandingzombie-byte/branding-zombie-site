"use server";

import { EMAIL } from "@/lib/site";

// Server action invoked by the contact form. Sends the lead directly to the
// owner's inbox via Resend's HTTP API — no SDK needed, keeps the dependency
// surface small. Requires RESEND_API_KEY in the deploy environment.

export type ContactState = {
  ok: boolean;
  message: string;
};

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

function sanitize(value: FormDataEntryValue | null, max = 1000): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — real users leave this empty; bots fill every field.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = sanitize(formData.get("name"), 120);
  const business = sanitize(formData.get("business"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const message = sanitize(formData.get("message"), 4000);

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Name, email, and a short note are required.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email address looks off — double-check it?" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";
  if (!apiKey) {
    // Missing env var — log internally, don't leak the reason to the user.
    console.error("[contact] RESEND_API_KEY not set; form submission dropped.");
    return {
      ok: false,
      message:
        "Our form is temporarily offline. Please call or email us directly — details above.",
    };
  }

  const subject = `Website lead — ${name}${business ? ` (${business})` : ""}`;
  const html = `
    <h2>New lead from brandingzombiedesigns.com</h2>
    <table style="font-family: system-ui, sans-serif; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding:4px 12px;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
      ${business ? `<tr><td style="padding:4px 12px;color:#666;">Business</td><td>${escapeHtml(business)}</td></tr>` : ""}
      <tr><td style="padding:4px 12px;color:#666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 12px;color:#666;">Phone</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>` : ""}
    </table>
    <p style="font-family: system-ui, sans-serif; font-size: 14px; margin-top: 24px;">
      <strong>Message</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}
    </p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] Resend returned ${res.status}: ${detail}`);
      return {
        ok: false,
        message:
          "Something went wrong on our end. Please call or email us directly — details above.",
      };
    }
  } catch (err) {
    console.error("[contact] Resend fetch failed:", err);
    return {
      ok: false,
      message:
        "We couldn't reach our mail service. Please call or email us directly — details above.",
    };
  }

  return {
    ok: true,
    message:
      "Got it — your note is in our inbox. We'll be in touch within one business day (usually same day).",
  };
}
