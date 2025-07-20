import { Link, useParams } from "react-router-dom";
import { useGamesContext } from "../context/useGamesContext";
import BackButton from "../components/back-button";

function Game() {
  const { slug } = useParams();
  const { gameBySlug, toggleFav } = useGamesContext();
  const game = gameBySlug(slug);

  const handleOnToggleFav = (e, slug) => {
    e.preventDefault();
    toggleFav(slug);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16 relative">
      <div className="flex items-center justify-between w-full">
        <BackButton />

        <h1 className="text-xl lg:text-3xl ">{game?.title}</h1>

        <Link
          to="/games/favourites"
          className="w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 
              text-red-400"
        >
          &hearts;
        </Link>
      </div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat aspect-video"
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
              <small
                onClick={(e) => handleOnToggleFav(e, game.slug)}
                className={`w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 ${
                  game?.isFavourite ? "text-red-400" : "text-slate-400"
                }`}
              >
                &hearts;
              </small>
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
