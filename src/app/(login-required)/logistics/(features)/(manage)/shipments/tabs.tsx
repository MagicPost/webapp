import { BranchTypes } from '@/constants';
import { CircleOff, ListOrdered, Loader, Package, PackageCheck, Truck } from 'lucide-react';

const commonStyles = `border-2 border-amber-400`;

export const tabs = {
  [BranchTypes.COLLECTION_POINT]: [
    {
      label: 'Tất cả',
      value: 'all',
      icon: <ListOrdered className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-200 ${commonStyles}`,
    },
    {
      label: 'Đơn chưa xử lý',
      value: 'pending',
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
    },
    {
      label: 'Đơn chờ tiếp nhận',
      value: 'gonna-receive',
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn đang giao',
      value: 'delivering',
      icon: <Truck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn đã giao',
      value: 'delivered',
      icon: <PackageCheck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn hủy lấy',
      value: 'cancelled',
      total: 100,
      icon: <CircleOff className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
    },
  ],

  [BranchTypes.TRANSACTION_POINT]: [
    {
      label: 'Tất cả',
      value: 'all',
      icon: <ListOrdered className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-200 ${commonStyles}`,
    },
    {
      label: 'Đơn chưa xử lý',
      value: 'pending',
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
    },
    {
      label: 'Đơn chờ tiếp nhận',
      value: 'gonna-receive',
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn đang giao',
      value: 'delivering',
      icon: <Truck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn đã giao',
      value: 'delivered',
      icon: <PackageCheck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
    },
    {
      label: 'Đơn hủy lấy',
      value: 'cancelled',
      total: 100,
      icon: <CircleOff className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
    },
  ],
};
