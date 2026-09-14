# Product Requirements Document (PRD)

## Project: TrendPulse AI Agent (trendpulse-ai-agent)
**Autonomous Multi-Channel Intelligence & Morning Executive Briefing Dispatcher**  
**Client:** Aubrey (Atlanta, GA) · **Budget:** $200.00 Fixed · **Delivery Window:** 3–5 Days

---

### 1. Executive Summary & Problem Statement
Modern digital operators, traders, and creators operate in an environment of extreme information velocity. Manually tracking financial chart breakouts (S&P 500, NASDAQ, Crypto), scraping viral TikTok sounds/hashtags, and monitoring Google search query spikes across separate apps every morning consumes 90+ minutes of disjointed manual effort. Furthermore, raw social data is noisy and financial data is volatile—synthesizing them into actionable daily directives and formatting executive emails for content squads, trading partners, or personal review is high-friction and prone to inconsistency.

**TrendPulse AI** is an autonomous daily intelligence agent that solves this problem end-to-end:
1. **Multi-Source Ingestion**: Continuously monitors financial market charts (equities, crypto, commodities), TikTok viral sound and hashtag adoption curves, and search trend breakouts.
2. **Automated Morning AI Synthesis**: Runs an automated 7:00 AM EST briefing engine (OpenAI GPT-4o-mini with instant Google Gemini 2.0 Flash fallback) that transforms disparate data into a prioritized, high-signal executive briefing.
3. **One-Click & Autonomous Email Dispatch**: Features an integrated SMTP/Resend delivery hub with recipient list management, rich HTML previewing, human-in-the-loop tone refinement, and automated morning delivery.

---

### 2. Defensibility Hook & Core Architectural Principles

> **Client's Core Requirement:** *"AI agent will need to be able to monitor charts, tiktok and trends and give me a report each morning. I would also like the AI agent to be able to take information and then send emails."*

- **Principle 1: Dual-Provider High-Availability AI**: Never rely on a single LLM provider. The agent orchestrates OpenAI `gpt-4o-mini` as primary with sub-second Google Gemini `gemini-2.0-flash` fallback, plus a deterministic offline rule engine so the 7:00 AM dispatch never misses a deadline.
- **Principle 2: Signal-to-Noise Filtering**: Raw TikTok trends contain thousands of low-value spikes. The ingestion pipeline scores trends on a composite index: *View Velocity (24h Δ) × Audio Adoption × Sentiment Alignment*.
- **Principle 3: Human-in-the-Loop Safe Emailing**: While briefings are generated automatically at 7:00 AM, the email dispatcher provides both autonomous scheduled dispatch and an interactive "Review & Send" modal to edit copy, adjust recipient lists, and review spam-check scores before transmission.

---

### 3. Scope Definition

#### In Scope (Phase 0 Demo + Production Delivery)
- **Real-Time Financial Charts Radar**: Ticker tracking (S&P 500, NASDAQ, BTC, SOL, Gold, US 10Y Yield) with 24h percentage changes, RSI momentum indicators, volume velocity, and SVG sparklines.
- **TikTok Viral Radar**: Trending hashtags (`#MicroSaaS`, `#AIAgents`, `#ChartPattern`, `#MorningRoutineCEO`), viral sound identifiers, view counts, 24h acceleration rate, and audience sentiment categorization.
- **Web & Search Trends Monitor**: Google/X search breakout queries, regional index, and momentum ratings.
- **Executive Morning Briefing Generator**: Automated synthesis producing Executive Summary, Market Volatility Signals, Viral Content Opportunities, and High-Priority Action Items.
- **Live AI Refinement & Custom Command Bar**: Instant LLM prompt execution to re-analyze data, modify tone (Executive / Trader / Casual Creator), or focus on specific sectors.
- **Email Dispatch & Distribution Engine**: Support for multiple audience lists (Executive, Content Squad, Trading Desk), rich email preview, editable draft pane, and live simulated/SMTP dispatch logging.
- **Scheduler & Trigger Configuration**: Cron schedule management (Default 07:00 AM America/New_York), manual instant trigger, webhook telemetry.

