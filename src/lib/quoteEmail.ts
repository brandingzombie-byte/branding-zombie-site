// Renders branded HTML email bodies for the custom-quote request flow.
// Two variants from the same data:
//   - confirmation: sent to the visitor as an auto-reply
//   - owner notification: sent to the business owner with full lead detail
//
// Inline styles only — every email client strips <style>. Palette tokens
// pulled from src/app/globals.css so the look matches the site.

export interface QuoteEmailData {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  servicesPretty: string[];   // human-readable service names (e.g. "Web Design")
  description: string;
  budget?: string;            // e.g. "$3k–$7k"
  timeline?: string;          // e.g. "1–4 weeks"
  attachmentNames: string[];  // for owner email; visitor copy lists them too
  sourcePage?: string;        // service slug they came from, if any
  bookingUrl: string;
  contactPhone: string;
  contactEmail: string;
  siteUrl: string;
}

const PALETTE = {
  grave: "#111714",
  mist: "#D4E7D4",
  fog: "#E8F0E8",
  cloud: "#FFFFFF",
  toxic: "#BFFF00",
  toxicText: "#5A7A00",
  neonText: "#4D7A00",
  text: "#111714",
  textSecondary: "#3B4540",
  dim: "#5A6661",
  hairline: "#C7D6C7",
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value: string): string {
  return esc(value).replace(/\n/g, "<br>");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 16px 10px 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
    <td style="padding:10px 0;font:500 14px/1.55 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};">${value}</td>
  </tr>`;
}

function chipList(items: string[]): string {
  if (items.length === 0) return `<span style="color:${PALETTE.dim};">—</span>`;
  return items
    .map(
      (s) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:999px;background:${PALETTE.fog};color:${PALETTE.text};font:600 12px/1.4 -apple-system,Segoe UI,sans-serif;">${esc(s)}</span>`,
    )
    .join("");
}

