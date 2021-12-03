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

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupViewComponent = new FilmPopupView(film);

  const showPopup = () => {
    document.body.classList.add('hide-overflow');

    render(siteFooterElement, filmPopupViewComponent.element, renderPosition.AFTEREND);
  };

  const closePopup = () => {
    document.body.classList.remove('hide-overflow');

    filmPopupViewComponent.element.remove();
    filmPopupViewComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
    evt.preventDefault();
    showPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmPopupViewComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, filmCardComponent.element, renderPosition.BEFOREEND);
};

render(siteHeaderElement, new UserRankView(watchedFilmCount).element, renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).element, renderPosition.BEFOREEND);
render(siteMainElement, new SortView().element, renderPosition.BEFOREEND);

const filmListComponent = new FilmListView();
render(siteMainElement, filmListComponent.element, renderPosition.BEFOREEND);

const filmsListElement = filmListComponent.element.querySelector('.films-list');
const filmsListContainerElement = filmListComponent.element.querySelector('.films-list__container');


for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmsListContainerElement, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsListElement, showMoreButtonComponent.element, renderPosition.BEFOREEND);

  showMoreButtonComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(footerStatisticsElement, new FilmTotalCountView(FILM_COUNT).element, renderPosition.BEFOREEND);


