"use server";

import { after } from "next/server";
import { EMAIL } from "@/lib/site";
import { enrollLead, splitName } from "@/lib/drip/enroll";

// Newsletter signup from the /play game page. Enrolls the subscriber in the
// Resend nurture audience (same list every lead form feeds — the daily drip
// cron picks them up) and pings the owner. Mirrors the brand-checkup action's
// shape: honeypot, sanitize, validate, never let side effects block the reply.

export type SubscribeState = { ok: boolean; message: string };

const ZERO_WIDTH = /[​-‍﻿]/g;

function sanitize(value: FormDataEntryValue | null, max = 200): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

// Server actions are public endpoints — escape anything interpolated into the
// owner-notify HTML so a crafted "name"/"email" can't inject markup.
function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function notifyOwner(email: string, name: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddr,
        to: [EMAIL],
        reply_to: email,
        subject: `New newsletter signup from the game page (${(name || email).replace(/[\r\n]/g, " ")})`,
        html: `<p><strong>${esc(name) || "Someone"}</strong> (${esc(email)}) subscribed from <a href="https://brandingzombiedesigns.com/play">/play</a> — The Branding Zombie vs The Marketing Menace.</p><p>They were enrolled in the nurture audience.</p>`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[play-subscribe] owner notify failed ${res.status}: ${detail}`);
    }
  } catch (err) {
    console.error("[play-subscribe] owner notify failed:", err);
  }
}

export async function subscribeNewsletter(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot — bots get a quiet "success".
  if (sanitize(formData.get("company_website"))) {
    return { ok: true, message: "You're on the list. Welcome to the horde." };
  }

  const email = sanitize(formData.get("email"), 160);
  const name = sanitize(formData.get("name"), 120);

  if (!email) return { ok: false, message: "Need an email to raise you onto the list." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email looks off — double-check it?" };
  }

  // Both side effects run after the response goes out — enrollment and the
  // owner ping must never block or fail the signup (matches brand-checkup).
  const { first, last } = splitName(name);
  after(async () => {
    await enrollLead(email, first, last); // swallows its own errors, never throws
    await notifyOwner(email, name);
  });

  return { ok: true, message: "You're on the list. Welcome to the horde. 🧟" };
}
