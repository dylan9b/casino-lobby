import { useState, useEffect, useMemo, useCallback } from "react";
import { GamesContext } from "./GamesContext";
import usePersistedFavourites from "./useFavourites";
import useInfiniteLoad from "./useInfiniteLoad";

export function GamesProvider({ children }) {
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = usePersistedFavourites();

  const enrichWithFavourites = useCallback(
    (games) =>
      games.map((game) => ({
        ...game,
        isFavourite: favourites.includes(game.slug),
      })),
    [favourites]
  );

  const enrichedGames = useMemo(
    () => enrichWithFavourites(allGames),
    [allGames, enrichWithFavourites]
  );

  const { filter, setFilter, loadMore, paginatedGames, isLoadLimitReached } =
    useInfiniteLoad(
      {
        first: 4,
        offset: 0,
        searchTerm: "",
      },
      enrichedGames
    );

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
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, []);

  const toggleFav = useCallback(
    (slug) => {
      setFavourites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      );
    },
    [setFavourites]
  );

  const favouriteGames = useMemo(() => {
    return enrichedGames.filter((g) => g.isFavourite);
  }, [enrichedGames]);

  const gameBySlug = useCallback(
    (slug) => enrichedGames.find((game) => game.slug === slug),
    [enrichedGames]
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
