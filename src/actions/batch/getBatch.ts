'use server';

import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';

export const getBatch = catchAsync(async () => {
  return {
    ok: true,
    message: 'Get batch successfully',
    data: [],
  } satisfies ActionResponse;
});
