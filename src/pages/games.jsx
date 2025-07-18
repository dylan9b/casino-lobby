import { Link } from "react-router-dom";
import Search from "../components/search";
import { useGamesContext } from "../context/useGamesContext";

function Games() {
  const { isLoading, games, error, loadMore, isLoadLimitReached } =
    useGamesContext();

  return (
    <>
      <Search />

      {/* Loaded Games */}
      {!isLoading && (
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
      )}

      {/* Loading Skeleton */}
      {/* {isLoading && (
        <section className="w-full gap-4 grid grid-cols-[repeat(auto-fill,_minmax(15em,_1fr))]">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="text-black cursor-pointer w-full h-auto bg-gray-200 rounded-2xl aspect-square animate-pulse"
            ></div>
          ))}
        </section>
      )} */}

      {/* Load More */}
      {!isLoading && games.length > 0 && (
        <button
          type="button"
          className={`mt-4 bg-teal-600 text-white px-4 py-2 rounded border border-teal-600 w-full md:w-auto focus-visible:outline-0 ${
            isLoadLimitReached
              ? "cursor-not-allowed opacity-45"
              : "cursor-pointer hover:bg-white hover:text-teal-600 transition-colors duration-300"
          }`}
          onClick={loadMore}
          disabled={isLoadLimitReached}
        >
          Load More
        </button>
      )}

      {/* No games found */}
      {!isLoading && !games.length && (
        <div className="p-2 w-full rounded border-b-amber-400 text-amber-800 bg-amber-400/30 ring-2 ring-offset-2 ring-amber-200 text-sm md:text-base">
          <p className="m-0">No games found with this filter.</p>
          <small className="m-0">Please try with something else.</small>
        </div>
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
