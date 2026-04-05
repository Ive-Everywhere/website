import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    label: 'Ask',
    number: '01',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#343636', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>Y</div>
          <span style={{ fontSize: 13, color: '#888', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>You</span>
        </div>
        <div style={{ background: '#f4f3ec', borderRadius: 10, padding: '14px 18px', fontSize: 15, lineHeight: 1.55, color: 'var(--dark-s, #222)', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>
          Build me a pipeline dashboard that pulls from Salesforce and updates every morning
        </div>
      </div>
    ),
  },
  {
    label: 'Building',
    number: '02',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#343636', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark-s, #222)', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>Eluu Colleague</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#555', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>
          <div>Connecting Salesforce...</div>
          <div>Building dashboard...</div>
          <div>Setting schedule...</div>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#eee', overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #343636, #00c9a7)' }} />
        </div>
      </div>
    ),
  },
  {
    label: 'Deliver',
    number: '03',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark-s, #222)', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>Pipeline Dashboard — Live</div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, lineHeight: 1.55, color: '#444', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>
          <li><strong>142 deals</strong> in pipeline (↑ 12% vs last week)</li>
          <li><span style={{ color: '#c0392b', fontWeight: 600 }}>3 at risk</span> — billing issues affecting enterprise</li>
          <li>Next refresh: Tomorrow 8:00 AM</li>
        </ul>
      </div>
    ),
  },
];

export default function AnimationFold() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '80vh',
        padding: '120px 24px',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,201,167,0.06) 0%, rgba(244,243,236,0.8) 40%, #ffffff 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <motion.p
        style={{
          fontSize: 14,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#343636',
          fontFamily: "var(--ff, 'Inter', sans-serif)",
          fontWeight: 600,
          marginBottom: 4,
          opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
        }}
      >
        How it works
      </motion.p>
      <motion.h2
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontFamily: "var(--fd, 'Season Mix', serif)",
          color: 'var(--dark-s, #222)',
          textAlign: 'center',
          marginBottom: 48,
          fontWeight: 400,
          opacity: useTransform(scrollYProgress, [0, 0.18], [0, 1]),
        }}
      >
        From question to answer in seconds
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520, width: '100%' }}>
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = 0.05 + index * 0.12;
  const end = start + 0.1;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);
  const y = useTransform(progress, [start, end], [30, 0]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        background: '#fff',
        borderRadius: 'var(--radius, 14px)',
        boxShadow: 'var(--shadow-card, 0 1px 4px -1px rgba(30,31,37,0.38))',
        padding: '28px 28px 24px',
        willChange: 'transform, opacity',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#343636', fontFamily: "var(--ff, 'Inter', sans-serif)" }}>{step.number}</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark-s, #222)', fontFamily: "var(--fd, 'Season Mix', serif)" }}>{step.label}</span>
      </div>
      {step.content}
    </motion.div>
  );
}
