// Audit check engine. Each pillar has 1–2 high-signal checks. We run all
// checks against a parsed HTML document and a snapshot of the response
// (final URL, headers, raw HTML). Output is structured so the report
// renderer doesn't need to know how the checks work.

import * as cheerio from "cheerio";
import type {
  AuditResult,
  Finding,
  Pillar,
  PillarKey,
} from "./types";
import { pulseFromScore } from "./types";

// ─── Banned-word list ───────────────────────────────────────────────────────
// Same agency-slop list the brand voice rules call out. If a prospect's
// site uses these, that's the exact thing Branding Zombie sells against.
const AGENCY_SLOP = [
  "synergy",
  "elevate",
  "unlock",
  "leverage",
  "holistic",
  "bespoke solutions",
  "storytelling",
  "digital journey",
  "craft experiences",
  "thought leader",
  "ecosystem",
  "touchpoint",
  "cutting-edge",
  "next-level",
  "seamless",
  "robust",
  "curated",
  "empower",
  "world-class",
  "best-in-class",
];

// ─── Fetch helper ───────────────────────────────────────────────────────────

export type FetchSnapshot = {
  ok: boolean;
  status: number;
  finalUrl: string;
  html: string;
  headers: Record<string, string>;
  error?: string;
};

const FETCH_TIMEOUT_MS = 12_000;

export async function fetchSite(url: string): Promise<FetchSnapshot> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Some sites block obvious bot UAs. This UA is a regular Chrome
        // string with our bot name appended so we are still identifiable
        // for any site owner reading their access logs.
        "User-Agent":
          "Mozilla/5.0 (BrandingZombiePulseCheck/1.0; +https://brandingzombiedesigns.com/free-site-audit)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const html = await res.text();
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url || url,
      html,
      headers,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      finalUrl: url,
      html: "",
      headers: {},
      error: err instanceof Error ? err.message : "fetch failed",
    };
  } finally {
    clearTimeout(t);
  }
}

// ─── Per-pillar checks ──────────────────────────────────────────────────────

type CheckCtx = {
  $: cheerio.CheerioAPI;
  snap: FetchSnapshot;
  visibleText: string;
};

function buildCtx(snap: FetchSnapshot): CheckCtx {
  const $ = cheerio.load(snap.html || "<html></html>");
  // Strip script/style/noscript, then grab visible text. Used by the
  // brand-voice check.
  const clone = $.root().clone();
  clone.find("script, style, noscript, template").remove();
  const visibleText = clone.text().replace(/\s+/g, " ").trim();
  return { $, snap, visibleText };
}

