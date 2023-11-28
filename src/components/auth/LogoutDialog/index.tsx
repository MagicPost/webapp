'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { logout } from '@/lib/actions';
import { useState } from 'react';

export default function LogoutDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className='mx-auto my-4 text-center text-xl font-semibold'>
          Xác nhận đăng xuất
        </DialogHeader>
        <DialogFooter className='flex flex-row sm:justify-between'>
          <Button
            variant='default'
            className='flex-1'
            onClick={async () => {
              await logout();
            }}
          >
            Đồng ý
          </Button>
          <Button variant='secondary' className='flex-1' onClick={() => setOpen(false)}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
