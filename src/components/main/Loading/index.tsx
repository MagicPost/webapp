import { Loader2 } from 'lucide-react';

export default function Loading({ text }: { text?: string }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Loader2 className='h-6 w-6 animate-spin' />
      <div className='text-base font-semibold text-gray-900'>{text || 'Đang tải dữ liệu...'}</div>
    </div>
  );
}
