# PostHog Tracking — Design Spec

**Date:** 2026-04-07
**Status:** Approved (post-review v2)
**Scope:** Add PostHog analytics to the Eluu marketing site (eluu-clone, Astro 6.1 static site)

## Goal

Track visitor behaviour on the marketing site so the team can measure conversions, see which pages drive intent, and identify drop-off points in the funnel from landing → CTA click → app/demo booking.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Tracking depth | C — page views + autocapture + named conversion events | Autocapture covers the long tail, named events make funnels queryable |
| Integration approach | 1 — official inline JS snippet | Standard PostHog pattern for static sites, no npm dependencies |
| Consent banner | None — Approach A | B2B SaaS site, privacy policy already discloses analytics in section 13 |
| Session replay | Not in scope | Adds storage cost; revisit if conversion analysis needs it |
| Feature flags | Not in scope | Not requested |
| User identification | Not in scope | No logged-in users on marketing site; PostHog generates anonymous distinct IDs |
| `respect_dnt` | Left at PostHog default (`false`) | Matches existing privacy policy line 90 ("we do not currently respond to DNT browser signals") |

## PostHog Configuration

Inline snippet `posthog.init()` config:

```js
posthog.init('phc_yMKcL5aV4EJj9ZSiSpq7xTS5snmw6ECeM3ondvNBnidZ', {
  api_host: 'https://us.i.posthog.com',
  // Capture
  autocapture: true,         // default — captures all clicks/forms
  capture_pageview: true,    // default — fires $pageview on init + history changes
  capture_pageleave: true,   // default — fires $pageleave for time-on-page
  // Persistence
  persistence: 'localStorage+cookie',  // default
  // Privacy
  // respect_dnt deliberately omitted — defaults to `false`, matches privacy policy
  // Localhost opt-out — keep dev events out of production data
  loaded: function (ph) {
    if (typeof window !== 'undefined' && location.hostname === 'localhost') {
      ph.opt_out_capturing();
    }
  },
})
```

The project key `phc_yMKcL5...` is the public write-only key — safe to commit. PostHog explicitly designs project keys to be exposed client-side. Hardcoding now; if dev/staging/prod separation is ever needed, switch to `import.meta.env.PUBLIC_POSTHOG_KEY`.

## Architecture

### New files (2)

- `src/components/PostHog.astro` — wraps the official PostHog inline snippet using `is:inline` directive. Single responsibility: initialize PostHog. Used in both layouts. **The `<script is:inline>` directive is REQUIRED** — without it, Astro tries to TypeScript-process the snippet (tsconfig is strict), which trips on `window.posthog` typing and breaks the IIFE the snippet relies on.

- `src/env.d.ts` — TypeScript declaration `interface Window { posthog?: any }` so inline `onclick="window.posthog?.capture(...)"` doesn't trip strict-mode TypeScript checks.

### Modified files (7)

| File | Change |
|---|---|
| `src/layouts/Layout.astro` | Add `<PostHog />` to `<head>` (for `/`, `/pricing`) |
| `src/layouts/LegalLayout.astro` | Add `<PostHog />` to `<head>` AND add `onclick` to its inline navbar Log in button |
| `src/components/Hero.astro` | Add `onclick` to "Get started" + "Book a demo" |
| `src/components/CTAFooter.astro` | **Fix existing URL bug** (Book a demo currently → `app.eluu.ai`, should be `cal.com/...`) AND add `onclick` to both buttons |
| `src/components/Navbar.astro` | Add `onclick` to "Log in" |
| `src/pages/pricing.astro` | Add explicit `slug` field to plans array, add `onclick` to plan CTAs |

### Component placement

The `<PostHog />` snippet sits in `<head>` so it executes before page content paints. The official snippet defines `window.posthog` immediately as a stub that queues calls until the real `array.js` library loads async — this means click handlers that fire before the lib loads still get queued and delivered.

