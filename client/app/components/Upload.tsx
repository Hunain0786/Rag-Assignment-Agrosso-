"use client";

import { useState } from "react";
import { uploadFiles } from "../lib/api";

export default function Upload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setLoading(true);
    try {
      await uploadFiles(Array.from(files));
      alert("Upload successful");
    } catch {
      alert("Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-2 border-black rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-black">Upload Documents</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="file"
          multiple
          onChange={e => setFiles(e.target.files)}
          className="flex-1 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-black hover:file:text-white file:transition-colors file:duration-200"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-6 py-2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
