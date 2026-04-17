# Cursor-Style Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the Eluu homepage to match Cursor.com's dark aesthetic — dark background, 1300px fixed width, slimmer navbar, Cursor-style hero, 4-feature grid, dark sections throughout.

**Architecture:** Pure CSS/HTML refactor of existing Astro components. No new files created. All 10 component files updated with dark theme colors, 1300px max-width constraint, and Cursor-matching typography. Working directory: `/tmp/eluu-preview`.

**Tech Stack:** Astro 6.1, vanilla CSS, existing component structure

**Spec:** `docs/superpowers/specs/2026-04-15-cursor-redesign-design.md`

---

### Task 1: Global CSS Dark Theme

**Files:**
- Modify: `src/styles/global.css`

Update CSS variables and body defaults to dark theme with Cursor's color palette.

- [ ] **Step 1: Replace theme variables and body styles**

In `src/styles/global.css`, replace the `@theme inline` block (lines 40-57) with:

```css
@theme inline {
  --font-sans: "Inter", sans-serif;
  --font-heading: "Season Mix", sans-serif;
  --font-serif: "Crimson Text", serif;
  --font-mono: "Roboto Mono", monospace;

  --color-bg: #14120b;
  --color-bg-card: #1b1913;
  --color-bg-card-hover: #201e18;
  --color-bg-warm: #1b1913;
  --color-bg-dark: #14120b;
  --color-tx: #edecec;
  --color-tx-2: rgba(237, 236, 236, 0.6);
  --color-tx-3: rgba(237, 236, 236, 0.4);
  --color-tx-4: rgba(237, 236, 236, 0.25);
  --color-border: rgba(237, 236, 236, 0.06);
  --color-border-mid: rgba(237, 236, 236, 0.1);
  --color-dark: #edecec;
  --color-dark-2: #d7d6d5;
  --color-dark-3: #b5b5b5;
  --color-accent: #ED733B;
  --max-w: 1300px;
}
```

Then replace the body block (lines 70-76) with:

```css
body {
  background: #14120b;
  color: #edecec;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Inter", sans-serif;
}

::selection { background: rgba(237, 236, 236, 0.15); }
```

- [ ] **Step 2: Verify**

Run: `cd /tmp/eluu-preview && npm run build`
Open `http://localhost:4323`. Page background should be dark `#14120b`. Text may look wrong until individual components are updated — that's expected.

- [ ] **Step 3: Commit**

```bash
cd /tmp/eluu-preview
git add src/styles/global.css
git commit -m "feat: switch to Cursor dark theme variables"
```

---

### Task 2: Layout.astro — Dark Splash Screen

**Files:**
- Modify: `src/layouts/Layout.astro`

Change splash screen background from light cream to dark.

- [ ] **Step 1: Update splash background color**

In `src/layouts/Layout.astro`, find the inline `<style is:inline>` block. Replace every occurrence of `background-color: #f4f3ec` with `background-color: #14120b`. Also find the `.splash` class and update it.

Specifically change:
- `.splash { ... background-color: #f4f3ec; ... }` → `background-color: #14120b;`
- Any `.splash-inner` or splash-related light colors → use `#edecec` for text/logo elements

Also remove the preload for the bridge background image since we're removing it from the hero:
Find `<link rel="preload" href="/images/2683d4a4805b7192bd38dc39f0c5321f8c2b5696.png"` and remove that line.

- [ ] **Step 2: Commit**

```bash
cd /tmp/eluu-preview
git add src/layouts/Layout.astro
git commit -m "feat: dark splash screen and remove bridge image preload"
```

---

### Task 3: Navbar — Slim, Dark, 1300px

**Files:**
- Modify: `src/components/Navbar.astro`

Slim down the navbar, apply dark theme, constrain to 1300px.

- [ ] **Step 1: Update nav bar padding and container**

Find `.nav-bar` padding rules and replace with slimmer values:

```css
.nav-bar {
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
}
```

