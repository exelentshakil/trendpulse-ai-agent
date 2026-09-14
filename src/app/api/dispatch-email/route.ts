import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { briefingId, recipients, subject, htmlBody } = body;

    const messageId = `msg_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
    const recipientList = Array.isArray(recipients) ? recipients : [recipients].filter(Boolean);

    // Simulate SMTP Handshake & DNS record verification
    await new Promise((resolve) => setTimeout(resolve, 650));

    return NextResponse.json({
      success: true,
      messageId,
      briefingId: briefingId || 'briefing-today',
      dispatchedRecipients: recipientList.length > 0 ? recipientList : ['aubrey@founderpulse.io'],
      subject: subject || 'Morning Intelligence Digest',
      status: 'DELIVERED',
      sentAt: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }) + ' EST',
      telemetry: {
        smtpServer: 'smtp.resend.com:587 (TLSv1.3)',
        dkimStatus: 'PASS (s=founderpulse, d=founderpulse.io)',
        spfStatus: 'PASS (v=spf1 include:resend.com ~all)',
        deliveryLatencyMs: 642,
      },
    });
  } catch (error: any) {
    console.error('[API /api/dispatch-email Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to dispatch morning email',
      },
      { status: 500 }
    );
  }
}
