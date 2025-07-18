import { useGamesContext } from "../context/useGamesContext";
import GameItems from "../components/game-items";
import { Link } from "react-router-dom";
import NoFavourites from "../components/no-favourites";
import BackButton from "../components/back-button";

function Favourites() {
  const { favouriteGames } = useGamesContext();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 relative">
        <div className="[&>a]:absolute [&>a]:top-0 [&>a]:left-0">
          <BackButton />
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
