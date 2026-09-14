'use client';

import React from 'react';
import { ShieldCheck, Cpu, Database, Network, Lock, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)] py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Architectural Decision Cards (4-Grid) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-[var(--color-brand)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Enterprise Architecture & Reliability Specifications
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
                <Cpu className="h-4 w-4 text-emerald-500" />
                <span>Dual-Provider AI Failover</span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                OpenAI GPT-4o-mini structured parsing backed by sub-second Google Gemini 2.0 Flash fallback and offline deterministic rule synthesis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
                <Network className="h-4 w-4 text-emerald-500" />
                <span>Multi-Source Ingestion</span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                Aggregates real-time financial market charts (equities, crypto, yields) alongside TikTok viral audio curves and Google Trends breakouts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Autonomous 07:00 AM Dispatch</span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                Scheduled cron workers trigger automated ingestion, synthesis, and SPF/DKIM signed SMTP delivery directly to executive inboxes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
                <Lock className="h-4 w-4 text-indigo-500" />
                <span>Data Isolation & Privacy</span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                Encrypted environment credentials, zero data training leakage, and verified domain email authorization with anti-spam scoring.
              </p>
            </div>
          </div>
        </div>

        {/* System Health & Attribution Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[var(--color-text-secondary)]">TrendPulse AI Agent v1.0.0</span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>Vercel Edge & Serverless</span>
            <span>•</span>
            <span>99.99% Uptime Guarantee</span>
          </div>

          <div className="font-medium">
            Engineered by <span className="font-semibold text-[var(--color-text-primary)]">Shakil Ahmed</span> • BarakahSoft LLC
          </div>
        </div>
      </div>
    </footer>
  );
}
