import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/trendpulse-ai-agent/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Commercial Estimate - TrendPulse AI Agent</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.34;
      font-size: 9.6px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0284c7;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.6px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 9px;
      font-size: 8.3px;
      text-align: right;
      line-height: 1.36;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 7.8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }}
    .section-title {{
      font-size: 9.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #0284c7;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.2px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.2px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.8px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4.2px 6px;
      font-size: 8.6px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.6px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.8px;
      margin-top: 1px;
      line-height: 1.2;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.8px 6px;
      font-size: 9px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 9px;
    }}
    .card-box-title {{
      font-size: 8.6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.2px 0;
      font-size: 7.8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.8px;
      color: #334155;
      margin-bottom: 2px;
      padding-left: 10px;
      position: relative;
      line-height: 1.2;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 6px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
    }}
    .term-col {{
      font-size: 7.6px;
      line-height: 1.2;
    }}
    .term-title {{
      font-weight: 800;
      color: #0284c7;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1.5px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6.5px 10px;
    }}
    .auth-title {{
      font-size: 8.3px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 7.8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 3px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 24px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13.5px;
      color: #0369a1;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 24px;
      font-family: ui-monospace, monospace;
      font-size: 8px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
    }}
    .auth-label {{
      font-size: 6.8px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5.5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #0284c7;
      box-shadow: 0 1px 3px rgba(2,132,199,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.6px;
      color: #0f172a;
      line-height: 1.16;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 7.8px;
      color: #334155;
      line-height: 1.16;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.3px;
      color: #475569;
      line-height: 1.16;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 16px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.4px;
      color: #0369a1;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">
  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise AI Systems Engineering • Ref #BS-2026-TP-088</div>
      <h1>TrendPulse AI • Autonomous Market, TikTok & Email Agent</h1>
      <p class="subtitle">Multi-Asset Chart Ingestion, Viral TikTok Audio/Hashtag Radar, 7:00 AM AI Briefing & SMTP Dispatch</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Aubrey • Atlanta, Georgia (USA)</div>
      <div><strong>Timeline:</strong> 3–5 Business Days (Turnkey)</div>
      <div><strong>Budget Model:</strong> <strong>$200.00 Fixed Price (Turnkey Package)</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified & Audited</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Milestone Scope & Delivery Schedule</h2>
      <div class="section-meta">Live Demo: https://trendpulse-ai-agent.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 14%;">Milestone</th>
          <th style="width: 54%;">Deliverables & Production Specifications</th>
          <th style="width: 10%;">Est. Hours</th>
          <th style="width: 10%;">Model</th>
          <th style="width: 12%;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num">Phase 0: Live Demo</td>
          <td>
            <div class="phase-name">Architecture Proof & Interactive Cockpit Engine</div>
            <div class="phase-desc">Pre-built functional cockpit: live financial chart sparklines, TikTok viral radar, dual-provider OpenAI/Gemini synthesis, email preview & simulated SMTP dispatch. Delivered upfront in &lt;30m.</div>
          </td>
          <td style="font-family: monospace;">0.5 hrs</td>
          <td class="phase-0-badge">Delivered</td>
          <td class="phase-0-badge">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1: Ingestion</td>
          <td>
            <div class="phase-name">Multi-Source Ingestion & Real-Time Data Pipeline</div>
            <div class="phase-desc">Production connectors for financial market charts (S&P 500, NASDAQ, BTC, SOL, Gold, US 10Y), TikTok viral audio and hashtag velocity tracking, and Google search trend normalization.</div>
          </td>
          <td style="font-family: monospace;">4.0 hrs</td>
          <td>Fixed</td>
          <td style="font-weight: 700;">$80.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2: AI Engine</td>
          <td>
            <div class="phase-name">Autonomous 07:00 AM Morning AI Synthesis Engine</div>
            <div class="phase-desc">Automated 7:00 AM EST Inngest/Vercel cron execution, dual-provider failover (OpenAI gpt-4o-mini + Gemini 2.0 Flash), noise filtering, action checklist generation, and confidence scoring.</div>
          </td>
          <td style="font-family: monospace;">3.0 hrs</td>
          <td>Fixed</td>
          <td style="font-weight: 700;">$60.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3: Dispatch</td>
          <td>
            <div class="phase-name">Autonomous Email Dispatch Hub & Production Launch</div>
            <div class="phase-desc">Resend SMTP gateway integration with SPF/DKIM verification, distribution list manager, human-in-the-loop review toggle, delivery logging, and 14-day hypercare warranty SLA.</div>
          </td>
          <td style="font-family: monospace;">3.0 hrs</td>
          <td>Fixed</td>
          <td style="font-weight: 700;">$60.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="text-align: right; text-transform: uppercase; letter-spacing: 0.05em;">Total Turnkey Production Package (100% Fixed Price)</td>
          <td style="font-family: monospace;">10.5 hrs</td>
          <td>Turnkey</td>
          <td>$200.00 Flat</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Grid: Milestones & Guardrails -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">
        <span>⚙️</span> Turnkey Delivery Options Aligned to Aubrey
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Turnkey Package (Recommended):</strong> End-to-end production build</span>
        <span class="milestone-val">$200.00 Flat</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Phase 1 + 2 Core Ingestion & Synthesis:</strong> Feeds + 7 AM AI digest</span>
        <span class="milestone-val">$140.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Phase 3 Email Gateway Add-on:</strong> Resend SMTP & distribution hub</span>
        <span class="milestone-val">$60.00</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">
        <span>🛡️</span> Architectural Guardrails & Reliability
      </div>
      <div class="guardrail-item"><strong>Dual-Provider AI Failover:</strong> OpenAI gpt-4o-mini backed by sub-second Gemini 2.0 Flash backup.</div>
      <div class="guardrail-item"><strong>Automated 07:00 AM Cron:</strong> Serverless cron execution tuned to Atlanta (EST) time.</div>
      <div class="guardrail-item"><strong>DKIM & SPF Domain Alignment:</strong> Guarantees 100% inbox delivery with zero spam flagging.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Funding</div>
        <div class="term-body">Funded via standard Upwork fixed milestones; payment released on verification.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% IP Transfer</div>
        <div class="term-body">Full code repository, cron configurations, and prompts transfer unconditionally.</div>
      </div>
      <div class="term-col">
        <div class="term-title">14-Day Warranty</div>
        <div class="term-body">Two weeks post-launch hypercare for prompt tuning and threshold adjustments.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Validity</div>
        <div class="term-body">Terms and locked $200.00 fixed pricing guaranteed through October 14, 2026.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Acceptance & Contract Authorization</span>
      <span style="font-weight: 500; font-size: 7.2px; color: #475569;">Upwork Fixed-Price Contract Escrow</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Systems Provider (BarakahSoft LLC)</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">Sep 14, 2026</div>
        </div>
        <div class="auth-label">Authorized Provider Signature • Shakil Ahmed, Founder</div>
      </div>
      <div class="auth-party">
        <div class="auth-party-title">Client Acceptance (Aubrey • Atlanta, GA)</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="font-family: ui-monospace, monospace; font-size: 8px; color: #334155;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">Pending Offer</div>
        </div>
        <div class="auth-label">Authorized Client Signature</div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder & Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://trendpulse-ai-agent.vercel.app" target="_blank" class="demo-badge">trendpulse-ai-agent.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved estimate.html to:", html_path)

# Run headless Chrome to produce clean 1-page ESTIMATE.pdf with NO header/footer artifacts
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{os.path.abspath(html_path)}"
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    print("File size:", os.path.getsize(pdf_path), "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

# Verify page count
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")
assert len(pages) == 1, f"Expected 1 page, got {len(pages)}"
