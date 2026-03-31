import { chromium } from 'playwright';

// Exact Eluu design tokens from agentic-ops-web
const BG = '#ffffff';
const WEAK = '#f7f7f4';
const SOFT = '#edede9';
const SUB = '#dddbd1';
const DARK = '#1e1c1e';
const T1 = '#1e1c1e';
const T2 = '#58564d';
const T3 = '#aaa89e';
const T4 = '#dddbd1';
const PRIMARY = '#755a68';
const G = '#1fc16b';
const R = '#dc2626';
const A = '#fa7319';
const B = '#335cff';
const PURPLE = '#7d52f4';

const css = `*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}body{font-family:'Inter',sans-serif;background:${BG};color:${T1}}`;
const fonts = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

function eluuLogo(size=20) {
  return `<div style="width:${size}px;height:${size}px;border-radius:${size*0.3}px;background:linear-gradient(135deg,${PRIMARY},#c44060);display:flex;align-items:center;justify-content:center;">
    <svg width="${size*0.55}" height="${size*0.55}" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4.5" height="4.5" rx="1" fill="white"/><rect x="7.5" y="2" width="4.5" height="4.5" rx="1" fill="white" opacity="0.6"/><rect x="2" y="7.5" width="4.5" height="4.5" rx="1" fill="white" opacity="0.6"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="white" opacity="0.35"/></svg>
  </div>`;
}

function sidebar() {
  const items = [
    ['💬','All Sessions'],['👥','Colleagues'],['📊','Views'],['⚡','Automations'],['💾','Hard Drive'],['🔌','Tools']
  ];
  return `<div style="width:52px;background:${DARK};display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:6px;flex-shrink:0;">
    <div style="margin-bottom:12px;">${eluuLogo(28)}</div>
    ${items.map((it,i) => `<div style="width:34px;height:34px;border-radius:8px;${i===0?`background:rgba(255,255,255,0.1);`:``}display:flex;align-items:center;justify-content:center;font-size:14px;opacity:${i===0?1:0.4};cursor:pointer;">${it[0]}</div>`).join('')}
    <div style="margin-top:auto;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;opacity:0.4;">⚙️</div>
  </div>`;
}

function userBubble(text) {
  return `<div style="display:flex;justify-content:flex-end;"><div style="max-width:75%;background:${SOFT};border-radius:14px 14px 8px 14px;padding:10px 14px;font-size:13.5px;line-height:1.65;color:${T1};">${text}</div></div>`;
}

function assistantMsg(content) {
  return `<div style="display:flex;gap:8px;align-items:flex-start;">
    <div style="flex-shrink:0;margin-top:2px;">${eluuLogo(22)}</div>
    <div style="flex:1;min-width:0;">${content}</div>
  </div>`;
}

function toolCard(icon, label, detail, status='done', result='') {
  const statusIcon = status === 'done' ? `<div style="width:14px;height:14px;border-radius:50%;background:${G}14;display:flex;align-items:center;justify-content:center;"><svg width="8" height="8" viewBox="0 0 12 12" fill="${G}"><path d="M10 3L4.5 8.5L2 6" stroke="${G}" stroke-width="2" fill="none" stroke-linecap="round"/></svg></div>` : `<div style="width:14px;height:14px;border-radius:50%;background:${B}14;display:flex;align-items:center;justify-content:center;"><div style="width:6px;height:6px;border-radius:50%;background:${B};"></div></div>`;
  return `<div style="border:1px solid ${SOFT};border-radius:12px;background:${BG};overflow:hidden;">
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;">
      <span style="font-size:12px;opacity:0.6;">${icon}</span>
      <span style="font-size:13px;font-weight:500;color:${T1};flex:1;">${label}</span>
      ${detail ? `<span style="font-size:11px;padding:2px 8px;background:${WEAK};border-radius:6px;color:${T2};font-family:'JetBrains Mono',monospace;">${detail}</span>` : ''}
      ${statusIcon}
    </div>
    ${result ? `<div style="border-top:1px solid ${SOFT};padding:10px 12px;font-size:12px;line-height:1.6;color:${T2};">${result}</div>` : ''}
  </div>`;
}

