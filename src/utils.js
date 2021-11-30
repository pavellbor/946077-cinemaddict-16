import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const shuffle = (arr) => {
  const arrCopy = arr.slice();

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const getRandomItems = (arr) => shuffle(arr).slice(0, getRandomInteger(1, arr.length - 1));

export const getRandomPastDate = (maxYearsGap = 0, maxDaysGap = 0) => {
  const yearsGap = getRandomInteger(0, maxYearsGap);
  const daysGap = getRandomInteger(0, maxDaysGap);
  const minutesGap = getRandomInteger(0, 1000);

  return dayjs().subtract(yearsGap, 'year').subtract(daysGap, 'day').subtract(minutesGap, 'minutes').toDate();
};

export const humanizeRuntime = (runtime = 0) => {
  const date = dayjs().startOf('day').minute(runtime);
  const hours = Number(date.format('H'));
  const minutes = Number(date.format('mm'));
  const humanizedHours = (hours !== 0) ? `${hours}h` : '';
  const humanizedMinutes = (minutes !== 0) ? `${minutes}m` : '';

  return `${humanizedHours} ${humanizedMinutes}`.trim();
};

export const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');

export const humanizeCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD HH:mm');
