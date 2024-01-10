'use client';

import { BranchTypes } from '@/constants';
import { CircleOff, Container, Loader, Package, PackageCheck, Truck } from 'lucide-react';
import AwaitingBatches from './tabs/batch/AwaitingBatches';
import InTransitBatches from './tabs/batch/InTransitBatches';
import TransferredBatches from './tabs/batch/TransferredBatches';
import PendingPackages from './tabs/package/PendingPackages';
import { ETabValue, TTab } from './@types/tab';
import DeliveringPackages from './tabs/package/DeliveringPackages';
import DeliveredPackages from './tabs/package/DeliveredPackages';
import ResentPackages from './tabs/package/ResentPackages';
import PendingBatches from './tabs/batch/PendingBatches';

const commonStyles = `border-2 border-amber-400`;

export const tabs: {
  [key in BranchTypes]: TTab[];
} = {
  [BranchTypes.COLLECTION_POINT]: [
    {
      entity: 'batch',
      label: 'Lô hàng chờ tiếp nhận',
      value: ETabValue.GONNA_RECEIVE,
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <AwaitingBatches {...props} />,
    },
    {
      entity: 'package',
      label: 'Đơn hàng chưa xử lý',
      value: ETabValue.PENDING_PACKAGE,
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <PendingPackages {...props} />,
    },
    {
      entity: 'batch',
      label: 'Lô hàng đang chuyển tiếp',
      value: ETabValue.FORWARDING,
      icon: <Truck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <InTransitBatches {...props} />,
    },
    {
      entity: 'batch',
      label: 'Lô hàng đã chuyển tiếp',
      value: ETabValue.FORWARDED,
      icon: <PackageCheck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <TransferredBatches {...props} />,
    },
  ],
  [BranchTypes.TRANSACTION_POINT]: [
    {
      entity: 'batch',
      label: 'Lô hàng chờ tiếp nhận',
      value: ETabValue.GONNA_RECEIVE,
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <AwaitingBatches {...props} />,
    },
    {
      entity: 'batch',
      label: 'Lô hàng đang chuyển tiếp',
      value: ETabValue.FORWARDING,
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <InTransitBatches {...props} />,
    },
    {
      entity: 'batch',
      label: 'Lô hàng chưa xử lý',
      value: ETabValue.PENDING_BATCH,
      icon: <Container className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <PendingBatches {...props} />,
    },
    {
      entity: 'package',
      label: 'Đơn hàng chưa xử lý',
      value: ETabValue.PENDING_PACKAGE,
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <PendingPackages {...props} />,
    },
    {
      entity: 'package',
      label: 'Đơn hàng đang giao',
      value: ETabValue.DELIVERING,
      icon: <Truck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <DeliveringPackages {...props} />,
    },
    {
      entity: 'package',
      label: 'Đơn đã giao',
      value: ETabValue.DELIVERED,
      icon: <PackageCheck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <DeliveredPackages {...props} />,
    },
    {
      entity: 'package',
      label: 'Đơn hủy lấy',
      value: ETabValue.RESENT,
      total: 100,
      icon: <CircleOff className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <ResentPackages {...props} />,
    },
  ],
};
