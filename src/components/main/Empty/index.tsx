import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Empty({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn(className)}>
      <div className='flex w-full flex-col items-center justify-center'>
        <Image
          src='/empty.png'
          alt='Empty'
          width={0}
          height={0}
          sizes='100vw'
          className='aspect-square h-12 w-12 object-cover'
        />
        <p className='text-base font-semibold text-orange-700'>Không có dữ liệu</p>
        <span className='text-sm text-gray-700'>{message}</span>
      </div>
    </div>
  );
}
