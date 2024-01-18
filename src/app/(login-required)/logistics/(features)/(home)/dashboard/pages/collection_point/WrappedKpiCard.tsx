import { getGrowRate } from '@/actions/_helpers/rate';
import { CollectionPointStats } from '@/actions/statistics/collection-points/getCollectionPointStats';
import KpiCard, { KpiCardProps } from '@/components/dashboard/KpiCard';
import { Package } from 'lucide-react';

export default function WrappedKpiCard({ data }: { data: CollectionPointStats }) {
  const receivedPackages = {
    thisMonth: Object.values(data.receivedPackages).at(-1) || 0,
    growthRate: getGrowRate(
      Object.values(data.receivedPackages).at(-1) || 0,
      Object.values(data.receivedPackages).at(-2) || 0
    ),
  };

  const forwardedPackages = {
    thisMonth: Object.values(data.forwardedPackages).at(-1) || 0,
    growthRate: getGrowRate(
      Object.values(data.forwardedPackages).at(-1) || 0,
      Object.values(data.forwardedPackages).at(-2) || 0
    ),
  };

  const kpiCardProps: KpiCardProps[] = [
    {
      title: 'Số đơn tập kết đến',
      value: receivedPackages.thisMonth,
      valueUnit: 'đơn',
      valueChange: receivedPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
    {
      title: 'Số đơn tập kết đi',
      value: forwardedPackages.thisMonth,
      valueUnit: 'đơn',
      valueChange: forwardedPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
  ];
  return (
    <div className='flex w-full flex-row flex-wrap items-stretch gap-2 md:flex-nowrap'>
      {kpiCardProps.map((card, index) => (
        <KpiCard key={index} {...card} />
      ))}
    </div>
  );
}
