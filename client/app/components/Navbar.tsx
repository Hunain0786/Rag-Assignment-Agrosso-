"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Chat", path: "/chat" },
        { name: "Health", path: "/health" },
    ];

    return (
        <nav className="bg-white border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="text-xl sm:text-2xl font-bold text-black hover:text-gray-700 transition-colors"
                    >
                        RAG App
                    </Link>

                    <div className="flex space-x-2 sm:space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                  px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base
                  ${pathname === item.path
                                        ? "bg-black text-white"
                                        : "text-black hover:bg-gray-100 border-2 border-black"
                                    }
                `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
