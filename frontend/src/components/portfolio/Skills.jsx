import React from 'react';
import { motion } from 'framer-motion';
import { SectionMarker } from './SectionMarker';
import { SKILLS } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid={SKILLS.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="01"
          label="toolkit"
          title="Skills & Stack"
          kicker="Grouped by what they do — Languages, Frameworks, Tools, and the Developer Relations craft."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {PORTFOLIO_DATA.skills.map((group, idx) => (
            <motion.div
              key={group.key}
              data-testid={SKILLS.group(group.key)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
              className="group relative rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-lg text-white tracking-tight">{group.group}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  // {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    data-testid={SKILLS.chip(slug(item))}
                    className="px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-950/70 font-mono text-xs text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
