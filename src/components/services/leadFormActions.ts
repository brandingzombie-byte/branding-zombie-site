"use server";

import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { EMAIL } from "@/lib/site";
import { enrollLead, splitName } from "@/lib/drip/enroll";
import { leadValueFor } from "./leadFormCopy";

// Server action behind the per-service micro lead form (ServiceLeadForm).
// Same Resend HTTP pattern as src/app/contact/actions.ts — no SDK, no extra
// deps. Requires RESEND_API_KEY in the deploy environment.
//
// The difference from the contact form: ONE contact field that accepts a
// phone number OR an email, plus a preferred-callback method. Most people
// on a service page want a call, not a typing exercise.

export type PreferredContact = "call" | "text" | "email";

export type ServiceLeadState = {
  ok: boolean;
  message: string;
  // Set ONLY on a genuine lead (not the honeypot decoy). The client fires
  // generate_lead gated on leadId, and uses it as the GA4 transaction_id so
  // resubmits/remounts dedupe. value comes from the service's copy map.
  leadId?: string;
  value?: number;
};

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

/** Strict check — gates reply_to and drip enrollment. */
function isEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

function normalizePreferred(value: string): PreferredContact {
  return value === "text" || value === "email" ? value : "call";
}

const PREFERRED_LABEL: Record<PreferredContact, string> = {
  call: "Phone call",
  text: "Text message",
  email: "Email",
};

export async function submitServiceLead(
  _prev: ServiceLeadState,
  formData: FormData,
): Promise<ServiceLeadState> {
  // Honeypot — real users leave this empty; bots fill every field. Return a
  // convincing success WITHOUT a leadId so no analytics event fires.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = sanitize(formData.get("name"), 120);
  const contact = sanitize(formData.get("contact"), 160);
  const preferred = normalizePreferred(sanitize(formData.get("preferred"), 20));
  const message = sanitize(formData.get("message"), 1000);
  const service = sanitize(formData.get("service"), 80);
  const serviceName = sanitize(formData.get("serviceName"), 120) || "Services";

  if (!name) {
    return { ok: false, message: "We need a name — even a nickname works." };
  }
  if (!contact) {
    return {
      ok: false,
      message:
        preferred === "email"
          ? "Drop an email address in there and we'll write back."
          : "We need a number or an email — otherwise we're just shouting into the void.",
    };
  }
  // Only hard-fail the one combination that can't work: "email me back" with
  // something that clearly isn't an email. A phone number typed under "call
  // me" is accepted as-is; so is an email, so is anything in between.
  if (preferred === "email" && !contact.includes("@")) {
    return {
      ok: false,
      message:
        "That doesn't look like an email. Add one, or switch to Call me / Text me above.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";
  if (!apiKey) {
    // Missing env var — log internally, don't leak the reason to the user.
    console.error("[service-lead] RESEND_API_KEY not set; form submission dropped.");
    return {
      ok: false,
      message:
        "Our form is playing dead. Call or text (770) 744-2536 and we'll pick up.",
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const contactIsEmail = isEmail(contact);
  const contactHref = contactIsEmail
    ? `mailto:${escapeHtml(contact)}`
    : `tel:${escapeHtml(contact.replace(/[^\d+]/g, ""))}`;

  const subject = `[${serviceName}] Quick ${preferred}-back request — ${name}`;
  const html = `
    <h2>New ${escapeHtml(serviceName)} lead from brandingzombiedesigns.com</h2>
    <table style="font-family: system-ui, sans-serif; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding:4px 12px;color:#666;">Service</td><td>${escapeHtml(serviceName)}${service ? ` (${escapeHtml(service)})` : ""}</td></tr>
      <tr><td style="padding:4px 12px;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px;color:#666;">Contact</td><td><a href="${contactHref}">${escapeHtml(contact)}</a></td></tr>
      <tr><td style="padding:4px 12px;color:#666;">Prefers</td><td><strong>${PREFERRED_LABEL[preferred]}</strong></td></tr>
      <tr><td style="padding:4px 12px;color:#666;">Submitted</td><td>${escapeHtml(submittedAt)} ET</td></tr>
    </table>
    ${
      message
        ? `<p style="font-family: system-ui, sans-serif; font-size: 14px; margin-top: 24px;">
      <strong>Message</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}
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
        // Only a real address can be replied to — a phone number here would
        // bounce every reply Gerry sends.
        ...(contactIsEmail ? { reply_to: contact } : {}),
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[service-lead] Resend returned ${res.status}: ${detail}`);
      return {
        ok: false,
        message:
          "Something died on the way to the inbox. Call or text (770) 744-2536 instead.",
      };
    }
  } catch (err) {
    console.error("[service-lead] Resend fetch failed:", err);
    return {
      ok: false,
      message:
        "Something died on the way to the inbox. Call or text (770) 744-2536 instead.",
    };
  }

  // Fire-and-forget: enroll this lead in the nurture drip after the response
  // goes out. Drip needs a real email address — phone-only leads skip it.
  if (contactIsEmail) {
    try {
      const { first, last } = splitName(name);
      after(() => enrollLead(contact, first, last));
    } catch (err) {
      console.error("[service-lead] drip enrollment scheduling failed:", err);
    }
  }

  return {
    ok: true,
    message:
      "Got it — you're on the list of the living. We'll reach out within one business day, usually a lot faster.",
    leadId: randomUUID(),
    value: leadValueFor(service),
  };
}
