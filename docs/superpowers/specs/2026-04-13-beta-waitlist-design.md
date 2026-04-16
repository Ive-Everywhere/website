# Beta Waitlist Page — Design Spec

**Date:** 2026-04-13
**Status:** Approved
**Scope:** New dark-mode `/beta` page with waitlist form, community links, and product iframe. Update homepage hero CTA to link here.

## Goal

Create a dark-mode beta waitlist page that replaces the homepage "Get started" CTA destination. Users land here to join the closed beta waitlist (email-only form), see the product iframe, and find links to Slack/Discord community.

## URL

`/beta`

## Architecture

| File | Change |
|---|---|
| `src/pages/beta.astro` | NEW — dark-mode waitlist page |
| `src/components/Hero.astro` | MODIFY — "Get started" href changes from `https://app.eluu.ai` to `/beta` |
| `src/components/Navbar.astro` | MODIFY — add dark theme CSS variant for `[data-theme="dark"]` |

## Page Structure

### Layout

Split layout on desktop — text/form left (45%), iframe right (55%). Stacks at 900px (text above, iframe below).

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar (inverted — white on dark)                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Left (45%)                    │  Right (55%)                │
│                                │                             │
│  [Closed Beta] badge           │  ┌───────────────────────┐  │
│                                │  │                       │  │
│  "The future of work           │  │  demo.eluu.ai iframe  │  │
│   is agentic."                 │  │  (dark-adapted)       │  │
│                                │  │                       │  │
│  Description paragraph         │  └───────────────────────┘  │
│                                │                             │
│  ┌──────────────────┐ [Join]   │                             │
│  │  email input     │          │                             │
│  └──────────────────┘          │                             │
│                                │                             │
│  Join our community            │                             │
│  [Slack]  [Discord]            │                             │
│                                │                             │
└──────────────────────────────────────────────────────────────┘
```

### Dark Mode Visual Design

**Background:** `#0a0908` (near-black with warm undertone)

**Subtle texture:** Bridge image (`2683d4a4805b7192bd38dc39f0c5321f8c2b5696.png`) as `::before` pseudo on the page body, with `filter: blur(60px); opacity: 0.08`. Gives a faint warm glow — same image used in the splash screen, just very subtle on dark.

**Text colors:**
- Headlines: `#ffffff`
- Body: `rgba(255, 255, 255, 0.65)`
- Muted: `rgba(255, 255, 255, 0.4)`

**Accent:** `#ED733B` (the orange from the homepage rotating words)

### Content

**Badge:** "Closed Beta" — outlined pill, `border: 1px solid rgba(237, 115, 59, 0.4)`, text `#ED733B`, Inter 13px font-weight 500.

**Headline:** "The future of work is agentic." — Season Mix 700, `clamp(36px, 6vw, 64px)`, white, letter-spacing -2px.

**Description:** "We're building AI colleagues that actually get work done — they connect to your tools, learn your workflows, and execute real tasks on repeat. Eluu is currently in closed beta. Join the waitlist to get early access." — Inter 400, 16px, `rgba(255,255,255,0.65)`, line-height 1.6, max-width 480px.

**Email form:**
- Input: `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 10px`, `padding: 14px 16px`, white placeholder text (`rgba(255,255,255,0.35)`), white input text.
- Button: "Join waitlist" — `background: #ED733B`, white text, `border-radius: 10px`, `padding: 14px 24px`, Inter 500 15px. Hover: `box-shadow: 0 0 20px rgba(237,115,59,0.4)`.
- Layout: input and button side by side on desktop (input flex:1 + button flex-shrink:0), stacked on mobile.
- On submit: prevent default, show inline confirmation "You're on the list! We'll be in touch." in `#ED733B` text. No backend — client-side only for now.
- PostHog: `waitlist_submitted {}` fires on form submit.

**Community links:**
- Label: "Join our community" — Inter 400, 14px, `rgba(255,255,255,0.4)`, margin-top 32px.
- Two pill buttons: "Slack" and "Discord"
  - Style: `border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 100px`, `padding: 10px 20px`, white text, transparent bg
  - Hover: `background: rgba(255,255,255,0.06)`
  - Each has an SVG icon (Slack logo / Discord logo) at 16px
  - Links: `href="#"` placeholder for now
  - PostHog: `community_slack_clicked {}`, `community_discord_clicked {}`

### Iframe (right side)

Same `demo.eluu.ai/?autoplay=1&embed=1` with responsive scaling:
- `< 480px`: width 250%, scale 0.4
- `480-767px`: width 200%, scale 0.5
- `768px+`: width 111.11%, scale 0.9

Dark-adapted wrapper styling:
- `iframe-glow`: dark gradient instead of light (`rgba(255,255,255,0.05)` → `rgba(255,255,255,0.02)`)
- `iframe-border`: darker shadow (`rgba(0,0,0,0.3)` instead of `rgba(0,0,0,0.08)`)
- `border: 1px solid rgba(255,255,255,0.08)` instead of `rgba(0,0,0,0.08)`

Zoom detection: same 4-method approach (desktop, pinch, viewport, DPR). Hide iframe above 200% zoom.

### Navbar — Dark Theme Variant

Add CSS rules scoped to `[data-theme="dark"]`:
- `.nav-wordmark`: `color: #ffffff`
- `.nav-link`: `color: rgba(255,255,255,0.7)`, hover `color: #ffffff`
- `.nav-btn` (Log in): `color: #0a0908; background: #ffffff` (inverted)
- `.site-nav.scrolled` on dark: `background: rgba(10,9,8,0.85); backdrop-filter: blur(20px)`
- Dropdown open state: `background: rgba(10,9,8,0.7)` instead of white
- Dropdown items: white text, `rgba(255,255,255,0.5)` for descriptions
- `.nav-dd-item:hover`: `background: rgba(255,255,255,0.06)`

The beta page sets `<html data-theme="dark">` so all navbar dark rules kick in automatically.

### Homepage Hero Change

In `src/components/Hero.astro`, change the "Get started" button:
- `href`: `https://app.eluu.ai` → `/beta`
- Button text: "Get started" → "Try Eluu Beta"
- Keep the arrow icon
- PostHog event stays `get_started_clicked` (location: 'hero')

### Responsive

- **Desktop (900px+):** side-by-side, 45/55 split
- **Tablet (768-900px):** stacked, text above iframe
- **Mobile (< 768px):** stacked, form input/button stack vertically, community pills stay horizontal
- Padding: 140px top (navbar), content padded 20px sides

### PostHog Events

| Event | Properties | Where |
|---|---|---|
| `waitlist_submitted` | `{}` | Form submit |
| `community_slack_clicked` | `{}` | Slack pill button |
| `community_discord_clicked` | `{}` | Discord pill button |

### What's NOT in scope

- Backend for waitlist (client-side only — wire to API later)
- Email validation beyond HTML5 `type="email" required`
- Success redirect (inline confirmation message only)
- Real Slack/Discord invite links (placeholder `#` for now)
- Dark mode for the rest of the site (only the beta page)
- Mobile hamburger menu

## Files touched

| File | Change | Lines (est.) |
|---|---|---|
| `src/pages/beta.astro` | NEW — full page with inline styles | ~250 |
| `src/components/Hero.astro` | MODIFY — CTA href + text | ~2 lines |
| `src/components/Navbar.astro` | MODIFY — add `[data-theme="dark"]` CSS rules | ~40 lines |
