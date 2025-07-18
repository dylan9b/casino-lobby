import { useLocation, useParams } from "react-router-dom";
import { useGamesContext } from "../context/useGamesContext";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center gap-8">
      <h1>{game?.title}</h1>
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
