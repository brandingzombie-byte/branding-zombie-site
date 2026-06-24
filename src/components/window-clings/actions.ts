"use server";

import { EMAIL } from "@/lib/site";

// Server action for the Window Graphics lead form. Same Resend HTTP delivery as
// the mailer / contact forms, but source-tagged (product + city) so window
// leads are distinguishable in the inbox, and reply-to is set to the lead so
// Gerry can reply straight from Gmail.

export type WindowClingsLeadState = {
  ok: boolean;
  message: string;
};

const ZERO_WIDTH = new RegExp("[\\u200B-\\u200D\\uFEFF]", "g");

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

export async function submitWindowClingsLead(
  _prev: WindowClingsLeadState,
  formData: FormData,
): Promise<WindowClingsLeadState> {
  // Honeypot — real users leave this empty; bots fill every field.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = sanitize(formData.get("name"), 120);
  const business = sanitize(formData.get("business"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const projectType = sanitize(formData.get("projectType"), 60);
  const glass = sanitize(formData.get("glass"), 200);
  const install = sanitize(formData.get("install"), 60);
  const message = sanitize(formData.get("message"), 4000);
  // Source tag: which page the lead came from (e.g. "Window Graphics — Cumming, GA").
  const source = sanitize(formData.get("source"), 120) || "Window Graphics";

  if (!name || !email) {
    return { ok: false, message: "Name and email are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: "That email address looks off — double-check it?",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr =
    process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";
  if (!apiKey) {
    console.error("[window-clings] RESEND_API_KEY not set; submission dropped.");
    return {
      ok: false,
      message:
        "Our form is temporarily offline. Call or text us instead — the number's on the page.",
    };
  }

  const subject = `Window graphics lead — ${name}${business ? ` (${business})` : ""} · ${source}`;
  const row = (k: string, v: string, href?: string) =>
    v
      ? `<tr><td style="padding:4px 12px;color:#666;">${k}</td><td>${
          href ? `<a href="${href}">${escapeHtml(v)}</a>` : escapeHtml(v)
        }</td></tr>`
      : "";
  const html = `
    <h2>New window graphics lead</h2>
    <p style="font-family: system-ui, sans-serif; font-size: 13px; color:#888; margin:0 0 16px;">
      Source: ${escapeHtml(source)}
    </p>
    <table style="font-family: system-ui, sans-serif; font-size: 14px; border-collapse: collapse;">
      ${row("Name", name)}
      ${row("Business", business)}
      ${row("Email", email, `mailto:${escapeHtml(email)}`)}
      ${row("Phone", phone, `tel:${escapeHtml(phone)}`)}
      ${row("Project type", projectType)}
      ${row("Windows / where", glass)}
      ${row("Install", install)}
    </table>
    ${
      message
        ? `<p style="font-family: system-ui, sans-serif; font-size: 14px; margin-top: 24px;">
            <strong>Details</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}
          </p>`
        : ""
    }
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
      console.error(`[window-clings] Resend returned ${res.status}: ${detail}`);
      return {
        ok: false,
        message:
          "Something went wrong on our end. Call or text us instead — the number's on the page.",
      };
    }
  } catch (err) {
    console.error("[window-clings] Resend fetch failed:", err);
    return {
      ok: false,
      message:
        "We couldn't reach our mail service. Call or text us instead — the number's on the page.",
    };
  }

  return {
    ok: true,
    message:
      "Got it — your request just landed in our inbox. We'll send a flat quote within one business day, usually same day.",
  };
}
