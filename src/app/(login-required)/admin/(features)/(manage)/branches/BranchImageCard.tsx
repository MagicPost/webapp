import Image from 'next/image';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { QrCode } from 'lucide-react';

export default function BranchImageCard({
  collectionPoint,
}: {
  collectionPoint: GetCollectionPointDTO;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='min-w-60 max-w-sm overflow-hidden rounded bg-white shadow-lg'>
          <Image
            src='https://v1.tailwindcss.com/img/card-top.jpg'
            alt=''
            width={0}
            height={0}
            className='aspect-square h-[200px] w-full object-cover'
          />
          <div className='px-6 py-4 text-left'>
            <div className='mb-2 text-sm font-semibold text-neutral-500'>
              {collectionPoint.name}
            </div>
            <div className='font-bold text-gray-700'>{collectionPoint.address}</div>
            <div className=''>
              <div className='my-2 flex items-center gap-2 rounded-md'>
                <QrCode size={16} />
                <span className='font-semibold tracking-widest'>21343</span>
              </div>
              <div className='flex justify-between gap-2 border-t pt-3'>
                <div className='text-sm'>12/12/2021</div>
                <div className='flex items-center gap-2'>
                  <Image
                    src=''
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='aspect-square w-[20px] object-cover'
                  />
                  <span className='text-sm'>Nguyễn Văn A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className='w-[1200px]'>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
