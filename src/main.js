import { createUserRankTemplate } from "./view/user-rank-view.js";
import { createSiteMenuTemplate } from "./view/site-menu-view.js";
import { createSiteSortTemplate } from "./view/site-sort-view.js";
import { createFilmListTemplate } from "./view/film-list-view.js";
import { createFilmCardTemplate } from "./view/film-card-view.js";
import { createShowMoreTemplate } from "./view/show-more-view.js";
import { createFilmTotalCountTemplate } from "./view/film-total-count-view.js";

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const CARD_COUNT = 5

renderTemplate(siteHeaderElement, createUserRankTemplate(), 'beforeend');
renderTemplate(siteMainElement, createSiteMenuTemplate(), 'beforeend');
renderTemplate(siteMainElement, createSiteSortTemplate(), 'beforeend');
renderTemplate(siteMainElement, createFilmListTemplate(), 'beforeend');

const filmsListElement = siteMainElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < CARD_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

renderTemplate(filmsListElement, createShowMoreTemplate(), 'beforeend');
renderTemplate(footerStatisticsElement, createFilmTotalCountTemplate(), 'beforeend');
