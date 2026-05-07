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

  return fetch(target.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
    redirect: 'manual',
  });
}
