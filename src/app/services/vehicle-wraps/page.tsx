import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import Reveal from "@/components/mailers/Reveal";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import ServiceLeadForm from "@/components/services/ServiceLeadForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// Server Component page — use the SSR-safe Phosphor entry directly (the
// "@/components/icons" client barrel breaks module evaluation here; same
// pattern as /website-management and /startup-special).
import {
  ArrowRight,
  Truck,
  PaintBrush,
  Wrench,
  Stamp,
} from "@phosphor-icons/react/dist/ssr";
import { SITE_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const PAGE_PATH = "/services/vehicle-wraps";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// P8 of the keyword plan: "work truck wraps" and friends — high-intent,
// locally unsaturated, and a natural bridge between the trades vertical and
// the print pipeline. All numbers below are the ones already live on the
// Print Design page ("Vehicle wraps from $1,200", "10–14 days including
// install coordination") — single source of truth, no invented prices.

const WRAP_TYPES = [
  {
    icon: Truck,
    title: "Full wraps",
    body: "Bumper-to-bumper coverage that turns the whole vehicle into the brand. The biggest visual impact per dollar your business can buy.",
  },
  {
    icon: PaintBrush,
    title: "Partial wraps",
    body: "Doors, tailgate, and panel coverage that reads like a full wrap at a fraction of the cost. The smart start for most work trucks.",
  },
  {
    icon: Stamp,
    title: "Decals & lettering",
    body: "Cut vinyl — name, number, license info, door badges. The minimum every work vehicle should legally and commercially carry.",
  },
  {
    icon: Wrench,
    title: "Trailers & fleet",
    body: "Matching graphics across every truck and trailer you run, so job sites and highways see one company, not a mismatched fleet.",
  },
];

const FAQS = [
  {
    q: "How much does a vehicle wrap cost in Cumming, GA?",
    a: "Our vehicle wrap work starts at $1,200 — that end of the range covers decals, lettering, and smaller partial wraps. Full wraps on a work van or truck run higher depending on vehicle size and coverage; you'll get an exact number in your quote, not a range that doubles later. Design, print-ready file prep, and install coordination are all included in the price we give you.",
  },
  {
    q: "I got a $4,500 wrap quote somewhere else. Is that normal?",
    a: "For a quality full wrap on a large van with design included — it can be. The problem is most shops won't itemize it, so you can't tell design from material from install. We break the quote apart so you can see exactly what you're paying for, and where a partial wrap gets you 80% of the impact for a lot less.",
  },
  {
    q: "How long does a vehicle wrap take?",
    a: "Typically 10–14 days from approved design to installed wrap, including print production and install coordination. Design comes first, and for wraps you approve a physical proof — color on a screen and color on vinyl are not the same thing, and we don't let you find that out on the side of your truck.",
  },
  {
    q: "Do you do the installation yourselves?",
    a: "We design the wrap, handle production through our in-house print pipeline, and coordinate installation with trusted local installers we've vetted — the people who do wraps all day, every day. One invoice, one point of contact, and we manage the handoff so nothing gets lost between designer and installer.",
  },
  {
    q: "Can I just get the design and print files?",
    a: "Yes. If you already have an installer or a print vendor you trust, we'll design the wrap and hand off production-ready files with real dielines and vehicle templates — the same files we'd send to press ourselves. You own them either way.",
  },
  {
    q: "Do you wrap cars, golf carts, or box trucks?",
    a: "Work trucks, vans, trailers, box trucks, cars — and yes, golf carts, which are practically their own vehicle class in Forsyth County. If it has panels, it can carry your brand.",
  },
];

const TITLE = "Vehicle Wraps & Truck Graphics in Cumming, GA — From $1,200";
const DESCRIPTION =
  "Work truck wraps, van wraps, trailer graphics & vehicle lettering for Cumming, GA and Forsyth County businesses. Design, print & install coordination from $1,200 — one invoice. Call (770) 744-2536.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "vehicle wraps Cumming GA",
    "work truck wraps",
    "truck wraps Cumming",
    "van wraps Forsyth County",
    "vehicle wrap design",
    "truck lettering Cumming GA",
    "trailer wraps",
    "fleet graphics Cumming",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Branding Zombie Designs",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/assets/vehicle-wraps/hero.jpg`,
        width: 1200,
        height: 1500,
        alt: "Work van with a bold charcoal and toxic-green vinyl wrap design — vehicle wraps by Branding Zombie Designs, Cumming, GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/assets/vehicle-wraps/hero.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function JsonLd() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Vehicle Wraps & Truck Graphics",
    serviceType: "Vehicle wrap design, printing, and install coordination",
    provider: {
      "@type": "LocalBusiness",
      name: "Branding Zombie Designs",
      telephone: "+1-770-744-2536",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cumming",
        addressRegion: "GA",
        addressCountry: "US",
      },
    },
    areaServed: ["Cumming GA", "Forsyth County GA", "North Metro Atlanta"],
    url: PAGE_URL,
    description: DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "1200",
      priceCurrency: "USD",
      description: "Vehicle wraps from $1,200 — design, print, and install coordination.",
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 2, name: "Vehicle Wraps", item: PAGE_URL },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}

