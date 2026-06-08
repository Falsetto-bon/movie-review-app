import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    // prevent duplicates by id
    setFavorites((prev) => {
      if (prev.some((favorite) => favorite.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== movie.id));
  };

  const isFavorite = (movieOrId) => {
    const id = typeof movieOrId === "object" ? movieOrId?.id : movieOrId;
    return favorites.some((favorite) => favorite.id === id);
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
