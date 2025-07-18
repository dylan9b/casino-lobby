import { Link, useLocation, useParams } from "react-router-dom";
import { useGamesContext } from "../context/useGamesContext";
import { useEffect, useState } from "react";
import BackButton from "../components/back-button";

function Game() {
  const location = useLocation();
  const { slug } = useParams();

  const routeGame = location.state?.game;
  const { getGameBySlug } = useGamesContext();
  const [game, setGame] = useState(routeGame || null);

  useEffect(() => {
    if (!game) {
      const foundGame = getGameBySlug(slug); // should return game object
      if (foundGame) {
        setGame(foundGame);
      }
    }
  }, [game, slug, getGameBySlug]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 relative">
      <div className="flex items-center justify-between w-full">
        <BackButton />

        <h1 className="text-3xl">{game?.title}</h1>

        <Link
          to="/games/favourites"
          className="w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 ${
              text-red-400"
        >
          &hearts;
        </Link>
      </div>
      <img
        className="aspect-square"
        width="500"
        height="500"
        src={game?.game_background}
        alt={game?.title}
      />
    </div>
  );
}

export default Game;
