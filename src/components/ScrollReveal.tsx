import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Fade up reveal — Console.com section entrances
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Scale reveal — for cards and images
export function RevealScale({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word scroll reveal — Console.com signature effect
function Word({ children, progress, index, total }: { children: string; progress: any; index: number; total: number }) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], ['#d2cecc', '#131312']);

  return (
    <motion.span style={{ color }} className="word-motion">
      {children}{' '}
    </motion.span>
  );
}

export function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.1'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} index={i} total={words.length}>
          {word}
        </Word>
      ))}
    </p>
  );
}

// Rotating text — Console.com hero cycling
export function RotatingText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <span className="hero-rotator">
      {phrases.map((phrase, i) => (
        <motion.span
          key={phrase}
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : i < index ? -30 : 30,
          }}
          transition={{
            duration: 0.5,
            ease: [0.44, 0, 0.56, 1],
          }}
          style={{ position: 'absolute', left: 0, top: 0, display: 'block', whiteSpace: 'nowrap' }}
        >
          {phrase}
        </motion.span>
      ))}
    </span>
  );
}
