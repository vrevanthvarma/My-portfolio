import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FOOTER } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Footer() {
  const { portfolio } = usePortfolio();
  const profile = portfolio?.profile;
  const year = new Date().getFullYear();
  return (
    <footer data-testid={FOOTER.container} className="relative py-10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-sans text-sm text-white">
            <span className="text-teal-300">~/</span>revanth.varma
          </div>
          <p className="mt-1 font-mono text-xs text-slate-500">
            © {year} {profile?.name || 'Revanth Varma'}. Built with FastAPI · React · MongoDB.
          </p>
        </div>
        {profile && (
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              data-testid="footer-email-btn"
              className="p-2 rounded-md border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-slate-700 transition-colors"
            >
              <Mail size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-testid="footer-linkedin-btn"
              className="p-2 rounded-md border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-slate-700 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-testid="footer-github-btn"
              className="p-2 rounded-md border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-slate-700 transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
