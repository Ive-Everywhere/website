# Agents page — feature-well illustrations (authoring spec)

You are producing ONE self-contained HTML illustration for a feature well on the Eluu
`/agents` page, in the style of **Ona's product illustrations** (soft tinted canvas,
idealized white UI cards as the art, one focal object, big type — the CONTENT is the
illustration). Reference the golden exemplar `feat3-computer.html` for the exact quality
bar, structure, and scale.

## Hard rules (match the exemplar)
- File is a complete HTML doc: `<!DOCTYPE html><html><head><meta charset="utf-8">` (charset REQUIRED — omitting it causes mojibake), `<link rel="stylesheet" href="_kit.css">`, a small `<style>` for this file's specifics, then `<body><div class="stage cv-XXX"> … </div>`.
- Stage is **880×920 portrait** (already set by `.stage`). Pick ONE canvas tint class on `.stage`: `cv-cream` / `cv-lav` / `cv-blue` / `cv-warm` / `cv-sand` (assigned per file below).
- The focal `.card` should command the frame — roughly **600–680px wide** and tall enough to fill most of the vertical space (aim card height ~560–680px). Center it (the `.stage` is a flex center).
- **Type runs BIG** like Ona: headers 25–28px, rows 22–24px, meta 16–18px, mono 18–20px. Never a font-weight above 530 (Mercury discipline — use 400 body, 480 emphasis, 530 only for the largest number).
- **Real logos** for any named tool: `<img src="live/assets/<slug>.svg">` where slug ∈ {slack, salesforce, stripe, googlesheets, github, gmail, linear, notion, hubspot, zendesk}. Never a generic glyph for a real brand.
- **Real avatars** when an agent/person appears: DiceBear `https://api.dicebear.com/9.x/adventurer/svg?seed=Ledger&backgroundColor=c5f2e0` (seeds: Ledger c5f2e0, Sana b6e3f4, Cass ffd5dc, Hana ffdfbf). Human photos: `https://randomuser.me/api/portraits/men/32.jpg`.
- Use the kit classes (`.card .hd .hd__t .tag .tag--ok .pip .chip .tile .tile--maroon .tick .row .row__l .tog .log .av .built`) plus a small per-file `<style>` for layout specifics. Tokens: ink #1E1C1E, sub #58564D, soft #AAA89E, line #e7e4df, maroon #755A68 / deep #5D374B / tint #f4eef1, ok #1f8a5b / bg #e4f4ea.
- One proof beat per illustration (the concrete detail that makes it non-generic — a filename, a count, a done state). No lorem, plausible real data.
- Icons: inline SVG (stroke #755A68 or currentColor), 24px stroke-width 1.8, rounded caps/joins. Ri-style line icons.

## The seven features (this task builds the ones listed in your prompt)

**feat1-tools.html** — "Agents that use the systems you do" · canvas `cv-cream`
Format: a **Connections panel** (Ona cloud-env chips → tool list). Card titled "Connections" with a green "12 connected" tag. Then rows, each a `.tile` with the real logo + tool name + a small "Connected" `.tag--ok` or scope line: Slack (#ops, chat + act), Salesforce (read + write), Stripe (payouts), Google Sheets (ledger), GitHub (repos). Footer row: "+ 100 more" muted. Proof beat: the scope lines ("read + write", "142 payouts").

**feat2-anywhere.html** — "Run tasks from your desk, Slack, or phone" · canvas `cv-lav`
Format: **trigger cascade** (Ona trigger pills). A vertical stack of 4 trigger cards, each `.card--soft`: a `.tile` source icon + "Started from <source>" + a tiny meta, all feeding one agent. Sources: Slack message (real slack logo), Web app, Email, API call (`POST /v1/tasks`). The 4th/last is the agent picking it up: agent `.av` avatar + "Ledger picked it up · running in the cloud" with a `.tag--run` pip. Proof beat: the API path + "close your laptop, it keeps running".

**feat4-finishes.html** — "You get finished work, not a draft" · canvas `cv-sand`
Format: **task → done → delivered** checklist card (Ona migration checklist). Card titled "Reconcile month-end close" + `.tag--ok` "Done in 1m 12s". Rows with `.tile` logos ticking to `.tick`: Pulled 142 payouts (stripe), Matched 3,208 ledger rows (googlesheets), Posted 139 entries, then a final DELIVERED row (maroon file icon) "Board pack · reports/july.md" with a small "Delivered" tag. Proof beat: it ends on a delivered file, not a draft.

**feat5-model.html** — "Run Claude, Codex, or any model you pay for" · canvas `cv-blue`
Format: **model selector panel** (Mercury-clean config). Card titled "Model" with a subtitle "No lock-in". Rows, each a `.chip`-like row: Claude (SELECTED — maroon left accent + `.tick`), Codex, GPT-4o, then a distinct row "Bring your own key" with a small key icon and a mono `sk-••••` field. One row selected (maroon). Proof beat: the "on your subscription" line + the selected state.

**feat6-learns.html** — "The more it works, the more it knows" · canvas `cv-warm`
Format: **memory panel** — knowledge compounding. Card titled "Memory" with tag "128 notes" and a small up-tick "+4 today". A `.row` list of learned notes with small doc icons: "Acme pays on net-60", "Q3 close excludes intercompany", "Priya approves >$10k", "EU invoices need VAT id". Below, an avatar `.av` (Ledger) + "learned across 1,204 tasks". Proof beat: the specific business rules it learned (net-60, >$10k).

**feat7-knowledge.html** — "Feed it your files and skills" · canvas `cv-cream`
Format: **agent drive panel** (Ona code-review-config → files). Card titled "Agent drive". A files list with doc icons: "close-playbook.md", "brand-guide.pdf", "vendor-list.csv", "pricing.xlsx" (each with a size like "24 KB"). Then a divider and a "Skills" row of `.chip`s: "Month-end close", "Draft board pack", "Reconcile". Proof beat: real filenames + reusable skill chips.

## Deliverable
Write the assigned file(s) to `art-src/agents/<name>.html`. Self-contained, renders standalone
against `_kit.css`. Do NOT modify `_kit.css` or any other file. Match the exemplar's polish.
