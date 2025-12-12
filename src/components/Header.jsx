import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";


export default function Header() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <Link to="/">
                <h1 className="text-2xl font-bold">Movie Explorer</h1>
            </Link>

            <nav className="flex gap-6 text-lg">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
                >
                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>

                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link to="/watchlist" className="hover:text-yellow-300 transition">Watchlist</Link>
            </nav>
        </header>
    );
}