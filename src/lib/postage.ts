import { TransitServiceTypes } from '@/constants';

export const getTransitPostage = (type: TransitServiceTypes) => {
  switch (type) {
    case TransitServiceTypes.ECONOMICAL:
      return 20000;
    case TransitServiceTypes.STANDARD:
      return 30000;
    case TransitServiceTypes.EXPRESS:
      return 40000;
  }
};

export const getPostageByWeight = (weight: number) => {};

export const getPlusPostage = (value: number) => {
  return value * 0.2;
};
