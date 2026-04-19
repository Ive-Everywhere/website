# Cursor-Style Dark Redesign — Design Spec

## Goal

Retheme and restructure the Eluu homepage to match Cursor.com's dark aesthetic: dark background, fixed 1300px content width, slimmer navbar, Cursor-style hero layout, 4-feature card grid, and consistent dark theming across all sections.

## Architecture

This is a CSS/HTML refactor of the existing Astro site. No new components are created — all existing components are modified in place. The changes are:
1. Global dark theme (CSS variables)
2. Fixed 1300px max-width on all content containers
3. Navbar slimmed down
4. Hero restructured (left-align text, remove bg image)
5. Features rewritten as 4-card grid
6. All remaining sections dark-themed and width-constrained
7. Font sizes adjusted to match Cursor's type scale

Fonts remain unchanged: Season Mix, Inter, Jersey 10.

## Global Theme — CSS Variables

Add to `src/styles/global.css`:

```
--color-bg: #14120b          (page background — Cursor dark)
--color-bg-card: #1b1913     (card/elevated surface)
--color-bg-card-hover: #201e18
--color-tx: #edecec           (primary text)
--color-tx-sec: rgba(237, 236, 236, 0.6)   (secondary — 60%)
--color-tx-ter: rgba(237, 236, 236, 0.4)   (tertiary — 40%)
--color-border: rgba(237, 236, 236, 0.06)  (subtle borders)
--color-border-mid: rgba(237, 236, 236, 0.1)
--color-accent: #ED733B       (existing orange accent)
--max-w: 1300px               (Cursor's fixed container width)
```

Body: `background: var(--color-bg); color: var(--color-tx);`

## Container Pattern

Every section's inner wrapper gets:
```css
max-width: 1300px;
margin: 0 auto;
padding-inline: 20px;
```

This replaces the current mix of 1440px, 1800px, 1320px values.

## Section Padding

Match Cursor's vertical rhythm (`v3 = 67.2px`):
```css
Section padding: 67px top/bottom, 20px left/right
```

On mobile (< 640px): `48px top/bottom, 16px left/right`

---

## Navbar

**File:** `src/components/Navbar.astro`

### Dimensions
- Fixed height: `56px`
- Inner container: `max-width: 1300px`
- Horizontal padding: `0 20px`

### Logo
- Logo img: `32px` height (down from 48px)
- Wordmark: `28px` font size (down from 40px)
- Gap between logo and wordmark: `8px`

### Nav Links
- Font size: `14px` (down from 15px)
- Font weight: `500`
- Color: `rgba(237, 236, 236, 0.7)`
- Hover: `#edecec` (full white)
- Gap between links: `28px` (down from 32px)

### Button (Log in)
- Font size: `13px` (down from 14px)
- Padding: `8px 18px` (down from 10px 24px)
- Background: `#edecec`
- Color: `#14120b`
- Border-radius: `8px` (keep existing)

### Scroll State
- Background: `rgba(20, 18, 11, 0.9)` with `backdrop-filter: blur(20px)`
- Border-bottom: `1px solid rgba(237, 236, 236, 0.06)`

### Dropdown
- Background: `rgba(20, 18, 11, 0.85)` with `backdrop-filter: blur(40px)`
- Item h4: `#edecec`
- Item p: `rgba(237, 236, 236, 0.5)`
- Item hover: `rgba(237, 236, 236, 0.06)` bg

### Mobile
- Hide nav links below 768px (same as current)
- Smaller logo/wordmark scales same as current breakpoints

---

## Hero Section

**File:** `src/components/Hero.astro`

