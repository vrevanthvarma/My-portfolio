import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminCard, AdminInput, AdminTextarea, AdminSelect, FieldLabel, SectionTitle } from '../fields';
import { ADMIN } from '@/constants/testIds';

const KIND_OPTIONS = [
  { value: 'education', label: 'Education' },
  { value: 'work', label: 'Work / Internship' },
  { value: 'project', label: 'Project lifecycle' },
];

function newEntry() {
  return {
    id: `exp_${Math.random().toString(36).slice(2, 8)}`,
    status: '',
    title: '',
    org: '',
    description: '',
    kind: 'education',
  };
}

export default function ExperienceTab({ draft, setDraft }) {
  const items = draft.experience || [];
  const setItems = (next) => setDraft({ ...draft, experience: next });

  const update = (idx, patch) => {
    const next = items.slice();
    next[idx] = { ...next[idx], ...patch };
    setItems(next);
  };
  const remove = (idx) => () => {
    if (!window.confirm('Delete this timeline entry?')) return;
    const next = items.slice();
    next.splice(idx, 1);
    setItems(next);
  };
  const add = () => setItems([...items, newEntry()]);

  return (
    <div className="space-y-6">
      <AdminCard>
        <SectionTitle
          title="Experience"
          subtitle="Timeline entries — education, internships, or project lifecycles."
          action={
            <button
              type="button"
              data-testid={ADMIN.expAdd}
              onClick={add}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal-400 text-slate-950 text-sm font-medium hover:bg-teal-300 transition-colors"
            >
              <Plus size={14} /> Add entry
            </button>
          }
        />
        <p className="font-mono text-xs text-slate-500">{items.length} entries configured.</p>
      </AdminCard>

      {items.map((e, idx) => (
        <AdminCard key={e.id} className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <h4 className="font-sans text-lg font-semibold text-white tracking-tight">
              Entry · {e.title || 'Untitled'}
            </h4>
            <button
              type="button"
              onClick={remove(idx)}
              data-testid={ADMIN.expDelete(e.id)}
              className="inline-flex items-center gap-1.5 text-rose-300 hover:text-rose-200 text-sm transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>Status / period</FieldLabel>
              <AdminInput
                data-testid={ADMIN.expStatus(e.id)}
                value={e.status || ''}
                onChange={(ev) => update(idx, { status: ev.target.value })}
                placeholder="2022 — 2026"
                className="mt-2"
              />
            </div>
            <div>
              <FieldLabel>Kind</FieldLabel>
              <AdminSelect
                data-testid={ADMIN.expKind(e.id)}
                value={e.kind || 'education'}
                onChange={(ev) => update(idx, { kind: ev.target.value })}
                className="mt-2"
              >
                {KIND_OPTIONS.map((k) => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </AdminSelect>
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Title</FieldLabel>
              <AdminInput
                data-testid={ADMIN.expTitle(e.id)}
                value={e.title || ''}
                onChange={(ev) => update(idx, { title: ev.target.value })}
                placeholder="B.E. in Computer Science Engineering (AI & ML)"
                className="mt-2"
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Organisation</FieldLabel>
              <AdminInput
                data-testid={ADMIN.expOrg(e.id)}
                value={e.org || ''}
                onChange={(ev) => update(idx, { org: ev.target.value })}
                placeholder="IIIT Hyderabad"
                className="mt-2"
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <AdminTextarea
                data-testid={ADMIN.expDescription(e.id)}
                value={e.description || ''}
                onChange={(ev) => update(idx, { description: ev.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
