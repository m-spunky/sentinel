  ---
  SentinelAI Fusion — Complete Rethink                                                                                                                            
                                                                                                                                                                    What PS1 Actually Asks For                                                                                                                                      
                                                                                                                                                                  
  ▎ "Detect phishing in real time from email content or URLs. ML/NLP classification. Confidence score. Dashboard."

  What we built: A threat intelligence platform focused on campaign tracking, knowledge graphs, and actor attribution — essentially a SOC tool. That's PS2+PS3+PS4
   territory mixed together. The CORE of PS1 — the phishing detector itself — is buried under layers of irrelevant complexity.

  What judges will evaluate:
  1. Detection Accuracy — Does it correctly catch phishing?
  2. False Positive Rate — Does it wrongly flag legitimate emails?
  3. Detection Speed — How fast is the result?
  4. Explainability — Can a non-technical user understand WHY it flagged something?
  5. User Experience — Is the interface intuitive and impressive?

  ---
  The Correct System: PhishGuard by SentinelAI

  One focused purpose: You give it an email or URL. It tells you if it's a phishing attack, with proof.

  ---
  Full Architecture Plan

  Backend — 5-Layer Detection Pipeline

  INPUT
    │
    ├── Email Text/Headers
    ├── URL
    ├── Gmail OAuth (auto-ingest)
    ├── Bulk CSV Upload
    └── Image / QR Code (Quishing)
    │
    ▼
  LAYER 1 — NLP Intent Engine (OpenRouter GPT-4o-mini)
    - Detects urgency, fear, authority, reward language
    - Credential harvesting phrase detection
    - Sender spoofing patterns in text
    - AI-generated content markers
    - Output: nlp_score, intent_flags[], top_phrases[]

  LAYER 2 — URL Intelligence Engine
    - WHOIS domain age (new domains = high risk)
    - DNS: SPF, DKIM, DMARC validation
    - URLhaus + OpenPhish + PhishTank live blacklist
    - URL entropy analysis (obfuscated URLs)
    - Redirect chain unwrapping
    - Subdomain abuse detection (paypal.secure-login.xyz)
    - TLD risk scoring (.xyz, .tk, .click = high risk)
    - Output: url_score, domain_age_days, blacklist_hit, redirect_chain[]

  LAYER 3 — Visual Sandbox Engine (Apify + CLIP)
    - Apify headless browser VISITS the URL in isolation
    - Full-page screenshot captured
    - CLIP model compares screenshot to 50 brand logo profiles
    - DOM analysis: form fields asking for passwords/cards
    - Certificate chain validation
    - Network requests monitored for C2 patterns
    - Favicon hash comparison
    - Output: visual_score, brand_impersonated, screenshot_url, dom_flags[]

  LAYER 4 — Email Header Forensics
    - SPF/DKIM/DMARC pass/fail
    - Reply-To vs From domain mismatch
    - X-Originating-IP geo reputation
    - Email routing path anomalies
    - Display name spoofing detection
    - Output: header_score, spf, dkim, dmarc, routing_flags[]

  LAYER 5 — Threat Intelligence Correlation
    - URLhaus IOC feed match
    - AlienVault OTX pulse correlation
    - Known phishing kit fingerprinting
    - Campaign pattern matching
    - Dark web credential exposure check (HaveIBeenPwned API)
    - Historical sender reputation
    - Output: intel_score, campaign_match, credential_exposure_count

  FUSION ENGINE
    - Weighted ensemble (NLP×0.30, URL×0.25, Visual×0.20, Header×0.15, Intel×0.10)
    - Isolation Forest anomaly boost for zero-days
    - Final score: 0–100%
    - Verdict: CLEAN / SUSPICIOUS / PHISHING / CONFIRMED_THREAT

  EXPLAINABILITY ENGINE
    - SHAP feature attribution (top 8 factors driving the score)
    - GPT-4o-mini forensic narrative ("This email impersonates PayPal...")
    - MITRE ATT&CK tactic mapping (T1566, T1598, etc.)
    - Recommended action

  ---
  Additional Features from PS2, PS3, PS4, PS5

  From PS2 (Bot/Credential Stuffing Detection):
  - Dashboard widget: Login anomaly monitor
  - If email contains credential harvesting links → show kill chain: "Phishing → Credential Theft → Account Takeover"
  - Bot behavior analysis on bulk upload patterns

  From PS3 (Fraud Detection):
  - Kill chain visualization: when phishing is financial in nature, show fraud risk amplifier
  - "This phishing email targets banking credentials — 78% of similar attacks resulted in wire fraud within 48h"
  - Transaction risk scoring when email mentions financial actions

  From PS4 (Security Chatbot — SentinelChat):
  - Natural language queries: "Show all phishing targeting finance this week"
  - "Explain what SPF failure means in this email"
  - "What brand is this URL impersonating?"
  - Full RAG over analysis history

  From PS5 (Dark Web Monitoring):
  - HaveIBeenPwned integration: check if sender's domain has leaked credentials
  - "This domain appears in 3 known breach datasets"
  - Paste leaked credential dumps for analysis

  ---
  New Features (Beyond PS Scope — Win the Hackathon)

  1. Gmail OAuth Integration

  User connects Gmail → OAuth2 flow
  Inbox shown in platform with AI risk scores next to every email
  Green shield = clean, amber = suspicious, red = phishing
  Click any email → instant full analysis
  Auto-analyze new incoming emails in real time

  2. URL Sandboxing (Full Isolation)

  Apify visits URL in headless Chrome
  Records:
    - Full page screenshot
    - Redirect chain (URL hops)
    - All form fields detected
    - JavaScript behaviors
    - Network requests made
    - SSL certificate details
    - Time to interactive
  Shows in UI: "Live sandbox recording" with annotated screenshot

  3. QR Code Phishing (Quishing) Detection

  Upload image containing QR code
  System decodes QR → extracts embedded URL
  Runs full URL + Visual analysis on extracted URL
  This catches modern "quishing" attacks that bypass email scanners

  4. Bulk Analysis Mode

  Upload CSV file with 100 URLs or email subjects
  Batch process with progress bar
  Each result scored in parallel
  Export full report as CSV + PDF

  5. Real-Time Feedback Loop

  After each analysis, user can click:
    ✓ Correct — improves model confidence
    ✗ False Positive — marks email as safe, adjusts threshold
    ✗ Missed — marks as phishing that was flagged clean
  Feedback visible on dashboard as accuracy metrics
  Shows: "Model accuracy this week: 98.4% (based on 127 confirmed cases)"

  6. Email Forwarding Ingest

  User gets a unique @sentinelai.io forward address
  They forward suspicious emails to it
  System auto-analyzes and emails back the verdict
  No UI needed — works from any email client

  7. Browser Extension Preview Mode

  On the Analyze page, show a browser extension mockup
  Demonstrates: "This is how it would look in Gmail/Outlook"
  Extension-ready API endpoints already built
  Massive UX demo point for judges

  ---
  Frontend Pages (Redesigned for PS1)

  Page 1: Landing (/)

  Focus: "The world's fastest phishing detector"
  - Hero: Paste box RIGHT ON THE LANDING PAGE — no signup needed, instant demo
  - Live counter: "X phishing attempts detected today"
  - Side-by-side: paste email → watch AI score it in real-time animation
  - Feature tiles: Gmail integration, URL sandboxing, SHAP explainability, bulk mode
  - PS2/PS3/PS4/PS5 badges: "Also detects: Bot attacks, Fraud indicators, Dark web exposure"

  Page 2: Analyze (/dashboard/analyze)

  The Core Page — judges will spend most time here

  Left column:
  - Input Panel with 5 tabs:
    a. Email Text (paste full email body)
    b. URL Scanner (single URL)
    c. Raw Headers (paste Received: headers)
    d. QR Code (upload image)
    e. Bulk Upload (CSV)
  - "Run Analysis" → results appear in right column live as each layer completes

  Right column (results stream in as each layer finishes):
  - Live Pipeline Progress — 5 stages light up in real time (< 1.5s total)
  - Threat Score Gauge — big circular percentage with verdict banner
  - Model Breakdown — 4 bars showing each layer's individual score
  - Sandbox Screenshot — Apify screenshot with annotated overlays (brand logos highlighted, form fields boxed in red)
  - SHAP Chart — horizontal bars: "Urgency language +34%, New domain +28%, No DMARC +15%..."
  - AI Explanation — GPT narrative paragraph
  - Evidence Panel — clickable flags: domain age, redirect chain, SPF fail, etc.
  - MITRE Mapping — tactic badges
  - Dark Web Alert — if email domain has known credential exposure
  - Kill Chain — if financial → shows Phishing → Credential Theft → Wire Fraud path
  - Action Buttons — Mark Safe / Mark Phishing / Generate PDF / Copy API Response

  Page 3: Inbox (/dashboard/inbox) ← NEW

  Gmail Integration

  - "Connect Gmail" button → OAuth2 flow
  - Once connected: shows inbox with risk score badge next to each email
  - Green/amber/red shield icon
  - Summary bar: "23 emails analyzed — 2 flagged as phishing, 1 suspicious"
  - Click any email → slide-in panel with full analysis
  - Real-time: new emails auto-analyzed when they arrive
  - Filter by risk level
  - Bulk select → mark all as safe or report phishing

  Page 4: Sandbox (/dashboard/sandbox) ← NEW

  URL Sandboxing Deep Dive

  - Input: URL
  - Shows full Apify sandbox session:
    - Screenshot (full page, annotated)
    - Redirect chain timeline (URL1 → URL2 → URL3 → final destination)
    - DOM analysis: form fields detected with red boxes
    - Network requests log
    - SSL certificate details
    - JavaScript behaviors detected
    - Performance metrics
  - Side panel: brand similarity score with matched brand logo
  - Risk verdict with specific DOM evidence

  Page 5: History (/dashboard/history) ← Replaces Campaigns

  Analysis History & Trends

  - Timeline of all past analyses
  - Trend chart: phishing rate over time
  - Brand impersonation breakdown: "Most impersonated: PayPal (34%), Google (28%), Bank of America (19%)"
  - False positive rate tracker (from feedback loop)
  - Export all results as CSV
  - Search/filter by date, verdict, brand

  Page 6: Dashboard (/dashboard)

  Executive Overview

  - Live threat counter (WebSocket)
  - Accuracy metrics from feedback loop
  - Pipeline health status
  - Recent phishing attempts feed
  - Brand impersonation pie chart
  - Response time graph (< 1.5s average)
  - Quick analyze widget (paste URL/email without leaving dashboard)
  - PS2 widget: "Login anomaly monitor"
  - PS5 widget: "Dark web exposure alerts"

  Page 7: SentinelChat (/dashboard/chat)

  PS4 Compliance

  Keep exactly as built — already excellent.

  ---
  Technology Stack (What to Keep, What to Add)

  Keep (already built and working):

  - FastAPI backend on port 8001
  - NLP engine (OpenRouter GPT-4o-mini)
  - URL analyzer (WHOIS + DNS + URLhaus)
  - Visual engine (Apify + CLIP)
  - Header analyzer
  - Fusion engine
  - SHAP explainability
  - SentinelChat (RAG + ChromaDB)
  - WebSocket streaming
  - PDF reports (ReportLab)

  Add (new development):

  Backend:
  - routers/gmail.py — OAuth2 Gmail API integration (Google API Python Client)
  - routers/sandbox.py — Deep Apify sandbox endpoint (redirect chain + DOM + network)
  - routers/feedback.py — User feedback collection + model calibration
  - routers/history.py — Analysis history storage + trend queries
  - routers/bulk.py — CSV batch processing endpoint
  - routers/quishing.py — QR code decode + analyze pipeline
  - engines/credential_check.py — HaveIBeenPwned API for domain exposure
  - engines/kill_chain.py — PS2/PS3 kill chain visualizer

  Frontend:
  - app/dashboard/inbox/page.tsx — Gmail inbox with risk overlays
  - app/dashboard/sandbox/page.tsx — Deep URL sandbox viewer
  - app/dashboard/history/page.tsx — Analysis history + trend charts
  - components/analyze/SandboxPreview.tsx — Screenshot with annotations
  - components/analyze/RedirectChain.tsx — URL hop timeline
  - components/analyze/KillChain.tsx — PS2/PS3 attack progression
  - components/analyze/QRUpload.tsx — QR code upload + decode
  - components/analyze/BulkUpload.tsx — CSV drag-drop + progress
  - components/analyze/FeedbackButtons.tsx — Correct / False Positive / Missed
  - components/inbox/GmailConnectBanner.tsx — OAuth connect UI
  - components/inbox/EmailListItem.tsx — Email row with risk badge
  - components/dashboard/BrandImpersonationChart.tsx — Top impersonated brands

  ---
  Evaluation Metric Maximization Strategy

  ┌───────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
  │      Metric       │                                                             How We Max It                                                             │   
  ├───────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Detection         │ 5-layer ensemble (NLP + URL + Visual + Header + Intel) catches what single models miss. Zero-day detection via CLIP visual + NLP      │   
  │ Accuracy          │ intent, not just blacklists                                                                                                           │   
  ├───────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ False Positive    │ Multi-signal confirmation (needs 2+ layers to agree before HIGH verdict). Feedback loop calibrates thresholds. Whitelist for          │   
  │ Rate              │ known-safe domains                                                                                                                    │   
  ├───────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Detection Speed   │ All 5 layers run in parallel async. Results stream via WebSocket as each layer completes. NLP + URL finish in ~200ms. Total < 1.5s.   │   
  │                   │ Show live progress so UX feels instant                                                                                                │   
  ├───────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Explainability    │ SHAP attribution (specific numbers), GPT-4o narrative (plain English), MITRE mapping (industry standard), annotated sandbox           │   
  │                   │ screenshot (visual proof), redirect chain (step-by-step evidence)                                                                     │   
  ├───────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ User Experience   │ Gmail integration (no copy-paste needed), sandbox screenshot (see the fake site), QR code detection (modern attack), feedback loop,   │   
  │                   │ one-click PDF report, SentinelChat for natural language queries                                                                       │   
  └───────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘   

  ---
  What to Build First (Priority Order)

  Phase 1 — Core PS1 (existing, mostly done):
  - ✅ NLP + URL + Visual + Header + Fusion engine
  - ✅ Analyze page with results
  - ✅ SHAP chart + AI explanation
  - 🔧 Fix: make pipeline results stream in real-time (show layers completing live)
  - 🔧 Fix: add feedback buttons to every result

  Phase 2 — Win-the-hackathon features:
  1. Gmail OAuth integration (backend + Inbox page) ← biggest WOW factor
  2. URL Sandboxing deep dive page (screenshot + redirect chain + DOM)
  3. QR code (quishing) detection tab
  4. Feedback loop + accuracy tracker on dashboard
  5. Kill chain visualization (PS2/PS3 angle)

  Phase 3 — Polish:
  1. Bulk CSV upload
  2. Analysis History page
  3. Dark web credential exposure (HaveIBeenPwned)
  4. Brand impersonation chart on dashboard
  5. Landing page quick-demo widget

  ---
  What Makes This Win

  1. Gmail integration — judges have never seen a hackathon project that actually reads your real inbox and scores every email in real-time. Zero competition does
   this.
  2. Live sandbox with annotated screenshot — showing judges the actual fake PayPal page with red boxes around the password field is 10x more convincing than a   
  number.
  3. Quishing detection — QR code phishing is a hot topic in 2025/2026. No other team will have this.
  4. The kill chain — showing judges "this phishing email → credential theft → wire fraud" narrative hits PS1, PS2, AND PS3 simultaneously.
  5. Explainability is PS1's secret weapon — judges love SHAP charts because they make AI understandable. This directly maximizes the Explainability metric which 
  most teams ignore.
  6. Feedback loop with live accuracy stats — showing "98.4% accuracy based on 127 confirmed cases" on the dashboard makes the system look production-ready, not  
  prototype-level.

  ---
  Do you want me to start rebuilding the system to this spec? I'd suggest starting with the Gmail OAuth integration backend + Inbox page since that's the
  highest-impact new feature, then we iterate through the phases.