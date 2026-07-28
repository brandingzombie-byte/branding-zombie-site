import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  EnvelopeSimpleOpen,
  LinkSimple,
  MagnifyingGlass,
  PaintBrush,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const PAGE_PATH = "/authors";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Author Websites & Book Launch Design — Flat Prices, Done For You",
  description:
    "You wrote the book. I'll handle the rest — author websites, book launch graphics, and reader email lists, all flat-priced and built for you. Free 15-minute consult.",
  keywords: [
    "author website design",
    "website for authors",
    "book author website",
    "book launch graphics",
    "book marketing design",
    "author landing page",
    "sell my book online",
    "author website package",
    "book mockup design",
    "self published author website",
    "indie author marketing",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "You wrote the book. Now let's make sure readers find it.",
    description:
      "Flat-priced author websites, book launch art, and reader email lists — built for you, start to finish. No tech homework, ever.",
    siteName: "Branding Zombie Designs",
    images: [
      {
        url: `${SITE_URL}/assets/authors/hero-book-hand.jpg`,
        width: 1600,
        height: 893,
        alt: "A friendly zombie hand presenting a hardcover book in a green spotlight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You wrote the book. Now let's make sure readers find it.",
    description:
      "Flat-priced author websites, launch graphics, and reader email lists. Free 15-minute consult — no tech homework, ever.",
  },
};

// ─── Schema.org ────────────────────────────────────────────────────────────
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Author Websites & Book Launch Design",
  serviceType: "Author website and book marketing design",
  description:
    "Done-for-you author websites, book launch marketing graphics, and reader email list setup for authors and indie publishers: one-page Author Page sites, multi-book Author Catalog sites, the Book Launch Art Kit, and launch email sequences.",
  provider: { "@id": LOCALBIZ_ID },
  brand: { "@id": ORG_ID },
  url: PAGE_URL,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Author services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The Author Page",
        description:
          "One-page author website: book showcase, bio, reviews, reader email sign-up, and Buy buttons linked to wherever your book is sold. Domain and first year of hosting included.",
        price: "995",
        priceCurrency: "USD",
        url: PAGE_URL,
      },
      {
        "@type": "Offer",
        name: "The Author Catalog",
        description:
          "Multi-book author website with a dedicated page for each book (up to 5 included), news and events page, and buy links to every retailer that carries you.",
        price: "1795",
        priceCurrency: "USD",
        url: PAGE_URL,
      },
      {
        "@type": "Offer",
        name: "Book Launch Art Kit",
        description:
          "3D book mockups, ten social launch graphics, a retailer banner graphic, and print-ready bookmark and postcard designs — everything a launch needs to look professional.",
        price: "595",
        priceCurrency: "USD",
        url: PAGE_URL,
      },
      {
        "@type": "Offer",
        name: "Reader List & Launch Emails",
        description:
          "Reader email capture set up on your site plus a five-email launch sequence, written and ready to send.",
        price: "495",
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
    { "@type": "ListItem", position: 2, name: "For Authors", item: PAGE_URL },
  ],
};

// ─── Content ───────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    Icon: MagnifyingGlass,
    name: "Readers Google you.",
    body: "When someone hears about your book — in a Facebook group, on a podcast, at book club — the first thing they do is search your name. Your website makes sure they find your book, not a dead end.",
  },
  {
    Icon: LinkSimple,
    name: "Better than a link-in-bio.",
    body: "Your email signature, your social profiles, a QR code at your signing table — everything about you and your books lives at one easy address you actually own.",
  },
  {
    Icon: PaintBrush,
    name: "Look as good as you write.",
    body: "Blurry cover photos and DIY graphics quietly tell readers “amateur.” Professional mockups and launch art tell them your book is worth their money.",
  },
  {
    Icon: EnvelopeSimpleOpen,
    name: "Own your reader list.",
    body: "Social followers belong to the platform. A simple sign-up box quietly collects reader emails — so your next launch is announced to fans, not to an algorithm.",
  },
];

