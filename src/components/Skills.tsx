'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/lib/constants';

type Category = 'all' | 'frontend' | 'backend' | 'mobile' | 'tools';

const TABS: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'tools', label: 'Tools' },
];

function LevelDots({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: i < level ? 'var(--accent)' : 'var(--border)',
            display: 'block',
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filtered = activeTab === 'all' ? SKILLS : SKILLS.filter((s) => s.category === activeTab);

  // Marquee — doubled for seamless loop
  const row1 = [...SKILLS, ...SKILLS];
  const row2 = [...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()];

  return (
    <section id="skills" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '48px' }}
        >
          <p className="section-label">Skills</p>
          <h2 className="section-heading">
            My <span style={{ color: 'var(--accent)' }}>arsenal</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: activeTab === tab.key ? 'var(--accent)' : 'var(--border)',
                background: activeTab === tab.key ? 'var(--accent-dim)' : 'transparent',
                color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid with crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '64px',
            }}
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                data-cursor-hover
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{skill.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {skill.name}
                  </p>
                  <LevelDots level={skill.level} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            Technologies I work with
          </p>

          {/* Row 1 */}
          <div className="marquee-wrapper" style={{ overflow: 'hidden', marginBottom: '12px' }}>
            <div className="marquee-track" style={{ gap: '0' }}>
              {row1.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    marginRight: '8px',
                    borderRadius: '999px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  <span>{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (reverse) */}
          <div className="marquee-wrapper" style={{ overflow: 'hidden' }}>
            <div className="marquee-track-reverse" style={{ gap: '0' }}>
              {row2.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    marginRight: '8px',
                    borderRadius: '999px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  <span>{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