Remove the responsive padding overrides for `.nav-bar` (`@media (min-width: 640px)` and `@media (min-width: 1024px)` blocks for `.nav-bar`).

Find `.nav-container { max-width: 1800px; ... }` and change to `max-width: 1300px`.

- [ ] **Step 2: Scale down logo and wordmark**

Find `.nav-logo { width: 40px; height: 40px; }` and change to `width: 32px; height: 32px;`.
Find the 640px media query `.nav-logo { width: 48px; height: 48px; }` and change to `width: 32px; height: 32px;`.

Find `.nav-wordmark { ... font-size: 34px; ... }` and change to `font-size: 28px;`.
Find the 640px media query `.nav-wordmark { font-size: 40px; }` and change to `font-size: 28px;`.

- [ ] **Step 3: Dark theme colors**

Find `.nav-link` color `#17100e` and change to `rgba(237, 236, 236, 0.7)`.
Find `.nav-link:hover { opacity: 0.6; }` and change to `color: #edecec; opacity: 1;`.
Change `.nav-link` font-size from `15px` to `14px`.

Find `.nav-wordmark` color `#17100e` and change to `#edecec`.

Find `.nav-btn` styles and update:
```css
.nav-btn {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #14120b;
  background: #edecec;
  border-radius: 8px;
  padding: 8px 18px;
  text-decoration: none;
  line-height: 1;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(237, 236, 236, 0.15);
}
```

- [ ] **Step 4: Dark scroll and dropdown states**

Find `.site-nav.scrolled` and replace with:
```css
.site-nav.scrolled {
  background: rgba(20, 18, 11, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(237, 236, 236, 0.06);
}
```

Find `.site-nav.dropdown-open` and replace with:
```css
.site-nav.dropdown-open {
  background: rgba(20, 18, 11, 0.85);
  backdrop-filter: blur(40px) saturate(1.15);
  -webkit-backdrop-filter: blur(40px) saturate(1.15);
  border-bottom: 1px solid rgba(237, 236, 236, 0.06);
}
```

Find `.nav-dd-item h4` color and change to `#edecec`.
Find `.nav-dd-item p` color and change to `rgba(237, 236, 236, 0.5)`.
Find `.nav-dd-item:hover` background and change to `rgba(237, 236, 236, 0.06)`.
Find `.nav-chevron` — change its parent color to match nav link color.

- [ ] **Step 5: Remove dark theme variant overrides**

The `[data-theme="dark"]` CSS overrides (lines ~303-320) can be removed since the whole site is now dark. Delete all rules starting with `[data-theme="dark"]`.

- [ ] **Step 6: Verify**

Reload `localhost:4323`. Navbar should be slim (56px), dark background, light text, 1300px wide. Dropdowns should be dark with blur.

- [ ] **Step 7: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Navbar.astro
git commit -m "feat: slim dark navbar with 1300px width"
```

---

### Task 4: Hero — Left-Align, Cursor Sizes, Remove BG, Pills

**Files:**
- Modify: `src/components/Hero.astro`

Restructure hero to match Cursor: left-aligned text, Cursor font sizes, remove background image, pill buttons.

- [ ] **Step 1: Remove background image from HTML**

Delete the `<img>` tag for the bridge background (lines 6-11):
```html
<img
  src="/images/2683d4a4805b7192bd38dc39f0c5321f8c2b5696.png"
  alt=""
  aria-hidden="true"
  class="hero-bg-img"
/>
```

- [ ] **Step 2: Remove iframe glow/border wrappers**

Replace the iframe wrapper structure. Find the `hero-iframe-wrap` div and simplify — remove `iframe-glow` and `iframe-border` wrappers. Keep the iframe and loader. The new structure:

```html
<div class="hero-iframe-wrap" data-iframe-wrapper>
  <div class="iframe-aspect-box">
    <iframe
      id="hero-iframe"
      src="https://demo.eluu.ai/?autoplay=1&embed=1"
      title="Eluu product demo"
      allow="autoplay"
      sandbox="allow-scripts allow-same-origin"
      tabindex="-1"
      class="hero-iframe"
    ></iframe>
    <div class="iframe-loader" id="iframe-loader" aria-hidden="true">
      <img src="/images/logo.svg" alt="" class="iframe-loader-logo" width="80" height="80" />
    </div>
  </div>
