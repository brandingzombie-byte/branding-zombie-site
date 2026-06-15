# Industry Landing Pages — Build Plan

*Status: PLAN (approved scope pending). Owner: Gerry Betancourt. Drafted 2026-06-04.*
*Reads alongside `.agents/product-marketing-context.md`.*

## 1. Why we're building these

Capture **local + vertical search intent** the homepage can't: "HVAC logo design Cumming GA," "barber shop branding near me," "supplement label designer." Each page is a tailored landing page for ONE industry that maps our services, portfolio proof, and pricing to that vertical's specific pains — in plain English, with local cues.

The 5-persona audit named the biggest gap as **Trades & Contractors** (Marcus) and showed first-time service owners (Tyrese — barbershops/salons) churn at generic messaging. These pages fix that by speaking each vertical's language.

## 2. Industry shortlist (prioritized by local intent × proof we already have)

Proof column = portfolio `industry` tags / named clients we can show on that page.

**Tier 1 — build first (strong local intent AND we have proof):**
| Industry | Slug | Proof we have |
|---|---|---|
| Trades & Contractors (HVAC, plumbing, electrical, roofing) | `trades-contractors` | Sharp Edge Construction, Miami Pavement |
| Restaurants & Food Service | `restaurants` | Papa's Kitchen Diner, 365 Whole Foods, Slabachatti |
| Salons & Barbershops | `salons-barbershops` | Thrasher Hemp (grooming), GentlemenCutz flyer |
| Supplement & CPG Brands | `supplement-cpg-brands` | 40+ product/label shots — our deepest bucket |

**Tier 2 — build second:**
| Industry | Slug | Proof |
|---|---|---|
| Fitness & Gyms | `gyms-fitness` | Macefit, Muscleology, Mighty, Benchmark |
| Auto & Repair | `auto-repair` | (thin — lean on trades adjacency) |
| Construction & Home Services | `construction-home-services` | Sharp Edge, Miami Pavement |
| Medical / Dental / Wellness Clinics | `medical-wellness` | Kids Life Solutions, Hospital 2 Home |
| Ecommerce / DTC Brands | `ecommerce-dtc` | Planters Etc., Squeeze Me Skinny, Pure Blanco |

**Tier 3 — long tail (build if Tier 1-2 convert):**
Tow companies, landscapers, cleaning services, pet services, coffee shops, real estate agents, custom PC/tech retail (Enigma proof).

> **Guardrail:** only build a page where we can show credible proof OR honestly soften the proof. No page should imply specialization we can't back up.

## 3. URL & route architecture

- **Route:** `/industries/[slug]` — one dynamic page + an `industries.ts` data file. Mirrors the proven `/services/[slug]` pattern (server page reads data, client sub-components for interactivity).
- **Index:** `/industries` — brutalist grid of all industries (reuse `ServicesBrutalistGrid` pattern or a parallel `IndustriesGrid`).
- **Rejected alternative:** `/[service]-for-[industry]` (e.g. `/logo-design-for-hvac`) — combinatorial explosion (8 services × 12 industries = 96 thin pages → duplicate-content risk). One rich page per industry wins on quality and maintenance.
- Slugs are SEO-bearing: prefer `trades-contractors` over `trades`.

## 4. Page anatomy (reuse existing components wherever possible)

Each industry page, top to bottom:
1. **Hero (dark)** — industry headline + pain hook + dual CTA (audit + call). Reuse `Section` + hero pattern.
2. **"Sound familiar?" pains** — 4-5 vertical-specific pains. Reuse `PainPoints` style.
3. **What we make for [industry]** — the subset of services that vertical buys, in the brutalist grid. Reuse `ServicesBrutalistGrid` with a filtered `services` array.
4. **Proof** — portfolio auto-filtered to the industry's `portfolioIndustryTags` (reuse `WorkGallery` matching logic or a static strip) + one industry-matched testimonial.
5. **Pricing** — the relevant package(s) for that vertical (reuse `Pricing` or a tailored 2-3 tier). Trades → flat truck/sign/shirt prices; first-timers → $997 Launch Kit forward.
6. **Process** — reuse `Process`.
7. **Local band** — "Serving [towns]" using `PRIMARY_AREAS` from `lib/site.ts`.
8. **FAQ** — 4-6 industry-specific Q&As. Reuse `FAQ`.
9. **FinalCTA** — reuse.

**Schema per page:** `BreadcrumbList` + `Service` + `LocalBusiness` (@id ref) + `FAQPage`. AEO/GEO-friendly (answer-style FAQ).

## 5. Data model — `src/data/industries.ts`

