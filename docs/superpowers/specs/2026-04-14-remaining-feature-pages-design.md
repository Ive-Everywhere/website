# Remaining Feature Pages — Design Spec

**Date:** 2026-04-14
**Status:** Approved
**Scope:** 5 remaining feature data pages + navbar link updates. Layout already exists.

## Goal

Create the 5 remaining feature pages (Team Drive, Integrations, Views, Slack, Jobs) using the existing FeatureLayout.astro. Each page is a pure data file. Also update the navbar dropdown links.

## Architecture

| File | Change |
|---|---|
| `src/pages/features/team-drive.astro` | NEW — 2 value prop cards |
| `src/pages/features/integrations.astro` | NEW — 2 value prop cards |
| `src/pages/features/views.astro` | NEW — 2 value prop cards |
| `src/pages/features/slack.astro` | NEW — 1 value prop card |
| `src/pages/features/jobs.astro` | NEW — 2 value prop cards |
| `src/components/Navbar.astro` | MODIFY — update 5 dropdown links |

All pages use the existing `FeatureLayout.astro` with no layout changes needed.

## Card counts

| Feature | Cards | Rationale |
|---|---|---|
| Team Drive | 2 | Upload + organize, context recall |
| Integrations | 2 | Connect + unify |
| Views | 2 | Build dashboards + make decisions |
| Slack | 1 | Single-purpose integration |
| Jobs | 2 | Schedule + orchestrate |

## Page Data

### Team Drive (`/features/team-drive`)

```js
{
  slug: 'team-drive',
  name: 'Team Drive',
  color: '#7a8b6e',
  breadcrumb: 'Team Drive',
  headline: "Your agents' shared brain",
  description: "A shared knowledge base that gives every AI colleague the same context.",
  intro: {
    bold: 'Upload, organize, recall.',
    supporting: "A shared knowledge base that gives every AI colleague the same context — files, playbooks, SOPs, and institutional memory.",
  },
  valueProps: [
    {
      title: 'Everything in one place',
      features: [
        { title: 'Centralized uploads', desc: 'Drop files, playbooks, SOPs, and reference docs into a shared drive your colleagues can access instantly.' },
        { title: 'Automatic indexing', desc: 'Team Drive reads and indexes every document so colleagues can search and recall information without being told where to look.' },
        { title: 'Version control', desc: 'Every update is tracked. Colleagues always reference the latest version, never stale data.' },
      ],
    },
    {
      title: 'Context that compounds',
      features: [
        { title: 'Cross-colleague access', desc: 'Every colleague draws from the same knowledge base. What one learns, all can reference.' },
        { title: 'Smart retrieval', desc: "Colleagues don't just keyword-search. They understand context, pull relevant sections, and cite their sources." },
        { title: 'Org-wide memory', desc: "Institutional knowledge doesn't leave when people do. It lives in Team Drive, accessible to every current and future colleague." },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Team Drive',
    items: [
      { value: '500+', label: 'docs indexed', desc: 'per team on average across all document types' },
      { value: '< 2s', label: 'retrieval time', desc: 'average time for a colleague to find and cite relevant information' },
      { value: 'Zero', label: 'context re-explaining', desc: 'colleagues never ask you to repeat what they already know' },
    ],
  },
  testimonial: {
    quote: "We uploaded our entire sales playbook and three months of deal memos. By the next day, our AI colleague was prepping call briefs with context we'd forgotten we had.",
    attribution: 'VP of Sales, Mid-Market SaaS',
  },
  useCases: {
    heading: 'What teams build with Team Drive',
    cases: [
      { title: 'Sales enablement', desc: 'Colleagues pull from your playbook, competitive intel, and deal history to prep for every call.' },
      { title: 'Compliance documentation', desc: 'Upload policies and regulations. Colleagues reference them when reviewing contracts or flagging risks.' },
      { title: 'Employee onboarding', desc: 'New hires get instant answers from your knowledge base. Colleagues surface the right docs at the right time.' },
    ],
  },
  ctaHeading: "Give your colleagues a shared brain.",
}
```

### Integrations (`/features/integrations`)

