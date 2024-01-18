import { getBranchOf } from '@/actions/branch/getBranchOf';
import { BranchTypes } from '@/constants';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { auth } from '@/lib/auth';
import CollectionPointPage from './pages/collection_point';
import TransactionPointPage from './pages/transaction_point';

export default async function DashboardPage() {
  const session = await auth();

  const branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> = (
    await getBranchOf({
      user: { email: session?.user?.email },
    })
  ).data;

  if (!branch) {
    return (
      <div className='p-4 text-base text-gray-600'>Bạn không có quyền truy cập vào trang này</div>
    );
  }

  return (
    <div className='mt-12 p-4 lg:mt-0'>
      <h1 className='mb-4 text-2xl font-bold'>Thống kê</h1>
      {branch.type === BranchTypes.COLLECTION_POINT ? (
        <CollectionPointPage branchId={branch._id} />
      ) : (
        <TransactionPointPage branchId={branch._id} />
      )}
    </div>
  );
}
