import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieCard({ movie }) {
    const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
    const saved = watchlist.some((m) => m.imdbID === movie.imdbID);

    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image */}
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Movie Info */}
            <div className="p-3">
                <h2 className="font-semibold text-lg line-clamp-1">{movie.Title}</h2>
                <p className="text-sm text-gray-500">{movie.Year}</p>

                {/* Watchlist Button */}
                {saved ? (
                    <button
                        onClick={() => removeFromWatchlist(movie.imdbID)}
                        className="mt-3 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Remove from Watchlist
                    </button>
                ) : (
                    <button
                        onClick={() => addToWatchlist(movie)}
                        className="mt-3 w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Add to Watchlist
                    </button>
                )}
            </div>
        </div>
    );
}
