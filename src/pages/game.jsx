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

      <div className="flex gap-4 flex-col items-center lg:flex-row lg:items-stretch">
        <img
          className="aspect-square rounded"
          width="500"
          height="500"
          src={game?.game_background}
          alt={game?.title}
        />

        <div className="border-r-2 border-gray-200"></div>

        <div className="flex flex-col items-center justify-between flex-1 gap-8">
          <div className="flex items-center gap-8">
            <small
              onClick={(e) => handleOnToggleFav(e, game.slug)}
              className={`w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 ${
                game?.isFavourite ? "text-red-400" : "text-slate-400"
              }`}
            >
              &hearts;
            </small>
            <span className="px-4 py-2 bg-gray-200 text-black rounded-full">
              {game.game_provider.name}
            </span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: game.content }} />

          <a
            href={game.url}
            target="_blank"
            className="mt-4 bg-teal-600 text-white px-4 py-2 rounded border border-teal-600 w-full md:w-auto focus-visible:outline-0 cursor-pointer hover:bg-white hover:text-teal-600 transition-colors duration-300"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Game;
