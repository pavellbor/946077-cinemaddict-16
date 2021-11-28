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
    let j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const getRandomItems = (arr) => {
  return shuffle(arr).slice(0, getRandomInteger(0, arr.length - 1));
}
