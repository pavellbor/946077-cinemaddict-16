import UserRankView from './view/user-rank-view.js';
import FilmsTotalCountView from './view/films-total-count-view.js';
import { RenderPosition, render } from './utils/render.js';
import { generateFilm } from './mock/film.js';
import FilmsBoardPresenter from './presenter/films-board-presenter.js';
import FilmsModel from './model/films-model.js';
import { generateComment } from './mock/comment.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsView from './view/films-view.js';
import { filter } from './utils/filter.js';
import { FilterType } from './const.js';

const FILM_COUNT = 20;

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const comments = films.reduce((commentsList, film) => {
  const comment = film.commentsId.map(generateComment);
  return [...commentsList, ...comment];
}, []);

const filmsModel = new FilmsModel();
filmsModel.films = films;

const commentsModel = new CommentsModel();
commentsModel.comments = comments;

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsComponent = new FilmsView();
const filmsBoardPresenter = new FilmsBoardPresenter(filmsComponent, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(siteHeaderElement, new UserRankView(filter[FilterType.HISTORY](filmsModel.films).length), RenderPosition.BEFOREEND);
filterPresenter.init();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsTotalCountView(FILM_COUNT), RenderPosition.BEFOREEND);

filmsBoardPresenter.init();
