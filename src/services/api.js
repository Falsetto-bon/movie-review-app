const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//MOVIES
export const fetchMovies = async (category) => {
  const response = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data;
};

//TV SHOWS
export const fetchTvDetails = async (tvId) => {
  const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const getPopularTvShows = async () => {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results; // Returns the array of TV show objects
};

export const getTopRatedTvShows = async () => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
};

export const getTrendingTvShows = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
};

export const searchMulti = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
};
