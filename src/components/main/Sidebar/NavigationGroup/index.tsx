'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type TNavigationGroup = {
  groupName: string;
  items: TNavigationItem[];
};

export type TNavigationItem = {
  label: string;
  icon?: any;
  href?: string;
};

export default function NavigationGroup({ groupName, items }: TNavigationGroup) {
  return (
    <div>
      <p className='select-none text-xs uppercase'>{groupName}</p>

      <div className='flex flex-col gap-1'>
        {items.map((item, index) => (
          <NavigationItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

function NavigationItem({ label, icon, href = '#' }: TNavigationItem) {
  const pathname = usePathname();

  return (
    <Button
      variant={'ghost'}
      className={cn('flex flex-row justify-start px-2', {
        'bg-green-100': pathname === href,
      })}
      asChild
    >
      <Link href={href}>
        <span className='text-xl'>{icon}</span>
        <nav className='ml-2 text-base'>{label}</nav>
      </Link>
    </Button>
  );
}
