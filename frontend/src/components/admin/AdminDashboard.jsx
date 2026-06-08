import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Eye, RotateCcw, Save, LogOut, Loader2,
  User as UserIcon, Layers, Folder, History, KeyRound,
} from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { api, formatApiError } from '@/lib/api';
import { ADMIN } from '@/constants/testIds';

import ProfileTab from './tabs/ProfileTab';
import SkillsTab from './tabs/SkillsTab';
import ProjectsTab from './tabs/ProjectsTab';
import ExperienceTab from './tabs/ExperienceTab';
import SecurityTab from './tabs/SecurityTab';
import LiveSnapshot from './LiveSnapshot';

const TABS = [
  { key: 'profile', label: 'Profile', icon: UserIcon, testId: ADMIN.tabProfile },
  { key: 'skills', label: 'Skills', icon: Layers, testId: ADMIN.tabSkills },
  { key: 'projects', label: 'Projects', icon: Folder, testId: ADMIN.tabProjects },
  { key: 'experience', label: 'Experience', icon: History, testId: ADMIN.tabExperience },
  { key: 'security', label: 'Security', icon: KeyRound, testId: ADMIN.tabSecurity },
];

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { portfolio, refresh } = usePortfolio();
  const [tab, setTab] = useState('profile');
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  // Initialise the editable draft once the portfolio data is loaded.
  // Pattern recommended by React: conditional setState during render
  // (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  if (portfolio && draft === null) {
    setDraft(deepClone(portfolio));
  }

  const dirty = useMemo(() => {
    if (!portfolio || !draft) return false;
    return JSON.stringify(portfolio) !== JSON.stringify(draft);
  }, [portfolio, draft]);

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const { data } = await api.put('/admin/portfolio', draft);
      setDraft(deepClone(data));
      await refresh();
      toast.success('Portfolio updated. Changes are live.');
    } catch (e) {
      const detail = formatApiError(e?.response?.data?.detail);
      toast.error(detail || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    if (!portfolio) return;
    if (dirty && !window.confirm('Discard unsaved changes?')) return;
    setDraft(deepClone(portfolio));
    toast.message('Reset to last saved state.');
  };

  const resetToDefaults = async () => {
    if (!window.confirm('Reset portfolio to the original defaults? This cannot be undone.')) return;
    setSaving(true);
    try {
      const { data } = await api.post('/admin/portfolio/reset');
      setDraft(deepClone(data));
      await refresh();
      toast.success('Portfolio reset to defaults.');
    } catch (e) {
      const detail = formatApiError(e?.response?.data?.detail);
      toast.error(detail || 'Failed to reset.');
    } finally {
      setSaving(false);
    }
  };

  if (!draft) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-teal-300" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header
        data-testid={ADMIN.header}
        className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link
              to="/"
              data-testid={ADMIN.backBtn}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <span className="text-slate-700">/</span>
            <h1 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight truncate">
              Portfolio Admin
            </h1>
            {dirty && (
              <span className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-amber-400/40 text-amber-300 bg-amber-400/5">
                unsaved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid={ADMIN.previewBtn}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-800 text-slate-200 hover:border-slate-600 text-sm transition-colors"
            >
              <Eye size={14} /> Preview
            </a>
            <button
              type="button"
              onClick={reset}
              data-testid={ADMIN.resetBtn}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-800 text-slate-200 hover:border-slate-600 text-sm transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              data-testid={ADMIN.saveBtn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal-400 text-slate-950 text-sm font-semibold hover:bg-teal-300 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : (
                <><Save size={14} /> Save & Update Portfolio</>
              )}
            </button>
            <button
              type="button"
              aria-label="Sign out"
              data-testid={ADMIN.logoutBtn}
              onClick={() => {
                logout();
                navigate('/admin/login', { replace: true });
              }}
              className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-slate-800 text-slate-300 hover:text-rose-300 hover:border-rose-400/40 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 mt-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                data-testid={t.testId}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors border ${
                  active
                    ? 'bg-teal-400/10 border-teal-400/50 text-teal-300'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 mt-8 pb-24">
        <div className="grid xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-6">
            {tab === 'profile' && <ProfileTab draft={draft} setDraft={setDraft} />}
            {tab === 'skills' && <SkillsTab draft={draft} setDraft={setDraft} />}
            {tab === 'projects' && <ProjectsTab draft={draft} setDraft={setDraft} />}
            {tab === 'experience' && <ExperienceTab draft={draft} setDraft={setDraft} />}
            {tab === 'security' && (
              <div className="space-y-6">
                <SecurityTab />
                <div className="rounded-xl border border-rose-400/20 bg-rose-500/5 p-6">
                  <h4 className="font-sans text-lg text-rose-200 font-semibold">Danger zone</h4>
                  <p className="mt-1 text-sm text-rose-200/70">
                    Reset all portfolio content (profile, skills, projects, experience) to the original
                    seed values.
                  </p>
                  <button
                    type="button"
                    onClick={resetToDefaults}
                    disabled={saving}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-rose-400/40 text-rose-200 hover:bg-rose-500/10 text-sm transition-colors disabled:opacity-60"
                  >
                    <RotateCcw size={14} /> Reset to defaults
                  </button>
                </div>
              </div>
            )}
          </div>

          <LiveSnapshot draft={draft} onSave={save} saving={saving} />
        </div>
      </main>
    </div>
  );
}
