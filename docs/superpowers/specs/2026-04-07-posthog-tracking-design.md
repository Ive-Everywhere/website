# PostHog Tracking — Design Spec

**Date:** 2026-04-07
**Status:** Approved (pending spec review)
**Scope:** Add PostHog analytics to the Eluu marketing site (eluu-clone, Astro 6.1 static site)

## Goal

Track visitor behaviour on the marketing site so the team can measure conversions, see which pages drive intent, and identify drop-off points in the funnel from landing → CTA click → app/demo booking.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Tracking depth | C — page views + autocapture + named conversion events | Autocapture covers the long tail, named events make funnels queryable |
| Integration approach | 1 — official inline JS snippet | Standard PostHog pattern for static sites, no npm dependencies |
| Consent banner | None — Approach A | B2B SaaS site, privacy policy already discloses data practices, blocking banner hurts data quality |
| Session replay | Not in scope | Can be added later if needed |
| Feature flags | Not in scope | Not requested |
| User identification | Not in scope | No logged-in users on marketing site; PostHog generates anonymous distinct IDs |

## PostHog Configuration

| Setting | Value |
|---|---|
| Project key | `phc_yMKcL5aV4EJj9ZSiSpq7xTS5snmw6ECeM3ondvNBnidZ` (public, hardcoded) |
| Host | `https://us.i.posthog.com` |
| Autocapture | `true` (default) |
| Capture pageview | `true` (default) |
| Capture pageleave | `true` (default) |
| Persistence | `localStorage+cookie` (default) |

The project key is the public write-only key — safe to commit to git. PostHog explicitly designs project keys to be exposed client-side.

## Architecture

### New file
- `src/components/PostHog.astro` — wraps the official PostHog inline snippet. Single responsibility: initialize PostHog. Used in both layouts.

### Modified files
- `src/layouts/Layout.astro` — adds `<PostHog />` to `<head>` (for `/`, `/pricing`)
- `src/layouts/LegalLayout.astro` — adds `<PostHog />` to `<head>` (for `/privacy`, `/security`, `/terms`)
- `src/components/Hero.astro` — adds inline `onclick` to "Get started" + "Book a demo"
- `src/components/CTAFooter.astro` — adds inline `onclick` to "Get started" + "Book a demo"
- `src/pages/pricing.astro` — adds inline `onclick` to all 3 plan CTAs
- `src/components/Navbar.astro` — adds inline `onclick` to "Log in"

### Component placement

The `<PostHog />` component sits in `<head>` so the snippet executes before page content paints. PostHog's `posthog-js` library is loaded async by the snippet, so it doesn't block render. Autocapture begins as soon as the library finishes loading (~200-500ms after initial paint).

## Event Taxonomy

Three named conversion events:

| Event | Properties | Triggered by |
|---|---|---|
| `get_started_clicked` | `{ location: 'hero' \| 'cta_footer' \| 'navbar' }` | Hero "Get started" button, CTAFooter "Get started" button, Navbar "Log in" button |
| `book_demo_clicked` | `{ location: 'hero' \| 'cta_footer' }` | Hero "Book a demo" button, CTAFooter "Book a demo" button |
| `pricing_plan_selected` | `{ plan: 'pro' \| 'max' \| 'enterprise' }` | Each plan card CTA on `/pricing` |

**Why grouped:** `get_started_clicked` includes the navbar "Log in" because it goes to the same destination (`app.eluu.ai`) and represents the same conversion intent (move to product). The `location` prop separates them in PostHog dashboards.

**Why these three only:** they're the only conversion-relevant clicks. Everything else (testimonial tabs, social links, footer nav links, pricing nav button, integration cards, etc.) is captured automatically by autocapture and queryable from there. Adding named events for non-conversion clicks would just clutter the event log.

### Auto-tracked (no code needed)
- `$pageview` — fires on initial load + history navigation, 5 pages total
- `$pageleave` — fires when user navigates away or closes tab
- `$autocapture` — fires for every click, form submit, input interaction
- `$identify` — anonymous distinct ID auto-generated and persisted
- UTM params, referrer, browser, OS, country (from IP), screen size — auto-attached

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
- Optional chaining (`window.posthog?.`) gracefully no-ops if PostHog hasn't loaded yet (e.g., adblockers, slow networks)
- Astro doesn't process inline event handlers — they pass through to HTML as-is, no client island overhead
- `posthog.capture()` is fire-and-forget — queued in localStorage if the network call doesn't complete before navigation

**No `event.preventDefault()`:** the click fires the event AND immediately follows the link. PostHog batches sends and persists in localStorage, so even if the network request doesn't complete before the page unloads, the event is delivered on the next pageview.

## What's NOT in this spec

- Consent banner / cookie modal
- Session replay
- Feature flags
- `identify()` calls (no logged-in users on marketing site)
- Event helper module (`src/lib/track.ts`) — overkill for 6 click handlers
- Environment variables for the project key — hardcoding the public key is fine
- Server-side event capture
- Custom super properties beyond PostHog defaults
- Removal/cleanup of the placeholder docs link in the footer (separate task)

## Verification Plan

After deployment:
1. Open PostHog dashboard → Project → Events → Live
2. Visit https://staging.eluu.ai (or local dev with the snippet active)
3. Within ~5 seconds, see:
   - `$pageview` event for `/`
   - `$autocapture` events as elements are clicked
4. Click "Get started" in the hero
5. Confirm `get_started_clicked` event appears with `location: 'hero'`
6. Navigate to `/pricing`, click "Get started" on Pro
7. Confirm `pricing_plan_selected` event appears with `plan: 'pro'`
8. Verify all 5 pageview events fire by visiting all 5 pages

## Files Touched (Summary)

| File | Change | Lines added (est.) |
|---|---|---|
| `src/components/PostHog.astro` | NEW — PostHog snippet wrapper | ~25 |
| `src/layouts/Layout.astro` | Add `<PostHog />` import + tag | ~3 |
| `src/layouts/LegalLayout.astro` | Add `<PostHog />` import + tag | ~3 |
| `src/components/Hero.astro` | Add `onclick` to 2 CTAs | ~2 |
| `src/components/CTAFooter.astro` | Add `onclick` to 2 CTAs | ~2 |
| `src/components/Navbar.astro` | Add `onclick` to "Log in" | ~1 |
| `src/pages/pricing.astro` | Add `onclick` to plan CTA template | ~1 |

**Total:** 1 new file, 6 modified files, ~37 lines of code.