```js
{
  slug: 'integrations',
  name: 'Integrations',
  color: '#6a8ec4',
  breadcrumb: 'Integrations',
  headline: 'Connect everything',
  description: 'Connect your AI colleagues to any tool, data source, or API your team uses.',
  intro: {
    bold: 'Plug in, light up.',
    supporting: 'Connect your AI colleagues to any tool, data source, or API your team uses — and watch them work across your entire stack.',
  },
  valueProps: [
    {
      title: 'Native connections, zero glue code',
      features: [
        { title: '20+ pre-built connectors', desc: 'Salesforce, HubSpot, Stripe, Google Sheets, Slack, Gmail, and more. One-click setup.' },
        { title: 'Scoped permissions', desc: 'Each colleague gets exactly the access it needs — read, write, or both. Revoke anytime.' },
        { title: 'Real-time sync', desc: 'Data flows in and out in real time. No batch jobs, no stale data, no manual refresh.' },
      ],
    },
    {
      title: 'Your stack, unified',
      features: [
        { title: 'Cross-tool workflows', desc: 'A single task can span CRM, billing, spreadsheets, and messaging. Colleagues handle the orchestration.' },
        { title: 'Custom API connections', desc: 'Connect any REST API your team uses. No engineering tickets required.' },
        { title: 'Data never leaves your environment', desc: 'All integrations run through your own infrastructure. SOC 2 compliant.' },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Integrations',
    items: [
      { value: '20+', label: 'native integrations', desc: 'across CRM, billing, communication, and productivity tools' },
      { value: '< 60s', label: 'to connect', desc: 'average time to set up a new tool connection' },
      { value: '100%', label: 'data stays local', desc: 'all data stays in your environment — zero external retention' },
    ],
  },
  testimonial: {
    quote: "We connected Salesforce, Stripe, and Google Sheets in under five minutes. Our colleague was reconciling revenue data across all three before lunch.",
    attribution: 'Head of RevOps, Series A Startup',
  },
  useCases: {
    heading: 'What teams build with Integrations',
    cases: [
      { title: 'CRM enrichment', desc: 'Colleagues pull data from LinkedIn, email, and support tools to keep your CRM records complete and current.' },
      { title: 'Invoice reconciliation', desc: 'Match Stripe charges to Salesforce deals and log discrepancies in Google Sheets — automatically.' },
      { title: 'Cross-platform reporting', desc: 'Colleagues aggregate data from every tool into unified dashboards and weekly summaries.' },
    ],
  },
  ctaHeading: 'Connect your entire stack.',
}
```

### Views (`/features/views`)

```js
{
  slug: 'views',
  name: 'Views',
  color: '#8a6ec4',
  breadcrumb: 'Views',
  headline: 'Your agentic command center',
  description: 'Build live dashboards that show pipeline health, revenue metrics, and colleague activity.',
  intro: {
    bold: 'See everything, miss nothing.',
    supporting: 'Build live dashboards that show pipeline health, revenue metrics, colleague activity, and operational signals — all updated by your AI colleagues in real time.',
  },
  valueProps: [
    {
      title: 'Dashboards that build themselves',
      features: [
        { title: 'Auto-generated views', desc: 'Colleagues create dashboards from the data they already process. No manual setup.' },
        { title: 'Real-time data', desc: 'Views update as colleagues work. Pipeline moves, deals close, tasks complete — you see it live.' },
        { title: 'Custom layouts', desc: 'Drag, resize, and configure. Pin the metrics that matter to your team.' },
      ],
    },
    {
      title: 'From data to decisions',
      features: [
        { title: 'Cross-source aggregation', desc: 'Pull from CRM, billing, spreadsheets, and support tools into a single view.' },
        { title: 'Alert thresholds', desc: 'Set conditions. When a metric crosses a threshold, Views flags it and your colleague takes action.' },
        { title: 'Shareable', desc: 'Send a view to your team, embed it in Slack, or export to a slide deck for leadership.' },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Views',
    items: [
      { value: 'Real-time', label: 'data updates', desc: 'dashboards refresh as colleagues process new information' },
      { value: '< 5 min', label: 'to build', desc: 'average time to create a custom dashboard from scratch' },
      { value: 'Zero', label: 'manual data entry', desc: 'colleagues populate every metric automatically' },
    ],
  },
  testimonial: {
    quote: "I used to spend two hours every Monday building pipeline reports. Now Views has it ready before I open my laptop. The data is always current and always right.",
    attribution: 'Sales Director, Enterprise SaaS',
  },
  useCases: {
    heading: 'What teams build with Views',
    cases: [
      { title: 'Pipeline dashboards', desc: 'Live pipeline view with deal stages, revenue projections, and risk flags — updated by your colleagues in real time.' },
      { title: 'Revenue forecasting', desc: 'Forecast dashboards that cross-reference CRM data, billing actuals, and historical patterns.' },
      { title: 'Team activity monitoring', desc: 'See what every colleague is working on, what they have completed, and what is queued next.' },
    ],
  },
  ctaHeading: 'See your business in real time.',
}
```

