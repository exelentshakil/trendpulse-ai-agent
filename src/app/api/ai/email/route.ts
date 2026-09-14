import { NextResponse } from 'next/server';
import { draftBriefingEmail } from '@/lib/ai';
import { CURRENT_BRIEFING } from '@/lib/mock-data';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { briefing, recipientGroup, customInstructions } = body;

    const result = await draftBriefingEmail({
      briefing: briefing || CURRENT_BRIEFING,
      recipientGroup: recipientGroup || 'Executive & Founder Inbox',
      customInstructions: customInstructions || 'Optimize for high-level decision makers. Highlight action items.',
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[API /api/ai/email Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to generate email draft',
      },
      { status: 500 }
    );
  }
}
