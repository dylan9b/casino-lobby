import Search from "../components/search";
import { useGamesContext } from "../context/useGamesContext";
import LoadMore from "../components/load-more";
import NoGames from "../components/no-games";
import GameItems from "../components/game-items";

function Games() {
  const { isLoading, games, error, loadMore, isLoadLimitReached } =
    useGamesContext();

  return (
    <>
      <Search />

      {/* Loaded Games */}
      {!isLoading && <GameItems games={games} />}

      {/* Load More */}
      {!isLoading && games.length > 0 && (
        <LoadMore isLoadLimitReached={isLoadLimitReached} loadMore={loadMore} />
      )}

      {/* No games found */}
      {!isLoading && !games.length && <NoGames />}

      {error && (
        <h1 className="text-red-600 font-semibold mt-4">
          Error occurred: {error.message}
        </h1>
      )}
    </>
  );
}

export default Games;
