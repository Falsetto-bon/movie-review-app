import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovie, fetchPopularMovies } from "../services/api";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  const handleSearch = async (e) => {
    e?.preventDefault();
    try {
      if (!searchQuery.trim()) return;

      setLoading(true);
      const searchedMovie = await searchMovie(searchQuery);
      setMovies(searchedMovie);
      setError(null);
    } catch (err) {
      setError("Failed to search movies...");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <form
        className="w-full max-w-3xl flex items-center gap-3 mb-6 px-4"
        onSubmit={handleSearch}
      >
        <div className="relative flex-1">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
            value={searchQuery}
            className="w-full h-12 pl-4 pr-24 rounded-xl bg-zinc-900/80 border border-zinc-700 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-pink-500/60"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <span className="text-sm">TMDb</span>
          </div>
        </div>

        <button
          type="submit"
          className="h-12 px-5 rounded-xl bg-red-600 text-sm font-semibold text-zinc-100 transition hover:bg-red-500 active:bg-red-600"
        >
          Search
        </button>
      </form>
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
