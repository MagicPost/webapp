'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
import { mapToLast12Months } from '@/actions/_helpers/object';
import { getThisDayLastYear } from '@/actions/_helpers/time';
import { ActionResponse } from '@/actions/_helpers/types';
import dbConnect from '@/db/dbConnect';
import { PackageModel } from '@/db/models';

export type PackageStatsOfYear = {
  sentPackages: { [key: string]: number };
};

export const getPackageStatsOfYear = catchAsync(async () => {
  await dbConnect();

  const [sentPackages] = await Promise.all([countSentPackagesEachMonth()]);

  return {
    ok: true,
    data: {
      ...sentPackages,
    } as PackageStatsOfYear,
    message: '',
  } satisfies ActionResponse;
});

async function countSentPackagesEachMonth() {
  const today = new Date();
  const thisDayLastYear = getThisDayLastYear();
  let packages = await PackageModel.find({
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
