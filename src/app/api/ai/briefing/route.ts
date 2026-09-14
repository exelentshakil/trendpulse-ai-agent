import { NextResponse } from 'next/server';
import { synthesizeMorningBriefing } from '@/lib/ai';
import {
  INITIAL_MARKET_TICKERS,
  INITIAL_TIKTOK_TRENDS,
  INITIAL_SEARCH_TRENDS,
} from '@/lib/mock-data';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { focusSector, tone, tickers, tiktokTrends, searchTrends } = body;

    const result = await synthesizeMorningBriefing({
      tickers: Array.isArray(tickers) && tickers.length > 0 ? tickers : INITIAL_MARKET_TICKERS,
      tiktokTrends:
        Array.isArray(tiktokTrends) && tiktokTrends.length > 0
          ? tiktokTrends
          : INITIAL_TIKTOK_TRENDS,
      searchTrends:
        Array.isArray(searchTrends) && searchTrends.length > 0
          ? searchTrends
          : INITIAL_SEARCH_TRENDS,
      focusSector: typeof focusSector === 'string' ? focusSector : 'Tech Equities & Viral TikTok SaaS',
      tone: ['executive', 'trader', 'creator'].includes(tone) ? tone : 'executive',
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[API /api/ai/briefing Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to synthesize morning briefing',
      },
      { status: 500 }
    );
  }
}
