from fastapi import APIRouter
from services.embedding_service import embed_query
from services.pinecone_service import index
from services.rag_service import generate_answer
from models.request_model import QuestionRequest
router = APIRouter()

from pydantic import BaseModel



@router.post("/ask")
async def ask(question: QuestionRequest):

    print(question)

    query_vector = embed_query(question.question)

    response = index.query(
        vector=query_vector,
        top_k=3,
        include_metadata=True
    )

    matches = response["matches"]
    answer, sources = generate_answer(question.question, matches)

    return {
        "question": question.question,
        "answer": answer,
        "sources": sources
    }
