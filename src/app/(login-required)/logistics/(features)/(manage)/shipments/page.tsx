import { getBranchOf } from '@/actions/branch/getBranchOf';
import { auth } from '@/lib/auth';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { getAllPackagesOfBranch } from '@/actions/package/getPackages';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { PackageStates } from '@/constants';
import InnerPage from './InnerPage';
import { ETabValue, TPackagesMap } from './@types/tab';

export default async function ShipmentManagement() {
  const session = await auth();
  let res = await getBranchOf({
    user: { email: session?.user?.email },
  });
  const branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> = res.data;

  const [packageRes] = await Promise.all([getAllPackagesOfBranch({ branch })]);

  const packagesMap = getPackagesMap(packageRes.data as GetPackageDTO[]);
  const batchesMap = getBatchesMap([] as GetBatchDTO[]);

  return (
    <div className='mt-12 w-full p-4 lg:mt-0'>
      <h1 className='mb-8 text-2xl font-bold'>Quản lý vận đơn</h1>

      <InnerPage branch={branch} packagesMap={packagesMap} />
    </div>
  );
}

function getPackagesMap(packages: GetPackageDTO[]) {
  return {
    [ETabValue.PENDING]:
      packages.filter(
        (_package: GetPackageDTO) =>
          _package.state === PackageStates.PENDING__READY_TO_DELIVER ||
          _package.state === PackageStates.PENDING__READY_TO_TRANSER
      ) || [],
    [ETabValue.DELIVERING]:
      packages.filter((_package: GetPackageDTO) => _package.state === PackageStates.DELIVERING) ||
      [],
    [ETabValue.DELIVERED]:
      packages.filter((_package: GetPackageDTO) => _package.state === PackageStates.DELIVERED) ||
      [],
    [ETabValue.RESENT]:
      packages.filter((_package: GetPackageDTO) => _package.state === PackageStates.RESENT) || [],
  };
}

function getBatchesMap(batches: GetBatchDTO[]) {}
