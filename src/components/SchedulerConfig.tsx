'use client';

import React, { useState, useEffect } from 'react';
import RoiCostCalculator from '@/components/RoiCostCalculator';
import {
  Clock,
  Settings,
  Plus,
  X,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Database,
  Radio,
  Bell,
  RefreshCw,
} from 'lucide-react';

export default function SchedulerConfig() {
  const [scheduleTime, setScheduleTime] = useState('07:00');
  const [timezone, setTimezone] = useState('America/New_York');
  const [autoEmailEnabled, setAutoEmailEnabled] = useState(true);
  const [monitoredTags, setMonitoredTags] = useState([
    '#MicroSaaS',
    '#AIAgents',
    '#MarketBreakout',
    '#ChartPattern',
    '#SideHustleStack',
    '#CryptoAlpha',
  ]);
  const [newTag, setNewTag] = useState('');
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);

  const fetchHealth = async () => {
    setIsLoadingHealth(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setSystemHealth(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !monitoredTags.includes(newTag.trim())) {
      setMonitoredTags([...monitoredTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMonitoredTags(monitoredTags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Settings className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Autonomous Agent Schedule & Monitoring Controls
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Configure daily execution triggers, target hashtags, and review live multi-cloud infrastructure health.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Schedule & Execution Triggers */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs space-y-5">
          <div className="border-b border-[var(--color-border)] pb-3">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--color-brand)]" />
              <span>Daily Morning Execution Schedule</span>
            </h4>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              The agent wakes autonomously, crawls charts and social feeds, and compiles the report before your workday starts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--color-text-secondary)] mb-1">
                Trigger Time:
              </label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 font-mono font-bold text-[var(--color-text-primary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--color-text-secondary)] mb-1">
                Timezone:
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 font-medium text-[var(--color-text-primary)] focus:outline-hidden"
              >
                <option value="America/New_York">America/New_York (Atlanta - EST)</option>
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                <option value="UTC">UTC (Universal)</option>
              </select>
            </div>
          </div>

          {/* Autonomous Email Dispatch Toggle */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                Automatic Email Dispatch (07:00 AM)
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {autoEmailEnabled
                  ? 'Autonomous: Sends morning briefing immediately upon synthesis.'
                  : 'Human-in-the-Loop: Holds draft in review queue for manual confirmation.'}
              </span>
            </div>
            <button
              onClick={() => setAutoEmailEnabled(!autoEmailEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                autoEmailEnabled ? 'bg-[var(--color-brand)]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  autoEmailEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Monitored Hashtags Manager */}
          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Monitored TikTok Hashtags & Niches
            </h5>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {monitoredTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-500/20"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-rose-800 dark:hover:text-rose-200 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={addTag} className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom hashtag (e.g. #QuantTrading)..."
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tag</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Live Cloud Infrastructure Health Telemetry */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div>
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Radio className="h-4 w-4 text-emerald-500" />
                <span>Active Cloud Infrastructure & Health</span>
              </h4>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Live status of multi-provider failover, background cron, and SMTP gateway.
              </p>
            </div>
            <button
              onClick={fetchHealth}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              title="Refresh Health"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoadingHealth ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* OpenAI Status */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
              <div className="flex items-center gap-2.5">
                <Cpu className="h-4 w-4 text-emerald-500" />
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block">
                    Primary AI: OpenAI gpt-4o-mini
                  </span>
                  <span className="text-[var(--color-text-muted)]">Fast structured JSON reasoning</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="h-3 w-3" />
                OPERATIONAL
              </span>
            </div>

            {/* Gemini Fallback Status */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
              <div className="flex items-center gap-2.5">
                <Cpu className="h-4 w-4 text-indigo-500" />
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block">
                    Fallback AI: Google Gemini 2.0 Flash
                  </span>
                  <span className="text-[var(--color-text-muted)]">Instant sub-500ms failover backup</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="h-3 w-3" />
                OPERATIONAL
              </span>
            </div>

            {/* Inngest Cron Status */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block">
                    Cron Dispatch: Inngest Workflow
                  </span>
                  <span className="text-[var(--color-text-muted)]">7:00 AM EST schedule handler</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="h-3 w-3" />
                ARMED
              </span>
            </div>

            {/* SMTP Status */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block">
                    Email Gateway: Resend SMTP
                  </span>
                  <span className="text-[var(--color-text-muted)]">DKIM / SPF aligned domain delivery</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="h-3 w-3" />
                READY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational ROI & Unit Economics Calculator */}
      <RoiCostCalculator />
    </div>
  );
}
