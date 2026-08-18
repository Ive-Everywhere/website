# Workforce + Security feature-well illustrations

Same system as the APPROVED agents cards. Study these first as the style baseline —
match their header/pill/card/tint/weight treatment exactly:
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat1-tools.html   (list-card, logo rows, "N connected")
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat3-computer.html (front card + receding blurred stack)
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat4-finishes.html (plan/checklist: progress pill, checks, spinner, struck rows)
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat5-model.html   (individual selectable cards, radios, "Your subscription" pill)
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat6-learns.html  (headerless blur-stacked individual cards)
- /home/daytona/workspace/projects/website-v3/gh/art-src/agents/feat7-knowledge.html (drive: files + skill cards + maroon button-card)
Kit + tokens: art-src/agents/_kit.css. Stage 880×920, card ~640-700 wide, card commands the frame.

## House rules (obey all — from _kit.css header)
1 header mark = BARE stroked glyph, never a tile, never reused as a row mark.
2 ONE row-mark treatment per card. 3 uniform row height, card sizes to content.
4 ONE status lane. 5 ONE green = completed only, header pills neutral. 6 depth = real
crop/stack/fade. 7 ONE maroon accent per card max, never an icon tile. Weight ceiling 530.
Real logos: live/assets/<slug>.svg (slack salesforce stripe googlesheets github gmail hubspot linear notion zendesk).
Avatars: https://api.dicebear.com/9.x/adventurer/svg?seed=<Name>&backgroundColor=<hex>
  seeds/bg: Ledger c5f2e0 · Sana b6e3f4 · Cass ffd5dc · Hana ffdfbf · Sol d1e8d4 · Ivy e5d4f0 · Rhea ffe0c7.
