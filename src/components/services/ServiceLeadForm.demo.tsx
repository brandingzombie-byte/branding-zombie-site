/**
 * Demo for the 21st.dev registry preview. Shows both tones side by side
 * with realistic per-service copy. Submits will fail in the preview
 * sandbox (the Server Action needs RESEND_API_KEY) — that's expected.
 */

import ServiceLeadForm from "./ServiceLeadForm";

export default function ServiceLeadFormDemo() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 p-8 lg:grid-cols-2">
      <div className="bg-[var(--color-fog,#E8F0E8)] p-6">
        <ServiceLeadForm
          slug="web-design"
          serviceName="Web Design"
          tone="light"
        />
      </div>
      <div className="bg-[var(--color-grave,#111714)] p-6">
        <ServiceLeadForm
          slug="logo-design"
          serviceName="Logo Design"
          tone="dark"
        />
      </div>
    </div>
  );
}
