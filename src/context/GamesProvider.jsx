import { useState, useEffect, useMemo, useCallback } from "react";
import { GamesContext } from "./GamesContext";
import usePersistedFavourites from "./useFavourites";
import useInfiniteLoad from "./useInfiniteLoad";

export function GamesProvider({ children }) {
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = usePersistedFavourites();

  const { filter, setFilter, loadMore } = useInfiniteLoad({
    first: 4,
    offset: 0,
    searchTerm: "",
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

  const paginatedGames = useMemo(() => {
    return matchedGames.slice(0, filter.offset + filter.first);
  }, [matchedGames, filter.offset, filter.first]);

  const isLoadLimitReached = useMemo(() => {
    return paginatedGames.length >= matchedGames.length;
  }, [paginatedGames.length, matchedGames.length]);

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
        games: paginatedGames,
        isLoading,
        error,
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
