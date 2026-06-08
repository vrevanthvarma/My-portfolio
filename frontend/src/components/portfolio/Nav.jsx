import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

const links = [
  { id: 'about', label: 'About', testId: NAV.linkAbout },
  { id: 'projects', label: 'Projects', testId: NAV.linkProjects },
  { id: 'experience', label: 'Experience', testId: NAV.linkExperience },
  { id: 'contact', label: 'Contact', testId: NAV.linkContact },
];

export default function Nav() {
  const { portfolio } = usePortfolio();
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
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const initial = portfolio?.profile?.initial || portfolio?.profile?.name?.[0] || 'V';
  const handle = portfolio?.profile?.name
    ? (() => {
        const parts = portfolio.profile.name.trim().split(/\s+/);
        const first = (parts[0] || 'dev').toLowerCase();
        const last = (parts[parts.length - 1] || '').toLowerCase();
        const cleaned = `${first}.${last}`.replace(/[^a-z.]/g, '');
        return cleaned.length > 1 ? cleaned : first;
      })()
    : 'revanth.varma';

  return (
    <header
      data-testid={NAV.container}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNav('top')}
            data-testid={NAV.logo}
            className="flex items-center gap-2 group"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-teal-400/60 text-teal-300 font-mono text-sm">
              {initial}
            </span>
            <span className="font-sans text-sm tracking-tight text-slate-100 font-medium">
              {handle || 'revanth.varma'}
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={l.testId}
                onClick={() => handleNav(l.id)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              data-testid={NAV.letsTalkBtn}
              onClick={() => handleNav('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/60 text-teal-300 text-sm hover:text-teal-200 hover:border-teal-300 transition-colors"
            >
              Let&apos;s talk
            </button>
            <Link
              to="/admin"
              data-testid={NAV.adminLink}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-slate-800/80 pt-3">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`${l.testId}-mobile`}
                onClick={() => handleNav(l.id)}
                className="text-left px-2 py-3 text-sm text-slate-200 hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              data-testid={`${NAV.letsTalkBtn}-mobile`}
              onClick={() => handleNav('contact')}
              className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-teal-400/60 text-teal-300 text-sm"
            >
              Let&apos;s talk
            </button>
            <Link
              to="/admin"
              data-testid={`${NAV.adminLink}-mobile`}
              className="px-2 py-3 text-sm text-slate-400"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
