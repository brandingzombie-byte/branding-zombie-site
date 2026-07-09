// The 10-email "Back From the Dead" nurture sequence. Copy ported verbatim
// from Email Marketing/emails/01-welcome.md … 10-offer.md; each entry renders
// through renderDripEmail (src/lib/drip/emailShell.ts).
//
// Cadence: Day 0, 3, 7, 10, 14, 17, 21, 24, 28, 31 (~5 weeks).
// Emails 1–6 are value-first (soft P.S. links only); 7–10 escalate to direct
// but low-pressure offers.

import { CALENDLY_URL, SITE_URL } from "@/lib/site";

export interface DripSequenceEntry {
  /** 1-based position in the sequence — also the idempotency-key suffix. */
  seq: number;
  /** Days after the contact was created that this email becomes due. */
  dayOffset: number;
  subject: string;
  preheader: string;
  headline: string;
  bodyHtml: (firstName?: string) => string;
  /** Absolute URL of the hosted zombie-hand PNG for the shell accent. */
  handImage: string;
  ctaText: string;
  ctaUrl: string;
  psHtml: string;
}

// ─── Shared inline-style fragments (match the shell's conventions) ──────────
const P = 'style="margin:0 0 16px 0;"';
const P_LAST = 'style="margin:0;"';
const UL = 'style="margin:0 0 16px 0;padding:0 0 0 22px;"';
const OL = 'style="margin:0 0 16px 0;padding:0 0 0 22px;"';
const LI = 'style="margin:0 0 10px 0;"';
const A = 'style="color:#C0ED08;text-decoration:underline;"';
const PS_STRONG = '<strong style="color:#F5FAF5;">P.S.</strong>';

const HANDS = `${SITE_URL}/assets/email/`;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function greet(firstName?: string): string {
  return `<p ${P}>Hey ${firstName ? esc(firstName) : "there"},</p>`;
}

