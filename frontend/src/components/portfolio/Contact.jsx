import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SectionMarker } from './SectionMarker';
import { CONTACT } from '@/constants/testIds';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const { profile } = PORTFOLIO_DATA;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in name, email and message.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. I'll respond within 24 hours.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Something went wrong. Try email directly.';
      toast.error(typeof detail === 'string' ? detail : 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={CONTACT.section}
      className="relative scroll-mt-20 py-24 md:py-32 border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionMarker
          number="04"
          label="get in touch"
          title="Ping my endpoint."
          kicker="Open to AI/ML and DevRel roles — internships, full-time, or collaborations. Response time usually < 24 hours."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-zinc-800 bg-black/60 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-zinc-500">~/contact.sh</span>
              </div>
              <pre className="font-mono text-[13px] leading-7 p-5 sm:p-6 text-zinc-300">
{`$ curl -X POST /api/contact \\
  --name "your name" \\
  --email "you@domain.com" \\
  --message "Let's build."

> queued for response (< 24h)`}
              </pre>
            </div>

            <div className="mt-6 space-y-3">
              <a
                data-testid={CONTACT.emailBtn}
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between px-4 py-3 rounded-md border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
              >
                <span className="inline-flex items-center gap-3 text-zinc-200">
                  <Mail size={16} className="text-emerald-400" />
                  <span className="font-mono text-sm">{profile.email}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Email
                </span>
              </a>
              <a
                data-testid={CONTACT.linkedinBtn}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-md border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
              >
                <span className="inline-flex items-center gap-3 text-zinc-200">
                  <Linkedin size={16} className="text-emerald-400" />
                  <span className="font-mono text-sm">linkedin.com/in/vrevanthvarma</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  LinkedIn
                </span>
              </a>
              <a
                data-testid={CONTACT.githubBtn}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-md border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
              >
                <span className="inline-flex items-center gap-3 text-zinc-200">
                  <Github size={16} className="text-emerald-400" />
                  <span className="font-mono text-sm">github.com/vrevanthvarma</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  GitHub
                </span>
              </a>
            </div>
          </div>

          <motion.form
            data-testid={CONTACT.form}
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8"
            noValidate
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-6">
              // send_message()
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="font-mono text-xs text-zinc-400">
                  name
                </Label>
                <Input
                  id="name"
                  data-testid={CONTACT.nameInput}
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Ada Lovelace"
                  className="mt-2 bg-zinc-950 border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-mono text-xs text-zinc-400">
                  email
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-testid={CONTACT.emailInput}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@domain.com"
                  className="mt-2 bg-zinc-950 border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="subject" className="font-mono text-xs text-zinc-400">
                subject
              </Label>
              <Input
                id="subject"
                data-testid={CONTACT.subjectInput}
                value={form.subject}
                onChange={update('subject')}
                placeholder="Role · Collaboration · Question"
                className="mt-2 bg-zinc-950 border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="message" className="font-mono text-xs text-zinc-400">
                message
              </Label>
              <Textarea
                id="message"
                data-testid={CONTACT.messageInput}
                value={form.message}
                onChange={update('message')}
                rows={7}
                placeholder="Tell me about what you're building…"
                className="mt-2 bg-zinc-950 border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 resize-none"
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="font-mono text-[11px] text-zinc-500">
                Stored securely. No marketing — ever.
              </p>
              <button
                type="submit"
                data-testid={CONTACT.submitBtn}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-500 text-black font-mono text-xs uppercase tracking-[0.18em] hover:bg-emerald-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
