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

export default function BranchImageCard({
  collectionPoint,
}: {
  collectionPoint: GetCollectionPointDTO;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='h-80 w-60 max-w-sm overflow-hidden rounded shadow-lg'>
          <Image
            src='https://v1.tailwindcss.com/img/card-top.jpg'
            alt=''
            width={0}
            height={0}
            className='aspect-square h-[160px] w-full object-cover'
          />
          <div className='px-6 py-4'>
            <div className='mb-2 text-xl font-bold'>{collectionPoint.name}</div>
            <div className='text-base text-gray-700'>
              <p>Điểm tập kết</p>
              <p>{collectionPoint.address}</p>
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
