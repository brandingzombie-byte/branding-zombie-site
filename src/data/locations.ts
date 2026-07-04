// ─── Local / city landing-page data — single source of truth ────────────────
// Drives the /services/[slug]/[city] hub-and-spoke (e.g. /services/web-design/
// cumming-ga). One entry per town we want to rank for. The city content here is
// service-AGNOSTIC (it describes the place + its business mix); the per-service
// angle lives in src/data/location-services.ts. The page combines the two.
//
// Content rules (mirror industries.ts):
// - Every city's `introHook`, `localAngle`, and `cityFaqs` must be UNIQUE — real
//   local specifics (districts, corridors, landmarks, the town's actual business
//   mix), NOT a mad-libs template with the city name swapped in.
// - Plain English, local, warm. We sound like a neighbor, not an agency.
// - Only claim proof we can back (5.0★ Google rating, 15+ years, 80+ projects).

export interface CityFaq {
  /** Natural-language question, phrased the way a local owner types it. */
  q: string;
  /** Lead with the answer. ~40–70 words. */
  a: string;
}

export interface Location {
  /** URL segment, e.g. "cumming-ga". */
  slug: string;
  /** Display name, e.g. "Cumming". */
  city: string;
  /** County for schema + copy, e.g. "Forsyth County". */
  county: string;
  /** Two-letter state. */
  state: string;
  /** ZIP used in schema areaServed where we have a real one. */
  postalCode?: string;
  /** Geo for the page's Place schema. */
  lat?: number;
  lon?: number;
  /** Nearby towns — used for "areas we also serve" + internal-link hints. */
  nearby: string[];
  /** Short labels of the town's dominant business types (chips + copy). */
  localIndustries: string[];
  /** ONE unique sentence used inside the answer-first band (~18–28 words). */
  introHook: string;
  /** Unique local-positioning paragraph (~70–100 words) with real specifics. */
  localAngle: string;
  /** 2–3 city-specific FAQs (answers reference local specifics). */
  cityFaqs: CityFaq[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "cumming-ga",
    city: "Cumming",
    county: "Forsyth County",
    state: "GA",
    postalCode: "30041",
    lat: 34.2073,
    lon: -84.1401,
    nearby: ["Forsyth County", "Coal Mountain", "Vickery", "Lake Lanier"],
    localIndustries: [
      "restaurants & cafés",
      "Lake Lanier & marine services",
      "medical, dental & wellness",
      "home-service contractors",
      "boutique retail",
      "gyms & fitness",
    ],
    introHook:
      "We're based in Cumming, so your designer is the same person who shops The Collection and drives GA-400 every day.",
    localAngle:
      "Cumming is home turf. We're a short drive from The Collection at Forsyth, Vickery Village, and the City Center, and we build for the businesses that actually run this town — the Market Place Blvd restaurants, the contractors working subdivisions off Post Road, the dental and wellness practices near Northside Forsyth, and the shops and gyms that live or die by foot traffic and Google. When a Cumming owner needs a site that loads fast and shows up for \"near me,\" they don't need an Atlanta agency. They need a neighbor.",
    cityFaqs: [
      {
        q: "Do you build websites for Cumming, GA businesses?",
        a: "Yes — Cumming is our home base. Branding Zombie Designs builds custom, fast, local-SEO-ready websites for Cumming and Forsyth County businesses, from restaurants and contractors to medical practices and retail. We can meet in person, and you work directly with the designer who builds the site.",
      },
      {
        q: "Can we meet in person in Cumming?",
        a: "Absolutely. We're local to Cumming and Forsyth County, so we can meet for a coffee on Market Place Blvd or come to your shop. Most of the build happens online so it's fast, but face-to-face kickoff and photo days are easy when you want them.",
      },
    ],
  },
  {
    slug: "alpharetta-ga",
    city: "Alpharetta",
    county: "Fulton County",
    state: "GA",
    postalCode: "30009",
    lat: 34.0754,
    lon: -84.2941,
    nearby: ["Avalon", "Windward", "Crabapple", "Roswell"],
    localIndustries: [
      "tech & startups",
      "professional services",
      "restaurants & Avalon retail",
      "real estate",
      "medical & dental",
      "home services",
    ],
    introHook:
      "Alpharetta businesses compete with venture-backed brands down the street — your site has to look like it belongs at Avalon.",
    localAngle:
      "Alpharetta is the \"Tech City of the South,\" and the bar is high. Between Avalon, downtown Alpharetta, and the Windward corridor, your customers are walking past polished national brands all day — a tired template site quietly tells them you're the cheaper option. We build sites for Alpharetta firms, restaurants, and service businesses that hold their own against companies with marketing departments, without the agency retainer. Fast, modern, conversion-built, and tuned to rank for Alpharetta and North Fulton searches.",
    cityFaqs: [
      {
        q: "Do you work with Alpharetta, GA businesses?",
        a: "Yes. We design and build websites for Alpharetta companies across tech, professional services, restaurants, retail, and home services. We're 20 minutes up GA-400 in Cumming, so we know the North Fulton market and can meet in person when it helps.",
      },
      {
        q: "Can you make my site look as polished as the big Alpharetta brands?",
        a: "That's exactly the point. We custom-design every site — no templates — so a local Alpharetta business can look as credible as the venture-backed companies at Avalon. You get senior design and modern, fast code, at a small-business price you actually own.",
      },
    ],
  },
  {
    slug: "johns-creek-ga",
    city: "Johns Creek",
    county: "Fulton County",
    state: "GA",
    postalCode: "30097",
    lat: 34.0289,
    lon: -84.1986,
    nearby: ["Medlock Bridge", "Technology Park", "Duluth", "Suwanee"],
    localIndustries: [
      "medical & dental practices",
      "professional & financial services",
      "restaurants",
      "tutoring & education",
      "home services",
      "wellness & med-spa",
    ],
    introHook:
      "Johns Creek is one of the most affluent, most-searched markets in Georgia — your website is doing the first impression for you.",
    localAngle:
      "Johns Creek consistently ranks among the best places to live in the country, and its households research before they buy. For the medical and dental practices around Medlock Bridge, the financial and professional firms near Technology Park, and the restaurants and med-spas competing for that spend, a credible, fast, well-structured website isn't optional — it's the whole first impression. We build Johns Creek businesses sites that load instantly, read clearly on a phone, and earn the trust those customers expect before they ever call.",
    cityFaqs: [
      {
        q: "Do you design websites for Johns Creek, GA practices and businesses?",
        a: "Yes. We build for Johns Creek medical and dental practices, professional firms, restaurants, and wellness businesses. Our sites are fast, mobile-first, and structured so an affluent, research-heavy Johns Creek audience trusts you before the first call.",
      },
      {
        q: "Do you handle medical or dental websites in Johns Creek?",
        a: "We do — practice sites are a core part of our work. We build clean, fast, mobile-first sites with clear service pages, easy appointment paths, and the schema that helps you show up for \"dentist near me\" and similar Johns Creek searches. When patient data is involved we use HIPAA-aware tools.",
      },
    ],
  },
  {
    slug: "milton-ga",
    city: "Milton",
    county: "Fulton County",
    state: "GA",
    postalCode: "30004",
    lat: 34.1320,
    lon: -84.3000,
    nearby: ["Crabapple", "Birmingham", "Alpharetta", "Roswell"],
    localIndustries: [
      "equestrian & agritourism",
      "luxury home services",
      "boutique retail",
      "restaurants",
      "real estate",
      "landscaping & outdoor living",
    ],
    introHook:
      "Milton kept the horse farms and the upscale feel — your brand online should match that, not fight it.",
    localAngle:
      "Milton is North Fulton's quiet luxury — Crabapple's walkable village, Birmingham Highway's horse country, and a community that protects its character. The businesses that win here, from custom builders and landscapers to boutiques and equestrian services, sell craftsmanship and trust, not discounts. A generic template undercuts that story. We build Milton businesses sites that feel as considered as the work they do: elegant, fast, and easy to find when someone searches for a premium local provider.",
    cityFaqs: [
      {
        q: "Do you build websites for Milton, GA businesses?",
        a: "Yes. We work with Milton's builders, landscapers, boutiques, restaurants, and equestrian and home-service businesses. We custom-design every site to match Milton's upscale, craftsmanship-first feel — and tune it to rank for Milton and Crabapple searches.",
      },
      {
        q: "Can you make a high-end website without a high-end agency price?",
        a: "Yes — that's our whole model. You get senior, custom design and modern fast code without an agency retainer, and you own every file. Milton clients get a site that looks premium and is built to last, at a flat small-business price.",
      },
    ],
  },
  {
    slug: "suwanee-ga",
    city: "Suwanee",
    county: "Gwinnett County",
    state: "GA",
    postalCode: "30024",
    lat: 34.0515,
    lon: -84.0713,
    nearby: ["Suwanee Town Center", "Peachtree Industrial", "Buford", "Duluth"],
    localIndustries: [
      "restaurants & Town Center retail",
      "family & youth services",
      "gyms & fitness",
      "medical & dental",
      "home services",
      "small manufacturing",
    ],
    introHook:
      "Suwanee runs on family businesses and foot traffic around Town Center — your site has to win the phone before the visit.",
    localAngle:
      "Suwanee is one of the most family-friendly towns in Georgia, and its commerce reflects it: the restaurants and shops around Suwanee Town Center, the gyms and youth programs, the dentists and home-service pros that parents find on their phones between school pickups. These customers decide fast and locally. We build Suwanee businesses sites that load instantly on mobile, make the next step obvious, and show up in the \"near me\" results along the Peachtree Industrial and Lawrenceville-Suwanee corridors.",
    cityFaqs: [
      {
        q: "Do you make websites for Suwanee, GA businesses?",
        a: "Yes. We build for Suwanee restaurants, retail, gyms, family and youth services, and home-service businesses. Our sites are fast, mobile-first, and set up for local SEO so you show up when nearby Suwanee customers search.",
      },
      {
        q: "My customers find me on their phones — is the site built for that?",
        a: "Always. Every site we build is mobile-first and tuned for Core Web Vitals, because most Suwanee searches happen on a phone. We make the call, directions, and booking buttons impossible to miss, so a quick mobile visit turns into an actual customer.",
      },
    ],
  },
  {
    slug: "buford-ga",
    city: "Buford",
    county: "Gwinnett County",
    state: "GA",
    postalCode: "30518",
    lat: 34.1207,
    lon: -84.0044,
    nearby: ["Mall of Georgia", "Lake Lanier", "Sugar Hill", "Flowery Branch"],
    localIndustries: [
      "automotive & repair",
      "retail near Mall of Georgia",
      "restaurants",
      "contractors & trades",
      "Lake Lanier & marine",
      "warehousing & logistics",
    ],
    introHook:
      "Buford pulls shoppers from three counties around the Mall of Georgia — getting found locally is half the battle.",
    localAngle:
      "Buford sits at a crossroads — the Mall of Georgia draws traffic from across the region, Lake Lanier brings the seasonal crowd, and the I-985 corridor is thick with auto shops, contractors, and logistics businesses. Standing out means showing up for the right local searches and looking legit the second someone lands on your page. We build Buford businesses fast, clear sites with the local SEO and Google Business setup that put you in the map results when someone nearby needs exactly what you do.",
    cityFaqs: [
      {
        q: "Do you build websites for Buford, GA businesses?",
        a: "Yes. We work with Buford auto shops, contractors, restaurants, retailers, and lake and marine businesses. We build fast sites with local SEO and Google Business Profile setup so you get found across the Mall of Georgia and I-985 area.",
      },
      {
        q: "I run an auto shop / trade business — can a website actually bring me calls?",
        a: "Yes, when it's built for it. We structure trade and auto sites around the services people search for, wire up click-to-call and directions, and set up the local schema and Google Business connection that land you in Buford's \"near me\" map results — which is where these jobs come from.",
      },
    ],
  },
  {
    slug: "dawsonville-ga",
    city: "Dawsonville",
    county: "Dawson County",
    state: "GA",
    postalCode: "30534",
    lat: 34.4209,
    lon: -84.1185,
    nearby: ["North Georgia Premium Outlets", "Dawson Forest", "Lake Lanier", "Cumming"],
    localIndustries: [
      "outdoor & tourism",
      "wineries & tasting rooms",
      "restaurants",
      "contractors & trades",
      "retail near the Outlets",
      "automotive",
    ],
    introHook:
      "Dawsonville lives where the mountains start — tourism traffic is real, but only if visitors can find you online first.",
    localAngle:
      "Dawsonville is the gateway to the North Georgia mountains and wine country — the North Georgia Premium Outlets, Dawson Forest, Amicalola, and a growing list of wineries and tasting rooms pull visitors up GA-400 every weekend. For the restaurants, outfitters, contractors, and tasting rooms here, the customer is often a traveler searching on their phone an hour before they arrive. We build Dawsonville businesses sites that surface in those searches, load fast on a mountain-edge signal, and make \"come here next\" the obvious choice.",
    cityFaqs: [
      {
        q: "Do you design websites for Dawsonville, GA businesses?",
        a: "Yes. We build for Dawsonville restaurants, wineries and tasting rooms, outdoor and tourism businesses, contractors, and retail near the Outlets. We're just down GA-400 in Cumming, so we know the Dawson County market and its weekend tourist traffic.",
      },
      {
        q: "A lot of my customers are visitors — can the site capture that traffic?",
        a: "That's exactly what we build for. We structure your site and local SEO around the searches travelers run on their way up — hours, directions, menus, booking — so when someone's an hour from Dawsonville looking for where to eat, stay, or stop, you're the result they tap.",
      },
    ],
  },
  {
    slug: "gainesville-ga",
    city: "Gainesville",
    county: "Hall County",
    state: "GA",
    postalCode: "30501",
    lat: 34.2979,
    lon: -83.8241,
    nearby: ["Lake Lanier", "Oakwood", "Flowery Branch", "Dawsonville"],
    localIndustries: [
      "healthcare & medical",
      "Latino-owned small businesses",
      "restaurants",
      "poultry & agribusiness",
      "contractors & trades",
      "retail & services",
    ],
    introHook:
      "Gainesville is one of the most bilingual markets in North Georgia — and we build (and speak) in English and Spanish.",
    localAngle:
      "Gainesville is Hall County's hub — Northeast Georgia Medical Center anchors it, the historic downtown square is being reborn, and the city has one of the largest Latino business communities in the region. That last part matters: we're bilingual, and we build sites in English and Spanish so Gainesville owners can reach every customer in the market, not half of it. From healthcare and trades to the restaurants and family businesses around the square and Lake Lanier, we build fast, findable sites that speak to Gainesville the way it actually talks.",
    cityFaqs: [
      {
        q: "Do you build websites for Gainesville, GA businesses?",
        a: "Yes. We build for Gainesville healthcare, restaurants, trades, retail, and family-owned businesses across Hall County. We're bilingual and can build your site in English, Spanish, or both — a real advantage in the Gainesville market.",
      },
      {
        q: "¿Hacen sitios web en español? / Do you build websites in Spanish?",
        a: "Sí. Gerry is fluent in Spanish, so we build and write websites in Spanish or fully bilingual — not machine-translated. For Gainesville's large Spanish-speaking customer base, that means your site actually connects, and you reach buyers your competitors are missing.",
      },
    ],
  },
  {
    slug: "roswell-ga",
    city: "Roswell",
    county: "Fulton County",
    state: "GA",
    postalCode: "30075",
    lat: 34.0232,
    lon: -84.3616,
    nearby: ["Canton Street", "Historic Roswell", "Alpharetta", "Milton"],
    localIndustries: [
      "restaurants & Canton St dining",
      "arts & boutique retail",
      "professional services",
      "wellness & salons",
      "real estate",
      "home services",
    ],
    introHook:
      "Roswell's Canton Street runs on character and reputation — your website should carry that same personality online.",
    localAngle:
      "Roswell blends history and energy — Canton Street's dining and nightlife, the Roswell Mill and riverfront, a strong arts scene, and the boutiques, salons, and professional firms that fill in around them. This is a town that rewards personality and punishes generic. We build Roswell businesses sites with real character and modern, fast code — pages that feel like your place feels in person, and that rank for the Roswell and historic-district searches your customers are actually running.",
    cityFaqs: [
      {
        q: "Do you make websites for Roswell, GA businesses?",
        a: "Yes. We build for Roswell restaurants, boutiques, salons, professional firms, and home-service businesses — including the independent spots around Canton Street and historic Roswell. Custom design, fast code, and local SEO tuned to the Roswell market.",
      },
      {
        q: "I want a site with personality, not a cookie-cutter template — can you do that?",
        a: "That's our specialty. Every Roswell site we build is custom-designed around your brand and your room — no templates — so the personality that fills your space on Canton Street comes through online. It still loads fast and ranks; character and performance aren't a trade-off the way most cheap sites make them.",
      },
    ],
  },
  {
    slug: "woodstock-ga",
    city: "Woodstock",
    county: "Cherokee County",
    state: "GA",
    postalCode: "30188",
    lat: 34.1015,
    lon: -84.5194,
    nearby: ["Downtown Woodstock", "Towne Lake", "Holly Springs", "Canton"],
    localIndustries: [
      "restaurants & breweries",
      "downtown retail & makers",
      "home services & contractors",
      "gyms & fitness",
      "family & kids services",
      "professional services",
    ],
    introHook:
      "Downtown Woodstock turned into one of metro Atlanta's hottest small-town scenes — local search is fierce here.",
    localAngle:
      "Woodstock punches way above its size. Downtown Woodstock and the Towne Lake area have become a destination — breweries, makers, restaurants, and independent retail pulling crowds from across Cherokee County. That popularity means real competition for local search and attention. We build Woodstock businesses fast, distinctive sites with the local SEO to win \"in Woodstock\" and \"near me\" searches, so the buzz downtown translates into customers finding and choosing you instead of the place next door.",
    cityFaqs: [
      {
        q: "Do you build websites for Woodstock, GA businesses?",
        a: "Yes. We work with Woodstock restaurants, breweries, makers, retailers, contractors, gyms, and professional services — including the independents around downtown Woodstock and Towne Lake. Fast custom sites with local SEO built for Cherokee County searches.",
      },
      {
        q: "Local competition is tough here — how do you help me stand out?",
        a: "Two ways: a custom-designed site that looks nothing like the template your competitors use, and the technical local SEO — schema, Google Business setup, fast mobile performance — that lands you in Woodstock's map results. Distinct on the page, found in the search. That combination is what moves you ahead in a crowded scene.",
      },
    ],
  },
];

// ─── Getters ────────────────────────────────────────────────────────────────
export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** Other cities for the "areas we also serve" interlink block (hub-and-spoke). */
export function getSiblingLocations(slug: string): Location[] {
  return LOCATIONS.filter((l) => l.slug !== slug);
}
