import { provinces } from '@/constants/geography';

export const getGeolocation = (province: string) => {
  const res = provinces.find((p) => p.name === province);
  return res?.geolocation || null;
};

export const getShortProvinceName = (province: string) => {
  let result = province.replace(/Tỉnh /, '').replace(/Thành phố /, 'TP. ');
  return result;
};

export const getShortDistrictName = (district: string) => {
  let result = district
    .replace(/Quận /, 'Q.')
    .replace(/Huyện /, 'H.')
    .replace(/Thành phố /, 'TP.');
  return result;
};
