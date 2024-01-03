'use client';

import Chart from 'react-apexcharts';

export type OrderChartProps = {
  legend: {
    title: string;
  };
  options: {
    chart: {
      id: string;
    };
    xaxis: {
      categories: string[];
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
  style?: {
    width?: string;
    height?: string;
  };
};

export default function NewChart({ legend, options, series, style }: OrderChartProps) {
  return (
    <div>
      <p className='text-lg font-bold'>{legend.title}</p>
      <Chart options={options} series={series} type='line' {...style} />
    </div>
  );
}
