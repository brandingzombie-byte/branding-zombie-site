// Vertical 01 — Trades & Contractors "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/01-trades-contractors.md;
// E1's deliverable swapped from the not-yet-built Instant Estimate Calculator
// to the live Brand Checkup PDF (same job: deliver the goods + one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const TRADES: Vertical = {
  slug: "trades",
  name: "Trades & Contractors",
  tag: "trades",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your brand checkup (+ one free fix)",
      preheader:
        "The 25-point checkup is inside — plus the single free move that puts you on the map for 'near me' searches.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your business is losing jobs online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>While you're at it &mdash; go claim your Google Business Profile today if you haven't (google.com/business, 10 minutes, free). That single move puts you on the map for the &ldquo;near me&rdquo; searches you're currently invisible in.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the guys with the website",
      preheader:
        "His crew was better. Didn't matter. Storm jobs go to whoever shows up at 9pm.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>A tree service owner told me: &ldquo;we lose the storm work to the guys with the website.&rdquo;</p>
<p ${P}>His crew was better. Didn't matter. Storm jobs, emergency calls, big-ticket removals &mdash; they go to whoever shows up when a homeowner searches at 9pm. That's not a quality contest, it's a findability contest, and it's winnable in about 3 weeks.</p>
<p ${P}>What would being FIRST in local search be worth to your season? Reply and tell me &mdash; genuinely curious.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "local crew, before & after",
      preheader:
        "Sharp Edge Construction — great work, and now a brand that says so before they do.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Sharp Edge Construction &mdash; local trades crew, great work, online presence that didn't show it.</p>
<p ${P}>We built the brand and the site: real job photos, service-area pages, tap-to-call everywhere. That's what &ldquo;big-brand design for small-town businesses&rdquo; means: your work already competes with the big guys, now your brand does too.</p>
<p ${P}>See it plus 80 more projects: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the whole thing, one number",
      preheader:
        "Growth Kit: brand + 10-page site + GBP + estimate form. $4,500 flat, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The Growth Kit: logo + brand identity, 10-page custom site, Google Business optimization, instant-estimate form, on-page SEO, print materials, 3 revision rounds.</p>
<p ${P}><strong>$4,500 flat</strong> &mdash; booked separately it's $6,500+. Split into 3 payments of $1,500 if that's easier. Live in 2&ndash;3 weeks.</p>
<p ${P}>I take 5 clients a month so every project gets my full attention.</p>
<p ${P}>Want your slot? Reply or grab 15 min: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick gut check",
      preheader: "Top priority, back burner, or off the radar? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Be honest with me &mdash; is fixing your online presence top priority, back burner, or off the radar right now?</p>
<p ${P}>No wrong answer, I'd just rather know than keep guessing. If it's &ldquo;later,&rdquo; the checkup and the free fixes are yours to keep. If something's giving you pause, tell me &mdash; we'll figure it out.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
