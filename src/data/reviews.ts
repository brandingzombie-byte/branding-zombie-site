// ─── Real Google reviews — single source of truth ───────────────────────────
// Used by both the Testimonials UI component AND the Review/AggregateRating
// schema. Keep ONE copy here so the visible quotes and the structured data can
// never drift apart (Google requires schema review text to match what's shown).
// Source: Branding Zombie Designs Google Business Profile. All 5★.
//
// Last synced 2026-07-29 against the live profile (8 reviews, 5.0 average).
// Two rules learned that run: (1) `datePublished` must be the REAL review date,
// not a first-of-month guess — the previous copy was off by up to two weeks;
// (2) a review that disappears from Google must be deleted here too, or the
// Review schema asserts something that can no longer be verified.

export type Review = {
  /** Plain-text quote with real punctuation (no HTML entities). */
  quote: string;
  /** Reviewer name as it appears on Google. */
  name: string;
  /** Descriptor of the reviewer's business — ONLY when we actually know it. */
  business?: string;
  /** City/region — ONLY when we actually know it. */
  location?: string;
  /**
   * Google-side credential (Local Guide status / review count) for reviewers
   * whose business we don't know. Never invent a business to fill the slot —
   * the section's whole claim is "no invented names".
   */
  credential?: string;
  /** Human-readable month for the UI. */
  date: string;
  /** ISO date for schema datePublished — the actual review date. */
  datePublished: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "I’ve worked with Gerry for over 15 years on multiple projects, and he’s always been outstanding. He’s quick, professional, easy to work with, and consistently delivers high-quality results. I highly recommend him!",
    name: "Joaquin Torres",
    business: "Author · The Bloodstone",
    date: "July 2026",
    datePublished: "2026-07-27",
  },
  {
    quote:
      "Very professional. Very creative, and doesn’t use the cheap methods to get things done like ChatGPT or AI. Can help improve the look of your business!",
    name: "Jeremy Howard",
    credential: "Verified Google reviewer",
    date: "June 2026",
    datePublished: "2026-06-24",
  },
  {
    quote:
      "I highly recommend this company to anybody who’s trying to scale their business on the web. Gerry is super cool, keeps his word, and does exceptional work. Highly recommended to anybody looking for somebody to design them a web page.",
    name: "Andrew Allen",
    credential: "Local Guide · 15 reviews",
    date: "June 2026",
    datePublished: "2026-06-21",
  },
  {
    quote:
      "I needed something completed quickly, and his response time and turnaround exceeded my expectations. He communicated clearly throughout the process, delivered exactly what was promised, and made the entire experience seamless. If you’re looking for a dependable professional who provides quality work, quick turnaround times, and excellent customer service, I highly recommend him.",
    name: "Garrett McKay",
    credential: "Local Guide · 46 reviews",
    date: "June 2026",
    datePublished: "2026-06-17",
  },
  {
    quote:
      "Thanks to Branding Zombie, I was finally able to launch my own small business. Their services were amazing, their prices were fair, and within just two days of having my website created, I started getting new business — something I had struggled to do for the past two years.",
    name: "Liz Marie",
    business: "New small business",
    location: "Forsyth County, GA",
    date: "May 2026",
    datePublished: "2026-05-16",
  },
  {
    quote:
      "Gerry and I, after a brief conversation, came up with a plan to do some flyer and graphic design for my gym. A few days later he provided me with the most valuable asset I needed to save time in my business. Work with Gerry. It’s a fantastic decision.",
    name: "Mitch Marks",
    business: "Gym owner",
    location: "Forsyth County, GA",
    date: "May 2026",
    datePublished: "2026-05-09",
  },
  {
    quote:
      "From start to finish, the experience was smooth, professional, and incredibly efficient. Zombie Brand delivered rapid service without compromising on quality — they truly understand how to create designs that help boost business sales and online presence.",
    name: "Ismael Medina",
    business: "Small business owner",
    location: "North Metro Atlanta",
    date: "April 2026",
    datePublished: "2026-04-27",
  },
  {
    quote:
      "Branding Zombie Designs redid our terrible website in a very short time. Gerry “got it” immediately, took pictures during our first brief meeting and even grabbed pics from Facebook so we’d have basic stuff up without sending it. He’s a can-do person — and a super nice guy, too.",
    name: "Sandra Allen",
    business: "Local restaurant & coffee shop",
    location: "Cumming, GA",
    date: "April 2026",
    datePublished: "2026-04-15",
  },
];

/**
 * Who the reviewer is, minus the date. Joins only the parts we actually have,
 * so a reviewer with no known business never renders a dangling separator.
 * Use this anywhere the date is already shown or isn't wanted.
 */
export function reviewSource(r: Review): string {
  return [r.business, r.location, r.credential].filter(Boolean).join(" · ");
}

/** Full byline under a quote: who they are, then when they wrote it. */
export function reviewByline(r: Review): string {
  return [reviewSource(r), r.date].filter(Boolean).join(" · ");
}

/** Short label for the testimonial switcher — business if known, else credential. */
export function reviewTag(r: Review): string {
  return r.business ?? r.credential ?? r.location ?? r.date;
}

export const REVIEW_COUNT = REVIEWS.length;
/** Every review is 5★, so the average is exactly 5.0. */
export const REVIEW_AVG = "5.0";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Branding+Zombie+Designs&query_place_id=ChIJtz05efo8zwwRgsxGksnsJ94";
