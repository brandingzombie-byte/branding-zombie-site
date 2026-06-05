// ─── Industry landing pages — single source of truth ────────────────────────
// One data object per industry drives the /industries/[slug] route, its schema,
// and every section it renders. Adding an industry = adding an entry here; the
// route, components, and SEO are written once.
//
// Content rules (see .agents/industry-pages-plan.md + product-marketing-context.md):
// - Plain English, local, warm. No agency jargon. Speak the owner's language.
// - `intro` is a 40–60 word self-contained answer block (AEO/GEO extractable).
// - `faqs` use natural-language questions people actually ask Google/ChatGPT.
// - Every page must be UNIQUE — no templated mad-libs across industries.
// - Only claim proof we can back. `featuredWorkIds` must be real PORTFOLIO ids.

import type { ServiceSlug } from "@/data/services";

export interface IndustryFaq {
  /** Natural-language question — matches how people phrase it to search/AI. */
  q: string;
  /** Direct answer, lead with the answer. ~40–70 words. */
  a: string;
}

export interface IndustryImage {
  /** A /public path to use a real image; leave undefined to render a placeholder. */
  src?: string;
  alt: string;
  /** Shown in the on-page placeholder + the image shot list — what goes here. */
  suggestion: string;
}

export interface IndustryShot extends IndustryImage {
  label: string;
  aspect: "tall" | "wide" | "square";
}

export interface Industry {
  slug: string;
  /** Full name, e.g. "Trades & Contractors". */
  name: string;
  /** Short label for nav/index cards. */
  navLabel: string;

  // ── Hero ──
  eyebrow: string; // e.g. "HVAC · Plumbing · Electrical · Roofing"
  headlineLead: string; // first line of the H1
  headlineHighlight: string; // second line — gets the toxic underline
  subhead: string;

  // ── Hero visual (real image when src set, else an on-brand placeholder) ──
  heroImage: IndustryImage;

  // ── Intro / definition block (AEO: direct, self-contained answer) ──
  intro: string;

  // ── "Sound familiar?" pains, in the owner's words ──
  painsTitle: string;
  pains: string[];

  // ── What we make for this industry ──
  servicesTitle: string;
  servicesNote: string;
  servicesOffered: ServiceSlug[]; // subset rendered as brutalist cards

  // ── "Brand in the wild" showcase band (image slots / placeholders) ──
  showcaseTitle: string;
  showcaseNote: string;
  showcase: IndustryShot[];

  // ── Proof ──
  workTitle: string;
  workNote: string;
  featuredWorkIds: string[]; // real PORTFOLIO ids, marquee first
  testimonialName?: string; // must match a name in reviews.ts

  // ── Pricing framing (no per-industry price table to maintain) ──
  pricingTitle: string;
  pricingNote: string;
  priceAnchors: { label: string; price: string }[];

  // ── FAQ (AEO) ──
  faqs: IndustryFaq[];

