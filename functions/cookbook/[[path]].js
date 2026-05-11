// Proxy /cookbook/* to the cookbook site so it's served under eluu.ai/cookbook.
// Subdirectory consolidates SEO authority on the main domain.
//
// Origin is set per-environment via the COOKBOOK_ORIGIN env var:
//   Production deploy  → https://cookbook.eluu.ai
//   Preview/staging    → https://staging.cookbook.eluu.ai
//
// The cookbook repo MUST be built with `base: '/cookbook'` in astro.config.mjs
// so its emitted asset/link URLs already start with `/cookbook/`. That way
// internal navigation stays under eluu.ai (or staging.eluu.ai).

const DEFAULT_ORIGIN = 'https://cookbook.eluu.ai';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = (env && env.COOKBOOK_ORIGIN) || DEFAULT_ORIGIN;

  // Pass the full path through (including the /cookbook prefix) since the
  // cookbook site is built with base '/cookbook'.
  const target = new URL(url.pathname + url.search, origin);

  const upstream = await fetch(target.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
    redirect: 'manual',
  });

  // Rewrite any Location header that points back at the origin subdomain so
  // 3xx redirects keep users (and search-engine crawlers) on the main
  // domain. Without this, a 301 from the origin would expose
  // `cookbook.eluu.ai` to the client and let it become the indexed URL,
  // splitting SEO authority from `eluu.ai/cookbook`.
  const location = upstream.headers.get('location');
  if (location) {
    const originHost = new URL(origin).host; // cookbook.eluu.ai or override
    const requestHost = url.host;             // eluu.ai (or whatever proxied us)
    const rewritten = location.replace(new RegExp(`https?://${originHost}`, 'i'), `https://${requestHost}`);
    if (rewritten !== location) {
      const headers = new Headers(upstream.headers);
      headers.set('location', rewritten);
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers,
      });
    }
  }

  return upstream;
}
