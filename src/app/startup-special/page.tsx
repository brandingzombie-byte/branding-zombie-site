import type { Metadata } from "next";
import {
  Palette,
  CreditCard,
  FileText,
  Globe,
  CheckCircle,
  X,
  ArrowRight,
  Phone,
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
import BookingForm from "./BookingForm";

const PAGE_PATH = "/startup-special";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PRICE = "997";
const PRICE_DISPLAY = "$997";
const RETAIL_DISPLAY = "$2,097";
const SAVINGS_DISPLAY = "$1,100";
const PRICE_VALID_UNTIL = "2026-08-31";
const SPOTS_PER_MONTH = "5";

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Startup Special $997 — Logo, Site & Print in 10 Days | Cumming, GA",
  description:
    "New business launching this summer? Logo, brand kit, 100 business cards, 100 flyers, and a 1-page site with domain + 1 year of hosting — $997, delivered in 10 days. Cumming, GA.",
  keywords: [
    "startup branding Cumming",
    "startup branding Cumming GA",
    "branding in Cumming",
    "logo design Cumming GA",
    "brand identity Cumming Georgia",
    "small business branding North Atlanta",
    "new business logo design Forsyth County",
    "branding package Cumming",
    "summer launch package Cumming",
    "logo and website package Georgia",
    "startup design package Atlanta",
    "business card design Forsyth County",
    "flyer design Cumming",
    "small business website Cumming",
    "graphic design Cumming GA",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Startup Special $997 — From Idea to Open Sign in 10 Days",
    description:
      "Logo, brand kit, 100 cards, 100 flyers, and a 1-page site with domain + hosting. Delivered in 10 days. Cumming, GA. 5 kits a month. Book by Aug 31.",
    siteName: "Branding Zombie Designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Special $997 — From Idea to Open Sign in 10 Days",
    description:
      "Logo, brand kit, 100 cards, 100 flyers, 1-page site + hosting. 10 days. Cumming, GA.",
  },
};

// ─── Schema.org — Product/Offer for rich results ──────────────────────────
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${PAGE_URL}#product`,
  name: "Open Sign Startup Kit",
  description:
    "Productized startup launch package: logo + brand kit, 100 business cards, 100 flyers, and a 1-page website with domain + 1 year of hosting. Delivered in 10 days from kickoff. Built in-house in Cumming, GA.",
  brand: { "@id": ORG_ID },
  category: "Brand Identity Package",
  url: PAGE_URL,
  offers: {
    "@type": "Offer",
    "@id": `${PAGE_URL}#offer`,
    price: PRICE,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: PRICE_VALID_UNTIL,
    url: PAGE_URL,
    seller: { "@id": LOCALBIZ_ID },
    eligibleQuantity: {
      "@type": "QuantitativeValue",
      maxValue: SPOTS_PER_MONTH,
      unitText: "kits per month",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Startup Special",
      item: PAGE_URL,
    },
  ],
};

// ─── Content ───────────────────────────────────────────────────────────────
const INCLUDED = [
  {
    Icon: Palette,
    name: "Logo + Brand Kit",
    retail: "$1,000",
    bullets: [
      "Primary + secondary marks",
      "Color palette, type system",
      "SVG, PNG, PDF — yours forever",
    ],
  },
  {
    Icon: CreditCard,
    name: "100 Business Cards",
    retail: "$99",
    bullets: ["Designed in-house", "Printed + shipped to your door", "Matched to your brand"],
  },
  {
    Icon: FileText,
    name: "100 Flyers",
    retail: "$199",
    bullets: ["Single-sided, one design", "Full-color, 8.5×11", "Printed + shipped"],
  },
  {
    Icon: Globe,
    name: "1-Page Site + Hosting",
    retail: "$799",
    bullets: [
      "Mobile-tight, fast, on-brand",
      "Your domain registered",
      "1 year of hosting included",
    ],
  },
];

const STEPS = [
  {
    day: "Day 0",
    name: "Kickoff call",
    body: "30 minutes. Free. We learn the business, you meet the shop.",
  },
  {
    day: "Day 1",
    name: "Quick questionnaire",
    body: "Short form covers brand vibe, content, and what we print.",
  },
  {
    day: "Days 2 — 8",
    name: "Designed + printed",
    body: "Logo, brand kit, site, cards and flyers. Two revision rounds included.",
  },
  {
    day: "Day 10",
    name: "Live + on your doorstep",
    body: "Site goes live on your domain. Print pieces arrive same week.",
  },
];

