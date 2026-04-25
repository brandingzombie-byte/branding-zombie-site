// ─── Blog content — single source of truth ────────────────────────────────
// Types + registry + per-post JSX content. Matches the typed-data pattern
// used by services.ts so posts don't need MDX or gray-matter. Each post
// exports a `Content` React component that's rendered inside BlogProse on
// /blog/[slug].

import type { ComponentType, ReactNode } from "react";
import { SITE_URL, CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// ─── Types ────────────────────────────────────────────────────────────────

export interface PostMeta {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Short card blurb shown on /blog index. ≤ 200 chars. */
  excerpt: string;
  keywords: string[];
  author: string;
  /** ISO date (YYYY-MM-DD). Drives schema + sort order on /blog. */
  datePublished: string;
  dateModified?: string;
  readingTimeMinutes: number;
  category: string;
  tags: string[];
  ogImage: string;
  ogImageAlt: string;
}

export interface Post {
  meta: PostMeta;
  Content: ComponentType;
}

// ─── Shared inline components for post content ────────────────────────────

function InternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-medium text-[var(--color-neon-text)] underline decoration-[var(--color-neon)]/40 decoration-2 underline-offset-4 hover:decoration-[var(--color-neon)]"
    >
      {children}
    </a>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="font-medium text-[var(--color-neon-text)] underline decoration-dotted decoration-[var(--color-neon)]/50 underline-offset-4 hover:decoration-[var(--color-neon)]"
    >
      {children}
    </a>
  );
}

// ─── Post #1 — How Your Website Is Costing You Customers ──────────────────

