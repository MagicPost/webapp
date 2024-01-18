import { TransactionPointStatsByMonth } from '@/actions/statistics/transaction-points/getTransactionStatsOfNewestMonth';
import KpiCard, { KpiCardProps } from '@/components/dashboard/KpiCard';
import { DollarSign, Package, UndoDot } from 'lucide-react';

export default function WrappedOrderChart({ data }: { data: TransactionPointStatsByMonth }) {
  const kpiCardProps: KpiCardProps[] = [
    {
      title: 'Số đơn gửi',
      value: data.sentPackages.newest,
      valueUnit: 'đơn',
      valueChange: data.sentPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
    {
      title: 'Số đơn tiếp nhận',
      value: data.receivedPackages.newest,
      valueUnit: 'đơn',
      valueChange: data.receivedPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
    {
      title: 'Số đơn hoàn trả',
      value: data.resentPackages.newest,
      valueUnit: 'đơn',
      valueChange: data.resentPackages.growthRate,
      valueChangeUnit: '%',
      icon: <UndoDot className='h-5 w-5' />,
    },
    {
      title: 'Doanh thu cước',
      value: Number(data.postages.newest).toLocaleString('vi-VN'),
      valueUnit: '₫',
      valueChange: data.postages.growthRate,
      valueChangeUnit: '%',
      icon: <DollarSign className='h-5 w-5' />,
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
