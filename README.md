# SentinelAI Fusion

Multi-layered AI-powered cyber threat intelligence and defense platform.

## Architecture

```
D:/Projects/Sentinel/
├── backend/          # FastAPI Python backend
│   ├── main.py       # FastAPI app entry point
│   ├── models/       # Analysis engines (NLP, URL, Header, Fusion)
│   ├── intelligence/ # Threat knowledge graph (NetworkX)
│   ├── chat/         # SentinelChat (Claude API)
│   └── routers/      # API route handlers
├── sentiAi/          # Next.js 16 frontend
│   ├── app/          # Pages (dashboard, analyze, chat, intelligence, campaigns)
│   ├── components/   # UI components
│   └── lib/api.ts    # Typed API client
├── start_backend.bat
└── start_frontend.bat
```

## Quick Start

### Backend (port 8001)
```bash
cd backend
pip install -r requirements.txt
# Set ANTHROPIC_API_KEY in .env for SentinelChat
python -m uvicorn main:app --port 8001 --reload
```

### Frontend (port 3000)
```bash
cd sentiAi
npm install
npm run dev
```

API docs: http://localhost:8001/docs

## Core Analysis Engines

| Engine | Technology | What it detects |
|--------|-----------|-----------------|
| NLP Intent | Regex + pattern matching | Urgency, Authority Impersonation, Credential Harvesting, Fear tactics |
| URL Analyzer | Feature extraction (150+ features) | Domain age, typosquatting, brand impersonation, entropy |
| Header Analyzer | SPF/DKIM/DMARC parsing | Email auth failures, Reply-To mismatch, routing anomalies |
| Fusion Engine | Attention-weighted ensemble | Unified threat score with per-model breakdown |
| SentinelChat | Claude API (claude-sonnet-4-6) | Natural language security ops queries |
| Explanation | Claude API (claude-haiku) | LLM-generated forensic narratives |

## Demo Scenarios

**Scenario 1 — CFO Wire Fraud (CRITICAL)**:
```
From: cfo.johnson@auth-login.net
Reply-To: attacker@gmail.com
Subject: Urgent: Wire Transfer Approval Required

Act now and verify at https://auth-login.net/secure/verify
Your account will be suspended within 2 hours.
```
Expected: CRITICAL (~88%), FIN7 attribution, CAMP-2026-1847

**Scenario 2 — Safe Email (SAFE)**:
```
Subject: Q3 Financial Report
From: cfo@legitimate-company.com

Please find the Q3 report attached.
```
Expected: SAFE (~10%)

## Environment Variables

**backend/.env**:
```
ANTHROPIC_API_KEY=sk-ant-...   # Required for SentinelChat + explanations
FRONTEND_URL=http://localhost:3000
PORT=8001
```

**sentiAi/.env.local**:
```
NEXT_PUBLIC_API_URL=http://localhost:8001
```
