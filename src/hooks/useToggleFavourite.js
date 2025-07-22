import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import GamesContext from "../context/GamesProvider";
import { GameActions } from "../context/Game-actions-constants";

function useToggleFavourite() {
  const { dispatch } = useContext(GamesContext);

  const toggleFav = useCallback(
    (game) => (e) => {
      e.preventDefault();
      dispatch({ type: GameActions.TOGGLE_FAV, payload: game.slug });

      const toastMessage = `${
        game.isFavourite
          ? "Game removed from favourites"
          : "Game added to favourites"
      }`;
      toast.success(toastMessage);
    },
    [dispatch]
  );

  return toggleFav;
}

export default useToggleFavourite;