export const DRIP_SEQUENCE: DripSequenceEntry[] = [
  // ─── 1 · Day 0 · Welcome + Brand Checkup delivery ─────────────────────────
  {
    seq: 1,
    dayOffset: 0,
    subject: "Your Brand Checkup is inside (start here)",
    preheader:
      "25 quick checks to score your brand's vital signs — plus what to expect from me. Hint: no daily spam, ever.",
    headline: "Your Brand Checkup is inside",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here, from Branding Zombie Designs in Cumming. You asked, so here it is &mdash; your <strong>Brand Checkup</strong>.</p>
<p ${P}>It's a 25-point self-scoring checklist. Grab a pen, give yourself 10 minutes, and you'll know exactly where your brand is healthy and where it's flatlining. No jargon, no trick questions.</p>
<p ${P}><strong><a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>Download the Brand Checkup PDF</a></strong></p>
<p ${P}>Two things worth knowing before you dive in:</p>
<p ${P}><strong>What to expect from me.</strong> Over the next five weeks I'll send you a short email every few days &mdash; quick fixes, real project breakdowns, straight answers on what this stuff actually costs. Useful whether you ever hire me or not. Unsubscribe anytime, no hard feelings.</p>
<p ${P}><strong>Who's writing this.</strong> One person, not a team with a shared inbox. I've spent 20+ years doing brand, web, and print work &mdash; first for big CPG brands, now for small businesses here in Forsyth County. When you reply, I'm the one who answers.</p>
<p ${P}>Speaking of which: after you score yourself, hit reply and tell me your number. I read every response, and I'll tell you which fix to tackle first &mdash; free, because it takes me two minutes and it's fun.</p>
<p ${P_LAST}>Talk soon,<br />Gerry</p>`,
    handImage: `${HANDS}hand-waving.png`,
    ctaText: "Download your Checkup",
    ctaUrl: `${SITE_URL}/downloads/BZD-Brand-Checkup.pdf`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Scored lower than you'd like? I do a free, no-pitch site audit &mdash; takes me a day, takes you <a href="${SITE_URL}/free-site-audit" ${A}>one click</a>.</p>`,
  },

  // ─── 2 · Day 3 · Quick wins: 5 fastest brand fixes ────────────────────────
  {
    seq: 2,
    dayOffset: 3,
    subject: "5 brand fixes you can knock out before Friday",
    preheader:
      "The fastest points on the Checkup — each one takes under an hour and none of them cost a dime.",
    headline: "5 fixes you can knock out before Friday",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Most brand problems take weeks to fix. These five don't. Each one is straight off the Brand Checkup, each takes under an hour, and each is free.</p>
<p ${P}><strong>1. Put your phone number where thumbs can reach it.</strong> Top of your website, tappable on mobile. If a customer has to hunt for it, they call the next result instead.</p>
<p ${P}><strong>2. Use the same logo everywhere.</strong> Website, Google, Facebook, invoices, truck. Five slightly different logos read as five slightly different businesses.</p>
<p ${P}><strong>3. Claim your Google Business Profile.</strong> Fill out every field &mdash; hours, photos, services. It's the first thing most customers ever see of you, and most owners leave it half-empty.</p>
<p ${P}><strong>4. Kill the giant homepage photo.</strong> If your site takes more than three seconds to load, that hero image is usually the reason. Compress it. Half your visitors are gone by second four.</p>
<p ${P}><strong>5. Ask for one thing.</strong> Every page should have exactly one obvious next step &mdash; call, quote, book. A page with six buttons converts like a page with none.</p>
<p ${P}>None of these need a designer. They need a Tuesday afternoon.</p>
<p ${P}>And if you're wondering how much a slow, inconsistent site is quietly costing you &mdash; I ran the actual numbers here: <a href="${SITE_URL}/blog/how-your-website-is-costing-you-customers" ${A}>How Your Website Is Costing You Customers</a></p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-pointing-down.png`,
    ctaText: "Read the fixes",
    ctaUrl: `${SITE_URL}/blog/how-your-website-is-costing-you-customers`,
    psHtml: `<p style="margin:0;">${PS_STRONG} These five fixes have evil twins &mdash; the expensive kind. I wrote a free ebook on them: <a href="${SITE_URL}/downloads/BZD-7-Expensive-Mistakes.pdf" ${A}>7 Expensive Mistakes</a>. Worth the read before you spend a dollar on marketing.</p>`,
  },

  // ─── 3 · Day 7 · Story: who's behind the zombie ───────────────────────────
  {
    seq: 3,
    dayOffset: 7,
    subject: "Why I moved my whole studio to Cumming, GA",
    preheader:
      "Twenty years of big-brand work, a moving truck, and the sentence I built this whole business on.",
    headline: "Why I moved my whole studio to Cumming, GA",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Quick story, since we'll be talking for a few weeks.</p>
<p ${P}>I've been doing this for 20+ years. Most of that was in South Florida, deep in the CPG world &mdash; supplement labels, packaging systems, ecommerce builds for brands you'd recognize from a GNC shelf. Big catalogs, tight deadlines, files that had to be right because 10,000 units were getting printed off them.</p>
<p ${P}>Then I moved to Cumming and started noticing something everywhere I went: great local businesses &mdash; real craftsmen, great food, honest work &mdash; wearing branding stuck in 2012. A clip-art logo. A site that hadn't changed since it was built. A sign that didn't match the business card.</p>
<p ${P}>Nobody around here was offering these owners what the big brands get. It was either a $15k agency with a four-month timeline or a $50 logo from a stranger on the internet. Nothing in between.</p>
<p ${P}>So that's the gap I fill. Agency-grade brand, web, and print work, priced for Main Street, done by the person who answers the phone.</p>
<p ${P}>My whole positioning fits in six words: <strong>They print your brand. I build it.</strong></p>
<p ${P}>Anyone can put your logo on a card. Building the thing that makes the card work &mdash; that's the job.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-thumbs-up.png`,
    ctaText: "See the work",
    ctaUrl: `${SITE_URL}/work`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Curious whether your brand reads &ldquo;2012&rdquo;? Hit reply and send me your website &mdash; I'll give you an honest one-line verdict, free.</p>`,
  },

  // ─── 4 · Day 10 · Problem deep-dive: invisible locally ────────────────────
  {
    seq: 4,
    dayOffset: 10,
    subject: "If Google can't find you, neither can customers",
    preheader:
      "Do the 10-second test: search your own business name. What comes up decides who calls you — or doesn't.",
    headline: "If Google can't find you, neither can customers",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Try this right now. Google your own business name.</p>
<p ${P}>What came up? If the answer is a competitor, a directory listing from 2019, or nothing at all &mdash; you have a visibility problem, and it's costing you more than any ad budget could fix.</p>
<p ${P}>Here's the uncomfortable math: most local buying decisions start with a search. &ldquo;Plumber near me.&rdquo; &ldquo;Best tacos in Cumming.&rdquo; If you're not on that map, you don't lose the sale &mdash; you were never in the running. Your business might as well be a ghost town with great inventory.</p>
<p ${P}>The usual suspects:</p>
<ul ${UL}>
  <li ${LI}><strong>An unclaimed or half-empty Google Business Profile.</strong> Google fills the gaps with guesses, and guesses lose customers.</li>
  <li ${LI}><strong>Inconsistent name/address/phone across the web.</strong> Google sees three versions of you and trusts none of them.</li>
  <li ${LI}><strong>A website with no local vocabulary.</strong> If your site never says what you do and where, Google won't say it for you.</li>
</ul>
<p ${P}>The good news: this is one of the most fixable problems in marketing. No ad spend required &mdash; just doing the boring things correctly, in the right order.</p>
<p ${P}>I wrote up the exact steps here: <a href="${SITE_URL}/blog/business-not-showing-on-google-maps" ${A}>Why Your Business Isn't Showing Up on Google Maps</a></p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-stop-palm.png`,
    ctaText: "Fix your Maps listing",
    ctaUrl: `${SITE_URL}/blog/business-not-showing-on-google-maps`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Forsyth County folks: I wrote a <a href="${SITE_URL}/blog/improve-online-visibility-forsyth" ${A}>local-specific playbook</a> too &mdash; and if you'd rather have me run the checkup, the <a href="${SITE_URL}/free-site-audit" ${A}>free audit</a> covers it.</p>`,
  },

  // ─── 5 · Day 14 · AI-era visibility: get cited by ChatGPT ─────────────────
  {
    seq: 5,
    dayOffset: 14,
    subject: "ChatGPT is recommending someone. Is it you?",
    preheader:
      "Your next customer may never see a search results page. Here's how to be the business the AI names.",
    headline: "ChatGPT is recommending someone. Is it you?",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>A growing slice of your customers no longer &ldquo;Google it.&rdquo; They ask ChatGPT. Or they type a question into Google and read the AI answer at the top without clicking anything.</p>
<p ${P}>Either way, the same thing happens: an AI names two or three businesses, and everyone else is invisible. There's no page two anymore. You're cited, or you're skipped.</p>
<p ${P}>Here's what most owners get wrong: they think this is some new dark art. It isn't. AI models recommend businesses they can actually verify &mdash; a complete Google Business Profile, consistent details everywhere, real reviews, and a website that plainly states what you do, where you do it, and what it costs.</p>
<p ${P}>In other words: the boring fundamentals from last week's email just got a second job. The same fixes that get you on the map get you into the answer.</p>
<p ${P}>A few things that move the needle fastest:</p>
<ul ${UL}>
  <li ${LI}><strong>Answer real questions on your site</strong>, in plain sentences an AI can quote.</li>
  <li ${LI}><strong>State your service area by name.</strong> &ldquo;North Georgia&rdquo; beats &ldquo;your area&rdquo; every time.</li>
  <li ${LI}><strong>Get reviews that mention specifics</strong> &mdash; the service, the town, the result.</li>
</ul>
<p ${P}>I broke down the full playbook for local businesses here: <a href="${SITE_URL}/blog/how-to-get-cited-by-chatgpt-local" ${A}>How to Get Cited by ChatGPT</a></p>
<p ${P}>Worth 5 minutes. Your competitors haven't read it yet.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-ok-sign.png`,
    ctaText: "Get cited by AI",
    ctaUrl: `${SITE_URL}/blog/how-to-get-cited-by-chatgpt-local`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Wondering what those AI answers at the top of Google mean for your traffic? I covered <a href="${SITE_URL}/blog/google-ai-overviews-small-business" ${A}>that one too</a>.</p>`,
  },

  // ─── 6 · Day 17 · Framework: what a converting brand is made of ───────────
  {
    seq: 6,
    dayOffset: 17,
    subject: "The 3 things every brand that converts has",
    preheader:
      "Not taste. Not luck. Three testable parts — and you can score your own brand on all three today.",
    headline: "The 3 things every brand that converts has",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>After 20 years of building brands, I can tell you the ones that make money all share three parts. Not &ldquo;great design taste.&rdquo; Three testable things:</p>
<p ${P}><strong>1. A mark that works at every size.</strong><br />
Your logo will live on a favicon, a business card, and maybe a truck door. If it only looks good big and in color, it's decoration, not a logo. The test: shrink it to the size of your thumbnail. Still readable? Pass.</p>
<p ${P}><strong>2. Consistency that builds trust on repeat.</strong><br />
Same colors, same type, same voice &mdash; on your site, your Google profile, your invoices, your yard signs. Customers rarely buy on first contact. Consistency is what makes the fifth contact feel familiar instead of forgettable.</p>
<p ${P}><strong>3. A clear ask.</strong><br />
The brand's job is to earn attention; the ask converts it. Every touchpoint should make the next step obvious: call, book, get a quote. Pretty without an ask is a museum. You don't want a museum.</p>
<p ${P}>Notice what's not on the list: trends, awards, or how much the owner personally loves the colors.</p>
<p ${P}>If your logo is the weak link &mdash; and it often is &mdash; start here: <a href="${SITE_URL}/blog/what-makes-a-good-logo" ${A}>What Makes a Good Logo</a>. It's the checklist I use before any mark leaves my desk.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-count-three.png`,
    ctaText: "Score your logo",
    ctaUrl: `${SITE_URL}/blog/what-makes-a-good-logo`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Tempted by the $20 AI logo generators? I tested them against a human process &mdash; <a href="${SITE_URL}/blog/ai-logo-generator-vs-designer" ${A}>the results were educational</a>.</p>`,
  },

  // ─── 7 · Day 21 · Proof: real projects, start to finish ───────────────────
  {
    seq: 7,
    dayOffset: 21,
    subject: "Three real projects, from brief to launch",
    preheader:
      "A Cumming PC shop, a Georgia diner, and a garden brand that cleared $100k online — here's what actually got built.",
    headline: "Three real projects, from brief to launch",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Enough theory. Here's what the work actually looks like &mdash; three real projects, three different problems.</p>
<p ${P}><strong>Enigma Computers &mdash; Cumming, GA.</strong><br />
A local custom PC builder needed to look as sharp as the machines. We built the full brand identity, then a website with a guided request-for-quote flow that walks visitors through their build. The brand does the trust-building; the quote flow does the selling.</p>
<p ${P}><strong>Papa's Kitchen Diner &mdash; Georgia.</strong><br />
Family-owned diner. Instead of just a menu site, we built full online ordering with checkout &mdash; plus a monthly subscription that turned regulars into recurring revenue. A diner with subscription income. That's what a website earning its keep looks like.</p>
<p ${P}><strong>Planters Etc. &mdash; garden &amp; home.</strong><br />
Brand refresh plus a 75-SKU Shopify catalog built from the ground up. First year cleared $100k in online sales.</p>
<p ${P}>Different industries, same pattern: figure out how the business makes money, then build the brand and site around that. Looking pretty is table stakes. Making you money is the job.</p>
<p ${P}>The full portfolio &mdash; supplement labels, packaging, logos, print, the lot &mdash; is here:</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-chefs-kiss.png`,
    ctaText: "Browse the portfolio",
    ctaUrl: `${SITE_URL}/work`,
    psHtml: `<p style="margin:0;">${PS_STRONG} See a project that rhymes with your situation? Grab 15 minutes and <a href="${CALENDLY_URL}" ${A}>tell me about it</a>.</p>`,
  },

  // ─── 8 · Day 24 · Differentiation: own your brand ─────────────────────────
  {
    seq: 8,
    dayOffset: 24,
    subject: "Quick question: do you actually own your website?",
    preheader:
      "Many owners are renting their site without knowing it. Here's how to check — and what ownership should include.",
    headline: "Do you actually own your website?",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Here's a question that surprises a lot of business owners: if you stopped paying your website company tomorrow, what would you keep?</p>
<p ${P}>For many, the honest answer is <em>nothing</em>. The domain is registered in someone else's name. The site lives on a builder you're renting monthly. The design files? Never handed over. The day you stop paying, your entire online presence vanishes &mdash; and you get to start from zero.</p>
<p ${P}>That's not a website. That's a lease with your logo on it.</p>
<p ${P}>Quick self-check:</p>
<ul ${UL}>
  <li ${LI}><strong>Domain</strong> &mdash; is it registered to <em>you</em>, in <em>your</em> account?</li>
  <li ${LI}><strong>Site</strong> &mdash; can you move it to another host, or does it only exist inside a subscription?</li>
  <li ${LI}><strong>Files</strong> &mdash; do you have the logo source files, or just a JPEG from 2018?</li>
</ul>
<p ${P}>If any of those made you wince, read this before you sign anything else: <a href="${SITE_URL}/blog/who-legally-owns-your-website" ${A}>Who Legally Owns Your Website?</a></p>
<p ${P}>For the record, here's how I work: when a project ends, you own everything. Domain in your name, site you can take anywhere, every source file handed over. I'd rather earn the next project than hold the last one hostage.</p>
<p ${P}>Your brand should belong to you. Full stop.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-point-viewer.png`,
    ctaText: "Check what you own",
    ctaUrl: `${SITE_URL}/blog/who-legally-owns-your-website`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Weighing DIY builders against custom? The honest comparison, <a href="${SITE_URL}/blog/custom-website-vs-squarespace" ${A}>trade-offs included</a>.</p>`,
  },

  // ─── 9 · Day 28 · Objection: transparent pricing + $997 Launch Kit ────────
  {
    seq: 9,
    dayOffset: 28,
    subject: "What branding actually costs (real numbers inside)",
    preheader:
      "No “contact us for pricing” games. Logos, websites, and the $997 Launch Kit — every number on the table.",
    headline: "What branding actually costs",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Let's talk about the thing every design shop hides behind a contact form: price.</p>
<p ${P}>I publish my numbers. Here they are, no meeting required:</p>
<ul ${UL}>
  <li ${LI}><strong>Logos</strong> &mdash; from $750</li>
  <li ${LI}><strong>Websites</strong> &mdash; $1,500 for a landing page, up to $7,500+ for a full custom build. Most clients land at the $4,500 Growth tier.</li>
  <li ${LI}><strong>Print</strong> &mdash; from $75. Cards, flyers, signage, labels, designed and produced through my in-house print pipeline.</li>
</ul>
<p ${P}>And if you're just opening your doors, there's the one I built specifically for first-time owners:</p>
<p ${P}><strong>The $997 Launch Kit.</strong> Logo + starter brand kit, a one-page website with domain and a year of hosting, 100 business cards, and 100 flyers. Everything opening day needs, shipped in 10 days. One price, one invoice, no surprises.</p>
<p ${P}>Why publish pricing when nobody else does? Because &ldquo;it depends&rdquo; is how owners end up overpaying &mdash; and because if my numbers don't fit your budget, I'd rather save us both the meeting. Flat quotes, in writing, before work starts. What I quote is what you pay.</p>
<p ${P}>Fair warning served with a wink: prices this clear tend to attract decisive people.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-crossed-fingers.png`,
    ctaText: "See the Launch Kit",
    ctaUrl: `${SITE_URL}/startup-special`,
    psHtml: `<p style="margin:0;">${PS_STRONG} Want the full market breakdown before you spend a dollar? I published <a href="${SITE_URL}/blog/website-cost-cumming-ga-2026" ${A}>what websites really cost around here</a> &mdash; and <a href="${SITE_URL}/blog/cost-to-brand-a-new-business" ${A}>what a complete new-business brand runs</a>.</p>`,
  },

  // ─── 10 · Day 31 · Direct offer: book the 15-minute call ──────────────────
  {
    seq: 10,
    dayOffset: 31,
    subject: "15 minutes, zero pressure — let's talk shop",
    preheader:
      "Five weeks of advice, one small ask. Bring your brand questions; I'll bring straight answers. That's the whole deal.",
    headline: "15 minutes, zero pressure",
    bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Five weeks ago you grabbed the Brand Checkup. Since then I've sent you quick fixes, real projects, and actual prices &mdash; and asked for nothing back.</p>
<p ${P}>Time for my one direct ask: <strong>grab 15 minutes with me.</strong></p>
<p ${P}>Here's exactly what happens on the call. You tell me where your brand stands and what's in the way. I tell you what I'd fix first, roughly what it would cost, and whether I'm even the right person for it. If I'm not, I'll say so and point you somewhere better.</p>
<p ${P}>What doesn't happen: a slide deck, a &ldquo;discovery framework,&rdquo; or a follow-up sequence that hunts you for a month. Fifteen minutes means fifteen minutes &mdash; I've got work on the desk too.</p>
<p ${P}><strong><a href="${CALENDLY_URL}" ${A}>Book your 15-minute call</a></strong></p>
<p ${P}>And if calls aren't your thing, no problem &mdash; tell me about your project in writing and I'll send a flat quote instead: <a href="${SITE_URL}/services/request-quote" ${A}>request a quote</a>.</p>
<p ${P}>Either way, you'll get a straight answer from the person who'd actually do the work.</p>
<p ${P}>This is the last email in the series. If your brand still needs a jolt back to life six months from now, this address still works &mdash; hit reply anytime.</p>
<p ${P_LAST}>Gerry</p>`,
    handImage: `${HANDS}hand-beckon.png`,
    ctaText: "Book 15 minutes",
    ctaUrl: CALENDLY_URL,
    psHtml: `<p style="margin:0;">${PS_STRONG} Prefer email? Skip the call and get a flat quote in writing: <a href="${SITE_URL}/services/request-quote" ${A}>request a quote</a>.</p>`,
  },
];
