'use client';

import SearchBar from '@/components/main/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomTabs from './CustomTabs';
import { BranchTypes } from '@/constants';
import { tabs as _tabs } from './tabs';

export default function TransportManagement() {
  const tabs = _tabs[BranchTypes.COLLECTION_POINT];

  return (
    <div className='mt-12 w-full p-4 lg:mt-0'>
      <h1 className='mb-8 text-2xl font-bold'>Quản lý vận đơn</h1>
      <SearchBar placeholder='Search...' />

      <Tabs defaultValue={tabs[0].value} className='w-full'>
        <TabsList className='w-full space-x-2 px-4 py-9'>
          {tabs.map((tab, index) => (
            <TabsTrigger value={tab.value} key={index}>
              <CustomTabs {...tab} total={100} />
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent value={tab.value} key={index}>
            <div className='p-4'>{tab.label}</div>
            {/* <OrderTable tableProps={{
              columns,
            }} /> */}

            <div className='w-full'></div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
