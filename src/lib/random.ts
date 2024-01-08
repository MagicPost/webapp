import Sqids from 'sqids';

const sqids = new Sqids();

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getRandomBase64Id = () => {
  const numbers = [getRandomInt(1000), getRandomInt(1000), getRandomInt(1000), getRandomInt(1000)];

  return sqids.encode(numbers);
};

export const getRandomIdWithPrefix = (prefix: string) => {
  return prefix + getRandomBase64Id();
};
