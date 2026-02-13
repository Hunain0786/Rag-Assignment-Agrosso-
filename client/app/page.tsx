"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const steps = [
    "User uploads text file",
    "Extract text from .txt file from user",
    "Chunk document into smaller overlapping text segments",
    "Convert chunks to embeddings using sentence-transformers/all-MiniLM-L6-v2",
    "Insert embeddings to Pinecone database",
    "Retrieve results by providing top_k values",
    "Send results from vector DB to LLM (Groq) to generate answer",
    "Display answer to user"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-black">
            Private Knowledge Q&A
          </h1>
          <p className="text-xl text-gray-600">
            RAG System powered by Pinecone + Groq
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">
            System Workflow
          </h2>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <span className="font-bold text-black">Step {index + 1}:</span>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/chat"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start Chatting
          </Link>
        </div>
      </main>
    </div>
  );
}
