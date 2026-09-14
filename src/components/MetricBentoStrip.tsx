'use client';

import React from 'react';
import { TrendingUp, Video, MailCheck, BellRing, ArrowUpRight } from 'lucide-react';

interface MetricBentoStripProps {
  tickerCount: number;
  tiktokTrendCount: number;
  emailOpenRate: string;
  nextScheduledTime: string;
}

export default function MetricBentoStrip({
  tickerCount,
  tiktokTrendCount,
  emailOpenRate,
  nextScheduledTime,
}: MetricBentoStripProps) {
  return (
    <section className="py-6 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bento Card 1: Market Tickers */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-xs transition-all hover:border-[var(--color-brand)]/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Financial Assets
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {tickerCount}
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +1.2% Avg Vol
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] truncate">
              S&P 500, NASDAQ, BTC, SOL, Gold & Yields
            </p>
          </div>

          {/* Bento Card 2: TikTok Viral Signals */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-xs transition-all hover:border-[var(--color-brand)]/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                TikTok Viral Signals
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Video className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                275.8M
              </span>
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +188% Velocity
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] truncate">
              {tiktokTrendCount} Breakout Hashtags & Trending Audio
            </p>
          </div>

          {/* Bento Card 3: Morning Dispatch Schedule */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-xs transition-all hover:border-[var(--color-brand)]/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Morning Schedule
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BellRing className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                07:00 AM
              </span>
              <span className="text-xs font-medium text-[var(--color-text-secondary)] font-mono">
                EST
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] truncate">
              Automated Inngest Cron • Atlanta Timezone
            </p>
          </div>

          {/* Bento Card 4: Email Deliverability */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-xs transition-all hover:border-[var(--color-brand)]/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Email Deliverability
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <MailCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                100%
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                0 Bounces
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] truncate">
              Resend SMTP • 3 Active Distribution Lists
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
