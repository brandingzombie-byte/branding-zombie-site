import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import ContactHeroCtas from "@/components/contact/ContactHeroCtas";
import ContactForm from "./ContactForm";
import ContactOptions from "./ContactOptions";
import { BBB_PROFILE_URL, SITE_URL, BUSINESS_NAME, LOCALBIZ_ID } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: "Contact — Call, Email, or Book a Free Audit in Cumming, GA",
  description:
    "Talk to a real person in Cumming, GA. Call (770) 744-2536, email hello@brandingzombiedesigns.com, or book a free 15-minute audit. Serving Forsyth County & North Metro Atlanta.",
  keywords: [
    "contact Branding Zombie Designs",
    "web designer Cumming GA contact",
    "free website audit Cumming",
    "book design consultation Forsyth County",
    "call web designer North Atlanta",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Contact ${BUSINESS_NAME} — Cumming, GA`,
    description:
      "Call, email, or book a free 15-min call. Real small-business design and web work from right here in Cumming, Georgia.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `Contact ${BUSINESS_NAME} in Cumming, GA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${BUSINESS_NAME}`,
    description:
      "Call, email, or book a free 15-min call — from right here in Cumming, Georgia.",
    images: ["/assets/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: PAGE_URL,
  name: `Contact ${BUSINESS_NAME}`,
  about: { "@id": LOCALBIZ_ID },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <main id="main-content" tabIndex={-1}>
        <Section
          theme="dark"
          pad="tight"
          className="overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
            style={{
              background:
                "radial-gradient(60% 50% at 25% 35%, rgba(0,255,212,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(191,255,0,0.07), transparent 70%)",
            }}
          />
          {/* ── Beckoning-hand layer — ZH-22 "come here" curling in from the
               right edge toward the phone CTA. Decorative, pointer-events:none,
               overflow-clipped so the guillotined wrist never spills past the
               hero. Toxic glow treatment matches the authors-page hero hand. ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-clip"
          >
            <ZombieHand
              src={HANDS["zh22-beckon-r"].src}
              width={HANDS["zh22-beckon-r"].width}
              height={HANDS["zh22-beckon-r"].height}
              edge="right"
              behaviors={["peek", "follow", "idle"]}
              offset="18%"
              bleed="-40px"
              displayWidth={520}
              followStrength={40}
              zIndex={1}
              mobile
              mobileParallax
              className="[filter:drop-shadow(0_0_26px_rgba(191,255,0,0.35))_drop-shadow(0_0_90px_rgba(191,255,0,0.2))]"
            />
          </div>
          {/* Slim hero (CRO): phone + Calendly CTAs above the fold so the
              first screenful always has something tappable. Content sits on
              z-10 so the hand can never paint over the CTAs. */}
          <div className="relative z-10 pt-16 lg:pt-20">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                Contact · Cumming, GA
              </span>
            </div>
            <h1 className="mt-5 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[1.12] tracking-[-0.01em] text-[var(--color-dark-text-primary)]">
              Let&apos;s{" "}
              <span className="relative inline-block">
                talk
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
              .
            </h1>
            <p className="measure mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              No gatekeepers, no sales team. Call Gerry directly, drop an
              email, or book a free 15-minute audit — whichever feels less
              awkward.
            </p>
            <ContactHeroCtas />
          </div>
        </Section>

        {/* No torn separator here: the slim hero sits close to the contact
            options, and the separator's deep overhang painted over the eyebrow
            labels. The dark→light color change + topRule hairline is the
            transition. */}
        <Section theme="light" pad="standard" topRule>
          {/* Form first on mobile (mirrors /free-site-audit): the conversion
              action is reachable without scrolling past the options list.
              Options-left / form-right on desktop. */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            {/* LEFT — fast-contact options + trust signals */}
            <aside className="order-2 lg:order-1 lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Fastest paths in
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Pick your weapon.
              </h2>
              <div className="mt-8">
                <ContactOptions />
              </div>

              {/* One-line verified-review pull (full quotes live on the
                  homepage Testimonials; source: src/data/reviews.ts). */}
              <figure className="mt-8 border-l-2 border-[var(--color-neon)] pl-4">
                <blockquote className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  &ldquo;Def recommend for marketing, designs, branding,
                  websites, printing. He knows his stuff and his turnover time
                  is hella fast.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                  Mary Jeimz · 5.0 ★ Google review
                </figcaption>
              </figure>

              {/* BBB accreditation seal — same official embed as the footer.
                  Remote image: keep lazy + explicit dimensions for CLS 0. */}
              <a
                href={`${BBB_PROFILE_URL}/#sealclick`}
                target="_blank"
                rel="nofollow noopener"
                className="mt-8 inline-block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://seal-atlanta.bbb.org/seals/darkgray-seal-293-61-bbb-91849154.png"
                  alt="Branding Zombie Designs BBB Business Review"
                  width={293}
                  height={61}
                  loading="lazy"
                />
              </a>

              <p className="mt-6 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
                Cumming · Forsyth County · North Metro Atlanta
              </p>
            </aside>

            {/* RIGHT — Form */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Or send a note
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
                Tell us what&apos;s{" "}
                <span className="relative inline-block">
                  broken
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                  />
                </span>
                .
              </h2>
              {/* Response-time promise, visible BEFORE submit intent forms —
                  the caption under the button repeats it post-scroll. */}
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline-strong)] px-3.5 py-1.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-[var(--color-neon-text)]"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
                Reply within 1 business day
              </p>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                A sentence or two is enough. We&apos;ll read it, reply fast,
                and tell you honestly whether we&apos;re the right fit —
                before anybody signs anything.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
