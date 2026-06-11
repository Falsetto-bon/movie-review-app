import MediaCard from "../components/MediaCard";
import { useState, useEffect } from "react";
import { fetchTVShows } from "../services/api";

function TVShows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);
  const [category, setCategory] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim()) return;
    const loadTvShows = async () => {
      try {
        setLoading(true);
        const data = await fetchTVShows(category);
        const formattedData = data.map((show) => ({
          ...show,
          media_type: "tv",
        }));
        setTvShows(formattedData);
      } catch (err) {
        setError("Failed to load TV Shows...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadTvShows();
  }, [category]);
  const handleSearch = async (e) => {
    e?.preventDefault();
    try {
      if (!searchQuery.trim()) return;

      setLoading(true);
      const filteredTv = data.filter((item) => item.media_type === "tv");
      setSearchQuery(filteredTv);
      setError(null);
    } catch (err) {
      setError("Failed to search movies...");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center p-6 w-full">
      {/* Category Toggle Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className={`category-btn ${category === "popular" ? "active" : ""}`}
          onClick={() => setCategory("popular")}
        >
          Popular
        </button>
        <button
          className={`category-btn ${category === "on_the_air" ? "active" : ""}`}
          onClick={() => setCategory("on_the_air")} // Note: TMDB uses "on_the_air" instead of "upcoming" for TV shows
        >
          On The Air
        </button>
        <button
          className={`category-btn ${category === "top_rated" ? "active" : ""}`}
          onClick={() => setCategory("top_rated")}
        >
          Top Rated
        </button>
      </div>


      {error && (
        <div className="text-2xl text-red-500 text-center pt-8">{error}</div>
      )}

      {loading ? (
        <div className="text-2xl text-white text-center pt-8">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center ">
          {tvShows.map((tvShow) => (
            <MediaCard key={tvShow.id} media={tvShow} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TVShows;
