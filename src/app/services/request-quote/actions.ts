"use server";

import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { CALENDLY_URL, EMAIL, PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import { enrollLead, splitName } from "@/lib/drip/enroll";
import { renderQuoteConfirmation, renderQuoteOwnerNotification } from "@/lib/quoteEmail";
import { KITS_BY_SLUG, isKitSlug } from "@/data/kits";

// Server action backing the custom-quote form. Validates input, accepts up
// to 5 reference files (10MB each, 20MB total cap), and fires two emails
// via Resend in parallel:
//   1. Visitor confirmation (auto-reply, branded)
//   2. Owner notification (full lead + attachments)
// Mirrors the contact + audit action patterns already in the codebase.

export type QuoteState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "description" | "services" | "files", string>>;
  // Set only on a genuine lead (not the honeypot). transaction_id + value for GA4.
  leadId?: string;
  value?: number;
};

// Rough lead value by budget band (midpoint-ish) so GA4 can rank lead quality
// instead of treating every quote as worth "1". Falls back to a nominal value.
const BUDGET_VALUE: Record<string, number> = {
  "<$1k": 500,
  "$1k–$3k": 2000,
  "$3k–$7k": 5000,
  "$7k–$15k": 11000,
  "$15k+": 20000,
  "Not sure yet": 200,
};

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

const VALID_SLUGS = new Set([
  "web-design",
  "logo-design",
  "branding",
  "ecommerce",
  "print-design",
  "social-media",
  "digital-marketing",
  "ai-workflows",
  "launch-package",
  "not-sure",
]);

const SLUG_TO_NAME: Record<string, string> = {
  "web-design": "Web Design",
  "logo-design": "Logo Design",
  "branding": "Branding",
  "ecommerce": "Ecommerce",
  "print-design": "Print Design",
  "social-media": "Social Media",
  "digital-marketing": "Digital Marketing",
  "ai-workflows": "AI Workflows",
  "launch-package": "Local Business Kit",
  "not-sure": "Not sure / mix",
};

const VALID_BUDGETS = new Set([
  "<$1k",
  "$1k–$3k",
  "$3k–$7k",
  "$7k–$15k",
  "$15k+",
  "Not sure yet",
]);

const VALID_TIMELINES = new Set([
  "ASAP / yesterday",
  "1–4 weeks",
  "1–3 months",
  "Just exploring",
]);

// File limits — keep total payload under Resend's 40MB inbound cap with headroom.
const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20MB combined
const ALLOWED_MIME_PREFIXES = [
  "image/",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument",
  "application/vnd.oasis.opendocument",
  "text/plain",
  "text/csv",
  "application/zip",
];

function sanitize(value: FormDataEntryValue | null, max = 1000): string {
  if (typeof value !== "string") return "";
  return value.replace(ZERO_WIDTH, "").trim().slice(0, max);
}

function isAllowedMime(type: string): boolean {
  if (!type) return false;
  return ALLOWED_MIME_PREFIXES.some((p) => type.startsWith(p));
}

function safeFileName(name: string): string {
  // Strip path separators + control chars; keep extension.
  return name
    .replace(/[\\/]/g, "_")
    .replace(/[\x00-\x1f\x7f]/g, "")
    .slice(0, 180) || "attachment";
}

interface ResendAttachment {
  filename: string;
  content: string; // base64
  content_type?: string;
}

