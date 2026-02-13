from fastapi import APIRouter, UploadFile, File
from typing import List
from utils.chunking import chunk_text
from services.embedding_service import embed_texts
from services.pinecone_service import index
import uuid

router = APIRouter()

@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    total_chunks = 0

    for file in files:
        text = (await file.read()).decode("utf-8", errors="ignore")
        chunks = chunk_text(text)
        embeddings = embed_texts(chunks)

        vectors = []
        for i, emb in enumerate(embeddings):
            vectors.append({
                "id": str(uuid.uuid4()),
                "values": emb.tolist(),
                "metadata": {
                    "text": chunks[i],
                    "document": file.filename
                }
            })

        index.upsert(vectors)
        total_chunks += len(chunks)

    return {"uploaded_chunks": total_chunks}
