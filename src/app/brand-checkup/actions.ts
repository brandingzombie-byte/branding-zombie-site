"use server";

import { CALENDLY_URL, EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { computeResult, emptyAnswers, SECTIONS, type Answers } from "@/lib/brand-checkup/data";
import { renderCheckupEmail } from "@/lib/brand-checkup/renderEmail";

// Server action invoked from the results screen of the Brand Checkup quiz when
// the visitor opts to have their report emailed. Scoring happens client-side
// for the on-screen result; here we RE-SCORE from the submitted answers (never
// trust a client-sent score) and email the report to the visitor + a copy to
// the owner. Mirrors the free-site-audit runPulseCheck action.

export type CheckupState = { ok: boolean; message: string };

const ZERO_WIDTH = /[​-‍﻿]/g;

function sanitize(value: FormDataEntryValue | null, max = 1000): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

// Parse + hard-validate the answers payload so a malformed/oversized body can't
// blow up scoring. Returns clean Answers limited to known section keys/indexes.
function parseAnswers(raw: string): Answers | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const out = emptyAnswers();
  for (const s of SECTIONS) {
    const entry = (data as Record<string, unknown>)[s.key];
    if (!entry || typeof entry !== "object") continue;
    const yes = (entry as { yes?: unknown }).yes;
    const skip = (entry as { skip?: unknown }).skip;
    const clean = (arr: unknown): number[] =>
      Array.isArray(arr)
        ? [...new Set(arr.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < s.q.length))]
        : [];
    out[s.key] = { yes: clean(yes), skip: clean(skip) };
    // A skipped item can't also be a "yes".
    out[s.key].yes = out[s.key].yes.filter((i) => !out[s.key].skip.includes(i));
  }
  return out;
}

async function sendResend(args: {
  apiKey: string; from: string; to: string[]; replyTo?: string; subject: string; html: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${args.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: args.from, to: args.to, reply_to: args.replyTo, subject: args.subject, html: args.html,
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

export async function emailCheckup(
  _prev: CheckupState,
  formData: FormData,
): Promise<CheckupState> {
  // Honeypot — silently "succeed".
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "On its way — check your inbox." };
  }

  const email = sanitize(formData.get("email"), 160);
  const name = sanitize(formData.get("name"), 120);
  const rawAnswers = sanitize(formData.get("answers"), 4000);

  if (!email) return { ok: false, message: "Need an email to send your report to." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email looks off — double-check it?" };
  }

  const answers = parseAnswers(rawAnswers);
  if (!answers) {
    return { ok: false, message: "Couldn't read your answers — retake the checkup and try again." };
  }
  const result = computeResult(answers);

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";

  if (!apiKey) {
    console.error("[brand-checkup] RESEND_API_KEY not set; email skipped.");
    return { ok: false, message: "Email isn't set up yet — call us and we'll walk through it." };
  }

  const visitorHtml = renderCheckupEmail({
    result, forName: name, fromOwner: false,
    bookingUrl: CALENDLY_URL, contactPhone: PHONE_DISPLAY, contactEmail: EMAIL,
  });
  const ownerHtml = renderCheckupEmail({
    result, forName: name, fromOwner: true, ownerNote: { name, email },
    bookingUrl: CALENDLY_URL, contactPhone: PHONE_DISPLAY, contactEmail: EMAIL,
  });

  const [visitorResp, ownerResp] = await Promise.all([
    sendResend({
      apiKey, from: fromAddr, to: [email], replyTo: EMAIL,
      subject: `Your Brand Checkup: ${result.scaled}/25`,
      html: visitorHtml,
    }),
    sendResend({
      apiKey, from: fromAddr, to: [EMAIL], replyTo: email,
      subject: `New lead — Brand Checkup ${result.scaled}/25 (${name || email})`,
      html: ownerHtml,
    }),
  ]);

  if (!ownerResp.ok) console.error("[brand-checkup] owner email failed:", ownerResp.error);
  if (!visitorResp.ok) {
    console.error("[brand-checkup] visitor email failed:", visitorResp.error);
    return { ok: false, message: "Hit a snag sending it. Call us and we'll send it manually." };
  }

  return { ok: true, message: "On its way! Check your inbox in a minute." };
}
