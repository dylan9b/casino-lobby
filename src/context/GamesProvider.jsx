import { useState, useEffect, useMemo, useCallback } from "react";
import { GamesContext } from "./GamesContext";
import usePersistedFavourites from "./useFavourites";

export function GamesProvider({ children }) {
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadLimitReached, setIsLoadLimitReached] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [favourites, setFavourites] = usePersistedFavourites();

  const [filter, setFilter] = useState({
    searchTerm: "",
    first: 4,
    offset: 0,
  });

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      try {
        const response = await fetch("/games.json");
        if (!response.ok) throw new Error("Failed to fetch games");

        const rawData = await response.json();
        const fetched = Object.values(rawData);
        setAllGames(fetched);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, []);

  const enrichWithFavourites = useCallback(
    (games) =>
      games.map((game) => ({
        ...game,
        isFavourite: favourites.includes(game.slug),
      })),
    [favourites]
  );

  const enrichedGames = useMemo(() => {
    return enrichWithFavourites(allGames);
  }, [allGames, enrichWithFavourites]);

  const matchedGames = useMemo(() => {
    return enrichedGames.filter((game) =>
      game.title.toLowerCase().includes(filter.searchTerm.toLowerCase())
    );
  }, [enrichedGames, filter.searchTerm]);

  const filteredGames = useMemo(() => {
    return matchedGames.slice(0, filter.offset + filter.first);
  }, [matchedGames, filter.offset, filter.first]);

  const isLoadLimitReached = useMemo(() => {
    return filteredGames.length >= matchedGames.length;
  }, [filteredGames.length, matchedGames.length]);

  const loadMore = () => {
    setFilter((prev) => ({
      ...prev,
      offset: prev.offset + prev.first,
    }));

    // Optionally scroll
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const toggleFav = useCallback(
    (slug) => {
      setFavourites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      );
    },
    [setFavourites]
  );

  const favouriteGames = useMemo(() => {
    return enrichWithFavourites(allGames).filter((g) => g.isFavourite);
  }, [allGames, enrichWithFavourites]);

  const gameBySlug = useCallback(
    (slug) => enrichWithFavourites(allGames).find((game) => game.slug === slug),
    [allGames, enrichWithFavourites]
  );

  return (
    <GamesContext.Provider
      value={{
        games: filteredGames,
        isLoading,
        error,
        inputValue,
        setInputValue,
        filter,
        setFilter,
        loadMore,
        isLoadLimitReached,
        toggleFav,
        favouriteGames,
        gameBySlug,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
