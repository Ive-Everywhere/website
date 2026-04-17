# Slack Demo Component — Design Spec

## Goal

Build an interactive Slack UI demo for the Slack feature page hero section. The demo is a pixel-accurate recreation of Slack's dark theme UI in pure HTML/CSS, with an animated conversation loop in the thread panel showing a user messaging an Eluu AI colleague and receiving an intelligent response.

## Architecture

A single Astro component (`SlackDemo.astro`) renders the full Slack UI. It sits centered on a dark background image in the hero section of `slack.astro`. The page bypasses FeatureLayout for the hero but reuses FeatureLayout's remaining sections (intro, value props, stats, testimonial, use cases, CTA) by rendering them inline with the same CSS classes.

Animation is driven by a JS state machine using `setTimeout` chains. CSS handles all visual transitions (opacity, transform). No framework dependencies.

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/components/SlackDemo.astro` | Create | Full Slack UI + animation |
| `src/pages/features/slack.astro` | Modify | Custom hero with dark bg + SlackDemo, remaining sections inline |
| `public/images/features/slack-hero-bg.png` | Exists | Dark gradient background |
| `public/images/devind-dp.png` | Exists | Devind's avatar |
| `/images/logo.svg` | Exists | Eluu bot + workspace icon |

## Slack UI Structure

### Window Chrome
- Rounded corners (12px), `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`
- Mac dots: red `#ff5f57`, yellow `#febc2e`, green `#28c840` (8px circles, top-left)
- Max-width: 1000px, centered
- Aspect ratio roughly 16:10

### Sidebar (~180px, static)
- Background: `#1a1d21`
- Workspace header: Eluu logo (16px) + "Eluu AI" + chevron
- Navigation icons: Home, DMs, Activity (text labels, muted)
- "Channels" heading with list:
  - `# all-eluu-guys`
  - `# customers`
  - `# engineering`
  - `# general`
  - `# marketing`
  - `# sales`
  - `# strategy` (highlighted — white text, bg `#1164A3` or similar active state)
- "Direct messages" heading:
  - Krishna
  - Dan
- Font: system font stack, 13px, `#b5bac1` (muted), white for active
- Dividers between sections: `1px solid rgba(255,255,255,0.06)`

### Main Channel (~45%, static)
- Background: `#313338`
- Header bar: `# strategy` with member count icon, tabs (Messages, Add canvas, Files)
- Message area:
  - 1-2 older messages (low opacity, truncated — suggest history)
  - "Today" divider line
  - **Devind's message**: avatar (devind-dp.png, 36px circle) + "Devind 3:04 AM" + message: `@Eluu What strategy do you recommend for Eluu to get first 1000 users?`
  - `@Eluu` styled as a Slack mention (blue highlight)
  - Reaction: light bulb `1`
  - Thread indicator: "2 replies · Last reply today at 3:06 AM"
- Message input bar at bottom: "Message # strategy" with formatting icons
- All completely static

### Thread Panel (~40%, animated)
- Background: `#313338`
- Header: "Thread" with close X button
- Divider line from main area
- This panel is where the animation loop plays (see below)

## Animation Flow

Total loop: ~14 seconds

### State 0 — Empty (0ms)
Thread panel shows just the header. Clean slate before animation starts.

### State 1 — User message appears (0ms → 1000ms)
- Devind's avatar + "Devind · Just now"
- Message fades in (300ms, opacity 0→1 + translateY 4px→0):
  - "Can you make this brief and provide the next action items"
- Reaction emoji appears after 200ms delay: green checkmark + "1"

### State 2 — Eluu thinking (1500ms → 3500ms)
- Eluu avatar (logo.svg, 36px circle) + "Eluu APP · Just now"
- Thinking text: "Extracting key points..." — the "..." is animated with pulsing dots (3 dots cycling opacity 0.3→1 with 200ms stagger)
- Status bar at bottom of thread: "Eluu is summarizing your request..." with a subtle pulsing animation

