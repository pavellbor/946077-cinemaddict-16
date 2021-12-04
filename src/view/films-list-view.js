import { createElement } from '../render.js';

const createFilmsListTemplate = () => '<section class="films-list"></section>';

export default class FilmsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
