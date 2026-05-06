const KEY = 'd456701087a6450d805946fe71c67e83';
const HOST = 'eluu.ai';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrls() {
  const fs = await import('fs');
  const path = await import('path');

  const distDir = path.resolve(process.cwd(), 'dist');
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.log('[IndexNow] No sitemap.xml found in dist/, skipping.');
    return [];
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...content.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);
  return urls;
}

async function ping(urls) {
  if (urls.length === 0) return;

  console.log(`[IndexNow] Submitting ${urls.length} URLs...`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  if (res.ok || res.status === 202) {
    console.log(`[IndexNow] Success (${res.status}) — ${urls.length} URLs submitted.`);
  } else {
    console.error(`[IndexNow] Failed (${res.status}): ${await res.text()}`);
  }
}

const urls = await getUrls();
urls.forEach(u => console.log(`  ${u}`));
await ping(urls);
