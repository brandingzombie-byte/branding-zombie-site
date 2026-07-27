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

  // ══════════════════════════════════════════════════════════════════════════
  // GYMS & FITNESS  (Tier 2)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "gyms-fitness",
    name: "Gyms & Fitness",
    navLabel: "Gyms & Fitness",

    eyebrow: "Gyms, studios, boxes, trainers & martial arts",
    headlineLead: "Logos, sign-up sites & gym walls that",
    headlineHighlight: "turn walk-ins into members.",
    subhead:
      "For independent gyms, CrossFit boxes, trainers, yoga and martial arts schools around Cumming and Forsyth County. One look that hits on the wall, on the tee, and on the phone — plus a site where people can actually sign up.",

    heroImage: {
      src: "/assets/industries/gyms-fitness/gym-interior-wall-branding-cumming-ga.webp",
      alt: "Independent gym interior with the Titan Fitness logo painted across the back wall and a member mid-lift — gym branding and signage by Branding Zombie Designs, Cumming GA",
      suggestion:
        "Wide shot of a turf-and-rig gym at golden hour, a huge painted logo filling the back wall while two members do wall-balls in the foreground, chalk dust catching the light.",
    },

    intro:
      "Branding Zombie builds the look and the sign-up site for gyms across Cumming, Forsyth County, and North Metro Atlanta — independent gyms, CrossFit boxes, personal trainers, and yoga and martial arts studios. Gerry handles the logo, the signage, the member apparel, and a website where prospects join online instead of walking to the box next door.",

    painsTitle: "Why the gym down the road keeps stealing your walk-ins",
    pains: [
      "Your logo looks like every other gym in the plaza — same flexing-arm clip art, same red-and-black, nothing a member would tattoo on their calf.",
      "No website, so the guy comparing three gyms joins the one with an online sign-up button instead of waiting for you to call back.",
      "Your class schedule lives in an Instagram story that vanished 18 hours ago, so nobody actually knows when the 6am runs.",
      "The member tees say one thing, the wall sign says another, and the front desk banner is a third font — it reads like three different gyms.",
      "Search “gym near me” in Cumming and you're on page two, behind the franchise with the marketing budget.",
    ],

    servicesTitle: "What gyms and studios actually hire us for",
    servicesNote:
      "Flat prices, fast turnaround, and Gerry answers the phone. No retainers, no monthly agency bill eating your membership revenue.",
    servicesOffered: [
      "logo-design",
      "branding",
      "web-design",
      "print-design",
      "social-media",
      "digital-marketing",
    ],

    showcaseTitle: "The brand, in the building and on the feed",
    showcaseNote:
      "Real gym work in the wild — wall to tee to schedule to the post that fills the 6am class.",
    showcase: [
      {
        label: "Wall logo",
        aspect: "wide",
        src: "/assets/industries/gyms-fitness/gym-wall-logo-painted-design.webp",
        alt: "Titan Fitness logo painted large on a brick gym wall above the squat racks — gym wall-graphic design, Forsyth County GA",
        suggestion:
          "Eye-level wide shot of a brick gym wall with the logo painted six feet tall above a row of squat racks, barbells loaded and ready underneath.",
      },
      {
        label: "Member hoodies",
        aspect: "square",
        src: "/assets/industries/gyms-fitness/gym-member-apparel-design.webp",
        alt: "Folded Titan Fitness member hoodies and tees with the chest logo — branded gym apparel design, Cumming GA",
        suggestion:
          "Top-down flat lay of folded member hoodies and tees in the gym's colors, a coffee cup and a jump rope just inside the frame for scale.",
      },
      {
        label: "Class schedule board",
        aspect: "tall",
        src: "/assets/industries/gyms-fitness/gym-class-schedule-board-design.webp",
        alt: "Printed Titan Fitness class schedule and membership board by the front desk — gym signage design, North Metro Atlanta",
        suggestion:
          "Straight-on shot of a printed weekly class schedule and membership-tier board mounted on the wall by the check-in desk, clean and easy to read from across the room.",
      },
      {
        label: "Workout post",
        aspect: "square",
        src: "/assets/industries/gyms-fitness/gym-social-media-workout-post.webp",
        alt: "Titan Fitness social media workout post of a member mid-lift with the logo overlaid — gym social creative design",
        suggestion:
          "Punchy Instagram-style frame of a member mid-clean-and-jerk, motion blur on the bar, the gym's logo and class time set into the corner.",
      },
    ],

    workTitle: "Fitness brands we've put muscle on",
    workNote:
      "Fitness and athletic brand work — logos, apparel, and product campaigns built to look as strong as they are.",
    featuredWorkIds: [
      "macefit-logo",
      "muscleology",
      "swet-campaign",
      "dmax10-watermelon",
    ],
    testimonialName: "Mitch Marks",

    pricingTitle: "What it runs",
    pricingNote:
      "Plain numbers, no surprises. Georgia sales tax added at checkout. Want the logo, the site, and the apparel as one package? Ask and Gerry will quote it together.",
    priceAnchors: [
      { label: "Gym logo + brand colors", price: "from $750" },
      { label: "Sign-up & class-schedule website", price: "from $1,500" },
      { label: "Member tees & wall signage", price: "from $75" },
    ],

    faqs: [
      {
        q: "How much does a gym logo cost in Cumming, GA?",
        a: "Gym and studio logos at Branding Zombie start at $750, flat. That covers the main mark, your brand colors, and files ready for wall paint, tees, banners, and your website — so the look matches everywhere a member sees it. No retainer, and Gerry quotes the whole job up front before any work starts.",
      },
      {
        q: "Can you build a website where members sign up or book classes online?",
        a: "Yes. We build sites with online membership sign-up and class booking wired in, so a prospect comparing gyms can join you on the spot instead of the box next door. Sites start at $1,500. We connect the booking or payment tool you already use, or recommend one that fits a small gym.",
      },
      {
        q: "Can the same brand go on the wall, the tees, and the website?",
        a: "That's the whole point. Gerry designs one look and delivers files sized for painted wall logos, member tees and hoodies, front-desk signage, and the site — so it reads as one gym everywhere, not three. Apparel and signage start at $75; the logo package includes every format you'll need.",
      },
      {
        q: "Will this help my gym show up on Google for “gym near me”?",
        a: "It helps. A real website with your location, classes, and services gives Google something to rank — far more than an Instagram page. We set up the basics that get small Cumming and Forsyth gyms found locally, and can take on ongoing local marketing if you want to climb past the franchises.",
      },
      {
        q: "Do you work with CrossFit boxes, trainers, and martial arts studios too?",
        a: "Yes — independent gyms, CrossFit boxes, personal trainers, yoga, pilates, spin, and martial arts schools around Cumming, Forsyth County, and North Metro Atlanta. The work is the same shape: a strong logo, apparel and signage that match, and a site where people sign up. Solo trainer or a full box, Gerry scopes it to fit.",
      },
      {
        q: "How fast can you turn around a gym rebrand?",
        a: "Fast — Gerry runs a solo studio, so there's no agency queue. A logo and brand colors typically land in about a week or two; a full rebrand with a sign-up website, apparel, and signage runs longer depending on scope. You'll get a real timeline with your quote, and Gerry answers the phone the whole way through.",
      },
    ],

    seo: {
      title:
        "Gym & Fitness Branding in Cumming, GA — Logos, Sign-Up Sites & Apparel",
      description:
        "Logos, membership sign-up websites, wall signage, and member apparel for gyms, CrossFit boxes, trainers, and studios in Cumming & Forsyth County, GA. Flat prices, fast turnaround.",
      keywords: [
        "gym logo design Cumming GA",
        "fitness branding Forsyth County",
        "CrossFit box website design",
        "gym membership sign-up website",
        "personal trainer branding North Metro Atlanta",
        "gym apparel and signage design",
        "martial arts studio logo Georgia",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AUTO & REPAIR SHOPS  (Tier 2)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "auto-repair",
    name: "Auto & Repair Shops",
    navLabel: "Auto & Repair",

    eyebrow: "Mechanics · Tire · Detailing · Body Shops",
    headlineLead: "Signs, websites & shop branding for",
    headlineHighlight: "the bay that actually fixes cars.",
    subhead:
      "Cumming and Forsyth County shops live and die on the lot, the listing, and word of mouth. We give yours a sign people can read from the road, a site that answers “do you work on my truck,” and a Google profile that shows up for “mechanic near me.”",

    heroImage: {
      src: "/assets/industries/auto-repair/auto-shop-exterior-branding-cumming-ga.webp",
      alt: "Independent auto repair shop at golden hour with a lit Redline Auto & Tire sign and a marketing flag out front — auto shop branding by Branding Zombie Designs, Cumming GA",
      suggestion:
        "Shoot the front of an independent shop at golden hour, bay doors open and a clean backlit sign glowing over the lot, one tech wiping his hands by a lifted truck.",
    },

    intro:
      "For independent auto repair shops, tire stores, detailers, and body shops in Cumming, Forsyth County, and North Metro Atlanta, this Branding Zombie studio handles the road sign, the website, the shop shirts, and the Google listing. Gerry designs the stuff that gets a stranger off GA-400 and into your bay, flat-priced with fast turnaround.",

    painsTitle: "Sound like your shop?",
    pains: [
      "Your sign is sun-faded and twenty years old, so half the cars on the road never register it's a shop.",
      "You have no website, so people can't tell your hours, your services, or whether you even work on their make.",
      "Your Google reviews are great, but the listing photo is a blurry shot of the lot with a dumpster in it.",
      "Five minutes after they leave, a customer can't picture your logo or your shop name — there's nothing consistent enough to stick.",
      "You don't show up for “mechanic near me” or “Cumming auto repair,” so the new movers never find you.",
    ],

    servicesTitle: "What a shop usually needs",
    servicesNote:
      "Most shops start with the sign and a one-page site, then add shirts and cards. You can do it in one go or piece by piece — no retainer, and Gerry answers the phone.",
    servicesOffered: [
      "logo-design",
      "branding",
      "web-design",
      "print-design",
      "digital-marketing",
    ],

    showcaseTitle: "What it looks like out on the lot",
    showcaseNote:
      "Real-world pieces tuned for a working shop — the flag, the shirts, the window, the cards.",
    showcase: [
      {
        label: "Marketing flag",
        aspect: "tall",
        src: "/assets/industries/auto-repair/auto-shop-marketing-flag-design.webp",
        alt: "Branded swooper marketing flag at an auto repair shop entrance listing oil change, brakes and tires — auto shop flag design, Forsyth County GA",
        suggestion:
          "A tall swooper feather flag staked at the shop entrance, printed with the logo and a few headline services, fluttering over the lot.",
      },
      {
        label: "Mechanic shirts",
        aspect: "square",
        src: "/assets/industries/auto-repair/auto-mechanic-embroidered-shirts-design.webp",
        alt: "Navy mechanic work shirts with an embroidered shop logo and name patch — auto shop apparel design, Cumming GA",
        suggestion:
          "Folded navy work shirts with the shop logo embroidered on the chest and an oval name patch, on a workbench.",
      },
      {
        label: "Window sign",
        aspect: "wide",
        src: "/assets/industries/auto-repair/auto-shop-window-sign-design.webp",
        alt: "Auto repair shop window with cut-vinyl logo and service-list graphics — auto shop window sign design, North Metro Atlanta",
        suggestion:
          "Storefront glass with crisp vinyl lettering listing brakes, alignment, and tires, plus an hours decal on the door.",
      },
      {
        label: "Business cards",
        aspect: "wide",
        src: "/assets/industries/auto-repair/auto-shop-business-cards-design.webp",
        alt: "Stack of die-cut auto shop business cards fanned on a workbench — auto shop print design by Branding Zombie Designs",
        suggestion:
          "Top-down flat-lay of die-cut business cards fanned on a dark workbench with a set of keys.",
      },
    ],

    workTitle: "Local & industrial brand work",
    workNote:
      "Auto is a newer lane for the studio, so here's the honest version: brand, sign, and web work for local service businesses and industrial trades — the same skills a shop needs, applied to neighbors down the road.",
    featuredWorkIds: ["miami-pavement-logo", "sharp-edge", "enigma-computers"],
    testimonialName: "Ismael Medina",

    pricingTitle: "Flat prices, no surprises",
    pricingNote:
      "Real numbers, not a “request a quote” runaround. Sign quotes are custom because every facade and city sign permit is different. Georgia sales tax applies.",
    priceAnchors: [
      { label: "Shop logo + lettering", price: "from $750" },
      { label: "Shop website", price: "from $1,500" },
      { label: "Banners & cards", price: "from $75" },
    ],

    faqs: [
      {
        q: "How much does a logo and sign cost for an auto repair shop?",
        a: "A shop logo starts at $750, and that includes the files your sign company and shirt printer need. The physical sign itself is a custom quote because it depends on your building, size, and city permit. Banners, decals, and cards start at $75. Everything is flat-priced up front, with Georgia sales tax added.",
      },
      {
        q: "Do I really need a website if my Google reviews are already good?",
        a: "Yes. Reviews get people to trust you, but a site is where they confirm your hours, your services, and whether you work on their make before they drive over. Without one, you lose the customer who Googles you at 7pm. A simple one-page shop site starts at $1,500 and turns reviews into booked work.",
      },
      {
        q: "Can you help my shop show up for “mechanic near me” in Cumming?",
        a: "That's mostly your Google Business Profile, and we set it up right — real services, real categories, and clear photos instead of a blurry lot shot. Pair it with a basic site that names your city and services and you start showing up for “Cumming auto repair” and “mechanic near me” instead of getting buried.",
      },
      {
        q: "Do you do branded shirts and uniforms for the shop crew?",
        a: "Yes. Once your logo is done, we set up matching shirts, the front counter, invoices, and signage so the whole shop looks like one business instead of three. Gerry handles the design and coordinates the embroidery and print, so your techs and your waiting room finally match.",
      },
      {
        q: "Are you local to Forsyth County, or is this a national chain?",
        a: "Local. Branding Zombie is Gerry Betancourt, a one-person studio in Cumming, GA, working with shops across Forsyth and North Metro Atlanta. You text or call (770) 744-2536 and reach the actual designer, not a call center. Local pickup and drop-off work fine for proofs and printed pieces.",
      },
      {
        q: "How long does it take to get my shop branded?",
        a: "A logo runs about one to two weeks. A one-page site is usually two to three weeks once we have your hours, services, and photos. Sign production depends on your fabricator and permit, but we hand off print-ready files fast so nothing waits on design. No retainers, no drawn-out timelines.",
      },
    ],

    seo: {
      title: "Auto Repair Shop Branding, Signs & Websites | Cumming, GA",
      description:
        "Logos, signage, shirts, and websites for independent auto repair shops, tire stores, detailers, and body shops in Cumming and Forsyth County, GA. Flat prices, fast turnaround, owner answers the phone.",
      keywords: [
        "auto repair shop branding Cumming GA",
        "mechanic logo design Forsyth County",
        "auto shop website design",
        "tire shop signage Cumming",
        "body shop branding North Metro Atlanta",
        "mechanic near me marketing",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HOME SERVICES  (Tier 2)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "home-services",
    name: "Home Services",
    navLabel: "Home Services",

    eyebrow: "Lawn · Cleaning · Pest · Pool · Pressure Washing",
    headlineLead: "Door hangers, yard signs & quote sites",
    headlineHighlight: "that book the next house on the street.",
    subhead:
      "Logos, branded trucks and trailers, door hangers, yard signs, and websites with a quote button for lawn care, house cleaning, pest control, pool service, pressure washing, junk removal, window cleaning, and handyman businesses around Cumming, Forsyth County, and North Metro Atlanta.",

    heroImage: {
      src: "/assets/industries/home-services/home-service-branded-vehicle-cumming-ga.webp",
      alt: "Branded Hospital 2 Home service van in a suburban driveway with a caregiver heading to the door — home-service branding by Branding Zombie Designs, Cumming GA",
      suggestion:
        "A landscaping trailer with clean cut-vinyl lettering and a big phone number parked at the curb of a North Metro Atlanta subdivision, ramp down and a fresh-cut lawn behind it with a small branded yard sign staked near the mailbox, shot in late-afternoon light so the neighbors can read it from three doors down.",
    },

    intro:
      "For lawn care, house cleaning, pest control, pool, and pressure-washing crews around Cumming, Forsyth County, and North Metro Atlanta, we build the brand neighbors actually see: logos, lettering for the truck and trailer, door hangers, yard signs, and a website with a quote button. Flat prices, fast turnaround, and Gerry answers the phone.",

    painsTitle: "You do the work. The street should know who did it.",
    pains: [
      "Your door hangers and flyers look like they came off the home printer, so most of them go straight from the doorknob to the trash.",
      "You finish a perfect lawn, pull away in a blank white truck, and the three neighbors who noticed have no idea who to call.",
      "A homeowner wants a quote at 9pm and there's no website, so they fill out the form on the company that does have one.",
      "Your yard signs are a mix of two old batches and a Sharpie fix, so the one staked in the best lawn on the block looks half-homemade.",
      "Nobody types your name — they search “lawn care near me” or “house cleaning Cumming,” and you're nowhere on that first screen.",
    ],

    servicesTitle: "What home-service crews hire us for",
    servicesNote:
      "Most owners start with a logo and truck or trailer lettering, then add door hangers, yard signs, and a quote site once the calls pick up. Grab the piece you need now — every job is quoted flat before we start.",
    servicesOffered: [
      "logo-design",
      "branding",
      "web-design",
      "print-design",
      "digital-marketing",
    ],

    showcaseTitle: "The brand the whole street sees",
    showcaseNote:
      "A door hanger, a truck, a yard sign, a crew shirt — the four places a neighbor decides whether to call you or the other guy. We make them match so they add up to one name people remember.",
    showcase: [
      {
        label: "Truck & trailer lettering",
        aspect: "wide",
        src: "/assets/industries/home-services/home-service-van-lettering-design.webp",
        alt: "White service van with Hospital 2 Home cut-vinyl door lettering and phone number — home-service vehicle lettering design, Forsyth County GA",
        suggestion:
          "A pressure-washing or lawn trailer photographed from the curb with clean cut-vinyl lettering — logo, two or three services, and a phone number big enough to read from a passing car — parked in front of the house that was just serviced.",
      },
      {
        label: "Door hanger on the door",
        aspect: "tall",
        src: "/assets/industries/home-services/home-service-door-hanger-design.webp",
        alt: "Branded Hospital 2 Home door hanger on a suburban front door — home-service door hanger design, North Metro Atlanta",
        suggestion:
          "A printed door hanger hooked over a front-door handle on a brick suburban house, logo and a short offer at the top and a quote QR code at the bottom, shot close so it clearly looks designed and not run off a home printer.",
      },
      {
        label: "Yard sign in the lawn",
        aspect: "square",
        src: "/assets/industries/home-services/home-service-yard-sign-design.webp",
        alt: "Branded home-service lawn sign with the Hospital 2 Home logo near a front walkway — home-service yard sign design, Cumming GA",
        suggestion:
          "A corrugated yard sign on metal stakes pushed into a freshly cut, edged front lawn near the mailbox — logo, service line, and phone — the kind of sign a neighbor stops to photograph before calling.",
      },
      {
        label: "Branded crew shirts",
        aspect: "square",
        src: "/assets/industries/home-services/home-service-branded-crew-shirts.webp",
        alt: "Caregiver in a branded Hospital 2 Home polo at a homeowner's door — branded home-service apparel design",
        suggestion:
          "A technician in a clean branded polo or tee, logo on the chest, sprayer or mower in hand, standing at a homeowner's door so the brand looks like a real, trustworthy crew showing up — studio-clean but clearly on the job.",
      },
    ],

    workTitle: "Brand and web work for local service businesses",
    workNote:
      "A 25-year mobile aquarium service, a contractor's brand, and a custom PC shop's site — each with a built-in request-a-quote flow. Real local service businesses, the same build a lawn or cleaning crew needs to capture the 9pm quote.",
    featuredWorkIds: [
      "aquarium-center",
      "sharp-edge",
      "enigma-computers",
      "miami-pavement-logo",
    ],
    testimonialName: "Mary Jeimz",

    pricingTitle: "Flat prices, quoted before we start",
    pricingNote:
      "No hourly surprises and no retainer. You get a flat number before you say yes, Georgia sales tax is the only add-on, and you own every file when we're done. Truck and trailer lettering is quoted by size and surface.",
    priceAnchors: [
      { label: "Logo + brand files", price: "from $750" },
      { label: "Door hangers & yard signs", price: "from $75" },
      { label: "Website with a quote button", price: "from $1,500" },
    ],

    faqs: [
      {
        q: "How much does a logo for a lawn care or cleaning business cost?",
        a: "Logos start at $750 and come with the files you'll actually use — vector versions for truck and trailer lettering and yard signs, plus web and print versions for door hangers and your Google profile. That's the difference between a real logo and a cheap file that turns to mush the moment you blow it up on a trailer.",
      },
      {
        q: "Can you get my home service business to show up for “lawn care near me”?",
        a: "Yes. We set up and clean up your Google Business Profile and build a fast site with local SEO baked in, so you start ranking for “lawn care near me” or “house cleaning Cumming” in the towns you actually serve. Ranking takes a few months, but a site built for it climbs instead of fighting uphill.",
      },
      {
        q: "Do you design door hangers and yard signs that don't look homemade?",
        a: "Yes — door hangers, flyers, and yard signs are some of the most common pieces we do, starting at $75. We design them to match your logo and print clean, with a quote QR code or phone number front and center, so the one on the door or staked in the lawn looks like a real company, not a home-printer job.",
      },
      {
        q: "Can you put lettering on my truck and trailer?",
        a: "Yes. We design cut-vinyl lettering and graphics for trucks, vans, and enclosed trailers, delivered print-ready to your installer's specs. A blank truck pulling away from a perfect lawn is a missed call — lettering turns every job into a rolling sign the whole neighborhood reads. No installer? We'll point you to good ones near Cumming.",
      },
      {
        q: "I don't have a website — can a customer request a quote online?",
        a: "Yes. We build home-service sites with a quote button right up front, starting at $1,500, so a homeowner can ask for a price at 9pm instead of moving on to the crew that has one. It works on phones, shows your services and service area, and sends the request straight to you — no app, no middleman.",
      },
      {
        q: "Do you only work with businesses in Cumming?",
        a: "Cumming and Forsyth County are home base, but we work with lawn, cleaning, pest, pool, and pressure-washing crews all over North Metro Atlanta — Alpharetta, Johns Creek, Cumming, Buford, Dawsonville, Canton, and the GA-400 corridor. Local means Gerry can meet up, photograph your truck, and get the details right the first time.",
      },
    ],

    seo: {
      title:
        "Branding & Web Design for Home Service Businesses in Cumming, GA",
      description:
        "Logos, truck and trailer lettering, door hangers, yard signs, and quote-button websites for lawn care, cleaning, pest, pool, and pressure-washing businesses in Cumming & North Metro Atlanta. Flat prices, fast turnaround.",
      keywords: [
        "lawn care logo design Cumming GA",
        "house cleaning branding Forsyth County",
        "pressure washing website design Georgia",
        "pest control logo design North Metro Atlanta",
        "door hanger design Cumming GA",
        "yard sign design home services",
        "pool service branding Forsyth County",
        "trailer lettering design North Metro Atlanta",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MEDICAL, DENTAL & WELLNESS  (Tier 2)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "medical-wellness",
    name: "Medical, Dental & Wellness",
    navLabel: "Medical & Wellness",

    eyebrow: "Dental · Med Spa · Chiro · Therapy · Clinics",
    headlineLead: "A brand patients trust before they",
    headlineHighlight: "say a word.",
    subhead:
      "Logos, websites with online booking, signage, and intake that look as careful as the care you give. Built for dentists, med spas, chiropractors, and wellness clinics across Forsyth County.",

    heroImage: {
      src: "/assets/industries/medical-wellness/medical-clinic-reception-branding-cumming-ga.webp",
      alt: "Bright children's therapy clinic reception with the Kids Life Solutions logo on the wall — medical practice branding by Branding Zombie Designs, Cumming GA",
      suggestion:
        "Shoot a tidy clinic reception at eye level: a backlit logo sign on a clean accent wall, two chairs, a plant, and a tablet check-in on the desk, soft daylight from a side window.",
    },

    intro:
      "For dentists, med spas, chiropractors, therapy practices, and wellness clinics in Cumming and across North Metro Atlanta, Branding Zombie Designs handles the brand patients judge in seconds: a clean logo, a website with online booking, matching signage, and intake that feels professional. Design and marketing work, run by the owner, with flat prices.",

    painsTitle: "The care is five-star. The brand should say so.",
    pains: [
      "Your brand looks dated and clinical, and it doesn't feel as good as the care your patients actually get.",
      "You have no real website with online booking, so a new patient picks the practice down the road with a nicer site.",
      "Your signage, intake forms, and the wall behind the front desk all look like three different practices.",
      "You've earned dozens of 5-star reviews and they're buried where no new patient ever sees them.",
      "Someone searches your specialty near Cumming and you're nowhere on the first page.",
    ],

    servicesTitle: "What practices come to us for",
    servicesNote:
      "This is design and marketing, not clinical advice. We make your practice look and feel trustworthy, and easy to book.",
    servicesOffered: [
      "logo-design",
      "branding",
      "web-design",
      "print-design",
      "digital-marketing",
    ],

    showcaseTitle: "Care that looks the part",
    showcaseNote:
      "A few of the pieces a patient sees on the way to booking and on the way through your door.",
    showcase: [
      {
        label: "Reception sign",
        aspect: "wide",
        src: "/assets/industries/medical-wellness/medical-practice-reception-sign-design.webp",
        alt: "Dimensional Kids Life Solutions logo sign above a clinic reception desk — medical practice signage design, Forsyth County GA",
        suggestion:
          "Wide shot of a dimensional logo sign on the wall above a front desk, soft uplighting, a row of waiting chairs blurred in the foreground.",
      },
      {
        label: "Booking site",
        aspect: "square",
        src: "/assets/industries/medical-wellness/medical-website-online-booking-design.webp",
        alt: "Kids Life Solutions practice website with online appointment booking on a laptop and phone — medical website design, North Metro Atlanta",
        suggestion:
          "A laptop and phone side by side on a clean desk, both showing the same practice site with a clear Book Appointment button and an open time-slot picker.",
      },
      {
        label: "Intake folder",
        aspect: "tall",
        src: "/assets/industries/medical-wellness/medical-intake-folder-appointment-cards.webp",
        alt: "Branded Kids Life Solutions intake folder with new-patient forms and appointment cards — medical print design, Cumming GA",
        suggestion:
          "Top-down on a light wood table: a branded intake folder fanned open with new-patient forms and three matching appointment reminder cards beside it.",
      },
      {
        label: "Wellness post",
        aspect: "square",
        src: "/assets/industries/medical-wellness/wellness-clinic-social-media-post.webp",
        alt: "Calm Kids Life Solutions wellness social media post — healthcare social creative design",
        suggestion:
          "A soft, calm Instagram post mockup on a phone: muted palette, one clean line of advice, the practice logo small in the corner, plant shadow on the wall behind.",
      },
    ],

    workTitle: "Healthcare and wellness brands we've built",
    workNote:
      "Real logo, brand, and label work for healthcare and wellness companies. The same eye for trust and clarity goes into a dental or med spa brand.",
    featuredWorkIds: [
      "kids-life-solutions-logo",
      "hospital2home-logo",
      "sea-la-bella",
    ],
    testimonialName: "Liz Marie",

    pricingTitle: "Plain prices, no retainers",
    pricingNote:
      "Flat quotes up front. The owner does the work and answers the phone. Georgia sales tax applies where required.",
    priceAnchors: [
      { label: "Practice logo", price: "from $750" },
      { label: "Website with online booking", price: "from $1,500" },
      { label: "Full practice brand", price: "from $2,500" },
    ],

    faqs: [
      {
        q: "How much does a website with online booking cost for a dental or medical practice?",
        a: "A practice website with online booking starts around $1,500. That covers a clean, mobile-friendly site, a clear Book Appointment button wired to your scheduler, your services, and your reviews surfaced where new patients see them. You get a flat quote before any work starts, not an hourly meter.",
      },
      {
        q: "Can you design a logo and signage that match my practice's interior?",
        a: "Yes. We design the logo first, then pull the same colors, type, and feel through your reception sign, exterior signage, intake folders, and appointment cards. Patients should feel one consistent practice from the parking lot to the front desk, not three different ones.",
      },
      {
        q: "Do you work with med spas, chiropractors, and therapy practices, or only dentists?",
        a: "All of them. We build brands for dentists, med spas, dermatology, optometry, physical therapy, chiropractic, and therapy or ABA practices around Cumming and North Metro Atlanta. The work is design and marketing, not clinical, so the specialty changes the look and the wording, not the process.",
      },
      {
        q: "Can you help my practice show up for searches like “dentist near me”?",
        a: "Yes, through the design and marketing side. We build a fast, properly structured site, set up the right pages and local details, and surface your reviews so search engines and patients both trust you. We don't promise a ranking, but we fix the basics most practices skip.",
      },
      {
        q: "Where is Branding Zombie Designs located?",
        a: "In Cumming, Georgia, in Forsyth County, serving practices across North Metro Atlanta. It's a solo studio owned by Gerry Betancourt, so the person you talk to is the person doing your logo, website, and signage. Call (770) 744-2536.",
      },
      {
        q: "How long does it take to rebrand a practice and launch a new site?",
        a: "Most practice projects run a few weeks, depending on scope. A standalone logo moves faster; a full brand with a booking site, signage, and intake takes a bit longer. We give you a flat price and a timeline up front, and we don't disappear once it's live.",
      },
    ],

    seo: {
      title: "Dental, Med Spa & Wellness Branding in Cumming, GA",
      description:
        "Logos, websites with online booking, signage, and intake for dentists, med spas, chiropractors, and wellness clinics in Cumming and North Metro Atlanta. Flat prices, owner-run.",
      keywords: [
        "dental logo design Cumming GA",
        "med spa branding Forsyth County",
        "medical practice website with online booking",
        "chiropractor logo and signage North Metro Atlanta",
        "wellness clinic branding Georgia",
        "dentist website design Cumming",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ECOMMERCE & DTC BRANDS  (Tier 2)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ecommerce-dtc",
    name: "Ecommerce & DTC Brands",
    navLabel: "Ecommerce & DTC",

    eyebrow: "Shopify · Amazon · DTC · subscription",
    headlineLead: "Shopify stores and Amazon listings built to",
    headlineHighlight: "turn carts into orders.",
    subhead:
      "A store that looks like your brand, product pages that answer the question before someone bounces, and ads and email that match what they land on. Built in Cumming, GA. The owner answers the phone.",

    heroImage: {
      src: "/assets/industries/ecommerce-dtc/ecommerce-shopify-store-design-cumming-ga.webp",
      alt: "Squeeze Me Skinny DTC store on a laptop and phone with an add-to-cart in progress — ecommerce store design by Branding Zombie Designs, Cumming GA",
      suggestion:
        "Overhead shot of a laptop and phone on a dark desk showing the same DTC product store, a finger hovering over a glowing add-to-cart button, order-confirmation email faintly visible on the phone.",
    },

    intro:
      "Online store owners across Cumming, Forsyth County, and North Metro Atlanta come to Branding Zombie Designs for the storefront itself — Shopify builds, product pages that convert, Amazon listings, and email and ad creative that match the brand. Run by Gerry Betancourt, flat-priced and fast.",

    painsTitle: "If you sell online, you already know these",
    pains: [
      "Your Shopify store still reads as the free theme — nice product, generic shell, and nobody trusts it with a card number.",
      "People add to cart and vanish. The checkout leaks and you have no idea where.",
      "Your product pages skip the questions that actually close the sale — sizing, shipping, what's inside, why yours.",
      "A worse product out-clicks you on Amazon because its listing photos and bullets do the selling and yours don't.",
      "Every click off an ad lands on a store that looks nothing like the ad, so the trust resets and the sale slips away.",
    ],

    servicesTitle: "What DTC brands actually buy",
    servicesNote:
      "Most stores start with the Shopify build and the product pages, then add Amazon, email, and paid creative once the store is converting. Flat quotes, no retainers.",
    servicesOffered: [
      "ecommerce",
      "web-design",
      "branding",
      "digital-marketing",
      "social-media",
      "logo-design",
    ],

    showcaseTitle: "Stores in the wild",
    showcaseNote:
      "Real DTC builds — the storefront, the page that converts, the creative that drives the click, and what shows up at the door.",
    showcase: [
      {
        label: "Storefront, two screens",
        aspect: "wide",
        src: "/assets/industries/ecommerce-dtc/dtc-shopify-storefront-laptop-phone.webp",
        alt: "Squeeze Me Skinny Shopify storefront on a laptop and phone — DTC ecommerce web design, North Metro Atlanta",
        suggestion:
          "A clean Shopify homepage on a 16-inch laptop with the same store on a phone leaned against it, both on a light studio surface, brand color repeating across both.",
      },
      {
        label: "Product page that converts",
        aspect: "tall",
        src: "/assets/industries/ecommerce-dtc/ecommerce-product-page-design.webp",
        alt: "Squeeze Me Skinny product page with reviews and a sticky add-to-cart bar — conversion-focused product page design",
        suggestion:
          "A tall phone screenshot of a single product page scrolled to show hero photo, star reviews, an FAQ block, and a sticky add-to-cart bar pinned at the bottom.",
      },
      {
        label: "Email plus paid ad",
        aspect: "square",
        src: "/assets/industries/ecommerce-dtc/dtc-email-paid-ad-creative-design.webp",
        alt: "Matching Squeeze Me Skinny promotional email and paid social ad — DTC email and ad creative design, Cumming GA",
        suggestion:
          "Side-by-side square of an abandoned-cart email and a Meta ad for the same product, identical type and color so they read as one brand.",
      },
      {
        label: "Branded unboxing",
        aspect: "square",
        src: "/assets/industries/ecommerce-dtc/dtc-branded-packaging-unboxing-design.webp",
        alt: "Branded Squeeze Me Skinny mailer box unboxing on a porch — DTC packaging design",
        suggestion:
          "Top-down of hands opening a branded mailer box on a porch, tissue and a thank-you card with the store URL, phone in frame showing the shipped-confirmation email.",
      },
    ],

    workTitle: "Stores we built that move real money",
    workNote:
      "Real DTC and Shopify builds with revenue behind them — first-year sales, monthly run rate, concept-to-live timelines.",
    featuredWorkIds: [
      "squeeze-me-skinny",
      "planters-etc",
      "pure-blanco",
      "muscleology",
      "lina-bloom",
    ],
    testimonialName: "Sandra Allen",

    pricingTitle: "Flat prices for the store",
    pricingNote:
      "Real numbers, quoted up front. No monthly retainer, no percentage of sales. Amazon listings, email flows, and paid creative are scoped per project once the store is converting.",
    priceAnchors: [
      { label: "Shopify store build", price: "from $3,000" },
      { label: "Full brand for a new DTC label", price: "from $2,500" },
      { label: "Store logo", price: "from $750" },
    ],

    faqs: [
      {
        q: "How much does it cost to build a Shopify store?",
        a: "A full Shopify build starts at $3,000 and is quoted flat before any work begins. That covers theme setup, brand styling, product pages written to convert, and checkout configured to actually close. No monthly retainer and no cut of your sales — you own the store and the numbers it brings in.",
      },
      {
        q: "Can you fix my store instead of rebuilding it from scratch?",
        a: "Yes. If the bones are fine and the store just looks like the free theme or leaks at checkout, we restyle and tighten what you have instead of starting over. We look at where carts drop, rewrite the product pages, and match the look to your brand. You only rebuild from zero when rebuilding is genuinely cheaper than patching.",
      },
      {
        q: "Do you write Amazon listings too, or just Shopify?",
        a: "Both. We build Shopify stores and write Amazon listings — titles, bullets, photos, and A+ content that out-clicks the worse products beating you now. Plenty of DTC brands sell on their own store and Amazon at once, so we keep the brand consistent across both instead of letting the listing look like a different company.",
      },
      {
        q: "Why do people add to cart and then leave my store?",
        a: "Usually the product page didn't answer the question that closes the sale — shipping cost, sizing, what's inside, or why yours over the cheaper one — so the buyer left to think and never came back. We rewrite pages to answer those upfront, add trust signals, and clean up checkout so fewer carts leak on the last step.",
      },
      {
        q: "Do you work with stores outside Cumming, Georgia?",
        a: "Yes. We're based in Cumming and serve Forsyth County and North Metro Atlanta in person, but ecommerce is online by nature — most of the stores we've built sell nationwide. We've launched DTC brands that cleared $100k in their first year and scaled others to roughly $200k a month, wherever their customers happen to be.",
      },
      {
        q: "How long does it take to launch a DTC store?",
        a: "A focused brand-and-Shopify build typically goes from concept to live in about four weeks, depending on how many products you're loading and whether photography is ready. We've taken a streetwear label from zero to a live store in four weeks. Bigger catalogs take longer, and you get a real timeline in the quote, not a guess.",
      },
    ],

    seo: {
      title:
        "Ecommerce & DTC Web Design in Cumming, GA — Shopify & Amazon",
      description:
        "Shopify stores, product pages, and Amazon listings built to convert for DTC brands in Cumming & North Metro Atlanta. Flat pricing, fast turnaround. Stores that cleared $100k year one.",
      keywords: [
        "Shopify store design Cumming GA",
        "ecommerce web design North Metro Atlanta",
        "DTC brand design Georgia",
        "Amazon listing design",
        "Shopify developer Forsyth County",
        "product page conversion design",
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
