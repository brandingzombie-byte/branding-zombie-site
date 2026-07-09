// TypeScript port of the "Back From the Dead" nurture shell
// (Email Marketing/template/bzd-email-shell.html). Dark "grave" card on a
// void background, neon CTA, zombie-hand accent in a white rounded panel.
//
// Layout is 100% nested tables + inline styles — the <style> block carries
// dark-mode hinting only, nothing structural. Mirrors the HTML-in-TS
// conventions of src/lib/quoteEmail.ts.

export interface DripEmailOptions {
  /** 40–90 chars of plain text shown next to the subject in inbox previews. */
  preheader: string;
  /** Plain text — renders as the big Arial Black h1. */
  headline: string;
  /** One or more inline-styled <p> blocks (see sequence.ts for the pattern). */
  bodyHtml: string;
  /** Absolute URL of the hosted zombie-hand PNG (decorative, alt=""). */
  handImageUrl: string;
  /** Short button label, ~2–5 words. Uppercased by CSS. */
  ctaText: string;
  ctaUrl: string;
  /** A styled <p> block, or empty string to omit (leaves benign padding). */
  psHtml: string;
  /** Per-recipient unsubscribe URL (also sent as List-Unsubscribe header). */
  unsubscribeUrl: string;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderDripEmail(opts: DripEmailOptions): string {
  // CAN-SPAM physical mailing address. Set MAILING_ADDRESS in the deploy
  // environment; falls back to the city line until Gerry provides one.
  const mailingAddress = process.env.MAILING_ADDRESS ?? "Cumming, GA";

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Branding Zombie Designs</title>
  <style type="text/css">
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body { margin: 0; padding: 0; }
    a { color: #C0ED08; }
  </style>
</head>
<body bgcolor="#0A0A0A" style="margin:0;padding:0;background-color:#0A0A0A;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;color:#0A0A0A;">
    ${esc(opts.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer wrapper: void -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0A0A0A" style="background-color:#0A0A0A;">
    <tr>
      <td align="center" style="padding:28px 12px 40px 12px;">

        <!-- Card: grave -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#111714" style="max-width:600px;width:100%;background-color:#111714;">

          <!-- Neon top border -->
          <tr>
            <td height="2" bgcolor="#C0ED08" style="height:2px;line-height:2px;font-size:2px;background-color:#C0ED08;">&nbsp;</td>
          </tr>

          <!-- Header: logo + wordmark -->
          <tr>
            <td align="left" style="padding:28px 36px 8px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="padding:0 14px 0 0;">
                    <a href="https://brandingzombiedesigns.com" target="_blank" style="text-decoration:none;">
                      <img src="https://brandingzombiedesigns.com/assets/Branding_Zombie_Logo_Icon.png" width="52" height="52" alt="Branding Zombie Designs" style="display:block;border:0;width:52px;height:52px;" />
                    </a>
                  </td>
                  <td valign="middle">
                    <a href="https://brandingzombiedesigns.com" target="_blank" style="text-decoration:none;">
                      <span style="font-family:'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:900;font-size:15px;line-height:1.2;letter-spacing:0.16em;color:#F5FAF5;text-transform:uppercase;">Branding&nbsp;Zombie</span><br />
                      <span style="font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:10px;line-height:1.6;letter-spacing:0.42em;color:#C0ED08;text-transform:uppercase;">Designs</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="left" style="padding:26px 36px 0 36px;">
              <h1 style="margin:0;font-family:'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:900;font-size:28px;line-height:1.2;letter-spacing:0.01em;color:#F5FAF5;">${esc(opts.headline)}</h1>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td align="left" style="padding:18px 36px 6px 36px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#F5FAF5;">
              ${opts.bodyHtml}
            </td>
          </tr>

          <!-- Zombie hand accent (decorative) -->
          <tr>
            <td align="center" style="padding:10px 36px 6px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:16px;padding:8px;">
                    <img src="${esc(opts.handImageUrl)}" width="140" alt="" aria-hidden="true" style="display:block;border:0;width:140px;height:auto;border-radius:10px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA button (bulletproof padded td) -->
          <tr>
            <td align="center" style="padding:14px 36px 8px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#C0ED08" style="background-color:#C0ED08;border-radius:8px;">
                    <a href="${esc(opts.ctaUrl)}" target="_blank" style="display:inline-block;padding:15px 34px;font-family:'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:900;font-size:14px;line-height:1;letter-spacing:0.1em;text-transform:uppercase;color:#11120b;text-decoration:none;border-radius:8px;">${esc(opts.ctaText)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- P.S. block (optional — empty string leaves benign padding) -->
          <tr>
            <td align="left" style="padding:18px 36px 8px 36px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#B8C0B8;">
              ${opts.psHtml}
            </td>
          </tr>

          <!-- Hairline above footer -->
          <tr>
            <td style="padding:20px 36px 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="1" bgcolor="#26302A" style="height:1px;line-height:1px;font-size:1px;background-color:#26302A;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 36px 30px 36px;">
              <img src="https://brandingzombiedesigns.com/assets/Branding_Zombie_Logo_Icon.png" width="28" height="28" alt="Branding Zombie Designs skull icon" style="display:inline-block;border:0;width:28px;height:28px;" />
              <p style="margin:12px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.7;color:#8A948A;">
                Branding Zombie Designs &middot; ${esc(mailingAddress)}<br />
                <a href="tel:+17707442536" style="color:#8A948A;text-decoration:none;">(770) 744-2536</a> &middot;
                <a href="https://brandingzombiedesigns.com" target="_blank" style="color:#C0ED08;text-decoration:underline;">brandingzombiedesigns.com</a>
              </p>
              <p style="margin:14px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.7;color:#8A948A;">
                You're getting this because you reached out to us or grabbed a resource on our site.<br />
                <a href="${esc(opts.unsubscribeUrl)}" target="_blank" style="color:#B8C0B8;text-decoration:underline;">Unsubscribe</a> any time &mdash; no hard feelings, no groaning.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
