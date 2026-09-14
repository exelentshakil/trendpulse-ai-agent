import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TrendPulse AI | Autonomous Trend Intelligence & Morning Briefing Agent',
  description:
    'Autonomous AI agent monitoring financial market charts, viral TikTok trends, and search breakouts. Generates 7:00 AM executive intelligence briefings and executes one-click email dispatches.',
  keywords: [
    'AI Agent',
    'Trend Intelligence',
    'TikTok Trends',
    'Financial Charts',
    'Morning Briefing',
    'Email Automation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased transition-colors duration-200">
        {/* Central Traffic Tracking Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=trendpulse-ai-agent"
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
        {children}
      </body>
    </html>
  );
}
