'use client';

import React from 'react';
import { Sparkles, Play, Clock, Sun, Moon, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  isRunningAgent: boolean;
  onTriggerAgent: () => void;
  lastRunTime: string;
}

export default function Header({
  darkMode,
  onToggleTheme,
  isRunningAgent,
  onTriggerAgent,
  lastRunTime,
}: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)] py-4 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                  TrendPulse AI
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Feeds Active
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">
                Autonomous Market, TikTok & Web Intelligence • Daily 07:00 AM Executive Briefings
              </p>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Cron Status Chip */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] font-mono whitespace-nowrap shrink-0">
              <Clock className="h-3.5 w-3.5 text-sky-500" />
              <span>Next Run: 07:00 AM EST</span>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors shrink-0"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Run Agent Trigger CTA */}
            <button
              onClick={onTriggerAgent}
              disabled={isRunningAgent}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isRunningAgent ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Intelligence...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Trigger Morning Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
