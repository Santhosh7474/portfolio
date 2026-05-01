'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
const SEQ_STR = SEQUENCE.join(',');

export default function KonamiEasterEgg() {
  // Use a ref for key buffer — avoids stale-closure issues inside event handlers
  const keysRef = useRef<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activated, setActivated] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Append key and keep only the last N chars
      keysRef.current = [...keysRef.current, e.key].slice(-SEQUENCE.length);

      if (keysRef.current.join(',') === SEQ_STR) {
        // Reset buffer so it can be triggered again
        keysRef.current = [];

        // Toggle accent
        setActivated((prev) => !prev);

        // Show toast
        setShowMsg(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowMsg(false), 3000);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // empty deps — no stale closures since we read from refs

  // Apply CSS variable changes whenever activated flips
  useEffect(() => {
    if (activated) {
      document.documentElement.style.setProperty('--accent', '#f472b6');
      document.documentElement.style.setProperty('--accent-dim', 'rgba(244,114,182,0.15)');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(244,114,182,0.4)');
    } else {
      document.documentElement.style.setProperty('--accent', '#6ee7b7');
      document.documentElement.style.setProperty('--accent-dim', 'rgba(110,231,183,0.15)');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(110,231,183,0.4)');
    }
  }, [activated]);

  return (
    <AnimatePresence>
      {showMsg && (
        <motion.div
          key={String(activated)}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--surface-2)',
            border: '1px solid var(--accent)',
            borderRadius: '12px',
            padding: '16px 28px',
            zIndex: 9999,
            textAlign: 'center',
            minWidth: '280px',
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: '1.4rem', marginBottom: '6px' }}>
            {activated ? '🎮 Easter egg activated!' : '🔄 Back to normal!'}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            {activated
              ? '↑↑↓↓←→←→BA — pink mode engaged ✨'
              : 'Accent color restored to mint 🌿'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
