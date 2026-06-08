import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileDown, ArrowRight, Mail } from 'lucide-react';
import { HERO } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';

function CodeBlock() {
  const lines = [
    { n: 1, content: <><span className="text-fuchsia-400">class</span> <span className="text-cyan-300">Engineer</span>:</> },
    { n: 2, content: <>{'    '}<span className="text-emerald-400">name</span>{'     '}= <span className="text-amber-300">{'"Vejandla Revanth Varma"'}</span></> },
    { n: 3, content: <>{'    '}<span className="text-emerald-400">title</span>{'    '}= <span className="text-amber-300">{'"AI & ML Engineer · Developer Relations"'}</span></> },
    { n: 4, content: <>{'    '}<span className="text-emerald-400">college</span>{'  '}= <span className="text-amber-300">{'"Keshav Memorial Engineering College"'}</span></> },
    { n: 5, content: <>{'    '}<span className="text-emerald-400">mission</span>{'  '}= <span className="text-amber-300">{'"Building Sovereign AI at population scale"'}</span></> },
    { n: 6, content: <>&nbsp;</> },
    { n: 7, content: <>{'    '}<span className="text-fuchsia-400">async def</span> <span className="text-cyan-300">build</span>(<span className="text-zinc-300">self</span>, <span className="text-zinc-300">idea</span>):</> },
    { n: 8, content: <>{'        '}<span className="text-zinc-300">pipeline</span> = <span className="text-fuchsia-400">await</span> <span className="text-zinc-300">self</span>.<span className="text-cyan-300">design</span>(<span className="text-zinc-300">idea</span>)</> },
    { n: 9, content: <>{'        '}<span className="text-fuchsia-400">return</span> <span className="text-zinc-300">pipeline</span>.<span className="text-cyan-300">ship</span>(<span className="text-emerald-400">docs</span>=<span className="text-orange-400">True</span>)<span className="caret align-middle">&nbsp;</span></> },
  ];
  return (
    <div className="rounded-lg border border-zinc-800 bg-black/70 shadow-[0_0_60px_-30px_rgba(16,185,129,0.4)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-xs text-zinc-500">~/revanth/profile.py</span>
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">py</span>
      </div>
      <pre className="font-mono text-[13px] sm:text-sm leading-7 p-4 sm:p-6 overflow-x-auto">
        {lines.map((l) => (
          <div key={l.n} className="grid grid-cols-[2.25rem_1fr] gap-3">
            <span className="text-right text-zinc-700 select-none">{l.n}</span>
            <span className="text-zinc-200">{l.content}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export default function Hero() {
  const { profile } = PORTFOLIO_DATA;
  return (
    <section
      id="top"
      data-testid={HERO.section}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 border-b border-zinc-900"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              available_for &gt; ai/ml · devrel
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-mono text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-white leading-[0.95]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 text-lg sm:text-xl text-zinc-300 font-medium"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-2 text-sm sm:text-base text-zinc-500"
            >
              {profile.college}
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-6 max-w-xl border-l-2 border-emerald-500/60 pl-4 italic text-zinc-300"
            >
              “{profile.tagline}”
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                data-testid={HERO.exploreBtn}
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-500 text-black font-mono text-xs uppercase tracking-[0.18em] hover:bg-emerald-400 transition-colors"
              >
                Explore Projects
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                data-testid={HERO.linkedinBtn}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-200 font-mono text-xs uppercase tracking-[0.18em] hover:border-zinc-600 hover:text-white transition-colors"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                data-testid={HERO.githubBtn}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-200 font-mono text-xs uppercase tracking-[0.18em] hover:border-zinc-600 hover:text-white transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                data-testid={HERO.resumeBtn}
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-200 font-mono text-xs uppercase tracking-[0.18em] hover:border-zinc-600 hover:text-white transition-colors"
              >
                <FileDown size={14} /> Resume PDF
              </a>
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              href={`mailto:${profile.email}`}
              data-testid={HERO.emailLink}
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <Mail size={14} /> {profile.email}
            </motion.a>

            <div className="mt-10 flex items-center gap-6 sm:gap-10 font-mono text-sm">
              {PORTFOLIO_DATA.stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl text-white tracking-tighter">{s.value}</span>
                  <span className="text-zinc-500 lowercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <CodeBlock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
