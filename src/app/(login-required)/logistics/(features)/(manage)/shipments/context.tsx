import React from 'react';
import { TBatchesMap, TPackagesMap } from './@types/tab';

const ShipmentContext = React.createContext<{
  packagesMap: TPackagesMap;
  setPackagesMap: React.Dispatch<React.SetStateAction<TPackagesMap>>;
  batchesMap: TBatchesMap;
  setBatchesMap: React.Dispatch<React.SetStateAction<TBatchesMap>>;
}>({
  packagesMap: {},
  setPackagesMap: () => {},
  batchesMap: {},
  setBatchesMap: () => {},
});

export const ShipmentProvider = ShipmentContext.Provider;

export const usePackages = () => {
  const { packagesMap, setPackagesMap, batchesMap, setBatchesMap } =
    React.useContext(ShipmentContext);
  return { packagesMap, setPackagesMap, batchesMap, setBatchesMap };
};
