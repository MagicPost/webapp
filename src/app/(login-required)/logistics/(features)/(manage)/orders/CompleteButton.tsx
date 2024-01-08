import { ActionResponse } from '@/actions/_helpers/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CompleleButton = React.memo(function CompleleButton({
  onSubmit,
}: {
  onSubmit: () => Promise<ActionResponse>;
}) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [packageId, setPackageId] = useState<string | null>(null);

  console.log(packageId, loading);

  return (
    <Dialog open={open} onOpenChange={(open) => (!open ? setOpen(open) : open)} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button
          onClick={async () => {
            if (packageId) {
              setOpen(true);
              return;
            }

            setLoading(true);
            const res = await onSubmit();

            if (!res.ok) {
              toast.error(res.message);
              setOpen(false);
            } else {
              toast.success(res.message);
              setOpen(true);
              console.log(res.data);
              setPackageId(res.data._id);
            }
            console.log('Hello');
            setLoading(false);
          }}
          type='button'
          className='flex min-w-[6rem] flex-row items-center justify-center text-xs sm:text-base'
          disabled={loading}
        >
          {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Hoàn tất'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mx-auto mt-4 text-center text-xl font-semibold'>
          Đơn tạo thành công
        </DialogHeader>

        <div>
          <p className='text-center'>
            Bạn có muốn in đơn hàng <span className='font-semibold'>{packageId}</span> không?
          </p>
        </div>

        <DialogFooter>
          <div className='flex w-full flex-row justify-center gap-4'>
            <Button
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/receipts/${packageId}`,
                  '_blank'
                );
                setOpen(false);
              }}
              className='min-w-[4rem]'
            >
              Có
            </Button>
            <Button onClick={() => setOpen(false)} variant={'destructive'}>
              Đóng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default CompleleButton;
