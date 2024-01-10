import { getBranchOf } from '@/actions/branch/getBranchOf';
import { auth } from '@/lib/auth';
import { GetBatchDTO } from '@/dtos/batch/batch.dto';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';
import { getAllPackagesOfBranch } from '@/actions/package/getPackages';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { BatchStates, PackageStates } from '@/constants';
import InnerPage from './InnerPage';
import { ETabValue } from './@types/tab';
import { getAllBatchesOfBranch } from '@/actions/batch/getBatches';

export default async function ShipmentManagement() {
  const session = await auth();
  let res = await getBranchOf({
    user: { email: session?.user?.email },
  });
  const branch: Omit<GetBasicBranchDTO, 'address' | 'manager'> = res.data;

  const [packagesRes, batchesRes] = await Promise.all([
    getAllPackagesOfBranch({ branch }),
    getAllBatchesOfBranch({ branch }),
  ]);

  const packagesMap = getPackagesMap(packagesRes.data as GetPackageDTO[]);
  const batchesMap = getBatchesMap(batchesRes.data as GetBatchDTO[]);

  // console.log(packagesMap);

  return (
    <div className='mt-12 w-full p-4 lg:mt-0'>
      <h1 className='mb-8 text-2xl font-bold'>Quản lý vận đơn</h1>

      <InnerPage branch={branch} packagesMap={packagesMap} batchesMap={batchesMap} />
    </div>
  );
}

function getPackagesMap(packages: GetPackageDTO[]) {
  return {
    [ETabValue.PENDING_PACKAGE]:
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

function getBatchesMap(batches: GetBatchDTO[]) {
  return {
    [ETabValue.PENDING_BATCH]:
      batches.filter((batch: GetBatchDTO) => batch.state === BatchStates.PENDING) || [],
    [ETabValue.GONNA_RECEIVE]:
      batches.filter((batch: GetBatchDTO) => batch.state === BatchStates.IN_TRANSIT) || [],
    [ETabValue.FORWARDING]:
      batches.filter((batch: GetBatchDTO) => batch.state === BatchStates.IN_TRANSIT) || [],
    [ETabValue.FORWARDED]:
      batches.filter((batch: GetBatchDTO) => batch.state === BatchStates.ARRIVED) || [],
  };
}
