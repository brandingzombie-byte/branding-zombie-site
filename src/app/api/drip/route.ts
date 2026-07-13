// Daily drip engine — runs every automated sequence BZD sends:
//
//  1. "Back From the Dead" nurture (10 emails / 31 days) for every contact
//     in the Resend "New Leads — Nurture" audience.
//  2. The Vertical Factory "Resurrection Sequences" (5 emails / 12 days per
//     industry) for contacts in the shared "Vertical Customers" audience,
//     routed by the [tag] in each contact's last-name field (e.g. "[trades]").
//     Verticals can also point at a dedicated audience id if the Resend plan
//     ever grows past the 3-audience cap.
//
// Hit by the Vercel cron in vercel.json (0 14 * * * = 10am ET; Hobby plan
// fires within ~1h after). For each contact, works out how many days they've
// been enrolled and sends whatever just came due. A 2-day catch-up window
// tolerates a missed run; the Resend sent-log dedupe (recipient + subject
// over the last 3 days) is the primary double-send guard because idempotency
// keys only live 24h, shorter than the cron jitter can stretch.
//
// Auth: Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically
// when the CRON_SECRET env var is set. Anything else is a hard 401 — the
// route sends real email, so it must not be publicly triggerable.

import { createHmac } from "node:crypto";
import { EMAIL, SITE_URL } from "@/lib/site";
import { renderDripEmail } from "@/lib/drip/emailShell";
import { DRIP_SEQUENCE } from "@/lib/drip/sequence";
import { renderVerticalEmail } from "@/lib/drip/verticalShell";
import {
  SHARED_VERTICAL_AUDIENCE_ID,
  VERTICALS,
  parseVerticalTag,
  verticalByTag,
} from "@/lib/drip/verticals";
import type { Vertical, VerticalEmail } from "@/lib/drip/verticals";

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

interface RunSummary {
  checked: number;
  sent: number;
  skipped: number;
  deduped: number;
  unrouted: number;
  errors: number;
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

// Map of "email|subject" → newest send timestamp (ms) over the last
// `sinceMs`. This sent log is the engine's only memory:
//  - Dedupe: an email|subject that already appears is never sent again
//    (Resend idempotency keys only live 24h — shorter than Hobby-plan cron
//    jitter can stretch — so the key alone can't stop a duplicate).
//  - Vertical progression: Resend contact records are GLOBAL per email
//    address, so `created_at` reflects when the contact first entered ANY
//    audience — useless for sequencing someone re-added later. Verticals
//    instead advance off the timestamp of the last sequence email actually
//    sent (see Program 2 below).
async function listRecentSends(
  apiKey: string,
  sinceMs: number,
): Promise<Map<string, number>> {
  const sent = new Map<string, number>();
  const cutoff = Date.now() - sinceMs;
  let after: string | undefined;

  for (let page = 0; page < 30; page++) {
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
      const at = new Date(email.created_at).getTime();
      if (at < cutoff) {
        reachedCutoff = true;
        break;
      }
      for (const to of email.to ?? []) {
        const key = `${to.toLowerCase()}|${email.subject ?? ""}`;
        // Newest-first pages: first sighting is the latest send.
        if (!sent.has(key)) sent.set(key, at);
      }
    }
    if (reachedCutoff || batch.length < 100 || body.has_more === false) break;
    after = batch[batch.length - 1].id;
  }
  return sent;
}

interface DueEmail {
  idempotencyKey: string;
  subject: string;
  html: string;
  unsubUrl: string;
}

