import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomItem, shuffle, getRandomItems } from '../utils.js';
import { POSTERS, AGE_RATING, GENRES, DESCRIPTION, NAMES, COUNTRIES } from '../const.js';

const extractTitleFromPoster = (posterFileName) => {
  return posterFileName.split('.')[0].split('-').join(' ');
};

const generateTotalRating = () => {
  return Number(`${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`);
};

const getRandomPastDate = (maxYearsGap = 0, maxDaysGap = 0) => {
  const yearsGap = getRandomInteger(0, maxYearsGap);
  const daysGap = getRandomInteger(0, maxDaysGap);

  return dayjs().subtract(yearsGap, 'year').subtract(daysGap, 'day').toDate();
};

const generateDescription = () => {
  const descriptions = DESCRIPTION.split('. ');
  const descriptionCount = getRandomInteger(0, descriptions.length - 1);

  return shuffle(descriptions).slice(0, descriptionCount).join('. ');
};

const generateFilmInfo = () => {
  const poster = getRandomItem(POSTERS);
  const title = extractTitleFromPoster(poster);
  const alternativeTitle = extractTitleFromPoster(getRandomItem(POSTERS));
  const totalRating = generateTotalRating();
  const ageRating = getRandomItem(AGE_RATING);
  const releaseDate = getRandomPastDate(20, 365);
  const releaseCountry = getRandomItem(COUNTRIES);
  const runtime = getRandomInteger(70, 120);
  const genres = getRandomItem(GENRES);
  const description = generateDescription();
  const director = getRandomItem(NAMES);
  const writers = getRandomItems(NAMES);
  const actors = getRandomItems(NAMES);

  return {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    runtime,
    genres,
    description,
  };
};

const generateUserDetails = () => {
  const isWish = Boolean(getRandomInteger(0, 1));
  const isWatched = (isWish !== true) && Boolean(getRandomInteger(0, 1));
  const watchingDate = (isWatched === true) && getRandomPastDate(2, 365);
  const isFavorite = Boolean(getRandomInteger(0, 1));

  return {
    isWish,
    isWatched,
    watchingDate,
    isFavorite,
  };
};

export const generateFilm = () => {
  const id = nanoid();
  const comments = Array.from({ length: getRandomInteger(0, 50) }, nanoid);
  const filmInfo = generateFilmInfo();
  const userDetails = generateUserDetails();

  return {
    id,
    comments,
    filmInfo,
    userDetails,
  };
};
