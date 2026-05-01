'use client';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown, GitBranch, Link2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const ROLES = SITE_CONFIG.roles;

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIdx];
    if (typing) {
      if (charIdx < currentRole.length) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [charIdx, typing, roleIdx]);

  const scrollToWork = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const words = SITE_CONFIG.tagline.split(' ');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Background */}
      <HeroCanvas />

      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(10,10,10,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              animation: 'pulse 2s ease infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Main headline — word by word */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                color: word === 'alive' ? 'var(--accent)' : 'var(--text)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: 'var(--text-muted)',
            marginBottom: '48px',
            height: '2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--text-dim)' }}>&gt;</span>
          <span>{displayed}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--accent)',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button onClick={scrollToWork} className="btn-primary">
            View My Work
            <ArrowDown size={16} />
          </button>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <GitBranch size={16} />
            GitHub
          </a>
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Link2 size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
        }}
        onClick={scrollToWork}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} color="var(--text-dim)" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
