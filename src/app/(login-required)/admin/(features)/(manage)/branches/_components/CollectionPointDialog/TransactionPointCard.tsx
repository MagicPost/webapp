import Image from 'next/image';
import { Clock4, MapPin } from 'lucide-react';
import { GetTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';
import { getFullAddress } from '@/lib/address';
import { getViLocaleDateString } from '@/lib/time';

export default function TransactionPointCard({
  transactionPoint,
}: {
  transactionPoint: GetTransactionPointDTO;
}) {
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
        <p className=' text-base font-semibold'>{transactionPoint.name}</p>
        <p>Trưởng điểm: Nguyễn Văn A</p>
        <p>
          Địa chỉ:{' '}
          {getFullAddress({
            address: transactionPoint.address,
            district: transactionPoint.district,
            province: transactionPoint.province,
          })}
        </p>
        <div className='flex w-full justify-between gap-2 border-t pt-3'>
          <div className='flex items-center gap-1 rounded-md text-right text-sm'>
            <span>
              <MapPin size={16} />
            </span>
            <span className='font-semibold tracking-wide'>{transactionPoint.postalCode}</span>
          </div>
          <div className='flex flex-row items-center justify-center gap-1 text-sm font-semibold '>
            <Clock4 size={12} /> <span>{getViLocaleDateString(transactionPoint.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
