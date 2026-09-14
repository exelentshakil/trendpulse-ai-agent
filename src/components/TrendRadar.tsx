'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Video,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ExternalLink,
  Music,
  BarChart3,
  Filter,
} from 'lucide-react';
import {
  MarketTicker,
  TikTokTrend,
  SearchTrend,
} from '@/lib/mock-data';

interface TrendRadarProps {
  tickers: MarketTicker[];
  tiktokTrends: TikTokTrend[];
  searchTrends: SearchTrend[];
}

export default function TrendRadar({
  tickers,
  tiktokTrends,
  searchTrends,
}: TrendRadarProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'equities' | 'crypto' | 'commodities'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTickers = tickers.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. FINANCIAL MARKET RADAR & CHARTS */}
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Financial Market Charts & Momentum Radar
              </h3>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Real-time multi-asset technical telemetry: 24h percentage swings, RSI gauges, and volume breakouts.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-0.5">
              {(['all', 'equities', 'crypto', 'commodities'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-[var(--color-brand)] text-white shadow-xs'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickers.map((ticker) => {
            const isPositive = ticker.change24h >= 0;
            // Generate SVG path from sparkline points
            const min = Math.min(...ticker.sparkline);
            const max = Math.max(...ticker.sparkline);
            const range = max - min || 1;
            const points = ticker.sparkline
              .map((val, idx) => {
                const x = (idx / (ticker.sparkline.length - 1)) * 120;
                const y = 36 - ((val - min) / range) * 30;
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <div
                key={ticker.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 transition-all hover:border-[var(--color-brand)]/40 hover:shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                      {ticker.symbol}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                      {ticker.name}
                    </h4>
                  </div>
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-bold font-mono whitespace-nowrap shrink-0 ${
                      isPositive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {isPositive ? '+' : ''}
                    {ticker.change24h}%
                  </span>
                </div>

                {/* Price and Sparkline Row */}
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                      {ticker.price}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                      <span>Vol: <strong>{ticker.volume24h}</strong></span>
                      <span>•</span>
                      <span>RSI: <strong>{ticker.rsi}</strong></span>
                    </div>
                  </div>

                  {/* Sparkline Graphic */}
                  <div className="h-9 w-28 shrink-0">
                    <svg viewBox="0 0 120 40" className="h-full w-full overflow-visible">
                      <polyline
                        fill="none"
                        stroke={isPositive ? '#10b981' : '#f43f5e'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    </svg>
                  </div>
                </div>

                {/* Market Signal Pill */}
                <div className="mt-3 border-t border-[var(--color-border)] pt-2 flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)] font-medium">Signal:</span>
                  <span className="font-semibold text-[var(--color-brand)] truncate ml-2">
                    {ticker.signal}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. TIKTOK VIRAL INGESTION RADAR */}
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                TikTok Viral Radar & Trending Audio Feed
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Scrapes high-velocity audio curves, breakout creator hashtags, and actionable B2B/consumer hooks.
              </p>
            </div>
          </div>
          <span className="rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap shrink-0">
            {tiktokTrends.length} Live Audio Spikes
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiktokTrends.map((trend) => (
            <div
              key={trend.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 transition-all hover:border-rose-500/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-text-muted)] whitespace-nowrap shrink-0">
                    {trend.category}
                  </span>
                  <h4 className="mt-1 text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                    {trend.tag}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
                    {trend.views}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    +{trend.viewsDelta24h}% (24h)
                  </span>
                </div>
              </div>

              {/* Trending Audio Pill */}
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--color-panel)] p-2 border border-[var(--color-border)]">
                <Music className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span className="text-xs font-medium text-[var(--color-text-secondary)] truncate">
                  {trend.audioName}
                </span>
              </div>

              {/* Key Hook & Actionable Angle */}
              <div className="mt-3 space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-[var(--color-text-muted)]">Viral Hook: </span>
                  <span className="text-[var(--color-text-secondary)]">{trend.keyHook}</span>
                </div>
                <div className="rounded-md bg-rose-500/5 p-2 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                  <span className="font-bold">Content Action: </span>
                  {trend.actionableAngle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GOOGLE & SOCIAL SEARCH BREAKOUTS */}
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Web & Search Trends (Google, X & Reddit)
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Breakout search volume spikes, geographical intent clusters, and commercial interest indicators.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchTrends.map((st) => (
            <div
              key={st.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {st.source}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {st.volumeSpike}
                </span>
              </div>
              <h4 className="mt-2 text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                "{st.query}"
              </h4>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] font-mono">
                Region: {st.region}
              </p>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-2">
                {st.takeaway}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
