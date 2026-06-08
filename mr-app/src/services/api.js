const API_KEY = "9bc5940126afac002b5a9104af6e7fc2";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovie = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query)}`,
  );
  const data = await response.json();
  return data.results;
};
