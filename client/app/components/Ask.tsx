"use client";

import { useState } from "react";
import { askQuestion } from "../lib/api";

export default function Ask({ setResult, hasFiles }: any) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (!hasFiles) {
      alert("Please upload at least one file before asking questions");
      return;
    }

    setResult(null);

    setLoading(true);
    try {
      const res = await askQuestion(question);
      console.log(" response from the llm", res)
      setResult(res);
    } catch {
      alert("Failed to get answer");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-2 border-black rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-black">Ask Question</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-black"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-6 py-2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
}
