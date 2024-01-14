import React from 'react';
import { TBatchesMap, TPackagesMap } from './@types/tab';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

const ShipmentContext = React.createContext<{
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> | null;
  packagesMap: TPackagesMap;
  setPackagesMap: React.Dispatch<React.SetStateAction<TPackagesMap>>;
  batchesMap: TBatchesMap;
  setBatchesMap: React.Dispatch<React.SetStateAction<TBatchesMap>>;
}>({
  branch: null,
  packagesMap: {},
  setPackagesMap: () => {},
  batchesMap: {},
  setBatchesMap: () => {},
});

export const ShipmentProvider = ShipmentContext.Provider;

export const useBranch = () => {
  const { branch } = React.useContext(ShipmentContext);
  return { branch };
};

export const usePackages = () => {
  const { packagesMap, setPackagesMap } = React.useContext(ShipmentContext);
  return { packagesMap, setPackagesMap };
};

export const useBatches = () => {
  const { batchesMap, setBatchesMap } = React.useContext(ShipmentContext);
  return { batchesMap, setBatchesMap };
};
