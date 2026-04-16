# Feature Product Pages — Design Spec

**Date:** 2026-04-13
**Status:** Approved
**Scope:** Sub-project 1 — shared FeatureLayout + first page (Colleagues). Sub-project 2 (5 remaining pages) deferred.

## Goal

Create individual product pages for each of the 6 features in the navbar dropdown, following the Harvey.ai platform/assistant layout pattern. Each page has 6 sections: hero, value props (3 alternating blocks), stats, testimonial, sticky-scroll use cases, and CTA footer.

## URLs

- `/features/colleagues` (Sub-project 1)
- `/features/team-drive` (Sub-project 2)
- `/features/integrations` (Sub-project 2)
- `/features/views` (Sub-project 2)
- `/features/slack` (Sub-project 2)
- `/features/jobs` (Sub-project 2)

## Architecture

| File | Purpose |
|---|---|
| `src/layouts/FeatureLayout.astro` | Shared layout — 6 sections, CSS, sticky-scroll JS |
| `src/pages/features/colleagues.astro` | Colleagues data → FeatureLayout |
| `src/components/Navbar.astro` | MODIFY — update dropdown links to `/features/{slug}` |

Each page file is pure data (~100-120 lines). All markup, CSS, and JS lives in the layout.

## Props Interface

```ts
interface Feature {
  slug: string;
  name: string;
  color: string;
  breadcrumb: string;         // e.g. "Colleagues"
  headline: string;
  description: string;
  valueProps: {
    title: string;
    features: { title: string; desc: string }[];
  }[];                        // exactly 3 blocks
  stats: {
    heading: string;
    items: { value: string; label: string; desc: string }[];
  };                          // exactly 3 stat items
  testimonial: {
    quote: string;
    attribution: string;
  };
  useCases: {
    heading: string;
    cases: { title: string; desc: string }[];
  };                          // 4 cases for sticky scroll
  ctaHeading: string;
}
```

## Section 1: Hero

- **Background:** white
- **Breadcrumb:** "Platform > {breadcrumb}" — Inter 13px, #888, with `>` separator
- **Layout:** flex, text left + placeholder image right, gap 48px, align center
- **Headline:** Season Mix 700, `clamp(36px, 6vw, 72px)`, #17100e, letter-spacing -2px
- **Description:** Inter 16px, #5c5c5c, line-height 1.6, max-width ~500px
- **CTAs:** "Get started" (dark) + "Book a demo" (outlined) — same as homepage
- **Image:** placeholder gradient (cookbook-bg + feature color), aspect-ratio 4/3, border-radius 16px
- **Padding:** 140px top (for fixed navbar), 60px bottom
- **Stacks** at max-width 900px (text above, image below)
- **PostHog:** `feature_get_started_clicked { feature: slug, location: 'hero' }`

## Section 2: Value Props (3 alternating blocks)

