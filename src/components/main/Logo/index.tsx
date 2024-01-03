import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PiMagicWandFill } from 'react-icons/pi';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'text-xl transition-all duration-200 ease-in-out min-[300px]:text-2xl',
        'flex flex-row items-center gap-2',
        className
      )}
    >
      <Button variant={'ghost'} className='rounded-full p-0 text-[1em] md:h-10 md:w-10'>
        <span className='p-0 text-[1.2em]'>
          <PiMagicWandFill />
        </span>
      </Button>
      <h1 className={cn('font-bold', className)} aria-label='logo'>
        MagicPost
      </h1>
    </div>
  );
}
