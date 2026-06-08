import React from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function LiveSnapshot({ draft, onSave, saving }) {
  const profile = draft?.profile || {};
  const projects = draft?.projects || [];
  const experience = draft?.experience || [];
  const skillsCount = (draft?.skills || []).reduce((acc, g) => acc + (g.items?.length || 0), 0);

  return (
    <aside className="hidden xl:block xl:col-span-4">
      <div className="sticky top-24 rounded-xl border border-slate-800/80 bg-slate-900/40 p-6">
        <div className="font-mono text-xs text-teal-300/90">// live snapshot</div>
        <h3 className="mt-2 font-sans text-2xl font-semibold text-white tracking-tight">
          {profile.name || 'Your name'}
        </h3>
        <p className="mt-1 text-sm text-slate-300">{profile.title || 'Your title'}</p>
        <p className="mt-2 font-mono text-xs text-teal-300/80">
          {profile.college || 'Your college'}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <Stat value={skillsCount} label="skills" />
          <Stat value={projects.length} label="projects" />
          <Stat value={experience.length} label="timeline" />
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="mt-7 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-teal-400 text-slate-950 font-medium hover:bg-teal-300 transition-colors disabled:opacity-60"
          data-testid="admin-sidebar-save"
        >
          {saving ? (
            <><Loader2 size={14} className="animate-spin" /> Saving…</>
          ) : (
            <><Save size={14} /> Save & Update</>
          )}
        </button>
        <p className="mt-3 text-center font-mono text-[11px] text-slate-500">
          changes go live the moment you save
        </p>
      </div>
    </aside>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-4 text-center">
      <div className="font-sans text-2xl font-bold text-white tracking-tighter">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
    </div>
  );
}
