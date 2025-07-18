import { Link } from "react-router-dom";

function GameItems({ games }) {
  return (
    <section className="w-full gap-4 grid grid-cols-[repeat(auto-fill,_minmax(15em,_1fr))]">
      {games.map((game, i) => (
        <Link to={game.slug} key={i} state={{ game }}>
          <div className="text-black cursor-pointer w-full h-auto bg-gray-200 rounded-2xl">
            <img
              className="rounded-2xl max-w-full h-auto aspect-square object-cover"
              loading="lazy"
              src={game.game_thumbnail}
              alt={game.title}
            />
          </div>
        </Link>
      ))}
    </section>
  );
}

export default GameItems;
