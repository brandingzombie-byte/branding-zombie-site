import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  EnvelopeSimpleOpen,
  LinkSimple,
  MagnifyingGlass,
  Phone,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import Section from "@/components/Section";
import {
  SITE_URL,
  ORG_ID,
  LOCALBIZ_ID,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  CALENDLY_URL,
} from "@/lib/site";
import ConsultForm from "./ConsultForm";
import ZombieHand from "@/components/ZombieHand";

const PAGE_PATH = "/booklogix";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Author Websites for BookLogix Authors — Free 15-Minute Consult",
  description:
    "You wrote the book. I'll build the website. Simple, flat-priced author websites — every Buy button pointing to your book on the BookLogix bookstore. Tell me about your book and get a free 15-minute consult.",
  keywords: [
    "author website design",
    "website for authors",
    "book author website",
    "BookLogix author website",
    "author landing page",
    "sell my book online",
    "author website package",
    "one page author website",
    "multi book author website",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "You wrote the book. I'll build the website.",
    description:
      "Flat-priced author websites for BookLogix authors — built for you, start to finish, with every Buy button pointing to your book on the BookLogix bookstore.",
    siteName: "Branding Zombie Designs",
    images: [
      {
        url: `${SITE_URL}/assets/booklogix/hero-book-hand.jpg`,
        width: 1600,
        height: 893,
        alt: "A friendly zombie hand presenting a hardcover book in a green spotlight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You wrote the book. I'll build the website.",
    description:
      "Flat-priced author websites for BookLogix authors. Free 15-minute consult — no tech homework, ever.",
  },
};

// ─── Schema.org ────────────────────────────────────────────────────────────
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Author Website Design for BookLogix Authors",
  serviceType: "Author website design",
  description:
    "Done-for-you author websites for BookLogix authors: one-page Author Page sites and multi-book Author Catalog sites, with buy links to the BookLogix bookstore.",
  provider: { "@id": LOCALBIZ_ID },
  brand: { "@id": ORG_ID },
  url: PAGE_URL,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Author website packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The Author Page",
        description:
          "One-page author website: book showcase, bio, reviews, reader email sign-up, and a Buy button linked to the BookLogix bookstore. Domain and first year of hosting included.",
        price: "795",
        priceCurrency: "USD",
        url: PAGE_URL,
      },
      {
        "@type": "Offer",
        name: "The Author Catalog",
        description:
          "Multi-book author website with a dedicated page for each book (up to 5 included), news and events page, and buy links to the BookLogix bookstore.",
        price: "1495",
        priceCurrency: "USD",
        url: PAGE_URL,
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For BookLogix Authors", item: PAGE_URL },
  ],
};

// ─── Content ───────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    Icon: MagnifyingGlass,
    name: "Readers Google you.",
    body: "When someone hears about your book — at book club, on a podcast, at church — the first thing they do is search your name. Your website makes sure they find your book, not a dead end.",
  },
  {
    Icon: LinkSimple,
    name: "One link does it all.",
    body: "Your email signature, your social media, a QR code at your signing table. Everything about you and your book lives at one easy address.",
  },
  {
    Icon: Storefront,
    name: "Every button sells the book.",
    body: "Every “Buy the Book” button goes straight to your page on the BookLogix bookstore. You never touch inventory, shipping, or checkout technology.",
  },
  {
    Icon: EnvelopeSimpleOpen,
    name: "Book two launches to a crowd.",
    body: "A simple sign-up box quietly collects reader emails. When your next book is ready, you announce it to fans — not to silence.",
  },
];

const PACKAGES = [
  {
    id: "author-page",
    forWho: "For the one-book author",
    name: "The Author Page",
    price: "$795",
    priceNote: "one-time",
    image: "/assets/booklogix/author-page-example.jpg",
    imageAlt:
      "Example one-page author website on a laptop: book cover, author bio, and a bright Buy the Book button",
    cta: "Start with the Author Page",
    bullets: [
      "One beautiful page: your book, your story, your reviews",
      "“Buy the Book” button linked to your page on the BookLogix bookstore",
      "About-the-author section with your photo",
      "Reader email sign-up — your future launch list",
      "Your own web address (yourname.com), first year included",
      "Live in about 2 weeks — everything handled for you",
    ],
  },
  {
    id: "author-catalog",
    forWho: "For the multi-book author",
    name: "The Author Catalog",
    price: "$1,495",
    priceNote: "one-time",
    badge: "For growing catalogs",
    image: "/assets/booklogix/author-catalog-example.jpg",
    imageAlt:
      "Example multi-book author website on a laptop: a shelf of five book covers, each with a View Book button",
    cta: "Start with the Author Catalog",
    bullets: [
      "Everything in The Author Page, plus:",
      "A dedicated page for each book — up to 5 included",
      "Every book links to its page on the BookLogix bookstore",
      "Books organized by series or genre",
      "News & events page for signings and launches",
      "Wrote another book? A new page is $95, added within a week",
    ],
  },
];

