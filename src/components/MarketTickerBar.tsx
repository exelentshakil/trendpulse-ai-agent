'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Flame, Zap, ShieldCheck } from 'lucide-react';

export default function MarketTickerBar() {
  const tickerItems = [
    { label: 'S&P 500', value: '5,648.40', change: '+0.42%', up: true, type: 'market' },
    { label: 'NASDAQ', value: '17,683.98', change: '+0.65%', up: true, type: 'market' },
    { label: 'BTC/USD', value: '$64,280', change: '+2.41%', up: true, type: 'crypto' },
    { label: 'SOL/USD', value: '$148.50', change: '+4.80%', up: true, type: 'crypto' },
    { label: 'GOLD (OZ)', value: '$2,514.80', change: '+0.32%', up: true, type: 'commodity' },
    { label: '10Y YIELD', value: '3.65%', change: '-0.04%', up: false, type: 'rates' },
    { label: '#MicroSaaS', value: '14.8M Views', change: '+340%', up: true, type: 'tiktok' },
    { label: '#AIAgents', value: '8.2M Views', change: '+210%', up: true, type: 'tiktok' },
    { label: '#QuantTrading', value: '3.9M Views', change: '+185%', up: true, type: 'tiktok' },
    { label: '07:00 AM CRON', value: 'Inngest Engine', change: 'ARMED', up: true, type: 'cron' },
  ];

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]/80 backdrop-blur-xs py-1.5 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)] font-bold shrink-0 tracking-wider uppercase text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-ping" />
            <span>TERMINAL FEEDS</span>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                {item.type === 'tiktok' ? (
                  <Flame className="h-3 w-3 text-rose-500" />
                ) : item.type === 'cron' ? (
                  <Zap className="h-3 w-3 text-amber-500" />
                ) : item.up ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-rose-500" />
                )}
                <span className="font-semibold text-[var(--color-text-secondary)]">{item.label}</span>
                <span className="text-[var(--color-text-primary)] font-bold">{item.value}</span>
                <span
                  className={`text-[11px] font-bold ${
                    item.type === 'cron'
                      ? 'text-amber-500'
                      : item.up
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                  }`}
                >
                  {item.change}
                </span>
                {idx < tickerItems.length - 1 && (
                  <span className="text-[var(--color-border)] ml-2">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
