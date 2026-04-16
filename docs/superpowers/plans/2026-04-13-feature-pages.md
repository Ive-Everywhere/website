# Feature Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared FeatureLayout with 6 sections (hero, value props, stats, testimonial, sticky-scroll use cases, CTA footer) and the first feature page (/features/colleagues).

**Architecture:** One shared Astro layout (`FeatureLayout.astro`) receives all content via a `feature` prop. Page files are pure data. The sticky-scroll use-cases section uses a tall container (400vh) with `position: sticky` content inside, JS tracks scroll progress to update the active case. Mobile falls back to vertical cards.

**Tech Stack:** Astro 6.1, vanilla CSS (scoped), vanilla JS (inline IIFE)

**Spec:** `docs/superpowers/specs/2026-04-13-feature-pages-design.md`

---

### Task 1: Create FeatureLayout.astro — Sections 1-4 (Hero, Value Props, Stats, Testimonial)

**Files:**
- Create: `src/layouts/FeatureLayout.astro`

- [ ] **Step 1: Create the layout with frontmatter, head, imports, and Sections 1-4**

The layout receives all data via a single `feature` prop (aliased to `f`). Includes:
- `<head>` with meta, fonts, PostHog (same pattern as ColleagueLayout)
- `<Navbar />` at the top
- **Section 1: Hero** — breadcrumb + flex layout (text left, placeholder image right) + CTAs with PostHog
- **Section 2: Value Props** — 3 blocks mapped from `f.valueProps`, alternating `flex-direction: row` / `row-reverse` via `:nth-child(even)` CSS. Each block has title + 3 sub-features + placeholder image. Backgrounds alternate white/cream/white.
- **Section 3: Stats** — heading centered + 3 stat cards in flex row from `f.stats.items`
- **Section 4: Testimonial** — centered blockquote + attribution

Use `ft-` prefix for all class names (feature template).

Placeholder image pattern (reuse from existing site):
```html
<div class="ft-placeholder" style={`--ft-color: ${f.color}`}></div>
```
With `::before` (color overlay 0.7) and `::after` (cookbook-bg.png 0.12 overlay).

Include the reveal IntersectionObserver script (same as ColleagueLayout).

- [ ] **Step 2: Commit**

```bash
git add src/layouts/FeatureLayout.astro
git commit -m "feat: create FeatureLayout with hero, value props, stats, and testimonial sections"
```

---

### Task 2: Add Section 5 — Sticky-scroll use cases

**Files:**
- Modify: `src/layouts/FeatureLayout.astro`

- [ ] **Step 1: Add the use-cases section markup**

After the testimonial section, add:

