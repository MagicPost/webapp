import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function Loading({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <Loader2 className='h-6 w-6 animate-spin' />
      <div className='text-base font-semibold text-gray-900'>{text || 'Đang tải dữ liệu...'}</div>
    </div>
  );
}
