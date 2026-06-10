import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const movie = await fetchMovieDetails(id);
        setMovie(movie);
      } catch (err) {
        setError("Failed to load movie details...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [id]);
  if (!movie) {
    return <div className="text-2xl text-white text-center pt-8">Loading movie details...</div>;
  }
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased text-lg sm:text-xl flex flex-col items-center">
      <div className="relative w-full aspect-21/9 min-h-75 max-h-[55vh] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt="backdrop"
          className="w-full h-full object-cover object-top brightness-40 scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
      </div>

      <div className="w-full max-w-full xl:max-w-[90vw] mx-auto px-8 md:px-16 -mt-16 md:-mt-32 lg:-mt-44 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 pb-24 justify-items-center md:justify-items-stretch">

        <div className="hidden md:block md:col-span-3 aspect-2/3 w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-2 border-zinc-800 bg-zinc-950">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-9 space-y-8 flex flex-col items-center text-center md:items-start md:text-left w-full">
          <div className="space-y-3 w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-zinc-400 text-xl sm:text-2xl lg:text-3xl italic font-medium opacity-90 tracking-wide">
                “{movie.tagline}”
              </p>
            )}
          </div>

          {movie.genres && (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
              {movie.genres.map((genre) => (
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
            {movie.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t-2 border-zinc-900 pt-8 mt-4 w-full">
            {[
              {
                label: "Rating",
                value: `⭐ ${movie.vote_average?.toFixed(1)} / 10`,
              },
              { label: "Runtime", value: `${movie.runtime} mins` },
              { label: "Released", value: movie.release_date },
              {
                label: "Budget",
                value: movie.budget
                  ? `$${movie.budget.toLocaleString()}`
                  : "N/A",
              },
              {
                label: "Revenue",
                value: movie.revenue
                  ? `$${movie.revenue.toLocaleString()}`
                  : "N/A",
              },
              { label: "Status", value: movie.status },
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
export default MovieDetails;
