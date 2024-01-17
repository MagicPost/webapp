'use client';

import { DollarSign, Package, UndoDot } from 'lucide-react';
import KpiCard, { KpiCardProps } from '@/components/dashboard/KpiCard';
import { OrderChartProps } from '@/components/dashboard/OrderChart';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Empty from '@/components/main/Empty';
import Loading from '@/components/main/Loading';
import {
  TransactionPointStatsByMonth,
  getTransactionStatsOfNewestMonth,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfNewestMonth';
import {
  TransactionPointStatsByWeek,
  getTransactionStatsOfWeek,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfWeek';
import {
  TransactionStatsOfYear,
  getTransactionStatsOfYear,
} from '@/actions/statistics/transaction-points/getTransactionStatsOfYear';

const OrderChart = dynamic(() => import('@/components/dashboard/OrderChart'), { ssr: false });
const TransitChart = dynamic(() => import('@/components/dashboard/TransitChart'), { ssr: false });

export default function TransactionPointPage({ branchId }: { branchId: string }) {
  const generalStats = useQuery({
    queryKey: ['transactionPointStatsOfMonth'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        getTransactionStatsOfNewestMonth(branchId)
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            else resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    enabled: true,
  });

  const orderOfWeekStats = useQuery({
    queryKey: ['orderTransactionPointStatsOfWeek'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        getTransactionStatsOfWeek(branchId)
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            else resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    enabled: true,
  });

  const orderOfYearStats = useQuery({
    queryKey: ['orderTransactionPointStatsOfYear'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        getTransactionStatsOfYear(branchId)
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            else resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    enabled: true,
  });

  if (
    (generalStats.error && !generalStats.data) ||
    (orderOfWeekStats.error && !orderOfWeekStats.data) ||
    (orderOfYearStats.error && !orderOfYearStats.data)
  ) {
    toast.error((generalStats.error?.message || orderOfWeekStats.error?.message)!);
    return <Empty message='Có lỗi xảy ra!' />;
  }

  if (generalStats.isLoading || orderOfWeekStats.isLoading || orderOfYearStats.isLoading) {
    return <Loading text={'Đang tải...'} className='mt-12' />;
  }

  const generalStatsData = generalStats.data as TransactionPointStatsByMonth;
  const orderOfWeekStatsData = orderOfWeekStats.data as TransactionPointStatsByWeek;
  const orderOfYearStatsData = orderOfYearStats.data as TransactionStatsOfYear;

  const kpiCardProps: KpiCardProps[] = [
    {
      title: 'Số đơn gửi',
      value: generalStatsData.sentPackages.newest,
      valueUnit: 'đơn',
      valueChange: generalStatsData.sentPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
    {
      title: 'Số đơn tiếp nhận',
      value: generalStatsData.receivedPackages.newest,
      valueUnit: 'đơn',
      valueChange: generalStatsData.receivedPackages.growthRate,
      valueChangeUnit: '%',
      icon: <Package className='h-5 w-5' />,
    },
    {
      title: 'Số đơn hoàn trả',
      value: generalStatsData.resentPackages.newest,
      valueUnit: 'đơn',
      valueChange: generalStatsData.resentPackages.growthRate,
      valueChangeUnit: '%',
      icon: <UndoDot className='h-5 w-5' />,
    },
    {
      title: 'Doanh thu cước',
      value: Number(generalStatsData.postages.newest).toLocaleString('vi-VN'),
      valueUnit: '₫',
      valueChange: generalStatsData.postages.growthRate,
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
        categories: Object.keys(orderOfYearStatsData.sentPackages),
      },
    },
    series: [
      {
        name: 'Đơn hàng tạo',
        data: Object.values(orderOfYearStatsData.sentPackages),
      },
      {
        name: 'Đơn hàng nhận',
        data: Object.values(orderOfYearStatsData.receivedPackages),
      },
    ],
    style: {
      width: '100%',
      height: '560px',
    },
  };

  return (
    <div className='mt-4'>
      <div className='flex w-full flex-row flex-wrap items-stretch gap-2 md:flex-nowrap'>
        {kpiCardProps.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
      <div className='mt-8 flex w-full flex-col gap-2 md:flex-row'>
        <div className='flex flex-1 flex-col rounded-lg border p-4'>
          <OrderChart {...orderChartProps} />
        </div>
        <div className='flex w-full flex-col gap-4 rounded-lg border p-4 md:w-1/2'>
          <TransitChart
            legend={{
              title: 'Thống kê trạng thái vận đơn trong tuần',
            }}
            data={{
              series: [
                orderOfWeekStatsData.receivedPackages,
                orderOfWeekStatsData.sentPackages,
                orderOfWeekStatsData.deliveredPackages,
                orderOfWeekStatsData.resentPackages,
              ],
              labels: ['Đơn tiếp nhận', 'Đơn tạo', 'Đơn đã giao', 'Đơn hoàn trả'],
            }}
          />
        </div>
      </div>
    </div>
  );
}
