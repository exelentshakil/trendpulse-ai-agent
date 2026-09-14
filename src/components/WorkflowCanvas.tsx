'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Network,
  Cpu,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Play,
  ArrowRight,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Terminal,
  RefreshCw,
  Layers,
  Activity,
} from 'lucide-react';

interface WorkflowCanvasProps {
  isRunning: boolean;
  onTrigger: () => void;
  activeStep?: number;
}

interface StepDetail {
  id: string;
  name: string;
  shortTitle: string;
  desc: string;
  icon: any;
  idleStatus: string;
  activeStatus: string;
  completedStatus: string;
  badgeColor: string;
  activeBadgeColor: string;
  completedBadgeColor: string;
  glowColor: string;
  durationMs: number;
  inputPayload: any;
  outputPayload: any;
  config: {
    engine: string;
    sla: string;
    retryPolicy: string;
  };
}

export default function WorkflowCanvas({ isRunning, onTrigger }: WorkflowCanvasProps) {
  // Step definitions simulating enterprise architecture
  const steps: StepDetail[] = [
    {
      id: 'trigger',
      name: '1. Cron & Webhook Trigger',
      shortTitle: 'Trigger',
      desc: '07:00 AM EST Inngest scheduler wakes serverless container',
      icon: Clock,
      idleStatus: 'ARMED',
      activeStatus: 'WAKING...',
      completedStatus: 'TRIGGERED',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      activeBadgeColor: 'text-amber-400 bg-amber-500/20 border-amber-500 animate-pulse',
      completedBadgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      durationMs: 700,
      inputPayload: {
        cron: '0 7 * * *',
        timezone: 'America/New_York (Atlanta EST)',
        webhookUrl: 'https://trendpulse-ai-agent.vercel.app/api/inngest',
      },
      outputPayload: {
        eventId: 'evt_inngest_0700_est',
        status: 'DISPATCHED',
        serverlessRegion: 'iad1 (US-East)',
        wakeLatencyMs: 142,
      },
      config: {
        engine: 'Inngest Serverless Durable Cron',
        sla: '99.99% Guaranteed Invocation',
        retryPolicy: 'Exponential backoff (3 attempts)',
      },
    },
    {
      id: 'ingestion',
      name: '2. Multi-Feed Ingestion',
      shortTitle: 'Ingestion',
      desc: 'Normalizes 6 financial charts + 4 TikTok viral audio curves',
      icon: Network,
      idleStatus: 'SYNCED',
      activeStatus: 'FETCHING...',
      completedStatus: 'NORMALIZED',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      activeBadgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500 animate-pulse',
      completedBadgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      durationMs: 900,
      inputPayload: {
        indices: ['SPX', 'NDX', 'BTC/USD', 'SOL/USD', 'GOLD', 'US10Y'],
        tiktokQueries: ['#MicroSaaS', '#FinTech', '#AIAutomation', '#MorningRoutine'],
      },
      outputPayload: {
        tickersNormalized: 6,
        soundTracksAnalyzed: 4,
        topGrowthVelocity: '+340% (MicroSaaS Hook)',
        payloadBytes: 42180,
      },
      config: {
        engine: 'Parallel Edge Fetchers with Rate Limiting',
        sla: 'Sub-second data ingest (< 500ms)',
        retryPolicy: 'Stale-while-revalidate fallback',
      },
    },
    {
      id: 'ai-engine',
      name: '3. Dual-Provider AI',
      shortTitle: 'Dual AI',
      desc: 'gpt-4o-mini reasoning with sub-second Gemini failover',
      icon: Cpu,
      idleStatus: 'READY',
      activeStatus: 'SYNTHESIZING...',
      completedStatus: 'INFERRED',
      badgeColor: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      activeBadgeColor: 'text-violet-400 bg-violet-500/20 border-violet-500 animate-pulse',
      completedBadgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(139, 92, 246, 0.25)',
      durationMs: 1300,
      inputPayload: {
        primaryModel: 'OpenAI gpt-4o-mini',
        fallbackModel: 'Google gemini-2.0-flash',
        temperature: 0.2,
        responseFormat: 'json_object',
      },
      outputPayload: {
        providerUsed: 'OpenAI',
        tokensPrompt: 842,
        tokensCompletion: 319,
        reasoningDurationMs: 1248,
        confidenceScore: 0.984,
      },
      config: {
        engine: 'Zero-dependency Native HTTP Dual-Provider Failover',
        sla: 'Zero downtime, sub-2s inference',
        retryPolicy: 'Instant sub-second failover to Gemini',
      },
    },
    {
      id: 'guardrail',
      name: '4. Human Review Gate',
      shortTitle: 'Review Gate',
      desc: 'Executive summary scoring & action item prioritization',
      icon: ShieldCheck,
      idleStatus: 'VERIFIED',
      activeStatus: 'VALIDATING...',
      completedStatus: 'APPROVED',
      badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      activeBadgeColor: 'text-indigo-400 bg-indigo-500/20 border-indigo-500 animate-pulse',
      completedBadgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(99, 102, 241, 0.25)',
      durationMs: 650,
      inputPayload: {
        reviewer: 'Aubrey (Automated Gatekeeper)',
        minConfidenceThreshold: 0.85,
        hallucinationCheck: 'strict',
      },
      outputPayload: {
        gateStatus: 'PASSED',
        priorityActionItems: 3,
        safetyCompliance: '100% Verified',
      },
      config: {
        engine: 'Deterministic Rule-Engine & Anti-Hallucination Gate',
        sla: 'Zero false-positives',
        retryPolicy: 'Re-generate on confidence < 85%',
      },
    },
    {
      id: 'dispatch',
      name: '5. SMTP Delivery Hub',
      shortTitle: 'Delivery',
      desc: 'DKIM & SPF aligned domain dispatch via Resend',
      icon: Mail,
      idleStatus: 'ONLINE',
      activeStatus: 'DISPATCHING...',
      completedStatus: 'SENT 07:00 AM',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      activeBadgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500 animate-pulse',
      completedBadgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      durationMs: 600,
      inputPayload: {
        to: 'aubrey@clientdomain.com',
        from: 'TrendPulse Agent <briefings@trendpulse.io>',
        dkimSelector: 'resend',
      },
      outputPayload: {
        messageId: 'msg_892xf019a',
        smtpStatus: '250 2.0.0 OK: delivered to gateway',
        spfDkimStatus: 'PASS (100% align)',
      },
      config: {
        engine: 'Resend REST API / Direct SMTP Gateway',
        sla: 'Inbox primary delivery (zero spam)',
        retryPolicy: 'Retry on 421/450 transient SMTP codes',
      },
    },
  ];

  // Pipeline execution state
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);
  const [elapsedSimulationMs, setElapsedSimulationMs] = useState(0);
  const [isLocalRunning, setIsLocalRunning] = useState(false);
  const timerRef = useRef<any>(null);

  // Sync with prop isRunning or local simulation
  const activePipelineRunning = isRunning || isLocalRunning;

  // Handle simulation flow
  useEffect(() => {
    if (activePipelineRunning) {
      // Start sequential progression through steps 0 -> 1 -> 2 -> 3 -> 4
      setCompletedSteps([]);
      setCurrentStepIndex(0);
      setElapsedSimulationMs(0);

      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedSimulationMs(Date.now() - startTime);
      }, 50);

      let step = 0;
      const advanceStep = () => {
        if (step < steps.length) {
          setCurrentStepIndex(step);
          const duration = steps[step].durationMs;
          setTimeout(() => {
            setCompletedSteps((prev) => [...prev, step]);
            step += 1;
            if (step < steps.length) {
              advanceStep();
            } else {
              // Finished all steps
              setCurrentStepIndex(null);
              setIsLocalRunning(false);
              if (timerRef.current) clearInterval(timerRef.current);
            }
          }, duration);
        }
      };

      advanceStep();

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!isLocalRunning && currentStepIndex !== null) {
        setCurrentStepIndex(null);
      }
    }
  }, [activePipelineRunning]);

  const handleStartSimulation = () => {
    if (activePipelineRunning) return;
    setIsLocalRunning(true);
    onTrigger();
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs transition-colors relative overflow-hidden">
      {/* Background Subtle Circuit Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--color-brand)]" />
              <span>Automated Agent Pipeline Architecture</span>
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono whitespace-nowrap shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              n8n / Make Engine
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2 py-0.5 text-xs font-mono text-[var(--color-text-muted)]">
              {activePipelineRunning
                ? `Executing Stage ${(currentStepIndex ?? 0) + 1} of 5 (${(elapsedSimulationMs / 1000).toFixed(1)}s)`
                : 'Durable 07:00 AM Cron Armed'}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            End-to-end event topology: Cron trigger, parallel ingestion, dual-provider AI failover, and SMTP dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSelectedNodeIndex(selectedNodeIndex !== null ? null : 2)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)]/50 px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Layers className="h-3.5 w-3.5 text-[var(--color-brand)]" />
            <span>{selectedNodeIndex !== null ? 'Hide Telemetry' : 'Inspect Nodes'}</span>
          </button>

          <button
            onClick={handleStartSimulation}
            disabled={activePipelineRunning}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activePipelineRunning ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Running Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simulate Full Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Grid with Live Animated Connecting Wires */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = currentStepIndex === idx;
            const isCompleted = completedSteps.includes(idx);
            const isSelected = selectedNodeIndex === idx;

            // Status text and badge style
            let displayStatus = step.idleStatus;
            let badgeClass = step.badgeColor;
            if (isCurrent) {
              displayStatus = step.activeStatus;
              badgeClass = step.activeBadgeColor;
            } else if (isCompleted) {
              displayStatus = step.completedStatus;
              badgeClass = step.completedBadgeColor;
            }

            return (
              <div key={step.id} className="relative flex flex-col group">
                {/* Node Card Container */}
                <div
                  onClick={() => setSelectedNodeIndex(isSelected ? null : idx)}
                  style={{
                    boxShadow: isCurrent
                      ? `0 0 20px ${step.glowColor}, inset 0 0 12px ${step.glowColor}`
                      : isSelected
                      ? `0 0 12px var(--color-brand)`
                      : undefined,
                  }}
                  className={`flex-1 rounded-xl border p-3.5 transition-all cursor-pointer relative overflow-hidden select-none ${
                    isCurrent
                      ? 'border-[var(--color-brand)] bg-[var(--color-panel)] scale-[1.02] ring-2 ring-[var(--color-brand)]/50 z-20'
                      : isCompleted
                      ? 'border-emerald-500/40 bg-[var(--color-panel-subtle)] hover:border-emerald-500 z-10'
                      : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-text-muted)] z-10'
                  }`}
                >
                  {/* Active Laser Scanning Line (when this node is currently executing) */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[var(--color-brand)]/20 to-transparent animate-pulse"
                      style={{
                        animationDuration: '1s',
                      }}
                    />
                  )}

                  {/* Node Header (Icon + Status Badge) */}
                  <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-[var(--color-brand)] text-white border-transparent shadow-md scale-110'
                          : isCompleted
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                          : 'bg-[var(--color-panel)] border-[var(--color-border)] text-[var(--color-brand)]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold font-mono tracking-tight whitespace-nowrap shrink-0 transition-colors ${badgeClass}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      ) : isCurrent ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                      )}
                      {displayStatus}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10">
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1 flex items-center justify-between">
                      <span>{step.name}</span>
                      <span className="text-[10px] font-mono font-normal text-[var(--color-text-muted)]">
                        #{idx + 1}
                      </span>
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Mini Telemetry Bar */}
                  <div className="mt-3 pt-2 border-t border-[var(--color-border)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                    <span>{step.config.engine.split(' ')[0]}</span>
                    <span className="text-[var(--color-brand)] hover:underline flex items-center gap-0.5">
                      {isSelected ? 'Active' : 'Inspect'}
                      <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>

                {/* Animated SVG Connector Wire (Desktop Horizontal) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-6 z-30 pointer-events-none">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 16 24">
                      {/* Guide Rail Wire */}
                      <line
                        x1="0"
                        y1="12"
                        x2="16"
                        y2="12"
                        stroke="var(--color-border)"
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />

                      {/* Continuous Ambient Flow Wire (n8n feel even when idle) */}
                      <line
                        x1="0"
                        y1="12"
                        x2="16"
                        y2="12"
                        stroke="var(--color-brand)"
                        strokeWidth="2"
                        strokeOpacity={isCompleted || isCurrent ? '0.9' : '0.35'}
                        className="animate-flow-wire"
                      />

                      {/* High-Intensity Traveling Laser Pulse when Step is actively transferring */}
                      {isCurrent && (
                        <circle
                          cx="8"
                          cy="12"
                          r="3"
                          fill="var(--color-brand)"
                          className="animate-ping"
                          style={{ filter: 'drop-shadow(0 0 6px var(--color-brand))' }}
                        />
                      )}
                    </svg>
                  </div>
                )}

                {/* Animated Vertical Connector (Mobile View) */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-1">
                    <div className="w-0.5 h-4 bg-[var(--color-brand)]/40 relative overflow-hidden">
                      <div className="w-full h-2 bg-[var(--color-brand)] animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Telemetry & Schema Inspector Panel */}
        {selectedNodeIndex !== null && (
          <div className="mt-5 rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-panel-subtle)] p-4 text-xs font-mono transition-all animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--color-brand)]" />
                <span className="font-bold text-[var(--color-text-primary)]">
                  Node #{selectedNodeIndex + 1}: {steps[selectedNodeIndex].name} Telemetry & Schema
                </span>
                <span className="rounded bg-[var(--color-brand)]/10 px-2 py-0.5 text-xs text-[var(--color-brand)] font-semibold">
                  {steps[selectedNodeIndex].config.engine}
                </span>
              </div>
              <button
                onClick={() => setSelectedNodeIndex(null)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-xs cursor-pointer self-end sm:self-auto"
              >
                Close Inspector [esc]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Col 1: Config Specs */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Topology & SLAs
                </span>
                <div className="p-2.5 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1 text-xs">
                  <div><span className="text-[var(--color-text-muted)]">Engine: </span><span className="text-[var(--color-text-primary)]">{steps[selectedNodeIndex].config.engine}</span></div>
                  <div><span className="text-[var(--color-text-muted)]">Reliability SLA: </span><span className="text-emerald-500">{steps[selectedNodeIndex].config.sla}</span></div>
                  <div><span className="text-[var(--color-text-muted)]">Retry Policy: </span><span className="text-amber-500">{steps[selectedNodeIndex].config.retryPolicy}</span></div>
                  <div><span className="text-[var(--color-text-muted)]">Simulated Latency: </span><span className="text-[var(--color-brand)]">{steps[selectedNodeIndex].durationMs}ms</span></div>
                </div>
              </div>

              {/* Col 2: Ingestion / Trigger Payload */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Input Stream Payload (JSON)
                </span>
                <pre className="p-2.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[11px] overflow-x-auto max-h-32">
                  {JSON.stringify(steps[selectedNodeIndex].inputPayload, null, 2)}
                </pre>
              </div>

              {/* Col 3: Output State Payload */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Output State & Metrics (JSON)
                </span>
                <pre className="p-2.5 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 text-[11px] overflow-x-auto max-h-32">
                  {JSON.stringify(steps[selectedNodeIndex].outputPayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
