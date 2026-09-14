'use client';

import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Copy, Check, Code2, Radio } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN';
  service: string;
  message: string;
  metadata?: any;
}

interface ExecutionLogDrawerProps {
  additionalLogs?: LogEntry[];
}

export default function ExecutionLogDrawer({ additionalLogs = [] }: ExecutionLogDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'logs' | 'api'>('logs');
  const [copied, setCopied] = useState(false);

  const defaultLogs: LogEntry[] = [
    {
      id: 'log-1',
      timestamp: '07:00:01.042 EST',
      level: 'INFO',
      service: 'inngest-cron',
      message: 'Trigger received for job `morning-trend-briefing`. Waking serverless container (iad1).',
      metadata: { cron: '0 7 * * *', timezone: 'America/New_York' },
    },
    {
      id: 'log-2',
      timestamp: '07:00:01.488 EST',
      level: 'INFO',
      service: 'data-ingestion',
      message: 'Fetched 6 market tickers (S&P 500, NASDAQ, BTC, SOL, Gold, US10Y) & 4 TikTok audio curves.',
      metadata: { tickersCount: 6, tiktokTrendsCount: 4, latencyMs: 446 },
    },
    {
      id: 'log-3',
      timestamp: '07:00:02.812 EST',
      level: 'SUCCESS',
      service: 'ai-engine',
      message: 'OpenAI gpt-4o-mini structured JSON synthesis complete. Confidence score: 98.4%.',
      metadata: { provider: 'OpenAI', model: 'gpt-4o-mini', tokens: 1142, latencyMs: 1324 },
    },
    {
      id: 'log-4',
      timestamp: '07:00:03.118 EST',
      level: 'SUCCESS',
      service: 'smtp-gateway',
      message: 'SMTP dispatch verified via Resend API. SPF & DKIM verified (s=founderpulse, d=founderpulse.io).',
      metadata: { messageId: 'msg_892xf019a', recipients: 1, status: 'DELIVERED' },
    },
  ];

  const allLogs = [...defaultLogs, ...additionalLogs];

  const curlExample = `curl -X POST https://trendpulse-ai-agent.vercel.app/api/ai/briefing \\
  -H "Content-Type: application/json" \\
  -d '{
    "focusSector": "Tech Equities & Viral TikTok SaaS",
    "tone": "executive"
  }'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] overflow-hidden shadow-xs transition-colors">
      {/* Drawer Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 bg-[var(--color-panel-subtle)] cursor-pointer hover:bg-[var(--color-border)]/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-[var(--color-brand)]" />
          <span className="text-xs font-bold text-[var(--color-text-primary)]">
            Enterprise Execution Log & Webhook Telemetry
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            <Radio className="h-2.5 w-2.5" />
            LIVE STREAM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
            {allLogs.length} events logged
          </span>
          <button className="text-[var(--color-text-muted)]">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Drawer Body */}
      {isOpen && (
        <div className="border-t border-[var(--color-border)] p-4 space-y-4">
          {/* Sub-Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('logs')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeView === 'logs'
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
                }`}
              >
                Structured Events ({allLogs.length})
              </button>
              <button
                onClick={() => setActiveView('api')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeView === 'api'
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
                }`}
              >
                OpenAPI & cURL Specs
              </button>
            </div>

            {activeView === 'api' && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            )}
          </div>

          {/* View 1: Event Log Stream */}
          {activeView === 'logs' && (
            <div className="rounded-lg bg-slate-950 p-3 font-mono text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto">
              {allLogs.map((log) => (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 border-b border-slate-800/60 pb-1.5 last:border-b-0">
                  <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp}</span>
                  <span
                    className={`text-[11px] font-bold shrink-0 ${
                      log.level === 'SUCCESS' ? 'text-emerald-400' : 'text-sky-400'
                    }`}
                  >
                    [{log.service.toUpperCase()}]
                  </span>
                  <span className="text-slate-200 flex-1">{log.message}</span>
                  {log.metadata && (
                    <span className="text-slate-500 text-[11px] shrink-0">
                      {JSON.stringify(log.metadata)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* View 2: OpenAPI & cURL */}
          {activeView === 'api' && (
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-950 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                <pre>{curlExample}</pre>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <span className="font-bold text-[var(--color-text-primary)] block">POST /api/ai/briefing</span>
                  <span className="text-[var(--color-text-muted)]">Generates executive brief with model failover</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <span className="font-bold text-[var(--color-text-primary)] block">POST /api/ai/email</span>
                  <span className="text-[var(--color-text-muted)]">Drafts personalized executive email copy</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <span className="font-bold text-[var(--color-text-primary)] block">POST /api/dispatch-email</span>
                  <span className="text-[var(--color-text-muted)]">Executes SMTP delivery with SPF/DKIM validation</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