const PACKAGES = [
  {
    id: "author-page",
    forWho: "For the one-book author",
    name: "The Author Page",
    price: "$995",
    priceNote: "one-time",
    image: "/assets/authors/author-page-example.jpg",
    imageAlt:
      "Example one-page author website on a laptop: book cover, author bio, and a bright Buy the Book button",
    cta: "Start with the Author Page",
    bullets: [
      "One beautiful page: your book, your story, your reviews",
      "“Buy the Book” buttons linked to wherever your book is sold — Amazon, your publisher, anywhere",
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
    price: "$1,795",
    priceNote: "one-time",
    badge: "Most popular",
    image: "/assets/authors/author-catalog-example.jpg",
    imageAlt:
      "Example multi-book author website on a laptop: a shelf of five book covers, each with a View Book button",
    cta: "Start with the Author Catalog",
    bullets: [
      "Everything in The Author Page, plus:",
      "A dedicated page for each book — up to 5 included",
      "Every book linked to every retailer that carries it",
      "Books organized by series or genre",
      "News & events page for signings and launches",
      "Wrote another book? A new page is $95, added within a week",
    ],
  },
  {
    id: "art-kit",
    forWho: "For the launch that has to land",
    name: "Book Launch Art Kit",
    price: "$595",
    priceNote: "one-time · $495 with any website package",
    image: "/assets/authors/art-kit-example.jpg",
    imageAlt:
      "Flat-lay of book launch marketing materials: 3D book mockup, social announcement graphics, quote cards, bookmarks, and postcards",
    cta: "Add the Art Kit",
    bullets: [
      "3D mockups of your book — hardcover, paperback, and e-reader",
      "10 social launch graphics: announcement, countdown, quote cards, review cards",
      "A wide banner graphic for your retailer page and social headers",
      "Print-ready bookmark and postcard designs for signings",
      "Sized for Facebook, Instagram, and everywhere readers scroll",
      "Want them printed? Flat quote through my in-house print pipeline",
    ],
  },
];

const EMAIL_ADDON = {
  name: "Reader List & Launch Emails",
  price: "$495",
  bullets: [
    "Reader email capture set up on your website — the list is yours, forever",
    "A 5-email launch sequence, written for you and ready to send",
    "Covers the announcement, the launch, and the “tell a friend” follow-up",
  ],
};

const STEPS = [
  {
    name: "Tell me about your book.",
    body: "One friendly 15-minute call — your book, your goals, which pieces fit. No tech talk, no pressure, and you'll know the exact flat price before we hang up.",
  },
  {
    name: "I build while you write.",
    body: "Domain, hosting, design, words, graphics — handled. You approve everything by phone or email. There is no software to learn, today or later.",
  },
  {
    name: "Launch to readers, not silence.",
    body: "In about two weeks you get a finished website, launch-ready graphics, and an email you can proudly send to everyone you know.",
  },
];

const FAQS = [
  {
    q: "I'm not tech-savvy. Is that a problem?",
    a: "It's the whole point. You never touch the technology — I register the domain, build the site, and keep it running. When something needs changing, you call or email me and it gets done.",
  },
  {
    q: "How do book sales work?",
    a: "Your site doesn't process payments. Every Buy button links to your book wherever it's sold — Amazon, Barnes & Noble, your publisher's store — so orders and shipping stay with the retailers readers already trust.",
  },
  {
    q: "Can you work with my existing cover?",
    a: "Absolutely — most authors come to me with a finished cover. The Art Kit turns it into 3D mockups, social graphics, and print pieces. If the cover itself needs work, ask me about it on the consult.",
  },
  {
    q: "Do you only do websites?",
    a: "No — that's why authors find me. Website, launch graphics, bookmarks and postcards, reader email list: one designer, one flat price for each piece, and everything matches.",
  },
  {
    q: "What does it cost after the first year?",
    a: "$100 a year, flat. That covers hosting, security, and small text updates. No monthly fees, no surprise invoices.",
  },
  {
    q: "Do I own my website and my files?",
    a: "Yes. The domain is registered in your name, and every graphic I make is delivered in full resolution for you to keep. If you ever leave, everything goes with you.",
  },
  {
    q: "I wrote another book — now what?",
    a: "Congratulations! A new book page is $95 and usually live within a week — and the Art Kit can dress the new release to match.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function AuthorsPage() {
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

      <Navbar />

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
            src="/assets/authors/hand-book.webp"
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
                  For authors &amp; indie publishers
                </span>
                <span aria-hidden className="h-px w-12 bg-[var(--color-toxic)]/40" />
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  Websites · launch art · reader lists
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.16] tracking-tight text-[var(--color-dark-text-primary)]">
                You wrote the book. Now let&rsquo;s make sure readers{" "}
                <span className="relative inline-block whitespace-nowrap">
                  find it.
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[6px] w-full bg-[var(--color-toxic)]"
                  />
                </span>
              </h1>

              <p className="measure-wide mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Hi — I&rsquo;m Gerry. I build author websites, book launch
                graphics, and reader email lists for writers who&rsquo;d rather
                be writing. Flat prices, everything done for you, and every
                Buy button pointing readers straight to your book.
              </p>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-[var(--color-dark-border-strong)] py-6">
                <HeroStat label="Author sites from" value="$995" />
                <HeroStat label="Launch Art Kit" value="$595" />
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

        {/* ─── WHY ─────────────────────────────────────────────────────── */}
        <Section theme="light" pad="spacious" id="why">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Publishing was the easy part
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
              You don&rsquo;t need to become a marketer. You need one easy
              place where readers can find you, art that makes your launch
              look professional, and a list you own — and I build all three.
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
                Three packages · flat prices
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Pick what your book needs. Skip what it doesn&rsquo;t.
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              Everything is 100% done-for-you, and the packages are built to
              stack — most launching authors pair the Author Catalog with the
              Art Kit. Not sure? That&rsquo;s what the free consult is for.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
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

        {/* ─── REAL CLIENT PROOF ──────────────────────────────────────── */}
        <Section theme="light" pad="spacious" id="proof" topRule>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Not a mockup
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                This is a real author site,{" "}
                <span className="relative inline-block">
                  live right now
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]" />
                </span>
                .
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              J. S. Torres came to me with a manuscript. He left with cover
              art, interior illustrations, and the website below — built the
              same way I&rsquo;d build yours.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/portfolio-jstorres.png"
                alt="J. S. Torres author website homepage showing the cover of The Bloodstone: The Leaf and the Tree of Old"
                width={1280}
                height={800}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-2xl border border-[var(--color-hairline-strong)] object-cover object-top shadow-soft"
              />
            </div>

            <div className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-text)]">
                J. S. Torres
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-text-primary">
                The Bloodstone: The Leaf and the Tree of Old
              </h3>
              <p className="mt-2 text-[length:var(--text-secondary)] text-text-dim">
                Debut epic-fantasy novel, Book One
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-hairline)] pt-6">
                {[
                  "A book showcase with a “Start Reading” first-chapter excerpt and a “Get the Book” button",
                  "About the author, a running Notes blog, and a Press page",
                  "Reader email sign-up building the list for Book Two",
                  "A school-visit and reading-assembly request flow for classroom bookings",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[length:var(--text-body)] leading-relaxed text-text-secondary"
                  >
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="mt-1 shrink-0 text-[var(--color-neon-text)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://joaquinstorres.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-[length:var(--text-body)] font-semibold text-text-primary hover:text-[var(--color-neon-text)]"
              >
                See the live site — joaquinstorres.com
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Section>

        {/* ─── READER LIST & LAUNCH EMAILS ────────────────────────────── */}
        <Section
          theme="dark"
          pad="spacious"
          id="launch-emails"
          className="relative isolate overflow-hidden"
        >
          {/* Count-three hand peeks in from the left edge (flipped so the
              sleeve enters off-screen) and drifts on scroll. */}
          <ZombieHand
            src="/assets/authors/hand-count-three.webp"
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
            <div className="lg:col-span-6">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                The add-on that pays for itself
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-[var(--color-dark-text-primary)]">
                Don&rsquo;t launch your next book to silence.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                The authors who sell books on launch day are the ones with a
                reader list. I set up the email capture, write the launch
                sequence, and hand you a list that&rsquo;s yours forever — no
                algorithm in the way.
              </p>
              <p className="mt-5 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-dim)]">
                Want a marketing partner past launch day? Ongoing author
                marketing starts at $499/mo — ask me on the consult.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-elevated)] p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-[var(--color-dark-text-primary)]">
                    {EMAIL_ADDON.name}
                  </h3>
                  <p className="flex items-baseline gap-2">
                    <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-toxic-text)]">
                      {EMAIL_ADDON.price}
                    </span>
                    <span className="text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
                      flat setup
                    </span>
                  </p>
                </div>
                <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-dark-border)] pt-6">
                  {EMAIL_ADDON.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]"
                    >
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className="mt-1 shrink-0 text-[var(--color-toxic-text)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#consult"
                  role="button"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                >
                  Add it to my consult
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── HOW IT WORKS ───────────────────────────────────────────── */}
        <Section theme="light" pad="spacious" id="how-it-works">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                How it works
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.14] tracking-tight text-text-primary">
                Three steps. Zero tech homework.
              </h2>
            </div>

            <ol className="flex flex-col gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] lg:col-span-8">
              {STEPS.map((t, i) => (
                <li key={t.name} className="flex gap-6 bg-[var(--color-cloud)] p-8">
                  <span
                    aria-hidden
                    className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-none text-[var(--color-neon-text)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight text-text-primary">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
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
            src="/assets/authors/hand-point-up.webp"
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
                <InfoRow label="What we cover" value="Your book, your goals, which pieces fit" />
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
                What authors ask first.
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
                For authors &amp; indie publishers
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

      <Footer />
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
