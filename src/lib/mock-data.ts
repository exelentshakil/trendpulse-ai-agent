export interface MarketTicker {
  id: string;
  symbol: string;
  name: string;
  category: 'equities' | 'crypto' | 'commodities' | 'rates';
  price: string;
  rawPrice: number;
  change24h: number;
  volume24h: string;
  rsi: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signal: string;
  sparkline: number[]; // 10 points for SVG sparkline
}

export interface TikTokTrend {
  id: string;
  tag: string;
  category: string;
  views: string;
  viewsDelta24h: number; // percentage
  audioName: string;
  creatorVelocity: string; // e.g. "18.4k videos/day"
  sentiment: 'viral' | 'bullish' | 'high-engagement' | 'speculative';
  keyHook: string;
  actionableAngle: string;
}

export interface SearchTrend {
  id: string;
  query: string;
  source: 'Google Trends' | 'X (Twitter)' | 'Reddit Trends';
  volumeSpike: string;
  region: string;
  sentiment: 'Positive' | 'Neutral' | 'Cautious';
  takeaway: string;
}

export interface MorningBriefing {
  id: string;
  date: string;
  formattedDate: string;
  headline: string;
  executiveSummary: string;
  marketShifts: {
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  viralTikTokSignals: {
    trend: string;
    metric: string;
    recommendation: string;
  }[];
  actionItems: {
    id: string;
    task: string;
    priority: 'high' | 'medium' | 'routine';
    assignee: string;
    completed: boolean;
  }[];
  confidenceScore: number;
  generatedAt: string;
  aiMetadata: {
    provider: string;
    model: string;
    latencyMs: number;
  };
  emailStatus: 'sent' | 'queued' | 'draft';
  emailSubject: string;
}

export interface EmailRecipientGroup {
  id: string;
  name: string;
  description: string;
  emails: string[];
  active: boolean;
}

export interface EmailLog {
  id: string;
  timestamp: string;
  subject: string;
  recipientCount: number;
  recipientsPreview: string;
  status: 'DELIVERED' | 'QUEUED' | 'OPENED';
  messageId: string;
  openRate: string;
}

// Initial Live Market Tickers
export const INITIAL_MARKET_TICKERS: MarketTicker[] = [
  {
    id: 'sp500',
    symbol: '^GSPC',
    name: 'S&P 500 Index',
    category: 'equities',
    price: '5,864.20',
    rawPrice: 5864.20,
    change24h: 0.88,
    volume24h: '$3.9B',
    rsi: 62.4,
    sentiment: 'bullish',
    signal: 'Breakout above 20-day EMA',
    sparkline: [45, 48, 46, 52, 55, 54, 58, 62, 60, 68],
  },
  {
    id: 'nasdaq',
    symbol: '^NDX',
    name: 'NASDAQ 100',
    category: 'equities',
    price: '20,492.15',
    rawPrice: 20492.15,
    change24h: 1.24,
    volume24h: '$5.2B',
    rsi: 68.1,
    sentiment: 'bullish',
    signal: 'Semiconductor & Cloud momentum strong',
    sparkline: [40, 42, 45, 49, 53, 58, 61, 65, 70, 75],
  },
  {
    id: 'btc',
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'crypto',
    price: '$91,840.00',
    rawPrice: 91840,
    change24h: 3.65,
    volume24h: '$44.1B',
    rsi: 71.5,
    sentiment: 'bullish',
    signal: 'Institutional net ETF inflow +$680M',
    sparkline: [50, 52, 51, 56, 62, 65, 63, 72, 78, 85],
  },
  {
    id: 'sol',
    symbol: 'SOL/USD',
    name: 'Solana',
    category: 'crypto',
    price: '$219.50',
    rawPrice: 219.5,
    change24h: 6.42,
    volume24h: '$7.8B',
    rsi: 74.2,
    sentiment: 'bullish',
    signal: 'DEX daily volume reaches 30-day peak',
    sparkline: [35, 38, 42, 48, 55, 62, 68, 75, 82, 90],
  },
  {
    id: 'gold',
    symbol: 'XAU/USD',
    name: 'Spot Gold',
    category: 'commodities',
    price: '$2,688.40',
    rawPrice: 2688.4,
    change24h: -0.22,
    volume24h: '$12.4B',
    rsi: 54.0,
    sentiment: 'neutral',
    signal: 'Consolidating near record highs',
    sparkline: [60, 59, 61, 62, 60, 58, 59, 57, 58, 56],
  },
  {
    id: 'tnx',
    symbol: '^TNX',
    name: 'US 10-Yr Treasury',
    category: 'rates',
    price: '4.14%',
    rawPrice: 4.14,
    change24h: -1.19,
    volume24h: 'Yield',
    rsi: 48.6,
    sentiment: 'bullish',
    signal: 'Easing yields providing tailwind to risk assets',
    sparkline: [65, 64, 62, 60, 58, 59, 56, 54, 52, 48],
  },
];

// Initial TikTok Viral Trends
export const INITIAL_TIKTOK_TRENDS: TikTokTrend[] = [
  {
    id: 'tt-1',
    tag: '#MicroSaaS & #AIAgents',
    category: 'Tech & Automation',
    views: '54.8M',
    viewsDelta24h: 188,
    audioName: 'Original Audio - TechOperatorHQ (14.2k videos)',
    creatorVelocity: '16.4k clips/day',
    sentiment: 'viral',
    keyHook: 'Showcasing autonomous AI agents that run client reporting while founders sleep.',
    actionableAngle: 'Post breakdown of multi-agent daily workflows to capture rising B2B search traffic.',
  },
  {
    id: 'tt-2',
    tag: '#MarketBreakout & #ChartPattern',
    category: 'Finance & Trading',
    views: '32.1M',
    viewsDelta24h: 94,
    audioName: 'Cyber Synth Phonk 2026 - TrendBeat',
    creatorVelocity: '9.8k clips/day',
    sentiment: 'high-engagement',
    keyHook: 'Technical analysis tutorials highlighting liquidity sweeps before crypto moves.',
    actionableAngle: 'Clip Morning Briefing chart takeaways into 15-second visual carousels.',
  },
  {
    id: 'tt-3',
    tag: '#MorningRoutineCEO',
    category: 'Lifestyle & Productivity',
    views: '76.4M',
    viewsDelta24h: 46,
    audioName: 'Lofi Coffee Morning Vibe - RelaxAudio',
    creatorVelocity: '24.1k clips/day',
    sentiment: 'high-engagement',
    keyHook: 'High-performing executives replacing manual news reading with automated 7 AM email digests.',
    actionableAngle: 'High resonance format. Perfect user persona testimonial template.',
  },
  {
    id: 'tt-4',
    tag: '#SideHustleStack',
    category: 'Entrepreneurship',
    views: '112.5M',
    viewsDelta24h: 135,
    audioName: 'Money Moving Fast - Commercial Sound',
    creatorVelocity: '41.2k clips/day',
    sentiment: 'viral',
    keyHook: 'Curated 3-tool stacks that replace a 4-person marketing & intelligence team.',
    actionableAngle: 'Position automated trend monitoring as the #1 competitive moat for solo operators.',
  },
];

// Web & Search Trends
export const INITIAL_SEARCH_TRENDS: SearchTrend[] = [
  {
    id: 'st-1',
    query: 'Autonomous AI agents daily email reporting',
    source: 'Google Trends',
    volumeSpike: '+420%',
    region: 'United States (Southeast / Atlanta / Austin)',
    sentiment: 'Positive',
    takeaway: 'Strong commercial intent from agency owners and executive teams seeking plug-and-play workflows.',
  },
  {
    id: 'st-2',
    query: 'Bitcoin ETF institutional net inflow record',
    source: 'X (Twitter)',
    volumeSpike: '+240%',
    region: 'Global',
    sentiment: 'Positive',
    takeaway: 'Bullish macro momentum driving secondary retail interest in crypto and tech equities.',
  },
  {
    id: 'st-3',
    query: 'TikTok Creator Rewards Program 2026 payout rules',
    source: 'Reddit Trends',
    volumeSpike: '+165%',
    region: 'North America',
    sentiment: 'Cautious',
    takeaway: 'Creators pivoting towards original voiceovers and verified data charts to avoid unoriginal content penalties.',
  },
];

// Email Distribution Lists
export const INITIAL_RECIPIENT_GROUPS: EmailRecipientGroup[] = [
  {
    id: 'grp-executive',
    name: 'Executive & Founder Inbox',
    description: 'Primary morning briefing for Aubrey and executive decision-makers',
    emails: ['aubrey@founderpulse.io', 'aubrey.exec@gmail.com'],
    active: true,
  },
  {
    id: 'grp-content',
    name: 'Marketing & TikTok Content Squad',
    description: 'Viral trends, audio cues, and hooks for immediate daily production',
    emails: ['content-lead@founderpulse.io', 'video.editors@creativehub.agency'],
    active: true,
  },
  {
    id: 'grp-trading',
    name: 'Trading & Asset Strategy Desk',
    description: 'Market tickers, RSI levels, and institutional volume breakout alerts',
    emails: ['trading-desk@alphacapital.internal', 'research@quantgroup.org'],
    active: false,
  },
];

// Recent Email Dispatch Logs
export const INITIAL_EMAIL_LOGS: EmailLog[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 07:00 AM EST',
    subject: 'Morning Intelligence: Tech Equities Surge, BTC Holds $91k & #MicroSaaS TikTok Breakout',
    recipientCount: 2,
    recipientsPreview: 'aubrey@founderpulse.io, aubrey.exec@gmail.com',
    status: 'DELIVERED',
    messageId: 'msg_98df892a01f4c7',
    openRate: '100% (Opened in 4m)',
  },
  {
    id: 'log-2',
    timestamp: 'Yesterday, 07:00 AM EST',
    subject: 'Morning Intelligence: Crypto Liquidity Sweep, NASDAQ Rebounds & Viral Lofi Audio Wave',
    recipientCount: 2,
    recipientsPreview: 'aubrey@founderpulse.io, aubrey.exec@gmail.com',
    status: 'DELIVERED',
    messageId: 'msg_87ea418b76e2d1',
    openRate: '100% (Opened in 12m)',
  },
  {
    id: 'log-3',
    timestamp: 'Sep 12, 07:00 AM EST',
    subject: 'Morning Intelligence: US Treasury Yield Easing, Gold Consolidation & Content Production Hooks',
    recipientCount: 2,
    recipientsPreview: 'aubrey@founderpulse.io, aubrey.exec@gmail.com',
    status: 'DELIVERED',
    messageId: 'msg_76ba901c55d3a9',
    openRate: '100% (Opened in 8m)',
  },
];

