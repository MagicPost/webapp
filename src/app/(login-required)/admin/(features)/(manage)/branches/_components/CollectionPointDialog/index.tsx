'use client';

import Image from 'next/image';
import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Clock4, Loader2, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchBar from '@/components/main/SearchBar';
import AddTransactionPointForm from './AddTransactionPointForm';
import TransactionPointCard from './TransactionPointCard';
import { getViLocaleDateString } from '@/lib/time';
import { getFullAddress } from '@/lib/address';
import { useQuery } from '@tanstack/react-query';
import { getTransactionPointsOf } from '@/actions/branch/getTransactionPointsOf';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import Empty from '@/components/main/Empty';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction, useState } from 'react';

export default function BranchImageCard({
  collectionPoint,
}: {
  collectionPoint: GetCollectionPointDTO;
}) {
  const [version, setVersion] = useState(0);
  return (
    <Dialog onOpenChange={() => setVersion(version + 1)}>
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
        <DialogInnerContent
          version={version}
          setVersion={setVersion}
          collectionPoint={collectionPoint}
        />
      </DialogContent>
    </Dialog>
  );
}

function DialogInnerContent({
  version,
  setVersion,
  collectionPoint,
}: {
  version: number;
  setVersion: Dispatch<SetStateAction<number>>;
  collectionPoint: GetCollectionPointDTO;
}) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['collectionPoint', collectionPoint._id],
    queryFn: () =>
      new Promise((resolve, reject) => {
        getTransactionPointsOf(collectionPoint._id)
          .then((res) => {
            if (!res.ok) throw new Error(res.message);
            else resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    enabled: false,
  });

  if (version === 1) {
    refetch();
    setVersion((prev) => prev + 1);
  }

  if (error && !data) {
    toast.error(error.message);
    return <Empty message='Có lỗi xảy ra!' />;
  }
  const transactionPoints = (data || []) as GetTransactionPointDTO[];

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
        <div className='mb-4 flex flex-row items-center justify-between'>
          <p className='text-xl font-semibold text-black'>Các điểm giao dịch trực thuộc:</p>
          <div className='flex flex-row items-center justify-center gap-1'>
            <span className=' font-semibold'>(Tổng: {transactionPoints.length})</span>
          </div>
        </div>
        <div className='mb-4'>
          <SearchBar
            classname='w-[32rem]'
            placeholder='Tìm kiếm theo tên, địa chỉ, mã bưu chính, tên trưởng điểm'
          />
        </div>

        <div className='h-[28rem] space-y-2 overflow-y-scroll'>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center'>
              <Loader2 size={24} className='animate-spin' />
              <p className='mt-2 text-sm font-semibold'>Đang tải...</p>
            </div>
          ) : transactionPoints && transactionPoints.length > 0 ? (
            transactionPoints.map((item: GetTransactionPointDTO, index: any) => (
              <div key={index}>
                <TransactionPointCard transactionPoint={item} />
              </div>
            ))
          ) : (
            <Empty classname='mt-4' message='Chưa có điểm giao dịch nào' />
          )}
        </div>
      </div>
    </div>
  );
}
