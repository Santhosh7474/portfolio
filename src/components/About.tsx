'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS, CURRENTLY_LEARNING, SITE_CONFIG } from '@/lib/constants';
import { fetchUserStats } from '@/lib/github';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [stats, setStats] = useState({ publicRepos: 0, followers: 0, totalStars: 0 });
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });

  useEffect(() => {
    fetchUserStats(SITE_CONFIG.github.replace('https://github.com/', '')).then(setStats);
  }, []);

  // Cycle through currently learning items
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx((i) => (i + 1) % CURRENTLY_LEARNING.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const paragraphs = [
    "I'm Santhosh — a developer who believes that great software lives at the intersection of clean code and beautiful design. I approach every project as a craft, not just a task.",
    "My journey started with Python scripts and grew into full-stack web and Flutter mobile development. I love the challenge of making complex systems feel simple and delightful to use.",
    "When I'm not coding, I'm exploring design systems, contributing to open source, or reverse-engineering the UX patterns that make great products so addictive.",
  ];

  const frontendSkills = SKILLS.filter((s) => s.category === 'frontend').slice(0, 6);
  const mobileSkills = SKILLS.filter((s) => s.category === 'mobile');
  const backendSkills = SKILLS.filter((s) => s.category === 'backend').slice(0, 4);

  return (
    <section id="about" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Section label */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About</p>
          <h2 className="section-heading" style={{ marginBottom: '64px', maxWidth: '600px' }}>
            A developer who <span style={{ color: 'var(--accent)' }}>cares deeply</span> about the craft
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left — Text */}
          <div>
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                {p}
              </motion.p>
            ))}

            {/* Currently learning ticker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '32px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-card)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚡</span>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                  Currently exploring
                </p>
                <motion.p
                  key={tickerIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 500 }}
                >
                  {CURRENTLY_LEARNING[tickerIdx]}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Right — Visual & Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Repos', value: stats.publicRepos || 12 },
                { label: 'Stars', value: stats.totalStars || 8 },
                { label: 'Followers', value: stats.followers || 5 },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 'var(--radius-card)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    <Counter target={stat.value} suffix="+" />
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Skill pills */}
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                Tech I reach for
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[...mobileSkills, ...frontendSkills, ...backendSkills].map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 300 }}
                    className="skill-pill"
                  >
                    {skill.icon} {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Highlight card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card"
              style={{ padding: '24px' }}
            >
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                🏆 Latest Achievement
              </p>
              <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '8px', fontSize: '0.95rem' }}>
                Flutter Developer @ Herdsman Development
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Built 3 integrated dashboards for the Punyadaan donation platform, shipping features from subscription models to distance-based matching.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
