// One-click unsubscribe endpoint for the nurture drip.
//
// Every drip email links here as ?e=<email>&t=<token> where the token is
// hex HMAC-SHA256(email, UNSUB_SECRET) — no database, no guessable IDs, and
// nobody can unsubscribe someone else without the secret. GET serves the
// human click from the email footer; POST serves RFC 8058 one-click
// unsubscribe (the List-Unsubscribe-Post header) from mail clients.

import { createHmac, timingSafeEqual } from "node:crypto";
import {
  SHARED_VERTICAL_AUDIENCE_ID,
  VERTICALS,
} from "@/lib/drip/verticals";

// Marks the contact unsubscribed in one audience. Returns false (quietly)
// when the contact simply isn't in that audience.
async function unsubscribeFromAudience(
  apiKey: string,
  audienceId: string,
  email: string,
): Promise<boolean> {
  // Resend supports addressing a contact by email in place of its id.
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unsubscribed: true }),
      },
    );
    if (res.ok) return true;
    if (res.status !== 404) {
      const detail = await res.text().catch(() => "");
      console.error(`[unsubscribe] PATCH by email ${res.status}: ${detail}`);
    }
  } catch (err) {
    console.error("[unsubscribe] PATCH by email failed:", err);
  }

  // Fallback: paginate the audience to find the contact id, then PATCH by id.
  try {
    let after: string | undefined;
    for (let pageNo = 0; pageNo < 50; pageNo++) {
      const params = new URLSearchParams({ limit: "100" });
      if (after) params.set("after", after);
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts?${params}`,
        { headers: { Authorization: `Bearer ${apiKey}` } },
      );
      if (!res.ok) break;
      const body = (await res.json()) as {
        data?: { id: string; email: string }[];
        has_more?: boolean;
      };
      const batch = body.data ?? [];
      const match = batch.find(
        (c) => c.email.toLowerCase() === email.toLowerCase(),
      );
      if (match) {
        const patch = await fetch(
          `https://api.resend.com/audiences/${audienceId}/contacts/${match.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ unsubscribed: true }),
          },
        );
        return patch.ok;
      }
      if (batch.length < 100 || body.has_more === false) break;
      after = batch[batch.length - 1].id;
    }
  } catch (err) {
    console.error("[unsubscribe] Fallback lookup failed:", err);
  }
  return false;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validToken(email: string, token: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(email).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(token, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

// Minimal branded page in the site's grave/neon palette. Inline everything —
// this renders once and never needs the app shell.
function page(args: { title: string; body: string; status: number }): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${esc(args.title)} — Branding Zombie Designs</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:64px auto;padding:40px 36px;background:#111714;border-top:2px solid #C0ED08;">
    <img src="https://brandingzombiedesigns.com/assets/Branding_Zombie_Logo_Icon.png" width="44" height="44" alt="Branding Zombie Designs" style="display:block;border:0;" />
    <h1 style="margin:22px 0 0 0;font-family:'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:900;font-size:26px;line-height:1.2;color:#F5FAF5;">${esc(args.title)}</h1>
    <p style="margin:16px 0 0 0;font-size:15px;line-height:1.65;color:#B8C0B8;">${args.body}</p>
    <p style="margin:28px 0 0 0;font-size:12px;line-height:1.7;color:#8A948A;">
      Branding Zombie Designs &middot; Cumming, GA &middot;
      <a href="https://brandingzombiedesigns.com" style="color:#C0ED08;text-decoration:underline;">brandingzombiedesigns.com</a>
    </p>
  </div>
</body>
</html>`;
  return new Response(html, {
    status: args.status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function unsubscribe(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const email = url.searchParams.get("e") ?? "";
  const token = url.searchParams.get("t") ?? "";

  const secret = process.env.UNSUB_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_NURTURE_AUDIENCE_ID;
  if (!secret || !apiKey || !audienceId) {
    console.error(
      "[unsubscribe] Missing UNSUB_SECRET, RESEND_API_KEY, or RESEND_NURTURE_AUDIENCE_ID.",
    );
    return page({
      title: "Something went sideways",
      body: `We couldn't process that just now. Email <a href="mailto:hello@brandingzombiedesigns.com" style="color:#C0ED08;text-decoration:underline;">hello@brandingzombiedesigns.com</a> with "unsubscribe" and we'll handle it by hand.`,
      status: 500,
    });
  }

  if (!email || !token || !validToken(email, token, secret)) {
    return page({
      title: "That link didn't check out",
      body: `The unsubscribe link looks incomplete or expired. Email <a href="mailto:hello@brandingzombiedesigns.com" style="color:#C0ED08;text-decoration:underline;">hello@brandingzombiedesigns.com</a> with "unsubscribe" and we'll take care of it.`,
      status: 400,
    });
  }

  // A drip recipient can live in the nurture audience, the shared vertical
  // audience, or (later) a dedicated vertical audience — unsubscribe them
  // everywhere they appear. Success = at least one audience updated.
  const audienceIds = [
    audienceId,
    SHARED_VERTICAL_AUDIENCE_ID,
    ...VERTICALS.map((v) => v.dedicatedAudienceId).filter(
      (id): id is string => id !== null,
    ),
  ];
  let ok = false;
  for (const aud of audienceIds) {
    if (await unsubscribeFromAudience(apiKey, aud, email)) ok = true;
  }

  if (!ok) {
    console.error(`[unsubscribe] Could not unsubscribe ${email}.`);
    return page({
      title: "Something went sideways",
      body: `We couldn't process that just now. Email <a href="mailto:hello@brandingzombiedesigns.com" style="color:#C0ED08;text-decoration:underline;">hello@brandingzombiedesigns.com</a> with "unsubscribe" and we'll handle it by hand.`,
      status: 500,
    });
  }

  console.log(`[unsubscribe] ${email} unsubscribed from the nurture drip.`);
  return page({
    title: "You're out — no hard feelings",
    body: `<strong style="color:#F5FAF5;">${esc(email)}</strong> won't get any more emails from this series. No groaning, no guilt trip. If you ever want back in, just grab a resource on the site again.`,
    status: 200,
  });
}

export async function GET(request: Request) {
  return unsubscribe(request);
}

// RFC 8058 one-click unsubscribe — mail clients POST to the same URL.
export async function POST(request: Request) {
  return unsubscribe(request);
}
