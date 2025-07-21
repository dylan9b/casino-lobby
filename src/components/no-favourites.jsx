import { Link } from "react-router-dom";
import Alert from "./UI/Alert";

function NoFavourites() {
  return (
    <Alert title="No games found.">
      Please click
      <span>
        <Link to="/games" className="font-extrabold">
          {" "}
          here{" "}
        </Link>
      </span>
      to mark games as favourites.
    </Alert>
  );
}

export default NoFavourites;