const THREE_THINGS = [
  {
    name: "No tech homework, ever.",
    body: "One friendly phone call and I take it from there. You approve everything by phone or email — there is no software to learn, today or later.",
  },
  {
    name: "Flat price. Zero surprises.",
    body: "The price on this page is the price. After year one, site care is a flat $100/yr — hosting, security, and small updates, all included.",
  },
  {
    name: "Live in about two weeks.",
    body: "Domain, hosting, design, words — handled. You get a finished website and a launch-day email you can proudly send to everyone you know.",
  },
];

const FAQS = [
  {
    q: "I'm not tech-savvy. Is that a problem?",
    a: "It's the whole point. You never touch the technology — I register the domain, build the site, and keep it running. When something needs changing, you call or email me and it gets done.",
  },
  {
    q: "How do book sales work?",
    a: "Your site doesn't process payments. Every Buy button links to your book on the BookLogix bookstore, so orders, printing, and shipping stay with the team you already know.",
  },
  {
    q: "What does it cost after the first year?",
    a: "$100 a year, flat. That covers hosting, security, and small text updates. No monthly fees, no surprise invoices.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. The domain is registered in your name and you keep it. If you ever leave, everything goes with you.",
  },
  {
    q: "I wrote another book — now what?",
    a: "Congratulations! A new book page is $95 and usually live within a week, with its Buy button pointed at your BookLogix store page.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function BookLogixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Minimal header ────────────────────────────────────────────── */}
      <header
        data-theme="dark"
        className="sticky top-0 z-50 border-b border-[var(--color-dark-border)] bg-[var(--color-grave)]/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <a href="/" className="flex items-center gap-3" aria-label="Branding Zombie home">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-elevated)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Branding_Zombie_Logo_Icon.svg"
                alt=""
                className="h-7 w-7 object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-base tracking-wide text-[var(--color-dark-text-primary)]">
                BRANDING ZOMBIE
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--color-dark-text-dim)]">
                Designs · Cumming GA
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-dark-text-secondary)] hover:text-[var(--color-toxic-text)] sm:inline-flex"
            >
              <Phone size={16} weight="bold" />
              <span className="tabular">{PHONE_DISPLAY}</span>
            </a>
            <a
              href="#consult"
              role="button"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Free consult
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <Section
          theme="dark"
          pad="spacious"
          topScanline
          className="relative isolate overflow-hidden"
        >
          {/* Book-in-hand cutout — same motion engine as the homepage hands:
              peeks in from the right edge, drifts on scroll, leans toward the
              cursor, sways at idle. Toxic glow via static drop-shadows. */}
          <ZombieHand
            src="/assets/booklogix/hand-book.webp"
            width={720}
            height={585}
            edge="right"
            behaviors={["peek", "parallax", "follow", "idle"]}
            offset="16%"
            bleed="-36px"
            displayWidth={520}
            parallaxSpeed={0.1}
            zIndex={1}
            className="max-lg:hidden [filter:drop-shadow(0_0_26px_rgba(191,255,0,0.35))_drop-shadow(0_0_90px_rgba(191,255,0,0.2))]"
          />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.25em] text-[var(--color-toxic-text)]">
                  For BookLogix authors
                </span>
                <span aria-hidden className="h-px w-12 bg-[var(--color-toxic)]/40" />
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  Recommended by the BookLogix team
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.16] tracking-tight text-[var(--color-dark-text-primary)]">
                You wrote the book. I&rsquo;ll build the{" "}
                <span className="relative inline-block whitespace-nowrap">
                  website.
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[6px] w-full bg-[var(--color-toxic)]"
                  />
                </span>
              </h1>

              <p className="measure-wide mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Hi — I&rsquo;m Gerry. I build simple, beautiful author websites
                that send readers straight to your book on the BookLogix
                bookstore. You talk about your book; I handle every technical
                thing, forever.
              </p>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-[var(--color-dark-border-strong)] py-6">
                <HeroStat label="Author Page" value="$795" />
                <HeroStat label="Author Catalog" value="$1,495" />
                <HeroStat label="Live in" value="~2 weeks" />
                <HeroStat label="Tech homework" value="None" accent />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#consult"
                  role="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                >
                  Tell me about your book
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
                >
                  <Phone size={16} weight="bold" />
                  <span className="tabular">{PHONE_DISPLAY}</span>
                </a>
              </div>

              <p className="mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                BBB Accredited (A−) · 5.0 Google rating · 80+ projects delivered
              </p>
            </div>

            {/* Right columns left open at lg — the ZombieHand cutout lives there. */}
          </div>
        </Section>

        {/* ─── WHY A WEBSITE SELLS MORE BOOKS ─────────────────────────── */}
        <Section theme="light" pad="spacious" id="why">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Why bother with a website?
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Because readers who can&rsquo;t find you{" "}
                <span className="relative inline-block">
                  can&rsquo;t buy your book
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]" />
                </span>
                .
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              You don&rsquo;t need to be &ldquo;good with computers.&rdquo; You
              need one easy place where readers can find you — and I build it
              for you.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ Icon, name, body }) => (
              <article key={name} className="flex flex-col gap-5 bg-[var(--color-cloud)] p-8">
                <Icon size={28} weight="duotone" className="text-[var(--color-neon-text)]" />
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight text-text-primary">
                  {name}
                </h3>
                <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </Section>

        {/* ─── PACKAGES ───────────────────────────────────────────────── */}
        <Section theme="parchment" pad="spacious" id="packages" topRule>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Two packages · flat prices
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Pick the one that matches your shelf.
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              Both are 100% done-for-you. Not sure which fits? That&rsquo;s
              exactly what the free consult is for.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] shadow-soft"
              >
                {pkg.badge && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-[var(--color-toxic)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-grave)]">
                    {pkg.badge}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image}
                  alt={pkg.imageAlt}
                  width={1100}
                  height={825}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex grow flex-col gap-5 p-8">
                  <div>
                    <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
                      {pkg.forWho}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-text-primary">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 flex items-baseline gap-2">
                      <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-text-primary">
                        {pkg.price}
                      </span>
                      <span className="text-[length:var(--text-secondary)] text-text-dim">
                        {pkg.priceNote}
                      </span>
                    </p>
                  </div>

                  <ul className="flex grow flex-col gap-2.5 border-t border-[var(--color-hairline)] pt-5">
                    {pkg.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary"
                      >
                        <CheckCircle
                          size={14}
                          weight="fill"
                          className="mt-1 shrink-0 text-[var(--color-neon-text)]"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#consult"
                    role="button"
                    className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-text-primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-cloud)] hover:bg-[var(--color-neon-text)]"
                  >
                    {pkg.cta}
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[length:var(--text-secondary)] leading-relaxed text-text-dim">
            <strong className="text-text-secondary">
              No monthly platform fees. No surprise charges.
            </strong>{" "}
            After the first year, site care (hosting, security, and small
            updates) is a flat $100/yr — that&rsquo;s it.
          </p>
        </Section>

        {/* ─── THREE THINGS TO KNOW ───────────────────────────────────── */}
        <Section
          theme="dark"
          pad="spacious"
          id="three-things"
          className="relative isolate overflow-hidden"
        >
          {/* Count-three hand peeks in from the left edge (flipped so the
              sleeve enters off-screen) and drifts on scroll. */}
          <ZombieHand
            src="/assets/booklogix/hand-count-three.webp"
            width={720}
            height={208}
            edge="left"
            behaviors={["peek", "parallax", "idle"]}
            offset="64%"
            bleed="-30px"
            displayWidth={380}
            parallaxSpeed={0.12}
            flip
            zIndex={1}
            className="max-lg:hidden"
          />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                The fine print, out loud
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-[var(--color-dark-text-primary)]">
                Three things every author asks about.
              </h2>
            </div>

            <ol className="flex flex-col gap-px border border-[var(--color-dark-border)] bg-[var(--color-dark-border)] lg:col-span-8">
              {THREE_THINGS.map((t, i) => (
                <li key={t.name} className="flex gap-6 bg-[var(--color-grave)] p-8">
                  <span
                    aria-hidden
                    className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic-text)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight text-[var(--color-dark-text-primary)]">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                      {t.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ─── CONSULT FORM ───────────────────────────────────────────── */}
        <Section
          theme="parchment"
          pad="spacious"
          id="consult"
          topRule
          className="relative isolate overflow-hidden"
        >
          {/* Pointing hand rises from the section's bottom edge toward the
              form — mobile keeps it (scaled down) with scroll parallax. */}
          <ZombieHand
            src="/assets/booklogix/hand-point-up.webp"
            width={199}
            height={720}
            edge="bottom"
            behaviors={["peek", "parallax", "idle"]}
            offset="30%"
            bleed="-14px"
            displayWidth={120}
            parallaxSpeed={-0.08}
            mobile
            mobileParallax
            zIndex={1}
          />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Free 15-minute consult
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Tell me about your book.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Share as much or as little as you like — your name and the best
                way to reach you is plenty. I read every note personally and
                get back to you within one business day.
              </p>

              <dl className="mt-8 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-6">
                <InfoRow label="The consult" value="Free · 15 minutes · zero obligation" />
                <InfoRow label="What we cover" value="Your book, your goals, which package fits" />
                <InfoRow label="After that" value="You decide. No follow-up pressure." />
              </dl>

              <div className="mt-8 flex flex-col gap-2 text-[length:var(--text-secondary)] text-text-dim">
                <p className="font-semibold uppercase tracking-[0.18em] text-[length:var(--text-caption)]">
                  Rather talk than type?
                </p>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-text-primary hover:text-[var(--color-neon-text)]"
                >
                  <Phone size={16} weight="bold" />
                  <span className="tabular">Call or text {PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-text-primary hover:text-[var(--color-neon-text)]"
                >
                  {EMAIL}
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-primary hover:text-[var(--color-neon-text)]"
                >
                  <BookOpen size={16} weight="bold" />
                  Or book a time directly on my calendar
                </a>
              </div>

            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] p-8 shadow-soft lg:p-10">
                <ConsultForm />
              </div>
            </div>
          </div>
        </Section>

        {/* ─── FAQ ────────────────────────────────────────────────────── */}
        <Section theme="light" pad="spacious" id="faq">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Straight answers
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Five things authors ask first.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Don&rsquo;t see your question? Call or email — you&rsquo;ll get
                me, not a chatbot.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="flex flex-col divide-y divide-[var(--color-hairline)] border-t border-b border-[var(--color-hairline-strong)]">
                {FAQS.map((f) => (
                  <div key={f.q} className="grid grid-cols-1 gap-3 py-6 md:grid-cols-12">
                    <dt className="md:col-span-5 font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight tracking-tight text-text-primary">
                      {f.q}
                    </dt>
                    <dd className="md:col-span-7 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* ─── FINAL CTA ──────────────────────────────────────────────── */}
        <Section theme="dark" pad="spacious" topScanline>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                For BookLogix authors
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-[var(--color-dark-text-primary)]">
                Your book deserves more than a shelf.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Tell me about it — the consult is free, the prices are flat,
                and the tech homework is mine, not yours.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#consult"
                role="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
              >
                Tell me about your book
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
              >
                <Phone size={16} weight="bold" />
                <span className="tabular">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* ─── Minimal footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-surface-0)]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 px-6 py-8 text-[length:var(--text-caption)] text-text-dim sm:flex-row sm:items-center lg:px-10">
          <p className="tabular">
            © 2026 Branding Zombie Designs · Cumming, GA · Offered in
            partnership with the BookLogix team
          </p>
          <div className="flex items-center gap-5">
            <a href="/" className="hover:text-[var(--color-neon-text)]">Main site</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-[var(--color-neon-text)]">
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className="tabular hover:text-[var(--color-neon-text)]">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Small helpers ─────────────────────────────────────────────────────────
function HeroStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
        {label}
      </div>
      <div
        className={[
          "tabular mt-1.5 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.1]",
          accent ? "text-[var(--color-toxic-text)]" : "text-[var(--color-dark-text-primary)]",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="shrink-0 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
        {label}
      </dt>
      <dd className="text-right text-[length:var(--text-secondary)] text-text-primary">
        {value}
      </dd>
    </div>
  );
}
