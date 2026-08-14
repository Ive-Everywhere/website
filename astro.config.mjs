// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://eluu.ai';

/**
 * Keystatic's admin UI is the only route that cannot be prerendered, so it is
 * mounted in `astro dev` only. The production build stays 100% static with no
 * adapter and no server runtime. Editors run the CMS locally and commit; when
 * we want a hosted `/keystatic`, add the Cloudflare adapter at that point.
 */
const isDev = process.env.NODE_ENV !== 'production';

/**
 * Only the production Pages project sets this. A sitemap on staging would
 * invite the exact crawl the no-index is there to prevent.
 */
const isIndexable = process.env.PUBLIC_INDEXABLE === 'true';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    mdx(),
    markdoc(),
    react(),
    ...(isIndexable ? [sitemap()] : []),
    ...(isDev ? [keystatic()] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Preview sandboxes serve the dev server through a proxy host, which Vite
    // rejects by default.
    server: { allowedHosts: true },
  },
});
