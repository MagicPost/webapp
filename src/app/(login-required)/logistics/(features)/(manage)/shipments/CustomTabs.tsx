import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function CustomTabs({
  icon,
  iconContainerClassname,
  label,
  total = 0,
}: {
  icon: ReactNode;
  iconContainerClassname?: string;
  label: string;
  total?: number;
}) {
  return (
    <div className='flex flex-row items-center justify-center gap-2 rounded-sm'>
      <div
        className={cn(
          'flex h-8 w-8 flex-row items-center justify-center rounded-lg',
          iconContainerClassname
        )}
      >
        {icon}
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div className='text-sm font-semibold text-black'>{label}</div>
        <div className='text-sm text-gray-400'>{total} đơn</div>
      </div>
    </div>
  );
}
