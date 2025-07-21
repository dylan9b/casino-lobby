import { useContext, useMemo } from "react";
import GamesContext from "../context/GamesProvider";
import { GameActions } from "../context/Game-actions-constants";

function useInfiniteLoad(games = []) {
  const { state, dispatch } = useContext(GamesContext);

  const loadMore = () => {
    dispatch({
      type: GameActions.SET_FILTER,
      payload: { offset: state.filter.offset + state.filter.first },
    });

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const filteredGames = useMemo(() => {
    if (!state.filter.searchTerm) return games;
    const term = state.filter.searchTerm.toLowerCase();
    return games.filter((item) => item.title.toLowerCase().includes(term));
  }, [games, state.filter.searchTerm]);

  const paginatedGames = useMemo(() => {
    return filteredGames.slice(0, state.filter.offset + state.filter.first);
  }, [filteredGames, state.filter]);

  const isLoadLimitReached = useMemo(() => {
    return paginatedGames.length >= filteredGames.length;
  }, [filteredGames.length, paginatedGames.length]);

  return {
    loadMore,
    paginatedGames,
    isLoadLimitReached,
    filteredGames,
  };
}

export default useInfiniteLoad;
