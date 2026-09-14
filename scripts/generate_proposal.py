import os

proposal_text = """hi aubrey,

built you a working prototype for this morning: https://trendpulse-ai-agent.vercel.app

most people bidding will give you a generic zapier flow or chatgpt wrapper that fails the moment an api times out. i put together a dedicated agent that monitors financial charts, tracks viral tiktok audio and hashtag momentum, and runs an automated 7:00 am briefing engine that synthesizes the trends and dispatches emails via smtp.

it has dual-provider ai fallback (openai gpt-4o-mini + gemini 2.0 flash) so your 7:00 am morning report lands even if one provider goes down.

in the live link you can test:
1. live financial sparklines (s&p 500, nasdaq, btc, sol, gold, 10y yield) and tiktok viral feeds
2. real-time ai morning synthesis with focus sector and tone controls
3. email dispatcher with dkim/spf delivery verification and review queue
4. automated 7:00 am cron schedule controls tuned to atlanta (est)

links:
live demo: https://trendpulse-ai-agent.vercel.app
github: https://github.com/exelentshakil/trendpulse-ai-agent
portfolio: https://barakahsoft.com

your $200 fixed budget works for the turnkey production build (data feeds, 7:00 am cron, dual ai engine, and smtp email dispatch with a 14-day warranty). attached the 1-page commercial estimate pdf to the proposal.

shakil
"""

# Verification
assert "—" not in proposal_text, "Found em-dash in proposal!"
assert "--" not in proposal_text, "Found double hyphen in proposal!"
char_count = len(proposal_text)
print(f"Proposal character count: {char_count} chars (limit: <1500)")
assert char_count < 1500, f"Proposal too long ({char_count} chars)!"

out_path = "/Users/shakil/Apps/claude-code/trendpulse-ai-agent/docs/PROPOSAL.md"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(proposal_text)

print("Saved proposal to:", out_path)