Each file: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="_kit.css"></head><body>`
+ one `.stage cv-<tint>` + a per-file `<style>`. Only the literal copy below. Maroon the only accent.

════════════════════ WORKFORCE (output to art-src/agents/wf*.html) ════════════════════

## wf1-fleet — "Ship a team's worth of work in a night"  (cv-blue)
A fleet roster: a header (bare grid glyph + "Workforce" + neutral pill "24 running · in parallel"),
then a 2-COLUMN grid of small agent cards (avatar 34px + name + a 17px soft role + a tiny green
"running" dot-label). 6 crisp cards, then a 7th/8th row blur-faded (depth = "and more"). Agents:
Ledger·Finance, Sana·Sales, Cass·Support, Hana·People, Sol·Ops, Ivy·Data (+faded Rhea·Legal, "+18").
One green = the running dots. One maroon accent max.

## wf2-schedule — "Work that clears on a schedule"  (cv-sand)
A schedule card (bare calendar glyph + "Scheduled work" + neutral pill "auto"). Uniform rows,
one mark treatment (a bare clock glyph left), a mono next-run time on the right:
  "Daily standup digest" · 7:00 AM   |  "Month-end close" · 1st, 6:00 AM  |
  "Pipeline refresh" · Mon 8:00 AM   |  "Weekly board update" · Fri 3:00 PM  |
  (fading) "New-deal brief" · on event
Right lane = the mono times (one lane). No green. Reference: tmp/refs/custom-automations.png.

## wf3-sharedskill — "What one agent learns, the whole fleet keeps"  (cv-cream)
One skill card at top (bare spark glyph + "Month-end close" + mono "skill · v4"), then a thin
maroon connector fanning DOWN to a centered row of 6 agent avatars, with a caption
"Learned once · used by 18 agents". One maroon accent = the connector + the caption number.
Think feat5/feat6 cleanliness; the fan is the one structural flourish.

## wf4-cost — "Cost you can cap, not fear"  (cv-warm)
A spend panel (bare wallet/coins glyph + "Spend this month" + neutral pill "$4,280 / $6,000").
Uniform rows: agent avatar + name + a horizontal cap bar (track + maroon fill) + a mono "$" on
the right. 4 rows; one row near its cap shows an amber fill + amber "$" (the one non-maroon
signal, a warning — allowed as the proof beat). A faint "cap" tick on each bar.
  Ledger $1,840  ·  Sana $1,120  ·  Cass $980 (amber, near cap)  ·  Hana $340.
Bars are the one visual system; keep them uniform.

## wf5-vpc — "Run the whole fleet in your own cloud"  (cv-blue)
A dashed-border boundary card labelled top-left "your-account · us-east-1" (mono, a bare cloud
glyph), holding a grid of small agent chips (avatar + name) INSIDE the boundary, and a quiet
footer line "Data & model calls never leave your account." The dashed boundary is the whole
idea. One maroon accent (e.g. the boundary label or a lock glyph). Reference: tmp/refs/vpc-secure-at-the-core.png.

## wf6-grows — "New agents, automations, and apps on one platform"  (cv-sand)
A 2×2 tile grid of building blocks, each tile = a bare glyph + label + mono count:
  "Agents · 24"  ·  "Automations · 12"  ·  "Apps · 6"  ·  and the 4th tile is a maroon-deep
  BUTTON-card (white text, dashed or solid, looks clickable): "＋ Add to the workforce".
The button-tile is the proof beat (like feat7's import button). One maroon accent = that tile.

════════════════════ SECURITY (output to art-src/agents/sec*.html) ════════════════════

## sec1-scope — "Every agent reaches only what you allow"  (cv-cream)
A permissions card (bare shield glyph + "Ledger · permissions" + neutral pill "scoped").
Uniform rows: a bare tool logo left + tool/action name + a control on the RIGHT (one lane):
most rows a small toggle (maroon = allowed), one row BLOCKED (grey toggle off + "off" label),
and one RISKY row showing an "Approval required" chip instead of a toggle (maroon-soft chip).
  stripe "Read payouts" ON · googlesheets "Write ledger" ON · gmail "Send email" ON ·
  hubspot "Delete records" APPROVAL REQUIRED · zendesk "Export tickets" OFF.
Reference: tmp/refs/env-guardrails-info.png (the permission rows). One maroon accent = the toggles+chip family.

## sec2-keys — "Run it all in your own environment"  (cv-blue)
An identity/keys config card (chrome + inner white pane like feat3-computer's pane, OR a plain
card). Bare key glyph + "Keys & environment" + neutral pill "in your VPC". Label/value pairs:
  "Model provider" → "Anthropic · your key"   "API key" → mono "sk-••••••••4c1a"
  "Inference" → "your VPC · us-east-1"          "Data egress" → "none — stays in account"
A hairline between pairs. One maroon accent (the masked-key value or a lock). Reference: tmp/refs/vpc-secure-at-the-core.png.

## sec3-audit — "A record of everything an agent did"  (cv-sand)
The flowing audit trail. Card (bare lock/scroll glyph + "Audit trail" + neutral pill with a
live pip "live"). A masked column of mono log lines: a mono timestamp (maroon), an optional
tool logo, and the action; use green "logged" and amber "denied/approval" words sparingly.
Mask the bottom so it dissolves (depth). Lines (verbatim):
  09:41:02  stripe  scope checked — payouts, read only
  09:41:09  googlesheets  matched 139 rows
  09:41:30  gmail  sent 3 exceptions · logged(green)
  09:53:41  (none)  approved by David · recorded
  09:53:42  hubspot  30 deals archived · logged(green)
  10:16:02  (none)  scope denied — contacts, write · not granted(amber)
  10:16:20  (none)  audit snapshot exported · SOC 2
One maroon accent = the timestamps. Green only on "logged". (This mirrors the home p4 card.)

## sec4-tools — "See what every agent can touch"  (cv-cream)
A tools-access panel (bare radar/eye glyph + "Tool access" + neutral pill "6 tools"). Uniform
rows: a bare tool logo left + tool name + a mono "used by N agents" + a small overflow avatar
stack (2-3 avatars) on the right (one lane = the avatar stacks). One row shows a quiet maroon
"revoke" text-link as the affordance. Rows: Slack 18 · Salesforce 9 · Stripe 6 · Google Sheets 12 ·
GitHub 4. One maroon accent = the "revoke" link.

## sec5-cap — "Set a ceiling agents can't cross"  (cv-warm)
A single spend-cap meter card (bare gauge glyph + "Spend cap" + neutral pill "this month").
A big horizontal meter: track + maroon fill at 62%, a clear "cap" marker at the end, big mono
value "$3,720" over "of $6,000 cap" sub. Below, 3 tiny per-agent chips with small bars. The
message: it stops at the cap. One maroon accent = the meter fill.

## Verification (supervisor will audit each at full size)
- 880×920, card commands frame, even margins, no rule 1-7 violation, only literal copy, maroon-only accent.
