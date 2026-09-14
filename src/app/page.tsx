'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MetricBentoStrip from '@/components/MetricBentoStrip';
import BriefingViewer from '@/components/BriefingViewer';
import TrendRadar from '@/components/TrendRadar';
import EmailDispatcher from '@/components/EmailDispatcher';
import SchedulerConfig from '@/components/SchedulerConfig';
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

  // Sync dark class on html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Real AI Agent Synthesis Trigger
  const handleTriggerAgent = async (
    focusSector: string = 'Tech Equities & Viral TikTok SaaS',
    tone: 'executive' | 'trader' | 'creator' = 'executive'
  ) => {
    setIsRunningAgent(true);
    try {
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
        setLastRunTime('Just now');
        setActiveTab('briefing');
      }
    } catch (err) {
      console.error('Failed to trigger AI agent:', err);
    } finally {
      setIsRunningAgent(false);
    }
  };

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
          {/* Tab Navigation Pill Bar */}
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
                <span>Morning Executive Briefing</span>
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
                <span>Live Trend Feeds & Charts</span>
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
                <span>Email Dispatcher & Review</span>
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
                <span>Agent Schedule & Controls</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono">
              <span>Status: Synchronized</span>
              <span>•</span>
              <span>Atlanta (EST)</span>
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
        </div>
      </main>

      {/* Footer (Engineering Specs, Zero Proposal Copy) */}
      <Footer />
    </div>
  );
}
