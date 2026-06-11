import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

function MediaCard({ media = {} }) {
  const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
  const favorite = isFavorite(media.id);
  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFavorite(media);
    } else {
      addFavorite(media);
    }
  }
  const title = media.name || media.title;
  const date = media.first_air_date || media.release_date;
  const year = date ? date.split("-")[0] : "";
  const isTv = !!media.first_air_date;
  const targetRoute = isTv ? `/tv/${media.id}` : `/movie/${media.id}`;
  return (
    <div id="movie-card" className="m-4 w-75 h-130 flex flex-col">
      <div className="relative flex-1 rounded-xl overflow-hidden bg-zinc-900/70 border border-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 ease-in-out">
        <div id="movie-poster" className="relative w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={title}
            className="w-full h-full object-cover block"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <button
            id="favorite-btn"
            onClick={onFavoriteClick}
            className="absolute top-2 right-2 z-10 text-xl sm:text-2xl text-white hover:text-zinc-400 transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            type="button"
          >
            <i
              className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link to={targetRoute}>
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 line-clamp-2">
                {title}
              </h3>
            </Link>
            <p className="text-xs text-zinc-300 mt-1">{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
