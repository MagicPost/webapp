import Image from 'next/image';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Clock4, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchBar from '@/components/main/SearchBar';
import NewBranchForm from './_components/NewBranchForm';

export default function BranchImageCard({
  collectionPoint,
}: {
  collectionPoint: GetCollectionPointDTO;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='max-w-sm overflow-hidden rounded bg-white shadow-lg'>
          <Image
            src='/building.jpg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='aspect-square h-[120px] w-full object-cover'
          />
          <div className='px-6 py-4 text-left'>
            <p className='mb-2 text-sm font-semibold text-neutral-500'>{collectionPoint.name}</p>
            <p className='mb-2 font-bold text-gray-800'>{collectionPoint.address}</p>

            <div className='flex justify-between gap-2 border-t pt-3'>
              <div className='flex items-center gap-1 rounded-md text-right text-sm'>
                <span>
                  <MapPin size={16} />
                </span>
                <span className='font-semibold tracking-wide'>213343</span>
              </div>
              <div className='flex flex-row items-center justify-center gap-1 text-sm font-semibold '>
                <Clock4 size={12} /> <span>12/12/2021</span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='h-[88vh] max-h-[800px] w-[68vw] max-w-[1400px] py-8'>
        <DialogHeader>
          <DialogDescription>
            <div className='flex flex-row gap-4'>
              <div className='w-2/5 px-4'>
                <p className='text-xl font-semibold text-black'>Điểm tập kết Hà Nội</p>

                <div className='mb-2 mt-4 grid grid-cols-3 gap-2 rounded-lg border border-gray-400 p-2'>
                  <div className=' col-span-1'>Trưởng điểm</div>
                  <div className=' col-span-2 flex flex-row items-center justify-start gap-2'>
                    <Avatar className='h-4 w-4'>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-orange-200' />
                    </Avatar>
                    Nguyễn Văn A
                  </div>
                  <div className=' col-span-1'>Địa chỉ</div>
                  <div className=' col-span-2'>
                    123 Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                  </div>
                  <div className=' col-span-1'>Mã bưu chính</div>
                  <div className=' col-span-2'>123233</div>
                  <div className=' col-span-1'>Thời gian thêm</div>
                  <div className=' col-span-2'>12/12/2021</div>
                </div>

                <div>
                  <NewBranchForm />
                </div>
              </div>
              <div className='w-3/5'>
                <p className='mb-4 text-xl font-semibold text-black'>
                  Các điểm giao dịch trực thuộc:
                </p>
                <div className='mb-4'>
                  <SearchBar
                    classname='w-[32rem]'
                    placeholder='Tìm kiếm theo tên, địa chỉ, mã bưu chính, tên trưởng điểm'
                  />
                </div>

                <div className='h-[28rem] overflow-y-scroll'>
                  {[...Array(14)].map((_, index) => (
                    <TransactionPointCard key={index} />
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function TransactionPointCard() {
  return (
    <div className='flex w-[32rem] flex-row rounded-lg border border-gray-700'>
      <Image
        src='/building.jpg'
        alt=''
        width={0}
        height={0}
        sizes='100vw'
        className='aspect-square h-full w-1/3 rounded-bl-lg rounded-tl-lg object-cover p-[0.4]'
      />

      <div className='flex flex-col items-start justify-center gap-2 p-2 px-3'>
        <p className=' text-base font-semibold'>Điểm giao dịch: Cầu Giấy</p>
        <p>Trưởng điểm: Nguyễn Văn A</p>
        <p>Địa chỉ: 123 Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
        <div className='flex w-full justify-between gap-2 border-t pt-3'>
          <div className='flex items-center gap-1 rounded-md text-right text-sm'>
            <span>
              <MapPin size={16} />
            </span>
            <span className='font-semibold tracking-wide'>213343</span>
          </div>
          <div className='flex flex-row items-center justify-center gap-1 text-sm font-semibold '>
            <Clock4 size={12} /> <span>12/12/2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}
