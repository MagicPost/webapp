'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import NavigationGroup from './NavigationGroup';
import { adminSidebarNavigation } from '@/data/sidebar-navigation';
import { MdLogout } from 'react-icons/md';
import Link from 'next/link';
import { PiMagicWandFill } from 'react-icons/pi';

export default function Sidebar() {
  return (
    <aside
      className={cn('left-0 top-0 h-screen border-r px-6 transition-all duration-300 ease-in-out')}
      aria-label='sidebar'
    >
      <div className='flex h-full flex-col'>
        <TopPart />
        <MiddlePart className='mt-8 flex-1' />
        <BottomPart className='h-topbar' />
      </div>
    </aside>
  );
}

function TopPart() {
  return (
    <div className='flex h-topbar flex-row items-center gap-2'>
      <Button variant={'ghost'} className='h-10 w-10 rounded-full'>
        <span className='text-2xl'>
          <PiMagicWandFill />
        </span>
      </Button>

      <Logo className={cn('text-xl transition-all duration-200 ease-in-out')} />
    </div>
  );
}

function MiddlePart({ className = '' }) {
  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {adminSidebarNavigation.map((group, index) => (
        <NavigationGroup key={index} {...group} />
      ))}
    </div>
  );
}

function BottomPart({ className = '' }) {
  return (
    <div className={cn('flex items-start justify-center', className)}>
      <Button variant={'ghost'} asChild>
        <Link href='/auth/logout' className='flex flex-row items-center justify-start gap-2'>
          <span className='text-xl'>
            <MdLogout />
          </span>
          <span className='text-base'>Logout</span>
        </Link>
      </Button>
    </div>
  );
}
