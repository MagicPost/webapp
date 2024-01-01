'use client';

import Image from 'next/image';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Clock4, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchBar from '@/components/main/SearchBar';
import AddTransactionPointForm from './AddTransactionPointForm';
import TransactionPointCard from './TransactionPointCard';
import { getViLocaleDateString } from '@/lib/time';
import { getFullAddress } from '@/lib/address';
import { useQuery } from '@tanstack/react-query';
import { getTransactionPointsOf } from '@/actions/branch';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import Empty from '@/components/main/Empty';

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
                <span className='font-semibold tracking-wide'>{collectionPoint.postalCode}</span>
              </div>
              <div className='flex flex-row items-center justify-center gap-1 text-sm font-semibold '>
                <Clock4 size={12} /> <span>{getViLocaleDateString(collectionPoint.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='h-[88vh] max-h-[800px] w-[68vw] max-w-[1400px] py-8'>
        <DialogInnerContent collectionPoint={collectionPoint} />
      </DialogContent>
    </Dialog>
  );
}

function DialogInnerContent({ collectionPoint }: { collectionPoint: GetCollectionPointDTO }) {
  const { data, error } = useQuery({
    queryKey: ['collectionPoint', collectionPoint._id],
    queryFn: () => getTransactionPointsOf(collectionPoint._id),
  });

  if (error) return <div>Error</div>;

  const transactionPoints = data?.data || ([] as GetTransactionPointDTO[]);

  return (
    <div className='flex flex-row gap-4'>
      <div className='w-2/5 px-4'>
        <p className='text-xl font-semibold text-black'>{collectionPoint.name}</p>

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
            {getFullAddress({
              address: collectionPoint.address,
              district: collectionPoint.district,
              province: collectionPoint.province,
            })}
          </div>
          <div className=' col-span-1'>Mã bưu chính</div>
          <div className=' col-span-2'>{collectionPoint.postalCode}</div>
          <div className=' col-span-1'>Thời gian thêm</div>
          <div className=' col-span-2'>{getViLocaleDateString(collectionPoint.createdAt)}</div>
        </div>

        <div>
          <AddTransactionPointForm collectionPoint={collectionPoint} />
        </div>
      </div>
      <div className='w-3/5'>
        <p className='mb-4 text-xl font-semibold text-black'>Các điểm giao dịch trực thuộc:</p>
        <div className='mb-4'>
          <SearchBar
            classname='w-[32rem]'
            placeholder='Tìm kiếm theo tên, địa chỉ, mã bưu chính, tên trưởng điểm'
          />
        </div>

        <div className='h-[28rem] space-y-2 overflow-y-scroll'>
          {transactionPoints && transactionPoints.length > 0 ? (
            transactionPoints.map((item: GetTransactionPointDTO, index: any) => (
              <TransactionPointCard key={index} transactionPoint={item} />
            ))
          ) : (
            <Empty classname='mt-4' message='Chưa có điểm giao dịch nào' />
          )}
        </div>
      </div>
    </div>
  );
}
