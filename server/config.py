import os
from dotenv import load_dotenv

load_dotenv()   # 🔥 loads .env file

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# optional safety checks
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment")

if not PINECONE_API_KEY:
    raise ValueError("PINECONE_API_KEY not found in environment")
