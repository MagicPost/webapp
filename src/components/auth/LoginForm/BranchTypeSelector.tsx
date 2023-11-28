import { cn } from '@/lib/utils';
import React from 'react';
import { BranchTypes } from '@/constants';

export const BranchTypeSelector = React.forwardRef<any, any>(function BranchTypeSelector(
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
        value={BranchTypes.COLLECTION_POINT}
        groupValue={props.value}
        label={'Tài khoản điểm tập kết'}
      />

      <RadioItem
        value={BranchTypes.TRANSACTION_POINT}
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
        'flex flex-1 items-center justify-center rounded border-2 px-2 py-2 text-sm font-semibold',
        {
          'border-blue-600 bg-blue-100 text-blue-700': groupValue === value,
          'border-gray-400 text-gray-400': groupValue !== value,
        }
      )}
    >
      <input
        type='radio'
        id={value}
        name='branch'
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