### Layout
- Text block: **left-aligned** (not centered)
- Text container: `max-width: 65ch` (Cursor's `max-w-prose`)
- Below text: CTA buttons in a flex row
- Below buttons: iframe demo, full container width
- **Remove** the background image wrapper around iframe entirely

### Headline
- Font: Season Mix (keep)
- Size: `26px` (Cursor's `type-md-lg`)
- Weight: `400` (Cursor uses normal weight for headlines)
- Line-height: `1.25`
- Letter-spacing: `-0.0125em`
- Color: `#edecec`
- Keep the rotating word animation, accent color `#ED733B`

### Subheading
- Font: Inter
- Size: `16px`
- Color: `rgba(237, 236, 236, 0.6)`
- Line-height: `1.5`

### CTA Buttons
- Border-radius: `9999px` (pill shape, like Cursor)
- Font size: `16px`
- Font weight: `400`
- Primary: bg `#edecec`, color `#14120b`, border `1px solid #edecec`
- Secondary/ghost: bg `transparent`, border `1px solid rgba(237, 236, 236, 0.2)`, color `#edecec`
- Padding: `0.89em 1.45em`
- Gap between buttons: `10px`

### Iframe Demo
- Remove `products-bg.webp` background image
- Remove the splash screen bg image wrapper
- Iframe sits directly below the buttons with no decorative container
- Keep existing iframe scaling logic (250%/200%/111% with transform scale)
- Border-radius on iframe container: `10px` (Cursor's product mockup radius)
- Border: `1px solid rgba(237, 236, 236, 0.06)`

### Section Padding
- Top: `67px` (below navbar clearance)
- Bottom: `67px`
- Padding between text and iframe: `45px` (`v2`)

---

## Features Section (4 Cards)

**File:** `src/components/Features.astro`

### Layout
- Replace the 6-card row with a **2x2 grid** (4 cards)
- `grid-template-columns: 1fr 1fr` on desktop
- `grid-template-columns: 1fr` on mobile
- Gap: `10px` (Cursor's `g1`)
- Max-width: `1300px`

### Which 4 Features
1. **Hard Drive** — Each colleague gets its own storage for files, context, and memory.
2. **Recipes** — Pre-built workflows that chain tools into multi-step automations.
3. **Integrations** — 20+ native connectors — CRM, billing, spreadsheets, Slack, and more.
4. **Multitasking** — Run multiple colleagues in parallel across projects.

(Views and Abilities are dropped from the homepage)

### Card Styling
- Background: `#1b1913`
- Border: `1px solid rgba(237, 236, 236, 0.025)`
- Border-radius: `4px`
- Padding: `18px`
- Hover: bg shifts to `#201e18`

### Card Content
- Title: Inter, `22px`, weight `400`, line-height `1.3`, letter-spacing `-0.005em`, color `#edecec`
- Description: Inter, `16px`, weight `400`, line-height `1.5`, color `rgba(237, 236, 236, 0.6)`
- Icon: keep existing SVG icons, stroke color `#edecec`
- Icon container: remove the background image treatment, use simple dark bg or no bg

### Card Icon Area
- Remove the `products-bg.webp` pan background and overlay
- Icon: `48px` SVG, stroke `#edecec`, no background
- Icon sits at top of card, above title

### Section Heading
- "Everything runs on a powerful foundation."
- Font: Season Mix, same `26px` as hero headline (Cursor uses consistent heading sizes)
- Weight: `400`
- Color: `#edecec`
- Margin-bottom: `32px`

### Security Section (below cards)
- Keep the 4 security items
- Same dark theme: card bg `#1b1913`
- Heading: `#edecec`
- Body text: secondary color
- Icon color: `#edecec`
- Max-width: `1300px`
- Layout: keep existing left-text + right-grid

---

## WhyEluu Sticky Cards

**File:** `src/components/WhyEluu.astro`

### Theme Changes
- Wrapper max-width: `1300px`
- Card background: `#1b1913`
- Card border: `1px solid rgba(237, 236, 236, 0.06)`
- Label color: `rgba(237, 236, 236, 0.6)`
- Heading color: `#edecec`
- Body text: `rgba(237, 236, 236, 0.6)`
- Media border: `1px solid rgba(237, 236, 236, 0.06)`
- Keep sticky stacking mechanic unchanged

---

## Testimonials

**File:** `src/components/Testimonials.astro`

### Theme Changes
- Section bg: `#14120b` (same as page, no contrast needed)
- Quote text: `#edecec`
- Attribution: `rgba(237, 236, 236, 0.6)`
- Tab dots/indicators: opacity pattern on `#edecec` instead of `#17100e`
- Container max-width stays 1060px but sits within 1300px outer
- Keep auto-rotate at 6000ms

---

## Integration Animation

**File:** `src/components/Integrations.astro`

### Changes
- Container max-width: `1300px`
- Scale carousel to fit narrower width (reduce container height proportionally if needed)
- Heading text: `#edecec`
- Subheading: `rgba(237, 236, 236, 0.6)`
- Keep the gradient background on the carousel itself (it's self-contained)
- Keep animation timing unchanged

---

## Footer

**File:** `src/components/Footer.astro`

### Theme Changes
- Background: `#1b1913` (card color, slight elevation from page)
- Text: `#edecec`
- Secondary text: `rgba(237, 236, 236, 0.5)`
- Link hover: `#edecec`
- Border: `rgba(237, 236, 236, 0.06)`
- Max-width inner: `1300px`

---

## Layout.astro

**File:** `src/layouts/Layout.astro`

### Changes
- `<body>` gets `background: #14120b; color: #edecec;`
- Splash screen: change bg from `#f4f3ec` to `#14120b`
- Splash text/loading elements: light colored
- OG tags / meta remain the same

---

## Splash Screen

- Background: `#14120b` (dark)
- Logo/text in splash: `#edecec`
- Bridge image: keep but the overlay/fade needs to work against dark bg
- Single opacity transition approach stays the same

---

## What Does NOT Change

- Font families (Season Mix, Inter, Jersey 10)
- Navbar dropdown interactions (hover, 80ms delay)
- Hero rotating word animation (mechanism)
- WhyEluu sticky card stacking mechanic
- Testimonials auto-rotate logic
- Integrations carousel animation
- Iframe demo content and scaling logic
- PostHog tracking
- Feature subpages (only homepage changes)
- Footer link structure

## Files Modified

| File | Scope |
|------|-------|
| `src/styles/global.css` | Dark variables, 1300px container, body bg/color |
| `src/layouts/Layout.astro` | Dark body, dark splash |
| `src/components/Navbar.astro` | Slim, dark, 1300px, smaller fonts/logo |
| `src/components/Hero.astro` | Left-align, Cursor sizes, remove bg, pills |
| `src/components/Features.astro` | 4 cards (2x2), dark, 1300px, remove bg image icons |
| `src/components/WhyEluu.astro` | Dark theme, 1300px |
| `src/components/Testimonials.astro` | Dark theme |
| `src/components/Integrations.astro` | 1300px, dark text |
| `src/components/Footer.astro` | Dark theme, 1300px |
| `src/components/CTAFooter.astro` | Dark theme if used on homepage |
