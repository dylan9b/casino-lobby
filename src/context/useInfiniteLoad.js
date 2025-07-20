import { useMemo, useState } from "react";

function useInfiniteLoad(initialFilter, games = []) {
  const [filter, setFilter] = useState(initialFilter);

  const loadMore = () => {
    setFilter((prev) => ({
      ...prev,
      offset: prev.offset + prev.first,
    }));

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const filteredGames = useMemo(() => {
    if (!filter.searchTerm) return games;
    const term = filter.searchTerm.toLowerCase();
    return games.filter((item) => item.title.toLowerCase().includes(term));
  }, [games, filter.searchTerm]);

  const paginatedGames = useMemo(() => {
    return filteredGames.slice(0, filter.offset + filter.first);
  }, [filteredGames, filter]);

  const isLoadLimitReached = useMemo(() => {
    return paginatedGames.length >= filteredGames.length;
  }, [filteredGames.length, paginatedGames.length]);

  return {
    filter,
    setFilter,
    loadMore,
    paginatedGames,
    isLoadLimitReached,
    filteredGames,
  };
}

export default useInfiniteLoad;
