from fastapi import APIRouter
from groq import Groq
from config import GROQ_API_KEY
from services.pinecone_service import index

router = APIRouter()

@router.get("/health")
def health():

    healths = {
        "backend": "up",
        "llm": "down",
        "database": "down"
    }

    # --- Check Pinecone ---
    try:
        index.describe_index_stats()
        healths["database"] = "up"
    except Exception:
        healths["database"] = "down"

    # --- Check Groq ---
    try:
        client = Groq(api_key=GROQ_API_KEY)
        client.models.list()   # lightweight call
        healths["llm"] = "up"
    except Exception:
        healths["llm"] = "down"

    return healths
