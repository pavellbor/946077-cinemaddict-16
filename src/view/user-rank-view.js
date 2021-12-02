import { createElement } from '../render.js';

const watchedFilmCountToUserRank = (count) => {
  let userRank = null;

  if (count >= 21) {
    userRank = 'Movie Buff';
  } else if (count >= 11 && count <= 20) {
    userRank = 'Fan';

  } else if (count >= 1 && count <= 10) {
    userRank = 'Novice';
  }

  return userRank;
};

const createUserRankTemplate = (watchedFilmCount) => {
  const userRank = watchedFilmCountToUserRank(watchedFilmCount);

  return `<section class="header__profile profile">
  <p class="profile__rating">${userRank || ''}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserRankView {
  #element = null;
  #watchedFilmCount = null;

  constructor(watchedFilmCount) {
    this.#watchedFilmCount = watchedFilmCount;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createUserRankTemplate(this.#watchedFilmCount);
  }

  removeElement() {
    this.#element = null;
  }
}
