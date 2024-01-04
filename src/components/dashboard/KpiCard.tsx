export type KpiCardProps = {
  title: string;
  value: number | string;
  valueUnit: string;
  valueChange: number;
  valueChangeUnit: string;
  icon: React.ReactNode;
};

export default function KpiCard({
  title,
  value,
  valueUnit,
  valueChange,
  valueChangeUnit,
  icon,
}: KpiCardProps) {
  return (
    <div className='flex w-full min-w-[50%] flex-row justify-between rounded-lg border p-4 md:min-w-0'>
      <div className='flex flex-1 flex-col'>
        <span className=' mb-1 font-semibold'>{title}</span>
        <span className=' text-3xl font-extrabold'>
          {typeof value === 'number' && value > 0 && '+'}
          {value} <span className='text-xl font-bold'>{valueUnit}</span>
        </span>
        <span className='text-sm font-light'>
          {valueChange > 0 && '+'}
          {valueChange}
          {valueChangeUnit} so với tháng trước
        </span>
      </div>
      <div>{icon}</div>
    </div>
  );
}
