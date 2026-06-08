import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { AdminCard, AdminInput, AdminTextarea, AdminSelect, FieldLabel, SectionTitle } from '../fields';
import { ADMIN } from '@/constants/testIds';

const CATEGORY_OPTIONS = [
  { value: 'aiml', label: 'AI / ML' },
  { value: 'llm', label: 'LLM · DevRel' },
  { value: 'other', label: 'Other' },
];

const CATEGORY_LABEL = {
  aiml: 'AI / ML',
  llm: 'LLM · DevRel',
  other: 'Other',
};

function newProject() {
  return {
    id: `project_${Math.random().toString(36).slice(2, 8)}`,
    title: 'New project',
    subtitle: '',
    description: '',
    category: 'AI / ML',
    categoryKey: 'aiml',
    tech: [],
    metrics: [],
    link: '',
    demo_url: '',
  };
}

export default function ProjectsTab({ draft, setDraft }) {
  const projects = draft.projects || [];
  const setProjects = (next) => setDraft({ ...draft, projects: next });
  const [techDraft, setTechDraft] = useState({});

  const update = (idx, patch) => {
    const next = projects.slice();
    next[idx] = { ...next[idx], ...patch };
    setProjects(next);
  };

  const remove = (idx) => () => {
    if (!window.confirm('Delete this project?')) return;
    const next = projects.slice();
    next.splice(idx, 1);
    setProjects(next);
  };

  const addProject = () => {
    setProjects([...projects, newProject()]);
  };

  const addMetric = (idx) => () => {
    const p = projects[idx];
    update(idx, { metrics: [...(p.metrics || []), { label: '', value: '' }] });
  };

  const updateMetric = (idx, i, field) => (e) => {
    const p = projects[idx];
    const metrics = (p.metrics || []).slice();
    metrics[i] = { ...metrics[i], [field]: e.target.value };
    update(idx, { metrics });
  };

  const removeMetric = (idx, i) => () => {
    const p = projects[idx];
    const metrics = (p.metrics || []).slice();
    metrics.splice(i, 1);
    update(idx, { metrics });
  };

  const addTech = (idx) => () => {
    const id = projects[idx].id;
    const val = (techDraft[id] || '').trim();
    if (!val) return;
    update(idx, { tech: [...(projects[idx].tech || []), val] });
    setTechDraft({ ...techDraft, [id]: '' });
  };

  const removeTech = (idx, i) => () => {
    const tech = (projects[idx].tech || []).slice();
    tech.splice(i, 1);
    update(idx, { tech });
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <SectionTitle
          title="Projects"
          subtitle="Add or edit projects. Metrics are rendered as standout numbers."
          action={
            <button
              type="button"
              data-testid={ADMIN.projectAdd}
              onClick={addProject}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal-400 text-slate-950 text-sm font-medium hover:bg-teal-300 transition-colors"
            >
              <Plus size={14} /> Add project
            </button>
          }
        />
        <p className="font-mono text-xs text-slate-500">{projects.length} projects configured.</p>
      </AdminCard>

      {projects.map((p, idx) => (
        <AdminCard key={p.id} className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-sans text-lg font-semibold text-white tracking-tight">
                Project · {p.title || 'Untitled'}
              </h4>
              {p.subtitle && <p className="mt-1 text-sm text-slate-400">{p.subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={remove(idx)}
              data-testid={ADMIN.projectDelete(p.id)}
              className="inline-flex items-center gap-1.5 text-rose-300 hover:text-rose-200 text-sm transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <FieldLabel>Title</FieldLabel>
              <AdminInput
                data-testid={ADMIN.projectTitle(p.id)}
                value={p.title || ''}
                onChange={(e) => update(idx, { title: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <FieldLabel>Subtitle / one-liner</FieldLabel>
              <AdminInput
                data-testid={ADMIN.projectSubtitle(p.id)}
                value={p.subtitle || ''}
                onChange={(e) => update(idx, { subtitle: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <AdminSelect
                data-testid={ADMIN.projectCategory(p.id)}
                value={p.categoryKey || 'aiml'}
                onChange={(e) => {
                  const key = e.target.value;
                  update(idx, { categoryKey: key, category: CATEGORY_LABEL[key] || p.category });
                }}
                className="mt-2"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </AdminSelect>
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <AdminTextarea
                data-testid={ADMIN.projectDescription(p.id)}
                value={p.description || ''}
                onChange={(e) => update(idx, { description: e.target.value })}
                rows={5}
                className="mt-2"
              />
            </div>
            <div>
              <FieldLabel>GitHub URL</FieldLabel>
              <AdminInput
                data-testid={ADMIN.projectLink(p.id)}
                value={p.link || ''}
                onChange={(e) => update(idx, { link: e.target.value })}
                placeholder="https://github.com/…"
                className="mt-2"
              />
            </div>
            <div>
              <FieldLabel>Live demo URL (optional)</FieldLabel>
              <AdminInput
                data-testid={ADMIN.projectDemo(p.id)}
                value={p.demo_url || ''}
                onChange={(e) => update(idx, { demo_url: e.target.value })}
                placeholder="https://…"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Performance metrics</FieldLabel>
            <div className="mt-2 space-y-2">
              {(p.metrics || []).map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <AdminInput
                    data-testid={ADMIN.projectMetricLabel(p.id, i)}
                    value={m.label}
                    onChange={updateMetric(idx, i, 'label')}
                    placeholder="Throughput"
                  />
                  <AdminInput
                    data-testid={ADMIN.projectMetricValue(p.id, i)}
                    value={m.value}
                    onChange={updateMetric(idx, i, 'value')}
                    placeholder="24+ FPS"
                  />
                  <button
                    type="button"
                    data-testid={ADMIN.projectMetricRemove(p.id, i)}
                    onClick={removeMetric(idx, i)}
                    className="px-3 rounded-md border border-slate-800 text-rose-300 hover:text-rose-200 hover:border-rose-400/40 transition-colors"
                    aria-label="Remove metric"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                data-testid={ADMIN.projectMetricAdd(p.id)}
                onClick={addMetric(idx)}
                className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-teal-400/50 text-teal-300 text-sm hover:bg-teal-400/10 transition-colors"
              >
                <Plus size={14} /> Add metric
              </button>
            </div>
          </div>

          <div>
            <FieldLabel>Tech stack</FieldLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              {(p.tech || []).map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs"
                >
                  {t}
                  <button
                    type="button"
                    onClick={removeTech(idx, i)}
                    data-testid={ADMIN.projectTechRemove(p.id, i)}
                    aria-label={`Remove ${t}`}
                    className="text-slate-500 hover:text-rose-300 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <AdminInput
                data-testid={ADMIN.projectTechInput(p.id)}
                value={techDraft[p.id] || ''}
                onChange={(e) => setTechDraft({ ...techDraft, [p.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech(idx)();
                  }
                }}
                placeholder="Type a tech (e.g. PyTorch) and press Enter"
              />
              <button
                type="button"
                onClick={addTech(idx)}
                data-testid={ADMIN.projectTechAdd(p.id)}
                className="px-4 rounded-md border border-teal-400/50 text-teal-300 text-sm hover:bg-teal-400/10 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
