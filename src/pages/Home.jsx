import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../api/movieApi";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [query, setQuery] = useState("avengers");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    const result = await searchMovies(query, year, type, page);
    setMovies(result);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, [page, query, year, type]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadMovies();
  };

  return (
    <div className="mt-6">
      {/* Search + Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6 items-center px-4 py-3 bg-white shadow rounded-xl">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border rounded-lg px-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="w-24 border rounded-lg px-3 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Search
        </button>
      </form>


      {/* Movie Grid And Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}

      {/* Pagination */}
      <div className="flex gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
