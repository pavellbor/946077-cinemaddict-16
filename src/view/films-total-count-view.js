import { createElement } from '../render.js';

const createFilmsTotalCountTemplate = (count) => `<p>${count} movies inside</p>`;

export default class FilmsTotalCountView {
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
    return createFilmsTotalCountTemplate(this.#count);
  }

  removeElement() {
    this.#count = null;
  }
}

