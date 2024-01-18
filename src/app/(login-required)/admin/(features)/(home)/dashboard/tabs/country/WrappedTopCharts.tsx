import { LeadingBranches } from '@/actions/statistics/country/getLeadingBranches';
import LeadingCard, { LeadingCardProps } from '@/components/dashboard/LeadingCard';

const getCollectionTopChart = (data: LeadingBranches['collectionPoints']): LeadingCardProps => ({
  legend: {
    title: 'Điểm tập kết',
    description:
      'Top 3 nhiều đơn hàng nhất tháng ' +
      new Date().toLocaleString('vi-VN', { month: 'long' }) +
      '/' +
      new Date().getFullYear() +
      '.',
  },
  rows: data.map((item) => ({
    image: {
      src: '/building.jpg',
      alt: 'building',
    },
    name: item.name,
    description: item.fullAddress,
    indicator: {
      value: item.count,
      valueUnit: 'đơn',
    },
  })),
});

const getTransactionTopChart = (data: LeadingBranches['transactionPoints']): LeadingCardProps => ({
  legend: {
    title: 'Điểm giao dịch',
    description:
      'Top 5 nhiều đơn hàng nhất tháng ' +
      new Date().toLocaleString('vi-VN', { month: 'long' }) +
      '/' +
      new Date().getFullYear() +
      '.',
  },
  rows: data.map((item) => ({
    image: {
      src: '/building.jpg',
      alt: 'building',
    },
    name: item.name,
    description: item.fullAddress,
    indicator: {
      value: item.count,
      valueUnit: 'đơn',
    },
  })),
});

export default function WrappedTopCharts({ data }: { data: LeadingBranches }) {
  return (
    <div className='flex w-full flex-col gap-4 sm:flex-row md:w-1/2 md:flex-col '>
      <LeadingCard {...getCollectionTopChart(data.collectionPoints)} />
      <LeadingCard {...getTransactionTopChart(data.transactionPoints)} />
    </div>
  );
}
