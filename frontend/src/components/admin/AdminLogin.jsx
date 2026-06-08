import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { Loader2, LogIn, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ADMIN } from '@/constants/testIds';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    const target = location.state?.from?.pathname || '/admin';
    return <Navigate to={target} replace />;
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setSubmitting(true);
    const res = await login(email.trim(), password);
    setSubmitting(false);
    if (res.ok) {
      toast.success('Welcome back, admin');
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="px-6 md:px-12 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8"
        >
          <div className="font-mono text-xs text-teal-300/90">// admin · login</div>
          <h1 className="mt-2 font-sans text-3xl font-bold text-white tracking-tight">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to update your portfolio in real time.
          </p>

          <div className="mt-7 space-y-4">
            <div>
              <Label htmlFor="email" className="font-mono text-xs text-slate-400">email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@revanth.dev"
                data-testid={ADMIN.loginEmail}
                className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-mono text-xs text-slate-400">password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid={ADMIN.loginPassword}
                className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <p
              data-testid={ADMIN.loginError}
              className="mt-4 px-3 py-2 rounded-md border border-rose-400/30 bg-rose-500/10 text-sm text-rose-300 font-mono"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            data-testid={ADMIN.loginSubmit}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-teal-400 text-slate-950 font-medium hover:bg-teal-300 transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <><Loader2 size={14} className="animate-spin" /> Signing in…</>
            ) : (
              <><LogIn size={14} /> Sign in</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
