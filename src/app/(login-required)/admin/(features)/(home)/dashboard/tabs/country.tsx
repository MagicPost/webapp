import { DollarSign, Package, UndoDot } from 'lucide-react';
import KpiCard, { KpiCardProps } from '@/components/dashboard/KpiCard';
import LeadingCard, { LeadingCardProps } from '@/components/dashboard/LeadingCard';
import { OrderChartProps } from '@/components/dashboard/OrderChart';
import dynamic from 'next/dynamic';

const OrderChart = dynamic(() => import('@/components/dashboard/OrderChart'), { ssr: false });

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
    title: 'Doanh thu cước',
    value: Number(40509888).toLocaleString('vi-VN'),
    valueUnit: '₫',
    valueChange: 30.2,
    valueChangeUnit: '%',
    icon: <DollarSign className='h-5 w-5' />,
  },
  {
    title: 'Số đơn hoàn trả',
    value: 500,
    valueUnit: 'đơn',
    valueChange: -10.2,
    valueChangeUnit: '%',
    icon: <UndoDot className='h-5 w-5' />,
  },
];

const collectionTopChart: LeadingCardProps = {
  legend: {
    title: 'Điểm tập kết',
    description: 'Top 3 nhiều đơn hàng nhất tháng',
  },
  rows: [
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm tập kết Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm tập kết TP. Hồ Chí Minh',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1000,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm tập kết TP. Hồ Chí Minh',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1000,
        valueUnit: 'đơn',
      },
    },
  ],
};

const transactionTopChart: LeadingCardProps = {
  legend: {
    title: 'Điểm giao dịch',
    description: 'Top 5 nhiều đơn hàng nhất tháng',
  },
  rows: [
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm giao dịch Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm giao dịch Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm giao dịch Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm giao dịch Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
    {
      image: {
        src: '/building.jpg',
        alt: 'building',
      },
      name: 'Điểm giao dịch Hà Nội',
      description: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      indicator: {
        value: 1200,
        valueUnit: 'đơn',
      },
    },
  ],
};

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
    width: '100%',
    height: '560px',
  },
};

export default function CountryTab() {
  return (
    <div className='mt-4 w-full'>
      <div className='flex w-full flex-row flex-wrap items-stretch gap-2 md:flex-nowrap'>
        {kpiCardProps.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
      <div className='mt-8 flex w-full flex-col gap-2 md:flex-row'>
        <div className='flex w-full flex-1 flex-col rounded-lg border p-4'>
          <OrderChart {...orderChartProps} />
        </div>
        <div className='flex w-full flex-col gap-4 sm:flex-row md:w-1/2 md:flex-col '>
          <LeadingCard {...collectionTopChart} />
          <LeadingCard {...transactionTopChart} />
        </div>
      </div>
    </div>
  );
}
