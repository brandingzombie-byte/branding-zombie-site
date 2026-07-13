// Shared types + helpers for the Vertical Factory "Resurrection Sequence"
// drips. Each vertical file (01-trades.ts … 09-ecommerce.ts) exports a
// Vertical built from these; the daily /api/drip cron routes contacts in the
// shared "Vertical Customers" audience to their sequence via a [tag] in the
// contact's last-name field (e.g. "Smith [trades]").

export interface VerticalEmail {
  /** 1-based position in the sequence — part of the idempotency key. */
  seq: number;
  /** Days after the contact was created that this email becomes due. */
  dayOffset: number;
  subject: string;
  preheader: string;
  bodyHtml: (firstName?: string) => string;
}

export interface Vertical {
  /** Short id used in idempotency keys and logs, e.g. "trades". */
  slug: string;
  /** Human name, e.g. "Trades & Contractors". */
  name: string;
  /** Bracket tag Gerry types in the contact's last-name field, e.g. "trades". */
  tag: string;
  /**
   * If the Resend plan is ever upgraded, create a dedicated audience per
   * vertical and set its id here — every contact in it gets this sequence
   * with no tag needed. Null = shared-audience routing only.
   */
  dedicatedAudienceId: string | null;
  sequence: VerticalEmail[];
}

// The shared pool audience ("Vertical Customers") scanned for [tag] contacts.
export const SHARED_VERTICAL_AUDIENCE_ID =
  "7282f3bf-d2bd-452f-a0e1-75295ec29886";

// ─── Inline-style fragments for the plain-look shell ────────────────────────
// Framework rule: plain-text look, no heavy templates, ONE link per email max
// (E1's deliverable link excepted). Links use a darkened brand green that
// stays readable on white.
export const P = 'style="margin:0 0 16px 0;"';
export const P_LAST = 'style="margin:0;"';
export const A = 'style="color:#557E00;text-decoration:underline;"';

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function greet(firstName?: string): string {
  return `<p ${P}>Hey ${firstName ? esc(firstName) : "there"},</p>`;
}

/** Extracts the [tag] from a contact's last-name field, lowercased. */
export function parseVerticalTag(lastName?: string): string | null {
  const match = /\[([a-z-]+)\]/i.exec(lastName ?? "");
  return match ? match[1].toLowerCase() : null;
}
