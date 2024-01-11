'use client';

import { GetCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { Filter } from './_components/Filter';
import AddCollectionPointDialog from './_components/AddCollectionPointDialog';
import CollectionPointDialog from './_components/CollectionPointDialog';
import { useMemo, useState } from 'react';
import Empty from '@/components/main/Empty';

export default function InnerPage({
  collectionPoints: collectionPointsInput,
}: {
  collectionPoints: GetCollectionPointDTO[];
}) {
  const [savedCollectionPoints, setSavedCollectionPoints] = useState(collectionPointsInput);
  const [filteredCollectionPoints, setFilteredCollectionPoints] = useState(savedCollectionPoints);

  const totalTransactionPointNumber = useMemo(
    () =>
      savedCollectionPoints
        ?.map((item) => item.transactionPoints.length)
        .reduce((a, b) => a + b, 0) || 0,
    [savedCollectionPoints]
  );

  const provincesNumber = useMemo(
    () => savedCollectionPoints?.map((item) => item.province).length || 0,
    [savedCollectionPoints]
  );

  return (
    <div className='mt-12 p-4 lg:mt-0'>
      <h1 className='text-2xl font-bold'>Chi Nhánh</h1>
      <div className='mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
          <div className='font-sm rounded-md border border-teal-700 bg-teal-100 px-4 py-2'>
            <span className='font-semibold text-teal-700'>Số điểm tập kết:</span>{' '}
            <span className='font-semibold'>{savedCollectionPoints?.length}</span>
          </div>
          <div className='font-sm rounded-md border border-lime-600 bg-lime-100 px-4 py-2'>
            <span className='font-semibold text-lime-700'>Số điểm giao dịch:</span>{' '}
            <span className='font-semibold'>{totalTransactionPointNumber}</span>
          </div>
          <div className='font-sm rounded-md border border-amber-600 bg-amber-100 px-4 py-2'>
            <span className='font-semibold text-amber-600'>Số tỉnh/thành phố:</span>{' '}
            <span className='font-semibold'>{provincesNumber}/63</span>
          </div>
        </div>
        <AddCollectionPointDialog
          savedCollectionPoints={savedCollectionPoints}
          setSavedCollectionPoints={setSavedCollectionPoints}
        />
      </div>

      <div className='my-4 flex flex-row items-center justify-between'>
        <Filter
          savedCollectionPoints={savedCollectionPoints}
          setFilteredCollectionPoints={setFilteredCollectionPoints}
        />
      </div>

      <div className='w-full text-right'>
        <span className='text-sm font-semibold'>{filteredCollectionPoints.length} kết quả</span>
      </div>

      {savedCollectionPoints && savedCollectionPoints?.length > 0 ? (
        filteredCollectionPoints && filteredCollectionPoints?.length > 0 ? (
          <div className='grid grid-cols-1 justify-center gap-4 py-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {filteredCollectionPoints?.map((collectionPoint, index) => (
              <CollectionPointDialog key={index} collectionPoint={collectionPoint} />
            ))}
          </div>
        ) : (
          <div className='mt-12'>
            <Empty message='Không có kết quả' />
          </div>
        )
      ) : (
        <div className='mt-12'>
          <Empty message='Chưa có điểm tập kết' />
        </div>
      )}
    </div>
  );
}
