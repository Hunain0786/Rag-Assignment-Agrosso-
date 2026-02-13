const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function uploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function askQuestion(question: string) {
  const res = await fetch(`${API}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) throw new Error("Question failed");
  return res.json();
}

export async function getHealth() {
  const res = await fetch(`${API}/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
