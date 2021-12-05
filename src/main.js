import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view.js';
import FilmsListTitleView from './view/films-list-title-view.js';
import FilmsListContainerView from './view/films-list-container-view';
import FilmCardView from './view/film-card-view.js';
import FilmPopupView from './view/film-popup-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmsTotalCountView from './view/films-total-count-view.js';
import { renderPosition, render } from './utils/render.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsComponent = new FilmsView();

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupViewComponent = new FilmPopupView(film);

  const showPopup = () => {
    document.body.classList.add('hide-overflow');
    render(siteFooterElement, filmPopupViewComponent, renderPosition.AFTEREND);
  };

  const closePopup = () => {
    document.body.classList.remove('hide-overflow');
    filmPopupViewComponent.element.remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  filmCardComponent.setLinkClickHandler(() => {
    showPopup();
    document.addEventListener('keydown', onEscKeyDown, { once: true });
  });

  filmPopupViewComponent.setCloseClickHandler(() => {
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, filmCardComponent, renderPosition.BEFOREEND);
};

const renderFilmsList = (container, listFilms, listFilters) => {
  const filmsListComponent = new FilmsListView();
  const activeFilter = listFilters.find((filter) => filter.isChecked);

  render(filmsListComponent, new FilmsListTitleView(activeFilter), renderPosition.AFTERBEGIN);

  if (activeFilter.count > 0) {
    const filmsListContainerComponent = new FilmsListContainerView();

    render(filmsListComponent, filmsListContainerComponent, renderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(listFilms.length, FILM_COUNT_PER_STEP); i++) {
      renderFilm(filmsListContainerComponent, listFilms[i]);
    }

    if (listFilms.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP;
      const showMoreButtonComponent = new ShowMoreButtonView();

      render(filmsListComponent, showMoreButtonComponent, renderPosition.BEFOREEND);

      showMoreButtonComponent.setClickHandler(() => {
        listFilms
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmsListContainerComponent, film));

        renderedFilmCount += FILM_COUNT_PER_STEP;

        if (renderedFilmCount >= listFilms.length) {
          showMoreButtonComponent.element.remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }
  }

  render(container, filmsListComponent, renderPosition.BEFOREEND);
};

const renderUserRank = (container, allFilters) => {
  const watchedFilmCount = allFilters.find(({ name }) => name === 'history').count;
  render(container, new UserRankView(watchedFilmCount), renderPosition.BEFOREEND);
};

renderUserRank(siteHeaderElement, filters);
render(siteMainElement, new FilterView(filters), renderPosition.BEFOREEND);
render(siteMainElement, new SortView(), renderPosition.BEFOREEND);
renderFilmsList(filmsComponent, films, filters);
render(siteMainElement, filmsComponent, renderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsTotalCountView(FILM_COUNT), renderPosition.BEFOREEND);