### Slack (`/features/slack`)

```js
{
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
    quote: "I just type '@Ruby review this week\\'s pipeline' in our revenue channel and get a full analysis in under a minute. It\\'s like having a team member who never sleeps.",
    attribution: 'VP of Revenue, Growth-Stage Startup',
  },
  useCases: {
    heading: 'What teams do with Slack',
    cases: [
      { title: 'Pipeline check-ins', desc: 'Ask your colleague for a pipeline summary directly in your sales channel. Get an answer in seconds.' },
      { title: 'Daily standup summaries', desc: 'Your colleague posts a morning summary of what happened overnight — deals moved, tasks completed, risks flagged.' },
      { title: 'Ad-hoc research', desc: "Drop a question in any channel. Your colleague searches your data, pulls context, and responds with citations." },
    ],
  },
  ctaHeading: 'Put your colleagues where your team already works.',
}
```

### Jobs (`/features/jobs`)

```js
{
  slug: 'jobs',
  name: 'Jobs',
  color: '#c49a6a',
  breadcrumb: 'Jobs',
  headline: 'Automate the repeat work',
  description: 'Run tasks on a schedule, trigger workflows from events, or fire one-off jobs from anywhere.',
  intro: {
    bold: 'Schedule it. Trigger it. Forget it.',
    supporting: 'Run tasks on a schedule, trigger workflows from events, or fire one-off jobs from anywhere. Your colleagues handle the execution.',
  },
  valueProps: [
    {
      title: 'Set it and forget it',
      features: [
        { title: 'Scheduled tasks', desc: 'Run any task on a cron schedule. Daily pipeline reviews, weekly reports, monthly reconciliations.' },
        { title: 'Event triggers', desc: 'Fire a job when a deal closes, a ticket escalates, or a threshold is crossed. Zero manual intervention.' },
        { title: 'Retry & error handling', desc: 'If a job fails, it retries automatically. You get notified only when something needs your attention.' },
      ],
    },
    {
      title: 'Orchestrate at scale',
      features: [
        { title: 'Multi-step workflows', desc: "Chain tasks together. One job's output feeds the next. Build pipelines that span tools and colleagues." },
        { title: 'Parallel execution', desc: 'Run multiple jobs simultaneously across different colleagues and projects.' },
        { title: 'Full audit trail', desc: 'Every job is logged. See what ran, when, what it produced, and how long it took.' },
      ],
    },
  ],
  stats: {
    heading: 'Proven results with Jobs',
    items: [
      { value: '1000s', label: 'jobs per month', desc: 'run per team across scheduled and triggered workflows' },
      { value: '< 1s', label: 'trigger latency', desc: 'from event to execution start' },
      { value: '99.9%', label: 'completion rate', desc: 'with automatic retry and error handling' },
    ],
  },
  testimonial: {
    quote: "We set up a scheduled job that reviews our pipeline every morning at 7am and posts a summary to Slack. It\\'s been running for three months without a single miss.",
    attribution: 'Operations Lead, B2B Platform',
  },
  useCases: {
    heading: 'What teams automate with Jobs',
    cases: [
      { title: 'Morning pipeline briefings', desc: 'A scheduled job reviews every deal overnight and posts a summary to your team channel before 8am.' },
      { title: 'Invoice generation on deal close', desc: 'When a deal marks as closed-won, a job creates the invoice in Stripe and logs it in your spreadsheet.' },
      { title: 'Weekly board report drafts', desc: 'Every Friday, a job pulls data from every revenue system and drafts a board-ready report.' },
    ],
  },
  ctaHeading: 'Put your operations on autopilot.',
}
```

## Navbar Updates

Update the 5 remaining dropdown links in `src/components/Navbar.astro`:
- Team Drive → `/features/team-drive`
- Integrations → `/features/integrations`
- Views → `/features/views`
- Slack → `/features/slack`
- Jobs → `/features/jobs`

## What's NOT in scope

- Real product images (placeholder gradients for now)
- Layout changes to FeatureLayout.astro
- New sections or components
