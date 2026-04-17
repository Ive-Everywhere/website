# Slack Demo Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive Slack UI demo component for the Slack feature page hero, with an animated conversation loop showing a user messaging an Eluu AI colleague.

**Architecture:** Single Astro component (`SlackDemo.astro`) with all HTML/CSS/JS. The Slack page (`slack.astro`) renders a custom dark-background hero containing the demo, then renders the remaining FeatureLayout sections inline. Animation is a JS `setTimeout` state machine toggling CSS classes.

**Tech Stack:** Astro 6.1, vanilla CSS, vanilla JS (`is:inline`)

**Spec:** `docs/superpowers/specs/2026-04-15-slack-demo-design.md`

---

### Task 1: Create SlackDemo.astro — Window Chrome + 3-Panel Grid

**Files:**
- Create: `src/components/SlackDemo.astro`

This task creates the outer shell: mac window chrome (dots, border-radius, shadow) and the 3-column CSS grid (sidebar, main channel, thread panel). No content inside the panels yet — just colored boxes to confirm layout.

- [ ] **Step 1: Create the component file with window chrome and grid**

Create `src/components/SlackDemo.astro` with this content:

```astro
---
---

<div class="sd-window">
  <!-- Mac window dots -->
  <div class="sd-titlebar">
    <span class="sd-dot sd-dot-red"></span>
    <span class="sd-dot sd-dot-yellow"></span>
    <span class="sd-dot sd-dot-green"></span>
  </div>

  <div class="sd-body">
    <!-- Sidebar -->
    <aside class="sd-sidebar">
      <div style="padding:16px;color:#b5bac1;font-size:13px;">Sidebar</div>
    </aside>

    <!-- Main channel -->
    <div class="sd-channel">
      <div style="padding:16px;color:#e0e0e0;font-size:13px;">Channel</div>
    </div>

    <!-- Thread panel -->
    <div class="sd-thread">
      <div style="padding:16px;color:#e0e0e0;font-size:13px;">Thread</div>
    </div>
  </div>
</div>

<style>
  .sd-window {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
    background: #1a1d21;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  .sd-titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #1a1d21;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .sd-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .sd-dot-red { background: #ff5f57; }
  .sd-dot-yellow { background: #febc2e; }
  .sd-dot-green { background: #28c840; }

  .sd-body {
    display: grid;
    grid-template-columns: 180px 1fr 1fr;
    min-height: 520px;
  }

  .sd-sidebar {
    background: #1a1d21;
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }

  .sd-channel {
    background: #313338;
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }

  .sd-thread {
    background: #313338;
    overflow: hidden;
  }

  /* Responsive */
  @media (max-width: 1023px) {
    .sd-body { grid-template-columns: 1fr 1fr; }
    .sd-sidebar { display: none; }
  }
  @media (max-width: 767px) {
    .sd-body { grid-template-columns: 1fr; }
    .sd-channel { display: none; }
    .sd-window { border-radius: 10px; }
    .sd-body { min-height: 420px; }
  }
</style>
```

- [ ] **Step 2: Add a temporary test page to verify**

Temporarily add the component to `slack.astro` hero to see it. Open `src/pages/features/slack.astro`. The current file uses FeatureLayout. For now, just add `heroImage` placeholder so the page renders, and we will swap it in Task 7. No changes needed yet — we will verify in the browser via the dev server.

- [ ] **Step 3: Verify layout**

Run: `cd /Users/devind/eluu-clone && npm run dev`

Open `http://localhost:4321/features/slack` in a browser. Confirm you see a dark rounded window with 3 colored panels side by side. On tablet width, sidebar should hide. On mobile, only the thread panel should show.

- [ ] **Step 4: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/components/SlackDemo.astro
git commit -m "feat: add SlackDemo component skeleton with window chrome and 3-panel grid"
```

---

### Task 2: Build the Sidebar

**Files:**
- Modify: `src/components/SlackDemo.astro`

Replace the sidebar placeholder with the full Slack sidebar: workspace header, nav items, channels list, and direct messages. All static.

- [ ] **Step 1: Replace sidebar content**

In `src/components/SlackDemo.astro`, replace:
```html
<aside class="sd-sidebar">
  <div style="padding:16px;color:#b5bac1;font-size:13px;">Sidebar</div>
</aside>
```

With:
```html
<aside class="sd-sidebar">
  <!-- Workspace header -->
  <div class="sd-ws-header">
    <img src="/images/logo.svg" alt="" class="sd-ws-logo" />
    <span class="sd-ws-name">Eluu AI</span>
    <svg class="sd-ws-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke="#b5bac1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>

  <!-- Nav items -->
  <nav class="sd-nav">
    <div class="sd-nav-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </div>
    <div class="sd-nav-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      <span>DMs</span>
    </div>
    <div class="sd-nav-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <span>More</span>
    </div>
  </nav>

  <!-- Channels -->
  <div class="sd-section">
    <div class="sd-section-head">
      <span>Channels</span>
    </div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> all-eluu-guys</div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> customers</div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> engineering</div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> general</div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> marketing</div>
    <div class="sd-ch-item"><span class="sd-hash">#</span> sales</div>
    <div class="sd-ch-item sd-ch-active"><span class="sd-hash">#</span> strategy</div>
  </div>

  <!-- Direct Messages -->
  <div class="sd-section">
    <div class="sd-section-head">
      <span>Direct messages</span>
    </div>
    <div class="sd-ch-item sd-dm-item">
      <span class="sd-dm-dot sd-dm-online"></span> Krishna
    </div>
    <div class="sd-ch-item sd-dm-item">
      <span class="sd-dm-dot"></span> Dan
    </div>
  </div>