Order within `<head>`: AFTER the splash skip script and splash CSS (so the splash logic loads first and the user sees it immediately, even if PostHog's stub script has any tiny parse delay). Functionally negligible but cleaner mental model.

## Event Taxonomy

Five named events with explicit semantic meaning:

| Event name | Properties | Triggered by |
|---|---|---|
| `get_started_clicked` | `{ location: 'hero' \| 'cta_footer' }` | Hero "Get started" button, CTAFooter "Get started" button |
| `book_demo_clicked` | `{ location: 'hero' \| 'cta_footer' }` | Hero "Book a demo" button, CTAFooter "Book a demo" button |
| `log_in_clicked` | `{ location: 'navbar' \| 'legal_navbar' }` | Navbar "Log in" button (Layout) AND LegalLayout's inline navbar Log in button |
| `pricing_plan_selected` | `{ plan: 'pro' \| 'max' }` | Pro / Max plan card CTAs on `/pricing` |
| `enterprise_contact_clicked` | `{}` | Enterprise plan card "Contact sales" CTA on `/pricing` |

**Why split `log_in_clicked` from `get_started_clicked`:** different user populations (existing vs new). Funnel analysis is dramatically cleaner when these are separated. The "Log in" label implies returning user, "Get started" implies new user — they belong to different conversion funnels.

**Why split `enterprise_contact_clicked` from `pricing_plan_selected`:** Enterprise CTA goes to `cal.com` (sales-led), Pro/Max go to `app.eluu.ai` (self-serve). These represent fundamentally different sales motions — measuring them as one event mixes self-serve and sales-led signals.

**Why these five only:** they're the only conversion-relevant clicks. Everything else (testimonial tabs, social links, pricing nav button, integration cards, footer legal links) is captured automatically by autocapture and queryable from there. Adding named events for non-conversion clicks would clutter the event log.

### Auto-tracked (no code needed)
- `$pageview` — fires on initial load + history navigation (5 pages)
- `$pageleave` — fires when user navigates away or closes tab (gives time-on-page)
- `$autocapture` — fires for every click, form submit, input interaction
- Anonymous `distinct_id` — auto-generated per visitor, persisted in cookie + localStorage
- UTM params, referrer, browser, OS, device type, screen size, country (from IP) — auto-attached as event properties

## Implementation Pattern

Inline `onclick` attribute on each tracked element:

```astro
<a
  href="https://app.eluu.ai"
  class="hero-btn hero-btn-dark"
  onclick="window.posthog?.capture('get_started_clicked', { location: 'hero' })"
>
  Get started →
</a>
```

**Why inline `onclick`:**
- Minimal code per call site (one attribute)
- No helper module to import
- Optional chaining (`window.posthog?.`) handles cases where PostHog is blocked entirely (adblocker, CSP, network failure, missing layout) — see "Race condition" below
- Astro doesn't process inline event handlers — they pass through to HTML as-is, no client island overhead

**Not using `event.preventDefault()`:** the click fires the event AND immediately follows the link. PostHog uses `navigator.sendBeacon` for best-effort delivery on navigation. There's a known small (~5-10%) reliability gap when navigating to a different origin — this is acceptable for marketing-site funnels where the loss is consistent across cohorts and doesn't bias the conversion rate.

### Pricing plan slug

The plans array currently uses `name: 'Pro plan' | 'Max plan' | 'Enterprise plan'`. **Add an explicit `slug` field** so the event prop value comes from the data, not runtime string parsing:

```js
const plans = [
  { slug: 'pro', name: 'Pro plan', ... },
  { slug: 'max', name: 'Max plan', ... },
  { slug: 'enterprise', name: 'Enterprise plan', ... },
];
```

Pro/Max use `pricing_plan_selected { plan: plan.slug }`. Enterprise uses `enterprise_contact_clicked` and ignores the slug.

### Race condition / `window.posthog` undefined

The official PostHog snippet defines `window.posthog` immediately as a stub queue object that buffers method calls until the real library loads. So `window.posthog?.capture(...)` essentially never short-circuits when the snippet has run successfully — the call goes to the queue and is replayed when the lib loads.

**The optional chaining is still useful for graceful degradation:**
- Adblockers (uBlock Origin etc.) that block the snippet from loading at all → `window.posthog` is undefined → call no-ops
- DNS failures, network errors, strict CSP that blocks the script
- Defensive against the developer forgetting to add `<PostHog />` to a new layout

## What's NOT in scope

- Consent banner / cookie modal
- Session replay (defer — adds meaningful storage cost, will revisit if conversion analysis needs it)
- Feature flags
- `identify()` calls (no logged-in users on marketing site)
- Event helper module (`src/lib/track.ts`) — overkill for 7 click handlers
- Environment variables for the project key — hardcoding the public key is fine
- Server-side event capture
- Custom super properties beyond PostHog defaults
- 404 page tracking (no 404.astro exists; out of scope)
- Scroll-depth tracking (PostHog doesn't auto-capture; defer)
- Removal/cleanup of the placeholder docs link in the footer (separate task)
- Updating privacy policy text (section 13 already covers analytics cookies adequately)

## Verification

### Local verification (no PostHog account needed)

1. Add `?debug=true` to localhost URL OR run `posthog.debug()` in browser console — PostHog logs every event to console
2. Open browser DevTools → Network tab → filter by `posthog`. You should see POST requests to `us.i.posthog.com/e/` with the event payload visible in the request body
3. Browser DevTools → Application → Cookies → look for `ph_phc_yMKcL5...` cookies after first interaction
4. Note: if `localhost` opt-out is active (per the `loaded` config), events will NOT actually send. To test sends locally, comment out the localhost guard temporarily OR use a non-localhost dev URL

### Remote verification (after deploy to staging)

1. Open PostHog dashboard → Project → Events → Live
2. Visit https://staging.eluu.ai
3. Within ~5 seconds, see `$pageview`, `$autocapture` events
4. Click Hero "Get started" → confirm `get_started_clicked { location: 'hero' }` appears
5. Navigate to `/pricing`, click Pro card CTA → confirm `pricing_plan_selected { plan: 'pro' }` appears
6. Click Enterprise "Contact sales" → confirm `enterprise_contact_clicked` appears
7. Click Navbar "Log in" → confirm `log_in_clicked { location: 'navbar' }` appears
8. Visit `/privacy`, click its inline navbar "Log in" → confirm `log_in_clicked { location: 'legal_navbar' }` appears
9. Verify all 5 pages fire `$pageview`

## Privacy Compliance Note

For a B2B SaaS marketing site without consent banner, the disclosure-only approach is the **minimum viable** legal posture:

- **GDPR (EU):** Risky — ePrivacy Directive (Article 5(3)) generally requires consent for analytics cookies. Several EU regulators have actively enforced this. Risk is low-probability for a small B2B SaaS, but real.
- **CCPA (California):** Probably OK — opt-out regime, privacy policy disclosure satisfies the baseline.
- **Australian Privacy Act:** OK — APP 5 (notification) is satisfied by privacy policy section 13's analytics disclosure. The company is based in Australia per the privacy policy, so this is the most relevant jurisdiction.

The decision is documented here so it's a conscious choice. Revisit if EU enforcement environment changes or if a complaint is filed.

## Files Touched (Summary)

| File | Change | Lines added (est.) |
|---|---|---|
| `src/components/PostHog.astro` | NEW — PostHog snippet wrapper with `is:inline` | ~25 |
| `src/env.d.ts` | NEW — `Window.posthog` type augmentation | ~5 |
| `src/layouts/Layout.astro` | Add import + `<PostHog />` tag | ~3 |
| `src/layouts/LegalLayout.astro` | Add import + `<PostHog />` tag + `onclick` on inline Log in | ~4 |
| `src/components/Hero.astro` | Add `onclick` to 2 CTAs | ~2 |
| `src/components/CTAFooter.astro` | **Fix Book a demo URL** + add `onclick` to 2 CTAs | ~3 |
| `src/components/Navbar.astro` | Add `onclick` to "Log in" | ~1 |
| `src/pages/pricing.astro` | Add `slug` field to 3 plans + `onclick` to plan CTA template | ~5 |

**Total:** 2 new files, 7 modified files, ~48 lines of code.

## Open Questions Resolved

| Question | Resolution |
|---|---|
| Hardcode key vs env var? | Hardcode (project keys are public). Env var path documented for future. |
| Inline `onclick` vs `addEventListener`? | Inline `onclick` — minimal, defensible at this scale (7 handlers). |
| Group `log_in_clicked` with `get_started_clicked`? | Split — different user populations. |
| Group Enterprise with `pricing_plan_selected`? | Split — different sales motions. |
| Track LegalLayout's inline navbar Log in? | Yes — separate `location: 'legal_navbar'` value. |
| Fix CTAFooter Book a demo URL bug? | Yes — fix as part of this PR (1-line change, prevents misleading funnel data). |
| `respect_dnt`? | Leave at default (`false`) — matches privacy policy. |
| Localhost opt-out? | Yes — guard in `loaded` callback. |
| Window.posthog type declaration? | Yes — `src/env.d.ts`. |