#### Out of Scope (Future Roadmap)
- Native mobile push notifications (iOS/Android APNs).
- Direct automated trading execution via broker APIs (Alpaca/Interactive Brokers).
- Video rendering / automated TikTok video publishing.

---

### 4. System Architecture & Data Flow

```
[ Financial APIs / Coingecko / TradingView Webhooks ]
[ TikTok Business Trends API / Creative Center Scraper ] ───► [ Ingestion & Normalization Pipeline ]
[ Google Trends / X Real-Time Search Feed ]                          │
                                                                    ▼
                                                       [ TrendPulse Aggregator ]
                                                                    │
                 ┌──────────────────────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                                     ▼
    [ Real-Time Cockpit UI ]                                                             [ 7:00 AM Cron Trigger ]
(Interactive Charts, Audio Radar)                                                                      │
                 │                                                                                     ▼
                 │                                                                    [ Dual-Provider AI Engine ]
                 │                                                                 (OpenAI gpt-4o-mini + Gemini Flash)
                 │                                                                                     │
                 ▼                                                                                     ▼
    [ Human Review & Tone Editor ] ──────────────────────────────────────────────► [ Morning Executive Briefing ]
                 │                                                                                     │
                 └──────────────────────────────────────────────────┬──────────────────────────────────┘
                                                                    ▼
                                                       [ Email Dispatch Engine ]
                                                   (Resend / Custom Domain SMTP)
                                                                    │
                                                                    ▼
                                                 [ Recipient Inboxes (Aubrey / Team) ]
```

---

### 5. Data Models & Schemas

#### Trend Item (Financial / Social / Search)
```typescript
interface TrendItem {
  id: string;
  category: 'market' | 'tiktok' | 'search';
  title: string;
  symbolOrTag: string;
  metric: string; // e.g. "$91,450.00" or "48.2M views"
  change24h: number; // e.g. +3.42%
  velocityScore: number; // 0-100
  sentiment: 'bullish' | 'bearish' | 'neutral' | 'viral';
  summary: string;
  metadata?: {
    audioName?: string;
    rsi?: number;
    volume24h?: string;
    searchRegion?: string;
  };
}
```

#### Morning Briefing Document
```typescript
interface MorningBriefing {
  id: string;
  date: string; // YYYY-MM-DD
  generatedAt: string;
  headline: string;
  executiveSummary: string;
  keyMarketShifts: string[];
  viralOpportunities: string[];
  actionItems: string[];
  confidenceScore: number; // e.g. 96%
  aiMetadata: {
    provider: 'openai' | 'gemini' | 'deterministic';
    model: string;
    latencyMs: number;
  };
  emailStatus: 'draft' | 'queued' | 'dispatched';
}
```

#### Email Dispatch Record
```typescript
interface EmailDispatchRecord {
  id: string;
  briefingId: string;
  recipients: string[];
  subject: string;
  sentAt: string;
  status: 'DELIVERED' | 'QUEUED' | 'OPENED';
  messageId: string;
  smtpServer: string;
}
```

---

### 6. Acceptance Criteria (Verified Against Aubrey's Brief)

1. **Chart & Market Monitoring**: Real-time display of crypto and equity tickers with 24h percentage swings, volume spikes, and momentum sparklines.
2. **TikTok Trend Tracking**: Identification of viral hashtags, trending audio tracks, view velocity, and audience engagement metrics.
3. **Automated Morning Briefing**: Daily structured intelligence digest with clear separation of market shifts, viral content angles, and action checklists.
4. **Interactive AI Refinement**: Live functional API route executing OpenAI/Gemini to regenerate or customize the briefing on demand.
5. **Email Dispatch System**: Dedicated preview and transmission hub capable of firing formatted morning digests to designated email addresses with delivery verification logs.
6. **Production Polish**: 100% responsive, dark/light theme aware, strict typography scale (≥12px), zero broken controls, and live health telemetry.
EOF