// Primary Sample Briefing (Today)
export const CURRENT_BRIEFING: MorningBriefing = {
  id: 'briefing-today',
  date: '2026-09-14',
  formattedDate: 'Monday, September 14, 2026 • 07:00 AM EST',
  headline: 'Tech Equities Rally Behind Semiconductor Strength, BTC Holds $91.8K & TikTok B2B Agent Content Explodes',
  executiveSummary:
    'Markets opened with risk-on momentum as easing 10-Year Treasury yields (4.14%) spurred broad buying across tech equities and high-beta crypto. Concurrently, TikTok viral analytics show a 188% 24-hour surge in B2B automation and micro-SaaS content, marking an actionable window to publish technical breakdowns and capitalize on rising commercial search volume.',
  marketShifts: [
    {
      title: 'Equities: NASDAQ (+1.24%) and S&P 500 (+0.88%) Push New Monthly Highs',
      description:
        'Semiconductor manufacturing and cloud infrastructure continue to lead index gains. RSI readings at 68.1 suggest healthy upward momentum with no immediate bearish divergence.',
      impact: 'positive',
    },
    {
      title: 'Crypto: Bitcoin Consolidates Above $91.8k on Heavy Inflows (+$680M)',
      description:
        'Net ETF institutional accumulation absorbed weekend profit-taking. Solana (+6.42% to $219.50) is outperforming on DEX record volumes.',
      impact: 'positive',
    },
    {
      title: 'Commodities & Macro: 10-Year Treasury Yield Drops to 4.14%',
      description:
        'Dovish commentary ahead of upcoming Federal Reserve minutes has compressed bond yields, supporting equity multiples while Spot Gold consolidates quietly at $2,688/oz.',
      impact: 'neutral',
    },
  ],
  viralTikTokSignals: [
    {
      trend: '#MicroSaaS & #AIAgents (54.8M views, +188% 24h)',
      metric: 'Audio: Original Audio - TechOperatorHQ (16.4k clips/day velocity)',
      recommendation:
        'Publish a 45-second screen recording demonstrating automated morning briefing pipelines. Strongest engagement hook: "How my agent writes my 7 AM executive brief while I sleep."',
    },
    {
      trend: '#MarketBreakout & #ChartPattern (32.1M views, +94% 24h)',
      metric: 'Fast-paced Phonk audio overlay with multi-timeframe chart zooms',
      recommendation:
        'Repurpose today\'s BTC/USD and SOL/USD momentum sparklines into vertical visual carousels with key support and breakout zones highlighted.',
    },
    {
      trend: '#MorningRoutineCEO (76.4M views, +46% 24h)',
      metric: 'High B2B executive demographic retention; morning viewing peak 6:30-8:30 AM EST',
      recommendation:
        'Feature automated email workflows as the centerpiece of productive morning operations.',
    },
  ],
  actionItems: [
    {
      id: 'act-1',
      task: 'Review & approve today\'s 7:15 AM Executive Briefing email dispatch to Aubrey & leadership list.',
      priority: 'high',
      assignee: 'Aubrey (Automated Gate)',
      completed: false,
    },
    {
      id: 'act-2',
      task: 'Record 60-second TikTok screen capture breakdown on #MicroSaaS automation using today\'s dashboard metrics.',
      priority: 'high',
      assignee: 'Content Squad',
      completed: false,
    },
    {
      id: 'act-3',
      task: 'Set trailing stop-loss alerts on SOL/USD breakout position at $214.00 support level.',
      priority: 'medium',
      assignee: 'Strategy Desk',
      completed: true,
    },
    {
      id: 'act-4',
      task: 'Verify Resend SMTP deliverability health check and DKIM/SPF alignment on founderpulse.io domain.',
      priority: 'routine',
      assignee: 'System Ops',
      completed: true,
    },
  ],
  confidenceScore: 97,
  generatedAt: '07:00:12 AM EST',
  aiMetadata: {
    provider: 'OpenAI',
    model: 'gpt-4o-mini',
    latencyMs: 142,
  },
  emailStatus: 'sent',
  emailSubject: 'Morning Intelligence: Tech Equities Surge, BTC Holds $91k & #MicroSaaS TikTok Breakout',
};
