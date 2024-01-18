'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { mapToLast12Months } from '@/actions/_helpers/object';
import { getThisDayLastYear } from '@/actions/_helpers/time';
import { ActionResponse } from '@/actions/_helpers/types';
import dbConnect from '@/db/dbConnect';
import { BatchModel } from '@/db/models';

export type CollectionPointStats = {
  receivedPackages: { [key: string]: number };
  forwardedPackages: { [key: string]: number };
};

export const getCollectionPointStats = catchAsync(async (branchId: string) => {
  await dbConnect();

  const today = new Date();
  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  let batches = await BatchModel.find({
    $or: [{ 'to.ref': branchId }, { 'from.ref': branchId }],
    createdAt: {
      $gt: thisMonth.start.toISOString(),
      $lt: thisMonth.end.toISOString(),
    },
  }).select('packages createdAt to');

  batches = batches.map((batch) => ({
    type: batch.to.ref === branchId ? 'received' : 'forwarded',
    createdAt: batch.createdAt,
    number: batch.packages.length,
  }));

  const thisDayLastYear = getThisDayLastYear();
  const receivedPackages = mapToLast12Months({
    input: batches.filter((batch) => batch.type === 'received'),
    firstDate: thisDayLastYear,
    lastDate: thisMonth.end,
  });
  const forwardedPackages = mapToLast12Months({
    input: batches.filter((batch) => batch.type === 'forwarded'),
    firstDate: thisDayLastYear,
    lastDate: thisMonth.end,
  });

  return {
    ok: true,
    message: '',
    data: {
      receivedPackages,
      forwardedPackages,
    } satisfies CollectionPointStats,
  } satisfies ActionResponse;
});
