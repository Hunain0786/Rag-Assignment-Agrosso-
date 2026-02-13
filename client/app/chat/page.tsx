"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Ask from "../components/Ask";
import Sources from "../components/Sources";

export default function ChatPage() {
    const [result, setResult] = useState<any>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const savedResult = localStorage.getItem('chatResult');
        if (savedResult) {
            try {
                setResult(JSON.parse(savedResult));
            } catch (error) {
                console.error('Failed to parse saved result:', error);
            }
        }

        const savedFiles = localStorage.getItem('uploadedFiles');
        if (savedFiles) {
            try {
                const filesData = JSON.parse(savedFiles);
                const files = filesData.map((fileData: any) => {
                    return new File([], fileData.name, { type: fileData.type });
                });
                setUploadedFiles(files);
            } catch (error) {
                console.error('Failed to parse saved files:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const filesData = uploadedFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            }));
            localStorage.setItem('uploadedFiles', JSON.stringify(filesData));
        } else {
            localStorage.removeItem('uploadedFiles');
        }
    }, [uploadedFiles]);

    const handleSetResult = (newResult: any) => {
        setResult(newResult);
        if (newResult) {
            localStorage.setItem('chatResult', JSON.stringify(newResult));
        } else {
            localStorage.removeItem('chatResult');
        }
    };

    const clearHistory = () => {
        if (confirm('Are you sure you want to clear all chat history and uploaded files?')) {
            setResult(null);
            setUploadedFiles([]);
            localStorage.removeItem('chatResult');
            localStorage.removeItem('uploadedFiles');
        }
    };

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) {
            alert("Please select at least one file");
            return;
        }

        setLoading(true);
        try {
            const { uploadFiles } = await import("../lib/api");
            await uploadFiles(Array.from(files));
            setUploadedFiles(prev => [...prev, ...Array.from(files)]);
            alert("Upload successful");
        } catch {
            alert("Upload failed");
        }
        setLoading(false);
    };

    const handleRemoveFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex h-screen from-white to-gray-100">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-80 bg-white border-r-2 border-black flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4 sm:p-6 border-b-2 border-black flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center px-3 sm:px-4 py-2 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors duration-200 text-sm sm:text-base"
                    >
                        ← Home
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-black hover:text-gray-600 text-2xl"
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 sm:p-6 border-b-2 border-black">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-black">Upload Documents</h2>
                    <label className="block">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files)}
                            disabled={loading}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer inline-block w-full px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center disabled:bg-gray-400 text-sm sm:text-base"
                        >
                            {loading ? "Uploading..." : "+ Add Files"}
                        </label>
                    </label>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">Uploaded Files</h3>
                    {uploadedFiles.length === 0 ? (
                        <p className="text-gray-500 text-sm">No files uploaded yet</p>
                    ) : (
                        <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg group hover:border-black transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-black truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="ml-2 text-gray-400 hover:text-black transition-colors"
                                        title="Remove file"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear History Button */}
                <div className="p-4 sm:p-6 border-t-2 border-black">
                    <button
                        onClick={clearHistory}
                        className="w-full px-4 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base"
                    >
                        Clear History
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-hidden w-full">
                <div className="p-4 sm:p-6 border-b-2 border-black bg-white flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-black hover:text-gray-600 p-2"
                        aria-label="Open sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        Chat
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <Ask setResult={handleSetResult} hasFiles={uploadedFiles.length > 0} />

                        {result && (
                            <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 shadow-xl">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black">Answer</h2>
                                <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-800">{result.answer}</p>
                                <Sources sources={result.sources} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
