import MediaCard from "../components/MediaCard";
import { useState, useEffect } from "react";
import { searchMulti, getPopularTvShows, getTopRatedTvShows, getTrendingTvShows } from "../services/api";

function TVShows() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (searchQuery.trim()) return;
    const loadTvShows = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrendingTvShows(),
          getPopularTvShows(),
          getTopRatedTvShows(),
        ]);
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
      } catch (err) {
        setError("Failed to load TV Shows...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadTvShows();
  }, [searchQuery]);
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
    <div className="flex flex-col items-center">
      {error && (
        <div className="text-2xl text-white text-center pt-8">{error}</div>
      )}
      {loading ? (
        <div className="text-2xl text-white text-center pt-8">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {popular.map((p) => (
            <MediaCard key={p.id} media={p} />
          ))}
          {trending.map((p) => (
            <MediaCard key={p.id} media={p} />
          ))}
          {topRated.map((p) => (
            <MediaCard key={p.id} media={p} />
          ))}
        </div>
        
      )}
    </div>
  );
}

export default TVShows;
