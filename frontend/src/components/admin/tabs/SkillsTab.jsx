import React, { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { AdminCard, AdminInput, FieldLabel, SectionTitle } from '../fields';
import { ADMIN } from '@/constants/testIds';

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `g-${Date.now()}`;
}

export default function SkillsTab({ draft, setDraft }) {
  const skills = draft.skills || [];
  const [pendingAdd, setPendingAdd] = useState({});

  const setSkills = (next) => setDraft({ ...draft, skills: next });

  const renameGroup = (idx) => (e) => {
    const next = skills.slice();
    const g = { ...next[idx], group: e.target.value };
    next[idx] = g;
    setSkills(next);
  };

  const addItem = (idx) => () => {
    const key = skills[idx]?.key;
    const val = (pendingAdd[key] || '').trim();
    if (!val) return;
    const next = skills.slice();
    const g = { ...next[idx], items: [...(next[idx].items || []), val] };
    next[idx] = g;
    setSkills(next);
    setPendingAdd({ ...pendingAdd, [key]: '' });
  };

  const removeItem = (idx, i) => () => {
    const next = skills.slice();
    const items = (next[idx].items || []).slice();
    items.splice(i, 1);
    next[idx] = { ...next[idx], items };
    setSkills(next);
  };

  const removeGroup = (idx) => () => {
    if (!window.confirm('Remove this skill group?')) return;
    const next = skills.slice();
    next.splice(idx, 1);
    setSkills(next);
  };

  const addGroup = () => {
    const name = window.prompt('Name of the new skill group?');
    if (!name) return;
    const key = slug(name);
    setSkills([...skills, { key, group: name, items: [] }]);
  };

  return (
    <AdminCard>
      <SectionTitle
        title="Skills"
        subtitle="Group your stack. Type a skill and press Enter — each becomes a badge on the public site."
        action={
          <button
            type="button"
            data-testid={ADMIN.skillGroupAdd}
            onClick={addGroup}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal-400 text-slate-950 text-sm font-medium hover:bg-teal-300 transition-colors"
          >
            <Plus size={14} /> Add group
          </button>
        }
      />

      <div className="space-y-6">
        {skills.map((group, idx) => (
          <div key={group.key || idx} className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <AdminInput
                data-testid={ADMIN.skillGroupRenameInput(idx)}
                value={group.group || ''}
                onChange={renameGroup(idx)}
                className="max-w-xs"
              />
              <button
                type="button"
                data-testid={ADMIN.skillGroupRemove(idx)}
                onClick={removeGroup(idx)}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-md text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors text-xs"
              >
                <Trash2 size={14} /> Remove group
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(group.items || []).map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs"
                >
                  {item}
                  <button
                    type="button"
                    data-testid={ADMIN.skillChipRemove(group.key, i)}
                    onClick={removeItem(idx, i)}
                    className="text-slate-500 hover:text-rose-300 transition-colors"
                    aria-label={`Remove ${item}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {(group.items || []).length === 0 && (
                <span className="font-mono text-xs text-slate-500">// no skills yet</span>
              )}
            </div>

            <div className="mt-4">
              <FieldLabel>Add a skill</FieldLabel>
              <div className="mt-2 flex gap-2">
                <AdminInput
                  data-testid={ADMIN.skillAddInput(group.key)}
                  value={pendingAdd[group.key] || ''}
                  onChange={(e) => setPendingAdd({ ...pendingAdd, [group.key]: e.target.value })}
                  placeholder={`e.g. ${group.key === 'languages' ? 'Rust' : 'Kubernetes'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(idx)();
                    }
                  }}
                />
                <button
                  type="button"
                  data-testid={ADMIN.skillAddBtn(group.key)}
                  onClick={addItem(idx)}
                  className="px-4 rounded-md border border-teal-400/50 text-teal-300 text-sm hover:bg-teal-400/10 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
