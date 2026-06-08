import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Briefcase } from 'lucide-react';
import { SectionMarker } from './SectionMarker';
import { EXPERIENCE } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

const ICONS = {
  education: GraduationCap,
  work: Briefcase,
  project: Sparkles,
};

export default function Experience() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;
  const items = portfolio.experience || [];

  return (
    <section
      id="experience"
      data-testid={EXPERIENCE.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-slate-900/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="03"
          label="timeline"
          title="Experience"
          kicker="Academic milestones, internships, and major project lifecycles."
        />

        <ol className="relative ml-3 border-l border-slate-800/80">
          {items.map((item, idx) => {
            const Icon = ICONS[item.kind] || GraduationCap;
            return (
              <motion.li
                key={item.id || `${item.title}-${idx}`}
                data-testid={EXPERIENCE.item(idx + 1)}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative pl-10 pb-12 last:pb-0"
              >
                <span className="absolute -left-[14px] top-0 w-7 h-7 rounded-full bg-slate-950 border border-teal-400/60 ring-4 ring-slate-950 flex items-center justify-center">
                  <Icon size={13} className="text-teal-300" />
                </span>
                {item.status && (
                  <div className="font-mono text-xs text-slate-500">{item.status}</div>
                )}
                <h3 className="mt-1.5 font-sans text-xl sm:text-2xl text-white tracking-tight">
                  {item.title}
                </h3>
                {item.org && <p className="mt-1 text-sm text-slate-400">{item.org}</p>}
                {item.description && (
                  <p className="mt-3 text-sm text-slate-400 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ol>

        {items.length === 0 && (
          <p className="text-sm text-slate-500 font-mono">// no experience entries yet</p>
        )}
      </div>
    </section>
  );
}
