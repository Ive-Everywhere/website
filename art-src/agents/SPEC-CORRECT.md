# Agents feature-well illustrations — CORRECTION pass (Krishna direction, verbatim)

You are editing self-contained HTML illustrations under `art-src/agents/`. Each file
is `<!DOCTYPE html>` → `<head><meta charset="utf-8"><link rel="stylesheet" href="_kit.css"></head>`
→ `<body>` with a single `.stage` (880×920) holding one composition. You MAY add a
per-file `<style>` block for structures the kit doesn't cover. Keep `_kit.css` classes
where they fit (`.card .hd .hd__t .pill .row .st--done` etc).

## Non-negotiable house rules (from _kit.css header — obey all)
1. Header mark (if any) = a BARE stroked line glyph at ink. Never a filled tile. Never reused as a row mark.
2. ONE row-mark treatment per card (all logos, all glyphs, or none).
3. Uniform row height; card sizes to content; nothing flex-stretches.
4. ONE status lane: one glyph type, one size, right-aligned.
5. ONE green = completed only. Header pills neutral.
6. Depth = a real crop/stack/fade, not decoration.
7. ONE maroon accent per card max, never as an icon tile.

## Tokens (use these literal hexes; also available as _kit.css vars)
ink #1e1c1e · sub #58564d · soft #aaa89e · hair #efedea · panel #fff ·
chrome #f1f0ec · tint #f8f7f4 · maroon #755a68 · maroon-deep #5d374b ·
maroon-soft #f4eff2 · ok #1f8a5b · ok-bg #e4f4ea.
Fonts: Inter (400/450/480/530, weight ceiling 530), JetBrains Mono (400/450).
Type at this 880-wide stage: header 32/480, row title 26/450, sub 20 soft, mono 19-23.
The card should command the frame — ~78-82% of the 880 width, tight even margins.
Real integration logos live at `live/assets/<slug>.svg` (slack, salesforce, stripe,
googlesheets, github, gmail, hubspot, linear, notion, zendesk). Avatars via DiceBear
`https://api.dicebear.com/9.x/adventurer/svg?seed=Ledger&backgroundColor=c5f2e0`.

## Canvas tints (one per card, keep them rhyming)
cv-lav (feat2), cv-blue (feat3), cv-sand (feat4), cv-lav (feat5), cv-warm (feat6), cv-cream (feat7).

────────────────────────────────────────────────────────────────────────
## feat1-tools — DO NOT TOUCH. Krishna: "1st card is fine."
────────────────────────────────────────────────────────────────────────

## feat2-anywhere — "Run from anywhere"
Krishna: "looking odd, here we can have DIFFERENT CARDS each with something like
Ona's daily-scheduled one." Reference: `/home/daytona/workspace/tmp/refs/custom-automations.png`
(Ona's automations cascade — each step is its own card: a small badge chip [icon+word]
top-left, a big title, a grey subtitle).

BUILD: a vertical stack of 4 DISTINCT trigger cards (each a white `.card`, radius 20,
own soft shadow), gap ~26px, the stack centered, the bottom one bleeding slightly off
the frame for depth. Each card ~620 wide, padded 24-28. Anatomy per card, top→bottom:
a badge chip (source logo 22px in a soft tint pill + the trigger word), then a 26/480
title, then a 20 soft mono sub. One consistent chip style (soft `--tint` bg + hairline).
  1. chip [slack.svg · "Slack"]   → "A teammate asks in Slack"     → "#ops · @Ledger close the books"
  2. chip [globe glyph · "Chat"]  → "You ask in the app"           → "app.eluu.ai"
  3. chip [clock glyph · "Schedule"] → "On a schedule, unattended" → "Every weekday · 8:00 AM"
  4. chip [code glyph · "API"]    → "Fired from your code"         → "POST /v1/tasks"
No status lane. One maroon accent max (e.g. the chip icon tint). Fill the frame.

## feat3-computer — "Its own computer"
Krishna: "real computer one isn't great for a BUSINESS user, they aren't devs. Computer
here represents running for LONG PERIODS, complex data work, building apps. Show a
complex task, computer icon, running for 4 HOURS, and a STACKED set of tasks." NO terminal.
Reference: `/home/daytona/workspace/tmp/refs/automated-cve-remediation.png` (the stacked
receding subtask cards) — copy that stack treatment.

BUILD: a front card (white, radius 22, ~640 wide) then 3-4 receding stacked cards behind
it (each shifted down ~14px, narrower ~24px each side, blurred+faded more with depth:
d1 opacity .6 blur .5px, d2 .34 blur 1.6px, d3 .16 blur 3px). The stack reads as a queue.
Front card:
  - header: computer glyph (bare) + "Agent computer" + right pill "Running · 4h 12m"
    (neutral pill, small maroon dot).
  - big current-task title: "Rebuilding the Q3 revenue model"
  - one grey sub: "18,400 ledger rows · 6 scenarios · board deck"
Receding cards (title + faint sub, no per-row status — depth carries it):
  "Reconciled 3 years of ledgers", "Built 6 scenario models",
  "Rendered the board deck", "Packaging the exports".
The message: a real computer grinding a big job for hours. One maroon accent (the running dot).

