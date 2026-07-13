// Vertical 04 — Supplements & CPG "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/04-supplements-cpg.md;
// E1's deliverable swapped from the not-yet-built Shelf-Readiness Checklist
// to the live Fit Founder Blueprint PDF (same job: deliver the goods + one
// quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const SUPPLEMENTS: Vertical = {
  slug: "supplements",
  name: "Supplements & CPG",
  tag: "supplements",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your fit founder blueprint",
      preheader:
        "The blueprint is inside — plus the one email to send your co-packer today before any more design work happens.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Fit Founder Blueprint</strong> is ready &mdash; my guide for supplement founders on getting a product from idea to shelf without burning money: <a href="${SITE_URL}/downloads/BZD-Fit-Founder-Blueprint.pdf" ${A}>download it here</a>.</p>
<p ${P}>Do one thing today: email your co-packer for the official dieline BEFORE any more design work happens. Designing to a guessed dieline is the single most expensive mistake in CPG &mdash; I've watched it burn five-figure print runs.</p>
<p ${P_LAST}>No pitch. Protect your money first. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "designer vs. operator",
      preheader:
        "Most designers have never reformatted a Supplement Facts panel at 11pm before a print deadline.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Most designers have never stood in a co-packer's facility or reformatted a Supplement Facts panel at 11pm before a print deadline.</p>
<p ${P}>I co-founded Betancourt Nutrition &mdash; built the brand, produced the labels, lived the margins. When I design your packaging I'm thinking about compliance, print specs, shelf contrast, and your Amazon thumbnail simultaneously.</p>
<p ${P}>Where are you in your launch &mdash; concept, pre-print, or fixing something that went wrong? Reply, genuinely curious.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "napkin sketch → retail shelf",
      preheader:
        "What the Shelf-Ready Package looks like in practice — 30+ brands launched.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The Shelf-Ready Package in practice: brand discovery, label &amp; packaging design to YOUR product specs, claims/compliance review, print-ready production files your printer accepts first try, direct vendor coordination, and photorealistic 3D renders for listings and pitch decks before you've printed a unit.</p>
<p ${P}>30+ brands launched. See the work: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "one engagement, everything to launch",
      preheader:
        "Shelf-Ready Package: from $5,000 per product line, scope confirmed on a 15-min call.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Shelf-Ready Package: <strong>from $5,000 per product line</strong>, scope and timeline confirmed on a 15-min discovery call.</p>
<p ${P}>If a rushed freelancer already burned you once, you know the cheap version costs more.</p>
<p ${P}>Let's look at your product together: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick gut check",
      preheader:
        "Moving now, parked for a quarter, or shelved? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Where does the launch actually sit &mdash; moving now, parked for a quarter, or shelved? No wrong answer.</p>
<p ${P}>Keep the blueprint regardless, and if you're stuck on something specific (co-packer? claims? money?), reply and ask. I answer these for founders all the time &mdash; the operator fraternity thing is real.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
