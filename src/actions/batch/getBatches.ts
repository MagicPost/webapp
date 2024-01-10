'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { BatchModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { GetBasicBranchDTO } from '@/dtos/branches/branch.dto';

export const getBatches = catchAsync(async (filter) => {
  await dbConnect();

  let batches = await BatchModel.find(filter).lean().exec();
  batches = transformObjectIdFromLeanedDoc(batches);

  return {
    ok: true,
    message: 'Get batches successfully',
    data: [],
  } satisfies ActionResponse;
});

export const getAllBatchesOfBranch = catchAsync(
  async ({
    branch,
    ...filter
  }: {
    branch: Omit<GetBasicBranchDTO, 'address' | 'manager'>;
    filter: any;
  }) => {
    return await getBatches({
      $or: [
        { 'from.ref': branch._id, 'from.type': branch.type },
        { 'to.ref': branch._id, 'to.type': branch.type },
      ],
      ...filter,
    });
  }
);
