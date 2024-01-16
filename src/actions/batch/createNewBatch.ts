'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { CreateBatchDTO, GetBatchDTO } from '@/dtos/batch/batch.dto';
import { BatchModel, PackageModel } from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { ActionResponse } from '../_helpers/types';
import { PackageStates } from '@/constants';

export const createNewBatch = catchAsync(async (payload: CreateBatchDTO) => {
  await dbConnect();

  let newBatch = await BatchModel.create(payload);
  newBatch = transformObjectIdFromLeanedDoc(newBatch.toObject());

  await PackageModel.updateMany(
    { _id: { $in: payload.packages } },
    { state: PackageStates.IN_TRANSIT }
  );

  return {
    ok: true,
    message: '',
    data: newBatch as GetBatchDTO,
  } satisfies ActionResponse;
});
