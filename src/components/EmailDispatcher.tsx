'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  MorningBriefing,
  EmailRecipientGroup,
  EmailLog,
  INITIAL_RECIPIENT_GROUPS,
  INITIAL_EMAIL_LOGS,
} from '@/lib/mock-data';

interface EmailDispatcherProps {
  briefing: MorningBriefing;
}

export default function EmailDispatcher({ briefing }: EmailDispatcherProps) {
  const [recipientGroups, setRecipientGroups] = useState<EmailRecipientGroup[]>(INITIAL_RECIPIENT_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState('grp-executive');
  const [subject, setSubject] = useState(briefing.emailSubject);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(INITIAL_EMAIL_LOGS);
  const [lastDispatchResult, setLastDispatchResult] = useState<any>(null);

  const selectedGroup = recipientGroups.find((g) => g.id === selectedGroupId) || recipientGroups[0];

  // AI Email Re-Drafting
  const handleAiRefineEmail = async () => {
    setIsDrafting(true);
    try {
      const res = await fetch('/api/ai/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          briefing,
          recipientGroup: selectedGroup.name,
          customInstructions,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSubject(json.data.subject);
      }
    } catch (err) {
      console.error('Error drafting email:', err);
    } finally {
      setIsDrafting(false);
    }
  };

  // Dispatch Email
  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const res = await fetch('/api/dispatch-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          briefingId: briefing.id,
          recipients: selectedGroup.emails,
          subject,
          htmlBody: briefing.executiveSummary,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLastDispatchResult(data);
        const newLog: EmailLog = {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          subject,
          recipientCount: selectedGroup.emails.length,
          recipientsPreview: selectedGroup.emails.join(', '),
          status: 'DELIVERED',
          messageId: data.messageId,
          openRate: 'Pending (Sent via SMTP)',
        };
        setEmailLogs([newLog, ...emailLogs]);
      }
    } catch (err) {
      console.error('Error sending email:', err);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = () => {
    const text = `Subject: ${subject}\n\n${briefing.executiveSummary}\n\nKey Market Shifts:\n${briefing.marketShifts.map((m) => `- ${m.title}`).join('\n')}\n\nAction Items:\n${briefing.actionItems.map((a) => `- [${a.priority}] ${a.task}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration & Recipient Bar */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                <Mail className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Autonomous Email Dispatcher & Review Hub
              </h3>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Review, refine, and dispatch formatted 7:00 AM intelligence digests to designated recipient lists.
            </p>
          </div>

          {/* Group Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
              Distribution List:
            </span>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] focus:outline-hidden"
            >
              {recipientGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.emails.length} recipients)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipients Chip Row */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[var(--color-text-muted)] font-medium">To:</span>
          {selectedGroup.emails.map((email) => (
            <span
              key={email}
              className="rounded-md bg-[var(--color-brand)]/10 px-2.5 py-1 text-xs font-mono font-medium text-[var(--color-brand)] border border-[var(--color-brand)]/20 whitespace-nowrap shrink-0"
            >
              {email}
            </span>
          ))}
        </div>
      </div>

      {/* Main 2-Column Interface: Email Preview vs Dispatch Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Email Preview Box (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Live Email Message Preview
              </span>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            {/* Email Headers */}
            <div className="mt-4 space-y-2 border-b border-[var(--color-border)] pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-16 font-semibold text-[var(--color-text-muted)]">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 font-semibold text-[var(--color-text-primary)] focus:outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <span className="w-16 font-semibold">From:</span>
                <span className="font-mono text-[var(--color-text-secondary)]">
                  TrendPulse AI &lt;briefing@founderpulse.io&gt;
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <span className="w-16 font-semibold">Security:</span>
                <span className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  DKIM / SPF Signed • TLS 1.3
                </span>
              </div>
            </div>

            {/* Rendered Email Body */}
            <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-xs sm:text-sm leading-relaxed space-y-4">
              <div className="border-b border-[var(--color-border)] pb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  TrendPulse AI • Morning Intelligence
                </div>
                <h4 className="mt-1 text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                  {briefing.headline}
                </h4>
              </div>

              <div className="rounded-md bg-[var(--color-panel)] p-3 border border-[var(--color-border)]">
                <p className="text-xs leading-relaxed text-[var(--color-text-primary)] font-medium">
                  {briefing.executiveSummary}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Key Market & Chart Highlights:
                </h5>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[var(--color-text-secondary)]">
                  {briefing.marketShifts.map((m, idx) => (
                    <li key={idx}>
                      <strong>{m.title}:</strong> {m.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  TikTok Viral Opportunities:
                </h5>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[var(--color-text-secondary)]">
                  {briefing.viralTikTokSignals.map((t, idx) => (
                    <li key={idx}>
                      <strong>{t.trend}:</strong> {t.recommendation}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)] font-mono">
                Automated dispatch via TrendPulse AI Agent • Resend SMTP Gateway
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Refinement & Dispatch Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Refinement Box */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Email Copy Refiner</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Give instructions to re-angle the subject line or tone before sending.
            </p>

            <div className="mt-3">
              <textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Make subject line punchier; emphasize the BTC $91k breakout for Aubrey..."
                rows={3}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden resize-none"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={handleAiRefineEmail}
                disabled={isDrafting}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${isDrafting ? 'animate-spin' : ''}`} />
                <span>{isDrafting ? 'Refining...' : 'Re-Draft Subject'}</span>
              </button>

              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting SMTP...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Morning Email Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Dispatch Feedback Card */}
          {lastDispatchResult && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>SMTP Handshake Confirmed ({lastDispatchResult.sentAt})</span>
              </div>
              <div className="font-mono text-xs text-[var(--color-text-secondary)] space-y-1">
                <div>Message ID: <strong>{lastDispatchResult.messageId}</strong></div>
                <div>Server: <strong>{lastDispatchResult.telemetry.smtpServer}</strong></div>
                <div>DKIM: <span className="text-emerald-600 font-bold">{lastDispatchResult.telemetry.dkimStatus}</span></div>
                <div>Latency: <strong>{lastDispatchResult.telemetry.deliveryLatencyMs}ms</strong></div>
              </div>
            </div>
          )}

          {/* Recent Transmission History */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 mb-3">
              Recent Morning Transmissions
            </h4>
            <div className="space-y-2.5">
              {emailLogs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[var(--color-text-muted)]">{log.timestamp}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {log.status}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-[var(--color-text-primary)] truncate">
                    {log.subject}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[var(--color-text-muted)] font-mono text-xs">
                    <span>{log.recipientsPreview}</span>
                    <span>{log.openRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
