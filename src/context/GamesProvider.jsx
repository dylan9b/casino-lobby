import { useState, useEffect } from "react";
import { GamesContext } from "./GamesContext";

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadLimitReached, setIsLoadLimitReached] = useState(false);
  const [error, setError] = useState(null);

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
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });

    setIsLoadLimitReached(games.length === allGames.length);
  }, [games, allGames]);

  const loadMore = () => {
    setFilter((prev) => ({
      ...prev,
      offset: prev.offset + prev.first,
    }));
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
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
