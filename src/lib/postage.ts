import { PlusServiceTypes, TransitServiceTypes } from '@/constants';
import { WeightPostages, WeightTypes } from '@/constants/postage';
import { measureDistance } from './transport-route';

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

export const getBasicPostages = ({
  weight,
  transit,
  province,
  distance,
}: {
  weight: number;
  transit: TransitServiceTypes;
  province: {
    sender: string;
    receiver: string;
  };
  distance: number;
}) => {
  if (weight <= 0) return 0;
  if (!province.sender || !province.receiver) return 0;

  const weightType = weight < 2000 ? WeightTypes.NOT_OVER_2KG : WeightTypes.OVER_2KG;

  let distanceKey;
  if (province.receiver === province.sender) distanceKey = 'local';
  else {
    if (distance === 0) return 0;
    if (distance <= 100000) distanceKey = 'to100km';
    else if (distance <= 400000) distanceKey = 'to400km';
    else distanceKey = 'over400km';
  }

  let weightKey = '';
  let postage = 0;
  if (weightType === WeightTypes.NOT_OVER_2KG) {
    if (weight < 100) weightKey = '< 100g';
    else if (weight < 250) weightKey = '100 - 250g';
    else if (weight < 500) weightKey = '250 - 500g';
    else if (weight < 1000) weightKey = '500 - 1000g';
    else if (weight < 1500) weightKey = '1 - 1.5kg';
    else weightKey = '1.5 - 2kg';

    postage +=
      WeightPostages[transit][weightType]?.find((item) => {
        return item.weight === weightKey;
      })?.[distanceKey as 'local' | 'to100km' | 'to400km' | 'over400km'] || 0;
  } else {
    postage +=
      WeightPostages[transit][WeightTypes.NOT_OVER_2KG]?.find((item) => {
        return item.weight === '1.5 - 2kg';
      })?.[distanceKey as 'local' | 'to100km' | 'to400km' | 'over400km'] || 0;

    weight -= 2000;

    const coefficient = Math.round(weight);
    postage +=
      coefficient *
      (WeightPostages[transit][WeightTypes.OVER_2KG]?.find((item) => {
        return item.weight === '1.5 - 2kg';
      })?.[distanceKey as 'local' | 'to100km' | 'to400km' | 'over400km'] || 0);
  }
  return postage;
};

export const getPlusPostage = ({
  value,
  services,
}: {
  value: number;
  services: {
    insurance: boolean;
    refund: boolean;
  };
}) => {
  let insurance = 0;
  let refund = 0;

  if (services.insurance) insurance += Math.max(5000, (value * 0.5) / 100);
  if (services.refund) refund += 5000;
  return insurance + refund;
};
