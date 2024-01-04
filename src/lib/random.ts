import { v4 } from 'uuid';

export const getRandomBase64Id = () => {
  const hexString = v4();

  const nonHyphenHexString = hexString.replace(/-/g, '');

  const base64String = Buffer.from(nonHyphenHexString, 'hex').toString('base64');
  return base64String;
};
