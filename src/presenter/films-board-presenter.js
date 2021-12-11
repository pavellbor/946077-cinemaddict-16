import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { renderPosition, render, remove } from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBoardPresenter {
  #filmsBoardContainer = null;

  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListTitleComponent = null;

  #films = [];
  #listFilters = [];
  #activeFilter = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmsBoardContainer) {
    this.#filmsBoardContainer = filmsBoardContainer;
  }

  init = (films, listFilters) => {
    this.#films = [...films];
    this.#listFilters = [...listFilters];
    this.#activeFilter = this.#listFilters.find((filter) => filter.isChecked);

    render(this.#filmsBoardContainer, this.#filmsListComponent, renderPosition.BEFOREEND);

    this.#renderFilmsBoard();
  };

  #renderFilm = (film) => {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupViewComponent = new FilmPopupView(film);

    const showPopup = () => {
      document.body.classList.add('hide-overflow');
      render(document.body, filmPopupViewComponent, renderPosition.BEFOREEND);
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

    render(this.#filmsListContainerComponent, filmCardComponent, renderPosition.BEFOREEND);
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderLoadMoreButton = () => {
    render(this.#filmsListComponent, this.#showMoreButtonComponent, renderPosition.BEFOREEND);

    this.#showMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  #renderFilmsListTitle = () => {
    this.#filmsListTitleComponent = new FilmsListTitleView(this.#activeFilter);

    render(this.#filmsListComponent, this.#filmsListTitleComponent, renderPosition.AFTERBEGIN);
  };

  #renderFilmsListContainer = () => {
    render(this.#filmsListComponent, this.#filmsListContainerComponent, renderPosition.BEFOREEND);
  };

  #renderFilmsBoard = () => {
    this.#renderFilmsListTitle();

    if (this.#activeFilter.count === 0) {
      return;
    }

    this.#renderFilmsListContainer();
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };
}
