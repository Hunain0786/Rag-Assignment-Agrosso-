from groq import Groq
import os
from config import GROQ_API_KEY
client = Groq(api_key=GROQ_API_KEY)

def generate_answer(question, matches):
    context_parts = []
    sources = []

    for m in matches:
        text = m["metadata"]["text"]
        doc = m["metadata"]["document"]

        context_parts.append(text)
        sources.append({"document": doc, "content": text})

    context = "\n\n".join(context_parts)

    prompt = f"""
Answer ONLY using the context below.
If not found, say you don't know.   

Context:
{context}

Question:
{question}
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return completion.choices[0].message.content, sources
