import React from 'react';
import { motion } from 'framer-motion';
import { SectionMarker } from './SectionMarker';
import { SKILLS } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Skills() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;
  const groups = portfolio.skills || [];

  return (
    <section
      id="skills"
      data-testid={SKILLS.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-slate-900/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="01"
          label="toolkit"
          title="Skills & Stack"
          kicker="Grouped by what they do — Languages, Frameworks, Tools, and the Developer Relations craft."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {groups.map((group, idx) => (
            <motion.div
              key={group.key || group.group}
              data-testid={SKILLS.group(group.key || slug(group.group))}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group relative rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-teal-400/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans text-xl text-white tracking-tight">{group.group}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  // {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(group.items || []).map((item) => (
                  <span
                    key={item}
                    data-testid={SKILLS.chip(slug(item))}
                    className="px-3 py-1.5 rounded-md border border-slate-800 bg-slate-950/70 font-mono text-xs text-slate-200 hover:border-teal-400/40 hover:text-teal-300 transition-colors"
                  >
                    {item}
                  </span>
                ))}
                {(group.items || []).length === 0 && (
                  <span className="text-xs text-slate-500 font-mono">// no items yet</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
