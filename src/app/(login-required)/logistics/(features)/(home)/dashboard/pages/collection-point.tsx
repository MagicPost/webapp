import { Package, UndoDot } from 'lucide-react';
import KpiCard, { KpiCardProps } from '@/components/dashboard/KpiCard';

const kpiCards: KpiCardProps[] = [
  {
    title: 'Số đơn tập kết đến',
    value: 1000,
    valueUnit: 'đơn',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: 'Số đơn tập kết đi',
    value: 1000,
    valueUnit: 'đơn',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: '',
    value: 500,
    valueUnit: 'đơn',
    valueChange: -10.2,
    valueChangeUnit: '%',
    icon: <UndoDot className='h-5 w-5' />,
  },
];

export default function CollectionPointPage() {
  return (
    <div className='mt-4'>
      <div className='flex w-full flex-row flex-wrap items-stretch gap-2 md:flex-nowrap'>
        {kpiCards.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
      <div className='mt-8 flex w-full flex-row gap-2'>
        <div className='flex flex-1 flex-col'>{/* <NewChart /> */}</div>
        {/* <div className='flex w-full flex-col gap-4'>
          <TopChart {...collectionTopChart} />
          <TopChart {...transactionTopChart} />
        </div> */}
      </div>
    </div>
  );
}
