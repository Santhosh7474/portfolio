'use client';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];

export default function SectionIndicator() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!visible) return null;

  const labels = ['Home', ...NAV_LINKS.map((l) => l.label)];

  return (
    <nav className="section-indicator" aria-label="Section navigation">
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          title={labels[i]}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`section-indicator-dot ${active === i ? 'active' : ''}`}
        />
      ))}
    </nav>
  );
}