```html
<!-- Section 5: Use Cases — sticky scroll on desktop, vertical cards on mobile -->
<section class="ft-usecases">
  <div class="ft-usecases-sticky">
    <h2 class="ft-usecases-heading">{f.useCases.heading}</h2>
    <div class="ft-usecases-inner">
      <!-- Left sidebar: case titles -->
      <div class="ft-uc-sidebar">
        {f.useCases.cases.map((uc, i) => (
          <button
            class={`ft-uc-item ${i === 0 ? 'active' : ''}`}
            data-uc={i}
            type="button"
          >
            <span class="ft-uc-dot" style={`--ft-color: ${f.color}`}></span>
            <span class="ft-uc-label">{uc.title}</span>
          </button>
        ))}
      </div>
      <!-- Right panel: case content -->
      <div class="ft-uc-content">
        {f.useCases.cases.map((uc, i) => (
          <div class={`ft-uc-panel ${i === 0 ? 'active' : ''}`} data-ucp={i}>
            <h3 class="ft-uc-title">{uc.title}</h3>
            <p class="ft-uc-desc">{uc.desc}</p>
            <div class="ft-placeholder ft-placeholder-wide" style={`--ft-color: ${f.color}`}></div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

Mobile markup: the same HTML works for both — CSS hides the sticky behavior on mobile and shows all panels stacked.

- [ ] **Step 2: Add the sticky-scroll JS**

Append a `<script>` block (after the reveal observer script) with:

```js
(function () {
  var section = document.querySelector('.ft-usecases');
  if (!section) return;
  var items = section.querySelectorAll('.ft-uc-item');
  var panels = section.querySelectorAll('.ft-uc-panel');
  if (!items.length || !panels.length) return;

  // Only run sticky-scroll on desktop
  if (window.innerWidth < 768) return;

  var numCases = items.length;
  var ticking = false;

  function update() {
    var rect = section.getBoundingClientRect();
    var sectionHeight = section.offsetHeight;
    var viewportHeight = window.innerHeight;
    // Progress: 0 at top of section, 1 at bottom
    var scrolled = -rect.top;
    var maxScroll = sectionHeight - viewportHeight;
    if (maxScroll <= 0) return;
    var progress = Math.max(0, Math.min(1, scrolled / maxScroll));
    var idx = Math.min(numCases - 1, Math.floor(progress * numCases));

    items.forEach(function (item, i) {
      item.classList.toggle('active', i === idx);
    });
    panels.forEach(function (panel, i) {
      panel.classList.toggle('active', i === idx);
    });
    ticking = false;
  }

  // Only listen when section is in viewport
  var listening = false;
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!listening) { window.addEventListener('scroll', onScroll, { passive: true }); listening = true; }
      update();
    } else {
      if (listening) { window.removeEventListener('scroll', onScroll); listening = false; }
    }
  }, { threshold: 0 });
  io.observe(section);

  // Sidebar click also jumps to that case
  items.forEach(function (item, i) {
    item.addEventListener('click', function () {
      // Scroll the section so that case i is active
      var sectionTop = section.getBoundingClientRect().top + window.scrollY;
      var maxScroll = section.offsetHeight - window.innerHeight;
      var targetScroll = sectionTop + (i / numCases) * maxScroll;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });
})();
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/FeatureLayout.astro
git commit -m "feat: add sticky-scroll use cases section with scroll-linked active state"
```

---

### Task 3: Add Section 6 (CTA Footer) + Footer + complete CSS

**Files:**
- Modify: `src/layouts/FeatureLayout.astro`

- [ ] **Step 1: Add CTA Footer section + Footer component**

After the use-cases `</section>`, add:

```html
<!-- Section 6: CTA Footer -->
<section class="ft-cta">
  <img src="/images/cta-bg.jpg" alt="" aria-hidden="true" class="ft-cta-bg" loading="lazy" />
  <div class="ft-cta-overlay"></div>
  <div class="ft-cta-content">
    <h2 class="ft-cta-heading">{f.ctaHeading}</h2>
    <div class="ft-cta-buttons">
      <a href="https://app.eluu.ai" class="ft-btn ft-btn-dark"
        onclick={`window.posthog?.capture('feature_get_started_clicked', { feature: '${f.slug}', location: 'cta_footer' })`}
      >Get started</a>
      <a href="https://cal.com/krishna-kaipa-wh7ao3/15min" class="ft-btn ft-btn-light-white"
        onclick={`window.posthog?.capture('feature_demo_clicked', { feature: '${f.slug}', location: 'cta_footer' })`}
      >Book a demo</a>
    </div>
  </div>
</section>
```

Then `<Footer />` and close `</main>`, `</body>`, `</html>`.

- [ ] **Step 2: Add the complete `<style>` block**

All CSS for the 6 sections. Key rules:

**Hero (`.ft-hero`):** white bg, flex row, gap 48px, stacks at 900px. Breadcrumb Inter 13px #888. Headline Season Mix 700 clamp. CTAs match homepage.

**Value Props (`.ft-vp`):** `.ft-vp-block` flex row gap 64px, `:nth-child(even)` flex-direction row-reverse. Backgrounds alternate via `:nth-child(odd/even)`. Mobile: all column.

**Stats (`.ft-stats`):** cream bg, flex row gap 48px, centered. Values Season Mix 700 clamp(36-56px). Mobile: column.

**Testimonial (`.ft-testimonial`):** white bg, centered quote Season Mix 400 clamp(20-36px).

**Sticky Scroll (`.ft-usecases`):** height 400vh on desktop, auto on mobile. `.ft-usecases-sticky` position sticky top 120px, height 80vh. `.ft-usecases-inner` flex row, sidebar 200px + content flex 1. `.ft-uc-panel` absolute positioned, opacity 0, `.ft-uc-panel.active` opacity 1 with transition. `.ft-uc-item.active` opacity 1 + bold. Mobile: no sticky, all panels visible stacked.

**CTA (`.ft-cta`):** same pattern as homepage CTAFooter — relative, overflow hidden, min-height 360px/500px, bridge bg, overlay, centered content.

**Placeholder (`.ft-placeholder`):** reusable — aspect-ratio 4/3, border-radius 16px, ::before color overlay, ::after cookbook-bg overlay. `.ft-placeholder-wide` aspect-ratio 16/9.

**Buttons (`.ft-btn`):** same styling as homepage hero buttons.

**Responsive:** max-width 900px hero stacks, 767.98px value props + stats + sticky all stack/simplify.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/FeatureLayout.astro
git commit -m "feat: add CTA footer section + complete CSS for FeatureLayout"
```

---

### Task 4: Create the Colleagues page data file

**Files:**
- Create: `src/pages/features/colleagues.astro`

- [ ] **Step 1: Create the data file**

