const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (category) => {
  const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
4
export const searchMovie = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query)}`,
  );
  const data = await response.json();
  return data.results;
};
