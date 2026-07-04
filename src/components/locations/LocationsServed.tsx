import Link from "next/link";
import Section from "@/components/Section";
import { getLocationService } from "@/data/location-services";
import { LOCATIONS } from "@/data/locations";

// Hub side of the hub-and-spoke: rendered on a /services/[slug] page when that
// service has city landing pages. Links down to every spoke so Google (and AI
// crawlers) see the service hub interlinked with its local pages. Renders
// nothing for services that don't have location pages yet.
export default function LocationsServed({ slug }: { slug: string }) {
  const svc = getLocationService(slug);
  if (!svc) return null;

  return (
    <Section theme="light" pad="spacious" className="bg-[var(--color-fog)]" topRule>
      <span className="text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-text-dim">
        Local to North Metro Atlanta
      </span>
      <h2 className="mt-3 max-w-[26ch] font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight text-text-primary">
        {svc.label} in your town
      </h2>
      <p className="measure mt-4 text-[length:var(--text-body)] text-text-secondary">
        We&apos;re based in Cumming and build for businesses across Forsyth,
        North Fulton, Gwinnett, Hall, Cherokee, and Dawson counties. Pick your
        city for {svc.label.toLowerCase()} details and answers specific to your
        area.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {LOCATIONS.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/services/${svc.slug}/${loc.slug}`}
              className="flex h-full flex-col rounded-md border border-[var(--color-hairline-strong)] bg-mist px-4 py-3 hover:border-[var(--color-neon)]"
            >
              <span className="text-[length:var(--text-secondary)] font-semibold text-text-primary">
                {loc.city}
              </span>
              <span className="text-[length:var(--text-caption)] text-text-dim">
                {svc.label} · {loc.county}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
