import { DollarSign, Package, UndoDot } from 'lucide-react';
import KpiCard, { KpiCardProps } from '../_components/KpiCard';
import { OrderChartProps } from '../_components/OrderChart';
import dynamic from 'next/dynamic';

const OrderChart = dynamic(() => import('../_components/OrderChart'), { ssr: false });
const TransitChart = dynamic(() => import('../_components/TransitChart'), { ssr: false });

const kpiCardProps: KpiCardProps[] = [
  {
    title: 'Số đơn gửi',
    value: 1000,
    valueUnit: 'đơn',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: 'Số đơn tiếp nhận',
    value: 1000,
    valueUnit: 'đơn',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: 'Số đơn hoàn trả',
    value: 500,
    valueUnit: 'đơn',
    valueChange: -10.2,
    valueChangeUnit: '%',
    icon: <UndoDot className='h-5 w-5' />,
  },
  {
    title: 'Doanh thu cước',
    value: Number(40509888).toLocaleString('vi-VN'),
    valueUnit: '₫',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <DollarSign className='h-5 w-5' />,
  },
];

const orderChartProps: OrderChartProps = {
  legend: {
    title: 'Thống kê đơn hàng theo tháng',
  },
  options: {
    chart: {
      id: 'basic-line',
    },
    xaxis: {
      categories: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
  },
  series: [
    {
      name: 'Năm 2022',
      data: [12, 23, 34, 45, 56, 67, 78, 89, 90, 98, 87, 76],
    },
    {
      name: 'Năm 2023',
      data: [63, 34, 45, 56, 67, 78, 89, 90, 98, 87, 76, 12],
    },
  ],
  style: {
    width: '640',
    height: '500',
  },
};

export default function TransactionPointTab() {
  return (
    <div className='mt-4'>
      <div className='flex w-full flex-row items-stretch gap-2'>
        {kpiCardProps.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
      <div className='mt-8 flex w-full flex-row gap-2'>
        <div className='flex flex-1 flex-col rounded-lg border p-4'>
          <OrderChart {...orderChartProps} />
        </div>
        <div className='flex w-full flex-col gap-4 rounded-lg border p-4'>
          <TransitChart
            legend={{
              title: 'Thống kê trạng thái vận đơn trong tuần',
            }}
          />
        </div>
      </div>
    </div>
  );
}
