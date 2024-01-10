'use client';

import { tabs as _tabs } from './tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomTabs from './CustomTabs';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { TBatchesMap, TPackagesMap } from './@types/tab';
import { useState } from 'react';
import { ShipmentProvider } from './context';

export default function InnerPage({
  branch,
  packagesMap: _packagesMap,
  batchesMap: _batchesMap,
}: {
  branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
  packagesMap: TPackagesMap;
  batchesMap: TBatchesMap;
}) {
  const tabs = _tabs[branch.type];
  const [packagesMap, setPackagesMap] = useState<TPackagesMap>(_packagesMap);
  const [batchesMap, setBatchesMap] = useState<TBatchesMap>(_batchesMap);

  return (
    <ShipmentProvider
      value={{
        packagesMap,
        setPackagesMap,
        batchesMap,
        setBatchesMap,
      }}
    >
      <Tabs defaultValue={tabs[0].value} className='w-full'>
        <TabsList className='flex h-full w-full flex-row items-center justify-between space-x-2 overflow-x-auto px-4 py-3'>
          {tabs.map((tab, index) => (
            <TabsTrigger value={tab.value} key={index}>
              <CustomTabs
                {...tab}
                total={
                  tab.entity === 'batch'
                    ? batchesMap[tab.value as keyof TBatchesMap]?.length
                    : packagesMap[tab.value as keyof TPackagesMap]?.length
                }
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent value={tab.value} key={index}>
            {tab.produceComponent && tab.produceComponent({ branch })}
          </TabsContent>
        ))}
      </Tabs>
    </ShipmentProvider>
  );
}
