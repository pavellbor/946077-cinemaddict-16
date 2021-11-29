const filmToFilterMap = {
  all: (films) => films.length,
  watchList: (films) => films.filter(({ userDetails }) => userDetails.isWatchlist).length,
  history: (films) => films.filter(({ userDetails }) => userDetails.isWatched).length,
  favorites: (films) => films.filter(({ userDetails }) => userDetails.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  })
);
