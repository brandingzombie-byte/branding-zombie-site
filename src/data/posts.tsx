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
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
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
        since 2015.
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
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
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
        since 2015.
      </p>
    </>
  );
}

// ─── Post #3 — How Much Does a Small-Business Website Actually Cost in Cumming, GA? ──

function WebsiteCostCummingGA2026Content() {
  return (
    <>
      <p>
        <strong>
          &quot;What does a website cost?&quot; is the first question we get
          on every single discovery call.
        </strong>
      </p>

      <p>
        It&apos;s also the hardest one to get a straight answer to anywhere
        else. Google it and you get five Reddit threads, four agency blogs
        full of agency-speak, and one results page where the cheapest quote
        is $499 and the most expensive is $80,000 — for what looks like the
        same thing.
      </p>

      <p>
        So here&apos;s the actual answer, with actual numbers, for actual
        small businesses in Cumming, Forsyth County, Dawsonville, and the
        rest of North Metro Atlanta. No jargon, no &quot;it depends&quot;
        cop-outs, no fake-cheap teaser quotes.
      </p>

      <p>
        Just what real websites cost in 2026, what changes the price up or
        down, and where our shop fits on the spectrum.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>DIY (Wix / Squarespace):</strong> $200–$800/year if you
            build it yourself. Real cost: 40–80 hours of your time and a site
            that looks like a template.
          </li>
          <li>
            <strong>Freelancer in Cumming or Forsyth:</strong> $800–$3,500
            for a basic 5-page site, depending on experience.
          </li>
          <li>
            <strong>Small studio (us, and a few others in town):</strong>{" "}
            $2,500–$8,000 for a custom, fast, SEO-ready small-business site.
          </li>
          <li>
            <strong>Atlanta agency:</strong> $8,000–$30,000+ for the same
            scope, plus a longer timeline and a project manager you&apos;ll
            never meet.
          </li>
          <li>
            <strong>Our pricing:</strong> Landing $1,500 (1-page).
            Starter $2,500 (5-page). Growth $4,500 (most popular). Premium
            $7,500+. Or the Local Business Kit — site + logo + cards +
            flyers — bundled at $2,800.
          </li>
          <li>
            <strong>Custom budget?</strong> Tell us the number and what
            matters most. We&apos;ll quote a build that fits — within 24
            hours.
          </li>
        </ul>
      </aside>

      <h2 id="why-pricing-varies">Why Web Design Pricing Is All Over the Map</h2>

      <p>
        Same question, ten different answers — because &quot;website&quot;
        means ten different things.
      </p>

      <p>
        A 1-page Linktree replacement is not the same product as a 30-page
        contractor site with quote forms, online booking, a service-area
        map, and Google reviews syndicated in. They share a URL bar and
        nothing else.
      </p>

      <p>
        On the supply side, the people building them range from a high
        schooler with Wix to a 40-person Atlanta agency billing $200/hour.
        The directory of web developers on{" "}
        <ExternalLink href="https://clutch.co/web-developers">
          Clutch
        </ExternalLink>{" "}
        shows shops listing rates from <strong>under $25/hour to
        $150–$199/hour</strong>, with most clustering between $25 and $99.
        That&apos;s a 6× spread on labor before scope even enters the
        conversation.
      </p>

      <p>So when you see a quote, the real questions are:</p>

      <ul>
        <li>What&apos;s the actual scope (page count, features, integrations)?</li>
        <li>Who&apos;s building it (skill level, location, overhead)?</li>
        <li>What&apos;s included after launch (hosting, edits, SEO, support)?</li>
        <li>Is it a one-time fee or a forever-monthly trap?</li>
      </ul>

      <p>
        Two quotes can both say &quot;website — $5,000&quot; and mean
        completely different things. The point of this guide is to make the
        comparison apples-to-apples.
      </p>

      <h2 id="five-buckets">The 5 Real Pricing Buckets in 2026</h2>

      <p>
        Every small-business website built in North Metro Atlanta in 2026
        falls into one of these five buckets. Pick the one that matches your
        situation, then read the trade-offs.
      </p>

      <h3 id="bucket-diy">1. DIY Builder (Wix, Squarespace, GoDaddy) — $200–$800/year</h3>
      <p>
        You build it yourself. Pick a template, drag some blocks, add your
        logo (or use the AI one). Site goes live in a weekend.
      </p>
      <p>
        <strong>Real cost:</strong> 40–80 hours of your time, plus
        $20–$70/month forever. The platform owns your site — try moving it
        and watch the URLs explode. SEO is mediocre out of the box, page
        speed is template-bound, and your &quot;custom&quot; design is
        sharing a layout with 8,000 other small businesses on the same
        template.
      </p>
      <p>
        <strong>Best for:</strong> hobby projects, very early-stage testing,
        and people who genuinely enjoy futzing with builders. Not a real
        long-term play once revenue is on the line.
      </p>

      <h3 id="bucket-freelancer">2. Local Freelancer — $800–$3,500</h3>
      <p>
        A solo developer or designer in Cumming, Forsyth, Dawsonville, or
        somewhere on Craigslist. They build on WordPress (usually
        Elementor), Wix, or Squarespace. Often a side hustle.
      </p>
      <p>
        <strong>What you get:</strong> a 5–8 page site, a contact form, a
        logo if you&apos;re lucky, and a launch in 3–8 weeks. Quality is
        wildly inconsistent — some local freelancers ship beautiful work,
        others vanish mid-project with your $1,500 deposit. Reference
        checks matter more here than in any other bucket.
      </p>
      <p>
        <strong>Watch for:</strong> &quot;Free hosting forever&quot; that
        becomes $50/month after year one. No source code handoff. No
        ownership of the domain. Page speed scores in the 30s.
      </p>

      <h3 id="bucket-small-studio">3. Small Studio (Branding Zombie tier) — $2,500–$8,000</h3>
      <p>
        A real shop — usually 1–4 people — that ships a few sites a month
        and has a portfolio you can actually call references on. Builds are
        custom, fast (
        <ExternalLink href="https://pagespeed.web.dev/">
          PageSpeed
        </ExternalLink>{" "}
        scores 90+), and SEO-ready out of the gate. Timelines are{" "}
        <strong>2–6 weeks</strong>, not 4 months.
      </p>
      <p>
        <strong>What you get:</strong> 5–15 pages, a real strategy
        conversation, mobile-first design, structured data, Google Business
        Profile setup, analytics, a CMS you can actually edit, and a human
        who picks up the phone after launch. Most studios in this tier
        bundle in branding, copy, and at least some local SEO.
      </p>
      <p>
        This is the bucket Branding Zombie lives in. It&apos;s also where
        most North Metro Atlanta small businesses get the best
        dollar-for-dollar outcome — agency-caliber work without the agency
        timeline or invoice.
      </p>

      <h3 id="bucket-boutique">4. Boutique Atlanta Agency — $8,000–$25,000</h3>
      <p>
        A 5–25 person agency in Atlanta, Buckhead, or Midtown. Often
        industry-specialized (medical, legal, real estate). Real designers,
        real developers, real account managers.
      </p>
      <p>
        <strong>What you get:</strong> 10–30 pages, brand workshops, custom
        photography, more polished copy, a project manager, longer
        timelines (2–4 months), and significantly more meetings. Quality is
        usually high. So is the price.
      </p>
      <p>
        <strong>Best for:</strong> businesses with $1M+ revenue and a real
        budget for marketing. Overkill for a roofer in Cumming, on point
        for a multi-location dental group in Alpharetta.
      </p>

      <h3 id="bucket-enterprise">5. Full-Service Agency — $25,000–$80,000+</h3>
      <p>
        Mid-size agencies, big-name studios, anyone with a Buckhead office
        tower. Custom CMS, custom design system, deep integrations,
        multiple stakeholders, six-month timelines, and a contract longer
        than your lease.
      </p>
      <p>
        <strong>Best for:</strong> regional chains, franchise systems, and
        venture-funded startups. Almost never the right call for a Main
        Street small business — the math doesn&apos;t work.
      </p>

      <h2 id="going-rates">Going Rates in Cumming, Forsyth & Dawsonville</h2>

      <p>
        Specific, observed numbers — what we see locally on actual quotes
        homeowners and shop owners forward to us when they&apos;re
        comparing.
      </p>

      <h3 id="rate-cumming">Cumming, GA</h3>
      <p>
        Highest density of options because of population. Freelancers
        running off Bald Ridge Marina or out of a co-working space on
        Buford Highway typically quote <strong>$1,200–$3,000</strong> for a
        basic site. Two or three established small studios (us included)
        quote in the <strong>$2,500–$7,500</strong> range. A handful of
        bigger Atlanta-adjacent shops will travel up here for{" "}
        <strong>$8,000+</strong>.
      </p>

      <h3 id="rate-forsyth">Forsyth County (Suwanee, Sugar Hill, Coal Mountain)</h3>
      <p>
        Same general spread as Cumming, slightly lower at the freelance
        end (<strong>$800–$2,500</strong> is common because more
        moonlighters). Established studios still land{" "}
        <strong>$2,500–$8,000</strong>. The county&apos;s median household
        income is well above the Georgia average, which is why agency
        quotes from Atlanta show up here more than they should — the
        spend is there even when the scope doesn&apos;t need it.
      </p>

      <h3 id="rate-dawsonville">Dawsonville & Dawson County</h3>
      <p>
        Smaller market, fewer in-town options. Most local freelancers
        quote <strong>$800–$2,500</strong>. Custom small-studio work is
        usually contracted from Cumming or Gainesville at{" "}
        <strong>$2,500–$6,000</strong>. The North Georgia Premium Outlets
        bring traffic that punches above the population, so retail and
        restaurant owners up here often need ecommerce or online ordering —
        which moves the price into the $4,500–$8,000 band.
      </p>

      <h3 id="rate-alpharetta">Alpharetta, Johns Creek, Milton</h3>
      <p>
        Highest going rates in our area. Lots of corporate spillover from
        north Fulton, lots of agencies. Freelancers <strong>$1,500–$4,000</strong>.
        Studios <strong>$3,500–$10,000</strong>. Boutique agencies{" "}
        <strong>$10,000–$30,000</strong>. Same site, different ZIP code,
        sometimes 2× the quote.
      </p>

      <h3 id="rate-gainesville">Gainesville, Flowery Branch, Oakwood</h3>
      <p>
        Mostly served from Gainesville and Cumming. Freelancers{" "}
        <strong>$800–$2,500</strong>. Studios{" "}
        <strong>$2,500–$6,500</strong>. Lower density of options means
        timelines run longer at the freelance end.
      </p>

      <h2 id="branding-zombie-pricing">What Branding Zombie Charges (and What&apos;s Inside)</h2>

      <p>
        Three flat-priced{" "}
        <InternalLink href="/services/web-design">web design</InternalLink>{" "}
        tiers. Every one is quoted up-front, no hourly billing, no surprise
        invoices.
      </p>

      <h3 id="bz-starter">Starter — $2,500</h3>
      <p>
        Up to 5 pages. Custom design, mobile-first, Next.js or Webflow
        build, contact form, basic analytics, on-page SEO, and a Google
        Business Profile setup. Launches in <strong>2–3 weeks</strong>.
        Best for new businesses, single-location service shops, and anyone
        replacing a sad WordPress site that&apos;s been limping along
        since 2018.
      </p>

      <h3 id="bz-growth">Growth — $4,500 (most popular)</h3>
      <p>
        Up to 10 pages. Everything in Starter plus integrations (Calendly,
        CRM, Mailchimp/Klaviyo, etc.), expanded local SEO, schema markup,
        an analytics dashboard, and a 30-day post-launch polish window.
        Launches in <strong>3–4 weeks</strong>. About 7 in 10 of our
        web-design projects land here — it&apos;s the sweet spot for
        established small businesses with real revenue and real customers
        to keep happy.
      </p>

      <h3 id="bz-premium">Premium — $7,500+</h3>
      <p>
        Unlimited pages, custom functionality, ecommerce-ready, deeper
        integrations (membership areas, booking systems, multi-location
        directories, custom calculators). Quoted on the discovery call
        because scope varies. Launches in <strong>4–6 weeks</strong>.
      </p>

      <h3 id="bz-launch-package">Launch Package — $4,500 (everything bundled)</h3>
      <p>
        Site + logo + brand identity + 90-day content calendar — all built
        as one connected system in 4 weeks. À-la-carte these four pieces
        run <strong>$6,499</strong>. Bundled, $4,500. Designed for
        founders launching for the first time, or established businesses
        doing a full refresh after years of duct-taping logos and websites
        together.
      </p>
      <p>
        Details on the{" "}
        <InternalLink href="/services/launch-package">
          Launch Package page
        </InternalLink>
        .
      </p>

      <h3 id="bz-related">Other services priced separately</h3>
      <ul>
        <li>
          <InternalLink href="/services/ecommerce">Shopify ecommerce</InternalLink>{" "}
          — Starter $3,000, Growth $5,500, Premium $8,500+
        </li>
        <li>
          <InternalLink href="/services/ai-workflows">AI workflows</InternalLink>{" "}
          (chatbot, lead capture, automation) — from $750 setup + $149/mo
        </li>
        <li>
          <InternalLink href="/services/branding">Logo &amp; brand identity</InternalLink>{" "}
          (without the bundle) — from $1,500
        </li>
        <li>
          <InternalLink href="/services/digital-marketing">Local SEO &amp; ongoing marketing</InternalLink>{" "}
          — month-to-month
        </li>
      </ul>

      <p>
        Every quote we send out includes a one-page scope, a one-page
        timeline, and the total. No retainers required. No
        &quot;forever-monthly&quot; trap.
      </p>

      <h2 id="custom-quote">When None of the Tiers Fit — Custom Quotes</h2>

      <p>
        About a quarter of the projects we book don&apos;t fit a tier
        cleanly. Real examples from the last few months:
      </p>

      <ul>
        <li>
          A nonprofit that needed 30 pages but had a $3,800 ceiling — we
          built a stripped-down Growth with a content-entry workflow they
          could finish themselves.
        </li>
        <li>
          A second-generation HVAC shop that wanted just a 3-page site
          plus a CRM-connected quote form — under Starter scope but with a
          custom integration. Quoted at $1,950.
        </li>
        <li>
          A boutique fitness studio that wanted ecommerce + member portal
          + a public class schedule — between Growth and Premium ecommerce.
          Quoted at $6,800.
        </li>
        <li>
          A specialty food brand that needed{" "}
          <InternalLink href="/cpg-launch">CPG packaging</InternalLink>{" "}
          + Shopify + Klaviyo flows + the website to match — bundled
          across multiple services into one number.
        </li>
      </ul>

      <p>
        <strong>If your situation doesn&apos;t map to a tier, tell us
        what you actually need and what budget you&apos;re working with.</strong>{" "}
        We&apos;ll quote a build sized to that — usually within 24 hours,
        always flat-priced, never with a &quot;starting at&quot; that
        balloons by invoice three.
      </p>

      <h2 id="what-moves-price">What Moves the Price Up or Down</h2>

      <p>
        Same studio, same designer — five things drive 80% of the variance
        between quotes.
      </p>

      <h3 id="moves-pages">Page count and content depth</h3>
      <p>
        5 pages vs 30 pages is real labor. Content that&apos;s already
        written shaves days off; content we have to interview, draft, and
        revise adds them.
      </p>

      <h3 id="moves-integrations">Integrations</h3>
      <p>
        Calendly, HubSpot, QuickBooks, ServiceTitan, Jobber, Mindbody,
        Toast, Square, Klaviyo — each one is a real chunk of work. One or
        two are usually included; six aren&apos;t.
      </p>

      <h3 id="moves-ecommerce">Ecommerce</h3>
      <p>
        Selling 5 products is one quote. Selling 500 with variants,
        wholesale tiers, subscriptions, and a Klaviyo flow is a different
        quote. See our{" "}
        <InternalLink href="/services/ecommerce">
          ecommerce pricing
        </InternalLink>{" "}
        for the breakdown.
      </p>

      <h3 id="moves-content">Whether we&apos;re writing the copy</h3>
      <p>
        If you have draft copy, we polish and ship. If we&apos;re writing
        the homepage, services pages, FAQ, and 4 location pages from
        scratch, that&apos;s a real chunk of the timeline — and it
        deserves to be priced.
      </p>

      <h3 id="moves-photography">Photography &amp; brand assets</h3>
      <p>
        Stock photography is fine for some sites. Custom photography of
        your shop, your team, and your work is what makes a small-business
        site actually feel <em>local</em>. We coordinate it but the day
        rate sits separately on the quote so there are no surprises.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Need a Custom Quote?
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          Tell us your scope and budget. We&apos;ll send a flat quote in 24
          hours.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          15 minutes on the phone, no pitch, no &quot;starting at&quot;
          fakery. You walk away with a real number, a real timeline, and
          a real scope you can take to anyone else for a second opinion.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book the call
          </a>
          <a
            href={PHONE_HREF}
            className="tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <h2 id="how-to-budget">How to Set a Budget by Business Type</h2>

      <p>
        Rough working numbers based on the small businesses we&apos;ve
        shipped sites for in North Metro Atlanta. Spend within reason — a
        site that pays for itself in 1–2 customers is a fine investment;
        one that takes 14 months to break even isn&apos;t.
      </p>

      <ul className="checklist">
        <li>
          <strong>Solo service pro</strong> (handyman, lawn care, mobile
          detailer): $1,500–$3,500. Small site, big focus on phone calls
          and Google Business Profile.
        </li>
        <li>
          <strong>Local restaurant or cafe</strong>: $2,500–$5,500. Menu,
          ordering link, hours, photos, Toast/Square integration. Budget
          for real photography.
        </li>
        <li>
          <strong>Trades &amp; home services</strong> (HVAC, roofing,
          electric, plumbing): $3,500–$7,500. Service-area pages, quote
          forms, financing widget, after-hours{" "}
          <InternalLink href="/services/ai-workflows">AI chatbot</InternalLink>.
        </li>
        <li>
          <strong>Boutique retail or product brand</strong>:
          $4,500–$10,000+. Shopify build, product photography, Klaviyo,
          paid-ad ready landing pages. See{" "}
          <InternalLink href="/services/ecommerce">ecommerce</InternalLink>.
        </li>
        <li>
          <strong>Professional services</strong> (dental, legal, medical,
          financial): $5,000–$12,000. More pages, compliance review,
          integrations with practice-management tools.
        </li>
        <li>
          <strong>Multi-location franchise or chain</strong>:
          $8,000–$25,000. Location pages, central CMS, regional SEO,
          ongoing maintenance.
        </li>
        <li>
          <strong>Brand-new launch (no logo, no brand, nothing)</strong>:
          the{" "}
          <InternalLink href="/services/launch-package">
            Launch Package
          </InternalLink>{" "}
          at $4,500 is almost always the right move.
        </li>
      </ul>

      <h2 id="hidden-costs">The Hidden Costs Nobody Quotes Up Front</h2>

      <p>Watch the line items below the &quot;website build&quot; total.</p>

      <ul>
        <li>
          <strong>Hosting:</strong> $0–$300/month depending on stack. Our
          Next.js builds usually run $0–$20/month on Vercel. WordPress
          shops often charge $50–$150/month for &quot;managed&quot;
          hosting that&apos;s mostly margin.
        </li>
        <li>
          <strong>Domain:</strong> $12–$30/year. You should own this
          directly. If your developer registers it under their account,
          fix that on day one.
        </li>
        <li>
          <strong>SSL certificate:</strong> $0 in 2026. If you&apos;re
          quoted for one, that&apos;s a flag.
        </li>
        <li>
          <strong>Edits after launch:</strong> $0 if you have a real CMS;
          $100–$200/hour if your shop locked the site down. Always ask.
        </li>
        <li>
          <strong>Plugins / subscriptions:</strong> WordPress sites often
          carry $200–$1,200/year in plugin licenses (Yoast, Elementor Pro,
          forms, security, backups). Modern Next.js builds usually have
          zero.
        </li>
        <li>
          <strong>Email:</strong> Google Workspace runs $7/user/month for
          a real <code>@yourbusiness.com</code> address. Worth it.
        </li>
        <li>
          <strong>Ad spend / SEO retainer:</strong> separate line item.
          The{" "}
          <ExternalLink href="https://www.sba.gov/business-guide/manage-your-business/marketing-sales">
            SBA&apos;s marketing guidance
          </ExternalLink>{" "}
          recommends most small businesses budget marketing as its own
          chunk on top of the build.
        </li>
      </ul>

      <p>
        Total ongoing cost on a Branding Zombie build runs about{" "}
        <strong>$20–$40/month</strong> for a service-business site after
        launch. That&apos;s hosting + email + domain renewal. No retainer,
        no plugin tax, no &quot;managed care plan.&quot;
      </p>

      <h2 id="value-context">Is It Worth It? The Quick Math.</h2>

      <p>
        A Cumming HVAC company we shipped a Growth-tier site for in 2025
        averages one extra service call a week traceable to the new site
        and the connected{" "}
        <InternalLink href="/services/digital-marketing">
          Google Business Profile
        </InternalLink>
        . Average ticket: about $380. That&apos;s ~$19,800/year in
        recovered revenue against a $4,500 one-time build.
      </p>

      <p>
        That&apos;s a real number from a real client. It&apos;s not what
        every business will see — but the pattern holds: a site that loads
        fast, ranks locally, and answers questions clearly pays for itself
        inside the first quarter for any service business with real
        customer demand.
      </p>

      <p>
        Industry research backs the &quot;design quality matters&quot;
        side of the math:{" "}
        <ExternalLink href="https://credibility.stanford.edu/">
          Stanford&apos;s Web Credibility Project
        </ExternalLink>{" "}
        found that 75% of users judge a business&apos;s credibility from
        its website design alone, and{" "}
        <ExternalLink href="https://www.brightlocal.com/research/local-consumer-review-survey/">
          BrightLocal
        </ExternalLink>{" "}
        finds 87% of consumers use Google to evaluate local businesses
        before they call. The website is the salesperson on shift 24/7.
      </p>

      <h2 id="cumming-angle">Why Pricing Looks Different in Cumming &amp; Forsyth Specifically</h2>

      <p>
        North Metro Atlanta is one of the most economically active small
        markets in the country. Forsyth County alone has been one of the
        fastest-growing counties in Georgia for a decade. Median household
        income runs well above the state average, and small businesses
        here compete against Atlanta-spillover marketing budgets.
      </p>

      <p>
        That changes two things about pricing locally:
      </p>

      <ol>
        <li>
          <strong>The bottom of the market is unusually thin.</strong>{" "}
          $500–$1,000 web sites that work in rural Georgia barely exist
          here. Most quotes start at $1,500.
        </li>
        <li>
          <strong>The middle is unusually crowded.</strong> Plenty of
          small studios — us included — fight for the same
          $2,500–$8,000 builds. That&apos;s good for buyers. Compare
          three quotes, ask for portfolio links, call references.
        </li>
      </ol>

      <p>
        If you&apos;re a small business in Cumming, Forsyth County,
        Dawsonville, Alpharetta, Roswell, Woodstock, Buford, Suwanee,
        Gainesville, or anywhere else in the area — the right answer
        almost always lives in bucket #3 (small studio, $2,500–$8,000).
        Not bucket #1 (DIY, you&apos;ll regret it), not bucket #5 (full
        agency, you&apos;ll overpay).
      </p>

      <p>
        We&apos;re happy to be one of the three quotes you compare. The
        first call is free, fifteen minutes, and you&apos;ll walk away
        with a number whether you hire us or not.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3 id="faq-cheapest">What&apos;s the cheapest you&apos;ll build a website for?</h3>
      <p>
        Our floor is $2,500 for the Starter tier (5-page custom site).
        Below that, you&apos;re better off on Squarespace — and we&apos;ll
        say that on the call. We don&apos;t take projects we can&apos;t
        ship well.
      </p>

      <h3 id="faq-financing">Do you offer payment plans?</h3>
      <p>
        Yes. Standard split is 50% to start, 50% on launch. For larger
        projects ($7,500+) we can split into thirds. We also work with
        net-30 invoicing for established businesses.
      </p>

      <h3 id="faq-vs-wix">How do you compare to Wix or Squarespace?</h3>
      <p>
        Speed, SEO, and ownership. Template builders lock you into their
        platform, drag your{" "}
        <ExternalLink href="https://pagespeed.web.dev/">
          Core Web Vitals
        </ExternalLink>{" "}
        scores down, and still leave you paying $25–$70/month forever.
        Our builds are typically faster, rank better, and cost about
        $20/month after launch — and you own the source code.
      </p>

      <h3 id="faq-ongoing">Are there ongoing fees after launch?</h3>
      <p>
        Just hosting (usually $0–$20/month on Vercel) and your domain
        ($12–$30/year). No retainer required. You can hand the site off to
        another shop or your in-house person on day one if you want — the
        code is yours.
      </p>

      <h3 id="faq-research">How does your pricing compare to industry averages?</h3>
      <p>
        Industry research from{" "}
        <ExternalLink href="https://www.webfx.com/web-design/pricing/">
          WebFX
        </ExternalLink>{" "}
        puts &quot;basic web design&quot; at $6,500–$15,000 nationally.
        Our Growth tier at $4,500 lands well below that mid-market band
        for comparable scope — because we&apos;re a small shop with low
        overhead in Cumming, not a 30-person agency in Buckhead.
      </p>

      <h3 id="faq-everything">Do I have to do everything at once?</h3>
      <p>
        No. You can start with the website, add{" "}
        <InternalLink href="/services/ai-workflows">
          AI workflows
        </InternalLink>{" "}
        in month two, layer in{" "}
        <InternalLink href="/services/digital-marketing">
          local SEO
        </InternalLink>{" "}
        when you&apos;re ready. The Launch Package exists for owners who
        want the whole thing done once — but it&apos;s a choice, not a
        requirement.
      </p>

      <h3 id="faq-quote">How do I actually get a quote?</h3>
      <p>
        Three options: book a free 15-minute call, request a custom quote
        through the form on any service page, or call{" "}
        <a href={PHONE_HREF} className="font-medium underline">
          {PHONE_DISPLAY}
        </a>
        . We answer during normal hours and respond to forms within 24
        hours, usually faster.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, Creative Director at Branding Zombie
        Designs. Based in Cumming, GA. Building modern small-business
        websites, AI workflows, and brand systems across North Metro
        Atlanta since 2015.
      </p>
    </>
  );
}

