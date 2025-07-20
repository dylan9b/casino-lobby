import { Link } from "react-router-dom";

function NoFavourites() {
  return (
    <div className="p-2 w-full text-center rounded border-b-amber-400 text-amber-800 bg-amber-400/30 ring-2 ring-offset-2 ring-amber-200 text-sm md:text-base">
      <p className="m-0">No games found.</p>
      <small className="m-0">
        Please click
        <span>
          <Link to="/games" className="font-extrabold">
            {" "}
            here{" "}
          </Link>
        </span>
        to mark games as favourites.
      </small>
    </div>
  );
}

export default NoFavourites;
