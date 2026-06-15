import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { SITE_URL, BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/privacy`;
const CONTACT_EMAIL = "hello@brandingzombiedesigns.com";
const LAST_UPDATED = "June 8, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS_NAME} in Cumming, GA collects, uses, and protects your information when you visit our website or contact us.`,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BUSINESS_NAME,
    title: `Privacy Policy — ${BUSINESS_NAME}`,
    description: `How ${BUSINESS_NAME} collects, uses, and protects your information.`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: PAGE_URL },
  ],
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
            <p className="text-sm opacity-70">Last updated: {LAST_UPDATED}</p>
            <p>
              {BUSINESS_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a
              design studio based in Cumming, Georgia. This Privacy Policy explains what
              information we collect when you visit{" "}
              <a className="underline" href={SITE_URL}>brandingzombiedesigns.com</a> or contact
              us, how we use it, and the choices you have. We keep this simple and we don&rsquo;t
              sell your data.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Information we collect</h2>
            <p>We only collect what we need to respond to you and improve our site:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Information you give us.</strong> When you fill out a contact or
                quote form, request a free audit, or book a call, we collect the details you
                provide — typically your name, email address, phone number, business name, and
                anything you write in the message.
              </li>
              <li>
                <strong>Booking information.</strong> If you schedule a call, our scheduling
                provider (Calendly) collects the information needed to book and confirm the
                appointment.
              </li>
              <li>
                <strong>Usage &amp; device data.</strong> Like most websites, we automatically
                collect basic analytics — pages visited, approximate location (city/region),
                browser and device type, and referring site — through Google Analytics.
              </li>
              <li>
                <strong>Social media interactions.</strong> If you connect with us through
                LinkedIn, Instagram, or other platforms, we may see the public profile
                information and messages those platforms make available to us.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. How we use your information</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to your inquiries, quotes, and project requests.</li>
              <li>Provide, deliver, and follow up on design and marketing services.</li>
              <li>Send invoices, proposals, and project communications you&rsquo;ve asked for.</li>
              <li>Understand how our site is used so we can improve it.</li>
              <li>Comply with legal obligations and protect against fraud or abuse.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell or rent your personal information, and we
              don&rsquo;t use it for advertising profiles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Cookies &amp; analytics</h2>
            <p>
              We use cookies and similar technologies for essential site functionality and for
              Google Analytics, which helps us understand aggregate traffic patterns. You can
              disable cookies in your browser settings; some parts of the site may work
              differently if you do. We do not use cookies to build advertising profiles about
              you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. How we share information</h2>
            <p>
              We share information only with the service providers that help us run our
              business, and only as needed to provide our services. These include, for example,
              website hosting, Google Analytics, our scheduling tool (Calendly), email and
              social media management tools, and payment/accounting providers. Each is bound to
              handle your information responsibly. We may also disclose information if required
              by law or to protect our rights, safety, or property.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Data retention</h2>
            <p>
              We keep your information for as long as needed to provide our services, maintain
              business and financial records, and comply with legal obligations. When it&rsquo;s
              no longer needed, we delete or anonymize it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Your choices &amp; rights</h2>
            <p>
              You can ask us to access, correct, or delete the personal information we hold
              about you, and you can opt out of marketing communications at any time. To make a
              request, just email us at the address below and we&rsquo;ll take care of it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Children&rsquo;s privacy</h2>
            <p>
              Our website and services are intended for businesses and adults. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we&rsquo;ll revise
              the &ldquo;Last updated&rdquo; date above. Significant changes will be posted on
              this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Contact us</h2>
            <p>
              Questions about this policy or your information? Reach out:
            </p>
            <ul className="list-none space-y-1 pl-0">
              <li>
                <strong>{BUSINESS_NAME}</strong>
              </li>
              <li>Cumming, GA (Forsyth County)</li>
              <li>
                Email:{" "}
                <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>Phone/Text: {PHONE_DISPLAY}</li>
            </ul>
          </section>
        </article>
      </Section>
      <Footer />
    </>
  );
}
