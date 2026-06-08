import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders an IDE-style numbered section header, e.g. "// 01 — toolkit"
 */
export function SectionMarker({ number, label, title, kicker }) {
  return (
    <div className="mb-10 md:mb-16">
      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-zinc-500">
        <span>// {number} —</span> <span className="text-emerald-400">{label}</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-3 font-mono text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-white"
      >
        {title}
      </motion.h2>
      {kicker && (
        <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">{kicker}</p>
      )}
    </div>
  );
}

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};
