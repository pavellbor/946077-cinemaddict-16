import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { createFilmListTemplate } from './view/film-list-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import { createFilmTotalCountTemplate } from './view/film-total-count-view.js';
import { renderTemplate, renderPosition, renderElement } from './render.js';
import { generateFilm } from './mock/film.js';
import { createFilmPopupTemplate } from './view/film-popup-view.js';
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

renderElement(siteHeaderElement, new UserRankView(watchedFilmCount).element, renderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).element, renderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().element, renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmListTemplate(), renderPosition.BEFOREEND);

const filmsListElement = siteMainElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');


for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(films[i]), renderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  renderElement(filmsListElement, showMoreButtonComponent.element, renderPosition.BEFOREEND);

  showMoreButtonComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), renderPosition.BEFOREEND));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderTemplate(footerStatisticsElement, createFilmTotalCountTemplate(FILM_COUNT), renderPosition.BEFOREEND);

document.body.classList.add('hide-overflow');
renderTemplate(siteFooterElement, createFilmPopupTemplate(films[0]), renderPosition.AFTEREND);

const filmPopupElement = document.body.querySelector('.film-details');
const filmPopupCloseButton = filmPopupElement.querySelector('.film-details__close-btn');

filmPopupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  document.body.classList.remove('hide-overflow');
  filmPopupElement.remove();
});


