import NewBranchDialog from './NewBranchDialog';
import { getCollectionPoints } from '@/actions/branch';
import BranchImageCard from './BranchImageCard';

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
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-16'>
          <div>
            <p>Số điểm tập kết: {collectionPoints?.length}</p>
            <p>Số điểm giao dịch: {transactionPointTotal}</p>
          </div>
          <div>Tỉnh thành: {provincesNumber}/63</div>
        </div>

        <NewBranchDialog />
      </div>

      <div className='mb-8 mt-8 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-8'>
          <p>Bộ lọc</p>
          <p>Điểm tập kết</p>
          <p>Tỉnh/Thành phố</p>
          <p>Quận/huyện</p>
        </div>
        <div>Tìm kiếm theo địa chỉ</div>
      </div>

      <div className='flex flex-wrap justify-center gap-8'>
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
