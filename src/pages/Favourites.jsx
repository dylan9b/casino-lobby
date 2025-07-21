import GameItems from "../components/game-items";
import NoFavourites from "../components/no-favourites";
import LoadMore from "../components/load-more";
import useInfiniteLoad from "../context/useInfiniteLoad";
import BackButton from "../components/UI/BackButton";
import { useContext } from "react";
import GamesContext from "../context/GamesProvider";
import { getFavouriteGames } from "../context/Selectors";

function Favourites() {
  const { state } = useContext(GamesContext);
  const { isLoading } = state;
  const favouriteGames = getFavouriteGames(state);


  const { paginatedGames, isLoadLimitReached, loadMore } =
    useInfiniteLoad(favouriteGames);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center w-full">
          <BackButton />
          <h1 className="me-8 flex-1 text-xl lg:text-3xl text-center font-semibold">
            Favourite Games
          </h1>
        </div>

        {paginatedGames.length > 0 ? (
          <GameItems games={paginatedGames} />
        ) : (
          <NoFavourites />
        )}

        {/* Load More */}
        {!isLoading && paginatedGames.length > 0 && (
          <LoadMore
            isLoadLimitReached={isLoadLimitReached}
            loadMore={loadMore}
          />
        )}
      </div>
    </>
  );
}

export default Favourites;
