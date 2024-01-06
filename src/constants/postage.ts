import { TransitServiceTypes } from '.';

export enum WeightTypes {
  NOT_OVER_2KG = '<=2kg',
  OVER_2KG = '>2kg',
}

export const WeightPostages: {
  [key in TransitServiceTypes]: {
    [key in WeightTypes]: {
      weight: string;
      local: number;
      to100km: number;
      to400km: number;
      over400km: number;
    }[];
  };
} = {
  [TransitServiceTypes.ECONOMICAL]: {
    [WeightTypes.NOT_OVER_2KG]: [
      {
        weight: '< 100g',
        local: 5000,
        to100km: 5000,
        to400km: 6000,
        over400km: 6000,
      },
      {
        weight: '100 - 250g',
        local: 7000,
        to100km: 7000,
        to400km: 9000,
        over400km: 9000,
      },
      {
        weight: '250 - 500g',
        local: 10000,
        to100km: 10000,
        to400km: 12000,
        over400km: 12000,
      },
      {
        weight: '500 - 1000g',
        local: 10000,
        to100km: 12000,
        to400km: 14000,
        over400km: 16000,
      },
      {
        weight: '1 - 1.5kg',
        local: 14000,
        to100km: 16000,
        to400km: 18000,
        over400km: 20000,
      },
      {
        weight: '1.5 - 2kg',
        local: 16000,
        to100km: 18000,
        to400km: 20000,
        over400km: 22000,
      },
    ],
    [WeightTypes.OVER_2KG]: [
      {
        weight: '> 2kg',
        local: 2000,
        to100km: 2500,
        to400km: 3000,
        over400km: 3500,
      },
    ],
  },

  [TransitServiceTypes.STANDARD]: {
    [WeightTypes.NOT_OVER_2KG]: [
      {
        weight: '< 100g',
        local: 8000,
        to100km: 8000,
        to400km: 10000,
        over400km: 10000,
      },
      {
        weight: '100 - 250g',
        local: 10000,
        to100km: 10000,
        to400km: 12000,
        over400km: 12000,
      },
      {
        weight: '250 - 500g',
        local: 12000,
        to100km: 12000,
        to400km: 14000,
        over400km: 14000,
      },
      {
        weight: '500 - 1000g',
        local: 14000,
        to100km: 16000,
        to400km: 16000,
        over400km: 18000,
      },
      {
        weight: '1 - 1.5kg',
        local: 16000,
        to100km: 18000,
        to400km: 20000,
        over400km: 22000,
      },
      {
        weight: '1.5 - 2kg',
        local: 18000,
        to100km: 20000,
        to400km: 22000,
        over400km: 24000,
      },
    ],
    [WeightTypes.OVER_2KG]: [
      {
        weight: '> 2kg',
        local: 2500,
        to100km: 3000,
        to400km: 3500,
        over400km: 4000,
      },
    ],
  },
  [TransitServiceTypes.EXPRESS]: {
    [WeightTypes.NOT_OVER_2KG]: [
      {
        weight: '< 100g',
        local: 15000,
        to100km: 16000,
        to400km: 17000,
        over400km: 18000,
      },
      {
        weight: '100 - 250g',
        local: 16000,
        to100km: 17000,
        to400km: 18000,
        over400km: 19000,
      },
      {
        weight: '250 - 500g',
        local: 18000,
        to100km: 19000,
        to400km: 20000,
        over400km: 21000,
      },
      {
        weight: '500 - 1000g',
        local: 20000,
        to100km: 21000,
        to400km: 22000,
        over400km: 23000,
      },
      {
        weight: '1 - 1.5kg',
        local: 22000,
        to100km: 23000,
        to400km: 24000,
        over400km: 25000,
      },
      {
        weight: '1.5 - 2kg',
        local: 25000,
        to100km: 26000,
        to400km: 28000,
        over400km: 30000,
      },
    ],
    [WeightTypes.OVER_2KG]: [
      {
        weight: '> 2kg',
        local: 3000,
        to100km: 3500,
        to400km: 4000,
        over400km: 4500,
      },
    ],
  },
};
