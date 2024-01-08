'use server';

import { PackageModel } from '@/db/models';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import dbConnect from '@/db/dbConnect';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

const getPackages = catchAsync(async (filter) => {
  await dbConnect();

  let packages = await PackageModel.find(filter).lean().exec();
  packages = transformObjectIdFromLeanedDoc(packages);
  return {
    ok: true,
    message: '',
    data: packages as GetPackageDTO[],
    status: 200,
  } satisfies ActionResponse;
});

export const getAllPackagesOfBranch = catchAsync(
  async ({
    branch,
    ...filter
  }: {
    branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
    filter: any;
  }) => {
    return await getPackages({
      'tracking.0.branch.ref': branch._id,
      'tracking.0.branch.type': branch.type,
      ...filter,
    });
  }
);
