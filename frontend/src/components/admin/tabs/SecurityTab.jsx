import React from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';
import { AdminCard, SectionTitle } from '../fields';
import { useAuth } from '@/context/AuthContext';

export default function SecurityTab() {
  const { user } = useAuth();
  return (
    <AdminCard>
      <SectionTitle
        title="Security"
        subtitle="Your admin account, tokens, and access."
      />
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 p-4">
          <ShieldCheck className="text-teal-300 mt-0.5" size={18} />
          <div>
            <div className="text-sm text-white font-medium">Signed in as</div>
            <div className="font-mono text-xs text-slate-400 mt-0.5">{user?.email}</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 p-4">
          <KeyRound className="text-teal-300 mt-0.5" size={18} />
          <div>
            <div className="text-sm text-white font-medium">Reset your password</div>
            <p className="font-mono text-xs text-slate-400 mt-1 leading-relaxed">
              Update <code className="text-teal-300">ADMIN_PASSWORD</code> in <code className="text-teal-300">backend/.env</code> and
              restart the backend. The seed routine will rotate the hash on startup automatically.
            </p>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