function WebsiteCostingCustomersContent() {
  return (
    <>
      <p>
        <strong>Your product is good. Your prices are fair. Your people are great.</strong>
      </p>

      <p>
        So why does your phone stop ringing? Why do leads vanish into the
        void? Why does your competitor — the one you know isn&apos;t any
        better than you — keep stealing business you should be winning?
      </p>

      <p>
        Nine times out of ten, the answer isn&apos;t your product. It&apos;s
        your website.
      </p>

      <p>
        Most small-business websites aren&apos;t broken. They&apos;re worse
        than broken. They&apos;re <em>quietly</em> leaking customers every
        single day — a little slower here, a little uglier there, a missing
        button, a dead form, a &quot;contact us&quot; that nobody can find.
        None of it looks like a problem until you run the numbers.
      </p>

      <p>
        Here&apos;s what&apos;s actually happening behind the scenes, and
        seven fixes you can start on this week.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>75% of people judge your business by your website alone.</strong>{" "}
            If it looks like 2016, that&apos;s their impression of you.
          </li>
          <li>
            <strong>53% of visitors leave if your site takes longer than 3 seconds on mobile.</strong>{" "}
            Most small-business sites take 5–9.
          </li>
          <li>
            <strong>Mobile-first isn&apos;t optional.</strong> Google indexes
            the mobile version of your site — not the desktop one.
          </li>
          <li>
            <strong>Unclear CTAs kill conversions faster than any design flaw.</strong>{" "}
            If a visitor can&apos;t figure out what to do in 5 seconds, they
            leave.
          </li>
          <li>
            <strong>The fix isn&apos;t expensive.</strong> A modern
            small-business site starts around $1,500 and pays for itself in
            one extra customer a month.
          </li>
        </ul>
      </aside>

      <h2 id="the-7-second-verdict">The 7-Second Verdict</h2>

      <p>Here&apos;s the uncomfortable math.</p>

      <p>
        When someone lands on your website, they decide whether to trust you
        in about <strong>seven seconds</strong>. That decision isn&apos;t
        about what you sell — it&apos;s about how your site <em>feels</em> the
        moment it loads. Fonts. Spacing. Speed. Professionalism. Whether it
        looks like you took it seriously.
      </p>

      <p>
        Stanford&apos;s long-running{" "}
        <ExternalLink href="https://credibility.stanford.edu/">
          Web Credibility Project
        </ExternalLink>{" "}
        found that <strong>75% of users judge a company&apos;s credibility
        based on their website design</strong>. Not reviews. Not pricing. Not
        the product page. The design.
      </p>

      <p>
        Think about what that means for a contractor, a dentist, a boutique,
        a restaurant — any small business in Cumming, Forsyth County, or
        North Metro Atlanta. Your ad spend, your SEO, your Google Business
        Profile — all of it funnels visitors to a site that decides, in seven
        seconds flat, whether you&apos;re worth their time.
      </p>

      <p>If you&apos;re losing customers, this is almost always the leak.</p>

      <h2 id="7-ways">7 Ways Your Website Is Quietly Bleeding Sales</h2>

      <h3 id="loads-like-2012">1. It Loads Like It&apos;s 2012</h3>
      <p>Speed isn&apos;t a nice-to-have. It&apos;s the foundation.</p>
      <p>
        Google&apos;s research with SOASTA found that{" "}
        <strong>
          the probability of a mobile user bouncing increases by 32% as page
          load time goes from 1 to 3 seconds — and by 90% once it hits 5 seconds
        </strong>{" "}
        (
        <ExternalLink href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/">
          Think With Google
        </ExternalLink>
        ).
      </p>
      <p>
        That&apos;s not a small drop. That&apos;s half your traffic quietly
        walking out before the homepage even renders.
      </p>
      <p>
        Worse: Google uses page speed as a ranking signal through{" "}
        <ExternalLink href="https://web.dev/articles/vitals">
          Core Web Vitals
        </ExternalLink>
        . A slow site doesn&apos;t just lose the people who land on it — it
        loses the people who would have found it.
      </p>
      <p>
        <strong>What&apos;s usually causing it:</strong> an old WordPress
        theme stuffed with plugins, uncompressed images, no caching, and a
        $5/month shared host from 2018. All fixable. None of it should still
        exist in 2026.
      </p>
      <p>
        Fix this with modern{" "}
        <InternalLink href="/services/web-design">web design</InternalLink> —
        built on Next.js, image-optimized, hosted on a CDN. Most sites we
        build score 95+ on PageSpeed out of the box.
      </p>

      <h3 id="looks-broken-on-phone">2. It Looks Broken on a Phone</h3>
      <p>
        Over 60% of small-business web traffic comes from a phone. Google has
        been using <strong>mobile-first indexing</strong> since 2019 — meaning
        they rank your <em>mobile</em> site, not your desktop one (
        <ExternalLink href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing">
          Google Search Central
        </ExternalLink>
        ).
      </p>
      <p>
        So here&apos;s the question: when was the last time you actually
        looked at your own website on a phone?
      </p>
      <p>
        Not the desktop. Not your laptop. An actual phone, on cellular, in
        the sun.
      </p>
      <p>
        If the buttons are too small to tap, if the menu is a tiny hamburger
        that unspools into 20 links, if the &quot;book now&quot; button is
        buried three scrolls below the fold — you&apos;re losing the majority
        of your traffic before they can do anything about it.
      </p>
      <p>
        Mobile-first isn&apos;t a design preference. It&apos;s the default
        way the internet works now.
      </p>

      <h3 id="unclear-value">3. Visitors Can&apos;t Tell What You Actually Do</h3>
      <p>
        Open your homepage right now. Imagine you&apos;re a stranger. In{" "}
        <strong>five seconds</strong>, can you tell:
      </p>
      <ol>
        <li>What this business sells or does</li>
        <li>Who it&apos;s for</li>
        <li>What to do next</li>
      </ol>
      <p>
        If the answer to any of those is &quot;eh, kind of,&quot; you have a
        clarity problem — and clarity problems are the single biggest
        conversion killer on the web, full stop.
      </p>
      <p>
        <ExternalLink href="https://www.nngroup.com/articles/trustworthy-design/">
          Nielsen Norman Group
        </ExternalLink>{" "}
        — the most respected UX research firm in the world — calls this the
        &quot;above-the-fold gauntlet.&quot; Miss it, and nothing else on the
        page matters. Users don&apos;t scroll down to figure out what you
        meant. They hit the back button.
      </p>
      <p>
        Your hero section should answer all three questions in a single
        glance. Not clever. Not poetic. Clear.
      </p>

      <h3 id="cta-hiding">4. Your CTA Is Hiding</h3>
      <p>
        A call-to-action button is the single most important element on your
        entire site. It is, literally, the thing you&apos;re asking visitors
        to do.
      </p>
      <p>Most small-business sites have:</p>
      <ul>
        <li>No visible CTA above the fold</li>
        <li>
          A &quot;Contact Us&quot; button that goes to a form nobody wants to
          fill out
        </li>
        <li>Five different CTAs competing for attention</li>
        <li>A CTA button the same color as everything else</li>
      </ul>
      <p>
        Pick <strong>one primary action</strong>. Make it the loudest thing
        on the page. Repeat it. Whether it&apos;s &quot;Get a Free
        Quote,&quot; &quot;Book a Call,&quot; &quot;Order Online,&quot; or
        &quot;Get the Menu&quot; — that button should be impossible to miss.
      </p>
      <p>
        Our{" "}
        <InternalLink href="/services/launch-package">
          Launch Package
        </InternalLink>{" "}
        builds sites around one dominant conversion path, not six.
      </p>

      <h3 id="invisible-on-google">5. You&apos;re Invisible on Google</h3>
      <p>
        You could have the best website in Forsyth County — but if nobody
        finds it, none of it matters.
      </p>
      <p>Small businesses lose enormous amounts of traffic to:</p>
      <ul>
        <li>
          A missing or unclaimed <strong>Google Business Profile</strong>
        </li>
        <li>
          No <strong>local schema markup</strong> (so Google doesn&apos;t
          know where you are, when you&apos;re open, or what you sell)
        </li>
        <li>
          Zero <strong>location-specific pages</strong> (a single
          &quot;Service Areas&quot; footer isn&apos;t enough)
        </li>
        <li>Painfully slow page speed (see #1)</li>
        <li>Thin content that doesn&apos;t match real search queries</li>
      </ul>
      <p>
        According to{" "}
        <ExternalLink href="https://www.brightlocal.com/research/local-consumer-review-survey/">
          BrightLocal&apos;s annual Local Consumer Review Survey
        </ExternalLink>
        , <strong>98% of consumers read online reviews for local businesses,
        and 87% specifically use Google</strong> to find them. If your Google
        presence is a ghost town, the customers you <em>should</em> be
        getting are going to the competitor whose profile actually shows up.
      </p>
      <p>
        We bundle{" "}
        <InternalLink href="/services/digital-marketing">
          local SEO and Google Business setup
        </InternalLink>{" "}
        into every website build. It&apos;s not an upsell — it&apos;s the
        whole point.
      </p>

      <h3 id="zero-social-proof">6. You Have Zero Social Proof</h3>
      <p>Nobody wants to be your first customer.</p>
      <p>
        When a visitor hits your site, their brain runs one question on a
        loop: <em>has anyone else trusted these people and lived to tell
        about it?</em>
      </p>
      <p>
        Social proof answers that question. Real reviews. Real client logos.
        Real photos of real work. Real numbers — &quot;200+ projects
        shipped,&quot; &quot;10 years in Cumming,&quot; &quot;Rated 4.9 on
        Google.&quot; Specifics, not adjectives.
      </p>
      <p>
        The biggest mistake we see: small-business sites that have zero
        reviews visible on the page, zero portfolio images, and a testimonial
        section that says &quot;John D. says we&apos;re great!&quot; in Lorem
        Ipsum font.
      </p>
      <p>
        If you have real customers who love you — and you do — put them on
        the page. Pictures. Names. Stories. A strong{" "}
        <InternalLink href="/services/branding">
          brand identity system
        </InternalLink>{" "}
        makes that proof look like it belongs to a real business, not a side
        hustle.
      </p>

      <h3 id="nobody-answers">7. You Answer Nobody When They Arrive</h3>
      <p>Here&apos;s the new one.</p>
      <p>
        It&apos;s 9:47 PM. A couple just finished dinner and decided to call
        a roofer for the leak they noticed last week. They Google
        &quot;roofer near me.&quot; They land on your site. They have a
        question. Nobody&apos;s there.
      </p>
      <p>
        Your competitor? Their site has a chatbot that answered the question
        instantly, captured the lead, and booked a morning inspection before
        the couple went to bed.
      </p>
      <p>You lost that job before you knew it existed.</p>
      <p>
        <InternalLink href="/services/ai-workflows">AI workflows</InternalLink>{" "}
        — chatbots, instant-reply lead capture, after-hours scheduling,
        automated follow-up — aren&apos;t enterprise-only anymore. They start
        at $500. They pay for themselves in one or two recovered leads. And
        they work while you sleep.
      </p>
      <p>
        If your competitor has one and you don&apos;t, that gap grows every
        single night.
      </p>

      <h2 id="self-audit">How to Tell If Your Site Is the Leak — 5-Minute Self-Audit</h2>
      <p>Run through this list. Every &quot;no&quot; is money.</p>
      <ul className="checklist">
        <li>
          My site loads in <strong>under 3 seconds</strong> on a phone over
          cellular (
          <ExternalLink href="https://pagespeed.web.dev/">
            test it here, free
          </ExternalLink>
          )
        </li>
        <li>
          I can tell what I sell, who it&apos;s for, and what to do next in{" "}
          <strong>five seconds</strong> on the homepage
        </li>
        <li>
          There is <strong>one</strong> primary call-to-action, and it&apos;s
          visible above the fold
        </li>
        <li>My phone number is clickable from a phone</li>
        <li>
          The navigation has <strong>7 links or fewer</strong>
        </li>
        <li>
          My Google Business Profile is claimed, verified, and has recent
          reviews
        </li>
        <li>
          My site shows at least <strong>3 real testimonials or reviews</strong>{" "}
          with names and faces
        </li>
        <li>
          There&apos;s a way for someone to get a question answered at 11 PM
          (chatbot, form, clear email)
        </li>
        <li>Every image is optimized and under 200 KB</li>
        <li>
          My site has an SSL certificate (the little padlock in the address
          bar)
        </li>
      </ul>
      <p>
        <strong>Scored lower than 7?</strong> Your site is costing you
        customers. We audit this for free.
      </p>

      <h2 id="what-2026-looks-like">What a 2026-Ready Small Business Website Actually Looks Like</h2>
      <p>A good small-business site isn&apos;t a digital brochure. It&apos;s a 24/7 salesperson.</p>
      <p>
        It&apos;s <strong>fast</strong> — built on modern frameworks, not
        legacy page builders. It&apos;s <strong>mobile-first</strong> —
        designed on a phone, not retrofitted for one. It&apos;s{" "}
        <strong>clear</strong> — one message, one audience, one primary
        action per page. It&apos;s <strong>findable</strong> — local schema,
        real content, a claimed Google Business Profile. It&apos;s{" "}
        <strong>alive</strong> — AI chat for after-hours leads, automated
        follow-up for the ones you capture, real social proof from real
        customers.
      </p>
      <p>
        And — this is the part most &quot;cheap website&quot; shops skip —
        it&apos;s <strong>written like a human</strong>. Not marketing-speak.
        Not jargon. Not &quot;synergistic holistic solutions.&quot; Actual
        words your actual customers use.
      </p>
      <p>
        That&apos;s what we build.{" "}
        <InternalLink href="/services/web-design">Web design</InternalLink>{" "}
        starts at $1,500. The{" "}
        <InternalLink href="/services/launch-package">
          Launch Package
        </InternalLink>{" "}
        — our most popular — bundles the site, the brand, and AI workflow for
        businesses that want the whole thing done right, once.
      </p>

      <h2 id="local-angle">Why This Matters More in Cumming and Forsyth County</h2>
      <p>
        If you&apos;re running a small business in Cumming, Alpharetta,
        Roswell, Woodstock, Buford, or anywhere in North Metro Atlanta —
        this isn&apos;t abstract.
      </p>
      <p>
        Your customers are on their phones right now. They&apos;re Googling
        plumbers, dentists, restaurants, HVAC guys, contractors, boutiques,
        salons. They&apos;re making a snap call about which business to
        trust based on a website they&apos;ll look at for seven seconds and
        never think about again.
      </p>
      <p>
        You don&apos;t need a national brand. You don&apos;t need a
        six-figure budget. You need a site that doesn&apos;t embarrass the
        actual quality of your business.
      </p>
      <p>
        That&apos;s the gap we close — for real small businesses, in the
        real neighborhoods we live in, at prices that make sense for a Main
        Street bottom line.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Ready to Stop Leaking Customers?
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[0.95] tracking-tight">
          Free 15-minute audit. No pitch, no pressure.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          We&apos;ll look at your actual site, on an actual phone, and tell
          you — in plain English — what&apos;s costing you customers and
          what we&apos;d fix first. You&apos;ll walk away with a clear punch
          list either way.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free audit
          </a>
          <a
            href={PHONE_HREF}
            className="tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3 id="faq-know">How do I know if my website is actually losing me customers?</h3>
      <p>
        Run the 5-minute self-audit above. If you score 7 or lower, your
        site is almost certainly leaking leads. The clearest signals: mobile
        page speed over 3 seconds, no visible CTA above the fold, no claimed
        Google Business Profile, and zero social proof on the homepage.
      </p>

      <h3 id="faq-cost">How much does a new small-business website cost in Cumming, GA?</h3>
      <p>
        Our{" "}
        <InternalLink href="/services/web-design">
          custom websites start at $1,500
        </InternalLink>{" "}
        for a 5-page site. The most popular option is the{" "}
        <InternalLink href="/services/launch-package">
          Launch Package
        </InternalLink>
        , which bundles website, brand identity, and AI workflow for a flat
        rate. No hidden fees, everything quoted upfront.
      </p>

      <h3 id="faq-timeline">How long does it take to build a new website?</h3>
      <p>
        Most of our websites launch in 10–14 days. Traditional agencies take
        4–8 weeks. We move faster because we use a proven process and modern
        AI-assisted tools — not because we cut corners.
      </p>

      <h3 id="faq-technical">Do I need to be technical to maintain it after launch?</h3>
      <p>
        No. We build on platforms you can edit without touching code, and
        every site comes with a handoff walkthrough. We also offer monthly
        maintenance plans starting at $100 if you&apos;d rather never think
        about it.
      </p>

      <h3 id="faq-existing">Can you fix my existing site instead of rebuilding it?</h3>
      <p>
        Sometimes, yes — especially if the bones are good. Our free audit
        will tell you honestly whether a redesign or a rebuild makes more
        sense for your situation and budget.
      </p>

      <h3 id="faq-other-services">What if I also need a logo, printed materials, or packaging?</h3>
      <p>
        We handle all of it in-house.{" "}
        <InternalLink href="/services/logo-design">
          Logo and brand identity
        </InternalLink>
        ,{" "}
        <InternalLink href="/services/print-design">print design</InternalLink>
        ,{" "}
        <InternalLink href="/services/ecommerce">Shopify ecommerce</InternalLink>
        ,{" "}
        <InternalLink href="/services/social-media">social media</InternalLink>
        , and <InternalLink href="/cpg-launch">CPG packaging</InternalLink>. One
        studio, one invoice.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, Creative Director at Branding Zombie
        Designs. Based in Cumming, GA. Building modern small-business
        websites, AI workflows, and brand systems across North Metro Atlanta
        since 2019.
      </p>
    </>
  );
}

// ─── Post #2 — Google's AI Is Already Calling Your Business ───────────────

function GoogleAICallingBusinessContent() {
  return (
    <>
      <p>
        Your phone rings. The voice on the other end sounds <em>almost</em>{" "}
        right — clear, polite, a little too even. It asks if you&apos;re open
        Saturday and whether you handle emergency repairs.
      </p>

      <p>
        Your front desk pauses. Says &quot;is this a robocall?&quot; — and
        hangs up.
      </p>

      <p>
        Five seconds later, somewhere in Cumming, a homeowner&apos;s
        Google Assistant tells them <strong>&quot;they didn&apos;t pick
        up&quot;</strong> — and reads off the next contractor on the list.
        That was a $4,000 job. You never saw it.
      </p>

      <p>
        This is happening right now, more often every month. And most small
        businesses in Forsyth County have no idea how to handle it.
      </p>

      <p>
        Here&apos;s what these calls actually are, why they&apos;re going to
        get a lot more common, and the seven things you should fix this week.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Google&apos;s AI is calling small businesses now</strong>{" "}
            — through Duplex, Gemini, and the new &quot;ask for me&quot;
            features built into Search and Pixel phones.
          </li>
          <li>
            <strong>Most reception isn&apos;t ready.</strong> Staff hangs up,
            gives wrong info, or transfers the AI into voicemail purgatory —
            and the lead disappears to the next business on the list.
          </li>
          <li>
            <strong>The fix is two-pronged:</strong> make sure the answers
            the AI is looking for are already on your Google Business Profile
            and website (so it doesn&apos;t need to call), and train your
            team for when it does.
          </li>
          <li>
            <strong>This is not future-tech.</strong> It&apos;s already in
            production and growing fast. Businesses that prepare in 2026 win
            the next two years.
          </li>
        </ul>
      </aside>

      <h2 id="whats-going-on">Wait — Google Is Calling My Business?</h2>

      <p>
        Yes. Two different ways, actually, and it&apos;s worth knowing the
        difference.
      </p>

      <h3 id="duplex">Google Duplex — Google calling on Google&apos;s behalf</h3>
      <p>
        The first version of this rolled out way back in 2018. Google
        announced{" "}
        <ExternalLink href="https://blog.google/technology/ai/duplex-helpful-business/">
          Duplex
        </ExternalLink>
        {" "}— an AI that could call small businesses to verify hours,
        confirm holiday closures, or check on services for the public Google
        listings. If your hours on Google Maps are mysteriously updated and
        you don&apos;t remember updating them, that was probably Duplex.
      </p>

      <h3 id="ask-for-me">Gemini &quot;Ask for me&quot; — the AI calling on a customer&apos;s behalf</h3>
      <p>
        This is the new one, and it&apos;s the one that costs you leads. A
        consumer asks{" "}
        <ExternalLink href="https://gemini.google.com/">Gemini</ExternalLink>
        {" "}or their Pixel phone something like &quot;find me a plumber that
        can come out tomorrow&quot; — and instead of just showing search
        results, the assistant calls the top candidates, asks the questions
        the user wanted answered, and reports back. Whichever business sounds
        ready, available, and competent <em>over the phone, to an AI</em>{" "}
        wins the job.
      </p>
      <p>
        Read that last sentence again. Your reception is now an SEO ranking
        signal.
      </p>

      <h3 id="recognize">How to recognize one when it lands</h3>
      <ul>
        <li>
          A slight unnatural pause at the start of the call (about half a
          second longer than a human)
        </li>
        <li>
          Voice is clear and polite but the cadence is a little too even —
          no &quot;ums,&quot; no rushed words
        </li>
        <li>
          It often introduces itself (&quot;Hi, I&apos;m calling on behalf
          of a Google user looking for...&quot; or &quot;This is Google&apos;s
          assistant calling to confirm...&quot;) — though not always
        </li>
        <li>
          It asks one question at a time and waits for a clean answer
        </li>
        <li>
          It can&apos;t handle being put on hold for long, doesn&apos;t
          appreciate hold music, and won&apos;t fight with an IVR menu
        </li>
      </ul>

      <h2 id="why-suddenly">Why Is This Suddenly a Big Deal?</h2>

      <p>Three things converged in 2024–2025.</p>

      <p>
        First, AI assistants got good enough to actually hold a phone
        conversation. The voice, the timing, the comprehension — all crossed
        the line from &quot;creepy demo&quot; to &quot;works in production.&quot;
      </p>

      <p>
        Second, Google shipped the calling capabilities directly into Search,
        Maps, and Pixel phones. Anyone with an Android can now ask their
        phone to call businesses for them.{" "}
        <ExternalLink href="https://www.pewresearch.org/internet/">
          Pew Research
        </ExternalLink>
        {" "}has tracked sharp year-over-year increases in consumer AI
        adoption, and voice-driven assistant use is leading the curve.
      </p>

      <p>
        Third — and this is the local angle — the assistants are most useful
        for <strong>local service questions</strong>. &quot;Find me a roofer
        near Cumming who can come out this week.&quot; &quot;Is this dentist
        in Alpharetta in-network for Aetna?&quot; &quot;Does the salon on
        Main Street take walk-ins on Saturday?&quot; These are exactly the
        questions worth calling about, and exactly the questions a small
        business should be able to answer in five seconds — but often
        can&apos;t.
      </p>

      <h2 id="what-goes-wrong">What Goes Wrong When You&apos;re Not Ready</h2>

      <p>Five very specific, very common failure modes:</p>

      <h3 id="failure-hangup">1. Staff hears a synthetic voice and hangs up</h3>
      <p>
        Most front-desk staff have been trained to be wary of robocalls.
        They hear the slight unnaturalness and bail. The AI reports back
        &quot;couldn&apos;t connect&quot; — your competitor gets the
        callback.
      </p>

      <h3 id="failure-bad-info">2. Staff gives wrong or fuzzy info</h3>
      <p>
        Asked &quot;are you open Saturday?&quot;, the answer is &quot;uh,
        I think so, let me check&quot; — and the AI dutifully reports back
        &quot;they weren&apos;t sure.&quot; A confident competitor saying
        &quot;Yes, 9 to 4&quot; just won the job.
      </p>

      <h3 id="failure-voicemail">3. Voicemail at 7:42 PM</h3>
      <p>
        After-hours leads are a huge part of local service business — and
        the AI agent often calls when the homeowner is finally relaxing
        after dinner. Voicemail-only? The AI moves on to the next listing.
        Period.
      </p>

      <h3 id="failure-transfer">4. Staff transfers the AI</h3>
      <p>
        Hold music. Department transfer. Another hold. The AI patiently
        waits about 30 seconds, decides this isn&apos;t productive, and
        ends the call. You never knew it called.
      </p>

      <h3 id="failure-optout">5. Staff explicitly tells the AI to leave</h3>
      <p>
        &quot;We don&apos;t talk to robots&quot; or &quot;take us off your
        list&quot; gets logged as a hard opt-out — meaning your business
        may stop being suggested for that user&apos;s future searches at
        all.
      </p>

      <h2 id="seven-steps">7 Steps to Be Ready (Start This Week)</h2>

      <h3 id="step-train">1. Train your team to recognize AI calls</h3>
      <p>
        15 minutes at the next staff meeting. Play a sample. Explain that
        the right response is the same as a human caller: answer the
        question clearly, no transfers, no &quot;hold please.&quot; The AI
        is a real lead, just routed through software.
      </p>

      <h3 id="step-script">2. Standardize answers to the top 10 questions</h3>
      <p>
        Write down — on paper, by the phone — the answers to:
      </p>
      <ol>
        <li>What are your hours, including weekends and holidays?</li>
        <li>Do you take walk-ins or appointments only?</li>
        <li>What&apos;s the price range for [your top 3 services]?</li>
        <li>Do you do emergency / same-day work?</li>
        <li>What&apos;s your service area?</li>
        <li>What insurance / payment do you accept?</li>
        <li>How fast can you schedule someone?</li>
        <li>Are you licensed and insured?</li>
        <li>Do you offer free estimates?</li>
        <li>What&apos;s the best way to book?</li>
      </ol>
      <p>
        These are the questions an AI is most likely to ask. They&apos;re
        also the questions a stressed homeowner asks. Same answers either
        way.
      </p>

      <h3 id="step-gbp">3. Make your Google Business Profile bulletproof</h3>
      <p>
        This is the biggest lever, and most businesses ignore it.{" "}
        <ExternalLink href="https://support.google.com/business">
          Google Business Profile
        </ExternalLink>
        {" "}lets you publish hours, services, prices, payment methods, and
        Q&amp;A directly. <strong>If the answer is on your profile, the
        AI doesn&apos;t have to call you to get it.</strong> Most won&apos;t.
        Fill it out completely — every field, every question, every
        category. We bundle this into every{" "}
        <InternalLink href="/services/digital-marketing">
          local SEO setup
        </InternalLink>
        .
      </p>

      <h3 id="step-faq">4. Put an FAQ on your website with structured data</h3>
      <p>
        AI assistants read your website before they call.{" "}
        <ExternalLink href="https://developers.google.com/search/docs/appearance/structured-data/faqpage">
          Google&apos;s FAQ structured data
        </ExternalLink>
        {" "}makes those answers machine-readable. A well-built FAQ
        section can satisfy the AI without a phone call ever happening —
        and your competitor without one loses the lead. Our{" "}
        <InternalLink href="/services/web-design">web design</InternalLink>
        {" "}builds bake structured data in by default.
      </p>

      <h3 id="step-chatbot">5. Use an AI chatbot for after-hours</h3>
      <p>
        When the AI calls at 9:47 PM and your shop is closed, an{" "}
        <InternalLink href="/services/ai-workflows">
          AI chatbot
        </InternalLink>
        {" "}on your website can answer the questions, capture the contact
        info, and book the morning slot — entirely AI-to-AI. The
        homeowner&apos;s assistant says &quot;they replied — they can come
        out at 9 AM tomorrow,&quot; and you&apos;ve won the job in your
        sleep. Chatbots start at $500 and routinely pay for themselves in
        one or two recovered jobs.
      </p>

      <h3 id="step-phone">6. Audit your phone setup</h3>
      <p>Three checks:</p>
      <ul>
        <li>Does your number forward cleanly to a cell after hours?</li>
        <li>
          Is your voicemail message useful (current hours, alternate
          contact, link to book online), or is it the default &quot;leave
          a message after the beep&quot;?
        </li>
        <li>
          If you have an IVR (&quot;press 1 for sales&quot;), is option 1
          actually fast? Long IVRs are AI-call killers.
        </li>
      </ul>

      <h3 id="step-track">7. Track which calls were AI</h3>
      <p>
        Most modern VoIP and call-tracking platforms (CallRail, OpenPhone,
        RingCentral) flag AI calls now. Turn that on. Review weekly. If
        you see five missed AI calls and zero callbacks, you have a real
        and measurable leak.
      </p>

      <h2 id="when-one-calls">How to Handle a Live AI Call</h2>
      <p>The four rules, taped to the phone:</p>
      <ul className="checklist">
        <li>
          <strong>Speak in short, complete sentences.</strong> &quot;Yes,
          we&apos;re open Saturday from nine to four.&quot; Not &quot;yeah,
          uh, I think so, hold on a sec.&quot;
        </li>
        <li>
          <strong>Answer the question. Don&apos;t pivot to a sales pitch.</strong>{" "}
          The AI isn&apos;t going to be charmed. It&apos;s collecting facts
          for the human.
        </li>
        <li>
          <strong>Don&apos;t transfer. Don&apos;t put it on hold.</strong>{" "}
          Either you can answer, or you can&apos;t — the AI doesn&apos;t
          wait through hold music.
        </li>
        <li>
          <strong>Confirm and close cleanly.</strong> &quot;So that&apos;s
          a yes — we can be there Saturday morning. Would you like me to
          schedule it?&quot;
        </li>
      </ul>

      <h2 id="bigger-shift">The Bigger Shift Nobody&apos;s Talking About Yet</h2>

      <p>
        For two decades, your website was for humans. Your phone was for
        humans. Your Google listing was for humans. Now, all three are also
        a public API that AI agents query continuously on behalf of real
        customers.
      </p>

      <p>
        That&apos;s not a metaphor. It&apos;s a literal architectural shift
        in how local commerce works. The businesses winning the next 24
        months will be the ones who treat their public touchpoints — phone,
        site, Google listing — as <strong>structured, accurate, fast,
        machine-friendly</strong> data, not just marketing.
      </p>

      <p>
        Branding Zombie&apos;s entire approach is built around this. Modern
        site, structured data baked in, complete Google Business Profile,
        AI chatbot for after-hours, accurate hours and pricing on every
        public surface. It&apos;s the{" "}
        <InternalLink href="/services/launch-package">
          Launch Package
        </InternalLink>
        {" "}— and it pays back fast in this new environment.
      </p>

      <h2 id="local-angle">Why This Matters Most for Cumming and Forsyth</h2>

      <p>
        Local services — contractors, dentists, salons, restaurants,
        plumbers, HVAC, auto repair, landscaping, real estate — get the
        most AI-routed traffic, because that&apos;s exactly what consumers
        ask their AI assistants for. &quot;Find me one near me, available
        soon.&quot;
      </p>

      <p>
        If you run a small business in Cumming, Alpharetta, Roswell,
        Woodstock, Buford, or anywhere across North Metro Atlanta, this
        already affects you. Today. The leads aren&apos;t hypothetical —
        they&apos;re already being routed and you&apos;re either capturing
        them or quietly losing them.
      </p>

      <p>
        The good news: this is fixable in days, not months. And local
        businesses that move first build a moat their competitors will
        spend years catching up to.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Want to Stop Losing AI-Routed Leads?
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[0.95] tracking-tight">
          Free 15-minute AI-readiness audit.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          We&apos;ll check your Google Business Profile, your website&apos;s
          FAQ structured data, your phone setup, and whether your site has
          an after-hours chatbot. You walk away with a punch list of every
          AI lead you&apos;re currently leaking — and exactly what to fix
          first.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book the audit
          </a>
          <a
            href={PHONE_HREF}
            className="tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3 id="faq-legal">Is it legal for Google&apos;s AI to call my business?</h3>
      <p>
        Yes. Google Duplex and Gemini calls comply with FCC and state
        robocall regulations because they&apos;re initiated either by the
        platform for verification purposes or by an actual user requesting
        the call on their behalf — which is legally treated the same as
        the user calling you themselves. The AI is also generally required
        to identify itself as automated when asked.
      </p>

      <h3 id="faq-tell">How do I tell if a call is AI?</h3>
      <p>
        Listen for the slight unnatural pause at the start, the unusually
        even cadence, and how it asks one question at a time. Most will
        also identify themselves up front. When in doubt, ask: &quot;Am I
        speaking with a person or an automated assistant?&quot; — Google&apos;s
        AI is required to disclose.
      </p>

      <h3 id="faq-block">Can I block AI calls?</h3>
      <p>
        You can — but you almost certainly shouldn&apos;t. Blocking
        Google&apos;s AI calls also blocks the leads they&apos;re carrying.
        Far better to handle them well so they convert.
      </p>

      <h3 id="faq-priority">What&apos;s the most important thing to fix first?</h3>
      <p>
        Your{" "}
        <ExternalLink href="https://support.google.com/business">
          Google Business Profile
        </ExternalLink>
        . Fully populated. Every category, every service, every Q&amp;A,
        accurate hours including holidays. The vast majority of AI inquiries
        get answered there without ever calling you. After that, an{" "}
        <InternalLink href="/services/web-design">
          FAQ on your website
        </InternalLink>
        {" "}with structured data is the second-biggest lever.
      </p>

      <h3 id="faq-record">Should I record AI calls?</h3>
      <p>
        Georgia is a one-party consent state, so you can — but the bigger
        value is reviewing how your team handled them. Most VoIP platforms
        already record by default. Pull the recordings of any AI calls and
        coach from there.
      </p>

      <h3 id="faq-replace">Will AI replace my phone reception entirely?</h3>
      <p>
        Not soon, and not the way most owners worry about. The realistic
        2026–2028 picture is hybrid: AI handles the routine info questions
        (hours, prices, availability) directly via your website and Google
        listing, AI calls happen for the next layer (specifics, scheduling),
        and humans handle the high-value emotional and complex calls. Your
        team isn&apos;t going away — they&apos;re just going to handle
        fewer, better calls.
      </p>

      <h3 id="faq-help">How can Branding Zombie help?</h3>
      <p>
        We package the entire fix.{" "}
        <InternalLink href="/services/web-design">Web design</InternalLink>{" "}
        with structured data and built-in FAQ. {" "}
        <InternalLink href="/services/ai-workflows">AI workflows</InternalLink>
        {" "}for the after-hours chatbot and lead capture. {" "}
        <InternalLink href="/services/digital-marketing">
          Local SEO and Google Business Profile
        </InternalLink>
        {" "}fully set up. {" "}
        <InternalLink href="/services/branding">Brand voice</InternalLink>
        {" "}so the words your AI uses on your behalf actually sound like
        you. One studio, one invoice, shipped in days from Cumming, GA.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, Creative Director at Branding Zombie
        Designs. Based in Cumming, GA. Building modern small-business
        websites, AI workflows, and brand systems across North Metro Atlanta
        since 2019.
      </p>
    </>
  );
}

// ─── POSTS registry ───────────────────────────────────────────────────────

export const POSTS: Post[] = [
  {
    meta: {
      slug: "google-ai-is-calling-your-business",
      title:
        "Google's AI Is Already Calling Your Business — Are You Ready?",
      seoTitle:
        "Google's AI Is Calling Small Businesses — How to Be Ready | Branding Zombie Designs",
      seoDescription:
        "Google's AI now calls businesses on behalf of customers. If your phone reception isn't ready, you're losing leads silently. Here's what Cumming, GA owners should do.",
      excerpt:
        "Google's AI now calls small businesses on behalf of customers. If your team doesn't recognize the call or can't answer cleanly, the lead vanishes — and the AI moves on to your competitor. Here's how to be ready.",
      keywords: [
        "google AI calling businesses",
        "Google Duplex business calls",
        "Gemini AI business calls",
        "AI assistant calling small business",
        "prepare business for AI calls",
        "small business AI calls Cumming GA",
        "Forsyth County AI lead capture",
        "how to handle AI customer calls",
        "ask for me Google",
        "AI workflows Cumming GA",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-04-25",
      readingTimeMinutes: 8,
      category: "AI Workflows",
      tags: [
        "AI workflows",
        "Google AI",
        "small business automation",
        "Cumming GA",
        "lead capture",
        "phone reception",
        "local SEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Google's AI is calling small businesses — Branding Zombie Designs",
    },
    Content: GoogleAICallingBusinessContent,
  },
  {
    meta: {
      slug: "how-your-website-is-costing-you-customers",
      title: "How Your Website Is Costing You Customers (and 7 Fixes for 2026)",
      seoTitle:
        "How Your Website Is Costing You Customers | Branding Zombie Designs",
      seoDescription:
        "Your website is quietly losing you sales. Here are 7 silent conversion killers — slow speed, bad mobile, missing CTAs — and how Cumming, GA small businesses fix them.",
      excerpt:
        "Your product is good. Your prices are fair. So why does the phone stop ringing? Seven silent ways a bad website costs you customers — and the fixes that pay for themselves.",
      keywords: [
        "website costing customers",
        "website losing customers",
        "slow website losing sales",
        "outdated website losing customers",
        "small business website Cumming GA",
        "web design Forsyth County",
        "mobile website conversion",
        "why am I losing customers online",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-04-21",
      readingTimeMinutes: 9,
      category: "Web Design",
      tags: [
        "website conversion",
        "small business web design",
        "Cumming GA",
        "website speed",
        "mobile-first design",
        "local SEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "How your website is costing you customers — Branding Zombie Designs",
    },
    Content: WebsiteCostingCustomersContent,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.meta.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((p) => p.meta.slug);
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.meta.datePublished).getTime() -
      new Date(a.meta.datePublished).getTime(),
  );
}

/** Canonical URL for a post. */
export function getPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
