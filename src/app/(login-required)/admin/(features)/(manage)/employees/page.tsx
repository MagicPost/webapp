import { getEmployees } from '@/actions/user/getEmployees';
import { getBasicBranches } from '@/actions/branch/getBasicBranches';
import InnerPage from './InnerPage';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { BranchTypes } from '@/constants';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';

type Branches = {
  collectionPoints: DisplayCollectionPointDTO[];
  transactionPoints: DisplayTransactionPointDTO[];
};

export default async function EmployeesPage() {
  const managers: GetUserDTO[] = (
    await getEmployees({
      isManager: true,
    })
  )?.data;

  const staffs: GetUserDTO[] = (
    await getEmployees({
      isManager: false,
    })
  )?.data;

  const branches: Branches = (
    await getBasicBranches({
      withCollectionPoints: true,
      withTransactionPoints: true,
    })
  )?.data;

  managers.forEach((manager) => {
    if (!manager.branch || !manager.branch._id) return;
    const foundBranch = getBranchName(manager, branches);
    if (foundBranch) manager.branch.name = foundBranch.name;
  });

  staffs.forEach((staff) => {
    if (!staff.branch || !staff.branch._id) return;
    const foundBranch = getBranchName(staff, branches);
    if (foundBranch) staff.branch.name = foundBranch.name;
  });

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Quản lý nhân sự</h1>
      <InnerPage _managers={managers} staffs={staffs} branches={branches} />
    </div>
  );
}

function getBranchName(employee: GetUserDTO, branches: Branches) {
  if (!employee.branch || !employee.branch._id) return;
  const dataset =
    employee.branch.type === BranchTypes.COLLECTION_POINT
      ? branches?.collectionPoints
      : branches?.transactionPoints;

  const foundBranch = dataset?.find((branch) => branch._id === employee.branch?._id);
  return foundBranch;
}
