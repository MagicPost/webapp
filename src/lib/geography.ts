import { provinces } from '@/constants/geography';

export const getGeolocation = (province: string) => {
  const res = provinces.find((p) => p.name === province);
  return res?.geolocation || null;
};
