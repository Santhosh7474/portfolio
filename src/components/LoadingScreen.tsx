'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  // Use a ref so the callback is always fresh without being a dep
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {

    let current = 0;
    let animFrame: number;

    const tick = () => {
      // Two-phase easing for a ~4-5 second total duration:
      // Phase 1 (0–90%): avg ~0.8 per tick → ~3.4 s
      // Phase 2 (90–100%): avg ~0.18 per tick → dramatic slowdown ~1.1 s
      const increment =
        current < 90
          ? Math.random() * 1.0 + 0.3   // 0.3–1.3, avg ~0.8
          : Math.random() * 0.25 + 0.08; // 0.08–0.33, avg ~0.18

      current = Math.min(current + increment, 100);
      setCount(Math.floor(current));

      if (current < 100) {
        animFrame = window.setTimeout(tick, 30);
      } else {
        // Done — wait briefly then exit
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(() => {
            onCompleteRef.current();
          }, 650); // matches exit animation
        }, 300);
      }
    };

    // Small initial delay so first render is visible
    const startTimer = window.setTimeout(tick, 200);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(animFrame);
    };
  }, []); // intentionally empty — runs once on mount

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={count >= 100 ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
      }}
    >
      {/* Name reveal */}
      <div style={{ textAlign: 'center' }}>
        {'Santhosh'.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: 'inline-block',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: i === 0 ? 'var(--accent)' : 'var(--text)',
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Progress */}
      <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Loading
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>
            {count}%
          </span>
        </div>
        <div style={{ height: '1px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden' }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent), #a78bfa)',
              borderRadius: '1px',
            }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          position: 'absolute',
          bottom: '40px',
        }}
      >
        Crafting your experience…
      </motion.p>
    </motion.div>
  );
}
