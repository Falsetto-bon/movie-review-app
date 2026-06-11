import { useMovieContext } from "../context/MovieContext";
import MediaCard from "../components/MediaCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="flex flex-wrap justify-center">
        {favorites.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      <p className="text-2xl text-white">No favorites yet</p>
    </div>
  );
}

export default Favorites;
