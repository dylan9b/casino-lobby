import { useState, useEffect } from "react";

function usePersistedFavourites() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return [favourites, setFavourites];
}

export default usePersistedFavourites;
