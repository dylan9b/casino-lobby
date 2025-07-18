import { useGamesContext } from "../context/useGamesContext";
import GameItems from "../components/game-items";
import { Link } from "react-router-dom";
import NoFavourites from "../components/no-favourites";

function Favourites() {
  const { favouriteGames } = useGamesContext();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 relative">
        <div>
          <Link to="/games" className="absolute top-0 left-0">
            <div className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-full border border-gray-200 bg-gray-200 text--black flex items-center justify-center">
              &lsaquo;
            </div>
          </Link>
          <h1>Favourite Games</h1>
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