## feat4-finishes — "You get finished work, not a draft"
Krishna: "just put the PLAN component from our web-app components showing a plan (we can
add icons)." It's our app's plan/task-list: a titled card, a "N/N" progress pill top-right,
rows each = a green check circle (done) + task text + a right-side integration logo,
COMPLETED tasks струck through in grey; the last, in-flight row = a grey spinner ring,
its text ink (not struck). Reference for the plan look: image the user sent — check
circles, strikethrough on done, an amber/green progress pill.

BUILD: `.card` ~660 wide.
  - header: bare list/plan glyph + "Close the July books" + right pill "4 / 5" (neutral).
  - rows (uniform height, ONE status lane on the LEFT = check circle; logo on the right):
    ✓ (struck) "Pull the month's payouts"        · logo stripe
    ✓ (struck) "Match against the ledger"          · logo googlesheets
    ✓ (struck) "Post the reconciled entries"       · logo (quickbooks→use a bare receipt glyph)
    ✓ (struck) "Email the 3 exceptions for sign-off" · logo gmail
    ◌ (spinner, NOT struck, ink) "Write the board pack" · bare doc glyph
  Struck rows: text `--soft` with line-through. Green check = filled ok circle + white tick.
  Keep it obviously a PLAN/checklist, not a generic list.

## feat5-model — "Bring your model"
Krishna: "use PILLS and FILLED/UNFILLED RADIO with claude/openai icons. BRING YOUR
SUBSCRIPTION should be fairly prominent."

BUILD: `.card` ~640 wide.
  - header: bare spark glyph + "Model" + right pill "no lock-in".
  - a prominent SELECTED row (tinted band `--maroon-soft`, maroon left-accent bar 4px):
    filled maroon radio (⦿) · Anthropic mark (inline simple SVG, ink) · "Claude Opus 4.5"
    title 26/480 · sub "On your Claude subscription" — and a small prominent maroon pill
    on this row reading "Your subscription".
  - two unselected rows (unfilled radio ○, grey ring):
    OpenAI mark · "Codex" · "On your OpenAI plan"
    bare key glyph · "Any open model" · "Your own API keys"
  Radios are the ONE status lane (right edge OR left — pick one, keep uniform). Anthropic
  icon = a simple 8-point asterisk/sunburst; OpenAI icon = a simple knotted-hex outline.
  Both monochrome ink, ~26px, bare (no tile). "Your subscription" is the hero beat.

## feat6-learns — "Learns your business"
Krishna: "content is fine. Just REMOVE THE HEADER and make EACH MEMORY A SINGLE CARD in
itself and do the BLUR STACKED CARDS thing." Reference: `/home/daytona/workspace/tmp/refs/alerts-scheduled-webhooks.png`
(three stacked rounded cards) — but stack MORE with depth blur.

BUILD: NO header, no "Memory" title. A vertical stack of individual memory cards, each a
white rounded card (radius 18, ~620 wide, padded 20-24, own shadow), overlapping-stacked
so deeper ones recede (translateY down, scale down, blur+fade). Each card:
  a 26/450 rule title + a 19 soft sub. Front 3 crisp, back 2-3 blurred/faded (depth).
  1. "Acme pays net-60, not net-30"        · "learned from 3 invoices"
  2. "Anything over $10k needs Priya"        · "approval policy"
  3. "Q3 close excludes intercompany"        · "from the close playbook"
  4. (fading) "EU invoices need a VAT id"    · "compliance rule"
  5. (fading) "Northwind bills quarterly"    · "learned from 2 renewals"
A tiny quiet footer chip bottom-right "+ 123 more" optional. One maroon accent max.

## feat7-knowledge — "Give it knowledge"
Krishna: "show a more DISK sort of thing with different skills etc and also some small
card having 'IMPORT SKILL INTO TEAM LIBRARY' looking like a BUTTON." Reference for the
files/editor feel: `/home/daytona/workspace/tmp/refs/locked-file-system.png` (icon rail +
tree) — but make it feel like a DRIVE with skills, not a code editor.

BUILD: `.card` ~680 wide, an "Agent drive" surface.
  - header: bare drive/disk glyph + "Agent drive" + right pill "12 GB".
  - a files column (mono rows, bare file/folder glyph left, size right):
    folder "playbooks/", "close-playbook.md" 24 KB, "vendor-terms.pdf" 1.4 MB,
    "chart-of-accounts.csv" 61 KB.
  - a SKILLS block below a hairline: label "REUSABLE SKILLS", then 2-3 skill CARDS
    (small rounded, a bare spark glyph + skill name + a tiny "used 40×" meta):
    "Month-end close", "Reconcile", "Draft board pack".
  - one small card styled as a BUTTON (maroon-deep bg, white text, radius 12, looks
    clickable): "＋ Import skill into team library". This button-card is the proof beat.
  Keep one row-mark treatment within each sub-block. Disk feel: think storage, not IDE.

────────────────────────────────────────────────────────────────────────
## Verification (the supervisor will do this, but self-check first)
- Render is 880×920, card commands the frame, margins even.
- No rule 1-7 violation. Read your own output at full size, not a thumbnail.
- Only the literal copy above. Real logos where named. Maroon is the only accent.
