import React from 'react';
import { AdminCard, AdminInput, AdminTextarea, FieldLabel, SectionTitle } from '../fields';
import { ADMIN } from '@/constants/testIds';

export default function ProfileTab({ draft, setDraft }) {
  const profile = draft.profile || {};
  const upd = (k) => (e) =>
    setDraft({ ...draft, profile: { ...profile, [k]: e.target.value } });

  return (
    <AdminCard>
      <SectionTitle
        title="Profile"
        subtitle="The hero section — what visitors see first."
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Full name</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileName}
            value={profile.name || ''}
            onChange={upd('name')}
            placeholder="Vejandla Revanth Varma"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileTitle}
            value={profile.title || ''}
            onChange={upd('title')}
            placeholder="AI & ML Engineer · Developer Relations"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>Tagline (short pitch)</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileTagline}
            value={profile.tagline || ''}
            onChange={upd('tagline')}
            placeholder="Building Sovereign AI at population scale"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>College / University</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileCollege}
            value={profile.college || ''}
            onChange={upd('college')}
            placeholder="Osmania University"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>Status pill (top of hero)</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileAvailability}
            value={profile.availability || ''}
            onChange={upd('availability')}
            placeholder="available_for > ai/ml · devrel"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileEmail}
            value={profile.email || ''}
            onChange={upd('email')}
            type="email"
            placeholder="you@domain.com"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>LinkedIn URL</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileLinkedin}
            value={profile.linkedin || ''}
            onChange={upd('linkedin')}
            placeholder="https://linkedin.com/in/handle"
            className="mt-2"
          />
        </div>
        <div>
          <FieldLabel>GitHub URL</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileGithub}
            value={profile.github || ''}
            onChange={upd('github')}
            placeholder="https://github.com/handle"
            className="mt-2"
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Resume PDF URL</FieldLabel>
          <AdminInput
            data-testid={ADMIN.profileResume}
            value={profile.resume_url || ''}
            onChange={upd('resume_url')}
            placeholder="https://…/resume.pdf"
            className="mt-2"
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Bio paragraph</FieldLabel>
          <AdminTextarea
            data-testid={ADMIN.profileSummary}
            value={profile.summary || ''}
            onChange={upd('summary')}
            rows={6}
            placeholder="2–4 sentences about you."
            className="mt-2"
          />
          <p className="mt-2 font-mono text-[10px] text-slate-500">2–4 sentences. Plain text.</p>
        </div>
      </div>
    </AdminCard>
  );
}
