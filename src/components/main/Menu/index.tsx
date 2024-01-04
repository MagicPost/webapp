import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  adminSidebarNavigation,
  staffSidebarNavigation,
  managerSidebarNavigation,
} from '@/constants/sidebar-navigation';
import { BranchTypes, Roles } from '@/constants';
import LogoutDialog from '@/components/auth/LogoutDialog';
import { MdLogout } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { getUserByEmail } from '@/actions/user/getUserByEmail';
import { GetUserDTO } from '@/dtos/user/user.dto';
import Logo from '../Logo';
import ProfileMenu from './ProfileMenu';
import NavigationGroup from './NavigationGroup';

export default async function Menu() {
  const session = await auth();
  const user = await getUserByEmail({
    email: session?.user?.email,
    withBranch: true,
  });
  if (!user) return null;

  return (
    <div className='flex h-full flex-col'>
      <TopPart user={user} />
      <MiddlePart user={user} className='mt-8 flex-1' />
      <BottomPart className='h-topbar' />
    </div>
  );
}

function TopPart({ className = '', user }: { className?: string; user: GetUserDTO }) {
  return (
    <div className={cn('', className)}>
      <div className='mt-2 h-topbar'>
        <Logo />
      </div>
      <Badge
        variant={'default'}
        className='flex w-full flex-row items-center justify-center rounded-full py-2'
      >
        <p className='text-sm font-semibold'>
          {user.role === Roles.ADMIN ? 'Ban quản lý' : user.branch?.name}
        </p>
      </Badge>
    </div>
  );
}

function MiddlePart({ className = '', user }: { className?: string; user: GetUserDTO }) {
  const sidebarNavigation = {
    [Roles.ADMIN]: adminSidebarNavigation,
    [Roles.MANAGER]: managerSidebarNavigation,
    [Roles.STAFF]: staffSidebarNavigation,
  }[user.role];

  return (
    <>
      <ProfileMenu />
      <div className={cn('flex flex-col space-y-4', className)}>
        {sidebarNavigation.map((group, index) => (
          <NavigationGroup key={index} {...group} />
        ))}
      </div>
    </>
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
