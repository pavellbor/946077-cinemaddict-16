import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import { renderPosition, render } from '../utils/render.js';

export default class FilmPresenter {
  #filmsListContainer = null;

  #filmCardComponent = null;
  #filmPopupViewComponent = null;

  #film = null;

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
  }

  init = (film) => {
    this.#film = film;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmPopupViewComponent = new FilmPopupView(this.#film);

    this.#filmCardComponent.setLinkClickHandler(this.#handleLinkClick);
    this.#filmPopupViewComponent.setCloseClickHandler(this.#handleCloseClick);

    render(this.#filmsListContainer, this.#filmCardComponent, renderPosition.BEFOREEND);
  };

  #showPopup = () => {
    document.body.classList.add('hide-overflow');
    render(document.body, this.#filmPopupViewComponent, renderPosition.BEFOREEND);
  };

  #closePopup = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmPopupViewComponent.element.remove();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleLinkClick = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#onEscKeyDown, { once: true });
  };

  #handleCloseClick = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
