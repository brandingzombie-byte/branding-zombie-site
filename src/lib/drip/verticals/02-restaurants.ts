// Vertical 02 — Restaurants "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/02-restaurants.md;
// E1's deliverable swapped from the not-yet-built Plate-Cost Calculator
// to the live Brand Checkup PDF (same job: deliver the goods + one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const RESTAURANTS: Vertical = {
  slug: "restaurants",
  name: "Restaurants",
  tag: "restaurants",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your brand checkup (find the vampire)",
      preheader:
        "The 25-point checkup is inside — plus the 3-minute Google-hours fix that stops angry one-star reviews.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll find where your restaurant is quietly losing money online: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>. Run it top to bottom &mdash; that's where the margin leaks hide.</p>
<p ${P}>One quick win while you're at it: check your Google hours right now. Wrong hours are the #1 source of angry one-star reviews for restaurants, and it takes 3 minutes to fix.</p>
<p ${P_LAST}>No pitch. Go cook. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "the 30% you're donating",
      preheader:
        "Same food, same customer — wildly different margin depending on whose site takes the order.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Every order through a third-party app costs you up to 30%. Every order through your own site costs you the card fee. Same food, same customer &mdash; wildly different margin.</p>
<p ${P}>We built Papa's Kitchen Diner (local, family-owned) their own ordering plus a subscription their regulars actually use. The tech isn't the hard part &mdash; making it feel like YOUR place is.</p>
<p ${P}>What's your current ordering setup? Reply, I'll tell you honestly if it's costing you.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "what Sandra said",
      preheader:
        "A verified Google review from a local restaurant and coffee shop, word for word.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>&ldquo;Branding Zombie redid our terrible website in a very short time. Gerry &lsquo;got it&rsquo; immediately&hellip; even grabbed pics from Facebook so we'd have basic stuff up.&rdquo; &mdash; Sandra Allen, local restaurant &amp; coffee shop, verified Google review.</p>
<p ${P}>That's the experience: I move fast, I fill gaps without homework for you, and you talk to me &mdash; not a call center.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the whole meal, one price",
      preheader:
        "Growth Kit for restaurants: brand, site, online ordering path, email list. $4,500, live in 2–3 weeks.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Growth Kit for restaurants: brand refresh, 10-page site with your menu done RIGHT, online ordering path, Google Business optimization, 20 social templates, email list setup + training.</p>
<p ${P}><strong>$4,500</strong> &mdash; vs $6,500+ separately. 3 payments of $1,500 works too. Live in 2&ndash;3 weeks, before your next busy season, not after.</p>
<p ${P}>5 clients/month: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "quick gut check",
      preheader: "Top priority, back burner, or off the radar? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Straight up &mdash; is the website/ordering thing top priority, back burner, or off the radar? No wrong answer.</p>
<p ${P}>If it's later, keep the checkup and the fixes with my compliments. If something's holding you back, hit reply &mdash; even if it's &ldquo;money's tight until fall.&rdquo; I'd rather know than guess.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
