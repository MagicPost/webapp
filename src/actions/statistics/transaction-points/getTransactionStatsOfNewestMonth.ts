'use server';

import dbConnect from '@/db/dbConnect';
import { catchAsync } from '../../_helpers/catchAsync';
import { ActionResponse } from '../../_helpers/types';
import { BatchModel, PackageModel } from '@/db/models';
import { getLastMonth, getThisMonth } from '../../_helpers/time';

type FieldProps = {
  newest: number;
  growthRate: number;
};

export type TransactionPointStatsByMonth = {
  sentPackages: FieldProps;
  receivedPackages: FieldProps;
  postages: FieldProps;
  resentPackages: FieldProps;
};

export const getTransactionStatsOfNewestMonth = catchAsync(async (branchId: string) => {
  await dbConnect();

  const [sentPackages, receivedPackages, postages, resentPackages] = await Promise.all([
    countSentPackages(branchId),
    countReceivedPackages(branchId),
    calculatePostages(branchId),
    countResentPackages(branchId),
  ]);

  return {
    ok: true,
    message: '',
    data: {
      sentPackages,
      receivedPackages,
      postages,
      resentPackages,
    } satisfies TransactionPointStatsByMonth,
  } satisfies ActionResponse;
});

/* =========================== */

async function countSentPackages(branchId: string) {
  const [packageCountThisMonth, packageCountLastMonth] = await Promise.all([
    countSentPackagesByMonth(branchId, getThisMonth()),
    countSentPackagesByMonth(branchId, getLastMonth()),
  ]);

  return {
    newest: packageCountThisMonth,
    growthRate: getGrowRate(packageCountThisMonth, packageCountLastMonth),
  } satisfies FieldProps;
}

function countSentPackagesByMonth(branchId: string, month: { start: Date; end: Date }) {
  return PackageModel.find({
    sentAt: branchId,
    createdAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).countDocuments();
}

/* =========================== */

async function countReceivedPackages(branchId: string) {
  const [receivedPackagesThisMonth, receivedPackagesLastMonth] = await Promise.all([
    countReceivedPackagesByMonth(branchId, getThisMonth()),
    countReceivedPackagesByMonth(branchId, getLastMonth()),
  ]);

  return {
    newest: receivedPackagesThisMonth,
    growthRate: getGrowRate(receivedPackagesThisMonth, receivedPackagesLastMonth),
  } satisfies FieldProps;
}

async function countReceivedPackagesByMonth(branchId: string, month: { start: Date; end: Date }) {
  const packagesEachBatches = await BatchModel.aggregate([
    {
      $match: {
        'to.ref': branchId,
        createdAt: {
          $gt: month.start.toISOString(),
          $lt: month.end.toISOString(),
        },
      },
    },
    {
      $project: {
        count: {
          $size: '$packages',
        },
      },
    },
  ]).exec();
  return packagesEachBatches.reduce((acc, curr) => acc + curr.count, 0);
}

/* =========================== */

async function countResentPackages(branchId: string) {
  const [resentPackagesThisMonth, resentPackagesLastMonth] = await Promise.all([
    countResentPackagesByMonth(branchId, getThisMonth()),
    countResentPackagesByMonth(branchId, getLastMonth()),
  ]);

  return {
    newest: resentPackagesThisMonth,
    growthRate: getGrowRate(resentPackagesThisMonth, resentPackagesLastMonth),
  } satisfies FieldProps;
}

function countResentPackagesByMonth(branchId: string, month: { start: Date; end: Date }) {
  return PackageModel.find({
    receivedAt: branchId,
    updatedAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).countDocuments();
}

/* =========================== */
async function calculatePostages(branchId: string) {
  const [postagesThisMonth, postagesLastMonth] = await Promise.all([
    calculatePostagesByMonth(branchId, getThisMonth()),
    calculatePostagesByMonth(branchId, getLastMonth()),
  ]);

  return {
    newest: postagesThisMonth,
    growthRate: getGrowRate(postagesThisMonth, postagesLastMonth),
  } satisfies FieldProps;
}

async function calculatePostagesByMonth(branchId: string, month: { start: Date; end: Date }) {
  const postages = await PackageModel.find({
    sentAt: branchId,
    createdAt: {
      $gt: month.start.toISOString(),
      $lt: month.end.toISOString(),
    },
  }).select('postages');
  return postages.reduce((acc, curr) => acc + curr.postages.main + curr.postages.plus, 0);
}

/* =========================== */

function getGrowRate(currentValue: number, previousValue: number) {
  if (currentValue === 0 && previousValue === 0) return 0;
  if (previousValue === 0) return Infinity;
  return (currentValue - previousValue) / previousValue;
}
