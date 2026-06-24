// ─── Brand Checkup — shared data + scoring ──────────────────────────────────
// Single source of truth for the 25-point Brand Checkup. Imported by BOTH the
// client quiz (BrandCheckup.tsx) and the server email renderer (renderEmail.ts
// / actions.ts) so the score the visitor sees on screen is byte-for-byte the
// score we email out. Pure module — no "use client" / "use server".

export type IconKey = "search" | "globe" | "tag" | "doc" | "truck";

export type Question = {
  t: string; // the statement they check
  h: string; // sub-hint
  fix: string; // action-list copy if unchecked
  cond?: string; // conditional label (item is skippable)
};

export type Section = {
  key: string;
  icon: IconKey;
  title: string;
  sub: string;
  hint: string;
  service: string;
  cost: string;
  strong: string;
  mid: string;
  weak: string;
  q: Question[];
};

export type Answers = Record<string, { yes: number[]; skip: number[] }>;
export type Tier = "strong" | "mid" | "weak";

export const SECTIONS: Section[] = [
  {
    key: "google", icon: "search", title: "On Google", sub: "Can people even find you?",
    hint: "Most local buyers find you on Google before they ever call. This is where the search starts.",
    service: "Google Profile + Local SEO",
    cost: "If this is weak, the call goes to the competitor who shows up — you never even get to compete.",
    strong: "Your Google presence is doing its job — you show up, you look active, you look legit.",
    mid: "You're on Google, but not winning it. A few gaps are quietly keeping you below more-active competitors.",
    weak: "Right now you're nearly invisible where it counts most. When someone searches, your competitors appear and you don't.",
    q: [
      { t: "You've claimed your Google Business Profile.", h: "You control it, and the hours and phone are correct.", fix: "Claim & complete your Google Business Profile — it's free and it's the #1 way locals find you." },
      { t: "You have 10+ reviews — and you've replied to them.", h: "Replies signal you're alive and paying attention.", fix: "Start a simple review ask after every job — and reply to each one. Reviews are the local ranking fuel." },
      { t: "Your photos are real and recent.", h: "Actual work and storefront, last 6 months — not just a logo.", fix: "Add 10+ real, recent photos of your work. Profiles with photos get far more calls." },
      { t: "Your name, address, and phone match everywhere.", h: "Identical on Google, your site, and Facebook.", fix: "Make your name/address/phone identical everywhere — mismatches quietly bury you in search." },
      { t: "You show up on the map.", h: 'Search "[what you do] near me" — you’re there.', fix: "Get into the local map results — the fix is reviews, categories, and a complete profile." },
    ],
  },
  {
    key: "website", icon: "globe", title: "Your Website", sub: "Does it leak customers?",
    hint: "Your site is where most people decide if you're real. It's the one salesperson that works 24/7.",
    service: "Web Design",
    cost: "A slow or dated site loses jobs silently — you never find out about the customer who bounced.",
    strong: "Your website is pulling its weight — fast, current, easy to contact. That's a real engine.",
    mid: "Your site works but it's leaking contacts — old looks or hidden info are costing you calls you'll never see.",
    weak: "Your site is missing, dated, or hard to use on a phone — and that's exactly where people decide to move on.",
    q: [
      { t: "You have a real website.", h: 'A site you own — not just a Facebook page or "coming soon."', fix: "Get a real website you own — even one strong page beats a Facebook-only presence." },
      { t: "It looks right on a phone.", h: "Loads fast, nothing cut off, no pinching and zooming.", fix: "Make the site mobile-first — most of your visitors are on a phone, and a broken mobile view loses them." },
      { t: "Your phone number shows the second it opens.", h: "No scrolling, no hunting, no contact-form maze.", fix: "Put a tap-to-call number at the very top — don't make a ready buyer hunt for it." },
      { t: "It looks current.", h: "A stranger wouldn't guess it was built in 2012.", fix: "Refresh the look — a dated site makes buyers assume the business is dated too." },
      { t: "It has proof, and contact is one tap.", h: "A review on the page + a tap-to-call or tap-to-book button.", fix: "Add reviews + a one-tap contact/booking button so interest turns into a call." },
    ],
  },
  {
    key: "logo", icon: "tag", title: "Logo & Brand", sub: "Does it look like a real business?",
    hint: "People judge your prices by how you look — before you say a word.",
    service: "Logo & Branding",
    cost: "A cheap-looking brand caps what you can charge and makes great work look small-time.",
    strong: "Your brand looks the part — consistent and ownable. That's real trust and pricing power.",
    mid: "Your look is close but inconsistent — and inconsistency reads as 'not quite a real business' yet.",
    weak: "Your brand reads as 'amateur' before you open your mouth — and that costs you on price and trust.",
    q: [
      { t: "You own a real logo file.", h: "A vector (.ai/.svg/.eps/.pdf) — not just a screenshot or low-res JPG.", fix: "Get a real vector logo file — without one, every sign, shirt, and print job comes out blurry." },
      { t: "You use the same colors and fonts everywhere.", h: "One consistent look, not three versions floating around.", fix: "Lock one set of brand colors and fonts and use them everywhere — consistency = credibility." },
      { t: "Your logo works in one color.", h: "It still reads as a stamp, an embroidered hat, or a sign.", fix: "Make sure your logo has a clean one-color version — you'll need it for shirts, stamps, and signs." },
      { t: "It's readable when small.", h: "Shrunk to card or app-icon size, you can still tell what it is.", fix: "Simplify the logo so it reads at tiny sizes — if it's mush on a card, it's not working." },
      { t: "It looks like you, not a template.", h: "Not an obvious $50 Fiverr flip or a generic AI guess.", fix: "Replace the generic/AI logo with something ownable — a real mark makes you memorable, not forgettable." },
    ],
  },
  {
    key: "print", icon: "doc", title: "Print & Paper", sub: "What you hand people sticks around.",
    hint: "A card or quote outlives the conversation — it keeps selling (or un-selling) after you leave.",
    service: "Print & Packaging",
    cost: "Every sloppy handoff is a chance to look professional that you just gave away.",
    strong: "What you hand out is sharp and consistent — every card and quote builds a little more trust.",
    mid: "Your printed materials are a mixed bag — getting them consistent turns each one into a tiny ad.",
    weak: "The stuff you physically hand people is weak or missing — you're skipping easy chances to look pro.",
    q: [
      { t: "You have business cards you're proud to hand over.", h: "Not the free ones with someone else's logo on the back.", fix: "Get real business cards you're proud of — a flimsy card undercuts everything you just said." },
      { t: "You have a branded flyer, menu, or one-pager.", h: "Something that matches the rest of your look.", fix: "Create one branded flyer/menu/one-pager — a leave-behind that matches your look and keeps selling." },
      { t: "Your product looks shelf-ready.", h: "Label and packaging look like they belong in a store.", fix: "Upgrade your label/packaging so it looks shelf-ready — packaging is what makes a product walk off the shelf.", cond: "If you sell a product" },
      { t: "Your invoices and quotes are branded.", h: "Your name and look on the paperwork — not a blank template.", fix: "Brand your invoices and quotes — even paperwork is a chance to look like a real, organized business." },
      { t: "Everything printed uses the same logo and colors.", h: "One source file, no mismatched versions in the wild.", fix: "Standardize on one logo file across all print — no mismatched versions floating around." },
    ],
  },
  {
    key: "road", icon: "truck", title: "On the Road & On the Job", sub: "Your business, out in public.",
    hint: "A branded truck is seen thousands of times a month — for free. A blank one is a missed billboard.",
    service: "Signage, Wraps & Apparel",
    cost: "Every blank truck, sign, and shirt is free advertising you're driving right past.",
    strong: "Out in the field you look like a real, organized outfit — matching truck, signs, and shirts build instant trust.",
    mid: "You've got some presence out there, but it doesn't all match — pulling it together makes a moving billboard.",
    weak: "In public — trucks, signs, shirts — you're nearly invisible or off-brand. That's free advertising going unused.",
    q: [
      { t: "Your vehicle is branded.", h: "Lettering, a wrap, or magnets — not a blank work truck.", fix: "Add lettering or magnets to your vehicle — it's the cheapest advertising you'll ever buy, seen all day.", cond: "If you drive for work" },
      { t: "You have a sign people can actually see and read.", h: "Storefront, yard sign, or job-site sign.", fix: "Get a clear, readable sign — storefront, yard, or job-site — so people know you're there." },
      { t: "You and your crew wear branded shirts or hats.", h: "You look like a team, not random people.", fix: "Put your crew in branded shirts/hats — it makes a small outfit look organized and trustworthy on site." },
      { t: "Your signs and shirts match your logo.", h: "Same colors, same fonts, same business.", fix: "Match your signage and apparel to your logo — consistency is what makes it all read as one real brand." },
      { t: "It all hangs together.", h: "Truck, shirt, and card side by side — clearly the same business.", fix: "Tie it all together so truck, shirt, and card obviously belong to the same business — that's what builds recognition." },
    ],
  },
];

