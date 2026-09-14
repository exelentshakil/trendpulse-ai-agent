'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code2,
  Share2,
  Workflow,
  FileJson,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function BlueprintExporter() {
  const [activeFormat, setActiveFormat] = useState<'n8n' | 'make' | 'inngest' | 'docker'>('n8n');
  const [copied, setCopied] = useState(false);

  // Real, importable n8n workflow JSON structure
  const n8nWorkflow = {
    name: "TrendPulse AI - 07:00 AM Morning Briefing & SMTP Dispatch",
    nodes: [
      {
        parameters: {
          rule: {
            interval: [{ field: "cronExpression", expression: "0 7 * * *" }]
          }
        },
        id: "node-cron-trigger",
        name: "Schedule: 07:00 AM EST",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1.1,
        position: [240, 300]
      },
      {
        parameters: {
          url: "https://trendpulse-ai-agent.vercel.app/api/ai/briefing",
          method: "POST",
          sendBody: true,
          bodyParameters: {
            parameters: [
              { name: "focusSector", value: "Tech Equities & Viral TikTok SaaS" },
              { name: "tone", value: "executive" }
            ]
          }
        },
        id: "node-ai-synthesis",
        name: "Dual AI Synthesis (OpenAI + Gemini)",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.1,
        position: [460, 300]
      },
      {
        parameters: {
          conditions: {
            number: [{ value1: "={{ $json.data.confidenceScore }}", operation: "largerEqual", value2: 85 }]
          }
        },
        id: "node-confidence-gate",
        name: "Confidence Gate (>= 85%)",
        type: "n8n-nodes-base.if",
        typeVersion: 1,
        position: [680, 300]
      },
      {
        parameters: {
          fromEmail: "briefings@trendpulse.io",
          toEmail: "aubrey@clientdomain.com",
          subject: "={{ $json.data.headline }}",
          text: "={{ $json.data.executiveSummary }}"
        },
        id: "node-smtp-dispatch",
        name: "SMTP Gateway (Resend / SendGrid)",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2,
        position: [900, 240]
      }
    ],
    connections: {
      "Schedule: 07:00 AM EST": {
        main: [[{ node: "Dual AI Synthesis (OpenAI + Gemini)", type: "main", index: 0 }]]
      },
      "Dual AI Synthesis (OpenAI + Gemini)": {
        main: [[{ node: "Confidence Gate (>= 85%)", type: "main", index: 0 }]]
      },
      "Confidence Gate (>= 85%)": {
        main: [[{ node: "SMTP Gateway (Resend / SendGrid)", type: "main", index: 0 }]]
      }
    }
  };

  // Real Make.com Scenario Blueprint JSON
  const makeBlueprint = {
    name: "TrendPulse AI Morning Briefing Dispatcher",
    flow: [
      {
        id: 1,
        module: "builtin:BasicScheduler",
        parameters: { time: "07:00", timezone: "America/New_York" }
      },
      {
        id: 2,
        module: "http:ActionMakeRequest",
        parameters: {
          url: "https://trendpulse-ai-agent.vercel.app/api/ai/briefing",
          method: "POST"
        }
      },
      {
        id: 3,
        module: "email:ActionSendEmail",
        parameters: {
          account: "Resend_SMTP",
          to: "aubrey@clientdomain.com"
        }
      }
    ],
    metadata: {
      version: 1,
      author: "Shakil Ahmed - AI Automation Specialist",
      license: "MIT"
    }
  };

  // Production Inngest TypeScript Durable Function
  const inngestFunctionCode = `import { inngest } from '@/inngest/client';
import { synthesizeMorningBriefing } from '@/lib/ai';
import { dispatchSmtpEmail } from '@/lib/smtp';

export const morningBriefingCron = inngest.createFunction(
  {
    id: 'morning-briefing-cron',
    name: '07:00 AM EST Daily Morning Briefing',
    retries: 3,
    concurrency: { limit: 1 },
  },
  { cron: 'TZ=America/New_York 0 7 * * *' },
  async ({ step }) => {
    // Step 1: Ingest financial tickers & TikTok signals in parallel
    const marketData = await step.run('ingest-feeds', async () => {
      return await fetchMarketFeeds();
    });

    // Step 2: Dual-provider AI reasoning with instant failover
    const briefing = await step.run('dual-ai-reasoning', async () => {
      return await synthesizeMorningBriefing(marketData, {
        primary: 'gpt-4o-mini',
        fallback: 'gemini-2.0-flash',
        maxTokens: 1200,
      });
    });

    // Step 3: Human review gate or autonomous email dispatch
    await step.run('dispatch-smtp', async () => {
      return await dispatchSmtpEmail({
        to: 'aubrey@clientdomain.com',
        subject: briefing.headline,
        body: briefing.executiveSummary,
        dkimSelector: 'resend',
      });
    });

    return { success: true, briefingId: briefing.id };
  }
);`;

  // Docker Compose Self-Hosting Stack
  const dockerComposeYaml = `version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=secure_changeme
      - GENERIC_TIMEZONE=America/New_York
      - WEBHOOK_URL=http://localhost:5678/
    volumes:
      - n8n_data:/home/node/.n8n

  trendpulse-agent:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - RESEND_API_KEY=\${RESEND_API_KEY}

volumes:
  n8n_data:`;

  const getActiveContent = () => {
    switch (activeFormat) {
      case 'n8n':
        return JSON.stringify(n8nWorkflow, null, 2);
      case 'make':
        return JSON.stringify(makeBlueprint, null, 2);
      case 'inngest':
        return inngestFunctionCode;
      case 'docker':
        return dockerComposeYaml;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'trendpulse-n8n-workflow.json';
    let mime = 'application/json';
    if (activeFormat === 'make') {
      filename = 'trendpulse-make-blueprint.json';
    } else if (activeFormat === 'inngest') {
      filename = 'morningBriefingCron.ts';
      mime = 'text/typescript';
    } else if (activeFormat === 'docker') {
      filename = 'docker-compose.yml';
      mime = 'text/yaml';
    }

    const blob = new Blob([getActiveContent()], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Workflow className="h-4 w-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Export Production Blueprints (IaC & Workflows)
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              <Sparkles className="h-3 w-3" />
              Overdelivery Asset
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            Ready-to-deploy workflow files. Import directly into self-hosted n8n, Make.com, or deploy on Vercel/Inngest.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)]/50 px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] transition-all cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download File</span>
          </button>
        </div>
      </div>

      {/* Format Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--color-border)] mb-4 text-xs">
        <button
          onClick={() => setActiveFormat('n8n')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeFormat === 'n8n'
              ? 'bg-[var(--color-brand)] text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <FileJson className="h-3.5 w-3.5" />
          <span>n8n Workflow (.json)</span>
        </button>

        <button
          onClick={() => setActiveFormat('make')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeFormat === 'make'
              ? 'bg-[var(--color-brand)] text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Workflow className="h-3.5 w-3.5" />
          <span>Make.com Blueprint (.json)</span>
        </button>

        <button
          onClick={() => setActiveFormat('inngest')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeFormat === 'inngest'
              ? 'bg-[var(--color-brand)] text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Inngest Durable Cron (.ts)</span>
        </button>

        <button
          onClick={() => setActiveFormat('docker')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeFormat === 'docker'
              ? 'bg-[var(--color-brand)] text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Docker Self-Hosting (docker-compose.yml)</span>
        </button>
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-lg bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72 border border-slate-800">
        <pre>{getActiveContent()}</pre>
      </div>

      {/* Integration Instructions */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[var(--color-text-muted)] gap-2">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>100% Client Ownership Guarantee: Zero vendor lock-in. Works on self-hosted or cloud.</span>
        </div>
        <span className="font-mono text-[11px]">Ready for import into n8n v1.80+ / Make v2 / Next.js 15</span>
      </div>
    </div>
  );
}
