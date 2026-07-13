// Vertical 09 — Ecommerce & DTC "Resurrection Sequence".
// Copy ported from Email Marketing/vertical-factory/09-ecommerce-dtc.md;
// E1's deliverable swapped from the not-yet-built Profit-Per-Order Calculator
// to the live Brand Checkup PDF (same job: deliver the goods + one quick win).

import { SITE_URL, CALENDLY_URL } from "@/lib/site";
import { A, P, P_LAST, greet, type Vertical } from "./types";

export const ECOMMERCE: Vertical = {
  slug: "ecommerce",
  name: "Ecommerce & DTC",
  tag: "ecommerce",
  dedicatedAudienceId: null,
  sequence: [
    {
      seq: 1,
      dayOffset: 0,
      subject: "your store's brand checkup (+ one free fix)",
      preheader:
        "The 25-point checkup is inside — plus the one free fix that kills your biggest cart-abandonment trigger tonight.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Gerry here. Your <strong>Brand Checkup</strong> is ready &mdash; 25 quick checks, ten minutes, and you'll know exactly where your store is leaking sales: <a href="${SITE_URL}/downloads/BZD-Brand-Checkup.pdf" ${A}>download it here</a>.</p>
<p ${P}>Run it against your best seller AND your most-advertised product &mdash; they're often not the same, and that gap is where money leaks. Free fix while you're in there: show shipping cost before checkout. Surprise shipping is the single biggest cart-abandonment trigger, and hiding it fools no one.</p>
<p ${P_LAST}>No pitch today. Go get that done. &mdash; Gerry</p>`,
    },
    {
      seq: 2,
      dayOffset: 2,
      subject: "rented traffic, owned brand",
      preheader:
        "Traffic is rented, and rent goes up. Brand and conversion are owned — they compound.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Every DTC founder eventually learns: traffic is rented, and rent goes up. Brand + conversion are owned &mdash; they compound.</p>
<p ${P}>A store that looks like every other theme competes on price forever; a store with an actual identity gets remembered, referred, and repurchased. I've been on your side of this &mdash; co-founded a supplement brand, lived the margins.</p>
<p ${P}>What's your biggest leak right now: conversion, retention, or margin? Reply with one word.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 3,
      dayOffset: 4,
      subject: "operator-built stores",
      preheader:
        "Pure Blanco, Planters Etc., Squeeze Me Skinny, Muscleology — store design by an operator hits different.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>What I build for DTC: custom Shopify (or headless Next.js when you outgrow it), brand identity with a point of view, PDPs designed to close, email flows so the list stops playing dead, and &mdash; for physical products &mdash; packaging and 3D renders from someone who's actually shipped CPG.</p>
<p ${P}>Pure Blanco, Planters Etc., Squeeze Me Skinny, Muscleology: <a href="${SITE_URL}/work" ${A}>brandingzombiedesigns.com/work</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 4,
      dayOffset: 7,
      subject: "the build, straight pricing",
      preheader:
        "Custom ecommerce from $3,000. Full Brand Kit $8,000+ — transparent numbers, 3-payment split available.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Custom ecommerce from <strong>$3,000</strong>. Full brand + store + automation + email flows: the Full Brand Kit at <strong>$8,000+</strong> (saves $4,000 vs &agrave; la carte), 3-payment split available.</p>
<p ${P}>Transparent numbers because &ldquo;book a call to find out&rdquo; is a red flag and we both know it.</p>
<p ${P}>15 minutes, I'll tell you exactly what your store needs and what it costs: <a href="${CALENDLY_URL}" ${A}>calendly.com/brandingzombie/15min</a></p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
    {
      seq: 5,
      dayOffset: 12,
      subject: "gut check on the store",
      preheader: "Top priority, back burner, or off the radar? No wrong answer.",
      bodyHtml: (firstName) => `${greet(firstName)}
<p ${P}>Where does the store rebuild sit &mdash; top priority, back burner, or off the radar? No wrong answer.</p>
<p ${P}>Keep the checkup; run through it again next quarter, seriously. And if the answer is &ldquo;after Q4,&rdquo; smart &mdash; reply with a month and I'll check back exactly then.</p>
<p ${P_LAST}>&mdash; Gerry</p>`,
    },
  ],
};
