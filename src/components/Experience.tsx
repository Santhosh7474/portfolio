'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px' }}
        >
          <p className="section-label">Experience</p>
          <h2 className="section-heading">
            Where I've <span style={{ color: 'var(--accent)' }}>shipped</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          {/* Animated vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--border)',
            }}
          >
            <motion.div
              ref={lineRef}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, var(--accent), transparent)',
                transformOrigin: 'top',
              }}
            />
          </div>

          {EXPERIENCE.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              style={{ paddingLeft: '40px', marginBottom: '48px', position: 'relative' }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '8px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 12px var(--accent-glow)',
                  border: '2px solid var(--bg)',
                }}
              />

              {/* Card */}
              <div
                className="glass-card"
                style={{ padding: '28px', cursor: 'pointer' }}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                {/* Date range */}
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                }}>
                  {entry.dateRange}
                  {entry.location && <span style={{ color: 'var(--text-dim)', marginLeft: '12px' }}>· {entry.location}</span>}
                </p>

                {/* Role & Company */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
                  {entry.role}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', fontWeight: 500 }}>
                  @ {entry.company}
                </p>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {entry.bullets.map((b, bi) => (
                    <motion.li
                      key={bi}
                      initial={expandedIdx === i ? { opacity: 0, x: -10 } : {}}
                      animate={expandedIdx === i ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: bi * 0.08 }}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        color: 'var(--text-muted)',
                        fontSize: '0.88rem',
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '6px', flexShrink: 0 }}>▸</span>
                      {b}
                    </motion.li>
                  ))}
                </ul>

                {/* Tech tags */}
                {entry.tech && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    {entry.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.72rem',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'var(--accent-dim)',
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* "More coming" placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{ paddingLeft: '40px', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-5px',
                top: '8px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--surface-2)',
                border: '1px dashed var(--border)',
              }}
            />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              padding: '12px 0',
            }}>
              ✦ More chapters being written…
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
