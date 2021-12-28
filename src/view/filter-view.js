import { FilterType } from '../const.js';
import AbstractView from './abstract-view.js';

const createFilterCountTemplate = (count) => `<span class="main-navigation__item-count">${count}</span>`;

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  const filterCountTemplate = (type === FilterType.ALL) ? '' : createFilterCountTemplate(count);
  const filterActiveClassName = (type === currentFilterType) ? 'main-navigation__item--active' : '';

  return `<a href="#${type}" class="main-navigation__item ${filterActiveClassName}">${name} ${filterCountTemplate}</a>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('\n');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;

    window.addEventListener('hashchange', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this._callback.filterTypeChange(location.hash.slice(1));
  };
}
