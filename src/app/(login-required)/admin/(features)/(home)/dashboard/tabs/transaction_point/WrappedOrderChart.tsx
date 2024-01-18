import { PackageStatsOfYear } from '@/actions/statistics/country/getPackageStatsOfYear';
import { OrderChartProps } from '@/components/dashboard/OrderChart';
import dynamic from 'next/dynamic';

const OrderChart = dynamic(() => import('@/components/dashboard/OrderChart'), { ssr: false });

export default function WrappedOrderChart({ data }: { data: PackageStatsOfYear }) {
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
        name: 'Số đơn gửi',
        data: Object.values(data.sentPackages),
      },
    ],
    style: {
      width: '100%',
      height: '560px',
    },
  };

  return <OrderChart {...orderChartProps} />;
}
