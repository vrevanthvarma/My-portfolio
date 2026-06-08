import React from 'react';
import { motion } from 'framer-motion';
import { SectionMarker } from './SectionMarker';
import { EXPERIENCE } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid={EXPERIENCE.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="03"
          label="timeline"
          title="Experience"
          kicker="Academic milestones, internships, and major project lifecycles."
        />

        <ol className="relative ml-3 border-l border-zinc-800">
          {PORTFOLIO_DATA.experience.map((item, idx) => (
            <motion.li
              key={`${item.title}-${idx}`}
              data-testid={EXPERIENCE.item(idx + 1)}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-zinc-950" />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-zinc-500">{item.status}</span>
              </div>
              <h3 className="mt-2 font-mono text-lg sm:text-xl text-white tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{item.org}</p>
              <p className="mt-3 text-sm text-zinc-400 max-w-2xl leading-relaxed">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
