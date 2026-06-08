import React, { useEffect, useState } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { NAV } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';

const links = [
  { id: 'skills', label: 'Skills', testId: NAV.linkSkills },
  { id: 'projects', label: 'Projects', testId: NAV.linkProjects },
  { id: 'experience', label: 'Experience', testId: NAV.linkExperience },
  { id: 'contact', label: 'Contact', testId: NAV.linkContact },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      data-testid={NAV.container}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="h-16 flex items-center justify-between">
          <a
            href="#top"
            data-testid={NAV.logo}
            onClick={(e) => {
              e.preventDefault();
              handleNav('top');
            }}
            className="font-mono text-sm tracking-tight text-white flex items-center gap-2 group"
          >
            <span className="text-emerald-400">~/</span>
            <span className="text-zinc-200">revanth</span>
            <span className="text-zinc-600 group-hover:text-emerald-400 transition-colors">.dev</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={l.testId}
                onClick={() => handleNav(l.id)}
                className="px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              data-testid={NAV.resumeBtn}
              href={PORTFOLIO_DATA.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-black font-mono text-xs uppercase tracking-[0.15em] hover:bg-emerald-400 transition-colors"
            >
              <FileDown size={14} /> Resume
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-zinc-900 pt-3">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`${l.testId}-mobile`}
                onClick={() => handleNav(l.id)}
                className="text-left px-2 py-3 font-mono text-sm text-zinc-300 hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <a
              href={PORTFOLIO_DATA.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`${NAV.resumeBtn}-mobile`}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-emerald-500 text-black font-mono text-xs uppercase tracking-[0.15em]"
            >
              <FileDown size={14} /> Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
