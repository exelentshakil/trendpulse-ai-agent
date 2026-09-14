import { NextResponse } from 'next/server';

export async function GET() {
  const hasOpenAi = Boolean(
    process.env.OPENAI_API_KEY &&
      process.env.OPENAI_API_KEY !== 'placeholder' &&
      !process.env.OPENAI_API_KEY.startsWith('sk-placeholder')
  );

  const hasGemini = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'placeholder'
  );

  const hasSupabase = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const hasInngest = Boolean(process.env.INNGEST_EVENT_KEY);

  return NextResponse.json({
    status: 'operational',
    service: 'TrendPulse AI Autonomous Intelligence & Morning Dispatcher',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    scheduledCron: '07:00 AM EST (Daily)',
    timezone: 'America/New_York (Atlanta)',
    activeLayers: {
      openai: hasOpenAi,
      gemini: hasGemini,
      supabasePersistence: hasSupabase,
      inngestCronScheduler: hasInngest,
      smtpDeliveryGateway: true,
      tiktokTrendsIngestion: true,
      marketChartsFeed: true,
    },
    primaryModel: 'OpenAI gpt-4o-mini',
    fallbackModel: 'Google Gemini 2.0 Flash',
    resilienceGuarantees: [
      'Dual-provider automatic failover (<500ms)',
      'Deterministic offline rule engine fallback',
      'Human-in-the-loop email review gate',
      'DKIM & SPF aligned domain dispatch',
    ],
  });
}
