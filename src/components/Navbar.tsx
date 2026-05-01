'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Slide indicator to active link
  useEffect(() => {
    if (activeIdx < 0) return;
    const link = linksRef.current[activeIdx];
    const bar = indicatorRef.current;
    if (!link || !bar) return;
    const parent = link.parentElement;
    if (!parent) return;
    bar.style.left = `${link.offsetLeft}px`;
    bar.style.width = `${link.offsetWidth}px`;
  }, [activeIdx]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(10,10,10,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            S<span style={{ color: 'var(--text-muted)' }}>anthosh</span>
            <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>.</span>
          </a>

          {/* Desktop Nav */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative' }}
            className="hidden-mobile"
          >
            <span
              ref={indicatorRef}
              style={{
                position: 'absolute',
                bottom: '-4px',
                height: '1px',
                background: 'var(--accent)',
                transition: 'left 0.3s ease, width 0.3s ease',
                borderRadius: '1px',
              }}
            />
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => { linksRef.current[i] = el; }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: activeIdx === i ? 'var(--accent)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                  paddingBottom: '4px',
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Hire Me CTA */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = '#0a0a0a';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Hire Me
            </a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: '8px',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav-overlay"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${SITE_CONFIG.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 }}
              className="btn-primary"
              style={{ marginTop: '16px' }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
