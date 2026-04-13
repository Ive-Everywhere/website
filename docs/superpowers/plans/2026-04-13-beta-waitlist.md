# Beta Waitlist Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-mode `/beta` waitlist page with email form, community links, and product iframe. Update the homepage hero CTA to link here. Add dark theme variant to the Navbar.

**Architecture:** Single new Astro page (`beta.astro`) with all markup, CSS, and JS inline. No new layout file — the page is self-contained since it has a unique dark aesthetic. Navbar gets `[data-theme="dark"]` CSS rules. Hero.astro gets a 2-line CTA change.

**Tech Stack:** Astro 6.1, vanilla CSS, vanilla JS

**Spec:** `docs/superpowers/specs/2026-04-13-beta-waitlist-design.md`

---

### Task 1: Create the beta page — markup + styles + form JS

**Files:**
- Create: `src/pages/beta.astro`

- [ ] **Step 1: Create the full beta page**

The page is self-contained — imports global.css, Navbar, Footer, PostHog. Sets `<html data-theme="dark">` to trigger navbar dark mode.

Structure:
- `<html data-theme="dark">` with dark bg
- `<head>` with meta, fonts, PostHog, splash skip script
- `<body>` with warm bridge image blur as `::before` pseudo
- Navbar component
- Main content: split layout (text/form left, iframe right)
  - Badge pill "Closed Beta" in orange
  - Headline: "The future of work is agentic." massive Season Mix
  - Description paragraph
  - Email form (input + button side by side)
  - Community links (Slack + Discord pills with SVG icons)
- Dark-adapted iframe with glow/border wrappers
- Zoom detection script (same 4-method pattern)
- Form submit handler (preventDefault, show confirmation, PostHog event)

Key CSS (all scoped within the page):
- `.beta-page` body: `background: #0a0908`, warm bridge blur `::before`
- `.beta-inner`: max-width 1320px, flex row, gap 48px, stacks at 900px
- `.beta-text`: flex 45%, content stack
- `.beta-iframe`: flex 55%, dark iframe wrappers
- `.beta-badge`: orange outlined pill
- `.beta-headline`: Season Mix 700, clamp(36px, 6vw, 64px), white
- `.beta-desc`: Inter 16px, rgba(255,255,255,0.65)
- `.beta-form`: flex row (input flex:1 + button), stacks on mobile
- `.beta-input`: dark bg, white text, subtle border
- `.beta-submit`: orange bg, white text, hover glow
- `.beta-confirmation`: hidden by default, shown on submit
- `.beta-community`: muted label + two outlined pills
- Dark iframe wrappers: inverted glow/border colors

Form JS (inline script):
```js
document.querySelector('.beta-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.beta-form').style.display = 'none';
  document.querySelector('.beta-confirmation').style.display = 'block';
  window.posthog?.capture('waitlist_submitted');
});
```

Community link PostHog:
```html
onclick="window.posthog?.capture('community_slack_clicked')"
onclick="window.posthog?.capture('community_discord_clicked')"
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/beta.astro
git commit -m "feat: create dark-mode beta waitlist page with form and iframe"
```

---

### Task 2: Add dark theme CSS to Navbar

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Add `[data-theme="dark"]` CSS rules**

Append these rules to the existing `<style>` block in Navbar.astro, before the closing `</style>`:

```css
/* ── Dark theme variant (for /beta page) ── */
[data-theme="dark"] .nav-wordmark { color: #ffffff; }
[data-theme="dark"] .nav-link { color: rgba(255, 255, 255, 0.7); }
[data-theme="dark"] .nav-link:hover { color: #ffffff; opacity: 1; }
[data-theme="dark"] .nav-chevron { color: rgba(255, 255, 255, 0.7); }
[data-theme="dark"] .nav-btn { color: #0a0908; background: #ffffff; }
[data-theme="dark"] .nav-btn:hover { box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15); }
[data-theme="dark"] .site-nav.scrolled {
  background: rgba(10, 9, 8, 0.85);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}
[data-theme="dark"] .site-nav.dropdown-open {
  background: rgba(10, 9, 8, 0.75);
}
[data-theme="dark"] .nav-dropdown-inner { border-top-color: rgba(255, 255, 255, 0.06); }
[data-theme="dark"] .nav-dd-item h4 { color: #ffffff; }
[data-theme="dark"] .nav-dd-item p { color: rgba(255, 255, 255, 0.5); }
[data-theme="dark"] .nav-dd-item:hover { background: rgba(255, 255, 255, 0.06); }
[data-theme="dark"] .ft-uc-tab-title { color: rgba(255, 255, 255, 0.4); }
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add dark theme CSS variant to Navbar for beta page"
```

---

### Task 3: Update homepage hero CTA

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Change the "Get started" button**

Find the hero CTA link (around line 29):
```html
<a href="https://app.eluu.ai" class="hero-btn hero-btn-dark" ... >Get started <svg ...
```

Change to:
```html
<a href="/beta" class="hero-btn hero-btn-dark" ... >Try Eluu Beta <svg ...
```

Only change `href` and button text. Keep the arrow SVG, inline styles, and PostHog onclick.

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: update hero CTA to link to /beta waitlist page"
```

---

### Task 4: Build verification

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: clean build, 7 pages (6 existing + /beta).

- [ ] **Step 2: Verify beta page exists**

```bash
ls dist/beta/ && grep -c "Closed Beta\|future of work\|waitlist_submitted" dist/beta/index.html
```

Expected: `index.html` exists, 3+ content matches.

- [ ] **Step 3: Verify dark theme**

```bash
grep -c 'data-theme="dark"' dist/beta/index.html
```

Expected: 1 match (on the `<html>` tag).

- [ ] **Step 4: Verify homepage CTA changed**

```bash
grep -o 'href="/beta"' dist/index.html | head -1
```

Expected: 1 match.

- [ ] **Step 5: Visual verification**

Open `http://localhost:4321/beta` and check:
1. Dark background with subtle warm glow
2. Navbar is white text on dark (inverted)
3. "Closed Beta" orange badge
4. Headline, description, email form
5. Submit form → "You're on the list!" confirmation
6. Slack + Discord community pills
7. Iframe on the right, dark-adapted borders
8. Responsive at 375px — stacked, form stacks
9. Homepage → "Try Eluu Beta" button → navigates to /beta
