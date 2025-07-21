import Search from "../components/search";
import GameItems from "../components/game-items";
import { Link } from "react-router-dom";
import Heart from "../components/UI/Heart";
import { useContext } from "react";
import GamesContext from "../context/GamesProvider";
import LoadMore from "../components/load-more";
import NoGames from "../components/no-games";
import useInfiniteLoad from "../hooks/useInfiniteLoad";

function Games() {
  const { state } = useContext(GamesContext);
  const { games, isLoading, error } = state;

  const { paginatedGames, isLoadLimitReached, loadMore } =
    useInfiniteLoad(games);

  return (
    <article className="flex flex-col items-center gap-8">
      <div className="flex items-center w-full">
        <h1 className="ml-8 flex-1 text-xl text-center lg:text-3xl font-semibold">
          Mini Casino Lobby
        </h1>

        <Link to="favourites">
          <Heart className="text-red-400" />
        </Link>
      </div>
      <Search />

      {/* Loaded Games */}
      {!isLoading && <GameItems games={paginatedGames} />}

      {/* Load More */}
      {!isLoading && paginatedGames.length > 0 && (
        <LoadMore isLoadLimitReached={isLoadLimitReached} loadMore={loadMore} />
      )}

      {/* No games found */}
      {!isLoading && paginatedGames.length === 0 && <NoGames />}

      {error && (
        <h1 className="text-red-600 font-semibold mt-4">
          Error occurred: {error.message}
        </h1>
      )}
    </article>
  );
}

export default Games;
