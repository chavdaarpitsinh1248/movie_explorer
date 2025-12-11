const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query, year = "", type = "") {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    if (year) url += `&y=${year}`;
    if (type) url += `&type=${type}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.Search || [];
}

export async function getMovieById(id) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}