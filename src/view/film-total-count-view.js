import { createElement } from '../render.js';

const createFilmTotalCountTemplate = (count) => `<p>${count} movies inside</p>`;

export default class FilmTotalCountView {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmTotalCountTemplate(this.#count);
  }

  removeElement() {
    this.#count = null;
  }
}

