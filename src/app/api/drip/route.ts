// Daily drip engine for the "Back From the Dead" nurture sequence.
//
// Hit by the Vercel cron in vercel.json (0 14 * * * = 10am ET). For each
// contact in the Resend "New Leads — Nurture" audience, works out how many
// days they've been enrolled and sends any sequence emails that just came
// due. A 2-day catch-up window tolerates a missed cron run; the Resend
// Idempotency-Key guarantees the overlap can never double-send.
//
// Auth: Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically
// when the CRON_SECRET env var is set. Anything else is a hard 401 — the
// route sends real email, so it must not be publicly triggerable.

import { createHmac } from "node:crypto";
import { EMAIL, SITE_URL } from "@/lib/site";
import { renderDripEmail } from "@/lib/drip/emailShell";
import { DRIP_SEQUENCE } from "@/lib/drip/sequence";

export const maxDuration = 60;

const FROM = "Gerry at Branding Zombie <hello@brandingzombiedesigns.com>";
const DAY_MS = 86_400_000;
// Resend rate limit is 2 req/s — space sends ~600ms apart.
const SEND_GAP_MS = 600;

interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  unsubscribed: boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function unsubscribeUrl(email: string, secret: string): string {
  const token = createHmac("sha256", secret).update(email).digest("hex");
  return `${SITE_URL}/api/unsubscribe?e=${encodeURIComponent(email)}&t=${token}`;
}

async function listContacts(
  apiKey: string,
  audienceId: string,
): Promise<ResendContact[]> {
  const contacts: ResendContact[] = [];
  let after: string | undefined;

  // Paginate 100 at a time; bail after a sane page cap so a bad cursor can't
  // loop forever.
  for (let page = 0; page < 50; page++) {
    const params = new URLSearchParams({ limit: "100" });
    if (after) params.set("after", after);
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts?${params}`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend list contacts ${res.status}: ${detail}`);
    }
    const body = (await res.json()) as {
      data?: ResendContact[];
      has_more?: boolean;
    };
    const batch = body.data ?? [];
    contacts.push(...batch);
    if (batch.length < 100 || body.has_more === false) break;
    after = batch[batch.length - 1].id;
  }
  return contacts;
}

// Set of "email|subject" pairs already sent in the last `sinceMs`. The 2-day
// catch-up window re-attempts yesterday's emails, but Resend idempotency keys
// only live 24h — and on the Hobby plan the cron can fire anywhere in a
// ~1-hour window, so consecutive runs can be >24h apart and the key alone
// won't stop a duplicate. This sent-log check is the primary guard; the
// idempotency key stays as a same-day backstop.
async function listRecentSends(
  apiKey: string,
  sinceMs: number,
): Promise<Set<string>> {
  const sent = new Set<string>();
  const cutoff = Date.now() - sinceMs;
  let after: string | undefined;

  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({ limit: "100" });
    if (after) params.set("after", after);
    const res = await fetch(`https://api.resend.com/emails?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend list emails ${res.status}: ${detail}`);
    }
    const body = (await res.json()) as {
      data?: {
        id: string;
        to?: string[] | null;
        subject?: string;
        created_at: string;
      }[];
      has_more?: boolean;
    };
    const batch = body.data ?? [];
    let reachedCutoff = false;
    for (const email of batch) {
      // Newest-first: once we're past the cutoff, everything older is too.
      if (new Date(email.created_at).getTime() < cutoff) {
        reachedCutoff = true;
        break;
      }
      for (const to of email.to ?? []) {
        sent.add(`${to.toLowerCase()}|${email.subject ?? ""}`);
      }
    }
    if (reachedCutoff || batch.length < 100 || body.has_more === false) break;
    after = batch[batch.length - 1].id;
  }
  return sent;
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_NURTURE_AUDIENCE_ID;
  const unsubSecret = process.env.UNSUB_SECRET;
  if (!apiKey || !audienceId || !unsubSecret) {
    console.error(
      "[drip] Missing RESEND_API_KEY, RESEND_NURTURE_AUDIENCE_ID, or UNSUB_SECRET; run skipped.",
    );
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  let contacts: ResendContact[];
  try {
    contacts = await listContacts(apiKey, audienceId);
  } catch (err) {
    console.error("[drip] Failed to list audience contacts:", err);
    return Response.json({ error: "Audience fetch failed" }, { status: 502 });
  }

  // Fail closed: without the sent log we can't rule out duplicates, and a
  // skipped run self-heals tomorrow via the catch-up window.
  let recentSends: Set<string>;
  try {
    recentSends = await listRecentSends(apiKey, 3 * DAY_MS);
  } catch (err) {
    console.error("[drip] Failed to list recent sends:", err);
    return Response.json({ error: "Sent-log fetch failed" }, { status: 502 });
  }

  const summary = { checked: 0, sent: 0, skipped: 0, deduped: 0, errors: 0 };
  const now = Date.now();

  for (const contact of contacts) {
    summary.checked++;
    if (contact.unsubscribed) {
      summary.skipped++;
      continue;
    }

    const created = new Date(contact.created_at).getTime();
    if (Number.isNaN(created)) {
      console.error(`[drip] Bad created_at for contact ${contact.id}; skipped.`);
      summary.errors++;
      continue;
    }
    const days = Math.floor((now - created) / DAY_MS);

    // Everything that came due in the last 2 days — the window means one
    // missed cron run self-heals the next day, and the idempotency key
    // below makes the overlap safe.
    const due = DRIP_SEQUENCE.filter(
      (entry) => entry.dayOffset <= days && entry.dayOffset > days - 2,
    );
    if (due.length === 0) {
      summary.skipped++;
      continue;
    }

    const unsubUrl = unsubscribeUrl(contact.email, unsubSecret);

    for (const entry of due) {
      if (recentSends.has(`${contact.email.toLowerCase()}|${entry.subject}`)) {
        summary.deduped++;
        continue;
      }
      const html = renderDripEmail({
        preheader: entry.preheader,
        headline: entry.headline,
        bodyHtml: entry.bodyHtml(contact.first_name?.trim() || undefined),
        handImageUrl: entry.handImage,
        ctaText: entry.ctaText,
        ctaUrl: entry.ctaUrl,
        psHtml: entry.psHtml,
        unsubscribeUrl: unsubUrl,
      });

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            // Guards against double-sends from the catch-up window overlap.
            "Idempotency-Key": `drip-${contact.id}-${entry.seq}`,
          },
          body: JSON.stringify({
            from: FROM,
            to: [contact.email],
            reply_to: EMAIL,
            subject: entry.subject,
            html,
            headers: {
              "List-Unsubscribe": `<mailto:${EMAIL}?subject=unsubscribe>, <${unsubUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });
        if (res.ok) {
          summary.sent++;
        } else {
          const detail = await res.text().catch(() => "");
          console.error(
            `[drip] Send failed (contact ${contact.id}, seq ${entry.seq}) ${res.status}: ${detail}`,
          );
          summary.errors++;
        }
      } catch (err) {
        console.error(
          `[drip] Send failed (contact ${contact.id}, seq ${entry.seq}):`,
          err,
        );
        summary.errors++;
      }

      await sleep(SEND_GAP_MS);
    }
  }

  console.log(
    `[drip] Run complete — checked ${summary.checked}, sent ${summary.sent}, skipped ${summary.skipped}, deduped ${summary.deduped}, errors ${summary.errors}.`,
  );
  return Response.json(summary);
}
