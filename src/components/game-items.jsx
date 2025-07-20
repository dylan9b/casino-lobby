import { Link } from "react-router-dom";
import { useGamesContext } from "../context/useGamesContext";

function GameItems({ games }) {
  const { toggleFav } = useGamesContext();

  const handleOnToggleFav = (e, slug) => {
    e.preventDefault();
    toggleFav(slug);
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
          <small
            onClick={(e) => handleOnToggleFav(e, game.slug)}
            className={`w-4 h-4 flex rounded-full p-4 items-center justify-center absolute top-4 right-4 cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 ${
              game.isFavourite ? "text-red-400" : "text-slate-400"
            }`}
          >
            &hearts;
          </small>
        </article>
      ))}
    </section>
  );
}

export default GameItems;
