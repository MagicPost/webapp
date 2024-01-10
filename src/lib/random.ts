import Sqids from 'sqids';

const sqids = new Sqids();

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getRandomBase64Id = (num: number = 4) => {
  // 4 numbers by default
  const numbers = [...Array(num)].map(() => getRandomInt(1000));
  return sqids.encode(numbers);
};

export const getRandomIdWithPrefix = (prefix: string, num?: number) => {
  return prefix + getRandomBase64Id(num);
};
