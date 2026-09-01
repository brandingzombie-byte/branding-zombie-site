"use server";

import { after } from "next/server";
import { EMAIL } from "@/lib/site";
import { enrollLead, splitName } from "@/lib/drip/enroll";

// Server action for the Martial Arts Gym & Fitness Studio Branding lead form.
// Same Resend HTTP delivery as the tattoo / window-clings / mailer / contact
// forms, but source-tagged (product + city) so these leads are distinguishable
// in the inbox, and reply-to is set to the lead so Gerry can reply straight
// from Gmail. Mirrors src/components/tattoo/actions.ts.

export type MartialArtsLeadState = {
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

export async function submitMartialArtsLead(
  _prev: MartialArtsLeadState,
  formData: FormData,
): Promise<MartialArtsLeadState> {
  // Honeypot — real users leave this empty; bots fill every field.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = sanitize(formData.get("name"), 120);
  const gymName = sanitize(formData.get("gymName"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const audience = sanitize(formData.get("audience"), 60);
  // "What do you need?" — may be a comma-joined list of checkbox values.
  const needs = formData
    .getAll("needs")
    .map((v) => sanitize(v, 60))
    .filter(Boolean)
    .join(", ");
  const message = sanitize(formData.get("message"), 4000);
  // Source tag: which page the lead came from (e.g. "Martial Arts & Gym Branding — Cumming, GA").
  const source =
    sanitize(formData.get("source"), 120) || "Martial Arts & Gym Branding";

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
    console.error("[martial-arts] RESEND_API_KEY not set; submission dropped.");
    return {
      ok: false,
      message:
        "Our form is temporarily offline. Call or text us instead — the number's on the page.",
    };
  }

  const subject = `Gym/dojo brand lead — ${name}${gymName ? ` (${gymName})` : ""} · ${source}`;
  const row = (k: string, v: string, href?: string) =>
    v
      ? `<tr><td style="padding:4px 12px;color:#666;">${k}</td><td>${
          href ? `<a href="${href}">${escapeHtml(v)}</a>` : escapeHtml(v)
        }</td></tr>`
      : "";
  const html = `
    <h2>New martial arts / gym branding lead</h2>
    <p style="font-family: system-ui, sans-serif; font-size: 13px; color:#888; margin:0 0 16px;">
      Source: ${escapeHtml(source)}
    </p>
    <table style="font-family: system-ui, sans-serif; font-size: 14px; border-collapse: collapse;">
      ${row("Name", name)}
      ${row("Gym / school", gymName)}
      ${row("Email", email, `mailto:${escapeHtml(email)}`)}
      ${row("Phone", phone, `tel:${escapeHtml(phone)}`)}
      ${row("Type", audience)}
      ${row("Needs", needs)}
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
      console.error(`[martial-arts] Resend returned ${res.status}: ${detail}`);
      return {
        ok: false,
        message:
          "Something went wrong on our end. Call or text us instead — the number's on the page.",
      };
    }
  } catch (err) {
    console.error("[martial-arts] Resend fetch failed:", err);
    return {
      ok: false,
      message:
        "We couldn't reach our mail service. Call or text us instead — the number's on the page.",
    };
  }

  // Fire-and-forget: enroll this lead in the nurture drip audience after the
  // response goes out. Enrollment must never block or fail the submission.
  try {
    const { first, last } = splitName(name);
    after(() => enrollLead(email, first, last));
  } catch (err) {
    console.error("[martial-arts] drip enrollment scheduling failed:", err);
  }

  return {
    ok: true,
    message:
      "Got it — your brand teardown request just landed in our inbox. We'll get back to you within one business day, usually same day.",
  };
}
