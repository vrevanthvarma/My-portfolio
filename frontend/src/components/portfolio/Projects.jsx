import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { SectionMarker } from './SectionMarker';
import { PROJECTS } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

const FILTERS = [
  { key: 'all', label: 'All', testId: PROJECTS.filterAll },
  { key: 'aiml', label: 'AI / ML', testId: PROJECTS.filterAiml },
  { key: 'llm', label: 'LLM · DevRel', testId: PROJECTS.filterLlm },
  { key: 'other', label: 'Other', testId: PROJECTS.filterOther },
];

export default function Projects() {
  const { portfolio } = usePortfolio();
  const [active, setActive] = useState('all');

  const all = portfolio?.projects || [];
  const visibleFilters = useMemo(() => {
    const keys = new Set(all.map((p) => p.categoryKey));
    return FILTERS.filter((f) => f.key === 'all' || keys.has(f.key));
  }, [all]);

  const filtered = useMemo(() => {
    if (active === 'all') return all;
    return all.filter((p) => p.categoryKey === active);
  }, [active, all]);

  if (!portfolio) return null;

  return (
    <section
      id="projects"
      data-testid={PROJECTS.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-slate-900/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="02"
          label="selected work"
          title="Projects"
          kicker="Production-minded builds — every project shipped with metrics, structure, and docs."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {visibleFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              data-testid={f.testId}
              onClick={() => setActive(f.key)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-[0.16em] transition-colors border ${
                active === f.key
                  ? 'bg-teal-400 text-slate-950 border-teal-400'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, idx) => (
              <motion.article
                key={p.id}
                layout
                data-testid={PROJECTS.card(p.id)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group relative flex flex-col rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden hover:border-teal-400/40 transition-colors"
              >
                <div className="flex items-center justify-between px-5 pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-300">
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                    {p.id}
                  </span>
                </div>

                <div className="px-5 pt-3">
                  <h3 className="font-sans text-xl text-white tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  {p.subtitle && <p className="mt-2 text-sm text-slate-400">{p.subtitle}</p>}
                </div>

                {p.description && (
                  <div className="px-5 mt-4 text-sm text-slate-400 leading-relaxed">
                    {p.description}
                  </div>
                )}

                {(p.metrics || []).length > 0 && (
                  <div className={`grid mt-6 border-t border-slate-800/80 ${
                    p.metrics.length === 1 ? 'grid-cols-1' : p.metrics.length === 2 ? 'grid-cols-2 divide-x divide-slate-800/80' : 'grid-cols-3 divide-x divide-slate-800/80'
                  }`}>
                    {p.metrics.map((m, i) => (
                      <div key={`${m.label}-${i}`} className="px-3 py-4 text-center">
                        <div className="font-mono text-sm text-teal-300">{m.value}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(p.tech || []).length > 0 && (
                  <div className="px-5 py-4 border-t border-slate-800/80">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md border border-slate-800 bg-slate-950 font-mono text-[11px] text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex border-t border-slate-800/80">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={PROJECTS.cardLink(p.id)}
                      className="flex-1 flex items-center justify-between px-5 py-4 bg-slate-950/60 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 hover:text-teal-300 transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Github size={14} /> View Code
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )}
                  {p.demo_url && (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`${PROJECTS.cardLink(p.id)}-demo`}
                      className="flex items-center gap-2 px-5 py-4 border-l border-slate-800/80 bg-slate-950/60 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 hover:text-teal-300 transition-colors"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 font-mono mt-6">// no projects in this category yet</p>
        )}
      </div>
    </section>
  );
}