</aside>
```

- [ ] **Step 2: Add sidebar CSS**

Add after the existing `.sd-thread` styles (before the responsive section):

```css
/* ── Sidebar ── */
.sd-ws-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sd-ws-logo {
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
.sd-ws-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  flex: 1;
}
.sd-ws-chevron { flex-shrink: 0; }

.sd-nav {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sd-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  font-size: 13px;
  color: #b5bac1;
  cursor: default;
}

.sd-section {
  padding: 10px 0 4px;
}
.sd-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #b5bac1;
  text-transform: none;
}

.sd-ch-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 14px;
  font-size: 13px;
  color: #b5bac1;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sd-hash {
  color: #6d6f78;
  font-size: 14px;
}
.sd-ch-active {
  background: #1164A3;
  color: #ffffff;
  border-radius: 5px;
  margin: 0 6px;
  padding: 3px 8px;
}
.sd-ch-active .sd-hash { color: #ffffff; }

.sd-dm-item { gap: 8px; }
.sd-dm-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3a3c42;
  flex-shrink: 0;
}
.sd-dm-online { background: #28c840; }
```

- [ ] **Step 3: Verify**

Run dev server. Confirm sidebar shows workspace header with Eluu logo, nav items, channels list with `# strategy` highlighted in blue, and DMs section with online indicator for Krishna.

- [ ] **Step 4: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/components/SlackDemo.astro
git commit -m "feat: add Slack sidebar with channels, DMs, and workspace header"
```

---

### Task 3: Build the Main Channel Area

**Files:**
- Modify: `src/components/SlackDemo.astro`

Replace the channel placeholder with the full Slack main channel: header bar, old faded messages, "Today" divider, Devind's message with @Eluu mention, reaction, thread indicator, and message input bar.

- [ ] **Step 1: Replace channel content**

In `src/components/SlackDemo.astro`, replace:
```html
<div class="sd-channel">
  <div style="padding:16px;color:#e0e0e0;font-size:13px;">Channel</div>
</div>
```

With:
```html
<div class="sd-channel">
  <!-- Channel header -->
  <div class="sd-ch-header">
    <div class="sd-ch-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5bac1" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>
      <span class="sd-ch-name"># strategy</span>
    </div>
    <div class="sd-ch-tabs">
      <span class="sd-ch-tab sd-ch-tab-active">Messages</span>
      <span class="sd-ch-tab">Files</span>
    </div>
  </div>

  <!-- Messages area -->
  <div class="sd-messages">
    <!-- Older faded messages -->
    <div class="sd-msg sd-msg-faded">
      <div class="sd-msg-avatar sd-msg-avatar-placeholder"></div>
      <div class="sd-msg-body">
        <div class="sd-msg-meta"><strong>Lisa</strong> <span class="sd-msg-time">Yesterday</span></div>
        <div class="sd-msg-text">Shared the updated competitive analysis in the Hard Drive. Key takeaway: two new entrants in the mid-market segment...</div>
      </div>
    </div>

    <!-- Today divider -->
    <div class="sd-divider">
      <span>Today</span>
    </div>

    <!-- Devind's main message -->
    <div class="sd-msg">
      <img src="/images/devind-dp.png" alt="" class="sd-msg-avatar" />
      <div class="sd-msg-body">
        <div class="sd-msg-meta"><strong>Devind</strong> <span class="sd-msg-time">3:04 AM</span></div>
        <div class="sd-msg-text"><span class="sd-mention">@Eluu</span> What strategy do you recommend for Eluu to get first 1000 users?</div>
        <div class="sd-msg-reactions">
          <span class="sd-reaction">💡 1</span>
        </div>
        <div class="sd-thread-indicator">
          <img src="/images/logo.svg" alt="" class="sd-thread-ava" />
          <span class="sd-thread-link">2 replies</span>
          <span class="sd-msg-time">Last reply today at 3:06 AM</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Message input -->
  <div class="sd-input-bar">
    <div class="sd-input-box">
      <span class="sd-input-placeholder">Message # strategy</span>
    </div>
    <div class="sd-input-actions">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5bac1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5bac1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add channel CSS**

Add after the sidebar CSS (before the responsive section):

```css
/* ── Main Channel ── */
.sd-ch-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sd-ch-title {
  display: flex;
  align-items: center;
  gap: 6px;
}
.sd-ch-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}
.sd-ch-tabs {
  display: flex;
  gap: 12px;
}
.sd-ch-tab {
  font-size: 12px;
  color: #b5bac1;
  cursor: default;
}
.sd-ch-tab-active {
  color: #ffffff;
  font-weight: 600;
}

.sd-messages {
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.sd-msg {
  display: flex;
  gap: 10px;
  padding: 6px 0;
}
.sd-msg-faded { opacity: 0.4; }

.sd-msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  flex-shrink: 0;
  object-fit: cover;
}
.sd-msg-avatar-placeholder {
  background: #5b4e8a;
}

.sd-msg-body {
  min-width: 0;
  flex: 1;
}
.sd-msg-meta {
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 2px;
}
.sd-msg-meta strong {
  font-weight: 700;
}
.sd-msg-time {
  font-size: 11px;
  color: #949ba4;
  font-weight: 400;
  margin-left: 6px;
}
.sd-msg-text {
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.5;
}

.sd-mention {
  background: #3a4d6b;
  color: #c9def8;
  padding: 1px 4px;
  border-radius: 4px;
  font-weight: 500;
}

.sd-msg-reactions {
  margin-top: 6px;
  display: flex;
  gap: 6px;
}
.sd-reaction {
  font-size: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 2px 8px;
  color: #e0e0e0;
  cursor: default;
}

.sd-thread-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  cursor: default;
}
.sd-thread-ava {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
.sd-thread-link {
  font-size: 12px;
  font-weight: 700;
  color: #1d9bd1;
}

.sd-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  font-size: 12px;
  font-weight: 700;
  color: #e0e0e0;
}
.sd-divider::before,
.sd-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.08);
}

/* Channel needs column layout for input at bottom */
.sd-channel {
  display: flex;
  flex-direction: column;
}

.sd-input-bar {
  padding: 8px 16px 12px;
  margin-top: auto;
}
.sd-input-box {
  background: #383a40;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 10px 12px;
}
.sd-input-placeholder {
  font-size: 13px;
  color: #6d6f78;
}
.sd-input-actions {
  display: flex;
  gap: 8px;
  padding: 6px 4px 0;
}
```

- [ ] **Step 3: Verify**

Run dev server. Confirm main channel shows: header with `# strategy`, a faded old message, "Today" divider, Devind's message with blue `@Eluu` mention, light bulb reaction, thread indicator with "2 replies", and an input bar at the bottom.

- [ ] **Step 4: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/components/SlackDemo.astro
git commit -m "feat: add Slack main channel with messages, reactions, and thread indicator"
```

---

### Task 4: Build the Thread Panel (All Animation States)

**Files:**
- Modify: `src/components/SlackDemo.astro`

Replace the thread placeholder with the full thread panel. All animation states are present in the HTML but hidden by default. The JS (Task 5) will toggle visibility classes.

- [ ] **Step 1: Replace thread content**

In `src/components/SlackDemo.astro`, replace:
```html
<div class="sd-thread">
  <div style="padding:16px;color:#e0e0e0;font-size:13px;">Thread</div>
</div>
```

With:
```html
<div class="sd-thread" id="sd-thread">
  <!-- Thread header -->
  <div class="sd-th-header">
    <span class="sd-th-title">Thread</span>
    <span class="sd-th-close">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5bac1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </span>
  </div>

  <!-- Thread messages -->
  <div class="sd-th-messages">
    <!-- User message (animated in) -->
    <div class="sd-th-msg sd-anim-el" data-anim="user-msg">
      <img src="/images/devind-dp.png" alt="" class="sd-msg-avatar" />
      <div class="sd-msg-body">
        <div class="sd-msg-meta"><strong>Devind</strong> <span class="sd-msg-time">Just now</span></div>
        <div class="sd-msg-text">Can you make this brief and provide the next action items</div>
        <div class="sd-msg-reactions">
          <span class="sd-reaction sd-anim-el" data-anim="reaction">✅ 1</span>
        </div>
      </div>
    </div>

    <!-- Eluu thinking state -->
    <div class="sd-th-msg sd-anim-el" data-anim="thinking">
      <img src="/images/logo.svg" alt="" class="sd-msg-avatar sd-bot-avatar" />
      <div class="sd-msg-body">
        <div class="sd-msg-meta"><strong>Eluu</strong> <span class="sd-bot-badge">APP</span> <span class="sd-msg-time">Just now</span></div>
        <div class="sd-msg-text sd-thinking-text">Extracting key points<span class="sd-dots"><span>.</span><span>.</span><span>.</span></span></div>
      </div>
    </div>

    <!-- View Thinking button -->
    <div class="sd-th-thinking-btn sd-anim-el" data-anim="view-thinking">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      View Thinking
    </div>

    <!-- Eluu response (replaces thinking) -->
    <div class="sd-th-msg sd-anim-el" data-anim="response">
      <img src="/images/logo.svg" alt="" class="sd-msg-avatar sd-bot-avatar" />
      <div class="sd-msg-body">
        <div class="sd-msg-meta"><strong>Eluu</strong> <span class="sd-bot-badge">APP</span> <span class="sd-msg-time">Just now</span></div>
        <div class="sd-msg-text sd-response-text">
          <p class="sd-resp-line" data-line="0"><span class="sd-mention">@Devind</span> Here's the short version:</p>
          <p class="sd-resp-line" data-line="1">4 engines, in priority order:</p>
          <p class="sd-resp-line sd-resp-item" data-line="2">1. <em>Cookbook</em> — ready-to-deploy colleague recipes shared everywhere. Compounds over time.</p>
          <p class="sd-resp-line sd-resp-item" data-line="3">2. <em>Agent outbound</em> — personalized deliverables sent to prospects. High close rate.</p>
          <p class="sd-resp-line sd-resp-item" data-line="4">3. <em>PLG/viral</em> — team invites + "Built with Eluu" on outputs. Multiplier on everything else.</p>
          <p class="sd-resp-line sd-resp-item" data-line="5">4. <em>Content/SEO</em> — outcome-first posts + programmatic pages. Slow burn, start now.</p>
          <p class="sd-resp-line" data-line="6"><strong>Next action items:</strong></p>
          <p class="sd-resp-line sd-resp-item" data-line="7">1. Ship 5 cookbook recipes this week targeting top ICP personas</p>
          <p class="sd-resp-line sd-resp-item" data-line="8">2. Run first agent outbound batch — 20 prospects, measure reply rate</p>
          <p class="sd-resp-line sd-resp-item" data-line="9">3. Add "Built with Eluu" to all view/dashboard outputs</p>
          <p class="sd-resp-line" data-line="10">Want me to dig into any of these?</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Status bar at bottom -->
  <div class="sd-th-status sd-anim-el" data-anim="status">
    <img src="/images/logo.svg" alt="" class="sd-status-icon" />
    <span>Eluu is summarizing your request...</span>
  </div>

  <!-- Thread reply input -->
  <div class="sd-input-bar sd-th-input">
    <div class="sd-input-box">
      <span class="sd-input-placeholder">Reply...</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add thread CSS**

Add after the channel CSS:

```css
/* ── Thread Panel ── */
.sd-thread {
  display: flex;
  flex-direction: column;
}

.sd-th-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sd-th-title {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}
.sd-th-close { cursor: default; }

.sd-th-messages {
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.sd-th-msg {
  display: flex;
  gap: 10px;
  padding: 4px 0;
}

.sd-bot-avatar {
  background: #1a1d21;
  padding: 4px;
  border-radius: 6px;
}
.sd-bot-badge {
  font-size: 10px;
  font-weight: 700;
  background: rgba(255,255,255,0.1);
  color: #b5bac1;
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 4px;
  vertical-align: middle;
}

/* Thinking dots */
.sd-thinking-text { color: #949ba4; }
.sd-dots span {
  animation: sd-pulse 1.4s infinite;
  opacity: 0.3;
}
.sd-dots span:nth-child(2) { animation-delay: 0.2s; }
.sd-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes sd-pulse {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}

/* View Thinking button */
.sd-th-thinking-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #b5bac1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  padding: 6px 12px;
  margin-left: 46px;
  cursor: default;
  width: fit-content;
}

/* Response lines */
.sd-response-text { margin: 0; }
.sd-resp-line {
  margin: 0 0 3px;
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.sd-resp-line.visible {
  opacity: 1;
  transform: translateY(0);
}
.sd-resp-item { padding-left: 8px; }
.sd-resp-line em {
  font-style: italic;
  color: #ffffff;
}

/* Status bar */
.sd-th-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 12px;
  color: #949ba4;
  border-top: 1px solid rgba(255,255,255,0.06);
  animation: sd-status-pulse 2s ease-in-out infinite;
}
@keyframes sd-status-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.sd-status-icon {
  width: 16px;
  height: 16px;
  border-radius: 3px;
}

.sd-th-input {
  padding: 6px 16px 10px;
}

/* ── Animation visibility — all hidden by default ── */
.sd-anim-el {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.sd-anim-el.sd-visible {
  opacity: 1;
  pointer-events: auto;
}
.sd-anim-el[data-anim="user-msg"].sd-visible,
.sd-anim-el[data-anim="thinking"].sd-visible,
.sd-anim-el[data-anim="response"].sd-visible {
  transform: translateY(0);
}
.sd-anim-el[data-anim="user-msg"],
.sd-anim-el[data-anim="thinking"],
.sd-anim-el[data-anim="response"] {
  transform: translateY(6px);
}
```

- [ ] **Step 3: Verify**

Run dev server. The thread panel should show just the header, reply input, and everything else invisible (all `sd-anim-el` elements are opacity 0). This is correct — animation JS in Task 5 will reveal them.

- [ ] **Step 4: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/components/SlackDemo.astro
git commit -m "feat: add thread panel with all animation states (hidden by default)"
```

---

### Task 5: Add the Animation JS

**Files:**
- Modify: `src/components/SlackDemo.astro`

Add the `is:inline` script that runs the animation state machine: user message → thinking → response lines → pause → reset → loop.

- [ ] **Step 1: Add the animation script**

Add this at the bottom of `src/components/SlackDemo.astro`, after the closing `</style>` tag:

```html
<script is:inline>
(function() {
  const thread = document.getElementById('sd-thread');
  if (!thread) return;

  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getEl(anim) {
    return thread.querySelectorAll('[data-anim="' + anim + '"]');
  }
  function show(anim) {
    getEl(anim).forEach(function(el) { el.classList.add('sd-visible'); });
  }
  function hide(anim) {
    getEl(anim).forEach(function(el) { el.classList.remove('sd-visible'); });
  }
  function hideAll() {
    thread.querySelectorAll('.sd-anim-el').forEach(function(el) {
      el.classList.remove('sd-visible');
    });
    thread.querySelectorAll('.sd-resp-line').forEach(function(el) {
      el.classList.remove('visible');
    });
  }

  function revealLines(callback) {
    var lines = thread.querySelectorAll('.sd-resp-line');
    var delay = 0;
    lines.forEach(function(line, i) {
      setTimeout(function() {
        line.classList.add('visible');
        if (i === lines.length - 1 && callback) {
          setTimeout(callback, 300);
        }
      }, delay);
      delay += 280;
    });
  }

  function runCycle() {
    hideAll();

    if (prefersReduced) {
      // Show everything at once for reduced motion
      show('user-msg');
      show('reaction');
      show('response');
      show('view-thinking');
      thread.querySelectorAll('.sd-resp-line').forEach(function(el) {
        el.classList.add('visible');
      });
      return; // Don't loop
    }

    // State 1: User message appears
    setTimeout(function() {
      show('user-msg');

      // Reaction after 400ms
      setTimeout(function() {
        show('reaction');
      }, 400);

      // State 2: Eluu thinking (at 1500ms)
      setTimeout(function() {
        show('thinking');
        show('status');

        // State 3: Response replaces thinking (at 3500ms from start)
        setTimeout(function() {
          hide('thinking');
          hide('status');
          show('response');
          show('view-thinking');

          // Reveal lines one by one
          revealLines(function() {
            // State 4: Pause for 4 seconds, then reset
            setTimeout(function() {
              // Fade out everything
              thread.querySelectorAll('.sd-anim-el').forEach(function(el) {
                el.classList.add('sd-fading');
              });

              // After fade, reset and restart
              setTimeout(function() {
                hideAll();
                thread.querySelectorAll('.sd-anim-el').forEach(function(el) {
                  el.classList.remove('sd-fading');
                });
                // Small pause before restart
                setTimeout(runCycle, 600);
              }, 500);
            }, 4000);
          });
        }, 2000);
      }, 1500);
    }, 300);
  }

  // Start after a short delay
  setTimeout(runCycle, 800);
})();
</script>
```

- [ ] **Step 2: Add the fade-out CSS class**

Add to the CSS, before the responsive section:

```css
/* Fade out for reset */
.sd-anim-el.sd-fading {
  opacity: 0 !important;
  transition: opacity 0.5s ease !important;
}
```

- [ ] **Step 3: Verify**

Run dev server. Watch the thread panel:
1. After ~1s, Devind's message fades in with the checkmark reaction
2. After ~2.5s, Eluu's "Extracting key points..." appears with pulsing dots + status bar
3. After ~4.5s, thinking is replaced by the full response, lines appearing one by one
4. After all lines visible, ~4s pause, then everything fades out
5. Loop restarts

The full cycle should be about 14 seconds.

- [ ] **Step 4: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/components/SlackDemo.astro
git commit -m "feat: add animation state machine for thread conversation loop"
```

---

### Task 6: Integrate into slack.astro with Custom Dark Hero

**Files:**
- Modify: `src/pages/features/slack.astro`

Rewrite the Slack feature page to render a custom dark-background hero with the SlackDemo component centered, then render all remaining sections (intro, value props, stats, testimonial, use cases, CTA) inline using FeatureLayout's CSS classes.

- [ ] **Step 1: Rewrite slack.astro**

Replace the entire contents of `src/pages/features/slack.astro` with:

```astro
---
import '../../../src/styles/global.css'
import Navbar from '../../components/Navbar.astro';
import Footer from '../../components/Footer.astro';
import PostHog from '../../components/PostHog.astro';
import SlackDemo from '../../components/SlackDemo.astro';

const f = {
  slug: 'slack',
  name: 'Slack',
  color: '#4A154B',
  breadcrumb: 'Slack',
  headline: 'Talk to your colleagues in Slack',
  description: 'Your AI colleagues live in Slack. Assign tasks, ask questions, get updates.',
  intro: {
    bold: 'Just @ them.',
    supporting: 'Your AI colleagues live in Slack. Assign tasks, ask questions, get updates — all in the channels where your team already works.',
  },
  valueProps: [
    {
      title: 'AI colleagues, native to Slack',
      features: [
        { title: 'Mention to activate', desc: '@ your colleague in any channel. They read the context, understand the task, and get to work.' },
        { title: 'Thread-aware', desc: 'Colleagues follow conversation threads. They know what was discussed, who asked what, and where things stand.' },
        { title: 'Push updates', desc: 'Colleagues proactively message you with completed tasks, flagged risks, and scheduled summaries. No polling.' },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Slack',
    items: [
      { value: 'Instant', label: 'task assignment', desc: 'via @ mention in any channel or thread' },
      { value: 'Thread-aware', label: 'context', desc: 'colleagues understand full conversation history' },
      { value: '24/7', label: 'availability', desc: 'in every channel, every time zone' },
    ],
  },
  testimonial: {
    quote: "I just type '@Ruby review this week's pipeline' in our revenue channel and get a full analysis in under a minute. It's like having a team member who never sleeps.",
    attribution: 'VP of Revenue, Growth-Stage Startup',
  },
  useCases: {
    heading: 'What teams do with Slack',
    cases: [
      { title: 'Pipeline check-ins', desc: 'Ask your colleague for a pipeline summary directly in your sales channel. Get an answer in seconds.' },
      { title: 'Daily standup summaries', desc: 'Your colleague posts a morning summary of what happened overnight — deals moved, tasks completed, risks flagged.' },
      { title: 'Ad-hoc research', desc: 'Drop a question in any channel. Your colleague searches your data, pulls context, and responds with citations.' },
    ],
  },
  ctaHeading: 'Put your colleagues where your team already works.',
};
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{f.name} — Eluu</title>
  <meta name="description" content={f.description} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preload" href="/fonts/season-mix-bold.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/season-mix-regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" href="/fonts/jersey-10.woff2" as="font" type="font/woff2" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script is:inline>
    try { sessionStorage.setItem('eluu_splash_shown', '1'); } catch (e) {}
  </script>
  <PostHog />
</head>
<body>
  <Navbar />
  <main>

    <!-- ══ Custom Hero: Dark bg + SlackDemo ══ -->
    <section class="sk-hero">
      <img src="/images/features/slack-hero-bg.png" alt="" class="sk-hero-bg" aria-hidden="true" />
      <div class="sk-hero-overlay"></div>
      <div class="sk-hero-content">
        <div class="sk-breadcrumb">
          <a href="/" class="sk-breadcrumb-link">Home</a>
          <span class="sk-breadcrumb-sep">/</span>
          <span class="sk-breadcrumb-active">{f.breadcrumb}</span>
        </div>
        <h1 class="sk-hero-headline">{f.headline}</h1>
        <div class="sk-demo-wrap">
          <SlackDemo />
        </div>
      </div>
    </section>

    <!-- ══ Remaining sections reuse FeatureLayout's CSS classes ══ -->

    <!-- Intro -->
    <section class="ft-intro">
      <div class="ft-intro-inner">
        <h2 class="ft-intro-text">
          <strong>{f.intro.bold}</strong> {f.intro.supporting}
        </h2>
      </div>
    </section>

    <!-- Value Props -->
    <section class="ft-vp-section">
      {f.valueProps.map((block, blockIdx) => (
        <div
          class="ft-vp-card"
          style={`--vp-z: ${blockIdx + 1}; --vp-bg: ${blockIdx % 2 === 0 ? '#ffffff' : '#f4f3ec'}`}
        >
          <div class="ft-vp-inner">
            <div class="ft-vp-cols">
              <div class="ft-vp-left">
                <h2 class="ft-vp-title">{block.title}</h2>
                <div class="ft-placeholder ft-placeholder-card" style={`--ft-color: ${f.color}`}></div>
              </div>
              <div class="ft-vp-right">
                <p class="ft-vp-desc">{block.features[0]?.desc}</p>
                <div class="ft-vp-features">
                  {block.features.map((feat) => (
                    <div class="ft-vp-feature">
                      <h3 class="ft-vp-feature-title">{feat.title}</h3>
                      <p class="ft-vp-feature-desc">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>

    <!-- Stats -->
    <section class="ft-stats">
      <h2 class="ft-stats-heading reveal">{f.stats.heading}</h2>
      <div class="ft-stats-row">
        {f.stats.items.map((item) => (
          <div class="ft-stats-card reveal">
            <span class="ft-stats-value">{item.value}</span>
            <span class="ft-stats-label">{item.label}</span>
            <p class="ft-stats-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <!-- Testimonial -->
    <section class="ft-testimonial">
      <div class="ft-testimonial-inner reveal">
        <blockquote class="ft-testimonial-quote">&ldquo;{f.testimonial.quote}&rdquo;</blockquote>
        <p class="ft-testimonial-attribution">&mdash; {f.testimonial.attribution}</p>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="ft-uc">
      <div class="ft-uc-inner">
        <h2 class="ft-uc-heading">{f.useCases.heading}</h2>
        <div class="ft-uc-layout">
          <div class="ft-uc-tabs">
            {f.useCases.cases.map((c, i) => (
              <button
                class={`ft-uc-tab${i === 0 ? ' active' : ''}`}
                data-uc-tab={i}
                type="button"
              >
                <h3 class="ft-uc-tab-title">{c.title}</h3>
                <p class="ft-uc-tab-desc">{c.desc}</p>
              </button>
            ))}
          </div>
          <div class="ft-uc-image">
            <div class="ft-placeholder ft-placeholder-uc" style={`--ft-color: ${f.color}`}></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section style="background: #f4f3ec;">
      <div class="ft-cta-container">
        <img src="/images/cta-bg.jpg" alt="" aria-hidden="true" class="ft-cta-bg" loading="lazy" />
        <div class="ft-cta-overlay"></div>
        <div class="ft-cta-content">
          <h2 class="ft-cta-heading">{f.ctaHeading}</h2>
          <div class="ft-cta-buttons">
            <a href="https://app.eluu.ai" class="ft-btn ft-btn-dark"
              onclick="window.posthog?.capture('feature_get_started_clicked', { feature: 'slack', location: 'cta_footer' })"
            >Get started</a>
            <a href="https://cal.com/krishna-kaipa-wh7ao3/15min" class="ft-btn ft-btn-light-white"
              onclick="window.posthog?.capture('feature_demo_clicked', { feature: 'slack', location: 'cta_footer' })"
            >Book a demo</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />

  <!-- Reveal observer -->
  <script>
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  </script>

  <!-- Use-cases tab switching -->
  <script>
    (function () {
      const tabs = document.querySelectorAll('[data-uc-tab]') as NodeListOf<HTMLElement>;
      if (!tabs.length) return;
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const idx = parseInt(tab.dataset.ucTab!, 10);
          tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
        });
      });
    })();
  </script>

  <style>
    /* ══ Custom Slack Hero ══ */
    .sk-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .sk-hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .sk-hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.3);
      z-index: 1;
    }
    .sk-hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      padding: 140px 24px 80px;
    }

    .sk-breadcrumb {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }
    .sk-breadcrumb-link {
      color: rgba(255,255,255,0.5);
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .sk-breadcrumb-link:hover { color: #ffffff; }
    .sk-breadcrumb-sep { color: rgba(255,255,255,0.3); }
    .sk-breadcrumb-active { color: #ffffff; font-weight: 600; }

    .sk-hero-headline {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(48px, 8vw, 110px);
      color: #ffffff;
      letter-spacing: -3px;
      line-height: 1.0;
      margin: 0 0 64px;
    }
    @media (max-width: 768px) {
      .sk-hero-headline {
        font-size: clamp(36px, 10vw, 72px);
        letter-spacing: -2px;
        margin-bottom: 40px;
      }
    }

    .sk-demo-wrap {
      max-width: 1000px;
    }

    @media (max-width: 480px) {
      .sk-hero-content { padding: 120px 16px 40px; }
    }

    /* ══ Reuse FeatureLayout CSS ══ */
    /* Shared */
    .ft-btn {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 500;
      padding: 12px 28px;
      border-radius: 10px;
      text-decoration: none;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .ft-btn:hover { transform: translateY(-1px); }
    .ft-btn-dark { color: #fff; background: #17100e; }
    .ft-btn-dark:hover { box-shadow: 0 4px 12px rgba(23,16,14,0.2); }
    .ft-btn-light-white { color: #17100e; background: #fff; }
    .ft-btn-light-white:hover { box-shadow: 0 4px 16px rgba(255,255,255,0.3); }

    .ft-placeholder {
      position: relative;
      aspect-ratio: 4 / 3;
      border-radius: 16px;
      overflow: hidden;
    }
    .ft-placeholder::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--ft-color);
      opacity: 0.7;
    }
    .ft-placeholder::after {
      content: '';
      position: absolute;
      inset: 0;
      background: url('/images/cookbook-bg.png') center / cover no-repeat;
      opacity: 0.12;
      mix-blend-mode: overlay;
    }
    .ft-placeholder-card { aspect-ratio: 1 / 1; border-radius: 16px; }
    .ft-placeholder-uc { aspect-ratio: 1 / 1; border-radius: 14px; min-height: 480px; }

    /* Intro */
    .ft-intro { background: #ffffff; padding: 0 24px 80px; }
    @media (max-width: 767.98px) { .ft-intro { padding: 0 16px 48px; } }
    .ft-intro-inner { max-width: 1320px; margin: 0 auto; }
    .ft-intro-text {
      font-family: 'Season Mix', sans-serif;
      font-weight: 400;
      font-size: clamp(24px, 3.5vw, 40px);
      color: #888;
      line-height: 1.3;
      letter-spacing: -0.5px;
      margin: 0;
      max-width: 720px;
    }
    .ft-intro-text strong { color: #17100e; font-weight: 700; }

    /* Value Props */
    .ft-vp-card {
      background: var(--vp-bg);
      border-top: 1px solid rgba(23, 16, 14, 0.06);
      padding: 56px 24px 80px;
    }
    @media (min-width: 768px) {
      .ft-vp-card {
        position: sticky;
        top: 0;
        z-index: var(--vp-z);
        min-height: 100vh;
        display: flex;
        align-items: flex-start;
        padding: 100px 24px 56px;
      }
    }
    @media (max-width: 767.98px) { .ft-vp-card { padding: 40px 16px; } }
    .ft-vp-inner { max-width: 1320px; margin: 0 auto; width: 100%; }
    .ft-vp-cols { display: flex; gap: 48px; align-items: flex-start; }
    @media (max-width: 767.98px) { .ft-vp-cols { flex-direction: column; gap: 32px; } }
    .ft-vp-left { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 24px; }
    .ft-vp-right { flex: 1; min-width: 0; }
    .ft-vp-title {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(28px, 4vw, 40px);
      color: #17100e;
      letter-spacing: -1px;
      line-height: 1.15;
      margin: 0;
    }
    .ft-vp-desc {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #5c5c5c;
      line-height: 1.6;
      margin: 0 0 40px;
    }
    .ft-vp-features { display: flex; flex-direction: column; }
    .ft-vp-feature { padding: 24px 0; border-top: 1px solid rgba(23, 16, 14, 0.08); }
    .ft-vp-feature-title {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #17100e;
      margin: 0 0 6px;
    }
    .ft-vp-feature-desc {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      color: #5c5c5c;
      line-height: 1.55;
      margin: 0;
    }

    /* Stats */
    .ft-stats { background: #f4f3ec; padding: 80px 24px; text-align: center; }
    @media (max-width: 767.98px) { .ft-stats { padding: 48px 16px; } }
    .ft-stats-heading {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(24px, 4vw, 36px);
      color: #17100e;
      letter-spacing: -1px;
      margin: 0 0 48px;
    }
    .ft-stats-row { max-width: 1200px; margin: 0 auto; display: flex; gap: 48px; justify-content: center; }
    @media (max-width: 767.98px) { .ft-stats-row { flex-direction: column; gap: 32px; } }
    .ft-stats-card { flex: 1; text-align: center; }
    .ft-stats-value {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(36px, 5vw, 56px);
      color: #17100e;
      display: block;
    }
    .ft-stats-label {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 15px;
      color: #17100e;
      display: block;
      margin-top: 8px;
    }
    .ft-stats-desc {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #5c5c5c;
      margin: 6px auto 0;
      max-width: 280px;
      line-height: 1.5;
    }

    /* Testimonial */
    .ft-testimonial { background: #ffffff; padding: 80px 24px; }
    @media (max-width: 767.98px) { .ft-testimonial { padding: 48px 16px; } }
    .ft-testimonial-inner { max-width: 900px; margin: 0 auto; text-align: center; }
    .ft-testimonial-quote {
      font-family: 'Season Mix', sans-serif;
      font-weight: 400;
      font-size: clamp(20px, 3vw, 36px);
      color: #17100e;
      line-height: 1.35;
      margin: 0;
      padding: 0;
      border: none;
      text-indent: -0.4em;
    }
    .ft-testimonial-attribution {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #17100e;
      margin: 24px 0 0;
    }

    /* Use Cases */
    .ft-uc { background: #17100e; color: #ffffff; padding: 80px 24px; }
    @media (max-width: 767.98px) { .ft-uc { padding: 48px 16px; } }
    .ft-uc-inner { max-width: 1320px; margin: 0 auto; }
    .ft-uc-heading {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(28px, 5vw, 44px);
      color: #ffffff;
      letter-spacing: -1.5px;
      text-align: right;
      margin: 0 0 56px;
    }
    @media (max-width: 767.98px) { .ft-uc-heading { text-align: left; margin-bottom: 32px; } }
    .ft-uc-layout { display: flex; gap: 48px; align-items: flex-start; }
    @media (max-width: 767.98px) { .ft-uc-layout { flex-direction: column; gap: 32px; } }
    .ft-uc-tabs { width: 45%; flex-shrink: 0; display: flex; flex-direction: column; }
    @media (max-width: 767.98px) { .ft-uc-tabs { width: 100%; } }
    .ft-uc-tab {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 20px 0;
      border: none;
      border-top: 2px solid rgba(255, 255, 255, 0.15);
      background: transparent;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.2s ease;
    }
    .ft-uc-tab.active { border-top-color: #ffffff; }
    .ft-uc-tab-title {
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
      margin: 0;
      transition: color 0.2s ease;
    }
    .ft-uc-tab.active .ft-uc-tab-title { color: #ffffff; font-weight: 600; }
    .ft-uc-tab:hover .ft-uc-tab-title { color: rgba(255, 255, 255, 0.7); }
    .ft-uc-tab-desc {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.55);
      line-height: 1.55;
      margin: 0;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, margin 0.35s ease;
    }
    .ft-uc-tab.active .ft-uc-tab-desc { max-height: 120px; opacity: 1; margin-top: 10px; }
    .ft-uc-image { flex: 1; min-width: 0; position: relative; min-height: 480px; }
    @media (max-width: 767.98px) { .ft-uc-image { min-height: 280px; } .ft-placeholder-uc { min-height: 280px; } }

    /* CTA */
    .ft-cta-container { position: relative; overflow: hidden; min-height: 280px; }
    @media (min-width: 640px) { .ft-cta-container { min-height: 360px; } }
    @media (min-width: 1024px) { .ft-cta-container { min-height: 500px; } }
    .ft-cta-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
    .ft-cta-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(23,16,14,0.25) 0%, rgba(23,16,14,0.45) 100%); }
    .ft-cta-content {
      position: relative;
      z-index: 2;
      padding: 56px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: inherit;
    }
    .ft-cta-heading {
      font-family: 'Season Mix', sans-serif;
      font-weight: 700;
      font-size: clamp(24px, 5vw, 48px);
      letter-spacing: -1px;
      color: #ffffff;
      line-height: 1.1;
      margin: 0 0 28px;
    }
    .ft-cta-buttons { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ft-uc-panel.active { animation: none; }
    }
  </style>
</body>
</html>
```

- [ ] **Step 2: Verify the full page**

Run dev server. Open `http://localhost:4321/features/slack`. Verify:
1. Dark hero background image with white breadcrumb + headline
2. Slack demo centered below the headline, animation running
3. Scrolling down shows: intro, value prop card, stats, testimonial, use cases, CTA footer
4. All sections styled correctly (same as other feature pages)

- [ ] **Step 3: Commit**

```bash
cd /Users/devind/eluu-clone
git add src/pages/features/slack.astro
git commit -m "feat: rewrite Slack page with custom dark hero and SlackDemo component"
```

---

### Task 7: Polish and Final Verification

**Files:**
- Modify: `src/components/SlackDemo.astro` (if any fixes needed)
- Modify: `src/pages/features/slack.astro` (if any fixes needed)

Final visual QA pass at all breakpoints.

- [ ] **Step 1: Desktop check (1200px+)**

Run dev server. At full desktop width, verify:
- Window has rounded corners, subtle shadow, 3 dots
- 3 panels visible: sidebar (180px), channel, thread
- Sidebar: Eluu AI workspace header, channels with # strategy highlighted blue, DMs
- Channel: header, faded old message, "Today" divider, Devind's message, thread indicator
- Thread: animation loops smoothly — message → thinking → response → pause → fade → restart
- All text readable, colors match Slack dark theme
- Demo sits on dark background, headline in white above

- [ ] **Step 2: Tablet check (768px-1023px)**

Resize to tablet. Verify:
- Sidebar hides, only channel + thread panels visible
- Everything else still works, animation still runs

- [ ] **Step 3: Mobile check (< 768px)**

Resize to mobile. Verify:
- Only thread panel visible
- Animation still runs correctly
- Headline wraps nicely
- No horizontal overflow

- [ ] **Step 4: Commit final polish (if any changes made)**

```bash
cd /Users/devind/eluu-clone
git add -A
git commit -m "polish: final QA fixes for SlackDemo component"
```
