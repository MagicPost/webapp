'use server';

import { PackageModel } from '@/db/models';
import { catchAsync } from '../_helpers/catchAsync';
import { PackageStates } from '@/constants';
import { ActionResponse } from '../_helpers/types';
import { GetPackageDTO } from '@/dtos/package/package.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import dbConnect from '@/db/dbConnect';

export const getPackages = catchAsync(async (filter: { state?: PackageStates }) => {
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
