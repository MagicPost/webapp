import dynamic from 'next/dynamic';
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
import WrappedKpiCard from './WrappedKpiCard';
import WrappedOrderChart from './WrappedOrderChart';

const TransitChart = dynamic(() => import('@/components/dashboard/TransitChart'), { ssr: false });

export default async function TransactionPointPage({ branchId }: { branchId: string }) {
  const [generalStats, orderOfWeekStats, orderOfYearStats] = await Promise.all([
    getTransactionStatsOfNewestMonth(branchId),
    getTransactionStatsOfWeek(branchId),
    getTransactionStatsOfYear(branchId),
  ]);

  const generalStatsData = generalStats.data as TransactionPointStatsByMonth;
  const orderOfWeekStatsData = orderOfWeekStats.data as TransactionPointStatsByWeek;
  const orderOfYearStatsData = orderOfYearStats.data as TransactionStatsOfYear;

  return (
    <div className='mt-4'>
      <WrappedKpiCard data={generalStatsData} />
      <div className='mt-8 flex w-full flex-col gap-2 md:flex-row'>
        <div className='flex flex-1 flex-col rounded-lg border p-4'>
          <WrappedOrderChart data={orderOfYearStatsData} />
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