### State 3 — Response appears (3500ms → 9000ms)
- Thinking text is replaced by the full response
- Lines appear one by one, each with fade+slideUp (200ms duration, 300ms stagger between lines):

```
@Devind Here's the short version:
4 engines, in priority order:
1. Cookbook — ready-to-deploy colleague recipes shared everywhere. Compounds over time.
2. Agent outbound — personalized deliverables sent to prospects. High close rate.
3. PLG/viral — team invites + "Built with Eluu" on outputs. Multiplier on everything else.
4. Content/SEO — outcome-first posts + programmatic pages. Slow burn, start now.
Next action items:
1. Ship 5 cookbook recipes this week targeting top ICP personas
2. Run first agent outbound batch — 20 prospects, measure reply rate
3. Add "Built with Eluu" to all view/dashboard outputs
Want me to dig into any of these?
```

- `@Devind` styled as a Slack mention (blue highlight)
- Bold text for list item titles (italic where matching Slack formatting)
- Status bar fades out
- "View Thinking" button appears above Eluu's response (static, styled like Slack's collapsed thinking block)

### State 4 — Pause (9000ms → 13000ms)
Full response visible. User reads.

### State 5 — Reset (13000ms → 14000ms)
- All thread content fades out (500ms, opacity 1→0)
- 500ms empty pause
- Loop back to State 1

## Animation Implementation

```
JS state machine (is:inline script):
- On DOMContentLoaded, start the loop
- Each state is a function that adds/removes classes and uses setTimeout for the next state
- CSS classes on thread container: .state-empty, .state-user-msg, .state-thinking, .state-responding, .state-pause
- Individual response lines have data-line="0" through data-line="N" attributes
- When .state-responding is set, a JS loop adds .visible to each line with 300ms stagger via setTimeout
- prefers-reduced-motion: skip animations, show final state statically
```

## CSS Details

### Slack Dark Theme Colors
- Sidebar bg: `#1a1d21`
- Channel/thread bg: `#313338`
- Sidebar text: `#b5bac1`
- Sidebar active: `#ffffff` on `#1164A3`
- Message text: `#e0e0e0`
- Muted text (timestamps, labels): `#949ba4`
- Mention highlight: `#c9def8` text on `#3a4d6b` bg
- Link blue: `#1d9bd1`
- Dividers: `rgba(255,255,255,0.06)`
- Input bar bg: `#383a40`
- Reaction bg: `rgba(255,255,255,0.06)` with colored emoji

### Typography
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`
- Message text: 15px
- Sidebar: 13px
- Timestamps: 12px
- Bold for usernames, regular for messages

### Responsive
- **Desktop (1024px+)**: Full 3-panel, max-width 1000px
- **Tablet (768-1023px)**: Hide sidebar, show channel + thread (2 panels)
- **Mobile (< 768px)**: Thread panel only, full width, scaled proportionally

## Integration with slack.astro

The page will:
1. Import Navbar, Footer, PostHog, SlackDemo directly (not FeatureLayout)
2. Render a custom hero section:
   - Full-width dark bg image (`slack-hero-bg.png`, `object-fit: cover`)
   - White breadcrumb + headline on top
   - SlackDemo centered below headline
3. Render remaining sections (intro, value props, stats, testimonial, use cases, CTA) using the same HTML structure and CSS classes from FeatureLayout — copied inline since the hero is custom

## Content Choices

- Channel name: `# strategy` (matches screenshots, feels real)
- User: Devind (with provided DP)
- Bot: Eluu (with logo.svg, labeled "APP")
- Conversation topic: Growth strategy — relatable to prospects, demonstrates Eluu's ability to synthesize and provide actionable advice
- Response content: Numbered strategy + action items (matches screenshot structure, shows Eluu producing real business value)

## Out of Scope

- No mobile hamburger menu for sidebar
- No click interactivity (not a real Slack — purely visual demo)
- No sound effects
- No drag/resize of panels
