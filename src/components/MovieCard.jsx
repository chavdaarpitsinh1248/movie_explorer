import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <div className="bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

            {/* Movie Poster */}
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    className="w-full h-64 object-cover"
                />
            </Link>

            {/* Movie Info */}
            <div className="p-4">
                <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
                <p className="text-gray-600 text-sm">{movie.Year}</p>
            </div>
        </div>
    );
}