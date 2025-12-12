import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movieApi";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [aiInfo, setAiInfo] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    // Fetch AI summary + OTT info
    async function fetchAIInfo(title, plot) {
        try {
            setAiLoading(true);

            const res = await fetch("http://localhost:5000/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieTitle: title, plot }),
            });

            const data = await res.json();
            setAiInfo(data.aiText); // raw text return from AI
        } catch (err) {
            console.error("AI fetch error:", err);
        } finally {
            setAiLoading(false);
        }
    }

    async function loadMovie() {
        const data = await getMovieById(id);
        setMovie(data);

        // Load AI summary after OMDB data arrives
        fetchAIInfo(data.Title, data.Plot);
    }

    useEffect(() => {
        loadMovie();
    }, [id]);

    if (!movie) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-lg">
            <div className="flex felx-col md:flex-row gap-8">

                {/* Poster */}
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    className="w-full md:w-72 rounded-lg shadow-lg"
                />

                {/* Info */}
                <div>
                    <h1 className="text-3xl font-bold">{movie.Title}</h1>
                    <p className="text-gray-600 text-lg mb-4 dark:text-gray-50">{movie.Year}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-black text-white rounded-full">{movie.Genre}</span>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-500 rounded-full">{movie.Runtime}</span>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-500 rounded-full">{movie.Rated}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-200">
                        {movie.Plot}
                    </p>

                    <p className="mb-2"><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                    <p className="mb-2"><span className="font-semibold">Director:</span> {movie.Director}</p>
                    <p className="mb-2"><span className="font-semibold">Writer:</span> {movie.Writer}</p>
                    <p className="mb-4"><span className="font-semibold">Language:</span> {movie.Language}</p>

                    {/* IMDB Rating */}
                    <div className="bg-yellow-300 inline-block px-4 py-2 rounded-xl text-lg font-bold shadow">
                        ⭐ {movie.imdbRating}
                    </div>

                    {/* Watchlist Button */}
                    {!isInWatchlist(movie.imdbID) ? (
                        <button
                            onClick={() => addToWatchlist(movie)}
                            className="mt-6 px-6 py-2 bg-black text-white rounded-lg"
                        >
                            + Add to Watchlist
                        </button>
                    ) : (
                        <button
                            onClick={() => removeFromWatchlist(movie.imdbID)}
                            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Remove from Watchlist
                        </button>
                    )}
                </div>
            </div>

            {/* AI Section */}
            <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
                <h2 className="text-2xl font-semibold mb-3">AI Summary & OTT Availability</h2>

                {aiLoading ? (
                    <p className="text-gray-600 dark:text-gray-300">Generating AI insights...</p>
                ) : aiInfo ? (
                    <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                        {aiInfo}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No AI info</p>
                )}
            </div>
        </div>
    );
}