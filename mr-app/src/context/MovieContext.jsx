import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (media) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === media.id)) return prev;
      return [...prev, media];
    });
  };

  const removeFavorite = (media) => {
    setFavorites(favorites.filter((fav) => fav.id !== media.id));
  };

  const isFavorite = (mediaOrId) => {
    const id = typeof mediaOrId === "object" ? mediaOrId?.id : mediaOrId;
    return favorites.some((fav) => fav.id === id);
  };

  const values = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};