// ─── Post #4 — How Much Does a Logo Cost in Cumming, GA? ───────────────────

function LogoCostCummingGAContent() {
  return (
    <>
      <p>
        <strong>
          So how much does a logo cost? In Cumming, GA, a professional logo
          typically runs $750&ndash;$2,500
        </strong>{" "}
        — depending on whether you need just the mark or a full brand kit. At
        Branding Zombie Designs, we publish our ranges instead of hiding them,
        because the price of a logo shouldn&apos;t be a guessing game.
      </p>

      <p>
        That&apos;s the short answer. If you want to know <em>why</em> prices
        swing from $5 to $5,000+ — and what you actually get for your money —
        keep reading.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>A professional logo in Cumming, GA runs $750–$2,500</strong>{" "}
            depending on whether you need just the mark or a full brand kit.
          </li>
          <li>
            <strong>$5 marketplace and AI logos</strong> are usually a stock
            icon plus a font — no source files, no ownership, often resold to a
            dozen other businesses.
          </li>
          <li>
            <strong>Our tiers:</strong> $750 Starter, $1,500 Growth, $2,500
            Premium (full identity).
          </li>
          <li>
            <strong>Launching from zero?</strong> The $997 Startup Special
            bundles a logo with a 1-page site, business cards, and flyers.
          </li>
          <li>
            <strong>A cheap logo usually costs more later</strong> — you rebrand
            within 18 months and pay twice.
          </li>
        </ul>
      </aside>

      <h2 id="why-prices-range">Why Do Logo Prices Range So Wildly?</h2>
      <p>
        You can get a logo for $5 on a marketplace site, or pay $5,000+ to a
        big-city agency. Same word — &quot;logo&quot; — wildly different things.
      </p>
      <p>The price tracks four things:</p>
      <ul>
        <li>
          <strong>Who&apos;s making it.</strong> A template-filler overseas, an
          AI tool, a freelancer, or an experienced studio that owns the whole
          process.
        </li>
        <li>
          <strong>How much of it is original.</strong> A $5 logo is usually a
          stock icon plus a font. A real logo is drawn for <em>your</em>{" "}
          business.
        </li>
        <li>
          <strong>What you walk away with.</strong> One low-res image? Or full
          source files, color variations, and usage rights you actually own.
        </li>
        <li>
          <strong>Whether it&apos;s built to scale.</strong> A logo that only
          works on a screen is not the same as one that survives on a truck
          wrap, an embroidered polo, and a yard sign.
        </li>
      </ul>
      <p>
        Cheap looks like a deal until you try to put it on something real. Then
        the gaps show up.
      </p>

      <h2 id="price-tiers">What You Actually Get at Each Price Tier</h2>
      <p>
        Here&apos;s the honest version of what each budget buys — not the
        brochure version.
      </p>
      <p>
        <strong>$5–$50 (marketplace / AI generators).</strong> A stock icon
        paired with a font, sometimes resold to a dozen other businesses. No
        source files, no strategy, no one to call when it breaks. Fine for a
        weekend hobby. Risky for a business you&apos;re betting on.
      </p>
      <p>
        <strong>$100–$400 (budget freelancer / contest sites).</strong> A real
        person, but often rushed, template-leaning, and light on revisions. You
        might get a usable mark. You might also get something that looks like
        three other local shops.
      </p>
      <p>
        <strong>$750–$2,500 (professional studio — our range).</strong> Original
        concepts, real revisions, full file formats, one-color and
        embroidery-ready versions, and the rights to use it everywhere. This is
        the tier where a logo becomes an asset instead of a placeholder.
      </p>
      <p>
        <strong>$5,000+ (agency / brand firm).</strong> Often excellent — and
        often more process and overhead than a first-time small business in
        Forsyth County actually needs to launch.
      </p>

      <h2 id="how-much-should-you-pay">
        How Much Should a Small Business Pay for a Logo in Cumming?
      </h2>
      <p>
        For most first-time owners in Cumming and Forsyth County, the honest,
        real-world range is <strong>$750 to $2,500</strong>. Where you land
        depends on scope, not vanity.
      </p>
      <p>
        At Branding Zombie Designs, our{" "}
        <InternalLink href="/services/logo-design">logo design</InternalLink>{" "}
        tiers look like this:
      </p>
      <ul>
        <li>
          <strong>Starter — $750.</strong> A clean, professional, original logo
          with the core files you need to open the doors.
        </li>
        <li>
          <strong>Growth — $1,500.</strong> The logo <em>plus</em> the full set
          of file formats and variations (horizontal, stacked, icon-only,
          one-color, embroidery-ready).
        </li>
        <li>
          <strong>Premium — $2,500.</strong> A full visual identity: logo, color
          palette, and font system so everything you print and post looks like
          the same business.
        </li>
      </ul>
      <p>
        If you&apos;re launching from zero, the{" "}
        <InternalLink href="/startup-special">$997 Startup Special</InternalLink>{" "}
        bundles a logo with a 1-page website, business cards, and flyers — a
        popular starting point for brand-new shops. Every number here is a
        starting range, not a fixed quote; scope moves it. When you&apos;re
        ready for a real figure,{" "}
        <InternalLink href="/services/request-quote">request a quote</InternalLink>{" "}
        or text Gerry.
      </p>

      <h2 id="cheap-logo-cost">What Does a Cheap Logo Really Cost You Later?</h2>
      <p>
        This is the part the $5 sellers don&apos;t mention. The sticker price
        isn&apos;t the real price.
      </p>
      <p>A cheap logo usually means:</p>
      <ul>
        <li>
          <strong>No source files.</strong> When you need a bigger version for a
          banner, you can&apos;t get one. You&apos;re stuck — or you&apos;re
          paying someone to rebuild it from scratch.
        </li>
        <li>
          <strong>No variations.</strong> One full-color file. Try putting that
          on a dark t-shirt or a one-color stamp and watch it fall apart.
        </li>
        <li>
          <strong>It looks like someone else&apos;s.</strong> Stock icons get
          resold. We&apos;ve seen two businesses on the same road running nearly
          the same &quot;custom&quot; logo.
        </li>
        <li>
          <strong>It can&apos;t scale.</strong> A logo built only for a website
          often turns to mush on a{" "}
          <InternalLink href="/services/print-design">
            truck wrap, sign, or embroidered shirt
          </InternalLink>
          . The detail that looked fine on screen clogs up at stitch resolution.
        </li>
      </ul>
      <p>
        So you rebrand in eighteen months. New logo, new signs, new shirts,
        reprinted cards — and you pay <em>twice</em>. Cheap is expensive on a
        delay.
      </p>

      <h2 id="whats-included">
        What&apos;s Included in a Professional Logo Design?
      </h2>
      <p>
        When you pay studio rates, you&apos;re not just buying a picture. A
        professional{" "}
        <InternalLink href="/services/logo-design">logo design</InternalLink>{" "}
        package should include:
      </p>
      <ul>
        <li>
          <strong>Multiple original concepts</strong> drawn for your business —
          not auto-generated.
        </li>
        <li>
          <strong>A real revision round or two</strong>, so the final mark is
          actually right.
        </li>
        <li>
          <strong>Every file format you&apos;ll need:</strong> vector
          (AI/EPS/SVG), PNG, JPG, PDF — for print and screen.
        </li>
        <li>
          <strong>Variations:</strong> horizontal, stacked, icon-only, and a
          one-color / embroidery-ready version for apparel and signage.
        </li>
        <li>
          <strong>Color and clear-space guidance</strong> so it stays consistent
          everywhere.
        </li>
        <li>
          <strong>Full usage rights</strong> — you own it, free to put it on
          anything.
        </li>
      </ul>
      <p>
        That last point matters. If you can&apos;t legally and practically put
        your logo on a website, a shirt, and a sign without re-buying it, you
        didn&apos;t get a logo. You rented a JPG.
      </p>

      <h2 id="logo-vs-branding">Do I Need a Logo or Full Brand Identity?</h2>
      <p>
        Short version: a <strong>logo</strong> is the mark. A{" "}
        <strong>brand identity</strong> is the whole system — logo, colors,
        fonts, and the rules that keep them consistent across your website,
        signs, and shirts.
      </p>
      <p>
        Get <strong>just a logo</strong> if you&apos;re testing an idea, on a
        tight launch budget, or only need a clean mark right now. Our Starter
        tier or the Startup Special covers this.
      </p>
      <p>
        Get <strong>full brand identity</strong> if you&apos;re investing for the
        long haul, plan to show up across a lot of surfaces, or want everything
        to look unmistakably like <em>you</em>. That&apos;s our Premium tier and
        our{" "}
        <InternalLink href="/services/branding">brand identity service</InternalLink>
        .
      </p>
      <p>
        The nice part about working with one studio: logo, website, shirts, and
        signs come from one designer on one invoice. Nothing clashes because
        nobody&apos;s guessing what your colors are. For more on what a site
        should cost, see our{" "}
        <InternalLink href="/blog/website-cost-cumming-ga-2026">
          Cumming, GA website cost guide
        </InternalLink>
        .
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Stop Renting a JPG
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          A logo that works on a truck, a polo, and a yard sign.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          If your logo can&apos;t survive being shrunk to a business card or
          stitched onto a hat, it&apos;s already half-dead. Let&apos;s build one
          that does — with every file you&apos;ll ever need and the rights to
          use it anywhere.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-vary">Why do logo prices vary so much?</h3>
      <p>
        Because &quot;logo&quot; covers everything from a resold stock icon to a
        fully original, scalable identity. Price tracks who makes it, how much is
        custom, what files you receive, and whether it works on a truck and a
        shirt — not just a screen. You&apos;re paying for ownership and
        durability, not just an image.
      </p>

      <h3 id="faq-how-much">How much should a small business pay for a logo?</h3>
      <p>
        For most small businesses in Cumming and Forsyth County, $750 to $2,500
        is the honest range. Around $750 gets a clean professional mark; $2,500
        gets a full identity with colors and fonts. The right number depends on
        how many places your brand needs to live, not vanity.
      </p>

      <h3 id="faq-cheap">Is a cheap logo worth it?</h3>
      <p>
        Rarely, if it&apos;s a business you&apos;re serious about. Cheap logos
        usually skip source files, variations, and usage rights — so they
        can&apos;t scale to signage or embroidery and often look like someone
        else&apos;s. You frequently end up rebranding within two years and paying
        twice. Cheap is just expensive on a delay.
      </p>

      <h3 id="faq-included">What&apos;s included in a professional logo design?</h3>
      <p>
        Multiple original concepts, revision rounds, and every file format you
        need — vector, PNG, JPG, PDF. You also get variations (horizontal,
        stacked, icon-only, one-color/embroidery-ready) plus color guidance and
        full usage rights, so you can legally put your logo anywhere without
        buying it again.
      </p>

      <h3 id="faq-logo-or-branding">Do I need a logo or full branding?</h3>
      <p>
        Get just a logo if you&apos;re launching lean or testing an idea — a
        clean mark is enough to open. Get full branding (logo, colors, fonts) if
        you&apos;re investing long-term and will appear across a website, signs,
        and apparel. Full identity keeps everything consistent so your business
        looks like one business.
      </p>

      <h3 id="faq-ai">Can I just use an AI logo generator?</h3>
      <p>
        You can, and it&apos;s fine for a quick placeholder. But AI tools often
        reuse common shapes, can&apos;t reliably deliver clean vector or
        embroidery files, and don&apos;t own the strategy behind the mark. The
        result frequently looks generic or breaks on physical products. We dug
        into where AI helps and where it leaves you stranded in our{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          piece on AI and your business
        </InternalLink>
        .
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function ForsythLicenseChecklistContent() {
  return (
    <>
      <p>
        <strong>
          Just got your Forsyth County business license? Congratulations — the
          hard, boring part is done.
        </strong>{" "}
        Now comes the part that actually makes people in Cumming, GA hire you:
        making your new business <em>look</em> like a business. This 30-day,
        week-by-week brand checklist walks you through exactly what to set up
        first — logo, website, signage, and apparel. It&apos;s written by
        Branding Zombie Designs, a graphic + web design studio in Cumming, GA
        that builds brands for new Forsyth County owners every week.
      </p>

      <p>
        Here&apos;s the truth nobody tells you: the license makes you{" "}
        <em>legal</em>, but your brand is what makes you <em>hireable</em>. A
        customer can&apos;t see your tax certificate. They see your logo on a
        yard sign, your reviews on Google, and whether your website looks like
        you&apos;ll still be around next year.
      </p>

      <p>Let&apos;s get you looking legit in 30 days.</p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The 30-Day Plan
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Start with the logo.</strong> Your website, cards, signs,
            and shirts all pull their colors and look from it — build it first
            so you don&apos;t redo everything later.
          </li>
          <li>
            <strong>Week 1:</strong> lock your name, logo, and 2&ndash;3 brand
            colors. Grab matching social handles.
          </li>
          <li>
            <strong>Week 2:</strong> set up a free Google Business Profile, put
            up a simple website, and order business cards.
          </li>
          <li>
            <strong>Week 3:</strong> get visible in the real world — yard signs,
            vehicle lettering, a storefront decal or banner.
          </li>
          <li>
            <strong>Week 4:</strong> branded apparel + consistent social
            profiles so you look like an established team.
          </li>
          <li>
            <strong>Budget launch:</strong> the $997 Startup Special bundles
            logo + a 1-page site + cards + flyers, done by one designer.
          </li>
        </ul>
      </aside>

      <h2 id="the-license-itself">First, a Quick Word on the License Itself</h2>
      <p>
        Before we dive into branding, one practical note. In Forsyth County,
        businesses generally need an occupational tax certificate (often called
        a &quot;business license&quot;) issued by the county or, if you&apos;re
        inside the City of Cumming, by the city.
      </p>
      <p>
        Requirements, fees, and home-business rules change, and they depend on
        what you do and where you do it.{" "}
        <strong>
          Always confirm the current requirements directly with Forsyth County
          or the City of Cumming before you rely on anything you read online —
          including this post.
        </strong>{" "}
        We&apos;re a design studio, not your attorney or accountant.
      </p>
      <p>
        Got the certificate handled? Good. Everything below is the part we{" "}
        <em>can</em> help with.
      </p>

      <h2 id="logo-or-website-first">
        What Should a New Business Set Up First — Logo or Website?
      </h2>
      <p>Your logo. Always start with the logo.</p>
      <p>
        Here&apos;s why: your website, business cards, signs, social profiles,
        and shirts all <em>pull from</em> your logo and brand colors. Build the
        website first and you&apos;ll just have to redo it once the logo exists.
        Lock the logo and core colors first, and every other piece falls into
        place fast.
      </p>
      <p>
        That&apos;s the whole logic behind the 30-day plan: nail the foundation
        in week one, then stack everything on top of it.
      </p>

      <h2 id="week-1">Week 1: Lock Your Identity (Name, Logo, Colors)</h2>
      <p>
        This is the foundation. Get it right and the next three weeks are easy.
      </p>
      <ul>
        <li>
          <strong>Confirm your business name reads clearly.</strong> Say it out
          loud. Is it easy to spell? Easy to say over the phone? If people will
          mishear it, fix that now — not after you&apos;ve printed 500 cards.
        </li>
        <li>
          <strong>Get a real logo.</strong> Not a $5 template that 400 other
          businesses also bought. A proper{" "}
          <InternalLink href="/services/logo-design">logo</InternalLink> comes
          in the right file formats (for web, for print, for embroidery) and
          works in full color <em>and</em> one color for things like stamps and
          shirts.
        </li>
        <li>
          <strong>Pick 2&ndash;3 brand colors and one or two fonts.</strong>{" "}
          Write them down. This is your &quot;brand kit,&quot; and you&apos;ll
          use it on everything.
        </li>
        <li>
          <strong>Grab matching usernames</strong> on the social platforms your
          customers actually use, even if you&apos;re not ready to post yet.
          Claim the handle before someone else does.
        </li>
      </ul>
      <p>
        A note for the overwhelmed: you don&apos;t need a 40-page brand guide on
        day one. You need a logo, two colors, and a font you can live with.
        Don&apos;t let perfect kill done.
      </p>

      <h2 id="week-2">Week 2: Get Found and Get a Website Live</h2>
      <p>
        Now people can actually look you up. Two non-negotiables this week.
      </p>
      <ul>
        <li>
          <strong>Set up your Google Business Profile.</strong> This is free and
          it&apos;s the single biggest thing you can do to get found locally.
          When someone Googles your trade plus &quot;Cumming GA&quot; or
          &quot;Forsyth County,&quot; this is what shows up on the map. Add your
          hours, service area, phone number, and a few photos.
        </li>
        <li>
          <strong>Put up a simple website.</strong> It does not need to be
          fancy. It needs to say who you are, what you do, where you serve, and
          how to contact you — with your logo and brand colors front and center.
          A clean one-pager beats no website, and it beats a half-finished
          social page every time.
        </li>
        <li>
          <strong>Order business cards.</strong> Yes, people still use them.
          Hand one to every customer, contractor, and neighbor. It&apos;s the
          cheapest marketing you&apos;ll ever buy.
        </li>
      </ul>
      <p>
        This is also the week the math starts to matter. Done piecemeal — a logo
        from one freelancer, a website from another, cards from a print shop —
        you&apos;re juggling three vendors, three invoices, and three timelines
        that never line up.
      </p>
      <p>
        That&apos;s exactly why we built the{" "}
        <InternalLink href="/startup-special">
          Startup Special (from $997)
        </InternalLink>
        : logo + a simple website + business cards, done together, one designer,
        one invoice. It knocks out most of weeks 1 and 2 in a single pass — and
        because the same person designs all three, they actually match. Want
        more on what a site should cost? See our{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          website design + SEO cost breakdown
        </InternalLink>
        .
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          One Roof, One Invoice
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          Knock out your logo, site, and cards in one pass.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Skip the zombie-march of three vendors who never talk to each other.
          The $997 Startup Special bundles your logo, a 1-page website, business
          cards, and flyers — designed together so they actually match. Let&apos;s
          get your new Forsyth County business looking legit fast.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
          </a>
          <a
            href={PHONE_HREF}
            className="tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <h2 id="week-3">Week 3: Make Yourself Visible in the Real World</h2>
      <p>You&apos;re legit online. Now show up where people physically are.</p>
      <ul>
        <li>
          <strong>Yard signs or a job-site sign.</strong> If you do work at
          homes or businesses, a sign in the yard is a 24/7 billboard your happy
          customers display for free. Put your logo, your service, and your
          phone number on it.
        </li>
        <li>
          <strong>Vehicle lettering or a magnet.</strong> Your truck or car sits
          in driveways and parking lots all day. Wrap it, letter it, or slap a
          magnet on it and let it advertise while you work.
        </li>
        <li>
          <strong>A door decal, banner, or window graphic</strong> if you have a
          storefront or shop. Make it obvious you&apos;re open and what you do.
        </li>
      </ul>
      <p>
        Signage is where a lot of new owners under-invest, and it&apos;s a
        mistake. A clean vehicle and a sharp yard sign make a one-person
        operation look like an established company. That&apos;s the goal.
      </p>

      <h2 id="week-4">Week 4: Look Like a Team (Apparel + Consistent Social)</h2>
      <p>
        The finishing touches that make customers feel like they hired
        professionals.
      </p>
      <ul>
        <li>
          <strong>Branded apparel.</strong> A few screen-printed tees or
          embroidered polos with your logo. Wear them on every job. It signals
          &quot;I&apos;m supposed to be here,&quot; builds trust on a
          customer&apos;s property, and turns you into a walking billboard.
        </li>
        <li>
          <strong>Make your social profiles consistent.</strong> Same logo as a
          profile picture, same colors, same name everywhere. Mismatched
          profiles look sketchy; matching ones look established.
        </li>
        <li>
          <strong>Post a few times.</strong> You don&apos;t need to be a content
          machine. A handful of real photos — finished work, your truck, you on
          the job — does more than a perfect feed. New to this? Here&apos;s{" "}
          <InternalLink href="/blog/how-to-advertise-small-business-cumming-georgia">
            how to advertise a small business in Cumming, Georgia
          </InternalLink>
          .
        </li>
      </ul>
      <p>
        By the end of week 4, someone who&apos;s never heard of you can find you
        on Google, see a website that matches your van, that matches your shirt,
        that matches your card. That consistency <em>is</em> the trust.
        That&apos;s what gets you hired.
      </p>

      <h2 id="cost-to-brand">How Much Does It Cost to Brand a New Business?</h2>
      <p>
        It ranges, and you don&apos;t have to do it all at once. A focused
        starting point like our{" "}
        <InternalLink href="/startup-special">
          Startup Special runs $997
        </InternalLink>{" "}
        (logo, brand kit, 100 cards, 100 flyers, and a 1-page site). Need a full
        website too? Our{" "}
        <InternalLink href="/services/launch-package">
          Launch Package is $4,500
        </InternalLink>{" "}
        (logo, brand basics, a 5-page site, and a content calendar), and
        standalone{" "}
        <InternalLink href="/services/web-design">websites</InternalLink> run
        $2,500&ndash;$7,500+ by tier. A complete{" "}
        <InternalLink href="/industries/trades-contractors">
          trades package
        </InternalLink>{" "}
        — brand, multi-page site, signage, and apparel — is quoted to your
        scope.
      </p>
      <p>
        The smarter way to think about it: what&apos;s one new customer worth to
        you? For most local businesses, the brand pays for itself in the first
        month or two of looking like the obvious choice.{" "}
        <InternalLink href="/startup-special">
          See the $997 Startup Special and what&apos;s included
        </InternalLink>{" "}
        or text Gerry for a quote.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3 id="faq-license-cost">
        How much does a business license cost in Forsyth County, GA?
      </h3>
      <p>
        Fees vary by business type, location (county vs. City of Cumming), and
        gross receipts, and they change over time. We don&apos;t quote an exact
        number because we&apos;d hate to give you a wrong one. Confirm the
        current fee and forms directly with Forsyth County or the City of
        Cumming before you budget for it.
      </p>

      <h3 id="faq-need-license">
        Do I need a business license to operate in Cumming, GA?
      </h3>
      <p>
        In most cases, yes — businesses operating in the area generally need an
        occupational tax certificate from the county or city, depending on where
        you&apos;re located and what you do. Rules differ by business type, so
        verify your specific situation with Forsyth County or the City of
        Cumming directly.
      </p>

      <h3 id="faq-logo-or-website">
        What should a new business do first — logo or website?
      </h3>
      <p>
        The logo. Your website, cards, signs, and shirts all pull their colors
        and look from the logo, so building those first means redoing them
        later. Lock your logo and brand colors first, then build everything else
        on that foundation. It&apos;s faster and cheaper in that order.
      </p>

      <h3 id="faq-cost-to-brand">
        How much does it cost to brand a new business?
      </h3>
      <p>
        It ranges by scope. The $997 Startup Special (logo, brand kit, cards,
        flyers, 1-page site) is the budget launch; the $4,500 Launch Package
        adds brand basics and a 5-page site; standalone websites run
        $2,500&ndash;$7,500+ by tier; and a complete trades package with signage
        and apparel is quoted to scope. You can also start small and add pieces
        as you grow.
      </p>

      <h3 id="faq-home-business">
        Can I run a business from home in Forsyth County?
      </h3>
      <p>
        Often yes, but home-based businesses can have specific zoning and
        permitting rules, and they vary by location and business type.
        Don&apos;t assume — confirm the current home-occupation requirements
        with Forsyth County or the City of Cumming before you set up shop at the
        kitchen table.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function ChatGptWebsiteContent() {
  return (
    <>
      <p>
        <strong>
          Can ChatGPT build me a website? Sort of — it can write copy, sketch a
          page structure, and spit out basic HTML and CSS, but it cannot
          actually put a real, findable business online by itself.
        </strong>{" "}
        I&apos;m Gerry, the designer behind Branding Zombie Designs, a graphic +
        web design studio in Cumming, GA, and I ran the full test on a real
        local Forsyth County business to see how far the AI could get. The
        honest verdict: ChatGPT is a fantastic co-pilot and a terrible pilot.
      </p>

      <p>
        I&apos;m not an AI skeptic. We use AI tools every day in our studio
        workflow — for first drafts, brainstorming, and speeding up grunt work.
        So this isn&apos;t a designer protecting his turf. It&apos;s a working
        designer telling you exactly where the free robot helps and where it
        leaves you stranded.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>ChatGPT can produce the raw materials of a website</strong> —
            copy drafts, a page structure, basic HTML/CSS, and color and font
            ideas. That part is genuinely useful.
          </li>
          <li>
            <strong>It cannot ship a real one.</strong> It can&apos;t buy your
            domain, set up hosting, deploy the site live, or design an original,
            ownable logo.
          </li>
          <li>
            <strong>Local SEO is the big gap.</strong> It won&apos;t set up your
            Google Business Profile, earn reviews, or know what your Cumming
            competitors actually rank for.
          </li>
          <li>
            <strong>Co-pilot, not pilot.</strong> AI scaffolds; a human still has
            to launch, brand, photograph, and maintain the thing.
          </li>
          <li>
            <strong>The twist:</strong> your customers are asking ChatGPT to
            recommend businesses too — which is why being genuinely findable
            matters more now, not less.
          </li>
        </ul>
      </aside>

      <h2 id="can-chatgpt-create-a-website">
        So can ChatGPT actually create a website?
      </h2>
      <p>
        Here&apos;s the honest framing. When you ask &quot;can ChatGPT actually
        create a website,&quot; you&apos;re really asking two different
        questions:
      </p>
      <ol>
        <li>
          Can it produce the <em>raw materials</em> of a website? Yes,
          surprisingly well.
        </li>
        <li>
          Can it produce a <em>live, branded, findable</em> website your
          customers can actually visit and buy from? No — not without a human
          doing most of the real work.
        </li>
      </ol>
      <p>
        Most of the disappointment with AI website-building comes from confusing
        #1 with #2.
      </p>
      <p>
        I gave ChatGPT a realistic prompt: a small local service business in
        Cumming, a rough list of services, and a request to &quot;build me a
        website.&quot; What came back was a tidy draft — a block of homepage
        copy, a suggested page outline, and a chunk of static HTML. It looked
        promising on the screen. Here&apos;s what it got right, and what I had to
        fix.
      </p>

      <h2 id="what-chatgpt-did-well">What ChatGPT did genuinely well</h2>
      <p>
        I want to be fair, because the good parts are genuinely good.
      </p>
      <p>
        <strong>Copy drafts.</strong> It produced clean, usable first-draft copy
        for a homepage, an about section, and service blurbs. Generic in places,
        but a real starting point that beats a blank page.
      </p>
      <p>
        <strong>Page structure.</strong> It suggested a sensible layout — hero,
        services, social proof, contact — in the right order. The information
        architecture was reasonable.
      </p>
      <p>
        <strong>Basic HTML and CSS.</strong> Ask for code and it&apos;ll hand you
        a working static page. It renders. Headings, buttons, a responsive-ish
        grid. For a one-pager, it&apos;s a real artifact.
      </p>
      <p>
        <strong>Color and font suggestions.</strong> It proposed a palette and a
        type pairing that weren&apos;t embarrassing. A fine jumping-off point for
        a brand conversation.
      </p>
      <p>
        If you stopped reading here, you&apos;d think you don&apos;t need me. Keep
        reading.
      </p>

      <h2 id="where-chatgpt-falls-apart">
        Where ChatGPT falls apart for a real business
      </h2>
      <p>
        This is the part the hype skips. A website isn&apos;t a file — it&apos;s
        a live business asset that has to be hosted, owned, found, and
        maintained. ChatGPT can&apos;t do most of that.
      </p>
      <p>
        <strong>Hosting, domain, and deployment.</strong> ChatGPT can&apos;t buy
        your domain, set up hosting, configure DNS, install an SSL certificate,
        or push the site live. That HTML file sits on your laptop doing nothing
        for your business. Getting from &quot;code&quot; to &quot;a real website
        people can visit&quot; is a wall most non-technical owners hit
        immediately.
      </p>
      <p>
        <strong>An original logo.</strong> It can describe a logo. It cannot hand
        you a clean, ownable, vector logo that works on a sign, a shirt, a
        business card, and a favicon. Real brand identity is a deliverable, not a
        paragraph.
      </p>
      <p>
        <strong>Brand consistency.</strong> The AI doesn&apos;t know your brand
        exists across your truck, your storefront, your Instagram, and your
        invoices. It builds a website in a vacuum. A real brand has to look like
        the same company everywhere — that&apos;s a human judgment call.
      </p>
      <p>
        <strong>Local SEO.</strong> This is the big one for Forsyth County
        businesses. ChatGPT won&apos;t set up your Google Business Profile,
        can&apos;t earn local citations, can&apos;t get you reviews, and
        doesn&apos;t know what your Cumming competitors are actually ranking for
        this month. Generic on-page &quot;SEO&quot; text is not the same as
        getting found on Google.
      </p>
      <p>
        <strong>Real images and photography.</strong> Stock-looking filler
        doesn&apos;t sell a local business. Photos of your actual shop, your
        team, your work — that&apos;s what converts. AI can&apos;t photograph your
        storefront.
      </p>
      <p>
        <strong>Conversion design.</strong> Looking fine and{" "}
        <em>making the phone ring</em> are different jobs. Where the call button
        goes, what the hero promises, how trust is built above the fold —
        that&apos;s earned through experience, not a default template.
      </p>
      <p>
        <strong>Accessibility.</strong> AI-generated markup is frequently sloppy
        on contrast, alt text, focus states, and semantic structure. That&apos;s
        a legal and usability risk most owners never even see.
      </p>
      <p>
        <strong>Ownership and maintenance.</strong> Who updates it when your
        hours change, your services grow, or something breaks? A website is a
        living thing. There&apos;s no one behind the ChatGPT draft when it breaks
        at 9pm before a holiday weekend.
      </p>
      <p>
        Put the AI draft next to a real launched site and the gap is obvious: one
        is a file on a laptop, the other is a branded business people can find,
        trust, and call.
      </p>

      <h2 id="co-pilot-not-pilot">
        ChatGPT is a great co-pilot and a terrible pilot
      </h2>
      <p>
        That&apos;s the real answer to &quot;can ChatGPT build me a
        website.&quot; It can <em>scaffold</em>. It cannot <em>ship</em>.
      </p>
      <p>
        I genuinely use AI to move faster — to draft copy I then rewrite in a
        real brand voice, to rough out layouts, to unstick myself. But every
        single thing that makes a website <em>yours</em> and <em>findable</em>{" "}
        still needs a human: the original logo, the brand that matches your signs
        and shirts, the local SEO, the photos, the conversion choices, and the
        person who actually launches and maintains it.
      </p>
      <p>
        A co-pilot helps the pilot fly. It doesn&apos;t fly the plane alone.
      </p>

      <h2 id="customers-asking-chatgpt">
        The plot twist: your customers are asking ChatGPT too
      </h2>
      <p>
        Here&apos;s the part that should change how you think about this.
      </p>
      <p>
        The same way I asked ChatGPT to build a website, your future customers
        are asking ChatGPT and Gemini to <em>recommend</em> a web designer, a
        printer, an HVAC company, a coffee shop in Cumming. AI engines answer
        those questions by citing real, findable businesses — ones with a clear
        identity, a real site, reviews, and a consistent presence.
      </p>
      <p>
        So the irony is thick: AI can&apos;t replace a real local business, but
        AI is increasingly how people <em>find</em> one. That&apos;s exactly why
        being a genuine, well-built, well-optimized business matters more now,
        not less. We dug into how to <em>be</em> that answer in our piece on{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          how Google&apos;s AI is already recommending businesses
        </InternalLink>
        . (It&apos;s also why we obsess over this stuff — being the human answer
        when a robot gets asked the question.)
      </p>

      <h2 id="should-you-pay-a-designer">So should you just pay a designer?</h2>
      <p>
        If you want a one-off hobby page and you enjoy fiddling with code,
        ChatGPT plus a weekend might get you something. Truly.
      </p>
      <p>
        If this is a business — something that needs to look like <em>you</em>{" "}
        everywhere, rank in Forsyth County, and reliably turn visitors into
        customers — you need a human who can take the AI scaffolding the rest of
        the way to shipped.
      </p>
      <p>
        That&apos;s what we do at Branding Zombie Designs:{" "}
        <InternalLink href="/services/web-design">website</InternalLink>, logo,
        shirts, and signs under one roof — one designer, one invoice. If
        you&apos;ve already had ChatGPT build you something, I&apos;ll give it a{" "}
        <InternalLink href="/free-site-audit">free second opinion</InternalLink>{" "}
        — text me what you&apos;ve got and I&apos;ll tell you honestly what&apos;s
        solid and what&apos;ll cost you customers. No spooky sales pitch.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Let AI Build the Draft. Let a Human Ship It.
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          A website that&apos;s actually yours, branded, and findable.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          ChatGPT can scaffold a page. It can&apos;t register your domain, design
          an ownable logo, or get you ranked in Forsyth County. Bring me the AI
          draft — or start from zero — and I&apos;ll take it all the way to
          launched.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-create">Can ChatGPT actually create a website?</h3>
      <p>
        It can create the pieces — copy, layout ideas, basic HTML and CSS, color
        suggestions. It cannot host it, register your domain, deploy it live,
        design an original logo, or get you ranked on Google. You get a draft,
        not a launched, findable business website.
      </p>

      <h3 id="faq-worth-paying">
        Is it worth paying for a website designer if AI is free?
      </h3>
      <p>
        For a real business, yes. AI is free for raw materials, but hosting,
        branding, local SEO, photography, conversion design, and ongoing
        maintenance are where revenue is won or lost. A designer takes the AI
        scaffolding and turns it into a site that&apos;s actually yours and gets
        found.
      </p>

      <h3 id="faq-replace-designers">Will AI replace web designers?</h3>
      <p>
        No — it&apos;s changing the job, not ending it. AI handles drafts and
        grunt work fast, which frees designers for strategy, brand, conversion,
        and getting you found. The designers who use AI well are getting better,
        not extinct. We went deeper on this in{" "}
        <InternalLink href="/blog/will-ai-replace-graphic-designers">
          will AI replace graphic designers
        </InternalLink>
        .
      </p>

      <h3 id="faq-seo">Can ChatGPT do SEO?</h3>
      <p>
        It can write SEO-flavored text and explain best practices. It cannot set
        up your Google Business Profile, earn local citations and reviews,
        analyze live competitors in Cumming, or technically optimize a real site.
        On-page words are a fraction of actually ranking in Forsyth County.
      </p>

      <h3 id="faq-ownership">Who owns a website ChatGPT builds for you?</h3>
      <p>
        You own the output you generate — the copy and code. But &quot;owning a
        draft&quot; isn&apos;t owning a live business asset. You still need to own
        the domain, the hosting account, and ideally an original logo. A vague AI
        logo can leave you with thin or unclear ownership of your own brand mark.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function WebsiteDesignSeoCostContent() {
  return (
    <>
      <p>
        <strong>
          For a small business in Cumming, GA, a custom website typically runs
          $2,500 to $7,500+
        </strong>{" "}
        depending on scope, plus <strong>$500 to $1,500 per month</strong> if
        you add ongoing SEO. At Branding Zombie Designs, a graphic + web design
        studio in Cumming, GA, our website tiers are{" "}
        <strong>
          $2,500 (Starter, up to 5 pages) / $4,500 (Growth) / $7,500+ (Premium
          or e-commerce)
        </strong>{" "}
        — and if you&apos;re launching on a shoestring, a 1-page site comes
        bundled into our $997 Startup Special. The number moves based on page
        count, custom vs. template, e-commerce, and whether you need copywriting
        and photography. Here&apos;s the honest breakdown.
      </p>

      <p>
        Most local design shops hide their prices and make you &quot;request a
        quote&quot; just to learn the ballpark. We think that&apos;s a waste of
        your time, so this article gives you real numbers up front.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>A custom small-business website in Cumming, GA runs $2,500–$7,500+</strong>{" "}
            depending on pages, custom design, e-commerce, copy, and photography.
          </li>
          <li>
            <strong>Ongoing SEO is roughly $500–$1,500/month</strong> — it&apos;s
            billed monthly because ranking is continuous work, not a one-time
            purchase.
          </li>
          <li>
            <strong>Our website tiers:</strong> $2,500 Starter (up to 5 pages),
            $4,500 Growth (most popular), $7,500+ Premium / e-commerce.
          </li>
          <li>
            <strong>Launching lean?</strong> A 1-page site is bundled into the
            $997 Startup Special. Want the whole brand at once? The $4,500 Launch
            Package adds a 5-page site and a 90-day content calendar.
          </li>
          <li>
            <strong>The biggest hidden cost of the cheap route isn&apos;t money</strong>{" "}
            — it&apos;s ownership and momentum. Make sure you own your site and
            domain.
          </li>
        </ul>
      </aside>

      <h2 id="cost-in-2026">
        How much does website design and SEO cost in 2026?
      </h2>
      <p>
        There&apos;s no single sticker price, but there are honest ranges.
        Here&apos;s where most small-business projects land for a designer in the
        Cumming / Forsyth County / North Metro Atlanta area:
      </p>
      <ul>
        <li>
          <strong>Starter site (up to 5 pages, custom design):</strong> $2,500 —
          or a 1-page launch site bundled in the $997 Startup Special
        </li>
        <li>
          <strong>Growth site (5–10 pages, real branding, copy help):</strong>{" "}
          $4,500 — our most popular
        </li>
        <li>
          <strong>Premium / e-commerce site (many pages, online store, integrations):</strong>{" "}
          $7,500+
        </li>
        <li>
          <strong>Ongoing SEO:</strong> roughly $500–$1,500/month, billed monthly
          (more on why below)
        </li>
      </ul>
      <p>
        Those are starting-at ranges, not fixed quotes. Two five-page sites can
        cost wildly different amounts depending on what&apos;s inside them.
        Let&apos;s look at what actually moves the dial.
      </p>

      <h2 id="what-drives-cost">What drives the cost of a website?</h2>
      <p>
        The price of a website isn&apos;t random. A handful of decisions account
        for most of the difference between a $1,000 site and an $8,000 one.
      </p>
      <p>
        <strong>Number of pages.</strong> A one-page &quot;digital business
        card&quot; is fast. A 12-page site with separate service pages, a blog,
        and a location page is far more work. Pages are the clearest cost lever.
      </p>
      <p>
        <strong>Custom design vs. template.</strong> A template you tweak is
        cheaper and quicker. A custom layout built around your brand costs more
        because someone is actually designing it instead of filling in blanks.
        Most small businesses land somewhere in the middle: a solid framework,
        customized to look like nobody else.
      </p>
      <p>
        <strong>E-commerce.</strong> The moment you sell online, the budget
        jumps. Product pages, a cart, checkout, payment setup, shipping rules,
        and tax all add hours.
      </p>
      <p>
        <strong>Copywriting.</strong> Words sell, and good ones take time. If we
        write your pages instead of you handing over finished copy, that&apos;s
        part of the bill.
      </p>
      <p>
        <strong>Photography.</strong> Stock photos are cheap and look like stock
        photos. Real photos of your team, your shop, your food, or your trucks
        cost more but convert better.
      </p>
      <p>
        Stack those together and you can see why a quote is a range until we know
        what you actually want. (Pro tip from the crypt: cut nothing you need,
        but don&apos;t pay to build pages you&apos;ll never use.)
      </p>

      <h2 id="average-cost">What is the average cost of website design?</h2>
      <p>
        Nationally, small-business websites commonly run anywhere from about{" "}
        <strong>$1,000 on the low end to $10,000+</strong> for custom builds. For
        a local small business in Forsyth County, the realistic sweet spot is
        usually <strong>$2,500–$4,500</strong> (our Starter-to-Growth range) for
        a clean, custom, SEO-ready site you fully own.
      </p>
      <p>
        At Branding Zombie Designs, standalone{" "}
        <InternalLink href="/services/web-design">websites</InternalLink> start
        at <strong>$2,500</strong> (Starter), with <strong>$4,500</strong>{" "}
        (Growth) and <strong>$7,500+</strong> (Premium) tiers. Launching lean?
        The{" "}
        <InternalLink href="/startup-special">$997 Startup Special</InternalLink>{" "}
        bundles a logo, a 1-page site, business cards, and flyers. Want the whole
        brand done at once? The{" "}
        <InternalLink href="/services/launch-package">
          $4,500 Launch Package
        </InternalLink>{" "}
        bundles a logo, brand basics, a 5-page site, and a 90-day content
        calendar. Always quotable to your exact needs.
      </p>

      <h2 id="seo-cost">How much does it cost to do SEO for a website?</h2>
      <p>
        SEO is where pricing surprises people, so let&apos;s be blunt:{" "}
        <strong>
          SEO is not a one-time purchase. It&apos;s an ongoing engagement,
          usually billed monthly.
        </strong>{" "}
        Expect roughly <strong>$500–$1,500/month</strong> for meaningful,
        sustained small-business SEO.
      </p>
      <p>Why monthly and not one-and-done? Because SEO is a moving target:</p>
      <ul>
        <li>
          Google updates its algorithm constantly, and AI answer engines now
          pull from your content too.
        </li>
        <li>
          Your competitors keep publishing, so standing still means slipping
          backward.
        </li>
        <li>
          Real results come from ongoing work — new content, fresh local
          listings, fixing technical issues, earning links, and watching the
          data.
        </li>
      </ul>
      <p>
        You can buy a one-time &quot;SEO setup&quot; (clean titles, proper
        structure, Google Business Profile, local schema) and that&apos;s smart
        to do when the site launches. But ranking and staying ranked is a habit,
        not an event. Think of the build as planting and SEO as watering.
      </p>

      <h2 id="one-time-vs-monthly">
        One-time cost vs. monthly cost — how to budget
      </h2>
      <p>It helps to split your budget into two buckets:</p>
      <p>
        <strong>One-time (the build):</strong> design, copywriting, photography,
        setup, launch. You pay it once, you own the result.
      </p>
      <p>
        <strong>Ongoing (keeping it alive):</strong> hosting and domain (often
        $10–$40/month), occasional updates, and SEO if you want to actually get
        found. SEO is the big monthly line if you choose it.
      </p>
      <p>
        A common, sane starting point for a Cumming small business: a{" "}
        <strong>$2,500–$4,500 custom site once</strong>, then{" "}
        <strong>$500–$1,000/month of SEO</strong> once the site is live and
        you&apos;re ready to grow traffic. Start the build, then layer SEO on
        when you&apos;re ready.
      </p>

      <h2 id="cheap-vs-local">
        Cheap options vs. hiring a local designer — the true total cost
      </h2>
      <p>
        The big question behind &quot;how much does website design and SEO
        cost&quot; is usually: <em>can&apos;t I just do this cheap myself?</em>{" "}
        Sometimes, yes. Here&apos;s the honest comparison.
      </p>
      <p>
        <strong>DIY builders (Wix, Squarespace, Shopify):</strong> $16–$50/month,
        and you do all the work. Great if your budget is near zero and you have
        time to learn. The hidden costs: your time, a template thousands of
        others use, and SEO that&apos;s only as good as your own skills. Fine for
        a side hustle, limiting for a business that needs to compete.
      </p>
      <p>
        <strong>AI website builders:</strong> fast and nearly free to start.
        They&apos;ll spit out something that looks done. But &quot;looks
        done&quot; and &quot;ranks, converts, and represents your brand&quot; are
        different things — AI doesn&apos;t know your market, your customers, or
        what makes you different. (We dug into this in our{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          Can ChatGPT build a website?
        </InternalLink>{" "}
        piece.)
      </p>
      <p>
        <strong>Hiring a local designer:</strong> higher up front, lower total
        cost of headaches. You get custom design, real strategy, local-market
        knowledge, and someone who picks up the phone. For most growing
        businesses, this is where the math works out.
      </p>
      <p>
        The biggest hidden cost of the cheap route isn&apos;t money — it&apos;s
        ownership and momentum. Which brings us to the red flags.
      </p>

      <h2 id="fair-price-red-flags">
        What&apos;s a fair price, and what are the red flags?
      </h2>
      <p>
        A fair price is one where you understand exactly what you&apos;re getting
        and you own it at the end. Red flags to watch for:
      </p>
      <ul>
        <li>
          <strong>Too cheap to be true.</strong> A $300 website almost always
          means a generic template, zero SEO, and a site you don&apos;t actually
          control.
        </li>
        <li>
          <strong>You don&apos;t own your site or domain.</strong> Some cheap
          shops build on accounts <em>they</em> own, so you&apos;re renting
          forever and can&apos;t leave without losing everything. When Branding
          Zombie Designs builds your site, you own it — the site and the domain
          are yours.
        </li>
        <li>
          <strong>A template everyone in town already has.</strong> If your
          &quot;custom&quot; site shows up on three competitors, it wasn&apos;t
          custom.
        </li>
        <li>
          <strong>No SEO foundation.</strong> A pretty site nobody can find is a
          digital business card you paid too much for.
        </li>
        <li>
          <strong>No clear pricing or scope.</strong> If you can&apos;t get a
          straight answer about what&apos;s included, that&apos;s the answer.
        </li>
      </ul>
      <p>
        This is where the one-shop wedge matters. With Branding Zombie Designs,
        your <strong>logo, website, business cards, shirts, and signs come from
        one designer under one invoice.</strong> No juggling four vendors, no
        mismatched branding, no finger-pointing when something breaks. One shop,
        one brand, one bill — and prices you can actually see before you commit.
      </p>
      <p>
        Want the full picture before you decide? See{" "}
        <InternalLink href="/blog/how-your-website-is-costing-you-customers">
          how your website might be costing you customers
        </InternalLink>{" "}
        and our deeper{" "}
        <InternalLink href="/blog/website-cost-cumming-ga-2026">
          Cumming, GA website cost breakdown
        </InternalLink>
        .
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Stop Guessing What a Website Should Cost
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          A site that ranks, converts, and stays yours forever.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Get a straight, no-zombie-jargon quote for your site and SEO — no
          hidden &quot;request a quote&quot; runaround. Real numbers, work you
          own, and one designer who picks up the phone.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
          </a>
          <a
            href={PHONE_HREF}
            className="tabular inline-flex items-center gap-2 rounded-full border border-[var(--color-toxic)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-toxic-text)] hover:bg-[var(--color-toxic)]/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <h2 id="faq">Frequently asked questions</h2>

      <h3 id="faq-seo-cost">How much does it cost to do SEO for a website?</h3>
      <p>
        For a small business, ongoing SEO typically runs $500–$1,500 per month.
        It&apos;s billed monthly because SEO is continuous work — content, local
        listings, technical fixes, and link-building — not a one-time setup. A
        launch-time SEO foundation can be bundled into your build, but ranking
        long-term requires sustained effort.
      </p>

      <h3 id="faq-worth-it">Is it worth paying someone for SEO?</h3>
      <p>
        Usually, yes — if you want to get found without spending all your own
        time learning it. Good SEO pays for itself in leads and calls over
        months, not days. If your budget is tiny, start with a solid SEO
        foundation at launch and add monthly SEO once cash flow allows.
      </p>

      <h3 id="faq-designer-cost">How much does it cost to get a website designer?</h3>
      <p>
        A professional website designer for a small business typically costs
        $2,500–$7,500+ depending on pages, custom design, and features. At
        Branding Zombie Designs in Cumming, GA, standalone sites run $2,500
        (Starter) / $4,500 (Growth) / $7,500+ (Premium); a 1-page launch site
        comes bundled in the $997 Startup Special. Request a quote for your exact
        scope.
      </p>

      <h3 id="faq-average">What is the average cost of website design?</h3>
      <p>
        The average small-business website costs roughly $1,000 to $10,000, with
        most local custom sites landing around $2,500–$4,500. The range is wide
        because page count, custom vs. template, e-commerce, copywriting, and
        photography all change the number significantly.
      </p>

      <h3 id="faq-seo-dead">Is SEO dead or evolving in 2026?</h3>
      <p>
        SEO isn&apos;t dead — it&apos;s evolving. Search now includes AI answer
        engines that cite clear, well-structured content, so the work has shifted
        toward genuinely helpful, authoritative pages. Local SEO (Google Business
        Profile, reviews, location pages) matters more than ever for small
        businesses in Forsyth County.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Websites, SEO, logos, signage, and apparel for small
        businesses across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function AdvertiseCummingContent() {
  return (
    <>
      <p>
        <strong>
          The most effective way to advertise a small business in Cumming, GA
          is to claim and optimize your Google Business Profile
        </strong>{" "}
        — the #1 free local lever — then back it with a fast website that ranks
        and make yourself visible offline with consistent branding, signage, and
        branded apparel. Layer in social media, targeted print to Forsyth County
        zip codes (30040, 30041, 30028), online reviews, and local sponsorships,
        and you cover almost every way a Cumming customer finds a business.
        Branding Zombie Designs, a graphic + web design studio in Cumming, GA,
        builds most of these channels under one roof, so you get logo, website,
        signs, apparel, and print from one designer on one invoice.
      </p>

      <p>
        Below is the complete playbook, channel by channel, with a concrete way
        to start each one this week.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Start with your Google Business Profile</strong> — it&apos;s
            free and the single highest-impact thing a local business can do.
          </li>
          <li>
            <strong>Back it with a fast website</strong> you control, with local
            service pages naming Cumming and Forsyth County.
          </li>
          <li>
            <strong>Get visible offline</strong> with a consistent logo,
            signage, vehicle lettering, and branded apparel.
          </li>
          <li>
            <strong>Layer in social, targeted print, and reviews</strong> —
            direct mail to 30040, 30041, and 30028, plus steady Google reviews.
          </li>
          <li>
            <strong>Front-load one-time assets</strong> before recurring ad
            spend — they keep advertising for years with no monthly bill.
          </li>
        </ul>
      </aside>

      <h2 id="top-channels">The Top Channels at a Glance</h2>
      <ol>
        <li>
          <strong>Google Business Profile + local SEO</strong> — free,
          highest-impact, do this first.
        </li>
        <li>
          <strong>A fast website that ranks</strong> — your home base for
          everything else.
        </li>
        <li>
          <strong>Consistent branding and logo</strong> — so you look legit and
          get remembered.
        </li>
        <li>
          <strong>Signage</strong> — yard signs, vehicle lettering, banners
          around Forsyth.
        </li>
        <li>
          <strong>Branded apparel</strong> — walking advertising your team wears
          every day.
        </li>
        <li>
          <strong>Social media</strong> — organic posting plus local engagement.
        </li>
        <li>
          <strong>Print</strong> — direct mail to Forsyth zips, flyers, business
          cards.
        </li>
        <li>
          <strong>Reviews and word-of-mouth</strong> — the trust engine behind
          everything.
        </li>
        <li>
          <strong>Local sponsorships and community</strong> — youth sports,
          events, churches.
        </li>
      </ol>
      <p>
        You don&apos;t need all nine on day one. Nail the first three, then add
        the rest as budget allows.
      </p>

      <h2 id="show-up-on-google">
        How Do I Get My Business to Show Up on Google in Cumming, GA?
      </h2>
      <p>
        Claim your <strong>Google Business Profile</strong> (formerly Google My
        Business). It&apos;s free, and it&apos;s the single most powerful thing a
        local business can do. When someone in Cumming searches &quot;plumber
        near me&quot; or &quot;best tacos in Forsyth County,&quot; Google pulls
        from these profiles for the map pack and local results.
      </p>
      <p>
        Here&apos;s how to start: go to google.com/business, claim or create your
        listing, and complete every field — categories, service area, hours,
        phone, website, and 10+ real photos. Pick your primary category
        carefully (it&apos;s the biggest ranking factor), add a few secondary
        categories, and write a description that names Cumming and Forsyth
        County. Then post updates weekly and answer questions. A complete, active
        profile beats a half-finished one every time.
      </p>

      <h2 id="need-a-website">Do I Really Need a Website to Advertise Locally?</h2>
      <p>
        Yes. Your Google profile sends people somewhere, and that somewhere
        should be a <strong>fast website you control</strong> — not just a social
        page. A clean, mobile-friendly site that loads in under three seconds
        tells both customers and Google you&apos;re a real, current business.
      </p>
      <p>
        To start, get a one-to-five page site that covers what you do, where you
        serve (Cumming, Forsyth County, North Metro Atlanta), and how to contact
        you, with click-to-call on mobile. Make sure each service has its own
        page with local language so it can rank. If your current site is slow,
        dated, or doesn&apos;t exist, that&apos;s usually the highest-leverage
        fix. We build sites engineered to rank locally — more on the cost side in
        our{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          website design + SEO cost guide
        </InternalLink>{" "}
        and on our{" "}
        <InternalLink href="/services/web-design">web design service page</InternalLink>
        .
      </p>

      <h2 id="why-branding-matters">
        Why Does Consistent Branding Matter for Advertising?
      </h2>
      <p>
        Because advertising only compounds when people recognize you. A
        consistent <strong>logo, colors, and fonts</strong> across your sign,
        your shirts, your truck, and your website make a one-person shop look
        established — and make every ad you run reinforce the last one.
      </p>
      <p>
        Start by locking down a real logo and a simple brand kit (primary colors,
        one or two fonts, and a logo that works in one color for stamps and
        embroidery). Then apply it everywhere, identically. If your logo is a
        stretched JPG you made years ago, fixing it first means every channel
        below works harder. Our{" "}
        <InternalLink href="/startup-special">Startup Special starts at $997</InternalLink>{" "}
        and bundles a logo, a simple website, and business cards so you launch
        consistent from day one.
      </p>

      <h2 id="signage">
        Signage: The Most Underrated Local Advertising in Forsyth County
      </h2>
      <p>
        In a fast-growing, car-dependent county like Forsyth,{" "}
        <strong>signage is advertising that works 24/7 for a one-time cost</strong>
        . Yard signs, vehicle lettering, and banners put your name in front of
        thousands of local drivers every week — no monthly ad spend required.
      </p>
      <p>Three quick wins to start:</p>
      <ul>
        <li>
          <strong>Yard signs.</strong> Drop them at every job site and let happy
          clients keep one in the yard. Trades especially live and die by this.
          (See our{" "}
          <InternalLink href="/blog/branding-checklist-hvac-trades">
            branding checklist for HVAC and trades
          </InternalLink>
          .)
        </li>
        <li>
          <strong>Vehicle / truck lettering.</strong> Your work truck already
          drives all over Cumming, GA 400, and Forsyth — letter it and it becomes
          a moving billboard. A clean wrap or vinyl door lettering pays for itself
          for years.
        </li>
        <li>
          <strong>Banners.</strong> Cheap, fast, and perfect for grand openings,
          events, and ball fields.
        </li>
      </ul>
      <p>
        We design and produce all three, so your sign matches your logo and your
        shirts exactly.
      </p>

      <h2 id="branded-apparel">
        Branded Apparel: Turn Your Team Into Walking Advertising
      </h2>
      <p>
        Every shirt your crew wears is a free impression.{" "}
        <strong>Branded apparel</strong> — tees, polos, hats, hoodies — is one of
        the most cost-effective local ads going, because your people are already
        out in the community wearing something.
      </p>
      <p>
        Start with a screen-printed or embroidered shirt with your logo and your
        phone number or website on it. Put your team in them on jobs, at the
        supply house, at the kids&apos; games. Hand a few to your best customers.
        We do screen-printing and embroidery in-house, so the logo on the shirt
        matches the logo on your sign and site — no mismatched files, no
        surprises.
      </p>

      <h2 id="social-media">
        What&apos;s the Best Social Media Strategy for a Local Cumming Business?
      </h2>
      <p>
        Pick one or two platforms your customers actually use and post{" "}
        <strong>consistently</strong> rather than spreading thin. For most
        Cumming small businesses that&apos;s Facebook and Instagram, where local
        community groups and neighborhood word-of-mouth live.
      </p>
      <p>
        To start: post two to three times a week — real photos of your work, your
        team, before-and-afters, and the occasional behind-the-scenes. Engage in
        local Forsyth County and Cumming Facebook groups (follow their rules). Tag
        your location so the algorithm shows you to nearby people. You don&apos;t
        need to go viral; you need to stay visible to the few thousand people who
        could actually buy from you. We design scroll-stopping social graphics
        that match the rest of your brand if posting is your bottleneck.
      </p>

      <h2 id="print">Does Print Advertising Still Work in 2026?</h2>
      <p>
        Yes — especially <strong>targeted</strong> print in a defined area like
        Forsyth County. Direct mail, flyers, and business cards still convert
        because they&apos;re tangible and locally specific, and far fewer
        competitors bother with them now.
      </p>
      <p>A few moves that work:</p>
      <ul>
        <li>
          <strong>Direct mail</strong> to specific Forsyth zip codes — 30040,
          30041, and 30028 cover most of Cumming. Every Door Direct Mail (EDDM)
          lets you hit chosen carrier routes without buying a list.
        </li>
        <li>
          <strong>Flyers</strong> for events, new-mover welcomes, and
          neighborhood drops.
        </li>
        <li>
          <strong>Business cards</strong> — still the fastest way to turn a
          face-to-face conversation into a follow-up.
        </li>
      </ul>
      <p>
        We design and print all of it; see the{" "}
        <InternalLink href="/services/print-design">
          print &amp; signage services page
        </InternalLink>
        . Pair a mailer with a QR code to your website and you can actually track
        what it brings in.
      </p>

      <h2 id="reviews">How Do Reviews and Word-of-Mouth Drive Advertising?</h2>
      <p>
        They&apos;re the multiplier on everything above.{" "}
        <strong>Online reviews</strong> — especially Google reviews — directly
        influence both your map-pack ranking and whether a stranger picks you
        over the next guy. Word-of-mouth is still the #1 way local businesses
        grow.
      </p>
      <p>
        Start a simple system: after every happy job, text or email the customer
        a direct link to your Google review page. Make it one tap. Respond to
        every review, good or bad, like a professional. Aim for a steady trickle
        of recent reviews rather than a big batch once a year — Google weights
        freshness. Ten genuine five-star reviews can out-pull a paid ad campaign.
      </p>

      <h2 id="sponsorships">Should I Sponsor Local Events or Youth Sports?</h2>
      <p>
        If you serve families and homeowners, yes.{" "}
        <strong>Local sponsorships</strong> — youth sports teams, school events,
        church functions, community fundraisers — put your logo in front of
        exactly the Cumming and Forsyth County households you want, and they buy
        goodwill money can&apos;t.
      </p>
      <p>
        Start small: sponsor one rec-league team or one community event this
        season. You&apos;ll usually get your logo on a banner, jerseys, or a
        field sign — which is why having that clean logo (and a sign or apparel
        vendor who can produce the assets fast) pays off again. It&apos;s
        advertising and community membership in the same check.
      </p>

      <h2 id="marketing-budget">
        How Much Should a Small Business Spend on Marketing?
      </h2>
      <p>
        A common rule of thumb is <strong>5–10% of revenue</strong> for
        established businesses, and more like <strong>10–20%</strong> if
        you&apos;re new and trying to grow fast. But for a local Cumming startup,
        the smarter early move is front-loading{" "}
        <strong>one-time assets</strong> — Google profile, website, logo, a sign,
        and shirts — before you spend a dollar on recurring ads. Those assets keep
        working for years with no monthly bill, which is the cheapest advertising
        there is.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Ready to Stop Being Invisible?
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          One designer, one invoice — your whole brand under one roof.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Most of the channels above — logo, website, SEO, signs, apparel,
          social, and print — we do under one roof, so you get one designer
          instead of five vendors who never match. Let&apos;s get your name in
          front of all of Forsyth County. We&apos;ll bring your brand back from
          the dead.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-cheapest">What&apos;s the cheapest way to advertise a small business?</h3>
      <p>
        The cheapest way is free: a fully optimized Google Business Profile,
        steady Google reviews from happy customers, and consistent organic posts
        on one or two social platforms. Back those with one-time assets like a
        sign and branded shirts, and you advertise for years with almost no
        recurring spend.
      </p>

      <h3 id="faq-google">
        How do I get my business to show up on Google in Cumming, GA?
      </h3>
      <p>
        Claim your free Google Business Profile, complete every field, pick the
        right primary category, add 10+ real photos, and link it to a fast,
        locally focused website. Then collect recent Google reviews and post
        weekly updates. Completeness, accuracy, and review freshness drive the
        local map-pack ranking.
      </p>

      <h3 id="faq-budget">How much should a small business spend on marketing?</h3>
      <p>
        A rough rule is 5–10% of revenue once established, and 10–20% when
        you&apos;re new and growing. For a Cumming startup, spend first on
        one-time assets — Google profile, website, logo, signage, apparel — that
        keep advertising for you with no monthly bill before committing to
        recurring paid ads.
      </p>

      <h3 id="faq-startups">
        What are effective marketing strategies for startups in Cumming, GA?
      </h3>
      <p>
        Front-load the free and one-time wins: optimize your Google Business
        Profile, launch a fast website that ranks, lock a consistent logo, and
        get visible offline with vehicle lettering, yard signs, and branded
        apparel. Add social posting and Forsyth County direct mail as budget
        grows.
      </p>

      <h3 id="faq-visibility">
        How do I improve online visibility for a Cumming, GA business?
      </h3>
      <p>
        Strengthen three things together: a complete Google Business Profile, a
        fast website with local service pages naming Cumming and Forsyth County,
        and a steady stream of recent Google reviews. Post consistently on one
        social channel and keep your name, address, and phone identical
        everywhere online.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015. Bilingual
        English/Spanish — call or text {PHONE_DISPLAY}.
      </p>
    </>
  );
}

function HvacTradesBrandingContent() {
  return (
    <>
      <p>
        <strong>
          If you run an HVAC, plumbing, electrical, roofing, or landscaping
          business in Cumming, GA, the branding you actually need — in order — is
          a logo for contractor work that reads from across a parking lot, truck
          lettering and magnetic door signs, yard signs at every job, crew work
          shirts, business cards and door hangers, and a fast website that ranks
          for &quot;[your trade] Cumming GA.&quot;
        </strong>{" "}
        Branding Zombie Designs, a graphic + web design studio in Cumming, GA,
        builds all of it under one roof — one designer, one invoice — so your
        brand looks like one company instead of five vendors who never talked to
        each other.
      </p>

      <p>
        Most trades guys cobble this together over years. A logo from a $5
        marketplace. A sign shop for the trucks. A different shop for shirts. A
        web freelancer who ghosts. The result is a brand that doesn&apos;t match
        itself — and customers notice.
      </p>

      <p>
        Here&apos;s the checklist, in the order you actually need each piece, and
        how each one compounds into a brand your neighbors recognize before you
        knock on the door.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>The order that matters:</strong> logo → truck lettering &amp;
            magnetic door signs → yard signs → crew shirts → cards &amp; door
            hangers → a website that ranks for your trade + Cumming GA.
          </li>
          <li>
            <strong>Your logo is the foundation</strong> — every other item is
            just that logo on a new surface, so it has to read tiny (a card) and
            huge (a truck door).
          </li>
          <li>
            <strong>Yard signs are the #1 trades lead source</strong> — leave one
            at every job; a single closed lead covers a whole batch.
          </li>
          <li>
            <strong>Consistency is the whole point.</strong> Same logo, colors,
            and fonts on the truck, shirt, sign, and site is what makes a small
            shop look established.
          </li>
          <li>
            <strong>One invoice.</strong> Logo, signage, apparel, and site from
            one designer — quoted to your fleet size, from a logo at $750 and a
            site at $2,500.
          </li>
        </ul>
      </aside>

      <h2 id="logo-for-contractor">
        1. A logo for contractor work that survives being shrunk to a truck door
      </h2>
      <p>
        Your logo gets used at two extremes: tiny (a business card, a phone
        screen, a shirt pocket) and huge (the side of a box truck doing 60 on
        GA-400). A logo for contractor use has to hold up at both.
      </p>
      <p>
        Cheap clip-art logos fail here. They&apos;re built with thin lines,
        gradients, and four-color detail that turns to mush at small sizes and
        looks pixelated blown up on vinyl. Stock-template logos also show up on
        three other trucks in the same county — not the look you want.
      </p>
      <p>What a strong contractor logo needs:</p>
      <ul>
        <li>
          <strong>Bold, simple shapes</strong> that read at a glance from a
          moving vehicle.
        </li>
        <li>
          <strong>One or two colors</strong> that still work in solid white on a
          dark shirt or a single color on a magnet.
        </li>
        <li>
          <strong>A clean, legible business name</strong> — no script fonts that
          blur on a truck.
        </li>
        <li>
          <strong>Vector files you own</strong> (AI, EPS, SVG) so it prints sharp
          on anything, any size, forever.
        </li>
      </ul>
      <p>
        Get this right first, because every other item on this list is just your{" "}
        <InternalLink href="/services/logo-design">logo</InternalLink> applied to
        a new surface.
      </p>

      <h2 id="truck-lettering">
        2. Truck lettering near me: your fleet is a mobile billboard
      </h2>
      <p>
        Search &quot;truck lettering near me&quot; and you&apos;ll find sign
        shops that wrap one truck and never think about your logo, your shirts,
        or your website. That&apos;s the gap. Your vehicles drive past thousands
        of Forsyth County homes a week — they&apos;re the cheapest advertising
        you&apos;ll ever own once they&apos;re lettered.
      </p>
      <p>
        For most trades businesses, full vehicle wraps are overkill. What works:
      </p>
      <ul>
        <li>
          <strong>Cut-vinyl truck lettering</strong> — company name, phone
          number, trade, and license number, big enough to read at a stoplight.
        </li>
        <li>
          <strong>Magnetic door signs</strong> for service vans, personal
          trucks, or anything you don&apos;t want permanently lettered (great for
          leased vehicles or seasonal crew trucks).
        </li>
        <li>
          <strong>A consistent layout</strong> across every vehicle so a two-truck
          shop and a ten-truck shop both look like a real outfit.
        </li>
      </ul>
      <p>
        The single most-forgotten detail: make the phone number huge and the
        trade obvious. A neighbor who sees &quot;Smith Heating &amp; Air — (770)
        ___-____&quot; while you&apos;re parked in their cul-de-sac is a lead you
        didn&apos;t pay for twice.
      </p>

      <h2 id="yard-signs">
        3. Yard signs at every job site: the #1 trades lead source
      </h2>
      <p>
        Ask any established contractor where their best leads come from and
        &quot;the neighbors saw our sign&quot; is near the top. Yard signs in
        Cumming yards do the same job a billboard does, except they&apos;re
        planted right where someone is already thinking, &quot;my unit&apos;s
        getting old too.&quot;
      </p>
      <p>A yard sign for a trades business should have:</p>
      <ul>
        <li>The logo and trade, readable from the street.</li>
        <li>The phone number, big.</li>
        <li>&quot;Licensed &amp; Insured&quot; if it applies.</li>
        <li>
          A simple call to action — &quot;Free Estimate,&quot; &quot;Now Servicing
          This Neighborhood.&quot;
        </li>
      </ul>
      <p>
        Order them in bulk and leave one at every install, repair, and roof for
        the duration of the job. Corrugated plastic signs are cheap per unit, and
        one $1,500 roofing lead from a sign you left out for three days pays for
        the whole batch many times over.
      </p>

      <h2 id="work-shirts">
        4. Work shirts for the crew: look like a real company at the door
      </h2>
      <p>
        When a homeowner opens the door to a stranger who&apos;s about to be in
        their attic or crawl space, looking legit matters. A crew in matching
        shirts reads as a real, insured, accountable business. A guy in a random
        tee reads as a gamble.
      </p>
      <p>Work shirts for the crew options, from light to heavy:</p>
      <ul>
        <li>
          <strong>Screen-printed tees</strong> — cheapest, great for summer
          install crews and giveaways.
        </li>
        <li>
          <strong>Embroidered polos</strong> — the upgrade for estimators, sales,
          and office staff; embroidery looks premium and lasts.
        </li>
        <li>
          <strong>Hi-vis shirts and safety colors</strong> — for roadside,
          roofing, and anyone working near traffic.
        </li>
        <li>
          <strong>Embroidered hats and jackets</strong> — round out the look in
          cold months.
        </li>
      </ul>
      <p>
        Same logo, same colors as the trucks and signs. That repetition is what
        makes a small shop feel established.
      </p>

      <h2 id="cards-door-hangers">
        5. Business cards &amp; door hangers for the neighborhood
      </h2>
      <p>
        Old-school, still works in the trades. After a job, your tech leaves a
        card. While you&apos;re already in a neighborhood, door hangers on the ten
        houses around the one you&apos;re servicing turn one job into three.
      </p>
      <ul>
        <li>
          <strong>Business cards</strong> — clean, with the logo, name, trade,
          phone, and a QR code to your site or reviews.
        </li>
        <li>
          <strong>Door hangers</strong> — &quot;We&apos;re working in your
          neighborhood this week&quot; plus an offer. Cheap to print, high-intent
          because you&apos;re targeting the exact street.
        </li>
      </ul>
      <p>
        Both should match the truck, the shirts, and the signs. Same logo, same
        colors, every time.
      </p>

      <h2 id="hvac-website-design">
        6. HVAC website design that ranks for &quot;[trade] Cumming GA&quot;
      </h2>
      <p>
        You can have the best trucks in the county and still lose the customer who
        pulls out their phone and searches &quot;AC repair Cumming GA&quot; at
        9pm. Good HVAC website design is built to win that moment.
      </p>
      <p>
        What a trades{" "}
        <InternalLink href="/services/web-design">website</InternalLink> actually
        needs (not a 40-page brochure):
      </p>
      <ul>
        <li>
          <strong>A fast, mobile-first site</strong> — most trades searches happen
          on a phone, often in a hot or flooded house.
        </li>
        <li>
          <strong>Clear service pages</strong> targeting your trade plus your
          city, so Google knows to show you for &quot;[trade] Cumming GA.&quot;
        </li>
        <li>
          <strong>Click-to-call</strong> front and center, plus a short quote
          form.
        </li>
        <li>
          <strong>Real photos</strong> of your trucks, crew, and finished jobs —
          not stock.
        </li>
        <li>
          <strong>A connected Google Business Profile</strong>, because for local
          services the map pack often matters more than the website itself. Claim
          it, fill it out, and feed it reviews.
        </li>
      </ul>
      <p>
        The same HVAC website design principles apply to plumbing, electrical,
        roofing, and landscaping — swap the trade, keep the structure. For the
        bigger picture on getting found locally, see{" "}
        <InternalLink href="/blog/how-to-advertise-small-business-cumming-georgia">
          how to advertise a small business in Cumming, Georgia
        </InternalLink>
        .
      </p>

      <h2 id="consistency">7. Consistency is the whole point</h2>
      <p>
        Here&apos;s the part most vendors can&apos;t deliver: every piece above
        using the <em>same</em> logo, the <em>same</em> colors, the <em>same</em>{" "}
        fonts. When your truck, your tech&apos;s shirt, the yard sign, the door
        hanger, and the website all match, a homeowner who saw your truck on
        Monday recognizes your sign on Thursday and trusts your tech on Saturday.
        That&apos;s a brand.
      </p>
      <p>
        You can&apos;t get that consistency from a logo guy, a sign shop, a
        t-shirt shop, and a web freelancer who&apos;ve never spoken. You get it
        from one designer building the whole{" "}
        <InternalLink href="/services/branding">brand</InternalLink> system at
        once.
      </p>

      <h2 id="one-invoice-bundle">The one-invoice trades bundle</h2>
      <p>
        This is the part worth saying plainly: a trades business can get the{" "}
        <strong>
          logo, truck lettering, magnetic door signs, yard signs, crew shirts,
          business cards, and a website
        </strong>{" "}
        from one designer on one invoice at Branding Zombie Designs — instead of
        juggling four vendors and four bills that don&apos;t match.
      </p>
      <p>
        A full trades branding bundle is quoted to your scope. The pieces: a logo
        from <strong>$750</strong>, a website from <strong>$2,500</strong>{" "}
        (Starter) up to <strong>$7,500+</strong> (Premium) by page count, plus{" "}
        <InternalLink href="/services/print-design">
          truck lettering, yard signs, and shirts
        </InternalLink>{" "}
        quoted to your fleet size. A two-truck startup sits at the low end; a
        ten-truck outfit with a bigger site at the high end. Want one number for{" "}
        <em>your</em> shop?{" "}
        <InternalLink href="/services/request-quote">Request a quote</InternalLink>{" "}
        or text Gerry the size of your fleet and we&apos;ll bundle it on one
        invoice. For a full pricing breakdown, see{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          what website design + SEO actually costs
        </InternalLink>
        .
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Logo to Truck to Job Site
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          Look like the biggest outfit in the county.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Whether you&apos;re lettering your first truck or rebranding a ten-truck
          fleet, we&apos;ll build the whole undead brand — logo, trucks, signs,
          shirts, and a site that ranks — on one invoice. Your competitors&apos;
          clip-art logos won&apos;t know what hit them.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-truck-lettering-cost">How much does truck lettering cost?</h3>
      <p>
        Cut-vinyl truck lettering generally runs a few hundred dollars per
        vehicle, depending on size, number of sides, and whether you add magnetic
        door signs. A consistent multi-truck package costs less per vehicle than
        one-offs. Text us your vehicle list for an exact quote.
      </p>

      <h3 id="faq-yard-signs-leads">
        Do yard signs actually get HVAC/contractor leads?
      </h3>
      <p>
        Yes — yard signs are consistently one of the top lead sources for trades
        businesses, because neighbors of your current customers are often in the
        market for the same service. Leave one at every job. The cost per sign is
        low and a single closed lead usually covers a whole batch.
      </p>

      <h3 id="faq-contractor-logo">What should be on a contractor&apos;s logo?</h3>
      <p>
        A bold, simple mark, your business name in a legible font, your trade, and
        one or two colors that still read in solid white or single-color print. It
        must work tiny (business card) and huge (truck door). Avoid thin lines and
        stock clip-art that blurs when scaled.
      </p>

      <h3 id="faq-trades-website-cost">
        How much does a website for a trades business cost?
      </h3>
      <p>
        A focused trades website starts at $2,500 (our Starter web tier) and
        scales up with more service pages, SEO, and photo work; a 1-page launch
        site comes bundled in the{" "}
        <InternalLink href="/startup-special">$997 Startup Special</InternalLink>.
        We can fold site, logo, signage, and shirts into one branding bundle on a
        single invoice.
      </p>

      <h3 id="faq-truck-lettering-near-me">
        Where can I get truck lettering near me in Cumming GA?
      </h3>
      <p>
        Branding Zombie Designs handles truck lettering and magnetic door signs in
        Cumming, GA and across Forsyth County — and unlike a standalone sign shop,
        we match it to your logo, shirts, yard signs, and website. Call or text
        (770) 744-2536 for a quote.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, solo owner-operator of Branding Zombie
        Designs. Based in Cumming, GA. Logos, websites, signage, and apparel for
        small businesses across Forsyth County and North Metro Atlanta since 2015.
        Bilingual English/Spanish — call or text (770) 744-2536.
      </p>
    </>
  );
}

function WillAiReplaceDesignersContent() {
  return (
    <>
      <p>
        <strong>
          Will AI replace graphic designers? No — but it&apos;s changing the job
          fast
        </strong>
        , and pretending otherwise would be lying to you. AI automates the grunt
        work and wipes out cheap template design, but it doesn&apos;t replace
        judgment, strategy, brand ownership, or the person you call when it
        breaks. I&apos;m Gerry, owner of Branding Zombie Designs, a graphic + web
        design studio in Cumming, GA serving Forsyth County and North Metro
        Atlanta — and I use AI every week, which is exactly why I can tell you
        where it stops.
      </p>

      <p>
        That&apos;s the short version. If you&apos;re a small business owner
        trying to decide between an AI tool and hiring a designer, keep reading.
        The honest breakdown matters more than the hype.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>AI won&apos;t replace designers</strong> — but it is
            replacing some of what designers used to charge for, like $5 logos
            and cookie-cutter flyers.
          </li>
          <li>
            <strong>AI is great at the grunt work:</strong> first drafts,
            background removal, resizing, copy starters. It lowers the floor, it
            doesn&apos;t raise the ceiling.
          </li>
          <li>
            <strong>AI can&apos;t own strategy, files, copyright, or
            accountability</strong> — and it doesn&apos;t pick up the phone at 5
            PM the day before your grand opening.
          </li>
          <li>
            <strong>Use AI for speed and throwaway ideas.</strong> Hire a
            designer for anything permanent — logo, website, signage, apparel.
          </li>
          <li>
            <strong>The twist:</strong> relying on AI to <em>be</em> your brand
            makes you invisible to AI. Real branding makes AI recommend you.
          </li>
        </ul>
      </aside>

      <h2 id="replace-or-change">
        Will AI Replace Graphic Designers, or Just Change the Job?
      </h2>
      <p>
        Here&apos;s the nuance the headlines skip: AI isn&apos;t replacing
        designers, but it is <em>replacing some of what designers used to charge
        for.</em>
      </p>
      <p>
        The cheap, repetitive, template-driven end of design — the $5 logo, the
        cookie-cutter flyer, the stock-photo social post — is getting
        commoditized. AI does that in seconds now. If that was the whole job,
        the job would be in trouble.
      </p>
      <p>
        But that was never the whole job. The valuable part is the thinking: who
        you&apos;re for, what you should say, how to look different from the
        three shops down the road, and how to make every piece work together. AI
        doesn&apos;t decide any of that. It executes prompts. Someone still has
        to know what to ask for and whether the answer is any good.
      </p>
      <p>
        So the job isn&apos;t dying. It&apos;s splitting. Designers who use AI as
        a tool are pulling ahead of two groups: designers who refuse to touch
        it, and businesses trying to run on AI alone.
      </p>

      <h2 id="what-ai-does-well">
        What Can AI Actually Do Well in Design Right Now?
      </h2>
      <p>
        A lot — and ignoring that would make me look like the guy defending the
        horse-and-buggy.
      </p>
      <p>AI is genuinely good at:</p>
      <ul>
        <li>
          <strong>First drafts and variations.</strong> Twenty layout directions
          in a minute, so we skip the blank-page stall.
        </li>
        <li>
          <strong>Production grunt work.</strong> Background removal, upscaling,
          resizing one design into forty ad sizes.
        </li>
        <li>
          <strong>Copy starters.</strong> Rough headlines, alt text,
          product-description first passes.
        </li>
        <li>
          <strong>Stock-style imagery.</strong> Quick placeholder visuals when a
          custom photo shoot isn&apos;t in the budget.
        </li>
      </ul>
      <p>
        I use these constantly. They make the work faster and cheaper for you,
        which is the whole point. A designer who leans on AI for the tedious 60%
        can spend the important 40% on the stuff that actually moves your
        business.
      </p>
      <p>
        That&apos;s the part to internalize: AI lowers the floor, it doesn&apos;t
        raise the ceiling.
      </p>

      <h2 id="what-ai-cannot-do">What Can AI <em>Not</em> Do in Design?</h2>
      <p>
        This is the real question, and it&apos;s where the honest answer lives.
      </p>
      <p>
        <strong>It doesn&apos;t own the strategy.</strong> AI doesn&apos;t know
        your customers, your town, your competitors on Highway 20, or why your
        current branding isn&apos;t landing. It guesses from a prompt. Strategy
        is a conversation, not a generation.
      </p>
      <p>
        <strong>It doesn&apos;t give you real, usable files.</strong> Most AI
        tools spit out a flat image — not clean, editable vector art, and
        definitely not an embroidery-ready or one-color version for a sign or
        polo. Try sending an AI &quot;logo&quot; to a screen-printer and watch
        what happens. (Spoiler: it doesn&apos;t go well.)
      </p>
      <p>
        <strong>It doesn&apos;t own anything.</strong> Copyright on
        AI-generated work is murky at best. A real{" "}
        <InternalLink href="/services/logo-design">logo design</InternalLink>{" "}
        package hands you full usage rights — you own the mark, free to put it on
        anything.
      </p>
      <p>
        <strong>It doesn&apos;t take accountability.</strong> When the file&apos;s
        wrong at 5 PM the day before your grand opening, an AI tool doesn&apos;t
        pick up the phone. I do — (770) 744-2536.
      </p>
      <p>
        <strong>It doesn&apos;t understand local context.</strong> It doesn&apos;t
        know what a Forsyth County trades brand needs to look like to earn trust,
        or how a Cumming restaurant menu should read. Local judgment isn&apos;t
        in the training data.
      </p>
      <p>
        <em>
          (AI is a great shovel. It is not the gravedigger. Somebody still has to
          decide where the hole goes.)
        </em>
      </p>

      <h2 id="ai-or-hire">
        Should I Use AI or Hire a Designer for My Small Business?
      </h2>
      <p>
        Short answer: use AI for speed and ideas, hire a designer for anything
        your business actually depends on.
      </p>
      <p>
        Here&apos;s the honest split for a first-time owner in Cumming or Forsyth
        County:
      </p>
      <p>
        <strong>Use AI on your own when</strong> you need a quick social graphic,
        a throwaway placeholder, a rough idea to react to, or you&apos;re testing
        whether a business idea even has legs. Free or cheap, instant, good
        enough for low-stakes stuff.
      </p>
      <p>
        <strong>Hire a designer when</strong> it&apos;s a permanent asset — your
        logo, your website, your signage, your apparel, your brand identity.
        Anything that has to scale across surfaces, last for years, look like{" "}
        <em>you</em>, and not blow up at the printer.
      </p>
      <p>
        The trap I watch people fall into: they build their whole launch on AI to
        save money, then pay a designer to rebuild it six months later when
        nothing matches and the logo can&apos;t go on a shirt. That&apos;s paying
        twice.{" "}
        <InternalLink href="/blog/logo-cost-cumming-ga">
          What a cheap logo really costs later
        </InternalLink>{" "}
        goes deep on this.
      </p>
      <p>
        If you&apos;re launching from zero, our{" "}
        <InternalLink href="/startup-special">$997 Startup Special</InternalLink>{" "}
        bundles a real logo, a simple website, and business cards — a popular,
        affordable starting point that won&apos;t need rebuilding. Every figure
        here is a starting range, not a fixed quote;{" "}
        <InternalLink href="/services/request-quote">request a quote</InternalLink>{" "}
        when you want a real number.
      </p>

      <h2 id="ai-logo">Can AI Design a Logo? (And Should You Let It?)</h2>
      <p>
        You can generate a logo-shaped image with an AI logo generator in about
        ten seconds. Whether you should <em>use</em> it is a different question.
      </p>
      <p>Here&apos;s what those tools tend to miss:</p>
      <ul>
        <li>
          <strong>No clean vector files.</strong> You get a flat raster. Scale it
          up for a banner and it turns to mush.
        </li>
        <li>
          <strong>No embroidery-ready or one-color version.</strong> So it
          can&apos;t go on a polo, a hat, or a yard sign without a rebuild.
        </li>
        <li>
          <strong>It often looks like everyone else&apos;s.</strong> AI leans on
          common shapes and trendy clichés. Generic by design.
        </li>
        <li>
          <strong>Murky ownership.</strong> You may not actually own what you
          &quot;made.&quot;
        </li>
      </ul>
      <p>
        For a placeholder while you test an idea? Fine. For the mark that goes on
        your truck, your storefront, and every invoice for the next decade?
        That&apos;s what a real{" "}
        <InternalLink href="/services/logo-design">logo</InternalLink> and{" "}
        <InternalLink href="/services/branding">brand identity</InternalLink> are
        for. I cover this more in{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          can ChatGPT build a website
        </InternalLink>{" "}
        — same logic applies to logos.
      </p>

      <h2 id="ai-web-designers">Can AI Replace Web Designers?</h2>
      <p>
        Same answer as logos: it can build <em>a</em> website, but probably not{" "}
        <em>your</em> website.
      </p>
      <p>
        AI site builders are real and getting better. They&apos;ll generate a
        decent-looking template fast. But they don&apos;t handle the parts that
        actually make a site earn money: clear strategy, local SEO that ranks you
        in Cumming, structure that converts visitors into calls, and the
        integrations a real business needs.
      </p>
      <p>
        And here&apos;s the twist nobody saw coming — AI just made local web
        design <em>more</em> important, not less. Which brings us to the thing
        every small business owner needs to hear in 2026.
      </p>

      <h2 id="ai-makes-local-matter-more">
        How AI Actually Made Hiring a Real Local Designer Matter More
      </h2>
      <p>
        This is the part that flips the whole &quot;AI is coming for
        designers&quot; narrative on its head.
      </p>
      <p>
        Your customers don&apos;t just Google anymore. They ask ChatGPT, Gemini,
        and Google&apos;s AI: <em>&quot;Who&apos;s a good graphic designer in
        Cumming, GA?&quot;</em> or <em>&quot;Recommend a web designer near
        me.&quot;</em>
      </p>
      <p>
        And those AI engines answer by pulling from real, structured, findable
        businesses on the open web. If you&apos;re a vague, half-built,
        AI-template brand with no real website and no clear local presence, the
        AI can&apos;t <em>find</em> you to recommend you. If you&apos;re a real,
        well-branded, properly-marked-up local business, you become the answer.
      </p>
      <p>
        So the irony is brutal and beautiful: relying on AI to <em>be</em> your
        brand makes you invisible to AI, while investing in real branding and{" "}
        <InternalLink href="/services/digital-marketing">SEO/AEO</InternalLink>{" "}
        makes AI start recommending <em>you.</em> I broke this whole shift down
        in{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          Google&apos;s AI is calling your business
        </InternalLink>{" "}
        — required reading if you want to understand where customers actually
        come from now.
      </p>
      <p>
        That&apos;s why a{" "}
        <InternalLink href="/services/web-design">real local website</InternalLink>{" "}
        — built with proper structure for &quot;web design cumming ga&quot; and
        your actual service area — is worth more in the AI era, not less. Want a
        free gut-check on whether AI can even find you? Grab a{" "}
        <InternalLink href="/free-site-audit">free site audit</InternalLink>.
      </p>

      <h2 id="good-career-2026">Is Graphic Design a Good Career in 2026?</h2>
      <p>
        Yes — if you adapt, no if you don&apos;t. The designers who treat AI as a
        tool and double down on strategy, taste, and client relationships are
        busier than ever. The ones competing with AI on speed and price for
        template work are getting flattened. Same lesson for hiring: pick the
        designer who <em>uses</em> AI, not the one afraid of it.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Don&apos;t Hide Behind a Prompt
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          AI won&apos;t bury graphic designers — but it&apos;ll bury the
          businesses that hide behind it.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          If you want a brand that real customers — and the AI engines
          recommending you — can actually find, let&apos;s build the real thing.
          One designer, one invoice, logos to websites to signs under one roof.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-replace">Will AI replace graphic designers?</h3>
      <p>
        No, but it&apos;s reshaping the job. AI automates production work and
        commoditizes cheap, template-style design, but it can&apos;t own
        strategy, brand judgment, original vector files, or accountability.
        Designers who use AI as a tool are outperforming both AI-only businesses
        and designers who refuse to adopt it.
      </p>

      <h3 id="faq-ai-logo">Can AI design a logo?</h3>
      <p>
        It can generate a logo-shaped image fast, but it usually lacks clean
        vector files, embroidery-ready or one-color versions, and clear
        ownership — and it often looks generic. That&apos;s fine for a
        placeholder, but risky for the mark on your truck, sign, and apparel for
        the next decade.
      </p>

      <h3 id="faq-ai-or-hire">
        Should I use AI or hire a designer for my small business?
      </h3>
      <p>
        Use AI for quick, low-stakes, throwaway graphics and rough ideas. Hire a
        designer for permanent assets — your logo, website, signage, and brand
        identity — anything that must scale, last, and look like you. Building
        your launch on AI alone usually means paying to rebuild it later.
      </p>

      <h3 id="faq-web-designers">Can AI replace web designers?</h3>
      <p>
        AI builders can produce a template site quickly, but not the strategy,
        local SEO, conversion structure, and integrations a real business needs.
        Ironically, AI made strong local web design matter more, because AI
        engines now recommend businesses that are real, structured, and findable
        online.
      </p>

      <h3 id="faq-ai-cannot">What can AI not do in design?</h3>
      <p>
        AI can&apos;t own your strategy, understand your local market, deliver
        true vector or embroidery-ready files, hold copyright cleanly, or take
        accountability when something breaks. It executes prompts. A designer
        decides what to ask for, whether the result is good, and stands behind
        the final work.
      </p>

      <h3 id="faq-career">Is graphic design a good career in 2026?</h3>
      <p>
        Yes, for designers who adapt. Those who use AI to handle grunt work and
        focus on strategy, taste, and client relationships are thriving. Those
        competing with AI on price and speed for commodity template work are
        struggling. The skill that matters now is judgment, not just production.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, solo owner of Branding Zombie Designs. Based
        in Cumming, GA. Bilingual English/Spanish, building logos, websites,
        shirts, and signs all under one roof for small businesses across Forsyth
        County and North Metro Atlanta since 2015 — using AI as a tool, not a
        crutch.
      </p>
    </>
  );
}

function SeoCummingGaContent() {
  return (
    <>
      <p>
        <strong>
          Most small businesses in Cumming, GA do need SEO — but probably not
          the expensive, national kind.
        </strong>{" "}
        For a local shop in Forsyth County, SEO work usually means local SEO:
        showing up in the map pack and search results when nearby customers look
        for what you sell. Real local SEO runs{" "}
        <strong>$500–$1,500/month as an ongoing service</strong> (not a one-time
        fix), and the single biggest free lever — your Google Business Profile —
        costs nothing but attention.
      </p>

      <p>
        This is an honest guide from Branding Zombie Designs, a graphic + web
        design studio in Cumming, GA, on what SEO actually is, whether you need
        it, and what moves rankings in 2026. No jargon, no &quot;guaranteed #1
        in 30 days&quot; nonsense — just how this works for a real business
        serving North Metro Atlanta.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Most Cumming businesses need local SEO, not national.</strong>{" "}
            You&apos;re competing with neighbors, not the whole internet.
          </li>
          <li>
            <strong>Real local SEO runs $500–$1,500/month</strong> as an ongoing
            service — not a one-time project.
          </li>
          <li>
            <strong>Your Google Business Profile is the #1 free lever.</strong>{" "}
            Fully built out, it can win the map pack on its own.
          </li>
          <li>
            <strong>Plan on 3 to 6 months</strong> for real movement. Anyone
            promising results in two weeks is selling ads, not SEO.
          </li>
          <li>
            <strong>SEO isn&apos;t dead with AI search</strong> — answer engines
            reward the same honest work (AEO/GEO).
          </li>
        </ul>
      </aside>

      <h2 id="what-is-seo">What is SEO, in Plain English?</h2>
      <p>
        SEO (search engine optimization) is the work of getting your website and
        business listings to show up when people search Google for what you do.
      </p>
      <p>For a local business, there are two surfaces that matter:</p>
      <ul>
        <li>
          <strong>The map pack</strong> — the little map with three businesses
          at the top of local searches like &quot;hvac cumming ga&quot; or
          &quot;tacos near me.&quot;
        </li>
        <li>
          <strong>The blue links</strong> — the regular organic results below
          it.
        </li>
      </ul>
      <p>
        You want to appear in both. Ads are a third surface, but ads stop the
        second you stop paying. SEO builds an asset that keeps working.
      </p>
      <p>
        The honest version: SEO isn&apos;t a magic trick. It&apos;s making your
        site fast, clear, and trustworthy, getting your Google Business Profile
        fully built out, earning a few honest reviews and links, and publishing
        content that answers the questions your customers actually type.
      </p>

      <h2 id="local-vs-national">
        Local SEO vs National SEO — and Why You Only Need One
      </h2>
      <p>This is where a lot of Cumming businesses get oversold.</p>
      <p>
        <strong>National SEO</strong> is trying to rank for broad terms with no
        location — &quot;best running shoes,&quot; &quot;project management
        software.&quot; That&apos;s brutally competitive, slow, and expensive.
        Unless you ship products nationwide, you don&apos;t need it.
      </p>
      <p>
        <strong>Local SEO</strong> is ranking for searches tied to a place —
        &quot;logo designer Cumming,&quot; &quot;plumber Forsyth County,&quot;
        &quot;coffee shop near me.&quot; The competition is your neighbors, not
        the entire internet. It&apos;s far more winnable, and it&apos;s where
        your actual customers are.
      </p>
      <p>
        If you serve people within driving distance, you want local SEO work —
        not national. Anyone pitching you a national-scale campaign for a local
        Forsyth County business is either confused or padding the invoice.
      </p>

      <h2 id="google-business-profile">
        Google Business Profile: the #1 Free Lever
      </h2>
      <p>
        If you do one thing this week, do this. Your{" "}
        <strong>Google Business Profile</strong> (the old &quot;Google My
        Business&quot; listing) is the most powerful free local SEO tool there
        is, and most small businesses leave it half-built.
      </p>
      <p>A fully optimized profile means:</p>
      <ul>
        <li>
          Correct name, address, phone, and hours — matching your website
          exactly.
        </li>
        <li>The right primary category (and secondary categories).</li>
        <li>Real photos — your shop, your work, your team. Not stock.</li>
        <li>
          A steady trickle of honest reviews, and you replying to them.
        </li>
        <li>Posts, products, and services filled in.</li>
        <li>
          Service areas set to Cumming, Forsyth County, and the North Metro
          Atlanta towns you cover.
        </li>
      </ul>
      <p>
        That&apos;s the difference between showing up in the map pack and being
        invisible. We wrote more on why Google increasingly drives local
        discovery in{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          how Google&apos;s AI is calling your business
        </InternalLink>
        .
      </p>
      <p>
        Here&apos;s the part agencies don&apos;t always say out loud:{" "}
        <strong>
          your Google Business Profile and your website are different things.
        </strong>{" "}
        A great profile can win the map pack even while your website is weak —
        and a great website can&apos;t fully rank if your profile is empty. You
        need both pulling the same direction.
      </p>

      <h2 id="local-seo-cost">What Does Local SEO Cost in Cumming, GA?</h2>
      <p>
        Real, ongoing local SEO work runs{" "}
        <strong>$500–$1,500 per month</strong>, depending on how competitive
        your category is and how much content and link work you need.
      </p>
      <p>Two things people get wrong about that number:</p>
      <p>
        <strong>It&apos;s ongoing, not one-time.</strong> SEO isn&apos;t a
        project you finish. Competitors keep moving, Google keeps changing, and
        fresh content + reviews keep compounding. The month you stop, you start
        sliding. Pay for the months you want to keep winning.
      </p>
      <p>
        <strong>Cheap &quot;SEO&quot; is usually a scam.</strong> A $99/month
        plan is buying you automated directory spam and a report nobody reads. It
        can actively hurt you. If a price looks too good, the work behind it
        isn&apos;t real.
      </p>
      <p>
        At Branding Zombie Designs, SEO lives inside{" "}
        <InternalLink href="/services/digital-marketing">
          digital marketing services
        </InternalLink>
        , and it pairs naturally with the website itself — because a slow,
        confusing, or outdated site caps everything SEO can do. If your site is
        the bottleneck, fixing that comes first; see{" "}
        <InternalLink href="/services/web-design">web design services</InternalLink>
        . For a fuller breakdown of how site cost and SEO interact, read{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          what website design and SEO cost
        </InternalLink>{" "}
        and our{" "}
        <InternalLink href="/blog/website-cost-cumming-ga-2026">
          Cumming website cost guide for 2026
        </InternalLink>
        .
      </p>

      <h2 id="seo-agency-cumming">
        How Much Does an SEO Agency in Cumming Charge — and How Do You Pick One?
      </h2>
      <p>
        When you compare an SEO agency option, the right questions aren&apos;t
        about price first. They&apos;re about what you actually get.
      </p>
      <p>Ask any SEO company provider:</p>
      <ul>
        <li>
          <strong>What exactly do I get each month?</strong> A real answer lists
          specifics — profile optimization, content, technical fixes, reviews
          strategy, reporting. Vague answers mean vague work.
        </li>
        <li>
          <strong>Can you show me local results?</strong> Not national vanity
          rankings — businesses near here that show up where they should.
        </li>
        <li>
          <strong>Do you guarantee #1?</strong> If they say yes, walk. Nobody
          controls Google. Honest providers promise effort and process, not a
          ranking.
        </li>
        <li>
          <strong>Will you explain it to me?</strong> You should understand what
          you&apos;re paying for without a CS degree.
        </li>
        <li>
          <strong>Who owns the work?</strong> Your website, your Google profile,
          your accounts should stay yours.
        </li>
      </ul>
      <p>
        For SEO services buyers, the cleanest setup is one shop that handles your
        logo, website, and SEO together — one designer, one invoice, everything
        pointing the same way. When your branding, site, and search work are
        split across three vendors, the seams show, and so does the cost. That
        one-roof approach is the whole idea behind{" "}
        <InternalLink href="/services/launch-package">the Launch Package</InternalLink>
        .
      </p>

      <h2 id="diy-vs-hiring">DIY vs Hiring: Can You Do SEO Yourself?</h2>
      <p>
        Yes — some of it, and you should, even if you hire help later.
      </p>
      <p>
        <strong>Do this yourself, free, starting today:</strong>
      </p>
      <ul>
        <li>Claim and fully fill out your Google Business Profile.</li>
        <li>
          Ask happy customers for reviews (just ask — most will).
        </li>
        <li>
          Make sure your name, address, and phone match everywhere online.
        </li>
        <li>Add real photos.</li>
        <li>
          Write down the actual questions customers ask you — those are your
          future content.
        </li>
      </ul>
      <p>
        <strong>Hire out the parts that eat your week or need expertise:</strong>{" "}
        technical site fixes, ongoing content, link building, and the strategy
        that ties it together. Your time is worth more spent running your
        business than wrestling a sitemap.
      </p>
      <p>
        If you&apos;re weighing whether to DIY your whole web presence,{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          can ChatGPT build a website
        </InternalLink>{" "}
        and{" "}
        <InternalLink href="/blog/can-chatgpt-do-seo">
          can ChatGPT do SEO
        </InternalLink>{" "}
        are honest reality checks before you go all-in on tools alone.
      </p>

      <h2 id="how-long">How Long Does SEO Take to Work?</h2>
      <p>
        Plan on <strong>3 to 6 months</strong> to see real movement, and longer
        in competitive categories. Anyone promising results in two weeks is
        selling ads dressed up as SEO.
      </p>
      <p>
        The fastest wins usually come from the Google Business Profile — a fully
        built, reviewed, photo-rich profile can move you into the map pack in
        weeks. Website and content rankings build slower but last longer.
      </p>
      <p>
        The mental model: SEO is a flywheel, not a switch. Early on it feels
        like nothing&apos;s happening. Then around month four it starts
        compounding, and the traffic you build keeps paying out long after —
        unlike ads, which die the day you stop.
      </p>

      <h2 id="seo-dead-ai">
        Is SEO Dead with AI Search? (AEO and GEO in 2026)
      </h2>
      <p>
        No — but it&apos;s changing shape. People now ask ChatGPT, Google&apos;s
        AI overviews, and other answer engines for recommendations, and those
        engines pull from the same signals: a clear website, a complete Google
        Business Profile, real reviews, and content that plainly answers real
        questions.
      </p>
      <p>
        That&apos;s <strong>AEO</strong> (answer engine optimization) and{" "}
        <strong>GEO</strong> (generative engine optimization), and the good news
        is they reward the same honest work local SEO always has — just aimed at
        getting cited in AI answers, not only ranked in blue links. The
        businesses winning AI recommendations are the ones with consistent,
        structured, trustworthy information across the web.
      </p>
      <p>
        So no, SEO isn&apos;t dead. The label is shifting; the fundamentals — be
        clear, be findable, be trusted — matter more than ever. We dig deeper in{" "}
        <InternalLink href="/blog/is-seo-dead-2026">
          is SEO dead in 2026
        </InternalLink>{" "}
        and{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          how Google&apos;s AI is calling your business
        </InternalLink>
        .
      </p>

      <h2 id="do-you-need-seo">
        So — Do You Actually Need SEO in Cumming?
      </h2>
      <p>
        If customers find you mostly by word of mouth and you&apos;re
        comfortable there, you can start small: just fix your Google Business
        Profile and ask for reviews. That alone beats most of your competitors.
      </p>
      <p>
        If you want to grow, get found by people who don&apos;t know you yet, and
        stop renting all your traffic from ads, then yes — ongoing local SEO is
        one of the best investments a Forsyth County small business can make.
        Start with the free levers, fix the website if it&apos;s holding you
        back, then layer in monthly SEO when you&apos;re ready to compound it.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Bring SEO Back from the Dead
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          Buried on page two where nobody can find you?
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Let&apos;s drag your business back into the light. Start free with a
          no-cost site audit, then layer in honest, ongoing SEO — local, clear,
          and no #1-guaranteed snake oil.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-worth-it">
        Is SEO worth it for a small business in Cumming?
      </h3>
      <p>
        For most local businesses, yes — especially the free parts. A fully
        optimized Google Business Profile and a steady flow of reviews can win
        the map pack with little or no spend. Paid ongoing SEO ($500–$1,500/mo)
        is worth it when you&apos;re ready to grow beyond word of mouth.
      </p>

      <h3 id="faq-cost">How much does local SEO cost?</h3>
      <p>
        Real local SEO in Cumming, GA runs <strong>$500–$1,500 per month</strong>{" "}
        as an ongoing service, based on how competitive your category is. Avoid
        $99 &quot;SEO&quot; plans — they&apos;re usually automated spam that can
        hurt you. SEO is a monthly investment, not a one-time fix.
      </p>

      <h3 id="faq-how-long">How long does SEO take to work?</h3>
      <p>
        Expect <strong>3 to 6 months</strong> for meaningful movement, longer in
        competitive markets. Google Business Profile improvements show fastest —
        sometimes within weeks. Website and content rankings build slower but
        last far longer than ads. Anyone promising results in days is selling
        something else.
      </p>

      <h3 id="faq-diy">Can I do SEO myself?</h3>
      <p>
        Yes — the basics. Claim and complete your Google Business Profile, ask
        customers for reviews, keep your name/address/phone consistent
        everywhere, and add real photos. That free work moves the needle. Hire
        out technical fixes, ongoing content, and strategy when they start
        eating your week.
      </p>

      <h3 id="faq-seo-vs-gbp">
        What&apos;s the difference between SEO and Google Business Profile?
      </h3>
      <p>
        Your Google Business Profile is your free listing that powers the map
        pack — name, hours, reviews, photos. SEO is the broader work of ranking
        your website and listings everywhere. The profile is one (huge) piece of
        local SEO, not a replacement for it. You want both.
      </p>

      <h3 id="faq-ai">Is SEO dead with AI search?</h3>
      <p>
        No. AI answer engines like ChatGPT and Google&apos;s AI overviews pull
        from the same signals SEO builds — clear websites, complete profiles,
        real reviews, helpful content. That&apos;s AEO/GEO. The label is
        evolving, but being clear, findable, and trusted matters more in 2026,
        not less.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, SEO, signage, and apparel for small
        businesses across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function WebDesignCummingGaContent() {
  return (
    <>
      <p>
        <strong>
          Web design in Cumming, GA typically starts around $1,500
        </strong>{" "}
        for a simple landing page and climbs to{" "}
        <strong>$2,500&ndash;$7,500+</strong> for multi-page and e-commerce
        sites, depending on how many pages you need and whether you&apos;re
        starting from scratch. Good local web design isn&apos;t just a pretty
        homepage — it&apos;s a fast, mobile-first site built to show up in
        Forsyth County searches, send phone calls and form fills your way, and
        stay fully owned by you. This guide, from{" "}
        <strong>
          Branding Zombie Designs, a graphic + web design studio in Cumming, GA
        </strong>
        , walks you through what to look for, what it actually costs, and the
        one question most first-time buyers forget to ask: who owns the site
        when it&apos;s done?
      </p>

      <p>
        If you&apos;re a first-time small business owner comparing your options,
        this is the complete local buyer&apos;s guide.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Web design in Cumming, GA starts around $1,500</strong> for
            a 1&ndash;2 page landing site and rises to $2,500, $4,500, and
            $7,500+ for multi-page and e-commerce builds.
          </li>
          <li>
            <strong>Good local web design</strong> is mobile-first, fast, has
            local SEO and schema baked in, and gives every page one clear call
            to action.
          </li>
          <li>
            <strong>Bundles to know:</strong> the $997 Startup Special (1-page
            site + logo + print) and the $4,500 Launch Package (logo, brand
            basics, 5-page site).
          </li>
          <li>
            <strong>Ask who owns it.</strong> You should own your finished site
            and domain outright — get it in writing before you pay anyone.
          </li>
          <li>
            <strong>DIY, Squarespace, and AI</strong> are fine starting points,
            but a local designer gets you real local SEO, full ownership, and a
            human who picks up the phone.
          </li>
        </ul>
      </aside>

      <h2 id="what-good-web-design-includes">
        What does good web design in Cumming, GA actually include?
      </h2>
      <p>
        A lot of &quot;websites&quot; are just brochures that sit there. A site
        worth paying for does a job: it gets found, loads fast, and turns
        visitors into customers. When you&apos;re shopping for web design in
        Cumming, GA, make sure these are baked in — not sold as expensive
        add-ons later.
      </p>
      <p>
        <strong>Mobile-first design.</strong> More than half your visitors are
        on a phone, and in our experience local searches skew even higher. The
        site should be built for the small screen first, then scaled up — not
        the other way around.
      </p>
      <p>
        <strong>Fast load times.</strong> A slow site loses customers and Google
        rankings at the same time. Pages should feel instant, with compressed
        images and clean code under the hood.
      </p>
      <p>
        <strong>Local SEO built in.</strong> Your site should name Cumming,
        Forsyth County, and the towns you serve, with proper page titles,
        descriptions, and a Google Business Profile connection. If a designer
        doesn&apos;t mention local SEO, that&apos;s a flag — see our{" "}
        <InternalLink href="/blog/seo-cumming-ga">
          SEO guide for Cumming, GA
        </InternalLink>
        .
      </p>
      <p>
        <strong>Schema markup.</strong> This is the behind-the-scenes code that
        tells Google (and AI search) exactly who you are, where you&apos;re
        located, and what you do. It&apos;s increasingly how you get pulled into
        AI answers — more on that in{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          Google&apos;s AI is already calling your business
        </InternalLink>
        .
      </p>
      <p>
        <strong>One clear call to action.</strong> Every page should make the
        next step obvious: call, text, book, or buy. A site that makes people
        hunt for your phone number is a leaky bucket.
      </p>
      <p>
        If your current site is missing these, it may be quietly costing you
        customers —{" "}
        <InternalLink href="/blog/how-your-website-is-costing-you-customers">
          here&apos;s how to tell
        </InternalLink>
        .
      </p>

      <h2 id="web-design-cost">
        What does web design cost in Cumming, GA?
      </h2>
      <p>
        Pricing depends on scope, but here&apos;s how it actually breaks down
        locally instead of vague &quot;it depends&quot; answers. At Branding
        Zombie Designs,{" "}
        <InternalLink href="/services/web-design">
          website design
        </InternalLink>{" "}
        projects fall into clear tiers:
      </p>
      <ul>
        <li>
          <strong>Landing page — from $1,500.</strong> A focused 1&ndash;2 page
          site, usually turned around in about 7 days. Great for a single
          service or a launch.
        </li>
        <li>
          <strong>Starter site — around $2,500.</strong> Up to 5 pages. The
          right fit for most first-time small businesses that need home, about,
          services, and contact done well.
        </li>
        <li>
          <strong>Growth site — around $4,500.</strong> Our most popular tier.
          More pages, deeper local SEO, stronger structure for businesses that
          want the site to actually pull in leads.
        </li>
        <li>
          <strong>Premium / e-commerce — $7,500+.</strong> Online stores,
          booking systems, and larger custom builds.
        </li>
      </ul>
      <p>Two bundles are worth knowing about if you&apos;re starting from zero:</p>
      <ul>
        <li>
          <strong>The Startup Special — $997.</strong> A budget launch offer:
          logo + brand kit + 100 business cards + 100 flyers + a 1-page site
          with domain and a year of hosting, in about 10 days. See the{" "}
          <InternalLink href="/startup-special">Startup Special</InternalLink>.
          (This is the only $997 site — it&apos;s a 1-pager, not a full
          multi-page build.)
        </li>
        <li>
          <strong>The Launch Package — $4,500.</strong> The full bundle: logo
          suite, brand basics, a 5-page website, and a 90-day content calendar
          in roughly 4 weeks. See the{" "}
          <InternalLink href="/services/launch-package">
            Launch Package
          </InternalLink>
          .
        </li>
      </ul>
      <p>
        If you also want ongoing search visibility,{" "}
        <strong>SEO runs $500&ndash;$1,500/mo</strong> depending on how
        competitive your category is. For a deeper cost breakdown, read{" "}
        <InternalLink href="/blog/website-cost-cumming-ga-2026">
          what a website really costs in Cumming, GA for 2026
        </InternalLink>{" "}
        and{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          website design + SEO cost explained
        </InternalLink>
        .
      </p>
      <p>
        When you see a quote far below these numbers, ask what&apos;s missing —
        usually it&apos;s ownership, speed, local SEO, or all three.
      </p>

      <h2 id="diy-vs-local">
        DIY, Squarespace, or AI vs. a local web designer
      </h2>
      <p>
        You don&apos;t <em>have</em> to hire anyone. So let&apos;s be honest
        about the trade-offs of small business web design options.
      </p>
      <p>
        <strong>DIY website builders (Wix, Squarespace, GoDaddy).</strong> Cheap
        monthly fees, real templates, and you can get something live in a
        weekend. The catch: it looks like a template, the local SEO is shallow,
        and you&apos;re renting the platform forever. The moment you stop paying,
        the site can disappear.
      </p>
      <p>
        <strong>AI website tools.</strong> These have gotten genuinely
        impressive at first drafts. But &quot;impressive demo&quot; and
        &quot;ranks in Forsyth County and converts&quot; are two different
        things — AI tends to produce generic copy, weak local signals, and no
        real strategy. We tested this directly in{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          can ChatGPT build a website?
        </InternalLink>
      </p>
      <p>
        <strong>A local web designer in Cumming.</strong> You get a site built
        around <em>your</em> business, real local SEO, a human who picks up the
        phone, and — critically — full ownership of the finished site and
        domain. A good web designer locals can actually meet beats a faceless
        template marketplace when something breaks or your business changes.
      </p>
      <p>
        There&apos;s no shame in starting on Squarespace. But if leads matter, a
        custom-built site usually pays for itself. If you&apos;re weighing it
        out,{" "}
        <InternalLink href="/blog/how-to-pick-a-web-design-company">
          how to pick a web design company
        </InternalLink>{" "}
        digs deeper.
      </p>

      <h2 id="do-you-own-your-website">
        Do you own your website? (The question nobody asks)
      </h2>
      <p>
        This is the most important line in this whole guide:{" "}
        <strong>
          you should own your website and your domain — completely.
        </strong>
      </p>
      <p>
        Plenty of cheap shops and &quot;free website&quot; deals quietly keep
        the keys. Cancel your monthly plan and the site is gone. Want to move to
        another designer? You can&apos;t take it with you. Try to update your own
        contact info? Locked out.
      </p>
      <p>
        When you work with Branding Zombie Designs, the finished site is yours.
        You own the domain, you own the files, and you can host it wherever you
        want. That&apos;s how it should work everywhere — but it isn&apos;t, so
        ask the question in writing before you pay anyone.
      </p>
      <p>
        <em>
          Translation: don&apos;t let a vendor hold your own front door hostage.
        </em>
      </p>

      <h2 id="how-long-does-it-take">
        How long does it take to build a website?
      </h2>
      <p>
        Timelines depend on scope and how fast you get us your content (photos,
        text, logo). As a rough local guide:
      </p>
      <ul>
        <li>
          <strong>1-page landing site:</strong> about 7 days.
        </li>
        <li>
          <strong>Starter (up to 5 pages):</strong> roughly 2&ndash;3 weeks.
        </li>
        <li>
          <strong>Growth / Premium:</strong> 4&ndash;6 weeks, sometimes more for
          e-commerce.
        </li>
      </ul>
      <p>
        The single biggest delay is almost always waiting on content from the
        client — not the design itself. Come prepared with your photos and a
        list of services and you&apos;ll move fast.
      </p>

      <h2 id="red-flags">
        Red flags when hiring a web designer in Cumming
      </h2>
      <p>Watch for these before you sign anything:</p>
      <ul>
        <li>
          <strong>No ownership.</strong> If you don&apos;t get the site and
          domain, walk.
        </li>
        <li>
          <strong>Monthly-only &quot;you&apos;ll never own it&quot; pricing</strong>{" "}
          with no buyout.
        </li>
        <li>
          <strong>No mention of mobile, speed, or local SEO.</strong> That&apos;s
          a brochure, not a marketing tool.
        </li>
        <li>
          <strong>No portfolio of real local work</strong> you can click
          through.
        </li>
        <li>
          <strong>Vague pricing that never lands on a number.</strong> A pro can
          give you tiers like the ones above.
        </li>
        <li>
          <strong>No clear point of contact.</strong> You want one designer, one
          invoice — not a ticket queue.
        </li>
      </ul>

      <h2 id="affordable-web-design">
        How affordable web design works without cutting corners
      </h2>
      <p>
        &quot;Cheap&quot; and &quot;affordable&quot; aren&apos;t the same thing.
        Affordable web design services that Cumming business owners actually want
        means right-sized scope — paying for the pages and features you need now,
        with room to grow — not a stripped site that quietly omits ownership and
        SEO.
      </p>
      <p>
        That&apos;s the advantage of a small local studio: one designer who can
        do your logo, your website, your shirts, and your signs under one roof —
        one designer, one invoice. You&apos;re not paying agency overhead, and
        branding and web design stay consistent because the same person builds
        both. Explore the work at{" "}
        <InternalLink href="/services/web-design">web design</InternalLink> or{" "}
        <InternalLink href="/services/request-quote">
          request a quote
        </InternalLink>
        .
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Own It, Don&apos;t Rent It
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          A site that&apos;s yours for keeps — no resurrection fees.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Whether you need a clean 1-pager or a full Growth build, you&apos;ll
          get one designer, one invoice, and a fast, mobile-first site built to
          show up in Forsyth County — fully owned by you. Let&apos;s build
          something that actually bites.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-cost">How much does web design cost in Cumming, GA?</h3>
      <p>
        Web design in Cumming, GA generally starts around $1,500 for a
        1&ndash;2 page landing site, with multi-page builds running about
        $2,500, $4,500, and $7,500+ for e-commerce. The $997 Startup Special
        includes a 1-page site plus logo and print. SEO is a separate
        $500&ndash;$1,500/mo.
      </p>

      <h3 id="faq-ownership">Do I own my website?</h3>
      <p>
        You should — fully. With Branding Zombie Designs you own the finished
        site and the domain, and you can host it anywhere. Beware cheap shops
        and &quot;free website&quot; deals that keep ownership: cancel the plan
        and the site disappears. Always get ownership confirmed in writing before
        paying.
      </p>

      <h3 id="faq-timeline">How long does it take to build a website?</h3>
      <p>
        A 1-page site can launch in about 7 days, a 5-page Starter site in
        2&ndash;3 weeks, and larger Growth or e-commerce builds in 4&ndash;6
        weeks. The biggest delay is usually waiting on your photos and content,
        so come prepared to move fast.
      </p>

      <h3 id="faq-squarespace">Squarespace vs. custom — which is better?</h3>
      <p>
        Squarespace is cheap and quick but template-limited, shallow on local
        SEO, and rented monthly. A custom site is built around your business with
        real Forsyth County SEO and full ownership. Start on Squarespace if
        budget is tight; go custom once leads matter.
      </p>

      <h3 id="faq-ai">Can AI build my website?</h3>
      <p>
        AI can draft a decent-looking site fast, but it tends to produce generic
        copy, weak local signals, and no real strategy for ranking in Cumming.
        It&apos;s a starting point, not a finished marketing tool. We tested
        exactly this in our{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          ChatGPT website experiment
        </InternalLink>
        .
      </p>

      <h3 id="faq-pick">How do I pick a web designer?</h3>
      <p>
        Look for real local work, clear tiered pricing, mobile-first and fast
        builds, local SEO and schema included, and — non-negotiable — full
        ownership of your site and domain. One designer and one invoice beats a
        faceless template marketplace when something breaks.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function IsSeoDead2026Content() {
  return (
    <>
      <p>
        <strong>
          No, SEO is not dead in 2026 — it evolved.
        </strong>{" "}
        The honest answer to &quot;is SEO dead or evolving in 2026&quot; is that
        traditional ranking still matters, but AI answer engines (Google AI
        Overviews, ChatGPT, Gemini, Perplexity) now sit on top of search and
        pull the answers people read first. At Branding Zombie Designs, a graphic
        + web design studio in Cumming, GA serving Forsyth County and North Metro
        Atlanta, we tell small business owners the same thing: keep doing SEO,
        and add a new layer — getting cited in the AI answer box.
      </p>

      <p>
        So the headline scare (&quot;is SEO dead&quot;) is clickbait. The real
        shift is that there are now two finish lines instead of one: the blue
        links you&apos;ve always chased, and the AI-generated summary that
        quietly steals the click before anyone scrolls.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>SEO didn&apos;t die — it split into two jobs:</strong>{" "}
            classic ranking (still works) and AEO/GEO (getting cited by AI).
          </li>
          <li>
            <strong>The AI answer box is the new front page.</strong> Google AI
            Overviews and ChatGPT name two or three businesses before anyone
            clicks.
          </li>
          <li>
            <strong>Fundamentals still win:</strong> helpful content, local SEO,
            a fast site, schema markup, and real authority feed both Google and
            the AI engines.
          </li>
          <li>
            <strong>Citations are the new backlinks.</strong> Being named in an
            AI answer is becoming as valuable as a top-3 ranking used to be.
          </li>
          <li>
            <strong>For a Cumming, GA business:</strong> stack AEO on top of SEO
            — don&apos;t throw anything out.
          </li>
        </ul>
      </aside>

      <h2 id="is-seo-dead-or-evolving">
        Is SEO dead or evolving in 2026? (the honest take)
      </h2>
      <p>SEO didn&apos;t die. It split into two jobs.</p>
      <p>
        <strong>Job one — classic SEO — still works.</strong> Google still ranks
        pages. People still scroll, still click, still compare three local shops
        before they call. Helpful content, fast websites, local relevance, and
        real reviews still decide who shows up. None of that went away.
      </p>
      <p>
        <strong>Job two — AEO/GEO — is new.</strong> A growing share of searches
        now end with an AI-written answer at the very top. Someone types
        &quot;best HVAC company near Cumming GA,&quot; and Google&apos;s AI
        Overview hands them a paragraph with two or three businesses named — no
        clicking required. If you&apos;re not in that paragraph, you may rank #2
        and still get skipped.
      </p>
      <p>
        That&apos;s the evolution. Ranking gets you the click. Getting cited gets
        you named before the click even happens. In 2026 you want both.
      </p>
      <p>
        We broke down the AI-citation side in detail in{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          Google AI Is Calling Your Business
        </InternalLink>{" "}
        — start there if you only read one follow-up.
      </p>

      <h2 id="what-still-works">
        What still works in 2026 (don&apos;t throw this out)
      </h2>
      <p>
        If a &quot;guru&quot; tells you SEO is dead and you should burn it all
        down, walk away. The fundamentals are now table stakes — they feed both
        Google and the AI engines.
      </p>
      <ul>
        <li>
          <strong>Helpful, specific content.</strong> Pages that actually answer
          a real question, written for humans, in plain language. AI engines lift
          from clear, well-structured writing — the same writing that ranks.
        </li>
        <li>
          <strong>Local SEO.</strong> For a Cumming, GA business, &quot;local seo
          cumming&quot; is the whole game. Your Google Business Profile,
          consistent name/address/phone, local landing pages, and real customer
          reviews still drive the map pack and feed AI answers about your area.
        </li>
        <li>
          <strong>A fast, clean website.</strong> Slow, messy sites lose rankings
          and confuse the bots trying to summarize you. (If yours is sluggish,
          here&apos;s{" "}
          <InternalLink href="/blog/how-your-website-is-costing-you-customers">
            how your website is costing you customers
          </InternalLink>
          .)
        </li>
        <li>
          <strong>Schema markup.</strong> This is the structured-data code that
          tells search engines and AI exactly what your page is — a service, a
          price, a FAQ, a local business. It&apos;s quietly one of the biggest
          AEO levers, and most small-business sites have none.
        </li>
        <li>
          <strong>Real authority.</strong> Mentions, links, and a consistent
          brand across the web. AI engines trust entities they see referenced in
          more than one place.
        </li>
      </ul>
      <p>
        Notice the overlap: everything that helps you rank also helps you get
        cited. AEO isn&apos;t a replacement for SEO — it&apos;s SEO done so
        cleanly that a machine can quote you.
      </p>

      <h2 id="the-ai-answer-box">What changed: the AI answer box</h2>
      <p>Here&apos;s the part that&apos;s genuinely new since 2024.</p>
      <p>
        When you search now, you often get an{" "}
        <strong>AI-generated summary first</strong> — Google calls it AI
        Overviews — and millions of people skip search entirely and just ask{" "}
        <strong>ChatGPT, Gemini, or Perplexity</strong> directly. Those tools
        answer with a short list of recommended businesses, products, or steps.
      </p>
      <p>
        That summary is the new front page. It compresses ten blue links into one
        paragraph. Good if you&apos;re named in it. Brutal if you&apos;re not.
      </p>
      <p>Two things follow from that:</p>
      <ol>
        <li>
          <strong>&quot;Zero-click&quot; is real.</strong> More searches end
          without anyone visiting a website. Your job shifts from &quot;win the
          click&quot; to &quot;be the answer,&quot; because being named in the
          summary is its own kind of win — that&apos;s how local people first
          hear your name.
        </li>
        <li>
          <strong>Citations are the new backlinks.</strong> Getting referenced
          inside an AI answer is becoming as valuable as a top-3 ranking used to
          be. The discipline of earning that is{" "}
          <strong>AEO (Answer Engine Optimization)</strong>, sometimes called{" "}
          <strong>GEO (Generative Engine Optimization)</strong>.
        </li>
      </ol>
      <p>
        We tested how good these tools actually are at the build side too — see{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          Can ChatGPT build a website?
        </InternalLink>{" "}
        and{" "}
        <InternalLink href="/blog/can-chatgpt-do-seo">
          Can ChatGPT do SEO?
        </InternalLink>{" "}
        — short version: useful assistant, terrible substitute for a strategy.
      </p>

      <h2 id="what-should-a-cumming-business-do">
        What should a Cumming small business do now?
      </h2>
      <p>
        You don&apos;t need to panic or rebuild everything. You need to stack the
        new layer on top of the old one. Here&apos;s the order we&apos;d run it.
      </p>
      <p>
        <strong>1. Fix the foundation.</strong> A fast website with clean
        structure and schema baked in. If your site is old or DIY, this is where
        the returns are biggest. Our{" "}
        <InternalLink href="/services/web-design">web design</InternalLink>{" "}
        builds ship with schema in place, so the AI engines can read you from day
        one.
      </p>
      <p>
        <strong>2. Lock down local.</strong> Claim and fully fill your Google
        Business Profile, get consistent across directories, and ask happy
        customers for reviews. For the full local playbook, see{" "}
        <InternalLink href="/blog/seo-cumming-ga">SEO in Cumming, GA</InternalLink>{" "}
        and our broader{" "}
        <InternalLink href="/blog/how-to-advertise-small-business-cumming-georgia">
          guide to advertising a small business in Cumming, Georgia
        </InternalLink>
        .
      </p>
      <p>
        <strong>3. Write answer-shaped content.</strong> Pages that lead with a
        direct answer, use question-style headings, and include a real FAQ. That
        format is what AI Overviews and ChatGPT lift from. (It&apos;s literally
        how this article is built.)
      </p>
      <p>
        <strong>4. Add schema and entity signals.</strong> Mark up your services,
        prices, location, and FAQs so machines can quote you accurately. Make
        sure your brand + city pairing — &quot;Branding Zombie Designs, Cumming,
        GA&quot; — shows up consistently everywhere.
      </p>
      <p>
        <strong>5. Measure both finish lines.</strong> Track rankings and clicks
        like always, but also literally ask ChatGPT, Gemini, and Perplexity
        questions your customers would ask and see whether you come up.
      </p>
      <p>
        That&apos;s AEO in practice — and it&apos;s the same care plan that keeps
        you ranking in classic SEO. One job, two payoffs.
      </p>

      <h2 id="what-this-costs">What this costs (real numbers, no fluff)</h2>
      <p>
        We keep pricing on the live site, so here&apos;s the honest range for a
        Cumming, GA small business:
      </p>
      <ul>
        <li>
          <strong>SEO/AEO:</strong> <strong>$500–$1,500/mo</strong>, depending on
          how competitive your niche is and how much content we&apos;re
          producing. Details on{" "}
          <InternalLink href="/services/digital-marketing">
            digital marketing
          </InternalLink>
          .
        </li>
        <li>
          <strong>A new website</strong> (with schema built in): commonly{" "}
          <strong>$2,500 / $4,500 / $7,500+</strong>, with standalone web design
          starting around <strong>$1,500</strong>. See{" "}
          <InternalLink href="/services/web-design">web design</InternalLink>.
        </li>
        <li>
          <strong>Just getting started?</strong> The{" "}
          <InternalLink href="/startup-special">Startup Special</InternalLink> is{" "}
          <strong>$997</strong> — logo, brand kit, 100 business cards, 100
          flyers, and a 1-page site with domain and a year of hosting, in 10
          days.
        </li>
        <li>
          <strong>Going all-in?</strong> The{" "}
          <InternalLink href="/services/launch-package">Launch Package</InternalLink>{" "}
          is <strong>$4,500</strong> — logo suite, brand basics, a 5-page
          website, and a 90-day content calendar in 4 weeks.
        </li>
        <li>
          <strong>Need a logo first?</strong> Tiers run{" "}
          <strong>$750 / $1,500 / $2,500</strong> on{" "}
          <InternalLink href="/services/logo-design">logo design</InternalLink>.
        </li>
      </ul>
      <p>
        Not sure where you land? Text Gerry or{" "}
        <InternalLink href="/services/request-quote">request a quote</InternalLink>{" "}
        and we&apos;ll point you at the cheapest thing that actually moves the
        needle. Want a gut-check on your current site? Grab a{" "}
        <InternalLink href="/free-site-audit">free site audit</InternalLink>.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          The Dead Don&apos;t Get Quoted
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          Win the ranking AND the AI answer box.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          If your site is invisible to Google AND the answer box, let&apos;s fix
          both. Let&apos;s get your name into the paragraph that decides who gets
          called.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-worth-it">Is SEO still worth it in 2026?</h3>
      <p>
        Yes. SEO still drives the clicks, calls, and map-pack visibility that
        small businesses live on. What changed is that AI answer engines now sit
        on top of search, so you also need AEO. The smart move is doing both —
        they share the same foundation.
      </p>

      <h3 id="faq-aeo-geo">What is AEO / GEO?</h3>
      <p>
        AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization)
        mean optimizing so AI tools — Google AI Overviews, ChatGPT, Gemini,
        Perplexity — name and cite your business in their answers. It&apos;s the
        new layer that sits on top of traditional SEO, built on clean content and
        schema.
      </p>

      <h3 id="faq-replace-google">Will AI replace Google search?</h3>
      <p>
        Not entirely — but it&apos;s reshaping it. People increasingly get
        answers from AI summaries or chatbots instead of scrolling links, so more
        searches end &quot;zero-click.&quot; Google itself now leads with AI
        Overviews. The win is being the business the AI names, not just the one
        that ranks.
      </p>

      <h3 id="faq-get-cited">How do I get cited by ChatGPT or Gemini?</h3>
      <p>
        Publish clear, answer-first content, add schema markup, keep your brand
        and city consistent everywhere, and earn mentions across the web. AI
        engines quote sources they can read easily and see referenced in more
        than one place. That&apos;s exactly what AEO is for.
      </p>

      <h3 id="faq-local-seo">Does local SEO still matter?</h3>
      <p>
        More than ever for a Cumming, GA business. AI answers about
        &quot;near me&quot; searches pull heavily from Google Business Profiles,
        reviews, and local relevance signals. Strong local SEO is also what gets
        you named in AI Overviews for your service area.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, owner of Branding Zombie Designs. Based in
        Cumming, GA. Logos, websites, signage, and apparel for small businesses
        across Forsyth County and North Metro Atlanta since 2015.
      </p>
    </>
  );
}

function CanChatgptDoSeoContent() {
  return (
    <>
      <p>
        <strong>
          Can ChatGPT do SEO? Partly.
        </strong>{" "}
        ChatGPT is a genuinely useful assistant for parts of SEO — keyword
        brainstorming, draft copy, meta tags, content outlines, and schema
        scaffolding — but it cannot do the work that actually moves a small
        business up Google in Cumming, GA: real Google Business Profile
        management, local citations and reviews, link building, technical
        fixes, and live competitor research in Forsyth County. At Branding
        Zombie Designs, a graphic + web design studio in Cumming, GA, we use AI
        as a tool every single day, and we&apos;ll tell you exactly where it
        shines and where it quietly hurts you.
      </p>

      <p>
        That&apos;s the honest version. Now let&apos;s break it down so you know
        what to hand the robot and what to keep human.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>ChatGPT is great at the desk work</strong> — keyword ideas,
            first-draft content, meta titles, schema scaffolding, and outlines.
          </li>
          <li>
            <strong>It can&apos;t do the real-world execution</strong> — Google
            Business Profile, local citations, reviews, links, technical fixes,
            or live competitor research.
          </li>
          <li>
            <strong>AI-written content isn&apos;t automatically bad</strong> —
            but raw, generic, made-up-fact AI content gets buried.
          </li>
          <li>
            <strong>Best move:</strong> let AI assist with drafting, keep a
            human on strategy and local execution.
          </li>
          <li>
            <strong>SEO with us runs $500–$1,500/mo</strong> depending on scope
            — the parts ChatGPT structurally can&apos;t touch.
          </li>
        </ul>
      </aside>

      <h2 id="overhyped">Can ChatGPT do SEO, or is it overhyped?</h2>
      <p>
        Both, kind of. SEO isn&apos;t one task — it&apos;s a stack of about a
        dozen jobs, and ChatGPT is great at maybe four of them.
      </p>
      <p>
        Think of it like a smart intern. Fast, tireless, never complains, and
        occasionally makes up a fact with total confidence. You&apos;d let an
        intern draft something. You wouldn&apos;t let an intern run your whole
        marketing without checking the work.
      </p>
      <p>
        So before you cancel your SEO budget and &quot;just use AI,&quot; it
        helps to split SEO into two buckets: the desk work AI is good at, and
        the real-world execution it can&apos;t touch.
      </p>

      <h2 id="what-chatgpt-does-well">
        What ChatGPT actually does well for SEO
      </h2>
      <p>
        Credit where it&apos;s due. These are the things we genuinely use AI
        for, and they save real hours.
      </p>
      <p>
        <strong>Keyword ideas and grouping.</strong> Ask it for 50 keyword
        variations around &quot;HVAC repair Cumming&quot; and it&apos;ll spit
        out a solid starting list, plus group them by intent. It won&apos;t have
        real search volume — that needs a tool — but as a brainstorm it&apos;s
        fast.
      </p>
      <p>
        <strong>First-draft content.</strong> Blog outlines, rough drafts, FAQ
        phrasing, product descriptions. A blank page is the enemy of consistent
        content, and AI kills the blank page. You still have to rewrite it in
        your own voice, but the skeleton appears in seconds.
      </p>
      <p>
        <strong>Meta titles and descriptions.</strong> Give it a page and ask
        for ten title-tag options under 60 characters. Honestly useful. You
        pick the best, tweak the city in, done.
      </p>
      <p>
        <strong>Schema scaffolding.</strong> Need JSON-LD for an FAQ or
        LocalBusiness block? ChatGPT will scaffold the structure for you. You
        still verify it against Google&apos;s rules and plug in real values —
        but the boilerplate is handled.
      </p>
      <p>
        <strong>Content briefs and outlines.</strong> Heading structures,
        &quot;people also ask&quot; angles, sections you forgot. Great for
        organizing a piece before you write it.
      </p>
      <p>
        Notice the pattern: every one of those is a first draft or an idea. AI
        is excellent at starting things. It is not excellent at finishing them,
        and it&apos;s terrible at doing anything in the real world.
      </p>

      <h2 id="where-chatgpt-gets-it-wrong">
        Where ChatGPT gets SEO dangerously wrong
      </h2>
      <p>
        This is the part nobody selling an &quot;AI SEO tool&quot; wants to say
        out loud.
      </p>
      <p>
        <strong>It hallucinates facts and citations.</strong> Ask ChatGPT for a
        statistic or a source and it will sometimes invent one — a study that
        doesn&apos;t exist, a fake URL, a made-up percentage. Publish that on
        your site and you&apos;ve damaged your credibility and, increasingly,
        your rankings. Google rewards trustworthy, accurate content. A confident
        lie is the opposite.
      </p>
      <p>
        <strong>It can&apos;t touch your Google Business Profile.</strong> For a
        local business, your Google Business Profile is the single biggest
        local-SEO lever — your map pack ranking, your reviews, your hours, your
        photos, your categories. ChatGPT cannot log in, optimize categories,
        respond to reviews, or post updates. That work is hands-on, and it&apos;s
        most of what wins local search in Cumming.
      </p>
      <p>
        <strong>No local citations, no reviews, no links.</strong> Getting your
        business listed consistently across directories, earning real reviews,
        and getting other sites to link to you — none of that happens in a chat
        window. These are relationships and submissions in the real world. AI
        can write the outreach email; it cannot do the outreach.
      </p>
      <p>
        <strong>No live competitor analysis.</strong> ChatGPT doesn&apos;t know
        who&apos;s ranking for &quot;web design Cumming GA&quot; today, what
        their pages look like, or where the gaps are. Its training data is
        frozen and generic. Real local SEO means opening the actual Cumming
        results and reverse-engineering what&apos;s winning right now.
      </p>
      <p>
        <strong>Generic content that doesn&apos;t rank.</strong> If you publish
        raw AI output, you&apos;re publishing the same average answer as
        everyone else who typed the same prompt. Google has plenty of average.
        What ranks is specific — your jobs, your city, your photos, your
        opinions. AI can&apos;t supply those because it doesn&apos;t have them.
      </p>
      <p>
        <strong>It ignores the technical layer.</strong> Core Web Vitals, page
        speed, mobile rendering, crawl issues, broken redirects — the plumbing
        that decides whether Google can even read your site. ChatGPT can explain
        these concepts, but it can&apos;t fix them on your actual site.
        That&apos;s developer work.
      </p>
      <p>
        So: great assistant, not a strategist, and definitely not a
        local-execution team.
      </p>

      <h2 id="ai-content-bad-for-seo">Is AI-written content bad for SEO?</h2>
      <p>
        Not automatically — but lazy AI content is. Google&apos;s stance is
        about quality and helpfulness, not whether a human or a machine typed
        the first draft.
      </p>
      <p>
        The problem is that most AI content is shipped raw. It&apos;s vague, it
        cites nothing real, it has no point of view, and it reads like every
        other page on the topic. That&apos;s what gets buried — not because a
        robot wrote it, but because it&apos;s generic.
      </p>
      <p>
        We use AI to draft, then a human adds the local detail, the real
        examples, the honest opinion, and the city. That blend ranks. The raw
        version usually doesn&apos;t.
      </p>
      <p>
        If you want the longer version of this debate, we wrote about whether{" "}
        <InternalLink href="/blog/will-ai-replace-graphic-designers">
          AI will replace graphic designers
        </InternalLink>{" "}
        and whether{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          ChatGPT can build a website
        </InternalLink>{" "}
        — same theme: powerful tool, not a replacement.
      </p>

      <h2 id="use-chatgpt-or-hire-seo">
        Should you use ChatGPT or hire an SEO?
      </h2>
      <p>
        Use both, honestly. Use ChatGPT to move faster on the desk work. Hire a
        human for the strategy and the real-world execution that AI structurally
        cannot do.
      </p>
      <p>Here&apos;s the rough split:</p>
      <ul>
        <li>
          <strong>DIY-with-AI works</strong> if you have time, you&apos;ll edit
          everything, and you mainly need help writing and organizing. A
          motivated owner can absolutely use AI to keep a blog alive.
        </li>
        <li>
          <strong>Hire a human</strong> when you need to actually rank in a
          competitive local market — map pack, reviews, citations, links,
          technical fixes, and a real content strategy aimed at your customers.
        </li>
      </ul>
      <p>
        That&apos;s where we come in. Our{" "}
        <InternalLink href="/services/digital-marketing">
          digital marketing service
        </InternalLink>{" "}
        handles the parts ChatGPT can&apos;t: Google Business Profile, local
        citations, real competitor research in Cumming, technical SEO, and
        content that&apos;s actually written for your customers. SEO runs{" "}
        <strong>$500–$1,500/mo</strong> depending on scope.
      </p>
      <p>
        We&apos;re a one-shop studio — logo, website, shirts, and signs under
        one roof, one designer, one invoice — so the same person who builds your
        site also handles its SEO. Pricing for the rest: standalone websites
        start around <strong>$1,500</strong> (common tiers run{" "}
        <strong>$2,500 / $4,500 / $7,500+</strong>), logos run{" "}
        <strong>$750 / $1,500 / $2,500</strong>, and the{" "}
        <strong>
          $997{" "}
          <InternalLink href="/startup-special">Startup Special</InternalLink>
        </strong>{" "}
        bundles a logo, brand kit, cards, flyers, and a 1-page site if
        you&apos;re just getting off the ground.
      </p>
      <p>
        Want to see where your site actually stands before spending a dollar?
        Grab a{" "}
        <InternalLink href="/free-site-audit">free site audit</InternalLink>{" "}
        and we&apos;ll tell you straight — including which parts AI could help
        you with yourself.
      </p>

      <h2 id="how-we-use-ai">
        How we actually use AI for SEO at Branding Zombie Designs
      </h2>
      <p>
        For the record, we&apos;re not anti-AI. We&apos;re anti-shortcut.
      </p>
      <p>
        A normal workflow looks like this: AI helps brainstorm keywords, drafts
        an outline, and scaffolds the schema. Then a human writes the real
        content with Cumming-specific detail, verifies every fact, builds the
        page properly, fixes the technical issues, and does the Google Business
        Profile and citation work by hand.
      </p>
      <p>
        The AI saved us time on the parts that are safe to speed up. The human
        did the parts that actually rank. That&apos;s the whole trick — and
        it&apos;s also why AI search itself is starting to{" "}
        <InternalLink href="/blog/google-ai-is-calling-your-business">
          call your business directly
        </InternalLink>
        , which makes getting your real information right more important, not
        less.
      </p>
      <p>
        If you&apos;re weighing this decision for a Cumming small business, the
        short answer is: let AI assist, keep a human on strategy and local
        execution, and never publish anything you haven&apos;t checked.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Ready to Outrank the Copy-Paste Crowd?
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          AI can fake the first draft. It can&apos;t claw into the Cumming map
          pack.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          That takes a human with a shovel — real Google Business Profile work,
          citations, links, and content written for your customers. Let&apos;s
          build something that actually ranks.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-do-seo">Can ChatGPT do SEO for my website?</h3>
      <p>
        Partly. ChatGPT can help with keyword ideas, draft content, meta tags,
        and schema scaffolding. It cannot manage your Google Business Profile,
        build local citations or links, do live competitor research, or fix
        technical issues — the work that actually moves you up Google.
      </p>

      <h3 id="faq-ai-content-bad">Is AI-written content bad for SEO?</h3>
      <p>
        Not automatically. Google judges quality and helpfulness, not who typed
        it. Raw, generic AI content with made-up facts gets buried. AI drafts
        that a human edits with real local detail, accurate sources, and a point
        of view can rank well.
      </p>

      <h3 id="faq-rank-on-google">Will AI-generated content rank on Google?</h3>
      <p>
        It can, if it&apos;s genuinely helpful, accurate, and specific. Published
        raw, AI content usually reads the same as everyone else&apos;s and ranks
        poorly. Edited, fact-checked, and localized to Cumming, GA, it competes
        fine.
      </p>

      <h3 id="faq-local-seo">Can ChatGPT do local SEO?</h3>
      <p>
        No, not the parts that matter. Local SEO lives in your Google Business
        Profile, reviews, local citations, and links — real-world tasks ChatGPT
        cannot perform. It can write a review response or a citation listing, but
        it can&apos;t submit or manage them.
      </p>

      <h3 id="faq-use-or-hire">Should I use ChatGPT or hire an SEO?</h3>
      <p>
        Use both. Use ChatGPT to speed up drafting and brainstorming. Hire a
        human for strategy, local execution, technical fixes, and competitive
        markets. If you want to rank in Cumming, GA, the local execution is the
        part you can&apos;t automate away.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, solo owner of Branding Zombie Designs.
        Based in Cumming, GA, building logos, websites, shirts, and signs all
        under one roof for small businesses across Forsyth County and North
        Metro Atlanta since 2015 — using AI as a tool, not a crutch.
      </p>
    </>
  );
}

function HowToPickWebDesignCompanyContent() {
  return (
    <>
      <p>
        <strong>
          To pick a web design company in Cumming, GA, ask 10 questions before
          you pay a dime:
        </strong>{" "}
        do I own the finished site and domain, what&apos;s the real total cost
        including hosting, is it fast and mobile-friendly, is local SEO
        included, who writes the copy, what&apos;s the timeline, how many
        revisions, what happens after launch, can I see local references, and is
        it a template or a custom build. We&apos;re Branding Zombie Designs, a
        graphic + web design studio in Cumming, GA, and below is the honest
        answer you want to hear for each one. Save yourself the regret of hiring
        the wrong web designer near you.
      </p>

      <p>
        A website is one of the few purchases where you can hand over thousands
        of dollars and walk away owning nothing. Most first-time small business
        owners don&apos;t know which questions protect them. These ten do.
      </p>

      <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-7">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-neon-text)]">
          TL;DR — The Short Version
        </p>
        <ul className="mt-4 space-y-2.5 text-[length:var(--text-body)] leading-relaxed text-text-primary">
          <li>
            <strong>Ask 10 questions before you pay</strong> — ownership, real
            total cost, mobile speed, local SEO, copy, timeline, revisions,
            post-launch support, references, and template vs. custom.
          </li>
          <li>
            <strong>Ownership is the question that saves people.</strong> If you
            don&apos;t own the domain and files in writing, you have a rental,
            not a website.
          </li>
          <li>
            <strong>Get the all-in number</strong> — design, hosting, domain,
            and any monthly fees. Our standalone web design starts around
            $1,500, with tiers at $2,500 / $4,500 / $7,500+.
          </li>
          <li>
            <strong>Clarity beats the cheapest quote.</strong> The lowest price
            often hides the most expensive surprises.
          </li>
          <li>
            <strong>One shop, one invoice.</strong> Logo, website, shirts, and
            signs from one designer means your brand matches everywhere.
          </li>
        </ul>
      </aside>

      <h2 id="choose-without-getting-burned">
        How Do I Choose a Web Design Company Without Getting Burned?
      </h2>
      <p>
        Choosing a web design company comes down to one thing: getting clear,
        written answers before money changes hands. A good shop answers fast and
        in plain English. A bad one dodges, upsells, or hides the cost.
      </p>
      <p>
        Use the questions below as a checklist. Ask them by phone, by email, or
        in person — the answers tell you everything. If a &quot;web design
        company Cumming GA&quot; search turned up a name and you&apos;re not sure
        about them, run them through this list first.
      </p>

      <h3 id="q1-ownership">
        1. Do I Own the Website and the Domain When It&apos;s Done?
      </h3>
      <p>
        This is the question that saves people. You should fully own your domain
        name, your website files, and your content the moment the project is
        paid for. No exceptions.
      </p>
      <p>
        <strong>The answer you want:</strong> &quot;Yes — the domain is
        registered in your name, and the site is yours.&quot; Watch out for
        shops that register the domain under <em>their</em> account, build on a
        locked proprietary platform, or hold your site hostage if you ever
        leave. The short version is: if you don&apos;t own it, you don&apos;t
        have a website, you have a rental. We dig into what that costs you in{" "}
        <InternalLink href="/blog/how-your-website-is-costing-you-customers">
          how your website is costing you customers
        </InternalLink>
        .
      </p>

      <h3 id="q2-real-cost">
        2. What&apos;s the Real Total Cost — Including Hosting?
      </h3>
      <p>
        The build price is rarely the whole price. Ask for the all-in number:
        design, hosting, domain, plugins, and any monthly fees.
      </p>
      <p>
        <strong>The answer you want:</strong> a clear breakdown. At Branding
        Zombie Designs, standalone web design starts around <strong>$1,500</strong>,
        with common tiers at <strong>$2,500 / $4,500 / $7,500+</strong>{" "}
        depending on pages and features. Our <strong>$997</strong>{" "}
        <InternalLink href="/startup-special">Startup Special</InternalLink>{" "}
        even bundles a 1-page site <em>with</em> a domain and a full year of
        hosting so there&apos;s no surprise bill. For a full cost breakdown, see{" "}
        <InternalLink href="/blog/website-design-seo-cost">
          website design + SEO cost
        </InternalLink>{" "}
        and our{" "}
        <InternalLink href="/blog/website-cost-cumming-ga-2026">
          website cost in Cumming, GA for 2026
        </InternalLink>
        .
      </p>

      <h3 id="q3-mobile-speed">3. Is the Site Fast and Built for Mobile?</h3>
      <p>
        Most of your visitors are on a phone. If your site loads slow or looks
        broken on mobile, you lose customers before they read a word.
      </p>
      <p>
        <strong>The answer you want:</strong> &quot;We build mobile-first and
        test page speed before launch.&quot; Ask to see one of their live sites
        on your own phone. If it stutters, scrolls weird, or the buttons are
        tiny — that&apos;s what yours will look like too.
      </p>

      <h3 id="q4-local-seo">4. Is Local SEO Included, or Is It Extra?</h3>
      <p>
        A beautiful site nobody finds is a billboard in the desert. You want to
        show up when someone searches &quot;web designer near me&quot; or your
        service plus &quot;Cumming, GA.&quot;
      </p>
      <p>
        <strong>The answer you want:</strong> at minimum, basic on-page SEO and
        a Google Business Profile setup should be baked in. Ongoing local SEO is
        a separate, optional service — ours runs <strong>$500–$1,500/mo</strong>{" "}
        depending on how aggressive you want to be (
        <InternalLink href="/services/digital-marketing">
          digital marketing
        </InternalLink>
        ). Just make sure you know which side of the line your designer puts it
        on. If you want the deeper picture, read our{" "}
        <InternalLink href="/blog/seo-cumming-ga">
          SEO in Cumming, GA guide
        </InternalLink>
        .
      </p>

      <h3 id="q5-copy">5. Who Writes the Copy?</h3>
      <p>
        Words sell. Pretty pictures don&apos;t. Find out whether you&apos;re
        expected to write every page yourself, or whether the designer helps
        shape the message.
      </p>
      <p>
        <strong>The answer you want:</strong> clarity. Some shops design around
        copy <em>you</em> provide; others (like us) help write or polish it.
        Neither is wrong — but &quot;we&apos;ll just drop in placeholder text and
        you fill it later&quot; usually means the site never actually launches.
        Get it in writing.
      </p>

      <h3 id="q6-timeline">6. How Long Should a Website Take?</h3>
      <p>
        Timelines tell you whether a shop is organized or overbooked. A small
        business site shouldn&apos;t take six months.
      </p>
      <p>
        <strong>The answer you want:</strong> a real date. A simple 1-page site
        can ship in days — our Startup Special lands in <strong>10 days</strong>.
        A full 5-page build like our <strong>$4,500</strong>{" "}
        <InternalLink href="/services/launch-package">Launch Package</InternalLink>{" "}
        runs about <strong>4 weeks</strong>. Bigger custom builds take longer,
        and that&apos;s fine — as long as someone gives you a schedule instead of
        a shrug.
      </p>

      <h3 id="q7-revisions">7. How Many Revisions Do I Get?</h3>
      <p>
        &quot;Revisions&quot; is where vague contracts go to die. You make a
        change, then get hit with an extra invoice you didn&apos;t see coming.
      </p>
      <p>
        <strong>The answer you want:</strong> a defined number of revision
        rounds spelled out up front, plus a clear hourly or flat rate for
        anything beyond that. Fair is fair — designers have to eat — but you
        deserve to know the rules before you start, not after.
      </p>

      <h3 id="q8-after-launch">
        8. What Happens After Launch — and Who Maintains It?
      </h3>
      <p>
        Launch day is the beginning, not the end. Software updates, security
        patches, broken links, and content tweaks are all part of owning a
        website.
      </p>
      <p>
        <strong>The answer you want:</strong> a clear plan. Either you&apos;re
        comfortable maintaining it yourself, or the shop offers a maintenance
        plan — ours starts around <strong>$100/mo</strong>. Avoid anyone who
        builds the site, disappears, and resurfaces only when something&apos;s
        already broken. An unmaintained site quietly rots; here&apos;s{" "}
        <InternalLink href="/blog/how-your-website-is-costing-you-customers">
          how your website is costing you customers
        </InternalLink>{" "}
        when that happens.
      </p>

      <h3 id="q9-portfolio">9. Can I See a Portfolio and Local References?</h3>
      <p>
        Anyone can claim they&apos;re great. A real portfolio and a couple of
        local references prove it.
      </p>
      <p>
        <strong>The answer you want:</strong> live links to recent work — not
        stock mockups — and the name of a nearby business you can actually call.
        A genuine &quot;web design company Cumming GA&quot; should have local
        examples: restaurants, trades, gyms, realtors, churches. Ask to see two
        or three live client sites and at least one local reference you can
        reach by phone.
      </p>

      <h3 id="q10-template-vs-custom">
        10. Is It a Template or a Custom Build — and Does It Matter?
      </h3>
      <p>
        Templates aren&apos;t evil. The lie is charging custom prices for a
        template anyone could buy for $49.
      </p>
      <p>
        <strong>The answer you want:</strong> honesty about what you&apos;re
        getting. A smart template, customized well, is perfect for a lean
        budget. A fully custom build makes sense when your needs are specific.
        The right answer depends on <em>your</em> goals — a good designer will
        tell you which fits instead of pushing the most expensive option.
        (Curious whether you could just DIY it? We tested whether{" "}
        <InternalLink href="/blog/can-chatgpt-build-a-website">
          ChatGPT can build a website
        </InternalLink>
        .)
      </p>

      <h2 id="why-questions-matter">
        Why These Questions Matter More Than the Price Tag
      </h2>
      <p>
        Notice that only a few of these are about money. That&apos;s on purpose.
        The cheapest quote often hides the most expensive surprises — borrowed
        domains, locked platforms, no SEO, no support.
      </p>
      <p>
        The one-shop advantage is real here too. When your logo, website,
        shirts, and signs come from one designer under one invoice, your brand
        actually matches everywhere — and you have one person to call.
        That&apos;s the wedge we lean into at Branding Zombie Designs. For the
        bigger picture on building a site here, see our{" "}
        <InternalLink href="/blog/web-design-cumming-ga-guide">
          web design in Cumming, GA guide
        </InternalLink>{" "}
        and our{" "}
        <InternalLink href="/services/web-design">web design service</InternalLink>
        .
      </p>
      <p>
        If you&apos;ve already got a designer in mind and just want a gut-check,
        we&apos;ll give you a free second opinion. Run your current or proposed
        site through our{" "}
        <InternalLink href="/free-site-audit">free site audit</InternalLink>{" "}
        and we&apos;ll flag the ownership, speed, and SEO landmines — no pitch
        required.
      </p>

      <aside className="my-12 rounded-2xl bg-[var(--color-grave)] p-10 text-[var(--color-dark-text-primary)]">
        <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
          Vet Your Shortlist — or Skip It
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1] tracking-tight">
          One designer, one invoice, zero surprise bills.
        </h3>
        <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
          Bring your top candidate — or your half-dead current site — and
          we&apos;ll run a brutally honest, free second opinion before you sign
          anything. No pitch required.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
          >
            Book a free consult
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

      <h3 id="faq-choose">How do I choose a web design company?</h3>
      <p>
        Choose by clarity, not by price. Confirm in writing that you&apos;ll own
        the site and domain, get the all-in cost including hosting, check that
        it&apos;s mobile-fast, ask whether local SEO is included, and request
        live local references. The shop that answers plainly is usually the
        right one.
      </p>

      <h3 id="faq-cost">How much should a website cost?</h3>
      <p>
        For a small business in Cumming, GA, expect standalone web design to
        start around $1,500, with common tiers at $2,500, $4,500, and $7,500+
        depending on pages and features. A 1-page launch site with hosting can
        run as low as $997. Always confirm the total includes hosting and
        domain.
      </p>

      <h3 id="faq-ownership">Do I own my website after it&apos;s built?</h3>
      <p>
        You should. With a reputable designer, you own your domain, your files,
        and your content once the project is paid in full. If a company
        registers the domain under their own account or locks you into a
        proprietary platform you can&apos;t export, you don&apos;t truly own your
        site — confirm ownership in writing first.
      </p>

      <h3 id="faq-timeline">How long should a website take?</h3>
      <p>
        A simple 1-page site can launch in about 10 days. A full 5-page small
        business site typically takes around 4 weeks. Larger custom builds take
        longer, and that&apos;s normal — what matters is getting a real schedule
        with milestones, not a vague &quot;soon.&quot;
      </p>

      <h3 id="faq-questions">What questions should I ask a web designer?</h3>
      <p>
        Ask about ownership, total cost including hosting, mobile speed, whether
        local SEO is included, who writes the copy, timeline, revision rounds,
        post-launch maintenance, portfolio with local references, and template
        versus custom. The ten questions in this article cover all of it.
      </p>

      <hr className="my-14 border-[var(--color-hairline-strong)]" />

      <p className="text-[length:var(--text-secondary)] italic text-text-secondary">
        Written by Gerry Betancourt, solo owner of Branding Zombie Designs. Based
        in Cumming, GA. Bilingual (English/Spanish), building logos, websites,
        signage, and apparel for small businesses across Forsyth County and North
        Metro Atlanta since 2015.
      </p>
    </>
  );
}

// ─── POSTS registry ───────────────────────────────────────────────────────

export const POSTS: Post[] = [
  {
    meta: {
      slug: "logo-cost-cumming-ga",
      title:
        "How Much Does a Logo Cost in Cumming, GA? (2026 Real Price Ranges)",
      seoTitle:
        "How Much Does a Logo Cost in Cumming, GA? 2026 Prices | Branding Zombie Designs",
      seoDescription:
        "How much does a logo cost in Cumming, GA? Honest 2026 ranges ($750–$2,500), what you get at each tier, and what a cheap logo really costs you later.",
      excerpt:
        "How much does a logo cost in Cumming, GA? Honest 2026 price ranges ($750–$2,500), what you actually get at each tier, what a cheap logo costs you later, and logo vs. full brand identity.",
      keywords: [
        "how much does a logo cost",
        "logo cost Cumming GA",
        "logo design price",
        "professional logo design cost",
        "cheap logo vs professional",
        "logo vs brand identity",
        "logo designer Cumming GA",
        "Forsyth County logo design",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 7,
      category: "Logo Design",
      tags: [
        "logo design",
        "logo cost",
        "branding",
        "Cumming GA",
        "Forsyth County",
        "small business branding",
        "pricing",
      ],
      ogImage: "/assets/og-logo-cost-cumming.png",
      ogImageAlt:
        "How much does a logo cost in Cumming, GA — 2026 price ranges — Branding Zombie Designs",
    },
    Content: LogoCostCummingGAContent,
  },
  {
    meta: {
      slug: "seo-cumming-ga",
      title:
        "Do You Need SEO in Cumming, GA? Cost & What Moves Rankings (2026)",
      seoTitle:
        "SEO Cumming, GA: Cost & What Moves Rankings 2026 | Branding Zombie Designs",
      seoDescription:
        "Local SEO in Cumming, GA runs $500–$1,500/mo. Here's what it is, whether your small business needs it, and what actually moves rankings in 2026.",
      excerpt:
        "An honest local guide to SEO in Cumming, GA: what it is, whether your small business needs it, what local SEO costs ($500–$1,500/mo), Google Business Profile, DIY vs hiring, timelines, and AI search.",
      keywords: [
        "seo cumming",
        "seo agency cumming",
        "seo services cumming",
        "local seo cumming",
        "seo company cumming",
        "how much does local SEO cost",
        "how long does SEO take to work",
        "is SEO dead with AI search",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "SEO",
      tags: [
        "SEO",
        "local SEO",
        "Google Business Profile",
        "Cumming GA",
        "Forsyth County",
        "digital marketing",
        "AEO",
        "GEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Do you need SEO in Cumming, GA — cost and what moves rankings in 2026 — Branding Zombie Designs",
    },
    Content: SeoCummingGaContent,
  },
  {
    meta: {
      slug: "web-design-cumming-ga-guide",
      title:
        "Web Design in Cumming, GA: What to Look For, What It Costs, and Who Owns It",
      seoTitle:
        "Web Design in Cumming, GA: Costs & What to Look For | Branding Zombie Designs",
      seoDescription:
        "Web design in Cumming, GA starts around $1,500. Here's what good local web design includes, real price tiers, who owns the site, and how to choose right.",
      excerpt:
        "Web design in Cumming, GA starts around $1,500. A local buyer's guide to what good web design includes, real price tiers, DIY vs. local, ownership, timelines, and red flags.",
      keywords: [
        "web design cumming ga",
        "website design cumming",
        "web designer cumming",
        "small business web design",
        "affordable web design services cumming",
        "branding and web design",
        "web design cost cumming",
        "do I own my website",
        "squarespace vs custom",
        "can AI build my website",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "Web Design",
      tags: [
        "web design",
        "website cost",
        "Cumming GA",
        "Forsyth County",
        "small business web design",
        "website ownership",
        "local SEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Web design in Cumming, GA — costs, what to look for, and who owns it — Branding Zombie Designs",
    },
    Content: WebDesignCummingGaContent,
  },
  {
    meta: {
      slug: "is-seo-dead-2026",
      title:
        "Is SEO Dead in 2026? No — But Now You Also Have to Win the AI Answer Box",
      seoTitle:
        "Is SEO Dead in 2026? No — Win the AI Answer Box | Branding Zombie Designs",
      seoDescription:
        "Is SEO dead or evolving in 2026? It evolved. Cumming, GA businesses still need ranking AND a spot in the AI answer box (AEO/GEO). Here's what works now.",
      excerpt:
        "Is SEO dead or evolving in 2026? It evolved. Traditional ranking still matters, but AI answer engines now sit on top — so Cumming, GA businesses need both classic SEO and AEO/GEO to get cited.",
      keywords: [
        "is SEO dead or evolving in 2026",
        "is SEO dead",
        "is SEO still worth it in 2026",
        "what is AEO GEO",
        "how to get cited by ChatGPT",
        "seo cumming",
        "local seo cumming",
        "small business web design",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "SEO",
      tags: [
        "SEO",
        "AEO",
        "GEO",
        "AI search",
        "local SEO",
        "Cumming GA",
        "Forsyth County",
        "small business",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Is SEO dead in 2026? No — win the AI answer box — Branding Zombie Designs",
    },
    Content: IsSeoDead2026Content,
  },
  {
    meta: {
      slug: "can-chatgpt-do-seo",
      title:
        "Can ChatGPT Do SEO? What AI Nails and What It Gets Dangerously Wrong",
      seoTitle:
        "Can ChatGPT Do SEO? An Honest Take | Branding Zombie Designs",
      seoDescription:
        "Can ChatGPT do SEO? Yes for drafts and keyword ideas, no for local ranking, links, and Google Business Profile work. An honest verdict from a Cumming, GA designer.",
      excerpt:
        "Can ChatGPT do SEO? Partly. AI nails keyword ideas, drafts, meta tags, and schema — but it can't manage Google Business Profile, build links, fix technical issues, or rank you locally. An honest take from a Cumming, GA designer.",
      keywords: [
        "can ChatGPT do SEO",
        "is AI-written content bad for SEO",
        "will AI-generated content rank on Google",
        "can ChatGPT do local SEO",
        "should I use ChatGPT or hire an SEO",
        "AI SEO",
        "seo Cumming GA",
        "local seo Cumming",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "AI Workflows",
      tags: [
        "AI",
        "ChatGPT",
        "SEO",
        "local SEO",
        "content marketing",
        "Cumming GA",
        "Forsyth County",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Can ChatGPT do SEO? What AI nails and what it gets wrong — Branding Zombie Designs",
    },
    Content: CanChatgptDoSeoContent,
  },
  {
    meta: {
      slug: "how-to-pick-a-web-design-company",
      title:
        "How to Pick a Web Design Company in Cumming, GA: 10 Questions to Ask First",
      seoTitle:
        "How to Pick a Web Design Company in Cumming, GA | Branding Zombie Designs",
      seoDescription:
        "How to pick a web design company in Cumming, GA: 10 questions to ask before you pay. Do you own the site? Real total cost? Local SEO included? Get the answers.",
      excerpt:
        "How to pick a web design company in Cumming, GA — a 10-question checklist covering ownership, real total cost, mobile speed, local SEO, copy, timeline, revisions, maintenance, references, and template vs. custom.",
      keywords: [
        "how to pick a web design company",
        "web design company Cumming GA",
        "web designer near me",
        "web design Cumming GA",
        "small business web design",
        "questions to ask a web designer",
        "do I own my website",
        "how much should a website cost",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "Web Design",
      tags: [
        "web design",
        "choosing a web designer",
        "Cumming GA",
        "Forsyth County",
        "small business web design",
        "website ownership",
        "local SEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "How to pick a web design company in Cumming, GA — 10 questions to ask first — Branding Zombie Designs",
    },
    Content: HowToPickWebDesignCompanyContent,
  },
  {
    meta: {
      slug: "forsyth-county-business-license-brand-checklist",
      title:
        "Just Got Your Forsyth County Business License? Your First 30-Day Brand Checklist",
      seoTitle:
        "Forsyth County Business License? 30-Day Brand Plan | Branding Zombie Designs",
      seoDescription:
        "Just got your Forsyth County business license? Here's a practical 30-day brand checklist for new Cumming, GA owners — logo, website, signs, and apparel.",
      excerpt:
        "Just got your Forsyth County business license? A week-by-week 30-day brand checklist for new Cumming, GA owners — logo first, then website, signage, and apparel.",
      keywords: [
        "forsyth county business license",
        "business license cost Forsyth County GA",
        "business license Cumming GA",
        "logo or website first",
        "cost to brand a new business",
        "run a business from home Forsyth County",
        "new business Cumming GA",
        "brand checklist",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 7,
      category: "Branding",
      tags: [
        "branding",
        "new business",
        "business license",
        "Cumming GA",
        "Forsyth County",
        "small business branding",
        "startup checklist",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "30-day brand checklist for a new Forsyth County business — Branding Zombie Designs",
    },
    Content: ForsythLicenseChecklistContent,
  },
  {
    meta: {
      slug: "can-chatgpt-build-a-website",
      title: "Can ChatGPT Build Me a Website? I Tested It on a Real Cumming Business",
      seoTitle:
        "Can ChatGPT Build Me a Website? I Tested It | Branding Zombie Designs",
      seoDescription:
        "Can ChatGPT build me a website? A Cumming, GA designer tested it on a real Forsyth County business. Here's what it nailed, where it fell apart, and why a human ships it.",
      excerpt:
        "Can ChatGPT build me a website? A working Cumming, GA designer tested it on a real Forsyth County business — what the AI nailed, where it fell apart, and why a human still has to ship it.",
      keywords: [
        "can ChatGPT build me a website",
        "can ChatGPT actually create a website",
        "is it worth paying for a website designer",
        "will AI replace web designers",
        "can ChatGPT do SEO",
        "web designer Cumming GA",
        "AI website builder",
        "Forsyth County web design",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "Web Design",
      tags: [
        "web design",
        "AI",
        "ChatGPT",
        "Cumming GA",
        "Forsyth County",
        "small business web design",
        "local SEO",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Can ChatGPT build me a website? A Cumming, GA designer tested it — Branding Zombie Designs",
    },
    Content: ChatGptWebsiteContent,
  },
  {
    meta: {
      slug: "website-design-seo-cost",
      title:
        "How Much Does Website Design and SEO Cost for a Small Business? (2026)",
      seoTitle:
        "How Much Does Website Design and SEO Cost? (2026) | Branding Zombie Designs",
      seoDescription:
        "How much does website design and SEO cost in Cumming, GA? Honest 2026 ranges — sites $2,500–$7,500+, SEO $500–$1,500/mo — what drives the bill, and red flags.",
      excerpt:
        "How much does website design and SEO cost in Cumming, GA? Honest 2026 ranges — custom sites $2,500–$7,500+, ongoing SEO $500–$1,500/mo — what drives the price, DIY vs. local, and the red flags to avoid.",
      keywords: [
        "how much does website design and SEO cost",
        "how much does it cost to do SEO for a website",
        "is it worth paying someone for SEO",
        "average cost of website design",
        "website design cost Cumming GA",
        "web design Cumming GA",
        "small business web design",
        "local SEO Cumming",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "Web Design",
      tags: [
        "web design",
        "SEO",
        "website cost",
        "pricing",
        "Cumming GA",
        "Forsyth County",
        "small business web design",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "How much does website design and SEO cost in Cumming, GA — 2026 price ranges — Branding Zombie Designs",
    },
    Content: WebsiteDesignSeoCostContent,
  },
  {
    meta: {
      slug: "how-to-advertise-small-business-cumming-georgia",
      title:
        "How to Advertise a Small Business in Cumming, Georgia (2026 Guide)",
      seoTitle:
        "How to Advertise a Small Business in Cumming, GA (2026) | Branding Zombie Designs",
      seoDescription:
        "Advertise a small business in Cumming, GA: start with a free Google Business Profile, add a fast website, signage, apparel, social, print, and reviews. 2026 playbook.",
      excerpt:
        "How to advertise a small business in Cumming, GA: start with a free Google Business Profile, back it with a fast website, then add signage, branded apparel, social, targeted print, and reviews. A 2026 local playbook.",
      keywords: [
        "how to advertise a small business in Cumming Georgia",
        "cheapest way to advertise a small business",
        "how to get your business to show up on Google in Cumming GA",
        "how much should a small business spend on marketing",
        "effective marketing strategies for startups in Cumming Georgia",
        "how to improve online visibility for a Cumming GA business",
        "local SEO Cumming",
        "small business advertising Forsyth County",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 9,
      category: "Marketing",
      tags: [
        "advertising",
        "local marketing",
        "local SEO",
        "Google Business Profile",
        "Cumming GA",
        "Forsyth County",
        "small business marketing",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "How to advertise a small business in Cumming, GA — 2026 local playbook — Branding Zombie Designs",
    },
    Content: AdvertiseCummingContent,
  },
  {
    meta: {
      slug: "branding-checklist-hvac-trades",
      title:
        "The Complete Branding Checklist for HVAC & Trades Businesses (Logo to Truck to Job Site)",
      seoTitle:
        "Branding Checklist for HVAC & Trades in Cumming, GA (Logo to Truck) | Branding Zombie Designs",
      seoDescription:
        "The complete branding checklist for HVAC & trades in Cumming, GA — logo, truck lettering, yard signs, crew shirts, and a website that ranks. One designer, one invoice.",
      excerpt:
        "The branding HVAC & trades businesses in Cumming, GA actually need, in order: a contractor logo, truck lettering, yard signs, crew shirts, cards, and a website that ranks — all from one designer on one invoice.",
      keywords: [
        "logo for contractor",
        "hvac website design",
        "truck lettering near me",
        "yard signs Cumming",
        "magnetic door signs",
        "work shirts for crew",
        "branding for trades business",
        "contractor branding Cumming GA",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "Branding",
      tags: [
        "branding",
        "trades",
        "HVAC",
        "signage",
        "truck lettering",
        "yard signs",
        "Cumming GA",
        "Forsyth County",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Branding checklist for HVAC & trades in Cumming, GA — logo to truck to job site — Branding Zombie Designs",
    },
    Content: HvacTradesBrandingContent,
  },
  {
    meta: {
      slug: "will-ai-replace-graphic-designers",
      title:
        "Will AI Replace Graphic Designers? An Honest Answer from a Cumming, GA Designer",
      seoTitle:
        "Will AI Replace Graphic Designers? A Cumming, GA Take | Branding Zombie Designs",
      seoDescription:
        "Will AI replace graphic designers? Honest answer from a Cumming, GA designer: no, but it's changing the job fast. What AI can't do, and what it means for you.",
      excerpt:
        "Will AI replace graphic designers? An honest answer from a Cumming, GA designer: no, but it's changing the job fast. What AI does well, what it can't do, AI vs. hiring a designer, and why a real local brand matters more in the AI era.",
      keywords: [
        "will AI replace graphic designers",
        "can AI design a logo",
        "AI logo generator",
        "is graphic design a good career in 2026",
        "should I use AI or hire a designer",
        "can AI replace web designers",
        "what can AI not do in design",
        "graphic design Cumming GA",
        "web design Cumming GA",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-06-10",
      readingTimeMinutes: 8,
      category: "AI Workflows",
      tags: [
        "AI",
        "graphic design",
        "logo design",
        "web design",
        "Cumming GA",
        "Forsyth County",
        "small business branding",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Will AI replace graphic designers? An honest answer from a Cumming, GA designer — Branding Zombie Designs",
    },
    Content: WillAiReplaceDesignersContent,
  },
  {
    meta: {
      slug: "website-cost-cumming-ga-2026",
      title:
        "How Much Does a Small-Business Website Actually Cost in Cumming, GA? (2026 Pricing Guide)",
      seoTitle:
        "Small Business Website Cost in Cumming, GA — 2026 Pricing Guide | Branding Zombie Designs",
      seoDescription:
        "What a real small-business website costs in Cumming, Forsyth, and Dawsonville in 2026. Going rates, hidden fees, our flat tiers (Landing $1,500 / Starter $2,500 / Growth $4,500 / Premium $7,500+), and custom quotes.",
      excerpt:
        "What a small-business website actually costs in Cumming, Forsyth County, and Dawsonville in 2026 — going rates, the 5 real pricing buckets, hidden fees, and where our Landing / Starter / Growth / Premium tiers (from $1,500) fit. Custom quotes welcome.",
      keywords: [
        "small business website cost Cumming GA",
        "website pricing Forsyth County",
        "web design cost Dawsonville",
        "how much does a website cost",
        "website cost 2026",
        "small business web design pricing",
        "Cumming web designer pricing",
        "North Metro Atlanta web design cost",
        "custom website quote Cumming",
        "Launch Package pricing",
      ],
      author: "Gerry Betancourt",
      datePublished: "2026-05-08",
      readingTimeMinutes: 10,
      category: "Web Design",
      tags: [
        "website cost",
        "web design pricing",
        "small business websites",
        "Cumming GA",
        "Forsyth County",
        "Dawsonville",
        "Launch Package",
        "Branding Zombie pricing",
      ],
      ogImage: "/assets/og-image.png",
      ogImageAlt:
        "Small business website cost in Cumming, GA — 2026 pricing guide — Branding Zombie Designs",
    },
    Content: WebsiteCostCummingGA2026Content,
  },
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
