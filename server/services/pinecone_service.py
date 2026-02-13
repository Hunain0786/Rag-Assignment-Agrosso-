import os
from pinecone import Pinecone, ServerlessSpec
from config import PINECONE_API_KEY
pc = Pinecone(api_key=PINECONE_API_KEY)

INDEX_NAME = "text-rag-index"

if INDEX_NAME not in pc.list_indexes().names():
    pc.create_index(
        name=INDEX_NAME,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

index = pc.Index(INDEX_NAME)
