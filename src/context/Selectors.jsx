export const getFavouriteGames = (state) =>
  state.games.filter((game) => game.isFavourite);

export const getGameBySlug = (state, slug) =>
  state.games.find((game) => game.slug === slug);
