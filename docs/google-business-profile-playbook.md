# Google Business Profile — Claim & Populate Playbook
_Branding Zombie Designs · created 2026-06-01 · the #1 ceiling from both the SEO and AEO audits_

> **A listing already exists.** Your homepage reviews are pulled from a real Google
> Maps entity (`place_id ChIJtz05efo8zwwRgsxGksnsJ94`, `cid 16008023750998412418`).
> So this is **CLAIM + COMPLETE**, not create. **Do not create a new profile** — a
> duplicate gets both listings suppressed. Start at https://business.google.com →
> search "Branding Zombie Designs" → claim the existing one.

---

## 0) Why this matters
- **Local SEO:** a verified GBP is the only way into the Google **Map Pack** (the 3 results above organic for "web designer near me"). Today a brand search returns nothing rankable.
- **AEO:** GBP is the single highest-trust source AI engines (esp. Gemini, ChatGPT-browse, Perplexity) quote for "best [service] near me." It also back-fills the `sameAs` entity graph.

---

## 1) Prerequisites — gather BEFORE you start
- [ ] **Google account** to own it — use a dedicated business one (your `brandingzombie@gmail.com` works). Not a throwaway.
- [ ] **Real street address** (even though we'll hide it). Google needs it for verification. Home address is fine for a service-area business.
- [ ] **Verification readiness.** Google now usually requires **video verification** for service-area businesses. Be ready to record ONE continuous video showing:
  - the area/signage or your workspace,
  - tools of the trade (computer with design work open, printed samples),
  - **proof you manage the business** — log into the website CMS/host, show a business license / GA business registration, or branded invoices.
  - Postcard-to-address is the fallback if offered.
- [ ] **Decide the address display:** **Service-area business → hide the address.** (You serve clients on-site / remotely, no walk-in storefront.)

---

## 2) Field-by-field values (ready to paste — must match the website exactly)
NAP must be byte-identical to `src/lib/site.ts` or it dilutes trust.

| Field | Value |
|---|---|
| **Business name** | `Branding Zombie Designs` (no keyword stuffing — don't append "Web Design Cumming") |
| **Phone** | `(770) 744-2536` |
| **Website** | `https://brandingzombiedesigns.com` |
| **Address** | your street address, Cumming, GA 30041 — **set to hidden / service-area** |
| **Primary category** | **Website Designer** |
| **Additional categories** | Graphic Designer · Marketing Agency · Advertising Agency · Logo Designer · Print Shop (add the ones that genuinely apply; primary = Website Designer) |
| **Service areas** (cap 20) | Cumming, Forsyth County, Alpharetta, Johns Creek, Milton, Roswell, Woodstock, Canton, Marietta, Buford, Suwanee, Sugar Hill, Duluth, Lawrenceville, Dawsonville, Gainesville, Flowery Branch, Braselton, Sandy Springs, Atlanta |
| **Hours** | Mon–Fri 9:00 AM–6:00 PM · Sat 10:00 AM–2:00 PM · Sun closed _(matches the schema)_ |
| **Attributes** | Online appointments · Onsite services · Identifies as (optional, if true) Latino-owned · Languages: English, Spanish |
| **Opening date** | your actual founding date |
| **Booking link** | `https://calendly.com/brandingzombie/15min` |
| **Messaging** | Turn ON (routes to your phone) |

### Business description (≤750 chars — straight register, lightly on-brand)
```
Branding Zombie Designs builds modern websites, brand identities, print, and
AI workflows for small businesses in Cumming, GA and across Forsyth County and
North Metro Atlanta. Small shop, in-house, no agency hand-offs — most sites
launch in 10 days, not months. Want a quick read on your current site? We run a
free audit and give you a straight answer: what's costing you customers and what
we'd do about it. Services: web design (from $1,500), logo and brand systems, AI
chatbots and automation, Shopify ecommerce, social media, and print. Run by
Gerry Betancourt. Bilingual (English / Spanish). Call (770) 744-2536 or book a
free 15-minute call.
```
_(No banned agency words. Cheekier alt opener if you want it: "Got a website that died in 2016? We do resurrections — modern sites built in 10 days…")_

---

## 3) Services (add each — your open pricing is a competitive edge; most rivals hide it)
For each: name + short description + starting price.
- Web Design — Custom, conversion-focused sites in 10–14 days. **from $1,500**
- Logo & Brand Identity — Logo, colors, type, guidelines. **from $500**
- AI Workflows & Chatbots — 24/7 lead capture, automation, follow-up. **from $500**
- Shopify Ecommerce — Full store setup + theme. **from $3,000**
- Social Media Management — Content + scheduling. **from $400/mo**
- Print & Signage — Cards, flyers, banners, vehicle wraps, menus. **from $75**
- The 10-Day Launch / Startup Kit — full small-biz launch. **$997** (link to /startup-special)

## 4) Products (optional but strong) — list packages as Products with a photo + price + link
Launch Kit $997 → /startup-special · Free Site Audit → /free-site-audit · Custom Quote → /services/request-quote

---

## 5) Photos — you need real assets here (10+, this is heavily weighted)
Have already (in repo):
- [x] **Logo** (square) — `public/assets/brand-icon-1024.png`
- [x] **Cover / share image** — `public/assets/og-image.png` (1024×576-ish landscape works)
- [x] **Work samples** — portfolio PNGs in `public/assets/services/ecommerce/` (Blanco, Muscleology, Jayscotts, Planters, Squeeze)

Still need to capture/shoot:
- [ ] **Owner photo of Gerry** (face = trust; GBP rewards a real person)
- [ ] **"At work" shots** — desk/screen with a live design, print samples in hand
- [ ] **Before/after** website screenshots (great for a design studio)
- [ ] Name files with keywords (e.g., `cumming-ga-web-design-branding-zombie.jpg`) before upload

---

## 6) Reviews (you already have 5★ — leverage them)
- The 5 reviews on the listing are your proof surface. After claiming, **respond to each one** (on-brand, signed by Gerry) — response rate is a ranking signal.
- Set up a **review request flow**: short link (`g.page/r/...` review shortcut, generated once verified) texted/emailed to every client at handoff. Target a steady drip, not a burst.

## 7) Posts (ongoing — keeps the profile "active")
Seed 2–3 at launch, then ~weekly:
- Offer: "$997 10-Day Launch — 5 spots/month"
- Offer: "Free website audit — straight answer in 10 seconds"
- Update: a recent project win (e.g., Papa's Kitchen Diner)

---

## 8) ⚙️ Code step AFTER verification (closes the loop)
Once the GBP URL + any social URLs are live, add them to **`src/lib/site.ts`**:
```ts
export const SOCIAL_URLS: string[] = [
  "https://www.google.com/maps/place/?q=place_id:ChIJtz05efo8zwwRgsxGksnsJ94",
  "https://www.linkedin.com/company/branding-zombie-designs",
  "https://www.instagram.com/brandingzombiedesigns",
  // …Yelp, Facebook, Clutch, etc. as they go live
];
```
This auto-propagates to `sameAs` on the Organization + LocalBusiness schema (currently `[]`), giving AI engines the external corroboration they need. **This is the payoff that turns the on-site schema work into citations.**

---

## 9) Directory + social graph (do alongside GBP — the corroboration layer)
Priority order (these are what AI engines and Google cite for agencies):
1. [ ] **Google Business Profile** (above) — highest leverage
2. [ ] **LinkedIn** company page + Gerry's personal profile (link them)
3. [ ] **Instagram** business (repurpose the existing IG) + **Facebook** business page
4. [ ] **Yelp** business listing (AI quotes Yelp "Best 10" lists constantly)
5. [ ] **Clutch.co** + **The Manifest** — the B2B directories AI cites for "best agency/chatbot company in Atlanta"
6. [ ] **Bing Places** (mirrors GBP; feeds Copilot)
7. [ ] **Apple Business Connect** (Maps/Siri)
8. [ ] Optional: Semrush Agencies, Nextdoor Business, local Cumming/Forsyth chamber

**Rule:** identical NAP everywhere (copy from `site.ts`). Each new profile = one more independent source confirming the entity exists → the exact signal the AEO audit said you're missing (cited in 0/5 buyer queries today). Re-run the 5 test queries ~14 days after GBP + 3–4 directories are live to measure citation lift.
