'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, Link2, Mail, Copy, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => { setCopied(false); }, 2000);
      setTimeout(() => { setShowToast(false); }, 3000);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const socials = [
    { icon: GitBranch, href: SITE_CONFIG.github, label: 'GitHub', color: '#f5f5f5' },
    { icon: Link2, href: SITE_CONFIG.linkedin, label: 'LinkedIn', color: '#0a66c2' },
    { icon: Mail, href: `mailto:${SITE_CONFIG.email}`, label: 'Email', color: '#6ee7b7' },
  ];

  return (
    <>
      <section id="contact" style={{ background: 'var(--bg)' }}>
        <div className="container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}
          >
            <p className="section-label" style={{ justifyContent: 'center' }}>Contact</p>

            <h2
              className="section-heading"
              style={{ marginBottom: '24px' }}
            >
              Let's build something{' '}
              <span style={{ color: 'var(--accent)' }}>great together</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '48px' }}>
              I'm currently open to new opportunities — freelance, full-time, or just a good conversation about tech and design.
            </p>

            {/* Big clickable email */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyEmail}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-card)',
                padding: '24px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                width: '100%',
                cursor: 'pointer',
                marginBottom: '40px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(110,231,183,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Click to copy
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                  {SITE_CONFIG.email}
                </p>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--accent)',
              }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </div>
            </motion.button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>or find me on</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    borderRadius: '999px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = color;
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <Icon size={18} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        ✓ Email copied to clipboard
      </div>
    </>
  );
}
