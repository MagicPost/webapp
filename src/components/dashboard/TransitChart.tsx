'use client';

import Chart from 'react-apexcharts';

const data = {
  series: [44, 55, 13, 43, 22],
  chartOptions: {
    chart: {
      width: '300',
      type: 'pie' as const,
    },
    legend: {
      position: 'bottom' as const,
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
        },
      },
      {
        breakpoint: 340,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  },
};

export default function TransitChart({
  legend,
}: {
  legend: {
    title: string;
  };
}) {
  return (
    <div>
      <p className='text-lg font-bold'>{legend.title}</p>
      <Chart
        options={data.chartOptions}
        series={data.series}
        type='pie'
        width='500'
        height={'400'}
      />
    </div>
  );
}