```ts
export interface Industry {
  slug: string;
  name: string;              // "HVAC & Trades"
  displayName: string;       // for headlines
  hero: { eyebrow: string; headline: string; highlight: string; subhead: string };
  painPoints: { text: string }[];
  servicesOffered: ServiceSlug[];     // subset shown in the brutalist grid
  portfolioIndustryTags: string[];    // maps to portfolio.ts `industry` field
  pricingNote?: string;               // vertical-specific pricing framing
  testimonialName?: string;           // pick from reviews.ts
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string; keywords: string[] };
}
export const INDUSTRIES: Industry[] = [ /* one entry per page */ ];
```

- `portfolioIndustryTags` reuses the **existing** `industry` values already on all 87 portfolio items (supplements, restaurant, construction, beauty, cbd, candy, food, healthcare, fitness, etc.) → zero new image work for Tier 1.
- Adding an industry = adding one data object. The route, schema, and components are written once.

## 6. Content strategy

- **Voice:** per `product-marketing-context.md` — plain English, local, warm, no agency jargon. Each page must read like it was written for that owner.
- **SEO target per page:** "[service] for [industry] in Cumming / Forsyth County / North Metro Atlanta" + the vertical's natural phrasing.
- **Uniqueness is non-negotiable.** Templated mad-libs ("We do branding for {industry}") = thin/duplicate content = Google penalty. Every page needs genuinely unique hero, pains, and FAQ. **This is exactly why the build phase should use an agent fan-out (§7).**

## 7. The agent/workflow build approach  ← "perhaps an agent?" = YES, here's how

This is a textbook Workflow fan-out. Recommended phasing:

- **Phase A (I do by hand):** Build the `/industries/[slug]` route + `/industries` index + `industries.ts` model + **ONE pilot page (Trades & Contractors)** end to end. Get owner sign-off on the template + voice. This becomes the gold standard.

- **Phase B (Workflow fan-out):** One agent per industry, in parallel, each:
  - reads the marketing-context doc + the approved pilot page + that industry's portfolio items + reviews
  - generates UNIQUE copy into the `Industry` schema (hero, 5 pains, 5 FAQ, SEO meta, services subset)
  - invokes `/copywriting` + `/seo-audit` (or `/ai-seo`) skills for quality
  - adversarially self-checks: no jargon, no duplication against sibling pages, proof claims are backed
  - returns **structured `Industry` JSON** (schema-validated)
  - → I assemble the validated objects into `industries.ts`, review in batches, build + commit.

  This produces ~8-12 unique, on-brand, SEO-tuned pages in one pass without thin content. A final "completeness critic" agent scans all generated pages for cross-page duplication and weak proof.

- **Phase C:** Discovery + linking — add to nav (Industries dropdown or footer section), sitemap, cross-link from `/services/[slug]` ("Industries we do this for") and `/work`.

## 8. Rollout batches

- **Batch 1:** pilot Trades + Restaurants + Salons/Barbershops + Supplements (Tier 1, all have proof).
- **Batch 2:** Gyms, Auto, Construction, Medical, Ecommerce (Tier 2).
- **Batch 3:** long tail, only if Batch 1-2 convert.

## 9. Risks & guardrails

- **Thin/duplicate content** → unique copy per page (agent-enforced), min ~600 words, unique FAQ set per page.
- **Over-claiming verticals** → only Tier 1-2 get pages now; soften proof where thin; never imply false specialization.
- **Maintenance** → fully data-driven; editing a page = editing one object.
- **Cannibalizing /services** → industry pages target "[service] for [industry]"; service pages target "[service] in [town]". Distinct intent; cross-link rather than compete.

## 10. DECISIONS — AGREED 2026-06-04

1. **Batch 1 = Tier 1, 4 pages:** Trades & Contractors, Restaurants, Salons & Barbershops, Supplement/CPG Brands.
2. **URL:** `/industries/[slug]` (+ `/industries` index).
3. **Nav placement:** Footer "Industries we serve" section (keep top nav clean). Plus cross-links from `/services/[slug]` and `/work`.
4. **Build approach:** Phase A — I build the route + `industries.ts` model + the **Trades & Contractors pilot** by hand for owner approval. Phase B — Workflow fan-out generates Restaurants, Salons & Barbershops, Supplements in parallel (each unique copy → validated `Industry` schema → `/copywriting` + `/seo-audit` skills → self-check), with a final cross-page duplication critic. Phase C — footer links + sitemap + cross-links.

**NEXT ACTION when resumed:** start Phase A — scaffold `/industries/[slug]` route, `/industries` index, `src/data/industries.ts`, and the Trades pilot page. Then present pilot for approval before the fan-out.
