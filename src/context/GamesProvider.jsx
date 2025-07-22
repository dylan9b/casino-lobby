import { createContext, useEffect, useReducer } from "react";
import { GameActions } from "./Game-actions-constants";

const GamesContext = createContext();

function gamesReducer(state, action) {
  switch (action.type) {
    case GameActions.LOAD_GAMES_SUCCESS: {
      {
        const { data } = action.payload;

        let updatedGames = data.map((game) =>
          state.favourites.includes(game.slug)
            ? { ...game, isFavourite: true }
            : game
        );

        return { ...state, games: updatedGames, isLoading: false };
      }
    }
    case GameActions.LOAD_GAMES_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case GameActions.SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case GameActions.INIT_FAV:
      return { ...state, favourites: action.payload };
    case GameActions.TOGGLE_FAV: {
      const slug = action.payload;
      const updatedGames = state.games.map((game) =>
        game.slug === slug ? { ...game, isFavourite: !game.isFavourite } : game
      );
      const updatedFavourites = state.favourites.includes(slug)
        ? state.favourites.filter((gameSlug) => gameSlug !== slug)
        : [...state.favourites, slug];

      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return {
        ...state,
        favourites: updatedFavourites,
        games: updatedGames,
      };
    }
    default:
      return state;
  }
}

export function GamesContextProvider({ children }) {
  const intitialState = {
    games: [],
    favourites: [],
    isLoading: true,
    error: null,
    filter: {
      offset: 0,
      first: 4,
      searchTerm: null,
    },
  };

  const [state, dispatchGamesAction] = useReducer(gamesReducer, intitialState);

  const gameContext = {
    state,
    dispatch: dispatchGamesAction,
  };

  // Load games from JSON
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadGames = async () => {
      try {
        const res = await fetch("/games.json", { signal });
        const data = await res.json();
        const structuredData = Object.values(data);

        dispatchGamesAction({
          type: GameActions.LOAD_GAMES_SUCCESS,
          payload: {
            data: structuredData,
            filter: {
              searchTerm: null,
              first: 4,
              offset: 0,
            },
          },
        });
      } catch (error) {
        dispatchGamesAction({
          type: GameActions.LOAD_GAMES_ERROR,
          payload: error.message,
        });
      }
    };

    loadGames();

    return () => {
      controller.abort(); // Cancel the fetch on cleanup
    };
  }, []);

  // Load favourites from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    dispatchGamesAction({ type: GameActions.INIT_FAV, payload: favs });
  }, []);

  return <GamesContext value={gameContext}>{children}</GamesContext>;
}

export default GamesContext;