const FOR = [
  "New businesses launching summer 2026",
  "Side-hustles ready to look real",
  "Owners who'd rather sell than wrestle WordPress",
  "Cumming, Forsyth and North Metro Atlanta startups",
];

const NOT_FOR = [
  "Anyone shopping the $69/mo subscription agencies",
  "30-page sites with custom databases or e-commerce",
  "Last-week-before-launch panic jobs",
];

const ADDONS = [
  { name: "Google Business Profile + FB/IG page setup", price: "+$200" },
  { name: "Brand guidelines PDF (8 pages)", price: "+$150" },
  { name: "Extra revision round", price: "+$75" },
  { name: "Second flyer design", price: "+$125" },
  { name: "Vehicle magnet pair", price: "+$185" },
];

const FAQS = [
  {
    q: "What if I already have a logo?",
    a: "We swap the brand kit for a 2-page site instead, same price. You still get the cards, flyers, hosting and domain. Tell us at the kickoff call.",
  },
  {
    q: "How does year-two hosting work?",
    a: "Year one is included. Starting month 13, hosting + domain is $100/year. Cancel anytime — the domain is registered in your name and you keep it.",
  },
  {
    q: "Do I own everything when it's done?",
    a: "Yes. Source files, domain, site code, brand assets. No retainer trap, no \"you can't have the files until you pay extra.\"",
  },
  {
    q: "What if 10 days doesn't fit my schedule?",
    a: "We can pause the clock once for up to 2 weeks if life happens. Book the kickoff call and tell us your real launch date — we'll work it out.",
  },
  {
    q: "Do you work outside Cumming?",
    a: "Yes. We work with businesses across Forsyth County, Alpharetta, Roswell, Buford, Suwanee, and the rest of North Metro Atlanta. Print ships nationally. Hosting works anywhere.",
  },
  {
    q: "Is the deposit refundable?",
    a: "First $200 is a deposit that holds your kit slot and covers the questionnaire and brand research. Refundable up to the kickoff call. After that, work has started — the deposit stays with us.",
  },
];

const SAVINGS_VALUE = "1,100";

