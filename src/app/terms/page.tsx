import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { SITE_URL, BUSINESS_NAME, PHONE_DISPLAY, EMAIL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/terms`;
const LAST_UPDATED = "July 20, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern ${BUSINESS_NAME}'s design, branding, web, and print services — payment, revisions, ownership, and more. Cumming, GA.`,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Terms of Service — ${BUSINESS_NAME}`,
    description: `The terms that govern ${BUSINESS_NAME}'s design, branding, web, and print services.`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: PAGE_URL },
  ],
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Section theme="light" pad="spacious">
        <article className="mx-auto max-w-3xl space-y-8 leading-relaxed text-text-primary">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold sm:text-4xl">Terms of Service</h1>
            <p className="text-sm opacity-70">Last updated: {LAST_UPDATED}</p>
            <p>
              Thanks for considering {BUSINESS_NAME}. These Terms of Service (the
              &ldquo;Terms&rdquo;) govern your use of our website and the design, branding,
              web, and print services we provide. &ldquo;BZD,&rdquo; &ldquo;we,&rdquo; and
              &ldquo;our&rdquo; mean {BUSINESS_NAME}. &ldquo;You&rdquo; and &ldquo;Client&rdquo;
              mean the person or business using our site or hiring us. By using this site,
              requesting a quote, or engaging us for work, you agree to these Terms.
            </p>
          </header>

          <aside className="rounded-xl border-l-4 border-[var(--color-neon)] bg-[var(--color-fog)] p-5 text-[length:var(--text-secondary)]">
            <p className="font-semibold">Plain-English summary (not a substitute for the full terms):</p>
            <p className="mt-2">
              We ask for a 50% deposit to start and the balance before your project goes live.
              Invoices are due within 7 days. Every project includes 3 rounds of revisions per
              phase; anything outside the agreed scope is quoted separately before we do it. You
              own your final, paid-for work. We stand behind our craft, but we can&rsquo;t
              guarantee specific business results. Georgia law applies.
            </p>
          </aside>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Who we are</h2>
            <p>
              {BUSINESS_NAME} is a design and branding studio based in Cumming, Georgia (Forsyth
              County), serving Forsyth County, North Fulton, and the greater North Metro Atlanta
              corridor. Design and development are performed in-house. Print, packaging, signage,
              and apparel are produced through our print pipeline and production partners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Our services</h2>
            <p>
              We offer web design and development, e-commerce, logo and brand identity, print and
              packaging design, signage, apparel, social media management, AI workflow builds, and
              related creative services. The specific deliverables, scope, price, and timeline for
              your project are defined in your written proposal and, for larger projects, a signed
              service agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Quotes, proposals &amp; service agreements</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Written quotes and proposals are valid for <strong>14 days</strong> unless stated otherwise.</li>
              <li>Verbal estimates are approximate and not binding until confirmed in writing.</li>
              <li>
                Larger engagements use a separate <strong>service agreement</strong> you review and
                e-sign. Where a signed service agreement and these Terms differ for that project,
                the signed agreement controls; where it is silent, these Terms fill the gap.
              </li>
              <li>
                A project is booked — and its start date reserved — only when the deposit is
                received and the proposal or agreement is accepted in writing.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Payment terms</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Deposit.</strong> Projects begin after a 50% deposit. The remaining 50% is
                due upon completion, before final files are delivered or the project goes live.
              </li>
              <li>
                <strong>Payment plans.</strong> For projects $2,000 and up, we can arrange a
                payment plan — the deposit plus equal monthly installments over an agreed term.
              </li>
              <li>
                <strong>Invoices are due within 7 days (Net 7).</strong> A 10-day grace period
                applies, after which overdue balances accrue a late fee of 1.5% per month (18% per
                year).
              </li>
              <li>
                <strong>Work pauses on any overdue balance.</strong> If any invoice or installment
                is more than 7 days past due, we pause all work until the account is current, and
                the timeline extends accordingly. A missed payment-plan installment makes the
                entire remaining balance immediately due.
              </li>
              <li><strong>Deposits are non-refundable</strong> (see Section 8).</li>
              <li>Applicable Georgia and Forsyth County sales tax is added to taxable goods and services.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Revisions &amp; scope of work</h2>
            <p>
              Your project includes <strong>3 rounds of revisions per deliverable or phase</strong>
              {" "}(a round is one consolidated set of feedback). Work is defined by the scope in
              your accepted proposal or agreement. Anything beyond that — additional revision
              rounds, new deliverables, added features, or a change of direction after approval — is
              out of scope and handled through a written change order, billed at $75/hour or a fixed
              add-on price we quote and you approve before the work begins.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Your responsibilities</h2>
            <p>
              You agree to provide content, materials, logins, and feedback within 7 days of each
              request; give timely, consolidated approvals; ensure any content you provide is
              accurate and that you have the right to use it; and designate one primary point of
              contact for decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Timelines &amp; client delays</h2>
            <p>
              Timelines in your proposal are good-faith estimates that assume prompt payment and
              prompt responses. Delays caused by late materials, feedback, payment, or scope changes
              extend the timeline and are not our responsibility. If we don&rsquo;t hear from you for
              14 consecutive days, we may pause your project. If a project sits inactive for 30
              consecutive days, we may treat it as abandoned — payments made are forfeited, and
              restarting requires a reactivation fee and rescheduling based on then-current
              availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Cancellation &amp; refunds</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Either party may cancel a project with written notice.</li>
              <li>
                Deposits are non-refundable because they reserve your slot and cover discovery and
                early work.
              </li>
              <li>
                On cancellation, you pay for all work performed through the cancellation date. If
                work on a phase has begun, the full amount of that phase is due.
              </li>
              <li>Final files and deliverables are released only after all amounts owed are paid in full.</li>
              <li>
                Custom print, packaging, signage, and apparel orders are non-refundable and
                non-returnable once they enter production.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Ownership &amp; intellectual property</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                On final payment in full, you receive ownership of the final, approved deliverables
                we created specifically for you.
              </li>
              <li>Until paid in full, all work, concepts, and files remain the property of {BUSINESS_NAME}.</li>
              <li>
                We retain ownership of preliminary concepts that were not selected, and of our own
                tools, templates, and working/source files unless their purchase is expressly
                included in your scope.
              </li>
              <li>
                Third-party assets — fonts, stock media, plugins, themes, platforms — are licensed
                under their own terms and may require ongoing licenses that are the Client&rsquo;s
                responsibility. We&rsquo;ll tell you when a deliverable depends on one.
              </li>
              <li>
                <strong>Portfolio rights.</strong> We may display completed work in our portfolio
                and marketing. If you need work kept confidential, tell us in writing and we&rsquo;ll
                honor a reasonable request.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">10. Print &amp; production</h2>
            <p>
              You must approve a final proof before anything goes to production; once approved, you
              are responsible for its content, spelling, layout, and specs, and we are not liable
              for errors in a proof you approved. Slight variation in color, material, and finish is
              normal in printing and is not a defect. Production is handled through our print
              pipeline and production partners, whose lead times and shipping estimates may vary.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">11. Disclaimers &amp; limitation of liability</h2>
            <p>
              Services and deliverables are provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis beyond the specific warranties, if any, stated in your service
              agreement. We do <strong>not</strong> guarantee specific business outcomes — including
              sales, revenue, traffic, conversions, search-engine rankings, or social-media results.
              To the fullest extent permitted by law, our total liability for any claim arising from
              a project is limited to the total fees you paid us for that project, and we are not
              liable for indirect, incidental, consequential, or lost-profit damages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless {BUSINESS_NAME} from claims,
              damages, and costs (including reasonable attorney&rsquo;s fees) arising from content or
              materials you provide (including claims of infringement) or from your misuse of
              deliverables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">13. Confidentiality</h2>
            <p>
              Each party agrees to keep the other&rsquo;s non-public business information
              confidential and to use it only to carry out the project.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">14. Governing law &amp; disputes</h2>
            <p>
              These Terms are governed by the laws of the State of Georgia, without regard to
              conflict-of-law rules. Any dispute will be handled in the state or federal courts
              located in Forsyth County, Georgia, and both parties consent to that venue. Before
              filing anything, both parties agree to first attempt to resolve the dispute in good
              faith by direct discussion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">15. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date shows
              the current version. Continued use of the site or our services after a change means
              you accept the updated Terms. The Terms in effect when you signed a specific service
              agreement continue to govern that project.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">16. Contact</h2>
            <ul className="list-none space-y-1 pl-0">
              <li><strong>{BUSINESS_NAME}</strong></li>
              <li>Cumming, GA (Forsyth County)</li>
              <li>
                Email:{" "}
                <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>Phone/Text: {PHONE_DISPLAY}</li>
            </ul>
            <p className="pt-4 text-sm italic opacity-70">
              These Terms are a general business agreement, not legal advice to you. For your own
              situation, consult your attorney.
            </p>
          </section>
        </article>
      </Section>
      <Footer />
    </>
  );
}