```astro
---
import FeatureLayout from '../../layouts/FeatureLayout.astro';

const feature = {
  slug: 'colleagues',
  name: 'Colleagues',
  color: '#c4956a',
  breadcrumb: 'Colleagues',
  headline: 'Build your AI workforce',
  description: 'Deploy specialized AI colleagues that connect to your tools, learn your workflows, and execute real work — on repeat, 24/7. Each colleague has real skills, persistent memory, and gets better over time.',
  valueProps: [
    {
      title: 'Colleagues that actually work',
      features: [
        { title: 'Skill-based architecture', desc: 'Each colleague is equipped with specific abilities tailored to their role — from contract review to pipeline analysis.' },
        { title: 'Persistent memory', desc: 'They remember past decisions, preferences, and context across sessions. No re-explaining, no starting over.' },
        { title: 'Multi-tool execution', desc: 'One task can span CRM, email, spreadsheets, and Slack — all handled by a single colleague in one workflow.' },
      ],
    },
    {
      title: 'Deploy in minutes, not months',
      features: [
        { title: 'Pre-built templates', desc: 'Start with ready-made colleagues for RevOps, Legal, Customer Success, and Marketing.' },
        { title: 'Custom configuration', desc: "Define skills, permissions, and workflows specific to your team's needs." },
        { title: 'No code required', desc: 'Set up and manage colleagues through a simple interface. No engineering tickets.' },
      ],
    },
    {
      title: 'Scale without scaling headcount',
      features: [
        { title: 'Parallel execution', desc: 'Run multiple colleagues simultaneously across different projects and departments.' },
        { title: '24/7 availability', desc: 'Colleagues work around the clock without reminders, follow-ups, or time zones.' },
        { title: 'Consistent quality', desc: 'Every task is executed to the same standard, every time. No variance, no off days.' },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Colleagues',
    items: [
      { value: '10+', label: 'hours saved', desc: 'per colleague per week on repetitive operational tasks' },
      { value: '95%', label: 'completion rate', desc: 'of tasks finished without human intervention' },
      { value: '3 min', label: 'setup time', desc: 'average time to deploy a new AI colleague' },
    ],
  },
  testimonial: {
    quote: "We deployed three AI colleagues in a single afternoon. By the next morning, they'd already completed a full pipeline review, generated renewal briefs, and flagged two at-risk accounts. It felt like hiring a team overnight.",
    attribution: 'Head of Operations, B2B SaaS Company',
  },
  useCases: {
    heading: 'What teams build with Colleagues',
    cases: [
      { title: 'Pipeline management', desc: 'Colleagues review every deal, flag risks, and generate weekly pipeline summaries — automatically, before your Monday meeting.' },
      { title: 'Contract review', desc: 'Upload a contract and your colleague identifies non-standard clauses, suggests edits, and benchmarks against your playbook.' },
      { title: 'Customer onboarding', desc: 'A colleague runs your entire onboarding sequence — welcome emails, setup guides, check-in scheduling — without a single manual step.' },
      { title: 'Board reporting', desc: 'Colleagues pull data from every revenue system and generate board-ready reports with live metrics and trend analysis.' },
    ],
  },
  ctaHeading: 'Start building your AI workforce.',
};
---
<FeatureLayout feature={feature} />
```

- [ ] **Step 2: Commit**

```bash
mkdir -p src/pages/features
git add src/pages/features/colleagues.astro
git commit -m "feat: add Colleagues feature page with data"
```

---

### Task 5: Update Navbar dropdown link

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Update the Colleagues link in the Features dropdown**

Find:
```html
<a href="#" class="nav-dd-item">
  <h4>Colleagues</h4>
```

Change to:
```html
<a href="/features/colleagues" class="nav-dd-item">
  <h4>Colleagues</h4>
```

Only change the Colleagues link. Leave the other 5 as `href="#"` until Sub-project 2.

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: link Features dropdown Colleagues item to /features/colleagues"
```

---

### Task 6: Build verification

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: clean build, 6 pages (5 existing + 1 new: /features/colleagues).

- [ ] **Step 2: Verify new page exists**

```bash
ls dist/features/colleagues/
```

Expected: `index.html`

- [ ] **Step 3: Verify content**

```bash
grep -c "Build your AI workforce\|Colleagues that actually work\|Pipeline management\|Proven results" dist/features/colleagues/index.html
```

Expected: 4+ matches (hero headline, value prop title, use case, stats heading).

- [ ] **Step 4: Visual verification on dev server**

Open `http://localhost:4321/features/colleagues` and check:
1. Hero: breadcrumb, headline, description, CTAs, placeholder image
2. Value Props: 3 alternating blocks with sub-features
3. Stats: 3 stat cards centered
4. Testimonial: centered quote
5. Sticky scroll: scroll through section, sidebar highlights change, right panel crossfades
6. CTA footer: bridge bg, heading, buttons
7. Responsive at 375px: everything stacks, sticky scroll becomes vertical cards

- [ ] **Step 5: Verify navbar link**

On the homepage, hover Features dropdown, click Colleagues — should navigate to `/features/colleagues`.
