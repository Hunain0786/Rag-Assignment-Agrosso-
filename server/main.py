from fastapi import FastAPI

from routes.upload import router as upload_router
from routes.ask import router as ask_router
from routes.health import router as health_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Private Knowledge Q&A",
    description="RAG system with Pinecone + Groq",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(ask_router)
app.include_router(health_router)


@app.get("/")
def root():
    return {"status": "API running"}
