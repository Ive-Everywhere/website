// Proxy /research/* to the research site so it's served under eluu.ai/research.
// Subdirectory consolidates SEO authority on the main domain.
//
// Origin is set per-environment via the RESEARCH_ORIGIN env var:
//   Production deploy  → https://research.eluu.ai
//   Preview/staging    → https://staging.research.eluu.ai
//
// The research repo MUST be built with `base: '/research'` in astro.config.mjs
// so its emitted asset/link URLs already start with `/research/`. That way
// internal navigation stays under eluu.ai (or staging.eluu.ai).

const DEFAULT_ORIGIN = 'https://research.eluu.ai';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = (env && env.RESEARCH_ORIGIN) || DEFAULT_ORIGIN;

  // Pass the full path through (including the /research prefix) since the
  // research site is built with base '/research'.
  const target = new URL(url.pathname + url.search, origin);

  return fetch(target.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
    redirect: 'manual',
  });
}
