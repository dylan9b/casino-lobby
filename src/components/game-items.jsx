import { Link } from "react-router-dom";
import Heart from "./UI/Heart";
import useToggleFavourite from "../hooks/useToggleFavourite";

function GameItems({ games }) {
  const toggleFav = useToggleFavourite();

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
            onClick={toggleFav(game)}
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
