'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { BatchModel } from '@/db/models';

export const updateBatches = catchAsync(async (idList: string[], update) => {
  await dbConnect();

  await BatchModel.updateMany({ _id: { $in: idList } }, update);

  return {
    ok: true,
    data: '',
    message: '',
  } satisfies ActionResponse;
});
