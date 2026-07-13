// Vertical 06 — Auto & Repair "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/06-auto-repair.md;
// E1's deliverable swapped from the not-yet-built Missed-Call Revenue
// Calculator to the live Brand Checkup PDF (same job: deliver the goods +
// one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const AUTO: Vertical = {
  slug: "auto",
  name: "Auto & Repair",
  tag: "auto",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your shop checkup (+ the missed-call fix)",
      preheader:
        "The 25-point checkup is inside — plus the near-free fix that saves the jobs that go to voicemail.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your shop is losing jobs online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>Free fix today: set up a missed-call auto-text &mdash; &ldquo;In the bay, text me what's going on and I'll get right back.&rdquo; Costs almost nothing, saves jobs that would've called the next shop. Do that this week.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the trust gap",
      preheader:
        "Nobody drives over anymore without checking the phone first — here's what they're checking for.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Auto repair runs on trust, and today trust is verified on a phone before anyone drives over. Reviews, real photos, straight pricing on a clean site &mdash; that's what &ldquo;honest shop&rdquo; looks like online.</p>
<p ${P}>The good news: unlike reputation, this is buildable fast.</p>
<p ${P}>What comes up when you Google your own shop right now? Try it, then reply and tell me what you saw.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "what verifiable looks like",
      preheader:
        "A site that answers your service writer's 5 questions, real photos, one-tap reviews, and a form that catches jobs while your hands are busy.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>For shops I build: a site that answers the 5 questions your service writer repeats all day, a Google profile loaded with real photos, a one-tap review link for your regulars, and a quote-request form that catches jobs while your hands are busy.</p>
<p ${P}>80+ local projects, 5.0 verified rating: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the trust kit, one price",
      preheader:
        "Local Business Kit: $2,800 flat, zero hidden fees, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Local Business Kit: logo + identity, 5-page site, 500 cards, Google Business setup, basic SEO. <strong>$2,800 flat</strong> &mdash; about $8/day over year one, $1,200 less than piecing it together. 3 payments if easier. Live in 2&ndash;3 weeks.</p>
<p ${P}>Need booking/quote forms and the AI chat? Growth Kit is $4,500.</p>
<p ${P}>15 minutes and I'll tell you which fits: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick honesty check",
      preheader:
        "Top priority, back burner, or off the radar? No wrong answer — the checkup's yours either way.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Straight up: top priority, back burner, or off the radar? No wrong answer &mdash; keep the checkup and the missed-call fix either way.</p>
<p ${P}>If the hesitation is &ldquo;we're slammed&rdquo; &mdash; that's exactly when the phone leaks worst.</p>
<p ${P_LAST}>Reply whenever. &mdash; Gerry</p>`,
    },
  ],
};
