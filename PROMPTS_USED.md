# Prompts Used to Build This Project

---

## Prompt 1

**Prompt:** please help me style it using tailwindcss, I want simple black and white theme

```tsx
// this is my app.tsx

import { useState } from "react";
import Upload from "./components/Upload";
import Ask from "./components/Ask";
import Sources from "./components/Sources";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Private Knowledge Q&A</h1>

      <Upload />
      <hr />
      <Ask onResult={setResult} />
      {result && <Sources result={result} />}
    </div>
  );
}

export default App;
```

---

## Prompt 2

**Prompt:** how do i check pinecone health, should I try making a simple insert and then determine ?

---

## Prompt 3

**Prompt:** this is the idea I have come up with for health status page, is it looking good

```python
from fastapi import APIRouter
from groq import Groq
from config import GROQ_API_KEY
from services.pinecone_service import index
router = APIRouter()

@router.get("/health")
def health():

    healths = {
        "llm": "down",
        "database": "down"
    }

    client = Groq(api_key=GROQ_API_KEY)
    prompt = "Hello, how are you?"
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    llm_response=completion.choices[0].message.content
    if(len(llm_response) > 4):
        healths["llm"] = "up"
```

---

## Prompt 4

**Prompt:** Please help me make a navigation bar for my project that has only 2 routes that is health and chat following the same theme as the app.tsx

---

## Prompt 5

**Prompt:** Please help me make a health page that has the same theme as the app.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface HealthStatus {
    backend: "up" | "down";
    llm: "up" | "down";
    database: "up" | "down";
}

export default function HealthPage() {
    const [healthData, setHealthData] = useState<HealthStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/health")
            .then((res) => res.json())
            .then((data) => {
                setHealthData(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Navbar />

            <h1>Health Status</h1>

            {loading && <p>Loading...</p>}

            {!loading && !healthData && (
                <p>Failed to load health status</p>
            )}

            {!loading && healthData && (
                <div>
                    <p>Backend: {healthData.backend}</p>
                    <p>LLM: {healthData.llm}</p>
                    <p>Database: {healthData.database}</p>
                </div>
            )}
        </div>
    );
}
```

---

## Prompt 6

**Prompt:** Right now my docker image for server takes too long to start, can you please help me optimize it?

```dockerfile
# this is the current dockerfile

FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Prompt 7

**Prompt:** assume I have services server in docker-compose file, so when we run the docker-compose file what would be the server url for frontend ??

---

## Prompt 8

**Prompt:** Please help me add the logic to persist the uploaded files and chat history using localStorage

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Ask from "../components/Ask";
import Sources from "../components/Sources";

export default function ChatPage() {
  const [result, setResult] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setLoading(true);
    try {
      const { uploadFiles } = await import("../lib/api");
      await uploadFiles(Array.from(files));
      setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
      alert("Upload successful");
    } catch {
      alert("Upload failed");
    }
    setLoading(false);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen from-white to-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 bg-white border-r-2 border-black flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 sm:p-6 border-b-2 border-black flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center px-3 sm:px-4 py-2 border-2 border-black text-black font-semibold rounded-lg"
          >
            ← Home
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-black text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 border-b-2 border-black">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-black">
            Upload Documents
          </h2>

          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={loading}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
            Uploaded Files
          </h3>

          {uploadedFiles.length === 0 ? (
            <p>No files uploaded yet</p>
          ) : (
            <div>
              {uploadedFiles.map((file, index) => (
                <div key={index}>
                  <span>{file.name}</span>
                  <button onClick={() => handleRemoveFile(index)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t-2 border-black">
          <button onClick={clearHistory}>Clear History</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="p-4 sm:p-6 border-b-2 border-black bg-white flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            ☰
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold">Chat</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Ask setResult={setResult} hasFiles={uploadedFiles.length > 0} />

            {result && (
              <div>
                <h2>Answer</h2>
                <p>{result.answer}</p>
                <Sources sources={result.sources} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## Prompt 9

**Prompt:** right now the code in prompt_used.md is not formatted properly it's displaying half in bash and half as text, can you please help me format it ?

---