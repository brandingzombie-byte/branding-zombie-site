// Light "plain-text look" shell for the Vertical Factory drips.
//
// Deliberately NOT the heavy dark nurture template: the framework rule for
// vertical sequences is a personal, plain email feel — white background,
// system fonts, body copy first. Branding shows up quietly: a toxic-green
// top rule, the real skull icon in the footer, and the darkened brand green
// on links. Footer carries the CAN-SPAM address and unsubscribe link.

const LOGO_URL =
  "https://brandingzombiedesigns.com/assets/Branding_Zombie_Logo_Icon.png";

export interface VerticalEmailOptions {
  preheader: string;
  bodyHtml: string;
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

export function renderVerticalEmail(opts: VerticalEmailOptions): string {
  const address =
    process.env.MAILING_ADDRESS ?? "611 Fountain Lane, Cumming, GA 30040";

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Branding Zombie Designs</title>
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(opts.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <!-- Brand accent rule -->
          <tr>
            <td height="3" bgcolor="#C0ED08" style="height:3px;line-height:3px;font-size:3px;background-color:#C0ED08;">&nbsp;</td>
          </tr>
          <!-- Body copy -->
          <tr>
            <td style="padding:32px 4px 8px 4px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1A1A1A;">
${opts.bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 4px 40px 4px;border-top:1px solid #E4E8E0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="34" valign="top" style="padding-right:10px;">
                    <img src="${LOGO_URL}" width="26" height="26" alt="Branding Zombie Designs skull icon" style="display:block;border:0;width:26px;height:26px;" />
                  </td>
                  <td valign="top" style="font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;color:#8A948A;">
                    Gerry Betancourt &middot; Branding Zombie Designs &middot; (770) 744-2536<br />
                    ${esc(address)}<br />
                    <a href="https://brandingzombiedesigns.com" target="_blank" style="color:#557E00;text-decoration:underline;">brandingzombiedesigns.com</a>
                    &nbsp;&middot;&nbsp;
                    <a href="${esc(opts.unsubscribeUrl)}" target="_blank" style="color:#8A948A;text-decoration:underline;">unsubscribe</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