// ─── Page ──────────────────────────────────────────────────────────────────
export default function StartupSpecialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
              href="#book"
              role="button"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-toxic)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
            >
              Reserve a kit
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <Section theme="dark" pad="spacious" topScanline>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.25em] text-[var(--color-toxic-text)]">
                  Startup Special · Summer 2026
                </span>
                <span aria-hidden className="h-px w-12 bg-[var(--color-toxic)]/40" />
                <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-dim)]">
                  Book by Aug 31
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.02] tracking-tight text-[var(--color-dark-text-primary)]">
                From idea to{" "}
                <span className="relative inline-block">
                  open sign
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[6px] w-full bg-[var(--color-toxic)]"
                  />
                </span>{" "}
                in 10 days.
              </h1>

              <p className="measure-wide mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Logo, brand kit, 100 business cards, 100 flyers, and a 1-page
                site with your domain and a year of hosting. One price. Ten
                days. Built in-house in Cumming, GA.
              </p>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-[var(--color-dark-border-strong)] py-6">
                <div>
                  <div className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                    You pay
                  </div>
                  <div className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none text-[var(--color-toxic-text)]">
                    {PRICE_DISPLAY}
                  </div>
                </div>
                <div>
                  <div className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                    Retail value
                  </div>
                  <div className="tabular text-[length:var(--text-h3)] leading-none text-[var(--color-dark-text-secondary)] line-through">
                    {RETAIL_DISPLAY}
                  </div>
                </div>
                <div>
                  <div className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                    Delivered
                  </div>
                  <div className="tabular text-[length:var(--text-h3)] leading-none text-[var(--color-dark-text-primary)]">
                    10 days
                  </div>
                </div>
                <div>
                  <div className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                    Slots / month
                  </div>
                  <div className="tabular text-[length:var(--text-h3)] leading-none text-[var(--color-dark-text-primary)]">
                    {SPOTS_PER_MONTH}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#book"
                  role="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
                >
                  Reserve my kit
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border-strong)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text-primary)] hover:border-[var(--color-toxic)] hover:text-[var(--color-toxic-text)]"
                >
                  Talk first
                </a>
              </div>
            </div>

            {/* Hero visual — generated image with SVG fallback */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </Section>

        {/* ─── WHAT YOU GET ───────────────────────────────────────────── */}
        <Section theme="light" pad="spacious" id="whats-included">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                What's in the box
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                Everything a new business needs to look{" "}
                <span className="relative inline-block">
                  real on day one
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]" />
                </span>
                .
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              Four pieces, picked because they're what every new business
              actually needs in week one. Anything you don't need, swap for
              something you do — same price.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map(({ Icon, name, retail, bullets }) => (
              <article
                key={name}
                className="flex flex-col gap-5 bg-[var(--color-cloud)] p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={28}
                    weight="duotone"
                    className="text-[var(--color-neon-text)]"
                  />
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    Retail {retail}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight text-text-primary">
                  {name}
                </h3>
                <ul className="flex flex-col gap-2.5 border-t border-[var(--color-hairline)] pt-5">
                  {bullets.map((b) => (
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
              </article>
            ))}
          </div>
        </Section>

        {/* ─── THE MATH (parchment band) ──────────────────────────────── */}
        <Section theme="parchment" pad="standard" topRule bottomRule>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            <Stat label="Retail value" value={RETAIL_DISPLAY} muted />
            <Stat label="You pay" value={PRICE_DISPLAY} accent />
            <Stat label="You save" value={`$${SAVINGS_VALUE}`} />
            <Stat label="Delivered in" value="10 days" />
          </div>
        </Section>

        {/* ─── HOW IT WORKS ───────────────────────────────────────────── */}
        <Section theme="light" pad="spacious">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                How it works
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                Ten days. Four steps. No mystery.
              </h2>
            </div>
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary lg:col-span-5 lg:self-end">
              No 90-day "strategy phase." We know what new businesses need.
              You answer a short questionnaire, we go to work, you launch.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-px border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.name} className="flex flex-col gap-3 bg-[var(--color-cloud)] p-8">
                <div className="flex items-center gap-3">
                  <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tabular text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
                    {step.day}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-tight text-text-primary">
                  {step.name}
                </h3>
                <p className="text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── FIT CHECK (for / not for) ──────────────────────────────── */}
        <Section theme="dark" pad="spacious">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-toxic-text)]">
                A fit if you're
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-[var(--color-dark-text-primary)]">
                Launching something new.
              </h3>
              <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-dark-border)] pt-6">
                {FOR.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]"
                  >
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="mt-1 shrink-0 text-[var(--color-toxic-text)]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-text-dim)]">
                Not a fit if you're
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight text-[var(--color-dark-text-primary)]">
                Looking for something else.
              </h3>
              <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-dark-border)] pt-6">
                {NOT_FOR.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-dim)]"
                  >
                    <X
                      size={18}
                      weight="bold"
                      className="mt-1 shrink-0 text-[var(--color-dark-text-dim)]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ─── ADD-ONS ────────────────────────────────────────────────── */}
        <Section theme="light" pad="standard">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Add-ons
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                Want more? Add it on. Priced openly.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Nothing hidden. Tell us at the kickoff call and we'll bundle it
                into the kit invoice.
              </p>
            </div>

            <ul className="flex flex-col divide-y divide-[var(--color-hairline)] border-t border-b border-[var(--color-hairline-strong)] lg:col-span-7">
              {ADDONS.map((a) => (
                <li
                  key={a.name}
                  className="flex items-center justify-between gap-6 py-5"
                >
                  <span className="text-[length:var(--text-body)] text-text-primary">
                    {a.name}
                  </span>
                  <span className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-h4)] leading-none text-[var(--color-neon-text)]">
                    {a.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ─── BOOK (form) ────────────────────────────────────────────── */}
        <Section theme="parchment" pad="spacious" id="book" topRule>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Reserve a kit
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                Five spots a month. Booked is booked.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Tell us a little about what you're launching. We'll reach out
                within the day to confirm and send the kickoff-call link. No
                payment until you say go.
              </p>

              <dl className="mt-8 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-6">
                <Row
                  label="Deposit"
                  value="$200 holds your slot · refundable to kickoff"
                />
                <Row label="Balance" value="$797 on kickoff-call confirmation" />
                <Row label="Renewal" value="$100/yr for hosting + domain after year one" />
                <Row label="Cancel anytime" value="No retainer, no auto-renew" />
              </dl>

              <div className="mt-8 flex flex-col gap-2 text-[length:var(--text-secondary)] text-text-dim">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-text-primary hover:text-[var(--color-neon-text)]"
                >
                  <Phone size={16} weight="bold" />
                  <span className="tabular">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-text-primary hover:text-[var(--color-neon-text)]"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] p-8 shadow-soft lg:p-10">
                <BookingForm />
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
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-text-primary">
                Six things people ask first.
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-text-secondary">
                Don't see your question? Call or email — we answer ourselves,
                not a chatbot.
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
                Last call · Summer 2026
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-[var(--color-dark-text-primary)]">
                Open sign on. Built in days. 🧟
              </h2>
              <p className="measure mt-5 text-[length:var(--text-body)] leading-relaxed text-[var(--color-dark-text-secondary)]">
                Five kits a month. Book by August 31, 2026. We'll have you live
                ten days after the kickoff call.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#book"
                role="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-toxic)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-grave)] hover:bg-[var(--color-toxic-deep)]"
              >
                Reserve my kit
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
          <p className="tabular">© 2026 Branding Zombie Designs. Cumming, GA.</p>
          <div className="flex items-center gap-5">
            <a href="/" className="hover:text-[var(--color-neon-text)]">Main site</a>
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-[var(--color-neon-text)]"
            >
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="tabular hover:text-[var(--color-neon-text)]"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Small helpers ─────────────────────────────────────────────────────────
function Stat({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-text-dim">
        {label}
      </span>
      <span
        className={[
          "tabular font-[family-name:var(--font-display)] leading-none tracking-tight",
          "text-[length:var(--text-h2)] break-words",
          accent ? "text-[var(--color-neon-text)]" : "",
          muted ? "text-text-secondary line-through" : "text-text-primary",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-text-dim">
        {label}
      </dt>
      <dd className="text-right text-[length:var(--text-secondary)] text-text-primary">
        {value}
      </dd>
    </div>
  );
}

// ─── Hero visual ───────────────────────────────────────────────────────────
// Uses a generated image if present, otherwise renders an SVG fallback so
// the page always ships a striking visual. Image path is checked at build
// time via Next's static asset pipeline; SVG renders as a sibling underneath.
function HeroVisual() {
  return (
    <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl border border-[var(--color-dark-border-strong)] bg-[var(--color-surface)] lg:aspect-[4/5]">
      <svg
        viewBox="0 0 400 500"
        aria-hidden
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#BFFF00" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#BFFF00" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#111714" stopOpacity="0" />
          </radialGradient>
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="500" fill="#111714" />
        <rect width="400" height="500" fill="url(#glow)" />

        {/* hanging chains */}
        <line x1="120" y1="0" x2="120" y2="120" stroke="#1A1F1C" strokeWidth="2" />
        <line x1="280" y1="0" x2="280" y2="120" stroke="#1A1F1C" strokeWidth="2" />

        {/* sign frame */}
        <rect
          x="60"
          y="120"
          width="280"
          height="170"
          rx="14"
          fill="#0A0A0A"
          stroke="#BFFF00"
          strokeWidth="3"
          filter="url(#neonGlow)"
        />

        {/* neon "OPEN" */}
        <text
          x="200"
          y="225"
          textAnchor="middle"
          fontFamily="ui-monospace, 'JetBrains Mono', monospace"
          fontWeight="700"
          fontSize="78"
          fill="#BFFF00"
          letterSpacing="6"
          filter="url(#neonGlow)"
        >
          OPEN
        </text>

        {/* small caption */}
        <text
          x="200"
          y="265"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          fontSize="12"
          fill="#BFFF00"
          letterSpacing="6"
          opacity="0.7"
        >
          SUMMER 2026
        </text>

        {/* hairline below sign */}
        <line
          x1="80"
          y1="340"
          x2="320"
          y2="340"
          stroke="#BFFF00"
          strokeOpacity="0.2"
          strokeWidth="1"
        />

        {/* tiny footnotes */}
        <text
          x="80"
          y="380"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="3"
          fill="#7E8C82"
        >
          BRANDING ZOMBIE · CUMMING GA
        </text>
        <text
          x="80"
          y="410"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="3"
          fill="#7E8C82"
        >
          $997 · 10 DAYS · 5 SLOTS/MO
        </text>
      </svg>

      {/* Generated hero image — covers the SVG when present.
          eslint-disable-next-line @next/next/no-img-element */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/startup-special/hero.png"
        alt="Neon 'OPEN' sign glowing in a dark storefront window — Branding Zombie Designs Startup Special"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}
