// Compact, mono-styled input components reused across the admin panel.
import React from 'react';
import { cn } from '@/lib/utils';

export function FieldLabel({ children, className }) {
  return (
    <label
      className={cn(
        'font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500',
        className,
      )}
    >
      {children}
    </label>
  );
}

export const baseInputClass =
  'w-full rounded-md bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 transition-colors';

export function AdminInput({ className, ...props }) {
  return <input className={cn(baseInputClass, className)} {...props} />;
}

export function AdminTextarea({ className, ...props }) {
  return <textarea className={cn(baseInputClass, 'resize-none', className)} {...props} />;
}

export function AdminSelect({ className, children, ...props }) {
  return (
    <select className={cn(baseInputClass, 'appearance-none pr-9', className)} {...props}>
      {children}
    </select>
  );
}

export function AdminCard({ children, className }) {
  return (
    <div className={cn('rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-7', className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h3 className="font-sans text-xl font-semibold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
