'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { BatchModel } from '@/db/models';

export const updateBatch = catchAsync(async (_id: string, update) => {
  await dbConnect();

  await BatchModel.findOneAndUpdate({ _id }, update);

  return {
    ok: true,
    message: '',
    data: '',
  } satisfies ActionResponse;
});
