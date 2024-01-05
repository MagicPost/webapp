import { BranchTypes } from '@/constants';
import { CircleOff, Loader, Package, PackageCheck, Truck } from 'lucide-react';
import AwaitingBatches from './tabs/batch/AwaitingBatches';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import InTransitBatches from './tabs/batch/InTransitBatches';
import TransferredBatches from './tabs/batch/TransferredBatches';
import UnhandledPackages from './tabs/package/UnhandledPackages';

const commonStyles = `border-2 border-amber-400`;

export type Tab = {
  label: string;
  value: string;
  total?: number;
  icon: JSX.Element;
  iconContainerClassname?: string;
  produceComponent?: ({
    branch,
  }: {
    branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
  }) => JSX.Element;
};

export const tabs: {
  [key in BranchTypes]: Tab[];
} = {
  [BranchTypes.COLLECTION_POINT]: [
    {
      label: 'Lô hàng chờ tiếp nhận',
      value: 'gonna-receive',
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <AwaitingBatches {...props} />,
    },
    {
      label: 'Đơn hàng chưa xử lý',
      value: 'pending',
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <UnhandledPackages {...props} />,
    },
    {
      label: 'Lô hàng đang chuyển tiếp',
      value: 'forwarding',
      icon: <Truck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <InTransitBatches {...props} />,
    },
    {
      label: 'Lô hàng đã chuyển tiếp',
      value: 'forwarded',
      icon: <PackageCheck className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <TransferredBatches {...props} />,
    },
  ],
  [BranchTypes.TRANSACTION_POINT]: [
    {
      label: 'Lô hàng chờ tiếp nhận',
      value: 'gonna-receive',
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <AwaitingBatches {...props} />,
    },
    {
      label: 'Lô hàng đang chuyển tiếp',
      value: 'forwarding',
      icon: <Loader className='h-6 w-6 text-black' />,
      iconContainerClassname: `bg-amber-400 ${commonStyles}`,
      produceComponent: (props) => <InTransitBatches {...props} />,
    },
    {
      label: 'Đơn hàng chưa xử lý',
      value: 'pending',
      icon: <Package className='h-5 w-5 text-black' />,
      iconContainerClassname: `bg-amber-300 ${commonStyles}`,
      produceComponent: (props) => <UnhandledPackages {...props} />,
    },
    {
      label: 'Đơn hàng đang giao',
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
