// Shared types for the Pulse Check audit. The audit produces a tree of
// pillars → findings, plus an overall "pulse" score used to label the
// state of a site (Flatlined / Faint Pulse / Stirring / Walking).

export type Severity = "critical" | "warn" | "ok";

export type PulseLabel = "Flatlined" | "Faint Pulse" | "Stirring" | "Walking";

export type Finding = {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  // Plain-English remedy. Tied to a Branding Zombie service so the report
  // doubles as a quote for the right service line.
  remedy: string;
  service?:
    | "web-design"
    | "brand-system"
    | "graphic-design"
    | "ai-workflow"
    | "launch-package";
};

export type PillarKey =
  | "vitals"
  | "findability"
  | "architecture"
  | "voice"
  | "clarity"
  | "trust";

export type Pillar = {
  key: PillarKey;
  label: string;
  score: number; // 0–100
  pulse: PulseLabel;
  summary: string;
  findings: Finding[];
};

export type AuditResult = {
  url: string;
  finalUrl: string; // after redirects
  fetchedAt: string; // ISO
  overallScore: number;
  overallPulse: PulseLabel;
  headline: string; // short, brand-voice one-liner
  pillars: Pillar[];
};

export function pulseFromScore(score: number): PulseLabel {
  if (score >= 76) return "Walking";
  if (score >= 51) return "Stirring";
  if (score >= 26) return "Faint Pulse";
  return "Flatlined";
}
