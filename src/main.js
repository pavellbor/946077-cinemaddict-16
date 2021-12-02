import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmListView from './view/film-list-view.js';
import FilmCardView from './view/film-card-view.js';
import FilmPopupView from './view/film-popup-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmTotalCountView from './view/film-total-count-view.js';
import { renderPosition, render } from './render.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilter(films);
const watchedFilmCount = filters.find(({ name }) => name === 'history').count;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new UserRankView(watchedFilmCount).element, renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).element, renderPosition.BEFOREEND);
render(siteMainElement, new SortView().element, renderPosition.BEFOREEND);

const filmListComponent = new FilmListView();
render(siteMainElement, filmListComponent.element, renderPosition.BEFOREEND);

const filmsListElement = filmListComponent.element.querySelector('.films-list');
const filmsListContainerElement = filmListComponent.element.querySelector('.films-list__container');


for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, new FilmCardView(films[i]).element, renderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsListElement, showMoreButtonComponent.element, renderPosition.BEFOREEND);

  showMoreButtonComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, new FilmCardView(film).element, renderPosition.BEFOREEND));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(footerStatisticsElement, new FilmTotalCountView(FILM_COUNT).element, renderPosition.BEFOREEND);

document.body.classList.add('hide-overflow');

const filmPopupViewComponent = new FilmPopupView(films[0]);
render(siteFooterElement, filmPopupViewComponent.element, renderPosition.AFTEREND);

const filmPopupCloseButton = filmPopupViewComponent.element.querySelector('.film-details__close-btn');

filmPopupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  document.body.classList.remove('hide-overflow');

  filmPopupViewComponent.element.remove();
  filmPopupViewComponent.removeElement();
});


