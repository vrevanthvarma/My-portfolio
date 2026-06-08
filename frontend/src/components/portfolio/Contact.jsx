import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SectionMarker } from './SectionMarker';
import { CONTACT } from '@/constants/testIds';
import { usePortfolio } from '@/context/PortfolioContext';
import { api, formatApiError } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const { portfolio } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!portfolio) return null;
  const { profile } = portfolio;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in name, email and message.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/contact', form);
      toast.success("Message sent. I'll respond within 24 hours.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const detail = formatApiError(err?.response?.data?.detail);
      toast.error(detail || 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={CONTACT.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-slate-900/80"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <div className="font-mono text-xs sm:text-sm text-teal-300/90">// 04 — get in touch</div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-3 font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white"
          >
            Ping my endpoint.
          </motion.h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Open to AI/ML and DevRel roles — internships, full-time, or collaborations.
            <br />Response time usually &lt; 24 hours.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            data-testid={CONTACT.emailBtn}
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal-400 text-slate-950 font-medium hover:bg-teal-300 transition-colors"
          >
            <Mail size={16} /> Email me
          </a>
          <a
            data-testid={CONTACT.linkedinBtn}
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-slate-500 transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            data-testid={CONTACT.githubBtn}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-slate-500 transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
        </div>

        <motion.form
          data-testid={CONTACT.form}
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 mx-auto max-w-2xl rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8"
          noValidate
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-6">
            // send_message()
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-mono text-xs text-slate-400">name</Label>
              <Input
                id="name"
                data-testid={CONTACT.nameInput}
                value={form.name}
                onChange={update('name')}
                placeholder="Ada Lovelace"
                className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="font-mono text-xs text-slate-400">email</Label>
              <Input
                id="email"
                type="email"
                data-testid={CONTACT.emailInput}
                value={form.email}
                onChange={update('email')}
                placeholder="you@domain.com"
                className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="subject" className="font-mono text-xs text-slate-400">subject</Label>
            <Input
              id="subject"
              data-testid={CONTACT.subjectInput}
              value={form.subject}
              onChange={update('subject')}
              placeholder="Role · Collaboration · Question"
              className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="message" className="font-mono text-xs text-slate-400">message</Label>
            <Textarea
              id="message"
              data-testid={CONTACT.messageInput}
              value={form.message}
              onChange={update('message')}
              rows={6}
              placeholder="Tell me about what you're building…"
              className="mt-2 bg-slate-950 border-slate-800 text-white font-mono placeholder:text-slate-600 focus-visible:ring-teal-400/40 focus-visible:border-teal-400/40 resize-none"
              required
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="font-mono text-[11px] text-slate-500">Stored securely. No marketing — ever.</p>
            <button
              type="submit"
              data-testid={CONTACT.submitBtn}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal-400 text-slate-950 font-medium hover:bg-teal-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><Loader2 size={14} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={14} /> Send message</>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
