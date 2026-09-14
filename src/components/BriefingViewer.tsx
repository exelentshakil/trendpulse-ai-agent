'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Video,
  CheckSquare,
  Square,
  Mail,
  RefreshCw,
  Clock,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react';
import { MorningBriefing } from '@/lib/mock-data';

interface BriefingViewerProps {
  briefing: MorningBriefing;
  onRegenerate: (focus: string, tone: 'executive' | 'trader' | 'creator') => void;
  onNavigateToEmail: () => void;
  isRegenerating: boolean;
}

export default function BriefingViewer({
  briefing,
  onRegenerate,
  onNavigateToEmail,
  isRegenerating,
}: BriefingViewerProps) {
  const [actionItems, setActionItems] = useState(briefing.actionItems);
  const [selectedFocus, setSelectedFocus] = useState('Tech Equities & TikTok Automation');
  const [selectedTone, setSelectedTone] = useState<'executive' | 'trader' | 'creator'>('executive');
  const [showConfig, setShowConfig] = useState(false);

  // Toggle action item completion locally
  const toggleActionItem = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Date, AI Telemetry & Actions */}
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[var(--color-brand)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-brand)] font-mono whitespace-nowrap shrink-0">
              {briefing.formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
              <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>AI Engine: {briefing.aiMetadata?.provider} {briefing.aiMetadata?.model}</span>
              <span className="text-[var(--color-text-muted)] font-mono">({briefing.aiMetadata?.latencyMs}ms)</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3.5 w-3.5" />
              Confidence {briefing.confidenceScore}%
            </span>
          </div>
          <h2 className="mt-2 text-base sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {briefing.headline}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Customize AI Focus</span>
          </button>
          <button
            onClick={onNavigateToEmail}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3 py-2 text-xs font-semibold text-white shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Dispatch Morning Email</span>
          </button>
        </div>
      </div>

      {/* AI Synthesis Config Panel (Collapsible) */}
      {showConfig && (
        <div className="rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-4 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
                On-Demand AI Synthesis Parameters
              </h4>
              <p className="text-xs text-[var(--color-text-muted)]">
                Tune the real-time LLM inference model to re-analyze market charts and TikTok trends.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Focus Selector */}
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] focus:outline-hidden"
              >
                <option value="Tech Equities & TikTok Automation">Tech Equities & TikTok SaaS</option>
                <option value="Crypto Momentum & Viral Memecoins">Crypto Breakouts & Memecoins</option>
                <option value="Macro Treasury Yields & General News">Macro Rates & Commodities</option>
                <option value="Creator Economy & Viral Audio Hooks">Creator Hooks & Audio Spikes</option>
              </select>

              {/* Tone Selector */}
              <div className="flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-0.5 shrink-0">
                {(['executive', 'trader', 'creator'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors whitespace-nowrap shrink-0 ${
                      selectedTone === tone
                        ? 'bg-[var(--color-brand)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              {/* Run Trigger */}
              <button
                onClick={() => onRegenerate(selectedFocus, selectedTone)}
                disabled={isRegenerating}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-3 py-1.5 text-xs font-semibold shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isRegenerating ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3" />
                    <span>Run AI Synthesis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Executive Summary Callout */}
      <div className="rounded-xl border-l-4 border-l-[var(--color-brand)] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Executive Intelligence Summary</span>
        </div>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--color-text-primary)] font-medium">
          {briefing.executiveSummary}
        </p>
      </div>

      {/* 2-Column Section: Market Shifts vs TikTok Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Financial Chart Shifts */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Key Market & Chart Shifts
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {briefing.marketShifts.length} Signals Identified
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {briefing.marketShifts.map((shift, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 transition-colors hover:border-[var(--color-brand)]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                    {shift.title}
                  </h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                      shift.impact === 'positive'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : shift.impact === 'negative'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {shift.impact}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {shift.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: TikTok Viral Signals */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Video className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                TikTok Viral & Audio Radar
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {briefing.viralTikTokSignals.length} Viral Opportunities
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {briefing.viralTikTokSignals.map((signal, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 transition-colors hover:border-rose-500/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                    {signal.trend}
                  </h4>
                  <span className="rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0">
                    High Velocity
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-[var(--color-text-muted)]">
                  {signal.metric}
                </p>
                <div className="mt-2 rounded-md bg-[var(--color-panel)] p-2.5 border border-[var(--color-border)]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] block mb-0.5">
                    Recommended Action:
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {signal.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items Checklist */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-[var(--color-brand)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Prioritized Daily Action Items
            </h3>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {actionItems.filter((a) => a.completed).length}/{actionItems.length} Completed
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {actionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleActionItem(item.id)}
              className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                item.completed
                  ? 'border-emerald-500/20 bg-emerald-500/5 opacity-75'
                  : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-brand)]/40'
              }`}
            >
              <div className="mt-0.5 text-[var(--color-brand)] shrink-0">
                {item.completed ? (
                  <CheckSquare className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Square className="h-4 w-4 text-[var(--color-text-muted)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    item.completed
                      ? 'line-through text-[var(--color-text-muted)]'
                      : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {item.task}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span>Assignee: <strong>{item.assignee}</strong></span>
                  <span>•</span>
                  <span
                    className={`font-semibold uppercase tracking-wider ${
                      item.priority === 'high'
                        ? 'text-rose-500'
                        : item.priority === 'medium'
                        ? 'text-amber-500'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
