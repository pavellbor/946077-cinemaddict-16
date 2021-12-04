import { createElement } from '../render.js';

const createFilterCountTemplate = (count) => `<span class="main-navigation__item-count">${count}</span>`;

const createFilterItemTemplate = (filter) => {
  const { name: id, count, isChecked } = filter;
  const filterName = (id === 'all') ? 'All movies' : id[0].toUpperCase() + id.slice(1).toLowerCase();
  const filterCountTemplate = (id === 'all') ? '' : createFilterCountTemplate(count);
  const filterActiveClassName = (isChecked) ? 'main-navigation__item--active' : '';

  return `<a href="#${id}" class="main-navigation__item ${filterActiveClassName}">${filterName} ${filterCountTemplate}</a>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('\n');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class FilterView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