export type BandKey = "alive" | "pulse" | "half" | "zombie";
export const BANDS: Record<BandKey, { name: string; pill: string; copy: string }> = {
  alive: { name: "Alive & Thriving", pill: "Top tier",
    copy: "Your brand has a pulse and it shows — you're in the top slice of small businesses, and most never get here. The wins now are small and specific: a sharper label, a faster page, one more place you're consistent. <b>Worth a second set of eyes on the last few percent?</b>" },
  pulse: { name: "Showing a Pulse", pill: "Better than most",
    copy: "You're doing better than most — but there are dead spots customers notice even if you don't. Usually one weak link drags the rest down. Fix it and the whole thing levels up. <b>The fastest wins are almost always your Google listing and your website.</b>" },
  half: { name: "Half-Dead", pill: "Costing you calls",
    copy: "Hard truth: you do good work, but your brand is costing you calls right now. The good news — this is the most <b>fixable</b> score on the page, and it usually doesn't take much. A couple of targeted fixes can change how every customer sees you." },
  zombie: { name: "It's Already a Zombie", pill: "Time to resurrect",
    copy: "No sugar-coating it: your brand is working against you right now, and every truck, card, and search is leaving money on the table. But here's the upside — starting near zero, the jump is <b>dramatic</b>, and you don't have to do it all at once." },
};