function shell(args: { bannerText: string; bannerColor: "toxic" | "grave"; bodyHtml: string; siteUrl: string }): string {
  const banner =
    args.bannerColor === "toxic"
      ? `<div style="background:${PALETTE.toxic};color:${PALETTE.grave};padding:14px 24px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:0.18em;">${esc(args.bannerText)}</div>`
      : `<div style="background:${PALETTE.grave};color:${PALETTE.toxic};padding:14px 24px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:0.18em;">${esc(args.bannerText)}</div>`;

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${PALETTE.fog};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PALETTE.fog};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${PALETTE.cloud};border:1px solid ${PALETTE.hairline};">
        <tr><td>${banner}</td></tr>
        <tr><td style="padding:32px 28px 28px 28px;">${args.bodyHtml}</td></tr>
        <tr><td style="padding:0 28px 28px 28px;border-top:1px solid ${PALETTE.hairline};">
          <p style="margin:20px 0 0 0;font:500 12px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-align:center;">
            Branding Zombie Designs · Cumming, GA · <a href="${esc(args.siteUrl)}" style="color:${PALETTE.neonText};text-decoration:none;">brandingzombiedesigns.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function summaryTable(data: QuoteEmailData): string {
  const rows: string[] = [];
  rows.push(row("Services", chipList(data.servicesPretty)));
  if (data.budget) rows.push(row("Budget", esc(data.budget)));
  if (data.timeline) rows.push(row("Timeline", esc(data.timeline)));
  if (data.attachmentNames.length > 0) {
    rows.push(
      row(
        `Files (${data.attachmentNames.length})`,
        data.attachmentNames.map((n) => esc(n)).join("<br>"),
      ),
    );
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${PALETTE.hairline};border-bottom:1px solid ${PALETTE.hairline};margin:18px 0;">${rows.join("")}</table>`;
}

// ─── VISITOR-FACING CONFIRMATION ─────────────────────────────────────────────
export function renderQuoteConfirmation(data: QuoteEmailData): string {
  const body = `
    <div style="font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.18em;">
      Quote request received
    </div>
    <h1 style="margin:10px 0 0 0;font:700 28px/1.15 Georgia,serif;color:${PALETTE.text};">
      Got it, ${esc(data.name.split(" ")[0] || data.name)}.
    </h1>
    <p style="margin:18px 0 0 0;font:400 16px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.textSecondary};">
      Your custom quote request is in. Gerry will personally read it and get back to you <strong style="color:${PALETTE.text};">within 24 hours</strong> — usually same day. No sales team, no gatekeepers.
    </p>

    <div style="margin:24px 0 0 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;">
      Here's what you sent
    </div>

    ${summaryTable(data)}

    <div style="margin:0 0 6px 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;">
      The brief
    </div>
    <div style="padding:14px 16px;background:${PALETTE.fog};border-left:3px solid ${PALETTE.toxic};font:400 14px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};">
      ${nl2br(data.description)}
    </div>

    <p style="margin:28px 0 0 0;font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.textSecondary};">
      Want to skip the wait and grab time directly?
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0 0 0;">
      <tr><td style="background:${PALETTE.grave};border-radius:999px;">
        <a href="${esc(data.bookingUrl)}" style="display:inline-block;padding:12px 22px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.toxic};text-transform:uppercase;letter-spacing:0.14em;text-decoration:none;">
          Book a free 15-min call →
        </a>
      </td></tr>
    </table>

    <p style="margin:28px 0 0 0;font:400 13px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};">
      Or reach us anytime: <a href="mailto:${esc(data.contactEmail)}" style="color:${PALETTE.neonText};">${esc(data.contactEmail)}</a> · <a href="tel:${esc(data.contactPhone.replace(/[^+\d]/g, ""))}" style="color:${PALETTE.neonText};">${esc(data.contactPhone)}</a>
    </p>
  `;
  return shell({
    bannerText: "Quote request received · Reply within 24 hours",
    bannerColor: "toxic",
    bodyHtml: body,
    siteUrl: data.siteUrl,
  });
}

// ─── OWNER-FACING NOTIFICATION ───────────────────────────────────────────────
export function renderQuoteOwnerNotification(data: QuoteEmailData): string {
  const contactRows: string[] = [];
  contactRows.push(row("Name", esc(data.name)));
  if (data.businessName) contactRows.push(row("Business", esc(data.businessName)));
  contactRows.push(
    row(
      "Email",
      `<a href="mailto:${esc(data.email)}" style="color:${PALETTE.neonText};">${esc(data.email)}</a>`,
    ),
  );
  if (data.phone) {
    contactRows.push(
      row(
        "Phone",
        `<a href="tel:${esc(data.phone.replace(/[^+\d]/g, ""))}" style="color:${PALETTE.neonText};">${esc(data.phone)}</a>`,
      ),
    );
  }
  if (data.sourcePage) contactRows.push(row("From page", esc(`/services/${data.sourcePage}`)));

  const body = `
    <div style="font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.18em;">
      New quote request
    </div>
    <h1 style="margin:10px 0 0 0;font:700 26px/1.2 Georgia,serif;color:${PALETTE.text};">
      ${esc(data.name)}${data.businessName ? ` <span style="color:${PALETTE.dim};font-weight:400;">— ${esc(data.businessName)}</span>` : ""}
    </h1>

    <div style="margin:22px 0 0 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;">
      Contact
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${PALETTE.hairline};border-bottom:1px solid ${PALETTE.hairline};margin:8px 0 18px 0;">${contactRows.join("")}</table>

    <div style="margin:0 0 8px 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;">
      Project summary
    </div>
    ${summaryTable(data)}

    <div style="margin:0 0 6px 0;font:600 11px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.dim};text-transform:uppercase;letter-spacing:0.14em;">
      The brief
    </div>
    <div style="padding:14px 16px;background:${PALETTE.fog};border-left:3px solid ${PALETTE.toxic};font:400 14px/1.6 -apple-system,Segoe UI,sans-serif;color:${PALETTE.text};">
      ${nl2br(data.description)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0 0;">
      <tr><td style="background:${PALETTE.toxic};border-radius:999px;">
        <a href="mailto:${esc(data.email)}?subject=${encodeURIComponent("Re: your quote request")}" style="display:inline-block;padding:12px 22px;font:700 12px/1 -apple-system,Segoe UI,sans-serif;color:${PALETTE.grave};text-transform:uppercase;letter-spacing:0.14em;text-decoration:none;">
          Reply to ${esc(data.name.split(" ")[0] || data.name)} →
        </a>
      </td></tr>
    </table>
  `;
  return shell({
    bannerText: `New lead · ${data.servicesPretty.join(" + ") || "Custom quote"}`,
    bannerColor: "grave",
    bodyHtml: body,
    siteUrl: data.siteUrl,
  });
}
