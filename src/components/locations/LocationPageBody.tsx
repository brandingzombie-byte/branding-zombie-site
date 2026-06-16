import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import SectionSeparator from "@/components/SectionSeparator";
import LocationCtas from "@/components/locations/LocationCtas";
import { SITE_URL, BUSINESS_NAME } from "@/lib/site";
import { REVIEWS } from "@/data/reviews";
import { getServiceAeo, getServiceComparison } from "@/data/service-aeo";
import { getSiblingLocations, type Location } from "@/data/locations";
import type { LocationService } from "@/data/location-services";

// Inline check glyph — keep this a server component (no Phosphor import in RSC).
function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-1 h-4 w-4 flex-none text-[var(--color-neon-text)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

const PROCESS: { step: string; title: string; body: (noun: string) => string }[] = [
  {
    step: "01",
    title: "Free discovery call",
    body: (n) =>
      `We talk through your business, your goals, and what your ${n} needs to do. No pressure, no jargon — and a flat quote before anything starts.`,
  },
  {
    step: "02",
    title: "Strategy & wireframes",
    body: () =>
      "We map the pages, the messaging, and the path to a call or sale, so the design solves a business problem instead of just looking nice.",
  },
  {
    step: "03",
    title: "Design in the browser",
    body: () =>
      "You see real, responsive pages early — not a static mockup — so we can react to how it actually feels on a phone and a desktop.",
  },
  {
    step: "04",
    title: "Build, copy & QA",
    body: (n) =>
      `We write the copy, build it fast and clean, wire up local SEO and analytics, and test the ${n} on every screen before it goes live.`,
  },
  {
    step: "05",
    title: "You launch — and own it",
    body: (n) =>
      `We launch, hand over the domain, hosting, and files, and show you how to run it. The ${n} is yours, free and clear.`,
  },
];

export default function LocationPageBody({
  svc,
  loc,
}: {
  svc: LocationService;
  loc: Location;
}) {
  const cityState = `${loc.city}, ${loc.state}`;
  const aeo = getServiceAeo(svc.slug);
  const comparison = getServiceComparison(svc.slug);
  const siblings = getSiblingLocations(loc.slug);

  // Prefer reviews from this city / county; fall back to the strongest three.
  const localReviews = REVIEWS.filter(
    (r) =>
      r.location.includes(loc.city) ||
      r.location.includes(loc.county) ||
      r.location.includes("North Metro Atlanta"),
  );
  const reviews = (localReviews.length >= 2 ? localReviews : REVIEWS).slice(0, 3);

  const answerFirst = `${svc.label} from ${BUSINESS_NAME} for ${cityState} is custom, conversion-focused ${svc.noun} design and development for ${loc.city} and ${loc.county} small businesses — mobile-first, local-SEO-ready, ${svc.priceAnchor}, and delivered in ${svc.timeline}. ${loc.introHook} You own the ${svc.noun}, the domain, and every file on handoff.`;

  const allFaqs = [...loc.cityFaqs, ...svc.serviceFaqs];

  return (
    <>
      {/* ── Hero ── */}
      <Section theme="dark" pad="spacious" className="min-h-[58dvh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 animate-ambient"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 28%, rgba(191,255,0,0.10), transparent 70%), radial-gradient(50% 40% at 84% 74%, rgba(0,255,212,0.07), transparent 70%)",
          }}
        />
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 pt-20 lg:grid-cols-12 lg:pt-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--color-toxic)]" />
              <span className="text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
                {svc.label} · {cityState}
              </span>
            </div>
            <h1 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
              {svc.label} in{" "}
              <span className="relative inline-block">
                {cityState}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-toxic)]"
                />
              </span>
            </h1>
            <p className="measure mt-7 text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
              Custom, fast, conversion-built websites for {loc.city} businesses —
              designed and built by one senior designer, not an agency assembly
              line. {svc.priceAnchor}, delivered in {svc.timeline}, and you own
              every file.
            </p>
            <p className="mt-4 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-[var(--color-dark-text-secondary)]/80">
              {svc.priceAnchor} · {svc.timeline} delivery · 5.0★ on Google
            </p>
            <div className="mt-9">
              <LocationCtas primaryLabel={`Get your ${loc.city} quote`} size="lg" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-md border border-[var(--color-dark-border)] bg-[var(--color-surface)] lg:ml-auto lg:mr-0">
              <Image
                src={svc.heroImage.src}
                alt={`${svc.heroImage.alt} — for businesses in ${cityState}`}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-toxic)]/60"
              />
            </div>
          </div>
        </div>
      </Section>

      <SectionSeparator id={7} />

      {/* ── Answer-first band (AEO-extractable) + proof stats ── */}
      <Section theme="light" pad="spacious" topRule>
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              {svc.label} in {loc.city}, {loc.county}
            </span>
            <p className="measure mt-4 text-[length:var(--text-h4)] leading-snug text-text-primary">
              {answerFirst}
            </p>
          </div>
          {aeo && (
            <div className="lg:col-span-5">
              <ul className="grid grid-cols-1 divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {aeo.stats.map((s) => (
                  <li key={s.label} className="px-2 py-5 sm:px-5">
                    <div className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-none text-[var(--color-neon-text)]">
                      {s.value}
                    </div>
                    <div className="mt-2 text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-text-dim">
                      {s.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      <SectionSeparator id={1} />

      {/* ── Local angle ── */}
      <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
              Why {loc.city} businesses work with us
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              Local to{" "}
              <span className="relative inline-block">
                {loc.city}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-[var(--color-neon)]"
                />
              </span>
              .
            </h2>
            <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-md border border-[var(--color-hairline-strong)]">
              <Image
                src={svc.bodyImage.src}
                alt={`${svc.bodyImage.alt}, ${cityState}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="measure text-[length:var(--text-body)] leading-relaxed text-text-secondary">
              {loc.localAngle}
            </p>
            <div className="mt-7">
              <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em] text-text-dim">
                {loc.city} businesses we build for
              </span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {loc.localIndustries.map((ind) => (
                  <li
                    key={ind}
                    className="rounded-full border border-[var(--color-hairline-strong)] bg-mist px-4 py-1.5 text-[length:var(--text-caption)] text-text-secondary"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-7 text-[length:var(--text-secondary)] text-text-dim">
              Also serving{" "}
              {loc.nearby.join(", ")} and the surrounding {loc.county} area.
            </p>
          </div>
        </div>
      </Section>

      <SectionSeparator id={2} />

      {/* ── Sub-services grid ── */}
      <Section theme="light" pad="spacious" topRule>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
            What {svc.label.toLowerCase()} includes for {loc.city} businesses
          </h2>
          <p className="measure-tight text-[length:var(--text-secondary)] text-text-dim">
            One designer, every piece — so it all fits together.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-3">
          {svc.subServices.map((s) => (
            <li key={s.name} className="bg-mist p-6">
              <div className="flex items-start gap-3">
                <Check />
                <div>
                  <h3 className="text-[length:var(--text-body)] font-semibold text-text-primary">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                    {s.blurb}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href={`/services/${svc.slug}`}
            className="inline-flex items-center gap-2 text-[length:var(--text-secondary)] font-semibold text-[var(--color-neon-text)] underline-offset-4 hover:underline"
          >
            See the full {svc.label.toLowerCase()} service →
          </Link>
        </div>
      </Section>

      <SectionSeparator id={8} />

      {/* ── Proof: reviews + founder quote ── */}
      <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
          What clients say
        </span>
        <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
          Real reviews, 5.0★ on Google.
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="flex flex-col rounded-md border border-[var(--color-hairline-strong)] bg-mist p-6"
            >
              <div aria-hidden className="text-[var(--color-neon-text)]">
                ★★★★★
              </div>
              <p className="mt-3 flex-1 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                “{r.quote}”
              </p>
              <div className="mt-5 border-t border-[var(--color-hairline-strong)] pt-4">
                <div className="text-[length:var(--text-secondary)] font-semibold text-text-primary">
                  {r.name}
                </div>
                <div className="text-[length:var(--text-caption)] text-text-dim">
                  {r.business} · {r.location}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {aeo && (
          <figure className="measure mt-12 border-l-2 border-[var(--color-toxic)] pl-6">
            <blockquote className="text-[length:var(--text-h4)] leading-snug text-text-primary">
              “{aeo.expertQuote.quote}”
            </blockquote>
            <figcaption className="mt-4 text-[length:var(--text-secondary)] text-text-dim">
              — {aeo.expertQuote.name}, {aeo.expertQuote.title}
            </figcaption>
          </figure>
        )}
      </Section>

      <SectionSeparator id={4} />

      {/* ── Process ── */}
      <Section theme="light" pad="spacious" topRule>
        <h2 className="max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
          How we build your {loc.city} {svc.noun}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[var(--color-hairline-strong)] bg-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((p) => (
            <li key={p.step} className="bg-mist p-6">
              <div className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] text-[var(--color-neon-text)]">
                {p.step}
              </div>
              <h3 className="mt-3 text-[length:var(--text-body)] font-semibold text-text-primary">
                {p.title}
              </h3>
              <p className="mt-2 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                {p.body(svc.noun)}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Comparison table ── */}
      {comparison && (
        <>
          <SectionSeparator id={3} />
          <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
            <h2 className="max-w-[26ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
              {comparison.title}
            </h2>
            <p className="measure mt-4 text-[length:var(--text-body)] text-text-secondary">
              {comparison.intro}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[length:var(--text-secondary)]">
                <thead>
                  <tr className="border-b border-[var(--color-hairline-strong)]">
                    <th className="py-3 pr-4 font-semibold text-text-dim"> </th>
                    <th className="py-3 pr-4 font-semibold text-[var(--color-neon-text)]">
                      {comparison.us}
                    </th>
                    <th className="py-3 pr-4 font-semibold text-text-dim">
                      {comparison.them}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[var(--color-hairline-strong)]"
                    >
                      <th
                        scope="row"
                        className="py-3 pr-4 font-medium text-text-primary"
                      >
                        {row.label}
                      </th>
                      <td className="py-3 pr-4 text-text-secondary">{row.us}</td>
                      <td className="py-3 pr-4 text-text-dim">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}

      <SectionSeparator id={1} />

      {/* ── FAQ (city + service) ── */}
      <Section theme="light" pad="spacious" topRule>
        <h2 className="max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
          {svc.label} in {loc.city} — questions, answered
        </h2>
        <div className="mt-8 divide-y divide-[var(--color-hairline-strong)] border-y border-[var(--color-hairline-strong)]">
          {allFaqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[length:var(--text-body)] font-semibold text-text-primary">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 flex-none text-[var(--color-neon-text)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="measure mt-3 text-[length:var(--text-secondary)] leading-relaxed text-text-secondary">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <SectionSeparator id={6} />

      {/* ── Areas served — hub-and-spoke internal links ── */}
      <Section theme="light" pad="standard" className="bg-[var(--color-fog)]" topRule>
        <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
          {svc.label} across North Metro Atlanta
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-tight text-text-primary">
          Other towns we serve
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${svc.slug}/${s.slug}`}
                className="inline-flex rounded-full border border-[var(--color-hairline-strong)] bg-mist px-4 py-2 text-[length:var(--text-secondary)] text-text-secondary hover:border-[var(--color-neon)] hover:text-text-primary"
              >
                {svc.label} in {s.city}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Final CTA ── */}
      <Section theme="dark" pad="spacious" topRule>
        <div className="flex flex-col items-start gap-6">
          <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.22em] text-[var(--color-toxic-text)]">
            Ready when you are
          </span>
          <h2 className="max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.1] tracking-tight text-[var(--color-dark-text-primary)]">
            Let&apos;s build the {svc.noun} {loc.city}{" "}
            <span className="relative inline-block">
              deserves
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-[var(--color-toxic)]"
              />
            </span>
            .
          </h2>
          <p className="measure text-[length:var(--text-lead)] leading-relaxed text-[var(--color-dark-text-secondary)]">
            Free 15-minute consult and a flat quote — no pressure, no agency
            runaround. Talk to the person who&apos;ll actually build it.
          </p>
          <LocationCtas primaryLabel={`Get your ${loc.city} quote`} size="lg" />
          <p className="text-[length:var(--text-caption)] text-[var(--color-dark-text-secondary)]/70">
            {BUSINESS_NAME} · {SITE_URL.replace("https://", "")} · serving{" "}
            {loc.city} and {loc.county}, {loc.state}
          </p>
        </div>
      </Section>
    </>
  );
}
