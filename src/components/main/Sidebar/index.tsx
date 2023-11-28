import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import NavigationGroup from './NavigationGroup';
import {
  adminSidebarNavigation,
  employeeSidebarNavigation,
  managerSidebarNavigation,
} from '@/constants/sidebar-navigation';
import { PiMagicWandFill } from 'react-icons/pi';
import { Roles } from '@/constants';
import LogoutDialog from '@/components/auth/LogoutDialog';
import { MdLogout } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { TAccount, fakeAccounts } from '@/fake-accounts';

export default async function Sidebar() {
  const res = await auth();
  const user = fakeAccounts.find((item) => item.email === res?.user?.email);
  if (!user) return null;

  return (
    <aside
      className={cn('left-0 top-0 h-screen border-r px-6 transition-all duration-300 ease-in-out')}
      aria-label='sidebar'
    >
      <div className='flex h-full flex-col'>
        <TopPart user={user} />
        <MiddlePart user={user} className='mt-8 flex-1' />
        <BottomPart className='h-topbar' />
      </div>
    </aside>
  );
}

function TopPart({ className = '', user }: { className?: string; user: TAccount }) {
  return (
    <div className={cn('', className)}>
      <div className='flex h-topbar flex-row items-center gap-2'>
        <Button variant={'ghost'} className='h-10 w-10 rounded-full'>
          <span className='text-2xl'>
            <PiMagicWandFill />
          </span>
        </Button>
        <Logo className={cn('text-xl transition-all duration-200 ease-in-out')} />
      </div>
      <Badge
        variant={'default'}
        className='flex w-full flex-row items-center justify-center rounded-full py-2'
      >
        <p className='text-sm font-semibold'>{user.branchName ? user.branchName : 'Ban quản lý'}</p>
      </Badge>
    </div>
  );
}

function MiddlePart({ className = '', user }: { className?: string; user: TAccount }) {
  const sidebarNavigation = {
    [Roles.ADMIN]: adminSidebarNavigation,
    [Roles.MANAGER]: managerSidebarNavigation,
    [Roles.EMPLOYEE]: employeeSidebarNavigation,
  }[user.role];

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {sidebarNavigation.map((group, index) => (
        <NavigationGroup key={index} {...group} />
      ))}
    </div>
  );
}

function BottomPart({ className = '' }) {
  return (
    <div className={cn('flex items-start justify-center', className)}>
      <LogoutDialog>
        <Button
          variant={'ghost'}
          className='flex w-full items-center gap-2 px-4 py-3 font-semibold'
        >
          <span className='text-xl'>
            <MdLogout />
          </span>
          <span className='text-base'>Đăng xuất</span>
        </Button>
      </LogoutDialog>
    </div>
  );
}
