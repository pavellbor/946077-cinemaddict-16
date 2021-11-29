const createFilterItemTemplate = (filter) => {
  const { name, count } = filter;
  const filterName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return `<a href="#${filterName}" class="main-navigation__item">${filterName} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => (index !== 0) ? createFilterItemTemplate(filter) : '')
    .join('\n');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
