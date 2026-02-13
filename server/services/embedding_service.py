from sentence_transformers import SentenceTransformer
import numpy as np

embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def embed_texts(texts):
    return embedder.encode(texts).astype(np.float32)

def embed_query(text):
    return embedder.encode(text).astype(np.float32).tolist()
