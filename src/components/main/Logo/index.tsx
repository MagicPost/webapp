import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PiMagicWandFill } from 'react-icons/pi';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'text-xl transition-all duration-200 ease-in-out',
        'flex flex-row items-center gap-2',
        className
      )}
    >
      <Button variant={'ghost'} className='h-10 w-10 rounded-full'>
        <span className='text-2xl'>
          <PiMagicWandFill />
        </span>
      </Button>
      <h1 className={cn('text-2xl font-bold', className)} aria-label='logo'>
        MagicPost
      </h1>
    </div>
  );
}
