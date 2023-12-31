import { getCollectionPoints } from '@/actions/branch';
import BranchImageCard from './BranchImageCard';
import NewBranchDialog from './NewBranchDialog';
import { Filter } from './_components/Filter';

export default async function BranchesPage() {
  const res = await getCollectionPoints({ withTransactionPoints: false });
  if (!res?.ok) null;
  const collectionPoints = res?.data;

  const transactionPointTotal = collectionPoints
    ?.map((item) => item.transactionPoints.length)
    .reduce((a, b) => a + b, 0);

  const provincesNumber = collectionPoints?.map((item) => item.province).length;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Chi Nhánh</h1>
      <div className='mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
          <div className='font-sm rounded-md border border-teal-700 bg-teal-100 px-4 py-2'>
            <span className='font-semibold text-teal-700'>Số điểm tập kết:</span>{' '}
            <span className='font-semibold'>{collectionPoints?.length}</span>
          </div>
          <div className='font-sm rounded-md border border-lime-600 bg-lime-100 px-4 py-2'>
            <span className='font-semibold text-lime-700'>Số điểm giao dịch:</span>{' '}
            <span className='font-semibold'>{transactionPointTotal}</span>
          </div>
          <div className='font-sm rounded-md border border-amber-600 bg-amber-100 px-4 py-2'>
            <span className='font-semibold text-amber-600'>Số tỉnh/thành phố:</span>{' '}
            <span className='font-semibold'>{provincesNumber}/63</span>
          </div>
        </div>
        <NewBranchDialog />
      </div>

      <div className='my-4 flex flex-row items-center justify-between'>
        <Filter />
      </div>

      <div className='grid grid-cols-1 justify-center gap-4 py-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {collectionPoints && collectionPoints?.length > 0 ? (
          [...collectionPoints, ...collectionPoints]?.map((collectionPoint, index) => (
            <BranchImageCard key={index} collectionPoint={collectionPoint} />
          ))
        ) : (
          <div>--- Chưa có chi nhánh ---</div>
        )}
      </div>
    </div>
  );
}
