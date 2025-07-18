import { useState, useEffect, useRef, useMemo } from "react";
import { GamesContext } from "./GamesContext";

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadLimitReached, setIsLoadLimitReached] = useState(false);
  const [error, setError] = useState(null);
  const didLoadMoreRef = useRef(false);
  const [favourites, setFavourites] = useState(() => {
    if (typeof window === "undefined") return []; // for SSR safety
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const [inputValue, setInputValue] = useState("");

  const [filter, setFilter] = useState({
    searchTerm: "",
    first: 4,
    offset: 0,
  });

  const [allGames, setAllGames] = useState([]); // full filtered list

  useEffect(() => {
    async function fetchAndFilterGames() {
      setIsLoading(true);
      try {
        const response = await fetch("/games.json");
        if (!response.ok) throw new Error("Failed to fetch games");

        const rawData = await response.json();
        let fetched = Object.values(rawData);

        if (filter.searchTerm) {
          fetched = fetched.filter((game) =>
            game.title.toLowerCase().includes(filter.searchTerm.toLowerCase())
          );
        }

        setAllGames(fetched); // store filtered list
        setGames(fetched.slice(0, filter.first)); // load first N
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndFilterGames();
  }, [filter.first, filter.searchTerm]);

  useEffect(() => {
    if (filter.offset === 0) return;

    const nextChunk = allGames.slice(
      filter.offset,
      filter.offset + filter.first
    );

    setGames((prev) => [...prev, ...nextChunk]);
  }, [allGames, filter.first, filter.offset]);

  useEffect(() => {
    if (didLoadMoreRef.current) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
      didLoadMoreRef.current = false;
    }
    setIsLoadLimitReached(games.length === allGames.length);
  }, [allGames.length, games.length]);

  const loadMore = () => {
    didLoadMoreRef.current = true;
    setFilter((prev) => ({
      ...prev,
      offset: prev.offset + prev.first,
    }));
  };

  const favouriteGames = useMemo(() => {
    return games.filter((g) => g.isFavourite);
  }, [games]);

  const getGameBySlug = (slug) => {
    return allGames.find((game) => game.slug === slug);
  };

  const toggleFav = (slug) => {
    setGames((games) =>
      games.map((game) =>
        game.slug === slug ? { ...game, isFavourite: !game.isFavourite } : game
      )
    );

    setFavourites((prev) => {
      return prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
    });
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        isLoading,
        error,
        inputValue,
        setInputValue,
        filter,
        setFilter,
        loadMore,
        isLoadLimitReached,
        getGameBySlug,
        toggleFav,
        favouriteGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