async function sendDue(
  apiKey: string,
  contact: ResendContact,
  email: DueEmail,
  summary: RunSummary,
): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Same-day backstop against double-sends; the sent-log dedupe in the
        // caller is the primary guard.
        "Idempotency-Key": email.idempotencyKey,
      },
      body: JSON.stringify({
        from: FROM,
        to: [contact.email],
        reply_to: EMAIL,
        subject: email.subject,
        html: email.html,
        headers: {
          "List-Unsubscribe": `<mailto:${EMAIL}?subject=unsubscribe>, <${email.unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    });
    if (res.ok) {
      summary.sent++;
    } else {
      const detail = await res.text().catch(() => "");
      console.error(
        `[drip] Send failed (${email.idempotencyKey}) ${res.status}: ${detail}`,
      );
      summary.errors++;
    }
  } catch (err) {
    console.error(`[drip] Send failed (${email.idempotencyKey}):`, err);
    summary.errors++;
  }

  await sleep(SEND_GAP_MS);
}

/** Days since the contact was added to the audience, or null if unparseable. */
function daysEnrolled(contact: ResendContact, now: number): number | null {
  const created = new Date(contact.created_at).getTime();
  if (Number.isNaN(created)) return null;
  return Math.floor((now - created) / DAY_MS);
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

  let nurtureContacts: ResendContact[];
  try {
    nurtureContacts = await listContacts(apiKey, audienceId);
  } catch (err) {
    console.error("[drip] Failed to list audience contacts:", err);
    return Response.json({ error: "Audience fetch failed" }, { status: 502 });
  }

  // Fail closed: without the sent log we can't rule out duplicates, and a
  // skipped run self-heals tomorrow via the catch-up window.
  let recentSends: Map<string, number>;
  try {
    // 60-day lookback: long enough to hold a full nurture (31d) or vertical
    // (12d) run with room to spare, so "not in the log" reliably means
    // "never sent" for progression purposes.
    recentSends = await listRecentSends(apiKey, 60 * DAY_MS);
  } catch (err) {
    console.error("[drip] Failed to list recent sends:", err);
    return Response.json({ error: "Sent-log fetch failed" }, { status: 502 });
  }

  const summary: RunSummary = {
    checked: 0,
    sent: 0,
    skipped: 0,
    deduped: 0,
    unrouted: 0,
    errors: 0,
  };
  const now = Date.now();

  // ── Program 1: "Back From the Dead" nurture ───────────────────────────────
  for (const contact of nurtureContacts) {
    summary.checked++;
    if (contact.unsubscribed) {
      summary.skipped++;
      continue;
    }

    const days = daysEnrolled(contact, now);
    if (days === null) {
      console.error(`[drip] Bad created_at for contact ${contact.id}; skipped.`);
      summary.errors++;
      continue;
    }

    // Everything that came due in the last 2 days — the window means one
    // missed cron run self-heals the next day.
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

      await sendDue(
        apiKey,
        contact,
        {
          idempotencyKey: `drip-${contact.id}-${entry.seq}`,
          subject: entry.subject,
          html,
          unsubUrl,
        },
        summary,
      );
    }
  }

  // ── Program 2: Vertical Factory sequences ─────────────────────────────────
  // Pools to scan: the shared tagged audience + any dedicated audiences.
  const pools: { contacts: ResendContact[]; fixed: Vertical | null }[] = [];

  try {
    pools.push({
      contacts: await listContacts(apiKey, SHARED_VERTICAL_AUDIENCE_ID),
      fixed: null,
    });
  } catch (err) {
    console.error("[drip] Failed to list Vertical Customers audience:", err);
    summary.errors++;
  }

  for (const vertical of VERTICALS) {
    if (!vertical.dedicatedAudienceId) continue;
    try {
      pools.push({
        contacts: await listContacts(apiKey, vertical.dedicatedAudienceId),
        fixed: vertical,
      });
    } catch (err) {
      console.error(`[drip] Failed to list ${vertical.slug} audience:`, err);
      summary.errors++;
    }
  }

  for (const pool of pools) {
    for (const contact of pool.contacts) {
      summary.checked++;
      if (contact.unsubscribed) {
        summary.skipped++;
        continue;
      }

      let vertical = pool.fixed;
      if (!vertical) {
        const tag = parseVerticalTag(contact.last_name);
        vertical = (tag && verticalByTag(tag)) || null;
        if (!vertical) {
          // A contact Gerry added without a recognizable [tag] — surface it
          // in the summary so a spot check catches the typo.
          console.error(
            `[drip] No vertical tag on contact ${contact.email} (last_name: "${contact.last_name ?? ""}"); not routed.`,
          );
          summary.unrouted++;
          continue;
        }
      }

      // Progression-based scheduling: Resend contact records are global per
      // email address, so created_at is when this person FIRST entered any
      // audience — for a long-time contact re-added with a vertical tag,
      // enrollment-date math would mark every send window as already passed
      // and silently send nothing. Instead: no sequence email in the log →
      // start with E1 now; otherwise send the next email once the gap
      // between its dayOffset and the last one's has elapsed since the last
      // actual send. At most one email per contact per daily run, which
      // matches the sequence's minimum 2-day gap.
      const emailKey = contact.email.toLowerCase();
      const sentSoFar: { entry: VerticalEmail; at: number }[] = [];
      for (const entry of vertical.sequence) {
        const at = recentSends.get(`${emailKey}|${entry.subject}`);
        if (typeof at === "number") sentSoFar.push({ entry, at });
      }

      let next = vertical.sequence[0];
      let readyAt = 0;
      if (sentSoFar.length > 0) {
        const last = sentSoFar.reduce((a, b) =>
          b.entry.seq > a.entry.seq ? b : a,
        );
        const following = vertical.sequence.find(
          (e) => e.seq === last.entry.seq + 1,
        );
        if (!following) {
          // Sequence complete.
          summary.skipped++;
          continue;
        }
        next = following;
        readyAt =
          last.at + (following.dayOffset - last.entry.dayOffset) * DAY_MS;
      }

      if (now < readyAt) {
        summary.skipped++;
        continue;
      }

      const unsubUrl = unsubscribeUrl(contact.email, unsubSecret);
      const html = renderVerticalEmail({
        preheader: next.preheader,
        bodyHtml: next.bodyHtml(contact.first_name?.trim() || undefined),
        unsubscribeUrl: unsubUrl,
      });

      await sendDue(
        apiKey,
        contact,
        {
          idempotencyKey: `drip-${vertical.slug}-${contact.id}-${next.seq}`,
          subject: next.subject,
          html,
          unsubUrl,
        },
        summary,
      );
    }
  }

  console.log(
    `[drip] Run complete — checked ${summary.checked}, sent ${summary.sent}, skipped ${summary.skipped}, deduped ${summary.deduped}, unrouted ${summary.unrouted}, errors ${summary.errors}.`,
  );
  return Response.json(summary);
}
