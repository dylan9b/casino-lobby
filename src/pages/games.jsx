import Search from "../components/search";
import { useGamesContext } from "../context/useGamesContext";
import LoadMore from "../components/load-more";
import NoGames from "../components/no-games";
import GameItems from "../components/game-items";
import { Link } from "react-router-dom";

function Games() {
  const { isLoading, games, error, loadMore, isLoadLimitReached } =
    useGamesContext();

  return (
    <article className="flex flex-col items-center gap-8">
      <div className="flex items-center w-full">
        <h1 className="ml-8 flex-1 text-xl text-center lg:text-3xl font-semibold">
          Mini Casino Lobby
        </h1>
        <Link
          to="favourites"
          className="w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 
              text-red-400"
        >
          &hearts;
        </Link>
      </div>
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
    </article>
  );
}

export default Games;
