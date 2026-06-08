import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, ArrowUpRight, GraduationCap } from 'lucide-react';
import { HERO } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

function CodeBlock({ profile }) {
  const truncate = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1)}…` : s);
  const lines = [
    { n: 1, content: <><span className="text-fuchsia-400">class</span> <span className="text-cyan-300">Engineer</span>:</> },
    { n: 2, content: <>{'    '}<span className="text-teal-300">name</span>{'     '}= <span className="text-amber-300">{`"${profile.name}"`}</span></> },
    { n: 3, content: <>{'    '}<span className="text-teal-300">title</span>{'    '}= <span className="text-amber-300">{`"${profile.title}"`}</span></> },
    { n: 4, content: <>{'    '}<span className="text-teal-300">college</span>{'  '}= <span className="text-amber-300">{`"${profile.college}"`}</span></> },
    { n: 5, content: <>{'    '}<span className="text-teal-300">mission</span>{'  '}= <span className="text-amber-300">{`"${truncate(profile.tagline, 42)}"`}</span></> },
    { n: 6, content: <>&nbsp;</> },
    { n: 7, content: <>{'    '}<span className="text-fuchsia-400">async def</span> <span className="text-cyan-300">build</span>(<span className="text-slate-300">self</span>, <span className="text-slate-300">idea</span>):</> },
    { n: 8, content: <>{'        '}<span className="text-slate-300">pipeline</span> = <span className="text-fuchsia-400">await</span> <span className="text-slate-300">self</span>.<span className="text-cyan-300">design</span>(<span className="text-slate-300">idea</span>)</> },
    { n: 9, content: <>{'        '}<span className="text-fuchsia-400">return</span> <span className="text-slate-300">pipeline</span>.<span className="text-cyan-300">ship</span>(<span className="text-teal-300">docs</span>=<span className="text-orange-300">True</span>)<span className="caret align-middle">&nbsp;</span></> },
  ];
  return (
    <div className="rounded-2xl border border-teal-400/30 bg-slate-950/80 overflow-hidden glow-teal">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-xs text-slate-500">~/revanth/profile.py</span>
        <span className="w-10" />
      </div>
      <pre className="font-mono text-[12.5px] sm:text-sm leading-7 p-4 sm:p-6 overflow-x-auto">
        {lines.map((l) => (
          <div key={l.n} className="grid grid-cols-[2rem_1fr] gap-3">
            <span className="text-right text-slate-700 select-none">{l.n}</span>
            <span className="text-slate-200">{l.content}</span>
          </div>
        ))}
      </pre>
      <div className="px-5 py-3 border-t border-slate-800/80 flex items-center gap-5 font-mono text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> {/* */}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;
  const { profile } = portfolio;
  const projectsCount = portfolio.projects?.length || 0;
  const skillsCount = (portfolio.skills || []).reduce((acc, g) => acc + (g.items?.length || 0), 0);
  const milestones = portfolio.experience?.length || 0;

  return (
    <section
      id="top"
      data-testid={HERO.section}
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 border-b border-slate-900/80"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7" id="about">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-400/40 bg-teal-400/5 font-mono text-xs text-teal-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              {profile.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-sans font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.02]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 text-lg sm:text-xl text-slate-300"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400"
            >
              <GraduationCap size={14} className="text-teal-300" />
              {profile.college}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-6 italic text-teal-300/90"
            >
              “{profile.tagline}”
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400"
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
                data-testid={HERO.linkedinBtn}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal-400 text-slate-950 font-medium hover:bg-teal-300 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                data-testid={HERO.githubBtn}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-slate-500 transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                data-testid={HERO.resumeBtn}
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-slate-500 transition-colors"
              >
                <FileText size={16} /> Resume PDF
              </a>
              <button
                type="button"
                data-testid={HERO.exploreBtn}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-1.5 px-3 py-2.5 text-slate-300 hover:text-teal-300 transition-colors"
              >
                Explore Projects
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              href={`mailto:${profile.email}`}
              data-testid={HERO.emailLink}
              className="mt-8 inline-block font-mono text-sm text-slate-500 hover:text-teal-300 transition-colors"
            >
              {profile.email}
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <CodeBlock profile={profile} />
            <div className="mt-4 flex items-center gap-6 font-mono text-xs text-slate-400 pl-1">
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> {projectsCount} projects</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {skillsCount} skills</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {milestones} milestones</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
