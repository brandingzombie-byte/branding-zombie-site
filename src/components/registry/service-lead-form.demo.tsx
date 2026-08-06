/** Both tones with a mock action so submits succeed in the preview. */

"use client";

import ServiceLeadForm, {
  type ServiceLeadState,
} from "./service-lead-form";

async function mockAction(
  _prev: ServiceLeadState,
  formData: FormData,
): Promise<ServiceLeadState> {
  await new Promise((r) => setTimeout(r, 700));
  if (String(formData.get("company_website") ?? "")) {
    return { ok: true, message: "" };
  }
  if (!String(formData.get("name") ?? "").trim()) {
    return { ok: false, message: "We need a name — even a nickname works." };
  }
  return {
    ok: true,
    message: "",
    leadId: crypto.randomUUID(),
    value: 100,
  };
}

export default function ServiceLeadFormDemo() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 bg-neutral-100 p-8 lg:grid-cols-2">
      <div className="p-2">
        <ServiceLeadForm
          slug="web-design"
          serviceName="Web Design"
          action={mockAction}
          tone="light"
          copy={{
            eyebrow: "No forms to fill — okay, one tiny one",
            headline: "Tell us where to dig.",
            blurb:
              "Say what's broken about your site and we'll come back with a straight answer — price, timeline, and whether you even need a rebuild.",
            messagePlaceholder: "What's wrong with your current site?",
            cta: "Get my call back",
          }}
          onLead={(info) => console.log("lead", info)}
        />
      </div>
      <div className="rounded-2xl bg-[#111714] p-6">
        <ServiceLeadForm
          slug="logo-design"
          serviceName="Logo Design"
          action={mockAction}
          tone="dark"
          copy={{
            eyebrow: "No mood board needed yet",
            headline: "Tell us who you are.",
            blurb:
              "One sentence about your business is plenty to start. You'll get a price, a timeline, and zero contest-site nonsense.",
            messagePlaceholder: "What's the business?",
            cta: "Get my call back",
          }}
          onLead={(info) => console.log("lead", info)}
        />
      </div>
    </div>
  );
}
