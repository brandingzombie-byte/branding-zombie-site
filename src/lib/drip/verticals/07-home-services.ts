// Vertical 07 — Home Services "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/07-home-services.md;
// E1's deliverable swapped from the not-yet-built Instant Estimate Calculator
// (home services reskin) to the live Brand Checkup PDF (same job: deliver the
// goods + one quick win). Subjects reworded where the kit mirrored trades.

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const HOME_SERVICES: Vertical = {
  slug: "home",
  name: "Home Services",
  tag: "home",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your home services checkup (+ one ranking fix)",
      preheader:
        "The 25-point checkup is inside — plus the one free ranking fix that beats a generic 'Areas We Serve' list.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your business is losing jobs online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>Free fix while you're at it: create one service-area page per city you cover &mdash; even a simple &ldquo;Plumbing in Suwanee, GA&rdquo; page. Google matches local searches to local pages; one generic &lsquo;Areas We Serve&rsquo; list can't compete. Start with your two best cities this week.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "renting leads vs. owning the pipe",
      preheader:
        "Platform leads get sold to 3 of your competitors. A ranked site of your own costs nothing per lead, forever.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Platform leads: you pay per lead, share it with 3 competitors, and race to the phone.</p>
<p ${P}>Your own ranked site: the homeowner found YOU, trusts you before the call, and costs you nothing per lead forever. Building the pipe takes 2&ndash;3 weeks plus some SEO patience &mdash; then it compounds while platform costs just repeat.</p>
<p ${P}>What % of your jobs come from platforms right now? Reply &mdash; I'll tell you honestly if the math favors switching.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "what owning it looks like",
      preheader:
        "Brand, city-by-city pages, instant-estimate form, GBP, email — and local proof like Sharp Edge Construction.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>The build: a brand that matches your workmanship, city-by-city service pages, an instant-estimate form above the fold, Google Business optimization, and an email setup that turns summer customers into fall tune-ups.</p>
<p ${P}>Local proof: Sharp Edge Construction and 80+ more at <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a> &mdash; every review verified.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the pipe, one price",
      preheader:
        "Growth Kit: $4,500 flat, 3 payments if easier, live in 2–3 weeks — the rented-leads budget, redirected into something you own.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Growth Kit: <strong>$4,500 flat</strong> (vs $6,500+ separately), 3 payments of $1,500 if easier, live in 2&ndash;3 weeks.</p>
<p ${P}>Then if you want the phone to keep getting louder: local SEO from $499/mo &mdash; that's the rented-leads budget, redirected into something you own.</p>
<p ${P}>5 clients/month, 15 minutes to claim a slot: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "top priority or back burner?",
      preheader: "Or off the radar entirely? No wrong answer — just tell me straight.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Top priority, back burner, or off the radar? No wrong answer.</p>
<p ${P}>If it's &ldquo;after busy season,&rdquo; fair &mdash; reply with a month and I'll circle back then instead of cluttering your inbox. Keep the checkup and the service-page fix either way.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
