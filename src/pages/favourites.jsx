import { useGamesContext } from "../context/useGamesContext";
import GameItems from "../components/game-items";
import NoFavourites from "../components/no-favourites";
import BackButton from "../components/back-button";

function Favourites() {
  const { favouriteGames } = useGamesContext();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center w-full">
          <BackButton />
          <h1 className="me-8 flex-1 text-xl lg:text-3xl">Favourite Games</h1>
        </div>

        {favouriteGames.length > 0 ? (
          <GameItems games={favouriteGames} />
        ) : (
          <NoFavourites />
        )}
      </div>
    </>
  );
}

export default Favourites;
