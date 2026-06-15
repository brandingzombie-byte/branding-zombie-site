#!/usr/bin/env node
// ─── IndexNow submitter ──────────────────────────────────────────────────────
// Pings IndexNow (Bing, Yandex, Seznam, et al.) so they re-crawl our URLs within
// minutes instead of waiting for the next scheduled crawl. Unlike Google Search
// Console's ~10/day "Request indexing" cap, IndexNow is unlimited.
//
// The key is PUBLIC by design — it's hosted at /<key>.txt so the search engines
// can verify we own the domain. Not a secret.
//
// Usage:
//   node scripts/submit-indexnow.mjs                 # submit every URL in the live sitemap
//   node scripts/submit-indexnow.mjs <url> [<url>…]  # submit only the given URLs
//
// Runs on Node 18+ (uses global fetch). No dependencies.

const HOST = "brandingzombiedesigns.com";
const SITE_URL = `https://${HOST}`;
const KEY = "d107eadcd3dd47deac2821235cf8eda9";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow"; // shared — propagates to Bing, Yandex, etc.

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP_URL, { headers: { "User-Agent": "indexnow-submitter" } });
  if (!res.ok) {
    throw new Error(`Could not fetch sitemap (${res.status}) at ${SITEMAP_URL}`);
  }
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)];
}

async function submit(urlList) {
  if (urlList.length === 0) {
    console.log("No URLs to submit.");
    return;
  }
  // IndexNow accepts up to 10,000 URLs per request; we're far below that.
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending). Anything else is a problem.
  const ok = res.status === 200 || res.status === 202;
  console.log(`${ok ? "✓" : "✗"} IndexNow responded ${res.status} for ${urlList.length} URL(s).`);
  if (!ok) {
    const text = await res.text().catch(() => "");
    console.error(text.slice(0, 500));
    process.exit(1);
  }
  urlList.forEach((u) => console.log(`   • ${u}`));
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  const urls = args.length > 0 ? args : await urlsFromSitemap();
  console.log(`Submitting ${urls.length} URL(s) to IndexNow…`);
  await submit(urls);
}

main().catch((err) => {
  console.error("IndexNow submission failed:", err.message);
  process.exit(1);
});
