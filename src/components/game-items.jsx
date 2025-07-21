import { Link } from "react-router-dom";
import Heart from "./UI/Heart";
import { useContext } from "react";
import GamesContext from "../context/GamesProvider";
import { GameActions } from "../context/Game-actions-constants";
import { toast, ToastContainer } from "react-toastify";

function GameItems({ games }) {
  const { dispatch } = useContext(GamesContext);

  const handleOnToggleFav = (e, game) => {
    e.preventDefault();
    dispatch({ type: GameActions.TOGGLE_FAV, payload: game.slug });

    const toastMessage = `${
      game.isFavourite
        ? "Game removed from favourites"
        : "Game added to favourites"
    }`;
    toast.success(toastMessage);
  };

  return (
    <section className="w-full gap-4 grid grid-cols-[repeat(auto-fill,_minmax(15em,_1fr))]">
      {games.map((game) => (
        <article key={game.id} className="relative">
          <Link to={`/games/${game.slug}`} state={{ game }}>
            <div className="text-black cursor-pointer w-full h-auto bg-gray-200 rounded-2xl">
              <img
                className="rounded-2xl min-w-full max-w-full h-auto aspect-square object-cover"
                loading="lazy"
                src={game.game_thumbnail}
                alt={game.title}
              />
            </div>
          </Link>

          <Heart
            onClick={(e) => handleOnToggleFav(e, game)}
            className={`absolute top-4 right-4 ${
              game?.isFavourite ? "text-red-400" : "text-slate-400"
            }`}
          />
        </article>
      ))}
    </section>
  );
}

export default GameItems;
