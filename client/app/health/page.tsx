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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
            .then((res) => res.json())
            .then((data) => {
                setHealthData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-black">Health Status</h1>

                <div className="bg-white border-2 border-black rounded-lg p-8">
                    {loading ? (
                        <p className="text-gray-600">Loading...</p>
                    ) : healthData ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Backend:</span>
                                <span className={`px-4 py-2 rounded font-semibold ${healthData.backend === "up"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}>
                                    {healthData.backend}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">LLM:</span>
                                <span className={`px-4 py-2 rounded font-semibold ${healthData.llm === "up"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}>
                                    {healthData.llm}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Database:</span>
                                <span className={`px-4 py-2 rounded font-semibold ${healthData.database === "up"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}>
                                    {healthData.database}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-600">Failed to load health status</p>
                    )}
                </div>
            </main>
        </div>
    );
}
