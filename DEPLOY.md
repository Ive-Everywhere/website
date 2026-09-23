# Deploying to staging.eluu.ai

Written 2026-08-05. Two halves: the push (mine, one command once approved) and
the Cloudflare Pages setup (yours — I have no Cloudflare credentials).

---

## 1. The push

**Repo:** `Ive-Everywhere/eluu-website` — a fresh repo, per Decision 1.
**Branch:** `main`. The site sits at the repo root.

The old `Ive-Everywhere/website` is untouched and keeps serving eluu.ai from
`prod-cloudflare`. Nothing here depends on it. Treat it as frozen: this repo is
where the site lives now.

### Pre-flight, already verified
- `NODE_ENV=production npm run build` → 16 pages, clean.
- `.gitignore` covers `node_modules/`, `dist/`, `.astro/`, `.env*`.
- No secrets in the tree (scanned; the only hit was `sk-` inside the icon name
  `ri-flask-line`).
- Working tree is 1.5 MB excluding build artefacts.

### Status
Done. The repo exists and `main` carries the site.

---

## 2. Cloudflare Pages

You do this part in the dashboard.

### Create the project
1. **Workers & Pages → Create → Pages → Connect to Git.**
2. Pick `Ive-Everywhere/eluu-website`.
3. **Production branch: `main`.**
4. Framework preset: **Astro**. That fills in the next two; check them anyway.
   - Build command: `npm run build`
   - Output directory: `dist`
5. Environment variables: **`NODE_VERSION` = `22`**. The project requires
   Node ≥ 22.12 (`package.json` engines) and Pages still defaults lower, so the
   build fails without this.
6. Deploy. First build takes a couple of minutes.

You get `<project>.pages.dev` immediately — worth checking before the domain.

### Point the domain
7. **Custom domains → Set up a custom domain → `staging.eluu.ai`.**
8. eluu.ai is already a Cloudflare zone, so Cloudflare writes the CNAME itself.
   Accept it. No manual DNS record, no TLS step.

### Keep it out of Google
Staging must not get indexed — it will compete with eluu.ai for the same terms
and the content is full of unverified placeholders.

Cheapest reliable option: **Cloudflare Access** in front of the whole project
(Zero Trust → Access → Applications → Self-hosted → `staging.eluu.ai`, policy
"Emails ending in @eluu.ai"). That blocks crawlers and casual visitors together.

If you want it open, then at minimum add a `public/_headers` file with
`X-Robots-Tag: noindex` for `/*` — say the word and I'll add it. A
`robots.txt` alone is not enough, since it stops crawling but not indexing of
links found elsewhere.

---

## 3. What ships with known gaps

Not blockers for staging, but they are visible and other sessions will hit them.
Everything unverified renders in a pink `copy-needed` marker, on purpose.

- **Every testimonial** across all 13 pages is `[VERIFY]` — the content pack has
  no real quotes yet.
- **Several stats** are `[VERIFY]` or `[BENCHMARK]`. `[VERIFIED]` ones (e.g.
  "378 runs") render normally.
- **The security paragraph ends mid-sentence** at "…and is constantly" — that is
  how the source ends; not a truncation bug.
- **5 feature-card visuals per page** across 12 pages say "Visual needed". The
  three existing animations cover the hero and the home feature cards only.
- **The compare page** still carries Devin / Cognition / Ona placeholder copy
  from the original Figma; it was not in the content pack.
- **Keystatic** is mounted in dev only, so the production build stays fully
  static with no adapter. Editors run it locally and commit. If you want a
  hosted `/keystatic` on staging, that needs the Cloudflare adapter added back —
  ask and I'll wire it.

---

## 4. After it is live

Tell the other sessions:
- Repo is `Ive-Everywhere/eluu-website`. The old `website` repo is frozen — do
  not push there.
- Content lives in `src/content/{platform,use-cases,blog,research,cookbook}` as
  MDX with typed front-matter (`src/content.config.ts`). Adding a page is one
  file.
- `site/CONTRACT.md` is binding: tokens only, no raw hex, `.t-*` type classes,
  `copy-needed` for anything unverified.
- Never edit `public/live/tokens.css` by hand — it is a build-time copy of
  `src/styles/tokens.css` (`npm run sync:tokens`).
