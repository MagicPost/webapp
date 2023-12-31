'use client';

import SearchBar from '@/components/main/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomTabs from './CustomTabs';
import { CircleOff, ListOrdered, Loader, Package, PackageCheck, Truck } from 'lucide-react';
import OrderTable from './OrderTable';

const tabs = [
  {
    label: 'Tất cả',
    value: 'all',
    icon: <ListOrdered className='h-6 w-6 text-black' />,
    iconContainerClassname: 'bg-amber-200 border-2 border-amber-400',
  },
  {
    label: 'Đơn chưa xử lý',
    value: 'pending',
    icon: <Package className='h-5 w-5 text-black' />,
    iconContainerClassname: 'bg-amber-300 border-2 border-amber-400',
  },
  {
    label: 'Đơn chờ tiếp nhận',
    value: 'gonna-receive',
    icon: <Loader className='h-6 w-6 text-black' />,
    iconContainerClassname: 'bg-amber-400 border-2 border-amber-400',
  },
  {
    label: 'Đơn đang giao',
    value: 'delivering',
    icon: <Truck className='h-6 w-6 text-black' />,
    iconContainerClassname: 'bg-amber-400 border-2 border-amber-400',
  },
  {
    label: 'Đơn đã giao',
    value: 'delivered',
    icon: <PackageCheck className='h-6 w-6 text-black' />,
    iconContainerClassname: 'bg-amber-400 border-2 border-amber-400',
  },
  {
    label: 'Đơn hủy lấy',
    value: 'cancelled',
    total: 100,
    icon: <CircleOff className='h-6 w-6 text-black' />,
    iconContainerClassname: 'bg-amber-300 border-2 border-amber-400',
  },
];

export default function TransportManagement() {
  return (
    <div className='w-full p-4'>
      <h1 className='text-xl font-semibold'>Quản lý vận đơn</h1>
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
            <OrderTable />

            <div className='w-full'></div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
