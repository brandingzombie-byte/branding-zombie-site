// Vertical 05 — Gyms & Fitness "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/05-gyms-fitness.md;
// E1's deliverable swapped from the not-yet-built Member Attraction Scorecard
// to the live Brand Checkup PDF (same job: deliver the goods + one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const GYMS: Vertical = {
  slug: "gyms",
  name: "Gyms & Fitness",
  tag: "gyms",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your gym's brand checkup (+ one free fix)",
      preheader:
        "The 25-point checkup is inside — plus the one free move that gets the 10pm 'gym near me' searcher to actually sign up.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your gym is losing members online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>One free fix now: make your trial offer the FIRST button on your site and Instagram bio &mdash; not &ldquo;About Us,&rdquo; not &ldquo;Our Story.&rdquo; The person deciding at 10pm needs one obvious next step. That change alone moves the needle.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the franchise can't do this",
      preheader:
        "They have the budget. You have a face, a story, and members whose lives actually changed.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The franchise gym has budget. You have a face, a story, and members whose lives actually changed. That's unfair leverage &mdash; if your brand and site make room for it.</p>
<p ${P}>Most local gym sites read like a facilities brochure: equipment list, beige everything. The gyms that win locally sell the community and the coach.</p>
<p ${P}>How often are you personally on camera right now? Reply honest.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "what a gym brand looks like when it works",
      preheader:
        "Personality is the algorithm hack — attitude, an unmissable trial, and a content system that runs itself.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>For fitness clients I build around one idea: personality is the algorithm hack.</p>
<p ${P}>Brand identity with actual attitude, a site where the trial is unmissable, spotlight templates so member wins post themselves, and the four-pillar content system so you're never staring at a blank caption.</p>
<p ${P}>80+ projects, verified 5.0 rating: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the whole gym brand, one number",
      preheader:
        "Growth Kit: brand + trial-first site + GBP + 20 templates. $4,500 flat, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The Growth Kit: brand identity, 10-page site (trial-first), Google Business optimization, 20 branded social templates, on-page SEO + analytics, CMS training.</p>
<p ${P}><strong>$4,500</strong> &mdash; vs $6,500+ booked separately. Split into 3 payments of $1,500 if that's easier. Live in 2&ndash;3 weeks &mdash; before the next enrollment wave.</p>
<p ${P}>I take 5 clients a month so every project gets my full attention.</p>
<p ${P}>Want your slot? Reply or grab 15 min: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick gut check, coach",
      preheader: "Top priority, back burner, or off the radar? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Real talk: is fixing your gym's brand top priority, back burner, or off the radar right now? No wrong answer.</p>
<p ${P}>Keep the checkup and the four-pillar system either way &mdash; run them yourself and you'll still be ahead of the franchise. And if something specific is in the way, reply and tell me.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
