import { useEffect, useRef, useState } from 'react';

const DWELL_MS = 6000;

interface Item {
  icon: string;
  title: string;
  body: string;
}
interface Tab {
  tab: string;
  bigIcon: string;
  glow: string;
  tabSub: string;
  headline: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  items: Item[];
}

const TABS: Tab[] = [
  {
    tab: 'Agents',
    bigIcon: 'ri-robot-3-line',
    glow: '#f3e4ec',
    tabSub: 'Connect your tools and hand off the work.',
    headline: 'Put agents to work across your tools.',
    intro:
      'Connect your systems and hand the work to agents that run it end to end, wherever your team works.',
    ctaLabel: 'Explore Agents',
    ctaHref: '/agents',
    items: [
      { icon: 'ri-plug-line', title: 'Connect any tool', body: 'Native connections to Slack, Salesforce, Stripe, Sheets, and 100+ more. Agents read and act, no glue code.' },
      { icon: 'ri-terminal-box-line', title: 'Bring your harness', body: 'Run Claude Code, Codex, or any open harness on the subscription you already pay for.' },
      { icon: 'ri-calendar-schedule-line', title: 'Schedule jobs', body: 'Run on a schedule, or fire from an inbound email or an API call, no one has to start it.' },
      { icon: 'ri-slack-line', title: 'Talk on Slack', body: 'Assign work and get finished results in the channels your team already lives in.' },
    ],
  },
  {
    tab: 'Workforce',
    bigIcon: 'ri-stack-line',
    glow: '#ece7f3',
    tabSub: 'Scale the work, not the headcount.',
    headline: "Move a team's worth of work with agents.",
    intro: 'Run a whole team at once, in one workspace, where what one agent learns the rest can use.',
    ctaLabel: 'Explore Workforce',
    ctaHref: '/workforce',
    items: [
      { icon: 'ri-stack-line', title: 'Run in parallel', body: 'Hundreds of sessions at once, not one task waiting in a queue behind another.' },
      { icon: 'ri-dashboard-line', title: 'Build live apps', body: 'Dashboards, trackers, and internal tools your agents build, connect to your data, and keep current.' },
      { icon: 'ri-mind-map', title: 'Team skills library', body: 'Build a workflow once and every agent can use it, instead of rebuilding it each time.' },
      { icon: 'ri-database-2-line', title: 'Storage per agent', body: 'Files and memory for every agent, with no context ceiling to drop what it learned.' },
    ],
  },
  {
    tab: 'Security',
    bigIcon: 'ri-lock-2-line',
    glow: '#f0e6e2',
    tabSub: 'Governed and auditable, in your environment.',
    headline: 'Every agent under your control.',
    intro: 'Decide what each agent can reach, keep your data in your environment, and record everything it does.',
    ctaLabel: 'Explore Security',
    ctaHref: '/security',
    items: [
      { icon: 'ri-lock-2-line', title: 'Granular access control', body: 'Set the exact tools and actions each agent can use, per agent and per tool.' },
      { icon: 'ri-git-branch-line', title: 'Private inference', body: 'Bring your own model keys, or run inference inside your own environment.' },
      { icon: 'ri-file-list-3-line', title: 'Audit log', body: 'Every action an agent takes, recorded and reviewable when finance or legal asks.' },
      { icon: 'ri-cloud-line', title: 'Run in your own cloud', body: 'Deploy agents in your VPC so your data never leaves your environment.' },
    ],
  },
];

export default function CapabilityTabs() {
  const [active, setActive] = useState(0);
  const a = TABS[active];

  const section = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);

  // Restart the auto-advance timer (on enter-view and on manual select).
  const arm = () => {
    window.clearInterval(timerRef.current);
    if (!inViewRef.current) return;
    timerRef.current = window.setInterval(() => {
      setActive((v) => (v + 1) % TABS.length);
    }, DWELL_MS);
  };

  const select = (i: number) => {
    setActive(i);
    arm();
  };

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        arm();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={section} className="bg-band-surface">
      <div className="page-shell gutter-188 flex flex-col gap-10 py-16 lg:py-20">
        <div className="flex flex-col gap-3">
          <h2 className="t-landing-h3 text-band-ink text-balance">
            Build, equip and monitor your AI team.
          </h2>
        </div>

        {/* Selector tabs, dim the unselected, no solid highlight on the active */}
        <div className="grid gap-6 lg:grid-cols-3">
          {TABS.map((t, i) => (
            <button
              key={t.tab}
              type="button"
              onClick={() => select(i)}
              aria-pressed={i === active}
              className={`flex flex-col gap-4 rounded-[16px] p-2.5 text-left transition-opacity duration-200 ${
                i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              {/* The nav's own product icon, writ large: gradient-clipped glyph on the
                  warm paper tile (light on the maroon band, per Krishna). */}
              <div
                className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[12px]"
                style={{
                  background: `radial-gradient(85% 95% at 50% 18%, ${t.glow}, rgba(255,255,255,0) 64%), radial-gradient(62% 46% at 50% 98%, rgba(93,55,75,.13), rgba(93,55,75,0) 72%), #f5f2ee`,
                }}
              >
                <i
                  className={t.bigIcon}
                  aria-hidden="true"
                  style={{
                    fontSize: '118px',
                    lineHeight: 1,
                    background: 'linear-gradient(155deg, #a98f9c 6%, #755a68 46%, #4a2c3c 94%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    filter: 'drop-shadow(0 12px 20px rgba(93,55,75,.28))',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 px-2 pb-1">
                <span className="t-h6 text-band-ink">{t.tab}</span>
                <span className="t-label-md text-band-muted">{t.tabSub}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Divider between the selectors and the detail, like Modal */}
        <div className="border-band-muted border-t opacity-20" />

        {/* Active content, no eyebrow above the heading */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <h3 className="t-landing-h3 text-band-ink text-balance">{a.headline}</h3>
            <p className="t-label-md text-band-muted text-pretty max-w-[38ch]">{a.intro}</p>
            <a
              href={a.ctaHref}
              className="border-band-ink text-band-ink t-label-md mt-2 inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 transition-opacity hover:opacity-80"
            >
              {a.ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {a.items.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <i className={`${item.icon} text-band-ink text-[22px]`} aria-hidden="true" />
                  <h4 className="t-label-lg text-band-ink font-medium">{item.title}</h4>
                </div>
                <p className="t-label-md text-band-muted text-pretty">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