// Pillar 1 — Vitals (heuristic only, no PageSpeed dep)
function checkVitals({ $, snap }: CheckCtx): Pillar {
  const findings: Finding[] = [];

  const htmlBytes = new Blob([snap.html]).size;
  const imgs = $("img").toArray();
  const heavyImgs = imgs.filter((el) => {
    const w = parseInt($(el).attr("width") ?? "0", 10);
    const h = parseInt($(el).attr("height") ?? "0", 10);
    return !w || !h; // missing dimensions cause CLS
  });
  const lazyMissing = imgs.filter((el) => {
    const loading = ($(el).attr("loading") ?? "").toLowerCase();
    return loading !== "lazy" && loading !== "eager";
  });

  let score = 100;

  if (htmlBytes > 500_000) {
    score -= 25;
    findings.push({
      id: "vitals.html-weight",
      title: "Page weight is heavy",
      detail: `Your HTML alone is ${(htmlBytes / 1024).toFixed(0)} KB before images, fonts, or scripts even load.`,
      severity: "warn",
      remedy:
        "We trim the dead code, ship a faster build, and your page loads in under 2 seconds.",
      service: "web-design",
    });
  }

  if (heavyImgs.length >= 3) {
    score -= 20;
    findings.push({
      id: "vitals.img-dims",
      title: "Images are missing dimensions",
      detail: `${heavyImgs.length} of ${imgs.length} images don't declare width/height. That causes layout shift while the page loads — Google penalizes this.`,
      severity: "warn",
      remedy:
        "Every image gets dimensions and modern formats so your layout stops jumping around.",
      service: "web-design",
    });
  }

  if (imgs.length > 6 && lazyMissing.length / imgs.length > 0.6) {
    score -= 15;
    findings.push({
      id: "vitals.lazy-loading",
      title: "Images aren't lazy-loaded",
      detail:
        "Below-the-fold images load up front, slowing the first paint on mobile.",
      severity: "warn",
      remedy:
        "We defer everything below the fold so the hero loads first.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "vitals",
    label: "Vitals",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Page speed and stability"),
    findings,
  };
}

// Pillar 2 — Findability (SEO basics)
function checkFindability({ $ }: CheckCtx): Pillar {
  const findings: Finding[] = [];
  let score = 100;

  const title = ($("head title").first().text() ?? "").trim();
  const desc = ($('meta[name="description"]').attr("content") ?? "").trim();
  const h1Count = $("h1").length;
  const canonical = $('link[rel="canonical"]').attr("href");
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const jsonLd = $('script[type="application/ld+json"]').length;

  if (!title) {
    score -= 25;
    findings.push({
      id: "find.title",
      title: "No page title",
      detail: "Your <title> tag is empty. Google has nothing to show in search results.",
      severity: "critical",
      remedy: "We write a real title for every page that ranks for what you actually sell.",
      service: "web-design",
    });
  } else if (title.length < 25 || title.length > 65) {
    score -= 10;
    findings.push({
      id: "find.title-len",
      title: "Page title is the wrong length",
      detail: `Your title is ${title.length} characters. Sweet spot is 25–65 — under that wastes the slot, over that gets truncated.`,
      severity: "warn",
      remedy: "We rewrite titles to lead with the keyword and stay under 65 characters.",
      service: "web-design",
    });
  }

  if (!desc) {
    score -= 20;
    findings.push({
      id: "find.desc",
      title: "No meta description",
      detail:
        "Without a description, Google picks a random sentence from the page — usually the wrong one.",
      severity: "critical",
      remedy: "Every page gets a 150-character description that pulls the click.",
      service: "web-design",
    });
  } else if (desc.length < 80 || desc.length > 170) {
    score -= 8;
    findings.push({
      id: "find.desc-len",
      title: "Meta description is the wrong length",
      detail: `Description is ${desc.length} characters. Aim for 120–160.`,
      severity: "warn",
      remedy: "We tighten every description to fit the SERP without getting cut off.",
      service: "web-design",
    });
  }

  if (h1Count === 0) {
    score -= 20;
    findings.push({
      id: "find.h1",
      title: "No H1 on the page",
      detail:
        "An H1 tells Google what the page is about. You don't have one.",
      severity: "critical",
      remedy: "We restructure your headings so the page actually says what it is.",
      service: "web-design",
    });
  } else if (h1Count > 1) {
    score -= 8;
    findings.push({
      id: "find.h1-multi",
      title: "Multiple H1 tags",
      detail: `Found ${h1Count} H1s. There should be exactly one — extras dilute the signal.`,
      severity: "warn",
      remedy: "We collapse your headings to a single, focused H1 per page.",
      service: "web-design",
    });
  }

  if (!canonical) {
    score -= 8;
    findings.push({
      id: "find.canonical",
      title: "No canonical URL",
      detail:
        "Without a canonical tag, Google can split your ranking signal across duplicate URLs.",
      severity: "warn",
      remedy: "We add canonicals on every page so Google knows the real version.",
      service: "web-design",
    });
  }

  if (!ogTitle) {
    score -= 7;
    findings.push({
      id: "find.og",
      title: "Missing Open Graph tags",
      detail:
        "When someone shares your link on Facebook, LinkedIn, or iMessage, the preview is broken.",
      severity: "warn",
      remedy: "We add OG tags and a custom share image so links look intentional.",
      service: "graphic-design",
    });
  }

  if (jsonLd === 0) {
    score -= 7;
    findings.push({
      id: "find.schema",
      title: "No structured data (Schema.org)",
      detail:
        "Schema markup is what gets you stars, FAQs, and local-pack results. Yours has none.",
      severity: "warn",
      remedy:
        "We wire LocalBusiness, FAQ, and Service schema so Google can show rich results.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "findability",
    label: "Findability",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Search visibility"),
    findings,
  };
}

// Pillar 3 — Architecture (heading hierarchy, link health)
function checkArchitecture({ $ }: CheckCtx): Pillar {
  const findings: Finding[] = [];
  let score = 100;

  // Heading order check: an H3 before any H2 is a hierarchy break.
  const headings = $("h1,h2,h3,h4,h5,h6")
    .toArray()
    .map((el) => parseInt(el.tagName.replace(/h/i, ""), 10));
  let hierarchyBreaks = 0;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) hierarchyBreaks++;
  }
  if (hierarchyBreaks > 0) {
    score -= Math.min(20, hierarchyBreaks * 8);
    findings.push({
      id: "arch.heading-order",
      title: "Heading hierarchy skips levels",
      detail: `${hierarchyBreaks} place${hierarchyBreaks === 1 ? "" : "s"} on the page jump from one heading level to a deeper one (e.g. H2 → H4). Screen readers and Google both read this as broken.`,
      severity: "warn",
      remedy:
        "We rebuild your outline so every page reads top-to-bottom in logical order.",
      service: "web-design",
    });
  }

  // Empty links / "click here" / link-only buttons.
  const links = $("a").toArray();
  const vagueLinks = links.filter((el) => {
    const t = $(el).text().trim().toLowerCase();
    return ["click here", "read more", "learn more", "here", "link"].includes(t);
  });
  if (vagueLinks.length >= 3) {
    score -= 15;
    findings.push({
      id: "arch.vague-links",
      title: "Vague link text",
      detail: `${vagueLinks.length} links say things like "click here" or "learn more" with no context. Google and screen readers can't tell what they go to.`,
      severity: "warn",
      remedy: "We rewrite every link so the words say where it goes.",
      service: "web-design",
    });
  }

  // No primary nav.
  const navEls = $("nav, [role='navigation']").length;
  if (navEls === 0) {
    score -= 25;
    findings.push({
      id: "arch.no-nav",
      title: "No identifiable navigation",
      detail:
        "There's no <nav> element. People don't know where else they can go.",
      severity: "critical",
      remedy:
        "We design a navigation that points people at the next thing without making them think.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "architecture",
    label: "Architecture",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Information structure"),
    findings,
  };
}

// Pillar 4 — Brand voice (the moat — agency-slop detection)
function checkVoice({ visibleText }: CheckCtx): Pillar {
  const findings: Finding[] = [];
  let score = 100;
  const text = visibleText.toLowerCase();

  const hits: string[] = [];
  for (const word of AGENCY_SLOP) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    if (re.test(text)) hits.push(word);
  }
  if (hits.length > 0) {
    const penalty = Math.min(40, hits.length * 8);
    score -= penalty;
    findings.push({
      id: "voice.slop",
      title: "Site reads like every other agency",
      detail: `We found ${hits.length} agency cliché${hits.length === 1 ? "" : "s"} on the page: ${hits.slice(0, 6).join(", ")}${hits.length > 6 ? "…" : ""}. These words don't say anything specific.`,
      severity: hits.length > 4 ? "critical" : "warn",
      remedy:
        "We rewrite your site in plain language with specific numbers, so it sounds like you and not your competitors.",
      service: "brand-system",
    });
  }

  // Word density — too short = thin content, too long = wall of text.
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) {
    score -= 25;
    findings.push({
      id: "voice.thin",
      title: "Page is thin on content",
      detail: `Only ${wordCount} words on the page. Google reads this as "this page is not worth ranking."`,
      severity: "critical",
      remedy:
        "We add real, specific copy — not filler — so the page earns its rankings.",
      service: "brand-system",
    });
  } else if (wordCount > 2500) {
    score -= 10;
    findings.push({
      id: "voice.wall",
      title: "Wall-of-text page",
      detail: `${wordCount} words on a single page. Most visitors bounce before scrolling that far.`,
      severity: "warn",
      remedy:
        "We split it into focused pages and use scannable structure so people actually read it.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "voice",
    label: "Brand Voice",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Does it sound like you, or like every agency"),
    findings,
  };
}

// Pillar 5 — Visual clarity (color/font count, CTA presence above the fold)
function checkClarity({ $ }: CheckCtx): Pillar {
  const findings: Finding[] = [];
  let score = 100;

  // Font-family count from inline styles + linked Google Fonts.
  const inlineFonts = new Set<string>();
  $("[style*='font-family']").each((_, el) => {
    const m = ($(el).attr("style") ?? "").match(/font-family:\s*([^;]+)/i);
    if (m) inlineFonts.add(m[1].trim().toLowerCase());
  });
  const googleFontHrefs = $('link[href*="fonts.googleapis.com"]')
    .toArray()
    .flatMap((el) => {
      const href = $(el).attr("href") ?? "";
      const families = href.match(/family=([^&:]+)/gi) ?? [];
      return families.map((f) => f.replace(/family=/i, "").toLowerCase());
    });
  const fontFamilies = new Set([...inlineFonts, ...googleFontHrefs]);
  if (fontFamilies.size > 3) {
    score -= 20;
    findings.push({
      id: "clarity.fonts",
      title: "Too many fonts",
      detail: `Your page loads ${fontFamilies.size} different font families. Two is the cap — three if there's a real reason.`,
      severity: "warn",
      remedy:
        "A real type system: one display font, one body font. The page loads faster and looks intentional.",
      service: "brand-system",
    });
  }

  // Inline color count — proxy for visual chaos.
  const inlineColors = new Set<string>();
  $("[style*='color'], [style*='background']").each((_, el) => {
    const styles = ($(el).attr("style") ?? "").match(/#[0-9a-f]{3,8}|rgb[a]?\([^)]+\)/gi);
    if (styles) styles.forEach((c) => inlineColors.add(c.toLowerCase()));
  });
  if (inlineColors.size > 8) {
    score -= 15;
    findings.push({
      id: "clarity.colors",
      title: "Too many colors competing",
      detail: `${inlineColors.size} distinct colors set inline on the page. Most strong brands use 4–6 total.`,
      severity: "warn",
      remedy:
        "We define a 5-color system and use it consistently. The eye knows where to land.",
      service: "brand-system",
    });
  }

  // Above-fold CTA presence — first 2 buttons or button-like links in the doc.
  const earlyCtas = $("body")
    .find("a,button")
    .toArray()
    .slice(0, 25)
    .filter((el) => {
      const text = $(el).text().trim().toLowerCase();
      return /\b(book|call|buy|get|start|try|schedule|contact|quote|free|shop|join|sign up|order)\b/.test(
        text,
      );
    });
  if (earlyCtas.length === 0) {
    score -= 25;
    findings.push({
      id: "clarity.no-cta",
      title: "No clear CTA above the fold",
      detail:
        "Nothing in the first part of the page tells visitors what to do next. Most leave without scrolling.",
      severity: "critical",
      remedy:
        "We design a single, obvious next step at the top of every page. Conversion goes up immediately.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "clarity",
    label: "Visual Clarity",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Where the eye lands"),
    findings,
  };
}

// Pillar 6 — Trust signals
function checkTrust({ $, snap }: CheckCtx): Pillar {
  const findings: Finding[] = [];
  let score = 100;

  // SSL.
  if (!snap.finalUrl.startsWith("https://")) {
    score -= 35;
    findings.push({
      id: "trust.https",
      title: "Site is not on HTTPS",
      detail:
        "Browsers flag your site as 'Not Secure' before visitors even read it.",
      severity: "critical",
      remedy: "We move you to HTTPS in an afternoon. The browser warning goes away.",
      service: "web-design",
    });
  }

  // Phone presence (tel: link or visible phone-like number).
  const hasTel = $('a[href^="tel:"]').length > 0;
  const phoneRegex = /\b\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
  const hasVisiblePhone = phoneRegex.test($("body").text());
  if (!hasTel && !hasVisiblePhone) {
    score -= 20;
    findings.push({
      id: "trust.phone",
      title: "No phone number visible",
      detail:
        "Local buyers want to call. There's no number on the page — and no tap-to-call link if there is.",
      severity: "warn",
      remedy:
        "Phone goes in the nav with a tap-to-call link. Local SEO improves at the same time.",
      service: "web-design",
    });
  }

  // Address / NAP signal.
  const bodyText = $("body").text();
  const hasState =
    /\b(GA|Georgia|AL|FL|TN|SC|NC)\b/.test(bodyText) ||
    /\b\d{5}(-\d{4})?\b/.test(bodyText);
  if (!hasState) {
    score -= 10;
    findings.push({
      id: "trust.address",
      title: "No location info",
      detail:
        "Nothing on the page tells a visitor where you are. Local search and trust both take a hit.",
      severity: "warn",
      remedy:
        "We add city, state, and service area in the right places — visible AND in schema.",
      service: "web-design",
    });
  }

  // Stale copyright year.
  const year = new Date().getFullYear();
  const copyText = $("footer").text() || $("body").text();
  const yearsInFooter = (copyText.match(/©\s*(\d{4})|copyright\s*(\d{4})/gi) ?? [])
    .map((m) => parseInt(m.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const newest = yearsInFooter.length > 0 ? Math.max(...yearsInFooter) : 0;
  if (newest > 0 && newest < year - 1) {
    score -= 10;
    findings.push({
      id: "trust.copyright",
      title: "Copyright year is stale",
      detail: `Your footer says ©${newest}. Visitors read that as "this site has been abandoned."`,
      severity: "warn",
      remedy: "We auto-update the year in the footer once and forget about it.",
      service: "web-design",
    });
  }

  score = Math.max(0, score);
  return {
    key: "trust",
    label: "Trust Signals",
    score,
    pulse: pulseFromScore(score),
    summary: summarize(score, "Does it look real and reachable"),
    findings,
  };
}

// ─── Top-level summarizer ───────────────────────────────────────────────────

function summarize(score: number, topic: string): string {
  if (score >= 76) return `${topic}: solid. Few small things to tighten.`;
  if (score >= 51) return `${topic}: stirring, but real gaps left to fix.`;
  if (score >= 26) return `${topic}: faint pulse. This is where most visitors leave.`;
  return `${topic}: flatlined. This is actively costing you customers.`;
}

const ORDERED_PILLARS: PillarKey[] = [
  "vitals",
  "findability",
  "architecture",
  "voice",
  "clarity",
  "trust",
];

const PILLAR_RUNNERS: Record<PillarKey, (ctx: CheckCtx) => Pillar> = {
  vitals: checkVitals,
  findability: checkFindability,
  architecture: checkArchitecture,
  voice: checkVoice,
  clarity: checkClarity,
  trust: checkTrust,
};

export function runChecks(snap: FetchSnapshot): AuditResult {
  const ctx = buildCtx(snap);
  const pillars = ORDERED_PILLARS.map((k) => PILLAR_RUNNERS[k](ctx));
  const overall = Math.round(
    pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length,
  );
  const overallPulse = pulseFromScore(overall);
  return {
    url: snap.finalUrl,
    finalUrl: snap.finalUrl,
    fetchedAt: new Date().toISOString(),
    overallScore: overall,
    overallPulse,
    headline: headlineFor(overall),
    pillars,
  };
}

function headlineFor(score: number): string {
  if (score >= 76) return "Walking. A few small fixes and you're running.";
  if (score >= 51) return "Stirring. There's a pulse — and real money left on the table.";
  if (score >= 26) return "Faint pulse. Most visitors leave before they convert.";
  return "Flatlined. The site is actively losing you business.";
}
