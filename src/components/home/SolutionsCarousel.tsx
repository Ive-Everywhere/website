import { useEffect, useRef, useState } from 'react';

interface Op {
  icon: string;
  label: string;
  href: string;
}
interface Team {
  icon: string;
  eyebrow: string;
  title: string;
  ops: Op[];
}

const TEAMS: Team[] = [
  {
    icon: 'ri-bank-line',
    eyebrow: 'Finance',
    title: 'Close the month while you sleep.',
    ops: [
      { icon: 'ri-arrow-left-right-line', label: 'Reconcile across your systems, every night', href: '/use-cases/reconcile-data' },
      { icon: 'ri-file-chart-line', label: 'Draft the board and investor pack', href: '/use-cases/recurring-reports' },
      { icon: 'ri-alert-line', label: 'Flag anomalies in spend and invoices', href: '/use-cases/analyze-data' },
    ],
  },
  {
    icon: 'ri-line-chart-line',
    eyebrow: 'Sales',
    title: 'Keep the pipeline clean and the forecast honest.',
    ops: [
      { icon: 'ri-refresh-line', label: 'Update the CRM and log notes after every call', href: '/agents' },
      { icon: 'ri-file-user-line', label: 'Prep an account brief before each meeting', href: '/use-cases/analyze-data' },
      { icon: 'ri-time-line', label: 'Chase the deals going quiet', href: '/agents' },
    ],
  },
  {
    icon: 'ri-terminal-box-line',
    eyebrow: 'Customer Engineering',
    title: 'From incident to fix, without the scramble.',
    ops: [
      { icon: 'ri-search-line', label: 'Triage the incident and search the logs for cause', href: '/use-cases/analyze-data' },
      { icon: 'ri-git-pull-request-line', label: 'Draft the remedial PR and open it for review', href: '/agents' },
      { icon: 'ri-book-2-line', label: 'Turn the fix into a runbook and KB doc', href: '/use-cases/process-documents' },
    ],
  },
  {
    icon: 'ri-team-line',
    eyebrow: 'People',
    title: 'Hire and onboard without the busywork.',
    ops: [
      { icon: 'ri-user-search-line', label: 'Source candidates for open roles', href: '/agents' },
      { icon: 'ri-file-list-3-line', label: 'Screen and grade the top résumés', href: '/use-cases/process-documents' },
      { icon: 'ri-calendar-check-line', label: 'Prep interview briefs and week-one plans', href: '/use-cases/recurring-reports' },
    ],
  },
];

const DWELL_MS = 6000;

export default function SolutionsCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const ring = useRef<SVGRectElement | null>(null);
  const [active, setActive] = useState(0);

  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const cycleStart = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const scrollTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>('[data-card]')[i];
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  const resetRing = () => {
    cycleStart.current = performance.now();
    if (ring.current) ring.current.style.strokeDashoffset = '100';
  };

  // Restart the ring whenever the focused card changes (scroll, click, auto).
  useEffect(() => {
    if (inViewRef.current) resetRing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    let queued = false;
    const measure = () => {
      queued = false;
      const center = el.scrollLeft + el.clientWidth / 2;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'));
      let best = 0;
      let bd = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    // rAF loop drives BOTH the ring fill and the advance, so they stay in sync.
    const tick = () => {
      const now = performance.now();
      const p = Math.min((now - cycleStart.current) / DWELL_MS, 1);
      if (ring.current) ring.current.style.strokeDashoffset = String(100 * (1 - p));
      if (p >= 1) {
        cycleStart.current = now;
        scrollTo((activeRef.current + 1) % TEAMS.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const start = () => {
      resetRing();
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (ring.current) ring.current.style.strokeDashoffset = '100';
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.35 },
    );
    if (section.current) io.observe(section.current);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={section} className="bg-bg-white-0">
      <div className="page-shell gutter-188 flex flex-col gap-8 py-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <h2 className="t-landing-h3 text-text-strong-950 text-balance">
              AI teams deep enough to run every department&rsquo;s work.
            </h2>
          </div>

          {/* Department icons (also the nav) — active carries the timer ring */}
          <div className="flex shrink-0 gap-3">
            {TEAMS.map((t, i) => (
              <button
                key={t.eyebrow}
                type="button"
                aria-label={t.eyebrow}
                aria-current={i === active}
                onClick={() => scrollTo(i)}
                className={`relative flex size-12 items-center justify-center rounded-[12px] transition-all duration-200 ${
                  i === active
                    ? 'bg-bg-weak-50 text-text-strong-950'
                    : 'text-text-soft-400 border-stroke-soft-200 border opacity-45 hover:opacity-100'
                }`}
              >
                <i className={`${t.icon} text-[22px]`} aria-hidden="true" />
                {i === active && (
                  <svg
                    className="text-text-strong-950 pointer-events-none absolute inset-0"
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="46"
                      height="46"
                      rx="11"
                      ry="11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeOpacity="0.15"
                    />
                    <rect
                      ref={ring}
                      x="1"
                      y="1"
                      width="46"
                      height="46"
                      rx="11"
                      ry="11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="100"
                      strokeDashoffset="100"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal side-scroll — one FULL-WIDTH card per view, taller. */}
      <div className="page-shell gutter-188">
        <div
          ref={scroller}
          className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {TEAMS.map((team, i) => (
            <article
              data-card
              key={team.eyebrow}
              style={{ width: '100%' }}
              className={`bg-card-surface shrink-0 snap-start rounded-[16px] p-2.5 transition-all duration-300 ${
                i === active ? 'opacity-100 blur-0' : 'opacity-60 blur-[3px]'
              }`}
            >
              <div className="flex flex-col justify-between gap-8 p-6 lg:min-h-[520px] lg:flex-row lg:items-stretch lg:gap-16 lg:p-[40px]">
                <div className="flex flex-col justify-center gap-8 lg:max-w-[440px]">
                  <div className="flex flex-col gap-3">
                    <span className="t-label-xs text-text-soft-400 font-mono uppercase tracking-[0.08em]">
                      {team.eyebrow}
                    </span>
                    <h3 className="t-h4 text-text-strong-950 text-balance">{team.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-6">
                    {team.ops.map((op) => (
                      <li key={op.label}>
                        <a
                          href={op.href}
                          className="text-text-sub-600 hover:text-text-strong-950 group/row flex min-h-11 items-center justify-between gap-4 transition-colors lg:min-h-0"
                        >
                          <span className="flex items-center gap-3">
                            <i className={`${op.icon} shrink-0 text-[28px]`} aria-hidden="true" />
                            <span className="t-label-lg text-pretty">{op.label}</span>
                          </span>
                          <span
                            className="t-label-md shrink-0 transition-transform group-hover/row:translate-x-1"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full min-w-0 lg:flex-1">
                  <div className="border-stroke-sub-300 bg-bg-white-0 flex min-h-[280px] w-full items-center justify-center rounded-[12px] border border-dashed">
                    <span className="t-label-xs text-text-soft-400 font-mono uppercase tracking-[0.08em]">
                      Illustration
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
