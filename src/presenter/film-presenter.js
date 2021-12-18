import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import { renderPosition, render, replace, remove } from '../utils/render.js';
import { generateComment } from '../mock/comment.js';
import { nanoid } from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmCardComponent = null;
  #filmPopupComponent = null;

  #film = null;
  #comments = [];
  #mode = Mode.DEFAULT;

  constructor(filmsListContainer, changeData, changeMode) {
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments || film.commentsId.map(generateComment);

    this.#renderFilm();
    this.#setEventHandlers();
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmPopupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#filmPopupComponent.reset(this.#film, this.#comments);
      this.#closePopup();
    }
  };

  #renderFilm = () => {
    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmPopupComponent = new FilmPopupView(this.#film, this.#comments);

    if (prevFilmCardComponent === null && prevFilmPopupComponent === null) {
      render(this.#filmsListContainer, this.#filmCardComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

  };

  #setEventHandlers = () => {
    this.#filmCardComponent.setLinkClickHandler(this.#handleLinkClick);
    this.#filmCardComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#filmPopupComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmPopupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmPopupComponent.setCloseClickHandler(this.#handleCloseClick);
    this.#filmPopupComponent.setCommentAddHandler(this.#handleCommentAdd);
  };

  #showPopup = () => {
    this.#changeMode();
    document.body.classList.add('hide-overflow');
    render(document.body, this.#filmPopupComponent, renderPosition.BEFOREEND);
    this.#mode = Mode.POPUP;
  };

  #closePopup = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#filmPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#filmPopupComponent.reset(this.#film, this.#comments);
      this.#closePopup();
    }
  };

  #handleLinkClick = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleCloseClick = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleWatchListClick = () => {
    this.#changeData({ ...this.#film, isWatchlist: !this.#film.isWatchlist });
  };

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#film, isWatched: !this.#film.isWatched });
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, isFavorite: !this.#film.isFavorite });
  };

  #handleCommentAdd = (comment) => {
    const newComment = { ...generateComment(nanoid()), comment };

    this.#comments.slice().push(newComment);

    this.#changeData({ ...this.#film, commentsId: [...this.#film.commentsId, newComment.id] });
  };
}
