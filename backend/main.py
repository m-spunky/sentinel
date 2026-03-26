"""
SentinelAI Fusion — FastAPI Backend
Multi-layered AI-powered cyber threat intelligence and defense platform.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import FRONTEND_URL, PORT
from routers import analyze, intelligence, chat, dashboard
from routers import stream, behavioral, campaigns, reports


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: pre-initialize the knowledge graph
    from intelligence.knowledge_graph import get_graph
    graph = get_graph()
    node_count = graph.G.number_of_nodes()
    edge_count = graph.G.number_of_edges()
    print(f"[SentinelAI] Knowledge graph: {node_count} nodes, {edge_count} edges")
    # Pre-warm RAG pipeline
    try:
        from chat.rag_pipeline import get_rag
        rag = get_rag()
        rag._try_init_chromadb()
        print(f"[SentinelAI] RAG pipeline initialized ({len(rag._docs)} documents)")
    except Exception as e:
        print(f"[SentinelAI] RAG init warning: {e}")
    print("[SentinelAI] Startup complete. All systems operational.")
    yield
    print("[SentinelAI] Shutdown complete.")


app = FastAPI(
    title="SentinelAI Fusion API",
    description="Multi-modal AI-powered cyber threat intelligence and defense platform.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://senti-ai-sepia.vercel.app",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register all routers ───────────────────────────────────────────────────────
app.include_router(analyze.router)          # /api/v1/analyze/*, /api/v1/events/*, /api/v1/response/*
app.include_router(intelligence.router)     # /api/v1/intelligence/*
app.include_router(chat.router)             # /api/v1/chat
app.include_router(dashboard.router)        # /api/v1/dashboard/*, /api/v1/campaigns (legacy)
app.include_router(stream.router)           # /api/v1/stream (WebSocket)
app.include_router(behavioral.router)       # /api/v1/behavioral/*
app.include_router(campaigns.router)        # /api/v1/campaigns, /api/v1/actors
app.include_router(reports.router)          # /api/v1/reports/*


@app.get("/")
async def root():
    return {
        "service": "SentinelAI Fusion API",
        "version": "2.0.0",
        "status": "operational",
        "docs": "/docs",
        "modules": {
            "PS-01_phishing_detection": {
                "analyze_email": "POST /api/v1/analyze/email",
                "analyze_url": "POST /api/v1/analyze/url",
                "get_result": "GET /api/v1/events/{event_id}/result",
            },
            "PS-02_behavioral": {
                "bot_detection": "POST /api/v1/behavioral/bot-detection",
                "credential_stuffing": "POST /api/v1/behavioral/credential-stuffing",
            },
            "PS-03_fraud": {
                "fraud_detection": "POST /api/v1/behavioral/fraud-detection",
                "kill_chain": "GET /api/v1/behavioral/kill-chain/{event_id}",
            },
            "PS-04_sentinelchat": {
                "chat": "POST /api/v1/chat",
                "history": "GET /api/v1/chat/history",
            },
            "PS-05_threat_intel": {
                "knowledge_graph": "GET /api/v1/intelligence/graph",
                "campaigns": "GET /api/v1/campaigns",
                "actors": "GET /api/v1/actors",
                "correlate": "POST /api/v1/intelligence/correlate",
                "search": "POST /api/v1/intelligence/search",
            },
            "dashboard": {
                "metrics": "GET /api/v1/dashboard/metrics",
                "feed": "GET /api/v1/dashboard/feed",
                "timeline": "GET /api/v1/dashboard/timeline",
            },
            "stream": "WS /api/v1/stream",
            "reports": "POST /api/v1/reports/generate",
            "response": "POST /api/v1/response/execute",
        },
    }


@app.get("/health")
async def health():
    from intelligence.knowledge_graph import get_graph
    graph = get_graph()
    return {
        "status": "healthy",
        "service": "SentinelAI Fusion",
        "version": "2.0.0",
        "modules": {
            "knowledge_graph": f"{graph.G.number_of_nodes()} nodes",
            "nlp_engine": "openrouter/gpt-4o-mini",
            "visual_engine": "apify+replicate-clip",
            "url_analyzer": "whois+dns+urlhaus",
            "sentinelchat": "openrouter/gpt-4o+chromadb-rag",
            "ioc_feeds": "urlhaus+otx",
            "behavioral": "isolation-forest+timing-analysis",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
