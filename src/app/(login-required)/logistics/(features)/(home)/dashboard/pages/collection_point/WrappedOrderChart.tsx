import { CollectionPointStats } from '@/actions/statistics/collection-points/getCollectionPointStats';
import { OrderChartProps } from '@/components/dashboard/OrderChart';
import dynamic from 'next/dynamic';

const OrderChart = dynamic(() => import('@/components/dashboard/OrderChart'), { ssr: false });

export default function WrappedOrderChart({ data }: { data: CollectionPointStats }) {
  const orderChartProps: OrderChartProps = {
    legend: {
      title: 'Thống kê đơn hàng theo tháng',
    },
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: Object.keys(data.receivedPackages),
      },
    },
    series: [
      {
        name: 'Số đơn hàng đến',
        data: Object.values(data.receivedPackages),
      },
      {
        name: 'Số đơn hàng đi',
        data: Object.values(data.forwardedPackages),
      },
    ],
    style: {
      width: '100%',
      height: '560px',
    },
  };

  return <OrderChart {...orderChartProps} />;
}
