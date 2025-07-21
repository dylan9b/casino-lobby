import { Link, useParams } from "react-router-dom";
import BackButton from "../components/UI/BackButton";
import Heart from "../components/UI/Heart";
import GamesContext from "../context/GamesProvider";
import { useContext } from "react";
import { GameActions } from "../context/Game-actions-constants";
import { getGameBySlug } from "../context/Selectors";
import { toast } from "react-toastify";

function Game() {
  const { slug } = useParams();
  const { state, dispatch } = useContext(GamesContext);

  const game = getGameBySlug(state, slug);

  const handleOnToggleFav = (e, slug) => {
    e.preventDefault();
    dispatch({ type: GameActions.TOGGLE_FAV, payload: slug });

    const toastMessage = `${
      game.isFavourite
        ? "Game removed from favourites"
        : "Game added to favourites"
    }`;
    toast.success(toastMessage);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 relative">
      <div className="flex items-center justify-between w-full">
        <BackButton />

        <h1 className="text-xl lg:text-3xl font-semibold">{game?.title}</h1>

        <Link to="/games/favourites">
          <Heart className="text-red-400" />
        </Link>
      </div>
      <div
        className="w-full xl:w-3/4 bg-cover bg-center bg-no-repeat aspect-video rounded-2xl"
        style={{
          backgroundImage: `url("https:${game?.game_background}")`,
        }}
      >
        <div className="flex p-4 flex-col items-center justify-center gap-24 h-full w-full">
          <div className="flex items-center justify-center gap-8 w-full">
            <span className="px-4 py-2 bg-gray-200/85 text-black rounded-full">
              {game.game_provider.name}
            </span>

            <div className="flex items-center gap-8">
              <Heart
                onClick={(e) => handleOnToggleFav(e, game.slug)}
                className={`${
                  game?.isFavourite ? "text-red-400" : "text-slate-400"
                }`}
              />
            </div>
          </div>

          {game.content ? (
            <div
              className="text-gray-900 p-4 rounded-4xl bg-gray-200/85 shadow-lg w-full lg:w-3/4"
              dangerouslySetInnerHTML={{ __html: game.content }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
