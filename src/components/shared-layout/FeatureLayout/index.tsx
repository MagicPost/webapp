import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/main/Logo';
import Menu from '@/components/main/Menu';

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('h-screen w-screen lg:overflow-hidden lg:pl-64', 'overflow-y-auto')}>
      <Sidebar />
      <div className='flex h-full w-full flex-col overflow-y-scroll'>
        <Topbar />
        <main className='h-full flex-1'>{children}</main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside
      className={cn(
        'block h-full w-64 border-r bg-white px-6',
        'hidden h-screen lg:fixed lg:left-0 lg:top-0 lg:block'
      )}
      aria-label='sidebar'
    >
      <Menu />
    </aside>
  );
}

function Topbar() {
  return (
    <div
      className={cn(
        'block lg:hidden',
        'h-18 fixed z-10 flex w-screen flex-row justify-between bg-white px-4 py-2 shadow-sm'
      )}
    >
      <Logo />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'secondary'}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Menu />
        </SheetContent>
      </Sheet>
    </div>
  );
}
