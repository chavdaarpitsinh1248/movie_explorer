import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../api/movieApi";

export default function Home() {
  const [query, setQuery] = useState("avengers");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    const result = await searchMovies(query, year, type);
    setMovies(result);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadMovies();
  };

  return (
    <div className="mt-6">
      {/* Search + Filters */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search movies..."
          className="flex-1 border rounded-lg px-4 py-2 shadow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="w-24 border rounded-lg px-3 py-2 shadow"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 shadow"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* Movie Grid */}
      <MovieGrid movies={movies} />
    </div>
  );
}
