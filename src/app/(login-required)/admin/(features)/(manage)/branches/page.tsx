import { getCollectionPoints } from '@/actions/branch';
import BranchImageCard from './BranchImageCard';
import NewBranchDialog from './NewBranchDialog';
import { Filter } from './_components/Filter';

export default async function BranchesPage() {
  // https://dribbble.com/shots/14686772-Digital-Building-Passport-Application/attachments/6384375?mode=media

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
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
          <p>Số điểm tập kết: {collectionPoints?.length}</p>
          <p>Số điểm giao dịch: {transactionPointTotal}</p>
          <div>Tỉnh thành: {provincesNumber}/63</div>
        </div>
        <NewBranchDialog />
      </div>

      <div className='mb-8 mt-8 flex flex-row items-center justify-between'>
        <Filter />
      </div>

      <div className='grid grid-cols-1 justify-center gap-8 px-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5'>
        {collectionPoints && collectionPoints?.length > 0 ? (
          collectionPoints?.map((collectionPoint, index) => (
            <BranchImageCard key={index} collectionPoint={collectionPoint} />
          ))
        ) : (
          <div>--- Chưa có chi nhánh ---</div>
        )}
      </div>
    </div>
  );
}
