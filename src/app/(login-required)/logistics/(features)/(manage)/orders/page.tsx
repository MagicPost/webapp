import { getBranchOf } from '@/actions/branch/getBranchOf';
import { auth } from '@/lib/auth';
import InnerPage from './InnerPage';
import { BranchTypes } from '@/constants';

export default async function OrdersPage() {
  const session = await auth();

  const branch: {
    _id: string;
    type: BranchTypes;
    district: string;
    province: string;
    name: string;
  } = (
    await getBranchOf({
      user: { email: session?.user?.email },
      customSelect: '_id type name district province',
    })
  ).data;

  if (!branch) {
    return (
      <div className='p-4 text-base text-gray-600'>Bạn không có quyền truy cập vào trang này</div>
    );
  }

  return (
    <>
      <InnerPage branch={branch} />
    </>
  );
}