function artifactCard(title, type, content) {
  const colors = {code:B, document:G, data:A};
  const c = colors[type] || T3;
  return `<div style="border:1px solid ${SOFT};border-radius:12px;overflow:hidden;">
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid ${SOFT};">
      <div style="width:18px;height:18px;border-radius:4px;background:${c}14;display:flex;align-items:center;justify-content:center;font-size:10px;">📄</div>
      <span style="font-size:12px;font-weight:500;">${title}</span>
      <span style="font-size:10px;color:${T3};margin-left:auto;">${type}</span>
    </div>
    <div style="padding:12px;font-size:12px;line-height:1.6;color:${T2};max-height:160px;overflow:hidden;">${content}</div>
  </div>`;
}

function markdown(text) {
  return `<div style="font-size:13.5px;line-height:1.7;color:${T1};">${text}</div>`;
}

// ─── SALES ─────────────────────────────────────────────────
function sales() {
  return `${sidebar()}<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:12px 20px;border-bottom:1px solid ${SOFT};display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:50%;background:${B}14;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:${B};">S</div>
      <div><div style="font-size:13px;font-weight:600;">Sales Colleague</div><div style="font-size:11px;color:${T3};">Pipeline management · CRM sync</div></div>
    </div>
    <div style="flex:1;overflow:hidden;padding:20px 40px;display:flex;flex-direction:column;gap:14px;max-width:720px;margin:0 auto;width:100%;">
      ${userBubble('Review my pipeline and flag any deals that need attention this week. Draft follow-up emails for stalled deals.')}
      ${assistantMsg(`
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${toolCard('🔌','Pulling data from Salesforce','salesforce',  'done')}
          ${toolCard('📧','Scanning email threads','gmail', 'done')}
          ${toolCard('🎙️','Checking recent call notes','gong', 'done')}
          ${markdown(`<p>I've reviewed your pipeline. Here's the breakdown:</p>
            <p><b>3 deals need immediate attention:</b></p>
            <p>1. <b>Acme Corp ($185K)</b> — No response in 8 days. Sarah Kim opened your last email but didn't reply. I've drafted a follow-up referencing the 3-year commitment discount you discussed on the call.</p>
            <p>2. <b>Beacon Labs ($92K)</b> — Proposal sent 12 days ago. Their CTO downloaded the PDF twice but no meeting scheduled. I recommend a "checking in" email with a case study from a similar-sized deployment.</p>
            <p>3. <b>Nova Systems ($45K)</b> — Discovery call went well per Gong analysis (82% positive sentiment). Demo should be scheduled within 48 hours to maintain momentum.</p>
            <p style="margin-top:6px;"><b>4 deals on track</b> — Orbit Inc (contract stage), Meridian Labs, CloudBase, and DataPipe are all progressing normally.</p>`)}
          ${artifactCard('pipeline-brief-mar28.pdf', 'document', `
            <div style="display:flex;gap:20px;">
              <div style="flex:1;">
                <div style="font-size:10px;color:${T3};text-transform:uppercase;margin-bottom:4px;">Total Pipeline</div>
                <div style="font-size:20px;font-weight:700;">$2.4M</div>
                <div style="font-size:10px;color:${G};">▲ 18% vs last month</div>
              </div>
              <div style="flex:1;">
                <div style="font-size:10px;color:${T3};text-transform:uppercase;margin-bottom:4px;">Win Rate</div>
                <div style="font-size:20px;font-weight:700;">38%</div>
                <div style="font-size:10px;color:${G};">▲ 4% improvement</div>
              </div>
              <div style="flex:1;">
                <div style="font-size:10px;color:${T3};text-transform:uppercase;margin-bottom:4px;">At Risk</div>
                <div style="font-size:20px;font-weight:700;color:${R};">3</div>
                <div style="font-size:10px;color:${R};">Requires action</div>
              </div>
            </div>
          `)}
        </div>
      `)}
    </div>
  </div>`;
}

