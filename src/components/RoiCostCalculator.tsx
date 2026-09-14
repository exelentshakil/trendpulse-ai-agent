'use client';

import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Cpu,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export default function RoiCostCalculator() {
  const [runsPerDay, setRunsPerDay] = useState(1);
  const [hourlyWage, setHourlyWage] = useState(60);
  const [manualMinutesPerDay, setManualMinutesPerDay] = useState(45);

  // Model pricing calculations (gpt-4o-mini: $0.15/1M input, $0.60/1M output)
  const avgInputTokens = 842;
  const avgOutputTokens = 319;
  const costPerRun = (avgInputTokens * 0.00000015) + (avgOutputTokens * 0.0000006); // ~$0.000318

  const monthlyRuns = runsPerDay * 30;
  const monthlyApiCost = monthlyRuns * costPerRun;
  const monthlyHoursSaved = (manualMinutesPerDay / 60) * monthlyRuns;
  const monthlyGrossSavings = monthlyHoursSaved * hourlyWage;
  const netMonthlyRoi = monthlyGrossSavings - monthlyApiCost;
  const annualNetSavings = netMonthlyRoi * 12;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Calculator className="h-4 w-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Operational ROI & API Token Cost Calculator
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              <Sparkles className="h-3 w-3" />
              CFO Closer
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            Live unit economics: Compare autonomous agent API burn vs manual executive research hours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            {Math.round((monthlyGrossSavings / Math.max(monthlyApiCost, 0.001)) * 100).toLocaleString()}% ROI
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Input Sliders */}
        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-[var(--color-text-secondary)]">Execution Frequency:</span>
              <span className="text-[var(--color-brand)] font-mono font-bold">{runsPerDay} {runsPerDay === 1 ? 'run/day (07:00 AM EST)' : `${runsPerDay} runs/day`}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={runsPerDay}
              onChange={(e) => setRunsPerDay(parseInt(e.target.value))}
              className="w-full accent-[var(--color-brand)] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
              <span>1x (Morning Brief)</span>
              <span>2x (Open & Close)</span>
              <span>5x (Continuous Pulse)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-[var(--color-text-secondary)]">Manual Research Time Saved per Run:</span>
              <span className="text-[var(--color-brand)] font-mono font-bold">{manualMinutesPerDay} minutes</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={manualMinutesPerDay}
              onChange={(e) => setManualMinutesPerDay(parseInt(e.target.value))}
              className="w-full accent-[var(--color-brand)] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
              <span>15 min</span>
              <span>45 min (Standard)</span>
              <span>90 min (Deep Dive)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-[var(--color-text-secondary)]">Executive / Analyst Hourly Rate:</span>
              <span className="text-[var(--color-brand)] font-mono font-bold">${hourlyWage} / hr</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="10"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(parseInt(e.target.value))}
              className="w-full accent-[var(--color-brand)] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
              <span>$30/hr</span>
              <span>$60/hr (Mid-Market)</span>
              <span>$150/hr (C-Suite)</span>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1 text-[11px] text-[var(--color-text-muted)] font-mono">
            <div>• Model: OpenAI gpt-4o-mini ($0.15/1M in, $0.60/1M out)</div>
            <div>• Average token payload: 1,161 tokens/briefing</div>
            <div>• Serverless compute: Vercel / Inngest (100% Free Tier Eligible)</div>
          </div>
        </div>

        {/* Right: Calculated Metrics Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Box 1: Monthly API Cost */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2">
              <span>Monthly API Cost</span>
              <Cpu className="h-4 w-4 text-violet-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                ${monthlyApiCost < 0.01 ? '< $0.01' : monthlyApiCost.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-500 font-mono font-semibold">
                ${(costPerRun * 100).toFixed(4)}¢ / briefing
              </span>
            </div>
          </div>

          {/* Box 2: Monthly Time Saved */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2">
              <span>Monthly Time Saved</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                {monthlyHoursSaved.toFixed(1)} hrs
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                {monthlyRuns} automated briefings
              </span>
            </div>
          </div>

          {/* Box 3: Net Monthly Savings */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 mb-2">
              <span className="font-semibold">Net Monthly Value</span>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                ${Math.round(netMonthlyRoi).toLocaleString()}
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                After API costs deducted
              </span>
            </div>
          </div>

          {/* Box 4: Annual Net Benefit */}
          <div className="rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-brand)] mb-2">
              <span className="font-semibold">Annualized Savings</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--color-brand)]" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                ${Math.round(annualNetSavings).toLocaleString()}
              </div>
              <span className="text-[11px] text-[var(--color-brand)] font-mono font-semibold">
                Turnkey Automation Yield
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
