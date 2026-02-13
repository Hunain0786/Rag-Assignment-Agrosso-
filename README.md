# Private Knowledge Q&A System

A RAG (Retrieval-Augmented Generation) system that allows you to upload documents and ask questions about them using AI.

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pinecone** - Vector database for document embeddings
- **Groq** - LLM API for question answering
- **Sentence Transformers** - Text embedding models
- **Python 3.11**

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Quick Start

### Prerequisites
- Docker installed on your system
- Docker Compose installed

### Running the Application

1. **Clone the repository** (if not already done)

2. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `client` and `server` directories
   - Add your API keys and configuration

3. **Run with Docker Compose**
   ```bash
   docker compose up --build -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Stopping the Application

```bash
docker-compose down
```

## Notes

- First build may take a few minutes to download dependencies
- Make sure ports 3000 and 8000 are available on your system
- Check the `.env` files for required API keys (Pinecone, Groq)

## Development

To view logs:
```bash
docker-compose logs -f
```

To rebuild after code changes:
```bash
docker-compose up --build
```
