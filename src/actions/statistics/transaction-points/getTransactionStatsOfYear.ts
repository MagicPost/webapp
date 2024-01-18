'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { mapToLast12Months } from '@/actions/_helpers/object';
import { getThisDayLastYear } from '@/actions/_helpers/time';
import { ActionResponse } from '@/actions/_helpers/types';
import dbConnect from '@/db/dbConnect';
import { BatchModel, PackageModel } from '@/db/models';

export type TransactionStatsOfYear = {
  receivedPackages: { [key: string]: number };
  sentPackages: { [key: string]: number };
};

export const getTransactionStatsOfYear = catchAsync(async (branchId: string) => {
  await dbConnect();

  const [receivedPackages, sentPackages] = await Promise.all([
    countReceivedPackagesEachMonth(branchId),
    countSentPackagesEachMonth(branchId),
  ]);

  return {
    ok: true,
    data: {
      ...receivedPackages,
      ...sentPackages,
    } as TransactionStatsOfYear,
    message: '',
  } satisfies ActionResponse;
});

async function countReceivedPackagesEachMonth(branchId: string) {
  const today = new Date();
  const thisDayLastYear = getThisDayLastYear();
  let batches = await BatchModel.find({
    'to.ref': branchId,
    createdAt: {
      $gt: thisDayLastYear.toISOString(),
      $lt: today.toISOString(),
    },
  }).select('packages createdAt');

  batches = batches.map((batch) => ({
    createdAt: batch.createdAt,
    number: batch.packages.length,
  }));

  return {
    receivedPackages: mapToLast12Months({
      input: batches,
      firstDate: thisDayLastYear,
      lastDate: today,
    }),
  };
}

async function countSentPackagesEachMonth(branchId: string) {
  const today = new Date();
  const thisDayLastYear = getThisDayLastYear();
  let packages = await PackageModel.find({
    sentAt: branchId,
    createdAt: {
      $gt: thisDayLastYear.toISOString(),
      $lt: today.toISOString(),
    },
  }).select('createdAt');

  packages = packages.map((pkg) => ({
    createdAt: pkg.createdAt,
    number: 1,
  }));

  return {
    sentPackages: mapToLast12Months({
      input: packages,
      firstDate: thisDayLastYear,
      lastDate: today,
    }),
  };
}
