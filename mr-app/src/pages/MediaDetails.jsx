import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchTvDetails } from "../services/api";

function MediaDetails() {
  const { type, id } = useParams(); 
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTv = type === "tv";

  useEffect(() => {
    const loadMediaDetails = async () => {
      try {
        setLoading(true);
        const data = isTv ? await fetchTvDetails(id) : await fetchMovieDetails(id);
        setMedia(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMediaDetails();
  }, [id, type]);

  if (loading) {
    return <div className="text-2xl text-white text-center pt-8">Loading details...</div>;
  }

  if (!media) {
    return <div className="text-2xl text-white text-center pt-8">Failed to load details...</div>;
  }

  const title = media.name || media.title;
  const date = media.first_air_date || media.release_date;

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased text-lg sm:text-xl flex flex-col items-center">
      <div className="relative w-full aspect-21/9 min-h-75 max-h-[55vh] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w1280${media.backdrop_path}`}
          alt="backdrop"
          className="w-full h-full object-cover object-top brightness-40 scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
      </div>

      <div className="w-full max-w-full xl:max-w-[90vw] mx-auto px-8 md:px-16 -mt-16 md:-mt-32 lg:-mt-44 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 pb-24 justify-items-center md:justify-items-stretch">
        
        <div className="hidden md:block md:col-span-3 aspect-2/3 w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-2 border-zinc-800 bg-zinc-950">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-9 space-y-8 flex flex-col items-center text-center md:items-start md:text-left w-full">
          <div className="space-y-3 w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
              {title}
            </h1>
            {media.tagline && (
              <p className="text-zinc-400 text-xl sm:text-2xl lg:text-3xl italic font-medium opacity-90 tracking-wide">
                “{media.tagline}”
              </p>
            )}
          </div>

          {media.genres && (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
              {media.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-sm sm:text-base font-bold uppercase tracking-widest px-5 py-2 rounded-full bg-zinc-900 border-2 border-zinc-800/80 text-zinc-300 shadow-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-zinc-200 text-xl sm:text-2xl leading-relaxed max-w-5xl font-light tracking-wide drop-shadow">
            {media.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t-2 border-zinc-900 pt-8 mt-4 w-full">
            {[
              {
                label: "Rating",
                value: `⭐ ${media.vote_average?.toFixed(1)} / 10`,
              },
              { 
                label: isTv ? "Seasons" : "Runtime", 
                value: isTv ? `${media.number_of_seasons} Seasons` : `${media.runtime} mins` 
              },
              { 
                label: isTv ? "First Aired" : "Released", 
                value: date 
              },
              { 
                label: isTv ? "Total Episodes" : "Budget", 
                value: isTv ? media.number_of_episodes : (media.budget ? `$${media.budget.toLocaleString()}` : "N/A") 
              },
              { 
                label: isTv ? "Network" : "Revenue", 
                value: isTv ? (media.networks?.[0]?.name || "N/A") : (media.revenue ? `$${media.revenue.toLocaleString()}` : "N/A") 
              },
              { 
                label: "Status", 
                value: media.status 
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="space-y-1 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60 backdrop-blur-sm text-center md:text-left"
              >
                <div className="text-sm font-black uppercase tracking-widest text-zinc-500">
                  {item.label}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default MediaDetails;