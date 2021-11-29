import { createUserRankTemplate } from './view/user-rank-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmListTemplate } from './view/film-list-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button-view.js';
import { createFilmTotalCountTemplate } from './view/film-total-count-view.js';
import { renderTemplate, renderPosition } from './render.js';
import { generateFilm } from './mock/film.js';
import { createFilmPopupTemplate } from './view/film-popup-view.js';
import { generateFilter } from './mock/filter.js';

const CARD_COUNT = 20;

const films = Array.from({length: CARD_COUNT}, generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = document.querySelector('.footer__statistics');

renderTemplate(siteHeaderElement, createUserRankTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(filters), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmListTemplate(), renderPosition.BEFOREEND);

const filmsListElement = siteMainElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < CARD_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(films[i]), renderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createShowMoreButtonTemplate(), renderPosition.BEFOREEND);
renderTemplate(footerStatisticsElement, createFilmTotalCountTemplate(), renderPosition.BEFOREEND);

document.body.classList.add('hide-overflow');
renderTemplate(siteFooterElement, createFilmPopupTemplate(films[0]), renderPosition.AFTEREND);
