// Vertical 08 — Medical & Wellness "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/08-medical-wellness.md;
// E1's deliverable swapped from the not-yet-built New-Patient Leak Audit to
// the live free site audit (same job: show where prospective patients drop
// off between search, site, and booking). Trust vertical: copy stays
// conservative — no hype, no medical claims.

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const MEDICAL: Vertical = {
  slug: "medical",
  name: "Medical & Wellness",
  tag: "medical",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your new-patient leak audit",
      preheader:
        "Your free audit is inside — plus the one homepage fix that catches the 9pm decision-maker.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your audit is ready &mdash; it shows where prospective patients drop off between search, your site, and booking: <a href="${SITE_URL}/free-site-audit" ${A}>run it here</a>.</p>
<p ${P}>One fix today: make &ldquo;Book an appointment&rdquo; the first button on your homepage &mdash; above the mission statement, above the welcome paragraph. The 9pm decision-maker needs one obvious step, and most practice sites bury it.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the 7-second referral",
      preheader:
        "A referral is now a name from a friend, immediately Googled. What shows up decides everything.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>A referral used to be a name from a friend. Now it's a name from a friend, immediately Googled.</p>
<p ${P}>Thin reviews + a 2016-era site can undo the warmest recommendation in seconds. None of it reflects your care quality &mdash; it just decides whether new patients ever experience it.</p>
<p ${P}>Try it yourself: search your practice like a new patient would. What shows up? Reply and tell me.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "credible AND memorable",
      preheader:
        "A practice brand can be warm, modern, and memorable while staying every bit as credible.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>For practices I build: a warm, professional identity that isn't beige; a site where booking is unmissable and new-patient questions are answered upfront; provider bios with real faces; a review system your front desk can run in one tap; and local SEO built for how people search in 2026 &mdash; Google and AI answers both.</p>
<p ${P}>Verified 5.0 rating, 80+ projects: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the practice refresh, one number",
      preheader:
        "Growth Kit: brand + 10-page site + Google optimization. $4,500 flat, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The Growth Kit: brand identity, 10-page site, Google Business optimization, on-page SEO + analytics, 20 social templates, CMS training.</p>
<p ${P}><strong>$4,500 flat</strong> &mdash; vs $6,500+ separately, 3 payments available. Live in 2&ndash;3 weeks, minimal time from you or your staff.</p>
<p ${P}>15 minutes to see if it fits: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick pulse check",
      preheader:
        "Top priority, back burner, or off the radar this quarter? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Is the website/booking project top priority, back burner, or off the radar this quarter? No wrong answer &mdash; practices run on tight schedules and I'd rather know than guess.</p>
<p ${P}>Keep the audit either way, and if there's a specific blocker (software, partners, budget cycle), reply and I'll work around it.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
