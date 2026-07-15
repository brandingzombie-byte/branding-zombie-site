"use server";

import { randomUUID } from "node:crypto";
import { EMAIL } from "@/lib/site";

// Server action for the BookLogix author-consult form. Mirrors the contact
// action's Resend delivery, but deliberately skips nurture-drip enrollment —
// these are referred authors, not the SMB audience those emails target.

export type ConsultState = {
  ok: boolean;
  message: string;
  // Set ONLY on a genuine lead (not the honeypot decoy). The client fires
  // generate_lead gated on leadId, and uses it as the GA4 transaction_id so
  // resubmits/remounts dedupe. value/currency give the lead a real weight.
  leadId?: string;
  value?: number;
};

const ZERO_WIDTH = /[​-‍﻿]/g;

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

export async function submitAuthorConsult(
  _prev: ConsultState,
  formData: FormData,
): Promise<ConsultState> {
  // Honeypot — real users leave this empty; bots fill every field.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Got it — thank you!" };
  }

  const name = sanitize(formData.get("name"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const book = sanitize(formData.get("book"), 200);
  const stage = sanitize(formData.get("stage"), 80);
  const message = sanitize(formData.get("message"), 4000);

  if (!name || !email) {
    return {
      ok: false,
      message: "Your name and email are all I need to get started.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email address looks off — double-check it?" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";
  if (!apiKey) {
    console.error("[booklogix] RESEND_API_KEY not set; form submission dropped.");
    return {
      ok: false,
      message:
        "The form is temporarily offline. Please call or email me directly — details are right beside this form.",
    };
  }

  const subject = `Author website lead — ${name}${book ? ` (“${book}”)` : ""} · BookLogix`;
  const html = `
    <h2>New BookLogix author lead from brandingzombiedesigns.com/booklogix</h2>
    <table style="font-family: system-ui, sans-serif; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding:4px 12px;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px;color:#666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 12px;color:#666;">Phone</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>` : ""}
      ${book ? `<tr><td style="padding:4px 12px;color:#666;">Book</td><td>${escapeHtml(book)}</td></tr>` : ""}
      ${stage ? `<tr><td style="padding:4px 12px;color:#666;">Stage</td><td>${escapeHtml(stage)}</td></tr>` : ""}
      <tr><td style="padding:4px 12px;color:#666;">Source</td><td>BookLogix referral funnel (/booklogix)</td></tr>
    </table>
    ${
      message
        ? `<p style="font-family: system-ui, sans-serif; font-size: 14px; margin-top: 24px;">
      <strong>Note from the author</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}
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
      console.error(`[booklogix] Resend returned ${res.status}: ${detail}`);
      return {
        ok: false,
        message:
          "Something went wrong on my end. Please call or email me directly — details are right beside this form.",
      };
    }
  } catch (err) {
    console.error("[booklogix] Resend fetch failed:", err);
    return {
      ok: false,
      message:
        "I couldn't reach the mail service. Please call or email me directly — details are right beside this form.",
    };
  }

  return {
    ok: true,
    message:
      "Your note is in my inbox. I'll read it personally and get back to you within one business day — usually the same day.",
    leadId: randomUUID(),
    value: 100,
  };
}
