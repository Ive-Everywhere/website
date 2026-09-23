import type { APIRoute } from 'astro';

/**
 * Generated rather than static, so it follows the same `PUBLIC_INDEXABLE`
 * switch as the per-page robots meta. Unset means staging, and staging is
 * disallowed wholesale, including the sitemap, which would otherwise hand a
 * crawler the full URL list.
 */
const indexable = import.meta.env.PUBLIC_INDEXABLE === 'true';

export const GET: APIRoute = ({ site }) =>
  new Response(
    indexable
      ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`, ''].join(
          '\n',
        )
      : ['User-agent: *', 'Disallow: /', ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