// ─── MARKETING ─────────────────────────────────────────────
function marketing() {
  return `${sidebar()}<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:12px 20px;border-bottom:1px solid ${SOFT};display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:50%;background:#FF6B8A14;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#FF6B8A;">M</div>
      <div><div style="font-size:13px;font-weight:600;">Marketing Colleague</div><div style="font-size:11px;color:${T3};">Content · Campaigns · Competitive intel</div></div>
    </div>
    <div style="flex:1;overflow:hidden;padding:20px 40px;display:flex;flex-direction:column;gap:14px;max-width:720px;margin:0 auto;width:100%;">
      ${userBubble("What did our competitors do this week? Also, give me a content brief for the AI Ops blog post we planned.")}
      ${assistantMsg(`
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${toolCard('🌐','Scanning competitor websites','web-scraper', 'done')}
          ${toolCard('📊','Pulling campaign analytics','hubspot', 'done')}
          ${toolCard('📝','Generating content brief','google-docs', 'done')}
          ${markdown(`<p><b>Competitor Activity — This Week:</b></p>
            <p>🔴 <b>Competitor Y</b> dropped their Pro tier pricing by 20% ($49→$39/mo). Three prospects mentioned this in calls. I've updated the battle card and drafted a comparison one-pager for the sales team.</p>
            <p>🟡 <b>Competitor Z</b> launched a new "AI Assistant" feature. Based on their changelog, it's limited to single-tool integration — significantly less capable than our multi-tool parallel execution.</p>
            <p>🟢 <b>Competitor X</b> — No notable changes. Their blog hasn't been updated in 3 weeks.</p>
            <p style="margin-top:8px;"><b>Content Brief — "AI Ops Best Practices":</b></p>
            <p>Target: 2,500 words. SEO keywords: "AI operations automation" (1.2K monthly), "AI colleague platform" (890 monthly). Angle: Position Eluu's parallel execution as the key differentiator. Include the Acme Corp case study data (3 hours → 15 minutes pipeline review). Draft outline attached.</p>`)}
          ${artifactCard('content-brief-ai-ops.md', 'document', `
            <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${T2};line-height:1.7;">
              <b style="color:${T1};"># AI Ops Best Practices — Content Brief</b><br/><br/>
              <b>Target audience:</b> VP Ops, RevOps leads, Founders<br/>
              <b>Word count:</b> 2,500<br/>
              <b>Primary keyword:</b> AI operations automation<br/>
              <b>CTA:</b> Free trial signup<br/><br/>
              <b>## Outline</b><br/>
              1. The manual ops problem (stats + pain points)<br/>
              2. What AI ops actually means (not chatbots)<br/>
              3. Key capabilities: memory, parallel execution, scheduling<br/>
              4. Real example: Acme Corp pipeline automation
            </div>
          `)}
        </div>
      `)}
    </div>
  </div>`;
}

