import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../api/movieApi";


export default function Home() {
    const [query, setQuery] = useState("avengers"); // default search
    const [movies, setMovies] = useState([]);

    async function loadMovies() {
        const result = await searchMovies(query);
        setMovies(result);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        loadMovies();
    };

    return (
        <div className="mt-6">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-3">
                <input 
                    type="text"
                    placeholder="Search movies..."
                    className="flex-1 border rounded-lg px-4 py-2 shadow"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray800 transition"
                >
                    Search
                </button>
            </form>

            {/* Movie Grid */}
            <MovieGrid movies={movies} />
        </div>
    );
}