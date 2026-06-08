import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { SectionMarker } from './SectionMarker';
import { PROJECTS } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';

const FILTERS = [
  { key: 'all', label: 'All', testId: PROJECTS.filterAll },
  { key: 'aiml', label: 'AI / ML', testId: PROJECTS.filterAiml },
  { key: 'llm', label: 'LLM · DevRel', testId: PROJECTS.filterLlm },
];

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(() => {
    if (active === 'all') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.categoryKey === active);
  }, [active]);

  return (
    <section
      id="projects"
      data-testid={PROJECTS.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="02"
          label="selected work"
          title="Projects"
          kicker="Production-minded builds — every project shipped with metrics, structure, and docs."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              data-testid={f.testId}
              onClick={() => setActive(f.key)}
              className={`px-4 py-2 rounded-md font-mono text-xs uppercase tracking-[0.18em] transition-colors border ${
                active === f.key
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
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
                className="group relative flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center justify-between px-5 pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                    {p.category}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                    {p.id}
                  </span>
                </div>

                <div className="px-5 pt-3">
                  <h3 className="font-mono text-xl text-white tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{p.subtitle}</p>
                </div>

                <div className="px-5 mt-4 text-sm text-zinc-400 leading-relaxed">
                  {p.description}
                </div>

                <div className="grid grid-cols-3 mt-6 border-t border-zinc-800 divide-x divide-zinc-800">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="px-3 py-4 text-center">
                      <div className="font-mono text-sm text-emerald-400">{m.value}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-zinc-800">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md border border-zinc-800 bg-zinc-950 font-mono text-[11px] text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={PROJECTS.cardLink(p.id)}
                  className="mt-auto flex items-center justify-between px-5 py-4 border-t border-zinc-800 bg-zinc-950/60 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github size={14} /> View Code
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
