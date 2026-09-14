'use client';

import React from 'react';
import { Play, Clock, Sun, Moon, Radio, Activity } from 'lucide-react';

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
    <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md py-3.5 transition-colors sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand & Terminal Identity */}
          <div className="flex items-center gap-3">
            {/* Custom Terminal Icon Emblem */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700/60 text-emerald-400 shadow-xs relative group">
              <Activity className="h-5 w-5 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)] font-mono">
                  TrendPulse<span className="text-[var(--color-brand)] font-sans">.ai</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono whitespace-nowrap shrink-0">
                  <Radio className="h-3 w-3 animate-pulse text-emerald-500" />
                  FEED LIVE
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">
                Autonomous Financial, TikTok & Web Intelligence • 07:00 AM EST Morning Briefings
              </p>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Cron Status Chip */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] font-mono whitespace-nowrap shrink-0">
              <Clock className="h-3.5 w-3.5 text-[var(--color-brand)]" />
              <span>Next Run: 07:00 AM EST</span>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] transition-colors shrink-0 cursor-pointer"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Run Agent Trigger CTA with Keyboard Shortcut */}
            <button
              onClick={onTriggerAgent}
              disabled={isRunningAgent}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
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
                  <kbd className="hidden sm:inline-flex items-center rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono font-normal text-white ml-1">
                    ⌘R
                  </kbd>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