// ─── PRODUCT ───────────────────────────────────────────────
function product() {
  return `${sidebar()}<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:12px 20px;border-bottom:1px solid ${SOFT};display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:50%;background:${PURPLE}14;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:${PURPLE};">P</div>
      <div><div style="font-size:13px;font-weight:600;">Product Colleague</div><div style="font-size:11px;color:${T3};">Feedback synthesis · Roadmap tracking</div></div>
    </div>
    <div style="flex:1;overflow:hidden;padding:20px 40px;display:flex;flex-direction:column;gap:14px;max-width:720px;margin:0 auto;width:100%;">
      ${userBubble("Analyze all user feedback from the past 2 weeks and tell me what we should prioritize for Sprint 15.")}
      ${assistantMsg(`
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${toolCard('🎫','Pulling support tickets','zendesk', 'done', '<b>847 tickets</b> analyzed · 23 tagged high-priority')}
          ${toolCard('📋','Scanning NPS responses','typeform', 'done', '<b>34 responses</b> · Avg score: 4.6/5 (▲ from 4.3)')}
          ${toolCard('🔗','Checking feature requests','linear', 'done', '<b>128 open requests</b> · 12 with 5+ votes')}
          ${markdown(`<p><b>Feedback Analysis — Last 2 Weeks:</b></p>
            <p>After analyzing 847 support tickets, 34 NPS responses, and 128 feature requests, here are the top themes ranked by frequency × impact:</p>
            <p><b>1. API Webhook Reliability</b> (P0 — 34 mentions)<br/>
            Webhooks failing silently on retry. 4 enterprise customers escalated. Engineering confirmed it's the retry logic in <code style="padding:1px 6px;background:${SOFT};border-radius:4px;font-size:12px;font-family:'JetBrains Mono',monospace;">event-dispatcher.ts</code>. Fix is in PR #1847.</p>
            <p><b>2. Custom Dashboards</b> (P1 — 28 mentions)<br/>
            Users want drag-and-drop dashboard builder. Current views are read-only. Estimated 2-sprint effort. Strong correlation with Enterprise tier retention.</p>
            <p><b>3. Slack Thread Sync</b> (P1 — 19 mentions)<br/>
            Conversations in Slack threads aren't syncing back to the platform. Users lose context. Quick fix possible — estimated 5 story points.</p>
            <p style="margin-top:6px;"><b>Sprint 15 Recommendation:</b> Prioritize webhook fix (P0), then Slack thread sync (quick win), defer dashboards to Sprint 16 with a design sprint in parallel.</p>`)}
        </div>
      `)}
    </div>
  </div>`;
}

// ─── CUSTOMER SUCCESS ──────────────────────────────────────
function customerSuccess() {
  return `${sidebar()}<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:12px 20px;border-bottom:1px solid ${SOFT};display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:50%;background:${G}14;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:${G};">C</div>
      <div><div style="font-size:13px;font-weight:600;">CS Colleague</div><div style="font-size:11px;color:${T3};">Account health · Churn prevention</div></div>
    </div>
    <div style="flex:1;overflow:hidden;padding:20px 40px;display:flex;flex-direction:column;gap:14px;max-width:720px;margin:0 auto;width:100%;">
      ${userBubble("Which accounts are at risk of churning? Give me a save plan for the most critical one.")}
      ${assistantMsg(`
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${toolCard('📊','Analyzing usage patterns','analytics', 'done')}
          ${toolCard('🔌','Checking CRM health scores','salesforce', 'done')}
          ${toolCard('📧','Scanning support interactions','zendesk', 'done')}
          ${markdown(`<p><b>At-Risk Accounts — 4 flagged:</b></p>
            <p>🔴 <b>DevStream (Growth · $42K ARR)</b> — Critical<br/>
            Usage dropped 58% in 30 days. No login from champion (Mark Liu, CTO) in 12 days. 3 unresolved support tickets. Renewal in 21 days.</p>
            <p>🟡 <b>CloudNine (Pro · $18K ARR)</b> — Watch<br/>
            Usage down 22%. Switched primary user. Renewal in 39 days.</p>
            <p>🟡 <b>PixelForge (Growth · $36K ARR)</b> — Watch<br/>
            Feature request rejected last month. Slight engagement decline.</p>
            <p>🟡 <b>NovaTech (Pro · $12K ARR)</b> — Watch<br/>
            Downgraded from Growth tier 2 months ago. Usage stable but low.</p>
            <p style="margin-top:8px;"><b>Save Plan — DevStream:</b></p>`)}
          ${artifactCard('devstream-save-plan.pdf', 'document', `
            <div style="line-height:1.7;">
              <b style="color:${R};">PRIORITY: CRITICAL · Renewal: Apr 20</b><br/><br/>
              <b>Week 1 (Immediate):</b><br/>
              • Schedule exec-to-exec call — your VP CS to their CTO Mark Liu<br/>
              • Prepare usage decline analysis showing specific features they stopped using<br/>
              • Offer 2 complimentary onboarding sessions for their new team members<br/><br/>
              <b>Week 2-3:</b><br/>
              • Deploy custom Slack integration they requested in ticket #4521<br/>
              • Set up weekly 15-min check-in cadence<br/>
              • Share roadmap preview of Q2 features relevant to their workflow
            </div>
          `)}
        </div>
      `)}
    </div>
  </div>`;
}

