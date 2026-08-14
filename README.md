# Eluu website

The Eluu marketing site. Astro 7 + Tailwind v4, transcribed from the Figma file
**Eluu 1.1** (`V4eoKtfRI3dkWXk9tW5u3v`) against the design system
**Eluu Design System ✦ Align UI** (`JTxPqUxNWvS1AqDvLEf8Yz`).

## Run it

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static output in dist/
```

Node ≥ 22.12 is required (see `engines` in `package.json`).

## Read this before changing anything

**`CONTRACT.md` is binding.** In short:

- **No raw colour values.** No hex, no `rgb()`, no `rgba()` in a `.astro` file.
  Every colour is a token — see `src/styles/tokens.css`, which is generated from
  the Figma design system's swatch tiles. A raw hex is a review failure.
- **Type comes from the `.t-*` classes** in `src/styles/global.css`, never an
  ad-hoc `text-[32px]`. They are fluid and already correct at every width.
- **Unverified copy renders visibly.** Anything the content pack marked
  `[VERIFY]`, `[BENCHMARK]` or `[TO COLLECT]` is wrapped in `.copy-needed` and
  shows as pink with a dotted underline. Never invent a number, quote or
  attribution to fill a slot — leave the marker.

## Layout

```
src/
  components/
    site/      nav, footer, CTA band, theme switch, LiveArt
    home/      the home page sections
    platform/  the product-pillar template
    use-case/  the use-case template, plus sections both templates share
    badges/    SOC 2 / ISO 27001 / GDPR artwork, recoloured onto tokens
    ui/        Button
  content/     MDX with typed front-matter — see src/content.config.ts
  layouts/     Base.astro
  lib/         navigation, shared page schema
  styles/      tokens.css (generated) + global.css (@theme + type scale)
public/
  brand/       logo lockups, both polarities
  live/        the animated illustrations, embedded as iframes
```

## Two things that will bite you

**`public/live/tokens.css` is a COPY.** The illustrations are iframes and cannot
see the site's stylesheet, so they load their own copy of the tokens.
`npm run sync:tokens` regenerates it and is wired into `build` and `dev`. Never
hand-edit it — a new token is invisible inside the frames until it is synced.

**Keystatic is dev-only.** It is mounted when `NODE_ENV !== 'production'`, so
the production build stays fully static with no server adapter. Editors run it
locally at `/keystatic` and commit the MDX. Hosting it would need the Cloudflare
adapter added back.

## Deploying

Cloudflare Pages, production branch `main`, build `npm run build`, output
`dist`, and set `NODE_VERSION=22`. Full steps, including the staging domain and
keeping it out of Google, are in `DEPLOY.md`.
