// First-party reverse proxy to PostHog, mounted at /ingest/*.
//
// WHY THIS EXISTS: the waitlist modal posts the visitor's email to PostHog as a
// `survey sent` event. Posting straight to us.i.posthog.com is blocked by most
// ad blockers and by Brave/Safari tracker lists, which would silently drop
// waitlist signups — the one conversion the private beta depends on. Routing
// through our own origin makes the request first-party, so it survives.
//
// Same Cloudflare Pages Functions mechanism as functions/research/[[path]].js.
// It works on the static Astro build because Pages Functions run beside the
// build output, not inside it — no Astro adapter needed.
//
// Two upstreams, because PostHog splits them:
//   /ingest/static/*  → us-assets.i.posthog.com/static/*   (the JS bundle)
//   /ingest/*         → us.i.posthog.com/*                 (capture, flags)
//
// Overridable per environment via POSTHOG_ASSET_HOST / POSTHOG_API_HOST.

const DEFAULT_ASSET_HOST = 'https://us-assets.i.posthog.com';
const DEFAULT_API_HOST = 'https://us.i.posthog.com';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Strip the /ingest mount point; PostHog expects the bare path.
  const path = url.pathname.replace(/^\/ingest/, '') || '/';

  const isStatic = path.startsWith('/static/');
  const upstream = isStatic
    ? (env && env.POSTHOG_ASSET_HOST) || DEFAULT_ASSET_HOST
    : (env && env.POSTHOG_API_HOST) || DEFAULT_API_HOST;

  const target = new URL(path + url.search, upstream);

  // Rewrite Host so PostHog's router sees its own hostname rather than ours.
  const headers = new Headers(request.headers);
  headers.set('host', new URL(upstream).host);
  // Our origin is meaningless upstream and leaks the referring page.
  headers.delete('cookie');

  const response = await fetch(target.toString(), {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
    redirect: 'manual',
  });

  // The bundle is immutable and hot on every page, so let the edge hold it.
  if (isStatic) {
    const cached = new Response(response.body, response);
    cached.headers.set('cache-control', 'public, max-age=3600');
    return cached;
  }

  return response;
}
