// Vertical 03 — Salons & Barbershops "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/03-salons-barbershops.md;
// E1's deliverable swapped from the not-yet-built No-Show Cost Calculator to
// the live Brand Checkup PDF (same job: deliver the goods + one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const SALONS: Vertical = {
  slug: "salons",
  name: "Salons & Barbershops",
  tag: "salons",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your brand checkup (+ a free no-show fix)",
      preheader:
        "The 25-point checkup is inside — plus the one booking-system switch that cuts no-shows hard.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your shop is losing bookings online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>Quick free fix while you're at it: turn on booking confirmations plus a 24-hour reminder text in whatever system you use &mdash; that alone typically cuts no-shows hard. And if you're booking through DMs, that's the real leak, and it's fixable.</p>
<p ${P_LAST}>No pitch today. Go flip those on. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the empty chair problem",
      preheader:
        "Regulars keep the lights on — growth comes from the person who just searched 'salon near me.'",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Your regulars keep the lights on. But regulars move, life happens &mdash; growth comes from the person who just moved to Forsyth County and searched &ldquo;salon near me.&rdquo;</p>
<p ${P}>If you're not on that map with photos, prices, and a Book Now button, you don't exist to them. That's not a talent problem. It's a 3-week fix.</p>
<p ${P}>What does your booking path look like right now &mdash; site, app, or DMs? Reply and I'll take a free look.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: 'what "legit, fast" looks like',
      preheader:
        "A brand that matches the work, a site where booking is the first button, and a Google profile that ranks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The shops we build for get three things: a brand that matches the quality of the work, a site where booking is the first button, and a Google profile that actually ranks.</p>
<p ${P}>80+ projects, 5.0 Google rating &mdash; every review on our site links to a real verified review, because that's the standard your clients hold you to as well.</p>
<p ${P}>See the work: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "chairs full, one flat price",
      preheader:
        "Local Business Kit: brand + booking-first site + cards + Google setup. $2,800 flat, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The Local Business Kit: custom logo + brand, 5-page site built around booking, 500 cards, 1,000 rack cards, Google Business setup, basic SEO.</p>
<p ${P}><strong>$2,800 flat</strong> &mdash; that's about $8/day over your first year, and $1,200 less than booking it all separately. 3 payments if easier. Live in 2&ndash;3 weeks.</p>
<p ${P}>Grab 15 minutes: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick gut check",
      preheader: "Top priority, back burner, or off the radar? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Honest answer time: is this top priority, back burner, or off the radar? No wrong answer &mdash; I'd rather know than keep guessing.</p>
<p ${P}>Keep the checkup either way. And if the hesitation is budget, timing, or &ldquo;my cousin said he'd do it&rdquo; &mdash; reply and tell me. I've heard them all and I'll give you a straight answer.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
