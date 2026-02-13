# AI Usage Notes

## What I Used AI For

I mostly used AI to help with:

- **Styling stuff** - Getting Tailwind CSS classes right, making things look good and responsive
- **Fixing syntax errors** - When TypeScript or JavaScript threw errors I couldn't figure out
- **General formatting** - Making sure the code looked clean and consistent

## What I Did Myself

The FastAPI server was pretty straightforward, so I built that myself. All the core RAG logic - like processing documents, storing embeddings in Pinecone, and setting up the API endpoints - I figured out on my own.

---

## LLM and Provider

This app uses **Llama 3.3 (70B)** through **Groq's API**.

### Why Llama 3.3?

- It's really good at understanding context and summarizing information
- Works great for RAG applications (which is exactly what this is)
- It's an open-source model, so it's transparent and flexible
- Stays on topic and doesn't make stuff up when you give it context

### Why Groq?

- **Super fast** - Responses come back almost instantly
- **Optimized hardware** - They use special chips (LPUs) that make inference crazy fast
- **Affordable** - Cheaper than a lot of other options
- **Easy to use** - Simple API, no complicated setup
- **Reliable** - Doesn't randomly go down or slow down

Basically, Groq makes Llama run really fast, which is perfect for a Q&A app where you want quick answers.
