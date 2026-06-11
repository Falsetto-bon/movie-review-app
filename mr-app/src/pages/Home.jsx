import MediaCard from "../components/MediaCard";
import { useState, useEffect } from "react";
import { searchMulti, fetchMovies } from "../services/api";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (searchQuery.trim()) return;
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies(category);
        setMovies(movies);
      } catch (err) {
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchQuery, category]);
  const handleSearch = async (e) => {
    e?.preventDefault();
    try {
      if (!searchQuery.trim()) return;

      setLoading(true);
      const filteredMovies = movies.filter((item) => item.media_type === "movie");
      setSearchQuery(filteredMovies);
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
      <div className="flex gap-3 mb-6">
        <button
          className={"category-btn" + (category === "popular" ? " active" : "")}
          onClick={() => setCategory("popular")}
        >
          Popular
        </button>
        <button
          className={
            "category-btn" + (category === "upcoming" ? " active" : "")
          }
          onClick={() => setCategory("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={
            "category-btn" + (category === "top_rated" ? " active" : "")
          }
          onClick={() => setCategory("top_rated")}
        >
          Top Rated
        </button>
      </div>
      {error && (
        <div className="text-2xl text-white text-center pt-8">{error}</div>
      )}
      {loading ? (
        <div className="text-2xl text-white text-center pt-8">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <MediaCard key={movie.id} media={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