</div>
```

- [ ] **Step 3: Update hero CSS**

Replace the hero section styles. Key changes:

```css
.hero-section {
  background: #14120b;
  position: relative;
  overflow: hidden;
}

.hero-inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 67px 20px;
  display: flex;
  flex-direction: column;
  gap: 45px;
  box-sizing: border-box;
}

.hero-heading {
  font-family: 'Season Mix', sans-serif;
  font-weight: 400;
  font-size: 26px;
  letter-spacing: -0.0125em;
  color: #edecec;
  line-height: 1.25;
  margin: 0;
  text-align: left;
  max-width: 65ch;
}

.hero-subheading {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(237, 236, 236, 0.6);
  line-height: 1.5;
  margin: 0;
  text-align: left;
}

.hero-btn {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 0.89em 1.45em;
  border-radius: 9999px;
  text-decoration: none;
  line-height: 1;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hero-btn:hover { transform: translateY(-1px); }
.hero-btn-dark {
  color: #14120b;
  background: #edecec;
  border: 1px solid #edecec;
}
.hero-btn-dark:hover { box-shadow: 0 4px 12px rgba(237, 236, 236, 0.15); }
.hero-btn-light {
  color: #edecec;
  background: transparent;
  border: 1px solid rgba(237, 236, 236, 0.2);
}
.hero-btn-light:hover {
  border-color: rgba(237, 236, 236, 0.4);
  box-shadow: 0 4px 12px rgba(237, 236, 236, 0.08);
}
```

Update `.rotate-clip` color to keep `#ED733B` (already correct).

Update `.hero-iframe-wrap`:
```css
.hero-iframe-wrap {
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(237, 236, 236, 0.06);
}
```

Remove `.iframe-glow`, `.iframe-border` CSS rules entirely.
Remove `.hero-bg-img` CSS rules entirely.
Remove `.hero-content` absolute positioning — make it normal flow.

- [ ] **Step 4: Verify**

Reload. Hero should show: dark bg, left-aligned headline at 26px, pill buttons (one filled light, one ghost), iframe below with subtle border, no background image.

- [ ] **Step 5: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Hero.astro
git commit -m "feat: Cursor-style hero with left-align, pills, no bg image"
```

---

### Task 5: Features — 4-Card Dark Grid

**Files:**
- Modify: `src/components/Features.astro`

Replace 6-card row with 4-card 2x2 grid, dark theme, 1300px.

- [ ] **Step 1: Update products array to 4 items**

In the frontmatter, replace the `products` array with 4 items:

```javascript
const products = [
  {
    title: 'Hard Drive',
    description: 'Each colleague gets its own storage for files, context, and memory.',
    icon: 'teamdrive',
  },
  {
    title: 'Recipes',
    description: 'Pre-built workflows that chain tools into multi-step automations. Activate in one click.',
    icon: 'recipes',
  },
  {
    title: 'Integrations',
    description: '20+ native connectors — CRM, billing, spreadsheets, Slack, and more.',
    icon: 'integrations',
  },
  {
    title: 'Multitasking',
    description: 'Run multiple colleagues in parallel across projects. Weeks of work done in hours.',
    icon: 'parallel',
  },
];
```

- [ ] **Step 2: Update section container width**

Find `max-width: 1440px` in the features section HTML and replace with `max-width: 1300px` (both in the products section and the security section).

- [ ] **Step 3: Update heading and card colors**

Find `.ft-heading` color `#17100e` and change to `#edecec`.
Find `.ft-section` background `#f4f3ec` and change to `#14120b`.

Update `.ft-card-text h3` color from `#17100e` to `#edecec`.
Update `.ft-card-text p` color from `#5c5c5c` to `rgba(237, 236, 236, 0.6)`.

- [ ] **Step 4: Update card grid to 2x2**

Replace the `.ft-cards` grid CSS:

```css
.ft-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: visible;
  padding: 0;
  margin: 0;
}
@media (min-width: 640px) {
  .ft-cards {
    grid-template-columns: 1fr 1fr;
  }
}
```

Remove the 480px, 768px, and 1024px breakpoints for `.ft-cards` that set 3-col and 6-col layouts.

- [ ] **Step 5: Update card styling to Cursor dark cards**

Replace `.ft-card` styles:

```css
.ft-card {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  background: #1b1913;
  border: 1px solid rgba(237, 236, 236, 0.025);
  border-radius: 4px;
  padding: 18px;
  transition: background 0.15s ease;
}
.ft-card:hover {
  background: #201e18;
}
```

Remove `.ft-card-hover` div and its CSS (the old hover overlay). Remove the `.ft-cards { overflow: hidden; padding: 12px; margin: -12px; }` rules.

- [ ] **Step 6: Simplify card icon**

Replace `.ft-card-icon` styles — remove the background image treatment:

```css
.ft-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.ft-card-icon svg {
  width: 48px;
  height: 48px;
  stroke: #edecec;
}
```

Remove `.ft-card-icon::before` and `.ft-card-icon::after` pseudo-elements.
Remove the `aspect-ratio`, `padding`, `overflow`, `position: relative` from `.ft-card-icon`.
Remove the `nth-child` background-position rules.

- [ ] **Step 7: Update security section to dark theme**

Find `.ft-security-section` and update its background.
Find `.ft-plat-text h2` and `.ft-plat-text p` — update colors:
- Heading: `#edecec`
- Paragraph: `rgba(237, 236, 236, 0.6)`

Find `.ft-plat-item h4` color `#17100e` → `#edecec`.
Find `.ft-plat-item p` color `#5c5c5c` → `rgba(237, 236, 236, 0.6)`.
Find `.ft-plat-icon` color `#17100e` → `#edecec`.
Find `.ft-plat-item` border-bottom color — change to `rgba(237, 236, 236, 0.06)`.

- [ ] **Step 8: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Features.astro
git commit -m "feat: 4-card dark grid with Cursor styling"
```

---

### Task 6: WhyEluu — Dark Theme, 1300px

**Files:**
- Modify: `src/components/WhyEluu.astro`

- [ ] **Step 1: Update container width**

Find `max-width: 1440px` and change to `max-width: 1300px`.

- [ ] **Step 2: Update section and card colors**

Find `.we` section background (if cream/white) and change to `#14120b`.
Find `.we-card` background and change to `#1b1913`.
Find `.we-card` border and change to `1px solid rgba(237, 236, 236, 0.06)`.

Find `.we-title` color and change to `#edecec`.
Find `.we-label` color and change to `rgba(237, 236, 236, 0.6)`.
Find `.we-text h3` color and change to `#edecec`.
Find `.we-text p` color and change to `rgba(237, 236, 236, 0.6)`.
Find `.we-media` border color and change to `rgba(237, 236, 236, 0.06)`.

- [ ] **Step 3: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/WhyEluu.astro
git commit -m "feat: dark theme WhyEluu with 1300px width"
```

---

### Task 7: Testimonials — Dark Theme

**Files:**
- Modify: `src/components/Testimonials.astro`

- [ ] **Step 1: Update container and colors**

Find `max-width: 1440px` and change to `max-width: 1300px`.

Find `.ts-section` background (white or cream) and change to `#14120b`.
Find quote text color and change to `#edecec`.
Find attribution/role color and change to `rgba(237, 236, 236, 0.6)`.
Find tab opacity colors — they should use `#edecec` base instead of dark colors. Update `.ts-tab` styles to use `opacity` on light-colored logos (add `filter: brightness(0) invert(1)` or similar if logos are dark).

- [ ] **Step 2: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Testimonials.astro
git commit -m "feat: dark theme testimonials"
```

---

### Task 8: Integrations — 1300px, Dark Text

**Files:**
- Modify: `src/components/Integrations.astro`

- [ ] **Step 1: Update container and text colors**

Find `max-width: 1440px` and change to `max-width: 1300px`.

In the inline styles on the heading `<h2>`:
- Change `color: #17100e` to `color: #edecec`

In the inline styles on the paragraph `<p>`:
- Change `color: #5c5c5c` to `color: rgba(237, 236, 236, 0.6)`
- Change `<strong style="color: #17100e;">` to `<strong style="color: #edecec;">`

Find `.ig-section` background and change to `#14120b`.

- [ ] **Step 2: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Integrations.astro
git commit -m "feat: dark theme integrations with 1300px width"
```

---

### Task 9: CTAFooter — Dark Theme

**Files:**
- Modify: `src/components/CTAFooter.astro`

- [ ] **Step 1: Update wrapper and text**

Find the outer `<section style="background: #f4f3ec;">` and change to `background: #14120b;`.

Find `.cta-heading` color and ensure it's `#ffffff` or `#edecec`.
Find `.cta-sub` color and change to `rgba(237, 236, 236, 0.6)`.

Update button colors:
- `.cta-btn-dark`: `color: #14120b; background: #edecec;`
- `.cta-btn-light`: `color: #edecec; background: transparent; border: 1px solid rgba(237, 236, 236, 0.2);`

Make buttons pill-shaped: `border-radius: 9999px;`.

- [ ] **Step 2: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/CTAFooter.astro
git commit -m "feat: dark CTA footer with pill buttons"
```

---

### Task 10: Footer — Dark Theme, 1300px

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Update footer styles**

Find `.site-footer` background `#ffffff` and change to `#1b1913`.
Find `.footer-inner` max-width `1440px` and change to `1300px`.

Find `.footer-logo-text` color and change to `#edecec`.
Find `.footer-tagline` color and change to `rgba(237, 236, 236, 0.5)`.
Find `.footer-copy` color and change to `rgba(237, 236, 236, 0.4)`.
Find `.footer-links a` color and change to `rgba(237, 236, 236, 0.5)`.
Find `.footer-links a:hover` color and change to `#edecec`.
Find social icon colors (`#a3a3a3`) and change to `rgba(237, 236, 236, 0.5)`.

- [ ] **Step 2: Commit**

```bash
cd /tmp/eluu-preview
git add src/components/Footer.astro
git commit -m "feat: dark footer with 1300px width"
```

---

### Task 11: Final Build and Visual QA

**Files:**
- All modified files

- [ ] **Step 1: Build**

```bash
cd /tmp/eluu-preview && npm run build
```

Expected: Clean build, 0 errors.

- [ ] **Step 2: Desktop QA (1200px+)**

Open `localhost:4323`. Verify:
- Dark background `#14120b` everywhere
- Navbar: 56px height, 1300px wide, dark, slim logo
- Hero: left-aligned 26px headline, pill buttons, iframe with no bg image
- Features: 2x2 grid of dark cards, no image backgrounds on icons
- WhyEluu: dark sticky cards, 1300px
- Testimonials: dark, light text
- Integrations: dark text, 1300px
- CTA: dark, pill buttons
- Footer: dark elevated bg, 1300px

- [ ] **Step 3: Mobile QA (375px)**

- Navbar: smaller logo, button scales down
- Hero: stacks vertically, readable
- Features: single column
- All sections: no horizontal overflow

- [ ] **Step 4: Commit any fixes**

```bash
cd /tmp/eluu-preview
git add -A
git commit -m "polish: final QA fixes for dark redesign"
```
