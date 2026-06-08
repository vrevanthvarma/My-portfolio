import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders an IDE-style numbered section header, e.g. "// 01 — toolkit"
 */
export function SectionMarker({ number, label, title, kicker }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="font-mono text-xs sm:text-sm text-teal-300/90">
        // {number} — {label}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-3 font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {kicker && (
        <p className="mt-4 text-slate-400 max-w-2xl text-base leading-relaxed">{kicker}</p>
      )}
    </div>
  );
}
