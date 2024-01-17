'use server';

import { catchAsync } from '@/actions/_helpers/catchAsync';
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

function getThisDayLastYear() {
  const today = new Date();
  const lastYear = new Date(today.getFullYear(), today.getMonth() - 12, today.getDate());
  return lastYear;
}

function mapToLast12Months({
  input,
  firstDate,
  lastDate,
}: {
  input: {
    createdAt: string;
    number: number;
  }[];
  firstDate: Date;
  lastDate: Date;
}) {
  let output = input.reduce((result: { [key: string]: number }, elem) => {
    const date = new Date(elem.createdAt);
    const key = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    if (!result[key]) {
      result[key] = 0;
    }
    result[key] += elem.number;
    return result;
  }, {});

  // fill other months with 0
  const months = [];
  while (firstDate <= lastDate) {
    const month = `${(firstDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDate.getFullYear()}`;
    months.push(month);
    firstDate.setMonth(firstDate.getMonth() + 1);
  }

  months.forEach((month) => {
    if (!output[month]) {
      output[month] = 0;
    }
  });

  // sort by month and year
  output = Object.keys(output)
    .sort((a, b) => {
      const [aMonth, aYear] = a.split('-');
      const [bMonth, bYear] = b.split('-');
      if (aYear === bYear) {
        return Number(aMonth) - Number(bMonth);
      }
      return Number(aYear) - Number(bYear);
    })
    .reduce(
      (result, key) => {
        result[key] = output[key as keyof typeof output];
        return result;
      },
      {} as { [key: string]: number }
    );

  // get only last 12 months
  output = Object.keys(output)
    .slice(-12)
    .reduce(
      (result, key) => {
        result[key] = output[key];
        return result;
      },
      {} as { [key: string]: number }
    );
  return output;
}
