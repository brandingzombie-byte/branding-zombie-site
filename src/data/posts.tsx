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
        since 2019.
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
        Atlanta since 2019.
      </p>
    </>
  );
}

// ─── POSTS registry ───────────────────────────────────────────────────────

export const POSTS: Post[] = [
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
