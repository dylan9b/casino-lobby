import Search from "../components/search";
import { useGamesContext } from "../context/useGamesContext";

function Games() {
  const { isLoading, games, error } = useGamesContext();

  return (
    <>
      <Search />
      {!isLoading && (
        <section className="w-full gap-4 grid grid-cols-[repeat(auto-fill,_minmax(15em,_1fr))]">
          {games.map((game, i) => (
            <div
              key={i}
              className="text-black cursor-pointer w-full h-auto bg-gray-200 rounded-2xl"
            >
              <img
                className="rounded-2xl max-w-full h-auto aspect-square object-cover"
                loading="lazy"
                src={game.game_thumbnail}
                alt={game.title}
              />
            </div>
          ))}
        </section>
      )}

      {isLoading && (
        <section className="w-full gap-4 grid grid-cols-[repeat(auto-fill,_minmax(15em,_1fr))]">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="text-black cursor-pointer w-full h-auto bg-gray-200 rounded-2xl aspect-square animate-pulse"
            ></div>
          ))}
        </section>
      )}

      {error && (
        <h1 className="text-red-600 font-semibold mt-4">
          Error occurred: {error.message}
        </h1>
      )}
    </>
  );
}

export default Games;
