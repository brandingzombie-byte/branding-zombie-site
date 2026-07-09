// Adds a lead to the Resend "New Leads — Nurture" audience so the daily
// /api/drip cron picks them up. Called fire-and-forget from every lead-form
// server action — enrollment must NEVER block or fail a form submission, so
// every error path here is swallowed (logged only).

export async function enrollLead(
  email: string,
  firstName?: string,
  lastName?: string,
): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_NURTURE_AUDIENCE_ID;
    if (!apiKey || !audienceId) {
      console.error(
        "[drip-enroll] RESEND_API_KEY or RESEND_NURTURE_AUDIENCE_ID not set; lead not enrolled.",
      );
      return;
    }

    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          unsubscribed: false,
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[drip-enroll] Resend returned ${res.status}: ${detail}`);
    }
  } catch (err) {
    console.error("[drip-enroll] enrollment failed:", err);
  }
}

/** Splits a single full-name form field into Resend's first/last shape. */
export function splitName(fullName: string): { first?: string; last?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  return { first: parts[0], last: parts.slice(1).join(" ") || undefined };
}
