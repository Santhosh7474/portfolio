'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchRepos } from '@/lib/github';
import { LANGUAGE_COLORS, GITHUB_USERNAME } from '@/lib/constants';
import type { GitHubRepo } from '@/types';

function SkeletonCard() {
  return (
    <div className="skeleton" style={{ height: '220px', borderRadius: 'var(--radius-card)' }} />
  );
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#6ee7b7') : '#6ee7b7';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.2s ease',
        willChange: 'transform',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Language color top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: langColor,
            borderRadius: '12px 12px 0 0',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text)',
            }}
          >
            {repo.name}
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
          {repo.description || 'No description yet — check the code!'}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', marginBottom: '16px' }}
            >
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ marginBottom: '8px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Last pushed
                </p>
                <p>{new Date(repo.pushed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {repo.topics && repo.topics.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {repo.topics.map((t) => (
                      <span key={t} style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'var(--accent-dim)',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Language */}
            {repo.language && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: langColor, display: 'block' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {repo.language}
                </span>
              </div>
            )}
            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
              <Star size={12} />
              {repo.stargazers_count}
            </div>
            {/* Forks */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
              <GitFork size={12} />
              {repo.forks_count}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                style={{ color: 'var(--accent)', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <ExternalLink size={15} />
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title="View Code"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              <GitBranch size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRepos(GITHUB_USERNAME)
      .then((r) => { setRepos(r); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="projects" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '64px' }}
        >
          <p className="section-label">Projects</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <h2 className="section-heading">
              Things I've <span style={{ color: 'var(--accent)' }}>built</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              ↓ Click any card to reveal details
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔌</p>
            <p>Couldn't reach GitHub API. Check back soon.</p>
          </div>
        ) : repos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <p>No public repositories found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ display: 'inline-flex' }}
          >
            <GitBranch size={16} />
            View all repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
