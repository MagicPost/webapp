'use client';

import Chart from 'react-apexcharts';

export default function TransitChart({
  legend,
  data,
}: {
  legend: {
    title: string;
  };
  data: {
    series: number[];
    labels: string[];
  };
}) {
  const chartData = {
    series: data.series,
    chartOptions: {
      chart: {
        width: '300',
        type: 'pie' as const,
      },
      legend: {
        position: 'right' as const,
      },
      labels: data.labels,
      responsive: [
        {
          breakpoint: 1300,
          options: {
            chart: {
              width: 360,
            },
            legend: {
              position: 'bottom' as const,
            },
          },
        },
        {
          breakpoint: 780,
          options: {
            chart: {
              width: 500,
            },
            legend: {
              position: 'right' as const,
            },
          },
        },
        {
          breakpoint: 560,
          options: {
            chart: {
              width: 460,
            },
            legend: {
              position: 'bottom' as const,
            },
          },
        },
        {
          breakpoint: 360,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <p className='text-lg font-bold'>{legend.title}</p>
      <Chart
        options={chartData.chartOptions}
        series={chartData.series}
        type='pie'
        width='500'
        height={'400'}
      />
    </div>
  );
}
