import { cn } from '@/lib/utils';
import { PointType } from './constants';
import React from 'react';

export const PointSelector = React.forwardRef<any, any>(function PointSelector(
  { onChange, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      {...props}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className='mb-8 flex flex-row justify-between gap-1'
    >
      <RadioItem
        value={PointType.COLLECTION}
        groupValue={props.value}
        label={'Tài khoản điểm tập kết'}
      />

      <RadioItem
        value={PointType.TRANSACTION}
        groupValue={props.value}
        label={'Tài khoản điểm giao dịch'}
      />
    </div>
  );
});

function RadioItem({
  value,
  groupValue,
  label,
}: {
  value: string;
  groupValue: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-center rounded border-2 border-gray-500 px-2 py-2 text-sm font-semibold',
        {
          'border-amber-500 text-amber-600': groupValue === value,
          'text-gray-500': groupValue !== value,
        }
      )}
    >
      <input
        type='radio'
        id={value}
        name='point'
        value={value}
        className='radio-group-item hidden'
        defaultChecked={groupValue === value}
      />
      <label htmlFor={value} className='cursor-pointer'>
        {label}
      </label>
    </div>
  );
}
