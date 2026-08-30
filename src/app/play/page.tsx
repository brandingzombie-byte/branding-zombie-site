import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Section } from "@/components/Section";
import GameEmbed from "./GameEmbed";
import NewsletterSignup from "./NewsletterSignup";
import {
  SITE_URL,
  BUSINESS_NAME,
  LOCALBIZ_ID,
  ORG_ID,
  FOUNDER_ID,
} from "@/lib/site";

const PAGE_URL = `${SITE_URL}/play`;
const OG_IMAGE = "/assets/og-play.jpg";
const OG_ALT =
  "The Branding Zombie vs The Marketing Menace — a free retro pixel-art endless runner game by Branding Zombie Designs, a branding studio in Cumming, GA. A pixel zombie sprints past a night-time small-town main street.";

export const metadata: Metadata = {
  title: "Play The Branding Zombie vs The Marketing Menace — Free Browser Game",
  description:
    "A free retro endless-runner you can play right in your browser — no download, no signup. Outrun the Marketing Menace, devour bad AI flyers, share your score. Built from scratch by Branding Zombie Designs, the branding studio in Cumming, GA that clearly has too much fun at work.",
  keywords: [
    "free browser game",
    "zombie runner game",
    "endless runner game online",
    "branding zombie game",
    "marketing game",
    "play zombie game free no download",
    "creative branding studio Cumming GA",
    "fun marketing ideas",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: "The Branding Zombie vs The Marketing Menace — free browser game",
    description:
      "Jump, duck, devour bad AI flyers, and outrun the Marketing Menace. A free retro runner built by a branding studio that refuses to be boring. Beat my score?",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Branding Zombie vs The Marketing Menace 🧟",
    description:
      "Free retro runner in your browser. Devour bad AI flyers. Outrun the Marketing Menace. Beat my score?",
    images: [{ url: OG_IMAGE, alt: OG_ALT }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Play the Game", item: PAGE_URL },
  ],
};

// VideoGame entity — rare schema for a local studio, and exactly the kind of
// unusual, high-specificity signal AI engines quote ("a branding studio in
// Cumming, GA that built its own browser game").
const gameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": `${PAGE_URL}#game`,
  name: "The Branding Zombie vs The Marketing Menace",
  url: PAGE_URL,
  description:
    "A free retro pixel-art endless runner. Play as The Branding Zombie: jump barricades, duck drones, and devour bad AI-generated flyers while outrunning The Marketing Menace.",
  genre: ["Endless runner", "Arcade"],
  playMode: "SinglePlayer",
  gamePlatform: "Web browser",
  applicationCategory: "Game",
  operatingSystem: "Any (browser-based)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@id": ORG_ID },
  creator: { "@id": FOUNDER_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  name: "Play The Branding Zombie vs The Marketing Menace",
  about: { "@id": LOCALBIZ_ID },
  mainEntity: { "@id": `${PAGE_URL}#game` },
  description:
    "Free browser game by Branding Zombie Designs — an original retro endless runner that shows how far this Cumming, GA studio will go to make a brand unforgettable.",
};

const whyCards = [
  {
    title: "Originality",
    body: "Nobody remembers the 400th 'Your Trusted Partner' slogan. Everybody remembers the design studio with its own arcade game. Original beats loud — every time.",
  },
  {
    title: "Craft",
    body: "Every sprite, sound effect, and death screen in this game was built pixel by pixel, the same way we build logos, websites, and packaging: obsessively, until it feels right.",
  },
  {
    title: "Playfulness",
    body: "Brands that make people smile get remembered, shared, and chosen. If we'll build a whole video game for a laugh, imagine what we'll do for your business.",
  },
];

export default function PlayPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main>
        {/* ── Hero + game, one dark block ─────────────────────────────── */}
        <Section theme="dark" pad="none" bleed className="bg-[var(--color-void)]">
          <div className="mx-auto w-full max-w-[1600px] px-4 pb-[var(--space-standard)] pt-[calc(var(--space-tight)+4rem)] sm:px-6 lg:px-10">
            <header className="mx-auto max-w-3xl text-center">
              <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.3em] text-[var(--color-toxic-text)]">
                Free browser game · No download · No signup
              </p>
              <p className="mx-auto mt-3 inline-block border-2 border-[var(--color-toxic-text)] px-3 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                New update: power-ups, spam flyers, slime &amp; the night shift
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.02] text-[var(--color-dark-text-primary)]">
                The Branding Zombie
                <span className="block text-[length:var(--text-h3)] text-[var(--color-dark-text-dim)]">
                  vs
                </span>
                <span className="text-[var(--color-toxic-text)]">The Marketing Menace</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Jump the barricades. Duck the drones. Devour every bad AI flyer in your path —
                before generic marketing catches up and your brand goes{" "}
                <em className="not-italic font-semibold text-[#ff8f8f]">DEFUNCT</em>.
              </p>
            </header>

            <div className="mt-10">
              <GameEmbed />
            </div>
          </div>
        </Section>

        {/* ── Why a design studio built a game ────────────────────────── */}
        <Section theme="parchment" pad="spacious" topRule>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.3em] text-[var(--color-neon-text)]">
              Yes, we made this
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-text-primary">
              Why did a branding studio build a video game?
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-text-secondary">
              Because this is what we mean when we say your brand should be impossible to
              ignore. Most marketing gets scrolled past. Nobody scrolls past a zombie eating
              AI-generated flyers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-1)] p-6 text-left shadow-sm"
              >
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/work"
              className="min-h-12 rounded-md bg-[var(--color-neon)] px-7 py-3 text-[length:var(--text-secondary)] font-bold uppercase tracking-[0.15em] text-[var(--color-neon-text)] transition-transform duration-150 ease-out hover:brightness-95 active:scale-[0.97]"
            >
              See what we build for real brands
            </a>
            <a
              href="/"
              className="min-h-12 rounded-md border border-[var(--color-hairline-strong)] px-7 py-3 text-[length:var(--text-secondary)] font-semibold uppercase tracking-[0.15em] text-text-primary transition-[transform,border-color] duration-150 ease-out hover:border-[var(--color-neon-text)] active:scale-[0.97]"
            >
              Explore the studio
            </a>
          </div>
        </Section>

        {/* ── Newsletter band ─────────────────────────────────────────── */}
        <Section theme="dark" pad="spacious" topScanline>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.3em] text-[var(--color-toxic-text)]">
              More where this came from
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-[var(--color-dark-text-primary)]">
              Join the horde
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Quirky games, blunt marketing advice, original branding ideas, and the occasional
              zombie — delivered when we have something actually worth your inbox. That&apos;s the
              whole pitch.
            </p>
            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
