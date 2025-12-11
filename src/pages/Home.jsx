import MovieGrid from "../components/MovieGrid";


export default function Home() {
    const dummyMovies = [
        { Title: "Avengers", Year: "2012", Poster: "https://m.media-amazon.com/images/M/MV5B.jpeg", imdbID: "1" },
        { Title: "Batman", Year: "2008", Poster: "https://m.media-amazon.com/images/M/MV5B.jpeg", imdbID: "2" },
        { Title: "Interstellar", Year: "2014", Poster: "https://m.media-amazon.com/images/M/MV5B.jpeg", imdbID: "3" },
        { Title: "Inception", Year: "2010", Poster: "https://m.media-amazon.com/images/M/MV5B.jpeg", imdbID: "4" },
        { Title: "Joker", Year: "2019", Poster: "https://m.media-amazon.com/images/M/MV5B.jpeg", imdbID: "5" }
    ];
    return (
        <div className="mt-6">
            <MovieGrid movies={dummyMovies} />
        </div>
    );
}