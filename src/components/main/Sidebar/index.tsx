'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Logo from '../Logo';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={cn('left-0 top-0 h-screen transition-all duration-300 ease-in-out', {
        'w-sidebar': !collapsed,
        'w-sidebar-collapse': collapsed,
      })}
      aria-label='sidebar'
    >
      <div className='flex h-full flex-col border-r'>
        <div className='flex h-topbar flex-row items-center gap-2 border-b pl-4'>
          <Button
            variant={'ghost'}
            className='h-10 w-10 rounded-full'
            onClick={() => setCollapsed(!collapsed)}
          >
            {/* <span className="text-2xl">
              <IoIosMenu />       
            </span> */}
            AAA
          </Button>

          <Logo
            className={cn('text-xl transition-all duration-200 ease-in-out', {
              'opacity-100': !collapsed,
              'opacity-0': collapsed,
              invisible: collapsed,
            })}
          />
        </div>
      </div>
    </aside>
  );
}
