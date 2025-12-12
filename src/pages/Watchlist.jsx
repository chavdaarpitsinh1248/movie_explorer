import MovieGrid from "../components/MovieGrid";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
    const { watchlist } = useWatchlist();

    return (
        <div className="mt-6">
            <h1 className="text-3xl dark:text-white font-bold mb-6">Your Watchlist</h1>

            {watchlist.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No movies added yet.</p>
            ) : (
                <MovieGrid movies={watchlist} />
            )}
        </div>
    );
}