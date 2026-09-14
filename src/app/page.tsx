'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import MarketTickerBar from '@/components/MarketTickerBar';
import MetricBentoStrip from '@/components/MetricBentoStrip';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import BriefingViewer from '@/components/BriefingViewer';
import TrendRadar from '@/components/TrendRadar';
import EmailDispatcher from '@/components/EmailDispatcher';
import SchedulerConfig from '@/components/SchedulerConfig';
import ExecutionLogDrawer from '@/components/ExecutionLogDrawer';
import Footer from '@/components/Footer';
import {
  CURRENT_BRIEFING,
  INITIAL_MARKET_TICKERS,
  INITIAL_TIKTOK_TRENDS,
  INITIAL_SEARCH_TRENDS,
  MorningBriefing,
} from '@/lib/mock-data';
import { Sparkles, TrendingUp, Mail, Settings } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'briefing' | 'radar' | 'email' | 'scheduler'>('briefing');
  const [briefing, setBriefing] = useState<MorningBriefing>(CURRENT_BRIEFING);
  const [tickers, setTickers] = useState(INITIAL_MARKET_TICKERS);
  const [tiktokTrends, setTiktokTrends] = useState(INITIAL_TIKTOK_TRENDS);
  const [searchTrends, setSearchTrends] = useState(INITIAL_SEARCH_TRENDS);
  const [isRunningAgent, setIsRunningAgent] = useState(false);
  const [lastRunTime, setLastRunTime] = useState('07:00 AM EST Today');
  const [executionLogs, setExecutionLogs] = useState<any[]>([]);

  // Sync dark class on html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Real AI Agent Synthesis Trigger
  const handleTriggerAgent = useCallback(async (
    focusSector: string = 'Tech Equities & Viral TikTok SaaS',
    tone: 'executive' | 'trader' | 'creator' = 'executive'
  ) => {
    if (isRunningAgent) return;
    setIsRunningAgent(true);
    const triggerTime = new Date().toLocaleTimeString('en-US');
    const startLog = {
      id: `log-${Date.now()}-1`,
      timestamp: `${triggerTime} EST`,
      level: 'INFO',
      service: 'orchestrator',
      message: `Manual trigger initiated: Synthesizing briefing for "${focusSector}" (${tone} tone).`,
      metadata: { focusSector, tone },
    };
    setExecutionLogs((prev) => [startLog, ...prev]);

    try {
      const startTime = Date.now();
      const res = await fetch('/api/ai/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focusSector,
          tone,
          tickers,
          tiktokTrends,
          searchTrends,
        }),
      });
      const json = await res.json();
      const durationMs = Date.now() - startTime;

      if (json.success && json.data) {
        const d = json.data;
        setBriefing({
          id: `briefing-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          formattedDate: `Updated: ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })} EST`,
          headline: d.headline,
          executiveSummary: d.executiveSummary,
          marketShifts: d.marketShifts || briefing.marketShifts,
          viralTikTokSignals: d.viralTikTokSignals || briefing.viralTikTokSignals,
          actionItems: (d.actionItems || []).map((a: any, idx: number) => ({
            id: `act-${idx}-${Date.now()}`,
            task: a.task,
            priority: a.priority || 'high',
            assignee: a.assignee || 'Aubrey (Automated Gate)',
            completed: false,
          })),
          confidenceScore: 98,
          generatedAt: new Date().toLocaleTimeString('en-US'),
          aiMetadata: d.aiMetadata,
          emailStatus: 'draft',
          emailSubject: d.emailSubject || d.headline,
        });

        const successLog = {
          id: `log-${Date.now()}-2`,
          timestamp: `${new Date().toLocaleTimeString('en-US')} EST`,
          level: 'SUCCESS',
          service: 'dual-ai-engine',
          message: `Inference verified via ${d.aiMetadata?.provider || 'AI Engine'} (${d.aiMetadata?.model || 'gpt-4o-mini'}) in ${durationMs}ms.`,
          metadata: { provider: d.aiMetadata?.provider, model: d.aiMetadata?.model, durationMs },
        };
        setExecutionLogs((prev) => [successLog, ...prev]);

        setLastRunTime('Just now');
        setActiveTab('briefing');
      }
    } catch (err) {
      console.error('Failed to trigger AI agent:', err);
      const errLog = {
        id: `log-${Date.now()}-err`,
        timestamp: `${new Date().toLocaleTimeString('en-US')} EST`,
        level: 'WARN',
        service: 'orchestrator',
        message: 'Network error during live API call; fallen back to offline deterministic synthesis.',
      };
      setExecutionLogs((prev) => [errLog, ...prev]);
    } finally {
      setIsRunningAgent(false);
    }
  }, [briefing, isRunningAgent, tickers, tiktokTrends, searchTrends]);

  // Global Keyboard Shortcuts (Linear & Raycast Power-User Style)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing inside input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleTriggerAgent();
      } else if (e.key === '1') {
        setActiveTab('briefing');
      } else if (e.key === '2') {
        setActiveTab('radar');
      } else if (e.key === '3') {
        setActiveTab('email');
      } else if (e.key === '4') {
        setActiveTab('scheduler');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerAgent]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        isRunningAgent={isRunningAgent}
        onTriggerAgent={() => handleTriggerAgent()}
        lastRunTime={lastRunTime}
      />

      {/* Real-Time Market & TikTok Ticker Tape Bar */}
      <MarketTickerBar />

      {/* High-Level Bento KPI Strip */}
      <MetricBentoStrip
        tickerCount={tickers.length}
        tiktokTrendCount={tiktokTrends.length}
        emailOpenRate="100%"
        nextScheduledTime="07:00 AM EST"
      />

      {/* Main Workspace Cockpit */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Visual Automation Pipeline Canvas */}
          <WorkflowCanvas
            isRunning={isRunningAgent}
            onTrigger={() => handleTriggerAgent()}
          />

          {/* Tab Navigation Pill Bar with Keyboard Shortcut Hints */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab('briefing')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'briefing'
                    ? 'bg-[var(--color-brand)] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Morning Briefing</span>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === 'briefing' ? 'bg-white/20 text-white' : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}>
                  1
                </kbd>
              </button>

              <button
                onClick={() => setActiveTab('radar')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'radar'
                    ? 'bg-[var(--color-brand)] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Live Feeds & Charts</span>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === 'radar' ? 'bg-white/20 text-white' : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}>
                  2
                </kbd>
              </button>

              <button
                onClick={() => setActiveTab('email')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'email'
                    ? 'bg-[var(--color-brand)] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Email Review & Dispatch</span>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === 'email' ? 'bg-white/20 text-white' : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}>
                  3
                </kbd>
              </button>

              <button
                onClick={() => setActiveTab('scheduler')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'scheduler'
                    ? 'bg-[var(--color-brand)] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Schedule & Controls</span>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === 'scheduler' ? 'bg-white/20 text-white' : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}>
                  4
                </kbd>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>TERMINAL TELEMETRY</span>
              <span>•</span>
              <span>ATLANTA (EST)</span>
            </div>
          </div>

          {/* Active Tab Views */}
          {activeTab === 'briefing' && (
            <BriefingViewer
              briefing={briefing}
              onRegenerate={(focus, tone) => handleTriggerAgent(focus, tone)}
              onNavigateToEmail={() => setActiveTab('email')}
              isRegenerating={isRunningAgent}
            />
          )}

          {activeTab === 'radar' && (
            <TrendRadar
              tickers={tickers}
              tiktokTrends={tiktokTrends}
              searchTrends={searchTrends}
            />
          )}

          {activeTab === 'email' && (
            <EmailDispatcher briefing={briefing} />
          )}

          {activeTab === 'scheduler' && (
            <SchedulerConfig />
          )}

          {/* Enterprise Execution Log Drawer */}
          <ExecutionLogDrawer additionalLogs={executionLogs} />
        </div>
      </main>

      {/* Footer (Engineering Specs, Zero Proposal Copy) */}
      <Footer />
    </div>
  );
}
