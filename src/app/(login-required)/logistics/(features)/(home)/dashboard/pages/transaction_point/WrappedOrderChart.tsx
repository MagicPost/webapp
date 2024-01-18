import { TransactionStatsOfYear } from '@/actions/statistics/transaction-points/getTransactionStatsOfYear';
import { OrderChartProps } from '@/components/dashboard/OrderChart';
import dynamic from 'next/dynamic';

const OrderChart = dynamic(() => import('@/components/dashboard/OrderChart'), { ssr: false });

export default function WrappedOrderChart({ data }: { data: TransactionStatsOfYear }) {
  const orderChartProps: OrderChartProps = {
    legend: {
      title: 'Thống kê đơn hàng theo tháng',
    },
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: Object.keys(data.sentPackages),
      },
    },
    series: [
      {
        name: 'Đơn hàng tạo',
        data: Object.values(data.sentPackages),
      },
      {
        name: 'Đơn hàng nhận',
        data: Object.values(data.receivedPackages),
      },
    ],
    style: {
      width: '100%',
      height: '560px',
    },
  };

  return <OrderChart {...orderChartProps} />;
}