async function sendResend(args: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: ResendAttachment[];
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: args.to,
        reply_to: args.replyTo,
        subject: args.subject,
        html: args.html,
        attachments: args.attachments,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export async function submitQuoteRequest(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot — silent success for bots.
  if (sanitize(formData.get("company_website"), 200)) {
    return { ok: true, message: "Got it — we'll be in touch." };
  }

  // ─── Required + optional text fields ──────────────────────────────────────
  const name = sanitize(formData.get("name"), 120);
  const businessName = sanitize(formData.get("businessName"), 120);
  const email = sanitize(formData.get("email"), 160);
  const phone = sanitize(formData.get("phone"), 40);
  const description = sanitize(formData.get("description"), 4000);
  const budget = sanitize(formData.get("budget"), 40);
  const timeline = sanitize(formData.get("timeline"), 40);
  const sourcePage = sanitize(formData.get("sourcePage"), 60);

  // Kit mode — "Choose [Kit]" buttons land here with a preselected kit.
  // The kit defines the scope + price, so services and description become
  // optional and the lead value comes from the kit price.
  const rawKit = sanitize(formData.get("kit"), 40);
  const kit = rawKit && isKitSlug(rawKit) ? KITS_BY_SLUG[rawKit] : undefined;

  const fieldErrors: NonNullable<QuoteState["fieldErrors"]> = {};
  if (!name) fieldErrors.name = "Need a name to address you by.";
  if (!email) fieldErrors.email = "We need an email to reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "That email looks off — double-check it?";
  }
  if (!kit && (!description || description.length < 10)) {
    fieldErrors.description = "A sentence or two — even just 'rebrand a barbershop' works.";
  }

  // ─── Services (multi-select) ──────────────────────────────────────────────
  const rawServices = formData.getAll("services");
  const services = Array.from(
    new Set(
      rawServices
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter((v) => VALID_SLUGS.has(v)),
    ),
  );
  if (!kit && services.length === 0) {
    fieldErrors.services = "Pick at least one service — or 'Not sure / mix'.";
  }

  // Budget + timeline: optional, but if present must be from the allowed set.
  const safeBudget = budget && VALID_BUDGETS.has(budget) ? budget : "";
  const safeTimeline = timeline && VALID_TIMELINES.has(timeline) ? timeline : "";

  // ─── Files ────────────────────────────────────────────────────────────────
  const rawFiles = formData.getAll("files");
  const files: File[] = rawFiles.filter(
    (f): f is File => f instanceof File && f.size > 0,
  );

  if (files.length > MAX_FILES) {
    fieldErrors.files = `Up to ${MAX_FILES} files, please. Send the rest in a follow-up email.`;
  }
  let totalBytes = 0;
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES) {
      fieldErrors.files = `"${f.name}" is over 10MB — try compressing or send a link instead.`;
      break;
    }
    if (!isAllowedMime(f.type || "")) {
      fieldErrors.files = `"${f.name}" isn't a format we accept (images, PDFs, docs, zips only).`;
      break;
    }
    totalBytes += f.size;
  }
  if (!fieldErrors.files && totalBytes > MAX_TOTAL_BYTES) {
    fieldErrors.files = "Total upload over 20MB — drop the largest one or send a link instead.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Almost there — a couple of fields need attention.",
      fieldErrors,
    };
  }

  // Encode attachments once for both emails. Keep size guard above.
  const attachments: ResendAttachment[] = [];
  const attachmentNames: string[] = [];
  for (const f of files) {
    const buf = Buffer.from(await f.arrayBuffer());
    const cleanName = safeFileName(f.name);
    attachments.push({
      filename: cleanName,
      content: buf.toString("base64"),
      content_type: f.type || "application/octet-stream",
    });
    attachmentNames.push(cleanName);
  }

  // ─── Resend send ──────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? "leads@brandingzombiedesigns.com";

  const servicesPretty = kit
    ? [`${kit.name} — ${kit.price}`, ...services.map((s) => SLUG_TO_NAME[s] ?? s)]
    : services.map((s) => SLUG_TO_NAME[s] ?? s);
  const kitSummary = kit
    ? `Kit quote: ${kit.name} (${kit.price} · ${kit.timeline}).\nIncludes: ${kit.features.join(
        ", ",
      )}.`
    : "";
  const fullDescription = kit
    ? [kitSummary, description].filter(Boolean).join("\n\n")
    : description;
  const emailData = {
    name,
    businessName: businessName || undefined,
    email,
    phone: phone || undefined,
    servicesPretty,
    description: fullDescription,
    budget: safeBudget || undefined,
    timeline: safeTimeline || undefined,
    attachmentNames,
    sourcePage: sourcePage && VALID_SLUGS.has(sourcePage) ? sourcePage : undefined,
    bookingUrl: CALENDLY_URL,
    contactPhone: PHONE_DISPLAY,
    contactEmail: EMAIL,
    siteUrl: SITE_URL,
  };

  if (!apiKey) {
    console.error("[quote] RESEND_API_KEY not set; submission dropped.");
    return {
      ok: false,
      message:
        "Our form is temporarily offline. Please email us directly — details on the contact page.",
    };
  }

  const visitorHtml = renderQuoteConfirmation(emailData);
  const ownerHtml = renderQuoteOwnerNotification(emailData);
  const subjectTag = kit
    ? `${kit.name} ${kit.price}`
    : servicesPretty.slice(0, 3).join(" + ") || "Custom quote";

  // Visitor email: no attachments — they have the originals.
  // Owner email: full attachments.
  const [visitorResp, ownerResp] = await Promise.all([
    sendResend({
      apiKey,
      from: fromAddr,
      to: [email],
      replyTo: EMAIL,
      subject: "Your quote request — we'll be in touch within 24 hours",
      html: visitorHtml,
    }),
    sendResend({
      apiKey,
      from: fromAddr,
      to: [EMAIL],
      replyTo: email,
      subject: `New ${kit ? "kit quote" : "quote"} — ${name}${businessName ? ` (${businessName})` : ""} · ${subjectTag}`,
      html: ownerHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    }),
  ]);

  if (!visitorResp.ok) console.error("[quote] visitor email failed:", visitorResp.error);
  if (!ownerResp.ok) console.error("[quote] owner email failed:", ownerResp.error);

  // Owner email is the load-bearing one — fail loud if it didn't go.
  if (!ownerResp.ok) {
    return {
      ok: false,
      message:
        "Something went wrong on our end. Please email us directly — details on the contact page.",
    };
  }

  // Fire-and-forget: enroll this lead in the nurture drip audience after the
  // response goes out. Enrollment must never block or fail the submission.
  try {
    const { first, last } = splitName(name);
    after(() => enrollLead(email, first, last));
  } catch (err) {
    console.error("[quote] drip enrollment scheduling failed:", err);
  }

  return {
    ok: true,
    message: visitorResp.ok
      ? `Got it — your request is in. We sent a confirmation to ${email}. We'll get back to you within 24 hours, usually same day.`
      : `Got it — your request is in. (Confirmation email had a hiccup, but we have it.) We'll reach out within 24 hours, usually same day.`,
    leadId: randomUUID(),
    value: kit ? kit.numericPrice : (BUDGET_VALUE[safeBudget] ?? 200),
  };
}
