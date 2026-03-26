import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter (GPT-4o / LLM inference)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

# Replicate (CLIP visual model)
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")

# Apify (screenshots, WHOIS, web scraping)
APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN", "")

# Server
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
PORT = int(os.getenv("PORT", 8001))

# OpenRouter model IDs
OPENROUTER_CHAT_MODEL = "openai/gpt-4o"
OPENROUTER_FAST_MODEL = "openai/gpt-4o-mini"

# Feature flags
VISUAL_ANALYSIS_ENABLED = bool(APIFY_API_TOKEN and REPLICATE_API_TOKEN)
LIVE_IOC_FEEDS_ENABLED = True
RAG_ENABLED = True
