// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, ...) which URLs changed.
//
// Usage:
//   npm run indexnow                     -> submits every URL in the live sitemap
//   npm run indexnow -- /projects/myflood /  -> submits only these paths
//
// Run it after a change is deployed to production, not before: engines fetch the
// URLs straight away. The key file public/<KEY>.txt must be live for this to work.
const SITE = "https://nabil-takiyuddin.dev";
const KEY = "2b1d7d8fda6c9ad227033908b054aab6";

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

(async () => {
  const args = process.argv.slice(2);
  const urls = args.length
    ? args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`))
    : await sitemapUrls();

  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    throw new Error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first.`);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  // 200 = accepted, 202 = accepted and key validation pending. Anything else is an error.
  console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
  for (const u of urls) console.log(`  ${u}`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