export default function VehicleWrapsPage() {
  return (
    <>
      <Navbar />
      <JsonLd />
      <main id="main-content" tabIndex={-1}>
        {/* ── Hero — copy + above-the-fold lead form left, the wrap right ── */}
        <Section theme="dark" pad="spacious" className="overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
            style={{
              background:
                "radial-gradient(60% 50% at 25% 30%, rgba(191,255,0,0.11), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(0,255,212,0.06), transparent 70%)",
            }}
          />
          {/* Rock-on hand reaching over the van plate. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-x-clip">
            <ZombieHand
              src={HANDS["zh37-thumbsup-r"].src}
              width={HANDS["zh37-thumbsup-r"].width}
              height={HANDS["zh37-thumbsup-r"].height}
              edge="right"
              behaviors={["peek", "idle", "follow"]}
              offset="6%"
              bleed="-30px"
              displayWidth={210}
              rotate={-7}
              followStrength={24}
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-x-10 gap-y-12 pt-20 lg:grid-cols-12 lg:pt-28">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
                <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                  Vehicle Wraps · Cumming, GA
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.08] tracking-tight text-[var(--color-dark-text-primary)] lg:text-[length:clamp(2.5rem,1.9rem+2.4vw,3.9rem)]">
                Your work truck is a billboard.{" "}
                <span className="relative inline-block">
                  Stop driving it blank.
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[3px] w-[calc(100%-0.3em)] bg-[var(--color-toxic)]"
                  />
                </span>
              </h1>

              <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Vehicle wraps, partial wraps, decals, and lettering for work trucks,
                vans, and trailers in Cumming, Forsyth County, and North Metro
                Atlanta — designed in-house, produced through our print pipeline,
                and installed by vetted local installers. From $1,200, on one
                invoice, in 10–14 days.
              </p>

              <p className="tabular mt-8 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                From $1,200 · design + print + install coordination · 10–14 days
              </p>

              {/* The wrap itself — full-bleed proof under the copy on large
                  screens, above the form on small. */}
              <Reveal className="mt-10 hidden lg:block">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
                  <Image
                    src="/assets/vehicle-wraps/hero.jpg"
                    alt="Charcoal work van wearing a bold toxic-green halftone vinyl wrap at dusk — vehicle wrap design by Branding Zombie Designs"
                    fill
                    className="object-cover object-[50%_60%]"
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-grave)]/45 to-transparent"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <div className="relative border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] md:p-8">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-[var(--color-toxic)]"
                />
                <ServiceLeadForm
                  slug="vehicle-wraps"
                  serviceName="Vehicle Wraps"
                  variant="hero"
                  tone="dark"
                />
              </div>

              {/* Mobile gets the van right under the form. */}
              <Reveal className="mt-6 lg:hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-dark-border)] bg-[var(--color-surface)]">
                  <Image
                    src="/assets/vehicle-wraps/hero.jpg"
                    alt="Charcoal work van wearing a bold toxic-green halftone vinyl wrap at dusk — vehicle wrap design by Branding Zombie Designs"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ── Answer capsule ── */}
        <SectionSeparator id={7} />
        <Section theme="dark" pad="standard">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-cyan)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-cyan-text)]">
                The short version
              </span>
            </div>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-primary)]">
              Vehicle wraps from Branding Zombie Designs are custom wrap, decal,
              and lettering design for work trucks, vans, and trailers in
              Cumming, GA and North Metro Atlanta — designed in-house, produced
              through an in-house print pipeline, and installed through vetted
              local installers, from $1,200 with a physical proof before
              anything touches your vehicle.
            </p>
          </div>
        </Section>

        {/* ── Wrap types ── */}
        <SectionSeparator id={8} />
        <Section theme="dark" pad="standard">
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-x-clip">
              <ZombieHand
                src={HANDS["zh25-point-diag"].src}
                width={HANDS["zh25-point-diag"].width}
                height={HANDS["zh25-point-diag"].height}
                edge="left"
                behaviors={["peek", "idle", "parallax"]}
                offset="30%"
                bleed="-34px"
                displayWidth={200}
                rotate={-4}
                parallaxSpeed={0.12}
              />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-[var(--color-dark-text-primary)]">
              Four ways to put your name{" "}
              <span className="text-[var(--color-toxic-text)]">on the road.</span>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WRAP_TYPES.map((w, i) => (
                <Reveal key={w.title} delay={i * 60}>
                  <div className="h-full border border-[var(--color-dark-border)] bg-[var(--color-surface)] p-6 transition-colors duration-200 hover:border-[var(--color-dark-border-strong)]">
                    <w.icon size={28} weight="duotone" className="text-[var(--color-toxic-text)]" />
                    <h3 className="mt-4 text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                      {w.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
              Wraps pair naturally with{" "}
              <a href="/window-clings" className="underline decoration-[var(--color-dark-border-strong)] underline-offset-4 hover:text-[var(--color-toxic-text)]">
                window clings
              </a>{" "}
              and the rest of the{" "}
              <a href="/services/print-design" className="underline decoration-[var(--color-dark-border-strong)] underline-offset-4 hover:text-[var(--color-toxic-text)]">
                print pipeline
              </a>{" "}
              — one brand, everywhere your business shows up. Built for{" "}
              <a href="/industries/trades-contractors" className="underline decoration-[var(--color-dark-border-strong)] underline-offset-4 hover:text-[var(--color-toxic-text)]">
                trades &amp; contractors
              </a>{" "}
              who live on the road.
            </p>
          </div>
        </Section>

        {/* ── Process ── */}
        <SectionSeparator id={7} />
        <Section theme="dark" pad="standard">
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-[var(--color-dark-text-primary)]">
            Design to driveway in{" "}
            <span className="text-[var(--color-toxic-text)]">10–14 days.</span>
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              ["01", "Design", "We design the wrap on your exact vehicle template — panels, curves, door handles and all — so what you approve is what gets installed."],
              ["02", "Proof", "You approve a digital proof AND a physical printed proof. Screen color and vinyl color are different animals; we don't gamble with your truck."],
              ["03", "Print", "Production through our in-house print pipeline on vehicle-grade vinyl — built for Georgia sun, pressure washers, and 80 mph on GA-400."],
              ["04", "Install", "We coordinate installation with vetted local installers and manage the handoff. You drop the vehicle off; it comes back a billboard."],
            ].map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 60}>
                <li className="h-full border border-[var(--color-dark-border)] bg-[var(--color-surface)] p-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] text-[var(--color-toxic-text)]">
                    {n}
                  </span>
                  <h3 className="mt-3 text-[length:var(--text-h4)] font-semibold text-[var(--color-dark-text-primary)]">{t}</h3>
                  <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ── FAQ ── */}
        <SectionSeparator id={8} />
        <Section theme="dark" pad="standard">
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-x-clip">
              <ZombieHand
                src={HANDS["zh11-point-up"].src}
                width={HANDS["zh11-point-up"].width}
                height={HANDS["zh11-point-up"].height}
                edge="right"
                behaviors={["peek", "idle", "parallax"]}
                offset="14%"
                bleed="-26px"
                displayWidth={170}
                rotate={6}
                parallaxSpeed={-0.1}
              />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-[var(--color-dark-text-primary)]">
              Wrap questions,{" "}
              <span className="text-[var(--color-toxic-text)]">straight answers.</span>
            </h2>
            <div className="mx-auto mt-8 max-w-3xl">
              <Accordion className="w-full border-t border-[var(--color-dark-border)]">
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-[length:var(--text-body)] font-semibold text-[var(--color-dark-text-primary)]">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[length:var(--text-secondary)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <p className="mt-6 text-[length:var(--text-secondary)] text-[var(--color-dark-text-dim)]">
                Golf cart? We do those too —{" "}
                <a href="/blog/custom-golf-cart-wraps-cumming" className="underline decoration-[var(--color-dark-border-strong)] underline-offset-4 hover:text-[var(--color-toxic-text)]">
                  custom golf cart wraps in Cumming
                </a>
                .
              </p>
            </div>
          </div>
        </Section>

        {/* ── Final CTA ── */}
        <SectionSeparator id={7} />
        <Section theme="dark" pad="spacious">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight text-[var(--color-dark-text-primary)]">
              Every mile you drive unwrapped is{" "}
              <span className="text-[var(--color-toxic-text)]">free advertising you didn&apos;t run.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] text-[var(--color-dark-text-secondary)]">
              Send the vehicle, get a straight quote. Design, print, and install
              coordination from $1,200 — one invoice, no showroom games.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#main-content"
                role="button"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-7 py-3.5 text-[length:var(--text-secondary)] font-semibold uppercase tracking-wider text-[var(--color-grave)] transition-transform duration-150 hover:bg-[var(--color-toxic-deep)] active:scale-[0.97]"
              >
                Get my wrap quote
                <ArrowRight size={16} weight="bold" />
              </a>
              <a
                href={PHONE_HREF}
                className="text-[length:var(--text-secondary)] text-[var(--color-dark-text-secondary)] underline decoration-[var(--color-dark-border-strong)] underline-offset-4 hover:text-[var(--color-toxic-text)]"
              >
                or call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