export type SectionResult = {
  key: string; title: string; service: string;
  score: number; app: number; ratio: number; tier: Tier; cap: string; cost: string;
};
export type FixItem = { fix: string; svc: string; r: number };
export type Result = {
  total: number; applicable: number; scaled: number; pct: number;
  bandKey: BandKey; sections: SectionResult[]; fixes: FixItem[]; wins: string[];
};

export function emptyAnswers(): Answers {
  const a: Answers = {};
  SECTIONS.forEach((s) => (a[s.key] = { yes: [], skip: [] }));
  return a;
}

export function computeResult(answers: Answers): Result {
  let total = 0;
  let applicable = 0;
  const sections: SectionResult[] = SECTIONS.map((s) => {
    const a = answers[s.key] ?? { yes: [], skip: [] };
    const skip = a.skip.length;
    const score = a.yes.length;
    const app = s.q.length - skip;
    const ratio = app ? score / app : 1;
    const tier: Tier = ratio >= 0.8 ? "strong" : ratio >= 0.4 ? "mid" : "weak";
    total += score;
    applicable += app;
    return { key: s.key, title: s.title, service: s.service, score, app, ratio, tier, cap: s[tier], cost: s.cost };
  });
  const pct = applicable ? total / applicable : 0;
  const scaled = Math.round(pct * 25);
  const bandKey: BandKey = pct >= 0.84 ? "alive" : pct >= 0.56 ? "pulse" : pct >= 0.28 ? "half" : "zombie";

  // One representative fix per weak section, weakest first, top 3 — spreads the
  // action list across the weakest AREAS instead of stacking one section.
  const reps: FixItem[] = [];
  sections.forEach((d) => {
    if (d.ratio >= 0.8) return;
    const sec = SECTIONS.find((x) => x.key === d.key)!;
    const a = answers[d.key] ?? { yes: [], skip: [] };
    const qi = sec.q.findIndex((_q, i) => !a.yes.includes(i) && !a.skip.includes(i));
    if (qi >= 0) reps.push({ fix: sec.q[qi].fix, svc: sec.service, r: d.ratio });
  });
  reps.sort((a, b) => a.r - b.r);
  const fixes = reps.slice(0, 3);
  const wins = sections.filter((d) => d.ratio >= 0.8 && d.app > 0).map((d) => d.title);

  return { total, applicable, scaled, pct, bandKey, sections, fixes, wins };
}
