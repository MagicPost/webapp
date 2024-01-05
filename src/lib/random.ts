import Sqids from 'sqids';

const sqids = new Sqids();
const numbers = [129, 465, 453, 594, 492];

export const getRandomBase64Id = () => {
  return sqids.encode(numbers);
};
