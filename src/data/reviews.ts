// ─── Real Google reviews — single source of truth ───────────────────────────
// Used by both the Testimonials UI component AND the Review/AggregateRating
// schema. Keep ONE copy here so the visible quotes and the structured data can
// never drift apart (Google requires schema review text to match what's shown).
// Source: Branding Zombie Designs Google Business Profile. All 5★.

export type Review = {
  /** Plain-text quote with real punctuation (no HTML entities). */
  quote: string;
  /** Reviewer name as it appears on Google. */
  name: string;
  /** Short descriptor of the reviewer's business (not a schema author org). */
  business: string;
  location: string;
  /** Human-readable month for the UI. */
  date: string;
  /** ISO date for schema datePublished (month precision → first of month). */
  datePublished: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Branding Zombie Designs redid our terrible website in a very short time. Gerry “got it” immediately, took pictures during our first brief meeting and even grabbed pics from Facebook so we’d have basic stuff up without sending it. He’s a can-do person — and a super nice guy, too.",
    name: "Sandra Allen",
    business: "Local restaurant & coffee shop",
    location: "Cumming, GA",
    date: "April 2026",
    datePublished: "2026-04-01",
  },
  {
    quote:
      "From start to finish, the experience was smooth, professional, and incredibly efficient. Zombie Brand delivered rapid service without compromising on quality — they truly understand how to create designs that help boost business sales and online presence.",
    name: "Ismael Medina",
    business: "Small business owner",
    location: "North Metro Atlanta",
    date: "April 2026",
    datePublished: "2026-04-01",
  },
  {
    quote:
      "Gerry and I, after a brief conversation, came up with a plan to do some flyer and graphic design for my gym. A few days later he provided me with the most valuable asset I needed to save time in my business. Work with Gerry. It’s a fantastic decision.",
    name: "Mitch Marks",
    business: "Gym owner",
    location: "Forsyth County, GA",
    date: "May 2026",
    datePublished: "2026-05-01",
  },
  {
    quote:
      "Def recommend for marketing, designs, branding, websites, printing. He knows his stuff and his turnover time is hella fast. The quality and attention to detail is chef’s kiss. His approach isn’t boring — it’s modern, it’s new. I mean, come on. ZOMBIES. It’s a whole vibe.",
    name: "Mary Jeimz",
    business: "Local Guide · Atlanta",
    location: "Atlanta, GA",
    date: "May 2026",
    datePublished: "2026-05-01",
  },
  {
    quote:
      "Thanks to Branding Zombie, I was finally able to launch my own small business. Their services were amazing, their prices were fair, and within just two days of having my website created, I started getting new business — something I had struggled to do for the past two years.",
    name: "Liz Marie",
    business: "New small business",
    location: "Forsyth County, GA",
    date: "May 2026",
    datePublished: "2026-05-01",
  },
];

export const REVIEW_COUNT = REVIEWS.length;
/** Every review is 5★, so the average is exactly 5.0. */
export const REVIEW_AVG = "5.0";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Branding+Zombie+Designs&query_place_id=ChIJtz05efo8zwwRgsxGksnsJ94";
