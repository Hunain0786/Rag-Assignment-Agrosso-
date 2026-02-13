# Prompts Used to Build This Project

---

## Prompt 1

```
this is my app.tsx

please help me style it using tailwindcss, I want simple black and white theme

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

### Prompt 2

- how do i check pinecone health, should I try making a simple insert and then determine ?

---

### Prompt 3

---

- this is the idea I have come up with for health status page, is it looking good

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
  
---

### Prompt 4

- Please help me make a navigation bar for my project that has only 2 routes that is health and chat following the same theme as the app.tsx

---