import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movieApi";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie,setMovie] = useState(null);

    async function loadMovie() {
        const data = await getMovieById(id);
        setMovie(data);
    }

    useEffect(() => {
        loadMovie();
    }, [id]);

    if (!movie) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
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
                  <p className="text-gray-600 text-lg mb-4">{movie.Year}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1 bg-black text-white rounded-full">{movie.Genre}</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full">{movie.Runtime}</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full">{movie.Rated}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
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
                </div>
            </div>
        </div>
    )
}