// ─── ENGINEERING ────────────────────────────────────────────
function engineering() {
  return `${sidebar()}<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:12px 20px;border-bottom:1px solid ${SOFT};display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:50%;background:${A}14;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:${A};">E</div>
      <div><div style="font-size:13px;font-weight:600;">Engineering Colleague</div><div style="font-size:11px;color:${T3};">Sprint health · PR reviews · Incidents</div></div>
    </div>
    <div style="flex:1;overflow:hidden;padding:20px 40px;display:flex;flex-direction:column;gap:14px;max-width:720px;margin:0 auto;width:100%;">
      ${userBubble("Give me a sprint health check. Summarize open PRs and flag any blockers for the release on Friday.")}
      ${assistantMsg(`
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${toolCard('🔗','Pulling sprint data','linear', 'done', 'Sprint 14 · 3 days remaining')}
          ${toolCard('🔀','Scanning pull requests','github', 'done', '8 open PRs · 3 awaiting review')}
          ${toolCard('🚨','Checking incidents','pagerduty', 'done', '0 active incidents · 14-day clean streak')}
          ${markdown(`<p><b>Sprint 14 Health Check:</b></p>
            <p><b>Velocity:</b> 34/42 points complete (78%). On track for Friday if the 3 in-review PRs merge by Wednesday.</p>
            <p><b>Blockers:</b></p>
            <p>⚠️ <b>PR #1847 — Webhook retry logic</b> (Sarah Chen)<br/>
            5 files changed, +245 −12. Needs 1 more approval. James started review but left 2 unresolved comments about the backoff multiplier. I recommend pinging him today — this blocks the event-dispatcher fix that 4 enterprise customers are waiting on.</p>
            <p>⚠️ <b>PR #1852 — Rate limiter v2</b> (James Lee)<br/>
            12 files, +891 −34. Large PR. No reviewers assigned yet. Suggest splitting the Redis adapter into a separate PR for faster review cycle.</p>
            <p><b>On Track:</b></p>
            <p>✅ PR #1855 — Auth token rotation (Maya P.) — Merged<br/>
            ✅ PR #1850 — Slack event handler fix (Sarah C.) — Approved, merging today<br/>
            🔵 ELUU-498 — Dashboard caching (Alex K.) — In progress, no PR yet</p>
            <p><b>Release readiness:</b> 78% complete. Critical path is PR #1847. If it merges by Wed, Friday release is green.</p>`)}
        </div>
      `)}
    </div>
  </div>`;
}

const roleMap = { sales, marketing, product, 'customer-success': customerSuccess, engineering };

function buildPage(roleId) {
  return `<!DOCTYPE html><html><head>${fonts}<style>${css}</style></head><body>
<div style="display:flex;width:920px;height:640px;overflow:hidden;border-radius:12px;border:1px solid ${SOFT};">${roleMap[roleId]()}</div>
</body></html>`;
}

const browser = await chromium.launch();
for (const roleId of Object.keys(roleMap)) {
  const page = await browser.newPage({ viewport: { width: 920, height: 640 } });
  await page.setContent(buildPage(roleId), { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const fn = roleId === 'customer-success' ? 'role-cs' : `role-${roleId}`;
  await page.screenshot({ path: `/Users/devind/eluu-clone/public/images/${fn}.png`, type: 'png' });
  console.log(`✓ ${fn}.png`);
  await page.close();
}
await browser.close();
console.log('Done.');