  // ── SEO ──
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const INDUSTRIES: Industry[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // TRADES & CONTRACTORS  (pilot)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "trades-contractors",
    name: "Trades & Contractors",
    navLabel: "Trades & Contractors",

    eyebrow: "HVAC · Plumbing · Electrical · Roofing · Contractors",
    headlineLead: "Logos, truck wraps & websites",
    headlineHighlight: "for the trades.",
    subhead:
      "You do great work. Your brand should prove it before you even pull into the driveway. Flat-rate logos, vehicle graphics, signs, shirts, and websites for HVAC, plumbing, electrical, roofing, and contractor businesses across Cumming and North Metro Atlanta.",

    heroImage: {
      src: "/assets/industries/trades-contractors/concrete-pump-truck-wrap-cumming-ga.webp",
      alt: "Concrete pump truck wrapped with a custom Pumping the Keys logo at a Cumming, GA job site — vehicle wrap design by Branding Zombie Designs",
      suggestion:
        "A dual-cab work truck or service van with a clean, freshly-installed wrap — brand colors and phone number readable from across the street. Golden hour, job site or driveway.",
    },

    intro:
      "Branding Zombie Designs is a Cumming, GA studio that builds brands for trades and contractors — logos, truck wraps, yard signs, shop shirts, and websites that get you found on Google. Flat prices, fast turnaround, and you talk to the owner directly. No retainers, no account managers.",

    painsTitle: "Sound familiar?",
    pains: [
      "Your logo's from 2013 and it looks like it. The truck lettering is peeling and the business cards match nothing.",
      "A homeowner Googles “HVAC near me” and your competitor shows up first — even though you've been in Forsyth County twice as long.",
      "You grabbed a $40 logo off Fiverr, and the file is useless the second you need it big enough for a truck wrap.",
      "Every quote is either suspiciously cheap or a $15,000 “brand strategy engagement” you don't need.",
      "Your crew shows up in mismatched shirts and the yard signs look like a ransom note.",
    ],

    servicesTitle: "What we make for trades",
    servicesNote:
      "Pick the piece you need today — the logo, the truck, the website — and add the rest as the business grows. Everything's quoted flat before we start.",
    servicesOffered: [
      "logo-design",
      "print-design",
      "web-design",
      "branding",
      "digital-marketing",
    ],

    showcaseTitle: "Your brand, everywhere it needs to be",
    showcaseNote:
      "One logo, applied across every place a homeowner sees you — the truck, the crew, the yard, the mailbox.",
    showcase: [
      {
        label: "Vehicle wraps",
        aspect: "wide",
        src: "/assets/industries/trades-contractors/commercial-cleaning-van-wrap-design.webp",
        alt: "White commercial cleaning van with a full Corporate Sanitation vinyl wrap — van wrap design for trades, North Metro Atlanta",
        suggestion:
          "Full-side wrap design mocked onto a white service van — bold brand colors, big phone number, license number, and service icons.",
      },
      {
        label: "Crew shirts",
        aspect: "tall",
        src: "/assets/industries/trades-contractors/contractor-branded-crew-shirt-jobsite.webp",
        alt: "Contractor on a job site in a navy polo with an embroidered KMR Construction logo — branded crew apparel design, Forsyth County GA",
        suggestion:
          "Branded crew tee or hi-vis shirt on a contractor — logo on the chest, optional back print. Clean studio or on-site shot.",
      },
      {
        label: "Yard signs",
        aspect: "square",
        src: "/assets/industries/trades-contractors/construction-yard-sign-design-cumming-ga.webp",
        alt: "Miami Pavement Supply site sign staked at a construction job — contractor yard sign design, Cumming GA",
        suggestion:
          "Corrugated yard sign staked in a front lawn — logo, service line, and phone. The kind of sign neighbors photograph.",
      },
      {
        label: "Cards & door magnets",
        aspect: "wide",
        src: "/assets/industries/trades-contractors/contractor-business-cards-door-magnet.webp",
        alt: "Corporate Sanitation business cards and a magnetic truck-door sign — contractor print design by Branding Zombie Designs",
        suggestion:
          "Flat-lay of business cards next to a magnetic truck-door sign in matching brand colors, on a workbench.",
      },
    ],

    workTitle: "Recent work for trades & local businesses",
    workNote:
      "Real contractors, real local businesses — brand, web, and print built to win the next job.",
    featuredWorkIds: ["sharp-edge", "miami-pavement-logo", "enigma-computers"],
    testimonialName: "Ismael Medina",

    pricingTitle: "Flat prices. Quoted before we start.",
    pricingNote:
      "No hourly surprises, no retainers. You'll know the number before you say yes — and you'll own every file when we're done.",
    priceAnchors: [
      { label: "Logo + brand files", price: "from $750" },
      { label: "Truck wrap / vehicle graphics design", price: "custom quote" },
      { label: "Website that gets you found", price: "from $1,500" },
    ],

    faqs: [
      {
        q: "How much does a logo for a trades business cost?",
        a: "Logos start at $750 and include the file formats you actually need — vector files for truck wraps and signs, plus web and print versions. That's the difference between a real logo and a $40 Fiverr file that falls apart the moment you scale it up for a vehicle.",
      },
      {
        q: "Do you design truck wraps and vehicle lettering?",
        a: "Yes. We design full vehicle wraps, magnetic door signs, and cut-vinyl lettering, delivered print-ready to your installer's specs. If you don't have an installer, we can point you to good ones in Forsyth County and North Metro Atlanta.",
      },
      {
        q: "Can you get my HVAC or plumbing business to show up on Google?",
        a: "Yes. We set up and optimize your Google Business Profile, build a fast website with local SEO baked in, and structure it so you rank for “[your trade] near me” searches in the towns you actually serve. Ranking takes months, but starting with a site built for it is the difference between fighting uphill and downhill.",
      },
      {
        q: "Do I have to sign up for a monthly retainer?",
        a: "No. Everything is flat-rate and quoted before we start. Pay for the logo, the wrap, or the website you need right now — add the rest as you grow. No contracts, no account managers, no surprise invoices.",
      },
      {
        q: "How fast can you turn around a logo and truck graphics?",
        a: "Most logos are done in about a week. Truck wrap and signage artwork usually follows within a few days of logo approval. If you've got a deadline — a new truck, a trade show, a grand opening — tell us and we'll work to it.",
      },
      {
        q: "Do you only work with businesses in Cumming?",
        a: "Cumming and Forsyth County are home base, but we work with trades and contractors across North Metro Atlanta — Alpharetta, Johns Creek, Roswell, Woodstock, Buford, Dawsonville, and the rest of the GA-400 corridor. Local pickup and in-person meets are easy if you're nearby.",
      },
    ],

    seo: {
      title:
        "Branding & Web Design for Trades & Contractors in Cumming, GA",
      description:
        "Logos, truck wraps, signs, shirts, and websites for HVAC, plumbing, electrical, roofing, and contractor businesses in Cumming & North Metro Atlanta. Flat prices, fast turnaround, you own every file.",
      keywords: [
        "HVAC logo design",
        "contractor branding Cumming GA",
        "truck wrap design Forsyth County",
        "trades website design Georgia",
        "plumber logo design",
        "roofing company branding",
        "electrician website Cumming",
        "vehicle wrap design North Metro Atlanta",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RESTAURANTS & FOOD SERVICE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "restaurants",
    name: "Restaurants & Food Service",
    navLabel: "Restaurants",

    eyebrow: "Cafés · Diners · Food Trucks · Bakeries",
    headlineLead: "Menus, signage & websites",
    headlineHighlight: "that make the food look as good as it tastes.",
    subhead:
      "Logos, printed menus, window signage, to-go packaging, and online-ordering websites for independent restaurants, cafés, food trucks, and bakeries across Cumming, Forsyth County, and North Metro Atlanta.",

    heroImage: {
      src: "/assets/industries/restaurants/restaurant-storefront-branding-cumming-ga.webp",
      alt: "Independent diner storefront at dusk with a hand-painted window logo and string lights — restaurant branding by Branding Zombie Designs, Cumming GA",
      suggestion:
        "Warm dusk shot of an independent diner storefront with a hand-painted window logo glowing under string lights, a framed menu by the door, and a couple walking in — local, inviting, and clearly not a chain.",
    },

    intro:
      "We brand independent restaurants, cafés, food trucks, and bakeries across Cumming, Forsyth County, and North Metro Atlanta — logos, printed menus, window and storefront signage, to-go packaging, and websites with online ordering you actually own. Flat prices, fast turnaround, and the owner answers the phone — not a call center.",

    painsTitle: "The food's great. The brand is fighting you.",
    pains: [
      "Your menu was built in Word, printed at the office store, and it still has three fonts and a clip-art coffee cup on it.",
      "Every online order through the third-party app skims 25 to 30 percent off the top, and customers think that's your real price.",
      "The sign out front, the to-go cups, and the Instagram bio all use a different logo, so nobody connects them to the same place.",
      "Your food photos are phone shots under yellow kitchen light — the burger looks sad, even though it's the best one in town.",
      "Your Google listing has the old hours, the wrong phone number, and a blurry photo someone else posted three years ago.",
    ],

    servicesTitle: "What restaurants actually hire us for",
    servicesNote:
      "Most spots start with the logo and menu, then add a site with ordering once they're tired of paying app fees on every plate.",
    servicesOffered: [
      "branding",
      "logo-design",
      "print-design",
      "web-design",
      "ecommerce",
    ],

    showcaseTitle: "Your brand, from the table to the curb",
    showcaseNote:
      "The point is that the menu, the window, the cup, and the post all look like the same restaurant — so people remember you.",
    showcase: [
      {
        label: "Printed dine-in menu",
        aspect: "tall",
        src: "/assets/industries/restaurants/restaurant-menu-design-cumming-ga.webp",
        alt: "Clean printed single-page restaurant menu on a wood table — restaurant menu design, Forsyth County GA",
        suggestion:
          "Overhead shot of a single-page printed menu on a butcher-block table, organized and easy to read, next to a coffee mug and a fork — no clip art, clear prices, one consistent typeface.",
      },
      {
        label: "Storefront window sign",
        aspect: "wide",
        src: "/assets/industries/restaurants/cafe-window-sign-design.webp",
        alt: "Café front window with a cut-vinyl logo and hours plus a sidewalk A-frame — café signage design, North Metro Atlanta",
        suggestion:
          "Street-level photo of a café window with the logo cut in vinyl and 'OPEN' hours below, sunlight catching the glass, sidewalk and a chalkboard A-frame just outside.",
      },
      {
        label: "Branded to-go cups",
        aspect: "square",
        src: "/assets/industries/restaurants/branded-to-go-coffee-cups-design.webp",
        alt: "Branded to-go coffee cups and a kraft take-out box on a café counter — restaurant packaging design, Cumming GA",
        suggestion:
          "A pair of to-go coffee cups and a kraft take-out box on a counter, all stamped with the same logo, a hand reaching for one — proof the brand follows the food out the door.",
      },
      {
        label: "Mouth-watering social post",
        aspect: "square",
        src: "/assets/industries/restaurants/restaurant-social-media-food-post.webp",
        alt: "Close-up food photo styled as a square Instagram post with a restaurant logo — restaurant social media design, Cumming GA",
        suggestion:
          "Tight, well-lit close-up of a signature dish — steam, glossy sauce, a fork pulling a bite — framed as a square Instagram post with the logo subtly in the corner.",
      },
    ],

    workTitle: "Restaurant and food-brand work",
    workNote:
      "A mix of a real Georgia diner with a live site and packaged food brands we've branded shelf-to-checkout. Real work, not stock mockups.",
    featuredWorkIds: [
      "papas-kitchen",
      "365-creamers",
      "365-functional-foods",
      "slabachatti-candy",
    ],
    testimonialName: "Sandra Allen",

    pricingTitle: "Plain prices, no surprises",
    pricingNote:
      "Flat quotes up front, Georgia sales tax where it applies, and local pickup or delivery around Cumming. No retainers and no monthly fees just to keep your menu updated.",
    priceAnchors: [
      { label: "Logo + brand files", price: "from $750" },
      { label: "Menu + print design", price: "from $75" },
      { label: "Website with online ordering", price: "from $1,500" },
    ],

    faqs: [
      {
        q: "How much does a logo for a restaurant cost?",
        a: "A restaurant logo starts at $750 and includes the files you actually need — versions for your sign, your menu, your cups, and your Google profile, in both color and one-color so it prints clean on anything. Flat price, no per-revision surprises. Most cafés and diners land in the $750 to $1,500 range depending on how much extra branding they want.",
      },
      {
        q: "Can you design a menu that doesn't look like a Word document?",
        a: "Yes — menus are one of the most common things we do, starting at $75. We lay it out so it's easy to read, matches your logo and signage, and prints clean for dine-in, takeout, or a window display. You get print-ready files plus an editable version, so swapping a price or a special doesn't mean starting over.",
      },
      {
        q: "Can you build a website where customers order directly instead of through DoorDash?",
        a: "Yes. We build restaurant sites with online ordering you own, starting at $1,500, so the 25 to 30 percent that third-party apps skim off each order stays with you. It works on phones, ties into your menu and branding, and you keep the customer relationship instead of renting it from an app.",
      },
      {
        q: "Do you work with food trucks and small cafés, or just sit-down restaurants?",
        a: "All of them — food trucks, cafés, diners, bakeries, and ghost kitchens. A food truck needs a logo big and bold enough to read from across a lot; a bakery needs labels and a pretty case sign. We size and build the brand around how your customers actually find and order from you.",
      },
      {
        q: "Are you local to Cumming and Forsyth County?",
        a: "Yes. Branding Zombie Designs is based in Cumming, GA, and works with restaurants across Forsyth County and North Metro Atlanta. That means we can meet in person, drop off proofs, and look at your actual space and signage. You call the number and the owner — Gerry — answers, not a call center.",
      },
      {
        q: "How long does it take to get my new menu and signage?",
        a: "Most restaurant logos and menus turn around in about a week, and a full site with online ordering usually runs two to four weeks. We give you a real timeline up front and stick to it — you've got a restaurant to run and a grand opening or season that won't wait.",
      },
    ],

    seo: {
      title: "Restaurant Branding, Menus & Websites in Cumming, GA",
      description:
        "Logos, printed menus, signage, packaging, and online-ordering websites for independent restaurants, cafés, food trucks, and bakeries in Cumming and North Metro Atlanta. Flat prices, fast turnaround, owner-run.",
      keywords: [
        "restaurant logo design Cumming GA",
        "restaurant menu design Forsyth County",
        "cafe branding North Metro Atlanta",
        "food truck logo design",
        "restaurant website online ordering",
        "bakery branding Georgia",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SALONS & BARBERSHOPS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "salons-barbershops",
    name: "Salons & Barbershops",
    navLabel: "Salons & Barbershops",

    eyebrow: "Barbershops · Hair · Nails · Lash & Brow · Spa",
    headlineLead: "Logos, booking sites & price menus",
    headlineHighlight: "for the chair.",
    subhead:
      "Logos, window decals, price menus, gift cards, and a website with online booking for barbershops, hair, nail, lash, and spa owners across Cumming, Forsyth, and North Metro Atlanta.",

    heroImage: {
      src: "/assets/industries/salons-barbershops/barbershop-storefront-logo-cumming-ga.webp",
      alt: "Gentlemens Cutz barbershop storefront with a vinyl logo decal on the window and a barber working inside — barbershop branding in Cumming, GA",
      suggestion:
        "Shot through the glass of a Forsyth County barbershop at golden hour — a sharp logo decal on the door, price list visible on the wall, and a barber mid-fade so you can tell it is a real, busy shop and not a stock photo.",
    },

    intro:
      "We build brands for barbershops and salons across Cumming, Forsyth County, and North Metro Atlanta — logos, window decals, printed price menus, gift and loyalty cards, branded apparel, and websites with online booking that keep the chair full. Flat prices, fast turnaround, and you work straight with the owner, Gerry.",

    painsTitle: "Sound familiar?",
    pains: [
      "Your sign looks like the three other shops in the same strip mall, so first-timers walk past your door and into theirs.",
      "Instagram is your only storefront, the link in your bio is broken, and people DM “are you open?” instead of booking.",
      "There's no online booking, so your chair sits empty between walk-ins while you text back and forth to set one appointment.",
      "Walk-ins stand at the counter asking “how much for a fade?” because your prices live in your head, not on the wall.",
      "Your gift cards are index cards and your loyalty punch cards are printed at home — they look homemade next to a $200 service.",
    ],

    servicesTitle: "What salons and shops actually buy",
    servicesNote:
      "Most owners start with a logo and a booking site, then add the price menu, window decal, and gift cards once the brand is locked in. You can do it all at once or one piece at a time.",
    servicesOffered: [
      "logo-design",
      "branding",
      "web-design",
      "print-design",
      "social-media",
    ],

    showcaseTitle: "Your brand in the wild",
    showcaseNote:
      "These are the pieces that turn a person on the sidewalk into someone sitting in your chair. We design them to match, from your door to your gift card.",
    showcase: [
      {
        label: "Window & door decal",
        aspect: "wide",
        src: "/assets/industries/salons-barbershops/barbershop-window-decal-design.webp",
        alt: "Gentlemens Cutz logo as a cut-vinyl decal on a barbershop glass door — barbershop window decal design, Forsyth County GA",
        suggestion:
          "A clean vinyl decal on a salon's front door — logo, tagline, and hours — photographed from the sidewalk with the lit interior glowing behind the glass.",
      },
      {
        label: "Wall price menu",
        aspect: "tall",
        src: "/assets/industries/salons-barbershops/barbershop-price-list-menu-design.webp",
        alt: "Framed Gentlemens Cutz price menu by the mirror station — barbershop price list design, Cumming GA",
        suggestion:
          "A framed price menu on the wall beside the mirror station — services and prices laid out clean enough to read from the waiting bench, no handwriting in sight.",
      },
      {
        label: "Branded apron & towels",
        aspect: "square",
        src: "/assets/industries/salons-barbershops/barbershop-branded-apron-towels.webp",
        alt: "Barber apron and towels embroidered with the Gentlemens Cutz logo — branded barbershop apparel design",
        suggestion:
          "A folded stack of black towels and a stylist's apron, each with the embroidered shop logo, staged on the station next to the clippers.",
      },
      {
        label: "Gift & loyalty cards",
        aspect: "wide",
        src: "/assets/industries/salons-barbershops/barbershop-gift-loyalty-cards-design.webp",
        alt: "Gentlemens Cutz gift card and loyalty punch card on the counter — barbershop print design by Branding Zombie Designs",
        suggestion:
          "A printed gift card and matching loyalty punch card fanned out on the front counter — thick stock, foil logo, the kind a client actually keeps in their wallet.",
      },
    ],

    workTitle: "Grooming & beauty brands we've built",
    workNote:
      "Real grooming and beauty work — a barbershop flyer, beard and grooming labels, and shelf-ready beauty lines. The same eye that makes a product pop on a shelf makes your shop pop on a sidewalk.",
    featuredWorkIds: [
      "gentlemencutz-flyer",
      "thrasher-beard-oil",
      "luxury-life",
      "sea-la-bella",
    ],
    testimonialName: "Liz Marie",

    pricingTitle: "Flat prices, no retainers",
    pricingNote:
      "Real starting prices, not “let's hop on a call.” You'll get a flat quote before any work starts, and Georgia sales tax is the only thing added on top. No monthly retainer, no account manager.",
    priceAnchors: [
      { label: "Logo + brand files", price: "from $750" },
      { label: "Booking website", price: "from $1,500" },
      { label: "Printed price menu", price: "from $75" },
    ],

    faqs: [
      {
        q: "How much does a logo for a barbershop or salon cost?",
        a: "A custom logo for a barbershop or salon starts at $750 and includes the full file set — versions for your window decal, your Instagram, signage, and gift cards. That flat price covers the design and revisions, so a Fiverr file that's too small to blow up on a door isn't your problem.",
      },
      {
        q: "Can you build a salon website with online booking?",
        a: "Yes. We build salon and barbershop websites with online booking built in, starting at $1,500, so clients book themselves instead of DMing you. It connects to the booking tool you already use, shows your services and prices, and works on a phone — which is where almost everyone finds you.",
      },
      {
        q: "Do you make printed price menus and window decals?",
        a: "Yes. Printed price menus start at $75, and window or door decals are a custom quote based on size. We design them to match your logo so the prices on your wall, the decal on your glass, and your gift cards all look like one shop — not three different printers.",
      },
      {
        q: "How fast can you turn this around?",
        a: "Most logos land in about a week, and a booking website usually takes two to three weeks. Print pieces like menus and gift cards are faster once the brand is set. You're working with Gerry directly, so there's no agency queue — one new client launched her business and got bookings within two days of her site going live.",
      },
      {
        q: "I'm a first-time shop owner and only have Instagram. Where do I start?",
        a: "Start with a logo and a booking site — that gives you a real storefront instead of a bio link that breaks. From there we add the window decal, price menu, and gift cards. You don't need everything at once; we build it in the order that puts butts in your chair fastest.",
      },
      {
        q: "Do you work with salons in Cumming and Forsyth County?",
        a: "Yes — Branding Zombie Designs is based in Cumming, GA and works with barbershops, hair, nail, lash, brow, and spa owners across Forsyth County and North Metro Atlanta. Being local means Gerry can stop by, shoot photos of your actual shop, and get the signage details right the first time.",
      },
    ],

    seo: {
      title: "Salon & Barbershop Branding in Cumming, GA",
      description:
        "Logos, booking websites, price menus, window decals, and gift cards for barbershops, hair, nail, lash, and spa owners in Cumming, Forsyth County, and North Metro Atlanta. Flat prices, fast turnaround.",
      keywords: [
        "barbershop logo design Cumming GA",
        "salon branding Forsyth County",
        "hair salon website with online booking",
        "barbershop window decal North Metro Atlanta",
        "salon price menu design",
        "nail and lash salon branding Georgia",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUPPLEMENT & CPG BRANDS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "supplement-cpg-brands",
    name: "Supplement & CPG Brands",
    navLabel: "Supplements & CPG",

    eyebrow: "Supplements · Beverages · Packaged Goods · DTC & Amazon",
    headlineLead: "Labels, packaging & brand families",
    headlineHighlight: "that pass print and sell on the shelf.",
    subhead:
      "Label and packaging design, full brand families across SKUs, Amazon and Shopify listings, and print-ready files for supplement, beverage, and packaged-goods founders — from a Cumming, GA studio with 40+ labels under its belt.",

    heroImage: {
      src: "/assets/industries/supplement-cpg-brands/supplement-brand-family-lineup-greenleaf.webp",
      alt: "GreenLeaf CBD Energy, Rest and Stress dropper bottles as a brand-family lineup — supplement label and packaging design, Cumming GA",
      suggestion:
        "A clean studio render of five SKUs from a single supplement line — a tub, two bottles, a pouch, and a box — lined up shoulder to shoulder so they obviously read as one family, lit bright on a seamless dark surface.",
    },

    intro:
      "Branding Zombie Designs is a Cumming, GA studio that builds supplement, beverage, and CPG brands for founders across Forsyth County and North Metro Atlanta — label and packaging design, full SKU families, Amazon and Shopify listings, and print-ready files your co-packer accepts on the first pass. Flat prices, fast turnaround, and you work with the owner directly.",

    painsTitle: "If you're launching a product, you already know this feeling",
    pains: [
      "Your designer handed you a pretty PDF, then your co-packer kicked it back — wrong dieline, no bleed, art that won't wrap the bottle. Now you're the one stuck in the middle.",
      "Your label looks fine on your laptop and vanishes the second it's a one-inch Amazon thumbnail next to brands with real money.",
      "You've got three SKUs and they look like three different companies — nothing shared, so nothing reads as a line on the shelf.",
      "The Supplement Facts panel and your claims got pasted in by hand, and you're not sure any of it is compliant or actually print-ready.",
      "Next to the funded competitor two slots over, your product looks like the store brand — and shoppers reach right past it.",
    ],

    servicesTitle: "What founders hire us for",
    servicesNote:
      "Most launches start with branding and label or packaging design, then add listings and ads once the product is real. Pick what you need now — there's no retainer and no account manager in the middle.",
    servicesOffered: [
      "branding",
      "print-design",
      "ecommerce",
      "web-design",
      "social-media",
      "digital-marketing",
    ],

    showcaseTitle: "The work, in the wild",
    showcaseNote:
      "A few of the places a finished CPG brand has to show up — the hero render, the Amazon listing, the retail shelf, and the ad that stops the scroll.",
    showcase: [
      {
        label: "Hero bottle render",
        aspect: "tall",
        src: "/assets/industries/supplement-cpg-brands/body-butter-product-photography-luxury-life.webp",
        alt: "Luxury Life Fresh Attraction body butter tin styled on a marble vanity — CPG product photography and label design",
        suggestion:
          "A studio-lit hero render of one finished tub or bottle, front label crisp and readable, soft reflection underneath — the shot that goes on the PDP, the pitch deck, and the Amazon main image before a single unit is printed.",
      },
      {
        label: "Amazon listing layout",
        aspect: "wide",
        src: "/assets/industries/supplement-cpg-brands/supplement-amazon-listing-design-protein.webp",
        alt: "Pompeii Fit Protein Amazon A+ listing layout with benefit callouts — supplement listing design by Branding Zombie Designs",
        suggestion:
          "A laptop-and-phone mockup of an Amazon A+ listing — main thumbnail, ingredient callout strip, and a comparison block — laid out so the brand holds up at thumbnail size and on a tiny screen.",
      },
      {
        label: "On the retail shelf",
        aspect: "wide",
        src: "/assets/industries/supplement-cpg-brands/supplement-retail-shelf-design-cumming-ga.webp",
        alt: "Athletes Only CBD products faced out on a retail wellness shelf — supplement retail packaging design, North Metro Atlanta",
        suggestion:
          "A real-shelf shot of three or four SKUs from one line sitting together in a vitamin aisle, facing out, clearly reading as a family and out-fronting the generic black-and-red tubs beside them.",
      },
      {
        label: "Paid social ad",
        aspect: "square",
        src: "/assets/industries/supplement-cpg-brands/supplement-paid-social-ad-design.webp",
        alt: "Amino supplement paid-social ad set in a gym — supplement ad creative design, Cumming GA",
        suggestion:
          "A scroll-stopping Meta-style ad — product comped into a gym or beach scene with one punchy headline and the flavor cue — built square for feed and ready to run as paid creative.",
      },
    ],

    workTitle: "Brands we've put on shelves and listings",
    workNote:
      "A slice of 40+ label and packaging projects — from full multi-SKU brand families to single hero SKUs built to win a crowded shelf.",
    featuredWorkIds: [
      "betancourt-family",
      "muscleology",
      "simply-nutrition-lineup",
      "goodlife-creatine",
      "electro-shock",
    ],
    testimonialName: "Ismael Medina",

    pricingTitle: "Flat prices, no retainers",
    pricingNote:
      "Real numbers to anchor on. Final scope depends on SKU count, packaging complexity, and whether you need co-packer coordination and 3D renders — we lock it on a quick call before any work starts.",
    priceAnchors: [
      { label: "Single SKU label + print files", price: "from $750" },
      { label: "Full brand + multi-SKU family", price: "from $2,500" },
      { label: "Amazon / Shopify listing build", price: "custom quote" },
    ],

    faqs: [
      {
        q: "How much does it cost to design a supplement label?",
        a: "A single SKU label with print-ready files starts around $750. That covers the front and back panel, a compliant Supplement Facts layout, and a dieline-matched, bleed-set file your co-packer can run. Full multi-SKU brand families start around $2,500. Final price depends on SKU count and packaging complexity, and we confirm it before any work begins.",
      },
      {
        q: "Will my label actually pass the co-packer's print specs?",
        a: "Yes — that's the whole point of how we build files. We match your printer or co-packer's dieline, set the bleed, use the right color profile, and outline the type so nothing reflows. The owner has run production between brands and trade printers for years, so files go out built to spec instead of getting kicked back on the first pass.",
      },
      {
        q: "Can you make my supplement facts panel and claims compliant?",
        a: "Yes — we format your Supplement Facts panel to FDA spec and make it print-ready, and we flag structure/function claims and required disclaimers before they become a problem. We're a design studio, not a regulatory attorney, so we don't sign off as legal compliance — but your panel will be formatted correctly, and we'll tell you straight when something needs a real compliance review.",
      },
      {
        q: "Can you design a whole product line so the SKUs match?",
        a: "Yes — multi-SKU brand families are the deepest part of our work. We build one label layout, then skin it across flavors and products so eight SKUs read as one line on the shelf and on Amazon. Betancourt Nutrition and Simply Nutrition are both full families we built this way, unifying ten-plus products under a single look.",
      },
      {
        q: "Do you build the Amazon and Shopify listings too, not just the label?",
        a: "Yes. Beyond the label we build Amazon A+ content, listing thumbnails sized to read at one inch, Shopify product pages, and 3D hero renders for the PDP — like the live store we built for Muscleology. You can start with packaging and add the listing and ad assets once the product is real. There's no retainer either way.",
      },
      {
        q: "How long does a supplement label or brand take?",
        a: "A single SKU label typically runs one to two weeks; a full multi-SKU family is usually three to five weeks from kickoff. If you're up against a co-packer slot or a launch date, tell us upfront and we'll work to the deadline. You deal with the owner directly the whole way — no account manager passing notes.",
      },
    ],

    seo: {
      title: "Supplement & CPG Packaging Design in Cumming, GA",
      description:
        "Label and packaging design, full SKU brand families, and Amazon/Shopify listings for supplement, beverage, and CPG founders. Print-ready files your co-packer accepts. Cumming, GA. Flat prices, no retainers.",
      keywords: [
        "supplement label design",
        "CPG packaging design",
        "supplement facts panel design",
        "Amazon listing design supplements",
        "multi-SKU brand family design",
        "print-ready label files co-packer",
        "beverage packaging design Georgia",
        "supplement branding Cumming GA",
      ],
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES.map((i) => i.slug);
}