3 blocks, each with:
- **Title:** Season Mix 700, clamp(24px, 4vw, 36px), #17100e
- **3 sub-features:** each has a bold title (Inter 600, 16px) + description (Inter 400, 15px, #5c5c5c), separated by `border-bottom: 1px solid rgba(23,16,14,0.08)`
- **Placeholder image:** aspect-ratio 4/3, border-radius 16px, cookbook-bg + feature color

Layout alternates:
- Block 1: image LEFT, text RIGHT
- Block 2: text LEFT, image RIGHT
- Block 3: image LEFT, text RIGHT

Each block: flex, gap 64px, align center. `flex-direction: row` / `row-reverse` alternating.

Backgrounds alternate: white → #f4f3ec → white

Mobile (max-width 767.98px): all blocks stack to column (image above text always), gap 32px.

Padding: 80px 24px desktop, 48px 16px mobile.

Max-width: 1440px centered.

## Section 3: Stats

- **Background:** #f4f3ec
- **Heading:** centered, Season Mix 700, clamp(24px, 4vw, 36px), margin-bottom 48px
- **3 stat cards** in a row (flex, gap 48px)
- Each card: centered text
  - Value: Season Mix 700, clamp(36px, 5vw, 56px), #17100e
  - Label: Inter 600, 15px, #17100e, margin-top 8px
  - Description: Inter 400, 13px, #5c5c5c, margin-top 6px, max-width 280px
- Mobile: flex-direction column, gap 32px
- Padding: 80px 24px desktop, 48px 16px mobile

## Section 4: Testimonial

Same pattern as existing testimonial sections:
- Background: white
- Centered quote: Season Mix 400, clamp(20px, 3vw, 36px), #17100e, text-indent -0.4em
- Attribution: Inter 400, 16px, #17100e, centered, margin-top 24px
- Max-width: 900px centered
- Padding: 80px 24px

## Section 5: Use Cases — Sticky Scroll

This is the key interactive section.

### Layout (desktop, min-width 768px)

```
┌──────────────────────────────────────────────────────────────┐
│  Section heading: "Use cases"                                │
│                                                              │
│  ┌──────────────┬───────────────────────────────────────────┐│
│  │  sticky left │  sticky right                             ││
│  │              │                                           ││
│  │  • Case 1 ◄  │  Case 1 title                            ││
│  │  • Case 2    │  Case 1 description                      ││
│  │  • Case 3    │                                           ││
│  │  • Case 4    │  ┌─────────────────────────────────┐      ││
│  │              │  │  placeholder image               │      ││
│  │              │  └─────────────────────────────────┘      ││
│  └──────────────┴───────────────────────────────────────────┘│
│                                                              │
│  (section is 400vh tall — scroll advances active case)       │
└──────────────────────────────────────────────────────────────┘
```

### How it works

1. The section container has `height: 400vh` (100vh per use case × 4 cases)
2. Inside it, a sticky wrapper (`position: sticky; top: 120px`) keeps the content pinned in the viewport as the user scrolls through the tall section
3. JS listens to scroll position within the section:
   - Calculate progress: `(scrollY - sectionTop) / (sectionHeight - viewportHeight)`
   - Map progress to case index: `Math.floor(progress * numCases)`
   - Update active state
4. Left sidebar: list of case titles. Active case gets bold + accent color dot
5. Right panel: shows the active case's title + description + placeholder image. Crossfades between cases (opacity transition 0.4s)
6. The sidebar and right panel are both inside the sticky wrapper

### Layout (mobile, max-width 767.98px)

No sticky scroll. Cases are simple vertical cards that reveal on scroll (`.reveal` class):
- Each case: title (Inter 600, 18px) + description (Inter 400, 15px) + placeholder image
- Section height: auto (no forced 400vh)
- Gap 32px between cards

### CSS

- `.ft-usecases` — the section container, height 400vh on desktop, auto on mobile
- `.ft-usecases-sticky` — sticky wrapper, `position: sticky; top: 120px; height: 80vh`
- `.ft-usecases-inner` — flex, sidebar left + content right
- `.ft-uc-sidebar` — list of case titles
- `.ft-uc-item` — sidebar item, opacity 0.3 default, 1 when active
- `.ft-uc-content` — right panel, position relative
- `.ft-uc-panel` — individual case panel, absolutely positioned, opacity transition
- `.ft-uc-panel.active` — opacity 1

### JS

```
scroll listener → 
  calculate section progress (0 to 1) →
  map to case index →
  update .active class on sidebar items + panels
```

Throttled via `requestAnimationFrame`. Only runs when section is in viewport (IntersectionObserver enables/disables the scroll listener).

## Section 6: CTA Footer

Same as existing CTAFooter pattern:
- `cta-bg.jpg` bridge image, dark overlay
- Dynamic heading from `feature.ctaHeading`
- Two CTAs: "Get started" + "Book a demo"
- PostHog: `feature_get_started_clicked { feature: slug, location: 'cta_footer' }`
- Then Footer component

## Content: Colleagues Page

### Hero
- breadcrumb: "Colleagues"
- headline: "Build your AI workforce"
- description: "Deploy specialized AI colleagues that connect to your tools, learn your workflows, and execute real work — on repeat, 24/7. Each colleague has real skills, persistent memory, and gets better over time."
- color: "#c4956a"

### Value Props

**Block 1 — "Colleagues that actually work"**
1. Skill-based architecture — Each colleague is equipped with specific abilities tailored to their role — from contract review to pipeline analysis.
2. Persistent memory — They remember past decisions, preferences, and context across sessions. No re-explaining, no starting over.
3. Multi-tool execution — One task can span CRM, email, spreadsheets, and Slack — all handled by a single colleague in one workflow.

**Block 2 — "Deploy in minutes, not months"**
1. Pre-built templates — Start with ready-made colleagues for RevOps, Legal, Customer Success, and Marketing.
2. Custom configuration — Define skills, permissions, and workflows specific to your team's needs.
3. No code required — Set up and manage colleagues through a simple interface. No engineering tickets.

**Block 3 — "Scale without scaling headcount"**
1. Parallel execution — Run multiple colleagues simultaneously across different projects and departments.
2. 24/7 availability — Colleagues work around the clock without reminders, follow-ups, or time zones.
3. Consistent quality — Every task is executed to the same standard, every time. No variance, no off days.

### Stats
- heading: "Proven results with Colleagues"
- items:
  - "10+" / "hours saved" / "per colleague per week on repetitive operational tasks"
  - "95%" / "completion rate" / "of tasks finished without human intervention"
  - "3 min" / "setup time" / "average time to deploy a new AI colleague"

### Testimonial
- quote: "We deployed three AI colleagues in a single afternoon. By the next morning, they'd already completed a full pipeline review, generated renewal briefs, and flagged two at-risk accounts. It felt like hiring a team overnight."
- attribution: "Head of Operations, B2B SaaS Company"

### Use Cases
- heading: "What teams build with Colleagues"
- cases:
  1. Pipeline management — Colleagues review every deal, flag risks, and generate weekly pipeline summaries — automatically, before your Monday meeting.
  2. Contract review — Upload a contract and your colleague identifies non-standard clauses, suggests edits, and benchmarks against your playbook.
  3. Customer onboarding — A colleague runs your entire onboarding sequence — welcome emails, setup guides, check-in scheduling — without a single manual step.
  4. Board reporting — Colleagues pull data from every revenue system and generate board-ready reports with live metrics and trend analysis.

### CTA
- ctaHeading: "Start building your AI workforce."

## Navbar Updates

Update the dropdown links from `href="#"` to actual feature page URLs:
- Colleagues → `/features/colleagues`
- Team Drive, Integrations, Views, Slack, Jobs → keep as `#` until Sub-project 2

## Responsive Breakpoints

| Viewport | Hero | Value Props | Stats | Sticky Scroll | CTA |
|---|---|---|---|---|---|
| < 768px | Stacked | Stacked (image above) | 1 column | Vertical cards (no sticky) | Stacked CTAs |
| 768-900px | Stacked | Side by side | 3 column | Sticky scroll active | Inline CTAs |
| 900px+ | Side by side | Side by side | 3 column | Sticky scroll active | Inline CTAs |

## PostHog

| Event | Properties | Where |
|---|---|---|
| `feature_get_started_clicked` | `{ feature: slug, location: 'hero' \| 'cta_footer' }` | Hero + CTA footer |
| `feature_demo_clicked` | `{ feature: slug, location: 'hero' \| 'cta_footer' }` | Hero + CTA footer "Book a demo" |

## What's NOT in scope (Sub-project 1)

- 5 remaining feature pages (Sub-project 2)
- Real product screenshots (placeholders for now)
- Video embeds
- Animated illustrations
- Blog/resource links per feature
- Individual feature comparison pages
- Mobile hamburger menu for navbar

## Files touched

| File | Change |
|---|---|
| `src/layouts/FeatureLayout.astro` | NEW — shared layout with 6 sections + sticky-scroll JS |
| `src/pages/features/colleagues.astro` | NEW — Colleagues data |
| `src/components/Navbar.astro` | MODIFY — Colleagues dropdown link → `/features/colleagues` |
