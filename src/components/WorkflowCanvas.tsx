'use client';

import React from 'react';
import { Clock, Network, Cpu, ShieldCheck, Mail, CheckCircle2, Play, ArrowRight } from 'lucide-react';

interface WorkflowCanvasProps {
  isRunning: boolean;
  onTrigger: () => void;
  activeStep?: number;
}

export default function WorkflowCanvas({ isRunning, onTrigger }: WorkflowCanvasProps) {
  const steps = [
    {
      id: 'trigger',
      title: '1. Cron & Webhook Trigger',
      desc: '07:00 AM EST Inngest scheduler wakes the agent container',
      icon: Clock,
      status: 'ARMED',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      nodeColor: 'border-amber-500/40 hover:border-amber-500',
    },
    {
      id: 'ingestion',
      title: '2. Multi-Feed Ingestion',
      desc: 'Normalizes 6 financial charts + TikTok viral audio curves',
      icon: Network,
      status: 'SYNCHRONIZED',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      nodeColor: 'border-emerald-500/40 hover:border-emerald-500',
    },
    {
      id: 'ai-engine',
      title: '3. Dual-Provider AI',
      desc: 'gpt-4o-mini reasoning with sub-second Gemini failover',
      icon: Cpu,
      status: 'OPERATIONAL',
      badgeColor: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      nodeColor: 'border-sky-500/40 hover:border-sky-500',
    },
    {
      id: 'guardrail',
      title: '4. Human Review Gate',
      desc: 'Executive summary scoring & action item prioritization',
      icon: ShieldCheck,
      status: 'VERIFIED',
      badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      nodeColor: 'border-indigo-500/40 hover:border-indigo-500',
    },
    {
      id: 'dispatch',
      title: '5. SMTP Delivery Hub',
      desc: 'DKIM & SPF aligned domain dispatch via Resend',
      icon: Mail,
      status: 'READY',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      nodeColor: 'border-emerald-500/40 hover:border-emerald-500',
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Automated Agent Pipeline Architecture
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-600 dark:text-sky-400 whitespace-nowrap shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              Durable Execution
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            End-to-end data flow: Scheduled triggers, multi-source stream ingestion, dual AI reasoning, and SMTP delivery.
          </p>
        </div>

        <button
          onClick={onTrigger}
          disabled={isRunning}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isRunning ? (
            <>
              <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Running Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              <span>Simulate Full Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Pipeline Node Grid with Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex flex-col">
              <div
                className={`flex-1 rounded-xl border bg-[var(--color-panel-subtle)] p-3.5 transition-all ${
                  step.nodeColor
                } ${isRunning ? 'ring-1 ring-sky-500/30' : ''}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-brand)] shadow-xs">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold font-mono tracking-tight whitespace-nowrap shrink-0 ${step.badgeColor}`}
                  >
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {step.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow Connector for Desktop (between nodes) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[var(--color-text-muted)]">
                  <ArrowRight className="h-4 w-4 text-[var(--color-brand)] opacity-60" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
